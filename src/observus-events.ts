import { on } from "./observus";

//TODO: is this really needed? since i can use extensive types of existing eventListeners
export const onClick = (
  cb: (e: PointerEvent) => void,
  options?: boolean | AddEventListenerOptions,
) => on("click", cb as (e: Event) => void, options);
