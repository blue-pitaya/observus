//import { State, tag, on, attr, elementSignal, mkState } from "observus";
//
//interface TodoItem {
//  name: string;
//  done: boolean;
//}
//
//function TodoItem(item: State<TodoItem>, remove: () => void) {
//  const markDoneButton = tag(
//    "button",
//    "Done!",
//    on("click", () => item.update((v) => ({ ...v, done: true }))),
//  );
//  const deleteButton = tag("button", "Delete", on("click", remove));
//  const label = item.map((v) =>
//    v.done ? tag("s", v.name) : tag("span", v.name),
//  );
//
//  return tag("li", elementSignal(label), markDoneButton, deleteButton);
//}
//
//export function TodoList() {
//  const itemsState = mkState<Array<State<TodoItem>>>([]); // state can be nested
//
//  const inputField = tag("input", attr("type", "text"));
//
//  const listComponent = itemsState.map((items) => {
//    const todos = items.map((item) =>
//      TodoItem(item, () => {
//        itemsState.update((xs) => {
//          return xs.filter((x) => x !== item);
//        });
//      }),
//    );
//    return tag("ul", ...todos);
//  });
//
//  const addTodo = () => {
//    itemsState.update((vs) => {
//      //FIXME:
//      vs.push(mkState<TodoItem>({ name: "inputField.value", done: false }));
//      return vs;
//    });
//  };
//
//  return tag(
//    "div",
//    elementSignal(listComponent),
//    tag("div", inputField, tag("button", "Add", on("click", addTodo))),
//  );
//}
