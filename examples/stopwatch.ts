import { mkState } from "../src/core";
import { button, div, pre } from "../src/tags";
import { mkText } from "../src/dom2";

export function stopwatch(element: Element) {
  const elapsed = mkState(0);

  let intervalId: number | null = null;
  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        elapsed.set(elapsed.value + 0.1);
      }, 100);
    }
  };
  const stop = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
  const reset = () => {
    stop();
    elapsed.set(0);
  };

  element.appendChild(
    div(
      {},
      pre(
        {
          style: "display: inline",
        },
        mkText(elapsed.map((s) => `${s.toFixed(1)} seconds`)),
      ),
      button({ on_click: start }, mkText("Start")),
      button({ on_click: stop }, mkText("Stop")),
      button({ on_click: reset }, mkText("Reset")),
    ),
  );
}
