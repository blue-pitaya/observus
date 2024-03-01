import { mkState, observe } from "./better-updates";

test("1", () => {
  const state = mkState({
    a: 1,
    b: 2,
  });

  let callCount = 0;
  observe(state, "a", (v) => {
    console.log(`a: ${v}`);
    callCount++;
  });
  observe(state, "b", (v) => {
    console.log(`b: ${v}`);
    callCount++;
  });

  state.setters.a = 10;
  state.setters.b = 20;

  expect(callCount).toBe(2);
  expect(state.value.a).toBe(10);
  expect(state.value.b).toBe(20);
});

test.only("2", () => {
  const state = mkState({
    a: 1,
    b: 2,
  });

  let callCount = 0;
  observe(state, "a", (v) => {
    console.log(`a 1: ${v}`);
    callCount++;
  });
  observe(state, "a", (v) => {
    console.log(`a 2: ${v}`);
    callCount++;
  });

  state.setters.a = 10;
  state.setters.a = 20;

  expect(callCount).toBe(4);
  expect(state.value.a).toBe(20);
});
