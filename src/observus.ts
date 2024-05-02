//export interface State<A> {
//  type: "State";
//  value: A;
//  observers: (() => void)[];
//  set: (v: A) => void;
//  map: <B>(f: (v: A) => B) => Signal<B>;
//  signal: () => Signal<A>;
//}
//
//export interface Signal<A> {
//  type: "Signal";
//  sources: State<any>[];
//  getValue: () => A;
//  map: <B>(f: (v: A) => B) => Signal<B>;
//}

export interface Source<A> {
  type: "Source";
  value: A;
  observers: (() => void)[];
  set: (v: A) => void;
}

export interface Sink<A> {
  type: "Sink";
  value: () => A;
  sources: Source<any>[];
}

export type FreeFn = () => void;

function mkSource<A>(initialValue: A): Source<A> {
  const source: Source<A> = {
    type: "Source",
    value: initialValue,
    observers: [],
    set: (nextValue: A) => {
      source.value = nextValue;
      source.observers.forEach((next) => next());
    },
  };

  return source;
}

function mkSink<A>(fn: () => A, deps: (Sink<any> | Source<any>)[]): Sink<A> {
  return {
    type: "Sink",
    sources: deps.flatMap((x) => (x.type == "Source" ? [x] : x.sources)),
    value: () => fn(),
  };
}

function lazyObserve<A>(s: Source<A> | Sink<A>, next: (v: A) => void): FreeFn {
  const sink: Sink<A> = s.type == "Source" ? mkSink<A>(() => s.value, [s]) : s;
  const fn = () => next(sink.value());

  sink.sources.forEach((source) => {
    source.observers.push(fn);
  });

  return () => {
    sink.sources.forEach((source) => {
      source.observers = source.observers.filter((o) => o !== fn);
    });
  };
}

function observe<A>(s: Source<A> | Sink<A>, next: (v: A) => void): FreeFn {
  const unobserve = lazyObserve(s, next);
  if (s.type == "Source") {
    next(s.value);
  } else {
    next(s.value());
  }

  return unobserve;
}

// DOM

export type ObAttrs = Record<string, any>;

export type ObChildren = (Node | Sink<Node> | Sink<Node[]>)[];

//TODO: add SOurce<string> handling
function mkText(value: string | Sink<string>): Text {
  if (isSink(value)) {
    const node = document.createTextNode(value.value());

    observe(value, (v) => {
      node.textContent = v;
    });

    return node;
  }

  return document.createTextNode(value);
}

function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): HTMLElementTagNameMap[K] {
  return build(document.createElement(tagName), attrs, ...children);
}

function mkSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): SVGElementTagNameMap[K] {
  return build(
    document.createElementNS("http://www.w3.org/2000/svg", tagName),
    attrs,
    ...children,
  );
}

function build<A extends Element>(
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

    if (isSink(attrValue)) {
      observe(attrValue, (value) => {
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
    if (isSink(child)) {
      if (Array.isArray(child.value())) {
        //Signal<Node[]>
        const nodesSignal = child as Sink<Node[]>;

        let lastElements: Node[] | null = null;
        const elementsStartIndex = element.childNodes.length;

        observe(nodesSignal, (els) => {
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
        const nodeSignal = child as Sink<Node>;

        let lastElement: Node | null = null;
        observe(nodeSignal, (el: Node) => {
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

function isSink(v: any): v is Sink<any> {
  return (
    v !== undefined &&
    v !== null &&
    typeof v === "object" &&
    "type" in v &&
    v.type == "Sink"
  );
}

function install(name: string, fn: <A extends Element>(e: A) => void) {
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

const observus = {
  mkSource,
  mkSink,
  lazyObserve,
  observe,
  mkText,
  mkElement,
  mkSvgElement,
  build,
  install,
};

export default observus;
