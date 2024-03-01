import { Signal, observe } from "./core";
import { NullOrUndef, isNullOrUndef, isSignal } from "./utils";

// DOM building

export interface ElementSetter {
  kind: "ElementSetter";
  attrs: Record<string, any>;
  tagName: string;
  tagNamespace: string | null;
  children: ElementSetter[];
}


export interface TextSignalSetter {
  kind: "TextSignalSetter";
  value: Signal<string>;
}

//TODO: proper types from ts
export interface EventListenerSetter {
  kind: "EventListenerSetter";
  type: string;
  listener: <A extends Event>(e: A) => void;
  options?: boolean | AddEventListenerOptions;
}

export interface ElementSignalSetter {
  kind: "ElementSignalSetter";
  value: Signal<ElementSetter>;
}

export interface ElementsArraySignalSetter {
  kind: "ElementsArraySignalSetter";
  value: Signal<ElementSetter[]>;
}

export interface HardElementsSignalSetter {
  kind: "HardElementsSignalSetter";
  value: Signal<Element[]>;
}

export type Setter =
  | NullOrUndef
  | string
  | ElementSetter
  | TextSignalSetter
  | EventListenerSetter
  | ElementSignalSetter
  | ElementsArraySignalSetter
  | HardElementsSignalSetter;

export function mkElement(
  tag: string | { name: string; namespace: string },
  attrs: Record<string, any>,
  ...children: ElementSetter[]
): ElementSetter {
  let tagNamespace, tagName;

  if (typeof tag == "string") {
    tagName = tag;
    tagNamespace = null;
  } else {
    tagName = tag.name;
    tagNamespace = tag.namespace;
  }

  return {
    kind: "ElementSetter",
    tagNamespace,
    tagName,
    attrs,
    children,
  };
}

export function mkSvgElement(
  tag: string,
  attrs: Record<string, any>,
  ...children: ElementSetter[]
): ElementSetter {
  return mkElement(
    {
      name: tag,
      namespace: "http://www.w3.org/2000/svg",
    },
    attrs,
    ...children,
  );
}


export const textSignal = (value: Signal<string>): TextSignalSetter => ({
  kind: "TextSignalSetter",
  value,
});

//TODO: proper types from ts
export const on = (
  type: string,
  listener: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
): EventListenerSetter => ({
  kind: "EventListenerSetter",
  type,
  listener,
  options,
});

export const elementSignal = (
  value: Signal<ElementSetter>,
): ElementSignalSetter => ({
  kind: "ElementSignalSetter",
  value,
});

export const elementsArraySignal = (
  value: Signal<ElementSetter[]>,
): ElementsArraySignalSetter => ({
  kind: "ElementsArraySignalSetter",
  value,
});

export const hardElementsSignal = (
  value: Signal<Element[]>,
): HardElementsSignalSetter => ({
  kind: "HardElementsSignalSetter",
  value,
});

export function mount(root: Element, ...setters: Setter[]) {
  setters.forEach((setter) => {
    handleSetter(root, setter);
  });
}

export function build(elementSetter: ElementSetter): Element {
  let element: Element;

  if (elementSetter.tagNamespace == null) {
    element = document.createElement(elementSetter.tagName);
  } else {
    element = document.createElementNS(
      elementSetter.tagNamespace,
      elementSetter.tagName,
    );
  }

  let onMounted: (e: Element) => void = () => {};

  function applyPrimitive(key: string, value: any) {
    if (isNullOrUndef(value)) {
      return;
    }

    if (typeof value === "string") {
      //@ts-ignore
      element[key] = value;
      return;
    }

    if (typeof value === "number") {
      //@ts-ignore
      element[key] = value.toString();
    }
  }

  Object.keys(elementSetter.attrs).forEach((key) => {
    const value = elementSetter.attrs[key];

    if (key.startsWith("_on_")) {
      const eventName = key.substring(4);

      if (eventName == "mounted") {
        onMounted = value;
      } else {
        //TODO: handle event listeners
      }
    } else {
      if (isSignal(value)) {
        observe(value, (v) => {
          if (!isNullOrUndef(v)) {
            applyPrimitive(key, value);
          } else {
            //TODO: is it needed? would setting attribute to undefined do the trick itself?
            element.removeAttribute(key);
          }
        });
      } else {
        applyPrimitive(key, value);
      }
    }
  });

  //elementSetter.children.forEach((setter) => {
  //  if (
  //    !isNullOrUndef(setter) &&
  //    typeof setter !== "string" &&
  //    setter.kind == "OnMountedCallback"
  //  ) {
  //    onMounted = setter;
  //  } else {
  //    handleSetter(element, setter);
  //  }
  //});

  onMounted(element);

  return element;
}

function handleSetter(root: Element, setter: Setter) {
  if (isNullOrUndef(setter)) {
    return;
  }

  if (typeof setter === "string") {
    root.appendChild(document.createTextNode(setter));
    return;
  }

  if (setter.kind == "ElementSetter") {
    root.appendChild(build(setter));
  }

  if (setter.kind == "TextSignalSetter") {
    const textNode = document.createTextNode(setter.value.getValue());
    observe(setter.value, (v) => {
      textNode.nodeValue = v;
    });
    root.appendChild(textNode);
  }

  if (setter.kind == "EventListenerSetter") {
    root.addEventListener(setter.type, setter.listener, setter.options);
  }

  if (setter.kind == "ElementSignalSetter") {
    let lastElement: Element | null = null;
    observe(setter.value, (elSetter) => {
      const el = build(elSetter);
      if (lastElement !== null) {
        root.replaceChild(el, lastElement);
      } else {
        root.appendChild(el);
      }

      lastElement = el;
    });
  }

  if (setter.kind == "ElementsArraySignalSetter") {
    let lastElements: Element[] | null = null;
    const elementsStartIndex = root.childNodes.length;

    observe(setter.value, (elementSetters) => {
      const elements = elementSetters.map((e) => build(e));

      if (lastElements !== null) {
        const childNodes = [...root.childNodes];
        childNodes.splice(elementsStartIndex, lastElements.length, ...elements);
        root.replaceChildren(...childNodes);
      } else {
        elements.forEach((el) => {
          root.appendChild(el);
        });
      }

      lastElements = elements;
    });
  }

  if (setter.kind == "HardElementsSignalSetter") {
    let lastElements: Element[] | null = null;
    const elementsStartIndex = root.childNodes.length;

    observe(setter.value, (elements) => {
      if (lastElements !== null) {
        const childNodes = [...root.childNodes];
        childNodes.splice(elementsStartIndex, lastElements.length, ...elements);
        root.replaceChildren(...childNodes);
      } else {
        elements.forEach((el) => {
          root.appendChild(el);
        });
      }

      lastElements = elements;
    });
  }
}
