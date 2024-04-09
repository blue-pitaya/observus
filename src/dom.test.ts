import { Signal, mkElement, mkState, mkText } from "./observus";

test("1", () => {
  const element = mkElement(
    "div",
    {
      className: "foo",
    },
    mkElement("span", {}, mkText("bar")),
  );

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
  expect(element.outerHTML).toBe('<div class="foo"><span>bar</span></div>');
});

test("2", () => {
  const classNameState = mkState("foo");
  const element = mkElement("div", {
    className: classNameState.signal(),
  });

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("3", () => {
  let called = false;
  mkElement(
    "div",
    {
      className: "foo",
      on_created: () => {
        called = true;
      },
    },
    mkElement("span", {}, mkText("bar")),
  );

  expect(called).toBe(true);
});

test("attrs handle numeric value", () => {
  const element = mkElement("textarea", {
    rows: 300,
  });

  expect(element.outerHTML).toBe('<textarea rows="300"></textarea>');
});

//test("custom attr can be set using setAttribute", () => {
//  const element = build(
//    mkElement("div", {
//      foo: setAttr("bar"),
//    }),
//  );
//
//  expect(element.outerHTML).toBe('<div foo="bar"></div>');
//});

//test("attr is removed is signal value is undefined for set attr strategy", () => {
//  const className = mkState<string | undefined>("bar");
//  const element = build(
//    mkElement("div", {
//      foo: setAttr(className.signal()),
//    }),
//  );
//  className.set(undefined);
//
//  expect(element.outerHTML).toBe("<div></div>");
//});

test("boolean attributes are handled", () => {
  const element = mkElement("input", {
    type: "text",
    required: true,
  });

  const expected = document.createElement("input");
  expected.type = "text";
  expected.required = true;

  expect(element.outerHTML).toBe(expected.outerHTML);
});

test("text signal as element blueprint works", () => {
  const text = mkState("foo");
  const element = mkElement("div", {}, mkText(text.signal()));

  text.set("bar");

  expect(element.outerHTML).toBe("<div>bar</div>");
});

test("element signal works", () => {
  const state = mkState(true);
  const signal = state.map((v) => {
    return v
      ? mkElement("p", {}, mkText("foo"))
      : mkElement("span", {}, mkText("bar"));
  });

  const element = mkElement("div", {}, signal);
  expect(element.outerHTML).toBe("<div><p>foo</p></div>");

  state.set(false);
  expect(element.outerHTML).toBe("<div><span>bar</span></div>");
});

test("elements array signal works", () => {
  const state = mkState(true);
  const signal = state.map((v) => {
    return v
      ? [
          mkElement("p", {}, mkText("foo")),
          mkElement("span", {}, mkText("bar")),
        ]
      : [mkElement("div", {}, mkText("baz"))];
  });

  const element = mkElement(
    "div",
    {},
    mkElement("p", {}, mkText("prev")),
    signal,
    mkElement("p", {}, mkText("next")),
  );

  expect(element.outerHTML).toBe(
    "<div><p>prev</p><p>foo</p><span>bar</span><p>next</p></div>",
  );

  state.set(false);
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><div>baz</div><p>next</p></div>",
  );
});

test("elements array signal with strings works", () => {
  const state = mkState(true);
  const signal: Signal<Node[]> = state.map((v) => {
    return v
      ? [mkElement("p", {}, mkText("foo")), mkText("bar")]
      : [mkElement("div", {}, mkText("baz"))];
  });

  const element = mkElement(
    "div",
    {},
    mkElement("p", {}, mkText("prev")),
    signal,
    mkElement("p", {}, mkText("next")),
  );

  expect(element.outerHTML).toBe(
    "<div><p>prev</p><p>foo</p>bar<p>next</p></div>",
  );

  state.set(false);
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><div>baz</div><p>next</p></div>",
  );
});

//test("built elements array signal works", () => {
//  const state = mkState(true);
//  const readyElement = build(mkElement("div", {}, "1"));
//  const signal = state.map((v) => {
//    return v
//      ? [readyElement, mkElement("p", {}, "foo"), "bar"]
//      : [mkElement("div", {}, "baz")];
//  });
//
//  const element = build(
//    mkElement(
//      "div",
//      {},
//      mkElement("p", {}, "prev"),
//      signal,
//      mkElement("p", {}, "next"),
//    ),
//  );
//  expect(element.outerHTML).toBe(
//    "<div><p>prev</p><div>1</div><p>foo</p>bar<p>next</p></div>",
//  );
//
//  state.set(false);
//  expect(element.outerHTML).toBe(
//    "<div><p>prev</p><div>baz</div><p>next</p></div>",
//  );
//});

test("setting event listener works", () => {
  let called = false;
  const element = mkElement("div", {
    on_click: () => {
      called = true;
    },
  });
  element.click();

  expect(called).toBe(true);
});

//test("null or undefined attributes are not added", () => {
//  const element = build(
//    mkElement("div", {
//      a1: setAttr(null),
//      a2: setAttr("foo"),
//      a3: setAttr(undefined),
//    }),
//  );
//
//  expect(element.outerHTML).toBe('<div a2="foo"></div>');
//});

//test("set attr on signal is working", () => {
//  expect(false).toBe(true);
//});
