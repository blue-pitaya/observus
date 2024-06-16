import { Signal, mkState, observe } from "./observus";


//TODO: brach "tempest", last commit "zabawa"
// chodzi o template ;)


export function lazyElementsSignal<T>(
  signal: Signal<T[]>,
  getKey: (v: T) => string,
  createElement: (v: T) => Element,
): Signal<Element[]> {
  const memoElements: Record<string, Element> = {};
  const elements = mkState<Element[]>([]);

  observe(signal, () => {
    const nextElements: Element[] = [];

    signal.value.forEach((model) => {
      const id = getKey(model);

      if (!(id in memoElements)) {
        memoElements[id] = createElement(model);
      }

      nextElements.push(memoElements[id]);
    });

    elements.set(nextElements);
    //clear memo elements
  });

  return elements;
}
