import { state, State } from "./ca";
import { text, tag, on, attr, tagSignal } from "./ct";

interface TodoItem {
  name: string;
  done: boolean;
}

function TodoItem(item: State<TodoItem>, remove: () => void): HTMLElement {
  const markDoneButton = tag(
    "button",
    text("Done!"),
    on("click", () => item.update((v) => ({ ...v, done: true }))),
  );
  const deleteButton = tag("button", text("Delete"), on("click", remove));
  const label = item.map((v) =>
    v.done ? tag("s", text(v.name)) : tag("span", text(v.name)),
  );

  return tag("li", tagSignal(label), markDoneButton, deleteButton);
}

export function TodoList(): HTMLElement {
  const itemsState = state<Array<State<TodoItem>>>([]); // state can be nested

  const inputField = tag("input", attr("type", "text")) as HTMLInputElement;

  const listComponent = itemsState.map((items) => {
    const todos = items.map((item) =>
      TodoItem(item, () => {
        itemsState.update((xs) => {
          return xs.filter((x) => x !== item);
        });
      }),
    );
    return tag("ul", ...todos);
  });

  const addTodo = () => {
    itemsState.update((vs) => {
      vs.push(state<TodoItem>({ name: inputField.value, done: false }));
      return vs;
    });
  };

  return tag(
    "div",
    tagSignal(listComponent),
    tag("div", inputField, tag("button", text("Add"), on("click", addTodo))),
  );
}
