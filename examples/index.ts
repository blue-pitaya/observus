import "./style.css";
import { Stopwatch } from "./Stopwatch";
import { TextInputExample } from "./TextInputExample";
import { TodoList } from "./TodoListExample";
import { ViewToggle } from "./ViewToggle";
import { install } from "../src/dom";

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
