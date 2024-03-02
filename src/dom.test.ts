import { build, mkElement, mkSvgElement, setAttr } from "./dom";
import { mkState } from "./core";

test("1", () => {
  const element = build(
    mkElement(
      "div",
      {
        className: "foo",
      },
      mkElement("span", {}, "bar"),
    ),
  );

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
  expect(element.outerHTML).toBe('<div class="foo"><span>bar</span></div>');
});

test("2", () => {
  const classNameState = mkState("foo");
  const elementSetter = mkElement("div", {
    className: classNameState.signal(),
  });
  const element = build(elementSetter);

  expect(element.tagName).toBe("DIV");
  expect(element.className).toBe("foo");
});

test("3", () => {
  let called = false;
  build(
    mkElement(
      "div",
      {
        className: "foo",
        on_created: () => {
          called = true;
        },
      },
      mkElement("span", {}, "bar"),
    ),
  );

  expect(called).toBe(true);
});

test("attrs handle numeric value", () => {
  const element = build(
    mkElement("textarea", {
      rows: 300,
    }),
  );

  expect(element.outerHTML).toBe('<textarea rows="300"></textarea>');
});

test("custom attr can be set using setAttribute", () => {
  const element = build(
    mkElement("div", {
      foo: setAttr("bar"),
    }),
  );

  expect(element.outerHTML).toBe('<div foo="bar"></div>');
});

test("attr is removed is signal value is undefined for set attr strategy", () => {
  const className = mkState<string | undefined>("bar");
  const element = build(
    mkElement("div", {
      foo: setAttr(className.signal()),
    }),
  );
  className.set(undefined);

  expect(element.outerHTML).toBe("<div></div>");
});

test("boolean attributes are handled", () => {
  const element = build(
    mkElement("input", {
      type: "text",
      required: true,
    }),
  );

  const expected = document.createElement("input");
  expected.type = "text";
  expected.required = true;

  expect(element.outerHTML).toBe(expected.outerHTML);
});

test("text signal as element blueprint works", () => {
  const text = mkState("foo");
  const element = build(mkElement("div", {}, text.signal()));

  text.set("bar");

  expect(element.outerHTML).toBe("<div>bar</div>");
});

test("element signal works", () => {
  const state = mkState(true);
  const signal = state.map((v) => {
    return v ? mkElement("p", {}, "foo") : mkElement("span", {}, "bar");
  });

  const element = build(mkElement("div", {}, signal));
  expect(element.outerHTML).toBe("<div><p>foo</p></div>");

  state.set(false);
  expect(element.outerHTML).toBe("<div><span>bar</span></div>");
});

test("elements array signal works", () => {
  const state = mkState(true);
  const signal = state.map((v) => {
    return v
      ? [mkElement("p", {}, "foo"), mkElement("span", {}, "bar")]
      : [mkElement("div", {}, "baz")];
  });

  const element = build(
    mkElement(
      "div",
      {},
      mkElement("p", {}, "prev"),
      signal,
      mkElement("p", {}, "next"),
    ),
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
  const signal = state.map((v) => {
    return v
      ? [mkElement("p", {}, "foo"), "bar"]
      : [mkElement("div", {}, "baz")];
  });

  const element = build(
    mkElement(
      "div",
      {},
      mkElement("p", {}, "prev"),
      signal,
      mkElement("p", {}, "next"),
    ),
  );
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><p>foo</p>bar<p>next</p></div>",
  );

  state.set(false);
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><div>baz</div><p>next</p></div>",
  );
});

test("built elements array signal works", () => {
  const state = mkState(true);
  const readyElement = build(mkElement("div", {}, "1"));
  const signal = state.map((v) => {
    return v
      ? [readyElement, mkElement("p", {}, "foo"), "bar"]
      : [mkElement("div", {}, "baz")];
  });

  const element = build(
    mkElement(
      "div",
      {},
      mkElement("p", {}, "prev"),
      signal,
      mkElement("p", {}, "next"),
    ),
  );
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><div>1</div><p>foo</p>bar<p>next</p></div>",
  );

  state.set(false);
  expect(element.outerHTML).toBe(
    "<div><p>prev</p><div>baz</div><p>next</p></div>",
  );
});

test("setting event listener works", () => {
  let called = false;
  const element = build(
    mkElement("div", {
      on_click: () => {
        called = true;
      },
    }),
  );
  element.click();

  expect(called).toBe(true);
});
