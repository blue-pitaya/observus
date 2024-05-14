import { lazyElementsSignal } from "./helpers";
import { Signal, mkElement, mkState, mkText, updateInPlace } from "./observus";

interface SomeItem {
  id: string;
  value: string;
}

test("lazyElementsSignal dont change elements when original signal is changed, without changing element keys", () => {
  const items = mkState<SomeItem[]>([
    { id: "1", value: "one" },
    { id: "2", value: "two" },
  ]);
  const createElement = (item: SomeItem) => {
    return mkElement("span", {}, mkText(item.value));
  };
  const elements = lazyElementsSignal(items, (item) => item.id, createElement);
  const myDiv = mkElement("div", {}, elements);

  const expected = "<div><span>one</span><span>two</span></div>";

  expect(myDiv.outerHTML).toBe(expected);

  updateInPlace(items, () => {
    items.value[0].value = "ONE";
  });

  //element should not change
  expect(myDiv.outerHTML).toBe(expected);
});

interface SomeDynItem {
  id: string;
  value: Signal<string>;
}

test("lazyElementsSignal handles nested signals", () => {
  const items = mkState<SomeDynItem[]>([
    { id: "1", value: mkState("one") },
    { id: "2", value: mkState("two") },
  ]);
  const createElement = (item: SomeDynItem) => {
    return mkElement("span", {}, mkText(item.value));
  };
  const elements = lazyElementsSignal(items, (item) => item.id, createElement);
  const myDiv = mkElement("div", {}, elements);

  expect(myDiv.outerHTML).toBe("<div><span>one</span><span>two</span></div>");

  updateInPlace(items, () => {
    items.value[0].value.set("ONE");
  });

  expect(myDiv.outerHTML).toBe("<div><span>ONE</span><span>two</span></div>");
});

test("lazyElemenSignal should change elements signal on list key change", () => {
  const items = mkState<SomeItem[]>([
    { id: "1", value: "one" },
    { id: "2", value: "two" },
  ]);
  const createElement = (item: SomeItem) => {
    return mkElement("span", {}, mkText(item.value));
  };
  const elements = lazyElementsSignal(items, (item) => item.id, createElement);
  const myDiv = mkElement("div", {}, elements);

  const expected = "<div><span>one</span><span>two</span></div>";

  expect(myDiv.outerHTML).toBe(expected);

  updateInPlace(items, () => {
    items.value.push({
      id: "3",
      value: "three",
    });
    items.value = items.value.filter((x) => x.id != "2");
  });

  //element should not change
  expect(myDiv.outerHTML).toBe("<div><span>one</span><span>three</span></div>");
});
