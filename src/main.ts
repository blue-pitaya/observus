import {
  mapState,
  mapSignal,
  state,
  observeSignal,
  updateState,
  combineSignals,
  toSignal,
  updateMany,
} from "./ca";
import { text, tag, attr, on } from "./ct";
import "./style.css";

const a = state(10);
const b = state(3);

const c = mapState(a, (x) => x + 1);
const d = mapSignal(c, (x) => x * 2);
const e = combineSignals(d, toSignal(b), (x, y) => x - y);

observeSignal(e, (x) => console.log(x));

updateState(a, () => 2);
updateState(b, () => 5);

updateMany([
  { signal: a, f: (_) => 20 },
  { signal: b, f: (_) => 2 },
]);

function createTODOList() {
  const color = state("red");
  const styleValue = mapState(color, (c) => `color: ${c}`);

  return tag(
    "div",
    tag("p", attr("style", styleValue), text(e)),
    tag(
      "button",
      on("click", () => {
        updateState(color, (v) => (v == "red" ? "blue" : "red"));
      }),
      text("Change color"),
    ),
  );
}

const todoList = createTODOList();
document.getElementById("app")!.appendChild(todoList);
