// Version 0.9.0 by blue pitaya

export interface Signal<A> {
  type: "Signal";
  value: A;
  observers: (() => void)[];
  set: (v: A) => void;
  map<B>(fn: (v: A) => B): Signal<B>;
}

export type UnobserveFn = () => void;

export type ObChildSetter = Node | Signal<any> | Signal<any[]>;

export type ObAttrs = Record<string, any>;

export type ObAttrsSetter = {
  type: "ObAttrsSetter";
  value: ObAttrs;
};

export type ObRefCallbackSetter = {
  type: "ObRefCallbackSetter";
  fn: (element: Element) => void;
};

export type ObEventListenerSetter = {
  type: "ObEventListenerSetter";
  eventName: string;
  fn: (element: Element) => void;
};

export type ObSetter =
  | ObChildSetter
  | ObAttrsSetter
  | ObRefCallbackSetter
  | ObEventListenerSetter;

export function _attrs(value: ObAttrs): ObAttrsSetter {
  return { type: "ObAttrsSetter", value };
}

export function _ref(fn: (element: Element) => void): ObRefCallbackSetter {
  return { type: "ObRefCallbackSetter", fn };
}

export function _on(eventName: string, fn: any): ObEventListenerSetter {
  return { type: "ObEventListenerSetter", eventName, fn };
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

export function observeLazy(
  deps: Signal<any> | Signal<any>[],
  fn: () => void,
): UnobserveFn {
  const freeFns: (() => void)[] = [];

  function observeSingle(d: Signal<any>) {
    d.observers.push(fn);

    freeFns.push(() => {
      d.observers = d.observers.filter((x) => x !== fn);
    });
  }

  if (Array.isArray(deps)) {
    deps.forEach(observeSingle);
  } else {
    observeSingle(deps);
  }

  return () => {
    freeFns.forEach((fn) => {
      fn();
    });
  };
}

export function observe(
  deps: Signal<any> | Signal<any>[],
  fn: (...x: any[]) => void,
): UnobserveFn {
  const unobserve = observeLazy(deps, fn);

  if (isSignal(deps)) {
    fn(deps.value);
  } else {
    fn(...deps.map((x) => x.value));
  }

  return unobserve;
}

export function notify<A>(
  signal: Signal<A>,
  beforeNotify: () => void = () => {},
) {
  beforeNotify();
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

export function bind<A extends Element>(element: A, ...setters: ObSetter[]): A {
  setters.forEach((setter) => {
    if ("type" in setter && setter.type == "ObAttrsSetter") {
      bindAttrs(element, setter.value);
    } else if ("type" in setter && setter.type == "ObRefCallbackSetter") {
      setter.fn(element);
    } else if ("type" in setter && setter.type == "ObEventListenerSetter") {
      //@ts-ignore
      element.addEventListener(setter.eventName, setter.fn);
    } else {
      bindChildren(element, setter);
    }
  });

  return element;
}

//TODO: also allow element.setAttribute(...) ?
export function bindAttrs<A extends Element>(element: A, attrs: ObAttrs) {
  Object.keys(attrs).forEach((attrKey) => {
    function setAttr(v: any) {
      //@ts-ignore
      element[attrKey] = v;
    }

    const attrValue = attrs[attrKey];

    if (isSignal(attrValue)) {
      observe(attrValue, () => {
        setAttr(attrValue.value);
      });
    } else {
      setAttr(attrValue);
    }
  });
}

export function bindChildren<A extends Element>(
  element: A,
  ...children: ObChildSetter[]
) {
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
}

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
  ...setters: ObSetter[]
): HTMLElementTagNameMap[K] {
  return bind(document.createElement(tagName), ...setters);
}

export function mkSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  ...setters: ObSetter[]
): SVGElementTagNameMap[K] {
  return bind(
    document.createElementNS("http://www.w3.org/2000/svg", tagName),
    ...setters,
  );
}

export function install(name: string, fn: (e: Element) => void) {
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

export function queryObId<E extends Element = Element>(
  element: Element,
  id: string,
): E | null {
  return element.querySelector<E>(`[ob-id='${id}']`);
}

export function bindVisibility(element: HTMLElement, signal: Signal<boolean>) {
  observe(signal, () => {
    if (signal.value) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

export function debounce(fn: () => void, timeout: number) {
  let currentDebounceTaskId: number | null = null;

  return () => {
    if (currentDebounceTaskId !== null) {
      clearTimeout(currentDebounceTaskId);
    }

    currentDebounceTaskId = window.setTimeout(() => {
      try {
        fn();
      } finally {
        currentDebounceTaskId = null;
      }
    }, timeout);
  };
}
