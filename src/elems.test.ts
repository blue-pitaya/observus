import { build, mkElement, mkText } from "./elems";

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

  expect(element.outerHTML).toBe('<div class="foo"><span>bar</span></div>');
});

test("2", () => {
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
