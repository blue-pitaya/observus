import { combine, mkState, observe } from "./core";
import { mkElement } from "./dom";

test("observe dont run callback on definition", () => {
  let called = false;
  const a = mkState(10);

  observe(a.signal(), () => {
    called = true;
  });

  expect(called).toBe(false);
});

//TODO: think about this
//test("huge amount of mapped signals wont throw stackoverflow", () => {
//  //const size = 100 * 1000;
//  const size = 1;
//  const s = mkState(0);
//  let signal = s.signal();
//  let i = 0;
//
//  //stack exceeded at 12333 on my machine
//  for (i = 0; i < size; i++) {
//    signal = signal.map((x) => x + 1);
//  }
//
//  expect(signal.getValue()).toBe(size);
//});

test("observe dont run immidetaly", () => {
  const state = mkState("foo");
  let result: any = null;

  observe(state.signal(), (value) => {
    result = value;
  });

  expect(result).toBe(null);
});

//TODO: weird test
test("observe is called only if observed signal has changed", () => {
  const state = mkState({ a: 10, b: { b1: "foo", b2: "bar" }, c: "ok" });
  let calls = 0;

  observe(state.signal(), () => {
    calls++;
  });
  observe(
    state.map((v) => v.a),
    () => {
      calls++;
    },
  );
  observe(
    state.map((v) => v.b.b1),
    () => {
      calls++;
    },
  );

  const v = state.value;
  v.a = 20;
  v.b.b1 = "baz";
  state.set(v);

  expect(calls).toBe(3);
});

test("on_created is called in post-order fashion", () => {
  const order: string[] = [];
  mkElement(
    "div",
    {
      id: "1",
      on_created: () => {
        order.push("1");
      },
    },
    mkElement(
      "div",
      {
        id: "2",
        on_created: () => {
          order.push("2");
        },
      },
      mkElement("div", {
        id: "3",
        on_created: () => {
          order.push("3");
        },
      }),
    ),
    mkElement("div", {
      id: "4",
      on_created: () => {
        order.push("4");
      },
    }),
  );

  expect(order).toEqual(["3", "2", "4", "1"]);
});

test("combined signal works correctly", () => {
  const a = mkState<string>("a");
  const b = mkState<string>("b");
  const f = mkState<string>("f");

  const combined = combine(
    [a.signal(), b.signal(), f.signal()],
    ([a, b, c]) => {
      return `${a}${b}${c}`;
    },
  );

  expect(combined.getValue()).toEqual("abf");
  a.set("w");
  expect(combined.getValue()).toEqual("wbf");
  b.set("t");
  expect(combined.getValue()).toEqual("wtf");
});
