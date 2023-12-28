import { bindTag, bindText, bindToDom } from "./observus-bindings";
import { createState } from "./observus-core";

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
    bindTag("div", bindTag("span", bindText(text))),
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
    bindTag("div", bindTag("span", bindText(text))),
  );

  bindToDom(document.getElementById("main")!, binding);
  expect(text.value).toEqual("elo");

  text.set("yolo");
  expect(document.querySelector("span#binded")!.textContent).toEqual("yolo");
});
