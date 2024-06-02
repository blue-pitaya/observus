import { Signal, isSignal, observe } from "./observus";

export type ObChildSetter = Node | Signal<any> | Signal<any[]>;

export type ObAttrs = Record<string, any>;

export type ObAttrsSetter = {
  type: "ObAttrsSetter";
  value: ObAttrs;
};

export type ObRefCallbackSetter = {
  type: "ObRefCallbackSetter";
  fn: (element: Element) => void;
};

export type ObEventListenerSetter = {
  type: "ObEventListenerSetter";
  eventName: string;
  fn: (element: Element) => void;
};

export type ObSetter =
  | ObChildSetter
  | ObAttrsSetter
  | ObRefCallbackSetter
  | ObEventListenerSetter;

export function _attrs(value: ObAttrs): ObAttrsSetter {
  return { type: "ObAttrsSetter", value };
}

export function _ref(fn: (element: Element) => void): ObRefCallbackSetter {
  return { type: "ObRefCallbackSetter", fn };
}

export function _on(eventName: string, fn: any): ObEventListenerSetter {
  return { type: "ObEventListenerSetter", eventName, fn };
}

export function bind<A extends Element>(element: A, ...setters: ObSetter[]): A {
  setters.forEach((setter) => {
    if ("type" in setter && setter.type == "ObAttrsSetter") {
      bindAttrs(element, setter.value);
    } else if ("type" in setter && setter.type == "ObRefCallbackSetter") {
      setter.fn(element);
    } else if ("type" in setter && setter.type == "ObEventListenerSetter") {
      //@ts-ignore
      element.addEventListener(setter.eventName, setter.fn);
    } else {
      bindChildren(element, setter);
    }
  });

  return element;
}

//TODO: also allow element.setAttribute(...) ?
export function bindAttrs<A extends Element>(element: A, attrs: ObAttrs) {
  Object.keys(attrs).forEach((attrKey) => {
    function setAttr(v: any) {
      //@ts-ignore
      element[attrKey] = v;
    }

    const attrValue = attrs[attrKey];

    if (isSignal(attrValue)) {
      observe(attrValue, () => {
        setAttr(attrValue.value);
      });
    } else {
      setAttr(attrValue);
    }
  });
}

export function bindChildren<A extends Element>(
  element: A,
  ...children: ObChildSetter[]
) {
  children.forEach((child) => {
    if (!isSignal(child)) {
      element.appendChild(child as Node);
      return;
    }

    if (Array.isArray(child.value)) {
      //Signal<Node[]>
      const nodesSignal = child as Signal<Node[]>;

      let lastElements: Node[] | null = null;
      const elementsStartIndex = element.childNodes.length;

      observe(nodesSignal, () => {
        const els = nodesSignal.value;
        if (lastElements !== null) {
          const childNodes = [...element.childNodes];
          childNodes.splice(
            elementsStartIndex,
            lastElements.length,
            //TODO: is it safe?
            ...(els as ChildNode[]),
          );
          element.replaceChildren(...childNodes);
        } else {
          els.forEach((el) => {
            element.appendChild(el);
          });
        }

        lastElements = els;
      });

      return;
    } else {
      //Signal<Node>
      const nodeSignal = child as Signal<Node>;

      let lastElement: Node | null = null;
      observe(nodeSignal, () => {
        const el = nodeSignal.value;
        if (lastElement !== null) {
          element.replaceChild(el, lastElement);
        } else {
          element.appendChild(el);
        }

        lastElement = el;
      });
    }
  });
}

export function mkText(value: string | Signal<string>): Text {
  if (typeof value === "object") {
    const node = document.createTextNode(value.value);

    observe(value, () => {
      node.textContent = value.value;
    });

    return node;
  }

  return document.createTextNode(value);
}

export function mkElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  ...setters: ObSetter[]
): HTMLElementTagNameMap[K] {
  return bind(document.createElement(tagName), ...setters);
}

export function mkSvgElement<K extends keyof SVGElementTagNameMap>(
  tagName: K,
  ...setters: ObSetter[]
): SVGElementTagNameMap[K] {
  return bind(
    document.createElementNS("http://www.w3.org/2000/svg", tagName),
    ...setters,
  );
}

export function install(name: string, fn: (e: Element) => void) {
  const elements = document.querySelectorAll("[ob-use]");

  elements.forEach((element) => {
    const traits = (element.getAttribute("ob-use") ?? "").split(" ");

    if (traits.find((x) => x == name)) {
      try {
        fn(element);
      } catch (e) {
        console.error(e);
      }
    }
  });
}
