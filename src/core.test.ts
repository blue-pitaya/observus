import { mkState, observe } from "./core";

test("observe dont run callback on definition", () => {
  let called = false;
  const a = mkState(10);

  observe(a.signal(), () => {
    called = true;
  });

  expect(called).toBe(false);
});
