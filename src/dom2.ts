import { Signal, observe } from "./core";

type Setter = any;

export function bind(element: Element, attrs: Record<string, Setter>) {

}

function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attrs: Record<string, Setter>,
  ...children: Node[]
): HTMLElement {
  const element = document.createElement(tagName);

  children.forEach((e) => element.appendChild(e));

  return element;
}

function mkSvgElement(
  tagName: string,
  attrs: Record<string, Setter>,
  ...children: Node[]
): SVGElement {
  const element = document.createElementNS(
    "http://www.w3.org/2000/svg",
    tagName,
  );

  children.forEach((e) => element.appendChild(e));

  return element;
}

function mkText(signal: Signal<string>): Text {
  const node = document.createTextNode(signal.getValue());

  observe(signal, (value) => {
    node.textContent = value;
  });

  return node;
}
