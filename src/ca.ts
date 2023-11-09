export interface Observable {
  currentValue: any;
  links: Array<Observer>;
}

export interface Observer {
  next: () => void;
}

export interface Signal {
  sources: Array<Observable>;
  getValue: () => any;
}

export function state(initialValue: any): Observable {
  return { currentValue: initialValue, links: [] };
}

export function mapState(s: Observable, f: (v: any) => any): Signal {
  return {
    sources: [s],
    getValue: () => f(s.currentValue),
  };
}

// can lead to stackoverflow if too many mappings
export function mapSignal(s: Signal, f: (v: any) => any): Signal {
  return {
    ...s,
    getValue: () => f(s.getValue()),
  };
}

export function observeState(s: Observable, next: (v: any) => void) {
  const observer: Observer = { next: () => next(s.currentValue) };
  s.links.push(observer);
  observer.next();
}

export function observeSignal(s: Signal, next: (v: any) => void) {
  const observer: Observer = {
    next: () => next(s.getValue()),
  };
  s.sources.forEach((source) => source.links.push(observer));
  observer.next();
}

export function updateState(s: Observable, f: (v: any) => any) {
  s.currentValue = f(s.currentValue);
  s.links.forEach((link) => link.next());
}

export function toSignal(s: Observable): Signal {
  return mapState(s, (x) => x);
}

export function combineSignals(
  sa: Signal,
  sb: Signal,
  f: (a: any, b: any) => any,
): Signal {
  return {
    sources: [...sa.sources, ...sb.sources],
    getValue: () => f(sa.getValue(), sb.getValue()),
  };
}

export function updateMany(
  updates: Array<{ signal: Observable; f: (v: any) => any }>,
) {
  let observersToUpdate: Set<Observer> = new Set();
  updates.forEach((u) => {
    u.signal.currentValue = u.f(u.signal.currentValue);
    u.signal.links.forEach((l) => observersToUpdate.add(l));
  });

  observersToUpdate.forEach((o) => o.next());
}
