import { _attrs, _ref, mkText } from "../src/dom";
import { mkState } from "../src/observus";
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
    pre(
      _attrs({
        style: "display: inline",
      }),
      mkText(elapsed.map((v) => `${v.toFixed(1)} seconds`)),
    ),
    button(
      _ref((e) => {
        e.addEventListener("click", start);
      }),
      mkText("Start"),
    ),
    button(
      _ref((e) => {
        e.addEventListener("click", stop);
      }),
      mkText("Stop"),
    ),
    button(
      _ref((e) => {
        e.addEventListener("click", reset);
      }),
      mkText("Reset"),
    ),
  );
}
