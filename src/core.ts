interface State<A> {
  value: A;
  setters: any;
  callbacks: any;
}

export function mkState<A>(initialValue: A): State<A> {
  return {
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

//const obj = {
//  _myProperty: 0,
//};
//
//Object.defineProperty(obj, 'myProperty', {
//  get: function() {
//    return this._myProperty;
//  },
//  set: function(value) {
//    if (value >= 0) {
//      this._myProperty = value;
//    } else {
//      console.error("Value must be non-negative");
//    }
//  }
//});
//
//console.log(obj.myProperty);
//obj.myProperty = 42;
//console.log(obj.myProperty);
