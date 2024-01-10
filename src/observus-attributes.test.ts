import _ from "./observus-attributes";
import { build, state, tag } from "./observus-core";

test("style attribute as signal dont create duplicates on change", () => {
  const style = state("display: block;");
  const element = build(tag("div", _.style(style.signal())));
  style.set("display: flex;");

  expect(element.getAttribute("style")).toEqual("display: flex;");
});
