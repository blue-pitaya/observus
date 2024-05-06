import { mkState, mkText } from "../src/observus";
import { button, div, input, p } from "../src/tags";

export function TextInputExample() {
  const defaultText = "I'm always looking";
  const textInputValue = mkState(defaultText);

  return div(
    {},
    p({}, mkText(textInputValue.map((v) => `Current value: ${v}`))),
    input({
      type: "text",
      value: textInputValue,
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
