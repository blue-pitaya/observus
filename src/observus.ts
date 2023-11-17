//TODO: maybe State should extends Signal?
//State should be possible to add as Signal for attr etc
//TODO: try to create flatMap on signal for sports
//TODO: test for diamond problem
export interface State<A> {
  currentValue: A;
  links: Array<Observer>;
  map: <B>(f: (v: A) => B) => Signal<B>;
  update: (f: (v: A) => A) => void;
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
    getValue: () => f(s.currentValue),
    map(f) {
      return mapSignal(this, f);
    },
  };
}

// can lead to stackoverflow if too many mappings
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
    currentValue: initialValue,
    links: [],
    map(f) {
      return mapState(this, f);
    },
    update(f) {
      this.currentValue = f(this.currentValue);
      this.links.forEach((link) => link.next());
    },
    signal() {
      return mapState(this, (x) => x);
    },
  };
}

export function observe<A>(s: State<A> | Signal<A>, next: (v: A) => void) {
  if ("currentValue" in s) {
    const observer: Observer = { next: () => next(s.currentValue) };
    s.links.push(observer);
    observer.next();
  } else {
    const observer: Observer = {
      next: () => next(s.getValue()),
    };
    s.sources.forEach((source) => source.links.push(observer));
    observer.next();
  }
}

//TODO: allow more than 2 signals
//levae this function typed, and add combineMany without strict types
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

//TODO: withValueOf(signal)

export function updateMany(
  updates: Array<{ signal: State<any>; f: (v: any) => any }>,
) {
  let observersToUpdate: Set<Observer> = new Set();
  updates.forEach((u) => {
    u.signal.currentValue = u.f(u.signal.currentValue);
    u.signal.links.forEach((l) => observersToUpdate.add(l));
  });

  observersToUpdate.forEach((o) => o.next());
}

// DOM building

interface AttrSetter {
  kind: "AttrSetter";
  name: string;
  value: string | Signal<string | null>;
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
            if (v !== null) {
              result.setAttribute(child.name, v);
            } else {
              result.removeAttribute(child.name);
            }
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
// TODO: for svg should add namespace?
export const attr = (
  name: string,
  value: string | Signal<string | null>,
): AttrSetter => ({
  kind: "AttrSetter",
  name,
  value,
});
export const on = (
  type: string,
  listener: any,
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

