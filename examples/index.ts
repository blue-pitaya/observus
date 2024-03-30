import { build } from "../src/dom";
import { div } from "../src/tags";

const container = document.querySelector("#app")!;

container.appendChild(build(div({}, "elo")));
