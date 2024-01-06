//import {
//  AnyObservusElement,
//  AttrSetStrategy,
//  AttrStringValue,
//  EventListenerSetter,
//  NullOrUndef,
//  Signal,
//  observe,
//} from "./observus-core";
//
//export interface TagBinding {
//  kind: "TagBinding";
//  selector: string;
//  el?: HTMLElement;
//  children: Binding[];
//}
//
//export interface TextBinding {
//  kind: "TextBinding";
//  signal?: Signal<string>;
//  fn?: (v: string) => void;
//}
//
//export interface AttrBinding {
//  kind: "AttrBinding";
//  name: string;
//  fn?: SetNullableStringFn;
//  value: AttrStringValue;
//  strategy: AttrSetStrategy;
//}
//
//export interface GetAttrBinding {
//  kind: "GetAttrBinding";
//  name: string;
//  fn: SetNullableStringFn;
//}
//
//export interface ElementSignalSetter {
//  kind: "ElemntSignalSetter";
//  value: Signal<AnyObservusElement | NullOrUndef>;
//}
//
//export type Binding =
//  | TagBinding
//  | TextBinding
//  | AttrBinding
//  | GetAttrBinding
//  | EventListenerSetter;
//
//type SetStringFn = (v: string) => void;
//type SetNullableStringFn = (v: string | null) => void;
//
//export function getAttr(name: string, fn: SetNullableStringFn): GetAttrBinding {
//  return {
//    kind: "GetAttrBinding",
//    name,
//    fn,
//  };
//}
//
//export function bindAttr(
//  name: string,
//  value: AttrStringValue,
//  fn?: SetNullableStringFn,
//  strategy?: AttrSetStrategy,
//): AttrBinding {
//  return {
//    kind: "AttrBinding",
//    name,
//    fn,
//    value,
//    strategy: strategy ?? "property",
//  };
//}
//
//export function bind(
//  querySelector: string,
//  ...children: Binding[]
//): TagBinding {
//  return {
//    kind: "TagBinding",
//    selector: querySelector,
//    children,
//  };
//}
//
////TODO: nullable if there is no text?
//export function getText(fn: SetStringFn): TextBinding {
//  return {
//    kind: "TextBinding",
//    fn,
//  };
//}
//
//export function bindText(
//  signal: Signal<string>,
//  fn?: (v: string) => void,
//): TextBinding {
//  return {
//    kind: "TextBinding",
//    signal,
//    fn,
//  };
//}
//
//export function mountBinding(binding: TagBinding): void {
//  const root = document.querySelector(binding.selector);
//  if (root == null) {
//    throw new Error("invalid selector");
//  }
//
//  mountBindings(root, ...binding.children);
//}
//
//export function mountBindings(root: Element, ...bindings: Binding[]): void {
//  bindings.forEach((binding) => {
//    if (binding.kind == "TagBinding") {
//      const child = root.querySelector(binding.selector);
//      if (child == null) {
//        throw new Error("invalid selector");
//      }
//
//      mountBindings(child, ...binding.children);
//    }
//
//    if (binding.kind == "TextBinding") {
//      const content = root.textContent;
//      if (content == null) {
//        throw new Error("no text content");
//      }
//
//      if (binding.fn !== undefined) {
//        binding.fn(content);
//      }
//      if (binding.signal !== undefined) {
//        //TODO: allow user to set in options if it should fire immidetaly
//        observe(binding.signal, (v) => {
//          root.textContent = v;
//        });
//      }
//    }
//
//    if (binding.kind == "GetAttrBinding") {
//      binding.fn(root.getAttribute(binding.name));
//    }
//
//    if (binding.kind == "EventListenerSetter") {
//      root.addEventListener(binding.type, binding.listener, binding.options);
//    }
//
//    //FIXME: code dup
//    //using property-based attribute setting as default
//    //setAttribute is needed for non-standard and readonly attributes
//    if (binding.kind == "AttrBinding") {
//      if (binding.fn !== undefined) {
//        binding.fn(root.getAttribute(binding.name));
//      }
//
//      //TODO: remove attribute?
//      if (binding.value === null || binding.value === undefined) {
//        return;
//      }
//      if (typeof binding.value == "string") {
//        if (binding.strategy == "setAttrFn") {
//          root.setAttribute(binding.name, binding.value);
//        } else {
//          // @ts-ignore
//          root[binding.name] = binding.value;
//        }
//      } else {
//        observe(binding.value, (v) => {
//          if (v !== null && v !== undefined) {
//            if (binding.strategy == "setAttrFn") {
//              root.setAttribute(binding.name, v);
//            } else {
//              // @ts-ignore
//              root[binding.name] = v;
//            }
//          } else {
//            // should work for both cases, i hope
//            root.removeAttribute(binding.name);
//          }
//        });
//      }
//    }
//  });
//}
//
//// OLD
////class BindingError extends Error {
////  constructor(message: string) {
////    super(message);
////    this.name = "BindingError";
////  }
////}
////
////function invalidTagNameError(
////  elementTagName: string,
////  bindingTagName: string,
////): BindingError {
////  return new BindingError(
////    `Element tag name "${elementTagName}" and binding tag name "${bindingTagName}" dont match.`,
////  );
////}
////
////export interface TagBinder<A extends HTMLElement> {
////  kind: "TagBinder";
////  tagName: string;
////  el?: A;
////  children: Binder[];
////}
////
////export interface TextBinder {
////  kind: "TextBinder";
////  signal: Signal<string>;
////  update: (v: string) => void;
////}
////
////export interface TagListBinding {}
////
////export interface AttrBinding {
////  kind: "AttrBinding";
////  attrName: string;
////  signal: Signal<string>;
////  update: (v: string) => void;
////}
////
////export type Binder =
////  | TagBinder<HTMLElement>
////  | TextBinder
////  | AttrBinding
////  | EventListenerSetter;
////
////export function bindTag<A extends HTMLElement>(
////  name: string,
////  ...ch: Binder[]
////): TagBinder<A> {
////  return {
////    tagName: name,
////    kind: "TagBinder",
////    children: ch,
////  };
////}
////
//////TODO: helper function for State<string>?
////export function bindText(
////  signal: Signal<string>,
////  update: (v: string) => void,
////): TextBinder {
////  return {
////    kind: "TextBinder",
////    signal,
////    update,
////  };
////}
////
////export function bindAttr(
////  name: string,
////  signal: Signal<string>,
////  update: (v: string) => void,
////): AttrBinding {
////  return {
////    kind: "AttrBinding",
////    attrName: name,
////    signal,
////    update,
////  };
////}
////
////export function bindTagList<A>(
////  stateBuilder: (s: State<A>) => TagBinder<HTMLElement>,
////  listState: State<State<A>[]>,
////): TagListBinding {
////  return {};
////}
////
////function namesEqual(node: Node, binding: TagBinder<HTMLElement>): boolean {
////  return node.nodeName.toUpperCase() == binding.tagName.toUpperCase();
////}
////
////function nodeIsElement(v: Node): v is Element {
////  return v.nodeType == Node.ELEMENT_NODE;
////}
////
////function nodeIsText(v: Node): v is Text {
////  return v.nodeType == Node.TEXT_NODE;
////}
////
////export function bindToDom(
////  el: HTMLElement,
////  binding: TagBinder<HTMLElement>,
////): void {
////  if (!namesEqual(el, binding)) {
////    throw invalidTagNameError(el.tagName, binding.tagName);
////  }
////
////  binding.el = el;
////
////  const elChildNodes = el.childNodes;
////  let childNodeIdx = 0;
////
////  binding.children.forEach((childBinding) => {
////    if (childNodeIdx >= elChildNodes.length) {
////      throw new BindingError("elements not found");
////    }
////
////    while (childNodeIdx < elChildNodes.length) {
////      const childEl = elChildNodes[childNodeIdx];
////
////      if (
////        childBinding.kind == "TagBinder" &&
////        nodeIsElement(childEl) &&
////        namesEqual(childEl, childBinding)
////      ) {
////        //FIXME: fake HTML type
////        bindToDom(childEl as HTMLElement, childBinding);
////        break;
////      }
////
////      if (childBinding.kind == "TextBinder" && nodeIsText(childEl)) {
////        if (childEl.textContent == null) {
////          throw new BindingError("bad text content");
////        }
////        childBinding.update(childEl.textContent);
////        //TODO: make sure callback is not fired immidetaly
////        observe(childBinding.signal, (v) => {
////          childEl.textContent = v;
////        });
////        break;
////      }
////
////      if (childBinding.kind == "AttrBinding") {
////        const attrValue = el.getAttribute(childBinding.attrName);
////        if (attrValue == null) {
////          throw new BindingError("missing attribute attribute");
////        }
////
////        childBinding.update(attrValue);
////        //TODO: make sure callback is not fired immidetaly
////        observe(childBinding.signal, (v) => {
////          //TODO: add strategy similar as in normal observus
////          el.setAttribute(childBinding.attrName, v);
////        });
////        break;
////      }
////
////      if (childBinding.kind == "EventListenerSetter") {
////        el.addEventListener(
////          childBinding.type,
////          childBinding.listener,
////          childBinding.options,
////        );
////      }
////
////      childNodeIdx++;
////    }
////  });
////}
