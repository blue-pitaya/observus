import {
  AttrNumberValue,
  AttrStringValue,
  Signal,
  attr,
  boolAttr,
  numAttr,
} from "./observus-core";

// List generated using script "create_attr_functions.pl"
// List may be not complete and potentialy contains invalid attributes

type S = AttrStringValue;
type B = boolean | Signal<boolean>;
type N = AttrNumberValue;

export const cls = (v: S) => attr("class", v, "setAttrFn");
export const style = (v: S) => attr("style", v, "setAttrFn");

export const aLink = (v: S) => attr("aLink", v); //HTMLBodyElement
export const abbr = (v: S) => attr("abbr", v); //HTMLTableCellElement
export const accept = (v: S) => attr("accept", v); //HTMLInputElement
export const acceptCharset = (v: S) => attr("acceptCharset", v); //HTMLFormElement
export const accessKey = (v: S) => attr("accessKey", v); //HTMLElement
export const accessKeyLabel = (v: S) => attr("accessKeyLabel", v); //HTMLElement
export const action = (v: S) => attr("action", v); //HTMLFormElement
export const align = (v: S) => attr("align", v); //HTMLDivElement HTMLEmbedElement HTMLHRElement HTMLHeadingElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLLegendElement HTMLObjectElement HTMLParagraphElement HTMLTableCaptionElement HTMLTableCellElement HTMLTableColElement HTMLTableElement HTMLTableRowElement HTMLTableSectionElement
export const allow = (v: S) => attr("allow", v); //HTMLIFrameElement
export const allowFullscreen = (v: B) => boolAttr("allowFullscreen", v); //HTMLIFrameElement
export const alt = (v: S) => attr("alt", v); //HTMLAreaElement HTMLImageElement HTMLInputElement
export const archive = (v: S) => attr("archive", v); //HTMLObjectElement
export const as = (v: S) => attr("as", v); //HTMLLinkElement
export const async = (v: B) => boolAttr("async", v); //HTMLScriptElement
export const autocapitalize = (v: S) => attr("autocapitalize", v); //HTMLElement
export const autofocus = (v: B) => boolAttr("autofocus", v); //HTMLOrSVGElement
export const axis = (v: S) => attr("axis", v); //HTMLTableCellElement
export const background = (v: S) => attr("background", v); //HTMLBodyElement
export const bgColor = (v: S) => attr("bgColor", v); //HTMLBodyElement HTMLTableCellElement HTMLTableElement HTMLTableRowElement
export const border = (v: S) => attr("border", v); //HTMLImageElement HTMLObjectElement HTMLTableElement
export const capture = (v: S) => attr("capture", v); //HTMLInputElement
export const cellIndex = (v: N) => numAttr("cellIndex", v); //HTMLTableCellElement
export const cellPadding = (v: S) => attr("cellPadding", v); //HTMLTableElement
export const cellSpacing = (v: S) => attr("cellSpacing", v); //HTMLTableElement
export const ch = (v: S) => attr("ch", v); //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
export const chOff = (v: S) => attr("chOff", v); //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
export const charset = (v: S) => attr("charset", v); //HTMLAnchorElement HTMLLinkElement HTMLScriptElement
export const checked = (v: B) => boolAttr("checked", v); //HTMLInputElement
export const cite = (v: S) => attr("cite", v); //HTMLModElement HTMLQuoteElement
//this is prefix for cls
export const className = (v: S) => cls(v); //Element
export const clear = (v: S) => attr("clear", v); //HTMLBRElement
export const clientHeight = (v: N) => numAttr("clientHeight", v); //Element
export const clientLeft = (v: N) => numAttr("clientLeft", v); //Element
export const clientTop = (v: N) => numAttr("clientTop", v); //Element
export const clientWidth = (v: N) => numAttr("clientWidth", v); //Element
export const code = (v: S) => attr("code", v); //HTMLObjectElement
export const codeBase = (v: S) => attr("codeBase", v); //HTMLObjectElement
export const codeType = (v: S) => attr("codeType", v); //HTMLObjectElement
export const colSpan = (v: N) => numAttr("colSpan", v); //HTMLTableCellElement
export const color = (v: S) => attr("color", v); //HTMLHRElement
export const cols = (v: N) => numAttr("cols", v); //HTMLTextAreaElement
export const compact = (v: B) => boolAttr("compact", v); //HTMLDListElement HTMLMenuElement HTMLOListElement HTMLUListElement
export const complete = (v: B) => boolAttr("complete", v); //HTMLImageElement
export const content = (v: S) => attr("content", v); //HTMLMetaElement
export const contentEditable = (v: S) => attr("contentEditable", v); //ElementContentEditable
export const coords = (v: S) => attr("coords", v); //HTMLAnchorElement HTMLAreaElement
export const currentSrc = (v: S) => attr("currentSrc", v); //HTMLImageElement
export const data = (v: S) => attr("data", v); //HTMLObjectElement
export const dateTime = (v: S) => attr("dateTime", v); //HTMLModElement HTMLTimeElement
export const declare = (v: B) => boolAttr("declare", v); //HTMLObjectElement
// added "Attr" suffix
export const defaultAttr = (v: B) => boolAttr("default", v); //HTMLTrackElement
export const defaultChecked = (v: B) => boolAttr("defaultChecked", v); //HTMLInputElement
export const defaultSelected = (v: B) => boolAttr("defaultSelected", v); //HTMLOptionElement
export const defaultValue = (v: S) => attr("defaultValue", v); //HTMLInputElement HTMLOutputElement HTMLTextAreaElement
export const defer = (v: B) => boolAttr("defer", v); //HTMLScriptElement
export const dir = (v: S) => attr("dir", v); //HTMLElement
export const dirName = (v: S) => attr("dirName", v); //HTMLInputElement HTMLTextAreaElement
export const disablePictureInPicture = (v: B) =>
  boolAttr("disablePictureInPicture", v); //HTMLVideoElement
export const disabled = (v: B) => boolAttr("disabled", v); //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLLinkElement HTMLOptGroupElement HTMLOptionElement HTMLSelectElement HTMLStyleElement HTMLTextAreaElement
export const download = (v: S) => attr("download", v); //HTMLAnchorElement HTMLAreaElement
export const draggable = (v: B) => boolAttr("draggable", v); //HTMLElement
export const encoding = (v: S) => attr("encoding", v); //HTMLFormElement
export const enctype = (v: S) => attr("enctype", v); //HTMLFormElement
export const enterKeyHint = (v: S) => attr("enterKeyHint", v); //ElementContentEditable
export const event = (v: S) => attr("event", v); //HTMLScriptElement
export const formAction = (v: S) => attr("formAction", v); //HTMLButtonElement HTMLInputElement
export const formEnctype = (v: S) => attr("formEnctype", v); //HTMLButtonElement HTMLInputElement
export const formMethod = (v: S) => attr("formMethod", v); //HTMLButtonElement HTMLInputElement
export const formNoValidate = (v: B) => boolAttr("formNoValidate", v); //HTMLButtonElement HTMLInputElement
export const formTarget = (v: S) => attr("formTarget", v); //HTMLButtonElement HTMLInputElement
export const frame = (v: S) => attr("frame", v); //HTMLTableElement
export const frameBorder = (v: S) => attr("frameBorder", v); //HTMLIFrameElement
export const headers = (v: S) => attr("headers", v); //HTMLTableCellElement
// added "Num" suffix
export const heightNum = (v: N) => numAttr("height", v); //HTMLCanvasElement HTMLImageElement HTMLInputElement HTMLSourceElement HTMLVideoElement
export const height = (v: S) => attr("height", v); //HTMLEmbedElement HTMLIFrameElement HTMLObjectElement HTMLTableCellElement
export const hidden = (v: B) => boolAttr("hidden", v); //HTMLElement
export const high = (v: N) => numAttr("high", v); //HTMLMeterElement
export const href = (v: S) => attr("href", v); //HTMLBaseElement HTMLLinkElement
export const hreflang = (v: S) => attr("hreflang", v); //HTMLAnchorElement HTMLLinkElement
export const hspace = (v: N) => numAttr("hspace", v); //HTMLImageElement HTMLObjectElement
export const htmlFor = (v: S) => attr("htmlFor", v); //HTMLLabelElement HTMLScriptElement
export const httpEquiv = (v: S) => attr("httpEquiv", v); //HTMLMetaElement
export const id = (v: S) => attr("id", v); //Element
export const imageSizes = (v: S) => attr("imageSizes", v); //HTMLLinkElement
export const imageSrcset = (v: S) => attr("imageSrcset", v); //HTMLLinkElement
export const indeterminate = (v: B) => boolAttr("indeterminate", v); //HTMLInputElement
export const index = (v: N) => numAttr("index", v); //HTMLOptionElement
export const inert = (v: B) => boolAttr("inert", v); //HTMLElement
export const innerText = (v: S) => attr("innerText", v); //HTMLElement
export const inputMode = (v: S) => attr("inputMode", v); //ElementContentEditable
export const integrity = (v: S) => attr("integrity", v); //HTMLLinkElement HTMLScriptElement
export const isContentEditable = (v: B) => boolAttr("isContentEditable", v); //ElementContentEditable
export const isMap = (v: B) => boolAttr("isMap", v); //HTMLImageElement
export const kind = (v: S) => attr("kind", v); //HTMLTrackElement
export const label = (v: S) => attr("label", v); //HTMLOptGroupElement HTMLOptionElement HTMLTrackElement
export const lang = (v: S) => attr("lang", v); //HTMLElement
export const length = (v: N) => numAttr("length", v); //HTMLFormElement HTMLSelectElement
export const link = (v: S) => attr("link", v); //HTMLBodyElement
export const loading = (v: S) => attr("loading", v); //HTMLIFrameElement
export const localName = (v: S) => attr("localName", v); //Element
export const longDesc = (v: S) => attr("longDesc", v); //HTMLIFrameElement HTMLImageElement
export const low = (v: N) => numAttr("low", v); //HTMLMeterElement
export const lowsrc = (v: S) => attr("lowsrc", v); //HTMLImageElement
export const marginHeight = (v: S) => attr("marginHeight", v); //HTMLIFrameElement
export const marginWidth = (v: S) => attr("marginWidth", v); //HTMLIFrameElement
// added "Num" suffix
export const maxNum = (v: N) => numAttr("max", v); //HTMLMeterElement HTMLProgressElement
export const max = (v: S) => attr("max", v); //HTMLInputElement
export const maxLength = (v: N) => numAttr("maxLength", v); //HTMLInputElement HTMLTextAreaElement
export const media = (v: S) => attr("media", v); //HTMLLinkElement HTMLMetaElement HTMLSourceElement HTMLStyleElement
export const method = (v: S) => attr("method", v); //HTMLFormElement
// added "Num" suffix
export const minNum = (v: N) => numAttr("min", v); //HTMLMeterElement
export const min = (v: S) => attr("min", v); //HTMLInputElement
export const minLength = (v: N) => numAttr("minLength", v); //HTMLInputElement HTMLTextAreaElement
export const multiple = (v: B) => boolAttr("multiple", v); //HTMLInputElement HTMLSelectElement
export const name = (v: S) => attr("name", v); //HTMLAnchorElement HTMLButtonElement HTMLEmbedElement HTMLFieldSetElement HTMLFormElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLMapElement HTMLMetaElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLSlotElement HTMLTextAreaElement
export const naturalHeight = (v: N) => numAttr("naturalHeight", v); //HTMLImageElement
export const naturalWidth = (v: N) => numAttr("naturalWidth", v); //HTMLImageElement
export const noHref = (v: B) => boolAttr("noHref", v); //HTMLAreaElement
export const noModule = (v: B) => boolAttr("noModule", v); //HTMLScriptElement
export const noShade = (v: B) => boolAttr("noShade", v); //HTMLHRElement
export const noValidate = (v: B) => boolAttr("noValidate", v); //HTMLFormElement
export const noWrap = (v: B) => boolAttr("noWrap", v); //HTMLTableCellElement
export const nonce = (v: S) => attr("nonce", v); //HTMLOrSVGElement
export const offsetHeight = (v: N) => numAttr("offsetHeight", v); //HTMLElement
export const offsetLeft = (v: N) => numAttr("offsetLeft", v); //HTMLElement
export const offsetTop = (v: N) => numAttr("offsetTop", v); //HTMLElement
export const offsetWidth = (v: N) => numAttr("offsetWidth", v); //HTMLElement
export const open = (v: B) => boolAttr("open", v); //HTMLDetailsElement HTMLDialogElement
export const optimum = (v: N) => numAttr("optimum", v); //HTMLMeterElement
export const outerHTML = (v: S) => attr("outerHTML", v); //Element
export const outerText = (v: S) => attr("outerText", v); //HTMLElement
export const pattern = (v: S) => attr("pattern", v); //HTMLInputElement
export const ping = (v: S) => attr("ping", v); //HTMLAnchorElement HTMLAreaElement
export const placeholder = (v: S) => attr("placeholder", v); //HTMLInputElement HTMLTextAreaElement
export const playsInline = (v: B) => boolAttr("playsInline", v); //HTMLVideoElement
export const position = (v: N) => numAttr("position", v); //HTMLProgressElement
export const poster = (v: S) => attr("poster", v); //HTMLVideoElement
export const readOnly = (v: B) => boolAttr("readOnly", v); //HTMLInputElement HTMLTextAreaElement
export const readyState = (v: N) => numAttr("readyState", v); //HTMLTrackElement
export const referrerPolicy = (v: S) => attr("referrerPolicy", v); //HTMLAnchorElement HTMLAreaElement HTMLImageElement HTMLLinkElement HTMLScriptElement
export const rel = (v: S) => attr("rel", v); //HTMLAnchorElement HTMLAreaElement HTMLFormElement HTMLLinkElement
export const required = (v: B) => boolAttr("required", v); //HTMLInputElement HTMLSelectElement HTMLTextAreaElement
export const returnValue = (v: S) => attr("returnValue", v); //HTMLDialogElement
export const rev = (v: S) => attr("rev", v); //HTMLAnchorElement HTMLLinkElement
export const reversed = (v: B) => boolAttr("reversed", v); //HTMLOListElement
export const rowIndex = (v: N) => numAttr("rowIndex", v); //HTMLTableRowElement
export const rowSpan = (v: N) => numAttr("rowSpan", v); //HTMLTableCellElement
export const rows = (v: N) => numAttr("rows", v); //HTMLTextAreaElement
export const rules = (v: S) => attr("rules", v); //HTMLTableElement
export const scheme = (v: S) => attr("scheme", v); //HTMLMetaElement
export const scope = (v: S) => attr("scope", v); //HTMLTableCellElement
export const scrollHeight = (v: N) => numAttr("scrollHeight", v); //Element
export const scrollLeft = (v: N) => numAttr("scrollLeft", v); //Element
export const scrollTop = (v: N) => numAttr("scrollTop", v); //Element
export const scrollWidth = (v: N) => numAttr("scrollWidth", v); //Element
export const scrolling = (v: S) => attr("scrolling", v); //HTMLIFrameElement
export const sectionRowIndex = (v: N) => numAttr("sectionRowIndex", v); //HTMLTableRowElement
export const selected = (v: B) => boolAttr("selected", v); //HTMLOptionElement
export const selectedIndex = (v: N) => numAttr("selectedIndex", v); //HTMLSelectElement
export const selectionEnd = (v: N) => numAttr("selectionEnd", v); //HTMLTextAreaElement
export const selectionStart = (v: N) => numAttr("selectionStart", v); //HTMLTextAreaElement
export const shape = (v: S) => attr("shape", v); //HTMLAnchorElement HTMLAreaElement
// added "Num" suffix
export const sizeNum = (v: N) => numAttr("size", v); //HTMLInputElement HTMLSelectElement
export const size = (v: S) => attr("size", v); //HTMLHRElement
export const sizes = (v: S) => attr("sizes", v); //HTMLImageElement HTMLSourceElement
export const slot = (v: S) => attr("slot", v); //Element
export const span = (v: N) => numAttr("span", v); //HTMLTableColElement
export const spellcheck = (v: B) => boolAttr("spellcheck", v); //HTMLElement
export const src = (v: S) => attr("src", v); //HTMLEmbedElement HTMLIFrameElement HTMLImageElement HTMLInputElement HTMLScriptElement HTMLSourceElement HTMLTrackElement
export const srcdoc = (v: S) => attr("srcdoc", v); //HTMLIFrameElement
export const srclang = (v: S) => attr("srclang", v); //HTMLTrackElement
export const srcset = (v: S) => attr("srcset", v); //HTMLImageElement HTMLSourceElement
export const standby = (v: S) => attr("standby", v); //HTMLObjectElement
export const start = (v: N) => numAttr("start", v); //HTMLOListElement
export const step = (v: S) => attr("step", v); //HTMLInputElement
export const summary = (v: S) => attr("summary", v); //HTMLTableElement
export const tabIndex = (v: N) => numAttr("tabIndex", v); //HTMLOrSVGElement
export const tagName = (v: S) => attr("tagName", v); //Element
export const target = (v: S) => attr("target", v); //HTMLAnchorElement HTMLAreaElement HTMLBaseElement HTMLFormElement HTMLLinkElement
export const text = (v: S) => attr("text", v); //HTMLAnchorElement HTMLBodyElement HTMLOptionElement HTMLScriptElement HTMLTitleElement
export const textLength = (v: N) => numAttr("textLength", v); //HTMLTextAreaElement
export const title = (v: S) => attr("title", v); //HTMLElement
export const translate = (v: B) => boolAttr("translate", v); //HTMLElement
export const type = (v: S) => attr("type", v); //HTMLAnchorElement HTMLEmbedElement HTMLFieldSetElement HTMLInputElement HTMLLIElement HTMLLinkElement HTMLOListElement HTMLObjectElement HTMLOutputElement HTMLScriptElement HTMLSelectElement HTMLSourceElement HTMLStyleElement HTMLTextAreaElement HTMLUListElement
export const useMap = (v: S) => attr("useMap", v); //HTMLImageElement HTMLInputElement HTMLObjectElement
export const vAlign = (v: S) => attr("vAlign", v); //HTMLTableCellElement HTMLTableColElement HTMLTableRowElement HTMLTableSectionElement
export const vLink = (v: S) => attr("vLink", v); //HTMLBodyElement
export const validationMessage = (v: S) => attr("validationMessage", v); //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
// added "Num" suffix
export const valueNum = (v: N) => numAttr("value", v); //HTMLLIElement HTMLMeterElement HTMLProgressElement
export const value = (v: S) => attr("value", v); //HTMLButtonElement HTMLDataElement HTMLInputElement HTMLOptionElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
export const valueAsNumber = (v: N) => numAttr("valueAsNumber", v); //HTMLInputElement
export const version = (v: S) => attr("version", v); //HTMLHtmlElement
export const videoHeight = (v: N) => numAttr("videoHeight", v); //HTMLVideoElement
export const videoWidth = (v: N) => numAttr("videoWidth", v); //HTMLVideoElement
export const vspace = (v: N) => numAttr("vspace", v); //HTMLImageElement HTMLObjectElement
export const webkitdirectory = (v: B) => boolAttr("webkitdirectory", v); //HTMLInputElement
// added "Num" suffix
export const widthNum = (v: N) => numAttr("width", v); //HTMLCanvasElement HTMLImageElement HTMLInputElement HTMLPreElement HTMLSourceElement HTMLVideoElement
export const width = (v: S) => attr("width", v); //HTMLEmbedElement HTMLHRElement HTMLIFrameElement HTMLObjectElement HTMLTableCellElement HTMLTableColElement HTMLTableElement
export const willValidate = (v: B) => boolAttr("willValidate", v); //HTMLButtonElement HTMLFieldSetElement HTMLInputElement HTMLObjectElement HTMLOutputElement HTMLSelectElement HTMLTextAreaElement
export const wrap = (v: S) => attr("wrap", v); //HTMLTextAreaElement
export const x = (v: N) => numAttr("x", v); //HTMLImageElement
export const y = (v: N) => numAttr("y", v); //HTMLImageElement
