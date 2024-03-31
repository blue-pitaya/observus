import { FreeFn, Signal, mkState, observe } from "./core";

export function runAndObserve<A>(s: Signal<A>, next: (v: A) => void): FreeFn {
  const unobserve = observe(s, next);
  next(s.getValue());

  return unobserve;
}
