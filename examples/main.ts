import {
  State,
  Signal,
  tag,
  on,
  attr,
  mount,
  mkState,
  textSignal,
  elementSignal,
  build,
} from "observus";
import "./style.css";
import { TextInputExample } from "./textInputExample";
import { TodoList } from "./todoListExample";
import { div } from "observus/tags";
//@ts-ignore
import { Welcome } from "./Welcome";

function Example() {
  const verbs: Array<string> = ["watching", "observing", "seeing"];
  const verbIdx: State<number> = mkState(0);
  const message: Signal<string> = verbIdx.map((i) => `I'm ${verbs[i]} you.`);

  return tag(
    "div",
    tag("p", "There will be observus mini logo"),
    tag("p", textSignal(message)),
    tag(
      "button",
      "Look at me more!",
      on("click", () => {
        verbIdx.update((i) => (i + 1 >= verbs.length ? 0 : i + 1));
      }),
    ),
  );
}

const Stopwatch = () => {
  const elapsed = mkState(0);

  let intervalId: number | null = null;
  const start = () => {
    if (intervalId === null) {
      intervalId = setInterval(() => {
        elapsed.update((v) => v + 0.1);
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
    elapsed.update(() => 0);
  };

  return tag(
    "div",
    tag(
      "pre",
      attr("style", "display: inline;"),
      textSignal(elapsed.map((s) => `${s.toFixed(1)} seconds`)),
    ),
    tag("button", "Start", on("click", start)),
    tag("button", "Stop", on("click", stop)),
    tag("button", "Reset", on("click", reset)),
  );
};

function ViewToggle1() {
  const count = mkState(0);
  const view1 = tag(
    "span",
    attr("style", "color: red;"),
    textSignal(count.map((x) => x.toString())),
  );
  const view2 = tag(
    "span",
    attr("style", "color: blue;"),
    textSignal(count.map((x) => x.toString())),
  );

  const showView1 = mkState(true);
  const currentView = showView1.map((v) => (v ? view1 : view2));

  return tag(
    "div",
    elementSignal(currentView),
    tag(
      "button",
      "Switch view",
      on("click", () => {
        showView1.update((v) => !v);
      }),
    ),
    tag(
      "button",
      "Increment counter",
      on("click", () => {
        count.update((x) => x + 1);
        console.log(count.observers.length); //TODO: counter links are not cleared
      }),
    ),
  );
}

//TODO: view toggle using hidden prop (safer?)

const x = Welcome();
console.log(x);
const el = build(x);
console.log(el.outerHTML);

function App() {
  return tag(
    "div",
    attr("style", "display: flex; flex-direction: column; gap: 24px;"),
    div(),
    Example(),
    Stopwatch(),
    ViewToggle1(),
    tag("h3", "Todo lists"),
    TodoList(),
    TextInputExample(),
  );
}

//mount(document.getElementById("examples")!, App());
