import {
  createState,
  State,
  Signal,
  text,
  tag,
  on,
  attr,
  tagSignal,
  mount,
} from "./observus-core";
import "./style.css";
import { TextInputExample } from "./textInputExample";
import { TodoList } from "./todoListExample";

function Example() {
  const verbs: Array<string> = ["watching", "observing", "seeing"];
  const verbIdx: State<number> = createState(0);
  const message: Signal<string> = verbIdx.map((i) => `I'm ${verbs[i]} you.`);

  return tag(
    "div",
    tag("p", text("There will be observus mini logo")),
    tag("p", text(message)),
    tag(
      "button",
      text("Look at me more!"),
      on("click", () => {
        verbIdx.update((i) => (i + 1 >= verbs.length ? 0 : i + 1));
      }),
    ),
  );
}

const Stopwatch = () => {
  const elapsed = createState(0);

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
      text(elapsed.map((s) => `${s.toFixed(1)} seconds`)),
    ),
    tag("button", text("Start"), on("click", start)),
    tag("button", text("Stop"), on("click", stop)),
    tag("button", text("Reset"), on("click", reset)),
  );
};

function ViewToggle1() {
  const count = createState(0);
  const view1 = tag(
    "span",
    attr("style", "color: red;"),
    text(count.map((x) => x.toString())),
  );
  const view2 = tag(
    "span",
    attr("style", "color: blue;"),
    text(count.map((x) => x.toString())),
  );

  const showView1 = createState(true);
  const currentView = showView1.map((v) => (v ? view1 : view2));

  return tag(
    "div",
    tagSignal(currentView),
    tag(
      "button",
      text("Switch view"),
      on("click", () => {
        showView1.update((v) => !v);
      }),
    ),
    tag(
      "button",
      text("Increment counter"),
      on("click", () => {
        count.update((x) => x + 1);
        console.log(count.observers.length); //TODO: counter links are not cleared
      }),
    ),
  );
}

//TODO: view toggle using hidden prop (safer?)

function App() {
  return tag(
    "div",
    attr("style", "display: flex; flex-direction: column; gap: 24px;"),
    Example(),
    Stopwatch(),
    ViewToggle1(),
    tag("h1", text("Todo lists")),
    TodoList(),
    TextInputExample(),
  );
}

mount(document.getElementById("app")!, App());
