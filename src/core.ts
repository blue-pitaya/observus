export interface State<A> {
  type: "State";
  isSet: boolean;
  value: A;
  observers: Observer[];
  set: (v: A) => void;
  update: (f: (v: A) => A) => void;
  signal: () => Signal<A>;
  map: <B>(f: (v: A) => B) => Signal<B>;
}

export interface Observer {
  type: "Observer";
  next: () => void;
}

export interface Signal<A> {
  type: "Signal";
  sources: State<any>[];
  getValue: () => A;
  map: <B>(f: (v: A) => B) => Signal<B>;
}

export type FreeFn = () => void;

const createSignal = <A>(s: State<A>): Signal<A> => ({
  type: "Signal",
  sources: [s],
  getValue: () => s.value,
  map(f) {
    return mapSignal(this, f);
  },
});

const mapSignal = <A, B>(s: Signal<A>, f: (v: A) => B): Signal<B> => ({
  ...s,
  getValue: () => f(s.getValue()),
  map: function <C>(g: (v: B) => C): Signal<C> {
    return mapSignal(this, g);
  },
});

export const mkState = <A>(initialValue: A): State<A> => ({
  type: "State",
  isSet: true,
  value: initialValue,
  observers: [],
  set(v) {
    this.isSet = true;
    this.value = v;
    this.observers.forEach((o) => o.next());
  },
  update(f) {
    this.set(f(this.value));
  },
  signal() {
    return createSignal(this);
  },
  map(f) {
    return mapSignal(this.signal(), f);
  },
});

export const constSignal = <A>(v: A): Signal<A> => ({
  type: "Signal",
  sources: [],
  getValue: () => v,
  map(f) {
    return mapSignal(this, f);
  },
});

/* returns "unobserve" function */
export function observe<A>(s: Signal<A>, next: (v: A) => void): FreeFn {
  const observer: Observer = {
    type: "Observer",
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

  return unobserveFn;
}

export const combine = <A, B, C>(
  sa: Signal<A>,
  sb: Signal<B>,
  mapping: (a: A, b: B) => C,
): Signal<C> => ({
  type: "Signal",
  sources: [...sa.sources, ...sb.sources],
  getValue: () => mapping(sa.getValue(), sb.getValue()),
  map(f) {
    return mapSignal(this, f);
  },
});

//TODO: could i use combine function to do this? xd
//TEST: observe must set value on proxyState immidetly
export function flatten<A>(
  superSignal: Signal<Signal<A>>,
): [Signal<A>, FreeFn] {
  const proxyState = mkState<A | undefined>(undefined);
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

