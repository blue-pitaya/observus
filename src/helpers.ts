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
