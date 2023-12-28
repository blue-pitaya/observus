import { Signal, State, observe } from "./observus-core";

class BindingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BindingError";
  }
}

function invalidTagNameError(
  elementTagName: string,
  bindingTagName: string,
): BindingError {
  return new BindingError(
    `Element tag name "${elementTagName}" and binding tag name "${bindingTagName}" dont match.`,
  );
}

export interface TagBinder<A extends HTMLElement> {
  kind: "TagBinder";
  tagName: string;
  el?: A;
  children: Binder[];
}

export interface TextBinder {
  kind: "TextBinder";
  signal: Signal<string>;
  update: (v: string) => void;
}

export interface TagListBinding {}

export interface AttrBinding {
  kind: "AttrBinding";
  attrName: string;
  signal: Signal<string>;
  update: (v: string) => void;
}

export type Binder = TagBinder<HTMLElement> | TextBinder | AttrBinding;

export function bindTag<A extends HTMLElement>(
  name: string,
  ...ch: Binder[]
): TagBinder<A> {
  return {
    tagName: name,
    kind: "TagBinder",
    children: ch,
  };
}

//TODO: helper function for State<string>?
export function bindText(
  signal: Signal<string>,
  update: (v: string) => void,
): TextBinder {
  return {
    kind: "TextBinder",
    signal,
    update,
  };
}

export function bindAttr(
  name: string,
  signal: Signal<string>,
  update: (v: string) => void,
): AttrBinding {
  return {
    kind: "AttrBinding",
    attrName: name,
    signal,
    update,
  };
}

export function bindTagList<A>(
  tagTemplate: TagBinder<HTMLElement>,
  listState: State<State<A>[]>,
): TagListBinding {
  return {};
}

function namesEqual(node: Node, binding: TagBinder<HTMLElement>): boolean {
  return node.nodeName.toUpperCase() == binding.tagName.toUpperCase();
}

function nodeIsElement(v: Node): v is Element {
  return v.nodeType == Node.ELEMENT_NODE;
}

function nodeIsText(v: Node): v is Text {
  return v.nodeType == Node.TEXT_NODE;
}

export function bindToDom(
  el: HTMLElement,
  binding: TagBinder<HTMLElement>,
): void {
  if (!namesEqual(el, binding)) {
    throw invalidTagNameError(el.tagName, binding.tagName);
  }

  binding.el = el;

  const elChildNodes = el.childNodes;
  let childNodeIdx = 0;

  binding.children.forEach((childBinding) => {
    if (childNodeIdx >= elChildNodes.length) {
      throw new BindingError("elements not found");
    }

    while (childNodeIdx < elChildNodes.length) {
      const childEl = elChildNodes[childNodeIdx];

      if (
        childBinding.kind == "TagBinder" &&
        nodeIsElement(childEl) &&
        namesEqual(childEl, childBinding)
      ) {
        //FIXME: fake HTML type
        bindToDom(childEl as HTMLElement, childBinding);
        break;
      }

      if (childBinding.kind == "TextBinder" && nodeIsText(childEl)) {
        if (childEl.textContent == null) {
          throw new BindingError("bad text content");
        }
        childBinding.update(childEl.textContent);
        //TODO: make sure callback is not fired immidetaly
        observe(childBinding.signal, (v) => {
          childEl.textContent = v;
        });
        break;
      }

      if (childBinding.kind == "AttrBinding") {
        const attrValue = el.getAttribute(childBinding.attrName)
        if (attrValue == null) {
          throw new BindingError("missing attribute attribute");
        }

        childBinding.update(attrValue);
        //TODO: make sure callback is not fired immidetaly
        observe(childBinding.signal, (v) => {
          //TODO: add strategy similar as in normal observus
          el.setAttribute(childBinding.attrName, v);
        });
        break;
      }

      childNodeIdx++;
    }
  });
}
