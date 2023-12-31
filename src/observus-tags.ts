import { Setter, tag } from "./observus-core";

//Tags from typescript DOM lib 5.2.2 (typescript/lib/lib.dom.d.ts)

type C = Setter[];

export const a = (...c: C) => tag<HTMLAnchorElement>("a", ...c);
export const abbr = (...c: C) => tag<HTMLElement>("abbr", ...c);
export const address = (...c: C) => tag<HTMLElement>("address", ...c);
export const area = (...c: C) => tag<HTMLAreaElement>("area", ...c);
export const article = (...c: C) => tag<HTMLElement>("article", ...c);
export const aside = (...c: C) => tag<HTMLElement>("aside", ...c);
export const audio = (...c: C) => tag<HTMLAudioElement>("audio", ...c);
export const b = (...c: C) => tag<HTMLElement>("b", ...c);
export const base = (...c: C) => tag<HTMLBaseElement>("base", ...c);
export const bdi = (...c: C) => tag<HTMLElement>("bdi", ...c);
export const bdo = (...c: C) => tag<HTMLElement>("bdo", ...c);
export const blockquote = (...c: C) =>
  tag<HTMLQuoteElement>("blockquote", ...c);
export const body = (...c: C) => tag<HTMLBodyElement>("body", ...c);
export const br = (...c: C) => tag<HTMLBRElement>("br", ...c);
export const button = (...c: C) => tag<HTMLButtonElement>("button", ...c);
export const canvas = (...c: C) => tag<HTMLCanvasElement>("canvas", ...c);
export const caption = (...c: C) =>
  tag<HTMLTableCaptionElement>("caption", ...c);
export const cite = (...c: C) => tag<HTMLElement>("cite", ...c);
export const code = (...c: C) => tag<HTMLElement>("code", ...c);
export const col = (...c: C) => tag<HTMLTableColElement>("col", ...c);
export const colgroup = (...c: C) => tag<HTMLTableColElement>("colgroup", ...c);
export const data = (...c: C) => tag<HTMLDataElement>("data", ...c);
export const datalist = (...c: C) => tag<HTMLDataListElement>("datalist", ...c);
export const dd = (...c: C) => tag<HTMLElement>("dd", ...c);
export const del = (...c: C) => tag<HTMLModElement>("del", ...c);
export const details = (...c: C) => tag<HTMLDetailsElement>("details", ...c);
export const dfn = (...c: C) => tag<HTMLElement>("dfn", ...c);
export const dialog = (...c: C) => tag<HTMLDialogElement>("dialog", ...c);
export const div = (...c: C) => tag<HTMLDivElement>("div", ...c);
export const dl = (...c: C) => tag<HTMLDListElement>("dl", ...c);
export const dt = (...c: C) => tag<HTMLElement>("dt", ...c);
export const em = (...c: C) => tag<HTMLElement>("em", ...c);
export const embed = (...c: C) => tag<HTMLEmbedElement>("embed", ...c);
export const fieldset = (...c: C) => tag<HTMLFieldSetElement>("fieldset", ...c);
export const figcaption = (...c: C) => tag<HTMLElement>("figcaption", ...c);
export const figure = (...c: C) => tag<HTMLElement>("figure", ...c);
export const footer = (...c: C) => tag<HTMLElement>("footer", ...c);
export const form = (...c: C) => tag<HTMLFormElement>("form", ...c);
export const h1 = (...c: C) => tag<HTMLHeadingElement>("h1", ...c);
export const h2 = (...c: C) => tag<HTMLHeadingElement>("h2", ...c);
export const h3 = (...c: C) => tag<HTMLHeadingElement>("h3", ...c);
export const h4 = (...c: C) => tag<HTMLHeadingElement>("h4", ...c);
export const h5 = (...c: C) => tag<HTMLHeadingElement>("h5", ...c);
export const h6 = (...c: C) => tag<HTMLHeadingElement>("h6", ...c);
export const head = (...c: C) => tag<HTMLHeadElement>("head", ...c);
export const header = (...c: C) => tag<HTMLElement>("header", ...c);
export const hgroup = (...c: C) => tag<HTMLElement>("hgroup", ...c);
export const hr = (...c: C) => tag<HTMLHRElement>("hr", ...c);
export const html = (...c: C) => tag<HTMLHtmlElement>("html", ...c);
export const i = (...c: C) => tag<HTMLElement>("i", ...c);
export const iframe = (...c: C) => tag<HTMLIFrameElement>("iframe", ...c);
export const img = (...c: C) => tag<HTMLImageElement>("img", ...c);
export const input = (...c: C) => tag<HTMLInputElement>("input", ...c);
export const ins = (...c: C) => tag<HTMLModElement>("ins", ...c);
export const kbd = (...c: C) => tag<HTMLElement>("kbd", ...c);
export const label = (...c: C) => tag<HTMLLabelElement>("label", ...c);
export const legend = (...c: C) => tag<HTMLLegendElement>("legend", ...c);
export const li = (...c: C) => tag<HTMLLIElement>("li", ...c);
export const link = (...c: C) => tag<HTMLLinkElement>("link", ...c);
export const main = (...c: C) => tag<HTMLElement>("main", ...c);
export const map = (...c: C) => tag<HTMLMapElement>("map", ...c);
export const mark = (...c: C) => tag<HTMLElement>("mark", ...c);
export const menu = (...c: C) => tag<HTMLMenuElement>("menu", ...c);
export const meta = (...c: C) => tag<HTMLMetaElement>("meta", ...c);
export const meter = (...c: C) => tag<HTMLMeterElement>("meter", ...c);
export const nav = (...c: C) => tag<HTMLElement>("nav", ...c);
export const noscript = (...c: C) => tag<HTMLElement>("noscript", ...c);
export const object = (...c: C) => tag<HTMLObjectElement>("object", ...c);
export const ol = (...c: C) => tag<HTMLOListElement>("ol", ...c);
export const optgroup = (...c: C) => tag<HTMLOptGroupElement>("optgroup", ...c);
export const option = (...c: C) => tag<HTMLOptionElement>("option", ...c);
export const output = (...c: C) => tag<HTMLOutputElement>("output", ...c);
export const p = (...c: C) => tag<HTMLParagraphElement>("p", ...c);
export const picture = (...c: C) => tag<HTMLPictureElement>("picture", ...c);
export const pre = (...c: C) => tag<HTMLPreElement>("pre", ...c);
export const progress = (...c: C) => tag<HTMLProgressElement>("progress", ...c);
export const q = (...c: C) => tag<HTMLQuoteElement>("q", ...c);
export const rp = (...c: C) => tag<HTMLElement>("rp", ...c);
export const rt = (...c: C) => tag<HTMLElement>("rt", ...c);
export const ruby = (...c: C) => tag<HTMLElement>("ruby", ...c);
export const s = (...c: C) => tag<HTMLElement>("s", ...c);
export const samp = (...c: C) => tag<HTMLElement>("samp", ...c);
export const script = (...c: C) => tag<HTMLScriptElement>("script", ...c);
export const search = (...c: C) => tag<HTMLElement>("search", ...c);
export const section = (...c: C) => tag<HTMLElement>("section", ...c);
export const select = (...c: C) => tag<HTMLSelectElement>("select", ...c);
export const slot = (...c: C) => tag<HTMLSlotElement>("slot", ...c);
export const small = (...c: C) => tag<HTMLElement>("small", ...c);
export const source = (...c: C) => tag<HTMLSourceElement>("source", ...c);
export const span = (...c: C) => tag<HTMLSpanElement>("span", ...c);
export const strong = (...c: C) => tag<HTMLElement>("strong", ...c);
// added "Tag" suffix to avoid confusion with commonly used "style" attribute
export const styleTag = (...c: C) => tag<HTMLStyleElement>("style", ...c);
export const sub = (...c: C) => tag<HTMLElement>("sub", ...c);
export const summary = (...c: C) => tag<HTMLElement>("summary", ...c);
export const sup = (...c: C) => tag<HTMLElement>("sup", ...c);
export const table = (...c: C) => tag<HTMLTableElement>("table", ...c);
export const tbody = (...c: C) => tag<HTMLTableSectionElement>("tbody", ...c);
export const td = (...c: C) => tag<HTMLTableCellElement>("td", ...c);
export const template = (...c: C) => tag<HTMLTemplateElement>("template", ...c);
export const textarea = (...c: C) => tag<HTMLTextAreaElement>("textarea", ...c);
export const tfoot = (...c: C) => tag<HTMLTableSectionElement>("tfoot", ...c);
export const th = (...c: C) => tag<HTMLTableCellElement>("th", ...c);
export const thead = (...c: C) => tag<HTMLTableSectionElement>("thead", ...c);
export const time = (...c: C) => tag<HTMLTimeElement>("time", ...c);
export const title = (...c: C) => tag<HTMLTitleElement>("title", ...c);
export const tr = (...c: C) => tag<HTMLTableRowElement>("tr", ...c);
export const track = (...c: C) => tag<HTMLTrackElement>("track", ...c);
export const u = (...c: C) => tag<HTMLElement>("u", ...c);
export const ul = (...c: C) => tag<HTMLUListElement>("ul", ...c);
// added "Tag" suffix to avoid conflict with TS keyword
export const varTag = (...c: C) => tag<HTMLElement>("var", ...c);
export const video = (...c: C) => tag<HTMLVideoElement>("video", ...c);
export const wbr = (...c: C) => tag<HTMLElement>("wbr", ...c);
