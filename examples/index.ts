import "./style.css";
import { install } from "../src/observus";
import { Stopwatch } from "./Stopwatch";
import { TextInputExample } from "./TextInputExample";
import { TodoList } from "./TodoListExample";
import { ViewToggle } from "./ViewToggle";

install("stopwatch", (e: Element) => {
  e.appendChild(Stopwatch());
});
install("view-toggle-example", (e: Element) => {
  e.appendChild(ViewToggle());
});
install("todo-list-example", (e: Element) => {
  e.appendChild(TodoList());
});
install("text-input-example", (e: Element) => {
  e.appendChild(TextInputExample());
});
