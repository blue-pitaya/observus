import { observe } from "./core";

export function mkElement(tag: any, attrs: any, ...children: any[]) {
  let tagNamespace = null;
  let tagName = tag;

  if (tag.namespace) {
    tagName = tag.name;
    tagNamespace = tag.namespace;
  }

  return {
    type: "ElementSetter",
    tagNamespace,
    tagName,
    attrs,
    children,
  };
}

export function build(elementSetter: any): Element {
  let element: Element;

  if (elementSetter.tagNamespace == null) {
    element = document.createElement(elementSetter.tagName);
  } else {
    element = document.createElementNS(
      elementSetter.tagNamespace,
      elementSetter.tagName,
    );
  }

  const attrs = elementSetter.attrs;
  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];

    if (!value) {
      return;
    }

    if (typeof value === "string") {
      //@ts-ignore
      element[key] = value;
      return;
    }

    if (value.type == "signal") {
      const onChange = (v: any) => {
        //@ts-ignore
        element[key] = v;
      };
      observe(value.state, value.property, onChange, {
        call: true,
      });
    }
  });

  elementSetter.children.forEach((child: any) => {
    if (!child) {
      return;
    }

    if (child.type == "ElementSetter") {
      element.appendChild(build(child));
    } else if (child.type == "signal") {
      let lastElement: Element | null = null;

      observe(
        child.state,
        child.property,
        (elSetter) => {
          const el = build(elSetter);
          if (lastElement !== null) {
            element.replaceChild(el, lastElement);
          } else {
            element.appendChild(el);
          }
          lastElement = el;
        },
        {
          call: true,
        },
      );
    }
  });

  return element;
}
