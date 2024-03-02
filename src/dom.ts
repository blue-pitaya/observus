import { isNullOrUndef, isSignal } from "./utils";
import { Signal, observe } from "./core";

export interface ElementBlueprint {
  type: "ElementBlueprint";
  attrs: Record<string, any>;
  tagName: string;
  tagNamespace: string | null;
  children: Blueprint[];
}

export function setAttr(value: any) {
  return {
    type: "SetAttr",
    value,
  };
}

type B = ElementBlueprint | string;

export type Blueprint = B | Signal<B>;

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

    if (typeof value == "object" && value.type == "SetAttr") {
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

  blueprint.children.forEach((bp: Blueprint) => {
    if (typeof bp == "string") {
      element.appendChild(document.createTextNode(bp));
      return;
    }

    if (typeof bp == "object" && bp.type == "Signal") {
      const signalValue = bp.getValue();

      if (typeof signalValue == "string") {
        const textNode = document.createTextNode(signalValue);
        observe(bp, (v) => {
          textNode.nodeValue = v as string;
        });
        element.appendChild(textNode);
      } else {
        let lastElement: Element | null = null;
        const onChange = (elSetter: any) => {
          const el = build(elSetter as ElementBlueprint);
          if (lastElement !== null) {
            element.replaceChild(el, lastElement);
          } else {
            element.appendChild(el);
          }

          lastElement = el;
        };
        observe(bp, onChange);
        onChange(signalValue);
      }

      return;
    }

    element.appendChild(build(bp));
  });

  onMounted(element);

  return element;
}

interface SetAttrOptions {
  setAttrStrategy: "property" | "setAttribute";
}

function handleAttr(
  name: string,
  value: any,
  element: Element,
  options: SetAttrOptions,
  setOnMounted: (v: any) => void,
) {
  function applyPrimitive(v: any) {
    if (isNullOrUndef(v)) {
      element.removeAttribute(name);
      return;
    }

    if (options.setAttrStrategy === "property") {
      //@ts-ignore
      element[name] = v;
    } else {
      //@ts-ignore
      element.setAttribute(name, v);
    }
  }

  if (name == "onCreated") {
    setOnMounted(value);
    return;
  }

  if (isSignal(value)) {
    const onChange = (v: string) => {
      applyPrimitive(v);
    };
    observe(value, onChange);
    onChange(value.getValue());
    return;
  }

  applyPrimitive(value);
}
