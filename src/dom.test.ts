import { build, mkElement, mkText, setAttr } from "./dom";
import { mkState } from "./core";

test("1", () => {
  const element = build(
    mkElement(
      "div",
      {
        className: "foo",
      },
      mkElement("span", {}, mkText("bar")),
    ),
  );

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
  expect(element.outerHTML).toBe('<div class="foo"><span>bar</span></div>');
});

test("2", () => {
  const classNameState = mkState("foo");
  const elementSetter = mkElement("div", {
    className: classNameState.signal(),
  });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("3", () => {
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

test("attrs handle numeric value", () => {
  const element = build(
    mkElement("textarea", {
      rows: 300,
    }),
  );

  expect(element.outerHTML).toBe('<textarea rows="300"></textarea>');
});

test("custom attr can be set using setAttribute", () => {
  const element = build(
    mkElement("div", {
      foo: setAttr("bar"),
    }),
  );

  expect(element.outerHTML).toBe('<div foo="bar"></div>');
});
