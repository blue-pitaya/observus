import {
  AttrBoolValue,
  AttrNumberValue,
  AttrStringValue,
  attr,
  boolAttr,
  numAttr,
} from "./observus-core";

// List generated using script "create_attr_functions.pl"
// List may be not complete and potentialy contains invalid attributes

type S = AttrStringValue;
type B = AttrBoolValue;
type N = AttrNumberValue;

const cls = (v: S) => attr("class", v, "setAttrFn");

export default {
  cls,
  style: (v: S) => attr("style", v, "setAttrFn"),

  aLink: (v: S) => attr("aLink", v), //HTMLBodyElement
  abbr: (v: S) => attr("abbr", v), //HTMLTableCellElement
  accept: (v: S) => attr("accept", v), //HTMLInputElement
  acceptCharset: (v: S) => attr("acceptCharset", v), //HTMLFormElement
  accessKey: (v: S) => attr("accessKey", v), //HTMLElement
  accessKeyLabel: (v: S) => attr("accessKeyLabel", v), //HTMLElement
  action: (v: S) => attr("action", v), //HTMLFormElement
  align: (v: S) => attr("align", v), //HTMLDivElement HTMLEmbedElement HTMLHRElement HTMLHeadingElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLLegendElement HTMLObjectElement HTMLParagraphElement HTMLTableCaptionElement HTMLTableCellElement HTMLTableColElement HTMLTableElement HTMLTableRowElement HTMLTableSectionElement
  allow: (v: S) => attr("allow", v), //HTMLIFrameElement
  allowFullscreen: (v: B) => boolAttr("allowFullscreen", v), //HTMLIFrameElement
  alt: (v: S) => attr("alt", v), //HTMLAreaElement HTMLImageElement HTMLInputElement
  archive: (v: S) => attr("archive", v), //HTMLObjectElement
  as: (v: S) => attr("as", v), //HTMLLinkElement
  async: (v: B) => boolAttr("async", v), //HTMLScriptElement
  autocapitalize: (v: S) => attr("autocapitalize", v), //HTMLElement
  autofocus: (v: B) => boolAttr("autofocus", v), //HTMLOrSVGElement
  axis: (v: S) => attr("axis", v), //HTMLTableCellElement
  background: (v: S) => attr("background", v), //HTMLBodyElement
  bgColor: (v: S) => attr("bgColor", v), //HTMLBodyElement HTMLTableCellElement HTMLTableElement HTMLTableRowElement
  border: (v: S) => attr("border", v), //HTMLImageElement HTMLObjectElement HTMLTableElement
  capture: (v: S) => attr("capture", v), //HTMLInputElement
  cellIndex: (v: N) => numAttr("cellIndex", v), //HTMLTableCellElement
  cellPadding: (v: S) => attr("cellPadding", v), //HTMLTableElement
  cellSpacing: (v: S) => attr("cellSpacing", v), //HTMLTableElement
  ch: (v: S) => attr("ch", v), //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
  chOff: (v: S) => attr("chOff", v), //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
  charset: (v: S) => attr("charset", v), //HTMLAnchorElement HTMLLinkElement HTMLScriptElement
  checked: (v: B) => boolAttr("checked", v), //HTMLInputElement
  cite: (v: S) => attr("cite", v), //HTMLModElement HTMLQuoteElement
  //this is prefix for cls
  className: (v: S) => cls(v), //Element
  clear: (v: S) => attr("clear", v), //HTMLBRElement
  clientHeight: (v: N) => numAttr("clientHeight", v), //Element
  clientLeft: (v: N) => numAttr("clientLeft", v), //Element
  clientTop: (v: N) => numAttr("clientTop", v), //Element
  clientWidth: (v: N) => numAttr("clientWidth", v), //Element
  code: (v: S) => attr("code", v), //HTMLObjectElement
  codeBase: (v: S) => attr("codeBase", v), //HTMLObjectElement
  codeType: (v: S) => attr("codeType", v), //HTMLObjectElement
  colSpan: (v: N) => numAttr("colSpan", v), //HTMLTableCellElement
  color: (v: S) => attr("color", v), //HTMLHRElement
  cols: (v: N) => numAttr("cols", v), //HTMLTextAreaElement
  compact: (v: B) => boolAttr("compact", v), //HTMLDListElement HTMLMenuElement HTMLOListElement HTMLUListElement
  complete: (v: B) => boolAttr("complete", v), //HTMLImageElement
  content: (v: S) => attr("content", v), //HTMLMetaElement
  contentEditable: (v: S) => attr("contentEditable", v), //ElementContentEditable
  coords: (v: S) => attr("coords", v), //HTMLAnchorElement HTMLAreaElement
  currentSrc: (v: S) => attr("currentSrc", v), //HTMLImageElement
  data: (v: S) => attr("data", v), //HTMLObjectElement
  dateTime: (v: S) => attr("dateTime", v), //HTMLModElement HTMLTimeElement
  declare: (v: B) => boolAttr("declare", v), //HTMLObjectElement
  // added "Attr" suffix
  defaultAttr: (v: B) => boolAttr("default", v), //HTMLTrackElement
  defaultChecked: (v: B) => boolAttr("defaultChecked", v), //HTMLInputElement
  defaultSelected: (v: B) => boolAttr("defaultSelected", v), //HTMLOptionElement
  defaultValue: (v: S) => attr("defaultValue", v), //HTMLInputElement HTMLOutputElement HTMLTextAreaElement
  defer: (v: B) => boolAttr("defer", v), //HTMLScriptElement
  dir: (v: S) => attr("dir", v), //HTMLElement
  dirName: (v: S) => attr("dirName", v), //HTMLInputElement HTMLTextAreaElement
  disablePictureInPicture: (v: B) => boolAttr("disablePictureInPicture", v), //HTMLVideoElement
  disabled: (v: B) => boolAttr("disabled", v), //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLLinkElement HTMLOptGroupElement HTMLOptionElement HTMLSelectElement HTMLStyleElement HTMLTextAreaElement
  download: (v: S) => attr("download", v), //HTMLAnchorElement HTMLAreaElement
  draggable: (v: B) => boolAttr("draggable", v), //HTMLElement
  encoding: (v: S) => attr("encoding", v), //HTMLFormElement
  enctype: (v: S) => attr("enctype", v), //HTMLFormElement
  enterKeyHint: (v: S) => attr("enterKeyHint", v), //ElementContentEditable
  event: (v: S) => attr("event", v), //HTMLScriptElement
  formAction: (v: S) => attr("formAction", v), //HTMLButtonElement HTMLInputElement
  formEnctype: (v: S) => attr("formEnctype", v), //HTMLButtonElement HTMLInputElement
  formMethod: (v: S) => attr("formMethod", v), //HTMLButtonElement HTMLInputElement
  formNoValidate: (v: B) => boolAttr("formNoValidate", v), //HTMLButtonElement HTMLInputElement
  formTarget: (v: S) => attr("formTarget", v), //HTMLButtonElement HTMLInputElement
  frame: (v: S) => attr("frame", v), //HTMLTableElement
  frameBorder: (v: S) => attr("frameBorder", v), //HTMLIFrameElement
  headers: (v: S) => attr("headers", v), //HTMLTableCellElement
  // added "Num" suffix
  heightNum: (v: N) => numAttr("height", v), //HTMLCanvasElement HTMLImageElement HTMLInputElement HTMLSourceElement HTMLVideoElement
  height: (v: S) => attr("height", v), //HTMLEmbedElement HTMLIFrameElement HTMLObjectElement HTMLTableCellElement
  hidden: (v: B) => boolAttr("hidden", v), //HTMLElement
  high: (v: N) => numAttr("high", v), //HTMLMeterElement
  href: (v: S) => attr("href", v), //HTMLBaseElement HTMLLinkElement
  hreflang: (v: S) => attr("hreflang", v), //HTMLAnchorElement HTMLLinkElement
  hspace: (v: N) => numAttr("hspace", v), //HTMLImageElement HTMLObjectElement
  htmlFor: (v: S) => attr("for", v), //HTMLLabelElement HTMLScriptElement
  httpEquiv: (v: S) => attr("httpEquiv", v), //HTMLMetaElement
  id: (v: S) => attr("id", v), //Element
  imageSizes: (v: S) => attr("imageSizes", v), //HTMLLinkElement
  imageSrcset: (v: S) => attr("imageSrcset", v), //HTMLLinkElement
  indeterminate: (v: B) => boolAttr("indeterminate", v), //HTMLInputElement
  index: (v: N) => numAttr("index", v), //HTMLOptionElement
  inert: (v: B) => boolAttr("inert", v), //HTMLElement
  innerText: (v: S) => attr("innerText", v), //HTMLElement
  inputMode: (v: S) => attr("inputMode", v), //ElementContentEditable
  integrity: (v: S) => attr("integrity", v), //HTMLLinkElement HTMLScriptElement
  isContentEditable: (v: B) => boolAttr("isContentEditable", v), //ElementContentEditable
  isMap: (v: B) => boolAttr("isMap", v), //HTMLImageElement
  kind: (v: S) => attr("kind", v), //HTMLTrackElement
  label: (v: S) => attr("label", v), //HTMLOptGroupElement HTMLOptionElement HTMLTrackElement
  lang: (v: S) => attr("lang", v), //HTMLElement
  length: (v: N) => numAttr("length", v), //HTMLFormElement HTMLSelectElement
  link: (v: S) => attr("link", v), //HTMLBodyElement
  loading: (v: S) => attr("loading", v), //HTMLIFrameElement
  localName: (v: S) => attr("localName", v), //Element
  longDesc: (v: S) => attr("longDesc", v), //HTMLIFrameElement HTMLImageElement
  low: (v: N) => numAttr("low", v), //HTMLMeterElement
  lowsrc: (v: S) => attr("lowsrc", v), //HTMLImageElement
  marginHeight: (v: S) => attr("marginHeight", v), //HTMLIFrameElement
  marginWidth: (v: S) => attr("marginWidth", v), //HTMLIFrameElement
  // added "Num" suffix
  maxNum: (v: N) => numAttr("max", v), //HTMLMeterElement HTMLProgressElement
  max: (v: S) => attr("max", v), //HTMLInputElement
  maxLength: (v: N) => numAttr("maxLength", v), //HTMLInputElement HTMLTextAreaElement
  media: (v: S) => attr("media", v), //HTMLLinkElement HTMLMetaElement HTMLSourceElement HTMLStyleElement
  method: (v: S) => attr("method", v), //HTMLFormElement
  // added "Num" suffix
  minNum: (v: N) => numAttr("min", v), //HTMLMeterElement
  min: (v: S) => attr("min", v), //HTMLInputElement
  minLength: (v: N) => numAttr("minLength", v), //HTMLInputElement HTMLTextAreaElement
  multiple: (v: B) => boolAttr("multiple", v), //HTMLInputElement HTMLSelectElement
  name: (v: S) => attr("name", v), //HTMLAnchorElement HTMLButtonElement HTMLEmbedElement HTMLFieldSetElement HTMLFormElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLMapElement HTMLMetaElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLSlotElement HTMLTextAreaElement
  naturalHeight: (v: N) => numAttr("naturalHeight", v), //HTMLImageElement
  naturalWidth: (v: N) => numAttr("naturalWidth", v), //HTMLImageElement
  noHref: (v: B) => boolAttr("noHref", v), //HTMLAreaElement
  noModule: (v: B) => boolAttr("noModule", v), //HTMLScriptElement
  noShade: (v: B) => boolAttr("noShade", v), //HTMLHRElement
  noValidate: (v: B) => boolAttr("noValidate", v), //HTMLFormElement
  noWrap: (v: B) => boolAttr("noWrap", v), //HTMLTableCellElement
  nonce: (v: S) => attr("nonce", v), //HTMLOrSVGElement
  offsetHeight: (v: N) => numAttr("offsetHeight", v), //HTMLElement
  offsetLeft: (v: N) => numAttr("offsetLeft", v), //HTMLElement
  offsetTop: (v: N) => numAttr("offsetTop", v), //HTMLElement
  offsetWidth: (v: N) => numAttr("offsetWidth", v), //HTMLElement
  open: (v: B) => boolAttr("open", v), //HTMLDetailsElement HTMLDialogElement
  optimum: (v: N) => numAttr("optimum", v), //HTMLMeterElement
  outerHTML: (v: S) => attr("outerHTML", v), //Element
  outerText: (v: S) => attr("outerText", v), //HTMLElement
  pattern: (v: S) => attr("pattern", v), //HTMLInputElement
  ping: (v: S) => attr("ping", v), //HTMLAnchorElement HTMLAreaElement
  placeholder: (v: S) => attr("placeholder", v), //HTMLInputElement HTMLTextAreaElement
  playsInline: (v: B) => boolAttr("playsInline", v), //HTMLVideoElement
  position: (v: N) => numAttr("position", v), //HTMLProgressElement
  poster: (v: S) => attr("poster", v), //HTMLVideoElement
  readOnly: (v: B) => boolAttr("readOnly", v), //HTMLInputElement HTMLTextAreaElement
  readyState: (v: N) => numAttr("readyState", v), //HTMLTrackElement
  referrerPolicy: (v: S) => attr("referrerPolicy", v), //HTMLAnchorElement HTMLAreaElement HTMLImageElement HTMLLinkElement HTMLScriptElement
  rel: (v: S) => attr("rel", v), //HTMLAnchorElement HTMLAreaElement HTMLFormElement HTMLLinkElement
  required: (v: B) => boolAttr("required", v), //HTMLInputElement HTMLSelectElement HTMLTextAreaElement
  returnValue: (v: S) => attr("returnValue", v), //HTMLDialogElement
  rev: (v: S) => attr("rev", v), //HTMLAnchorElement HTMLLinkElement
  reversed: (v: B) => boolAttr("reversed", v), //HTMLOListElement
  rowIndex: (v: N) => numAttr("rowIndex", v), //HTMLTableRowElement
  rowSpan: (v: N) => numAttr("rowSpan", v), //HTMLTableCellElement
  rows: (v: N) => numAttr("rows", v), //HTMLTextAreaElement
  rules: (v: S) => attr("rules", v), //HTMLTableElement
  scheme: (v: S) => attr("scheme", v), //HTMLMetaElement
  scope: (v: S) => attr("scope", v), //HTMLTableCellElement
  scrollHeight: (v: N) => numAttr("scrollHeight", v), //Element
  scrollLeft: (v: N) => numAttr("scrollLeft", v), //Element
  scrollTop: (v: N) => numAttr("scrollTop", v), //Element
  scrollWidth: (v: N) => numAttr("scrollWidth", v), //Element
  scrolling: (v: S) => attr("scrolling", v), //HTMLIFrameElement
  sectionRowIndex: (v: N) => numAttr("sectionRowIndex", v), //HTMLTableRowElement
  selected: (v: B) => boolAttr("selected", v), //HTMLOptionElement
  selectedIndex: (v: N) => numAttr("selectedIndex", v), //HTMLSelectElement
  selectionEnd: (v: N) => numAttr("selectionEnd", v), //HTMLTextAreaElement
  selectionStart: (v: N) => numAttr("selectionStart", v), //HTMLTextAreaElement
  shape: (v: S) => attr("shape", v), //HTMLAnchorElement HTMLAreaElement
  // added "Num" suffix
  sizeNum: (v: N) => numAttr("size", v), //HTMLInputElement HTMLSelectElement
  size: (v: S) => attr("size", v), //HTMLHRElement
  sizes: (v: S) => attr("sizes", v), //HTMLImageElement HTMLSourceElement
  slot: (v: S) => attr("slot", v), //Element
  span: (v: N) => numAttr("span", v), //HTMLTableColElement
  spellcheck: (v: B) => boolAttr("spellcheck", v), //HTMLElement
  src: (v: S) => attr("src", v), //HTMLEmbedElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLScriptElement HTMLSourceElement HTMLTrackElement
  srcdoc: (v: S) => attr("srcdoc", v), //HTMLIFrameElement
  srclang: (v: S) => attr("srclang", v), //HTMLTrackElement
  srcset: (v: S) => attr("srcset", v), //HTMLImageElement HTMLSourceElement
  standby: (v: S) => attr("standby", v), //HTMLObjectElement
  start: (v: N) => numAttr("start", v), //HTMLOListElement
  step: (v: S) => attr("step", v), //HTMLInputElement
  summary: (v: S) => attr("summary", v), //HTMLTableElement
  tabIndex: (v: N) => numAttr("tabIndex", v), //HTMLOrSVGElement
  tagName: (v: S) => attr("tagName", v), //Element
  target: (v: S) => attr("target", v), //HTMLAnchorElement HTMLAreaElement HTMLBaseElement HTMLFormElement HTMLLinkElement
  text: (v: S) => attr("text", v), //HTMLAnchorElement HTMLBodyElement HTMLOptionElement HTMLScriptElement HTMLTitleElement
  textLength: (v: N) => numAttr("textLength", v), //HTMLTextAreaElement
  title: (v: S) => attr("title", v), //HTMLElement
  translate: (v: B) => boolAttr("translate", v), //HTMLElement
  type: (v: S) => attr("type", v), //HTMLAnchorElement HTMLEmbedElement HTMLFieldSetElement HTMLInputElement HTMLLIElement HTMLLinkElement HTMLOListElement HTMLObjectElement HTMLOutputElement HTMLScriptElement HTMLSelectElement HTMLSourceElement HTMLStyleElement HTMLTextAreaElement HTMLUListElement
  useMap: (v: S) => attr("useMap", v), //HTMLImageElement HTMLInputElement HTMLObjectElement
  vAlign: (v: S) => attr("vAlign", v), //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
  vLink: (v: S) => attr("vLink", v), //HTMLBodyElement
  validationMessage: (v: S) => attr("validationMessage", v), //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
  // added "Num" suffix
  valueNum: (v: N) => numAttr("value", v), //HTMLLIElement HTMLMeterElement HTMLProgressElement
  value: (v: S) => attr("value", v), //HTMLButtonElement HTMLDataElement HTMLInputElement HTMLOptionElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
  valueAsNumber: (v: N) => numAttr("valueAsNumber", v), //HTMLInputElement
  version: (v: S) => attr("version", v), //HTMLHtmlElement
  videoHeight: (v: N) => numAttr("videoHeight", v), //HTMLVideoElement
  videoWidth: (v: N) => numAttr("videoWidth", v), //HTMLVideoElement
  vspace: (v: N) => numAttr("vspace", v), //HTMLImageElement HTMLObjectElement
  webkitdirectory: (v: B) => boolAttr("webkitdirectory", v), //HTMLInputElement
  // added "Num" suffix
  widthNum: (v: N) => numAttr("width", v), //HTMLCanvasElement HTMLImageElement HTMLInputElement HTMLPreElement HTMLSourceElement HTMLVideoElement
  width: (v: S) => attr("width", v), //HTMLEmbedElement HTMLHRElement HTMLIFrameElement HTMLObjectElement HTMLTableCellElement HTMLTableColElement HTMLTableElement
  willValidate: (v: B) => boolAttr("willValidate", v), //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
  wrap: (v: S) => attr("wrap", v), //HTMLTextAreaElement
  x: (v: N) => numAttr("x", v), //HTMLImageElement
  y: (v: N) => numAttr("y", v), //HTMLImageElement
};
