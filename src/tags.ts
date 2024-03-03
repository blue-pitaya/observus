import { Blueprint, mkElement } from "./dom";

//Tags from typescript DOM lib 5.2.2 (typescript/lib/lib.dom.d.ts)

type A = Record<string, any>;
type C = Blueprint[];

export const a = (attrs: A, ...c: C) => mkElement("a", attrs, ...c); //HTMLAnchorElement
export const abbr = (attrs: A, ...c: C) => mkElement("abbr", attrs, ...c); //HTMLElement
export const address = (attrs: A, ...c: C) => mkElement("address", attrs, ...c); //HTMLElement
export const area = (attrs: A, ...c: C) => mkElement("area", attrs, ...c); //HTMLAreaElement
export const article = (attrs: A, ...c: C) => mkElement("article", attrs, ...c); //HTMLElement
export const aside = (attrs: A, ...c: C) => mkElement("aside", attrs, ...c); //HTMLElement
export const audio = (attrs: A, ...c: C) => mkElement("audio", attrs, ...c); //HTMLAudioElement
export const b = (attrs: A, ...c: C) => mkElement("b", attrs, ...c); //HTMLElement
export const base = (attrs: A, ...c: C) => mkElement("base", attrs, ...c); //HTMLBaseElement
export const bdi = (attrs: A, ...c: C) => mkElement("bdi", attrs, ...c); //HTMLElement
export const bdo = (attrs: A, ...c: C) => mkElement("bdo", attrs, ...c); //HTMLElement
export const blockquote = (attrs: A, ...c: C) =>
  mkElement("blockquote", attrs, ...c); //HTMLQuoteElement
export const body = (attrs: A, ...c: C) => mkElement("body", attrs, ...c); //HTMLBodyElement
export const br = (attrs: A, ...c: C) => mkElement("br", attrs, ...c); //HTMLBRElement
export const button = (attrs: A, ...c: C) => mkElement("button", attrs, ...c); //HTMLButtonElement
export const canvas = (attrs: A, ...c: C) => mkElement("canvas", attrs, ...c); //HTMLCanvasElement
export const caption = (attrs: A, ...c: C) => mkElement("caption", attrs, ...c); //HTMLTableCaptionElement
export const cite = (attrs: A, ...c: C) => mkElement("cite", attrs, ...c); //HTMLElement
export const code = (attrs: A, ...c: C) => mkElement("code", attrs, ...c); //HTMLElement
export const col = (attrs: A, ...c: C) => mkElement("col", attrs, ...c); //HTMLTableColElement
export const colgroup = (attrs: A, ...c: C) =>
  mkElement("colgroup", attrs, ...c); //HTMLTableColElement
export const data = (attrs: A, ...c: C) => mkElement("data", attrs, ...c); //HTMLDataElement
export const datalist = (attrs: A, ...c: C) =>
  mkElement("datalist", attrs, ...c); //HTMLDataListElement
export const dd = (attrs: A, ...c: C) => mkElement("dd", attrs, ...c); //HTMLElement
export const del = (attrs: A, ...c: C) => mkElement("del", attrs, ...c); //HTMLModElement
export const details = (attrs: A, ...c: C) => mkElement("details", attrs, ...c); //HTMLDetailsElement
export const dfn = (attrs: A, ...c: C) => mkElement("dfn", attrs, ...c); //HTMLElement
export const dialog = (attrs: A, ...c: C) => mkElement("dialog", attrs, ...c); //HTMLDialogElement
export const div = (attrs: A, ...c: C) => mkElement("div", attrs, ...c); //HTMLDivElement
export const dl = (attrs: A, ...c: C) => mkElement("dl", attrs, ...c); //HTMLDListElement
export const dt = (attrs: A, ...c: C) => mkElement("dt", attrs, ...c); //HTMLElement
export const em = (attrs: A, ...c: C) => mkElement("em", attrs, ...c); //HTMLElement
export const embed = (attrs: A, ...c: C) => mkElement("embed", attrs, ...c); //HTMLEmbedElement
export const fieldset = (attrs: A, ...c: C) =>
  mkElement("fieldset", attrs, ...c); //HTMLFieldSetElement
export const figcaption = (attrs: A, ...c: C) =>
  mkElement("figcaption", attrs, ...c); //HTMLElement
export const figure = (attrs: A, ...c: C) => mkElement("figure", attrs, ...c); //HTMLElement
export const footer = (attrs: A, ...c: C) => mkElement("footer", attrs, ...c); //HTMLElement
export const form = (attrs: A, ...c: C) => mkElement("form", attrs, ...c); //HTMLFormElement
export const h1 = (attrs: A, ...c: C) => mkElement("h1", attrs, ...c); //HTMLHeadingElement
export const h2 = (attrs: A, ...c: C) => mkElement("h2", attrs, ...c); //HTMLHeadingElement
export const h3 = (attrs: A, ...c: C) => mkElement("h3", attrs, ...c); //HTMLHeadingElement
export const h4 = (attrs: A, ...c: C) => mkElement("h4", attrs, ...c); //HTMLHeadingElement
export const h5 = (attrs: A, ...c: C) => mkElement("h5", attrs, ...c); //HTMLHeadingElement
export const h6 = (attrs: A, ...c: C) => mkElement("h6", attrs, ...c); //HTMLHeadingElement
export const head = (attrs: A, ...c: C) => mkElement("head", attrs, ...c); //HTMLHeadElement
export const header = (attrs: A, ...c: C) => mkElement("header", attrs, ...c); //HTMLElement
export const hgroup = (attrs: A, ...c: C) => mkElement("hgroup", attrs, ...c); //HTMLElement
export const hr = (attrs: A, ...c: C) => mkElement("hr", attrs, ...c); //HTMLHRElement
export const html = (attrs: A, ...c: C) => mkElement("html", attrs, ...c); //HTMLHtmlElement
export const i = (attrs: A, ...c: C) => mkElement("i", attrs, ...c); //HTMLElement
export const iframe = (attrs: A, ...c: C) => mkElement("iframe", attrs, ...c); //HTMLIFrameElement
export const img = (attrs: A, ...c: C) => mkElement("img", attrs, ...c); //HTMLImageElement
export const input = (attrs: A, ...c: C) => mkElement("input", attrs, ...c); //HTMLInputElement
export const ins = (attrs: A, ...c: C) => mkElement("ins", attrs, ...c); //HTMLModElement
export const kbd = (attrs: A, ...c: C) => mkElement("kbd", attrs, ...c); //HTMLElement
export const label = (attrs: A, ...c: C) => mkElement("label", attrs, ...c); //HTMLLabelElement
export const legend = (attrs: A, ...c: C) => mkElement("legend", attrs, ...c); //HTMLLegendElement
export const li = (attrs: A, ...c: C) => mkElement("li", attrs, ...c); //HTMLLIElement
export const link = (attrs: A, ...c: C) => mkElement("link", attrs, ...c); //HTMLLinkElement
export const main = (attrs: A, ...c: C) => mkElement("main", attrs, ...c); //HTMLElement
export const map = (attrs: A, ...c: C) => mkElement("map", attrs, ...c); //HTMLMapElement
export const mark = (attrs: A, ...c: C) => mkElement("mark", attrs, ...c); //HTMLElement
export const menu = (attrs: A, ...c: C) => mkElement("menu", attrs, ...c); //HTMLMenuElement
export const meta = (attrs: A, ...c: C) => mkElement("meta", attrs, ...c); //HTMLMetaElement
export const meter = (attrs: A, ...c: C) => mkElement("meter", attrs, ...c); //HTMLMeterElement
export const nav = (attrs: A, ...c: C) => mkElement("nav", attrs, ...c); //HTMLElement
export const noscript = (attrs: A, ...c: C) =>
  mkElement("noscript", attrs, ...c); //HTMLElement
export const object = (attrs: A, ...c: C) => mkElement("object", attrs, ...c); //HTMLObjectElement
export const ol = (attrs: A, ...c: C) => mkElement("ol", attrs, ...c); //HTMLOListElement
export const optgroup = (attrs: A, ...c: C) =>
  mkElement("optgroup", attrs, ...c); //HTMLOptGroupElement
export const option = (attrs: A, ...c: C) => mkElement("option", attrs, ...c); //HTMLOptionElement
export const output = (attrs: A, ...c: C) => mkElement("output", attrs, ...c); //HTMLOutputElement
export const p = (attrs: A, ...c: C) => mkElement("p", attrs, ...c); //HTMLParagraphElement
export const picture = (attrs: A, ...c: C) => mkElement("picture", attrs, ...c); //HTMLPictureElement
export const pre = (attrs: A, ...c: C) => mkElement("pre", attrs, ...c); //HTMLPreElement
export const progress = (attrs: A, ...c: C) =>
  mkElement("progress", attrs, ...c); //HTMLProgressElement
export const q = (attrs: A, ...c: C) => mkElement("q", attrs, ...c); //HTMLQuoteElement
export const rp = (attrs: A, ...c: C) => mkElement("rp", attrs, ...c); //HTMLElement
export const rt = (attrs: A, ...c: C) => mkElement("rt", attrs, ...c); //HTMLElement
export const ruby = (attrs: A, ...c: C) => mkElement("ruby", attrs, ...c); //HTMLElement
export const s = (attrs: A, ...c: C) => mkElement("s", attrs, ...c); //HTMLElement
export const samp = (attrs: A, ...c: C) => mkElement("samp", attrs, ...c); //HTMLElement
export const script = (attrs: A, ...c: C) => mkElement("script", attrs, ...c); //HTMLScriptElement
export const search = (attrs: A, ...c: C) => mkElement("search", attrs, ...c); //HTMLElement
export const section = (attrs: A, ...c: C) => mkElement("section", attrs, ...c); //HTMLElement
export const select = (attrs: A, ...c: C) => mkElement("select", attrs, ...c); //HTMLSelectElement
export const slot = (attrs: A, ...c: C) => mkElement("slot", attrs, ...c); //HTMLSlotElement
export const small = (attrs: A, ...c: C) => mkElement("small", attrs, ...c); //HTMLElement
export const source = (attrs: A, ...c: C) => mkElement("source", attrs, ...c); //HTMLSourceElement
export const span = (attrs: A, ...c: C) => mkElement("span", attrs, ...c); //HTMLSpanElement
export const strong = (attrs: A, ...c: C) => mkElement("strong", attrs, ...c); //HTMLElement
// added "Tag" suffix to avoid confusion with commonly used "style" attribute
export const styleTag = (attrs: A, ...c: C) => mkElement("style", attrs, ...c); //HTMLStyleElement
export const sub = (attrs: A, ...c: C) => mkElement("sub", attrs, ...c); //HTMLElement
export const summary = (attrs: A, ...c: C) => mkElement("summary", attrs, ...c); //HTMLElement
export const sup = (attrs: A, ...c: C) => mkElement("sup", attrs, ...c); //HTMLElement
export const table = (attrs: A, ...c: C) => mkElement("table", attrs, ...c); //HTMLTableElement
export const tbody = (attrs: A, ...c: C) => mkElement("tbody", attrs, ...c); //HTMLTableSectionElement
export const td = (attrs: A, ...c: C) => mkElement("td", attrs, ...c); //HTMLTableCellElement
export const template = (attrs: A, ...c: C) =>
  mkElement("template", attrs, ...c); //HTMLTemplateElement
export const textarea = (attrs: A, ...c: C) =>
  mkElement("textarea", attrs, ...c); //HTMLTextAreaElement
export const tfoot = (attrs: A, ...c: C) => mkElement("tfoot", attrs, ...c); //HTMLTableSectionElement
export const th = (attrs: A, ...c: C) => mkElement("th", attrs, ...c); //HTMLTableCellElement
export const thead = (attrs: A, ...c: C) => mkElement("thead", attrs, ...c); //HTMLTableSectionElement
export const time = (attrs: A, ...c: C) => mkElement("time", attrs, ...c); //HTMLTimeElement
export const title = (attrs: A, ...c: C) => mkElement("title", attrs, ...c); //HTMLTitleElement
export const tr = (attrs: A, ...c: C) => mkElement("tr", attrs, ...c); //HTMLTableRowElement
export const track = (attrs: A, ...c: C) => mkElement("track", attrs, ...c); //HTMLTrackElement
export const u = (attrs: A, ...c: C) => mkElement("u", attrs, ...c); //HTMLElement
export const ul = (attrs: A, ...c: C) => mkElement("ul", attrs, ...c); //HTMLUListElement
// added "Tag" suffix to avoid conflict with TS keyword
export const varTag = (attrs: A, ...c: C) => mkElement("var", attrs, ...c); //HTMLElement
export const video = (attrs: A, ...c: C) => mkElement("video", attrs, ...c); //HTMLVideoElement
export const wbr = (attrs: A, ...c: C) => mkElement("wbr", attrs, ...c); //HTMLElement
