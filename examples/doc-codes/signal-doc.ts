import { Signal, mkState } from "../../src/observus";

const a = mkState(10);

// create signal by mapping state
const timesTwo: Signal<number> = a.map((x) => x * 2);
console.log(timesTwo.value); // 20

// updating "a" will update "timesTwo" signal
a.set(3);
console.log(timesTwo.value); // 6

// signals can be mapped multiple times
const otherSignal = timesTwo.map((x) => x + 2).map((x) => x * 5);
console.log(otherSignal.value); // a = 3, ((3 * 2) + 2) * 5 = 40
