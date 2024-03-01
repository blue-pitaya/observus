export interface State<A> {
  type: "state";
  value: A;
  setters: any;
  callbacks: any;
}

export interface Signal<A> {
  type: "signal";
  state: State<A>;
  property: string;
}

export type Props<A> = any;

//export function props<A>(obj: any): Props<A> {
//  Object(obj).keys.forEach((prop: any) => {
//    if ("type" in obj[prop] && obj[prop].type == "signal") {
//    } else {
//      obj[prop] = signal(mkState(obj[prop]));
//    }
//  });
//
//  return obj;
//}

export function mkState<A>(initialValue: A): State<A> {
  return {
    type: "state",
    value: initialValue,
    setters: {},
    callbacks: {},
  };
}

export function signal(state: any, property?: string) {
  return {
    type: "signal",
    state,
    property,
  };
}

export function observe<A>(
  state: State<A>,
  property: string | undefined,
  onChange: (v: any) => void,
  options: any = {},
) {
  const prop = property ?? "_value";

  if (state.setters.hasOwnProperty(prop)) {
    state.callbacks[prop].push(onChange);
  } else {
    state.callbacks[prop] = [onChange];

    Object.defineProperty(state.setters, prop, {
      set: function (value) {
        if (prop == "_value") {
          state.value = value;
        } else {
          //@ts-ignore
          state.value[prop] = value;
        }

        state.callbacks[prop].forEach((callback: any) => {
          callback(value);
        });
      },
    });
  }

  if (options.call) {
    if (prop == "_value") {
      //@ts-ignore
      onChange(state.value);
    } else {
      //@ts-ignore
      onChange(state.value[prop]);
    }
  }
}
