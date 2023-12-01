//TODO: add .extend (like .amend in laminar)
//TODO: for all document.foo elements use type from these elements
export interface State<A> {
  value: A;
  observers: Array<Observer>;
  set: (v: A) => void;
  update: (f: (v: A) => A) => void;
  map: <B>(f: (v: A) => B) => Signal<B>;
  signal: () => Signal<A>;
}

export interface Observer {
  next: () => void;
}

export interface Signal<A> {
  sources: Array<State<any>>;
  getValue: () => A;
  map: <B>(f: (v: A) => B) => Signal<B>;
}

function mapState<A, B>(s: State<A>, f: (v: A) => B): Signal<B> {
  return {
    sources: [s],
    getValue: () => f(s.value),
    map(f) {
      return mapSignal(this, f);
    },
  };
}

function mapSignal<A, B>(s: Signal<A>, f: (v: A) => B): Signal<B> {
  return {
    ...s,
    getValue: () => f(s.getValue()),
    map: function <C>(g: (v: B) => C): Signal<C> {
      return mapSignal(this, g);
    },
  };
}

export function createState<A>(initialValue: A): State<A> {
  return {
    value: initialValue,
    observers: [],
    set(v) {
      this.update(() => v);
    },
    update(f) {
      this.value = f(this.value);
      this.observers.forEach((o) => o.next());
    },
    map(f) {
      return mapState(this, f);
    },
    signal() {
      return mapState(this, (x) => x);
    },
  };
}

export function constSignal<A>(v: A): Signal<A> {
  return {
    sources: [],
    getValue: () => v,
    map(f) {
      return mapSignal(this, f);
    },
  };
}

export type FreeFn = () => void;

/* returns "unobserve" function */
export function observe<A>(s: Signal<A>, next: (v: A) => void): FreeFn {
  const observer: Observer = {
    next: () => next(s.getValue()),
  };
  s.sources.forEach((state) => {
    state.observers.push(observer);
  });
  const unobserveFn = () => {
    s.sources.forEach((state) => {
      state.observers = state.observers.filter((o) => o !== observer);
    });
  };
  observer.next();

  return unobserveFn;
}

export function combine<A, B, C>(
  sa: Signal<A>,
  sb: Signal<B>,
  mapping: (a: A, b: B) => C,
): Signal<C> {
  return {
    sources: [...sa.sources, ...sb.sources],
    getValue: () => mapping(sa.getValue(), sb.getValue()),
    map(f) {
      return mapSignal(this, f);
    },
  };
}

/* defaultValue in case signals array is empty */
export function combineMany<A, B>(
  signals: Array<Signal<A>>,
  reduceFn: (acc: B, curr: A) => B,
  defaultValue: B,
): Signal<B> {
  let sources: Array<State<A>> = [];
  const getters: Array<() => A> = [];

  signals.forEach((s) => {
    sources = [...sources, ...s.sources];
    getters.push(() => s.getValue());
  });

  return {
    sources,
    getValue() {
      const values = getters.map((f) => f());
      return values.reduce(reduceFn, defaultValue);
    },
    map(f) {
      return mapSignal(this, f);
    },
  };
}

export interface StateUpdateFn<A> {
  state: State<A>;
  fn: (v: A) => A;
}
export function updateMany(...updates: Array<StateUpdateFn<any>>) {
  let observersToUpdate: Set<Observer> = new Set();
  updates.forEach((u) => {
    u.state.value = u.fn(u.state.value);
    u.state.observers.forEach((l) => observersToUpdate.add(l));
  });

  observersToUpdate.forEach((o) => o.next());
}

//TODO: could i use combine function to do this? xd
//TEST: observe must set value on proxyState immidetly
export function flatten<A>(
  superSignal: Signal<Signal<A>>,
): [Signal<A>, FreeFn] {
  const proxyState = createState<A | undefined>(undefined);
  let freeFn: () => void = () => {};
  const free2 = observe(superSignal, (signal) => {
    freeFn();
    freeFn = observe(signal, (v) => {
      proxyState.set(v);
    });
  });
  const totalFree = () => {
    freeFn();
    free2();
  };

  return [proxyState.signal() as Signal<A>, totalFree];
}

// DOM building

type StdElement = HTMLElement | SVGElement;

export interface ObservusElement<A extends StdElement> {
  kind: "ObservusElement";
  el: A;
  children: Array<ObservusElement<A>>;
  freeResourcesFns: Array<() => void>;
  isMounted: boolean;
  onMounted: () => void;
  onAfterMounted: () => void;
  onUnmounted: () => void;
}

export type AnyObservusElement = ObservusElement<StdElement>;

// setAttrFn is used when property-based attribute settings is impossible
// for example: transform attribute on svg elements
type AttrSetStrategy = "property" | "setAttrFn";

// if signal is null then property is removed
export interface AttrSetter {
  kind: "AttrSetter";
  strategy: AttrSetStrategy;
  name: string;
  value: string | Signal<string | null>;
}

export interface BoolAttrSetter {
  kind: "BoolAttrSetter";
  name: string;
  value: boolean | Signal<boolean>;
}

interface TextSetter {
  kind: "TextSetter";
  value: string | Signal<string>;
}

interface EventListenerSetter {
  kind: "EventListenerSetter";
  type: string;
  listener: <A extends Event>(e: A) => void;
  options?: boolean | AddEventListenerOptions;
}

interface TagSignalSetter {
  kind: "TagSignalSetter";
  value: Signal<AnyObservusElement>;
}

interface WithRefSetter {
  kind: "WithRefSetter";
  fn: (el: StdElement) => Setter;
}

interface MountedCallbackSetter {
  kind: "MountedCallbackSetter";
  fn: (el: StdElement) => void;
}
export function onMounted(fn: (el: StdElement) => void): MountedCallbackSetter {
  return {
    kind: "MountedCallbackSetter",
    fn,
  };
}

interface AfterMountedCallbackSetter {
  kind: "AfterMountedCallbackSetter";
  fn: (el: StdElement) => void;
}
export function onAfterMounted(
  fn: (el: StdElement) => void,
): AfterMountedCallbackSetter {
  return {
    kind: "AfterMountedCallbackSetter",
    fn,
  };
}

interface UnmountedCallbackSetter {
  kind: "UnmountedCallbackSetter";
  fn: () => void;
}

export type Setter =
  | AnyObservusElement
  | TextSetter
  | AttrSetter
  | BoolAttrSetter
  | EventListenerSetter
  | TagSignalSetter
  | WithRefSetter
  | MountedCallbackSetter
  | AfterMountedCallbackSetter
  | UnmountedCallbackSetter;

function callOnMountedOnTree(el: AnyObservusElement) {
  let wasMounted = el.isMounted;
  if (!wasMounted) {
    el.isMounted = true;
    el.onMounted();
  }

  el.children.forEach((child) => {
    callOnMountedOnTree(child);
  });

  if (!wasMounted) {
    el.onAfterMounted();
  }
}

/* clear resource bind to element */
export function free(el: AnyObservusElement) {
  if (el.isMounted) {
    el.isMounted = false;
    el.onMounted();
    el.freeResourcesFns.forEach((fn) => {
      fn();
    });
  }
  el.children.forEach((child) => {
    free(child);
  });
}

//TODO: should return unmount function?
export function mount(root: Element, el: AnyObservusElement) {
  root.appendChild(el.el);
  callOnMountedOnTree(el);
}

function emptyObservusElement<A extends StdElement>(
  el: any,
): ObservusElement<A> {
  return {
    kind: "ObservusElement",
    el,
    children: [],
    freeResourcesFns: [],
    isMounted: false,
    onMounted: () => {},
    onAfterMounted: () => {},
    onUnmounted: () => {},
  };
}

function createTag<A extends StdElement>(
  name: string,
  isSvg: boolean,
  ...setters: Children
): ObservusElement<A> {
  const observusElement = emptyObservusElement<A>(
    isSvg
      ? document.createElementNS("http://www.w3.org/2000/svg", name)
      : document.createElement(name),
  );

  for (const setter of setters) {
    handleSetter(setter, observusElement);
  }

  return observusElement;
}

function handleSetter(setter: Setter, o: AnyObservusElement) {
  function appendChild(child: AnyObservusElement) {
    o.el.appendChild(child.el);
    o.children.push(child);
  }

  if (setter.kind == "ObservusElement") {
    appendChild(setter);
  }

  if (setter.kind == "TextSetter") {
    if (typeof setter.value == "string") {
      appendChild(emptyObservusElement(document.createTextNode(setter.value)));
    } else {
      const textNode = document.createTextNode(setter.value.getValue());
      const unobserve = observe(setter.value, (v) => {
        textNode.nodeValue = v;
      });
      const observusElement = emptyObservusElement(textNode);
      observusElement.freeResourcesFns.push(unobserve);
      appendChild(observusElement);
    }
  }

  //using property-based attribute setting as default
  //setAttribute is needed for non-standard and readonly attributes
  if (setter.kind == "AttrSetter") {
    if (typeof setter.value == "string") {
      if (setter.strategy == "setAttrFn") {
        o.el.setAttribute(setter.name, setter.value);
      } else {
        // @ts-ignore
        o.el[setter.name] = setter.value;
      }
    } else {
      const unobserve = observe(setter.value, (v) => {
        if (v !== null) {
          if (setter.strategy == "setAttrFn") {
            o.el.setAttribute(setter.name, v);
          } else {
            // @ts-ignore
            o.el[setter.name] = v;
          }
        } else {
          // should work for both cases, i hope
          o.el.removeAttribute(setter.name);
        }
      });
      o.freeResourcesFns.push(unobserve);
    }
  }

  if (setter.kind == "BoolAttrSetter") {
    if (typeof setter.value == "boolean") {
      // @ts-ignore
      o.el[setter.name] = setter.value;
    } else {
      //maybe removing attr is safer than setting false?
      const unobserve = observe(setter.value, (v) => {
        // @ts-ignore
        o.el[setter.name] = v;
      });
      o.freeResourcesFns.push(unobserve);
    }
  }

  if (setter.kind == "EventListenerSetter") {
    o.el.addEventListener(setter.type, setter.listener, setter.options);
    o.freeResourcesFns.push(() => {
      o.el.removeEventListener(setter.type, setter.listener, setter.options);
    });
  }

  if (setter.kind == "TagSignalSetter") {
    let lastValue: AnyObservusElement | null = null;
    const unobserve = observe(setter.value, (observusEl) => {
      if (lastValue !== null) {
        o.children = o.children.map((child) => {
          //child is replaced
          if (child === lastValue) {
            //TODO: think about strategy to free resources
            return observusEl;
          } else {
            return child;
          }
        });
        o.el.replaceChild(observusEl.el, lastValue.el);
      } else {
        appendChild(observusEl);
      }
      if (o.isMounted) {
        callOnMountedOnTree(observusEl);
      }
      lastValue = observusEl;
    });
    o.freeResourcesFns.push(unobserve);
  }

  if (setter.kind == "WithRefSetter") {
    const newSetter = setter.fn(o.el);
    handleSetter(newSetter, o);
  }

  if (setter.kind == "MountedCallbackSetter") {
    o.onMounted = () => {
      setter.fn(o.el);
    };
  }

  if (setter.kind == "AfterMountedCallbackSetter") {
    o.onAfterMounted = () => {
      setter.fn(o.el);
    };
  }

  if (setter.kind == "UnmountedCallbackSetter") {
    o.onUnmounted = () => {
      setter.fn();
    };
  }
}

//TODO: would be nice to allow tagSignal(value: Signal<ObservusElement[]>) to avoid surogate container

export type Children = Array<Setter>;

//TODO: better type?
//    createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
//    /** @deprecated */
//    createElement<K extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementDeprecatedTagNameMap[K];
//    createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
export function tag<A extends HTMLElement>(name: string, ...ch: Children) {
  return createTag<A>(name, false, ...ch);
}

export function svgTag<A extends SVGElement>(name: string, ...ch: Children) {
  return createTag<A>(name, true, ...ch);
}

export function text(value: string | Signal<string>): TextSetter {
  return {
    kind: "TextSetter",
    value,
  };
}

export function attr(
  name: string,
  value: string | Signal<string | null>,
  strategy: AttrSetStrategy = "property",
): AttrSetter {
  return {
    kind: "AttrSetter",
    strategy,
    name,
    value,
  };
}

export function setAttr(
  name: string,
  value: string | Signal<string | null>,
): AttrSetter {
  return attr(name, value, "setAttrFn");
}

export function boolAttr(
  name: string,
  value: boolean | Signal<boolean>,
): BoolAttrSetter {
  return {
    kind: "BoolAttrSetter",
    name,
    value,
  };
}

//TODO: better types:
//addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
export function on(
  type: string,
  listener: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
): EventListenerSetter {
  return {
    kind: "EventListenerSetter",
    type,
    listener,
    options,
  };
}

export function tagSignal(
  value: Signal<ObservusElement<StdElement>>,
): TagSignalSetter {
  return {
    kind: "TagSignalSetter",
    value,
  };
}

export function withRef(fn: (el: StdElement) => Setter): WithRefSetter {
  return {
    kind: "WithRefSetter",
    fn,
  };
}

//TODO: maybe better call it onFree?
export function onUnmounted(fn: () => void): UnmountedCallbackSetter {
  return {
    kind: "UnmountedCallbackSetter",
    fn,
  };
}
