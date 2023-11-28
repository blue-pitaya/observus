import {
  AnyObservusElement,
  FreeFn,
  Signal,
  State,
  createState,
  free,
  observe,
} from "./observus";

interface HasId<A, B> {
  id: A;
  value: B;
}

/* Creates reusable elements based on models and correspoding id */
export function createElementsSignal<TId, TModel>(
  models: Signal<TModel[]>,
  getId: (m: TModel) => TId,
  createElement: (m: TModel) => AnyObservusElement,
): [FreeFn, Signal<AnyObservusElement[]>] {
  const elements = createState<HasId<TId, AnyObservusElement>[]>([]);

  const freeFn = observe(models, (ms) => {
    const nextElements: HasId<TId, AnyObservusElement>[] = [];

    ms.forEach((model) => {
      const modelId = getId(model);
      const matchingElement = elements.value.find((e) => e.id == modelId);
      if (matchingElement) {
        nextElements.push(matchingElement);
      } else {
        nextElements.push({ id: modelId, value: createElement(model) });
      }
    });

    const removedElements = elements.value.filter(
      (x) => !ms.find((m) => getId(m) == x.id),
    );

    elements.set(nextElements);

    //TEST: i dont know if it is safe tbh
    removedElements.forEach((el) => {
      free(el.value);
    });
  });

  return [freeFn, elements.map((els) => els.map((x) => x.value))];
}

export function bindProxyState<A, B>(
  proxy: State<A>,
  target: State<B>,
  mappingToTarget: (v: A, currentTargetValue: B) => B,
  mappingToProxy: (v: B) => A,
): FreeFn {
  const free1 = observe(proxy.signal(), (v) => {
    const mapped = mappingToTarget(v, target.value);
    target.set(mapped);
  });
  const free2 = observe(target.signal(), (v) => {
    const mapped = mappingToProxy(v);
    if (proxy.value !== mapped) {
      proxy.set(mapped);
    }
  });

  return () => {
    free1();
    free2();
  };
}
