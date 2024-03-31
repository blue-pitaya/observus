import { mkState } from "../src/core";
import { mkText } from "../src/dom";
import { button, div, input, p } from "../src/tags";

export function TextInputExample() {
  const defaultText = "I'm always looking";
  const textInputValue = mkState(defaultText);

  return div(
    {},
    p({}, mkText(textInputValue.map((v) => `Current value: ${v}`))),
    input({
      type: "text",
      value: textInputValue.signal(),
      on_input: (e: any) => {
        textInputValue.set(e.target.value);
      },
    }),
    button(
      {
        on_click: () => textInputValue.set(defaultText),
      },
      mkText("Reset input"),
    ),
  );
}
