import { state, combine, updateMany, State, Signal, observe } from "./ca";
import { text, tag, on } from "./ct";
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

function createExample(): HTMLElement {
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

function createApp(): HTMLElement {
  const example = createExample();
  return example;
}

const app = createApp();
document.getElementById("app")!.appendChild(app);
