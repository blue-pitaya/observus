import { _attrs, _ref, mkText } from "../src/dom";
import { mkState } from "../src/observus";
import { button, div, input, p } from "../src/tags";

export function TextInputExample() {
  const defaultText = "I'm always looking";
  const textInputValue = mkState(defaultText);

  return div(
    p(mkText(textInputValue.map((v) => `Current value: ${v}`))),
    input(
      _attrs({
        type: "text",
        value: textInputValue,
        on_input: (e: any) => {
          textInputValue.set(e.target.value);
        },
      }),
    ),
    button(
      _ref((e) => {
        e.addEventListener("click", () => {
          textInputValue.set(defaultText);
        });
      }),
      mkText("Reset input"),
    ),
  );
}
