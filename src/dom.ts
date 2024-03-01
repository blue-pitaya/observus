import { isNullOrUndef, isSignal } from "./utils";
import { observe } from "./core";

export interface ElementBlueprint {
  type: "ElementBlueprint";
  attrs: Record<string, any>;
  tagName: string;
  tagNamespace: string | null;
  children: Blueprint[];
}

export interface TextBlueprint {
  type: "TextBlueprint";
  value: string;
}

export type Blueprint = ElementBlueprint | TextBlueprint;

export function mkElement(
  tag: string | { name: string; namespace: string },
  attrs: Record<string, any>,
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

  Object.keys(blueprint.attrs).forEach((key) => {
    const value = blueprint.attrs[key];

    if (key == "onCreated") {
      onMounted = value;
      return;
    }

    if (isSignal(value)) {
      observe(value, (v) => {
        if (!isNullOrUndef(v)) {
          applyPrimitive(key, value, element);
        } else {
          //TODO: is it needed? would setting attribute to undefined do the trick itself?
          element.removeAttribute(key);
        }
      });
      return;
    }

    applyPrimitive(key, value, element);
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

function applyPrimitive(key: string, value: any, element: Element) {
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
