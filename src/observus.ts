export interface State<A> {
  type: "State";
  value: A;
  observers: (() => void)[];
  set: (v: A) => void;
  map: <B>(f: (v: A) => B) => Signal<B>;
  signal: () => Signal<A>;
}

export interface Signal<A> {
  type: "Signal";
  sources: State<any>[];
  getValue: () => A;
  map: <B>(f: (v: A) => B) => Signal<B>;
}

export type FreeFn = () => void;

export function mkState<A>(initialValue: A): State<A> {
  const state: State<A> = {
    type: "State",
    value: initialValue,
    observers: [],
    set: (nextValue: A) => {
      state.value = nextValue;
      state.observers.forEach((next) => next());
    },
    map: (f) => {
      return map(state, f);
    },
    signal: () => {
      return map(state, (v) => v);
    },
  };

  return state;
}

function map<A, B>(s: State<A> | Signal<A>, fn: (v: A) => B): Signal<B> {
  const signal: Signal<B> = {
    type: "Signal",
    sources: s.type == "State" ? [s] : s.sources,
    getValue: s.type == "State" ? () => fn(s.value) : () => fn(s.getValue()),
    map: function <C>(g: (v: B) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

export function signal<A>(value: A): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    sources: [],
    getValue: () => value,
    map: function <C>(g: (v: A) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

export function combine<A>(
  signals: Signal<any>[],
  mapping: (v: any[]) => A,
): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    sources: signals.flatMap((s) => s.sources),
    getValue: () => mapping(signals.map((s) => s.getValue())),
    map: function <C>(g: (v: A) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

export function observe<A>(
  s: State<A> | Signal<A>,
  next: (v: A) => void,
): FreeFn {
  const signal = s.type == "State" ? map(s, (v) => v) : s;
  const f = () => next(signal.getValue());

  signal.sources.forEach((state) => {
    state.observers.push(f);
  });

  return () => {
    signal.sources.forEach((state) => {
      state.observers = state.observers.filter((o) => o !== f);
    });
  };
}

export function runAndObserve<A>(
  s: State<A> | Signal<A>,
  next: (v: A) => void,
): FreeFn {
  const unobserve = observe(s, next);
  if (s.type == "State") {
    next(s.value);
  } else {
    next(s.getValue());
  }

  return unobserve;
}

// DOM

export interface ObservusTrait {
  name: string;
  run: (e: Element) => void;
}

export type ObAttrs = Record<string, any>;

export type ObChildren = (Node | Signal<Node> | Signal<Node[]>)[];

export function initObservus(...traits: ObservusTrait[]) {
  const elements = document.querySelectorAll("[ob-use]");

  console.log(elements);

  elements.forEach((element) => {
    const traitNames = (element.getAttribute("ob-use") ?? "").split(" ");
    traitNames.forEach((traitName) => {
      const trait = traits.find((v) => v.name == traitName);
      if (trait) {
        trait.run(element);
      }
    });
  });
}

export function mkText(value: string | Signal<string>): Text {
  if (isSignal(value)) {
    const node = document.createTextNode(value.getValue());

    runAndObserve(value, (v) => {
      node.textContent = v;
    });

    return node;
  }

  return document.createTextNode(value);
}

export function bind<A extends Element>(
  element: A,
  attrs: ObAttrs,
  ...children: ObChildren
) {
  return buildElement(element, attrs, ...children);
}

export function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): HTMLElementTagNameMap[K] {
  return buildElement(document.createElement(tagName), attrs, ...children);
}

export function mkSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): SVGElementTagNameMap[K] {
  return buildElement(
    document.createElementNS("http://www.w3.org/2000/svg", tagName),
    attrs,
    ...children,
  );
}

function buildElement<A extends Element>(
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
      runAndObserve(attrValue, (value) => {
        setAttr(value);
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
    if (isSignal(child)) {
      if (Array.isArray(child.getValue())) {
        //Signal<Node[]>
        const nodesSignal = child as Signal<Node[]>;

        let lastElements: Node[] | null = null;
        const elementsStartIndex = element.childNodes.length;

        runAndObserve(nodesSignal, (els) => {
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
        runAndObserve(nodeSignal, (el: Node) => {
          if (lastElement !== null) {
            element.replaceChild(el, lastElement);
          } else {
            element.appendChild(el);
          }

          lastElement = el;
        });
      }
    } else {
      element.appendChild(child);
    }
  });

  onCreated(element);

  return element;
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
