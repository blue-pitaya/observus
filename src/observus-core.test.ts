import { AnyObservusElement } from "./observus-core";
import {
  attr,
  mount,
  onAfterMounted,
  onMounted,
  setAttr,
  tag,
} from "./observus-core";

function mounted(el: AnyObservusElement): AnyObservusElement {
  mount(document.body, el);
  return el;
}

test("mount removes all pre-existing children of root element", () => {
  document.body.innerHTML = '<div id="app"><span>trololo</span></div>';
  const root = document.querySelector("#app")!;

  mount(root, tag("div"));

  expect(root.childNodes.length).toEqual(1);
});

test("string is treated as text node", () => {
  const textValue = "elo";
  const el = mounted(tag("div", textValue));

  expect(el.el.textContent).toBe(textValue);
});

test("attribute that is null is not added", () => {
  const el = mounted(tag("div", setAttr("custom", null)));

  expect(el.el.getAttribute("custom")).toBeNull();
});

test("attribute that is undefined is not added", () => {
  const el = mounted(tag("div", setAttr("custom", undefined)));

  expect(el.el.getAttribute("custom")).toBeNull();
});

test("onMounted is called in in-order fashion", () => {
  const order: string[] = [];
  const el = tag(
    "div",
    attr("id", "1"),
    tag(
      "div",
      attr("id", "2"),
      onMounted((e) => {
        order.push(e.id);
      }),
      tag(
        "div",
        attr("id", "3"),
        onMounted((e) => {
          order.push(e.id);
        }),
      ),
    ),
    tag(
      "div",
      attr("id", "4"),
      onMounted((e) => {
        order.push(e.id);
      }),
    ),
    onMounted((e) => {
      order.push(e.id);
    }),
  );
  mount(document.body, el);

  expect(order).toEqual(["1", "2", "3", "4"]);
});

test("onAfterMounted is called in post-order fashion", () => {
  const order: string[] = [];
  const el = tag(
    "div",
    attr("id", "1"),
    tag(
      "div",
      attr("id", "2"),
      onAfterMounted((e) => {
        order.push(e.id);
      }),
      tag(
        "div",
        attr("id", "3"),
        onAfterMounted((e) => {
          order.push(e.id);
        }),
      ),
    ),
    tag(
      "div",
      attr("id", "4"),
      onAfterMounted((e) => {
        order.push(e.id);
      }),
    ),
    onAfterMounted((e) => {
      order.push(e.id);
    }),
  );
  mount(document.body, el);

  expect(order).toEqual(["3", "2", "4", "1"]);
});
