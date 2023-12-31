//
//export type NullOrUndef = null | undefined;
//type StdElement = HTMLElement | SVGElement;
//
//export interface LifecycleCallbacks {
//  onMounted: () => void;
//  onAfterMounted: () => void;
//  onUnmounted: () => void;
//}
//export function emptyLifecycleCallbacks(): LifecycleCallbacks {
//  return {
//    onMounted: () => {},
//    onAfterMounted: () => {},
//    onUnmounted: () => {},
//  };
//}
//
//export interface ObservusElement<A extends StdElement> {
//  kind: "ObservusElement";
//  el: A;
//  children: ObservusElement<A>[];
//  freeResourcesFns: Array<() => void>;
//  isMounted: boolean;
//  lifecycle: LifecycleCallbacks;
//}
////TODO: any?!
//function emptyObservusElement<A extends StdElement>(
//  el: any,
//): ObservusElement<A> {
//  return {
//    kind: "ObservusElement",
//    el,
//    children: [],
//    freeResourcesFns: [],
//    isMounted: false,
//    lifecycle: emptyLifecycleCallbacks(),
//  };
//}
//
//export type AnyObservusElement = ObservusElement<StdElement>;
//
//export type AttrStringValue =
//  | string
//  | NullOrUndef
//  | Signal<string | NullOrUndef>;
//export type AttrNumberValue =
//  | number
//  | NullOrUndef
//  | Signal<number | NullOrUndef>;
//// setAttrFn is used when property-based attribute settings is impossible
//// for example: transform attribute on svg elements
//export type AttrSetStrategy = "property" | "setAttrFn";
//// if signal is null or undefined then property is removed
//export interface AttrSetter {
//  kind: "AttrSetter";
//  strategy: AttrSetStrategy;
//  name: string;
//  value: AttrStringValue;
//}
//export function attr(
//  name: string,
//  value: AttrStringValue,
//  strategy: AttrSetStrategy = "property",
//): AttrSetter {
//  return {
//    kind: "AttrSetter",
//    strategy,
//    name,
//    value,
//  };
//}
//export function numAttr(
//  name: string,
//  value: AttrNumberValue,
//  strategy: AttrSetStrategy = "property",
//): AttrSetter {
//  let strValue: AttrStringValue;
//
//  if (value == null || value == undefined) {
//    strValue = value;
//  } else if (typeof value == "number") {
//    strValue = value.toString();
//  } else {
//    strValue = value.map((v) =>
//      v == undefined || v == null ? v : v.toString(),
//    );
//  }
//
//  return attr(name, strValue, strategy);
//}
//
//export interface BoolAttrSetter {
//  kind: "BoolAttrSetter";
//  name: string;
//  value: boolean | Signal<boolean>;
//}
//export function boolAttr(
//  name: string,
//  value: boolean | Signal<boolean>,
//): BoolAttrSetter {
//  return {
//    kind: "BoolAttrSetter",
//    name,
//    value,
//  };
//}
//
//export interface TextSignalSetter {
//  kind: "TextSignalSetter";
//  value: Signal<string>;
//}
//export function textSignal(value: Signal<string>): TextSignalSetter {
//  return {
//    kind: "TextSignalSetter",
//    value,
//  };
//}
//
////TODO: better type:
////addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
//export interface EventListenerSetter {
//  kind: "EventListenerSetter";
//  type: string;
//  listener: <A extends Event>(e: A) => void;
//  options?: boolean | AddEventListenerOptions;
//}
//export function on(
//  type: string,
//  listener: (e: Event) => void,
//  options?: boolean | AddEventListenerOptions,
//): EventListenerSetter {
//  return {
//    kind: "EventListenerSetter",
//    type,
//    listener,
//    options,
//  };
//}
//
////TODO: better name: elementSignal?
//export interface TagSignalSetter {
//  kind: "TagSignalSetter";
//  value: Signal<AnyObservusElement>;
//}
//export function tagSignal(value: Signal<AnyObservusElement>): TagSignalSetter {
//  return {
//    kind: "TagSignalSetter",
//    value,
//  };
//}
//
//export interface TagsSignalSetter {
//  kind: "TagsSignalSetter";
//  value: Signal<AnyObservusElement[]>;
//}
//export function tagsSignal(
//  value: Signal<AnyObservusElement[]>,
//): TagsSignalSetter {
//  return {
//    kind: "TagsSignalSetter",
//    value,
//  };
//}
//
//export interface WithRefSetter {
//  kind: "WithRefSetter";
//  fn: (el: StdElement) => Setter;
//}
//export function withRef(fn: (el: StdElement) => Setter): WithRefSetter {
//  return {
//    kind: "WithRefSetter",
//    fn,
//  };
//}
//
//export interface MountedCallbackSetter {
//  kind: "MountedCallbackSetter";
//  fn: (el: StdElement) => void;
//}
//export function onMounted(fn: (el: StdElement) => void): MountedCallbackSetter {
//  return {
//    kind: "MountedCallbackSetter",
//    fn,
//  };
//}
//
//export interface AfterMountedCallbackSetter {
//  kind: "AfterMountedCallbackSetter";
//  fn: (el: StdElement) => void;
//}
//export function onAfterMounted(
//  fn: (el: StdElement) => void,
//): AfterMountedCallbackSetter {
//  return {
//    kind: "AfterMountedCallbackSetter",
//    fn,
//  };
//}
//
//export interface UnmountedCallbackSetter {
//  kind: "UnmountedCallbackSetter";
//  fn: () => void;
//}
////TODO: maybe better call it onFree?
//export function onUnmounted(fn: () => void): UnmountedCallbackSetter {
//  return {
//    kind: "UnmountedCallbackSetter",
//    fn,
//  };
//}
//
//export type Setter =
//  | AnyObservusElement
//  | string
//  | TextSignalSetter
//  | AttrSetter
//  | BoolAttrSetter
//  | EventListenerSetter
//  | TagSignalSetter
//  | TagsSignalSetter
//  | WithRefSetter
//  | MountedCallbackSetter
//  | AfterMountedCallbackSetter
//  | UnmountedCallbackSetter;
//
//function callOnMountedOnTree(el: AnyObservusElement) {
//  let wasMounted = el.isMounted;
//  if (!wasMounted) {
//    el.isMounted = true;
//    el.lifecycle.onMounted();
//  }
//
//  el.children.forEach((child) => {
//    callOnMountedOnTree(child);
//  });
//
//  if (!wasMounted) {
//    el.lifecycle.onAfterMounted();
//  }
//}
//
///* clear resource bind to element */
//export function free(el: AnyObservusElement) {
//  if (el.isMounted) {
//    el.isMounted = false;
//    el.lifecycle.onMounted();
//    el.freeResourcesFns.forEach((fn) => {
//      fn();
//    });
//  }
//  el.children.forEach((child) => {
//    free(child);
//  });
//}
//
//export function mount(root: Element, el: AnyObservusElement) {
//  root.appendChild(el.el);
//  callOnMountedOnTree(el);
//}
//
//export type Children = Setter[];
//
//export function tag<A extends HTMLElement>(name: string, ...ch: Children) {
//  return createTag<A>(name, false, ...ch);
//}
//export function svgTag<A extends SVGElement>(name: string, ...ch: Children) {
//  return createTag<A>(name, true, ...ch);
//}
//
//function createTag<A extends StdElement>(
//  name: string,
//  isSvg: boolean,
//  ...setters: Children
//): ObservusElement<A> {
//  const observusElement = emptyObservusElement<A>(
//    isSvg
//      ? document.createElementNS("http://www.w3.org/2000/svg", name)
//      : document.createElement(name),
//  );
//
//  for (const setter of setters) {
//    handleSetter(setter, observusElement);
//  }
//
//  return observusElement;
//}
//
//function handleSetter(setter: Setter, o: AnyObservusElement) {
//  function appendChild(child: AnyObservusElement) {
//    o.el.appendChild(child.el);
//    o.children.push(child);
//  }
//
//  if (typeof setter === "string") {
//    appendChild(emptyObservusElement(document.createTextNode(setter)));
//    return;
//  }
//
//  if (setter.kind == "ObservusElement") {
//    appendChild(setter);
//  }
//
//  if (setter.kind == "TextSignalSetter") {
//    const textNode = document.createTextNode(setter.value.getValue());
//    const unobserve = observe(setter.value, (v) => {
//      textNode.nodeValue = v;
//    });
//    const observusElement = emptyObservusElement(textNode);
//    observusElement.freeResourcesFns.push(unobserve);
//    appendChild(observusElement);
//  }
//
//  //using property-based attribute setting as default
//  //setAttribute is needed for non-standard and readonly attributes
//  if (setter.kind == "AttrSetter") {
//    if (setter.value === null || setter.value === undefined) {
//      return;
//    }
//    if (typeof setter.value == "string") {
//      if (setter.strategy == "setAttrFn") {
//        o.el.setAttribute(setter.name, setter.value);
//      } else {
//        // @ts-ignore
//        o.el[setter.name] = setter.value;
//      }
//    } else {
//      const unobserve = observe(setter.value, (v) => {
//        if (v !== null && v !== undefined) {
//          if (setter.strategy == "setAttrFn") {
//            o.el.setAttribute(setter.name, v);
//          } else {
//            // @ts-ignore
//            o.el[setter.name] = v;
//          }
//        } else {
//          // should work for both cases, i hope
//          o.el.removeAttribute(setter.name);
//        }
//      });
//      o.freeResourcesFns.push(unobserve);
//    }
//  }
//
//  if (setter.kind == "BoolAttrSetter") {
//    if (typeof setter.value == "boolean") {
//      // @ts-ignore
//      o.el[setter.name] = setter.value;
//    } else {
//      //maybe removing attr is safer than setting false?
//      const unobserve = observe(setter.value, (v) => {
//        // @ts-ignore
//        o.el[setter.name] = v;
//      });
//      o.freeResourcesFns.push(unobserve);
//    }
//  }
//
//  if (setter.kind == "EventListenerSetter") {
//    o.el.addEventListener(setter.type, setter.listener, setter.options);
//    o.freeResourcesFns.push(() => {
//      o.el.removeEventListener(setter.type, setter.listener, setter.options);
//    });
//  }
//
//  if (setter.kind == "TagSignalSetter") {
//    let lastValue: AnyObservusElement | null = null;
//    const unobserve = observe(setter.value, (observusEl) => {
//      if (lastValue !== null) {
//        //TODO: use splice to avoid copy?
//        o.children = o.children.map((child) =>
//          child === lastValue ? observusEl : child,
//        );
//        o.el.replaceChild(observusEl.el, lastValue.el);
//      } else {
//        appendChild(observusEl);
//      }
//
//      if (o.isMounted) {
//        callOnMountedOnTree(observusEl);
//      }
//
//      lastValue = observusEl;
//    });
//    o.freeResourcesFns.push(unobserve);
//  }
//
//  if (setter.kind == "TagsSignalSetter") {
//    let lastValue: AnyObservusElement[] | null = null;
//    const childrenStartIdx = o.children.length;
//
//    const unobserve = observe(setter.value, (els) => {
//      if (lastValue !== null) {
//        const childNodes = [...o.el.childNodes];
//        childNodes.splice(
//          childrenStartIdx,
//          lastValue.length,
//          ...els.map((e) => e.el),
//        );
//        o.children.splice(childrenStartIdx, lastValue.length, ...els);
//
//        o.el.replaceChildren(...childNodes);
//      } else {
//        els.forEach((el) => {
//          appendChild(el);
//        });
//      }
//
//      if (o.isMounted) {
//        els.forEach((el) => {
//          callOnMountedOnTree(el);
//        });
//      }
//
//      lastValue = els;
//    });
//
//    o.freeResourcesFns.push(unobserve);
//  }
//
//  if (setter.kind == "WithRefSetter") {
//    const newSetter = setter.fn(o.el);
//    handleSetter(newSetter, o);
//  }
//
//  if (setter.kind == "MountedCallbackSetter") {
//    o.lifecycle.onMounted = () => {
//      setter.fn(o.el);
//    };
//  }
//
//  if (setter.kind == "AfterMountedCallbackSetter") {
//    o.lifecycle.onAfterMounted = () => {
//      setter.fn(o.el);
//    };
//  }
//
//  if (setter.kind == "UnmountedCallbackSetter") {
//    o.lifecycle.onUnmounted = () => {
//      setter.fn();
//    };
//  }
//}
