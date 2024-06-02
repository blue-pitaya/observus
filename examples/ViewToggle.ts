import { _attrs, _on, mkText } from "../src/dom";
import { mkState } from "../src/observus";
import { button, div, span } from "../src/tags";

export function ViewToggle() {
  const count = mkState(0);

  const view1 = span(
    _attrs({
      style: "color: red",
    }),
    mkText(count.map((v) => v.toString())),
  );

  const view2 = span(
    _attrs({
      style: "color: blue",
    }),
    mkText(count.map((v) => v.toString())),
  );

  const showView1 = mkState(true);
  const currentView = showView1.map((v) => (v ? view1 : view2));

  return div(
    currentView,
    button(
      _on("click", () => showView1.set(!showView1.value)),
      mkText("Toggle view"),
    ),
    button(
      _on("click", () => count.set(count.value + 1)),
      mkText("Increment counter"),
    ),
  );
}
