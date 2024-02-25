import { mkState, signal } from "./core";
import { mkElement, build } from "./dom";

test("1", () => {
  const elementSetter: any = mkElement("div", { className: "foo" });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("2", () => {
  const classNameState = mkState("foo");
  const elementSetter: any = mkElement("div", { className: signal(classNameState) });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});
