//TODO: maybe State should extends Signal?
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

export function state<A>(initialValue: A): State<A> {
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
