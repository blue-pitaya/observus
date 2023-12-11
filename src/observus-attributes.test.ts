import { style } from "./observus-attributes";
import { createState, tag } from "./observus-core";

test("style as signal dont create duplicated on change", () => {
  const _style = createState<string>("display: block;");
  const el = tag("div", style(_style.signal()));
  _style.update(() => "display: flex;");

  expect(el.el.getAttribute("style")).toEqual("display: flex;");
});