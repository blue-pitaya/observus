import { data } from "./observus-attributes";
import {
  bindAttr,
  bindTag,
  bindTagList,
  bindText,
  bindToDom,
} from "./observus-bindings";
import { State, createState, on } from "./observus-core";

test("bind span text with strict parent structure", () => {
  document.body.innerHTML = `
  <div id="main">
    <div>
      <span>elo</span>
    </div>
  </div>
  `;
  const text = createState<string>("");
  const binding = bindTag(
    "div",
    bindTag(
      "div",
      bindTag(
        "span",
        bindText(text.signal(), (v) => {
          text.set(v);
        }),
      ),
    ),
  );

  bindToDom(document.getElementById("main")!, binding);
  expect(text.value).toEqual("elo");

  text.set("yolo");
  expect(document.querySelector("span")!.textContent).toEqual("yolo");
});

test("bind span text with loose parent tructure", () => {
  document.body.innerHTML = `
  <div id="main">
    <div id="1">
      <div id="2"><span>not important</span></div>
      <span id="binded">elo</span>
    </div>
  </div>
  `;
  const text = createState<string>("");
  const binding = bindTag(
    "div",
    bindTag(
      "div",
      bindTag(
        "span",
        bindText(text.signal(), (v) => {
          text.set(v);
        }),
      ),
    ),
  );

  bindToDom(document.getElementById("main")!, binding);
  expect(text.value).toEqual("elo");

  text.set("yolo");
  expect(document.querySelector("span#binded")!.textContent).toEqual("yolo");
});

interface SomeModel {
  id: number;
  data: string;
}

test("bind span text and attribute to complex model", () => {
  document.body.innerHTML = `
  <div id="main">
    <div>
      <span id="1">elo</span>
    </div>
  </div>
  `;
  const model = createState<SomeModel>({ id: 0, data: "" });
  const binding = bindTag(
    "div",
    bindTag(
      "div",
      bindTag(
        "span",
        bindAttr(
          "id",
          model.map((m) => m.id.toString()),
          (v) => {
            model.update((m) => ({ ...m, id: Number(v) }));
          },
        ),
        bindText(
          model.map((m) => m.data),
          (v) => {
            model.update((m) => ({ ...m, data: v }));
          },
        ),
      ),
    ),
  );

  bindToDom(document.getElementById("main")!, binding);
  expect(model.value).toEqual({ id: 1, data: "elo" });

  model.set({ id: 10, data: "yolo" });
  expect(document.querySelector("span")!.textContent).toEqual("yolo");
  expect(document.querySelector("span")!.getAttribute("id")).toEqual("10");
});

test("add onclick listener on button", () => {
  document.body.innerHTML = `
  <div>
    <button>btn</button>
  </div>
  `;
  let clicked = false;
  const binding = bindTag(
    "div",
    bindTag(
      "button",
      on("click", () => {
        clicked = true;
      }),
    ),
  );

  bindToDom(document.querySelector("div")!, binding);
  document.querySelector("button")!.click();
  expect(clicked).toEqual(true);
});

//test("bind list", () => {
//  document.body.innerHTML = `
//  <ul id="list">
//    <button>btn 1</button>
//    <button>btn 2</button>
//    <button>btn 3</button>
//  </ul>
//  `;
//  const items = createState<State<string>[]>([]);
//  //const binding = bindTag("ul", bindTagList())
//});
