//test("null or undefined setters are ignored", () => {
//  const element = build(div("one", null, "two", undefined, "three"));
//
//  expect(element.outerHTML).toBe("<div>onetwothree</div>");
//});
//
//test("mount append observus element as last child of root element", () => {
//  document.body.innerHTML = '<div id="app"><span>trololo</span></div>';
//
//  mount(document.querySelector("#app")!, tag("div", "hi"));
//
//  expect(document.body.innerHTML).toBe(
//    '<div id="app"><span>trololo</span><div>hi</div></div>',
//  );
//});
//
//test("null or undefined attributes are not added", () => {
//  const element = build(
//    tag(
//      "div",
//      customAttr("a1", null),
//      customAttr("a2", "foo"),
//      customAttr("a3", undefined),
//    ),
//  );
//
//  expect(element.outerHTML).toBe('<div a2="foo"></div>');
//});
//
//test("extends appends new attributes", () => {
//  const component = tag("div", attr("id", "uno")).extend(
//    customAttr("role", "dos"),
//  );
//  const element = build(component);
//
//  expect(element.outerHTML).toBe('<div id="uno" role="dos"></div>');
//});
//
//test("extends replaces attributes", () => {
//  const component = tag("div", attr("id", "uno")).extend(
//    customAttr("id", "dos"),
//  );
//  const element = build(component);
//
//  expect(element.outerHTML).toBe('<div id="dos"></div>');
//});
//
////TODO: think about this
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
//
//test("lazy state sets will run unique observers once", () => {
//  const a = mkState(1);
//  const b = mkState("a");
//  const combined = combine(a.signal(), b.signal(), () => {
//    return {};
//  });
//
//  let times = 0;
//  observe(a.signal(), () => {
//    times++;
//  });
//  observe(b.signal(), () => {
//    times++;
//  });
//  observe(combined, () => {
//    times++;
//  });
//
//  updateMany(lazySet(a, 2), lazySet(b, "b"));
//
//  // 3 on bining + 3 from executeUpdated
//  expect(times).toBe(6);
//});
//
//test("observe dont run immidetaly", () => {
//  const state = mkState("foo");
//  let result: any = null;
//
//  observe(state.signal(), (value) => {
//    result = value;
//  });
//
//  expect(result).toBe(null);
//});
//
//test.only("observe is called only if observed signal has changed", () => {
//  const state = mkState({ a: 10, b: { b1: "foo", b2: "bar" }, c: "ok" });
//  let calls = 0;
//
//  observe(state.signal(), () => {
//    calls++;
//  });
//  observe(
//    state.map((v) => v.a),
//    () => {
//      calls++;
//    },
//  );
//  observe(
//    state.map((v) => v.b.b1),
//    () => {},
//  );
//
//  //state.update((v) => ({...v, }));
//});
//
////function mounted(el: AnyObservusElement): AnyObservusElement {
////  mount(document.body, el);
////  return el;
////}
////
////
////test("string is treated as text node", () => {
////  const textValue = "elo";
////  const el = mounted(tag("div", textValue));
////
////  expect(el.el.textContent).toBe(textValue);
////});
////
////
////test("attribute that is undefined is not added", () => {
////  const el = mounted(tag("div", setAttr("custom", undefined)));
////
////  expect(el.el.getAttribute("custom")).toBeNull();
////});
////
////test("onMounted is called in in-order fashion", () => {
////  const order: string[] = [];
////  const el = tag(
////    "div",
////    attr("id", "1"),
////    tag(
////      "div",
////      attr("id", "2"),
////      onMounted((e) => {
////        order.push(e.id);
////      }),
////      tag(
////        "div",
////        attr("id", "3"),
////        onMounted((e) => {
////          order.push(e.id);
////        }),
////      ),
////    ),
////    tag(
////      "div",
////      attr("id", "4"),
////      onMounted((e) => {
////        order.push(e.id);
////      }),
////    ),
////    onMounted((e) => {
////      order.push(e.id);
////    }),
////  );
////  mount(document.body, el);
////
////  expect(order).toEqual(["1", "2", "3", "4"]);
////});
////
////test("onAfterMounted is called in post-order fashion", () => {
////  const order: string[] = [];
////  const el = tag(
////    "div",
////    attr("id", "1"),
////    tag(
////      "div",
////      attr("id", "2"),
////      onAfterMounted((e) => {
////        order.push(e.id);
////      }),
////      tag(
////        "div",
////        attr("id", "3"),
////        onAfterMounted((e) => {
////          order.push(e.id);
////        }),
////      ),
////    ),
////    tag(
////      "div",
////      attr("id", "4"),
////      onAfterMounted((e) => {
////        order.push(e.id);
////      }),
////    ),
////    onAfterMounted((e) => {
////      order.push(e.id);
////    }),
////  );
////  mount(document.body, el);
////
////  expect(order).toEqual(["3", "2", "4", "1"]);
////});
////
////test("combined signal works correctly", () => {
////  const a = createState<string>("a");
////  const b = createState<string>("b");
////  const f = createState<string>("f");
////
////  const combined = combineMany<string, string>(
////    [a.signal(), b.signal(), f.signal()],
////    (acc, x) => {
////      return `${acc}${x}`;
////    },
////    "",
////  );
////
////  expect(combined.getValue()).toEqual("abf");
////  a.update(() => "w");
////  expect(combined.getValue()).toEqual("wbf");
////  b.update(() => "t");
////  expect(combined.getValue()).toEqual("wtf");
////});
////
//////as unintuitive as it is, it's just how javascript works
//////who am I to judge it?
////test("combined signal works for reference value", () => {
////  const a = createState<string>("a");
////  const b = createState<string>("b");
////
////  const combined = combineMany<string, string[]>(
////    [a.signal(), b.signal()],
////    (acc, x) => {
////      acc.push(x);
////      return acc;
////    },
////    [],
////  );
////
////  expect(combined.getValue()).toEqual(["a", "b"]);
////  a.update(() => "c");
////  expect(combined.getValue()).toEqual(["a", "b", "c", "b"]);
////});
////
////test("tagsSignal work correctly", () => {
////  const values = createState<string[]>([]);
////  const tags: Signal<AnyObservusElement[]> = values.map((vs) =>
////    vs.map((v) => tag("span", v)),
////  );
////  const el = tag("div", "uno", tag("p", "dos"), tagsSignal(tags), "tres");
////
////  expect(el.el.innerHTML).toEqual("uno<p>dos</p>tres");
////  values.update(() => ["jeden", "dwa"]);
////  expect(el.el.innerHTML).toEqual(
////    "uno<p>dos</p><span>jeden</span><span>dwa</span>tres",
////  );
////  values.update(() => ["trzy"]);
////  expect(el.el.innerHTML).toEqual("uno<p>dos</p><span>trzy</span>tres");
////});
