import { FreeFn, Signal, mkState, observe } from "./core";
import { ElementBlueprint, build } from "./dom";

interface HasId<A, B> {
  id: A;
  value: B;
}

/* Creates reusable elements based on models and correspoding id */
export function createElementsSignal<TId, TModel>(
  models: Signal<TModel[]>,
  getId: (m: TModel) => TId,
  createElement: (m: TModel) => ElementBlueprint,
): [FreeFn, Signal<Element[]>] {
  const elements = mkState<HasId<TId, Element>[]>([]);

  const freeFn = observe(models, (ms) => {
    const nextElements: HasId<TId, Element>[] = [];

    ms.forEach((model) => {
      const modelId = getId(model);
      const matchingElement = elements.value.find((e) => e.id == modelId);
      if (matchingElement) {
        nextElements.push(matchingElement);
      } else {
        nextElements.push({ id: modelId, value: build(createElement(model)) });
      }
    });

    //const removedElements = elements.value.filter(
    //  (x) => !ms.find((m) => getId(m) == x.id),
    //);

    elements.set(nextElements);

    //TEST: i dont know if it is safe tbh
    //removedElements.forEach((el) => {
    //  free(el.value);
    //});
  });

  return [freeFn, elements.map((els) => els.map((x) => x.value))];
}

export function runAndObserve<A>(s: Signal<A>, next: (v: A) => void): FreeFn {
  const unobserve = observe(s, next);
  next(s.getValue());

  return unobserve;
}
