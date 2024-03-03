interface State<A> {
  type: "State";
  value: A;
  observers: (() => void)[];
  update: (v: A) => void;
  map: <B>(f: (v: A) => B) => Signal<B>;
  signal: () => Signal<A>;
}

export interface Signal<A> {
  type: "Signal";
  sources: State<any>[];
  getValue: () => A;
  map: <B>(f: (v: A) => B) => Signal<B>;
}

export type FreeFn = () => void;

export function mkState<A>(initialValue: A): State<A> {
  const state: State<A> = {
    type: "State",
    value: initialValue,
    observers: [],
    update: (v: A) => {
      update(state, v);
    },
    map: (f) => {
      return map(state, f);
    },
    signal: () => {
      return map(state, (v) => v);
    },
  };

  return state;
}

function map<A, B>(s: State<A> | Signal<A>, fn: (v: A) => B): Signal<B> {
  const signal: Signal<B> = {
    type: "Signal",
    sources: s.type == "State" ? [s] : s.sources,
    getValue: s.type == "State" ? () => fn(s.value) : () => fn(s.getValue()),
    map: function <C>(g: (v: B) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

function update<A>(state: State<A>, nextValue: A) {
  state.value = nextValue;
  state.observers.forEach((next) => next());
}

export function signal<A>(value: A): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    sources: [],
    getValue: () => value,
    map: function <C>(g: (v: A) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

export function observe<A>(
  s: State<A> | Signal<A>,
  next: (v: A) => void,
): FreeFn {
  const signal = s.type == "State" ? map(s, (v) => v) : s;
  const f = () => next(signal.getValue());

  signal.sources.forEach((state) => {
    state.observers.push(f);
  });

  return () => {
    signal.sources.forEach((state) => {
      state.observers = state.observers.filter((o) => o !== f);
    });
  };
}

export function combine<A>(
  signals: Signal<any>[],
  mapping: (v: any[]) => A,
): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    sources: signals.flatMap((s) => s.sources),
    getValue: () => mapping(signals.map((s) => s.getValue())),
    map: function <C>(g: (v: A) => C): Signal<C> {
      return map(signal, g);
    },
  };

  return signal;
}

//export function flatten<A>(superSignal: Signal<Signal<A>>): Signal<A> {
//  const proxyState = mkState<A | undefined>(undefined);
//  observe(superSignal, (signal) => {
//    observe(signal, (v) => {
//      update(proxyState, v);
//    });
//  });
//
//  return signal(proxyState) as Signal<A>;
//}
