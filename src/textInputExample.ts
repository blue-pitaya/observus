import {
  attr,
  createRestrictedSignal,
  createState,
  on,
  tag,
  text,
} from "./observus";

//TODO: explain why is this important using laminar doc on "controlled"
//TODO: example of input that blocks numbers
//TEST: what happend if i use restricted for 2 inputs?

export function TextInputExample(): HTMLElement {
  const defaultValue = "I'm always looking";
  const value = createState(defaultValue);
  const label = value.map((v) => `Current value: ${v}`);
  const [restrictedSignal, update] = createRestrictedSignal(value);

  return tag(
    "div",
    tag("p", text(label)),
    tag(
      "input",
      attr("type", "text"),
      attr("value", restrictedSignal),
      on("input", (e: any) => {
        update(() => e.target.value);
      }),
    ),
    tag(
      "button",
      on("click", () => value.update(() => defaultValue)),
      text("Reset input"),
    ),
  );
}
