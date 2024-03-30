import { State, mkState } from "observus";

const a: State<number> = mkState<number>(3);
const b = mkState(69);
const c = mkState<string>("nice");

// update state
a.update((x) => x * 2);

// update state without use of last value
b.update(() => 420);

// alias for update(() => ...)
c.set("hehe");

// current value of state
console.log(a.value); // 3 * 2 = 6

// you can safely use current value inside update functions
a.set(a.value + b.value + 10);
console.log(a.value); // 6 + 420 + 10 = 436
