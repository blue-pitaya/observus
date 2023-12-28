import { data } from "./observus-attributes";
import {
  bindText,
  bind,
  //bindAttr,
  //bindTag,
  //bindTagList,
  //bindText,
  //bindToDom,
  mountBinding,
  getText,
  bindAttr,
  getAttr,
} from "./observus-bindings";
import { State, createState, on } from "./observus-core";

test("get initial span text inside 2 divs to state", () => {
  document.body.innerHTML = `
  <div id="main">
    <div>
      <span>elo</span>
    </div>
  </div>
  `;
  const text = createState<string>("");
  const binding = bind(
    "#main",
    bind(
      "span",
      getText((v) => {
        text.set(v);
      }),
    ),
  );

  mountBinding(binding);
  expect(text.value).toEqual("elo");
});

test("bind span text to state", () => {
  document.body.innerHTML = `
  <div id="main">
    <div>
      <span>elo</span>
    </div>
  </div>
  `;
  const text = createState<string>("");
  const binding = bind(
    "#main",
    bind(
      "span",
      bindText(text.signal(), (v) => {
        text.set(v);
      }),
    ),
  );

  mountBinding(binding);
  expect(text.value).toEqual("elo");

  text.set("yolo");
  expect(document.querySelector("span")!.textContent).toEqual("yolo");
});

interface SomeModel {
  id: number;
  data: string;
}

test("get attribute from div", () => {
  document.body.innerHTML = `
  <div id="main">
    <div id="koko"></div>
  </div>
  `;
  let innerDivId: string | null = null;

  mountBinding(
    bind(
      "div#main",
      bind(
        "div",
        getAttr("id", (v) => {
          innerDivId = v;
        }),
      ),
    ),
  );

  expect(innerDivId).toEqual("koko");
});

test("bind span text and attribute to complex model", () => {
  document.body.innerHTML = `
  <div id="main">
    <div>
      <span id="1">elo</span>
    </div>
  </div>
  `;
  const model = createState<SomeModel>({ id: 0, data: "" });

  mountBinding(
    bind(
      "div#main",
      bind(
        "div",
        bind(
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
    ),
  );

  expect(model.value).toEqual({ id: 1, data: "elo" });

  model.set({ id: 10, data: "yolo" });
  expect(document.querySelector("span")!.textContent).toEqual("yolo");
  expect(document.querySelector("span")!.getAttribute("id")).toEqual("10");
});
//
//test("add onclick listener on button", () => {
//  document.body.innerHTML = `
//  <div>
//    <button>btn</button>
//  </div>
//  `;
//  let clicked = false;
//  const binding = bindTag(
//    "div",
//    bindTag(
//      "button",
//      on("click", () => {
//        clicked = true;
//      }),
//    ),
//  );
//
//  bindToDom(document.querySelector("div")!, binding);
//  document.querySelector("button")!.click();
//  expect(clicked).toEqual(true);
//});

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
