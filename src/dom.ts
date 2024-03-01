import { isNullOrUndef, isSignal } from "./utils";
import { observe, Signal } from "./core";

export interface ElementBlueprint {
  type: "ElementBlueprint";
  attrs: Record<string, AttrValue>;
  tagName: string;
  tagNamespace: string | null;
  children: Blueprint[];
}

export interface TextBlueprint {
  type: "TextBlueprint";
  value: string;
}

export type AttrValue =
  | undefined
  | null
  | string
  | number
  | Signal<string>
  | ((v: any) => void)
  | SetAttr;

interface SetAttr {
  type: "SetAttr";
  value: AttrValue;
}

export function setAttr(value: AttrValue): SetAttr {
  return {
    type: "SetAttr",
    value,
  };
}

export type Blueprint = ElementBlueprint | TextBlueprint;

export function mkElement(
  tag: string | { name: string; namespace: string },
  attrs: Record<string, AttrValue>,
  ...children: Blueprint[]
): ElementBlueprint {
  let tagNamespace, tagName;

  if (typeof tag == "string") {
    tagName = tag;
    tagNamespace = null;
  } else {
    tagName = tag.name;
    tagNamespace = tag.namespace;
  }

  return {
    type: "ElementBlueprint",
    tagNamespace,
    tagName,
    attrs,
    children,
  };
}

export function mkText(value: string): TextBlueprint {
  return {
    type: "TextBlueprint",
    value,
  };
}

export function build(blueprint: ElementBlueprint): Element {
  let element: Element;
  let onMounted: (e: Element) => void = () => {};

  if (blueprint.tagNamespace == null) {
    element = document.createElement(blueprint.tagName);
  } else {
    element = document.createElementNS(
      blueprint.tagNamespace,
      blueprint.tagName,
    );
  }

  Object.keys(blueprint.attrs).forEach((name) => {
    const value = blueprint.attrs[name];
    const options: SetAttrOptions = {
      setAttrStrategy: "property",
    };

    if (isSetAttr(value)) {
      options.setAttrStrategy = "setAttribute";
      handleAttr(name, value.value, element, options, (v) => {
        onMounted = v;
      });
    } else {
      handleAttr(name, value, element, options, (v) => {
        onMounted = v;
      });
    }
  });

  blueprint.children.forEach((bp) => {
    if (bp.type == "ElementBlueprint") {
      element.appendChild(build(bp));
      return;
    }

    if (bp.type == "TextBlueprint") {
      element.appendChild(document.createTextNode(bp.value));
    }
  });

  onMounted(element);

  return element;
}

interface SetAttrOptions {
  setAttrStrategy: "property" | "setAttribute";
}

function handleAttr(
  name: string,
  value: AttrValue,
  element: Element,
  options: SetAttrOptions,
  setOnMounted: (v: any) => void,
) {
  function applyPrimitive(v: any) {
    if (isNullOrUndef(v)) {
      return;
    }

    let finalValue;
    if (typeof v === "string") {
      finalValue = v;
    }
    if (typeof v === "number") {
      finalValue = v.toString();
    }

    if (options.setAttrStrategy === "property") {
      //@ts-ignore
      element[name] = finalValue;
    } else {
      //@ts-ignore
      element.setAttribute(name, finalValue);
    }
  }

  if (name == "onCreated") {
    setOnMounted(value);
    return;
  }

  if (isSignal(value)) {
    const onChange = (v: string) => {
      if (!isNullOrUndef(v)) {
        applyPrimitive(v);
      } else {
        //TODO: is it needed? would setting attribute to undefined do the trick itself?
        element.removeAttribute(name);
      }
    };
    observe(value, onChange);
    onChange(value.getValue());
    return;
  }

  applyPrimitive(value);
}

function isSetAttr(v: any): v is SetAttr {
  return typeof v === "object" && v.type == "SetAttr";
}
