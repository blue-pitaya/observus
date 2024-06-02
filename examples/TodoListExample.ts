import { _attrs, _ref, mkText } from "../src/dom";
import { Signal, mkState, notify } from "../src/observus";
import { button, div, input, li, s, span, ul } from "../src/tags";

interface TodoItem {
  name: string;
  done: boolean;
}

function TodoItem(item: Signal<TodoItem>, remove: () => void): HTMLElement {
  return li(
    item.map((v) => {
      const text = mkText(v.name);
      //TODO: leak?
      return v.done ? s(text) : span(text);
    }),
    button(
      _ref((e) => {
        e.addEventListener("click", () => {
          item.set({ ...item.value, done: true });
        });
      }),
      mkText("Done!"),
    ),
    button(
      _ref((e) => {
        e.addEventListener("click", remove);
      }),
      mkText("Delete"),
    ),
  );
}

export function TodoList() {
  const itemsState = mkState<Array<Signal<TodoItem>>>([]); // state can be nested

  const x = input(_attrs({ type: "text" }));

  return div(
    itemsState.map((items) => {
      const todos = items.map((item) =>
        TodoItem(item, () => {
          itemsState.set(itemsState.value.filter((x) => x !== item));
        }),
      );

      return ul(...todos);
    }),
    div(
      x,
      button(
        _ref((e) => {
          e.addEventListener("click", () => {
            notify(itemsState, () => {
              itemsState.value.push(
                mkState<TodoItem>({ name: x.value, done: false }),
              );
            });
          });
        }),
        mkText("Add"),
      ),
    ),
  );
}
