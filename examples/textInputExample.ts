import { attr, mkState, on, tag, textSignal } from "observus";

//TODO: explain why is this important using laminar doc on "controlled"
//TODO: example of input that blocks numbers
//TEST: what happend if i use restricted for 2 inputs?

export function TextInputExample() {
  const defaultValue = "I'm always looking";
  const value = mkState(defaultValue);
  const label = value.map((v) => `Current value: ${v}`);

  return tag(
    "div",
    tag("p", textSignal(label)),
    tag(
      "input",
      attr("type", "text"),
      attr("value", value.signal()),
      on("input", (e: any) => {
        value.update(() => e.target.value);
      }),
    ),
    tag(
      "button",
      on("click", () => value.update(() => defaultValue)),
      "Reset input",
    ),
  );
}
