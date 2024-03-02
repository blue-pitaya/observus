import { isNullOrUndef } from "./utils";

// DOM building

//TODO: proper types from ts
export interface EventListenerSetter {
  kind: "EventListenerSetter";
  type: string;
  listener: <A extends Event>(e: A) => void;
  options?: boolean | AddEventListenerOptions;
}

export type Setter = EventListenerSetter;

//TODO: proper types from ts
export const on = (
  type: string,
  listener: (e: Event) => void,
  options?: boolean | AddEventListenerOptions,
): EventListenerSetter => ({
  kind: "EventListenerSetter",
  type,
  listener,
  options,
});


function handleSetter(root: Element, setter: Setter) {
  if (isNullOrUndef(setter)) {
    return;
  }

  if (setter.kind == "EventListenerSetter") {
    root.addEventListener(setter.type, setter.listener, setter.options);
  }
}
