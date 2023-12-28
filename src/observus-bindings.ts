import { State, observe } from "./observus-core";
import { div, li, ul } from "./observus-tags";

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
  state: State<string>;
}

export type Binder = TagBinder<HTMLElement> | TextBinder;

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

export function bindText(state: State<string>): TextBinder {
  return {
    kind: "TextBinder",
    state,
  };
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

  console.log(binding);
  console.log(el);
  console.log(el.id);

  const elChildNodes = el.childNodes;
  let childNodeIdx = 0;

  binding.children.forEach((child) => {
    if (childNodeIdx >= elChildNodes.length) {
      throw new BindingError("elements not found");
    }

    while (childNodeIdx < elChildNodes.length) {
      const childEl = elChildNodes[childNodeIdx];

      if (
        child.kind == "TagBinder" &&
        nodeIsElement(childEl) &&
        namesEqual(childEl, child)
      ) {
        //FIXME: fake HTML type
        bindToDom(childEl as HTMLElement, child);
        break;
      }

      if (child.kind == "TextBinder" && nodeIsText(childEl)) {
        if (childEl.textContent == null) {
          throw new BindingError("bad text content");
        }
        child.state.set(childEl.textContent);
        observe(child.state.signal(), (v) => {
          childEl.textContent = v;
        });
        break;
      }

      childNodeIdx++;
    }
  });
}
