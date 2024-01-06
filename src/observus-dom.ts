import { Signal, observe } from "./observus-core";

export type NullOrUndef = null | undefined;

interface ElementSetter {
  kind: "ElementSetter";
  tagName: string;
  tagNamespace: string | null;
  children: Setter[];
}

type AttrStringValue = string | NullOrUndef | Signal<string | NullOrUndef>;

type AttrNumberValue = number | NullOrUndef | Signal<number | NullOrUndef>;

type AttrBoolValue = boolean | Signal<boolean>;

type AttrSetStrategy = "property" | "setAttrFn";

interface AttrSetter {
  kind: "AttrSetter";
  name: string;
  value: AttrStringValue;
  strategy: AttrSetStrategy;
}

interface BoolAttrSetter {
  kind: "BoolAttrSetter";
  name: string;
  value: AttrBoolValue;
}

interface TextSignalSetter {
  kind: "TextSignalSetter";
  value: Signal<string>;
}

//TODO: proper types from ts
interface EventListenerSetter {
  kind: "EventListenerSetter";
  type: string;
  listener: <A extends Event>(e: A) => void;
  options?: boolean | AddEventListenerOptions;
}

interface ElementSignalSetter {
  kind: "ElementSignalSetter";
  value: Signal<ElementSetter>;
}

interface WithRefSetter {
  kind: "WithRefSetter";
  fn: (el: Element) => Setter;
}

type Setter =
  | ElementSetter
  | AttrSetter
  | BoolAttrSetter
  | TextSignalSetter
  | EventListenerSetter
  | ElementSignalSetter
  | WithRefSetter;

const isNullOrUndef = (v: any): v is NullOrUndef =>
  v === undefined || v === null;

function createTag(
  name: string,
  isSvg: boolean,
  ...ch: Setter[]
): ElementSetter {
  return {
    kind: "ElementSetter",
    tagName: name,
    tagNamespace: isSvg ? "http://www.w3.org/2000/svg" : null,
    children: ch,
  };
}

export const tag = (name: string, ...ch: Setter[]): ElementSetter =>
  createTag(name, false, ...ch);

export const svgTag = (name: string, ...ch: Setter[]): ElementSetter =>
  createTag(name, true, ...ch);

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

function buildElement(elementSetter: ElementSetter): Element {
  let element: Element;

  if (elementSetter.tagNamespace == null) {
    element = document.createElement(elementSetter.tagName);
  } else {
    element = document.createElementNS(
      elementSetter.tagNamespace,
      elementSetter.tagName,
    );
  }

  elementSetter.children.forEach((setter) => {
    handleSetter(element, setter);
  });

  return element;
}

function handleSetter(root: Element, setter: Setter) {
  if (setter.kind == "ElementSetter") {
    root.appendChild(buildElement(setter));
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
      const el = buildElement(elSetter);
      if (lastElement !== null) {
        root.replaceChild(el, lastElement);
      } else {
        root.appendChild(el);
      }

      lastElement = el;
    });
  }

  if (setter.kind == "WithRefSetter") {
    handleSetter(root, setter.fn(root));
  }
}
