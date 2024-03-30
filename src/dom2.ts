import { Signal, observe } from "./core";
import { runAndObserve } from "./helpers";
import { isNullOrUndef, isSignal } from "./utils";

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

export type ObAttrs = Record<string, string | (() => void)>;

//export function bind(element: Element, attrs: Record<string, Setter>) {
//
//}

export type ObChildren = (Node | Signal<Node>)[];

export function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: ObAttrs,
  ...children: ObChildren
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];

    if (typeof value === "string") {
      element.setAttribute(key, value);
      return;
    }

    if (key.startsWith("on_")) {
      const eventName = key.substring(3);

      //if (eventName == "created") {
      //  setOnMounted(value);
      //} else {
      element.addEventListener(eventName, value);
      //}

      return;
    }
  });

  children.forEach((child) => {
    if (isSignal<Node>(child)) {
      //child is Signal<Node>
      let lastElement: Node | null = null;
      runAndObserve(child, (el: Node) => {
        if (lastElement !== null) {
          element.replaceChild(el, lastElement);
        } else {
          element.appendChild(el);
        }

        lastElement = el;
      });
    } else {
      //child is Node
      element.appendChild(child);
    }
  });

  return element;
}

//function mkSvgElement(
//  tagName: string,
//  attrs: Record<string, Setter>,
//  ...children: Node[]
//): SVGElement {
//  const element = document.createElementNS(
//    "http://www.w3.org/2000/svg",
//    tagName,
//  );
//
//  children.forEach((e) => element.appendChild(e));
//
//  return element;
//}

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
