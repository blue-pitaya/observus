import { State, mkState } from "../../src/core";

const a: State<number> = mkState<number>(3);
const b = mkState(69);

// update state
b.set(420);
a.set(a.value * 2);

console.log(a.value); // 3 * 2 = 6

a.set(a.value + b.value + 10);
console.log(a.value); // 6 + 420 + 10 = 436
