import { build, mkElement, mkText } from "./dom";
import { mkState } from "./core";

test("1", () => {
  const elementSetter: any = mkElement("div", { className: "foo" });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("2", () => {
  const classNameState = mkState("foo");
  const elementSetter: any = mkElement("div", {
    className: classNameState.signal(),
  });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("3", () => {
  const element = build(
    mkElement(
      "div",
      {
        className: "foo",
      },
      mkElement("span", {}, mkText("bar")),
    ),
  );

  expect(element.outerHTML).toBe('<div class="foo"><span>bar</span></div>');
});

test("4", () => {
  let called = false;
  build(
    mkElement(
      "div",
      {
        className: "foo",
        onCreated: () => {
          called = true;
        },
      },
      mkElement("span", {}, mkText("bar")),
    ),
  );

  expect(called).toBe(true);
});
