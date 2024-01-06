//FIXME:!!!
//import { createState, tag } from "./observus-core";
//import { styleObj } from "./observus-helpers";
//
//test("styleObj parse signals correctly", () => {
//  const color = createState<string>("red");
//  const el = tag(
//    "div",
//    styleObj({
//      color: color.signal(),
//      display: "block",
//    }),
//  );
//
//  expect(el.el.getAttribute("style")).toEqual("color: red; display: block;");
//  color.update(() => "blue");
//  expect(el.el.getAttribute("style")).toEqual("color: blue; display: block;");
//});
//
//test("styleObj parse signals with undefined value correctly", () => {
//  const color = createState<string | undefined>("red");
//  const el = tag(
//    "div",
//    styleObj({
//      margin: "1px",
//      color: color.signal(),
//      display: "block",
//    }),
//  );
//
//  expect(el.el.getAttribute("style")).toEqual("margin: 1px; color: red; display: block;");
//  color.update(() => undefined);
//  expect(el.el.getAttribute("style")).toEqual("margin: 1px; display: block;");
//});
