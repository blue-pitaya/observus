import { Signal, mkState, observe } from "./observus";

export function bindVisibility(element: HTMLElement, signal: Signal<boolean>) {
  observe(signal, () => {
    if (signal.value) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
}

export function bindInputValue(
  inputElement: HTMLInputElement,
  signal: Signal<string>,
) {
  observe(signal, () => {
    inputElement.value = signal.value;
  });
  inputElement.addEventListener("input", () => {
    signal.set(inputElement.value);
  });
}

export function queryObId<E extends Element = Element>(
  element: Element,
  id: string,
): E | null {
  return element.querySelector<E>(`[ob-id='${id}']`);
}

export function debounce(fn: () => void, timeout: number) {
  let currentDebounceTaskId: number | null = null;

  return () => {
    if (currentDebounceTaskId !== null) {
      clearTimeout(currentDebounceTaskId);
    }

    currentDebounceTaskId = window.setTimeout(() => {
      try {
        fn();
      } finally {
        currentDebounceTaskId = null;
      }
    }, timeout);
  };
}

export function lazyElementsSignal<T>(
  signal: Signal<T[]>,
  getKey: (v: T) => string,
  createElement: (v: T) => Element,
) {
  const signedElements = mkState<{ id: string; element: Element }[]>([]);

  observe(signal, () => {
    const models = signal.value;
    const nextElements: { id: string; element: Element }[] = [];

    models.forEach((model) => {
      const modelId = getKey(model);
      const matchingElement = signedElements.value.find((e) => e.id == modelId);
      if (matchingElement) {
        nextElements.push(matchingElement);
      } else {
        nextElements.push({ id: modelId, element: createElement(model) });
      }
    });

    //const removedElements = elements.value.filter(
    //  (x) => !models.find((m) => getKey(m) == x.id),
    //);

    signedElements.set(nextElements);

    //removedElements.forEach((el) => {
    //  free(el.value);
    //});
  });

  return signedElements.map((els) => els.map((el) => el.element));
}
