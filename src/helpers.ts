import { Signal, observe } from "./observus";

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

export function observeDebounced(
  signal: Signal<any>,
  fn: () => Promise<void>,
  timeout: number,
) {
  let currentDebounceTaskId: number | null = null;

  observe(signal, () => {
    if (currentDebounceTaskId !== null) {
      clearTimeout(currentDebounceTaskId);
    }

    currentDebounceTaskId = window.setTimeout(async () => {
      try {
        await fn();
      } finally {
        currentDebounceTaskId = null;
      }
    }, timeout);
  });
}
