export interface Signal<A> {
  type: "Signal";
  value: A;
  observers: (() => void)[];
  set: (v: A) => void;
  map<B>(fn: (v: A) => B): Signal<B>;
}

export type UnobserveFn = () => void;

export function mkState<A>(initialValue: A): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    value: initialValue,
    observers: [],
    set: (v) => {
      setFn(signal, v);
    },
    map: (fn) => mkSignal(signal, () => fn(signal.value)),
  };

  return signal;
}

export function mkSignal<A>(
  deps: Signal<any> | Signal<any>[],
  fn: () => A,
): Signal<A> {
  const signal: Signal<A> = {
    type: "Signal",
    value: fn(),
    observers: [],
    set: (v: A) => {
      setFn(signal, v);
    },
    map: (fn) => mkSignal(signal, () => fn(signal.value)),
  };

  if (Array.isArray(deps)) {
    deps.forEach((dep) => {
      dep.observers.push(() => {
        signal.set(fn());
      });
    });
  } else {
    deps.observers.push(() => {
      signal.set(fn());
    });
  }

  return signal;
}

function setFn<A>(signal: Signal<A>, value: A) {
  signal.value = value;
  //TODO: use isDirty for mass updates
  signal.observers.forEach((fn) => {
    fn();
  });
}

export function observeLazy(
  deps: Signal<any> | Signal<any>[],
  fn: () => void,
): UnobserveFn {
  const freeFns: (() => void)[] = [];

  function observeSingle(d: Signal<any>) {
    d.observers.push(fn);

    freeFns.push(() => {
      d.observers = d.observers.filter((x) => x !== fn);
    });
  }

  if (Array.isArray(deps)) {
    deps.forEach(observeSingle);
  } else {
    observeSingle(deps);
  }

  return () => {
    freeFns.forEach((fn) => {
      fn();
    });
  };
}

export function observe(
  deps: Signal<any> | Signal<any>[],
  fn: () => void,
): UnobserveFn {
  const unobserve = observeLazy(deps, fn);
  fn();

  return unobserve;
}

export function notify<A>(
  signal: Signal<A>,
  beforeNotify: () => void = () => {},
) {
  beforeNotify();
  signal.set(signal.value);
}

export function isSignal(v: any): v is Signal<any> {
  return (
    v !== undefined &&
    v !== null &&
    typeof v === "object" &&
    "type" in v &&
    v.type == "Signal"
  );
}
