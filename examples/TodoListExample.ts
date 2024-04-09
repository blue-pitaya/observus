import { State, mkState, mkText } from "../src/observus";
import { button, div, input, li, s, span, ul } from "../src/tags";

interface TodoItem {
  name: string;
  done: boolean;
}

function TodoItem(item: State<TodoItem>, remove: () => void): HTMLElement {
  return li(
    {},
    item.map((v) => {
      const text = mkText(v.name);
      //TODO: leak?
      return v.done ? s({}, text) : span({}, text);
    }),
    button(
      {
        on_click: () => {
          item.set({ ...item.value, done: true });
        },
      },
      mkText("Done!"),
    ),
    button(
      {
        on_click: remove,
      },
      mkText("Delete"),
    ),
  );
}

export function TodoList() {
  const itemsState = mkState<Array<State<TodoItem>>>([]); // state can be nested

  const x = input({ type: "text" });

  return div(
    {},
    itemsState.map((items) => {
      const todos = items.map((item) =>
        TodoItem(item, () => {
          itemsState.set(itemsState.value.filter((x) => x !== item));
        }),
      );

      return ul({}, ...todos);
    }),
    div(
      {},
      x,
      button(
        {
          on_click: () => {
            itemsState.value.push(
              mkState<TodoItem>({ name: x.value, done: false }),
            );
            //refresh
            itemsState.set(itemsState.value);
          },
        },
        mkText("Add"),
      ),
    ),
  );
}
