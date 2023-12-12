import { Signal } from "./observus-core";

type TagNamespace = "http://www.w3.org/2000/svg" | undefined;

interface TagSetter {
  kind: "tag";
  namespace: TagNamespace;
  name: string;
  attrs: AttrSetter[];
  children: (TagSetter | TextSetter)[];
}

interface TextSetter {
  kind: "text";
  value: string;
}

interface AttrSetter {
  kind: "attr";
  name: string;
  value: string;
  setStrategy: "property" | "setAttrFn";
}

interface VarAttrSetter {
  kind: "var-attr";
  name: string;
  value: string;
  setStrategy: "property" | "setAttrFn";
}

type Setter = TagSetter | TextSetter | AttrSetter;

function bindAttr(element: Element, attrName: string, signal: Signal<string>) {

}

function tag(name: string, ns: TagNamespace, ...children: Setter[]): TagSetter {
  const t: TagSetter = {
    kind: "tag",
    namespace: ns,
    name: name,
    attrs: [],
    children: [],
  };

  children.forEach((ch) => {
    if (ch.kind == "attr") {
      t.attrs.push(ch);
    } else {
      t.children.push(ch);
    }
  });

  return t;
}

function create(document: Document, root: TagSetter | TextSetter): Node {
  function setAttr(e: Element, s: AttrSetter) {
    if (s.setStrategy == "setAttrFn") {
      e.setAttribute(s.name, s.value);
    } else {
      // @ts-ignore
      e[s.name] = s.value;
    }
  }

  if (root.kind == "tag") {
    const el = root.namespace
      ? document.createElementNS(root.namespace, root.name)
      : document.createElement(root.name);

    root.attrs.forEach((ch) => {
      setAttr(el, ch);
    });
    root.children.forEach((ch) => {
      el.appendChild(create(document, ch));
    });

    return el;
  } else {
    return document.createTextNode(root.value);
  }
}
