import {
  NullOrUndef,
  Signal,
  attr,
  boolAttr,
  combineMany,
  constSignal,
  setAttr,
} from "./observus-core";

//TODO: maybe i should move parse style here?
//ADD TO DOC: propose special file utils where will be imports like
//import * as _ from "./observus-attributes";
//for easier imports (+check if bundle size is not super bigger if importing whole helpers obj)

type A = string | NullOrUndef | Signal<string | NullOrUndef>;
type B = boolean | Signal<boolean>;

export const cls = (v: A) => attr("class", v, "setAttrFn");
export const style = (v: A) => setAttr("style", v);
export const src = (v: A) => attr("src", v);
export const spellcheck = (v: B) => boolAttr("src", v);
export const value = (v: A) => attr("value", v);
export const type = (v: A) => attr("type", v);
export const checked = (v: B) => boolAttr("checked", v);
export const name = (v: A) => attr("name", v);
export const hidden = (v: B) => boolAttr("hidden", v);
export const id = (v: A) => attr("id", v);
export const tabindex = (v: A) => attr("tabindex", v);

//TODO: allow Signal<Record<string, string>> ?
//TODO: maybe just use style(...)?
//FIXME: camelToKebab wont work for unicode chars (but should it?), maybe just find chars that match "upper case"
//DOC: tell that "background-color": "red" and backgroundColor: "red" will work

export type StyleObj = Record<string, string>;

const camelToKebab = (v: string): string =>
  v.replace(RegExp(/[A-Z]/, "g"), (m) => `-${m.toLowerCase()}`);

function singleStyleStr(key: string, value: string): string {
  return `${camelToKebab(key)}: ${value};`;
}

//TODO: add type for obj record
//also this should not return Setter, but rather obj typ to enable
//easier composing
//TODO: merge styleObjSignal and styleObj?
//TODO: handle no styles + optional null signal in "obj"?
export function styleObjSignal(obj: Record<string, string | Signal<string>>) {
  const signals = Object.keys(obj).map((prop) => {
    const value = obj[prop];
    if (typeof value === "string") {
      return constSignal(singleStyleStr(prop, value));
    } else {
      return value.map((v) => singleStyleStr(prop, v));
    }
  });

  const combinedSignal = combineMany<string, string[]>(
    signals,
    (acc, curr) => {
      acc.push(curr);
      return acc;
    },
    [],
  ).map((v) => v.join(" "));

  return style(combinedSignal);
}

export const parseStyle = (styleObj: StyleObj): string =>
  Object.keys(styleObj)
    .map((prop) => singleStyleStr(prop, styleObj[prop]))
    .join(" ");

export const styleObj = (v: StyleObj) => style(parseStyle(v));
