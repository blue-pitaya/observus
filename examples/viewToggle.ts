import { mkState } from "../src/core";
import { mkText } from "../src/dom2";
import { button, div, span } from "../src/tags";

export function viewToggleExample(element: Element) {
  const count = mkState(0);

  const view1 = span(
    {
      style: "color: red",
    },
    mkText(count.map((v) => v.toString())),
  );

  const view2 = span(
    {
      style: "color: blue",
    },
    mkText(count.map((v) => v.toString())),
  );

  const showView1 = mkState(true);
  const currentView = showView1.map((v) => (v ? view1 : view2));

  element.appendChild(
    div(
      {},
      currentView,
      button(
        {
          on_click: () => showView1.set(!showView1.value),
        },
        mkText("Toggle view"),
      ),
      button(
        {
          on_click: () => count.set(count.value + 1),
        },
        mkText("Increment counter"),
      ),
    ),
  );
}
