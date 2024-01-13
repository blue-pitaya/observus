import {
  AttrSetter,
  FreeFn,
  InContextCallback,
  NullOrUndef,
  Signal,
  State,
  attr,
  constSignal,
  state,
  observe,
  inCtx,
  combine,
  ElementSetter,
  build,
} from "./observus-core";

interface HasId<A, B> {
  id: A;
  value: B;
}

export interface SProxy<A> {
  signal: Signal<A>;
  update: (v: A) => void;
}

export const toProxy = <A>(state: State<A>): SProxy<A> => ({
  signal: state.signal(),
  update: (v) => {
    state.set(v);
  },
});

//TODO: test, test with updateMany
/* mappings MUST NOT throw */
export function stateProxy<A, B>(
  source: State<A>,
  sourceMapping: (v: A) => B,
  proxyUpdate: (s: A, v: B) => A,
) {
  const proxy = state<B>(sourceMapping(source.value));

  let sourceUpdating = false;
  let proxyUpdating = false;

  observe(source.signal(), (v) => {
    if (!proxyUpdating) {
      sourceUpdating = true;
      proxy.set(sourceMapping(v));
      sourceUpdating = false;
    }
  });
  observe(proxy.signal(), (v) => {
    if (!sourceUpdating) {
      proxyUpdating = true;
      source.update((s) => proxyUpdate(s, v));
      proxyUpdating = false;
    }
  });

  return proxy;
}

/* Creates reusable elements based on models and correspoding id */
export function createElementsSignal<TId, TModel>(
  models: Signal<TModel[]>,
  getId: (m: TModel) => TId,
  createElement: (m: TModel) => ElementSetter,
): [FreeFn, Signal<Element[]>] {
  const elements = state<HasId<TId, Element>[]>([]);

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

export function combineMany<A, B>(
  signals: Signal<A>[],
  reduceFn: (acc: B, curr: A) => B,
  defaultValue: B,
): Signal<B> {
  return signals.reduce((acc, curr) => {
    return combine(acc, curr, (b, a) => reduceFn(b, a));
  }, constSignal(defaultValue));
}

//TODO: handle no styles + optional null signal in "obj"?
export type StyleObj = Record<string, string | Signal<string | NullOrUndef>>;

function asciiCamelToKebab(v: string): string {
  return v.replace(RegExp(/[A-Z]/, "g"), (m) => `-${m.toLowerCase()}`);
}

function singleStyleStr(key: string, value: string): string {
  return `${asciiCamelToKebab(key)}: ${value};`;
}

export function styleObj(obj: StyleObj): AttrSetter {
  const signals = Object.keys(obj).map((prop) => {
    const value = obj[prop];
    if (typeof value === "string") {
      return constSignal(singleStyleStr(prop, value));
    } else {
      return value.map((v) => (v ? singleStyleStr(prop, v) : ""));
    }
  });

  const combinedSignal = combineMany<string, string[]>(
    signals,
    //must copy array
    (acc, x) => (x ? [...acc, x] : acc),
    [],
  ).map((v) => v.join(" "));

  return attr("style", combinedSignal, "setAttrFn");
}

export const rawHtml = (value: string): InContextCallback =>
  inCtx((el) => {
    el.innerHTML += value;
  });
