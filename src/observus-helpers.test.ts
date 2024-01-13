import { build, mkState, tag } from "./observus-core";
import { styleObj } from "./observus-helpers";

test("styleObj parse signals correctly", () => {
  const color = mkState("red");
  const element = build(
    tag(
      "div",
      styleObj({
        color: color.signal(),
        display: "block",
      }),
    ),
  );

  expect(element.getAttribute("style")).toBe("color: red; display: block;");
  color.update(() => "blue");
  expect(element.getAttribute("style")).toBe("color: blue; display: block;");
});

test("styleObj parse signals with undefined value correctly", () => {
  const color = mkState<string | undefined>("red");
  const element = build(
    tag(
      "div",
      styleObj({
        margin: "1px",
        color: color.signal(),
        display: "block",
      }),
    ),
  );

  expect(element.getAttribute("style")).toEqual(
    "margin: 1px; color: red; display: block;",
  );
  color.update(() => undefined);
  expect(element.getAttribute("style")).toEqual("margin: 1px; display: block;");
});
