import { isNullOrUndef, isSignal } from "./utils";
import { Signal, runAndObserve } from "./core";

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

export type BB = ElementBlueprint | string;

function isBB(e: any): e is BB {
  return (
    typeof e == "string" ||
    (typeof e == "object" && e.type == "ElementBlueprint")
  );
}

export type Blueprint =
  | ElementBlueprint
  | string
  | Signal<BB>
  | Signal<BB[]>
  | Signal<Element[]>;

//TODO: add on_mounted typings
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

export function mkSvgElement(
  tag: string,
  attrs: Record<string, any>,
  ...children: Blueprint[]
): ElementBlueprint {
  return mkElement(
    {
      name: tag,
      namespace: "http://www.w3.org/2000/svg",
    },
    attrs,
    ...children,
  );
}

export function build(blueprint: BB): any {
  if (typeof blueprint == "string") {
    return document.createTextNode(blueprint);
  }

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
    if (typeof bp == "object" && bp.type == "Signal") {
      const signalValue = bp.getValue();

      if (typeof signalValue == "string") {
        const textNode = document.createTextNode(signalValue);
        runAndObserve(bp as Signal<string>, (v) => {
          textNode.nodeValue = v as string;
        });
        element.appendChild(textNode);
        return;
      }

      if (Array.isArray(signalValue)) {
        let lastElements: Element[] | null = null;
        const elementsStartIndex = element.childNodes.length;

        runAndObserve(bp as Signal<BB[] | Element[]>, (elementSetters) => {
          const elements = elementSetters.map((e) => {
            return isBB(e) ? build(e) : e;
          });

          if (lastElements !== null) {
            const childNodes = [...element.childNodes];
            childNodes.splice(
              elementsStartIndex,
              lastElements.length,
              ...elements,
            );
            element.replaceChildren(...childNodes);
          } else {
            elements.forEach((el) => {
              element.appendChild(el);
            });
          }

          lastElements = elements;
        });

        return;
      }

      let lastElement: Element | null = null;
      runAndObserve(bp, (elSetter: any) => {
        const el = build(elSetter as ElementBlueprint);
        if (lastElement !== null) {
          element.replaceChild(el, lastElement);
        } else {
          element.appendChild(el);
        }

        lastElement = el;
      });

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
    runAndObserve(value, (v: string) => {
      applyPrimitive(v);
    });
    return;
  }

  applyPrimitive(value);
}
