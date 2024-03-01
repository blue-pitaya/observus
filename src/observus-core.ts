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

export type AttrStringValue =
  | string
  | NullOrUndef
  | Signal<string | NullOrUndef>;

export type AttrNumberValue =
  | number
  | NullOrUndef
  | Signal<number | NullOrUndef>;

export type AttrBoolValue = boolean | Signal<boolean>;

export type AttrSetStrategy = "property" | "setAttrFn";

export interface AttrSetter {
  kind: "AttrSetter";
  name: string;
  value: AttrStringValue;
  strategy: AttrSetStrategy;
}

export interface BoolAttrSetter {
  kind: "BoolAttrSetter";
  name: string;
  value: AttrBoolValue;
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

//export interface InContextCallback {
//  kind: "InContextCallback";
//  fn: (el: Element) => void;
//}
//
//export interface OnMountedCallback {
//  kind: "OnMountedCallback";
//  fn: (el: Element) => void;
//}

export type Setter =
  | NullOrUndef
  | string
  | ElementSetter
  | AttrSetter
  | BoolAttrSetter
  | TextSignalSetter
  | EventListenerSetter
  | ElementSignalSetter
  | ElementsArraySignalSetter
  | HardElementsSignalSetter;
//  | InContextCallback
//  | OnMountedCallback;

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

export const attr = (
  name: string,
  value: AttrStringValue,
  strategy: AttrSetStrategy = "property",
): AttrSetter => ({
  kind: "AttrSetter",
  name,
  value,
  strategy,
});

export const customAttr = (
  name: string,
  value: AttrStringValue,
): AttrSetter => ({
  kind: "AttrSetter",
  name,
  value,
  strategy: "setAttrFn",
});

export function numAttr(
  name: string,
  value: AttrNumberValue,
  strategy: AttrSetStrategy = "property",
): AttrSetter {
  let strValue: AttrStringValue;

  if (isNullOrUndef(value)) {
    strValue = value;
  } else if (typeof value == "number") {
    strValue = value.toString();
  } else {
    strValue = value.map((v) => (isNullOrUndef(v) ? v : v.toString()));
  }

  return attr(name, strValue, strategy);
}

export const boolAttr = (
  name: string,
  value: AttrBoolValue,
): BoolAttrSetter => ({
  kind: "BoolAttrSetter",
  name,
  value,
});

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

//export const onMounted = (fn: (el: Element) => void): OnMountedCallback => ({
//  kind: "OnMountedCallback",
//  fn,
//});
//
//export const inCtx = (fn: (e: Element) => void): InContextCallback => ({
//  kind: "InContextCallback",
//  fn,
//});

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

  if (setter.kind == "AttrSetter") {
    if (isNullOrUndef(setter.value)) {
      return;
    }

    const buildAttr = (value: string) => {
      if (setter.strategy == "setAttrFn") {
        root.setAttribute(setter.name, value);
      } else {
        // @ts-ignore
        root[setter.name] = value;
      }
    };

    if (typeof setter.value == "string") {
      buildAttr(setter.value);
    } else {
      observe(setter.value, (v) => {
        if (!isNullOrUndef(v)) {
          buildAttr(v);
        } else {
          root.removeAttribute(setter.name);
        }
      });
    }
  }

  if (setter.kind == "BoolAttrSetter") {
    if (typeof setter.value == "boolean") {
      // @ts-ignore
      root[setter.name] = setter.value;
    } else {
      observe(setter.value, (v) => {
        // @ts-ignore
        root[setter.name] = v;
      });
    }
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
