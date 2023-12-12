import {
  AfterMountedCallbackSetter,
  AnyObservusElement,
  AttrSetter,
  BoolAttrSetter,
  EventListenerSetter,
  LifecycleCallbacks,
  MountedCallbackSetter,
  Setter,
  Signal,
  TagSignalSetter,
  TagsSignalSetter,
  TextSignalSetter,
  UnmountedCallbackSetter,
  WithRefSetter,
  constSignal,
  emptyLifecycleCallbacks,
} from "./observus-core";

interface StatusData {
  isMounted: boolean;
  isCreated: boolean;
}
function createStatusData(): StatusData {
  return {
    isMounted: false,
    isCreated: false,
  };
}

interface TagElData {
  kind: "ElData";
  tagNamespace: "http://www.w3.org/2000/svg" | undefined;
  tagName: string;
  attrs: AttrSetter[];
  boolAttrs: BoolAttrSetter[];
}

interface TextElData {
  kind: "TextElData";
  value: Signal<string>;
}

interface LifeCalls {
  onMounted: () => void;
  onAfterMounted: () => void;
  onUnmounted: () => void;
  baseOnCreated: (el: any) => void;
}
function createLifeCalls(): LifeCalls {
  return {
    onMounted: () => { },
    onAfterMounted: () => { },
    onUnmounted: () => { },
    baseOnCreated: (el: any) => { },
  };
}

type ElData = TagElData | TextElData;

interface ObsEl {
  kind: "ObsEl";
  el: any | null;
  data: ElData;
  children: Array<ObsEl>;
  status: StatusData;
  lifecycle: LifeCalls;
}

function createObsEl(data: ElData): ObsEl {
  return {
    kind: "ObsEl",
    el: null,
    data,
    children: [],
    status: createStatusData(),
    lifecycle: createLifeCalls(),
  };
}

export interface ObsElSignalSetter {
  kind: "ObsElSignalSetter";
  value: Signal<ObsEl>;
}

export type NewSetter =
  | ObsEl
  | string
  | TextSignalSetter
  | AttrSetter
  | BoolAttrSetter
  | EventListenerSetter
  | ObsElSignalSetter;

function handleSetter(setter: NewSetter, o: ObsEl) {
  if (typeof setter === "string") {
    o.children.push(
      createObsEl({
        kind: "TextElData",
        value: constSignal(setter),
      }),
    );
    return;
  }

  if (setter.kind == "ObsEl") {
    o.children.push(setter);
    return;
  }

  if (setter.kind == "TextSignalSetter") {
    o.children.push(
      createObsEl({
        kind: "TextElData",
        value: setter.value,
      }),
    );
  }

  if (setter.kind == "AttrSetter") {
    if (o.data.kind == "TextElData") {
      throw new Error("Invalid element kind for attr setter.");
    }
    o.data.attrs.push(setter);
  }

  if (setter.kind == "BoolAttrSetter") {
    if (o.data.kind == "TextElData") {
      throw new Error("Invalid element kind for attr setter.");
    }
    o.data.boolAttrs.push(setter);
  }

  if (setter.kind == "EventListenerSetter") {
    o.lifecycle.baseOnCreated = (el: any) => {
      o.lifecycle.baseOnCreated(el);
      o.el.addEventListener(setter.type, setter.listener, setter.options);
      //o.freeResourcesFns.push(() => {
      //  o.el.removeEventListener(setter.type, setter.listener, setter.options);
      //});
    };
  }
}

function bind(document: Document, curr: Node, obsEl: ObsEl) {
  if (obsEl.data.kind == "ElData") {
    const d = obsEl.data;

    if (curr.nodeName.toUpperCase() == d.tagName.toUpperCase()) {
      obsEl.el = curr;

      let child = curr.firstChild;
      obsEl.children.forEach((obsElChild) => {
        if (child === null) {
          throw new Error("Invalid element!");
        }
        bind(document, child, obsElChild);
        child = child.nextSibling;
      });
    } else {
      throw new Error("Invalid element!");
    }
  }
}

//in-order fashion
function create(document: Document, obsEl: ObsEl | Signal<ObsEl>): Node {
  //TODO:
  if (!("sources" in obsEl)) {
    if (obsEl.data.kind == "ElData") {
      const d = obsEl.data;
      const el = d.tagNamespace
        ? document.createElementNS(d.tagNamespace, d.tagName)
        : document.createElement(d.tagName);

      obsEl.children.forEach((childObsEl) => {
        el.appendChild(create(document, childObsEl));
      });

      return el;
    }
  }

  throw new Error();
}
