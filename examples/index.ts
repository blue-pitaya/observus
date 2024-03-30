import { installTraits } from "../src/dom2";
import { Stopwatch } from "./Stopwatch";
import { TodoList } from "./TodoListExample";
import { ViewToggle } from "./ViewToggle";

installTraits(
  {
    name: "stopwatch",
    callback: (e: Element) => {
      e.appendChild(Stopwatch());
    },
  },
  {
    name: "view-toggle-example",
    callback: (e: Element) => {
      e.appendChild(ViewToggle());
    },
  },
  {
    name: "todo-list-example",
    callback: (e: Element) => {
      e.appendChild(TodoList());
    },
  },
);
