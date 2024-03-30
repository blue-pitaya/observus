//function Example() {
//  const verbs: Array<string> = ["watching", "observing", "seeing"];
//  const verbIdx: State<number> = mkState(0);
//  const message: Signal<string> = verbIdx.map((i) => `I'm ${verbs[i]} you.`);
//
//  return tag(
//    "div",
//    tag("p", "There will be observus mini logo"),
//    tag("p", textSignal(message)),
//    tag(
//      "button",
//      "Look at me more!",
//      on("click", () => {
//        verbIdx.update((i) => (i + 1 >= verbs.length ? 0 : i + 1));
//      }),
//    ),
//  );
//}

//TODO: view toggle using hidden prop (safer?)

//const x = Welcome();
//console.log(x);
//const el = build(x);
//console.log(el.outerHTML);
//
//function App() {
//  return tag(
//    "div",
//    attr("style", "display: flex; flex-direction: column; gap: 24px;"),
//    div(),
//    tag("h3", "Todo lists"),
//    TodoList(),
//    TextInputExample(),
//  );
//}

//mount(document.getElementById("examples")!, App());
