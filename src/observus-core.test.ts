import { attr, mount, onAfterMounted, onMounted, tag } from "./observus-core";

test("onMounted is called in in-order fashion", () => {
  const order: string[] = [];
  const el = tag(
    "div",
    attr("id", "1"),
    tag(
      "div",
      attr("id", "2"),
      onMounted((e) => {
        order.push(e.id);
      }),
      tag(
        "div",
        attr("id", "3"),
        onMounted((e) => {
          order.push(e.id);
        }),
      ),
    ),
    tag(
      "div",
      attr("id", "4"),
      onMounted((e) => {
        order.push(e.id);
      }),
    ),
    onMounted((e) => {
      order.push(e.id);
    }),
  );
  mount(document.body, el);

  expect(order).toEqual(["1", "2", "3", "4"]);
});

test("onAfterMounted is called in post-order fashion", () => {
  const order: string[] = [];
  const el = tag(
    "div",
    attr("id", "1"),
    tag(
      "div",
      attr("id", "2"),
      onAfterMounted((e) => {
        order.push(e.id);
      }),
      tag(
        "div",
        attr("id", "3"),
        onAfterMounted((e) => {
          order.push(e.id);
        }),
      ),
    ),
    tag(
      "div",
      attr("id", "4"),
      onAfterMounted((e) => {
        order.push(e.id);
      }),
    ),
    onAfterMounted((e) => {
      order.push(e.id);
    }),
  );
  mount(document.body, el);

  expect(order).toEqual(["3", "2", "4", "1"]);
});
