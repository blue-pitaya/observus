import { Observer } from "./observus-core";

// STILL IN DEVELOPMENT

export interface LazyState<A> {
  isSet: boolean;
  value: A | undefined;
  observers: Observer[];
  set: (v: A) => void;
  update: (f: (v: A) => A) => void;
  signal: () => LazySignal<A>;
  map: <B>(f: (v: A) => B) => LazySignal<B>;
}

export interface LazySignal<A> {
  sources: LazyState<any>[];
  getValue: () => A | undefined;
  map: <B>(f: (v: A) => B) => LazySignal<B>;
}

function valueIsSet<A>(s: LazyState<A>, v: any): v is A {
  return s.isSet;
}

function valueIsPresent<A>(signal: LazySignal<A>, v: any): v is A {
  return signal.sources.filter((s) => !s.isSet).length == 0;
}

const mapSignal = <A, B>(s: LazySignal<A>, f: (v: A) => B): LazySignal<B> => ({
  ...s,
  getValue: () => {
    const value = s.getValue();
    if (valueIsPresent(s, value)) {
      return f(value);
    }

    return undefined;
  },
  map: function <C>(g: (v: B) => C): LazySignal<C> {
    return mapSignal(this, g);
  },
});

const createLazySignal = <A>(s: LazyState<A>): LazySignal<A> => ({
  sources: [s],
  getValue: () => s.value,
  map(f) {
    return mapSignal(this, f);
  },
});

export const lazyState = <A>(): LazyState<A> => ({
  isSet: false,
  value: undefined,
  observers: [],
  set(v) {
    this.isSet = true;
    this.value = v;
    this.observers.forEach((o) => o.next());
  },
  update(f) {
    if (valueIsSet(this, this.value)) {
      this.set(f(this.value));
    } else {
      throw new Error();
    }
  },
  signal() {
    return createLazySignal(this);
  },
  map(f) {
    return mapSignal(this.signal(), f);
  },
});

export function lazyObserve<A>(signal: LazySignal<A>, next: (v: A) => void) {
  const observer: Observer = {
    next: () => {
      const value = signal.getValue();
      if (valueIsPresent(signal, value)) {
        next(value);
      }
    },
  };
  signal.sources.forEach((state) => {
    state.observers.push(observer);
  });
  const unobserveFn = () => {
    signal.sources.forEach((state) => {
      //TODO: use slice for performance?
      state.observers = state.observers.filter((o) => o !== observer);
    });
  };
  observer.next();

  return unobserveFn;
}
