import { Signal } from "./core";
import { runAndObserve } from "./helpers";
import { isSignal } from "./utils";

export interface ObservusTrait {
  name: string;
  callback: (e: Element) => void;
}

export function installTraits(...traits: ObservusTrait[]) {
  const elements = document.querySelectorAll("[ob-use]");

  console.log(elements);

  elements.forEach((element) => {
    const traitNames = (element.getAttribute("ob-use") ?? "").split(" ");
    traitNames.forEach((traitName) => {
      const trait = traits.find((v) => v.name == traitName);
      if (trait) {
        trait.callback(element);
      }
    });
  });
}

export type ObAttrs = Record<string, any>;

export type ObChildren = (Node | Signal<Node> | Signal<Element[]>)[];

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
  Object.keys(attrs).forEach((attrKey) => {
    const attrValue = attrs[attrKey];

    const setAttr = (v: any) => {
      //TODO: also allow element.setAttribute(...)
      //@ts-ignore
      element[attrKey] = v;
    };

    if (typeof attrValue === "string") {
      setAttr(attrValue);
      return;
    }

    if (isSignal<string>(attrValue)) {
      runAndObserve(attrValue, (value) => {
        console.log(value);
        setAttr(value);
      });
    }

    if (attrKey.startsWith("on_")) {
      const eventName = attrKey.substring(3);

      //TODO:
      //if (eventName == "created") {
      //  setOnMounted(value);
      //} else {
      element.addEventListener(eventName, attrValue);
      //}

      return;
    }
  });

  children.forEach((child) => {
    if (isSignal<any>(child)) {
      if (Array.isArray(child.getValue())) {
        //Signal<Node[]>
        const nodesSignal = child as Signal<Node[]>;
        let lastElements: Element[] | null = null;
        const elementsStartIndex = element.childNodes.length;

        runAndObserve(nodesSignal, (nodes) => {
          //FIXME: type quick hack
          const elements = nodes as Element[];
          if (lastElements !== null) {
            const childNodes = [...element.childNodes];
            childNodes.splice(
              elementsStartIndex,
              lastElements.length,
              ...elements,
            );
            element.replaceChildren(...childNodes);
          } else {
            nodes.forEach((el) => {
              element.appendChild(el);
            });
          }

          lastElements = elements;
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

  return element;
}

export function mkText(value: string | Signal<string>): Text {
  if (isSignal<string>(value)) {
    const node = document.createTextNode(value.getValue());

    runAndObserve(value, (v) => {
      node.textContent = v;
    });

    return node;
  }

  return document.createTextNode(value);
}
