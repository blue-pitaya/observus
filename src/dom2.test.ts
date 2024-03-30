import { mkState } from "./core";
import { bind } from "./dom2";

test("1", () => {
  const bgColor = mkState("red");
  const div = document.createElement("div");

  bind(div, {
    style: bgColor.map((v) => `background-color: ${v}`),
  });

  expect(div.style.backgroundColor)
});
