import { ObAttrs, ObChildren, mkSvgElement } from "./observus";

//List generated from scraped data from MDN

type A = ObAttrs;
type C = ObChildren;

export const a = (attrs: A, ...c: C) => mkSvgElement("a", attrs, ...c); //SVGAElement
export const animate = (attrs: A, ...c: C) =>
  mkSvgElement("animate", attrs, ...c); //SVGAnimateElement
export const animateMotion = (attrs: A, ...c: C) =>
  mkSvgElement("animateMotion", attrs, ...c); //SVGAnimateMotionElement
export const animateTransform = (attrs: A, ...c: C) =>
  mkSvgElement("animateTransform", attrs, ...c); //SVGAnimateTransformElement
export const circle = (attrs: A, ...c: C) =>
  mkSvgElement("circle", attrs, ...c); //SVGCircleElement
export const clipPath = (attrs: A, ...c: C) =>
  mkSvgElement("clipPath", attrs, ...c); //SVGClipPathElement
export const defs = (attrs: A, ...c: C) => mkSvgElement("defs", attrs, ...c); //SVGDefsElement
export const desc = (attrs: A, ...c: C) => mkSvgElement("desc", attrs, ...c); //SVGDescElement
export const ellipse = (attrs: A, ...c: C) =>
  mkSvgElement("ellipse", attrs, ...c); //SVGEllipseElement
export const feBlend = (attrs: A, ...c: C) =>
  mkSvgElement("feBlend", attrs, ...c); //SVGFEBlendElement
export const feColorMatrix = (attrs: A, ...c: C) =>
  mkSvgElement("feColorMatrix", attrs, ...c); //SVGFEColorMatrixElement
export const feComponentTransfer = (attrs: A, ...c: C) =>
  mkSvgElement("feComponentTransfer", attrs, ...c); //SVGFEComponentTransferElement
export const feComposite = (attrs: A, ...c: C) =>
  mkSvgElement("feComposite", attrs, ...c); //SVGFECompositeElement
export const feConvolveMatrix = (attrs: A, ...c: C) =>
  mkSvgElement("feConvolveMatrix", attrs, ...c); //SVGFEConvolveMatrixElement
export const feDiffuseLighting = (attrs: A, ...c: C) =>
  mkSvgElement("feDiffuseLighting", attrs, ...c); //SVGFEDiffuseLightingElement
export const feDisplacementMap = (attrs: A, ...c: C) =>
  mkSvgElement("feDisplacementMap", attrs, ...c); //SVGFEDisplacementMapElement
export const feDistantLight = (attrs: A, ...c: C) =>
  mkSvgElement("feDistantLight", attrs, ...c); //SVGFEDistantLightElement
export const feDropShadow = (attrs: A, ...c: C) =>
  mkSvgElement("feDropShadow", attrs, ...c); //SVGFEDropShadowElement
export const feFlood = (attrs: A, ...c: C) =>
  mkSvgElement("feFlood", attrs, ...c); //SVGFEFloodElement
export const feFuncA = (attrs: A, ...c: C) =>
  mkSvgElement("feFuncA", attrs, ...c); //SVGFEFuncAElement
export const feFuncB = (attrs: A, ...c: C) =>
  mkSvgElement("feFuncB", attrs, ...c); //SVGFEFuncBElement
export const feFuncG = (attrs: A, ...c: C) =>
  mkSvgElement("feFuncG", attrs, ...c); //SVGFEFuncGElement
export const feFuncR = (attrs: A, ...c: C) =>
  mkSvgElement("feFuncR", attrs, ...c); //SVGFEFuncRElement
export const feGaussianBlur = (attrs: A, ...c: C) =>
  mkSvgElement("feGaussianBlur", attrs, ...c); //SVGFEGaussianBlurElement
export const feImage = (attrs: A, ...c: C) =>
  mkSvgElement("feImage", attrs, ...c); //SVGFEImageElement
export const feMerge = (attrs: A, ...c: C) =>
  mkSvgElement("feMerge", attrs, ...c); //SVGFEMergeElement
export const feMergeNode = (attrs: A, ...c: C) =>
  mkSvgElement("feMergeNode", attrs, ...c); //SVGFEMergeNodeElement
export const feMorphology = (attrs: A, ...c: C) =>
  mkSvgElement("feMorphology", attrs, ...c); //SVGFEMorphologyElement
export const feOffset = (attrs: A, ...c: C) =>
  mkSvgElement("feOffset", attrs, ...c); //SVGFEOffsetElement
export const fePointLight = (attrs: A, ...c: C) =>
  mkSvgElement("fePointLight", attrs, ...c); //SVGFEPointLightElement
export const feSpecularLighting = (attrs: A, ...c: C) =>
  mkSvgElement("feSpecularLighting", attrs, ...c); //SVGFESpecularLightingElement
export const feSpotLight = (attrs: A, ...c: C) =>
  mkSvgElement("feSpotLight", attrs, ...c); //SVGFESpotLightElement
export const feTile = (attrs: A, ...c: C) =>
  mkSvgElement("feTile", attrs, ...c); //SVGFETileElement
export const feTurbulence = (attrs: A, ...c: C) =>
  mkSvgElement("feTurbulence", attrs, ...c); //SVGFETurbulenceElement
export const filter = (attrs: A, ...c: C) =>
  mkSvgElement("filter", attrs, ...c); //SVGFilterElement
export const foreignObject = (attrs: A, ...c: C) =>
  mkSvgElement("foreignObject", attrs, ...c); //SVGForeignObjectElement
export const g = (attrs: A, ...c: C) => mkSvgElement("g", attrs, ...c); //SVGGElement
export const image = (attrs: A, ...c: C) => mkSvgElement("image", attrs, ...c); //SVGImageElement
export const line = (attrs: A, ...c: C) => mkSvgElement("line", attrs, ...c); //SVGLineElement
export const linearGradient = (attrs: A, ...c: C) =>
  mkSvgElement("linearGradient", attrs, ...c); //SVGLinearGradientElement
export const marker = (attrs: A, ...c: C) =>
  mkSvgElement("marker", attrs, ...c); //SVGMarkerElement
export const mask = (attrs: A, ...c: C) => mkSvgElement("mask", attrs, ...c); //SVGMaskElement
export const metadata = (attrs: A, ...c: C) =>
  mkSvgElement("metadata", attrs, ...c); //SVGMetadataElement
export const mpath = (attrs: A, ...c: C) => mkSvgElement("mpath", attrs, ...c); //SVGMPathElement
export const path = (attrs: A, ...c: C) => mkSvgElement("path", attrs, ...c); //SVGPathElement
export const pattern = (attrs: A, ...c: C) =>
  mkSvgElement("pattern", attrs, ...c); //SVGPatternElement
export const polygon = (attrs: A, ...c: C) =>
  mkSvgElement("polygon", attrs, ...c); //SVGPolygonElement
export const polyline = (attrs: A, ...c: C) =>
  mkSvgElement("polyline", attrs, ...c); //SVGPolylineElement
export const radialGradient = (attrs: A, ...c: C) =>
  mkSvgElement("radialGradient", attrs, ...c); //SVGRadialGradientElement
export const rect = (attrs: A, ...c: C) => mkSvgElement("rect", attrs, ...c); //SVGRectElement
export const script = (attrs: A, ...c: C) =>
  mkSvgElement("script", attrs, ...c); //SVGScriptElement
export const set = (attrs: A, ...c: C) => mkSvgElement("set", attrs, ...c); //SVGSetElement
export const stop = (attrs: A, ...c: C) => mkSvgElement("stop", attrs, ...c); //SVGStopElement
export const style = (attrs: A, ...c: C) => mkSvgElement("style", attrs, ...c); //SVGStyleElement
export const svg = (attrs: A, ...c: C) => mkSvgElement("svg", attrs, ...c); //SVGSVGElement
export const switchTag = (attrs: A, ...c: C) =>
  mkSvgElement("switch", attrs, ...c); //SVGSwitchElement
export const symbol = (attrs: A, ...c: C) =>
  mkSvgElement("symbol", attrs, ...c); //SVGSymbolElement
export const text = (attrs: A, ...c: C) => mkSvgElement("text", attrs, ...c); //SVGTextElement
export const textPath = (attrs: A, ...c: C) =>
  mkSvgElement("textPath", attrs, ...c); //SVGTextPathElement
export const title = (attrs: A, ...c: C) => mkSvgElement("title", attrs, ...c); //SVGTitleElement
export const tspan = (attrs: A, ...c: C) => mkSvgElement("tspan", attrs, ...c); //SVGTSpanElement
export const use = (attrs: A, ...c: C) => mkSvgElement("use", attrs, ...c); //SVGUseElement
export const view = (attrs: A, ...c: C) => mkSvgElement("view", attrs, ...c); //SVGViewElement
