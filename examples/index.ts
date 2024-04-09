import "./style.css";
import { initObservus } from "../src/observus";
import { Stopwatch } from "./Stopwatch";
import { TextInputExample } from "./TextInputExample";
import { TodoList } from "./TodoListExample";
import { ViewToggle } from "./ViewToggle";

initObservus(
  {
    name: "stopwatch",
    run: (e: Element) => {
      e.appendChild(Stopwatch());
    },
  },
  {
    name: "view-toggle-example",
    run: (e: Element) => {
      e.appendChild(ViewToggle());
    },
  },
  {
    name: "todo-list-example",
    run: (e: Element) => {
      e.appendChild(TodoList());
    },
  },
  {
    name: "text-input-example",
    run: (e: Element) => {
      e.appendChild(TextInputExample());
    },
  },
);
