import { Signal } from "./core";

export type NullOrUndef = null | undefined;

export function isNullOrUndef(v: any): v is NullOrUndef {
  return v === undefined || v === null;
}

export function isSignal(v: any): v is Signal<any> {
  if (isNullOrUndef(v)) {
    return false;
  }

  return v.type == "Signal";
}
