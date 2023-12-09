import {
  NullOrUndef,
  Signal,
  attr,
  boolAttr,
} from "./observus-core";

//TODO: maybe i should move parse style here?
//ADD TO DOC: propose special file utils where will be imports like
//import * as _ from "./observus-attributes";
//for easier imports (+check if bundle size is not super bigger if importing whole helpers obj)

type A = string | NullOrUndef | Signal<string | NullOrUndef>;
type B = boolean | Signal<boolean>;

export const cls = (v: A) => attr("class", v, "setAttrFn");
export const style = (v: A) => attr("style", v, "setAttrFn");
export const src = (v: A) => attr("src", v);
export const spellcheck = (v: B) => boolAttr("src", v);
export const value = (v: A) => attr("value", v);
export const type = (v: A) => attr("type", v);
export const checked = (v: B) => boolAttr("checked", v);
export const name = (v: A) => attr("name", v);
export const hidden = (v: B) => boolAttr("hidden", v);
export const id = (v: A) => attr("id", v);
export const tabindex = (v: A) => attr("tabindex", v);
