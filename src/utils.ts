import { Signal } from "./core";

export function isSignal(v: any): v is Signal<any> {
  return (
    v !== undefined &&
    v !== null &&
    typeof v === "object" &&
    "type" in v &&
    v.type == "Signal"
  );
}
