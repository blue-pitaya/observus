import { Signal, observe, state } from "./ca";

interface AttrSetter {
  kind: "AttrSetter";
  name: string;
  value: string | Signal<string>;
}

interface TextSetter {
  kind: "TextSetter";
  value: string | Signal<string>;
}

interface EventListenerSetter {
  kind: "EventListenerSetter";
  type: string;
  listener: EventListenerOrEventListenerObject;
  options?: boolean | AddEventListenerOptions;
}

interface TagSignalSetter {
  kind: "TagSignalSetter";
  value: Signal<Element>;
}

type Tag =
  | HTMLElement
  | SVGElement
  | TextSetter
  | AttrSetter
  | EventListenerSetter
  | TagSignalSetter;

// setAttributeNS may be necessary for svg elements
function createTag(
  name: string,
  isSvg: boolean,
  ...children: Array<Tag>
): HTMLElement | SVGElement {
  const result = isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", name)
    : document.createElement(name);

  for (const child of children) {
    if ("kind" in child) {
      if (child.kind == "TextSetter") {
        if (typeof child.value == "string") {
          result.appendChild(document.createTextNode(child.value));
        } else {
          const textNode = document.createTextNode(child.value.getValue());
          result.appendChild(textNode);
          observe(child.value, (v) => {
            textNode.nodeValue = v;
          });
        }
      } else if (child.kind == "AttrSetter") {
        if (typeof child.value == "string") {
          result.setAttribute(child.name, child.value);
        } else {
          observe(child.value, (v) => {
            result.setAttribute(child.name, v);
          });
        }
      } else if (child.kind == "EventListenerSetter") {
        result.addEventListener(child.type, child.listener, child.options);
      } else if (child.kind == "TagSignalSetter") {
        //TODO: clear event listeners and observables on children
        let lastValue: Element | null = null;
        observe(child.value, (el) => {
          if (lastValue !== null) {
            result.replaceChild(el, lastValue);
          } else {
            result.appendChild(el);
          }
          lastValue = el;
        });
      }
    } else {
      result.appendChild(child);
    }
  }

  return result;
}

//TODO: updateRef (to update in imperativ fashion)

export const tag = (name: string, ...children: Array<Tag>) =>
  createTag(name, false, ...children) as HTMLElement;
export const svgTag = (name: string, ...children: Array<Tag>) =>
  createTag(name, true, ...children) as SVGElement;
export const text = (value: string | Signal<string>): TextSetter => ({
  kind: "TextSetter",
  value,
});
export const attr = (
  name: string,
  value: string | Signal<string>,
): AttrSetter => ({
  kind: "AttrSetter",
  name,
  value,
});
export const on = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): EventListenerSetter => ({
  kind: "EventListenerSetter",
  type,
  listener,
  options,
});
export const tagSignal = (value: Signal<Element>): TagSignalSetter => ({
  kind: "TagSignalSetter",
  value,
});
