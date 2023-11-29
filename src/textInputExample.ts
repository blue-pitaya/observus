import {
  AnyObservusElement,
  attr,
  createState,
  on,
  tag,
  text,
} from "./observus-core";

//TODO: explain why is this important using laminar doc on "controlled"
//TODO: example of input that blocks numbers
//TEST: what happend if i use restricted for 2 inputs?

export function TextInputExample() {
  const defaultValue = "I'm always looking";
  const value = createState(defaultValue);
  const label = value.map((v) => `Current value: ${v}`);

  return tag(
    "div",
    tag("p", text(label)),
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
      text("Reset input"),
    ),
  );
}
