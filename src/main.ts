import { state, combine, updateMany, State, Signal, observe } from "./ca";
import { text, tag, on, attr } from "./ct";
import "./style.css";

const a = state(10);
const b = state(3);

const c = a.map((x) => x + 1);
const d = c.map((x) => x * 2);
const e = combine(d, b.signal(), (x, y) => x - y);

observe(e, (x) => console.log(x));

a.update((x) => x + 2);
b.update(() => 5);

updateMany([
  { signal: a, f: () => 20 },
  { signal: b, f: () => 2 },
]);

function Example(): HTMLElement {
  const verbs: Array<string> = ["watching", "observing", "seeing"];
  const verbIdx: State<number> = state(0);
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
  const elapsed = state(0);

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

function TodoList(): HTMLElement {
  return tag("div");
}

function App(): HTMLElement {
  return tag("div", Example(), Stopwatch(), TodoList());
}

const app = App();
document.getElementById("app")!.appendChild(app);
