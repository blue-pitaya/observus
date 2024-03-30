import { installTraits } from "../src/dom2";
import { stopwatch } from "./stopwatch";
import { viewToggleExample } from "./viewToggle";

installTraits(
  {
    name: "stopwatch",
    callback: stopwatch,
  },
  {
    name: "view-toggle-example",
    callback: viewToggleExample,
  },
);
