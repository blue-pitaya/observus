import { attr, build, customAttr, mount, tag } from "./observus-core";
import { div } from "./observus-tags";

test("null or undefined setters are ignored", () => {
  const element = build(div("one", null, "two", undefined, "three"));

  expect(element.outerHTML).toBe("<div>onetwothree</div>");
});

test("mount append observus element as last child of root element", () => {
  document.body.innerHTML = '<div id="app"><span>trololo</span></div>';

  mount(document.querySelector("#app")!, tag("div", "hi"));

  expect(document.body.innerHTML).toBe(
    '<div id="app"><span>trololo</span><div>hi</div></div>',
  );
});

test("null or undefined attributes are not added", () => {
  const element = build(
    tag(
      "div",
      customAttr("a1", null),
      customAttr("a2", "foo"),
      customAttr("a3", undefined),
    ),
  );

  expect(element.outerHTML).toBe('<div a2="foo"></div>');
});

//function mounted(el: AnyObservusElement): AnyObservusElement {
//  mount(document.body, el);
//  return el;
//}
//
//
//test("string is treated as text node", () => {
//  const textValue = "elo";
//  const el = mounted(tag("div", textValue));
//
//  expect(el.el.textContent).toBe(textValue);
//});
//
//
//test("attribute that is undefined is not added", () => {
//  const el = mounted(tag("div", setAttr("custom", undefined)));
//
//  expect(el.el.getAttribute("custom")).toBeNull();
//});
//
//test("onMounted is called in in-order fashion", () => {
//  const order: string[] = [];
//  const el = tag(
//    "div",
//    attr("id", "1"),
//    tag(
//      "div",
//      attr("id", "2"),
//      onMounted((e) => {
//        order.push(e.id);
//      }),
//      tag(
//        "div",
//        attr("id", "3"),
//        onMounted((e) => {
//          order.push(e.id);
//        }),
//      ),
//    ),
//    tag(
//      "div",
//      attr("id", "4"),
//      onMounted((e) => {
//        order.push(e.id);
//      }),
//    ),
//    onMounted((e) => {
//      order.push(e.id);
//    }),
//  );
//  mount(document.body, el);
//
//  expect(order).toEqual(["1", "2", "3", "4"]);
//});
//
//test("onAfterMounted is called in post-order fashion", () => {
//  const order: string[] = [];
//  const el = tag(
//    "div",
//    attr("id", "1"),
//    tag(
//      "div",
//      attr("id", "2"),
//      onAfterMounted((e) => {
//        order.push(e.id);
//      }),
//      tag(
//        "div",
//        attr("id", "3"),
//        onAfterMounted((e) => {
//          order.push(e.id);
//        }),
//      ),
//    ),
//    tag(
//      "div",
//      attr("id", "4"),
//      onAfterMounted((e) => {
//        order.push(e.id);
//      }),
//    ),
//    onAfterMounted((e) => {
//      order.push(e.id);
//    }),
//  );
//  mount(document.body, el);
//
//  expect(order).toEqual(["3", "2", "4", "1"]);
//});
//
//test("combined signal works correctly", () => {
//  const a = createState<string>("a");
//  const b = createState<string>("b");
//  const f = createState<string>("f");
//
//  const combined = combineMany<string, string>(
//    [a.signal(), b.signal(), f.signal()],
//    (acc, x) => {
//      return `${acc}${x}`;
//    },
//    "",
//  );
//
//  expect(combined.getValue()).toEqual("abf");
//  a.update(() => "w");
//  expect(combined.getValue()).toEqual("wbf");
//  b.update(() => "t");
//  expect(combined.getValue()).toEqual("wtf");
//});
//
////as unintuitive as it is, it's just how javascript works
////who am I to judge it?
//test("combined signal works for reference value", () => {
//  const a = createState<string>("a");
//  const b = createState<string>("b");
//
//  const combined = combineMany<string, string[]>(
//    [a.signal(), b.signal()],
//    (acc, x) => {
//      acc.push(x);
//      return acc;
//    },
//    [],
//  );
//
//  expect(combined.getValue()).toEqual(["a", "b"]);
//  a.update(() => "c");
//  expect(combined.getValue()).toEqual(["a", "b", "c", "b"]);
//});
//
//test("tagsSignal work correctly", () => {
//  const values = createState<string[]>([]);
//  const tags: Signal<AnyObservusElement[]> = values.map((vs) =>
//    vs.map((v) => tag("span", v)),
//  );
//  const el = tag("div", "uno", tag("p", "dos"), tagsSignal(tags), "tres");
//
//  expect(el.el.innerHTML).toEqual("uno<p>dos</p>tres");
//  values.update(() => ["jeden", "dwa"]);
//  expect(el.el.innerHTML).toEqual(
//    "uno<p>dos</p><span>jeden</span><span>dwa</span>tres",
//  );
//  values.update(() => ["trzy"]);
//  expect(el.el.innerHTML).toEqual("uno<p>dos</p><span>trzy</span>tres");
//});
