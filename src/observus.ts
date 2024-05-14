export interface Signal<A> {
  type: "Signal";
  value: A;
  observers: (() => void)[];
  set: (v: A) => void;
  map<B>(fn: (v: A) => B): Signal<B>;
}

export function mkState<A>(initialValue: A): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    value: initialValue,
    observers: [],
    set: (v) => {
      setFn(signal, v);
    },
    map: (fn) => mkSignal(signal, () => fn(signal.value)),
  };

  return signal;
}

export function mkSignal<A>(
  deps: Signal<any> | Signal<any>[],
  fn: () => A,
): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    value: fn(),
    observers: [],
    set: (v: A) => {
      setFn(signal, v);
    },
    map: (fn) => mkSignal(signal, () => fn(signal.value)),
  };

  if (Array.isArray(deps)) {
    deps.forEach((dep) => {
      dep.observers.push(() => {
        signal.set(fn());
      });
    });
  } else {
    deps.observers.push(() => {
      signal.set(fn());
    });
  }

  return signal;
}

function setFn<A>(signal: Signal<A>, value: A) {
  signal.value = value;
  //TODO: use isDirty for mass updates
  signal.observers.forEach((fn) => {
    fn();
  });
}

//TODO: should return freeFN
export function observeLazy(deps: Signal<any> | Signal<any>[], fn: () => void) {
  if (Array.isArray(deps)) {
    deps.forEach((d) => {
      d.observers.push(fn);
    });
  } else {
    deps.observers.push(fn);
  }
}

export function observe(deps: Signal<any> | Signal<any>[], fn: () => void) {
  observeLazy(deps, fn);
  fn();
}

export function updateInPlace<A>(signal: Signal<A>, fn: (value: A) => void) {
  fn(signal.value);
  signal.set(signal.value);
}

export function isSignal(v: any): v is Signal<any> {
  return (
    v !== undefined &&
    v !== null &&
    typeof v === "object" &&
    "type" in v &&
    v.type == "Signal"
  );
}

// DOM

export type ObAttrs = Record<string, any>;

export type ObChildren = (Node | Signal<any> | Signal<any[]>)[];

export function mkText(value: string | Signal<string>): Text {
  if (typeof value === "object") {
    const node = document.createTextNode(value.value);

    observe(value, () => {
      node.textContent = value.value;
    });

    return node;
  }

  return document.createTextNode(value);
}

export function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): HTMLElementTagNameMap[K] {
  return bind(document.createElement(tagName), attrs, ...children);
}

export function mkSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): SVGElementTagNameMap[K] {
  return bind(
    document.createElementNS("http://www.w3.org/2000/svg", tagName),
    attrs,
    ...children,
  );
}

export function bind<A extends Element>(
  element: A,
  attrs: ObAttrs,
  ...children: ObChildren
): A {
  let onCreated = (_: A) => {};

  Object.keys(attrs).forEach((attrKey) => {
    function setAttr(v: any) {
      //TODO: also allow element.setAttribute(...)
      //@ts-ignore
      element[attrKey] = v;
    }

    const attrValue = attrs[attrKey];

    if (isSignal(attrValue)) {
      observe(attrValue, () => {
        setAttr(attrValue.value);
      });
      return;
    }

    if (attrKey.startsWith("on_")) {
      const eventName = attrKey.substring(3);

      if (eventName == "created") {
        onCreated = attrValue;
      } else {
        element.addEventListener(eventName, attrValue);
      }
      return;
    }

    setAttr(attrValue);
  });

  children.forEach((child) => {
    if (!isSignal(child)) {
      element.appendChild(child as Node);
      return;
    }

    if (Array.isArray(child.value)) {
      //Signal<Node[]>
      const nodesSignal = child as Signal<Node[]>;

      let lastElements: Node[] | null = null;
      const elementsStartIndex = element.childNodes.length;

      observe(nodesSignal, () => {
        const els = nodesSignal.value;
        if (lastElements !== null) {
          const childNodes = [...element.childNodes];
          childNodes.splice(
            elementsStartIndex,
            lastElements.length,
            //TODO: is it safe?
            ...(els as ChildNode[]),
          );
          element.replaceChildren(...childNodes);
        } else {
          els.forEach((el) => {
            element.appendChild(el);
          });
        }

        lastElements = els;
      });

      return;
    } else {
      //Signal<Node>
      const nodeSignal = child as Signal<Node>;

      let lastElement: Node | null = null;
      observe(nodeSignal, () => {
        const el = nodeSignal.value;
        if (lastElement !== null) {
          element.replaceChild(el, lastElement);
        } else {
          element.appendChild(el);
        }

        lastElement = el;
      });
    }
  });

  onCreated(element);

  return element;
}

export function install(name: string, fn: <A extends Element>(e: A) => void) {
  const elements = document.querySelectorAll("[ob-use]");

  elements.forEach((element) => {
    const traits = (element.getAttribute("ob-use") ?? "").split(" ");

    if (traits.find((x) => x == name)) {
      try {
        fn(element);
      } catch (e) {
        console.error(e);
      }
    }
  });
}
