import { Signal } from "./core";

export type NullOrUndef = null | undefined;

export function isNullOrUndef(v: any): v is NullOrUndef {
  return v === undefined || v === null;
}

//TODO: remove <A> and just use any?
export function isSignal<A>(v: any): v is Signal<A> {
  return (
    typeof v === "object" &&
    !isNullOrUndef(v) &&
    "type" in v &&
    v.type == "Signal"
  );
}
