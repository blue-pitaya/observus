import { Signal, setAttr } from "./observus";

type A = string | Signal<string | null>;
export const transform = (v: A) => setAttr("transform", v);
export const width = (v: A) => setAttr("width", v);
export const height = (v: A) => setAttr("height", v);
export const stroke = (v: A) => setAttr("stroke", v);
export const strokeWidth = (v: A) => setAttr("stroke-width", v);
export const fill = (v: A) => setAttr("fill", v);
//TODO: allow A | number | Singal<number>?
export const x1 = (v: A) => setAttr("x1", v);
export const y1 = (v: A) => setAttr("y1", v);
export const x2 = (v: A) => setAttr("x2", v);
export const y2 = (v: A) => setAttr("y2", v);
