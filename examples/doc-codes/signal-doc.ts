import { Signal, mkState, signal } from "../../src/observus";

const a = mkState(10);

// create signal by mapping state
const timesTwo: Signal<number> = a.map((x) => x * 2);
console.log(timesTwo.getValue()); // 20

// create signal from state
// alias for: a.map((x) => x);
const aSignal = a.signal();

// updating "a" will update "timesTwo" signal
a.set(3);
console.log(timesTwo.getValue()); // 6

// signals can be mapped multiple times
const otherSignal = timesTwo.map((x) => x + 2).map((x) => x * 5);
console.log(otherSignal.getValue()); // a = 3, ((3 * 2) + 2) * 5 = 40

// create constant signal
// useful when function requires signal, but you want to pass value
const immutableSignal = signal("hehe");
