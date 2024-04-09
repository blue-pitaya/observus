import { mkState, mkText } from "../src/observus";
import { button, div, pre } from "../src/tags";

export function Stopwatch() {
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

  return div(
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
  );
}
