function x1(S) {
  return S && S.__esModule && Object.prototype.hasOwnProperty.call(S, "default") ? S.default : S;
}
var mg = { exports: {} }, gp = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var o1;
function IT() {
  if (o1) return gp;
  o1 = 1;
  var S = Symbol.for("react.transitional.element"), H = Symbol.for("react.fragment");
  function W(D, ie, ce) {
    var ae = null;
    if (ce !== void 0 && (ae = "" + ce), ie.key !== void 0 && (ae = "" + ie.key), "key" in ie) {
      ce = {};
      for (var ve in ie)
        ve !== "key" && (ce[ve] = ie[ve]);
    } else ce = ie;
    return ie = ce.ref, {
      $$typeof: S,
      type: D,
      key: ae,
      ref: ie !== void 0 ? ie : null,
      props: ce
    };
  }
  return gp.Fragment = H, gp.jsx = W, gp.jsxs = W, gp;
}
var Sp = {}, pg = { exports: {} }, et = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f1;
function PT() {
  if (f1) return et;
  f1 = 1;
  var S = Symbol.for("react.transitional.element"), H = Symbol.for("react.portal"), W = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), ie = Symbol.for("react.profiler"), ce = Symbol.for("react.consumer"), ae = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), A = Symbol.for("react.memo"), P = Symbol.for("react.lazy"), ue = Symbol.iterator;
  function q(E) {
    return E === null || typeof E != "object" ? null : (E = ue && E[ue] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var _ = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ee = Object.assign, fe = {};
  function Be(E, O, k) {
    this.props = E, this.context = O, this.refs = fe, this.updater = k || _;
  }
  Be.prototype.isReactComponent = {}, Be.prototype.setState = function(E, O) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, O, "setState");
  }, Be.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function ye() {
  }
  ye.prototype = Be.prototype;
  function He(E, O, k) {
    this.props = E, this.context = O, this.refs = fe, this.updater = k || _;
  }
  var st = He.prototype = new ye();
  st.constructor = He, ee(st, Be.prototype), st.isPureReactComponent = !0;
  var ot = Array.isArray, Me = { H: null, A: null, T: null, S: null, V: null }, yt = Object.prototype.hasOwnProperty;
  function tt(E, O, k, Z, re, De) {
    return k = De.ref, {
      $$typeof: S,
      type: E,
      key: O,
      ref: k !== void 0 ? k : null,
      props: De
    };
  }
  function Oe(E, O) {
    return tt(
      E.type,
      O,
      void 0,
      void 0,
      void 0,
      E.props
    );
  }
  function Rt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === S;
  }
  function pe(E) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(k) {
      return O[k];
    });
  }
  var ft = /\/+/g;
  function Se(E, O) {
    return typeof E == "object" && E !== null && E.key != null ? pe("" + E.key) : O.toString(36);
  }
  function Ne() {
  }
  function Xe(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(Ne, Ne) : (E.status = "pending", E.then(
          function(O) {
            E.status === "pending" && (E.status = "fulfilled", E.value = O);
          },
          function(O) {
            E.status === "pending" && (E.status = "rejected", E.reason = O);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function lt(E, O, k, Z, re) {
    var De = typeof E;
    (De === "undefined" || De === "boolean") && (E = null);
    var be = !1;
    if (E === null) be = !0;
    else
      switch (De) {
        case "bigint":
        case "string":
        case "number":
          be = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case S:
            case H:
              be = !0;
              break;
            case P:
              return be = E._init, lt(
                be(E._payload),
                O,
                k,
                Z,
                re
              );
          }
      }
    if (be)
      return re = re(E), be = Z === "" ? "." + Se(E, 0) : Z, ot(re) ? (k = "", be != null && (k = be.replace(ft, "$&/") + "/"), lt(re, O, k, "", function(gt) {
        return gt;
      })) : re != null && (Rt(re) && (re = Oe(
        re,
        k + (re.key == null || E && E.key === re.key ? "" : ("" + re.key).replace(
          ft,
          "$&/"
        ) + "/") + be
      )), O.push(re)), 1;
    be = 0;
    var qe = Z === "" ? "." : Z + ":";
    if (ot(E))
      for (var vt = 0; vt < E.length; vt++)
        Z = E[vt], De = qe + Se(Z, vt), be += lt(
          Z,
          O,
          k,
          De,
          re
        );
    else if (vt = q(E), typeof vt == "function")
      for (E = vt.call(E), vt = 0; !(Z = E.next()).done; )
        Z = Z.value, De = qe + Se(Z, vt++), be += lt(
          Z,
          O,
          k,
          De,
          re
        );
    else if (De === "object") {
      if (typeof E.then == "function")
        return lt(
          Xe(E),
          O,
          k,
          Z,
          re
        );
      throw O = String(E), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return be;
  }
  function V(E, O, k) {
    if (E == null) return E;
    var Z = [], re = 0;
    return lt(E, Z, "", "", function(De) {
      return O.call(k, De, re++);
    }), Z;
  }
  function j(E) {
    if (E._status === -1) {
      var O = E._result;
      O = O(), O.then(
        function(k) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = k);
        },
        function(k) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = k);
        }
      ), E._status === -1 && (E._status = 0, E._result = O);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var le = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  };
  function he() {
  }
  return et.Children = {
    map: V,
    forEach: function(E, O, k) {
      V(
        E,
        function() {
          O.apply(this, arguments);
        },
        k
      );
    },
    count: function(E) {
      var O = 0;
      return V(E, function() {
        O++;
      }), O;
    },
    toArray: function(E) {
      return V(E, function(O) {
        return O;
      }) || [];
    },
    only: function(E) {
      if (!Rt(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  }, et.Component = Be, et.Fragment = W, et.Profiler = ie, et.PureComponent = He, et.StrictMode = D, et.Suspense = te, et.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Me, et.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return Me.H.useMemoCache(E);
    }
  }, et.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, et.cloneElement = function(E, O, k) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var Z = ee({}, E.props), re = E.key, De = void 0;
    if (O != null)
      for (be in O.ref !== void 0 && (De = void 0), O.key !== void 0 && (re = "" + O.key), O)
        !yt.call(O, be) || be === "key" || be === "__self" || be === "__source" || be === "ref" && O.ref === void 0 || (Z[be] = O[be]);
    var be = arguments.length - 2;
    if (be === 1) Z.children = k;
    else if (1 < be) {
      for (var qe = Array(be), vt = 0; vt < be; vt++)
        qe[vt] = arguments[vt + 2];
      Z.children = qe;
    }
    return tt(E.type, re, void 0, void 0, De, Z);
  }, et.createContext = function(E) {
    return E = {
      $$typeof: ae,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: ce,
      _context: E
    }, E;
  }, et.createElement = function(E, O, k) {
    var Z, re = {}, De = null;
    if (O != null)
      for (Z in O.key !== void 0 && (De = "" + O.key), O)
        yt.call(O, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (re[Z] = O[Z]);
    var be = arguments.length - 2;
    if (be === 1) re.children = k;
    else if (1 < be) {
      for (var qe = Array(be), vt = 0; vt < be; vt++)
        qe[vt] = arguments[vt + 2];
      re.children = qe;
    }
    if (E && E.defaultProps)
      for (Z in be = E.defaultProps, be)
        re[Z] === void 0 && (re[Z] = be[Z]);
    return tt(E, De, void 0, void 0, null, re);
  }, et.createRef = function() {
    return { current: null };
  }, et.forwardRef = function(E) {
    return { $$typeof: ve, render: E };
  }, et.isValidElement = Rt, et.lazy = function(E) {
    return {
      $$typeof: P,
      _payload: { _status: -1, _result: E },
      _init: j
    };
  }, et.memo = function(E, O) {
    return {
      $$typeof: A,
      type: E,
      compare: O === void 0 ? null : O
    };
  }, et.startTransition = function(E) {
    var O = Me.T, k = {};
    Me.T = k;
    try {
      var Z = E(), re = Me.S;
      re !== null && re(k, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(he, le);
    } catch (De) {
      le(De);
    } finally {
      Me.T = O;
    }
  }, et.unstable_useCacheRefresh = function() {
    return Me.H.useCacheRefresh();
  }, et.use = function(E) {
    return Me.H.use(E);
  }, et.useActionState = function(E, O, k) {
    return Me.H.useActionState(E, O, k);
  }, et.useCallback = function(E, O) {
    return Me.H.useCallback(E, O);
  }, et.useContext = function(E) {
    return Me.H.useContext(E);
  }, et.useDebugValue = function() {
  }, et.useDeferredValue = function(E, O) {
    return Me.H.useDeferredValue(E, O);
  }, et.useEffect = function(E, O, k) {
    var Z = Me.H;
    if (typeof k == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return Z.useEffect(E, O);
  }, et.useId = function() {
    return Me.H.useId();
  }, et.useImperativeHandle = function(E, O, k) {
    return Me.H.useImperativeHandle(E, O, k);
  }, et.useInsertionEffect = function(E, O) {
    return Me.H.useInsertionEffect(E, O);
  }, et.useLayoutEffect = function(E, O) {
    return Me.H.useLayoutEffect(E, O);
  }, et.useMemo = function(E, O) {
    return Me.H.useMemo(E, O);
  }, et.useOptimistic = function(E, O) {
    return Me.H.useOptimistic(E, O);
  }, et.useReducer = function(E, O, k) {
    return Me.H.useReducer(E, O, k);
  }, et.useRef = function(E) {
    return Me.H.useRef(E);
  }, et.useState = function(E) {
    return Me.H.useState(E);
  }, et.useSyncExternalStore = function(E, O, k) {
    return Me.H.useSyncExternalStore(
      E,
      O,
      k
    );
  }, et.useTransition = function() {
    return Me.H.useTransition();
  }, et.version = "19.1.0", et;
}
var Ep = { exports: {} };
Ep.exports;
var r1;
function eE() {
  return r1 || (r1 = 1, function(S, H) {
    var W = {};
    /**
     * @license React
     * react.development.js
     *
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    W.NODE_ENV !== "production" && function() {
      function D(p, C) {
        Object.defineProperty(ae.prototype, p, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              C[0],
              C[1]
            );
          }
        });
      }
      function ie(p) {
        return p === null || typeof p != "object" ? null : (p = Ja && p[Ja] || p["@@iterator"], typeof p == "function" ? p : null);
      }
      function ce(p, C) {
        p = (p = p.constructor) && (p.displayName || p.name) || "ReactClass";
        var oe = p + "." + C;
        it[oe] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          C,
          p
        ), it[oe] = !0);
      }
      function ae(p, C, oe) {
        this.props = p, this.context = C, this.refs = At, this.updater = oe || mt;
      }
      function ve() {
      }
      function te(p, C, oe) {
        this.props = p, this.context = C, this.refs = At, this.updater = oe || mt;
      }
      function A(p) {
        return "" + p;
      }
      function P(p) {
        try {
          A(p);
          var C = !1;
        } catch {
          C = !0;
        }
        if (C) {
          C = console;
          var oe = C.error, se = typeof Symbol == "function" && Symbol.toStringTag && p[Symbol.toStringTag] || p.constructor.name || "Object";
          return oe.call(
            C,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            se
          ), A(p);
        }
      }
      function ue(p) {
        if (p == null) return null;
        if (typeof p == "function")
          return p.$$typeof === sl ? null : p.displayName || p.name || null;
        if (typeof p == "string") return p;
        switch (p) {
          case O:
            return "Fragment";
          case Z:
            return "Profiler";
          case k:
            return "StrictMode";
          case qe:
            return "Suspense";
          case vt:
            return "SuspenseList";
          case Ml:
            return "Activity";
        }
        if (typeof p == "object")
          switch (typeof p.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), p.$$typeof) {
            case E:
              return "Portal";
            case De:
              return (p.displayName || "Context") + ".Provider";
            case re:
              return (p._context.displayName || "Context") + ".Consumer";
            case be:
              var C = p.render;
              return p = p.displayName, p || (p = C.displayName || C.name || "", p = p !== "" ? "ForwardRef(" + p + ")" : "ForwardRef"), p;
            case gt:
              return C = p.displayName || null, C !== null ? C : ue(p.type) || "Memo";
            case Vt:
              C = p._payload, p = p._init;
              try {
                return ue(p(C));
              } catch {
              }
          }
        return null;
      }
      function q(p) {
        if (p === O) return "<>";
        if (typeof p == "object" && p !== null && p.$$typeof === Vt)
          return "<...>";
        try {
          var C = ue(p);
          return C ? "<" + C + ">" : "<...>";
        } catch {
          return "<...>";
        }
      }
      function _() {
        var p = Ce.A;
        return p === null ? null : p.getOwner();
      }
      function ee() {
        return Error("react-stack-top-frame");
      }
      function fe(p) {
        if (ka.call(p, "key")) {
          var C = Object.getOwnPropertyDescriptor(p, "key").get;
          if (C && C.isReactWarning) return !1;
        }
        return p.key !== void 0;
      }
      function Be(p, C) {
        function oe() {
          va || (va = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            C
          ));
        }
        oe.isReactWarning = !0, Object.defineProperty(p, "key", {
          get: oe,
          configurable: !0
        });
      }
      function ye() {
        var p = ue(this.type);
        return bl[p] || (bl[p] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), p = this.props.ref, p !== void 0 ? p : null;
      }
      function He(p, C, oe, se, Te, Ie, Ge, dt) {
        return oe = Ie.ref, p = {
          $$typeof: he,
          type: p,
          key: C,
          props: Ie,
          _owner: Te
        }, (oe !== void 0 ? oe : null) !== null ? Object.defineProperty(p, "ref", {
          enumerable: !1,
          get: ye
        }) : Object.defineProperty(p, "ref", { enumerable: !1, value: null }), p._store = {}, Object.defineProperty(p._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: 0
        }), Object.defineProperty(p, "_debugInfo", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: null
        }), Object.defineProperty(p, "_debugStack", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: Ge
        }), Object.defineProperty(p, "_debugTask", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: dt
        }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
      }
      function st(p, C) {
        return C = He(
          p.type,
          C,
          void 0,
          void 0,
          p._owner,
          p.props,
          p._debugStack,
          p._debugTask
        ), p._store && (C._store.validated = p._store.validated), C;
      }
      function ot(p) {
        return typeof p == "object" && p !== null && p.$$typeof === he;
      }
      function Me(p) {
        var C = { "=": "=0", ":": "=2" };
        return "$" + p.replace(/[=:]/g, function(oe) {
          return C[oe];
        });
      }
      function yt(p, C) {
        return typeof p == "object" && p !== null && p.key != null ? (P(p.key), Me("" + p.key)) : C.toString(36);
      }
      function tt() {
      }
      function Oe(p) {
        switch (p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
          default:
            switch (typeof p.status == "string" ? p.then(tt, tt) : (p.status = "pending", p.then(
              function(C) {
                p.status === "pending" && (p.status = "fulfilled", p.value = C);
              },
              function(C) {
                p.status === "pending" && (p.status = "rejected", p.reason = C);
              }
            )), p.status) {
              case "fulfilled":
                return p.value;
              case "rejected":
                throw p.reason;
            }
        }
        throw p;
      }
      function Rt(p, C, oe, se, Te) {
        var Ie = typeof p;
        (Ie === "undefined" || Ie === "boolean") && (p = null);
        var Ge = !1;
        if (p === null) Ge = !0;
        else
          switch (Ie) {
            case "bigint":
            case "string":
            case "number":
              Ge = !0;
              break;
            case "object":
              switch (p.$$typeof) {
                case he:
                case E:
                  Ge = !0;
                  break;
                case Vt:
                  return Ge = p._init, Rt(
                    Ge(p._payload),
                    C,
                    oe,
                    se,
                    Te
                  );
              }
          }
        if (Ge) {
          Ge = p, Te = Te(Ge);
          var dt = se === "" ? "." + yt(Ge, 0) : se;
          return Yt(Te) ? (oe = "", dt != null && (oe = dt.replace(Af, "$&/") + "/"), Rt(Te, C, oe, "", function(hl) {
            return hl;
          })) : Te != null && (ot(Te) && (Te.key != null && (Ge && Ge.key === Te.key || P(Te.key)), oe = st(
            Te,
            oe + (Te.key == null || Ge && Ge.key === Te.key ? "" : ("" + Te.key).replace(
              Af,
              "$&/"
            ) + "/") + dt
          ), se !== "" && Ge != null && ot(Ge) && Ge.key == null && Ge._store && !Ge._store.validated && (oe._store.validated = 2), Te = oe), C.push(Te)), 1;
        }
        if (Ge = 0, dt = se === "" ? "." : se + ":", Yt(p))
          for (var Ye = 0; Ye < p.length; Ye++)
            se = p[Ye], Ie = dt + yt(se, Ye), Ge += Rt(
              se,
              C,
              oe,
              Ie,
              Te
            );
        else if (Ye = ie(p), typeof Ye == "function")
          for (Ye === p.entries && (cl || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), cl = !0), p = Ye.call(p), Ye = 0; !(se = p.next()).done; )
            se = se.value, Ie = dt + yt(se, Ye++), Ge += Rt(
              se,
              C,
              oe,
              Ie,
              Te
            );
        else if (Ie === "object") {
          if (typeof p.then == "function")
            return Rt(
              Oe(p),
              C,
              oe,
              se,
              Te
            );
          throw C = String(p), Error(
            "Objects are not valid as a React child (found: " + (C === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : C) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return Ge;
      }
      function pe(p, C, oe) {
        if (p == null) return p;
        var se = [], Te = 0;
        return Rt(p, se, "", "", function(Ie) {
          return C.call(oe, Ie, Te++);
        }), se;
      }
      function ft(p) {
        if (p._status === -1) {
          var C = p._result;
          C = C(), C.then(
            function(oe) {
              (p._status === 0 || p._status === -1) && (p._status = 1, p._result = oe);
            },
            function(oe) {
              (p._status === 0 || p._status === -1) && (p._status = 2, p._result = oe);
            }
          ), p._status === -1 && (p._status = 0, p._result = C);
        }
        if (p._status === 1)
          return C = p._result, C === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            C
          ), "default" in C || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            C
          ), C.default;
        throw p._result;
      }
      function Se() {
        var p = Ce.H;
        return p === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), p;
      }
      function Ne() {
      }
      function Xe(p) {
        if (Ou === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7);
            Ou = (S && S[C]).call(
              S,
              "timers"
            ).setImmediate;
          } catch {
            Ou = function(se) {
              Of === !1 && (Of = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var Te = new MessageChannel();
              Te.port1.onmessage = se, Te.port2.postMessage(void 0);
            };
          }
        return Ou(p);
      }
      function lt(p) {
        return 1 < p.length && typeof AggregateError == "function" ? new AggregateError(p) : p[0];
      }
      function V(p, C) {
        C !== ga - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), ga = C;
      }
      function j(p, C, oe) {
        var se = Ce.actQueue;
        if (se !== null)
          if (se.length !== 0)
            try {
              le(se), Xe(function() {
                return j(p, C, oe);
              });
              return;
            } catch (Te) {
              Ce.thrownErrors.push(Te);
            }
          else Ce.actQueue = null;
        0 < Ce.thrownErrors.length ? (se = lt(Ce.thrownErrors), Ce.thrownErrors.length = 0, oe(se)) : C(p);
      }
      function le(p) {
        if (!yn) {
          yn = !0;
          var C = 0;
          try {
            for (; C < p.length; C++) {
              var oe = p[C];
              do {
                Ce.didUsePromise = !1;
                var se = oe(!1);
                if (se !== null) {
                  if (Ce.didUsePromise) {
                    p[C] = oe, p.splice(0, C);
                    return;
                  }
                  oe = se;
                } else break;
              } while (!0);
            }
            p.length = 0;
          } catch (Te) {
            p.splice(0, C + 1), Ce.thrownErrors.push(Te);
          } finally {
            yn = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var he = Symbol.for("react.transitional.element"), E = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), Z = Symbol.for("react.profiler"), re = Symbol.for("react.consumer"), De = Symbol.for("react.context"), be = Symbol.for("react.forward_ref"), qe = Symbol.for("react.suspense"), vt = Symbol.for("react.suspense_list"), gt = Symbol.for("react.memo"), Vt = Symbol.for("react.lazy"), Ml = Symbol.for("react.activity"), Ja = Symbol.iterator, it = {}, mt = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(p) {
          ce(p, "forceUpdate");
        },
        enqueueReplaceState: function(p) {
          ce(p, "replaceState");
        },
        enqueueSetState: function(p) {
          ce(p, "setState");
        }
      }, It = Object.assign, At = {};
      Object.freeze(At), ae.prototype.isReactComponent = {}, ae.prototype.setState = function(p, C) {
        if (typeof p != "object" && typeof p != "function" && p != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, p, C, "setState");
      }, ae.prototype.forceUpdate = function(p) {
        this.updater.enqueueForceUpdate(this, p, "forceUpdate");
      };
      var Je = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, $l;
      for ($l in Je)
        Je.hasOwnProperty($l) && D($l, Je[$l]);
      ve.prototype = ae.prototype, Je = te.prototype = new ve(), Je.constructor = te, It(Je, ae.prototype), Je.isPureReactComponent = !0;
      var Yt = Array.isArray, sl = Symbol.for("react.client.reference"), Ce = {
        H: null,
        A: null,
        T: null,
        S: null,
        V: null,
        actQueue: null,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
      }, ka = Object.prototype.hasOwnProperty, $a = console.createTask ? console.createTask : function() {
        return null;
      };
      Je = {
        "react-stack-bottom-frame": function(p) {
          return p();
        }
      };
      var va, Bl, bl = {}, dl = Je["react-stack-bottom-frame"].bind(Je, ee)(), hn = $a(q(ee)), cl = !1, Af = /\/+/g, $c = typeof reportError == "function" ? reportError : function(p) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var C = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
            error: p
          });
          if (!window.dispatchEvent(C)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", p);
          return;
        }
        console.error(p);
      }, Of = !1, Ou = null, ga = 0, Yl = !1, yn = !1, ea = typeof queueMicrotask == "function" ? function(p) {
        queueMicrotask(function() {
          return queueMicrotask(p);
        });
      } : Xe;
      Je = Object.freeze({
        __proto__: null,
        c: function(p) {
          return Se().useMemoCache(p);
        }
      }), H.Children = {
        map: pe,
        forEach: function(p, C, oe) {
          pe(
            p,
            function() {
              C.apply(this, arguments);
            },
            oe
          );
        },
        count: function(p) {
          var C = 0;
          return pe(p, function() {
            C++;
          }), C;
        },
        toArray: function(p) {
          return pe(p, function(C) {
            return C;
          }) || [];
        },
        only: function(p) {
          if (!ot(p))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return p;
        }
      }, H.Component = ae, H.Fragment = O, H.Profiler = Z, H.PureComponent = te, H.StrictMode = k, H.Suspense = qe, H.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ce, H.__COMPILER_RUNTIME = Je, H.act = function(p) {
        var C = Ce.actQueue, oe = ga;
        ga++;
        var se = Ce.actQueue = C !== null ? C : [], Te = !1;
        try {
          var Ie = p();
        } catch (Ye) {
          Ce.thrownErrors.push(Ye);
        }
        if (0 < Ce.thrownErrors.length)
          throw V(C, oe), p = lt(Ce.thrownErrors), Ce.thrownErrors.length = 0, p;
        if (Ie !== null && typeof Ie == "object" && typeof Ie.then == "function") {
          var Ge = Ie;
          return ea(function() {
            Te || Yl || (Yl = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(Ye, hl) {
              Te = !0, Ge.then(
                function(Wa) {
                  if (V(C, oe), oe === 0) {
                    try {
                      le(se), Xe(function() {
                        return j(
                          Wa,
                          Ye,
                          hl
                        );
                      });
                    } catch (Fa) {
                      Ce.thrownErrors.push(Fa);
                    }
                    if (0 < Ce.thrownErrors.length) {
                      var Oh = lt(
                        Ce.thrownErrors
                      );
                      Ce.thrownErrors.length = 0, hl(Oh);
                    }
                  } else Ye(Wa);
                },
                function(Wa) {
                  V(C, oe), 0 < Ce.thrownErrors.length && (Wa = lt(
                    Ce.thrownErrors
                  ), Ce.thrownErrors.length = 0), hl(Wa);
                }
              );
            }
          };
        }
        var dt = Ie;
        if (V(C, oe), oe === 0 && (le(se), se.length !== 0 && ea(function() {
          Te || Yl || (Yl = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), Ce.actQueue = null), 0 < Ce.thrownErrors.length)
          throw p = lt(Ce.thrownErrors), Ce.thrownErrors.length = 0, p;
        return {
          then: function(Ye, hl) {
            Te = !0, oe === 0 ? (Ce.actQueue = se, Xe(function() {
              return j(
                dt,
                Ye,
                hl
              );
            })) : Ye(dt);
          }
        };
      }, H.cache = function(p) {
        return function() {
          return p.apply(null, arguments);
        };
      }, H.captureOwnerStack = function() {
        var p = Ce.getCurrentStack;
        return p === null ? null : p();
      }, H.cloneElement = function(p, C, oe) {
        if (p == null)
          throw Error(
            "The argument must be a React element, but you passed " + p + "."
          );
        var se = It({}, p.props), Te = p.key, Ie = p._owner;
        if (C != null) {
          var Ge;
          e: {
            if (ka.call(C, "ref") && (Ge = Object.getOwnPropertyDescriptor(
              C,
              "ref"
            ).get) && Ge.isReactWarning) {
              Ge = !1;
              break e;
            }
            Ge = C.ref !== void 0;
          }
          Ge && (Ie = _()), fe(C) && (P(C.key), Te = "" + C.key);
          for (dt in C)
            !ka.call(C, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && C.ref === void 0 || (se[dt] = C[dt]);
        }
        var dt = arguments.length - 2;
        if (dt === 1) se.children = oe;
        else if (1 < dt) {
          Ge = Array(dt);
          for (var Ye = 0; Ye < dt; Ye++)
            Ge[Ye] = arguments[Ye + 2];
          se.children = Ge;
        }
        for (se = He(
          p.type,
          Te,
          void 0,
          void 0,
          Ie,
          se,
          p._debugStack,
          p._debugTask
        ), Te = 2; Te < arguments.length; Te++)
          Ie = arguments[Te], ot(Ie) && Ie._store && (Ie._store.validated = 1);
        return se;
      }, H.createContext = function(p) {
        return p = {
          $$typeof: De,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, p.Provider = p, p.Consumer = {
          $$typeof: re,
          _context: p
        }, p._currentRenderer = null, p._currentRenderer2 = null, p;
      }, H.createElement = function(p, C, oe) {
        for (var se = 2; se < arguments.length; se++) {
          var Te = arguments[se];
          ot(Te) && Te._store && (Te._store.validated = 1);
        }
        if (se = {}, Te = null, C != null)
          for (Ye in Bl || !("__self" in C) || "key" in C || (Bl = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), fe(C) && (P(C.key), Te = "" + C.key), C)
            ka.call(C, Ye) && Ye !== "key" && Ye !== "__self" && Ye !== "__source" && (se[Ye] = C[Ye]);
        var Ie = arguments.length - 2;
        if (Ie === 1) se.children = oe;
        else if (1 < Ie) {
          for (var Ge = Array(Ie), dt = 0; dt < Ie; dt++)
            Ge[dt] = arguments[dt + 2];
          Object.freeze && Object.freeze(Ge), se.children = Ge;
        }
        if (p && p.defaultProps)
          for (Ye in Ie = p.defaultProps, Ie)
            se[Ye] === void 0 && (se[Ye] = Ie[Ye]);
        Te && Be(
          se,
          typeof p == "function" ? p.displayName || p.name || "Unknown" : p
        );
        var Ye = 1e4 > Ce.recentlyCreatedOwnerStacks++;
        return He(
          p,
          Te,
          void 0,
          void 0,
          _(),
          se,
          Ye ? Error("react-stack-top-frame") : dl,
          Ye ? $a(q(p)) : hn
        );
      }, H.createRef = function() {
        var p = { current: null };
        return Object.seal(p), p;
      }, H.forwardRef = function(p) {
        p != null && p.$$typeof === gt ? console.error(
          "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
        ) : typeof p != "function" ? console.error(
          "forwardRef requires a render function but was given %s.",
          p === null ? "null" : typeof p
        ) : p.length !== 0 && p.length !== 2 && console.error(
          "forwardRef render functions accept exactly two parameters: props and ref. %s",
          p.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
        ), p != null && p.defaultProps != null && console.error(
          "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
        );
        var C = { $$typeof: be, render: p }, oe;
        return Object.defineProperty(C, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return oe;
          },
          set: function(se) {
            oe = se, p.name || p.displayName || (Object.defineProperty(p, "name", { value: se }), p.displayName = se);
          }
        }), C;
      }, H.isValidElement = ot, H.lazy = function(p) {
        return {
          $$typeof: Vt,
          _payload: { _status: -1, _result: p },
          _init: ft
        };
      }, H.memo = function(p, C) {
        p == null && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          p === null ? "null" : typeof p
        ), C = {
          $$typeof: gt,
          type: p,
          compare: C === void 0 ? null : C
        };
        var oe;
        return Object.defineProperty(C, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return oe;
          },
          set: function(se) {
            oe = se, p.name || p.displayName || (Object.defineProperty(p, "name", { value: se }), p.displayName = se);
          }
        }), C;
      }, H.startTransition = function(p) {
        var C = Ce.T, oe = {};
        Ce.T = oe, oe._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var se = p(), Te = Ce.S;
          Te !== null && Te(oe, se), typeof se == "object" && se !== null && typeof se.then == "function" && se.then(Ne, $c);
        } catch (Ie) {
          $c(Ie);
        } finally {
          C === null && oe._updatedFibers && (p = oe._updatedFibers.size, oe._updatedFibers.clear(), 10 < p && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), Ce.T = C;
        }
      }, H.unstable_useCacheRefresh = function() {
        return Se().useCacheRefresh();
      }, H.use = function(p) {
        return Se().use(p);
      }, H.useActionState = function(p, C, oe) {
        return Se().useActionState(
          p,
          C,
          oe
        );
      }, H.useCallback = function(p, C) {
        return Se().useCallback(p, C);
      }, H.useContext = function(p) {
        var C = Se();
        return p.$$typeof === re && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), C.useContext(p);
      }, H.useDebugValue = function(p, C) {
        return Se().useDebugValue(p, C);
      }, H.useDeferredValue = function(p, C) {
        return Se().useDeferredValue(p, C);
      }, H.useEffect = function(p, C, oe) {
        p == null && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        var se = Se();
        if (typeof oe == "function")
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React."
          );
        return se.useEffect(p, C);
      }, H.useId = function() {
        return Se().useId();
      }, H.useImperativeHandle = function(p, C, oe) {
        return Se().useImperativeHandle(p, C, oe);
      }, H.useInsertionEffect = function(p, C) {
        return p == null && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), Se().useInsertionEffect(p, C);
      }, H.useLayoutEffect = function(p, C) {
        return p == null && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), Se().useLayoutEffect(p, C);
      }, H.useMemo = function(p, C) {
        return Se().useMemo(p, C);
      }, H.useOptimistic = function(p, C) {
        return Se().useOptimistic(p, C);
      }, H.useReducer = function(p, C, oe) {
        return Se().useReducer(p, C, oe);
      }, H.useRef = function(p) {
        return Se().useRef(p);
      }, H.useState = function(p) {
        return Se().useState(p);
      }, H.useSyncExternalStore = function(p, C, oe) {
        return Se().useSyncExternalStore(
          p,
          C,
          oe
        );
      }, H.useTransition = function() {
        return Se().useTransition();
      }, H.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Ep, Ep.exports)), Ep.exports;
}
var s1;
function Rf() {
  if (s1) return pg.exports;
  s1 = 1;
  var S = {};
  return S.NODE_ENV === "production" ? pg.exports = PT() : pg.exports = eE(), pg.exports;
}
var d1;
function tE() {
  if (d1) return Sp;
  d1 = 1;
  var S = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return S.NODE_ENV !== "production" && function() {
    function H(O) {
      if (O == null) return null;
      if (typeof O == "function")
        return O.$$typeof === ft ? null : O.displayName || O.name || null;
      if (typeof O == "string") return O;
      switch (O) {
        case Be:
          return "Fragment";
        case He:
          return "Profiler";
        case ye:
          return "StrictMode";
        case yt:
          return "Suspense";
        case tt:
          return "SuspenseList";
        case pe:
          return "Activity";
      }
      if (typeof O == "object")
        switch (typeof O.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), O.$$typeof) {
          case fe:
            return "Portal";
          case ot:
            return (O.displayName || "Context") + ".Provider";
          case st:
            return (O._context.displayName || "Context") + ".Consumer";
          case Me:
            var k = O.render;
            return O = O.displayName, O || (O = k.displayName || k.name || "", O = O !== "" ? "ForwardRef(" + O + ")" : "ForwardRef"), O;
          case Oe:
            return k = O.displayName || null, k !== null ? k : H(O.type) || "Memo";
          case Rt:
            k = O._payload, O = O._init;
            try {
              return H(O(k));
            } catch {
            }
        }
      return null;
    }
    function W(O) {
      return "" + O;
    }
    function D(O) {
      try {
        W(O);
        var k = !1;
      } catch {
        k = !0;
      }
      if (k) {
        k = console;
        var Z = k.error, re = typeof Symbol == "function" && Symbol.toStringTag && O[Symbol.toStringTag] || O.constructor.name || "Object";
        return Z.call(
          k,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          re
        ), W(O);
      }
    }
    function ie(O) {
      if (O === Be) return "<>";
      if (typeof O == "object" && O !== null && O.$$typeof === Rt)
        return "<...>";
      try {
        var k = H(O);
        return k ? "<" + k + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function ce() {
      var O = Se.A;
      return O === null ? null : O.getOwner();
    }
    function ae() {
      return Error("react-stack-top-frame");
    }
    function ve(O) {
      if (Ne.call(O, "key")) {
        var k = Object.getOwnPropertyDescriptor(O, "key").get;
        if (k && k.isReactWarning) return !1;
      }
      return O.key !== void 0;
    }
    function te(O, k) {
      function Z() {
        V || (V = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          k
        ));
      }
      Z.isReactWarning = !0, Object.defineProperty(O, "key", {
        get: Z,
        configurable: !0
      });
    }
    function A() {
      var O = H(this.type);
      return j[O] || (j[O] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), O = this.props.ref, O !== void 0 ? O : null;
    }
    function P(O, k, Z, re, De, be, qe, vt) {
      return Z = be.ref, O = {
        $$typeof: ee,
        type: O,
        key: k,
        props: be,
        _owner: De
      }, (Z !== void 0 ? Z : null) !== null ? Object.defineProperty(O, "ref", {
        enumerable: !1,
        get: A
      }) : Object.defineProperty(O, "ref", { enumerable: !1, value: null }), O._store = {}, Object.defineProperty(O._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(O, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(O, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: qe
      }), Object.defineProperty(O, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: vt
      }), Object.freeze && (Object.freeze(O.props), Object.freeze(O)), O;
    }
    function ue(O, k, Z, re, De, be, qe, vt) {
      var gt = k.children;
      if (gt !== void 0)
        if (re)
          if (Xe(gt)) {
            for (re = 0; re < gt.length; re++)
              q(gt[re]);
            Object.freeze && Object.freeze(gt);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else q(gt);
      if (Ne.call(k, "key")) {
        gt = H(O);
        var Vt = Object.keys(k).filter(function(Ja) {
          return Ja !== "key";
        });
        re = 0 < Vt.length ? "{key: someKey, " + Vt.join(": ..., ") + ": ...}" : "{key: someKey}", E[gt + re] || (Vt = 0 < Vt.length ? "{" + Vt.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          re,
          gt,
          Vt,
          gt
        ), E[gt + re] = !0);
      }
      if (gt = null, Z !== void 0 && (D(Z), gt = "" + Z), ve(k) && (D(k.key), gt = "" + k.key), "key" in k) {
        Z = {};
        for (var Ml in k)
          Ml !== "key" && (Z[Ml] = k[Ml]);
      } else Z = k;
      return gt && te(
        Z,
        typeof O == "function" ? O.displayName || O.name || "Unknown" : O
      ), P(
        O,
        gt,
        be,
        De,
        ce(),
        Z,
        qe,
        vt
      );
    }
    function q(O) {
      typeof O == "object" && O !== null && O.$$typeof === ee && O._store && (O._store.validated = 1);
    }
    var _ = Rf(), ee = Symbol.for("react.transitional.element"), fe = Symbol.for("react.portal"), Be = Symbol.for("react.fragment"), ye = Symbol.for("react.strict_mode"), He = Symbol.for("react.profiler"), st = Symbol.for("react.consumer"), ot = Symbol.for("react.context"), Me = Symbol.for("react.forward_ref"), yt = Symbol.for("react.suspense"), tt = Symbol.for("react.suspense_list"), Oe = Symbol.for("react.memo"), Rt = Symbol.for("react.lazy"), pe = Symbol.for("react.activity"), ft = Symbol.for("react.client.reference"), Se = _.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Ne = Object.prototype.hasOwnProperty, Xe = Array.isArray, lt = console.createTask ? console.createTask : function() {
      return null;
    };
    _ = {
      "react-stack-bottom-frame": function(O) {
        return O();
      }
    };
    var V, j = {}, le = _["react-stack-bottom-frame"].bind(
      _,
      ae
    )(), he = lt(ie(ae)), E = {};
    Sp.Fragment = Be, Sp.jsx = function(O, k, Z, re, De) {
      var be = 1e4 > Se.recentlyCreatedOwnerStacks++;
      return ue(
        O,
        k,
        Z,
        !1,
        re,
        De,
        be ? Error("react-stack-top-frame") : le,
        be ? lt(ie(O)) : he
      );
    }, Sp.jsxs = function(O, k, Z, re, De) {
      var be = 1e4 > Se.recentlyCreatedOwnerStacks++;
      return ue(
        O,
        k,
        Z,
        !0,
        re,
        De,
        be ? Error("react-stack-top-frame") : le,
        be ? lt(ie(O)) : he
      );
    };
  }(), Sp;
}
var h1;
function lE() {
  if (h1) return mg.exports;
  h1 = 1;
  var S = {};
  return S.NODE_ENV === "production" ? mg.exports = IT() : mg.exports = tE(), mg.exports;
}
var fi = lE(), tl = Rf();
const Ap = /* @__PURE__ */ x1(tl);
var vg = { exports: {} }, bp = {}, gg = { exports: {} }, X0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var y1;
function nE() {
  return y1 || (y1 = 1, function(S) {
    function H(V, j) {
      var le = V.length;
      V.push(j);
      e: for (; 0 < le; ) {
        var he = le - 1 >>> 1, E = V[he];
        if (0 < ie(E, j))
          V[he] = j, V[le] = E, le = he;
        else break e;
      }
    }
    function W(V) {
      return V.length === 0 ? null : V[0];
    }
    function D(V) {
      if (V.length === 0) return null;
      var j = V[0], le = V.pop();
      if (le !== j) {
        V[0] = le;
        e: for (var he = 0, E = V.length, O = E >>> 1; he < O; ) {
          var k = 2 * (he + 1) - 1, Z = V[k], re = k + 1, De = V[re];
          if (0 > ie(Z, le))
            re < E && 0 > ie(De, Z) ? (V[he] = De, V[re] = le, he = re) : (V[he] = Z, V[k] = le, he = k);
          else if (re < E && 0 > ie(De, le))
            V[he] = De, V[re] = le, he = re;
          else break e;
        }
      }
      return j;
    }
    function ie(V, j) {
      var le = V.sortIndex - j.sortIndex;
      return le !== 0 ? le : V.id - j.id;
    }
    if (S.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ce = performance;
      S.unstable_now = function() {
        return ce.now();
      };
    } else {
      var ae = Date, ve = ae.now();
      S.unstable_now = function() {
        return ae.now() - ve;
      };
    }
    var te = [], A = [], P = 1, ue = null, q = 3, _ = !1, ee = !1, fe = !1, Be = !1, ye = typeof setTimeout == "function" ? setTimeout : null, He = typeof clearTimeout == "function" ? clearTimeout : null, st = typeof setImmediate < "u" ? setImmediate : null;
    function ot(V) {
      for (var j = W(A); j !== null; ) {
        if (j.callback === null) D(A);
        else if (j.startTime <= V)
          D(A), j.sortIndex = j.expirationTime, H(te, j);
        else break;
        j = W(A);
      }
    }
    function Me(V) {
      if (fe = !1, ot(V), !ee)
        if (W(te) !== null)
          ee = !0, yt || (yt = !0, Se());
        else {
          var j = W(A);
          j !== null && lt(Me, j.startTime - V);
        }
    }
    var yt = !1, tt = -1, Oe = 5, Rt = -1;
    function pe() {
      return Be ? !0 : !(S.unstable_now() - Rt < Oe);
    }
    function ft() {
      if (Be = !1, yt) {
        var V = S.unstable_now();
        Rt = V;
        var j = !0;
        try {
          e: {
            ee = !1, fe && (fe = !1, He(tt), tt = -1), _ = !0;
            var le = q;
            try {
              t: {
                for (ot(V), ue = W(te); ue !== null && !(ue.expirationTime > V && pe()); ) {
                  var he = ue.callback;
                  if (typeof he == "function") {
                    ue.callback = null, q = ue.priorityLevel;
                    var E = he(
                      ue.expirationTime <= V
                    );
                    if (V = S.unstable_now(), typeof E == "function") {
                      ue.callback = E, ot(V), j = !0;
                      break t;
                    }
                    ue === W(te) && D(te), ot(V);
                  } else D(te);
                  ue = W(te);
                }
                if (ue !== null) j = !0;
                else {
                  var O = W(A);
                  O !== null && lt(
                    Me,
                    O.startTime - V
                  ), j = !1;
                }
              }
              break e;
            } finally {
              ue = null, q = le, _ = !1;
            }
            j = void 0;
          }
        } finally {
          j ? Se() : yt = !1;
        }
      }
    }
    var Se;
    if (typeof st == "function")
      Se = function() {
        st(ft);
      };
    else if (typeof MessageChannel < "u") {
      var Ne = new MessageChannel(), Xe = Ne.port2;
      Ne.port1.onmessage = ft, Se = function() {
        Xe.postMessage(null);
      };
    } else
      Se = function() {
        ye(ft, 0);
      };
    function lt(V, j) {
      tt = ye(function() {
        V(S.unstable_now());
      }, j);
    }
    S.unstable_IdlePriority = 5, S.unstable_ImmediatePriority = 1, S.unstable_LowPriority = 4, S.unstable_NormalPriority = 3, S.unstable_Profiling = null, S.unstable_UserBlockingPriority = 2, S.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, S.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Oe = 0 < V ? Math.floor(1e3 / V) : 5;
    }, S.unstable_getCurrentPriorityLevel = function() {
      return q;
    }, S.unstable_next = function(V) {
      switch (q) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = q;
      }
      var le = q;
      q = j;
      try {
        return V();
      } finally {
        q = le;
      }
    }, S.unstable_requestPaint = function() {
      Be = !0;
    }, S.unstable_runWithPriority = function(V, j) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var le = q;
      q = V;
      try {
        return j();
      } finally {
        q = le;
      }
    }, S.unstable_scheduleCallback = function(V, j, le) {
      var he = S.unstable_now();
      switch (typeof le == "object" && le !== null ? (le = le.delay, le = typeof le == "number" && 0 < le ? he + le : he) : le = he, V) {
        case 1:
          var E = -1;
          break;
        case 2:
          E = 250;
          break;
        case 5:
          E = 1073741823;
          break;
        case 4:
          E = 1e4;
          break;
        default:
          E = 5e3;
      }
      return E = le + E, V = {
        id: P++,
        callback: j,
        priorityLevel: V,
        startTime: le,
        expirationTime: E,
        sortIndex: -1
      }, le > he ? (V.sortIndex = le, H(A, V), W(te) === null && V === W(A) && (fe ? (He(tt), tt = -1) : fe = !0, lt(Me, le - he))) : (V.sortIndex = E, H(te, V), ee || _ || (ee = !0, yt || (yt = !0, Se()))), V;
    }, S.unstable_shouldYield = pe, S.unstable_wrapCallback = function(V) {
      var j = q;
      return function() {
        var le = q;
        q = j;
        try {
          return V.apply(this, arguments);
        } finally {
          q = le;
        }
      };
    };
  }(X0)), X0;
}
var Q0 = {}, m1;
function aE() {
  return m1 || (m1 = 1, function(S) {
    var H = {};
    /**
     * @license React
     * scheduler.development.js
     *
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    H.NODE_ENV !== "production" && function() {
      function W() {
        if (yt = !1, pe) {
          var j = S.unstable_now();
          Ne = j;
          var le = !0;
          try {
            e: {
              ot = !1, Me && (Me = !1, Oe(ft), ft = -1), st = !0;
              var he = He;
              try {
                t: {
                  for (ve(j), ye = ie(ee); ye !== null && !(ye.expirationTime > j && A()); ) {
                    var E = ye.callback;
                    if (typeof E == "function") {
                      ye.callback = null, He = ye.priorityLevel;
                      var O = E(
                        ye.expirationTime <= j
                      );
                      if (j = S.unstable_now(), typeof O == "function") {
                        ye.callback = O, ve(j), le = !0;
                        break t;
                      }
                      ye === ie(ee) && ce(ee), ve(j);
                    } else ce(ee);
                    ye = ie(ee);
                  }
                  if (ye !== null) le = !0;
                  else {
                    var k = ie(fe);
                    k !== null && P(
                      te,
                      k.startTime - j
                    ), le = !1;
                  }
                }
                break e;
              } finally {
                ye = null, He = he, st = !1;
              }
              le = void 0;
            }
          } finally {
            le ? Xe() : pe = !1;
          }
        }
      }
      function D(j, le) {
        var he = j.length;
        j.push(le);
        e: for (; 0 < he; ) {
          var E = he - 1 >>> 1, O = j[E];
          if (0 < ae(O, le))
            j[E] = le, j[he] = O, he = E;
          else break e;
        }
      }
      function ie(j) {
        return j.length === 0 ? null : j[0];
      }
      function ce(j) {
        if (j.length === 0) return null;
        var le = j[0], he = j.pop();
        if (he !== le) {
          j[0] = he;
          e: for (var E = 0, O = j.length, k = O >>> 1; E < k; ) {
            var Z = 2 * (E + 1) - 1, re = j[Z], De = Z + 1, be = j[De];
            if (0 > ae(re, he))
              De < O && 0 > ae(be, re) ? (j[E] = be, j[De] = he, E = De) : (j[E] = re, j[Z] = he, E = Z);
            else if (De < O && 0 > ae(be, he))
              j[E] = be, j[De] = he, E = De;
            else break e;
          }
        }
        return le;
      }
      function ae(j, le) {
        var he = j.sortIndex - le.sortIndex;
        return he !== 0 ? he : j.id - le.id;
      }
      function ve(j) {
        for (var le = ie(fe); le !== null; ) {
          if (le.callback === null) ce(fe);
          else if (le.startTime <= j)
            ce(fe), le.sortIndex = le.expirationTime, D(ee, le);
          else break;
          le = ie(fe);
        }
      }
      function te(j) {
        if (Me = !1, ve(j), !ot)
          if (ie(ee) !== null)
            ot = !0, pe || (pe = !0, Xe());
          else {
            var le = ie(fe);
            le !== null && P(
              te,
              le.startTime - j
            );
          }
      }
      function A() {
        return yt ? !0 : !(S.unstable_now() - Ne < Se);
      }
      function P(j, le) {
        ft = tt(function() {
          j(S.unstable_now());
        }, le);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), S.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var ue = performance;
        S.unstable_now = function() {
          return ue.now();
        };
      } else {
        var q = Date, _ = q.now();
        S.unstable_now = function() {
          return q.now() - _;
        };
      }
      var ee = [], fe = [], Be = 1, ye = null, He = 3, st = !1, ot = !1, Me = !1, yt = !1, tt = typeof setTimeout == "function" ? setTimeout : null, Oe = typeof clearTimeout == "function" ? clearTimeout : null, Rt = typeof setImmediate < "u" ? setImmediate : null, pe = !1, ft = -1, Se = 5, Ne = -1;
      if (typeof Rt == "function")
        var Xe = function() {
          Rt(W);
        };
      else if (typeof MessageChannel < "u") {
        var lt = new MessageChannel(), V = lt.port2;
        lt.port1.onmessage = W, Xe = function() {
          V.postMessage(null);
        };
      } else
        Xe = function() {
          tt(W, 0);
        };
      S.unstable_IdlePriority = 5, S.unstable_ImmediatePriority = 1, S.unstable_LowPriority = 4, S.unstable_NormalPriority = 3, S.unstable_Profiling = null, S.unstable_UserBlockingPriority = 2, S.unstable_cancelCallback = function(j) {
        j.callback = null;
      }, S.unstable_forceFrameRate = function(j) {
        0 > j || 125 < j ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Se = 0 < j ? Math.floor(1e3 / j) : 5;
      }, S.unstable_getCurrentPriorityLevel = function() {
        return He;
      }, S.unstable_next = function(j) {
        switch (He) {
          case 1:
          case 2:
          case 3:
            var le = 3;
            break;
          default:
            le = He;
        }
        var he = He;
        He = le;
        try {
          return j();
        } finally {
          He = he;
        }
      }, S.unstable_requestPaint = function() {
        yt = !0;
      }, S.unstable_runWithPriority = function(j, le) {
        switch (j) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            j = 3;
        }
        var he = He;
        He = j;
        try {
          return le();
        } finally {
          He = he;
        }
      }, S.unstable_scheduleCallback = function(j, le, he) {
        var E = S.unstable_now();
        switch (typeof he == "object" && he !== null ? (he = he.delay, he = typeof he == "number" && 0 < he ? E + he : E) : he = E, j) {
          case 1:
            var O = -1;
            break;
          case 2:
            O = 250;
            break;
          case 5:
            O = 1073741823;
            break;
          case 4:
            O = 1e4;
            break;
          default:
            O = 5e3;
        }
        return O = he + O, j = {
          id: Be++,
          callback: le,
          priorityLevel: j,
          startTime: he,
          expirationTime: O,
          sortIndex: -1
        }, he > E ? (j.sortIndex = he, D(fe, j), ie(ee) === null && j === ie(fe) && (Me ? (Oe(ft), ft = -1) : Me = !0, P(te, he - E))) : (j.sortIndex = O, D(ee, j), ot || st || (ot = !0, pe || (pe = !0, Xe()))), j;
      }, S.unstable_shouldYield = A, S.unstable_wrapCallback = function(j) {
        var le = He;
        return function() {
          var he = He;
          He = le;
          try {
            return j.apply(this, arguments);
          } finally {
            He = he;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(Q0)), Q0;
}
var p1;
function N1() {
  if (p1) return gg.exports;
  p1 = 1;
  var S = {};
  return S.NODE_ENV === "production" ? gg.exports = nE() : gg.exports = aE(), gg.exports;
}
var Sg = { exports: {} }, wn = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var v1;
function uE() {
  if (v1) return wn;
  v1 = 1;
  var S = Rf();
  function H(te) {
    var A = "https://react.dev/errors/" + te;
    if (1 < arguments.length) {
      A += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var P = 2; P < arguments.length; P++)
        A += "&args[]=" + encodeURIComponent(arguments[P]);
    }
    return "Minified React error #" + te + "; visit " + A + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function W() {
  }
  var D = {
    d: {
      f: W,
      r: function() {
        throw Error(H(522));
      },
      D: W,
      C: W,
      L: W,
      m: W,
      X: W,
      S: W,
      M: W
    },
    p: 0,
    findDOMNode: null
  }, ie = Symbol.for("react.portal");
  function ce(te, A, P) {
    var ue = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: ie,
      key: ue == null ? null : "" + ue,
      children: te,
      containerInfo: A,
      implementation: P
    };
  }
  var ae = S.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function ve(te, A) {
    if (te === "font") return "";
    if (typeof A == "string")
      return A === "use-credentials" ? A : "";
  }
  return wn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, wn.createPortal = function(te, A) {
    var P = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
      throw Error(H(299));
    return ce(te, A, null, P);
  }, wn.flushSync = function(te) {
    var A = ae.T, P = D.p;
    try {
      if (ae.T = null, D.p = 2, te) return te();
    } finally {
      ae.T = A, D.p = P, D.d.f();
    }
  }, wn.preconnect = function(te, A) {
    typeof te == "string" && (A ? (A = A.crossOrigin, A = typeof A == "string" ? A === "use-credentials" ? A : "" : void 0) : A = null, D.d.C(te, A));
  }, wn.prefetchDNS = function(te) {
    typeof te == "string" && D.d.D(te);
  }, wn.preinit = function(te, A) {
    if (typeof te == "string" && A && typeof A.as == "string") {
      var P = A.as, ue = ve(P, A.crossOrigin), q = typeof A.integrity == "string" ? A.integrity : void 0, _ = typeof A.fetchPriority == "string" ? A.fetchPriority : void 0;
      P === "style" ? D.d.S(
        te,
        typeof A.precedence == "string" ? A.precedence : void 0,
        {
          crossOrigin: ue,
          integrity: q,
          fetchPriority: _
        }
      ) : P === "script" && D.d.X(te, {
        crossOrigin: ue,
        integrity: q,
        fetchPriority: _,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0
      });
    }
  }, wn.preinitModule = function(te, A) {
    if (typeof te == "string")
      if (typeof A == "object" && A !== null) {
        if (A.as == null || A.as === "script") {
          var P = ve(
            A.as,
            A.crossOrigin
          );
          D.d.M(te, {
            crossOrigin: P,
            integrity: typeof A.integrity == "string" ? A.integrity : void 0,
            nonce: typeof A.nonce == "string" ? A.nonce : void 0
          });
        }
      } else A == null && D.d.M(te);
  }, wn.preload = function(te, A) {
    if (typeof te == "string" && typeof A == "object" && A !== null && typeof A.as == "string") {
      var P = A.as, ue = ve(P, A.crossOrigin);
      D.d.L(te, P, {
        crossOrigin: ue,
        integrity: typeof A.integrity == "string" ? A.integrity : void 0,
        nonce: typeof A.nonce == "string" ? A.nonce : void 0,
        type: typeof A.type == "string" ? A.type : void 0,
        fetchPriority: typeof A.fetchPriority == "string" ? A.fetchPriority : void 0,
        referrerPolicy: typeof A.referrerPolicy == "string" ? A.referrerPolicy : void 0,
        imageSrcSet: typeof A.imageSrcSet == "string" ? A.imageSrcSet : void 0,
        imageSizes: typeof A.imageSizes == "string" ? A.imageSizes : void 0,
        media: typeof A.media == "string" ? A.media : void 0
      });
    }
  }, wn.preloadModule = function(te, A) {
    if (typeof te == "string")
      if (A) {
        var P = ve(A.as, A.crossOrigin);
        D.d.m(te, {
          as: typeof A.as == "string" && A.as !== "script" ? A.as : void 0,
          crossOrigin: P,
          integrity: typeof A.integrity == "string" ? A.integrity : void 0
        });
      } else D.d.m(te);
  }, wn.requestFormReset = function(te) {
    D.d.r(te);
  }, wn.unstable_batchedUpdates = function(te, A) {
    return te(A);
  }, wn.useFormState = function(te, A, P) {
    return ae.H.useFormState(te, A, P);
  }, wn.useFormStatus = function() {
    return ae.H.useHostTransitionStatus();
  }, wn.version = "19.1.0", wn;
}
var qn = {}, g1;
function iE() {
  if (g1) return qn;
  g1 = 1;
  var S = {};
  /**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return S.NODE_ENV !== "production" && function() {
    function H() {
    }
    function W(q) {
      return "" + q;
    }
    function D(q, _, ee) {
      var fe = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        W(fe);
        var Be = !1;
      } catch {
        Be = !0;
      }
      return Be && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && fe[Symbol.toStringTag] || fe.constructor.name || "Object"
      ), W(fe)), {
        $$typeof: P,
        key: fe == null ? null : "" + fe,
        children: q,
        containerInfo: _,
        implementation: ee
      };
    }
    function ie(q, _) {
      if (q === "font") return "";
      if (typeof _ == "string")
        return _ === "use-credentials" ? _ : "";
    }
    function ce(q) {
      return q === null ? "`null`" : q === void 0 ? "`undefined`" : q === "" ? "an empty string" : 'something with type "' + typeof q + '"';
    }
    function ae(q) {
      return q === null ? "`null`" : q === void 0 ? "`undefined`" : q === "" ? "an empty string" : typeof q == "string" ? JSON.stringify(q) : typeof q == "number" ? "`" + q + "`" : 'something with type "' + typeof q + '"';
    }
    function ve() {
      var q = ue.H;
      return q === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), q;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var te = Rf(), A = {
      d: {
        f: H,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: H,
        C: H,
        L: H,
        m: H,
        X: H,
        S: H,
        M: H
      },
      p: 0,
      findDOMNode: null
    }, P = Symbol.for("react.portal"), ue = te.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), qn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = A, qn.createPortal = function(q, _) {
      var ee = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return D(q, _, null, ee);
    }, qn.flushSync = function(q) {
      var _ = ue.T, ee = A.p;
      try {
        if (ue.T = null, A.p = 2, q)
          return q();
      } finally {
        ue.T = _, A.p = ee, A.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, qn.preconnect = function(q, _) {
      typeof q == "string" && q ? _ != null && typeof _ != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        ae(_)
      ) : _ != null && typeof _.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        ce(_.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ce(q)
      ), typeof q == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, A.d.C(q, _));
    }, qn.prefetchDNS = function(q) {
      if (typeof q != "string" || !q)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          ce(q)
        );
      else if (1 < arguments.length) {
        var _ = arguments[1];
        typeof _ == "object" && _.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          ae(_)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          ae(_)
        );
      }
      typeof q == "string" && A.d.D(q);
    }, qn.preinit = function(q, _) {
      if (typeof q == "string" && q ? _ == null || typeof _ != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        ae(_)
      ) : _.as !== "style" && _.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        ae(_.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ce(q)
      ), typeof q == "string" && _ && typeof _.as == "string") {
        var ee = _.as, fe = ie(ee, _.crossOrigin), Be = typeof _.integrity == "string" ? _.integrity : void 0, ye = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
        ee === "style" ? A.d.S(
          q,
          typeof _.precedence == "string" ? _.precedence : void 0,
          {
            crossOrigin: fe,
            integrity: Be,
            fetchPriority: ye
          }
        ) : ee === "script" && A.d.X(q, {
          crossOrigin: fe,
          integrity: Be,
          fetchPriority: ye,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0
        });
      }
    }, qn.preinitModule = function(q, _) {
      var ee = "";
      if (typeof q == "string" && q || (ee += " The `href` argument encountered was " + ce(q) + "."), _ !== void 0 && typeof _ != "object" ? ee += " The `options` argument encountered was " + ce(_) + "." : _ && "as" in _ && _.as !== "script" && (ee += " The `as` option encountered was " + ae(_.as) + "."), ee)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          ee
        );
      else
        switch (ee = _ && typeof _.as == "string" ? _.as : "script", ee) {
          case "script":
            break;
          default:
            ee = ae(ee), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              ee,
              q
            );
        }
      typeof q == "string" && (typeof _ == "object" && _ !== null ? (_.as == null || _.as === "script") && (ee = ie(
        _.as,
        _.crossOrigin
      ), A.d.M(q, {
        crossOrigin: ee,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      })) : _ == null && A.d.M(q));
    }, qn.preload = function(q, _) {
      var ee = "";
      if (typeof q == "string" && q || (ee += " The `href` argument encountered was " + ce(q) + "."), _ == null || typeof _ != "object" ? ee += " The `options` argument encountered was " + ce(_) + "." : typeof _.as == "string" && _.as || (ee += " The `as` option encountered was " + ce(_.as) + "."), ee && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        ee
      ), typeof q == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
        ee = _.as;
        var fe = ie(
          ee,
          _.crossOrigin
        );
        A.d.L(q, ee, {
          crossOrigin: fe,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0,
          type: typeof _.type == "string" ? _.type : void 0,
          fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
          referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
          imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
          imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
          media: typeof _.media == "string" ? _.media : void 0
        });
      }
    }, qn.preloadModule = function(q, _) {
      var ee = "";
      typeof q == "string" && q || (ee += " The `href` argument encountered was " + ce(q) + "."), _ !== void 0 && typeof _ != "object" ? ee += " The `options` argument encountered was " + ce(_) + "." : _ && "as" in _ && typeof _.as != "string" && (ee += " The `as` option encountered was " + ce(_.as) + "."), ee && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        ee
      ), typeof q == "string" && (_ ? (ee = ie(
        _.as,
        _.crossOrigin
      ), A.d.m(q, {
        as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
        crossOrigin: ee,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0
      })) : A.d.m(q));
    }, qn.requestFormReset = function(q) {
      A.d.r(q);
    }, qn.unstable_batchedUpdates = function(q, _) {
      return q(_);
    }, qn.useFormState = function(q, _, ee) {
      return ve().useFormState(q, _, ee);
    }, qn.useFormStatus = function() {
      return ve().useHostTransitionStatus();
    }, qn.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), qn;
}
var S1;
function w1() {
  if (S1) return Sg.exports;
  S1 = 1;
  var S = {};
  function H() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (S.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(H);
      } catch (W) {
        console.error(W);
      }
    }
  }
  return S.NODE_ENV === "production" ? (H(), Sg.exports = uE()) : Sg.exports = iE(), Sg.exports;
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b1;
function cE() {
  if (b1) return bp;
  b1 = 1;
  var S = N1(), H = Rf(), W = w1();
  function D(l) {
    var a = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      a += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        a += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function ie(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ce(l) {
    var a = l, u = l;
    if (l.alternate) for (; a.return; ) a = a.return;
    else {
      l = a;
      do
        a = l, (a.flags & 4098) !== 0 && (u = a.return), l = a.return;
      while (l);
    }
    return a.tag === 3 ? u : null;
  }
  function ae(l) {
    if (l.tag === 13) {
      var a = l.memoizedState;
      if (a === null && (l = l.alternate, l !== null && (a = l.memoizedState)), a !== null) return a.dehydrated;
    }
    return null;
  }
  function ve(l) {
    if (ce(l) !== l)
      throw Error(D(188));
  }
  function te(l) {
    var a = l.alternate;
    if (!a) {
      if (a = ce(l), a === null) throw Error(D(188));
      return a !== l ? null : l;
    }
    for (var u = l, c = a; ; ) {
      var r = u.return;
      if (r === null) break;
      var s = r.alternate;
      if (s === null) {
        if (c = r.return, c !== null) {
          u = c;
          continue;
        }
        break;
      }
      if (r.child === s.child) {
        for (s = r.child; s; ) {
          if (s === u) return ve(r), l;
          if (s === c) return ve(r), a;
          s = s.sibling;
        }
        throw Error(D(188));
      }
      if (u.return !== c.return) u = r, c = s;
      else {
        for (var y = !1, m = r.child; m; ) {
          if (m === u) {
            y = !0, u = r, c = s;
            break;
          }
          if (m === c) {
            y = !0, c = r, u = s;
            break;
          }
          m = m.sibling;
        }
        if (!y) {
          for (m = s.child; m; ) {
            if (m === u) {
              y = !0, u = s, c = r;
              break;
            }
            if (m === c) {
              y = !0, c = s, u = r;
              break;
            }
            m = m.sibling;
          }
          if (!y) throw Error(D(189));
        }
      }
      if (u.alternate !== c) throw Error(D(190));
    }
    if (u.tag !== 3) throw Error(D(188));
    return u.stateNode.current === u ? l : a;
  }
  function A(l) {
    var a = l.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return l;
    for (l = l.child; l !== null; ) {
      if (a = A(l), a !== null) return a;
      l = l.sibling;
    }
    return null;
  }
  var P = Object.assign, ue = Symbol.for("react.element"), q = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), ee = Symbol.for("react.fragment"), fe = Symbol.for("react.strict_mode"), Be = Symbol.for("react.profiler"), ye = Symbol.for("react.provider"), He = Symbol.for("react.consumer"), st = Symbol.for("react.context"), ot = Symbol.for("react.forward_ref"), Me = Symbol.for("react.suspense"), yt = Symbol.for("react.suspense_list"), tt = Symbol.for("react.memo"), Oe = Symbol.for("react.lazy"), Rt = Symbol.for("react.activity"), pe = Symbol.for("react.memo_cache_sentinel"), ft = Symbol.iterator;
  function Se(l) {
    return l === null || typeof l != "object" ? null : (l = ft && l[ft] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Ne = Symbol.for("react.client.reference");
  function Xe(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Ne ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case ee:
        return "Fragment";
      case Be:
        return "Profiler";
      case fe:
        return "StrictMode";
      case Me:
        return "Suspense";
      case yt:
        return "SuspenseList";
      case Rt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case _:
          return "Portal";
        case st:
          return (l.displayName || "Context") + ".Provider";
        case He:
          return (l._context.displayName || "Context") + ".Consumer";
        case ot:
          var a = l.render;
          return l = l.displayName, l || (l = a.displayName || a.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case tt:
          return a = l.displayName || null, a !== null ? a : Xe(l.type) || "Memo";
        case Oe:
          a = l._payload, l = l._init;
          try {
            return Xe(l(a));
          } catch {
          }
      }
    return null;
  }
  var lt = Array.isArray, V = H.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = W.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, le = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, he = [], E = -1;
  function O(l) {
    return { current: l };
  }
  function k(l) {
    0 > E || (l.current = he[E], he[E] = null, E--);
  }
  function Z(l, a) {
    E++, he[E] = l.current, l.current = a;
  }
  var re = O(null), De = O(null), be = O(null), qe = O(null);
  function vt(l, a) {
    switch (Z(be, a), Z(De, l), Z(re, null), a.nodeType) {
      case 9:
      case 11:
        l = (l = a.documentElement) && (l = l.namespaceURI) ? iu(l) : 0;
        break;
      default:
        if (l = a.tagName, a = a.namespaceURI)
          a = iu(a), l = Iu(a, l);
        else
          switch (l) {
            case "svg":
              l = 1;
              break;
            case "math":
              l = 2;
              break;
            default:
              l = 0;
          }
    }
    k(re), Z(re, l);
  }
  function gt() {
    k(re), k(De), k(be);
  }
  function Vt(l) {
    l.memoizedState !== null && Z(qe, l);
    var a = re.current, u = Iu(a, l.type);
    a !== u && (Z(De, l), Z(re, u));
  }
  function Ml(l) {
    De.current === l && (k(re), k(De)), qe.current === l && (k(qe), Zl._currentValue = le);
  }
  var Ja = Object.prototype.hasOwnProperty, it = S.unstable_scheduleCallback, mt = S.unstable_cancelCallback, It = S.unstable_shouldYield, At = S.unstable_requestPaint, Je = S.unstable_now, $l = S.unstable_getCurrentPriorityLevel, Yt = S.unstable_ImmediatePriority, sl = S.unstable_UserBlockingPriority, Ce = S.unstable_NormalPriority, ka = S.unstable_LowPriority, $a = S.unstable_IdlePriority, va = S.log, Bl = S.unstable_setDisableYieldValue, bl = null, dl = null;
  function hn(l) {
    if (typeof va == "function" && Bl(l), dl && typeof dl.setStrictMode == "function")
      try {
        dl.setStrictMode(bl, l);
      } catch {
      }
  }
  var cl = Math.clz32 ? Math.clz32 : Of, Af = Math.log, $c = Math.LN2;
  function Of(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (Af(l) / $c | 0) | 0;
  }
  var Ou = 256, ga = 4194304;
  function Yl(l) {
    var a = l & 42;
    if (a !== 0) return a;
    switch (l & -l) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return l & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return l & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return l;
    }
  }
  function yn(l, a, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var r = 0, s = l.suspendedLanes, y = l.pingedLanes;
    l = l.warmLanes;
    var m = c & 134217727;
    return m !== 0 ? (c = m & ~s, c !== 0 ? r = Yl(c) : (y &= m, y !== 0 ? r = Yl(y) : u || (u = m & ~l, u !== 0 && (r = Yl(u))))) : (m = c & ~s, m !== 0 ? r = Yl(m) : y !== 0 ? r = Yl(y) : u || (u = c & ~l, u !== 0 && (r = Yl(u)))), r === 0 ? 0 : a !== 0 && a !== r && (a & s) === 0 && (s = r & -r, u = a & -a, s >= u || s === 32 && (u & 4194048) !== 0) ? a : r;
  }
  function ea(l, a) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & a) === 0;
  }
  function p(l, a) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return a + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return a + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function C() {
    var l = Ou;
    return Ou <<= 1, (Ou & 4194048) === 0 && (Ou = 256), l;
  }
  function oe() {
    var l = ga;
    return ga <<= 1, (ga & 62914560) === 0 && (ga = 4194304), l;
  }
  function se(l) {
    for (var a = [], u = 0; 31 > u; u++) a.push(l);
    return a;
  }
  function Te(l, a) {
    l.pendingLanes |= a, a !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Ie(l, a, u, c, r, s) {
    var y = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var m = l.entanglements, b = l.expirationTimes, x = l.hiddenUpdates;
    for (u = y & ~u; 0 < u; ) {
      var $ = 31 - cl(u), I = 1 << $;
      m[$] = 0, b[$] = -1;
      var w = x[$];
      if (w !== null)
        for (x[$] = null, $ = 0; $ < w.length; $++) {
          var G = w[$];
          G !== null && (G.lane &= -536870913);
        }
      u &= ~I;
    }
    c !== 0 && Ge(l, c, 0), s !== 0 && r === 0 && l.tag !== 0 && (l.suspendedLanes |= s & ~(y & ~a));
  }
  function Ge(l, a, u) {
    l.pendingLanes |= a, l.suspendedLanes &= ~a;
    var c = 31 - cl(a);
    l.entangledLanes |= a, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194090;
  }
  function dt(l, a) {
    var u = l.entangledLanes |= a;
    for (l = l.entanglements; u; ) {
      var c = 31 - cl(u), r = 1 << c;
      r & a | l[c] & a && (l[c] |= a), u &= ~r;
    }
  }
  function Ye(l) {
    switch (l) {
      case 2:
        l = 1;
        break;
      case 8:
        l = 4;
        break;
      case 32:
        l = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        l = 128;
        break;
      case 268435456:
        l = 134217728;
        break;
      default:
        l = 0;
    }
    return l;
  }
  function hl(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Wa() {
    var l = j.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Uv(l.type));
  }
  function Oh(l, a) {
    var u = j.p;
    try {
      return j.p = l, a();
    } finally {
      j.p = u;
    }
  }
  var Fa = Math.random().toString(36).slice(2), jt = "__reactFiber$" + Fa, Wl = "__reactProps$" + Fa, Ii = "__reactContainer$" + Fa, Dh = "__reactEvents$" + Fa, Dp = "__reactListeners$" + Fa, Mp = "__reactHandles$" + Fa, Df = "__reactResources$" + Fa, Mf = "__reactMarker$" + Fa;
  function Ae(l) {
    delete l[jt], delete l[Wl], delete l[Dh], delete l[Dp], delete l[Mp];
  }
  function ri(l) {
    var a = l[jt];
    if (a) return a;
    for (var u = l.parentNode; u; ) {
      if (a = u[Ii] || u[jt]) {
        if (u = a.alternate, a.child !== null || u !== null && u.child !== null)
          for (l = wc(l); l !== null; ) {
            if (u = l[jt]) return u;
            l = wc(l);
          }
        return a;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function jl(l) {
    if (l = l[jt] || l[Ii]) {
      var a = l.tag;
      if (a === 5 || a === 6 || a === 13 || a === 26 || a === 27 || a === 3)
        return l;
    }
    return null;
  }
  function Wc(l) {
    var a = l.tag;
    if (a === 5 || a === 26 || a === 27 || a === 6) return l.stateNode;
    throw Error(D(33));
  }
  function Fc(l) {
    var a = l[Df];
    return a || (a = l[Df] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
  }
  function ol(l) {
    l[Mf] = !0;
  }
  var Mh = /* @__PURE__ */ new Set(), zf = {};
  function zl(l, a) {
    Pi(l, a), Pi(l + "Capture", a);
  }
  function Pi(l, a) {
    for (zf[l] = a, l = 0; l < a.length; l++)
      Mh.add(a[l]);
  }
  var zh = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _h = {}, rs = {};
  function zp(l) {
    return Ja.call(rs, l) ? !0 : Ja.call(_h, l) ? !1 : zh.test(l) ? rs[l] = !0 : (_h[l] = !0, !1);
  }
  function _f(l, a, u) {
    if (zp(a))
      if (u === null) l.removeAttribute(a);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(a);
            return;
          case "boolean":
            var c = a.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(a);
              return;
            }
        }
        l.setAttribute(a, "" + u);
      }
  }
  function Du(l, a, u) {
    if (u === null) l.removeAttribute(a);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(a);
          return;
      }
      l.setAttribute(a, "" + u);
    }
  }
  function Ia(l, a, u, c) {
    if (c === null) l.removeAttribute(u);
    else {
      switch (typeof c) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(u);
          return;
      }
      l.setAttributeNS(a, u, "" + c);
    }
  }
  var ss, Ch;
  function ec(l) {
    if (ss === void 0)
      try {
        throw Error();
      } catch (u) {
        var a = u.stack.trim().match(/\n( *(at )?)/);
        ss = a && a[1] || "", Ch = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ss + l + Ch;
  }
  var ds = !1;
  function an(l, a) {
    if (!l || ds) return "";
    ds = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (a) {
              var I = function() {
                throw Error();
              };
              if (Object.defineProperty(I.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(I, []);
                } catch (G) {
                  var w = G;
                }
                Reflect.construct(l, [], I);
              } else {
                try {
                  I.call();
                } catch (G) {
                  w = G;
                }
                l.call(I.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (G) {
                w = G;
              }
              (I = l()) && typeof I.catch == "function" && I.catch(function() {
              });
            }
          } catch (G) {
            if (G && w && typeof G.stack == "string")
              return [G.stack, w.stack];
          }
          return [null, null];
        }
      };
      c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        c.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        c.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = c.DetermineComponentFrameRoot(), y = s[0], m = s[1];
      if (y && m) {
        var b = y.split(`
`), x = m.split(`
`);
        for (r = c = 0; c < b.length && !b[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; r < x.length && !x[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (c === b.length || r === x.length)
          for (c = b.length - 1, r = x.length - 1; 1 <= c && 0 <= r && b[c] !== x[r]; )
            r--;
        for (; 1 <= c && 0 <= r; c--, r--)
          if (b[c] !== x[r]) {
            if (c !== 1 || r !== 1)
              do
                if (c--, r--, 0 > r || b[c] !== x[r]) {
                  var $ = `
` + b[c].replace(" at new ", " at ");
                  return l.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", l.displayName)), $;
                }
              while (1 <= c && 0 <= r);
            break;
          }
      }
    } finally {
      ds = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? ec(u) : "";
  }
  function Ic(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return ec(l.type);
      case 16:
        return ec("Lazy");
      case 13:
        return ec("Suspense");
      case 19:
        return ec("SuspenseList");
      case 0:
      case 15:
        return an(l.type, !1);
      case 11:
        return an(l.type.render, !1);
      case 1:
        return an(l.type, !0);
      case 31:
        return ec("Activity");
      default:
        return "";
    }
  }
  function si(l) {
    try {
      var a = "";
      do
        a += Ic(l), l = l.return;
      while (l);
      return a;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function Yn(l) {
    switch (typeof l) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return l;
      case "object":
        return l;
      default:
        return "";
    }
  }
  function Pc(l) {
    var a = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
  }
  function hs(l) {
    var a = Pc(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      a
    ), c = "" + l[a];
    if (!l.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var r = u.get, s = u.set;
      return Object.defineProperty(l, a, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(y) {
          c = "" + y, s.call(this, y);
        }
      }), Object.defineProperty(l, a, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(y) {
          c = "" + y;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[a];
        }
      };
    }
  }
  function eo(l) {
    l._valueTracker || (l._valueTracker = hs(l));
  }
  function to(l) {
    if (!l) return !1;
    var a = l._valueTracker;
    if (!a) return !0;
    var u = a.getValue(), c = "";
    return l && (c = Pc(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (a.setValue(l), !0) : !1;
  }
  function Mu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Uh = /[\n"\\]/g;
  function ta(l) {
    return l.replace(
      Uh,
      function(a) {
        return "\\" + a.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hh(l, a, u, c, r, s, y, m) {
    l.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.type = y : l.removeAttribute("type"), a != null ? y === "number" ? (a === 0 && l.value === "" || l.value != a) && (l.value = "" + Yn(a)) : l.value !== "" + Yn(a) && (l.value = "" + Yn(a)) : y !== "submit" && y !== "reset" || l.removeAttribute("value"), a != null ? Cf(l, y, Yn(a)) : u != null ? Cf(l, y, Yn(u)) : c != null && l.removeAttribute("value"), r == null && s != null && (l.defaultChecked = !!s), r != null && (l.checked = r && typeof r != "function" && typeof r != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.name = "" + Yn(m) : l.removeAttribute("name");
  }
  function xh(l, a, u, c, r, s, y, m) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (l.type = s), a != null || u != null) {
      if (!(s !== "submit" && s !== "reset" || a != null))
        return;
      u = u != null ? "" + Yn(u) : "", a = a != null ? "" + Yn(a) : u, m || a === l.value || (l.value = a), l.defaultValue = a;
    }
    c = c ?? r, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = m ? l.checked : !!c, l.defaultChecked = !!c, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (l.name = y);
  }
  function Cf(l, a, u) {
    a === "number" && Mu(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function di(l, a, u, c) {
    if (l = l.options, a) {
      a = {};
      for (var r = 0; r < u.length; r++)
        a["$" + u[r]] = !0;
      for (u = 0; u < l.length; u++)
        r = a.hasOwnProperty("$" + l[u].value), l[u].selected !== r && (l[u].selected = r), r && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + Yn(u), a = null, r = 0; r < l.length; r++) {
        if (l[r].value === u) {
          l[r].selected = !0, c && (l[r].defaultSelected = !0);
          return;
        }
        a !== null || l[r].disabled || (a = l[r]);
      }
      a !== null && (a.selected = !0);
    }
  }
  function Nh(l, a, u) {
    if (a != null && (a = "" + Yn(a), a !== l.value && (l.value = a), u == null)) {
      l.defaultValue !== a && (l.defaultValue = a);
      return;
    }
    l.defaultValue = u != null ? "" + Yn(u) : "";
  }
  function wh(l, a, u, c) {
    if (a == null) {
      if (c != null) {
        if (u != null) throw Error(D(92));
        if (lt(c)) {
          if (1 < c.length) throw Error(D(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), a = u;
    }
    u = Yn(a), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function tc(l, a) {
    if (a) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = a;
        return;
      }
    }
    l.textContent = a;
  }
  var Rg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function qh(l, a, u) {
    var c = a.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "" : c ? l.setProperty(a, u) : typeof u != "number" || u === 0 || Rg.has(a) ? a === "float" ? l.cssFloat = u : l[a] = ("" + u).trim() : l[a] = u + "px";
  }
  function ys(l, a, u) {
    if (a != null && typeof a != "object")
      throw Error(D(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || a != null && a.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var r in a)
        c = a[r], a.hasOwnProperty(r) && u[r] !== c && qh(l, r, c);
    } else
      for (var s in a)
        a.hasOwnProperty(s) && qh(l, s, a[s]);
  }
  function lo(l) {
    if (l.indexOf("-") === -1) return !1;
    switch (l) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Uf = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), Ag = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Hf(l) {
    return Ag.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var ms = null;
  function lc(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var nc = null, no = null;
  function _p(l) {
    var a = jl(l);
    if (a && (l = a.stateNode)) {
      var u = l[Wl] || null;
      e: switch (l = a.stateNode, a.type) {
        case "input":
          if (Hh(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), a = u.name, u.type === "radio" && a != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + ta(
                "" + a
              ) + '"][type="radio"]'
            ), a = 0; a < u.length; a++) {
              var c = u[a];
              if (c !== l && c.form === l.form) {
                var r = c[Wl] || null;
                if (!r) throw Error(D(90));
                Hh(
                  c,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (a = 0; a < u.length; a++)
              c = u[a], c.form === l.form && to(c);
          }
          break e;
        case "textarea":
          Nh(l, u.value, u.defaultValue);
          break e;
        case "select":
          a = u.value, a != null && di(l, !!u.multiple, a, !1);
      }
    }
  }
  var Bh = !1;
  function Cp(l, a, u) {
    if (Bh) return l(a, u);
    Bh = !0;
    try {
      var c = l(a);
      return c;
    } finally {
      if (Bh = !1, (nc !== null || no !== null) && (Rr(), nc && (a = nc, l = no, no = nc = null, _p(a), l)))
        for (a = 0; a < l.length; a++) _p(l[a]);
    }
  }
  function zu(l, a) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[Wl] || null;
    if (c === null) return null;
    u = c[a];
    e: switch (a) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (c = !c.disabled) || (l = l.type, c = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !c;
        break e;
      default:
        l = !1;
    }
    if (l) return null;
    if (u && typeof u != "function")
      throw Error(
        D(231, a, typeof u)
      );
    return u;
  }
  var Sa = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ps = !1;
  if (Sa)
    try {
      var ao = {};
      Object.defineProperty(ao, "passive", {
        get: function() {
          ps = !0;
        }
      }), window.addEventListener("test", ao, ao), window.removeEventListener("test", ao, ao);
    } catch {
      ps = !1;
    }
  var la = null, vs = null, ac = null;
  function xf() {
    if (ac) return ac;
    var l, a = vs, u = a.length, c, r = "value" in la ? la.value : la.textContent, s = r.length;
    for (l = 0; l < u && a[l] === r[l]; l++) ;
    var y = u - l;
    for (c = 1; c <= y && a[u - c] === r[s - c]; c++) ;
    return ac = r.slice(l, 1 < c ? 1 - c : void 0);
  }
  function Nf(l) {
    var a = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && a === 13 && (l = 13)) : l = a, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Ll() {
    return !0;
  }
  function Up() {
    return !1;
  }
  function Fl(l) {
    function a(u, c, r, s, y) {
      this._reactName = u, this._targetInst = r, this.type = c, this.nativeEvent = s, this.target = y, this.currentTarget = null;
      for (var m in l)
        l.hasOwnProperty(m) && (u = l[m], this[m] = u ? u(s) : s[m]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Ll : Up, this.isPropagationStopped = Up, this;
    }
    return P(a.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Ll);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Ll);
      },
      persist: function() {
      },
      isPersistent: Ll
    }), a;
  }
  var hi = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, wf = Fl(hi), qf = P({}, hi, { view: 0, detail: 0 }), Og = Fl(qf), gs, Yh, uo, Ss = P({}, qf, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: bs,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== uo && (uo && l.type === "mousemove" ? (gs = l.screenX - uo.screenX, Yh = l.screenY - uo.screenY) : Yh = gs = 0, uo = l), gs);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Yh;
    }
  }), Bf = Fl(Ss), Hp = P({}, Ss, { dataTransfer: 0 }), xp = Fl(Hp), Np = P({}, qf, { relatedTarget: 0 }), jh = Fl(Np), Dg = P({}, hi, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), Mg = Fl(Dg), zg = P({}, hi, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), _g = Fl(zg), Yf = P({}, hi, { data: 0 }), Lh = Fl(Yf), wp = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, qp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Bp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Gh(l) {
    var a = this.nativeEvent;
    return a.getModifierState ? a.getModifierState(l) : (l = Bp[l]) ? !!a[l] : !1;
  }
  function bs() {
    return Gh;
  }
  var uc = P({}, qf, {
    key: function(l) {
      if (l.key) {
        var a = wp[l.key] || l.key;
        if (a !== "Unidentified") return a;
      }
      return l.type === "keypress" ? (l = Nf(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? qp[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: bs,
    charCode: function(l) {
      return l.type === "keypress" ? Nf(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Nf(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), ic = Fl(uc), ba = P({}, Ss, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), mn = Fl(ba), Ts = P({}, qf, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: bs
  }), Es = Fl(Ts), Vh = P({}, hi, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pn = Fl(Vh), Yp = P({}, Ss, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Rs = Fl(Yp), cc = P({}, hi, {
    newState: 0,
    oldState: 0
  }), Xh = Fl(cc), jp = [9, 13, 27, 32], As = Sa && "CompositionEvent" in window, oc = null;
  Sa && "documentMode" in document && (oc = document.documentMode);
  var Cg = Sa && "TextEvent" in window && !oc, Os = Sa && (!As || oc && 8 < oc && 11 >= oc), Pa = " ", Qh = !1;
  function Ds(l, a) {
    switch (l) {
      case "keyup":
        return jp.indexOf(a.keyCode) !== -1;
      case "keydown":
        return a.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function jf(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var na = !1;
  function Zh(l, a) {
    switch (l) {
      case "compositionend":
        return jf(a);
      case "keypress":
        return a.which !== 32 ? null : (Qh = !0, Pa);
      case "textInput":
        return l = a.data, l === Pa && Qh ? null : l;
      default:
        return null;
    }
  }
  function Kh(l, a) {
    if (na)
      return l === "compositionend" || !As && Ds(l, a) ? (l = xf(), ac = vs = la = null, na = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
          if (a.char && 1 < a.char.length)
            return a.char;
          if (a.which) return String.fromCharCode(a.which);
        }
        return null;
      case "compositionend":
        return Os && a.locale !== "ko" ? null : a.data;
      default:
        return null;
    }
  }
  var fc = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Jh(l) {
    var a = l && l.nodeName && l.nodeName.toLowerCase();
    return a === "input" ? !!fc[l.type] : a === "textarea";
  }
  function Ms(l, a, u, c) {
    nc ? no ? no.push(c) : no = [c] : nc = c, a = Gi(a, "onChange"), 0 < a.length && (u = new wf(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: a }));
  }
  var rc = null, Ta = null;
  function sc(l) {
    Fu(l, 0);
  }
  function io(l) {
    var a = Wc(l);
    if (to(a)) return l;
  }
  function yi(l, a) {
    if (l === "change") return a;
  }
  var kh = !1;
  if (Sa) {
    var zs;
    if (Sa) {
      var dc = "oninput" in document;
      if (!dc) {
        var co = document.createElement("div");
        co.setAttribute("oninput", "return;"), dc = typeof co.oninput == "function";
      }
      zs = dc;
    } else zs = !1;
    kh = zs && (!document.documentMode || 9 < document.documentMode);
  }
  function $h() {
    rc && (rc.detachEvent("onpropertychange", oo), Ta = rc = null);
  }
  function oo(l) {
    if (l.propertyName === "value" && io(Ta)) {
      var a = [];
      Ms(
        a,
        Ta,
        l,
        lc(l)
      ), Cp(sc, a);
    }
  }
  function Lp(l, a, u) {
    l === "focusin" ? ($h(), rc = a, Ta = u, rc.attachEvent("onpropertychange", oo)) : l === "focusout" && $h();
  }
  function _s(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return io(Ta);
  }
  function mi(l, a) {
    if (l === "click") return io(a);
  }
  function _u(l, a) {
    if (l === "input" || l === "change")
      return io(a);
  }
  function Wh(l, a) {
    return l === a && (l !== 0 || 1 / l === 1 / a) || l !== l && a !== a;
  }
  var un = typeof Object.is == "function" ? Object.is : Wh;
  function Cu(l, a) {
    if (un(l, a)) return !0;
    if (typeof l != "object" || l === null || typeof a != "object" || a === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(a);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var r = u[c];
      if (!Ja.call(a, r) || !un(l[r], a[r]))
        return !1;
    }
    return !0;
  }
  function Lf(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function pi(l, a) {
    var u = Lf(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= a && c >= a)
          return { node: u, offset: a - l };
        l = c;
      }
      e: {
        for (; u; ) {
          if (u.nextSibling) {
            u = u.nextSibling;
            break e;
          }
          u = u.parentNode;
        }
        u = void 0;
      }
      u = Lf(u);
    }
  }
  function Xt(l, a) {
    return l && a ? l === a ? !0 : l && l.nodeType === 3 ? !1 : a && a.nodeType === 3 ? Xt(l, a.parentNode) : "contains" in l ? l.contains(a) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(a) & 16) : !1 : !1;
  }
  function Gf(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var a = Mu(l.document); a instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof a.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = a.contentWindow;
      else break;
      a = Mu(l.document);
    }
    return a;
  }
  function Cs(l) {
    var a = l && l.nodeName && l.nodeName.toLowerCase();
    return a && (a === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || a === "textarea" || l.contentEditable === "true");
  }
  var Fh = Sa && "documentMode" in document && 11 >= document.documentMode, aa = null, hc = null, jn = null, fo = !1;
  function ro(l, a, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    fo || aa == null || aa !== Mu(c) || (c = aa, "selectionStart" in c && Cs(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), jn && Cu(jn, c) || (jn = c, c = Gi(hc, "onSelect"), 0 < c.length && (a = new wf(
      "onSelect",
      "select",
      null,
      a,
      u
    ), l.push({ event: a, listeners: c }), a.target = aa)));
  }
  function Uu(l, a) {
    var u = {};
    return u[l.toLowerCase()] = a.toLowerCase(), u["Webkit" + l] = "webkit" + a, u["Moz" + l] = "moz" + a, u;
  }
  var vi = {
    animationend: Uu("Animation", "AnimationEnd"),
    animationiteration: Uu("Animation", "AnimationIteration"),
    animationstart: Uu("Animation", "AnimationStart"),
    transitionrun: Uu("Transition", "TransitionRun"),
    transitionstart: Uu("Transition", "TransitionStart"),
    transitioncancel: Uu("Transition", "TransitionCancel"),
    transitionend: Uu("Transition", "TransitionEnd")
  }, Us = {}, Ea = {};
  Sa && (Ea = document.createElement("div").style, "AnimationEvent" in window || (delete vi.animationend.animation, delete vi.animationiteration.animation, delete vi.animationstart.animation), "TransitionEvent" in window || delete vi.transitionend.transition);
  function Il(l) {
    if (Us[l]) return Us[l];
    if (!vi[l]) return l;
    var a = vi[l], u;
    for (u in a)
      if (a.hasOwnProperty(u) && u in Ea)
        return Us[l] = a[u];
    return l;
  }
  var Vf = Il("animationend"), Gp = Il("animationiteration"), Ih = Il("animationstart"), Ug = Il("transitionrun"), Ph = Il("transitionstart"), Hs = Il("transitioncancel"), ey = Il("transitionend"), ty = /* @__PURE__ */ new Map(), xs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  xs.push("scrollEnd");
  function vn(l, a) {
    ty.set(l, a), zl(a, [l]);
  }
  var ly = /* @__PURE__ */ new WeakMap();
  function Ln(l, a) {
    if (typeof l == "object" && l !== null) {
      var u = ly.get(l);
      return u !== void 0 ? u : (a = {
        value: l,
        source: a,
        stack: si(a)
      }, ly.set(l, a), a);
    }
    return {
      value: l,
      source: a,
      stack: si(a)
    };
  }
  var Gn = [], gi = 0, Xf = 0;
  function Ra() {
    for (var l = gi, a = Xf = gi = 0; a < l; ) {
      var u = Gn[a];
      Gn[a++] = null;
      var c = Gn[a];
      Gn[a++] = null;
      var r = Gn[a];
      Gn[a++] = null;
      var s = Gn[a];
      if (Gn[a++] = null, c !== null && r !== null) {
        var y = c.pending;
        y === null ? r.next = r : (r.next = y.next, y.next = r), c.pending = r;
      }
      s !== 0 && so(u, r, s);
    }
  }
  function Aa(l, a, u, c) {
    Gn[gi++] = l, Gn[gi++] = a, Gn[gi++] = u, Gn[gi++] = c, Xf |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function yc(l, a, u, c) {
    return Aa(l, a, u, c), Si(l);
  }
  function Hu(l, a) {
    return Aa(l, null, null, a), Si(l);
  }
  function so(l, a, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var r = !1, s = l.return; s !== null; )
      s.childLanes |= u, c = s.alternate, c !== null && (c.childLanes |= u), s.tag === 22 && (l = s.stateNode, l === null || l._visibility & 1 || (r = !0)), l = s, s = s.return;
    return l.tag === 3 ? (s = l.stateNode, r && a !== null && (r = 31 - cl(u), l = s.hiddenUpdates, c = l[r], c === null ? l[r] = [a] : c.push(a), a.lane = u | 536870912), s) : null;
  }
  function Si(l) {
    if (50 < Zo)
      throw Zo = 0, bd = null, Error(D(185));
    for (var a = l.return; a !== null; )
      l = a, a = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var mc = {};
  function Hg(l, a, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function gn(l, a, u, c) {
    return new Hg(l, a, u, c);
  }
  function Ns(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function Oa(l, a) {
    var u = l.alternate;
    return u === null ? (u = gn(
      l.tag,
      a,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = a, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, a = l.dependencies, u.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function ws(l, a) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = a, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, a = u.dependencies, l.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }), l;
  }
  function ke(l, a, u, c, r, s) {
    var y = 0;
    if (c = l, typeof l == "function") Ns(l) && (y = 1);
    else if (typeof l == "string")
      y = Av(
        l,
        u,
        re.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case Rt:
          return l = gn(31, u, a, r), l.elementType = Rt, l.lanes = s, l;
        case ee:
          return ne(u.children, r, s, a);
        case fe:
          y = 8, r |= 24;
          break;
        case Be:
          return l = gn(12, u, a, r | 2), l.elementType = Be, l.lanes = s, l;
        case Me:
          return l = gn(13, u, a, r), l.elementType = Me, l.lanes = s, l;
        case yt:
          return l = gn(19, u, a, r), l.elementType = yt, l.lanes = s, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case ye:
              case st:
                y = 10;
                break e;
              case He:
                y = 9;
                break e;
              case ot:
                y = 11;
                break e;
              case tt:
                y = 14;
                break e;
              case Oe:
                y = 16, c = null;
                break e;
            }
          y = 29, u = Error(
            D(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return a = gn(y, u, a, r), a.elementType = l, a.type = c, a.lanes = s, a;
  }
  function ne(l, a, u, c) {
    return l = gn(7, l, c, a), l.lanes = u, l;
  }
  function bi(l, a, u) {
    return l = gn(6, l, null, a), l.lanes = u, l;
  }
  function ho(l, a, u) {
    return a = gn(
      4,
      l.children !== null ? l.children : [],
      l.key,
      a
    ), a.lanes = u, a.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, a;
  }
  var Lt = [], Ti = 0, yo = null, Qf = 0, Sn = [], ua = 0, xu = null, Da = 1, Ma = "";
  function yl(l, a) {
    Lt[Ti++] = Qf, Lt[Ti++] = yo, yo = l, Qf = a;
  }
  function _t(l, a, u) {
    Sn[ua++] = Da, Sn[ua++] = Ma, Sn[ua++] = xu, xu = l;
    var c = Da;
    l = Ma;
    var r = 32 - cl(c) - 1;
    c &= ~(1 << r), u += 1;
    var s = 32 - cl(a) + r;
    if (30 < s) {
      var y = r - r % 5;
      s = (c & (1 << y) - 1).toString(32), c >>= y, r -= y, Da = 1 << 32 - cl(a) + r | u << r | c, Ma = s + l;
    } else
      Da = 1 << s | u << r | c, Ma = l;
  }
  function Zf(l) {
    l.return !== null && (yl(l, 1), _t(l, 1, 0));
  }
  function pc(l) {
    for (; l === yo; )
      yo = Lt[--Ti], Lt[Ti] = null, Qf = Lt[--Ti], Lt[Ti] = null;
    for (; l === xu; )
      xu = Sn[--ua], Sn[ua] = null, Ma = Sn[--ua], Sn[ua] = null, Da = Sn[--ua], Sn[ua] = null;
  }
  var ll = null, Ht = null, $e = !1, Nu = null, cn = !1, Kf = Error(D(519));
  function za(l) {
    var a = Error(D(418, ""));
    throw vo(Ln(a, l)), Kf;
  }
  function qs(l) {
    var a = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (a[jt] = l, a[Wl] = c, u) {
      case "dialog":
        Qe("cancel", a), Qe("close", a);
        break;
      case "iframe":
      case "object":
      case "embed":
        Qe("load", a);
        break;
      case "video":
      case "audio":
        for (u = 0; u < je.length; u++)
          Qe(je[u], a);
        break;
      case "source":
        Qe("error", a);
        break;
      case "img":
      case "image":
      case "link":
        Qe("error", a), Qe("load", a);
        break;
      case "details":
        Qe("toggle", a);
        break;
      case "input":
        Qe("invalid", a), xh(
          a,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), eo(a);
        break;
      case "select":
        Qe("invalid", a);
        break;
      case "textarea":
        Qe("invalid", a), wh(a, c.value, c.defaultValue, c.children), eo(a);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || a.textContent === "" + u || c.suppressHydrationWarning === !0 || Tv(a.textContent, u) ? (c.popover != null && (Qe("beforetoggle", a), Qe("toggle", a)), c.onScroll != null && Qe("scroll", a), c.onScrollEnd != null && Qe("scrollend", a), c.onClick != null && (a.onclick = Ur), a = !0) : a = !1, a || za(l);
  }
  function Jf(l) {
    for (ll = l.return; ll; )
      switch (ll.tag) {
        case 5:
        case 13:
          cn = !1;
          return;
        case 27:
        case 3:
          cn = !0;
          return;
        default:
          ll = ll.return;
      }
  }
  function mo(l) {
    if (l !== ll) return !1;
    if (!$e) return Jf(l), $e = !0, !1;
    var a = l.tag, u;
    if ((u = a !== 3 && a !== 27) && ((u = a === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Nc(l.type, l.memoizedProps)), u = !u), u && Ht && za(l), Jf(l), a === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(D(317));
      e: {
        for (l = l.nextSibling, a = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (a === 0) {
                Ht = Ga(l.nextSibling);
                break e;
              }
              a--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || a++;
          l = l.nextSibling;
        }
        Ht = null;
      }
    } else
      a === 27 ? (a = Ht, Xl(l.type) ? (l = Em, Em = null, Ht = l) : Ht = a) : Ht = ll ? Ga(l.stateNode.nextSibling) : null;
    return !0;
  }
  function po() {
    Ht = ll = null, $e = !1;
  }
  function ny() {
    var l = Nu;
    return l !== null && (fn === null ? fn = l : fn.push.apply(
      fn,
      l
    ), Nu = null), l;
  }
  function vo(l) {
    Nu === null ? Nu = [l] : Nu.push(l);
  }
  var Bs = O(null), wu = null, _a = null;
  function eu(l, a, u) {
    Z(Bs, a._currentValue), a._currentValue = u;
  }
  function tu(l) {
    l._currentValue = Bs.current, k(Bs);
  }
  function Ys(l, a, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & a) !== a ? (l.childLanes |= a, c !== null && (c.childLanes |= a)) : c !== null && (c.childLanes & a) !== a && (c.childLanes |= a), l === u) break;
      l = l.return;
    }
  }
  function js(l, a, u, c) {
    var r = l.child;
    for (r !== null && (r.return = l); r !== null; ) {
      var s = r.dependencies;
      if (s !== null) {
        var y = r.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var m = s;
          s = r;
          for (var b = 0; b < a.length; b++)
            if (m.context === a[b]) {
              s.lanes |= u, m = s.alternate, m !== null && (m.lanes |= u), Ys(
                s.return,
                u,
                l
              ), c || (y = null);
              break e;
            }
          s = m.next;
        }
      } else if (r.tag === 18) {
        if (y = r.return, y === null) throw Error(D(341));
        y.lanes |= u, s = y.alternate, s !== null && (s.lanes |= u), Ys(y, u, l), y = null;
      } else y = r.child;
      if (y !== null) y.return = r;
      else
        for (y = r; y !== null; ) {
          if (y === l) {
            y = null;
            break;
          }
          if (r = y.sibling, r !== null) {
            r.return = y.return, y = r;
            break;
          }
          y = y.return;
        }
      r = y;
    }
  }
  function kf(l, a, u, c) {
    l = null;
    for (var r = a, s = !1; r !== null; ) {
      if (!s) {
        if ((r.flags & 524288) !== 0) s = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var y = r.alternate;
        if (y === null) throw Error(D(387));
        if (y = y.memoizedProps, y !== null) {
          var m = r.type;
          un(r.pendingProps.value, y.value) || (l !== null ? l.push(m) : l = [m]);
        }
      } else if (r === qe.current) {
        if (y = r.alternate, y === null) throw Error(D(387));
        y.memoizedState.memoizedState !== r.memoizedState.memoizedState && (l !== null ? l.push(Zl) : l = [Zl]);
      }
      r = r.return;
    }
    l !== null && js(
      a,
      l,
      u,
      c
    ), a.flags |= 262144;
  }
  function $f(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!un(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function Ei(l) {
    wu = l, _a = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Gl(l) {
    return ay(wu, l);
  }
  function go(l, a) {
    return wu === null && Ei(l), ay(l, a);
  }
  function ay(l, a) {
    var u = a._currentValue;
    if (a = { context: a, memoizedValue: u, next: null }, _a === null) {
      if (l === null) throw Error(D(308));
      _a = a, l.dependencies = { lanes: 0, firstContext: a }, l.flags |= 524288;
    } else _a = _a.next = a;
    return u;
  }
  var Vp = typeof AbortController < "u" ? AbortController : function() {
    var l = [], a = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      a.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, So = S.unstable_scheduleCallback, Ls = S.unstable_NormalPriority, ml = {
    $$typeof: st,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function uy() {
    return {
      controller: new Vp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ri(l) {
    l.refCount--, l.refCount === 0 && So(Ls, function() {
      l.controller.abort();
    });
  }
  var lu = null, bo = 0, Ai = 0, ia = null;
  function bn(l, a) {
    if (lu === null) {
      var u = lu = [];
      bo = 0, Ai = Cd(), ia = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return bo++, a.then(Wf, Wf), a;
  }
  function Wf() {
    if (--bo === 0 && lu !== null) {
      ia !== null && (ia.status = "fulfilled");
      var l = lu;
      lu = null, Ai = 0, ia = null;
      for (var a = 0; a < l.length; a++) (0, l[a])();
    }
  }
  function iy(l, a) {
    var u = [], c = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        u.push(r);
      }
    };
    return l.then(
      function() {
        c.status = "fulfilled", c.value = a;
        for (var r = 0; r < u.length; r++) (0, u[r])(a);
      },
      function(r) {
        for (c.status = "rejected", c.reason = r, r = 0; r < u.length; r++)
          (0, u[r])(void 0);
      }
    ), c;
  }
  var cy = V.S;
  V.S = function(l, a) {
    typeof a == "object" && a !== null && typeof a.then == "function" && bn(l, a), cy !== null && cy(l, a);
  };
  var qu = O(null);
  function To() {
    var l = qu.current;
    return l !== null ? l : Nt.pooledCache;
  }
  function Eo(l, a) {
    a === null ? Z(qu, qu.current) : Z(qu, a.pool);
  }
  function Ff() {
    var l = To();
    return l === null ? null : { parent: ml._currentValue, pool: l };
  }
  var vc = Error(D(460)), If = Error(D(474)), Ro = Error(D(542)), Gs = { then: function() {
  } };
  function oy(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function Ao() {
  }
  function fy(l, a, u) {
    switch (u = l[u], u === void 0 ? l.push(a) : u !== a && (a.then(Ao, Ao), a = u), a.status) {
      case "fulfilled":
        return a.value;
      case "rejected":
        throw l = a.reason, ry(l), l;
      default:
        if (typeof a.status == "string") a.then(Ao, Ao);
        else {
          if (l = Nt, l !== null && 100 < l.shellSuspendCounter)
            throw Error(D(482));
          l = a, l.status = "pending", l.then(
            function(c) {
              if (a.status === "pending") {
                var r = a;
                r.status = "fulfilled", r.value = c;
              }
            },
            function(c) {
              if (a.status === "pending") {
                var r = a;
                r.status = "rejected", r.reason = c;
              }
            }
          );
        }
        switch (a.status) {
          case "fulfilled":
            return a.value;
          case "rejected":
            throw l = a.reason, ry(l), l;
        }
        throw Oo = a, vc;
    }
  }
  var Oo = null;
  function Vs() {
    if (Oo === null) throw Error(D(459));
    var l = Oo;
    return Oo = null, l;
  }
  function ry(l) {
    if (l === vc || l === Ro)
      throw Error(D(483));
  }
  var Bu = !1;
  function Pf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function Xs(l, a) {
    l = l.updateQueue, a.updateQueue === l && (a.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function Yu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function Tn(l, a, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (Ct & 2) !== 0) {
      var r = c.pending;
      return r === null ? a.next = a : (a.next = r.next, r.next = a), c.pending = a, a = Si(l), so(l, null, u), a;
    }
    return Aa(l, c, a, u), Si(l);
  }
  function gc(l, a, u) {
    if (a = a.updateQueue, a !== null && (a = a.shared, (u & 4194048) !== 0)) {
      var c = a.lanes;
      c &= l.pendingLanes, u |= c, a.lanes = u, dt(l, u);
    }
  }
  function er(l, a) {
    var u = l.updateQueue, c = l.alternate;
    if (c !== null && (c = c.updateQueue, u === c)) {
      var r = null, s = null;
      if (u = u.firstBaseUpdate, u !== null) {
        do {
          var y = {
            lane: u.lane,
            tag: u.tag,
            payload: u.payload,
            callback: null,
            next: null
          };
          s === null ? r = s = y : s = s.next = y, u = u.next;
        } while (u !== null);
        s === null ? r = s = a : s = s.next = a;
      } else r = s = a;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: s,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = a : l.next = a, u.lastBaseUpdate = a;
  }
  var sy = !1;
  function tr() {
    if (sy) {
      var l = ia;
      if (l !== null) throw l;
    }
  }
  function Do(l, a, u, c) {
    sy = !1;
    var r = l.updateQueue;
    Bu = !1;
    var s = r.firstBaseUpdate, y = r.lastBaseUpdate, m = r.shared.pending;
    if (m !== null) {
      r.shared.pending = null;
      var b = m, x = b.next;
      b.next = null, y === null ? s = x : y.next = x, y = b;
      var $ = l.alternate;
      $ !== null && ($ = $.updateQueue, m = $.lastBaseUpdate, m !== y && (m === null ? $.firstBaseUpdate = x : m.next = x, $.lastBaseUpdate = b));
    }
    if (s !== null) {
      var I = r.baseState;
      y = 0, $ = x = b = null, m = s;
      do {
        var w = m.lane & -536870913, G = w !== m.lane;
        if (G ? (pt & w) === w : (c & w) === w) {
          w !== 0 && w === Ai && (sy = !0), $ !== null && ($ = $.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var Ue = l, _e = m;
            w = a;
            var Mt = u;
            switch (_e.tag) {
              case 1:
                if (Ue = _e.payload, typeof Ue == "function") {
                  I = Ue.call(Mt, I, w);
                  break e;
                }
                I = Ue;
                break e;
              case 3:
                Ue.flags = Ue.flags & -65537 | 128;
              case 0:
                if (Ue = _e.payload, w = typeof Ue == "function" ? Ue.call(Mt, I, w) : Ue, w == null) break e;
                I = P({}, I, w);
                break e;
              case 2:
                Bu = !0;
            }
          }
          w = m.callback, w !== null && (l.flags |= 64, G && (l.flags |= 8192), G = r.callbacks, G === null ? r.callbacks = [w] : G.push(w));
        } else
          G = {
            lane: w,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, $ === null ? (x = $ = G, b = I) : $ = $.next = G, y |= w;
        if (m = m.next, m === null) {
          if (m = r.shared.pending, m === null)
            break;
          G = m, m = G.next, G.next = null, r.lastBaseUpdate = G, r.shared.pending = null;
        }
      } while (!0);
      $ === null && (b = I), r.baseState = b, r.firstBaseUpdate = x, r.lastBaseUpdate = $, s === null && (r.shared.lanes = 0), Ni |= y, l.lanes = y, l.memoizedState = I;
    }
  }
  function Mo(l, a) {
    if (typeof l != "function")
      throw Error(D(191, l));
    l.call(a);
  }
  function Qs(l, a) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        Mo(u[l], a);
  }
  var ju = O(null), lr = O(0);
  function dy(l, a) {
    l = ku, Z(lr, l), Z(ju, a), ku = l | a.baseLanes;
  }
  function Tl() {
    Z(lr, ku), Z(ju, ju.current);
  }
  function zo() {
    ku = lr.current, k(ju), k(lr);
  }
  var Ca = 0, Ve = null, Ot = null, Pt = null, Sc = !1, bc = !1, En = !1, nr = 0, ca = 0, Rn = null, Zs = 0;
  function el() {
    throw Error(D(321));
  }
  function ar(l, a) {
    if (a === null) return !1;
    for (var u = 0; u < a.length && u < l.length; u++)
      if (!un(l[u], a[u])) return !1;
    return !0;
  }
  function Ks(l, a, u, c, r, s) {
    return Ca = s, Ve = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, V.H = l === null || l.memoizedState === null ? Wp : Uy, En = !1, s = u(c, r), En = !1, bc && (s = Oi(
      a,
      u,
      c,
      r
    )), hy(l), s;
  }
  function hy(l) {
    V.H = yr;
    var a = Ot !== null && Ot.next !== null;
    if (Ca = 0, Pt = Ot = Ve = null, Sc = !1, ca = 0, Rn = null, a) throw Error(D(300));
    l === null || nt || (l = l.dependencies, l !== null && $f(l) && (nt = !0));
  }
  function Oi(l, a, u, c) {
    Ve = l;
    var r = 0;
    do {
      if (bc && (Rn = null), ca = 0, bc = !1, 25 <= r) throw Error(D(301));
      if (r += 1, Pt = Ot = null, l.updateQueue != null) {
        var s = l.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      V.H = Fp, s = a(u, c);
    } while (bc);
    return s;
  }
  function Xp() {
    var l = V.H, a = l.useState()[0];
    return a = typeof a.then == "function" ? Tc(a) : a, l = l.useState()[0], (Ot !== null ? Ot.memoizedState : null) !== l && (Ve.flags |= 1024), a;
  }
  function Js() {
    var l = nr !== 0;
    return nr = 0, l;
  }
  function ks(l, a, u) {
    a.updateQueue = l.updateQueue, a.flags &= -2053, l.lanes &= ~u;
  }
  function _o(l) {
    if (Sc) {
      for (l = l.memoizedState; l !== null; ) {
        var a = l.queue;
        a !== null && (a.pending = null), l = l.next;
      }
      Sc = !1;
    }
    Ca = 0, Pt = Ot = Ve = null, bc = !1, ca = nr = 0, Rn = null;
  }
  function on() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Pt === null ? Ve.memoizedState = Pt = l : Pt = Pt.next = l, Pt;
  }
  function nl() {
    if (Ot === null) {
      var l = Ve.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = Ot.next;
    var a = Pt === null ? Ve.memoizedState : Pt.next;
    if (a !== null)
      Pt = a, Ot = l;
    else {
      if (l === null)
        throw Ve.alternate === null ? Error(D(467)) : Error(D(310));
      Ot = l, l = {
        memoizedState: Ot.memoizedState,
        baseState: Ot.baseState,
        baseQueue: Ot.baseQueue,
        queue: Ot.queue,
        next: null
      }, Pt === null ? Ve.memoizedState = Pt = l : Pt = Pt.next = l;
    }
    return Pt;
  }
  function ur() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function Tc(l) {
    var a = ca;
    return ca += 1, Rn === null && (Rn = []), l = fy(Rn, l, a), a = Ve, (Pt === null ? a.memoizedState : Pt.next) === null && (a = a.alternate, V.H = a === null || a.memoizedState === null ? Wp : Uy), l;
  }
  function $s(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return Tc(l);
      if (l.$$typeof === st) return Gl(l);
    }
    throw Error(D(438, String(l)));
  }
  function El(l) {
    var a = null, u = Ve.updateQueue;
    if (u !== null && (a = u.memoCache), a == null) {
      var c = Ve.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (a = {
        data: c.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (a == null && (a = { data: [], index: 0 }), u === null && (u = ur(), Ve.updateQueue = u), u.memoCache = a, u = a.data[a.index], u === void 0)
      for (u = a.data[a.index] = Array(l), c = 0; c < l; c++)
        u[c] = pe;
    return a.index++, u;
  }
  function nu(l, a) {
    return typeof a == "function" ? a(l) : a;
  }
  function ir(l) {
    var a = nl();
    return Ws(a, Ot, l);
  }
  function Ws(l, a, u) {
    var c = l.queue;
    if (c === null) throw Error(D(311));
    c.lastRenderedReducer = u;
    var r = l.baseQueue, s = c.pending;
    if (s !== null) {
      if (r !== null) {
        var y = r.next;
        r.next = s.next, s.next = y;
      }
      a.baseQueue = r = s, c.pending = null;
    }
    if (s = l.baseState, r === null) l.memoizedState = s;
    else {
      a = r.next;
      var m = y = null, b = null, x = a, $ = !1;
      do {
        var I = x.lane & -536870913;
        if (I !== x.lane ? (pt & I) === I : (Ca & I) === I) {
          var w = x.revertLane;
          if (w === 0)
            b !== null && (b = b.next = {
              lane: 0,
              revertLane: 0,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }), I === Ai && ($ = !0);
          else if ((Ca & w) === w) {
            x = x.next, w === Ai && ($ = !0);
            continue;
          } else
            I = {
              lane: 0,
              revertLane: x.revertLane,
              action: x.action,
              hasEagerState: x.hasEagerState,
              eagerState: x.eagerState,
              next: null
            }, b === null ? (m = b = I, y = s) : b = b.next = I, Ve.lanes |= w, Ni |= w;
          I = x.action, En && u(s, I), s = x.hasEagerState ? x.eagerState : u(s, I);
        } else
          w = {
            lane: I,
            revertLane: x.revertLane,
            action: x.action,
            hasEagerState: x.hasEagerState,
            eagerState: x.eagerState,
            next: null
          }, b === null ? (m = b = w, y = s) : b = b.next = w, Ve.lanes |= I, Ni |= I;
        x = x.next;
      } while (x !== null && x !== a);
      if (b === null ? y = s : b.next = m, !un(s, l.memoizedState) && (nt = !0, $ && (u = ia, u !== null)))
        throw u;
      l.memoizedState = s, l.baseState = y, l.baseQueue = b, c.lastRenderedState = s;
    }
    return r === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Fs(l) {
    var a = nl(), u = a.queue;
    if (u === null) throw Error(D(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, r = u.pending, s = a.memoizedState;
    if (r !== null) {
      u.pending = null;
      var y = r = r.next;
      do
        s = l(s, y.action), y = y.next;
      while (y !== r);
      un(s, a.memoizedState) || (nt = !0), a.memoizedState = s, a.baseQueue === null && (a.baseState = s), u.lastRenderedState = s;
    }
    return [s, c];
  }
  function yy(l, a, u) {
    var c = Ve, r = nl(), s = $e;
    if (s) {
      if (u === void 0) throw Error(D(407));
      u = u();
    } else u = a();
    var y = !un(
      (Ot || r).memoizedState,
      u
    );
    y && (r.memoizedState = u, nt = !0), r = r.queue;
    var m = my.bind(null, c, r, l);
    if (Lu(2048, 8, m, [l]), r.getSnapshot !== a || y || Pt !== null && Pt.memoizedState.tag & 1) {
      if (c.flags |= 2048, Di(
        9,
        oa(),
        Is.bind(
          null,
          c,
          r,
          u,
          a
        ),
        null
      ), Nt === null) throw Error(D(349));
      s || (Ca & 124) !== 0 || cr(c, a, u);
    }
    return u;
  }
  function cr(l, a, u) {
    l.flags |= 16384, l = { getSnapshot: a, value: u }, a = Ve.updateQueue, a === null ? (a = ur(), Ve.updateQueue = a, a.stores = [l]) : (u = a.stores, u === null ? a.stores = [l] : u.push(l));
  }
  function Is(l, a, u, c) {
    a.value = u, a.getSnapshot = c, py(a) && vy(l);
  }
  function my(l, a, u) {
    return u(function() {
      py(a) && vy(l);
    });
  }
  function py(l) {
    var a = l.getSnapshot;
    l = l.value;
    try {
      var u = a();
      return !un(l, u);
    } catch {
      return !0;
    }
  }
  function vy(l) {
    var a = Hu(l, 2);
    a !== null && Un(a, l, 2);
  }
  function or(l) {
    var a = on();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), En) {
        hn(!0);
        try {
          u();
        } finally {
          hn(!1);
        }
      }
    }
    return a.memoizedState = a.baseState = l, a.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: nu,
      lastRenderedState: l
    }, a;
  }
  function Ps(l, a, u, c) {
    return l.baseState = u, Ws(
      l,
      Ot,
      typeof c == "function" ? c : nu
    );
  }
  function gy(l, a, u, c, r) {
    if (Ho(l)) throw Error(D(485));
    if (l = a.action, l !== null) {
      var s = {
        payload: r,
        action: l,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(y) {
          s.listeners.push(y);
        }
      };
      V.T !== null ? u(!0) : s.isTransition = !1, c(s), u = a.pending, u === null ? (s.next = a.pending = s, Sy(a, s)) : (s.next = u.next, a.pending = u.next = s);
    }
  }
  function Sy(l, a) {
    var u = a.action, c = a.payload, r = l.state;
    if (a.isTransition) {
      var s = V.T, y = {};
      V.T = y;
      try {
        var m = u(r, c), b = V.S;
        b !== null && b(y, m), ed(l, a, m);
      } catch (x) {
        rr(l, a, x);
      } finally {
        V.T = s;
      }
    } else
      try {
        s = u(r, c), ed(l, a, s);
      } catch (x) {
        rr(l, a, x);
      }
  }
  function ed(l, a, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        fr(l, a, c);
      },
      function(c) {
        return rr(l, a, c);
      }
    ) : fr(l, a, u);
  }
  function fr(l, a, u) {
    a.status = "fulfilled", a.value = u, by(a), l.state = u, a = l.pending, a !== null && (u = a.next, u === a ? l.pending = null : (u = u.next, a.next = u, Sy(l, u)));
  }
  function rr(l, a, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        a.status = "rejected", a.reason = u, by(a), a = a.next;
      while (a !== c);
    }
    l.action = null;
  }
  function by(l) {
    l = l.listeners;
    for (var a = 0; a < l.length; a++) (0, l[a])();
  }
  function Ty(l, a) {
    return a;
  }
  function td(l, a) {
    if ($e) {
      var u = Nt.formState;
      if (u !== null) {
        e: {
          var c = Ve;
          if ($e) {
            if (Ht) {
              t: {
                for (var r = Ht, s = cn; r.nodeType !== 8; ) {
                  if (!s) {
                    r = null;
                    break t;
                  }
                  if (r = Ga(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break t;
                  }
                }
                s = r.data, r = s === "F!" || s === "F" ? r : null;
              }
              if (r) {
                Ht = Ga(
                  r.nextSibling
                ), c = r.data === "F!";
                break e;
              }
            }
            za(c);
          }
          c = !1;
        }
        c && (a = u[0]);
      }
    }
    return u = on(), u.memoizedState = u.baseState = a, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Ty,
      lastRenderedState: a
    }, u.queue = c, u = ad.bind(
      null,
      Ve,
      c
    ), c.dispatch = u, c = or(!1), s = dr.bind(
      null,
      Ve,
      !1,
      c.queue
    ), c = on(), r = {
      state: a,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = r, u = gy.bind(
      null,
      Ve,
      r,
      s,
      u
    ), r.dispatch = u, c.memoizedState = l, [a, u, !1];
  }
  function Ey(l) {
    var a = nl();
    return au(a, Ot, l);
  }
  function au(l, a, u) {
    if (a = Ws(
      l,
      a,
      Ty
    )[0], l = ir(nu)[0], typeof a == "object" && a !== null && typeof a.then == "function")
      try {
        var c = Tc(a);
      } catch (y) {
        throw y === vc ? Ro : y;
      }
    else c = a;
    a = nl();
    var r = a.queue, s = r.dispatch;
    return u !== a.memoizedState && (Ve.flags |= 2048, Di(
      9,
      oa(),
      Ry.bind(null, r, u),
      null
    )), [c, s, l];
  }
  function Ry(l, a) {
    l.action = a;
  }
  function Qp(l) {
    var a = nl(), u = Ot;
    if (u !== null)
      return au(a, u, l);
    nl(), a = a.memoizedState, u = nl();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [a, c, !1];
  }
  function Di(l, a, u, c) {
    return l = { tag: l, create: u, deps: c, inst: a, next: null }, a = Ve.updateQueue, a === null && (a = ur(), Ve.updateQueue = a), u = a.lastEffect, u === null ? a.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, a.lastEffect = l), l;
  }
  function oa() {
    return { destroy: void 0, resource: void 0 };
  }
  function Ay() {
    return nl().memoizedState;
  }
  function Ec(l, a, u, c) {
    var r = on();
    c = c === void 0 ? null : c, Ve.flags |= l, r.memoizedState = Di(
      1 | a,
      oa(),
      u,
      c
    );
  }
  function Lu(l, a, u, c) {
    var r = nl();
    c = c === void 0 ? null : c;
    var s = r.memoizedState.inst;
    Ot !== null && c !== null && ar(c, Ot.memoizedState.deps) ? r.memoizedState = Di(a, s, u, c) : (Ve.flags |= l, r.memoizedState = Di(
      1 | a,
      s,
      u,
      c
    ));
  }
  function Qt(l, a) {
    Ec(8390656, 8, l, a);
  }
  function Zp(l, a) {
    Lu(2048, 8, l, a);
  }
  function Kp(l, a) {
    return Lu(4, 2, l, a);
  }
  function Oy(l, a) {
    return Lu(4, 4, l, a);
  }
  function Ua(l, a) {
    if (typeof a == "function") {
      l = l();
      var u = a(l);
      return function() {
        typeof u == "function" ? u() : a(null);
      };
    }
    if (a != null)
      return l = l(), a.current = l, function() {
        a.current = null;
      };
  }
  function Dy(l, a, u) {
    u = u != null ? u.concat([l]) : null, Lu(4, 4, Ua.bind(null, a, l), u);
  }
  function sr() {
  }
  function Co(l, a) {
    var u = nl();
    a = a === void 0 ? null : a;
    var c = u.memoizedState;
    return a !== null && ar(a, c[1]) ? c[0] : (u.memoizedState = [l, a], l);
  }
  function Rc(l, a) {
    var u = nl();
    a = a === void 0 ? null : a;
    var c = u.memoizedState;
    if (a !== null && ar(a, c[1]))
      return c[0];
    if (c = l(), En) {
      hn(!0);
      try {
        l();
      } finally {
        hn(!1);
      }
    }
    return u.memoizedState = [c, a], c;
  }
  function ld(l, a, u) {
    return u === void 0 || (Ca & 1073741824) !== 0 ? l.memoizedState = a : (l.memoizedState = u, l = fv(), Ve.lanes |= l, Ni |= l, u);
  }
  function nd(l, a, u, c) {
    return un(u, a) ? u : ju.current !== null ? (l = ld(l, u, c), un(l, a) || (nt = !0), l) : (Ca & 42) === 0 ? (nt = !0, l.memoizedState = u) : (l = fv(), Ve.lanes |= l, Ni |= l, a);
  }
  function My(l, a, u, c, r) {
    var s = j.p;
    j.p = s !== 0 && 8 > s ? s : 8;
    var y = V.T, m = {};
    V.T = m, dr(l, !1, a, u);
    try {
      var b = r(), x = V.S;
      if (x !== null && x(m, b), b !== null && typeof b == "object" && typeof b.then == "function") {
        var $ = iy(
          b,
          c
        );
        Uo(
          l,
          a,
          $,
          Kn(l)
        );
      } else
        Uo(
          l,
          a,
          c,
          Kn(l)
        );
    } catch (I) {
      Uo(
        l,
        a,
        { then: function() {
        }, status: "rejected", reason: I },
        Kn()
      );
    } finally {
      j.p = s, V.T = y;
    }
  }
  function xg() {
  }
  function zy(l, a, u, c) {
    if (l.tag !== 5) throw Error(D(476));
    var r = _y(l).queue;
    My(
      l,
      r,
      a,
      le,
      u === null ? xg : function() {
        return Jp(l), u(c);
      }
    );
  }
  function _y(l) {
    var a = l.memoizedState;
    if (a !== null) return a;
    a = {
      memoizedState: le,
      baseState: le,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nu,
        lastRenderedState: le
      },
      next: null
    };
    var u = {};
    return a.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: nu,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = a, l = l.alternate, l !== null && (l.memoizedState = a), a;
  }
  function Jp(l) {
    var a = _y(l).next.queue;
    Uo(l, a, {}, Kn());
  }
  function Ac() {
    return Gl(Zl);
  }
  function Ha() {
    return nl().memoizedState;
  }
  function Cy() {
    return nl().memoizedState;
  }
  function Ng(l) {
    for (var a = l.return; a !== null; ) {
      switch (a.tag) {
        case 24:
        case 3:
          var u = Kn();
          l = Yu(u);
          var c = Tn(a, l, u);
          c !== null && (Un(c, a, u), gc(c, a, u)), a = { cache: uy() }, l.payload = a;
          return;
      }
      a = a.return;
    }
  }
  function kp(l, a, u) {
    var c = Kn();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ho(l) ? hr(a, u) : (u = yc(l, a, u, c), u !== null && (Un(u, l, c), $p(u, a, c)));
  }
  function ad(l, a, u) {
    var c = Kn();
    Uo(l, a, u, c);
  }
  function Uo(l, a, u, c) {
    var r = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ho(l)) hr(a, r);
    else {
      var s = l.alternate;
      if (l.lanes === 0 && (s === null || s.lanes === 0) && (s = a.lastRenderedReducer, s !== null))
        try {
          var y = a.lastRenderedState, m = s(y, u);
          if (r.hasEagerState = !0, r.eagerState = m, un(m, y))
            return Aa(l, a, r, 0), Nt === null && Ra(), !1;
        } catch {
        } finally {
        }
      if (u = yc(l, a, r, c), u !== null)
        return Un(u, l, c), $p(u, a, c), !0;
    }
    return !1;
  }
  function dr(l, a, u, c) {
    if (c = {
      lane: 2,
      revertLane: Cd(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ho(l)) {
      if (a) throw Error(D(479));
    } else
      a = yc(
        l,
        u,
        c,
        2
      ), a !== null && Un(a, l, 2);
  }
  function Ho(l) {
    var a = l.alternate;
    return l === Ve || a !== null && a === Ve;
  }
  function hr(l, a) {
    bc = Sc = !0;
    var u = l.pending;
    u === null ? a.next = a : (a.next = u.next, u.next = a), l.pending = a;
  }
  function $p(l, a, u) {
    if ((u & 4194048) !== 0) {
      var c = a.lanes;
      c &= l.pendingLanes, u |= c, a.lanes = u, dt(l, u);
    }
  }
  var yr = {
    readContext: Gl,
    use: $s,
    useCallback: el,
    useContext: el,
    useEffect: el,
    useImperativeHandle: el,
    useLayoutEffect: el,
    useInsertionEffect: el,
    useMemo: el,
    useReducer: el,
    useRef: el,
    useState: el,
    useDebugValue: el,
    useDeferredValue: el,
    useTransition: el,
    useSyncExternalStore: el,
    useId: el,
    useHostTransitionStatus: el,
    useFormState: el,
    useActionState: el,
    useOptimistic: el,
    useMemoCache: el,
    useCacheRefresh: el
  }, Wp = {
    readContext: Gl,
    use: $s,
    useCallback: function(l, a) {
      return on().memoizedState = [
        l,
        a === void 0 ? null : a
      ], l;
    },
    useContext: Gl,
    useEffect: Qt,
    useImperativeHandle: function(l, a, u) {
      u = u != null ? u.concat([l]) : null, Ec(
        4194308,
        4,
        Ua.bind(null, a, l),
        u
      );
    },
    useLayoutEffect: function(l, a) {
      return Ec(4194308, 4, l, a);
    },
    useInsertionEffect: function(l, a) {
      Ec(4, 2, l, a);
    },
    useMemo: function(l, a) {
      var u = on();
      a = a === void 0 ? null : a;
      var c = l();
      if (En) {
        hn(!0);
        try {
          l();
        } finally {
          hn(!1);
        }
      }
      return u.memoizedState = [c, a], c;
    },
    useReducer: function(l, a, u) {
      var c = on();
      if (u !== void 0) {
        var r = u(a);
        if (En) {
          hn(!0);
          try {
            u(a);
          } finally {
            hn(!1);
          }
        }
      } else r = a;
      return c.memoizedState = c.baseState = r, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: r
      }, c.queue = l, l = l.dispatch = kp.bind(
        null,
        Ve,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var a = on();
      return l = { current: l }, a.memoizedState = l;
    },
    useState: function(l) {
      l = or(l);
      var a = l.queue, u = ad.bind(null, Ve, a);
      return a.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: sr,
    useDeferredValue: function(l, a) {
      var u = on();
      return ld(u, l, a);
    },
    useTransition: function() {
      var l = or(!1);
      return l = My.bind(
        null,
        Ve,
        l.queue,
        !0,
        !1
      ), on().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, a, u) {
      var c = Ve, r = on();
      if ($e) {
        if (u === void 0)
          throw Error(D(407));
        u = u();
      } else {
        if (u = a(), Nt === null)
          throw Error(D(349));
        (pt & 124) !== 0 || cr(c, a, u);
      }
      r.memoizedState = u;
      var s = { value: u, getSnapshot: a };
      return r.queue = s, Qt(my.bind(null, c, s, l), [
        l
      ]), c.flags |= 2048, Di(
        9,
        oa(),
        Is.bind(
          null,
          c,
          s,
          u,
          a
        ),
        null
      ), u;
    },
    useId: function() {
      var l = on(), a = Nt.identifierPrefix;
      if ($e) {
        var u = Ma, c = Da;
        u = (c & ~(1 << 32 - cl(c) - 1)).toString(32) + u, a = "«" + a + "R" + u, u = nr++, 0 < u && (a += "H" + u.toString(32)), a += "»";
      } else
        u = Zs++, a = "«" + a + "r" + u.toString(32) + "»";
      return l.memoizedState = a;
    },
    useHostTransitionStatus: Ac,
    useFormState: td,
    useActionState: td,
    useOptimistic: function(l) {
      var a = on();
      a.memoizedState = a.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return a.queue = u, a = dr.bind(
        null,
        Ve,
        !0,
        u
      ), u.dispatch = a, [l, a];
    },
    useMemoCache: El,
    useCacheRefresh: function() {
      return on().memoizedState = Ng.bind(
        null,
        Ve
      );
    }
  }, Uy = {
    readContext: Gl,
    use: $s,
    useCallback: Co,
    useContext: Gl,
    useEffect: Zp,
    useImperativeHandle: Dy,
    useInsertionEffect: Kp,
    useLayoutEffect: Oy,
    useMemo: Rc,
    useReducer: ir,
    useRef: Ay,
    useState: function() {
      return ir(nu);
    },
    useDebugValue: sr,
    useDeferredValue: function(l, a) {
      var u = nl();
      return nd(
        u,
        Ot.memoizedState,
        l,
        a
      );
    },
    useTransition: function() {
      var l = ir(nu)[0], a = nl().memoizedState;
      return [
        typeof l == "boolean" ? l : Tc(l),
        a
      ];
    },
    useSyncExternalStore: yy,
    useId: Ha,
    useHostTransitionStatus: Ac,
    useFormState: Ey,
    useActionState: Ey,
    useOptimistic: function(l, a) {
      var u = nl();
      return Ps(u, Ot, l, a);
    },
    useMemoCache: El,
    useCacheRefresh: Cy
  }, Fp = {
    readContext: Gl,
    use: $s,
    useCallback: Co,
    useContext: Gl,
    useEffect: Zp,
    useImperativeHandle: Dy,
    useInsertionEffect: Kp,
    useLayoutEffect: Oy,
    useMemo: Rc,
    useReducer: Fs,
    useRef: Ay,
    useState: function() {
      return Fs(nu);
    },
    useDebugValue: sr,
    useDeferredValue: function(l, a) {
      var u = nl();
      return Ot === null ? ld(u, l, a) : nd(
        u,
        Ot.memoizedState,
        l,
        a
      );
    },
    useTransition: function() {
      var l = Fs(nu)[0], a = nl().memoizedState;
      return [
        typeof l == "boolean" ? l : Tc(l),
        a
      ];
    },
    useSyncExternalStore: yy,
    useId: Ha,
    useHostTransitionStatus: Ac,
    useFormState: Qp,
    useActionState: Qp,
    useOptimistic: function(l, a) {
      var u = nl();
      return Ot !== null ? Ps(u, Ot, l, a) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: El,
    useCacheRefresh: Cy
  }, An = null, xo = 0;
  function mr(l) {
    var a = xo;
    return xo += 1, An === null && (An = []), fy(An, l, a);
  }
  function pr(l, a) {
    a = a.props.ref, l.ref = a !== void 0 ? a : null;
  }
  function No(l, a) {
    throw a.$$typeof === ue ? Error(D(525)) : (l = Object.prototype.toString.call(a), Error(
      D(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : l
      )
    ));
  }
  function On(l) {
    var a = l._init;
    return a(l._payload);
  }
  function Hy(l) {
    function a(U, z) {
      if (l) {
        var N = U.deletions;
        N === null ? (U.deletions = [z], U.flags |= 16) : N.push(z);
      }
    }
    function u(U, z) {
      if (!l) return null;
      for (; z !== null; )
        a(U, z), z = z.sibling;
      return null;
    }
    function c(U) {
      for (var z = /* @__PURE__ */ new Map(); U !== null; )
        U.key !== null ? z.set(U.key, U) : z.set(U.index, U), U = U.sibling;
      return z;
    }
    function r(U, z) {
      return U = Oa(U, z), U.index = 0, U.sibling = null, U;
    }
    function s(U, z, N) {
      return U.index = N, l ? (N = U.alternate, N !== null ? (N = N.index, N < z ? (U.flags |= 67108866, z) : N) : (U.flags |= 67108866, z)) : (U.flags |= 1048576, z);
    }
    function y(U) {
      return l && U.alternate === null && (U.flags |= 67108866), U;
    }
    function m(U, z, N, F) {
      return z === null || z.tag !== 6 ? (z = bi(N, U.mode, F), z.return = U, z) : (z = r(z, N), z.return = U, z);
    }
    function b(U, z, N, F) {
      var ge = N.type;
      return ge === ee ? $(
        U,
        z,
        N.props.children,
        F,
        N.key
      ) : z !== null && (z.elementType === ge || typeof ge == "object" && ge !== null && ge.$$typeof === Oe && On(ge) === z.type) ? (z = r(z, N.props), pr(z, N), z.return = U, z) : (z = ke(
        N.type,
        N.key,
        N.props,
        null,
        U.mode,
        F
      ), pr(z, N), z.return = U, z);
    }
    function x(U, z, N, F) {
      return z === null || z.tag !== 4 || z.stateNode.containerInfo !== N.containerInfo || z.stateNode.implementation !== N.implementation ? (z = ho(N, U.mode, F), z.return = U, z) : (z = r(z, N.children || []), z.return = U, z);
    }
    function $(U, z, N, F, ge) {
      return z === null || z.tag !== 7 ? (z = ne(
        N,
        U.mode,
        F,
        ge
      ), z.return = U, z) : (z = r(z, N), z.return = U, z);
    }
    function I(U, z, N) {
      if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
        return z = bi(
          "" + z,
          U.mode,
          N
        ), z.return = U, z;
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case q:
            return N = ke(
              z.type,
              z.key,
              z.props,
              null,
              U.mode,
              N
            ), pr(N, z), N.return = U, N;
          case _:
            return z = ho(
              z,
              U.mode,
              N
            ), z.return = U, z;
          case Oe:
            var F = z._init;
            return z = F(z._payload), I(U, z, N);
        }
        if (lt(z) || Se(z))
          return z = ne(
            z,
            U.mode,
            N,
            null
          ), z.return = U, z;
        if (typeof z.then == "function")
          return I(U, mr(z), N);
        if (z.$$typeof === st)
          return I(
            U,
            go(U, z),
            N
          );
        No(U, z);
      }
      return null;
    }
    function w(U, z, N, F) {
      var ge = z !== null ? z.key : null;
      if (typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint")
        return ge !== null ? null : m(U, z, "" + N, F);
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case q:
            return N.key === ge ? b(U, z, N, F) : null;
          case _:
            return N.key === ge ? x(U, z, N, F) : null;
          case Oe:
            return ge = N._init, N = ge(N._payload), w(U, z, N, F);
        }
        if (lt(N) || Se(N))
          return ge !== null ? null : $(U, z, N, F, null);
        if (typeof N.then == "function")
          return w(
            U,
            z,
            mr(N),
            F
          );
        if (N.$$typeof === st)
          return w(
            U,
            z,
            go(U, N),
            F
          );
        No(U, N);
      }
      return null;
    }
    function G(U, z, N, F, ge) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return U = U.get(N) || null, m(z, U, "" + F, ge);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case q:
            return U = U.get(
              F.key === null ? N : F.key
            ) || null, b(z, U, F, ge);
          case _:
            return U = U.get(
              F.key === null ? N : F.key
            ) || null, x(z, U, F, ge);
          case Oe:
            var We = F._init;
            return F = We(F._payload), G(
              U,
              z,
              N,
              F,
              ge
            );
        }
        if (lt(F) || Se(F))
          return U = U.get(N) || null, $(z, U, F, ge, null);
        if (typeof F.then == "function")
          return G(
            U,
            z,
            N,
            mr(F),
            ge
          );
        if (F.$$typeof === st)
          return G(
            U,
            z,
            N,
            go(z, F),
            ge
          );
        No(z, F);
      }
      return null;
    }
    function Ue(U, z, N, F) {
      for (var ge = null, We = null, ze = z, xe = z = 0, Nl = null; ze !== null && xe < N.length; xe++) {
        ze.index > xe ? (Nl = ze, ze = null) : Nl = ze.sibling;
        var Tt = w(
          U,
          ze,
          N[xe],
          F
        );
        if (Tt === null) {
          ze === null && (ze = Nl);
          break;
        }
        l && ze && Tt.alternate === null && a(U, ze), z = s(Tt, z, xe), We === null ? ge = Tt : We.sibling = Tt, We = Tt, ze = Nl;
      }
      if (xe === N.length)
        return u(U, ze), $e && yl(U, xe), ge;
      if (ze === null) {
        for (; xe < N.length; xe++)
          ze = I(U, N[xe], F), ze !== null && (z = s(
            ze,
            z,
            xe
          ), We === null ? ge = ze : We.sibling = ze, We = ze);
        return $e && yl(U, xe), ge;
      }
      for (ze = c(ze); xe < N.length; xe++)
        Nl = G(
          ze,
          U,
          xe,
          N[xe],
          F
        ), Nl !== null && (l && Nl.alternate !== null && ze.delete(
          Nl.key === null ? xe : Nl.key
        ), z = s(
          Nl,
          z,
          xe
        ), We === null ? ge = Nl : We.sibling = Nl, We = Nl);
      return l && ze.forEach(function(hu) {
        return a(U, hu);
      }), $e && yl(U, xe), ge;
    }
    function _e(U, z, N, F) {
      if (N == null) throw Error(D(151));
      for (var ge = null, We = null, ze = z, xe = z = 0, Nl = null, Tt = N.next(); ze !== null && !Tt.done; xe++, Tt = N.next()) {
        ze.index > xe ? (Nl = ze, ze = null) : Nl = ze.sibling;
        var hu = w(U, ze, Tt.value, F);
        if (hu === null) {
          ze === null && (ze = Nl);
          break;
        }
        l && ze && hu.alternate === null && a(U, ze), z = s(hu, z, xe), We === null ? ge = hu : We.sibling = hu, We = hu, ze = Nl;
      }
      if (Tt.done)
        return u(U, ze), $e && yl(U, xe), ge;
      if (ze === null) {
        for (; !Tt.done; xe++, Tt = N.next())
          Tt = I(U, Tt.value, F), Tt !== null && (z = s(Tt, z, xe), We === null ? ge = Tt : We.sibling = Tt, We = Tt);
        return $e && yl(U, xe), ge;
      }
      for (ze = c(ze); !Tt.done; xe++, Tt = N.next())
        Tt = G(ze, U, xe, Tt.value, F), Tt !== null && (l && Tt.alternate !== null && ze.delete(Tt.key === null ? xe : Tt.key), z = s(Tt, z, xe), We === null ? ge = Tt : We.sibling = Tt, We = Tt);
      return l && ze.forEach(function(Qg) {
        return a(U, Qg);
      }), $e && yl(U, xe), ge;
    }
    function Mt(U, z, N, F) {
      if (typeof N == "object" && N !== null && N.type === ee && N.key === null && (N = N.props.children), typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case q:
            e: {
              for (var ge = N.key; z !== null; ) {
                if (z.key === ge) {
                  if (ge = N.type, ge === ee) {
                    if (z.tag === 7) {
                      u(
                        U,
                        z.sibling
                      ), F = r(
                        z,
                        N.props.children
                      ), F.return = U, U = F;
                      break e;
                    }
                  } else if (z.elementType === ge || typeof ge == "object" && ge !== null && ge.$$typeof === Oe && On(ge) === z.type) {
                    u(
                      U,
                      z.sibling
                    ), F = r(z, N.props), pr(F, N), F.return = U, U = F;
                    break e;
                  }
                  u(U, z);
                  break;
                } else a(U, z);
                z = z.sibling;
              }
              N.type === ee ? (F = ne(
                N.props.children,
                U.mode,
                F,
                N.key
              ), F.return = U, U = F) : (F = ke(
                N.type,
                N.key,
                N.props,
                null,
                U.mode,
                F
              ), pr(F, N), F.return = U, U = F);
            }
            return y(U);
          case _:
            e: {
              for (ge = N.key; z !== null; ) {
                if (z.key === ge)
                  if (z.tag === 4 && z.stateNode.containerInfo === N.containerInfo && z.stateNode.implementation === N.implementation) {
                    u(
                      U,
                      z.sibling
                    ), F = r(z, N.children || []), F.return = U, U = F;
                    break e;
                  } else {
                    u(U, z);
                    break;
                  }
                else a(U, z);
                z = z.sibling;
              }
              F = ho(N, U.mode, F), F.return = U, U = F;
            }
            return y(U);
          case Oe:
            return ge = N._init, N = ge(N._payload), Mt(
              U,
              z,
              N,
              F
            );
        }
        if (lt(N))
          return Ue(
            U,
            z,
            N,
            F
          );
        if (Se(N)) {
          if (ge = Se(N), typeof ge != "function") throw Error(D(150));
          return N = ge.call(N), _e(
            U,
            z,
            N,
            F
          );
        }
        if (typeof N.then == "function")
          return Mt(
            U,
            z,
            mr(N),
            F
          );
        if (N.$$typeof === st)
          return Mt(
            U,
            z,
            go(U, N),
            F
          );
        No(U, N);
      }
      return typeof N == "string" && N !== "" || typeof N == "number" || typeof N == "bigint" ? (N = "" + N, z !== null && z.tag === 6 ? (u(U, z.sibling), F = r(z, N), F.return = U, U = F) : (u(U, z), F = bi(N, U.mode, F), F.return = U, U = F), y(U)) : u(U, z);
    }
    return function(U, z, N, F) {
      try {
        xo = 0;
        var ge = Mt(
          U,
          z,
          N,
          F
        );
        return An = null, ge;
      } catch (ze) {
        if (ze === vc || ze === Ro) throw ze;
        var We = gn(29, ze, null, U.mode);
        return We.lanes = F, We.return = U, We;
      } finally {
      }
    };
  }
  var _l = Hy(!0), xy = Hy(!1), pl = O(null), xa = null;
  function Dn(l) {
    var a = l.alternate;
    Z(fl, fl.current & 1), Z(pl, l), xa === null && (a === null || ju.current !== null || a.memoizedState !== null) && (xa = l);
  }
  function Ny(l) {
    if (l.tag === 22) {
      if (Z(fl, fl.current), Z(pl, l), xa === null) {
        var a = l.alternate;
        a !== null && a.memoizedState !== null && (xa = l);
      }
    } else Pl();
  }
  function Pl() {
    Z(fl, fl.current), Z(pl, pl.current);
  }
  function Na(l) {
    k(pl), xa === l && (xa = null), k(fl);
  }
  var fl = O(0);
  function Vn(l) {
    for (var a = l; a !== null; ) {
      if (a.tag === 13) {
        var u = a.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || bm(u)))
          return a;
      } else if (a.tag === 19 && a.memoizedProps.revealOrder !== void 0) {
        if ((a.flags & 128) !== 0) return a;
      } else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === l) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === l) return null;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
    return null;
  }
  function ud(l, a, u, c) {
    a = l.memoizedState, u = u(c, a), u = u == null ? a : P({}, a, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var Mi = {
    enqueueSetState: function(l, a, u) {
      l = l._reactInternals;
      var c = Kn(), r = Yu(c);
      r.payload = a, u != null && (r.callback = u), a = Tn(l, r, c), a !== null && (Un(a, l, c), gc(a, l, c));
    },
    enqueueReplaceState: function(l, a, u) {
      l = l._reactInternals;
      var c = Kn(), r = Yu(c);
      r.tag = 1, r.payload = a, u != null && (r.callback = u), a = Tn(l, r, c), a !== null && (Un(a, l, c), gc(a, l, c));
    },
    enqueueForceUpdate: function(l, a) {
      l = l._reactInternals;
      var u = Kn(), c = Yu(u);
      c.tag = 2, a != null && (c.callback = a), a = Tn(l, c, u), a !== null && (Un(a, l, u), gc(a, l, u));
    }
  };
  function wy(l, a, u, c, r, s, y) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, s, y) : a.prototype && a.prototype.isPureReactComponent ? !Cu(u, c) || !Cu(r, s) : !0;
  }
  function wo(l, a, u, c) {
    l = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(u, c), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(u, c), a.state !== l && Mi.enqueueReplaceState(a, a.state, null);
  }
  function fa(l, a) {
    var u = a;
    if ("ref" in a) {
      u = {};
      for (var c in a)
        c !== "ref" && (u[c] = a[c]);
    }
    if (l = l.defaultProps) {
      u === a && (u = P({}, u));
      for (var r in l)
        u[r] === void 0 && (u[r] = l[r]);
    }
    return u;
  }
  var vr = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var a = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(a)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function qy(l) {
    vr(l);
  }
  function qo(l) {
    console.error(l);
  }
  function By(l) {
    vr(l);
  }
  function Oc(l, a) {
    try {
      var u = l.onUncaughtError;
      u(a.value, { componentStack: a.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Yy(l, a, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: a.tag === 1 ? a.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function id(l, a, u) {
    return u = Yu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      Oc(l, a);
    }, u;
  }
  function Ip(l) {
    return l = Yu(l), l.tag = 3, l;
  }
  function jy(l, a, u, c) {
    var r = u.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var s = c.value;
      l.payload = function() {
        return r(s);
      }, l.callback = function() {
        Yy(a, u, c);
      };
    }
    var y = u.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (l.callback = function() {
      Yy(a, u, c), typeof r != "function" && (uu === null ? uu = /* @__PURE__ */ new Set([this]) : uu.add(this));
      var m = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function Xn(l, a, u, c, r) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (a = u.alternate, a !== null && kf(
        a,
        u,
        r,
        !0
      ), u = pl.current, u !== null) {
        switch (u.tag) {
          case 13:
            return xa === null ? Yi() : u.alternate === null && ul === 0 && (ul = 3), u.flags &= -257, u.flags |= 65536, u.lanes = r, c === Gs ? u.flags |= 16384 : (a = u.updateQueue, a === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : a.add(c), Or(l, c, r)), !1;
          case 22:
            return u.flags |= 65536, c === Gs ? u.flags |= 16384 : (a = u.updateQueue, a === null ? (a = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = a) : (u = a.retryQueue, u === null ? a.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), Or(l, c, r)), !1;
        }
        throw Error(D(435, u.tag));
      }
      return Or(l, c, r), Yi(), !1;
    }
    if ($e)
      return a = pl.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = r, c !== Kf && (l = Error(D(422), { cause: c }), vo(Ln(l, u)))) : (c !== Kf && (a = Error(D(423), {
        cause: c
      }), vo(
        Ln(a, u)
      )), l = l.current.alternate, l.flags |= 65536, r &= -r, l.lanes |= r, c = Ln(c, u), r = id(
        l.stateNode,
        c,
        r
      ), er(l, r), ul !== 4 && (ul = 2)), !1;
    var s = Error(D(520), { cause: c });
    if (s = Ln(s, u), Er === null ? Er = [s] : Er.push(s), ul !== 4 && (ul = 2), a === null) return !0;
    c = Ln(c, u), u = a;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = r & -r, u.lanes |= l, l = id(u.stateNode, c, l), er(u, l), !1;
        case 1:
          if (a = u.type, s = u.stateNode, (u.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (uu === null || !uu.has(s))))
            return u.flags |= 65536, r &= -r, u.lanes |= r, r = Ip(r), jy(
              r,
              l,
              u,
              c
            ), er(u, r), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var Ly = Error(D(461)), nt = !1;
  function Cl(l, a, u, c) {
    a.child = l === null ? xy(a, null, u, c) : _l(
      a,
      l.child,
      u,
      c
    );
  }
  function Gy(l, a, u, c, r) {
    u = u.render;
    var s = a.ref;
    if ("ref" in c) {
      var y = {};
      for (var m in c)
        m !== "ref" && (y[m] = c[m]);
    } else y = c;
    return Ei(a), c = Ks(
      l,
      a,
      u,
      y,
      s,
      r
    ), m = Js(), l !== null && !nt ? (ks(l, a, r), wa(l, a, r)) : ($e && m && Zf(a), a.flags |= 1, Cl(l, a, c, r), a.child);
  }
  function Pp(l, a, u, c, r) {
    if (l === null) {
      var s = u.type;
      return typeof s == "function" && !Ns(s) && s.defaultProps === void 0 && u.compare === null ? (a.tag = 15, a.type = s, Gu(
        l,
        a,
        s,
        c,
        r
      )) : (l = ke(
        u.type,
        null,
        c,
        a,
        a.mode,
        r
      ), l.ref = a.ref, l.return = a, a.child = l);
    }
    if (s = l.child, !dd(l, r)) {
      var y = s.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Cu, u(y, c) && l.ref === a.ref)
        return wa(l, a, r);
    }
    return a.flags |= 1, l = Oa(s, c), l.ref = a.ref, l.return = a, a.child = l;
  }
  function Gu(l, a, u, c, r) {
    if (l !== null) {
      var s = l.memoizedProps;
      if (Cu(s, c) && l.ref === a.ref)
        if (nt = !1, a.pendingProps = c = s, dd(l, r))
          (l.flags & 131072) !== 0 && (nt = !0);
        else
          return a.lanes = l.lanes, wa(l, a, r);
    }
    return od(
      l,
      a,
      u,
      c,
      r
    );
  }
  function Dc(l, a, u) {
    var c = a.pendingProps, r = c.children, s = l !== null ? l.memoizedState : null;
    if (c.mode === "hidden") {
      if ((a.flags & 128) !== 0) {
        if (c = s !== null ? s.baseLanes | u : u, l !== null) {
          for (r = a.child = l.child, s = 0; r !== null; )
            s = s | r.lanes | r.childLanes, r = r.sibling;
          a.childLanes = s & ~c;
        } else a.childLanes = 0, a.child = null;
        return cd(
          l,
          a,
          c,
          u
        );
      }
      if ((u & 536870912) !== 0)
        a.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Eo(
          a,
          s !== null ? s.cachePool : null
        ), s !== null ? dy(a, s) : Tl(), Ny(a);
      else
        return a.lanes = a.childLanes = 536870912, cd(
          l,
          a,
          s !== null ? s.baseLanes | u : u,
          u
        );
    } else
      s !== null ? (Eo(a, s.cachePool), dy(a, s), Pl(), a.memoizedState = null) : (l !== null && Eo(a, null), Tl(), Pl());
    return Cl(l, a, r, u), a.child;
  }
  function cd(l, a, u, c) {
    var r = To();
    return r = r === null ? null : { parent: ml._currentValue, pool: r }, a.memoizedState = {
      baseLanes: u,
      cachePool: r
    }, l !== null && Eo(a, null), Tl(), Ny(a), l !== null && kf(l, a, c, !0), null;
  }
  function Vu(l, a) {
    var u = a.ref;
    if (u === null)
      l !== null && l.ref !== null && (a.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(D(284));
      (l === null || l.ref !== u) && (a.flags |= 4194816);
    }
  }
  function od(l, a, u, c, r) {
    return Ei(a), u = Ks(
      l,
      a,
      u,
      c,
      void 0,
      r
    ), c = Js(), l !== null && !nt ? (ks(l, a, r), wa(l, a, r)) : ($e && c && Zf(a), a.flags |= 1, Cl(l, a, u, r), a.child);
  }
  function Vy(l, a, u, c, r, s) {
    return Ei(a), a.updateQueue = null, u = Oi(
      a,
      c,
      u,
      r
    ), hy(l), c = Js(), l !== null && !nt ? (ks(l, a, s), wa(l, a, s)) : ($e && c && Zf(a), a.flags |= 1, Cl(l, a, u, s), a.child);
  }
  function Xy(l, a, u, c, r) {
    if (Ei(a), a.stateNode === null) {
      var s = mc, y = u.contextType;
      typeof y == "object" && y !== null && (s = Gl(y)), s = new u(c, s), a.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Mi, a.stateNode = s, s._reactInternals = a, s = a.stateNode, s.props = c, s.state = a.memoizedState, s.refs = {}, Pf(a), y = u.contextType, s.context = typeof y == "object" && y !== null ? Gl(y) : mc, s.state = a.memoizedState, y = u.getDerivedStateFromProps, typeof y == "function" && (ud(
        a,
        u,
        y,
        c
      ), s.state = a.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (y = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), y !== s.state && Mi.enqueueReplaceState(s, s.state, null), Do(a, c, s, r), tr(), s.state = a.memoizedState), typeof s.componentDidMount == "function" && (a.flags |= 4194308), c = !0;
    } else if (l === null) {
      s = a.stateNode;
      var m = a.memoizedProps, b = fa(u, m);
      s.props = b;
      var x = s.context, $ = u.contextType;
      y = mc, typeof $ == "object" && $ !== null && (y = Gl($));
      var I = u.getDerivedStateFromProps;
      $ = typeof I == "function" || typeof s.getSnapshotBeforeUpdate == "function", m = a.pendingProps !== m, $ || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m || x !== y) && wo(
        a,
        s,
        c,
        y
      ), Bu = !1;
      var w = a.memoizedState;
      s.state = w, Do(a, c, s, r), tr(), x = a.memoizedState, m || w !== x || Bu ? (typeof I == "function" && (ud(
        a,
        u,
        I,
        c
      ), x = a.memoizedState), (b = Bu || wy(
        a,
        u,
        b,
        c,
        w,
        x,
        y
      )) ? ($ || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = c, a.memoizedState = x), s.props = c, s.state = x, s.context = y, c = b) : (typeof s.componentDidMount == "function" && (a.flags |= 4194308), c = !1);
    } else {
      s = a.stateNode, Xs(l, a), y = a.memoizedProps, $ = fa(u, y), s.props = $, I = a.pendingProps, w = s.context, x = u.contextType, b = mc, typeof x == "object" && x !== null && (b = Gl(x)), m = u.getDerivedStateFromProps, (x = typeof m == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (y !== I || w !== b) && wo(
        a,
        s,
        c,
        b
      ), Bu = !1, w = a.memoizedState, s.state = w, Do(a, c, s, r), tr();
      var G = a.memoizedState;
      y !== I || w !== G || Bu || l !== null && l.dependencies !== null && $f(l.dependencies) ? (typeof m == "function" && (ud(
        a,
        u,
        m,
        c
      ), G = a.memoizedState), ($ = Bu || wy(
        a,
        u,
        $,
        c,
        w,
        G,
        b
      ) || l !== null && l.dependencies !== null && $f(l.dependencies)) ? (x || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(c, G, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        c,
        G,
        b
      )), typeof s.componentDidUpdate == "function" && (a.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || y === l.memoizedProps && w === l.memoizedState || (a.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && w === l.memoizedState || (a.flags |= 1024), a.memoizedProps = c, a.memoizedState = G), s.props = c, s.state = G, s.context = b, c = $) : (typeof s.componentDidUpdate != "function" || y === l.memoizedProps && w === l.memoizedState || (a.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && w === l.memoizedState || (a.flags |= 1024), c = !1);
    }
    return s = c, Vu(l, a), c = (a.flags & 128) !== 0, s || c ? (s = a.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : s.render(), a.flags |= 1, l !== null && c ? (a.child = _l(
      a,
      l.child,
      null,
      r
    ), a.child = _l(
      a,
      null,
      u,
      r
    )) : Cl(l, a, u, r), a.memoizedState = s.state, l = a.child) : l = wa(
      l,
      a,
      r
    ), l;
  }
  function fd(l, a, u, c) {
    return po(), a.flags |= 256, Cl(l, a, u, c), a.child;
  }
  var gr = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function rd(l) {
    return { baseLanes: l, cachePool: Ff() };
  }
  function Qy(l, a, u) {
    return l = l !== null ? l.childLanes & ~u : 0, a && (l |= Rl), l;
  }
  function ev(l, a, u) {
    var c = a.pendingProps, r = !1, s = (a.flags & 128) !== 0, y;
    if ((y = s) || (y = l !== null && l.memoizedState === null ? !1 : (fl.current & 2) !== 0), y && (r = !0, a.flags &= -129), y = (a.flags & 32) !== 0, a.flags &= -33, l === null) {
      if ($e) {
        if (r ? Dn(a) : Pl(), $e) {
          var m = Ht, b;
          if (b = m) {
            e: {
              for (b = m, m = cn; b.nodeType !== 8; ) {
                if (!m) {
                  m = null;
                  break e;
                }
                if (b = Ga(
                  b.nextSibling
                ), b === null) {
                  m = null;
                  break e;
                }
              }
              m = b;
            }
            m !== null ? (a.memoizedState = {
              dehydrated: m,
              treeContext: xu !== null ? { id: Da, overflow: Ma } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, b = gn(
              18,
              null,
              null,
              0
            ), b.stateNode = m, b.return = a, a.child = b, ll = a, Ht = null, b = !0) : b = !1;
          }
          b || za(a);
        }
        if (m = a.memoizedState, m !== null && (m = m.dehydrated, m !== null))
          return bm(m) ? a.lanes = 32 : a.lanes = 536870912, null;
        Na(a);
      }
      return m = c.children, c = c.fallback, r ? (Pl(), r = a.mode, m = Sr(
        { mode: "hidden", children: m },
        r
      ), c = ne(
        c,
        r,
        u,
        null
      ), m.return = a, c.return = a, m.sibling = c, a.child = m, r = a.child, r.memoizedState = rd(u), r.childLanes = Qy(
        l,
        y,
        u
      ), a.memoizedState = gr, c) : (Dn(a), sd(a, m));
    }
    if (b = l.memoizedState, b !== null && (m = b.dehydrated, m !== null)) {
      if (s)
        a.flags & 256 ? (Dn(a), a.flags &= -257, a = Zy(
          l,
          a,
          u
        )) : a.memoizedState !== null ? (Pl(), a.child = l.child, a.flags |= 128, a = null) : (Pl(), r = c.fallback, m = a.mode, c = Sr(
          { mode: "visible", children: c.children },
          m
        ), r = ne(
          r,
          m,
          u,
          null
        ), r.flags |= 2, c.return = a, r.return = a, c.sibling = r, a.child = c, _l(
          a,
          l.child,
          null,
          u
        ), c = a.child, c.memoizedState = rd(u), c.childLanes = Qy(
          l,
          y,
          u
        ), a.memoizedState = gr, a = r);
      else if (Dn(a), bm(m)) {
        if (y = m.nextSibling && m.nextSibling.dataset, y) var x = y.dgst;
        y = x, c = Error(D(419)), c.stack = "", c.digest = y, vo({ value: c, source: null, stack: null }), a = Zy(
          l,
          a,
          u
        );
      } else if (nt || kf(l, a, u, !1), y = (u & l.childLanes) !== 0, nt || y) {
        if (y = Nt, y !== null && (c = u & -u, c = (c & 42) !== 0 ? 1 : Ye(c), c = (c & (y.suspendedLanes | u)) !== 0 ? 0 : c, c !== 0 && c !== b.retryLane))
          throw b.retryLane = c, Hu(l, c), Un(y, l, c), Ly;
        m.data === "$?" || Yi(), a = Zy(
          l,
          a,
          u
        );
      } else
        m.data === "$?" ? (a.flags |= 192, a.child = l.child, a = null) : (l = b.treeContext, Ht = Ga(
          m.nextSibling
        ), ll = a, $e = !0, Nu = null, cn = !1, l !== null && (Sn[ua++] = Da, Sn[ua++] = Ma, Sn[ua++] = xu, Da = l.id, Ma = l.overflow, xu = a), a = sd(
          a,
          c.children
        ), a.flags |= 4096);
      return a;
    }
    return r ? (Pl(), r = c.fallback, m = a.mode, b = l.child, x = b.sibling, c = Oa(b, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = b.subtreeFlags & 65011712, x !== null ? r = Oa(x, r) : (r = ne(
      r,
      m,
      u,
      null
    ), r.flags |= 2), r.return = a, c.return = a, c.sibling = r, a.child = c, c = r, r = a.child, m = l.child.memoizedState, m === null ? m = rd(u) : (b = m.cachePool, b !== null ? (x = ml._currentValue, b = b.parent !== x ? { parent: x, pool: x } : b) : b = Ff(), m = {
      baseLanes: m.baseLanes | u,
      cachePool: b
    }), r.memoizedState = m, r.childLanes = Qy(
      l,
      y,
      u
    ), a.memoizedState = gr, c) : (Dn(a), u = l.child, l = u.sibling, u = Oa(u, {
      mode: "visible",
      children: c.children
    }), u.return = a, u.sibling = null, l !== null && (y = a.deletions, y === null ? (a.deletions = [l], a.flags |= 16) : y.push(l)), a.child = u, a.memoizedState = null, u);
  }
  function sd(l, a) {
    return a = Sr(
      { mode: "visible", children: a },
      l.mode
    ), a.return = l, l.child = a;
  }
  function Sr(l, a) {
    return l = gn(22, l, null, a), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function Zy(l, a, u) {
    return _l(a, l.child, null, u), l = sd(
      a,
      a.pendingProps.children
    ), l.flags |= 2, a.memoizedState = null, l;
  }
  function Mc(l, a, u) {
    l.lanes |= a;
    var c = l.alternate;
    c !== null && (c.lanes |= a), Ys(l.return, a, u);
  }
  function Bo(l, a, u, c, r) {
    var s = l.memoizedState;
    s === null ? l.memoizedState = {
      isBackwards: a,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: r
    } : (s.isBackwards = a, s.rendering = null, s.renderingStartTime = 0, s.last = c, s.tail = u, s.tailMode = r);
  }
  function Ky(l, a, u) {
    var c = a.pendingProps, r = c.revealOrder, s = c.tail;
    if (Cl(l, a, c.children, u), c = fl.current, (c & 2) !== 0)
      c = c & 1 | 2, a.flags |= 128;
    else {
      if (l !== null && (l.flags & 128) !== 0)
        e: for (l = a.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && Mc(l, u, a);
          else if (l.tag === 19)
            Mc(l, u, a);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === a) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === a)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (Z(fl, c), r) {
      case "forwards":
        for (u = a.child, r = null; u !== null; )
          l = u.alternate, l !== null && Vn(l) === null && (r = u), u = u.sibling;
        u = r, u === null ? (r = a.child, a.child = null) : (r = u.sibling, u.sibling = null), Bo(
          a,
          !1,
          r,
          u,
          s
        );
        break;
      case "backwards":
        for (u = null, r = a.child, a.child = null; r !== null; ) {
          if (l = r.alternate, l !== null && Vn(l) === null) {
            a.child = r;
            break;
          }
          l = r.sibling, r.sibling = u, u = r, r = l;
        }
        Bo(
          a,
          !0,
          u,
          null,
          s
        );
        break;
      case "together":
        Bo(a, !1, null, null, void 0);
        break;
      default:
        a.memoizedState = null;
    }
    return a.child;
  }
  function wa(l, a, u) {
    if (l !== null && (a.dependencies = l.dependencies), Ni |= a.lanes, (u & a.childLanes) === 0)
      if (l !== null) {
        if (kf(
          l,
          a,
          u,
          !1
        ), (u & a.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && a.child !== l.child)
      throw Error(D(153));
    if (a.child !== null) {
      for (l = a.child, u = Oa(l, l.pendingProps), a.child = u, u.return = a; l.sibling !== null; )
        l = l.sibling, u = u.sibling = Oa(l, l.pendingProps), u.return = a;
      u.sibling = null;
    }
    return a.child;
  }
  function dd(l, a) {
    return (l.lanes & a) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && $f(l)));
  }
  function tv(l, a, u) {
    switch (a.tag) {
      case 3:
        vt(a, a.stateNode.containerInfo), eu(a, ml, l.memoizedState.cache), po();
        break;
      case 27:
      case 5:
        Vt(a);
        break;
      case 4:
        vt(a, a.stateNode.containerInfo);
        break;
      case 10:
        eu(
          a,
          a.type,
          a.memoizedProps.value
        );
        break;
      case 13:
        var c = a.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (Dn(a), a.flags |= 128, null) : (u & a.child.childLanes) !== 0 ? ev(l, a, u) : (Dn(a), l = wa(
            l,
            a,
            u
          ), l !== null ? l.sibling : null);
        Dn(a);
        break;
      case 19:
        var r = (l.flags & 128) !== 0;
        if (c = (u & a.childLanes) !== 0, c || (kf(
          l,
          a,
          u,
          !1
        ), c = (u & a.childLanes) !== 0), r) {
          if (c)
            return Ky(
              l,
              a,
              u
            );
          a.flags |= 128;
        }
        if (r = a.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Z(fl, fl.current), c) break;
        return null;
      case 22:
      case 23:
        return a.lanes = 0, Dc(l, a, u);
      case 24:
        eu(a, ml, l.memoizedState.cache);
    }
    return wa(l, a, u);
  }
  function Jy(l, a, u) {
    if (l !== null)
      if (l.memoizedProps !== a.pendingProps)
        nt = !0;
      else {
        if (!dd(l, u) && (a.flags & 128) === 0)
          return nt = !1, tv(
            l,
            a,
            u
          );
        nt = (l.flags & 131072) !== 0;
      }
    else
      nt = !1, $e && (a.flags & 1048576) !== 0 && _t(a, Qf, a.index);
    switch (a.lanes = 0, a.tag) {
      case 16:
        e: {
          l = a.pendingProps;
          var c = a.elementType, r = c._init;
          if (c = r(c._payload), a.type = c, typeof c == "function")
            Ns(c) ? (l = fa(c, l), a.tag = 1, a = Xy(
              null,
              a,
              c,
              l,
              u
            )) : (a.tag = 0, a = od(
              null,
              a,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (r = c.$$typeof, r === ot) {
                a.tag = 11, a = Gy(
                  null,
                  a,
                  c,
                  l,
                  u
                );
                break e;
              } else if (r === tt) {
                a.tag = 14, a = Pp(
                  null,
                  a,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw a = Xe(c) || c, Error(D(306, a, ""));
          }
        }
        return a;
      case 0:
        return od(
          l,
          a,
          a.type,
          a.pendingProps,
          u
        );
      case 1:
        return c = a.type, r = fa(
          c,
          a.pendingProps
        ), Xy(
          l,
          a,
          c,
          r,
          u
        );
      case 3:
        e: {
          if (vt(
            a,
            a.stateNode.containerInfo
          ), l === null) throw Error(D(387));
          c = a.pendingProps;
          var s = a.memoizedState;
          r = s.element, Xs(l, a), Do(a, c, null, u);
          var y = a.memoizedState;
          if (c = y.cache, eu(a, ml, c), c !== s.cache && js(
            a,
            [ml],
            u,
            !0
          ), tr(), c = y.element, s.isDehydrated)
            if (s = {
              element: c,
              isDehydrated: !1,
              cache: y.cache
            }, a.updateQueue.baseState = s, a.memoizedState = s, a.flags & 256) {
              a = fd(
                l,
                a,
                c,
                u
              );
              break e;
            } else if (c !== r) {
              r = Ln(
                Error(D(424)),
                a
              ), vo(r), a = fd(
                l,
                a,
                c,
                u
              );
              break e;
            } else {
              switch (l = a.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Ht = Ga(l.firstChild), ll = a, $e = !0, Nu = null, cn = !0, u = xy(
                a,
                null,
                c,
                u
              ), a.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (po(), c === r) {
              a = wa(
                l,
                a,
                u
              );
              break e;
            }
            Cl(
              l,
              a,
              c,
              u
            );
          }
          a = a.child;
        }
        return a;
      case 26:
        return Vu(l, a), l === null ? (u = Ld(
          a.type,
          null,
          a.pendingProps,
          null
        )) ? a.memoizedState = u : $e || (u = a.type, l = a.pendingProps, c = Io(
          be.current
        ).createElement(u), c[jt] = a, c[Wl] = l, Y(c, u, l), ol(c), a.stateNode = c) : a.memoizedState = Ld(
          a.type,
          l.memoizedProps,
          a.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return Vt(a), l === null && $e && (c = a.stateNode = Ql(
          a.type,
          a.pendingProps,
          be.current
        ), ll = a, cn = !0, r = Ht, Xl(a.type) ? (Em = r, Ht = Ga(
          c.firstChild
        )) : Ht = r), Cl(
          l,
          a,
          a.pendingProps.children,
          u
        ), Vu(l, a), l === null && (a.flags |= 4194304), a.child;
      case 5:
        return l === null && $e && ((r = c = Ht) && (c = Sm(
          c,
          a.type,
          a.pendingProps,
          cn
        ), c !== null ? (a.stateNode = c, ll = a, Ht = Ga(
          c.firstChild
        ), cn = !1, r = !0) : r = !1), r || za(a)), Vt(a), r = a.type, s = a.pendingProps, y = l !== null ? l.memoizedProps : null, c = s.children, Nc(r, s) ? c = null : y !== null && Nc(r, y) && (a.flags |= 32), a.memoizedState !== null && (r = Ks(
          l,
          a,
          Xp,
          null,
          null,
          u
        ), Zl._currentValue = r), Vu(l, a), Cl(l, a, c, u), a.child;
      case 6:
        return l === null && $e && ((l = u = Ht) && (u = Po(
          u,
          a.pendingProps,
          cn
        ), u !== null ? (a.stateNode = u, ll = a, Ht = null, l = !0) : l = !1), l || za(a)), null;
      case 13:
        return ev(l, a, u);
      case 4:
        return vt(
          a,
          a.stateNode.containerInfo
        ), c = a.pendingProps, l === null ? a.child = _l(
          a,
          null,
          c,
          u
        ) : Cl(
          l,
          a,
          c,
          u
        ), a.child;
      case 11:
        return Gy(
          l,
          a,
          a.type,
          a.pendingProps,
          u
        );
      case 7:
        return Cl(
          l,
          a,
          a.pendingProps,
          u
        ), a.child;
      case 8:
        return Cl(
          l,
          a,
          a.pendingProps.children,
          u
        ), a.child;
      case 12:
        return Cl(
          l,
          a,
          a.pendingProps.children,
          u
        ), a.child;
      case 10:
        return c = a.pendingProps, eu(a, a.type, c.value), Cl(
          l,
          a,
          c.children,
          u
        ), a.child;
      case 9:
        return r = a.type._context, c = a.pendingProps.children, Ei(a), r = Gl(r), c = c(r), a.flags |= 1, Cl(l, a, c, u), a.child;
      case 14:
        return Pp(
          l,
          a,
          a.type,
          a.pendingProps,
          u
        );
      case 15:
        return Gu(
          l,
          a,
          a.type,
          a.pendingProps,
          u
        );
      case 19:
        return Ky(l, a, u);
      case 31:
        return c = a.pendingProps, u = a.mode, c = {
          mode: c.mode,
          children: c.children
        }, l === null ? (u = Sr(
          c,
          u
        ), u.ref = a.ref, a.child = u, u.return = a, a = u) : (u = Oa(l.child, c), u.ref = a.ref, a.child = u, u.return = a, a = u), a;
      case 22:
        return Dc(l, a, u);
      case 24:
        return Ei(a), c = Gl(ml), l === null ? (r = To(), r === null && (r = Nt, s = uy(), r.pooledCache = s, s.refCount++, s !== null && (r.pooledCacheLanes |= u), r = s), a.memoizedState = {
          parent: c,
          cache: r
        }, Pf(a), eu(a, ml, r)) : ((l.lanes & u) !== 0 && (Xs(l, a), Do(a, null, null, u), tr()), r = l.memoizedState, s = a.memoizedState, r.parent !== c ? (r = { parent: c, cache: c }, a.memoizedState = r, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = r), eu(a, ml, c)) : (c = s.cache, eu(a, ml, c), c !== r.cache && js(
          a,
          [ml],
          u,
          !0
        ))), Cl(
          l,
          a,
          a.pendingProps.children,
          u
        ), a.child;
      case 29:
        throw a.pendingProps;
    }
    throw Error(D(156, a.tag));
  }
  function Xu(l) {
    l.flags |= 4;
  }
  function ky(l, a) {
    if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Dm(a)) {
      if (a = pl.current, a !== null && ((pt & 4194048) === pt ? xa !== null : (pt & 62914560) !== pt && (pt & 536870912) === 0 || a !== xa))
        throw Oo = Gs, If;
      l.flags |= 8192;
    }
  }
  function zi(l, a) {
    a !== null && (l.flags |= 4), l.flags & 16384 && (a = l.tag !== 22 ? oe() : 536870912, l.lanes |= a, Xo |= a);
  }
  function Yo(l, a) {
    if (!$e)
      switch (l.tailMode) {
        case "hidden":
          a = l.tail;
          for (var u = null; a !== null; )
            a.alternate !== null && (u = a), a = a.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? a || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function $t(l) {
    var a = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (a)
      for (var r = l.child; r !== null; )
        u |= r.lanes | r.childLanes, c |= r.subtreeFlags & 65011712, c |= r.flags & 65011712, r.return = l, r = r.sibling;
    else
      for (r = l.child; r !== null; )
        u |= r.lanes | r.childLanes, c |= r.subtreeFlags, c |= r.flags, r.return = l, r = r.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, a;
  }
  function xt(l, a, u) {
    var c = a.pendingProps;
    switch (pc(a), a.tag) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return $t(a), null;
      case 1:
        return $t(a), null;
      case 3:
        return u = a.stateNode, c = null, l !== null && (c = l.memoizedState.cache), a.memoizedState.cache !== c && (a.flags |= 2048), tu(ml), gt(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (mo(a) ? Xu(a) : l === null || l.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, ny())), $t(a), null;
      case 26:
        return u = a.memoizedState, l === null ? (Xu(a), u !== null ? ($t(a), ky(a, u)) : ($t(a), a.flags &= -16777217)) : u ? u !== l.memoizedState ? (Xu(a), $t(a), ky(a, u)) : ($t(a), a.flags &= -16777217) : (l.memoizedProps !== c && Xu(a), $t(a), a.flags &= -16777217), null;
      case 27:
        Ml(a), u = be.current;
        var r = a.type;
        if (l !== null && a.stateNode != null)
          l.memoizedProps !== c && Xu(a);
        else {
          if (!c) {
            if (a.stateNode === null)
              throw Error(D(166));
            return $t(a), null;
          }
          l = re.current, mo(a) ? qs(a) : (l = Ql(r, c, u), a.stateNode = l, Xu(a));
        }
        return $t(a), null;
      case 5:
        if (Ml(a), u = a.type, l !== null && a.stateNode != null)
          l.memoizedProps !== c && Xu(a);
        else {
          if (!c) {
            if (a.stateNode === null)
              throw Error(D(166));
            return $t(a), null;
          }
          if (l = re.current, mo(a))
            qs(a);
          else {
            switch (r = Io(
              be.current
            ), l) {
              case 1:
                l = r.createElementNS(
                  "http://www.w3.org/2000/svg",
                  u
                );
                break;
              case 2:
                l = r.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  u
                );
                break;
              default:
                switch (u) {
                  case "svg":
                    l = r.createElementNS(
                      "http://www.w3.org/2000/svg",
                      u
                    );
                    break;
                  case "math":
                    l = r.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      u
                    );
                    break;
                  case "script":
                    l = r.createElement("div"), l.innerHTML = "<script><\/script>", l = l.removeChild(l.firstChild);
                    break;
                  case "select":
                    l = typeof c.is == "string" ? r.createElement("select", { is: c.is }) : r.createElement("select"), c.multiple ? l.multiple = !0 : c.size && (l.size = c.size);
                    break;
                  default:
                    l = typeof c.is == "string" ? r.createElement(u, { is: c.is }) : r.createElement(u);
                }
            }
            l[jt] = a, l[Wl] = c;
            e: for (r = a.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                l.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === a) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === a)
                  break e;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            a.stateNode = l;
            e: switch (Y(l, u, c), u) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!c.autoFocus;
                break e;
              case "img":
                l = !0;
                break e;
              default:
                l = !1;
            }
            l && Xu(a);
          }
        }
        return $t(a), a.flags &= -16777217, null;
      case 6:
        if (l && a.stateNode != null)
          l.memoizedProps !== c && Xu(a);
        else {
          if (typeof c != "string" && a.stateNode === null)
            throw Error(D(166));
          if (l = be.current, mo(a)) {
            if (l = a.stateNode, u = a.memoizedProps, c = null, r = ll, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  c = r.memoizedProps;
              }
            l[jt] = a, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || Tv(l.nodeValue, u)), l || za(a);
          } else
            l = Io(l).createTextNode(
              c
            ), l[jt] = a, a.stateNode = l;
        }
        return $t(a), null;
      case 13:
        if (c = a.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (r = mo(a), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!r) throw Error(D(318));
              if (r = a.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(D(317));
              r[jt] = a;
            } else
              po(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
            $t(a), r = !1;
          } else
            r = ny(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return a.flags & 256 ? (Na(a), a) : (Na(a), null);
        }
        if (Na(a), (a.flags & 128) !== 0)
          return a.lanes = u, a;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = a.child, r = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (r = c.alternate.memoizedState.cachePool.pool);
          var s = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (s = c.memoizedState.cachePool.pool), s !== r && (c.flags |= 2048);
        }
        return u !== l && u && (a.child.flags |= 8192), zi(a, a.updateQueue), $t(a), null;
      case 4:
        return gt(), l === null && _r(a.stateNode.containerInfo), $t(a), null;
      case 10:
        return tu(a.type), $t(a), null;
      case 19:
        if (k(fl), r = a.memoizedState, r === null) return $t(a), null;
        if (c = (a.flags & 128) !== 0, s = r.rendering, s === null)
          if (c) Yo(r, !1);
          else {
            if (ul !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = a.child; l !== null; ) {
                if (s = Vn(l), s !== null) {
                  for (a.flags |= 128, Yo(r, !1), l = s.updateQueue, a.updateQueue = l, zi(a, l), a.subtreeFlags = 0, l = u, u = a.child; u !== null; )
                    ws(u, l), u = u.sibling;
                  return Z(
                    fl,
                    fl.current & 1 | 2
                  ), a.child;
                }
                l = l.sibling;
              }
            r.tail !== null && Je() > vd && (a.flags |= 128, c = !0, Yo(r, !1), a.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = Vn(s), l !== null) {
              if (a.flags |= 128, c = !0, l = l.updateQueue, a.updateQueue = l, zi(a, l), Yo(r, !0), r.tail === null && r.tailMode === "hidden" && !s.alternate && !$e)
                return $t(a), null;
            } else
              2 * Je() - r.renderingStartTime > vd && u !== 536870912 && (a.flags |= 128, c = !0, Yo(r, !1), a.lanes = 4194304);
          r.isBackwards ? (s.sibling = a.child, a.child = s) : (l = r.last, l !== null ? l.sibling = s : a.child = s, r.last = s);
        }
        return r.tail !== null ? (a = r.tail, r.rendering = a, r.tail = a.sibling, r.renderingStartTime = Je(), a.sibling = null, l = fl.current, Z(fl, c ? l & 1 | 2 : l & 1), a) : ($t(a), null);
      case 22:
      case 23:
        return Na(a), zo(), c = a.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (a.flags |= 8192) : c && (a.flags |= 8192), c ? (u & 536870912) !== 0 && (a.flags & 128) === 0 && ($t(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : $t(a), u = a.updateQueue, u !== null && zi(a, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (c = a.memoizedState.cachePool.pool), c !== u && (a.flags |= 2048), l !== null && k(qu), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), a.memoizedState.cache !== u && (a.flags |= 2048), tu(ml), $t(a), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(D(156, a.tag));
  }
  function $y(l, a) {
    switch (pc(a), a.tag) {
      case 1:
        return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
      case 3:
        return tu(ml), gt(), l = a.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (a.flags = l & -65537 | 128, a) : null;
      case 26:
      case 27:
      case 5:
        return Ml(a), null;
      case 13:
        if (Na(a), l = a.memoizedState, l !== null && l.dehydrated !== null) {
          if (a.alternate === null)
            throw Error(D(340));
          po();
        }
        return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
      case 19:
        return k(fl), null;
      case 4:
        return gt(), null;
      case 10:
        return tu(a.type), null;
      case 22:
      case 23:
        return Na(a), zo(), l !== null && k(qu), l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
      case 24:
        return tu(ml), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function lv(l, a) {
    switch (pc(a), a.tag) {
      case 3:
        tu(ml), gt();
        break;
      case 26:
      case 27:
      case 5:
        Ml(a);
        break;
      case 4:
        gt();
        break;
      case 13:
        Na(a);
        break;
      case 19:
        k(fl);
        break;
      case 10:
        tu(a.type);
        break;
      case 22:
      case 23:
        Na(a), zo(), l !== null && k(qu);
        break;
      case 24:
        tu(ml);
    }
  }
  function jo(l, a) {
    try {
      var u = a.updateQueue, c = u !== null ? u.lastEffect : null;
      if (c !== null) {
        var r = c.next;
        u = r;
        do {
          if ((u.tag & l) === l) {
            c = void 0;
            var s = u.create, y = u.inst;
            c = s(), y.destroy = c;
          }
          u = u.next;
        } while (u !== r);
      }
    } catch (m) {
      wt(a, a.return, m);
    }
  }
  function _i(l, a, u) {
    try {
      var c = a.updateQueue, r = c !== null ? c.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        c = s;
        do {
          if ((c.tag & l) === l) {
            var y = c.inst, m = y.destroy;
            if (m !== void 0) {
              y.destroy = void 0, r = a;
              var b = u, x = m;
              try {
                x();
              } catch ($) {
                wt(
                  r,
                  b,
                  $
                );
              }
            }
          }
          c = c.next;
        } while (c !== s);
      }
    } catch ($) {
      wt(a, a.return, $);
    }
  }
  function nv(l) {
    var a = l.updateQueue;
    if (a !== null) {
      var u = l.stateNode;
      try {
        Qs(a, u);
      } catch (c) {
        wt(l, l.return, c);
      }
    }
  }
  function hd(l, a, u) {
    u.props = fa(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      wt(l, a, c);
    }
  }
  function Lo(l, a) {
    try {
      var u = l.ref;
      if (u !== null) {
        switch (l.tag) {
          case 26:
          case 27:
          case 5:
            var c = l.stateNode;
            break;
          case 30:
            c = l.stateNode;
            break;
          default:
            c = l.stateNode;
        }
        typeof u == "function" ? l.refCleanup = u(c) : u.current = c;
      }
    } catch (r) {
      wt(l, a, r);
    }
  }
  function qa(l, a) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (r) {
          wt(l, a, r);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (r) {
          wt(l, a, r);
        }
      else u.current = null;
  }
  function Wy(l) {
    var a = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (a) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          u.autoFocus && c.focus();
          break e;
        case "img":
          u.src ? c.src = u.src : u.srcSet && (c.srcset = u.srcSet);
      }
    } catch (r) {
      wt(l, l.return, r);
    }
  }
  function zc(l, a, u) {
    try {
      var c = l.stateNode;
      Dt(c, l.type, u, a), c[Wl] = a;
    } catch (r) {
      wt(l, l.return, r);
    }
  }
  function av(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Xl(l.type) || l.tag === 4;
  }
  function Fy(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || av(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Xl(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function ra(l, a, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, a ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, a) : (a = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, a.appendChild(l), u = u._reactRootContainer, u != null || a.onclick !== null || (a.onclick = Ur));
    else if (c !== 4 && (c === 27 && Xl(l.type) && (u = l.stateNode, a = null), l = l.child, l !== null))
      for (ra(l, a, u), l = l.sibling; l !== null; )
        ra(l, a, u), l = l.sibling;
  }
  function Ci(l, a, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, a ? u.insertBefore(l, a) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && Xl(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (Ci(l, a, u), l = l.sibling; l !== null; )
        Ci(l, a, u), l = l.sibling;
  }
  function uv(l) {
    var a = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, r = a.attributes; r.length; )
        a.removeAttributeNode(r[0]);
      Y(a, c, u), a[jt] = l, a[Wl] = u;
    } catch (s) {
      wt(l, l.return, s);
    }
  }
  var Ba = !1, al = !1, yd = !1, Iy = typeof WeakSet == "function" ? WeakSet : Set, vl = null;
  function iv(l, a) {
    if (l = l.containerInfo, vm = jr, l = Gf(l), Cs(l)) {
      if ("selectionStart" in l)
        var u = {
          start: l.selectionStart,
          end: l.selectionEnd
        };
      else
        e: {
          u = (u = l.ownerDocument) && u.defaultView || window;
          var c = u.getSelection && u.getSelection();
          if (c && c.rangeCount !== 0) {
            u = c.anchorNode;
            var r = c.anchorOffset, s = c.focusNode;
            c = c.focusOffset;
            try {
              u.nodeType, s.nodeType;
            } catch {
              u = null;
              break e;
            }
            var y = 0, m = -1, b = -1, x = 0, $ = 0, I = l, w = null;
            t: for (; ; ) {
              for (var G; I !== u || r !== 0 && I.nodeType !== 3 || (m = y + r), I !== s || c !== 0 && I.nodeType !== 3 || (b = y + c), I.nodeType === 3 && (y += I.nodeValue.length), (G = I.firstChild) !== null; )
                w = I, I = G;
              for (; ; ) {
                if (I === l) break t;
                if (w === u && ++x === r && (m = y), w === s && ++$ === c && (b = y), (G = I.nextSibling) !== null) break;
                I = w, w = I.parentNode;
              }
              I = G;
            }
            u = m === -1 || b === -1 ? null : { start: m, end: b };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (Hr = { focusedElem: l, selectionRange: u }, jr = !1, vl = a; vl !== null; )
      if (a = vl, l = a.child, (a.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = a, vl = l;
      else
        for (; vl !== null; ) {
          switch (a = vl, s = a.alternate, l = a.flags, a.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && s !== null) {
                l = void 0, u = a, r = s.memoizedProps, s = s.memoizedState, c = u.stateNode;
                try {
                  var Ue = fa(
                    u.type,
                    r,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    Ue,
                    s
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (_e) {
                  wt(
                    u,
                    u.return,
                    _e
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = a.stateNode.containerInfo, u = l.nodeType, u === 9)
                  xr(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      xr(l);
                      break;
                    default:
                      l.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((l & 1024) !== 0) throw Error(D(163));
          }
          if (l = a.sibling, l !== null) {
            l.return = a.return, vl = l;
            break;
          }
          vl = a.return;
        }
  }
  function md(l, a, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        Qu(l, u), c & 4 && jo(5, u);
        break;
      case 1:
        if (Qu(l, u), c & 4)
          if (l = u.stateNode, a === null)
            try {
              l.componentDidMount();
            } catch (y) {
              wt(u, u.return, y);
            }
          else {
            var r = fa(
              u.type,
              a.memoizedProps
            );
            a = a.memoizedState;
            try {
              l.componentDidUpdate(
                r,
                a,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              wt(
                u,
                u.return,
                y
              );
            }
          }
        c & 64 && nv(u), c & 512 && Lo(u, u.return);
        break;
      case 3:
        if (Qu(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (a = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                a = u.child.stateNode;
                break;
              case 1:
                a = u.child.stateNode;
            }
          try {
            Qs(l, a);
          } catch (y) {
            wt(u, u.return, y);
          }
        }
        break;
      case 27:
        a === null && c & 4 && uv(u);
      case 26:
      case 5:
        Qu(l, u), a === null && c & 4 && Wy(u), c & 512 && Lo(u, u.return);
        break;
      case 12:
        Qu(l, u);
        break;
      case 13:
        Qu(l, u), c & 4 && at(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = gv.bind(
          null,
          u
        ), Tm(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || Ba, !c) {
          a = a !== null && a.memoizedState !== null || al, r = Ba;
          var s = al;
          Ba = c, (al = a) && !s ? Kt(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : Qu(l, u), Ba = r, al = s;
        }
        break;
      case 30:
        break;
      default:
        Qu(l, u);
    }
  }
  function Py(l) {
    var a = l.alternate;
    a !== null && (l.alternate = null, Py(a)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (a = l.stateNode, a !== null && Ae(a)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Zt = null, Mn = !1;
  function sa(l, a, u) {
    for (u = u.child; u !== null; )
      em(l, a, u), u = u.sibling;
  }
  function em(l, a, u) {
    if (dl && typeof dl.onCommitFiberUnmount == "function")
      try {
        dl.onCommitFiberUnmount(bl, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        al || qa(u, a), sa(
          l,
          a,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        al || qa(u, a);
        var c = Zt, r = Mn;
        Xl(u.type) && (Zt = u.stateNode, Mn = !1), sa(
          l,
          a,
          u
        ), me(u.stateNode), Zt = c, Mn = r;
        break;
      case 5:
        al || qa(u, a);
      case 6:
        if (c = Zt, r = Mn, Zt = null, sa(
          l,
          a,
          u
        ), Zt = c, Mn = r, Zt !== null)
          if (Mn)
            try {
              (Zt.nodeType === 9 ? Zt.body : Zt.nodeName === "HTML" ? Zt.ownerDocument.body : Zt).removeChild(u.stateNode);
            } catch (s) {
              wt(
                u,
                a,
                s
              );
            }
          else
            try {
              Zt.removeChild(u.stateNode);
            } catch (s) {
              wt(
                u,
                a,
                s
              );
            }
        break;
      case 18:
        Zt !== null && (Mn ? (l = Zt, Rv(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), uf(l)) : Rv(Zt, u.stateNode));
        break;
      case 4:
        c = Zt, r = Mn, Zt = u.stateNode.containerInfo, Mn = !0, sa(
          l,
          a,
          u
        ), Zt = c, Mn = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        al || _i(2, u, a), al || _i(4, u, a), sa(
          l,
          a,
          u
        );
        break;
      case 1:
        al || (qa(u, a), c = u.stateNode, typeof c.componentWillUnmount == "function" && hd(
          u,
          a,
          c
        )), sa(
          l,
          a,
          u
        );
        break;
      case 21:
        sa(
          l,
          a,
          u
        );
        break;
      case 22:
        al = (c = al) || u.memoizedState !== null, sa(
          l,
          a,
          u
        ), al = c;
        break;
      default:
        sa(
          l,
          a,
          u
        );
    }
  }
  function at(l, a) {
    if (a.memoizedState === null && (l = a.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        uf(l);
      } catch (u) {
        wt(a, a.return, u);
      }
  }
  function tm(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var a = l.stateNode;
        return a === null && (a = l.stateNode = new Iy()), a;
      case 22:
        return l = l.stateNode, a = l._retryCache, a === null && (a = l._retryCache = new Iy()), a;
      default:
        throw Error(D(435, l.tag));
    }
  }
  function br(l, a) {
    var u = tm(l);
    a.forEach(function(c) {
      var r = wg.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(r, r));
    });
  }
  function zn(l, a) {
    var u = a.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var r = u[c], s = l, y = a, m = y;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Xl(m.type)) {
                Zt = m.stateNode, Mn = !1;
                break e;
              }
              break;
            case 5:
              Zt = m.stateNode, Mn = !1;
              break e;
            case 3:
            case 4:
              Zt = m.stateNode.containerInfo, Mn = !0;
              break e;
          }
          m = m.return;
        }
        if (Zt === null) throw Error(D(160));
        em(s, y, r), Zt = null, Mn = !1, s = r.alternate, s !== null && (s.return = null), r.return = null;
      }
    if (a.subtreeFlags & 13878)
      for (a = a.child; a !== null; )
        Go(a, l), a = a.sibling;
  }
  var Qn = null;
  function Go(l, a) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        zn(a, l), en(l), c & 4 && (_i(3, l, l.return), jo(3, l), _i(5, l, l.return));
        break;
      case 1:
        zn(a, l), en(l), c & 512 && (al || u === null || qa(u, u.return)), c & 64 && Ba && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var r = Qn;
        if (zn(a, l), en(l), c & 512 && (al || u === null || qa(u, u.return)), c & 4) {
          var s = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, r = r.ownerDocument || r;
                  t: switch (c) {
                    case "title":
                      s = r.getElementsByTagName("title")[0], (!s || s[Mf] || s[jt] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = r.createElement(c), r.head.insertBefore(
                        s,
                        r.querySelector("head > title")
                      )), Y(s, c, u), s[jt] = l, ol(s), c = s;
                      break e;
                    case "link":
                      var y = tf(
                        "link",
                        "href",
                        r
                      ).get(c + (u.href || ""));
                      if (y) {
                        for (var m = 0; m < y.length; m++)
                          if (s = y[m], s.getAttribute("href") === (u.href == null || u.href === "" ? null : u.href) && s.getAttribute("rel") === (u.rel == null ? null : u.rel) && s.getAttribute("title") === (u.title == null ? null : u.title) && s.getAttribute("crossorigin") === (u.crossOrigin == null ? null : u.crossOrigin)) {
                            y.splice(m, 1);
                            break t;
                          }
                      }
                      s = r.createElement(c), Y(s, c, u), r.head.appendChild(s);
                      break;
                    case "meta":
                      if (y = tf(
                        "meta",
                        "content",
                        r
                      ).get(c + (u.content || ""))) {
                        for (m = 0; m < y.length; m++)
                          if (s = y[m], s.getAttribute("content") === (u.content == null ? null : "" + u.content) && s.getAttribute("name") === (u.name == null ? null : u.name) && s.getAttribute("property") === (u.property == null ? null : u.property) && s.getAttribute("http-equiv") === (u.httpEquiv == null ? null : u.httpEquiv) && s.getAttribute("charset") === (u.charSet == null ? null : u.charSet)) {
                            y.splice(m, 1);
                            break t;
                          }
                      }
                      s = r.createElement(c), Y(s, c, u), r.head.appendChild(s);
                      break;
                    default:
                      throw Error(D(468, c));
                  }
                  s[jt] = l, ol(s), c = s;
                }
                l.stateNode = c;
              } else
                Om(
                  r,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Gd(
                r,
                c,
                l.memoizedProps
              );
          else
            s !== c ? (s === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : s.count--, c === null ? Om(
              r,
              l.type,
              l.stateNode
            ) : Gd(
              r,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && zc(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        zn(a, l), en(l), c & 512 && (al || u === null || qa(u, u.return)), u !== null && c & 4 && zc(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (zn(a, l), en(l), c & 512 && (al || u === null || qa(u, u.return)), l.flags & 32) {
          r = l.stateNode;
          try {
            tc(r, "");
          } catch (G) {
            wt(l, l.return, G);
          }
        }
        c & 4 && l.stateNode != null && (r = l.memoizedProps, zc(
          l,
          r,
          u !== null ? u.memoizedProps : r
        )), c & 1024 && (yd = !0);
        break;
      case 6:
        if (zn(a, l), en(l), c & 4) {
          if (l.stateNode === null)
            throw Error(D(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (G) {
            wt(l, l.return, G);
          }
        }
        break;
      case 3:
        if (qr = null, r = Qn, Qn = Hl(a.containerInfo), zn(a, l), Qn = r, en(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            uf(a.containerInfo);
          } catch (G) {
            wt(l, l.return, G);
          }
        yd && (yd = !1, _c(l));
        break;
      case 4:
        c = Qn, Qn = Hl(
          l.stateNode.containerInfo
        ), zn(a, l), en(l), Qn = c;
        break;
      case 12:
        zn(a, l), en(l);
        break;
      case 13:
        zn(a, l), en(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (cm = Je()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, br(l, c)));
        break;
      case 22:
        r = l.memoizedState !== null;
        var b = u !== null && u.memoizedState !== null, x = Ba, $ = al;
        if (Ba = x || r, al = $ || b, zn(a, l), al = $, Ba = x, en(l), c & 8192)
          e: for (a = l.stateNode, a._visibility = r ? a._visibility & -2 : a._visibility | 1, r && (u === null || b || Ba || al || Zu(l)), u = null, a = l; ; ) {
            if (a.tag === 5 || a.tag === 26) {
              if (u === null) {
                b = u = a;
                try {
                  if (s = b.stateNode, r)
                    y = s.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    m = b.stateNode;
                    var I = b.memoizedProps.style, w = I != null && I.hasOwnProperty("display") ? I.display : null;
                    m.style.display = w == null || typeof w == "boolean" ? "" : ("" + w).trim();
                  }
                } catch (G) {
                  wt(b, b.return, G);
                }
              }
            } else if (a.tag === 6) {
              if (u === null) {
                b = a;
                try {
                  b.stateNode.nodeValue = r ? "" : b.memoizedProps;
                } catch (G) {
                  wt(b, b.return, G);
                }
              }
            } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === l) && a.child !== null) {
              a.child.return = a, a = a.child;
              continue;
            }
            if (a === l) break e;
            for (; a.sibling === null; ) {
              if (a.return === null || a.return === l) break e;
              u === a && (u = null), a = a.return;
            }
            u === a && (u = null), a.sibling.return = a.return, a = a.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, br(l, u))));
        break;
      case 19:
        zn(a, l), en(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, br(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        zn(a, l), en(l);
    }
  }
  function en(l) {
    var a = l.flags;
    if (a & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if (av(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(D(160));
        switch (u.tag) {
          case 27:
            var r = u.stateNode, s = Fy(l);
            Ci(l, s, r);
            break;
          case 5:
            var y = u.stateNode;
            u.flags & 32 && (tc(y, ""), u.flags &= -33);
            var m = Fy(l);
            Ci(l, m, y);
            break;
          case 3:
          case 4:
            var b = u.stateNode.containerInfo, x = Fy(l);
            ra(
              l,
              x,
              b
            );
            break;
          default:
            throw Error(D(161));
        }
      } catch ($) {
        wt(l, l.return, $);
      }
      l.flags &= -3;
    }
    a & 4096 && (l.flags &= -4097);
  }
  function _c(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var a = l;
        _c(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), l = l.sibling;
      }
  }
  function Qu(l, a) {
    if (a.subtreeFlags & 8772)
      for (a = a.child; a !== null; )
        md(l, a.alternate, a), a = a.sibling;
  }
  function Zu(l) {
    for (l = l.child; l !== null; ) {
      var a = l;
      switch (a.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          _i(4, a, a.return), Zu(a);
          break;
        case 1:
          qa(a, a.return);
          var u = a.stateNode;
          typeof u.componentWillUnmount == "function" && hd(
            a,
            a.return,
            u
          ), Zu(a);
          break;
        case 27:
          me(a.stateNode);
        case 26:
        case 5:
          qa(a, a.return), Zu(a);
          break;
        case 22:
          a.memoizedState === null && Zu(a);
          break;
        case 30:
          Zu(a);
          break;
        default:
          Zu(a);
      }
      l = l.sibling;
    }
  }
  function Kt(l, a, u) {
    for (u = u && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
      var c = a.alternate, r = l, s = a, y = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          Kt(
            r,
            s,
            u
          ), jo(4, s);
          break;
        case 1:
          if (Kt(
            r,
            s,
            u
          ), c = s, r = c.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (x) {
              wt(c, c.return, x);
            }
          if (c = s, r = c.updateQueue, r !== null) {
            var m = c.stateNode;
            try {
              var b = r.shared.hiddenCallbacks;
              if (b !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < b.length; r++)
                  Mo(b[r], m);
            } catch (x) {
              wt(c, c.return, x);
            }
          }
          u && y & 64 && nv(s), Lo(s, s.return);
          break;
        case 27:
          uv(s);
        case 26:
        case 5:
          Kt(
            r,
            s,
            u
          ), u && c === null && y & 4 && Wy(s), Lo(s, s.return);
          break;
        case 12:
          Kt(
            r,
            s,
            u
          );
          break;
        case 13:
          Kt(
            r,
            s,
            u
          ), u && y & 4 && at(r, s);
          break;
        case 22:
          s.memoizedState === null && Kt(
            r,
            s,
            u
          ), Lo(s, s.return);
          break;
        case 30:
          break;
        default:
          Kt(
            r,
            s,
            u
          );
      }
      a = a.sibling;
    }
  }
  function lm(l, a) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && Ri(u));
  }
  function da(l, a) {
    l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Ri(l));
  }
  function Ya(l, a, u, c) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; )
        Ku(
          l,
          a,
          u,
          c
        ), a = a.sibling;
  }
  function Ku(l, a, u, c) {
    var r = a.flags;
    switch (a.tag) {
      case 0:
      case 11:
      case 15:
        Ya(
          l,
          a,
          u,
          c
        ), r & 2048 && jo(9, a);
        break;
      case 1:
        Ya(
          l,
          a,
          u,
          c
        );
        break;
      case 3:
        Ya(
          l,
          a,
          u,
          c
        ), r & 2048 && (l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Ri(l)));
        break;
      case 12:
        if (r & 2048) {
          Ya(
            l,
            a,
            u,
            c
          ), l = a.stateNode;
          try {
            var s = a.memoizedProps, y = s.id, m = s.onPostCommit;
            typeof m == "function" && m(
              y,
              a.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (b) {
            wt(a, a.return, b);
          }
        } else
          Ya(
            l,
            a,
            u,
            c
          );
        break;
      case 13:
        Ya(
          l,
          a,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        s = a.stateNode, y = a.alternate, a.memoizedState !== null ? s._visibility & 2 ? Ya(
          l,
          a,
          u,
          c
        ) : Ui(l, a) : s._visibility & 2 ? Ya(
          l,
          a,
          u,
          c
        ) : (s._visibility |= 2, Cc(
          l,
          a,
          u,
          c,
          (a.subtreeFlags & 10256) !== 0
        )), r & 2048 && lm(y, a);
        break;
      case 24:
        Ya(
          l,
          a,
          u,
          c
        ), r & 2048 && da(a.alternate, a);
        break;
      default:
        Ya(
          l,
          a,
          u,
          c
        );
    }
  }
  function Cc(l, a, u, c, r) {
    for (r = r && (a.subtreeFlags & 10256) !== 0, a = a.child; a !== null; ) {
      var s = l, y = a, m = u, b = c, x = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Cc(
            s,
            y,
            m,
            b,
            r
          ), jo(8, y);
          break;
        case 23:
          break;
        case 22:
          var $ = y.stateNode;
          y.memoizedState !== null ? $._visibility & 2 ? Cc(
            s,
            y,
            m,
            b,
            r
          ) : Ui(
            s,
            y
          ) : ($._visibility |= 2, Cc(
            s,
            y,
            m,
            b,
            r
          )), r && x & 2048 && lm(
            y.alternate,
            y
          );
          break;
        case 24:
          Cc(
            s,
            y,
            m,
            b,
            r
          ), r && x & 2048 && da(y.alternate, y);
          break;
        default:
          Cc(
            s,
            y,
            m,
            b,
            r
          );
      }
      a = a.sibling;
    }
  }
  function Ui(l, a) {
    if (a.subtreeFlags & 10256)
      for (a = a.child; a !== null; ) {
        var u = l, c = a, r = c.flags;
        switch (c.tag) {
          case 22:
            Ui(u, c), r & 2048 && lm(
              c.alternate,
              c
            );
            break;
          case 24:
            Ui(u, c), r & 2048 && da(c.alternate, c);
            break;
          default:
            Ui(u, c);
        }
        a = a.sibling;
      }
  }
  var St = 8192;
  function Hi(l) {
    if (l.subtreeFlags & St)
      for (l = l.child; l !== null; )
        Ul(l), l = l.sibling;
  }
  function Ul(l) {
    switch (l.tag) {
      case 26:
        Hi(l), l.flags & St && l.memoizedState !== null && Dv(
          Qn,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Hi(l);
        break;
      case 3:
      case 4:
        var a = Qn;
        Qn = Hl(l.stateNode.containerInfo), Hi(l), Qn = a;
        break;
      case 22:
        l.memoizedState === null && (a = l.alternate, a !== null && a.memoizedState !== null ? (a = St, St = 16777216, Hi(l), St = a) : Hi(l));
        break;
      default:
        Hi(l);
    }
  }
  function cv(l) {
    var a = l.alternate;
    if (a !== null && (l = a.child, l !== null)) {
      a.child = null;
      do
        a = l.sibling, l.sibling = null, l = a;
      while (l !== null);
    }
  }
  function Vo(l) {
    var a = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (a !== null)
        for (var u = 0; u < a.length; u++) {
          var c = a[u];
          vl = c, Zn(
            c,
            l
          );
        }
      cv(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        pd(l), l = l.sibling;
  }
  function pd(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Vo(l), l.flags & 2048 && _i(9, l, l.return);
        break;
      case 3:
        Vo(l);
        break;
      case 12:
        Vo(l);
        break;
      case 22:
        var a = l.stateNode;
        l.memoizedState !== null && a._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (a._visibility &= -3, Tr(l)) : Vo(l);
        break;
      default:
        Vo(l);
    }
  }
  function Tr(l) {
    var a = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (a !== null)
        for (var u = 0; u < a.length; u++) {
          var c = a[u];
          vl = c, Zn(
            c,
            l
          );
        }
      cv(l);
    }
    for (l = l.child; l !== null; ) {
      switch (a = l, a.tag) {
        case 0:
        case 11:
        case 15:
          _i(8, a, a.return), Tr(a);
          break;
        case 22:
          u = a.stateNode, u._visibility & 2 && (u._visibility &= -3, Tr(a));
          break;
        default:
          Tr(a);
      }
      l = l.sibling;
    }
  }
  function Zn(l, a) {
    for (; vl !== null; ) {
      var u = vl;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          _i(8, u, a);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          Ri(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, vl = c;
      else
        e: for (u = l; vl !== null; ) {
          c = vl;
          var r = c.sibling, s = c.return;
          if (Py(c), c === u) {
            vl = null;
            break e;
          }
          if (r !== null) {
            r.return = s, vl = r;
            break e;
          }
          vl = s;
        }
    }
  }
  var ov = {
    getCacheForType: function(l) {
      var a = Gl(ml), u = a.data.get(l);
      return u === void 0 && (u = l(), a.data.set(l, u)), u;
    }
  }, nm = typeof WeakMap == "function" ? WeakMap : Map, Ct = 0, Nt = null, ut = null, pt = 0, bt = 0, _n = null, Ju = !1, xi = !1, am = !1, ku = 0, ul = 0, Ni = 0, wi = 0, um = 0, Rl = 0, Xo = 0, Er = null, fn = null, im = !1, cm = 0, vd = 1 / 0, gd = null, uu = null, Vl = 0, qi = null, Bi = null, Qo = 0, Cn = 0, Sd = null, om = null, Zo = 0, bd = null;
  function Kn() {
    if ((Ct & 2) !== 0 && pt !== 0)
      return pt & -pt;
    if (V.T !== null) {
      var l = Ai;
      return l !== 0 ? l : Cd();
    }
    return Wa();
  }
  function fv() {
    Rl === 0 && (Rl = (pt & 536870912) === 0 || $e ? C() : 536870912);
    var l = pl.current;
    return l !== null && (l.flags |= 32), Rl;
  }
  function Un(l, a, u) {
    (l === Nt && (bt === 2 || bt === 9) || l.cancelPendingCommit !== null) && (ja(l, 0), $u(
      l,
      pt,
      Rl,
      !1
    )), Te(l, u), ((Ct & 2) === 0 || l !== Nt) && (l === Nt && ((Ct & 2) === 0 && (wi |= u), ul === 4 && $u(
      l,
      pt,
      Rl,
      !1
    )), La(l));
  }
  function rv(l, a, u) {
    if ((Ct & 6) !== 0) throw Error(D(327));
    var c = !u && (a & 124) === 0 && (a & l.expiredLanes) === 0 || ea(l, a), r = c ? Ed(l, a) : Uc(l, a, !0), s = c;
    do {
      if (r === 0) {
        xi && !c && $u(l, a, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, s && !Td(u)) {
          r = Uc(l, a, !1), s = !1;
          continue;
        }
        if (r === 2) {
          if (s = a, l.errorRecoveryDisabledLanes & s)
            var y = 0;
          else
            y = l.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            a = y;
            e: {
              var m = l;
              r = Er;
              var b = m.current.memoizedState.isDehydrated;
              if (b && (ja(m, y).flags |= 256), y = Uc(
                m,
                y,
                !1
              ), y !== 2) {
                if (am && !b) {
                  m.errorRecoveryDisabledLanes |= s, wi |= s, r = 4;
                  break e;
                }
                s = fn, fn = r, s !== null && (fn === null ? fn = s : fn.push.apply(
                  fn,
                  s
                ));
              }
              r = y;
            }
            if (s = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          ja(l, 0), $u(l, a, 0, !0);
          break;
        }
        e: {
          switch (c = l, s = r, s) {
            case 0:
            case 1:
              throw Error(D(345));
            case 4:
              if ((a & 4194048) !== a) break;
            case 6:
              $u(
                c,
                a,
                Rl,
                !Ju
              );
              break e;
            case 2:
              fn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(D(329));
          }
          if ((a & 62914560) === a && (r = cm + 300 - Je(), 10 < r)) {
            if ($u(
              c,
              a,
              Rl,
              !Ju
            ), yn(c, 0, !0) !== 0) break e;
            c.timeoutHandle = ou(
              Ko.bind(
                null,
                c,
                u,
                fn,
                gd,
                im,
                a,
                Rl,
                wi,
                Xo,
                Ju,
                s,
                2,
                -0,
                0
              ),
              r
            );
            break e;
          }
          Ko(
            c,
            u,
            fn,
            gd,
            im,
            a,
            Rl,
            wi,
            Xo,
            Ju,
            s,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    La(l);
  }
  function Ko(l, a, u, c, r, s, y, m, b, x, $, I, w, G) {
    if (l.timeoutHandle = -1, I = a.subtreeFlags, (I & 8192 || (I & 16785408) === 16785408) && (lf = { stylesheets: null, count: 0, unsuspend: Ov }, Ul(a), I = Mv(), I !== null)) {
      l.cancelPendingCommit = I(
        hv.bind(
          null,
          l,
          a,
          s,
          u,
          c,
          r,
          y,
          m,
          b,
          $,
          1,
          w,
          G
        )
      ), $u(l, s, y, !x);
      return;
    }
    hv(
      l,
      a,
      s,
      u,
      c,
      r,
      y,
      m,
      b
    );
  }
  function Td(l) {
    for (var a = l; ; ) {
      var u = a.tag;
      if ((u === 0 || u === 11 || u === 15) && a.flags & 16384 && (u = a.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var r = u[c], s = r.getSnapshot;
          r = r.value;
          try {
            if (!un(s(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = a.child, a.subtreeFlags & 16384 && u !== null)
        u.return = a, a = u;
      else {
        if (a === l) break;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === l) return !0;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
    }
    return !0;
  }
  function $u(l, a, u, c) {
    a &= ~um, a &= ~wi, l.suspendedLanes |= a, l.pingedLanes &= ~a, c && (l.warmLanes |= a), c = l.expirationTimes;
    for (var r = a; 0 < r; ) {
      var s = 31 - cl(r), y = 1 << s;
      c[s] = -1, r &= ~y;
    }
    u !== 0 && Ge(l, u, a);
  }
  function Rr() {
    return (Ct & 6) === 0 ? (Wu(0), !1) : !0;
  }
  function Jo() {
    if (ut !== null) {
      if (bt === 0)
        var l = ut.return;
      else
        l = ut, _a = wu = null, _o(l), An = null, xo = 0, l = ut;
      for (; l !== null; )
        lv(l.alternate, l), l = l.return;
      ut = null;
    }
  }
  function ja(l, a) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, gm(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Jo(), Nt = l, ut = u = Oa(l.current, null), pt = a, bt = 0, _n = null, Ju = !1, xi = ea(l, a), am = !1, Xo = Rl = um = wi = Ni = ul = 0, fn = Er = null, im = !1, (a & 8) !== 0 && (a |= a & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= a; 0 < c; ) {
        var r = 31 - cl(c), s = 1 << r;
        a |= l[r], c &= ~s;
      }
    return ku = a, Ra(), u;
  }
  function ko(l, a) {
    Ve = null, V.H = yr, a === vc || a === Ro ? (a = Vs(), bt = 3) : a === If ? (a = Vs(), bt = 4) : bt = a === Ly ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, _n = a, ut === null && (ul = 1, Oc(
      l,
      Ln(a, l.current)
    ));
  }
  function fm() {
    var l = V.H;
    return V.H = yr, l === null ? yr : l;
  }
  function sv() {
    var l = V.A;
    return V.A = ov, l;
  }
  function Yi() {
    ul = 4, Ju || (pt & 4194048) !== pt && pl.current !== null || (xi = !0), (Ni & 134217727) === 0 && (wi & 134217727) === 0 || Nt === null || $u(
      Nt,
      pt,
      Rl,
      !1
    );
  }
  function Uc(l, a, u) {
    var c = Ct;
    Ct |= 2;
    var r = fm(), s = sv();
    (Nt !== l || pt !== a) && (gd = null, ja(l, a)), a = !1;
    var y = ul;
    e: do
      try {
        if (bt !== 0 && ut !== null) {
          var m = ut, b = _n;
          switch (bt) {
            case 8:
              Jo(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              pl.current === null && (a = !0);
              var x = bt;
              if (bt = 0, _n = null, Hc(l, m, b, x), u && xi) {
                y = 0;
                break e;
              }
              break;
            default:
              x = bt, bt = 0, _n = null, Hc(l, m, b, x);
          }
        }
        dv(), y = ul;
        break;
      } catch ($) {
        ko(l, $);
      }
    while (!0);
    return a && l.shellSuspendCounter++, _a = wu = null, Ct = c, V.H = r, V.A = s, ut === null && (Nt = null, pt = 0, Ra()), y;
  }
  function dv() {
    for (; ut !== null; ) Rd(ut);
  }
  function Ed(l, a) {
    var u = Ct;
    Ct |= 2;
    var c = fm(), r = sv();
    Nt !== l || pt !== a ? (gd = null, vd = Je() + 500, ja(l, a)) : xi = ea(
      l,
      a
    );
    e: do
      try {
        if (bt !== 0 && ut !== null) {
          a = ut;
          var s = _n;
          t: switch (bt) {
            case 1:
              bt = 0, _n = null, Hc(l, a, s, 1);
              break;
            case 2:
            case 9:
              if (oy(s)) {
                bt = 0, _n = null, sm(a);
                break;
              }
              a = function() {
                bt !== 2 && bt !== 9 || Nt !== l || (bt = 7), La(l);
              }, s.then(a, a);
              break e;
            case 3:
              bt = 7;
              break e;
            case 4:
              bt = 5;
              break e;
            case 7:
              oy(s) ? (bt = 0, _n = null, sm(a)) : (bt = 0, _n = null, Hc(l, a, s, 7));
              break;
            case 5:
              var y = null;
              switch (ut.tag) {
                case 26:
                  y = ut.memoizedState;
                case 5:
                case 27:
                  var m = ut;
                  if (!y || Dm(y)) {
                    bt = 0, _n = null;
                    var b = m.sibling;
                    if (b !== null) ut = b;
                    else {
                      var x = m.return;
                      x !== null ? (ut = x, Ad(x)) : ut = null;
                    }
                    break t;
                  }
              }
              bt = 0, _n = null, Hc(l, a, s, 5);
              break;
            case 6:
              bt = 0, _n = null, Hc(l, a, s, 6);
              break;
            case 8:
              Jo(), ul = 6;
              break e;
            default:
              throw Error(D(462));
          }
        }
        rm();
        break;
      } catch ($) {
        ko(l, $);
      }
    while (!0);
    return _a = wu = null, V.H = c, V.A = r, Ct = u, ut !== null ? 0 : (Nt = null, pt = 0, Ra(), ul);
  }
  function rm() {
    for (; ut !== null && !It(); )
      Rd(ut);
  }
  function Rd(l) {
    var a = Jy(l.alternate, l, ku);
    l.memoizedProps = l.pendingProps, a === null ? Ad(l) : ut = a;
  }
  function sm(l) {
    var a = l, u = a.alternate;
    switch (a.tag) {
      case 15:
      case 0:
        a = Vy(
          u,
          a,
          a.pendingProps,
          a.type,
          void 0,
          pt
        );
        break;
      case 11:
        a = Vy(
          u,
          a,
          a.pendingProps,
          a.type.render,
          a.ref,
          pt
        );
        break;
      case 5:
        _o(a);
      default:
        lv(u, a), a = ut = ws(a, ku), a = Jy(u, a, ku);
    }
    l.memoizedProps = l.pendingProps, a === null ? Ad(l) : ut = a;
  }
  function Hc(l, a, u, c) {
    _a = wu = null, _o(a), An = null, xo = 0;
    var r = a.return;
    try {
      if (Xn(
        l,
        r,
        a,
        u,
        pt
      )) {
        ul = 1, Oc(
          l,
          Ln(u, l.current)
        ), ut = null;
        return;
      }
    } catch (s) {
      if (r !== null) throw ut = r, s;
      ul = 1, Oc(
        l,
        Ln(u, l.current)
      ), ut = null;
      return;
    }
    a.flags & 32768 ? ($e || c === 1 ? l = !0 : xi || (pt & 536870912) !== 0 ? l = !1 : (Ju = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = pl.current, c !== null && c.tag === 13 && (c.flags |= 16384))), dm(a, l)) : Ad(a);
  }
  function Ad(l) {
    var a = l;
    do {
      if ((a.flags & 32768) !== 0) {
        dm(
          a,
          Ju
        );
        return;
      }
      l = a.return;
      var u = xt(
        a.alternate,
        a,
        ku
      );
      if (u !== null) {
        ut = u;
        return;
      }
      if (a = a.sibling, a !== null) {
        ut = a;
        return;
      }
      ut = a = l;
    } while (a !== null);
    ul === 0 && (ul = 5);
  }
  function dm(l, a) {
    do {
      var u = $y(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, ut = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !a && (l = l.sibling, l !== null)) {
        ut = l;
        return;
      }
      ut = l = u;
    } while (l !== null);
    ul = 6, ut = null;
  }
  function hv(l, a, u, c, r, s, y, m, b) {
    l.cancelPendingCommit = null;
    do
      Dd();
    while (Vl !== 0);
    if ((Ct & 6) !== 0) throw Error(D(327));
    if (a !== null) {
      if (a === l.current) throw Error(D(177));
      if (s = a.lanes | a.childLanes, s |= Xf, Ie(
        l,
        u,
        s,
        y,
        m,
        b
      ), l === Nt && (ut = Nt = null, pt = 0), Bi = a, qi = l, Qo = u, Cn = s, Sd = r, om = c, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, qg(Ce, function() {
        return pv(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || c) {
        c = V.T, V.T = null, r = j.p, j.p = 2, y = Ct, Ct |= 4;
        try {
          iv(l, a, u);
        } finally {
          Ct = y, j.p = r, V.T = c;
        }
      }
      Vl = 1, yv(), mv(), Ar();
    }
  }
  function yv() {
    if (Vl === 1) {
      Vl = 0;
      var l = qi, a = Bi, u = (a.flags & 13878) !== 0;
      if ((a.subtreeFlags & 13878) !== 0 || u) {
        u = V.T, V.T = null;
        var c = j.p;
        j.p = 2;
        var r = Ct;
        Ct |= 4;
        try {
          Go(a, l);
          var s = Hr, y = Gf(l.containerInfo), m = s.focusedElem, b = s.selectionRange;
          if (y !== m && m && m.ownerDocument && Xt(
            m.ownerDocument.documentElement,
            m
          )) {
            if (b !== null && Cs(m)) {
              var x = b.start, $ = b.end;
              if ($ === void 0 && ($ = x), "selectionStart" in m)
                m.selectionStart = x, m.selectionEnd = Math.min(
                  $,
                  m.value.length
                );
              else {
                var I = m.ownerDocument || document, w = I && I.defaultView || window;
                if (w.getSelection) {
                  var G = w.getSelection(), Ue = m.textContent.length, _e = Math.min(b.start, Ue), Mt = b.end === void 0 ? _e : Math.min(b.end, Ue);
                  !G.extend && _e > Mt && (y = Mt, Mt = _e, _e = y);
                  var U = pi(
                    m,
                    _e
                  ), z = pi(
                    m,
                    Mt
                  );
                  if (U && z && (G.rangeCount !== 1 || G.anchorNode !== U.node || G.anchorOffset !== U.offset || G.focusNode !== z.node || G.focusOffset !== z.offset)) {
                    var N = I.createRange();
                    N.setStart(U.node, U.offset), G.removeAllRanges(), _e > Mt ? (G.addRange(N), G.extend(z.node, z.offset)) : (N.setEnd(z.node, z.offset), G.addRange(N));
                  }
                }
              }
            }
            for (I = [], G = m; G = G.parentNode; )
              G.nodeType === 1 && I.push({
                element: G,
                left: G.scrollLeft,
                top: G.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < I.length; m++) {
              var F = I[m];
              F.element.scrollLeft = F.left, F.element.scrollTop = F.top;
            }
          }
          jr = !!vm, Hr = vm = null;
        } finally {
          Ct = r, j.p = c, V.T = u;
        }
      }
      l.current = a, Vl = 2;
    }
  }
  function mv() {
    if (Vl === 2) {
      Vl = 0;
      var l = qi, a = Bi, u = (a.flags & 8772) !== 0;
      if ((a.subtreeFlags & 8772) !== 0 || u) {
        u = V.T, V.T = null;
        var c = j.p;
        j.p = 2;
        var r = Ct;
        Ct |= 4;
        try {
          md(l, a.alternate, a);
        } finally {
          Ct = r, j.p = c, V.T = u;
        }
      }
      Vl = 3;
    }
  }
  function Ar() {
    if (Vl === 4 || Vl === 3) {
      Vl = 0, At();
      var l = qi, a = Bi, u = Qo, c = om;
      (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? Vl = 5 : (Vl = 0, Bi = qi = null, Od(l, l.pendingLanes));
      var r = l.pendingLanes;
      if (r === 0 && (uu = null), hl(u), a = a.stateNode, dl && typeof dl.onCommitFiberRoot == "function")
        try {
          dl.onCommitFiberRoot(
            bl,
            a,
            void 0,
            (a.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        a = V.T, r = j.p, j.p = 2, V.T = null;
        try {
          for (var s = l.onRecoverableError, y = 0; y < c.length; y++) {
            var m = c[y];
            s(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          V.T = a, j.p = r;
        }
      }
      (Qo & 3) !== 0 && Dd(), La(l), r = l.pendingLanes, (u & 4194090) !== 0 && (r & 42) !== 0 ? l === bd ? Zo++ : (Zo = 0, bd = l) : Zo = 0, Wu(0);
    }
  }
  function Od(l, a) {
    (l.pooledCacheLanes &= a) === 0 && (a = l.pooledCache, a != null && (l.pooledCache = null, Ri(a)));
  }
  function Dd(l) {
    return yv(), mv(), Ar(), pv();
  }
  function pv() {
    if (Vl !== 5) return !1;
    var l = qi, a = Cn;
    Cn = 0;
    var u = hl(Qo), c = V.T, r = j.p;
    try {
      j.p = 32 > u ? 32 : u, V.T = null, u = Sd, Sd = null;
      var s = qi, y = Qo;
      if (Vl = 0, Bi = qi = null, Qo = 0, (Ct & 6) !== 0) throw Error(D(331));
      var m = Ct;
      if (Ct |= 4, pd(s.current), Ku(
        s,
        s.current,
        y,
        u
      ), Ct = m, Wu(0, !1), dl && typeof dl.onPostCommitFiberRoot == "function")
        try {
          dl.onPostCommitFiberRoot(bl, s);
        } catch {
        }
      return !0;
    } finally {
      j.p = r, V.T = c, Od(l, a);
    }
  }
  function hm(l, a, u) {
    a = Ln(u, a), a = id(l.stateNode, a, 2), l = Tn(l, a, 2), l !== null && (Te(l, 2), La(l));
  }
  function wt(l, a, u) {
    if (l.tag === 3)
      hm(l, l, u);
    else
      for (; a !== null; ) {
        if (a.tag === 3) {
          hm(
            a,
            l,
            u
          );
          break;
        } else if (a.tag === 1) {
          var c = a.stateNode;
          if (typeof a.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (uu === null || !uu.has(c))) {
            l = Ln(u, l), u = Ip(2), c = Tn(a, u, 2), c !== null && (jy(
              u,
              c,
              a,
              l
            ), Te(c, 2), La(c));
            break;
          }
        }
        a = a.return;
      }
  }
  function Or(l, a, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new nm();
      var r = /* @__PURE__ */ new Set();
      c.set(a, r);
    } else
      r = c.get(a), r === void 0 && (r = /* @__PURE__ */ new Set(), c.set(a, r));
    r.has(u) || (am = !0, r.add(u), l = vv.bind(null, l, a, u), a.then(l, l));
  }
  function vv(l, a, u) {
    var c = l.pingCache;
    c !== null && c.delete(a), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, Nt === l && (pt & u) === u && (ul === 4 || ul === 3 && (pt & 62914560) === pt && 300 > Je() - cm ? (Ct & 2) === 0 && ja(l, 0) : um |= u, Xo === pt && (Xo = 0)), La(l);
  }
  function Md(l, a) {
    a === 0 && (a = oe()), l = Hu(l, a), l !== null && (Te(l, a), La(l));
  }
  function gv(l) {
    var a = l.memoizedState, u = 0;
    a !== null && (u = a.retryLane), Md(l, u);
  }
  function wg(l, a) {
    var u = 0;
    switch (l.tag) {
      case 13:
        var c = l.stateNode, r = l.memoizedState;
        r !== null && (u = r.retryLane);
        break;
      case 19:
        c = l.stateNode;
        break;
      case 22:
        c = l.stateNode._retryCache;
        break;
      default:
        throw Error(D(314));
    }
    c !== null && c.delete(a), Md(l, u);
  }
  function qg(l, a) {
    return it(l, a);
  }
  var zd = null, $o = null, Dr = !1, Wo = !1, Mr = !1, ji = 0;
  function La(l) {
    l !== $o && l.next === null && ($o === null ? zd = $o = l : $o = $o.next = l), Wo = !0, Dr || (Dr = !0, _d());
  }
  function Wu(l, a) {
    if (!Mr && Wo) {
      Mr = !0;
      do
        for (var u = !1, c = zd; c !== null; ) {
          if (l !== 0) {
            var r = c.pendingLanes;
            if (r === 0) var s = 0;
            else {
              var y = c.suspendedLanes, m = c.pingedLanes;
              s = (1 << 31 - cl(42 | l) + 1) - 1, s &= r & ~(y & ~m), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (u = !0, Sv(c, s));
          } else
            s = pt, s = yn(
              c,
              c === Nt ? s : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), (s & 3) === 0 || ea(c, s) || (u = !0, Sv(c, s));
          c = c.next;
        }
      while (u);
      Mr = !1;
    }
  }
  function Bg() {
    ym();
  }
  function ym() {
    Wo = Dr = !1;
    var l = 0;
    ji !== 0 && (Bd() && (l = ji), ji = 0);
    for (var a = Je(), u = null, c = zd; c !== null; ) {
      var r = c.next, s = zr(c, a);
      s === 0 ? (c.next = null, u === null ? zd = r : u.next = r, r === null && ($o = u)) : (u = c, (l !== 0 || (s & 3) !== 0) && (Wo = !0)), c = r;
    }
    Wu(l);
  }
  function zr(l, a) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, r = l.expirationTimes, s = l.pendingLanes & -62914561; 0 < s; ) {
      var y = 31 - cl(s), m = 1 << y, b = r[y];
      b === -1 ? ((m & u) === 0 || (m & c) !== 0) && (r[y] = p(m, a)) : b <= a && (l.expiredLanes |= m), s &= ~m;
    }
    if (a = Nt, u = pt, u = yn(
      l,
      l === a ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === a && (bt === 2 || bt === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && mt(c), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || ea(l, u)) {
      if (a = u & -u, a === l.callbackPriority) return a;
      switch (c !== null && mt(c), hl(u)) {
        case 2:
        case 8:
          u = sl;
          break;
        case 32:
          u = Ce;
          break;
        case 268435456:
          u = $a;
          break;
        default:
          u = Ce;
      }
      return c = mm.bind(null, l), u = it(u, c), l.callbackPriority = a, l.callbackNode = u, a;
    }
    return c !== null && c !== null && mt(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function mm(l, a) {
    if (Vl !== 0 && Vl !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (Dd() && l.callbackNode !== u)
      return null;
    var c = pt;
    return c = yn(
      l,
      l === Nt ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (rv(l, c, a), zr(l, Je()), l.callbackNode != null && l.callbackNode === u ? mm.bind(null, l) : null);
  }
  function Sv(l, a) {
    if (Dd()) return null;
    rv(l, a, !0);
  }
  function _d() {
    Lg(function() {
      (Ct & 6) !== 0 ? it(
        Yt,
        Bg
      ) : ym();
    });
  }
  function Cd() {
    return ji === 0 && (ji = C()), ji;
  }
  function Fo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : Hf("" + l);
  }
  function Ud(l, a) {
    var u = a.ownerDocument.createElement("input");
    return u.name = a.name, u.value = a.value, l.id && u.setAttribute("form", l.id), a.parentNode.insertBefore(u, a), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Hd(l, a, u, c, r) {
    if (a === "submit" && u && u.stateNode === r) {
      var s = Fo(
        (r[Wl] || null).action
      ), y = c.submitter;
      y && (a = (a = y[Wl] || null) ? Fo(a.formAction) : y.getAttribute("formAction"), a !== null && (s = a, y = null));
      var m = new wf(
        "action",
        "action",
        null,
        c,
        r
      );
      l.push({
        event: m,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (ji !== 0) {
                  var b = y ? Ud(r, y) : new FormData(r);
                  zy(
                    u,
                    {
                      pending: !0,
                      data: b,
                      method: r.method,
                      action: s
                    },
                    null,
                    b
                  );
                }
              } else
                typeof s == "function" && (m.preventDefault(), b = y ? Ud(r, y) : new FormData(r), zy(
                  u,
                  {
                    pending: !0,
                    data: b,
                    method: r.method,
                    action: s
                  },
                  s,
                  b
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var xd = 0; xd < xs.length; xd++) {
    var il = xs[xd], pm = il.toLowerCase(), Yg = il[0].toUpperCase() + il.slice(1);
    vn(
      pm,
      "on" + Yg
    );
  }
  vn(Vf, "onAnimationEnd"), vn(Gp, "onAnimationIteration"), vn(Ih, "onAnimationStart"), vn("dblclick", "onDoubleClick"), vn("focusin", "onFocus"), vn("focusout", "onBlur"), vn(Ug, "onTransitionRun"), vn(Ph, "onTransitionStart"), vn(Hs, "onTransitionCancel"), vn(ey, "onTransitionEnd"), Pi("onMouseEnter", ["mouseout", "mouseover"]), Pi("onMouseLeave", ["mouseout", "mouseover"]), Pi("onPointerEnter", ["pointerout", "pointerover"]), Pi("onPointerLeave", ["pointerout", "pointerover"]), zl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), zl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), zl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), zl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), zl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), zl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var je = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), jg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(je)
  );
  function Fu(l, a) {
    a = (a & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], r = c.event;
      c = c.listeners;
      e: {
        var s = void 0;
        if (a)
          for (var y = c.length - 1; 0 <= y; y--) {
            var m = c[y], b = m.instance, x = m.currentTarget;
            if (m = m.listener, b !== s && r.isPropagationStopped())
              break e;
            s = m, r.currentTarget = x;
            try {
              s(r);
            } catch ($) {
              vr($);
            }
            r.currentTarget = null, s = b;
          }
        else
          for (y = 0; y < c.length; y++) {
            if (m = c[y], b = m.instance, x = m.currentTarget, m = m.listener, b !== s && r.isPropagationStopped())
              break e;
            s = m, r.currentTarget = x;
            try {
              s(r);
            } catch ($) {
              vr($);
            }
            r.currentTarget = null, s = b;
          }
      }
    }
  }
  function Qe(l, a) {
    var u = a[Dh];
    u === void 0 && (u = a[Dh] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (bv(a, l, 2, !1), u.add(c));
  }
  function Li(l, a, u) {
    var c = 0;
    a && (c |= 4), bv(
      u,
      l,
      c,
      a
    );
  }
  var xc = "_reactListening" + Math.random().toString(36).slice(2);
  function _r(l) {
    if (!l[xc]) {
      l[xc] = !0, Mh.forEach(function(u) {
        u !== "selectionchange" && (jg.has(u) || Li(u, !1, l), Li(u, !0, l));
      });
      var a = l.nodeType === 9 ? l : l.ownerDocument;
      a === null || a[xc] || (a[xc] = !0, Li("selectionchange", !1, a));
    }
  }
  function bv(l, a, u, c) {
    switch (Uv(a)) {
      case 2:
        var r = _v;
        break;
      case 8:
        r = Cv;
        break;
      default:
        r = Zd;
    }
    u = r.bind(
      null,
      a,
      u,
      l
    ), r = void 0, !ps || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (r = !0), c ? r !== void 0 ? l.addEventListener(a, u, {
      capture: !0,
      passive: r
    }) : l.addEventListener(a, u, !0) : r !== void 0 ? l.addEventListener(a, u, {
      passive: r
    }) : l.addEventListener(a, u, !1);
  }
  function Cr(l, a, u, c, r) {
    var s = c;
    if ((a & 1) === 0 && (a & 2) === 0 && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var y = c.tag;
        if (y === 3 || y === 4) {
          var m = c.stateNode.containerInfo;
          if (m === r) break;
          if (y === 4)
            for (y = c.return; y !== null; ) {
              var b = y.tag;
              if ((b === 3 || b === 4) && y.stateNode.containerInfo === r)
                return;
              y = y.return;
            }
          for (; m !== null; ) {
            if (y = ri(m), y === null) return;
            if (b = y.tag, b === 5 || b === 6 || b === 26 || b === 27) {
              c = s = y;
              continue e;
            }
            m = m.parentNode;
          }
        }
        c = c.return;
      }
    Cp(function() {
      var x = s, $ = lc(u), I = [];
      e: {
        var w = ty.get(l);
        if (w !== void 0) {
          var G = wf, Ue = l;
          switch (l) {
            case "keypress":
              if (Nf(u) === 0) break e;
            case "keydown":
            case "keyup":
              G = ic;
              break;
            case "focusin":
              Ue = "focus", G = jh;
              break;
            case "focusout":
              Ue = "blur", G = jh;
              break;
            case "beforeblur":
            case "afterblur":
              G = jh;
              break;
            case "click":
              if (u.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              G = Bf;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              G = xp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              G = Es;
              break;
            case Vf:
            case Gp:
            case Ih:
              G = Mg;
              break;
            case ey:
              G = pn;
              break;
            case "scroll":
            case "scrollend":
              G = Og;
              break;
            case "wheel":
              G = Rs;
              break;
            case "copy":
            case "cut":
            case "paste":
              G = _g;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              G = mn;
              break;
            case "toggle":
            case "beforetoggle":
              G = Xh;
          }
          var _e = (a & 4) !== 0, Mt = !_e && (l === "scroll" || l === "scrollend"), U = _e ? w !== null ? w + "Capture" : null : w;
          _e = [];
          for (var z = x, N; z !== null; ) {
            var F = z;
            if (N = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || N === null || U === null || (F = zu(z, U), F != null && _e.push(
              Hn(z, F, N)
            )), Mt) break;
            z = z.return;
          }
          0 < _e.length && (w = new G(
            w,
            Ue,
            null,
            u,
            $
          ), I.push({ event: w, listeners: _e }));
        }
      }
      if ((a & 7) === 0) {
        e: {
          if (w = l === "mouseover" || l === "pointerover", G = l === "mouseout" || l === "pointerout", w && u !== ms && (Ue = u.relatedTarget || u.fromElement) && (ri(Ue) || Ue[Ii]))
            break e;
          if ((G || w) && (w = $.window === $ ? $ : (w = $.ownerDocument) ? w.defaultView || w.parentWindow : window, G ? (Ue = u.relatedTarget || u.toElement, G = x, Ue = Ue ? ri(Ue) : null, Ue !== null && (Mt = ce(Ue), _e = Ue.tag, Ue !== Mt || _e !== 5 && _e !== 27 && _e !== 6) && (Ue = null)) : (G = null, Ue = x), G !== Ue)) {
            if (_e = Bf, F = "onMouseLeave", U = "onMouseEnter", z = "mouse", (l === "pointerout" || l === "pointerover") && (_e = mn, F = "onPointerLeave", U = "onPointerEnter", z = "pointer"), Mt = G == null ? w : Wc(G), N = Ue == null ? w : Wc(Ue), w = new _e(
              F,
              z + "leave",
              G,
              u,
              $
            ), w.target = Mt, w.relatedTarget = N, F = null, ri($) === x && (_e = new _e(
              U,
              z + "enter",
              Ue,
              u,
              $
            ), _e.target = N, _e.relatedTarget = Mt, F = _e), Mt = F, G && Ue)
              t: {
                for (_e = G, U = Ue, z = 0, N = _e; N; N = Vi(N))
                  z++;
                for (N = 0, F = U; F; F = Vi(F))
                  N++;
                for (; 0 < z - N; )
                  _e = Vi(_e), z--;
                for (; 0 < N - z; )
                  U = Vi(U), N--;
                for (; z--; ) {
                  if (_e === U || U !== null && _e === U.alternate)
                    break t;
                  _e = Vi(_e), U = Vi(U);
                }
                _e = null;
              }
            else _e = null;
            G !== null && Nd(
              I,
              w,
              G,
              _e,
              !1
            ), Ue !== null && Mt !== null && Nd(
              I,
              Mt,
              Ue,
              _e,
              !0
            );
          }
        }
        e: {
          if (w = x ? Wc(x) : window, G = w.nodeName && w.nodeName.toLowerCase(), G === "select" || G === "input" && w.type === "file")
            var ge = yi;
          else if (Jh(w))
            if (kh)
              ge = _u;
            else {
              ge = _s;
              var We = Lp;
            }
          else
            G = w.nodeName, !G || G.toLowerCase() !== "input" || w.type !== "checkbox" && w.type !== "radio" ? x && lo(x.elementType) && (ge = yi) : ge = mi;
          if (ge && (ge = ge(l, x))) {
            Ms(
              I,
              ge,
              u,
              $
            );
            break e;
          }
          We && We(l, w, x), l === "focusout" && x && w.type === "number" && x.memoizedProps.value != null && Cf(w, "number", w.value);
        }
        switch (We = x ? Wc(x) : window, l) {
          case "focusin":
            (Jh(We) || We.contentEditable === "true") && (aa = We, hc = x, jn = null);
            break;
          case "focusout":
            jn = hc = aa = null;
            break;
          case "mousedown":
            fo = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            fo = !1, ro(I, u, $);
            break;
          case "selectionchange":
            if (Fh) break;
          case "keydown":
          case "keyup":
            ro(I, u, $);
        }
        var ze;
        if (As)
          e: {
            switch (l) {
              case "compositionstart":
                var xe = "onCompositionStart";
                break e;
              case "compositionend":
                xe = "onCompositionEnd";
                break e;
              case "compositionupdate":
                xe = "onCompositionUpdate";
                break e;
            }
            xe = void 0;
          }
        else
          na ? Ds(l, u) && (xe = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (xe = "onCompositionStart");
        xe && (Os && u.locale !== "ko" && (na || xe !== "onCompositionStart" ? xe === "onCompositionEnd" && na && (ze = xf()) : (la = $, vs = "value" in la ? la.value : la.textContent, na = !0)), We = Gi(x, xe), 0 < We.length && (xe = new Lh(
          xe,
          l,
          null,
          u,
          $
        ), I.push({ event: xe, listeners: We }), ze ? xe.data = ze : (ze = jf(u), ze !== null && (xe.data = ze)))), (ze = Cg ? Zh(l, u) : Kh(l, u)) && (xe = Gi(x, "onBeforeInput"), 0 < xe.length && (We = new Lh(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          $
        ), I.push({
          event: We,
          listeners: xe
        }), We.data = ze)), Hd(
          I,
          l,
          x,
          u,
          $
        );
      }
      Fu(I, a);
    });
  }
  function Hn(l, a, u) {
    return {
      instance: l,
      listener: a,
      currentTarget: u
    };
  }
  function Gi(l, a) {
    for (var u = a + "Capture", c = []; l !== null; ) {
      var r = l, s = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || s === null || (r = zu(l, u), r != null && c.unshift(
        Hn(l, r, s)
      ), r = zu(l, a), r != null && c.push(
        Hn(l, r, s)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function Vi(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Nd(l, a, u, c, r) {
    for (var s = a._reactName, y = []; u !== null && u !== c; ) {
      var m = u, b = m.alternate, x = m.stateNode;
      if (m = m.tag, b !== null && b === c) break;
      m !== 5 && m !== 26 && m !== 27 || x === null || (b = x, r ? (x = zu(u, s), x != null && y.unshift(
        Hn(u, x, b)
      )) : r || (x = zu(u, s), x != null && y.push(
        Hn(u, x, b)
      ))), u = u.return;
    }
    y.length !== 0 && l.push({ event: a, listeners: y });
  }
  var wd = /\r\n?/g, Jn = /\u0000|\uFFFD/g;
  function qd(l) {
    return (typeof l == "string" ? l : "" + l).replace(wd, `
`).replace(Jn, "");
  }
  function Tv(l, a) {
    return a = qd(a), qd(l) === a;
  }
  function Ur() {
  }
  function qt(l, a, u, c, r, s) {
    switch (u) {
      case "children":
        typeof c == "string" ? a === "body" || a === "textarea" && c === "" || tc(l, c) : (typeof c == "number" || typeof c == "bigint") && a !== "body" && tc(l, "" + c);
        break;
      case "className":
        Du(l, "class", c);
        break;
      case "tabIndex":
        Du(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Du(l, u, c);
        break;
      case "style":
        ys(l, c, s);
        break;
      case "data":
        if (a !== "object") {
          Du(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (a !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = Hf("" + c), l.setAttribute(u, c);
        break;
      case "action":
      case "formAction":
        if (typeof c == "function") {
          l.setAttribute(
            u,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == "function" && (u === "formAction" ? (a !== "input" && qt(l, a, "name", r.name, r, null), qt(
            l,
            a,
            "formEncType",
            r.formEncType,
            r,
            null
          ), qt(
            l,
            a,
            "formMethod",
            r.formMethod,
            r,
            null
          ), qt(
            l,
            a,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (qt(l, a, "encType", r.encType, r, null), qt(l, a, "method", r.method, r, null), qt(l, a, "target", r.target, r, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = Hf("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = Ur);
        break;
      case "onScroll":
        c != null && Qe("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Qe("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(D(61));
          if (u = c.__html, u != null) {
            if (r.children != null) throw Error(D(60));
            l.innerHTML = u;
          }
        }
        break;
      case "multiple":
        l.multiple = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "muted":
        l.muted = c && typeof c != "function" && typeof c != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c == "symbol") {
          l.removeAttribute("xlink:href");
          break;
        }
        u = Hf("" + c), l.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          u
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "" + c) : l.removeAttribute(u);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        c && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, "") : l.removeAttribute(u);
        break;
      case "capture":
      case "download":
        c === !0 ? l.setAttribute(u, "") : c !== !1 && c != null && typeof c != "function" && typeof c != "symbol" ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ? l.setAttribute(u, c) : l.removeAttribute(u);
        break;
      case "rowSpan":
      case "start":
        c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? l.removeAttribute(u) : l.setAttribute(u, c);
        break;
      case "popover":
        Qe("beforetoggle", l), Qe("toggle", l), _f(l, "popover", c);
        break;
      case "xlinkActuate":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        Ia(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        Ia(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        Ia(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        Ia(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        _f(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Uf.get(u) || u, _f(l, u, c));
    }
  }
  function Al(l, a, u, c, r, s) {
    switch (u) {
      case "style":
        ys(l, c, s);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(D(61));
          if (u = c.__html, u != null) {
            if (r.children != null) throw Error(D(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? tc(l, c) : (typeof c == "number" || typeof c == "bigint") && tc(l, "" + c);
        break;
      case "onScroll":
        c != null && Qe("scroll", l);
        break;
      case "onScrollEnd":
        c != null && Qe("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = Ur);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!zf.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (r = u.endsWith("Capture"), a = u.slice(2, r ? u.length - 7 : void 0), s = l[Wl] || null, s = s != null ? s[u] : null, typeof s == "function" && l.removeEventListener(a, s, r), typeof c == "function")) {
              typeof s != "function" && s !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(a, c, r);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : _f(l, u, c);
          }
    }
  }
  function Y(l, a, u) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        Qe("error", l), Qe("load", l);
        var c = !1, r = !1, s;
        for (s in u)
          if (u.hasOwnProperty(s)) {
            var y = u[s];
            if (y != null)
              switch (s) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(D(137, a));
                default:
                  qt(l, a, s, y, u, null);
              }
          }
        r && qt(l, a, "srcSet", u.srcSet, u, null), c && qt(l, a, "src", u.src, u, null);
        return;
      case "input":
        Qe("invalid", l);
        var m = s = y = r = null, b = null, x = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var $ = u[c];
            if ($ != null)
              switch (c) {
                case "name":
                  r = $;
                  break;
                case "type":
                  y = $;
                  break;
                case "checked":
                  b = $;
                  break;
                case "defaultChecked":
                  x = $;
                  break;
                case "value":
                  s = $;
                  break;
                case "defaultValue":
                  m = $;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if ($ != null)
                    throw Error(D(137, a));
                  break;
                default:
                  qt(l, a, c, $, u, null);
              }
          }
        xh(
          l,
          s,
          m,
          b,
          x,
          y,
          r,
          !1
        ), eo(l);
        return;
      case "select":
        Qe("invalid", l), c = y = s = null;
        for (r in u)
          if (u.hasOwnProperty(r) && (m = u[r], m != null))
            switch (r) {
              case "value":
                s = m;
                break;
              case "defaultValue":
                y = m;
                break;
              case "multiple":
                c = m;
              default:
                qt(l, a, r, m, u, null);
            }
        a = s, u = y, l.multiple = !!c, a != null ? di(l, !!c, a, !1) : u != null && di(l, !!c, u, !0);
        return;
      case "textarea":
        Qe("invalid", l), s = r = c = null;
        for (y in u)
          if (u.hasOwnProperty(y) && (m = u[y], m != null))
            switch (y) {
              case "value":
                c = m;
                break;
              case "defaultValue":
                r = m;
                break;
              case "children":
                s = m;
                break;
              case "dangerouslySetInnerHTML":
                if (m != null) throw Error(D(91));
                break;
              default:
                qt(l, a, y, m, u, null);
            }
        wh(l, c, r, s), eo(l);
        return;
      case "option":
        for (b in u)
          if (u.hasOwnProperty(b) && (c = u[b], c != null))
            switch (b) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                qt(l, a, b, c, u, null);
            }
        return;
      case "dialog":
        Qe("beforetoggle", l), Qe("toggle", l), Qe("cancel", l), Qe("close", l);
        break;
      case "iframe":
      case "object":
        Qe("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < je.length; c++)
          Qe(je[c], l);
        break;
      case "image":
        Qe("error", l), Qe("load", l);
        break;
      case "details":
        Qe("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        Qe("error", l), Qe("load", l);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (x in u)
          if (u.hasOwnProperty(x) && (c = u[x], c != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(D(137, a));
              default:
                qt(l, a, x, c, u, null);
            }
        return;
      default:
        if (lo(a)) {
          for ($ in u)
            u.hasOwnProperty($) && (c = u[$], c !== void 0 && Al(
              l,
              a,
              $,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (m in u)
      u.hasOwnProperty(m) && (c = u[m], c != null && qt(l, a, m, c, u, null));
  }
  function Dt(l, a, u, c) {
    switch (a) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null, s = null, y = null, m = null, b = null, x = null, $ = null;
        for (G in u) {
          var I = u[G];
          if (u.hasOwnProperty(G) && I != null)
            switch (G) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                b = I;
              default:
                c.hasOwnProperty(G) || qt(l, a, G, null, c, I);
            }
        }
        for (var w in c) {
          var G = c[w];
          if (I = u[w], c.hasOwnProperty(w) && (G != null || I != null))
            switch (w) {
              case "type":
                s = G;
                break;
              case "name":
                r = G;
                break;
              case "checked":
                x = G;
                break;
              case "defaultChecked":
                $ = G;
                break;
              case "value":
                y = G;
                break;
              case "defaultValue":
                m = G;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (G != null)
                  throw Error(D(137, a));
                break;
              default:
                G !== I && qt(
                  l,
                  a,
                  w,
                  G,
                  c,
                  I
                );
            }
        }
        Hh(
          l,
          y,
          m,
          b,
          x,
          $,
          s,
          r
        );
        return;
      case "select":
        G = y = m = w = null;
        for (s in u)
          if (b = u[s], u.hasOwnProperty(s) && b != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                G = b;
              default:
                c.hasOwnProperty(s) || qt(
                  l,
                  a,
                  s,
                  null,
                  c,
                  b
                );
            }
        for (r in c)
          if (s = c[r], b = u[r], c.hasOwnProperty(r) && (s != null || b != null))
            switch (r) {
              case "value":
                w = s;
                break;
              case "defaultValue":
                m = s;
                break;
              case "multiple":
                y = s;
              default:
                s !== b && qt(
                  l,
                  a,
                  r,
                  s,
                  c,
                  b
                );
            }
        a = m, u = y, c = G, w != null ? di(l, !!u, w, !1) : !!c != !!u && (a != null ? di(l, !!u, a, !0) : di(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        G = w = null;
        for (m in u)
          if (r = u[m], u.hasOwnProperty(m) && r != null && !c.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                qt(l, a, m, null, c, r);
            }
        for (y in c)
          if (r = c[y], s = u[y], c.hasOwnProperty(y) && (r != null || s != null))
            switch (y) {
              case "value":
                w = r;
                break;
              case "defaultValue":
                G = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(D(91));
                break;
              default:
                r !== s && qt(l, a, y, r, c, s);
            }
        Nh(l, w, G);
        return;
      case "option":
        for (var Ue in u)
          if (w = u[Ue], u.hasOwnProperty(Ue) && w != null && !c.hasOwnProperty(Ue))
            switch (Ue) {
              case "selected":
                l.selected = !1;
                break;
              default:
                qt(
                  l,
                  a,
                  Ue,
                  null,
                  c,
                  w
                );
            }
        for (b in c)
          if (w = c[b], G = u[b], c.hasOwnProperty(b) && w !== G && (w != null || G != null))
            switch (b) {
              case "selected":
                l.selected = w && typeof w != "function" && typeof w != "symbol";
                break;
              default:
                qt(
                  l,
                  a,
                  b,
                  w,
                  c,
                  G
                );
            }
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var _e in u)
          w = u[_e], u.hasOwnProperty(_e) && w != null && !c.hasOwnProperty(_e) && qt(l, a, _e, null, c, w);
        for (x in c)
          if (w = c[x], G = u[x], c.hasOwnProperty(x) && w !== G && (w != null || G != null))
            switch (x) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(D(137, a));
                break;
              default:
                qt(
                  l,
                  a,
                  x,
                  w,
                  c,
                  G
                );
            }
        return;
      default:
        if (lo(a)) {
          for (var Mt in u)
            w = u[Mt], u.hasOwnProperty(Mt) && w !== void 0 && !c.hasOwnProperty(Mt) && Al(
              l,
              a,
              Mt,
              void 0,
              c,
              w
            );
          for ($ in c)
            w = c[$], G = u[$], !c.hasOwnProperty($) || w === G || w === void 0 && G === void 0 || Al(
              l,
              a,
              $,
              w,
              c,
              G
            );
          return;
        }
    }
    for (var U in u)
      w = u[U], u.hasOwnProperty(U) && w != null && !c.hasOwnProperty(U) && qt(l, a, U, null, c, w);
    for (I in c)
      w = c[I], G = u[I], !c.hasOwnProperty(I) || w === G || w == null && G == null || qt(l, a, I, w, c, G);
  }
  var vm = null, Hr = null;
  function Io(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function iu(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Iu(l, a) {
    if (l === 0)
      switch (a) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && a === "foreignObject" ? 0 : l;
  }
  function Nc(l, a) {
    return l === "textarea" || l === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
  }
  var cu = null;
  function Bd() {
    var l = window.event;
    return l && l.type === "popstate" ? l === cu ? !1 : (cu = l, !0) : (cu = null, !1);
  }
  var ou = typeof setTimeout == "function" ? setTimeout : void 0, gm = typeof clearTimeout == "function" ? clearTimeout : void 0, Ev = typeof Promise == "function" ? Promise : void 0, Lg = typeof queueMicrotask == "function" ? queueMicrotask : typeof Ev < "u" ? function(l) {
    return Ev.resolve(null).then(l).catch(Gg);
  } : ou;
  function Gg(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Xl(l) {
    return l === "head";
  }
  function Rv(l, a) {
    var u = a, c = 0, r = 0;
    do {
      var s = u.nextSibling;
      if (l.removeChild(u), s && s.nodeType === 8)
        if (u = s.data, u === "/$") {
          if (0 < c && 8 > c) {
            u = c;
            var y = l.ownerDocument;
            if (u & 1 && me(y.documentElement), u & 2 && me(y.body), u & 4)
              for (u = y.head, me(u), y = u.firstChild; y; ) {
                var m = y.nextSibling, b = y.nodeName;
                y[Mf] || b === "SCRIPT" || b === "STYLE" || b === "LINK" && y.rel.toLowerCase() === "stylesheet" || u.removeChild(y), y = m;
              }
          }
          if (r === 0) {
            l.removeChild(s), uf(a);
            return;
          }
          r--;
        } else
          u === "$" || u === "$?" || u === "$!" ? r++ : c = u.charCodeAt(0) - 48;
      else c = 0;
      u = s;
    } while (u);
    uf(a);
  }
  function xr(l) {
    var a = l.firstChild;
    for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
      var u = a;
      switch (a = a.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          xr(u), Ae(u);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (u.rel.toLowerCase() === "stylesheet") continue;
      }
      l.removeChild(u);
    }
  }
  function Sm(l, a, u, c) {
    for (; l.nodeType === 1; ) {
      var r = u;
      if (l.nodeName.toLowerCase() !== a.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[Mf])
          switch (a) {
            case "meta":
              if (!l.hasAttribute("itemprop")) break;
              return l;
            case "link":
              if (s = l.getAttribute("rel"), s === "stylesheet" && l.hasAttribute("data-precedence"))
                break;
              if (s !== r.rel || l.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || l.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || l.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return l;
            case "style":
              if (l.hasAttribute("data-precedence")) break;
              return l;
            case "script":
              if (s = l.getAttribute("src"), (s !== (r.src == null ? null : r.src) || l.getAttribute("type") !== (r.type == null ? null : r.type) || l.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && s && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
                break;
              return l;
            default:
              return l;
          }
      } else if (a === "input" && l.type === "hidden") {
        var s = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && l.getAttribute("name") === s)
          return l;
      } else return l;
      if (l = Ga(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Po(l, a, u) {
    if (a === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Ga(l.nextSibling), l === null)) return null;
    return l;
  }
  function bm(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function Tm(l, a) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete")
      a();
    else {
      var c = function() {
        a(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function Ga(l) {
    for (; l != null; l = l.nextSibling) {
      var a = l.nodeType;
      if (a === 1 || a === 3) break;
      if (a === 8) {
        if (a = l.data, a === "$" || a === "$!" || a === "$?" || a === "F!" || a === "F")
          break;
        if (a === "/$") return null;
      }
    }
    return l;
  }
  var Em = null;
  function wc(l) {
    l = l.previousSibling;
    for (var a = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (a === 0) return l;
          a--;
        } else u === "/$" && a++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Ql(l, a, u) {
    switch (a = Io(u), l) {
      case "html":
        if (l = a.documentElement, !l) throw Error(D(452));
        return l;
      case "head":
        if (l = a.head, !l) throw Error(D(453));
        return l;
      case "body":
        if (l = a.body, !l) throw Error(D(454));
        return l;
      default:
        throw Error(D(451));
    }
  }
  function me(l) {
    for (var a = l.attributes; a.length; )
      l.removeAttributeNode(a[0]);
    Ae(l);
  }
  var rl = /* @__PURE__ */ new Map(), ha = /* @__PURE__ */ new Set();
  function Hl(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Pu = j.d;
  j.d = {
    f: Vg,
    r: Yd,
    D: fu,
    C: ti,
    L: jd,
    m: Xi,
    X: xn,
    S: tn,
    M: Qi
  };
  function Vg() {
    var l = Pu.f(), a = Rr();
    return l || a;
  }
  function Yd(l) {
    var a = jl(l);
    a !== null && a.tag === 5 && a.type === "form" ? Jp(a) : Pu.r(l);
  }
  var ei = typeof document > "u" ? null : document;
  function kn(l, a, u) {
    var c = ei;
    if (c && typeof a == "string" && a) {
      var r = ta(a);
      r = 'link[rel="' + l + '"][href="' + r + '"]', typeof u == "string" && (r += '[crossorigin="' + u + '"]'), ha.has(r) || (ha.add(r), l = { rel: l, crossOrigin: u, href: a }, c.querySelector(r) === null && (a = c.createElement("link"), Y(a, "link", l), ol(a), c.head.appendChild(a)));
    }
  }
  function fu(l) {
    Pu.D(l), kn("dns-prefetch", l, null);
  }
  function ti(l, a) {
    Pu.C(l, a), kn("preconnect", l, a);
  }
  function jd(l, a, u) {
    Pu.L(l, a, u);
    var c = ei;
    if (c && l && a) {
      var r = 'link[rel="preload"][as="' + ta(a) + '"]';
      a === "image" && u && u.imageSrcSet ? (r += '[imagesrcset="' + ta(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (r += '[imagesizes="' + ta(
        u.imageSizes
      ) + '"]')) : r += '[href="' + ta(l) + '"]';
      var s = r;
      switch (a) {
        case "style":
          s = ef(l);
          break;
        case "script":
          s = qc(l);
      }
      rl.has(s) || (l = P(
        {
          rel: "preload",
          href: a === "image" && u && u.imageSrcSet ? void 0 : l,
          as: a
        },
        u
      ), rl.set(s, l), c.querySelector(r) !== null || a === "style" && c.querySelector(Nr(s)) || a === "script" && c.querySelector(Va(s)) || (a = c.createElement("link"), Y(a, "link", l), ol(a), c.head.appendChild(a)));
    }
  }
  function Xi(l, a) {
    Pu.m(l, a);
    var u = ei;
    if (u && l) {
      var c = a && typeof a.as == "string" ? a.as : "script", r = 'link[rel="modulepreload"][as="' + ta(c) + '"][href="' + ta(l) + '"]', s = r;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = qc(l);
      }
      if (!rl.has(s) && (l = P({ rel: "modulepreload", href: l }, a), rl.set(s, l), u.querySelector(r) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(Va(s)))
              return;
        }
        c = u.createElement("link"), Y(c, "link", l), ol(c), u.head.appendChild(c);
      }
    }
  }
  function tn(l, a, u) {
    Pu.S(l, a, u);
    var c = ei;
    if (c && l) {
      var r = Fc(c).hoistableStyles, s = ef(l);
      a = a || "default";
      var y = r.get(s);
      if (!y) {
        var m = { loading: 0, preload: null };
        if (y = c.querySelector(
          Nr(s)
        ))
          m.loading = 5;
        else {
          l = P(
            { rel: "stylesheet", href: l, "data-precedence": a },
            u
          ), (u = rl.get(s)) && Am(l, u);
          var b = y = c.createElement("link");
          ol(b), Y(b, "link", l), b._p = new Promise(function(x, $) {
            b.onload = x, b.onerror = $;
          }), b.addEventListener("load", function() {
            m.loading |= 1;
          }), b.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Vd(y, a, c);
        }
        y = {
          type: "stylesheet",
          instance: y,
          count: 1,
          state: m
        }, r.set(s, y);
      }
    }
  }
  function xn(l, a) {
    Pu.X(l, a);
    var u = ei;
    if (u && l) {
      var c = Fc(u).hoistableScripts, r = qc(l), s = c.get(r);
      s || (s = u.querySelector(Va(r)), s || (l = P({ src: l, async: !0 }, a), (a = rl.get(r)) && Xd(l, a), s = u.createElement("script"), ol(s), Y(s, "link", l), u.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, c.set(r, s));
    }
  }
  function Qi(l, a) {
    Pu.M(l, a);
    var u = ei;
    if (u && l) {
      var c = Fc(u).hoistableScripts, r = qc(l), s = c.get(r);
      s || (s = u.querySelector(Va(r)), s || (l = P({ src: l, async: !0, type: "module" }, a), (a = rl.get(r)) && Xd(l, a), s = u.createElement("script"), ol(s), Y(s, "link", l), u.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, c.set(r, s));
    }
  }
  function Ld(l, a, u, c) {
    var r = (r = be.current) ? Hl(r) : null;
    if (!r) throw Error(D(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (a = ef(u.href), u = Fc(
          r
        ).hoistableStyles, c = u.get(a), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(a, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = ef(u.href);
          var s = Fc(
            r
          ).hoistableStyles, y = s.get(l);
          if (y || (r = r.ownerDocument || r, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(l, y), (s = r.querySelector(
            Nr(l)
          )) && !s._p && (y.instance = s, y.state.loading = 5), rl.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, rl.set(l, u), s || wr(
            r,
            l,
            u,
            y.state
          ))), a && c === null)
            throw Error(D(528, ""));
          return y;
        }
        if (a && c !== null)
          throw Error(D(529, ""));
        return null;
      case "script":
        return a = u.async, u = u.src, typeof u == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = qc(u), u = Fc(
          r
        ).hoistableScripts, c = u.get(a), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(a, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(D(444, l));
    }
  }
  function ef(l) {
    return 'href="' + ta(l) + '"';
  }
  function Nr(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function Rm(l) {
    return P({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function wr(l, a, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + a + "]") ? c.loading = 1 : (a = l.createElement("link"), c.preload = a, a.addEventListener("load", function() {
      return c.loading |= 1;
    }), a.addEventListener("error", function() {
      return c.loading |= 2;
    }), Y(a, "link", u), ol(a), l.head.appendChild(a));
  }
  function qc(l) {
    return '[src="' + ta(l) + '"]';
  }
  function Va(l) {
    return "script[async]" + l;
  }
  function Gd(l, a, u) {
    if (a.count++, a.instance === null)
      switch (a.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + ta(u.href) + '"]'
          );
          if (c)
            return a.instance = c, ol(c), c;
          var r = P({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), ol(c), Y(c, "style", r), Vd(c, u.precedence, l), a.instance = c;
        case "stylesheet":
          r = ef(u.href);
          var s = l.querySelector(
            Nr(r)
          );
          if (s)
            return a.state.loading |= 4, a.instance = s, ol(s), s;
          c = Rm(u), (r = rl.get(r)) && Am(c, r), s = (l.ownerDocument || l).createElement("link"), ol(s);
          var y = s;
          return y._p = new Promise(function(m, b) {
            y.onload = m, y.onerror = b;
          }), Y(s, "link", c), a.state.loading |= 4, Vd(s, u.precedence, l), a.instance = s;
        case "script":
          return s = qc(u.src), (r = l.querySelector(
            Va(s)
          )) ? (a.instance = r, ol(r), r) : (c = u, (r = rl.get(s)) && (c = P({}, u), Xd(c, r)), l = l.ownerDocument || l, r = l.createElement("script"), ol(r), Y(r, "link", c), l.head.appendChild(r), a.instance = r);
        case "void":
          return null;
        default:
          throw Error(D(443, a.type));
      }
    else
      a.type === "stylesheet" && (a.state.loading & 4) === 0 && (c = a.instance, a.state.loading |= 4, Vd(c, u.precedence, l));
    return a.instance;
  }
  function Vd(l, a, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = c.length ? c[c.length - 1] : null, s = r, y = 0; y < c.length; y++) {
      var m = c[y];
      if (m.dataset.precedence === a) s = m;
      else if (s !== r) break;
    }
    s ? s.parentNode.insertBefore(l, s.nextSibling) : (a = u.nodeType === 9 ? u.head : u, a.insertBefore(l, a.firstChild));
  }
  function Am(l, a) {
    l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.title == null && (l.title = a.title);
  }
  function Xd(l, a) {
    l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.integrity == null && (l.integrity = a.integrity);
  }
  var qr = null;
  function tf(l, a, u) {
    if (qr === null) {
      var c = /* @__PURE__ */ new Map(), r = qr = /* @__PURE__ */ new Map();
      r.set(u, c);
    } else
      r = qr, c = r.get(u), c || (c = /* @__PURE__ */ new Map(), r.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), r = 0; r < u.length; r++) {
      var s = u[r];
      if (!(s[Mf] || s[jt] || l === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = s.getAttribute(a) || "";
        y = l + y;
        var m = c.get(y);
        m ? m.push(s) : c.set(y, [s]);
      }
    }
    return c;
  }
  function Om(l, a, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      a === "title" ? l.querySelector("head > title") : null
    );
  }
  function Av(l, a, u) {
    if (u === 1 || a.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
          break;
        return !0;
      case "link":
        if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
          break;
        switch (a.rel) {
          case "stylesheet":
            return l = a.disabled, typeof a.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
          return !0;
    }
    return !1;
  }
  function Dm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var lf = null;
  function Ov() {
  }
  function Dv(l, a, u) {
    if (lf === null) throw Error(D(475));
    var c = lf;
    if (a.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (a.state.loading & 4) === 0) {
      if (a.instance === null) {
        var r = ef(u.href), s = l.querySelector(
          Nr(r)
        );
        if (s) {
          l = s._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = nf.bind(c), l.then(c, c)), a.state.loading |= 4, a.instance = s, ol(s);
          return;
        }
        s = l.ownerDocument || l, u = Rm(u), (r = rl.get(r)) && Am(u, r), s = s.createElement("link"), ol(s);
        var y = s;
        y._p = new Promise(function(m, b) {
          y.onload = m, y.onerror = b;
        }), Y(s, "link", u), a.instance = s;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(a, l), (l = a.state.preload) && (a.state.loading & 3) === 0 && (c.count++, a = nf.bind(c), l.addEventListener("load", a), l.addEventListener("error", a));
    }
  }
  function Mv() {
    if (lf === null) throw Error(D(475));
    var l = lf;
    return l.stylesheets && l.count === 0 && Yr(l, l.stylesheets), 0 < l.count ? function(a) {
      var u = setTimeout(function() {
        if (l.stylesheets && Yr(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = a, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function nf() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Yr(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Br = null;
  function Yr(l, a) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Br = /* @__PURE__ */ new Map(), a.forEach(Mm, l), Br = null, nf.call(l));
  }
  function Mm(l, a) {
    if (!(a.state.loading & 4)) {
      var u = Br.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Br.set(l, u);
        for (var r = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < r.length; s++) {
          var y = r[s];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (u.set(y.dataset.precedence, y), c = y);
        }
        c && u.set(null, c);
      }
      r = a.instance, y = r.getAttribute("data-precedence"), s = u.get(y) || c, s === c && u.set(null, r), u.set(y, r), this.count++, c = nf.bind(this), r.addEventListener("load", c), r.addEventListener("error", c), s ? s.parentNode.insertBefore(r, s.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(r, l.firstChild)), a.state.loading |= 4;
    }
  }
  var Zl = {
    $$typeof: st,
    Provider: null,
    Consumer: null,
    _currentValue: le,
    _currentValue2: le,
    _threadCount: 0
  };
  function ru(l, a, u, c, r, s, y, m) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = se(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = se(0), this.hiddenUpdates = se(null), this.identifierPrefix = c, this.onUncaughtError = r, this.onCaughtError = s, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function zv(l, a, u, c, r, s, y, m, b, x, $, I) {
    return l = new ru(
      l,
      a,
      u,
      y,
      m,
      b,
      x,
      I
    ), a = 1, s === !0 && (a |= 24), s = gn(3, null, null, a), l.current = s, s.stateNode = l, a = uy(), a.refCount++, l.pooledCache = a, a.refCount++, s.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: a
    }, Pf(s), l;
  }
  function zm(l) {
    return l ? (l = mc, l) : mc;
  }
  function _m(l, a, u, c, r, s) {
    r = zm(r), c.context === null ? c.context = r : c.pendingContext = r, c = Yu(a), c.payload = { element: u }, s = s === void 0 ? null : s, s !== null && (c.callback = s), u = Tn(l, c, a), u !== null && (Un(u, l, a), gc(u, l, a));
  }
  function Cm(l, a) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < a ? u : a;
    }
  }
  function Qd(l, a) {
    Cm(l, a), (l = l.alternate) && Cm(l, a);
  }
  function Um(l) {
    if (l.tag === 13) {
      var a = Hu(l, 67108864);
      a !== null && Un(a, l, 67108864), Qd(l, 67108864);
    }
  }
  var jr = !0;
  function _v(l, a, u, c) {
    var r = V.T;
    V.T = null;
    var s = j.p;
    try {
      j.p = 2, Zd(l, a, u, c);
    } finally {
      j.p = s, V.T = r;
    }
  }
  function Cv(l, a, u, c) {
    var r = V.T;
    V.T = null;
    var s = j.p;
    try {
      j.p = 8, Zd(l, a, u, c);
    } finally {
      j.p = s, V.T = r;
    }
  }
  function Zd(l, a, u, c) {
    if (jr) {
      var r = Hm(c);
      if (r === null)
        Cr(
          l,
          a,
          c,
          Lr,
          u
        ), Nm(l, c);
      else if (wm(
        r,
        l,
        a,
        u,
        c
      ))
        c.stopPropagation();
      else if (Nm(l, c), a & 4 && -1 < Xg.indexOf(l)) {
        for (; r !== null; ) {
          var s = jl(r);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var y = Yl(s.pendingLanes);
                  if (y !== 0) {
                    var m = s;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; y; ) {
                      var b = 1 << 31 - cl(y);
                      m.entanglements[1] |= b, y &= ~b;
                    }
                    La(s), (Ct & 6) === 0 && (vd = Je() + 500, Wu(0));
                  }
                }
                break;
              case 13:
                m = Hu(s, 2), m !== null && Un(m, s, 2), Rr(), Qd(s, 2);
            }
          if (s = Hm(c), s === null && Cr(
            l,
            a,
            c,
            Lr,
            u
          ), s === r) break;
          r = s;
        }
        r !== null && c.stopPropagation();
      } else
        Cr(
          l,
          a,
          c,
          null,
          u
        );
    }
  }
  function Hm(l) {
    return l = lc(l), xm(l);
  }
  var Lr = null;
  function xm(l) {
    if (Lr = null, l = ri(l), l !== null) {
      var a = ce(l);
      if (a === null) l = null;
      else {
        var u = a.tag;
        if (u === 13) {
          if (l = ae(a), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (a.stateNode.current.memoizedState.isDehydrated)
            return a.tag === 3 ? a.stateNode.containerInfo : null;
          l = null;
        } else a !== l && (l = null);
      }
    }
    return Lr = l, null;
  }
  function Uv(l) {
    switch (l) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch ($l()) {
          case Yt:
            return 2;
          case sl:
            return 8;
          case Ce:
          case ka:
            return 32;
          case $a:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Kd = !1, Xa = null, su = null, li = null, af = /* @__PURE__ */ new Map(), Gr = /* @__PURE__ */ new Map(), Zi = [], Xg = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function Nm(l, a) {
    switch (l) {
      case "focusin":
      case "focusout":
        Xa = null;
        break;
      case "dragenter":
      case "dragleave":
        su = null;
        break;
      case "mouseover":
      case "mouseout":
        li = null;
        break;
      case "pointerover":
      case "pointerout":
        af.delete(a.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Gr.delete(a.pointerId);
    }
  }
  function du(l, a, u, c, r, s) {
    return l === null || l.nativeEvent !== s ? (l = {
      blockedOn: a,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: s,
      targetContainers: [r]
    }, a !== null && (a = jl(a), a !== null && Um(a)), l) : (l.eventSystemFlags |= c, a = l.targetContainers, r !== null && a.indexOf(r) === -1 && a.push(r), l);
  }
  function wm(l, a, u, c, r) {
    switch (a) {
      case "focusin":
        return Xa = du(
          Xa,
          l,
          a,
          u,
          c,
          r
        ), !0;
      case "dragenter":
        return su = du(
          su,
          l,
          a,
          u,
          c,
          r
        ), !0;
      case "mouseover":
        return li = du(
          li,
          l,
          a,
          u,
          c,
          r
        ), !0;
      case "pointerover":
        var s = r.pointerId;
        return af.set(
          s,
          du(
            af.get(s) || null,
            l,
            a,
            u,
            c,
            r
          )
        ), !0;
      case "gotpointercapture":
        return s = r.pointerId, Gr.set(
          s,
          du(
            Gr.get(s) || null,
            l,
            a,
            u,
            c,
            r
          )
        ), !0;
    }
    return !1;
  }
  function qm(l) {
    var a = ri(l.target);
    if (a !== null) {
      var u = ce(a);
      if (u !== null) {
        if (a = u.tag, a === 13) {
          if (a = ae(u), a !== null) {
            l.blockedOn = a, Oh(l.priority, function() {
              if (u.tag === 13) {
                var c = Kn();
                c = Ye(c);
                var r = Hu(u, c);
                r !== null && Un(r, u, c), Qd(u, c);
              }
            });
            return;
          }
        } else if (a === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function Vr(l) {
    if (l.blockedOn !== null) return !1;
    for (var a = l.targetContainers; 0 < a.length; ) {
      var u = Hm(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        ms = c, u.target.dispatchEvent(c), ms = null;
      } else
        return a = jl(u), a !== null && Um(a), l.blockedOn = u, !1;
      a.shift();
    }
    return !0;
  }
  function Bm(l, a, u) {
    Vr(l) && u.delete(a);
  }
  function Jd() {
    Kd = !1, Xa !== null && Vr(Xa) && (Xa = null), su !== null && Vr(su) && (su = null), li !== null && Vr(li) && (li = null), af.forEach(Bm), Gr.forEach(Bm);
  }
  function ni(l, a) {
    l.blockedOn === a && (l.blockedOn = null, Kd || (Kd = !0, S.unstable_scheduleCallback(
      S.unstable_NormalPriority,
      Jd
    )));
  }
  var kd = null;
  function Xr(l) {
    kd !== l && (kd = l, S.unstable_scheduleCallback(
      S.unstable_NormalPriority,
      function() {
        kd === l && (kd = null);
        for (var a = 0; a < l.length; a += 3) {
          var u = l[a], c = l[a + 1], r = l[a + 2];
          if (typeof c != "function") {
            if (xm(c || u) === null)
              continue;
            break;
          }
          var s = jl(u);
          s !== null && (l.splice(a, 3), a -= 3, zy(
            s,
            {
              pending: !0,
              data: r,
              method: u.method,
              action: c
            },
            c,
            r
          ));
        }
      }
    ));
  }
  function uf(l) {
    function a(b) {
      return ni(b, l);
    }
    Xa !== null && ni(Xa, l), su !== null && ni(su, l), li !== null && ni(li, l), af.forEach(a), Gr.forEach(a);
    for (var u = 0; u < Zi.length; u++) {
      var c = Zi[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < Zi.length && (u = Zi[0], u.blockedOn === null); )
      qm(u), u.blockedOn === null && Zi.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var r = u[c], s = u[c + 1], y = r[Wl] || null;
        if (typeof s == "function")
          y || Xr(u);
        else if (y) {
          var m = null;
          if (s && s.hasAttribute("formAction")) {
            if (r = s, y = s[Wl] || null)
              m = y.formAction;
            else if (xm(r) !== null) continue;
          } else m = y.action;
          typeof m == "function" ? u[c + 1] = m : (u.splice(c, 3), c -= 3), Xr(u);
        }
      }
  }
  function Ki(l) {
    this._internalRoot = l;
  }
  $d.prototype.render = Ki.prototype.render = function(l) {
    var a = this._internalRoot;
    if (a === null) throw Error(D(409));
    var u = a.current, c = Kn();
    _m(u, c, l, a, null, null);
  }, $d.prototype.unmount = Ki.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var a = l.containerInfo;
      _m(l.current, 2, null, l, null, null), Rr(), a[Ii] = null;
    }
  };
  function $d(l) {
    this._internalRoot = l;
  }
  $d.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var a = Wa();
      l = { blockedOn: null, target: l, priority: a };
      for (var u = 0; u < Zi.length && a !== 0 && a < Zi[u].priority; u++) ;
      Zi.splice(u, 0, l), u === 0 && qm(l);
    }
  };
  var Hv = H.version;
  if (Hv !== "19.1.0")
    throw Error(
      D(
        527,
        Hv,
        "19.1.0"
      )
    );
  j.findDOMNode = function(l) {
    var a = l._reactInternals;
    if (a === void 0)
      throw typeof l.render == "function" ? Error(D(188)) : (l = Object.keys(l).join(","), Error(D(268, l)));
    return l = te(a), l = l !== null ? A(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var xv = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: V,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var xl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!xl.isDisabled && xl.supportsFiber)
      try {
        bl = xl.inject(
          xv
        ), dl = xl;
      } catch {
      }
  }
  return bp.createRoot = function(l, a) {
    if (!ie(l)) throw Error(D(299));
    var u = !1, c = "", r = qy, s = qo, y = By, m = null;
    return a != null && (a.unstable_strictMode === !0 && (u = !0), a.identifierPrefix !== void 0 && (c = a.identifierPrefix), a.onUncaughtError !== void 0 && (r = a.onUncaughtError), a.onCaughtError !== void 0 && (s = a.onCaughtError), a.onRecoverableError !== void 0 && (y = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (m = a.unstable_transitionCallbacks)), a = zv(
      l,
      1,
      !1,
      null,
      null,
      u,
      c,
      r,
      s,
      y,
      m,
      null
    ), l[Ii] = a.current, _r(l), new Ki(a);
  }, bp.hydrateRoot = function(l, a, u) {
    if (!ie(l)) throw Error(D(299));
    var c = !1, r = "", s = qy, y = qo, m = By, b = null, x = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (r = u.identifierPrefix), u.onUncaughtError !== void 0 && (s = u.onUncaughtError), u.onCaughtError !== void 0 && (y = u.onCaughtError), u.onRecoverableError !== void 0 && (m = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (b = u.unstable_transitionCallbacks), u.formState !== void 0 && (x = u.formState)), a = zv(
      l,
      1,
      !0,
      a,
      u ?? null,
      c,
      r,
      s,
      y,
      m,
      b,
      x
    ), a.context = zm(null), u = a.current, c = Kn(), c = Ye(c), r = Yu(c), r.callback = null, Tn(u, r, c), u = c, a.current.lanes = u, Te(a, u), La(a), l[Ii] = a.current, _r(l), new $d(a);
  }, bp.version = "19.1.0", bp;
}
var Tp = {}, T1;
function oE() {
  if (T1) return Tp;
  T1 = 1;
  var S = {};
  /**
   * @license React
   * react-dom-client.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return S.NODE_ENV !== "production" && function() {
    function H(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function W(e, t, n, i) {
      if (n >= t.length) return i;
      var o = t[n], f = Al(e) ? e.slice() : je({}, e);
      return f[o] = W(e[o], t, n + 1, i), f;
    }
    function D(e, t, n) {
      if (t.length !== n.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < n.length - 1; i++)
          if (t[i] !== n[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return ie(e, t, n, 0);
      }
    }
    function ie(e, t, n, i) {
      var o = t[i], f = Al(e) ? e.slice() : je({}, e);
      return i + 1 === t.length ? (f[n[i]] = f[o], Al(f) ? f.splice(o, 1) : delete f[o]) : f[o] = ie(
        e[o],
        t,
        n,
        i + 1
      ), f;
    }
    function ce(e, t, n) {
      var i = t[n], o = Al(e) ? e.slice() : je({}, e);
      return n + 1 === t.length ? (Al(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = ce(e[i], t, n + 1), o);
    }
    function ae() {
      return !1;
    }
    function ve() {
      return null;
    }
    function te() {
    }
    function A() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function P() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function ue() {
    }
    function q(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }
    function _(e, t, n, i) {
      return new Cg(e, t, n, i);
    }
    function ee(e, t) {
      e.context === cf && (Or(e.current, 2, t, e, null, null), Dc());
    }
    function fe(e, t) {
      if (mu !== null) {
        var n = t.staleFamilies;
        t = t.updatedFamilies, zi(), oc(
          e.current,
          t,
          n
        ), Dc();
      }
    }
    function Be(e) {
      mu = e;
    }
    function ye(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function He(e) {
      var t = e, n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (n = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function st(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function ot(e) {
      if (He(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function Me(e) {
      var t = e.alternate;
      if (!t) {
        if (t = He(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var n = e, i = t; ; ) {
        var o = n.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            n = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === n) return ot(o), e;
            if (f === i) return ot(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (n.return !== i.return) n = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === n) {
              d = !0, n = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, n = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === n) {
                d = !0, n = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, n = o;
                break;
              }
              h = h.sibling;
            }
            if (!d)
              throw Error(
                "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
              );
          }
        }
        if (n.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (n.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return n.stateNode.current === n ? e : t;
    }
    function yt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = yt(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function tt(e) {
      return e === null || typeof e != "object" ? null : (e = Ur && e[Ur] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function Oe(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === qt ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Li:
          return "Fragment";
        case _r:
          return "Profiler";
        case xc:
          return "StrictMode";
        case Vi:
          return "Suspense";
        case Nd:
          return "SuspenseList";
        case qd:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case Qe:
            return "Portal";
          case Hn:
            return (e.displayName || "Context") + ".Provider";
          case Cr:
            return (e._context.displayName || "Context") + ".Consumer";
          case Gi:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case wd:
            return t = e.displayName || null, t !== null ? t : Oe(e.type) || "Memo";
          case Jn:
            t = e._payload, e = e._init;
            try {
              return Oe(e(t));
            } catch {
            }
        }
      return null;
    }
    function Rt(e) {
      return typeof e.tag == "number" ? pe(e) : typeof e.name == "string" ? e.name : null;
    }
    function pe(e) {
      var t = e.type;
      switch (e.tag) {
        case 31:
          return "Activity";
        case 24:
          return "Cache";
        case 9:
          return (t._context.displayName || "Context") + ".Consumer";
        case 10:
          return (t.displayName || "Context") + ".Provider";
        case 18:
          return "DehydratedFragment";
        case 11:
          return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
        case 7:
          return "Fragment";
        case 26:
        case 27:
        case 5:
          return t;
        case 4:
          return "Portal";
        case 3:
          return "Root";
        case 6:
          return "Text";
        case 16:
          return Oe(t);
        case 8:
          return t === xc ? "StrictMode" : "Mode";
        case 22:
          return "Offscreen";
        case 12:
          return "Profiler";
        case 21:
          return "Scope";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 25:
          return "TracingMarker";
        case 1:
        case 0:
        case 14:
        case 15:
          if (typeof t == "function")
            return t.displayName || t.name || null;
          if (typeof t == "string") return t;
          break;
        case 29:
          if (t = e._debugInfo, t != null) {
            for (var n = t.length - 1; 0 <= n; n--)
              if (typeof t[n].name == "string") return t[n].name;
          }
          if (e.return !== null)
            return pe(e.return);
      }
      return null;
    }
    function ft(e) {
      return { current: e };
    }
    function Se(e, t) {
      0 > iu ? console.error("Unexpected pop.") : (t !== Io[iu] && console.error("Unexpected Fiber popped."), e.current = Hr[iu], Hr[iu] = null, Io[iu] = null, iu--);
    }
    function Ne(e, t, n) {
      iu++, Hr[iu] = e.current, Io[iu] = n, e.current = t;
    }
    function Xe(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function lt(e, t) {
      Ne(cu, t, e), Ne(Nc, e, e), Ne(Iu, null, e);
      var n = t.nodeType;
      switch (n) {
        case 9:
        case 11:
          n = n === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? _n(t) : Zc;
          break;
        default:
          if (n = t.tagName, t = t.namespaceURI)
            t = _n(t), t = Ju(
              t,
              n
            );
          else
            switch (n) {
              case "svg":
                t = Rh;
                break;
              case "math":
                t = og;
                break;
              default:
                t = Zc;
            }
      }
      n = n.toLowerCase(), n = wh(null, n), n = {
        context: t,
        ancestorInfo: n
      }, Se(Iu, e), Ne(Iu, n, e);
    }
    function V(e) {
      Se(Iu, e), Se(Nc, e), Se(cu, e);
    }
    function j() {
      return Xe(Iu.current);
    }
    function le(e) {
      e.memoizedState !== null && Ne(Bd, e, e);
      var t = Xe(Iu.current), n = e.type, i = Ju(t.context, n);
      n = wh(t.ancestorInfo, n), i = { context: i, ancestorInfo: n }, t !== i && (Ne(Nc, e, e), Ne(Iu, i, e));
    }
    function he(e) {
      Nc.current === e && (Se(Iu, e), Se(Nc, e)), Bd.current === e && (Se(Bd, e), mp._currentValue = os);
    }
    function E(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function O(e) {
      try {
        return k(e), !1;
      } catch {
        return !0;
      }
    }
    function k(e) {
      return "" + e;
    }
    function Z(e, t) {
      if (O(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          E(e)
        ), k(e);
    }
    function re(e, t) {
      if (O(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          E(e)
        ), k(e);
    }
    function De(e) {
      if (O(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          E(e)
        ), k(e);
    }
    function be(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        wc = t.inject(e), Ql = t;
      } catch (n) {
        console.error("React instrumentation encountered an error: %s.", n);
      }
      return !!t.checkDCE;
    }
    function qe(e) {
      if (typeof Ga == "function" && Em(e), Ql && typeof Ql.setStrictMode == "function")
        try {
          Ql.setStrictMode(wc, e);
        } catch (t) {
          rl || (rl = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function vt(e) {
      me = e;
    }
    function gt() {
      me !== null && typeof me.markCommitStopped == "function" && me.markCommitStopped();
    }
    function Vt(e) {
      me !== null && typeof me.markComponentRenderStarted == "function" && me.markComponentRenderStarted(e);
    }
    function Ml() {
      me !== null && typeof me.markComponentRenderStopped == "function" && me.markComponentRenderStopped();
    }
    function Ja(e) {
      me !== null && typeof me.markRenderStarted == "function" && me.markRenderStarted(e);
    }
    function it() {
      me !== null && typeof me.markRenderStopped == "function" && me.markRenderStopped();
    }
    function mt(e, t) {
      me !== null && typeof me.markStateUpdateScheduled == "function" && me.markStateUpdateScheduled(e, t);
    }
    function It(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Pu(e) / Vg | 0) | 0;
    }
    function At(e) {
      if (e & 1) return "SyncHydrationLane";
      if (e & 2) return "Sync";
      if (e & 4) return "InputContinuousHydration";
      if (e & 8) return "InputContinuous";
      if (e & 16) return "DefaultHydration";
      if (e & 32) return "Default";
      if (e & 128) return "TransitionHydration";
      if (e & 4194048) return "Transition";
      if (e & 62914560) return "Retry";
      if (e & 67108864) return "SelectiveHydration";
      if (e & 134217728) return "IdleHydration";
      if (e & 268435456) return "Idle";
      if (e & 536870912) return "Offscreen";
      if (e & 1073741824) return "Deferred";
    }
    function Je(e) {
      var t = e & 42;
      if (t !== 0) return t;
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194048;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return e & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), e;
      }
    }
    function $l(e, t, n) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = Je(i) : (d &= h, d !== 0 ? o = Je(d) : n || (n = h & ~e, n !== 0 && (o = Je(n))))) : (h = i & ~f, h !== 0 ? o = Je(h) : d !== 0 ? o = Je(d) : n || (n = i & ~e, n !== 0 && (o = Je(n)))), o === 0 ? 0 : t !== 0 && t !== o && (t & f) === 0 && (f = o & -o, n = t & -t, f >= n || f === 32 && (n & 4194048) !== 0) ? t : o;
    }
    function Yt(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function sl(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return console.error(
            "Should have found matching lanes. This is a bug in React."
          ), -1;
      }
    }
    function Ce() {
      var e = Yd;
      return Yd <<= 1, (Yd & 4194048) === 0 && (Yd = 256), e;
    }
    function ka() {
      var e = ei;
      return ei <<= 1, (ei & 62914560) === 0 && (ei = 4194304), e;
    }
    function $a(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function va(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Bl(e, t, n, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
      var h = e.entanglements, v = e.expirationTimes, g = e.hiddenUpdates;
      for (n = d & ~n; 0 < n; ) {
        var L = 31 - Hl(n), Q = 1 << L;
        h[L] = 0, v[L] = -1;
        var B = g[L];
        if (B !== null)
          for (g[L] = null, L = 0; L < B.length; L++) {
            var K = B[L];
            K !== null && (K.lane &= -536870913);
          }
        n &= ~Q;
      }
      i !== 0 && bl(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function bl(e, t, n) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - Hl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | n & 4194090;
    }
    function dl(e, t) {
      var n = e.entangledLanes |= t;
      for (e = e.entanglements; n; ) {
        var i = 31 - Hl(n), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), n &= ~o;
      }
    }
    function hn(e) {
      switch (e) {
        case 2:
          e = 1;
          break;
        case 8:
          e = 4;
          break;
        case 32:
          e = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          e = 128;
          break;
        case 268435456:
          e = 134217728;
          break;
        default:
          e = 0;
      }
      return e;
    }
    function cl(e, t, n) {
      if (ha)
        for (e = e.pendingUpdatersLaneMap; 0 < n; ) {
          var i = 31 - Hl(n), o = 1 << i;
          e[i].add(t), n &= ~o;
        }
    }
    function Af(e, t) {
      if (ha)
        for (var n = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - Hl(t);
          e = 1 << o, o = n[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function $c(e) {
      return e &= -e, kn < e ? fu < e ? (e & 134217727) !== 0 ? ti : jd : fu : kn;
    }
    function Of() {
      var e = Dt.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? ti : ji(e.type));
    }
    function Ou(e, t) {
      var n = Dt.p;
      try {
        return Dt.p = e, t();
      } finally {
        Dt.p = n;
      }
    }
    function ga(e) {
      delete e[tn], delete e[xn], delete e[Ld], delete e[ef], delete e[Nr];
    }
    function Yl(e) {
      var t = e[tn];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if (t = n[Qi] || n[tn]) {
          if (n = t.alternate, t.child !== null || n !== null && n.child !== null)
            for (e = bd(e); e !== null; ) {
              if (n = e[tn])
                return n;
              e = bd(e);
            }
          return t;
        }
        e = n, n = e.parentNode;
      }
      return null;
    }
    function yn(e) {
      if (e = e[tn] || e[Qi]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function ea(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function p(e) {
      var t = e[Rm];
      return t || (t = e[Rm] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function C(e) {
      e[wr] = !0;
    }
    function oe(e, t) {
      se(e, t), se(e + "Capture", t);
    }
    function se(e, t) {
      Va[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Va[e] = t;
      var n = e.toLowerCase();
      for (Gd[n] = e, e === "onDoubleClick" && (Gd.ondblclick = e), e = 0; e < t.length; e++)
        qc.add(t[e]);
    }
    function Te(e, t) {
      Vd[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function Ie(e) {
      return ou.call(qr, e) ? !0 : ou.call(Xd, e) ? !1 : Am.test(e) ? qr[e] = !0 : (Xd[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function Ge(e, t, n) {
      if (Ie(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof n) {
            case "symbol":
            case "object":
              return n;
            case "function":
              return n;
            case "boolean":
              if (n === !1) return n;
          }
          return n === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && n === !0 ? !0 : (Z(n, t), e === "" + n ? n : e);
      }
    }
    function dt(e, t, n) {
      if (Ie(t))
        if (n === null) e.removeAttribute(t);
        else {
          switch (typeof n) {
            case "undefined":
            case "function":
            case "symbol":
              e.removeAttribute(t);
              return;
            case "boolean":
              var i = t.toLowerCase().slice(0, 5);
              if (i !== "data-" && i !== "aria-") {
                e.removeAttribute(t);
                return;
              }
          }
          Z(n, t), e.setAttribute(t, "" + n);
        }
    }
    function Ye(e, t, n) {
      if (n === null) e.removeAttribute(t);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        Z(n, t), e.setAttribute(t, "" + n);
      }
    }
    function hl(e, t, n, i) {
      if (i === null) e.removeAttribute(n);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(n);
            return;
        }
        Z(i, n), e.setAttributeNS(t, n, "" + i);
      }
    }
    function Wa() {
    }
    function Oh() {
      if (tf === 0) {
        Om = console.log, Av = console.info, Dm = console.warn, lf = console.error, Ov = console.group, Dv = console.groupCollapsed, Mv = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: Wa,
          writable: !0
        };
        Object.defineProperties(console, {
          info: e,
          log: e,
          warn: e,
          error: e,
          group: e,
          groupCollapsed: e,
          groupEnd: e
        });
      }
      tf++;
    }
    function Fa() {
      if (tf--, tf === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: je({}, e, { value: Om }),
          info: je({}, e, { value: Av }),
          warn: je({}, e, { value: Dm }),
          error: je({}, e, { value: lf }),
          group: je({}, e, { value: Ov }),
          groupCollapsed: je({}, e, { value: Dv }),
          groupEnd: je({}, e, { value: Mv })
        });
      }
      0 > tf && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function jt(e) {
      if (nf === void 0)
        try {
          throw Error();
        } catch (n) {
          var t = n.stack.trim().match(/\n( *(at )?)/);
          nf = t && t[1] || "", Br = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + nf + e + Br;
    }
    function Wl(e, t) {
      if (!e || Yr) return "";
      var n = Mm.get(e);
      if (n !== void 0) return n;
      Yr = !0, n = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = Y.H, Y.H = null, Oh();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var B = function() {
                  throw Error();
                };
                if (Object.defineProperty(B.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(B, []);
                  } catch (Ee) {
                    var K = Ee;
                  }
                  Reflect.construct(e, [], B);
                } else {
                  try {
                    B.call();
                  } catch (Ee) {
                    K = Ee;
                  }
                  e.call(B.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ee) {
                  K = Ee;
                }
                (B = e()) && typeof B.catch == "function" && B.catch(function() {
                });
              }
            } catch (Ee) {
              if (Ee && K && typeof Ee.stack == "string")
                return [Ee.stack, K.stack];
            }
            return [null, null];
          }
        };
        o.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var f = Object.getOwnPropertyDescriptor(
          o.DetermineComponentFrameRoot,
          "name"
        );
        f && f.configurable && Object.defineProperty(
          o.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var d = o.DetermineComponentFrameRoot(), h = d[0], v = d[1];
        if (h && v) {
          var g = h.split(`
`), L = v.split(`
`);
          for (d = f = 0; f < g.length && !g[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < L.length && !L[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === g.length || d === L.length)
            for (f = g.length - 1, d = L.length - 1; 1 <= f && 0 <= d && g[f] !== L[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (g[f] !== L[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || g[f] !== L[d]) {
                    var Q = `
` + g[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && Q.includes("<anonymous>") && (Q = Q.replace("<anonymous>", e.displayName)), typeof e == "function" && Mm.set(e, Q), Q;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        Yr = !1, Y.H = i, Fa(), Error.prepareStackTrace = n;
      }
      return g = (g = e ? e.displayName || e.name : "") ? jt(g) : "", typeof e == "function" && Mm.set(e, g), g;
    }
    function Ii(e) {
      var t = Error.prepareStackTrace;
      if (Error.prepareStackTrace = void 0, e = e.stack, Error.prepareStackTrace = t, e.startsWith(`Error: react-stack-top-frame
`) && (e = e.slice(29)), t = e.indexOf(`
`), t !== -1 && (e = e.slice(t + 1)), t = e.indexOf("react-stack-bottom-frame"), t !== -1 && (t = e.lastIndexOf(
        `
`,
        t
      )), t !== -1)
        e = e.slice(0, t);
      else return "";
      return e;
    }
    function Dh(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return jt(e.type);
        case 16:
          return jt("Lazy");
        case 13:
          return jt("Suspense");
        case 19:
          return jt("SuspenseList");
        case 0:
        case 15:
          return Wl(e.type, !1);
        case 11:
          return Wl(e.type.render, !1);
        case 1:
          return Wl(e.type, !0);
        case 31:
          return jt("Activity");
        default:
          return "";
      }
    }
    function Dp(e) {
      try {
        var t = "";
        do {
          t += Dh(e);
          var n = e._debugInfo;
          if (n)
            for (var i = n.length - 1; 0 <= i; i--) {
              var o = n[i];
              if (typeof o.name == "string") {
                var f = t, d = o.env, h = jt(
                  o.name + (d ? " [" + d + "]" : "")
                );
                t = f + h;
              }
            }
          e = e.return;
        } while (e);
        return t;
      } catch (v) {
        return `
Error generating stack: ` + v.message + `
` + v.stack;
      }
    }
    function Mp(e) {
      return (e = e ? e.displayName || e.name : "") ? jt(e) : "";
    }
    function Df() {
      if (Zl === null) return null;
      var e = Zl._debugOwner;
      return e != null ? Rt(e) : null;
    }
    function Mf() {
      if (Zl === null) return "";
      var e = Zl;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += jt(e.type);
            break;
          case 13:
            t += jt("Suspense");
            break;
          case 19:
            t += jt("SuspenseList");
            break;
          case 31:
            t += jt("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += Mp(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += Mp(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var n = e;
            e = n._debugOwner;
            var i = n._debugStack;
            e && i && (typeof i != "string" && (n._debugStack = i = Ii(i)), i !== "" && (t += `
` + i));
          } else if (e.debugStack != null) {
            var o = e.debugStack;
            (e = e.owner) && o && (t += `
` + Ii(o));
          } else break;
        var f = t;
      } catch (d) {
        f = `
Error generating stack: ` + d.message + `
` + d.stack;
      }
      return f;
    }
    function Ae(e, t, n, i, o, f, d) {
      var h = Zl;
      ri(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, n, i, o, f, d)
        ) : t(n, i, o, f, d);
      } finally {
        ri(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function ri(e) {
      Y.getCurrentStack = e === null ? null : Mf, ru = !1, Zl = e;
    }
    function jl(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return De(e), e;
        default:
          return "";
      }
    }
    function Wc(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Fc(e) {
      var t = Wc(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      De(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
        var o = n.get, f = n.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            De(d), i = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: n.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            De(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function ol(e) {
      e._valueTracker || (e._valueTracker = Fc(e));
    }
    function Mh(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(), i = "";
      return e && (i = Wc(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== n ? (t.setValue(e), !0) : !1;
    }
    function zf(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function zl(e) {
      return e.replace(
        zv,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Pi(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || _m || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Df() || "A component",
        t.type
      ), _m = !0), t.value === void 0 || t.defaultValue === void 0 || zm || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        Df() || "A component",
        t.type
      ), zm = !0);
    }
    function zh(e, t, n, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (Z(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + jl(t)) : e.value !== "" + jl(t) && (e.value = "" + jl(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? rs(e, d, jl(t)) : n != null ? rs(e, d, jl(n)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (Z(h, "name"), e.name = "" + jl(h)) : e.removeAttribute("name");
    }
    function _h(e, t, n, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (Z(f, "type"), e.type = f), t != null || n != null) {
        if (!(f !== "submit" && f !== "reset" || t != null))
          return;
        n = n != null ? "" + jl(n) : "", t = t != null ? "" + jl(t) : n, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (Z(d, "name"), e.name = d);
    }
    function rs(e, t, n) {
      t === "number" && zf(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
    }
    function zp(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? pm.Children.forEach(t.children, function(n) {
        n == null || typeof n == "string" || typeof n == "number" || typeof n == "bigint" || Qd || (Qd = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || Um || (Um = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || Cm || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), Cm = !0);
    }
    function _f() {
      var e = Df();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function Du(e, t, n, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < n.length; o++)
          t["$" + n[o]] = !0;
        for (n = 0; n < e.length; n++)
          o = t.hasOwnProperty("$" + e[n].value), e[n].selected !== o && (e[n].selected = o), o && i && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + jl(n), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === n) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Ia(e, t) {
      for (e = 0; e < _v.length; e++) {
        var n = _v[e];
        if (t[n] != null) {
          var i = Al(t[n]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            n,
            _f()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            n,
            _f()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || jr || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), jr = !0);
    }
    function ss(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || Cv || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        Df() || "A component"
      ), Cv = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function Ch(e, t, n) {
      if (t != null && (t = "" + jl(t), t !== e.value && (e.value = t), n == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = n != null ? "" + jl(n) : "";
    }
    function ec(e, t, n, i) {
      if (t == null) {
        if (i != null) {
          if (n != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (Al(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          n = i;
        }
        n == null && (n = ""), t = n;
      }
      n = jl(t), e.defaultValue = n, i = e.textContent, i === n && i !== "" && i !== null && (e.value = i);
    }
    function ds(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? ds(e.children[0], t) : e;
    }
    function an(e) {
      return "  " + "  ".repeat(e);
    }
    function Ic(e) {
      return "+ " + "  ".repeat(e);
    }
    function si(e) {
      return "- " + "  ".repeat(e);
    }
    function Yn(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return e.type;
        case 16:
          return "Lazy";
        case 13:
          return "Suspense";
        case 19:
          return "SuspenseList";
        case 0:
        case 15:
          return e = e.type, e.displayName || e.name || null;
        case 11:
          return e = e.type.render, e.displayName || e.name || null;
        case 1:
          return e = e.type, e.displayName || e.name || null;
        default:
          return null;
      }
    }
    function Pc(e, t) {
      return Zd.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function hs(e, t, n) {
      var i = 120 - 2 * n;
      if (t === null)
        return Ic(n) + Pc(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), Ic(n) + Pc(e, i) + `
` + si(n) + Pc(t, i) + `
`;
      }
      return an(n) + Pc(e, i) + `
`;
    }
    function eo(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, n) {
        return n;
      });
    }
    function to(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (Al(e)) return "[...]";
          if (e.$$typeof === Fu)
            return (t = Oe(e.type)) ? "<" + t + ">" : "<...>";
          var n = eo(e);
          if (n === "Object") {
            n = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = to(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  n += n === "" ? "..." : ", ...";
                  break;
                }
                n += (n === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + n + "}";
          }
          return n;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function Mu(e, t) {
      return typeof e != "string" || Zd.test(e) ? "{" + to(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function Uh(e, t, n) {
      var i = 120 - n.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = Mu(
            t[f],
            120 - n.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? n + "<" + e + `>
` : 0 < i ? n + "<" + e + " " + o.join(" ") + `>
` : n + "<" + e + `
` + n + "  " + o.join(`
` + n + "  ") + `
` + n + `>
`;
    }
    function ta(e, t, n) {
      var i = "", o = je({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * n - f.length - 2, h = to(e[f], d);
          t.hasOwnProperty(f) ? (d = to(t[f], d), i += Ic(n) + f + ": " + h + `
`, i += si(n) + f + ": " + d + `
`) : i += Ic(n) + f + ": " + h + `
`;
        }
      for (var v in o)
        o.hasOwnProperty(v) && (e = to(
          o[v],
          120 - 2 * n - v.length - 2
        ), i += si(n) + v + ": " + e + `
`);
      return i;
    }
    function Hh(e, t, n, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (g in n)
        n.hasOwnProperty(g) && f.set(
          g.toLowerCase(),
          g
        );
      if (f.size === 1 && f.has("children"))
        o += Uh(
          e,
          t,
          an(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, v = f.get(d.toLowerCase());
            if (v !== void 0) {
              f.delete(d.toLowerCase());
              var g = t[d];
              v = n[v];
              var L = Mu(
                g,
                h
              );
              h = Mu(
                v,
                h
              ), typeof g == "object" && g !== null && typeof v == "object" && v !== null && eo(g) === "Object" && eo(v) === "Object" && (2 < Object.keys(g).length || 2 < Object.keys(v).length || -1 < L.indexOf("...") || -1 < h.indexOf("...")) ? o += an(i + 1) + d + `={{
` + ta(
                g,
                v,
                i + 2
              ) + an(i + 1) + `}}
` : (o += Ic(i + 1) + d + "=" + L + `
`, o += si(i + 1) + d + "=" + h + `
`);
            } else
              o += an(i + 1) + d + "=" + Mu(t[d], h) + `
`;
          }
        f.forEach(function(Q) {
          if (Q !== "children") {
            var B = 120 - 2 * (i + 1) - Q.length - 1;
            o += si(i + 1) + Q + "=" + Mu(n[Q], B) + `
`;
          }
        }), o = o === "" ? an(i) + "<" + e + `>
` : an(i) + "<" + e + `
` + o + an(i) + `>
`;
      }
      return e = n.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += hs(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + hs("" + t, null, i + 1) : o + hs("" + t, void 0, i + 1)), o;
    }
    function xh(e, t) {
      var n = Yn(e);
      if (n === null) {
        for (n = "", e = e.child; e; )
          n += xh(e, t), e = e.sibling;
        return n;
      }
      return an(t) + "<" + n + `>
`;
    }
    function Cf(e, t) {
      var n = ds(e, t);
      if (n !== e && (e.children.length !== 1 || e.children[0] !== n))
        return an(t) + `...
` + Cf(n, t + 1);
      n = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (n += an(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = hs(o, e.serverProps, t), t++;
      else if (f = Yn(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (g in o)
            if (o.hasOwnProperty(g) && g !== "children") {
              var v = Mu(o[g], 15);
              if (d -= g.length + v.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + g + "=" + v;
            }
          i = an(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = Uh(
            f,
            o,
            Ic(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = Hh(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var g = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (g += Cf(d, t), f++) : g += xh(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (g += an(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], g = typeof f == "string" ? g + (si(t) + Pc(f, 120 - 2 * t) + `
`) : g + Uh(
          f.type,
          f.props,
          si(t)
        );
      return n + i + g;
    }
    function di(e) {
      try {
        return `

` + Cf(e, 0);
      } catch {
        return "";
      }
    }
    function Nh(e, t, n) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? n : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? di(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function wh(e, t) {
      var n = je({}, e || Kd), i = { tag: t };
      return Lr.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), xm.indexOf(t) !== -1 && (n.pTagInButtonScope = null), Hm.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = i, t === "form" && (n.formTag = i), t === "a" && (n.aTagInScope = i), t === "button" && (n.buttonTagInScope = i), t === "nobr" && (n.nobrTagInScope = i), t === "p" && (n.pTagInButtonScope = i), t === "li" && (n.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? n.containerTagInScope = null : n.containerTagInScope || (n.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? n.implicitRootScope === !0 && (n.implicitRootScope = !1) : n.implicitRootScope = !0, n;
    }
    function tc(e, t, n) {
      switch (t) {
        case "select":
          return e === "hr" || e === "option" || e === "optgroup" || e === "script" || e === "template" || e === "#text";
        case "optgroup":
          return e === "option" || e === "#text";
        case "option":
          return e === "#text";
        case "tr":
          return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
        case "tbody":
        case "thead":
        case "tfoot":
          return e === "tr" || e === "style" || e === "script" || e === "template";
        case "colgroup":
          return e === "col" || e === "template";
        case "table":
          return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
        case "head":
          return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
        case "html":
          if (n) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!n) return e === "html";
      }
      switch (e) {
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
        case "rp":
        case "rt":
          return Uv.indexOf(t) === -1;
        case "caption":
        case "col":
        case "colgroup":
        case "frameset":
        case "frame":
        case "tbody":
        case "td":
        case "tfoot":
        case "th":
        case "thead":
        case "tr":
          return t == null;
        case "head":
          return n || t === null;
        case "html":
          return n && t === "#document" || t === null;
        case "body":
          return n && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function Rg(e, t) {
      switch (e) {
        case "address":
        case "article":
        case "aside":
        case "blockquote":
        case "center":
        case "details":
        case "dialog":
        case "dir":
        case "div":
        case "dl":
        case "fieldset":
        case "figcaption":
        case "figure":
        case "footer":
        case "header":
        case "hgroup":
        case "main":
        case "menu":
        case "nav":
        case "ol":
        case "p":
        case "section":
        case "summary":
        case "ul":
        case "pre":
        case "listing":
        case "table":
        case "hr":
        case "xmp":
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return t.pTagInButtonScope;
        case "form":
          return t.formTag || t.pTagInButtonScope;
        case "li":
          return t.listItemTagAutoclosing;
        case "dd":
        case "dt":
          return t.dlItemTagAutoclosing;
        case "button":
          return t.buttonTagInScope;
        case "a":
          return t.aTagInScope;
        case "nobr":
          return t.nobrTagInScope;
      }
      return null;
    }
    function qh(e, t) {
      for (; e; ) {
        switch (e.tag) {
          case 5:
          case 26:
          case 27:
            if (e.type === t) return e;
        }
        e = e.return;
      }
      return null;
    }
    function ys(e, t) {
      t = t || Kd;
      var n = t.current;
      if (t = (n = tc(
        e,
        n && n.tag,
        t.implicitRootScope
      ) ? null : n) ? null : Rg(e, t), t = n || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!n) + "|" + e + "|" + i, Xa[t]) return !1;
      Xa[t] = !0;
      var o = (t = Zl) ? qh(t.return, i) : null, f = t !== null && o !== null ? Nh(o, t, null) : "", d = "<" + e + ">";
      return n ? (n = "", i === "table" && e === "tr" && (n += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        n,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || Ae(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function lo(e, t, n) {
      if (n || tc("#text", t, !1))
        return !0;
      if (n = "#text|" + t, Xa[n]) return !1;
      Xa[n] = !0;
      var i = (n = Zl) ? qh(n, t) : null;
      return n = n !== null && i !== null ? Nh(
        i,
        n,
        n.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        n
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        n
      ), !1;
    }
    function Uf(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function Ag(e) {
      return e.replace(Xg, function(t, n) {
        return n.toUpperCase();
      });
    }
    function Hf(e, t, n) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? du.hasOwnProperty(t) && du[t] || (du[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        Ag(t.replace(Zi, "ms-"))
      )) : Gr.test(t) ? du.hasOwnProperty(t) && du[t] || (du[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !Nm.test(n) || wm.hasOwnProperty(n) && wm[n] || (wm[n] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        n.replace(Nm, "")
      )), typeof n == "number" && (isNaN(n) ? qm || (qm = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(n) || Vr || (Vr = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), n == null || typeof n == "boolean" || n === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Bm.has(t) ? t === "float" ? e.cssFloat = n : (re(n, t), e[t] = ("" + n).trim()) : e[t] = n + "px";
    }
    function ms(e, t, n) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, n != null) {
        if (t) {
          var i = {};
          if (n) {
            for (var o in n)
              if (n.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = su[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!n || n[h] !== t[h]))
              for (o = su[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var v in t)
            for (o = su[v] || [v], f = 0; f < o.length; f++)
              h[o[f]] = v;
          v = {};
          for (var g in i)
            if (o = i[g], (f = h[g]) && o !== f && (d = o + "," + f, !v[d])) {
              v[d] = !0, d = console;
              var L = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                L == null || typeof L == "boolean" || L === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var Q in n)
          !n.hasOwnProperty(Q) || t != null && t.hasOwnProperty(Q) || (Q.indexOf("--") === 0 ? e.setProperty(Q, "") : Q === "float" ? e.cssFloat = "" : e[Q] = "");
        for (var B in t)
          g = t[B], t.hasOwnProperty(B) && n[B] !== g && Hf(e, B, g);
      } else
        for (i in t)
          t.hasOwnProperty(i) && Hf(e, i, t[i]);
    }
    function lc(e) {
      if (e.indexOf("-") === -1) return !1;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function nc(e) {
      return kd.get(e) || e;
    }
    function no(e, t) {
      if (ou.call(Ki, t) && Ki[t])
        return !0;
      if (Hv.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = uf.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), Ki[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), Ki[t] = !0;
      }
      if ($d.test(t)) {
        if (e = t.toLowerCase(), e = uf.hasOwnProperty(e) ? e : null, e == null) return Ki[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), Ki[t] = !0);
      }
      return !0;
    }
    function _p(e, t) {
      var n = [], i;
      for (i in t)
        no(e, i) || n.push(i);
      t = n.map(function(o) {
        return "`" + o + "`";
      }).join(", "), n.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < n.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function Bh(e, t, n, i) {
      if (ou.call(xl, t) && xl[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), xl[t] = !0;
      if (typeof n == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), xl[t] = !0;
        if (l.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), xl[t] = !0;
      } else if (l.test(t))
        return a.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), xl[t] = !0;
      if (u.test(t) || c.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), xl[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), xl[t] = !0;
      if (o === "is" && n !== null && n !== void 0 && typeof n != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof n
        ), xl[t] = !0;
      if (typeof n == "number" && isNaN(n))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), xl[t] = !0;
      if (Xr.hasOwnProperty(o)) {
        if (o = Xr[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), xl[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), xl[t] = !0;
      switch (t) {
        case "dangerouslySetInnerHTML":
        case "children":
        case "style":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          return !0;
        case "innerText":
        case "textContent":
          return !0;
      }
      switch (typeof n) {
        case "boolean":
          switch (t) {
            case "autoFocus":
            case "checked":
            case "multiple":
            case "muted":
            case "selected":
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
            case "capture":
            case "download":
            case "inert":
              return !0;
            default:
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (n ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                n,
                t,
                t,
                n,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                n,
                t,
                t,
                n,
                t,
                t,
                t
              ), xl[t] = !0);
          }
        case "function":
        case "symbol":
          return xl[t] = !0, !1;
        case "string":
          if (n === "false" || n === "true") {
            switch (t) {
              case "checked":
              case "selected":
              case "multiple":
              case "muted":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "inert":
                break;
              default:
                return !0;
            }
            console.error(
              "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
              n,
              t,
              n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              n
            ), xl[t] = !0;
          }
      }
      return !0;
    }
    function Cp(e, t, n) {
      var i = [], o;
      for (o in t)
        Bh(e, o, t[o], n) || i.push(o);
      t = i.map(function(f) {
        return "`" + f + "`";
      }).join(", "), i.length === 1 ? console.error(
        "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      ) : 1 < i.length && console.error(
        "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
        t,
        e
      );
    }
    function zu(e) {
      return r.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function Sa(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function ps(e) {
      var t = yn(e);
      if (t && (e = t.stateNode)) {
        var n = e[xn] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (zh(
              e,
              n.value,
              n.defaultValue,
              n.defaultValue,
              n.checked,
              n.defaultChecked,
              n.type,
              n.name
            ), t = n.name, n.type === "radio" && t != null) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (Z(t, "name"), n = n.querySelectorAll(
                'input[name="' + zl(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < n.length; t++) {
                var i = n[t];
                if (i !== e && i.form === e.form) {
                  var o = i[xn] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  zh(
                    i,
                    o.value,
                    o.defaultValue,
                    o.defaultValue,
                    o.checked,
                    o.defaultChecked,
                    o.type,
                    o.name
                  );
                }
              }
              for (t = 0; t < n.length; t++)
                i = n[t], i.form === e.form && Mh(i);
            }
            break e;
          case "textarea":
            Ch(e, n.value, n.defaultValue);
            break e;
          case "select":
            t = n.value, t != null && Du(e, !!n.multiple, t, !1);
        }
      }
    }
    function ao(e, t, n) {
      if (b) return e(t, n);
      b = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (b = !1, (y !== null || m !== null) && (Dc(), y && (t = y, e = m, m = y = null, ps(t), e)))
          for (t = 0; t < e.length; t++) ps(e[t]);
      }
    }
    function la(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var i = n[xn] || null;
      if (i === null) return null;
      n = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (i = !i.disabled) || (e = e.type, i = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !i;
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof n + "` type."
        );
      return n;
    }
    function vs() {
      if (Ue) return Ue;
      var e, t = G, n = t.length, i, o = "value" in w ? w.value : w.textContent, f = o.length;
      for (e = 0; e < n && t[e] === o[e]; e++) ;
      var d = n - e;
      for (i = 1; i <= d && t[n - i] === o[f - i]; i++) ;
      return Ue = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function ac(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function xf() {
      return !0;
    }
    function Nf() {
      return !1;
    }
    function Ll(e) {
      function t(n, i, o, f, d) {
        this._reactName = n, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (n = e[h], this[h] = n ? n(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? xf : Nf, this.isPropagationStopped = Nf, this;
      }
      return je(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var n = this.nativeEvent;
          n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = xf);
        },
        stopPropagation: function() {
          var n = this.nativeEvent;
          n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = xf);
        },
        persist: function() {
        },
        isPersistent: xf
      }), t;
    }
    function Up(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = P1[e]) ? !!t[e] : !1;
    }
    function Fl() {
      return Up;
    }
    function hi(e, t) {
      switch (e) {
        case "keyup":
          return sT.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== dS;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function wf(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function qf(e, t) {
      switch (e) {
        case "compositionend":
          return wf(t);
        case "keypress":
          return t.which !== yS ? null : (pS = !0, mS);
        case "textInput":
          return e = t.data, e === mS && pS ? null : e;
        default:
          return null;
      }
    }
    function Og(e, t) {
      if (Wd)
        return e === "compositionend" || !Zg && hi(e, t) ? (e = vs(), Ue = G = w = null, Wd = !1, e) : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return hS && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function gs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!hT[e.type] : t === "textarea";
    }
    function Yh(e) {
      if (!x) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function uo(e, t, n, i) {
      y ? m ? m.push(i) : m = [i] : y = i, t = en(t, "onChange"), 0 < t.length && (n = new Mt(
        "onChange",
        "change",
        null,
        n,
        i
      ), e.push({ event: n, listeners: t }));
    }
    function Ss(e) {
      em(e, 0);
    }
    function Bf(e) {
      var t = ea(e);
      if (Mh(t)) return e;
    }
    function Hp(e, t) {
      if (e === "change") return t;
    }
    function xp() {
      jm && (jm.detachEvent("onpropertychange", Np), Lm = jm = null);
    }
    function Np(e) {
      if (e.propertyName === "value" && Bf(Lm)) {
        var t = [];
        uo(
          t,
          Lm,
          e,
          Sa(e)
        ), ao(Ss, t);
      }
    }
    function jh(e, t, n) {
      e === "focusin" ? (xp(), jm = t, Lm = n, jm.attachEvent("onpropertychange", Np)) : e === "focusout" && xp();
    }
    function Dg(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Bf(Lm);
    }
    function Mg(e, t) {
      if (e === "click") return Bf(t);
    }
    function zg(e, t) {
      if (e === "input" || e === "change")
        return Bf(t);
    }
    function _g(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function Yf(e, t) {
      if ($n(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var n = Object.keys(e), i = Object.keys(t);
      if (n.length !== i.length) return !1;
      for (i = 0; i < n.length; i++) {
        var o = n[i];
        if (!ou.call(t, o) || !$n(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function Lh(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function wp(e, t) {
      var n = Lh(e);
      e = 0;
      for (var i; n; ) {
        if (n.nodeType === 3) {
          if (i = e + n.textContent.length, e <= t && i >= t)
            return { node: n, offset: t - e };
          e = i;
        }
        e: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Lh(n);
      }
    }
    function qp(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? qp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function Bp(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = zf(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = typeof t.contentWindow.location.href == "string";
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = zf(e.document);
      }
      return t;
    }
    function Gh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function bs(e, t, n) {
      var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Jg || Fd == null || Fd !== zf(i) || (i = Fd, "selectionStart" in i && Gh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Gm && Yf(Gm, i) || (Gm = i, i = en(Kg, "onSelect"), 0 < i.length && (t = new Mt(
        "onSelect",
        "select",
        null,
        t,
        n
      ), e.push({ event: t, listeners: i }), t.target = Fd)));
    }
    function uc(e, t) {
      var n = {};
      return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
    }
    function ic(e) {
      if (kg[e]) return kg[e];
      if (!Id[e]) return e;
      var t = Id[e], n;
      for (n in t)
        if (t.hasOwnProperty(n) && n in gS)
          return kg[e] = t[n];
      return e;
    }
    function ba(e, t) {
      RS.set(e, t), oe(t, [e]);
    }
    function mn(e, t) {
      if (typeof e == "object" && e !== null) {
        var n = Wg.get(e);
        return n !== void 0 ? n : (t = {
          value: e,
          source: t,
          stack: Dp(t)
        }, Wg.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: Dp(t)
      };
    }
    function Ts() {
      for (var e = Pd, t = Ig = Pd = 0; t < e; ) {
        var n = yu[t];
        yu[t++] = null;
        var i = yu[t];
        yu[t++] = null;
        var o = yu[t];
        yu[t++] = null;
        var f = yu[t];
        if (yu[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && Yp(n, o, f);
      }
    }
    function Es(e, t, n, i) {
      yu[Pd++] = e, yu[Pd++] = t, yu[Pd++] = n, yu[Pd++] = i, Ig |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function Vh(e, t, n, i) {
      return Es(e, t, n, i), Rs(e);
    }
    function pn(e, t) {
      return Es(e, null, null, t), Rs(e);
    }
    function Yp(e, t, n) {
      e.lanes |= n;
      var i = e.alternate;
      i !== null && (i.lanes |= n);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= n, i = f.alternate, i !== null && (i.childLanes |= n), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & Fg || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - Hl(n), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = n | 536870912), f) : null;
    }
    function Rs(e) {
      if (fp > qT)
        throw ns = fp = 0, rp = z0 = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      ns > BT && (ns = 0, rp = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && (e.flags & 4098) !== 0 && Wy(e);
      for (var t = e, n = t.return; n !== null; )
        t.alternate === null && (t.flags & 4098) !== 0 && Wy(e), t = n, n = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function cc(e) {
      if (mu === null) return e;
      var t = mu(e);
      return t === void 0 ? e : t.current;
    }
    function Xh(e) {
      if (mu === null) return e;
      var t = mu(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = cc(e.render), e.render !== t) ? (t = { $$typeof: Gi, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function jp(e, t) {
      if (mu === null) return !1;
      var n = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === Jn) && (i = !0);
          break;
        case 11:
          (o === Gi || o === Jn) && (i = !0);
          break;
        case 14:
        case 15:
          (o === wd || o === Jn) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = mu(n), e !== void 0 && e === mu(t)));
    }
    function As(e) {
      mu !== null && typeof WeakSet == "function" && (eh === null && (eh = /* @__PURE__ */ new WeakSet()), eh.add(e));
    }
    function oc(e, t, n) {
      var i = e.alternate, o = e.child, f = e.sibling, d = e.tag, h = e.type, v = null;
      switch (d) {
        case 0:
        case 15:
        case 1:
          v = h;
          break;
        case 11:
          v = h.render;
      }
      if (mu === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var g = !1;
      h = !1, v !== null && (v = mu(v), v !== void 0 && (n.has(v) ? h = !0 : t.has(v) && (d === 1 ? h = !0 : g = !0))), eh !== null && (eh.has(e) || i !== null && eh.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || g) && (i = pn(e, 2), i !== null && nt(i, e, 2)), o === null || h || oc(
        o,
        t,
        n
      ), f !== null && oc(
        f,
        t,
        n
      );
    }
    function Cg(e, t, n, i) {
      this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, OS || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function Os(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function Pa(e, t) {
      var n = e.alternate;
      switch (n === null ? (n = _(
        e.tag,
        t,
        e.key,
        e.mode
      ), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugOwner = e._debugOwner, n._debugStack = e._debugStack, n._debugTask = e._debugTask, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null, n.actualDuration = -0, n.actualStartTime = -1.1), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugInfo = e._debugInfo, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
        case 0:
        case 15:
          n.type = cc(e.type);
          break;
        case 1:
          n.type = cc(e.type);
          break;
        case 11:
          n.type = Xh(e.type);
      }
      return n;
    }
    function Qh(e, t) {
      e.flags &= 65011714;
      var n = e.alternate;
      return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration), e;
    }
    function Ds(e, t, n, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        Os(e) && (d = 1), h = cc(h);
      else if (typeof e == "string")
        d = j(), d = Ad(e, n, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case qd:
            return t = _(31, n, t, o), t.elementType = qd, t.lanes = f, t;
          case Li:
            return na(
              n.children,
              o,
              f,
              t
            );
          case xc:
            d = 8, o |= Nn, o |= ai;
            break;
          case _r:
            return e = n, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = _(12, e, t, i | rn), t.elementType = _r, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case Vi:
            return t = _(13, n, t, o), t.elementType = Vi, t.lanes = f, t;
          case Nd:
            return t = _(19, n, t, o), t.elementType = Nd, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case bv:
                case Hn:
                  d = 10;
                  break e;
                case Cr:
                  d = 9;
                  break e;
                case Gi:
                  d = 11, h = Xh(h);
                  break e;
                case wd:
                  d = 14;
                  break e;
                case Jn:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? n = "null" : Al(e) ? n = "array" : e !== void 0 && e.$$typeof === Fu ? (n = "<" + (Oe(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : n = typeof e, (d = i ? Rt(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, n = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (n + "." + h)
            ), h = null;
        }
      return t = _(d, n, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function jf(e, t, n) {
      return t = Ds(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        n
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function na(e, t, n, i) {
      return e = _(7, e, i, t), e.lanes = n, e;
    }
    function Zh(e, t, n) {
      return e = _(6, e, null, t), e.lanes = n, e;
    }
    function Kh(e, t, n) {
      return t = _(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = n, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function fc(e, t) {
      Ta(), th[lh++] = wv, th[lh++] = Nv, Nv = e, wv = t;
    }
    function Jh(e, t, n) {
      Ta(), pu[vu++] = Bc, pu[vu++] = Yc, pu[vu++] = Zr, Zr = e;
      var i = Bc;
      e = Yc;
      var o = 32 - Hl(i) - 1;
      i &= ~(1 << o), n += 1;
      var f = 32 - Hl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, Bc = 1 << 32 - Hl(t) + o | n << o | i, Yc = f + e;
      } else
        Bc = 1 << f | n << o | i, Yc = e;
    }
    function Ms(e) {
      Ta(), e.return !== null && (fc(e, 1), Jh(e, 1, 0));
    }
    function rc(e) {
      for (; e === Nv; )
        Nv = th[--lh], th[lh] = null, wv = th[--lh], th[lh] = null;
      for (; e === Zr; )
        Zr = pu[--vu], pu[vu] = null, Yc = pu[--vu], pu[vu] = null, Bc = pu[--vu], pu[vu] = null;
    }
    function Ta() {
      Et || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function sc(e, t) {
      if (e.return === null) {
        if (gu === null)
          gu = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (gu.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          gu.distanceFromLeaf > t && (gu.distanceFromLeaf = t);
        }
        return gu;
      }
      var n = sc(
        e.return,
        t + 1
      ).children;
      return 0 < n.length && n[n.length - 1].fiber === e ? (n = n[n.length - 1], n.distanceFromLeaf > t && (n.distanceFromLeaf = t), n) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, n.push(t), t);
    }
    function io(e, t) {
      jc || (e = sc(e, 0), e.serverProps = null, t !== null && (t = Sd(t), e.serverTail.push(t)));
    }
    function yi(e) {
      var t = "", n = gu;
      throw n !== null && (gu = null, t = di(n)), oo(
        mn(
          Error(
            `Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

https://react.dev/link/hydration-mismatch` + t
          ),
          e
        )
      ), Pg;
    }
    function kh(e) {
      var t = e.stateNode, n = e.type, i = e.memoizedProps;
      switch (t[tn] = e, t[xn] = i, Zu(n, i), n) {
        case "dialog":
          at("cancel", t), at("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          at("load", t);
          break;
        case "video":
        case "audio":
          for (n = 0; n < sp.length; n++)
            at(sp[n], t);
          break;
        case "source":
          at("error", t);
          break;
        case "img":
        case "image":
        case "link":
          at("error", t), at("load", t);
          break;
        case "details":
          at("toggle", t);
          break;
        case "input":
          Te("input", i), at("invalid", t), Pi(t, i), _h(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), ol(t);
          break;
        case "option":
          zp(t, i);
          break;
        case "select":
          Te("select", i), at("invalid", t), Ia(t, i);
          break;
        case "textarea":
          Te("textarea", i), at("invalid", t), ss(t, i), ec(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), ol(t);
      }
      n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || i.suppressHydrationWarning === !0 || Cc(t.textContent, n) ? (i.popover != null && (at("beforetoggle", t), at("toggle", t)), i.onScroll != null && at("scroll", t), i.onScrollEnd != null && at("scrollend", t), i.onClick != null && (t.onclick = Ui), t = !0) : t = !1, t || yi(e);
    }
    function zs(e) {
      for (Wn = e.return; Wn; )
        switch (Wn.tag) {
          case 5:
          case 13:
            Ji = !1;
            return;
          case 27:
          case 3:
            Ji = !0;
            return;
          default:
            Wn = Wn.return;
        }
    }
    function dc(e) {
      if (e !== Wn) return !1;
      if (!Et)
        return zs(e), Et = !0, !1;
      var t = e.tag, n;
      if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || xi(e.type, e.memoizedProps)), n = !n), n && gl) {
        for (n = gl; n; ) {
          var i = sc(e, 0), o = Sd(n);
          i.serverTail.push(o), n = o.type === "Suspense" ? Zo(n) : Cn(n.nextSibling);
        }
        yi(e);
      }
      if (zs(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        gl = Zo(e);
      } else
        t === 27 ? (t = gl, Rl(e.type) ? (e = L0, L0 = null, gl = e) : gl = t) : gl = Wn ? Cn(e.stateNode.nextSibling) : null;
      return !0;
    }
    function co() {
      gl = Wn = null, jc = Et = !1;
    }
    function $h() {
      var e = Kr;
      return e !== null && (Pn === null ? Pn = e : Pn.push.apply(
        Pn,
        e
      ), Kr = null), e;
    }
    function oo(e) {
      Kr === null ? Kr = [e] : Kr.push(e);
    }
    function Lp() {
      var e = gu;
      if (e !== null) {
        gu = null;
        for (var t = di(e); 0 < e.children.length; )
          e = e.children[0];
        Ae(e.fiber, function() {
          console.error(
            `A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:

- A server/client branch \`if (typeof window !== 'undefined')\`.
- Variable input such as \`Date.now()\` or \`Math.random()\` which changes each time it's called.
- Date formatting in a user's locale which doesn't match the server.
- External changing data without sending a snapshot of it along with the HTML.
- Invalid HTML tag nesting.

It can also happen if the client has a browser extension installed which messes with the HTML before React loaded.

%s%s`,
            "https://react.dev/link/hydration-mismatch",
            t
          );
        });
      }
    }
    function _s() {
      nh = qv = null, ah = !1;
    }
    function mi(e, t, n) {
      Ne(e0, t._currentValue, e), t._currentValue = n, Ne(t0, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== _S && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = _S;
    }
    function _u(e, t) {
      e._currentValue = e0.current;
      var n = t0.current;
      Se(t0, t), e._currentRenderer = n, Se(e0, t);
    }
    function Wh(e, t, n) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === n) break;
        e = e.return;
      }
      e !== n && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function un(e, t, n, i) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var f = o.dependencies;
        if (f !== null) {
          var d = o.child;
          f = f.firstContext;
          e: for (; f !== null; ) {
            var h = f;
            f = o;
            for (var v = 0; v < t.length; v++)
              if (h.context === t[v]) {
                f.lanes |= n, h = f.alternate, h !== null && (h.lanes |= n), Wh(
                  f.return,
                  n,
                  e
                ), i || (d = null);
                break e;
              }
            f = h.next;
          }
        } else if (o.tag === 18) {
          if (d = o.return, d === null)
            throw Error(
              "We just came from a parent so we must have had a parent. This is a bug in React."
            );
          d.lanes |= n, f = d.alternate, f !== null && (f.lanes |= n), Wh(
            d,
            n,
            e
          ), d = null;
        } else d = o.child;
        if (d !== null) d.return = o;
        else
          for (d = o; d !== null; ) {
            if (d === e) {
              d = null;
              break;
            }
            if (o = d.sibling, o !== null) {
              o.return = d.return, d = o;
              break;
            }
            d = d.return;
          }
        o = d;
      }
    }
    function Cu(e, t, n, i) {
      e = null;
      for (var o = t, f = !1; o !== null; ) {
        if (!f) {
          if ((o.flags & 524288) !== 0) f = !0;
          else if ((o.flags & 262144) !== 0) break;
        }
        if (o.tag === 10) {
          var d = o.alternate;
          if (d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          if (d = d.memoizedProps, d !== null) {
            var h = o.type;
            $n(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === Bd.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(mp) : e = [mp]);
        }
        o = o.return;
      }
      e !== null && un(
        t,
        e,
        n,
        i
      ), t.flags |= 262144;
    }
    function Lf(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!$n(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function pi(e) {
      qv = e, nh = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function Xt(e) {
      return ah && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), Cs(qv, e);
    }
    function Gf(e, t) {
      return qv === null && pi(e), Cs(e, t);
    }
    function Cs(e, t) {
      var n = t._currentValue;
      if (t = { context: t, memoizedValue: n, next: null }, nh === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        nh = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else nh = nh.next = t;
      return n;
    }
    function Fh() {
      return {
        controller: new TT(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function aa(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function hc(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && ET(RT, function() {
        e.controller.abort();
      });
    }
    function jn() {
      var e = Jr;
      return Jr = 0, e;
    }
    function fo(e) {
      var t = Jr;
      return Jr = e, t;
    }
    function ro(e) {
      var t = Jr;
      return Jr += e, t;
    }
    function Uu(e) {
      ya = uh(), 0 > e.actualStartTime && (e.actualStartTime = ya);
    }
    function vi(e) {
      if (0 <= ya) {
        var t = uh() - ya;
        e.actualDuration += t, e.selfBaseDuration = t, ya = -1;
      }
    }
    function Us(e) {
      if (0 <= ya) {
        var t = uh() - ya;
        e.actualDuration += t, ya = -1;
      }
    }
    function Ea() {
      if (0 <= ya) {
        var e = uh() - ya;
        ya = -1, Jr += e;
      }
    }
    function Il() {
      ya = uh();
    }
    function Vf(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Gp(e, t) {
      if (Vm === null) {
        var n = Vm = [];
        l0 = 0, kr = md(), ih = {
          status: "pending",
          value: void 0,
          then: function(i) {
            n.push(i);
          }
        };
      }
      return l0++, t.then(Ih, Ih), t;
    }
    function Ih() {
      if (--l0 === 0 && Vm !== null) {
        ih !== null && (ih.status = "fulfilled");
        var e = Vm;
        Vm = null, kr = 0, ih = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function Ug(e, t) {
      var n = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          n.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < n.length; o++) (0, n[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < n.length; o++)
            (0, n[o])(void 0);
        }
      ), i;
    }
    function Ph() {
      var e = $r.current;
      return e !== null ? e : Jt.pooledCache;
    }
    function Hs(e, t) {
      t === null ? Ne($r, $r.current, e) : Ne($r, t.pool, e);
    }
    function ey() {
      var e = Ph();
      return e === null ? null : { parent: Kl._currentValue, pool: e };
    }
    function ty() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function xs(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function vn() {
    }
    function ly(e, t, n) {
      Y.actQueue !== null && (Y.didUsePromise = !0);
      var i = e.thenables;
      switch (n = i[n], n === void 0 ? i.push(t) : n !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(vn, vn), t = n), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, Gn(e), e;
        default:
          if (typeof t.status == "string")
            t.then(vn, vn);
          else {
            if (e = Jt, e !== null && 100 < e.shellSuspendCounter)
              throw Error(
                "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
              );
            e = t, e.status = "pending", e.then(
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "fulfilled", f.value = o;
                }
              },
              function(o) {
                if (t.status === "pending") {
                  var f = t;
                  f.status = "rejected", f.reason = o;
                }
              }
            );
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw e = t.reason, Gn(e), e;
          }
          throw Wm = t, Vv = !0, $m;
      }
    }
    function Ln() {
      if (Wm === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Wm;
      return Wm = null, Vv = !1, e;
    }
    function Gn(e) {
      if (e === $m || e === Gv)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function gi(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Xf(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function Ra(e) {
      return {
        lane: e,
        tag: NS,
        payload: null,
        callback: null,
        next: null
      };
    }
    function Aa(e, t, n) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, u0 === i && !BS) {
        var o = pe(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), BS = !0;
      }
      return (Ut & In) !== Qa ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = Rs(e), Yp(e, null, n), t) : (Es(e, i, t, n), Rs(e));
    }
    function yc(e, t, n) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, n |= i, t.lanes = n, dl(e, n);
      }
    }
    function Hu(e, t) {
      var n = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, n === i)) {
        var o = null, f = null;
        if (n = n.firstBaseUpdate, n !== null) {
          do {
            var d = {
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, n = n.next;
          } while (n !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        n = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = n;
        return;
      }
      e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
    }
    function so() {
      if (i0) {
        var e = ih;
        if (e !== null) throw e;
      }
    }
    function Si(e, t, n, i) {
      i0 = !1;
      var o = e.updateQueue;
      of = !1, u0 = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var v = h, g = v.next;
        v.next = null, d === null ? f = g : d.next = g, d = v;
        var L = e.alternate;
        L !== null && (L = L.updateQueue, h = L.lastBaseUpdate, h !== d && (h === null ? L.firstBaseUpdate = g : h.next = g, L.lastBaseUpdate = v));
      }
      if (f !== null) {
        var Q = o.baseState;
        d = 0, L = g = v = null, h = f;
        do {
          var B = h.lane & -536870913, K = B !== h.lane;
          if (K ? (rt & B) === B : (i & B) === B) {
            B !== 0 && B === kr && (i0 = !0), L !== null && (L = L.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              B = e;
              var Ee = h, we = t, kt = n;
              switch (Ee.tag) {
                case wS:
                  if (Ee = Ee.payload, typeof Ee == "function") {
                    ah = !0;
                    var ht = Ee.call(
                      kt,
                      Q,
                      we
                    );
                    if (B.mode & Nn) {
                      qe(!0);
                      try {
                        Ee.call(kt, Q, we);
                      } finally {
                        qe(!1);
                      }
                    }
                    ah = !1, Q = ht;
                    break e;
                  }
                  Q = Ee;
                  break e;
                case a0:
                  B.flags = B.flags & -65537 | 128;
                case NS:
                  if (ht = Ee.payload, typeof ht == "function") {
                    if (ah = !0, Ee = ht.call(
                      kt,
                      Q,
                      we
                    ), B.mode & Nn) {
                      qe(!0);
                      try {
                        ht.call(kt, Q, we);
                      } finally {
                        qe(!1);
                      }
                    }
                    ah = !1;
                  } else Ee = ht;
                  if (Ee == null) break e;
                  Q = je({}, Q, Ee);
                  break e;
                case qS:
                  of = !0;
              }
            }
            B = h.callback, B !== null && (e.flags |= 64, K && (e.flags |= 8192), K = o.callbacks, K === null ? o.callbacks = [B] : K.push(B));
          } else
            K = {
              lane: B,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, L === null ? (g = L = K, v = Q) : L = L.next = K, d |= B;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            K = h, h = K.next, K.next = null, o.lastBaseUpdate = K, o.shared.pending = null;
          }
        } while (!0);
        L === null && (v = Q), o.baseState = v, o.firstBaseUpdate = g, o.lastBaseUpdate = L, f === null && (o.shared.lanes = 0), df |= d, e.lanes = d, e.memoizedState = Q;
      }
      u0 = null;
    }
    function mc(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function Hg(e, t) {
      var n = e.shared.hiddenCallbacks;
      if (n !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < n.length; e++)
          mc(n[e], t);
    }
    function gn(e, t) {
      var n = e.callbacks;
      if (n !== null)
        for (e.callbacks = null, e = 0; e < n.length; e++)
          mc(n[e], t);
    }
    function Ns(e, t) {
      var n = Wi;
      Ne(Xv, n, e), Ne(ch, t, e), Wi = n | t.baseLanes;
    }
    function Oa(e) {
      Ne(Xv, Wi, e), Ne(
        ch,
        ch.current,
        e
      );
    }
    function ws(e) {
      Wi = Xv.current, Se(ch, e), Se(Xv, e);
    }
    function ke() {
      var e = X;
      Tu === null ? Tu = [e] : Tu.push(e);
    }
    function ne() {
      var e = X;
      if (Tu !== null && (Gc++, Tu[Gc] !== e)) {
        var t = pe(Le);
        if (!YS.has(t) && (YS.add(t), Tu !== null)) {
          for (var n = "", i = 0; i <= Gc; i++) {
            var o = Tu[i], f = i === Gc ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, n += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            n
          );
        }
      }
    }
    function bi(e) {
      e == null || Al(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        X,
        typeof e
      );
    }
    function ho() {
      var e = pe(Le);
      LS.has(e) || (LS.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function Lt() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function Ti(e, t) {
      if (Im) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          X
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        X,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!$n(e[n], t[n])) return !1;
      return !0;
    }
    function yo(e, t, n, i, o, f) {
      ff = f, Le = t, Tu = e !== null ? e._debugHookTypes : null, Gc = -1, Im = e !== null && e.type !== t.type, (Object.prototype.toString.call(n) === "[object AsyncFunction]" || Object.prototype.toString.call(n) === "[object AsyncGeneratorFunction]") && (f = pe(Le), c0.has(f) || (c0.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Y.H = e !== null && e.memoizedState !== null ? f0 : Tu !== null ? GS : o0, Fr = f = (t.mode & Nn) !== Wt;
      var d = r0(n, i, o);
      if (Fr = !1, fh && (d = Sn(
        t,
        n,
        i,
        o
      )), f) {
        qe(!0);
        try {
          d = Sn(
            t,
            n,
            i,
            o
          );
        } finally {
          qe(!1);
        }
      }
      return Qf(e, t), d;
    }
    function Qf(e, t) {
      t._debugHookTypes = Tu, t.dependencies === null ? Lc !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Lc
      }) : t.dependencies._debugThenableState = Lc, Y.H = Kv;
      var n = Gt !== null && Gt.next !== null;
      if (ff = 0, Tu = X = wl = Gt = Le = null, Gc = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), Qv = !1, Fm = 0, Lc = null, n)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || ln || (e = e.dependencies, e !== null && Lf(e) && (ln = !0)), Vv ? (Vv = !1, e = !0) : e = !1, e && (t = pe(t) || "Unknown", jS.has(t) || c0.has(t) || (jS.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function Sn(e, t, n, i) {
      Le = e;
      var o = 0;
      do {
        if (fh && (Lc = null), Fm = 0, fh = !1, o >= OT)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, Im = !1, wl = Gt = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Gc = -1, Y.H = VS, f = r0(t, n, i);
      } while (fh);
      return f;
    }
    function ua() {
      var e = Y.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? pc(t) : t, e = e.useState()[0], (Gt !== null ? Gt.memoizedState : null) !== e && (Le.flags |= 1024), t;
    }
    function xu() {
      var e = Zv !== 0;
      return Zv = 0, e;
    }
    function Da(e, t, n) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & ai) !== Wt ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~n;
    }
    function Ma(e) {
      if (Qv) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Qv = !1;
      }
      ff = 0, Tu = wl = Gt = Le = null, Gc = -1, X = null, fh = !1, Fm = Zv = 0, Lc = null;
    }
    function yl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return wl === null ? Le.memoizedState = wl = e : wl = wl.next = e, wl;
    }
    function _t() {
      if (Gt === null) {
        var e = Le.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = Gt.next;
      var t = wl === null ? Le.memoizedState : wl.next;
      if (t !== null)
        wl = t, Gt = e;
      else {
        if (e === null)
          throw Le.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        Gt = e, e = {
          memoizedState: Gt.memoizedState,
          baseState: Gt.baseState,
          baseQueue: Gt.baseQueue,
          queue: Gt.queue,
          next: null
        }, wl === null ? Le.memoizedState = wl = e : wl = wl.next = e;
      }
      return wl;
    }
    function Zf() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function pc(e) {
      var t = Fm;
      return Fm += 1, Lc === null && (Lc = ty()), e = ly(Lc, e, t), t = Le, (wl === null ? t.memoizedState : wl.next) === null && (t = t.alternate, Y.H = t !== null && t.memoizedState !== null ? f0 : o0), e;
    }
    function ll(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return pc(e);
        if (e.$$typeof === Hn) return Xt(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function Ht(e) {
      var t = null, n = Le.updateQueue;
      if (n !== null && (t = n.memoCache), t == null) {
        var i = Le.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), n === null && (n = Zf(), Le.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0 || Im)
        for (n = t.data[t.index] = Array(e), i = 0; i < e; i++)
          n[i] = Tv;
      else
        n.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          n.length,
          e
        );
      return t.index++, n;
    }
    function $e(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Nu(e, t, n) {
      var i = yl();
      if (n !== void 0) {
        var o = n(t);
        if (Fr) {
          qe(!0);
          try {
            n(t);
          } finally {
            qe(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = tr.bind(
        null,
        Le,
        e
      ), [i.memoizedState, e];
    }
    function cn(e) {
      var t = _t();
      return Kf(t, Gt, e);
    }
    function Kf(e, t, n) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = n;
      var o = e.baseQueue, f = i.pending;
      if (f !== null) {
        if (o !== null) {
          var d = o.next;
          o.next = f.next, f.next = d;
        }
        t.baseQueue !== o && console.error(
          "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
        ), t.baseQueue = o = f, i.pending = null;
      }
      if (f = e.baseState, o === null) e.memoizedState = f;
      else {
        t = o.next;
        var h = d = null, v = null, g = t, L = !1;
        do {
          var Q = g.lane & -536870913;
          if (Q !== g.lane ? (rt & Q) === Q : (ff & Q) === Q) {
            var B = g.revertLane;
            if (B === 0)
              v !== null && (v = v.next = {
                lane: 0,
                revertLane: 0,
                action: g.action,
                hasEagerState: g.hasEagerState,
                eagerState: g.eagerState,
                next: null
              }), Q === kr && (L = !0);
            else if ((ff & B) === B) {
              g = g.next, B === kr && (L = !0);
              continue;
            } else
              Q = {
                lane: 0,
                revertLane: g.revertLane,
                action: g.action,
                hasEagerState: g.hasEagerState,
                eagerState: g.eagerState,
                next: null
              }, v === null ? (h = v = Q, d = f) : v = v.next = Q, Le.lanes |= B, df |= B;
            Q = g.action, Fr && n(f, Q), f = g.hasEagerState ? g.eagerState : n(f, Q);
          } else
            B = {
              lane: Q,
              revertLane: g.revertLane,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, v === null ? (h = v = B, d = f) : v = v.next = B, Le.lanes |= Q, df |= Q;
          g = g.next;
        } while (g !== null && g !== t);
        if (v === null ? d = f : v.next = h, !$n(f, e.memoizedState) && (ln = !0, L && (n = ih, n !== null)))
          throw n;
        e.memoizedState = f, e.baseState = d, e.baseQueue = v, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function za(e) {
      var t = _t(), n = t.queue;
      if (n === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      n.lastRenderedReducer = e;
      var i = n.dispatch, o = n.pending, f = t.memoizedState;
      if (o !== null) {
        n.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        $n(f, t.memoizedState) || (ln = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), n.lastRenderedState = f;
      }
      return [f, i];
    }
    function qs(e, t, n) {
      var i = Le, o = yl();
      if (Et) {
        if (n === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = n();
        oh || f === n() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), oh = !0);
      } else {
        if (f = t(), oh || (n = t(), $n(f, n) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), oh = !0)), Jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (rt & 124) !== 0 || mo(i, t, f);
      }
      return o.memoizedState = f, n = { value: f, getSnapshot: t }, o.queue = n, Wf(
        ny.bind(null, i, n, e),
        [e]
      ), i.flags |= 2048, lu(
        bu | Jl,
        bo(),
        po.bind(
          null,
          i,
          n,
          f,
          t
        ),
        null
      ), f;
    }
    function Jf(e, t, n) {
      var i = Le, o = _t(), f = Et;
      if (f) {
        if (n === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        n = n();
      } else if (n = t(), !oh) {
        var d = t();
        $n(n, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), oh = !0);
      }
      (d = !$n(
        (Gt || o).memoizedState,
        n
      )) && (o.memoizedState = n, ln = !0), o = o.queue;
      var h = ny.bind(null, i, o, e);
      if (bn(2048, Jl, h, [e]), o.getSnapshot !== t || d || wl !== null && wl.memoizedState.tag & bu) {
        if (i.flags |= 2048, lu(
          bu | Jl,
          bo(),
          po.bind(
            null,
            i,
            o,
            n,
            t
          ),
          null
        ), Jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (ff & 124) !== 0 || mo(i, t, n);
      }
      return n;
    }
    function mo(e, t, n) {
      e.flags |= 16384, e = { getSnapshot: t, value: n }, t = Le.updateQueue, t === null ? (t = Zf(), Le.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
    }
    function po(e, t, n, i) {
      t.value = n, t.getSnapshot = i, vo(t) && Bs(e);
    }
    function ny(e, t, n) {
      return n(function() {
        vo(t) && Bs(e);
      });
    }
    function vo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !$n(e, n);
      } catch {
        return !0;
      }
    }
    function Bs(e) {
      var t = pn(e, 2);
      t !== null && nt(t, e, 2);
    }
    function wu(e) {
      var t = yl();
      if (typeof e == "function") {
        var n = e;
        if (e = n(), Fr) {
          qe(!0);
          try {
            n();
          } finally {
            qe(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: $e,
        lastRenderedState: e
      }, t;
    }
    function _a(e) {
      e = wu(e);
      var t = e.queue, n = Do.bind(null, Le, t);
      return t.dispatch = n, [e.memoizedState, n];
    }
    function eu(e) {
      var t = yl();
      t.memoizedState = t.baseState = e;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = n, t = Qs.bind(
        null,
        Le,
        !0,
        n
      ), n.dispatch = t, [e, t];
    }
    function tu(e, t) {
      var n = _t();
      return Ys(n, Gt, e, t);
    }
    function Ys(e, t, n, i) {
      return e.baseState = n, Kf(
        e,
        Gt,
        typeof i == "function" ? i : $e
      );
    }
    function js(e, t) {
      var n = _t();
      return Gt !== null ? Ys(n, Gt, e, t) : (n.baseState = e, [e, n.queue.dispatch]);
    }
    function kf(e, t, n, i, o) {
      if (ju(e))
        throw Error("Cannot update form state while rendering.");
      if (e = t.action, e !== null) {
        var f = {
          payload: o,
          action: e,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(d) {
            f.listeners.push(d);
          }
        };
        Y.T !== null ? n(!0) : f.isTransition = !1, i(f), n = t.pending, n === null ? (f.next = t.pending = f, $f(t, f)) : (f.next = n.next, t.pending = n.next = f);
      }
    }
    function $f(e, t) {
      var n = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = Y.T, d = {};
        Y.T = d, Y.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = n(o, i), v = Y.S;
          v !== null && v(d, h), Ei(e, t, h);
        } catch (g) {
          go(e, t, g);
        } finally {
          Y.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = n(o, i), Ei(e, t, d);
        } catch (g) {
          go(e, t, g);
        }
    }
    function Ei(e, t, n) {
      n !== null && typeof n == "object" && typeof n.then == "function" ? (n.then(
        function(i) {
          Gl(e, t, i);
        },
        function(i) {
          return go(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Gl(e, t, n);
    }
    function Gl(e, t, n) {
      t.status = "fulfilled", t.value = n, ay(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, $f(e, n)));
    }
    function go(e, t, n) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = n, ay(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function ay(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Vp(e, t) {
      return t;
    }
    function So(e, t) {
      if (Et) {
        var n = Jt.formState;
        if (n !== null) {
          e: {
            var i = Le;
            if (Et) {
              if (gl) {
                t: {
                  for (var o = gl, f = Ji; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = Cn(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === q0 || f === Lb ? o : null;
                }
                if (o) {
                  gl = Cn(
                    o.nextSibling
                  ), i = o.data === q0;
                  break e;
                }
              }
              yi(i);
            }
            i = !1;
          }
          i && (t = n[0]);
        }
      }
      return n = yl(), n.memoizedState = n.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vp,
        lastRenderedState: t
      }, n.queue = i, n = Do.bind(
        null,
        Le,
        i
      ), i.dispatch = n, i = wu(!1), f = Qs.bind(
        null,
        Le,
        !1,
        i.queue
      ), i = yl(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, n = kf.bind(
        null,
        Le,
        o,
        f,
        n
      ), o.dispatch = n, i.memoizedState = e, [t, n, !1];
    }
    function Ls(e) {
      var t = _t();
      return ml(t, Gt, e);
    }
    function ml(e, t, n) {
      if (t = Kf(
        e,
        t,
        Vp
      )[0], e = cn($e)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = pc(t);
        } catch (d) {
          throw d === $m ? Gv : d;
        }
      else i = t;
      t = _t();
      var o = t.queue, f = o.dispatch;
      return n !== t.memoizedState && (Le.flags |= 2048, lu(
        bu | Jl,
        bo(),
        uy.bind(null, o, n),
        null
      )), [i, f, e];
    }
    function uy(e, t) {
      e.action = t;
    }
    function Ri(e) {
      var t = _t(), n = Gt;
      if (n !== null)
        return ml(t, n, e);
      _t(), t = t.memoizedState, n = _t();
      var i = n.queue.dispatch;
      return n.memoizedState = e, [t, i, !1];
    }
    function lu(e, t, n, i) {
      return e = {
        tag: e,
        create: n,
        deps: i,
        inst: t,
        next: null
      }, t = Le.updateQueue, t === null && (t = Zf(), Le.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (i = n.next, n.next = e, e.next = i, t.lastEffect = e), e;
    }
    function bo() {
      return { destroy: void 0, resource: void 0 };
    }
    function Ai(e) {
      var t = yl();
      return e = { current: e }, t.memoizedState = e;
    }
    function ia(e, t, n, i) {
      var o = yl();
      i = i === void 0 ? null : i, Le.flags |= e, o.memoizedState = lu(
        bu | t,
        bo(),
        n,
        i
      );
    }
    function bn(e, t, n, i) {
      var o = _t();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      Gt !== null && i !== null && Ti(i, Gt.memoizedState.deps) ? o.memoizedState = lu(t, f, n, i) : (Le.flags |= e, o.memoizedState = lu(
        bu | t,
        f,
        n,
        i
      ));
    }
    function Wf(e, t) {
      (Le.mode & ai) !== Wt && (Le.mode & AS) === Wt ? ia(276826112, Jl, e, t) : ia(8390656, Jl, e, t);
    }
    function iy(e, t) {
      var n = 4194308;
      return (Le.mode & ai) !== Wt && (n |= 134217728), ia(n, sn, e, t);
    }
    function cy(e, t) {
      if (typeof t == "function") {
        e = e();
        var n = t(e);
        return function() {
          typeof n == "function" ? n() : t(null);
        };
      }
      if (t != null)
        return t.hasOwnProperty("current") || console.error(
          "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
          "an object with keys {" + Object.keys(t).join(", ") + "}"
        ), e = e(), t.current = e, function() {
          t.current = null;
        };
    }
    function qu(e, t, n) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), n = n != null ? n.concat([e]) : null;
      var i = 4194308;
      (Le.mode & ai) !== Wt && (i |= 134217728), ia(
        i,
        sn,
        cy.bind(null, t, e),
        n
      );
    }
    function To(e, t, n) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), n = n != null ? n.concat([e]) : null, bn(
        4,
        sn,
        cy.bind(null, t, e),
        n
      );
    }
    function Eo(e, t) {
      return yl().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function Ff(e, t) {
      var n = _t();
      t = t === void 0 ? null : t;
      var i = n.memoizedState;
      return t !== null && Ti(t, i[1]) ? i[0] : (n.memoizedState = [e, t], e);
    }
    function vc(e, t) {
      var n = yl();
      t = t === void 0 ? null : t;
      var i = e();
      if (Fr) {
        qe(!0);
        try {
          e();
        } finally {
          qe(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    }
    function If(e, t) {
      var n = _t();
      t = t === void 0 ? null : t;
      var i = n.memoizedState;
      if (t !== null && Ti(t, i[1]))
        return i[0];
      if (i = e(), Fr) {
        qe(!0);
        try {
          e();
        } finally {
          qe(!1);
        }
      }
      return n.memoizedState = [i, t], i;
    }
    function Ro(e, t) {
      var n = yl();
      return Ao(n, e, t);
    }
    function Gs(e, t) {
      var n = _t();
      return fy(
        n,
        Gt.memoizedState,
        e,
        t
      );
    }
    function oy(e, t) {
      var n = _t();
      return Gt === null ? Ao(n, e, t) : fy(
        n,
        Gt.memoizedState,
        e,
        t
      );
    }
    function Ao(e, t, n) {
      return n === void 0 || (ff & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = n, e = Ly(), Le.lanes |= e, df |= e, n);
    }
    function fy(e, t, n, i) {
      return $n(n, t) ? n : ch.current !== null ? (e = Ao(e, n, i), $n(e, t) || (ln = !0), e) : (ff & 42) === 0 ? (ln = !0, e.memoizedState = n) : (e = Ly(), Le.lanes |= e, df |= e, t);
    }
    function Oo(e, t, n, i, o) {
      var f = Dt.p;
      Dt.p = f !== 0 && f < fu ? f : fu;
      var d = Y.T, h = {};
      Y.T = h, Qs(e, !1, t, n), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var v = o(), g = Y.S;
        if (g !== null && g(h, v), v !== null && typeof v == "object" && typeof v.then == "function") {
          var L = Ug(
            v,
            i
          );
          Mo(
            e,
            t,
            L,
            Xn(e)
          );
        } else
          Mo(
            e,
            t,
            i,
            Xn(e)
          );
      } catch (Q) {
        Mo(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: Q },
          Xn(e)
        );
      } finally {
        Dt.p = f, Y.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Vs(e, t, n, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = ry(e).queue;
      Oo(
        e,
        o,
        t,
        os,
        n === null ? ue : function() {
          return Bu(e), n(i);
        }
      );
    }
    function ry(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: os,
        baseState: os,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $e,
          lastRenderedState: os
        },
        next: null
      };
      var n = {};
      return t.next = {
        memoizedState: n,
        baseState: n,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: $e,
          lastRenderedState: n
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Bu(e) {
      Y.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = ry(e).next.queue;
      Mo(
        e,
        t,
        {},
        Xn(e)
      );
    }
    function Pf() {
      var e = wu(!1);
      return e = Oo.bind(
        null,
        Le,
        e.queue,
        !0,
        !1
      ), yl().memoizedState = e, [!1, e];
    }
    function Xs() {
      var e = cn($e)[0], t = _t().memoizedState;
      return [
        typeof e == "boolean" ? e : pc(e),
        t
      ];
    }
    function Yu() {
      var e = za($e)[0], t = _t().memoizedState;
      return [
        typeof e == "boolean" ? e : pc(e),
        t
      ];
    }
    function Tn() {
      return Xt(mp);
    }
    function gc() {
      var e = yl(), t = Jt.identifierPrefix;
      if (Et) {
        var n = Yc, i = Bc;
        n = (i & ~(1 << 32 - Hl(i) - 1)).toString(32) + n, t = "«" + t + "R" + n, n = Zv++, 0 < n && (t += "H" + n.toString(32)), t += "»";
      } else
        n = AT++, t = "«" + t + "r" + n.toString(32) + "»";
      return e.memoizedState = t;
    }
    function er() {
      return yl().memoizedState = sy.bind(
        null,
        Le
      );
    }
    function sy(e, t) {
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case 24:
          case 3:
            var i = Xn(n);
            e = Ra(i);
            var o = Aa(n, e, i);
            o !== null && (nt(o, n, i), yc(o, n, i)), n = Fh(), t != null && o !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: n };
            return;
        }
        n = n.return;
      }
    }
    function tr(e, t, n) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Xn(e);
      var o = {
        lane: i,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      ju(e) ? lr(t, o) : (o = Vh(e, t, o, i), o !== null && (nt(o, e, i), dy(o, t, i))), mt(e, i);
    }
    function Do(e, t, n) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Xn(e), Mo(e, t, n, i), mt(e, i);
    }
    function Mo(e, t, n, i) {
      var o = {
        lane: i,
        revertLane: 0,
        action: n,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (ju(e)) lr(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = Y.H;
          Y.H = ii;
          try {
            var h = t.lastRenderedState, v = f(h, n);
            if (o.hasEagerState = !0, o.eagerState = v, $n(v, h))
              return Es(e, t, o, 0), Jt === null && Ts(), !1;
          } catch {
          } finally {
            Y.H = d;
          }
        }
        if (n = Vh(e, t, o, i), n !== null)
          return nt(n, e, i), dy(n, t, i), !0;
      }
      return !1;
    }
    function Qs(e, t, n, i) {
      if (Y.T === null && kr === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: md(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, ju(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = Vh(
          e,
          n,
          i,
          2
        ), t !== null && nt(t, e, 2);
      mt(e, 2);
    }
    function ju(e) {
      var t = e.alternate;
      return e === Le || t !== null && t === Le;
    }
    function lr(e, t) {
      fh = Qv = !0;
      var n = e.pending;
      n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
    }
    function dy(e, t, n) {
      if ((n & 4194048) !== 0) {
        var i = t.lanes;
        i &= e.pendingLanes, n |= i, t.lanes = n, dl(e, n);
      }
    }
    function Tl(e) {
      var t = Pe;
      return e != null && (Pe = t === null ? e : t.concat(e)), t;
    }
    function zo(e, t, n) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = jf(e, n.mode, 0), t._debugInfo = Pe, t.return = n), Ae(
            t,
            function(d) {
              console.error(
                "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                d
              );
            },
            f
          );
          break;
        }
      }
    }
    function Ca(e) {
      var t = Pm;
      return Pm += 1, rh === null && (rh = ty()), ly(rh, e, t);
    }
    function Ve(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function Ot(e, t) {
      throw t.$$typeof === jg ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function Pt(e, t) {
      var n = pe(e) || "Component";
      nb[n] || (nb[n] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  root.render(%s)`,
        t,
        t,
        t
      ) : console.error(
        `Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.
  <%s>{%s}</%s>`,
        t,
        t,
        n,
        t,
        n
      ));
    }
    function Sc(e, t) {
      var n = pe(e) || "Component";
      ab[n] || (ab[n] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        n,
        t,
        n
      ));
    }
    function bc(e) {
      function t(T, R) {
        if (e) {
          var M = T.deletions;
          M === null ? (T.deletions = [R], T.flags |= 16) : M.push(R);
        }
      }
      function n(T, R) {
        if (!e) return null;
        for (; R !== null; )
          t(T, R), R = R.sibling;
        return null;
      }
      function i(T) {
        for (var R = /* @__PURE__ */ new Map(); T !== null; )
          T.key !== null ? R.set(T.key, T) : R.set(T.index, T), T = T.sibling;
        return R;
      }
      function o(T, R) {
        return T = Pa(T, R), T.index = 0, T.sibling = null, T;
      }
      function f(T, R, M) {
        return T.index = M, e ? (M = T.alternate, M !== null ? (M = M.index, M < R ? (T.flags |= 67108866, R) : M) : (T.flags |= 67108866, R)) : (T.flags |= 1048576, R);
      }
      function d(T) {
        return e && T.alternate === null && (T.flags |= 67108866), T;
      }
      function h(T, R, M, J) {
        return R === null || R.tag !== 6 ? (R = Zh(
          M,
          T.mode,
          J
        ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = Pe, R) : (R = o(R, M), R.return = T, R._debugInfo = Pe, R);
      }
      function v(T, R, M, J) {
        var de = M.type;
        return de === Li ? (R = L(
          T,
          R,
          M.props.children,
          J,
          M.key
        ), zo(M, R, T), R) : R !== null && (R.elementType === de || jp(R, M) || typeof de == "object" && de !== null && de.$$typeof === Jn && rf(de) === R.type) ? (R = o(R, M.props), Ve(R, M), R.return = T, R._debugOwner = M._owner, R._debugInfo = Pe, R) : (R = jf(M, T.mode, J), Ve(R, M), R.return = T, R._debugInfo = Pe, R);
      }
      function g(T, R, M, J) {
        return R === null || R.tag !== 4 || R.stateNode.containerInfo !== M.containerInfo || R.stateNode.implementation !== M.implementation ? (R = Kh(M, T.mode, J), R.return = T, R._debugInfo = Pe, R) : (R = o(R, M.children || []), R.return = T, R._debugInfo = Pe, R);
      }
      function L(T, R, M, J, de) {
        return R === null || R.tag !== 7 ? (R = na(
          M,
          T.mode,
          J,
          de
        ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = Pe, R) : (R = o(R, M), R.return = T, R._debugInfo = Pe, R);
      }
      function Q(T, R, M) {
        if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
          return R = Zh(
            "" + R,
            T.mode,
            M
          ), R.return = T, R._debugOwner = T, R._debugTask = T._debugTask, R._debugInfo = Pe, R;
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case Fu:
              return M = jf(
                R,
                T.mode,
                M
              ), Ve(M, R), M.return = T, T = Tl(R._debugInfo), M._debugInfo = Pe, Pe = T, M;
            case Qe:
              return R = Kh(
                R,
                T.mode,
                M
              ), R.return = T, R._debugInfo = Pe, R;
            case Jn:
              var J = Tl(R._debugInfo);
              return R = rf(R), T = Q(T, R, M), Pe = J, T;
          }
          if (Al(R) || tt(R))
            return M = na(
              R,
              T.mode,
              M,
              null
            ), M.return = T, M._debugOwner = T, M._debugTask = T._debugTask, T = Tl(R._debugInfo), M._debugInfo = Pe, Pe = T, M;
          if (typeof R.then == "function")
            return J = Tl(R._debugInfo), T = Q(
              T,
              Ca(R),
              M
            ), Pe = J, T;
          if (R.$$typeof === Hn)
            return Q(
              T,
              Gf(T, R),
              M
            );
          Ot(T, R);
        }
        return typeof R == "function" && Pt(T, R), typeof R == "symbol" && Sc(T, R), null;
      }
      function B(T, R, M, J) {
        var de = R !== null ? R.key : null;
        if (typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint")
          return de !== null ? null : h(T, R, "" + M, J);
        if (typeof M == "object" && M !== null) {
          switch (M.$$typeof) {
            case Fu:
              return M.key === de ? (de = Tl(M._debugInfo), T = v(
                T,
                R,
                M,
                J
              ), Pe = de, T) : null;
            case Qe:
              return M.key === de ? g(T, R, M, J) : null;
            case Jn:
              return de = Tl(M._debugInfo), M = rf(M), T = B(
                T,
                R,
                M,
                J
              ), Pe = de, T;
          }
          if (Al(M) || tt(M))
            return de !== null ? null : (de = Tl(M._debugInfo), T = L(
              T,
              R,
              M,
              J,
              null
            ), Pe = de, T);
          if (typeof M.then == "function")
            return de = Tl(M._debugInfo), T = B(
              T,
              R,
              Ca(M),
              J
            ), Pe = de, T;
          if (M.$$typeof === Hn)
            return B(
              T,
              R,
              Gf(T, M),
              J
            );
          Ot(T, M);
        }
        return typeof M == "function" && Pt(T, M), typeof M == "symbol" && Sc(T, M), null;
      }
      function K(T, R, M, J, de) {
        if (typeof J == "string" && J !== "" || typeof J == "number" || typeof J == "bigint")
          return T = T.get(M) || null, h(R, T, "" + J, de);
        if (typeof J == "object" && J !== null) {
          switch (J.$$typeof) {
            case Fu:
              return M = T.get(
                J.key === null ? M : J.key
              ) || null, T = Tl(J._debugInfo), R = v(
                R,
                M,
                J,
                de
              ), Pe = T, R;
            case Qe:
              return T = T.get(
                J.key === null ? M : J.key
              ) || null, g(R, T, J, de);
            case Jn:
              var Ze = Tl(J._debugInfo);
              return J = rf(J), R = K(
                T,
                R,
                M,
                J,
                de
              ), Pe = Ze, R;
          }
          if (Al(J) || tt(J))
            return M = T.get(M) || null, T = Tl(J._debugInfo), R = L(
              R,
              M,
              J,
              de,
              null
            ), Pe = T, R;
          if (typeof J.then == "function")
            return Ze = Tl(J._debugInfo), R = K(
              T,
              R,
              M,
              Ca(J),
              de
            ), Pe = Ze, R;
          if (J.$$typeof === Hn)
            return K(
              T,
              R,
              M,
              Gf(R, J),
              de
            );
          Ot(R, J);
        }
        return typeof J == "function" && Pt(R, J), typeof J == "symbol" && Sc(R, J), null;
      }
      function Ee(T, R, M, J) {
        if (typeof M != "object" || M === null) return J;
        switch (M.$$typeof) {
          case Fu:
          case Qe:
            te(T, R, M);
            var de = M.key;
            if (typeof de != "string") break;
            if (J === null) {
              J = /* @__PURE__ */ new Set(), J.add(de);
              break;
            }
            if (!J.has(de)) {
              J.add(de);
              break;
            }
            Ae(R, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                de
              );
            });
            break;
          case Jn:
            M = rf(M), Ee(T, R, M, J);
        }
        return J;
      }
      function we(T, R, M, J) {
        for (var de = null, Ze = null, Re = null, Ke = R, Fe = R = 0, Ft = null; Ke !== null && Fe < M.length; Fe++) {
          Ke.index > Fe ? (Ft = Ke, Ke = null) : Ft = Ke.sibling;
          var Dl = B(
            T,
            Ke,
            M[Fe],
            J
          );
          if (Dl === null) {
            Ke === null && (Ke = Ft);
            break;
          }
          de = Ee(
            T,
            Dl,
            M[Fe],
            de
          ), e && Ke && Dl.alternate === null && t(T, Ke), R = f(Dl, R, Fe), Re === null ? Ze = Dl : Re.sibling = Dl, Re = Dl, Ke = Ft;
        }
        if (Fe === M.length)
          return n(T, Ke), Et && fc(T, Fe), Ze;
        if (Ke === null) {
          for (; Fe < M.length; Fe++)
            Ke = Q(T, M[Fe], J), Ke !== null && (de = Ee(
              T,
              Ke,
              M[Fe],
              de
            ), R = f(
              Ke,
              R,
              Fe
            ), Re === null ? Ze = Ke : Re.sibling = Ke, Re = Ke);
          return Et && fc(T, Fe), Ze;
        }
        for (Ke = i(Ke); Fe < M.length; Fe++)
          Ft = K(
            Ke,
            T,
            Fe,
            M[Fe],
            J
          ), Ft !== null && (de = Ee(
            T,
            Ft,
            M[Fe],
            de
          ), e && Ft.alternate !== null && Ke.delete(
            Ft.key === null ? Fe : Ft.key
          ), R = f(
            Ft,
            R,
            Fe
          ), Re === null ? Ze = Ft : Re.sibling = Ft, Re = Ft);
        return e && Ke.forEach(function(Jc) {
          return t(T, Jc);
        }), Et && fc(T, Fe), Ze;
      }
      function kt(T, R, M, J) {
        if (M == null)
          throw Error("An iterable object provided no iterator.");
        for (var de = null, Ze = null, Re = R, Ke = R = 0, Fe = null, Ft = null, Dl = M.next(); Re !== null && !Dl.done; Ke++, Dl = M.next()) {
          Re.index > Ke ? (Fe = Re, Re = null) : Fe = Re.sibling;
          var Jc = B(T, Re, Dl.value, J);
          if (Jc === null) {
            Re === null && (Re = Fe);
            break;
          }
          Ft = Ee(
            T,
            Jc,
            Dl.value,
            Ft
          ), e && Re && Jc.alternate === null && t(T, Re), R = f(Jc, R, Ke), Ze === null ? de = Jc : Ze.sibling = Jc, Ze = Jc, Re = Fe;
        }
        if (Dl.done)
          return n(T, Re), Et && fc(T, Ke), de;
        if (Re === null) {
          for (; !Dl.done; Ke++, Dl = M.next())
            Re = Q(T, Dl.value, J), Re !== null && (Ft = Ee(
              T,
              Re,
              Dl.value,
              Ft
            ), R = f(
              Re,
              R,
              Ke
            ), Ze === null ? de = Re : Ze.sibling = Re, Ze = Re);
          return Et && fc(T, Ke), de;
        }
        for (Re = i(Re); !Dl.done; Ke++, Dl = M.next())
          Fe = K(
            Re,
            T,
            Ke,
            Dl.value,
            J
          ), Fe !== null && (Ft = Ee(
            T,
            Fe,
            Dl.value,
            Ft
          ), e && Fe.alternate !== null && Re.delete(
            Fe.key === null ? Ke : Fe.key
          ), R = f(
            Fe,
            R,
            Ke
          ), Ze === null ? de = Fe : Ze.sibling = Fe, Ze = Fe);
        return e && Re.forEach(function(FT) {
          return t(T, FT);
        }), Et && fc(T, Ke), de;
      }
      function ht(T, R, M, J) {
        if (typeof M == "object" && M !== null && M.type === Li && M.key === null && (zo(M, null, T), M = M.props.children), typeof M == "object" && M !== null) {
          switch (M.$$typeof) {
            case Fu:
              var de = Tl(M._debugInfo);
              e: {
                for (var Ze = M.key; R !== null; ) {
                  if (R.key === Ze) {
                    if (Ze = M.type, Ze === Li) {
                      if (R.tag === 7) {
                        n(
                          T,
                          R.sibling
                        ), J = o(
                          R,
                          M.props.children
                        ), J.return = T, J._debugOwner = M._owner, J._debugInfo = Pe, zo(M, J, T), T = J;
                        break e;
                      }
                    } else if (R.elementType === Ze || jp(
                      R,
                      M
                    ) || typeof Ze == "object" && Ze !== null && Ze.$$typeof === Jn && rf(Ze) === R.type) {
                      n(
                        T,
                        R.sibling
                      ), J = o(R, M.props), Ve(J, M), J.return = T, J._debugOwner = M._owner, J._debugInfo = Pe, T = J;
                      break e;
                    }
                    n(T, R);
                    break;
                  } else t(T, R);
                  R = R.sibling;
                }
                M.type === Li ? (J = na(
                  M.props.children,
                  T.mode,
                  J,
                  M.key
                ), J.return = T, J._debugOwner = T, J._debugTask = T._debugTask, J._debugInfo = Pe, zo(M, J, T), T = J) : (J = jf(
                  M,
                  T.mode,
                  J
                ), Ve(J, M), J.return = T, J._debugInfo = Pe, T = J);
              }
              return T = d(T), Pe = de, T;
            case Qe:
              e: {
                for (de = M, M = de.key; R !== null; ) {
                  if (R.key === M)
                    if (R.tag === 4 && R.stateNode.containerInfo === de.containerInfo && R.stateNode.implementation === de.implementation) {
                      n(
                        T,
                        R.sibling
                      ), J = o(
                        R,
                        de.children || []
                      ), J.return = T, T = J;
                      break e;
                    } else {
                      n(T, R);
                      break;
                    }
                  else t(T, R);
                  R = R.sibling;
                }
                J = Kh(
                  de,
                  T.mode,
                  J
                ), J.return = T, T = J;
              }
              return d(T);
            case Jn:
              return de = Tl(M._debugInfo), M = rf(M), T = ht(
                T,
                R,
                M,
                J
              ), Pe = de, T;
          }
          if (Al(M))
            return de = Tl(M._debugInfo), T = we(
              T,
              R,
              M,
              J
            ), Pe = de, T;
          if (tt(M)) {
            if (de = Tl(M._debugInfo), Ze = tt(M), typeof Ze != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var Re = Ze.call(M);
            return Re === M ? (T.tag !== 0 || Object.prototype.toString.call(T.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(Re) !== "[object Generator]") && (tb || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), tb = !0) : M.entries !== Ze || d0 || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), d0 = !0), T = kt(
              T,
              R,
              Re,
              J
            ), Pe = de, T;
          }
          if (typeof M.then == "function")
            return de = Tl(M._debugInfo), T = ht(
              T,
              R,
              Ca(M),
              J
            ), Pe = de, T;
          if (M.$$typeof === Hn)
            return ht(
              T,
              R,
              Gf(T, M),
              J
            );
          Ot(T, M);
        }
        return typeof M == "string" && M !== "" || typeof M == "number" || typeof M == "bigint" ? (de = "" + M, R !== null && R.tag === 6 ? (n(
          T,
          R.sibling
        ), J = o(R, de), J.return = T, T = J) : (n(T, R), J = Zh(
          de,
          T.mode,
          J
        ), J.return = T, J._debugOwner = T, J._debugTask = T._debugTask, J._debugInfo = Pe, T = J), d(T)) : (typeof M == "function" && Pt(T, M), typeof M == "symbol" && Sc(T, M), n(T, R));
      }
      return function(T, R, M, J) {
        var de = Pe;
        Pe = null;
        try {
          Pm = 0;
          var Ze = ht(
            T,
            R,
            M,
            J
          );
          return rh = null, Ze;
        } catch (Ft) {
          if (Ft === $m || Ft === Gv) throw Ft;
          var Re = _(29, Ft, null, T.mode);
          Re.lanes = J, Re.return = T;
          var Ke = Re._debugInfo = Pe;
          if (Re._debugOwner = T._debugOwner, Re._debugTask = T._debugTask, Ke != null) {
            for (var Fe = Ke.length - 1; 0 <= Fe; Fe--)
              if (typeof Ke[Fe].stack == "string") {
                Re._debugOwner = Ke[Fe], Re._debugTask = Ke[Fe].debugTask;
                break;
              }
          }
          return Re;
        } finally {
          Pe = de;
        }
      };
    }
    function En(e) {
      var t = e.alternate;
      Ne(
        kl,
        kl.current & dh,
        e
      ), Ne(Eu, e, e), $i === null && (t === null || ch.current !== null || t.memoizedState !== null) && ($i = e);
    }
    function nr(e) {
      if (e.tag === 22) {
        if (Ne(kl, kl.current, e), Ne(Eu, e, e), $i === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && ($i = e);
        }
      } else ca(e);
    }
    function ca(e) {
      Ne(kl, kl.current, e), Ne(
        Eu,
        Eu.current,
        e
      );
    }
    function Rn(e) {
      Se(Eu, e), $i === e && ($i = null), Se(kl, e);
    }
    function Zs(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && (n = n.dehydrated, n === null || n.data === Qc || Bi(n)))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if ((t.flags & 128) !== 0) return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    function el(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        pb.has(t) || (pb.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function ar(e, t, n, i) {
      var o = e.memoizedState, f = n(i, o);
      if (e.mode & Nn) {
        qe(!0);
        try {
          f = n(i, o);
        } finally {
          qe(!1);
        }
      }
      f === void 0 && (t = Oe(t) || "Component", db.has(t) || (db.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : je({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function Ks(e, t, n, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (n = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & Nn) {
          qe(!0);
          try {
            n = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            qe(!1);
          }
        }
        return n === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          Oe(t) || "Component"
        ), n;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Yf(n, i) || !Yf(o, f) : !0;
    }
    function hy(e, t, n, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, i), t.state !== o && (e = pe(e) || "Component", cb.has(e) || (cb.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), h0.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function Oi(e, t) {
      var n = t;
      if ("ref" in t) {
        n = {};
        for (var i in t)
          i !== "ref" && (n[i] = t[i]);
      }
      if (e = e.defaultProps) {
        n === t && (n = je({}, n));
        for (var o in e)
          n[o] === void 0 && (n[o] = e[o]);
      }
      return n;
    }
    function Xp(e) {
      y0(e), console.warn(
        `%s

%s
`,
        hh ? "An error occurred in the <" + hh + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function Js(e) {
      var t = hh ? "The above error occurred in the <" + hh + "> component." : "The above error occurred in one of your React components.", n = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((m0 || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          n
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          kb + e[0],
          $b,
          sg + i + sg,
          Wb
        ) : e.splice(
          0,
          0,
          kb,
          $b,
          sg + i + sg,
          Wb
        ), e.unshift(console), i = $T.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          n
        );
    }
    function ks(e) {
      y0(e);
    }
    function _o(e, t) {
      try {
        hh = t.source ? pe(t.source) : null, m0 = null;
        var n = t.value;
        if (Y.actQueue !== null)
          Y.thrownErrors.push(n);
        else {
          var i = e.onUncaughtError;
          i(n, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function on(e, t, n) {
      try {
        hh = n.source ? pe(n.source) : null, m0 = pe(t);
        var i = e.onCaughtError;
        i(n.value, {
          componentStack: n.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function nl(e, t, n) {
      return n = Ra(n), n.tag = a0, n.payload = { element: null }, n.callback = function() {
        Ae(t.source, _o, e, t);
      }, n;
    }
    function ur(e) {
      return e = Ra(e), e.tag = a0, e;
    }
    function Tc(e, t, n, i) {
      var o = n.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          As(n), Ae(
            i.source,
            on,
            t,
            n,
            i
          );
        };
      }
      var d = n.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        As(n), Ae(
          i.source,
          on,
          t,
          n,
          i
        ), typeof o != "function" && (yf === null ? yf = /* @__PURE__ */ new Set([this]) : yf.add(this)), DT(this, i), typeof o == "function" || (n.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          pe(n) || "Unknown"
        );
      });
    }
    function $s(e, t, n, i, o) {
      if (n.flags |= 32768, ha && zc(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = n.alternate, t !== null && Cu(
          t,
          n,
          o,
          !0
        ), Et && (jc = !0), n = Eu.current, n !== null) {
          switch (n.tag) {
            case 13:
              return $i === null ? fd() : n.alternate === null && Sl === Xc && (Sl = S0), n.flags &= -257, n.flags |= 65536, n.lanes = o, i === n0 ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), $y(e, i, o)), !1;
            case 22:
              return n.flags |= 65536, i === n0 ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), $y(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + n.tag + "). This is a bug in React."
          );
        }
        return $y(e, i, o), fd(), !1;
      }
      if (Et)
        return jc = !0, t = Eu.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Pg && oo(
          mn(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            n
          )
        )) : (i !== Pg && oo(
          mn(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            n
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = mn(i, n), o = nl(
          e.stateNode,
          i,
          o
        ), Hu(e, o), Sl !== Ir && (Sl = vh)), !1;
      var f = mn(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        n
      );
      if (cp === null ? cp = [f] : cp.push(f), Sl !== Ir && (Sl = vh), t === null) return !0;
      i = mn(i, n), n = t;
      do {
        switch (n.tag) {
          case 3:
            return n.flags |= 65536, e = o & -o, n.lanes |= e, e = nl(
              n.stateNode,
              i,
              e
            ), Hu(n, e), !1;
          case 1:
            if (t = n.type, f = n.stateNode, (n.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (yf === null || !yf.has(f))))
              return n.flags |= 65536, o &= -o, n.lanes |= o, o = ur(o), Tc(
                o,
                e,
                n,
                i
              ), Hu(n, o), !1;
        }
        n = n.return;
      } while (n !== null);
      return !1;
    }
    function El(e, t, n, i) {
      t.child = e === null ? ub(t, null, n, i) : sh(
        t,
        e.child,
        n,
        i
      );
    }
    function nu(e, t, n, i, o) {
      n = n.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return pi(t), Vt(t), i = yo(
        e,
        t,
        n,
        d,
        f,
        o
      ), h = xu(), Ml(), e !== null && !ln ? (Da(e, t, o), au(e, t, o)) : (Et && h && Ms(t), t.flags |= 1, El(e, t, i, o), t.child);
    }
    function ir(e, t, n, i, o) {
      if (e === null) {
        var f = n.type;
        return typeof f == "function" && !Os(f) && f.defaultProps === void 0 && n.compare === null ? (n = cc(f), t.tag = 15, t.type = n, or(t, f), Ws(
          e,
          t,
          n,
          i,
          o
        )) : (e = Ds(
          n.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !Ry(e, o)) {
        var d = f.memoizedProps;
        if (n = n.compare, n = n !== null ? n : Yf, n(d, i) && e.ref === t.ref)
          return au(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = Pa(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Ws(e, t, n, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (Yf(f, i) && e.ref === t.ref && t.type === e.type)
          if (ln = !1, t.pendingProps = i = f, Ry(e, o))
            (e.flags & 131072) !== 0 && (ln = !0);
          else
            return t.lanes = e.lanes, au(e, t, o);
      }
      return Is(
        e,
        t,
        n,
        i,
        o
      );
    }
    function Fs(e, t, n) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (i = f !== null ? f.baseLanes | n : n, e !== null) {
            for (o = t.child = e.child, f = 0; o !== null; )
              f = f | o.lanes | o.childLanes, o = o.sibling;
            t.childLanes = f & ~i;
          } else t.childLanes = 0, t.child = null;
          return yy(
            e,
            t,
            i,
            n
          );
        }
        if ((n & 536870912) !== 0)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Hs(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? Ns(t, f) : Oa(t), nr(t);
        else
          return t.lanes = t.childLanes = 536870912, yy(
            e,
            t,
            f !== null ? f.baseLanes | n : n,
            n
          );
      } else
        f !== null ? (Hs(t, f.cachePool), Ns(t, f), ca(t), t.memoizedState = null) : (e !== null && Hs(t, null), Oa(t), ca(t));
      return El(e, t, o, n), t.child;
    }
    function yy(e, t, n, i) {
      var o = Ph();
      return o = o === null ? null : {
        parent: Kl._currentValue,
        pool: o
      }, t.memoizedState = {
        baseLanes: n,
        cachePool: o
      }, e !== null && Hs(t, null), Oa(t), nr(t), e !== null && Cu(e, t, i, !0), null;
    }
    function cr(e, t) {
      var n = t.ref;
      if (n === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof n != "function" && typeof n != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== n) && (t.flags |= 4194816);
      }
    }
    function Is(e, t, n, i, o) {
      if (n.prototype && typeof n.prototype.render == "function") {
        var f = Oe(n) || "Unknown";
        gb[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), gb[f] = !0);
      }
      return t.mode & Nn && ui.recordLegacyContextWarning(
        t,
        null
      ), e === null && (or(t, t.type), n.contextTypes && (f = Oe(n) || "Unknown", bb[f] || (bb[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), pi(t), Vt(t), n = yo(
        e,
        t,
        n,
        i,
        void 0,
        o
      ), i = xu(), Ml(), e !== null && !ln ? (Da(e, t, o), au(e, t, o)) : (Et && i && Ms(t), t.flags |= 1, El(e, t, n, o), t.child);
    }
    function my(e, t, n, i, o, f) {
      return pi(t), Vt(t), Gc = -1, Im = e !== null && e.type !== t.type, t.updateQueue = null, n = Sn(
        t,
        i,
        n,
        o
      ), Qf(e, t), i = xu(), Ml(), e !== null && !ln ? (Da(e, t, f), au(e, t, f)) : (Et && i && Ms(t), t.flags |= 1, El(e, t, n, f), t.child);
    }
    function py(e, t, n, i, o) {
      switch (ve(t)) {
        case !1:
          var f = t.stateNode, d = new t.type(
            t.memoizedProps,
            f.context
          ).state;
          f.updater.enqueueSetState(f, d, null);
          break;
        case !0:
          t.flags |= 128, t.flags |= 65536, f = Error("Simulated error coming from DevTools");
          var h = o & -o;
          if (t.lanes |= h, d = Jt, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = ur(h), Tc(
            h,
            d,
            t,
            mn(f, t)
          ), Hu(t, h);
      }
      if (pi(t), t.stateNode === null) {
        if (d = cf, f = n.contextType, "contextType" in n && f !== null && (f === void 0 || f.$$typeof !== Hn) && !mb.has(n) && (mb.add(n), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === Cr ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          Oe(n) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = Xt(f)), f = new n(i, d), t.mode & Nn) {
          qe(!0);
          try {
            f = new n(i, d);
          } finally {
            qe(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = h0, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = ib, typeof n.getDerivedStateFromProps == "function" && d === null && (d = Oe(n) || "Component", ob.has(d) || (ob.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof n.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var v = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? v = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (v = "UNSAFE_componentWillUpdate"), d !== null || h !== null || v !== null) {
            f = Oe(n) || "Component";
            var g = typeof n.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            rb.has(f) || (rb.add(f), console.error(
              `Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://react.dev/link/unsafe-component-lifecycles`,
              f,
              g,
              d !== null ? `
  ` + d : "",
              h !== null ? `
  ` + h : "",
              v !== null ? `
  ` + v : ""
            ));
          }
        }
        f = t.stateNode, d = Oe(n) || "Component", f.render || (n.prototype && typeof n.prototype.render == "function" ? console.error(
          "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
          d
        ) : console.error(
          "No `render` method found on the %s instance: you may have forgotten to define `render`.",
          d
        )), !f.getInitialState || f.getInitialState.isReactClassApproved || f.state || console.error(
          "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
          d
        ), f.getDefaultProps && !f.getDefaultProps.isReactClassApproved && console.error(
          "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
          d
        ), f.contextType && console.error(
          "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
          d
        ), n.childContextTypes && !yb.has(n) && (yb.add(n), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), n.contextTypes && !hb.has(n) && (hb.add(n), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), n.prototype && n.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          Oe(n) || "A pure component"
        ), typeof f.componentDidUnmount == "function" && console.error(
          "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
          d
        ), typeof f.componentDidReceiveProps == "function" && console.error(
          "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
          d
        ), typeof f.componentWillRecieveProps == "function" && console.error(
          "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
          d
        ), typeof f.UNSAFE_componentWillRecieveProps == "function" && console.error(
          "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
          d
        ), h = f.props !== i, f.props !== void 0 && h && console.error(
          "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
          d
        ), f.defaultProps && console.error(
          "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
          d,
          d
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || fb.has(n) || (fb.add(n), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          Oe(n)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof n.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || Al(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof n.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, gi(t), d = n.contextType, f.context = typeof d == "object" && d !== null ? Xt(d) : cf, f.state === i && (d = Oe(n) || "Component", sb.has(d) || (sb.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & Nn && ui.recordLegacyContextWarning(
          t,
          f
        ), ui.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = n.getDerivedStateFromProps, typeof d == "function" && (ar(
          t,
          n,
          d,
          i
        ), f.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          pe(t) || "Component"
        ), h0.enqueueReplaceState(
          f,
          f.state,
          null
        )), Si(t, i, f, o), so(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & ai) !== Wt && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var L = t.memoizedProps;
        h = Oi(n, L), f.props = h;
        var Q = f.context;
        v = n.contextType, d = cf, typeof v == "object" && v !== null && (d = Xt(v)), g = n.getDerivedStateFromProps, v = typeof g == "function" || typeof f.getSnapshotBeforeUpdate == "function", L = t.pendingProps !== L, v || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (L || Q !== d) && hy(
          t,
          f,
          i,
          d
        ), of = !1;
        var B = t.memoizedState;
        f.state = B, Si(t, i, f, o), so(), Q = t.memoizedState, L || B !== Q || of ? (typeof g == "function" && (ar(
          t,
          n,
          g,
          i
        ), Q = t.memoizedState), (h = of || Ks(
          t,
          n,
          h,
          i,
          B,
          Q,
          d
        )) ? (v || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & ai) !== Wt && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & ai) !== Wt && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = Q), f.props = i, f.state = Q, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & ai) !== Wt && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, Xf(e, t), d = t.memoizedProps, v = Oi(n, d), f.props = v, g = t.pendingProps, B = f.context, Q = n.contextType, h = cf, typeof Q == "object" && Q !== null && (h = Xt(Q)), L = n.getDerivedStateFromProps, (Q = typeof L == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== g || B !== h) && hy(
          t,
          f,
          i,
          h
        ), of = !1, B = t.memoizedState, f.state = B, Si(t, i, f, o), so();
        var K = t.memoizedState;
        d !== g || B !== K || of || e !== null && e.dependencies !== null && Lf(e.dependencies) ? (typeof L == "function" && (ar(
          t,
          n,
          L,
          i
        ), K = t.memoizedState), (v = of || Ks(
          t,
          n,
          v,
          i,
          B,
          K,
          h
        ) || e !== null && e.dependencies !== null && Lf(e.dependencies)) ? (Q || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, K, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          K,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = K), f.props = i, f.state = K, f.context = h, f = v) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && B === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, cr(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, ri(t), d && typeof n.getDerivedStateFromError != "function")
          n = null, ya = -1;
        else {
          if (Vt(t), n = ZS(h), t.mode & Nn) {
            qe(!0);
            try {
              ZS(h);
            } finally {
              qe(!1);
            }
          }
          Ml();
        }
        t.flags |= 1, e !== null && d ? (t.child = sh(
          t,
          e.child,
          null,
          o
        ), t.child = sh(
          t,
          null,
          n,
          o
        )) : El(e, t, n, o), t.memoizedState = h.state, e = t.child;
      } else
        e = au(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (yh || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        pe(t) || "a component"
      ), yh = !0), e;
    }
    function vy(e, t, n, i) {
      return co(), t.flags |= 256, El(e, t, n, i), t.child;
    }
    function or(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = Oe(t) || "Unknown", Tb[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), Tb[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = Oe(t) || "Unknown", Sb[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), Sb[t] = !0));
    }
    function Ps(e) {
      return { baseLanes: e, cachePool: ey() };
    }
    function gy(e, t, n) {
      return e = e !== null ? e.childLanes & ~n : 0, t && (e |= Ka), e;
    }
    function Sy(e, t, n) {
      var i, o = t.pendingProps;
      ae(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (kl.current & ep) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (Et) {
          if (f ? En(t) : ca(t), Et) {
            var h = gl, v;
            if (!(v = !h)) {
              e: {
                var g = h;
                for (v = Ji; g.nodeType !== 8; ) {
                  if (!v) {
                    v = null;
                    break e;
                  }
                  if (g = Cn(g.nextSibling), g === null) {
                    v = null;
                    break e;
                  }
                }
                v = g;
              }
              v !== null ? (Ta(), t.memoizedState = {
                dehydrated: v,
                treeContext: Zr !== null ? { id: Bc, overflow: Yc } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, g = _(18, null, null, Wt), g.stateNode = v, g.return = t, t.child = g, Wn = t, gl = null, v = !0) : v = !1, v = !v;
            }
            v && (io(
              t,
              h
            ), yi(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return Bi(h) ? t.lanes = 32 : t.lanes = 536870912, null;
          Rn(t);
        }
        return h = o.children, o = o.fallback, f ? (ca(t), f = t.mode, h = fr(
          {
            mode: "hidden",
            children: h
          },
          f
        ), o = na(
          o,
          f,
          n,
          null
        ), h.return = t, o.return = t, h.sibling = o, t.child = h, f = t.child, f.memoizedState = Ps(n), f.childLanes = gy(
          e,
          i,
          n
        ), t.memoizedState = v0, o) : (En(t), ed(
          t,
          h
        ));
      }
      var L = e.memoizedState;
      if (L !== null && (h = L.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (En(t), t.flags &= -257, t = rr(
            e,
            t,
            n
          )) : t.memoizedState !== null ? (ca(t), t.child = e.child, t.flags |= 128, t = null) : (ca(t), f = o.fallback, h = t.mode, o = fr(
            {
              mode: "visible",
              children: o.children
            },
            h
          ), f = na(
            f,
            h,
            n,
            null
          ), f.flags |= 2, o.return = t, f.return = t, o.sibling = f, t.child = o, sh(
            t,
            e.child,
            null,
            n
          ), o = t.child, o.memoizedState = Ps(n), o.childLanes = gy(
            e,
            i,
            n
          ), t.memoizedState = v0, t = f);
        else if (En(t), Et && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), Bi(h)) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            v = i.dgst;
            var Q = i.msg;
            g = i.stck;
            var B = i.cstck;
          }
          h = Q, i = v, o = g, v = f = B, f = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), f.stack = o || "", f.digest = i, i = v === void 0 ? null : v, o = {
            value: f,
            source: null,
            stack: i
          }, typeof i == "string" && Wg.set(
            f,
            o
          ), oo(o), t = rr(
            e,
            t,
            n
          );
        } else if (ln || Cu(
          e,
          t,
          n,
          !1
        ), i = (n & e.childLanes) !== 0, ln || i) {
          if (i = Jt, i !== null && (o = n & -n, o = (o & 42) !== 0 ? 1 : hn(
            o
          ), o = (o & (i.suspendedLanes | n)) !== 0 ? 0 : o, o !== 0 && o !== L.retryLane))
            throw L.retryLane = o, pn(
              e,
              o
            ), nt(
              i,
              e,
              o
            ), vb;
          h.data === Qc || fd(), t = rr(
            e,
            t,
            n
          );
        } else
          h.data === Qc ? (t.flags |= 192, t.child = e.child, t = null) : (e = L.treeContext, gl = Cn(
            h.nextSibling
          ), Wn = t, Et = !0, Kr = null, jc = !1, gu = null, Ji = !1, e !== null && (Ta(), pu[vu++] = Bc, pu[vu++] = Yc, pu[vu++] = Zr, Bc = e.id, Yc = e.overflow, Zr = t), t = ed(
            t,
            o.children
          ), t.flags |= 4096);
        return t;
      }
      return f ? (ca(t), f = o.fallback, h = t.mode, v = e.child, g = v.sibling, o = Pa(
        v,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = v.subtreeFlags & 65011712, g !== null ? f = Pa(
        g,
        f
      ) : (f = na(
        f,
        h,
        n,
        null
      ), f.flags |= 2), f.return = t, o.return = t, o.sibling = f, t.child = o, o = f, f = t.child, h = e.child.memoizedState, h === null ? h = Ps(n) : (v = h.cachePool, v !== null ? (g = Kl._currentValue, v = v.parent !== g ? { parent: g, pool: g } : v) : v = ey(), h = {
        baseLanes: h.baseLanes | n,
        cachePool: v
      }), f.memoizedState = h, f.childLanes = gy(
        e,
        i,
        n
      ), t.memoizedState = v0, o) : (En(t), n = e.child, e = n.sibling, n = Pa(n, {
        mode: "visible",
        children: o.children
      }), n.return = t, n.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = n, t.memoizedState = null, n);
    }
    function ed(e, t) {
      return t = fr(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function fr(e, t) {
      return e = _(22, e, null, t), e.lanes = 0, e.stateNode = {
        _visibility: Fg,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }, e;
    }
    function rr(e, t, n) {
      return sh(t, e.child, null, n), e = ed(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function by(e, t, n) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Wh(
        e.return,
        t,
        n
      );
    }
    function Ty(e, t) {
      var n = Al(e);
      return e = !n && typeof tt(e) == "function", n || e ? (n = n ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        n,
        t,
        n
      ), !1) : !0;
    }
    function td(e, t, n, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: n,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = n, f.tailMode = o);
    }
    function Ey(e, t, n) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail;
      if (i = i.children, o !== void 0 && o !== "forwards" && o !== "backwards" && o !== "together" && !Eb[o])
        if (Eb[o] = !0, typeof o == "string")
          switch (o.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                o,
                o.toLowerCase()
              );
              break;
            case "forward":
            case "backward":
              console.error(
                '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                o,
                o.toLowerCase()
              );
              break;
            default:
              console.error(
                '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                o
              );
          }
        else
          console.error(
            '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
            o
          );
      f === void 0 || p0[f] || (f !== "collapsed" && f !== "hidden" ? (p0[f] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && (p0[f] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (Al(i)) {
          for (var d = 0; d < i.length; d++)
            if (!Ty(i[d], d)) break e;
        } else if (d = tt(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), v = 0; !h.done; h = d.next()) {
              if (!Ty(h.value, v)) break e;
              v++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (El(e, t, i, n), i = kl.current, (i & ep) !== 0)
        i = i & dh | ep, t.flags |= 128;
      else {
        if (e !== null && (e.flags & 128) !== 0)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && by(
                e,
                n,
                t
              );
            else if (e.tag === 19)
              by(e, n, t);
            else if (e.child !== null) {
              e.child.return = e, e = e.child;
              continue;
            }
            if (e === t) break e;
            for (; e.sibling === null; ) {
              if (e.return === null || e.return === t)
                break e;
              e = e.return;
            }
            e.sibling.return = e.return, e = e.sibling;
          }
        i &= dh;
      }
      switch (Ne(kl, i, t), o) {
        case "forwards":
          for (n = t.child, o = null; n !== null; )
            e = n.alternate, e !== null && Zs(e) === null && (o = n), n = n.sibling;
          n = o, n === null ? (o = t.child, t.child = null) : (o = n.sibling, n.sibling = null), td(
            t,
            !1,
            o,
            n,
            f
          );
          break;
        case "backwards":
          for (n = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && Zs(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = n, n = o, o = e;
          }
          td(
            t,
            !0,
            n,
            null,
            f
          );
          break;
        case "together":
          td(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function au(e, t, n) {
      if (e !== null && (t.dependencies = e.dependencies), ya = -1, df |= t.lanes, (n & t.childLanes) === 0)
        if (e !== null) {
          if (Cu(
            e,
            t,
            n,
            !1
          ), (n & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, n = Pa(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; )
          e = e.sibling, n = n.sibling = Pa(e, e.pendingProps), n.return = t;
        n.sibling = null;
      }
      return t.child;
    }
    function Ry(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Lf(e)));
    }
    function Qp(e, t, n) {
      switch (t.tag) {
        case 3:
          lt(
            t,
            t.stateNode.containerInfo
          ), mi(
            t,
            Kl,
            e.memoizedState.cache
          ), co();
          break;
        case 27:
        case 5:
          le(t);
          break;
        case 4:
          lt(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          mi(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          (n & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (En(t), t.flags |= 128, null) : (n & t.child.childLanes) !== 0 ? Sy(
              e,
              t,
              n
            ) : (En(t), e = au(
              e,
              t,
              n
            ), e !== null ? e.sibling : null);
          En(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (n & t.childLanes) !== 0, i || (Cu(
            e,
            t,
            n,
            !1
          ), i = (n & t.childLanes) !== 0), o) {
            if (i)
              return Ey(
                e,
                t,
                n
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Ne(
            kl,
            kl.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Fs(e, t, n);
        case 24:
          mi(
            t,
            Kl,
            e.memoizedState.cache
          );
      }
      return au(e, t, n);
    }
    function Di(e, t, n) {
      if (t._debugNeedsRemount && e !== null) {
        n = Ds(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), n._debugStack = t._debugStack, n._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, n._debugInfo = t._debugInfo, t === i.child)
          i.child = n;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = n;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), n.flags |= 2, n;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          ln = !0;
        else {
          if (!Ry(e, n) && (t.flags & 128) === 0)
            return ln = !1, Qp(
              e,
              t,
              n
            );
          ln = (e.flags & 131072) !== 0;
        }
      else
        ln = !1, (i = Et) && (Ta(), i = (t.flags & 1048576) !== 0), i && (i = t.index, Ta(), Jh(t, wv, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = rf(t.elementType), t.type = e, typeof e == "function")
            Os(e) ? (i = Oi(
              e,
              i
            ), t.tag = 1, t.type = e = cc(e), t = py(
              null,
              t,
              e,
              i,
              n
            )) : (t.tag = 0, or(t, e), t.type = e = cc(e), t = Is(
              null,
              t,
              e,
              i,
              n
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === Gi) {
                t.tag = 11, t.type = e = Xh(e), t = nu(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              } else if (o === wd) {
                t.tag = 14, t = ir(
                  null,
                  t,
                  e,
                  i,
                  n
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === Jn && (t = " Did you wrap a component in React.lazy() more than once?"), e = Oe(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return Is(
            e,
            t,
            t.type,
            t.pendingProps,
            n
          );
        case 1:
          return i = t.type, o = Oi(
            i,
            t.pendingProps
          ), py(
            e,
            t,
            i,
            o,
            n
          );
        case 3:
          e: {
            if (lt(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, Xf(e, t), Si(t, i, null, n);
            var d = t.memoizedState;
            if (i = d.cache, mi(t, Kl, i), i !== f.cache && un(
              t,
              [Kl],
              n,
              !0
            ), so(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = vy(
                  e,
                  t,
                  i,
                  n
                );
                break e;
              } else if (i !== o) {
                o = mn(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), oo(o), t = vy(
                  e,
                  t,
                  i,
                  n
                );
                break e;
              } else {
                switch (e = t.stateNode.containerInfo, e.nodeType) {
                  case 9:
                    e = e.body;
                    break;
                  default:
                    e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
                }
                for (gl = Cn(e.firstChild), Wn = t, Et = !0, Kr = null, jc = !1, gu = null, Ji = !0, e = ub(
                  t,
                  null,
                  i,
                  n
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
              }
            else {
              if (co(), i === o) {
                t = au(
                  e,
                  t,
                  n
                );
                break e;
              }
              El(
                e,
                t,
                i,
                n
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return cr(e, t), e === null ? (e = Rr(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : Et || (e = t.type, n = t.pendingProps, i = Xe(
            cu.current
          ), i = bt(
            i
          ).createElement(e), i[tn] = t, i[xn] = n, Ul(i, e, n), C(i), t.stateNode = i) : t.memoizedState = Rr(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return le(t), e === null && Et && (i = Xe(cu.current), o = j(), i = t.stateNode = Un(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), jc || (o = ut(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (sc(t, 0).serverProps = o)), Wn = t, Ji = !0, o = gl, Rl(t.type) ? (L0 = o, gl = Cn(
            i.firstChild
          )) : gl = o), El(
            e,
            t,
            t.pendingProps.children,
            n
          ), cr(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && Et && (f = j(), i = ys(
            t.type,
            f.ancestorInfo
          ), o = gl, (d = !o) || (d = Vl(
            o,
            t.type,
            t.pendingProps,
            Ji
          ), d !== null ? (t.stateNode = d, jc || (f = ut(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (sc(t, 0).serverProps = f)), Wn = t, gl = Cn(
            d.firstChild
          ), Ji = !1, f = !0) : f = !1, d = !f), d && (i && io(t, o), yi(t))), le(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, xi(o, f) ? i = null : d !== null && xi(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = yo(
            e,
            t,
            ua,
            null,
            null,
            n
          ), mp._currentValue = o), cr(e, t), El(
            e,
            t,
            i,
            n
          ), t.child;
        case 6:
          return e === null && Et && (e = t.pendingProps, n = j(), i = n.ancestorInfo.current, e = i != null ? lo(
            e,
            i.tag,
            n.ancestorInfo.implicitRootScope
          ) : !0, n = gl, (i = !n) || (i = qi(
            n,
            t.pendingProps,
            Ji
          ), i !== null ? (t.stateNode = i, Wn = t, gl = null, i = !0) : i = !1, i = !i), i && (e && io(t, n), yi(t))), null;
        case 13:
          return Sy(e, t, n);
        case 4:
          return lt(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = sh(
            t,
            null,
            i,
            n
          ) : El(
            e,
            t,
            i,
            n
          ), t.child;
        case 11:
          return nu(
            e,
            t,
            t.type,
            t.pendingProps,
            n
          );
        case 7:
          return El(
            e,
            t,
            t.pendingProps,
            n
          ), t.child;
        case 8:
          return El(
            e,
            t,
            t.pendingProps.children,
            n
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, El(
            e,
            t,
            t.pendingProps.children,
            n
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || Rb || (Rb = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), mi(t, i, f), El(
            e,
            t,
            o.children,
            n
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), pi(t), o = Xt(o), Vt(t), i = r0(
            i,
            o,
            void 0
          ), Ml(), t.flags |= 1, El(
            e,
            t,
            i,
            n
          ), t.child;
        case 14:
          return ir(
            e,
            t,
            t.type,
            t.pendingProps,
            n
          );
        case 15:
          return Ws(
            e,
            t,
            t.type,
            t.pendingProps,
            n
          );
        case 19:
          return Ey(
            e,
            t,
            n
          );
        case 31:
          return i = t.pendingProps, n = t.mode, i = {
            mode: i.mode,
            children: i.children
          }, e === null ? (e = fr(
            i,
            n
          ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = Pa(e.child, i), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
        case 22:
          return Fs(e, t, n);
        case 24:
          return pi(t), i = Xt(Kl), e === null ? (o = Ph(), o === null && (o = Jt, f = Fh(), o.pooledCache = f, aa(f), f !== null && (o.pooledCacheLanes |= n), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, gi(t), mi(t, Kl, o)) : ((e.lanes & n) !== 0 && (Xf(e, t), Si(t, null, null, n), so()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), mi(t, Kl, i)) : (i = f.cache, mi(t, Kl, i), i !== o.cache && un(
            t,
            [Kl],
            n,
            !0
          ))), El(
            e,
            t,
            t.pendingProps.children,
            n
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function oa(e) {
      e.flags |= 4;
    }
    function Ay(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & Ru) !== cs)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !dm(t)) {
        if (t = Eu.current, t !== null && ((rt & 4194048) === rt ? $i !== null : (rt & 62914560) !== rt && (rt & 536870912) === 0 || t !== $i))
          throw Wm = n0, xS;
        e.flags |= 8192;
      }
    }
    function Ec(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? ka() : 536870912, e.lanes |= t, ts |= t);
    }
    function Lu(e, t) {
      if (!Et)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var n = null; t !== null; )
              t.alternate !== null && (n = t), t = t.sibling;
            n === null ? e.tail = null : n.sibling = null;
            break;
          case "collapsed":
            n = e.tail;
            for (var i = null; n !== null; )
              n.alternate !== null && (i = n), n = n.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function Qt(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, n = 0, i = 0;
      if (t)
        if ((e.mode & rn) !== Wt) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            n |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            n |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & rn) !== Wt) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          n |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          n |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = n, t;
    }
    function Zp(e, t, n) {
      var i = t.pendingProps;
      switch (rc(t), t.tag) {
        case 31:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return Qt(t), null;
        case 1:
          return Qt(t), null;
        case 3:
          return n = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), _u(Kl, t), V(t), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (dc(t) ? (Lp(), oa(t)) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, $h())), Qt(t), null;
        case 26:
          return n = t.memoizedState, e === null ? (oa(t), n !== null ? (Qt(t), Ay(
            t,
            n
          )) : (Qt(t), t.flags &= -16777217)) : n ? n !== e.memoizedState ? (oa(t), Qt(t), Ay(
            t,
            n
          )) : (Qt(t), t.flags &= -16777217) : (e.memoizedProps !== i && oa(t), Qt(t), t.flags &= -16777217), null;
        case 27:
          he(t), n = Xe(cu.current);
          var o = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && oa(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Qt(t), null;
            }
            e = j(), dc(t) ? kh(t) : (e = Un(
              o,
              i,
              n,
              e,
              !0
            ), t.stateNode = e, oa(t));
          }
          return Qt(t), null;
        case 5:
          if (he(t), n = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && oa(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Qt(t), null;
            }
            if (o = j(), dc(t))
              kh(t);
            else {
              switch (e = Xe(cu.current), ys(n, o.ancestorInfo), o = o.context, e = bt(e), o) {
                case Rh:
                  e = e.createElementNS(ni, n);
                  break;
                case og:
                  e = e.createElementNS(
                    Jd,
                    n
                  );
                  break;
                default:
                  switch (n) {
                    case "svg":
                      e = e.createElementNS(
                        ni,
                        n
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        Jd,
                        n
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(n, {
                        is: i.is
                      }) : e.createElement(n), n.indexOf("-") === -1 && (n !== n.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        n
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || ou.call(
                        Vb,
                        n
                      ) || (Vb[n] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        n
                      )));
                  }
              }
              e[tn] = t, e[xn] = i;
              e: for (o = t.child; o !== null; ) {
                if (o.tag === 5 || o.tag === 6)
                  e.appendChild(o.stateNode);
                else if (o.tag !== 4 && o.tag !== 27 && o.child !== null) {
                  o.child.return = o, o = o.child;
                  continue;
                }
                if (o === t) break e;
                for (; o.sibling === null; ) {
                  if (o.return === null || o.return === t)
                    break e;
                  o = o.return;
                }
                o.sibling.return = o.return, o = o.sibling;
              }
              t.stateNode = e;
              e: switch (Ul(e, n, i), n) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  e = !!i.autoFocus;
                  break e;
                case "img":
                  e = !0;
                  break e;
                default:
                  e = !1;
              }
              e && oa(t);
            }
          }
          return Qt(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && oa(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = Xe(cu.current), n = j(), dc(t)) {
              e = t.stateNode, n = t.memoizedProps, o = !jc, i = null;
              var f = Wn;
              if (f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = om(
                      e,
                      n,
                      i
                    ), o !== null && (sc(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = om(
                      e,
                      n,
                      i
                    ), o !== null && (sc(
                      t,
                      0
                    ).serverProps = o));
                }
              e[tn] = t, e = !!(e.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || Cc(e.nodeValue, n)), e || yi(t);
            } else
              o = n.ancestorInfo.current, o != null && lo(
                i,
                o.tag,
                n.ancestorInfo.implicitRootScope
              ), e = bt(e).createTextNode(
                i
              ), e[tn] = t, t.stateNode = e;
          }
          return Qt(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = dc(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!o)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                o[tn] = t, Qt(t), (t.mode & rn) !== Wt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                Lp(), co(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4, Qt(t), (t.mode & rn) !== Wt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = $h(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (Rn(t), t) : (Rn(t), null);
          }
          return Rn(t), (t.flags & 128) !== 0 ? (t.lanes = n, (t.mode & rn) !== Wt && Vf(t), t) : (n = i !== null, e = e !== null && e.memoizedState !== null, n && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ec(t, t.updateQueue), Qt(t), (t.mode & rn) !== Wt && n && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return V(t), e === null && br(
            t.stateNode.containerInfo
          ), Qt(t), null;
        case 10:
          return _u(t.type, t), Qt(t), null;
        case 19:
          if (Se(kl, t), o = t.memoizedState, o === null) return Qt(t), null;
          if (i = (t.flags & 128) !== 0, f = o.rendering, f === null)
            if (i) Lu(o, !1);
            else {
              if (Sl !== Xc || e !== null && (e.flags & 128) !== 0)
                for (e = t.child; e !== null; ) {
                  if (f = Zs(e), f !== null) {
                    for (t.flags |= 128, Lu(o, !1), e = f.updateQueue, t.updateQueue = e, Ec(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null; )
                      Qh(n, e), n = n.sibling;
                    return Ne(
                      kl,
                      kl.current & dh | ep,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null && Xl() > Wv && (t.flags |= 128, i = !0, Lu(o, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = Zs(f), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, Ec(t, e), Lu(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !Et)
                  return Qt(t), null;
              } else
                2 * Xl() - o.renderingStartTime > Wv && n !== 536870912 && (t.flags |= 128, i = !0, Lu(o, !1), t.lanes = 4194304);
            o.isBackwards ? (f.sibling = t.child, t.child = f) : (e = o.last, e !== null ? e.sibling = f : t.child = f, o.last = f);
          }
          return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Xl(), e.sibling = null, n = kl.current, n = i ? n & dh | ep : n & dh, Ne(kl, n, t), e) : (Qt(t), null);
        case 22:
        case 23:
          return Rn(t), ws(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (n & 536870912) !== 0 && (t.flags & 128) === 0 && (Qt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Qt(t), n = t.updateQueue, n !== null && Ec(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== n && (t.flags |= 2048), e !== null && Se($r, t), null;
        case 24:
          return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), _u(Kl, t), Qt(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Kp(e, t) {
      switch (rc(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & rn) !== Wt && Vf(t), t) : null;
        case 3:
          return _u(Kl, t), V(t), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return he(t), null;
        case 13:
          if (Rn(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            co();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & rn) !== Wt && Vf(t), t) : null;
        case 19:
          return Se(kl, t), null;
        case 4:
          return V(t), null;
        case 10:
          return _u(t.type, t), null;
        case 22:
        case 23:
          return Rn(t), ws(t), e !== null && Se($r, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & rn) !== Wt && Vf(t), t) : null;
        case 24:
          return _u(Kl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function Oy(e, t) {
      switch (rc(t), t.tag) {
        case 3:
          _u(Kl, t), V(t);
          break;
        case 26:
        case 27:
        case 5:
          he(t);
          break;
        case 4:
          V(t);
          break;
        case 13:
          Rn(t);
          break;
        case 19:
          Se(kl, t);
          break;
        case 10:
          _u(t.type, t);
          break;
        case 22:
        case 23:
          Rn(t), ws(t), e !== null && Se($r, t);
          break;
        case 24:
          _u(Kl, t);
      }
    }
    function Ua(e) {
      return (e.mode & rn) !== Wt;
    }
    function Dy(e, t) {
      Ua(e) ? (Il(), Co(t, e), Ea()) : Co(t, e);
    }
    function sr(e, t, n) {
      Ua(e) ? (Il(), Rc(
        n,
        e,
        t
      ), Ea()) : Rc(
        n,
        e,
        t
      );
    }
    function Co(e, t) {
      try {
        var n = t.updateQueue, i = n !== null ? n.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          n = o;
          do {
            if ((n.tag & e) === e && ((e & Jl) !== Su ? me !== null && typeof me.markComponentPassiveEffectMountStarted == "function" && me.markComponentPassiveEffectMountStarted(
              t
            ) : (e & sn) !== Su && me !== null && typeof me.markComponentLayoutEffectMountStarted == "function" && me.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & Fn) !== Su && (Th = !0), i = Ae(
              t,
              MT,
              n
            ), (e & Fn) !== Su && (Th = !1), (e & Jl) !== Su ? me !== null && typeof me.markComponentPassiveEffectMountStopped == "function" && me.markComponentPassiveEffectMountStopped() : (e & sn) !== Su && me !== null && typeof me.markComponentLayoutEffectMountStopped == "function" && me.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = (n.tag & sn) !== 0 ? "useLayoutEffect" : (n.tag & Fn) !== 0 ? "useInsertionEffect" : "useEffect";
              var d = void 0;
              d = i === null ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof i.then == "function" ? `

It looks like you wrote ` + f + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + f + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, Ae(
                t,
                function(h, v) {
                  console.error(
                    "%s must not return anything besides a function, which is used for clean-up.%s",
                    h,
                    v
                  );
                },
                f,
                d
              );
            }
            n = n.next;
          } while (n !== o);
        }
      } catch (h) {
        xt(t, t.return, h);
      }
    }
    function Rc(e, t, n) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & Jl) !== Su ? me !== null && typeof me.markComponentPassiveEffectUnmountStarted == "function" && me.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & sn) !== Su && me !== null && typeof me.markComponentLayoutEffectUnmountStarted == "function" && me.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & Fn) !== Su && (Th = !0), o = t, Ae(
                o,
                zT,
                o,
                n,
                h
              ), (e & Fn) !== Su && (Th = !1), (e & Jl) !== Su ? me !== null && typeof me.markComponentPassiveEffectUnmountStopped == "function" && me.markComponentPassiveEffectUnmountStopped() : (e & sn) !== Su && me !== null && typeof me.markComponentLayoutEffectUnmountStopped == "function" && me.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (v) {
        xt(t, t.return, v);
      }
    }
    function ld(e, t) {
      Ua(e) ? (Il(), Co(t, e), Ea()) : Co(t, e);
    }
    function nd(e, t, n) {
      Ua(e) ? (Il(), Rc(
        n,
        e,
        t
      ), Ea()) : Rc(
        n,
        e,
        t
      );
    }
    function My(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var n = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || yh || (n.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          pe(e) || "instance"
        ), n.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          pe(e) || "instance"
        ));
        try {
          Ae(
            e,
            gn,
            t,
            n
          );
        } catch (i) {
          xt(e, e.return, i);
        }
      }
    }
    function xg(e, t, n) {
      return e.getSnapshotBeforeUpdate(t, n);
    }
    function zy(e, t) {
      var n = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || yh || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        pe(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        pe(e) || "instance"
      ));
      try {
        var o = Oi(
          e.type,
          n,
          e.elementType === e.type
        ), f = Ae(
          e,
          xg,
          t,
          o,
          i
        );
        n = Ab, f !== void 0 || n.has(e.type) || (n.add(e.type), Ae(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            pe(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        xt(e, e.return, d);
      }
    }
    function _y(e, t, n) {
      n.props = Oi(
        e.type,
        e.memoizedProps
      ), n.state = e.memoizedState, Ua(e) ? (Il(), Ae(
        e,
        FS,
        e,
        t,
        n
      ), Ea()) : Ae(
        e,
        FS,
        e,
        t,
        n
      );
    }
    function Jp(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var n = e.stateNode;
            break;
          case 30:
            n = e.stateNode;
            break;
          default:
            n = e.stateNode;
        }
        if (typeof t == "function")
          if (Ua(e))
            try {
              Il(), e.refCleanup = t(n);
            } finally {
              Ea();
            }
          else e.refCleanup = t(n);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            pe(e)
          ), t.current = n;
      }
    }
    function Ac(e, t) {
      try {
        Ae(e, Jp, e);
      } catch (n) {
        xt(e, t, n);
      }
    }
    function Ha(e, t) {
      var n = e.ref, i = e.refCleanup;
      if (n !== null)
        if (typeof i == "function")
          try {
            if (Ua(e))
              try {
                Il(), Ae(e, i);
              } finally {
                Ea(e);
              }
            else Ae(e, i);
          } catch (o) {
            xt(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof n == "function")
          try {
            if (Ua(e))
              try {
                Il(), Ae(e, n, null);
              } finally {
                Ea(e);
              }
            else Ae(e, n, null);
          } catch (o) {
            xt(e, t, o);
          }
        else n.current = null;
    }
    function Cy(e, t, n, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", Yv && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        n
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        n
      );
    }
    function Ng(e, t, n, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", Yv && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        n
      );
    }
    function kp(e) {
      var t = e.type, n = e.memoizedProps, i = e.stateNode;
      try {
        Ae(
          e,
          ul,
          i,
          t,
          n,
          e
        );
      } catch (o) {
        xt(e, e.return, o);
      }
    }
    function ad(e, t, n) {
      try {
        Ae(
          e,
          Ni,
          e.stateNode,
          e.type,
          n,
          t,
          e
        );
      } catch (i) {
        xt(e, e.return, i);
      }
    }
    function Uo(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Rl(e.type) || e.tag === 4;
    }
    function dr(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || Uo(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && Rl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Ho(e, t, n) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ui));
      else if (i !== 4 && (i === 27 && Rl(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null))
        for (Ho(e, t, n), e = e.sibling; e !== null; )
          Ho(e, t, n), e = e.sibling;
    }
    function hr(e, t, n) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
      else if (i !== 4 && (i === 27 && Rl(e.type) && (n = e.stateNode), e = e.child, e !== null))
        for (hr(e, t, n), e = e.sibling; e !== null; )
          hr(e, t, n), e = e.sibling;
    }
    function $p(e) {
      for (var t, n = e.return; n !== null; ) {
        if (Uo(n)) {
          t = n;
          break;
        }
        n = n.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, n = dr(e), hr(
            e,
            n,
            t
          );
          break;
        case 5:
          n = t.stateNode, t.flags & 32 && (wi(n), t.flags &= -33), t = dr(e), hr(
            e,
            t,
            n
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, n = dr(e), Ho(
            e,
            n,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function yr(e) {
      var t = e.stateNode, n = e.memoizedProps;
      try {
        Ae(
          e,
          rv,
          e.type,
          n,
          t,
          e
        );
      } catch (i) {
        xt(e, e.return, i);
      }
    }
    function Wp(e, t) {
      if (e = e.containerInfo, B0 = dg, e = Bp(e), Gh(e)) {
        if ("selectionStart" in e)
          var n = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            n = (n = e.ownerDocument) && n.defaultView || window;
            var i = n.getSelection && n.getSelection();
            if (i && i.rangeCount !== 0) {
              n = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                n.nodeType, f.nodeType;
              } catch {
                n = null;
                break e;
              }
              var d = 0, h = -1, v = -1, g = 0, L = 0, Q = e, B = null;
              t: for (; ; ) {
                for (var K; Q !== n || o !== 0 && Q.nodeType !== 3 || (h = d + o), Q !== f || i !== 0 && Q.nodeType !== 3 || (v = d + i), Q.nodeType === 3 && (d += Q.nodeValue.length), (K = Q.firstChild) !== null; )
                  B = Q, Q = K;
                for (; ; ) {
                  if (Q === e) break t;
                  if (B === n && ++g === o && (h = d), B === f && ++L === i && (v = d), (K = Q.nextSibling) !== null) break;
                  Q = B, B = Q.parentNode;
                }
                Q = K;
              }
              n = h === -1 || v === -1 ? null : { start: h, end: v };
            } else n = null;
          }
        n = n || { start: 0, end: 0 };
      } else n = null;
      for (Y0 = {
        focusedElem: e,
        selectionRange: n
      }, dg = !1, nn = t; nn !== null; )
        if (t = nn, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
          e.return = t, nn = e;
        else
          for (; nn !== null; ) {
            switch (e = t = nn, n = e.alternate, o = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && n !== null && zy(e, n);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (e = e.stateNode.containerInfo, n = e.nodeType, n === 9)
                    uu(e);
                  else if (n === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        uu(e);
                        break;
                      default:
                        e.textContent = "";
                    }
                }
                break;
              case 5:
              case 26:
              case 27:
              case 6:
              case 4:
              case 17:
                break;
              default:
                if ((o & 1024) !== 0)
                  throw Error(
                    "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                  );
            }
            if (e = t.sibling, e !== null) {
              e.return = t.return, nn = e;
              break;
            }
            nn = t.return;
          }
    }
    function Uy(e, t, n) {
      var i = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          pl(e, n), i & 4 && Dy(n, sn | bu);
          break;
        case 1:
          if (pl(e, n), i & 4)
            if (e = n.stateNode, t === null)
              n.type.defaultProps || "ref" in n.memoizedProps || yh || (e.props !== n.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                pe(n) || "instance"
              ), e.state !== n.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                pe(n) || "instance"
              )), Ua(n) ? (Il(), Ae(
                n,
                s0,
                n,
                e
              ), Ea()) : Ae(
                n,
                s0,
                n,
                e
              );
            else {
              var o = Oi(
                n.type,
                t.memoizedProps
              );
              t = t.memoizedState, n.type.defaultProps || "ref" in n.memoizedProps || yh || (e.props !== n.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                pe(n) || "instance"
              ), e.state !== n.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                pe(n) || "instance"
              )), Ua(n) ? (Il(), Ae(
                n,
                kS,
                n,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), Ea()) : Ae(
                n,
                kS,
                n,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && My(n), i & 512 && Ac(n, n.return);
          break;
        case 3:
          if (t = jn(), pl(e, n), i & 64 && (i = n.updateQueue, i !== null)) {
            if (o = null, n.child !== null)
              switch (n.child.tag) {
                case 27:
                case 5:
                  o = n.child.stateNode;
                  break;
                case 1:
                  o = n.child.stateNode;
              }
            try {
              Ae(
                n,
                gn,
                i,
                o
              );
            } catch (d) {
              xt(n, n.return, d);
            }
          }
          e.effectDuration += fo(t);
          break;
        case 27:
          t === null && i & 4 && yr(n);
        case 26:
        case 5:
          pl(e, n), t === null && i & 4 && kp(n), i & 512 && Ac(n, n.return);
          break;
        case 12:
          if (i & 4) {
            i = jn(), pl(e, n), e = n.stateNode, e.effectDuration += ro(i);
            try {
              Ae(
                n,
                Cy,
                n,
                t,
                Bv,
                e.effectDuration
              );
            } catch (d) {
              xt(n, n.return, d);
            }
          } else pl(e, n);
          break;
        case 13:
          pl(e, n), i & 4 && mr(e, n), i & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = _i.bind(
            null,
            n
          ), Qo(e, n))));
          break;
        case 22:
          if (i = n.memoizedState !== null || Vc, !i) {
            t = t !== null && t.memoizedState !== null || Ol, o = Vc;
            var f = Ol;
            Vc = i, (Ol = t) && !f ? Pl(
              e,
              n,
              (n.subtreeFlags & 8772) !== 0
            ) : pl(e, n), Vc = o, Ol = f;
          }
          break;
        case 30:
          break;
        default:
          pl(e, n);
      }
    }
    function Fp(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Fp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ga(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function An(e, t, n) {
      for (n = n.child; n !== null; )
        xo(
          e,
          t,
          n
        ), n = n.sibling;
    }
    function xo(e, t, n) {
      if (Ql && typeof Ql.onCommitFiberUnmount == "function")
        try {
          Ql.onCommitFiberUnmount(wc, n);
        } catch (f) {
          rl || (rl = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
      switch (n.tag) {
        case 26:
          Ol || Ha(n, t), An(
            e,
            t,
            n
          ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
          break;
        case 27:
          Ol || Ha(n, t);
          var i = ql, o = ma;
          Rl(n.type) && (ql = n.stateNode, ma = !1), An(
            e,
            t,
            n
          ), Ae(
            n,
            Ko,
            n.stateNode
          ), ql = i, ma = o;
          break;
        case 5:
          Ol || Ha(n, t);
        case 6:
          if (i = ql, o = ma, ql = null, An(
            e,
            t,
            n
          ), ql = i, ma = o, ql !== null)
            if (ma)
              try {
                Ae(
                  n,
                  Er,
                  ql,
                  n.stateNode
                );
              } catch (f) {
                xt(
                  n,
                  t,
                  f
                );
              }
            else
              try {
                Ae(
                  n,
                  Xo,
                  ql,
                  n.stateNode
                );
              } catch (f) {
                xt(
                  n,
                  t,
                  f
                );
              }
          break;
        case 18:
          ql !== null && (ma ? (e = ql, fn(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            n.stateNode
          ), Fo(e)) : fn(ql, n.stateNode));
          break;
        case 4:
          i = ql, o = ma, ql = n.stateNode.containerInfo, ma = !0, An(
            e,
            t,
            n
          ), ql = i, ma = o;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          Ol || Rc(
            Fn,
            n,
            t
          ), Ol || sr(
            n,
            t,
            sn
          ), An(
            e,
            t,
            n
          );
          break;
        case 1:
          Ol || (Ha(n, t), i = n.stateNode, typeof i.componentWillUnmount == "function" && _y(
            n,
            t,
            i
          )), An(
            e,
            t,
            n
          );
          break;
        case 21:
          An(
            e,
            t,
            n
          );
          break;
        case 22:
          Ol = (i = Ol) || n.memoizedState !== null, An(
            e,
            t,
            n
          ), Ol = i;
          break;
        default:
          An(
            e,
            t,
            n
          );
      }
    }
    function mr(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          Ae(
            t,
            fv,
            e
          );
        } catch (n) {
          xt(t, t.return, n);
        }
    }
    function pr(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new Ob()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Ob()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function No(e, t) {
      var n = pr(e);
      t.forEach(function(i) {
        var o = nv.bind(null, e, i);
        if (!n.has(i)) {
          if (n.add(i), ha)
            if (mh !== null && ph !== null)
              zc(ph, mh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(o, o);
        }
      });
    }
    function On(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var o = e, f = t, d = n[i], h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
                if (Rl(h.type)) {
                  ql = h.stateNode, ma = !1;
                  break e;
                }
                break;
              case 5:
                ql = h.stateNode, ma = !1;
                break e;
              case 3:
              case 4:
                ql = h.stateNode.containerInfo, ma = !0;
                break e;
            }
            h = h.return;
          }
          if (ql === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          xo(o, f, d), ql = null, ma = !1, o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          Hy(t, e), t = t.sibling;
    }
    function Hy(e, t) {
      var n = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          On(t, e), _l(e), i & 4 && (Rc(
            Fn | bu,
            e,
            e.return
          ), Co(Fn | bu, e), sr(
            e,
            e.return,
            sn | bu
          ));
          break;
        case 1:
          On(t, e), _l(e), i & 512 && (Ol || n === null || Ha(n, n.return)), i & 64 && Vc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? i : n.concat(i))));
          break;
        case 26:
          var o = ci;
          if (On(t, e), _l(e), i & 512 && (Ol || n === null || Ha(n, n.return)), i & 4)
            if (t = n !== null ? n.memoizedState : null, i = e.memoizedState, n === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, n = e.memoizedProps, t = o.ownerDocument || o;
                    t: switch (i) {
                      case "title":
                        o = t.getElementsByTagName("title")[0], (!o || o[wr] || o[tn] || o.namespaceURI === ni || o.hasAttribute("itemprop")) && (o = t.createElement(i), t.head.insertBefore(
                          o,
                          t.querySelector("head > title")
                        )), Ul(o, i, n), o[tn] = e, C(o), i = o;
                        break e;
                      case "link":
                        var f = sm(
                          "link",
                          "href",
                          t
                        ).get(i + (n.href || ""));
                        if (f) {
                          for (var d = 0; d < f.length; d++)
                            if (o = f[d], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Ul(o, i, n), t.head.appendChild(o);
                        break;
                      case "meta":
                        if (f = sm(
                          "meta",
                          "content",
                          t
                        ).get(i + (n.content || ""))) {
                          for (d = 0; d < f.length; d++)
                            if (o = f[d], Z(
                              n.content,
                              "content"
                            ), o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Ul(o, i, n), t.head.appendChild(o);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    o[tn] = e, C(o), i = o;
                  }
                  e.stateNode = i;
                } else
                  Hc(
                    o,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = dv(
                  o,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : t.count--, i === null ? Hc(
                o,
                e.type,
                e.stateNode
              ) : dv(
                o,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && ad(
                e,
                e.memoizedProps,
                n.memoizedProps
              );
          break;
        case 27:
          On(t, e), _l(e), i & 512 && (Ol || n === null || Ha(n, n.return)), n !== null && i & 4 && ad(
            e,
            e.memoizedProps,
            n.memoizedProps
          );
          break;
        case 5:
          if (On(t, e), _l(e), i & 512 && (Ol || n === null || Ha(n, n.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              Ae(e, wi, t);
            } catch (L) {
              xt(e, e.return, L);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, ad(
            e,
            t,
            n !== null ? n.memoizedProps : t
          )), i & 1024 && (g0 = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (On(t, e), _l(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, n = n !== null ? n.memoizedProps : i, t = e.stateNode;
            try {
              Ae(
                e,
                um,
                t,
                n,
                i
              );
            } catch (L) {
              xt(e, e.return, L);
            }
          }
          break;
        case 3:
          if (o = jn(), fg = null, f = ci, ci = Td(t.containerInfo), On(t, e), ci = f, _l(e), i & 4 && n !== null && n.memoizedState.isDehydrated)
            try {
              Ae(
                e,
                Kn,
                t.containerInfo
              );
            } catch (L) {
              xt(e, e.return, L);
            }
          g0 && (g0 = !1, xy(e)), t.effectDuration += fo(o);
          break;
        case 4:
          i = ci, ci = Td(
            e.stateNode.containerInfo
          ), On(t, e), _l(e), ci = i;
          break;
        case 12:
          i = jn(), On(t, e), _l(e), e.stateNode.effectDuration += ro(i);
          break;
        case 13:
          On(t, e), _l(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (A0 = Xl()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, No(e, i)));
          break;
        case 22:
          o = e.memoizedState !== null;
          var h = n !== null && n.memoizedState !== null, v = Vc, g = Ol;
          if (Vc = v || o, Ol = g || h, On(t, e), Ol = g, Vc = v, _l(e), i & 8192)
            e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | Fg, o && (n === null || h || Vc || Ol || Dn(e)), n = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (n === null) {
                  h = n = t;
                  try {
                    f = h.stateNode, o ? Ae(h, im, f) : Ae(
                      h,
                      vd,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (L) {
                    xt(h, h.return, L);
                  }
                }
              } else if (t.tag === 6) {
                if (n === null) {
                  h = t;
                  try {
                    d = h.stateNode, o ? Ae(h, cm, d) : Ae(
                      h,
                      gd,
                      d,
                      h.memoizedProps
                    );
                  } catch (L) {
                    xt(h, h.return, L);
                  }
                }
              } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                t.child.return = t, t = t.child;
                continue;
              }
              if (t === e) break e;
              for (; t.sibling === null; ) {
                if (t.return === null || t.return === e)
                  break e;
                n === t && (n = null), t = t.return;
              }
              n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (n = i.retryQueue, n !== null && (i.retryQueue = null, No(e, n))));
          break;
        case 19:
          On(t, e), _l(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, No(e, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          On(t, e), _l(e);
      }
    }
    function _l(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          Ae(e, $p, e);
        } catch (n) {
          xt(e, e.return, n);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function xy(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          xy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function pl(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          Uy(e, t.alternate, t), t = t.sibling;
    }
    function xa(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          sr(
            e,
            e.return,
            sn
          ), Dn(e);
          break;
        case 1:
          Ha(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && _y(
            e,
            e.return,
            t
          ), Dn(e);
          break;
        case 27:
          Ae(
            e,
            Ko,
            e.stateNode
          );
        case 26:
        case 5:
          Ha(e, e.return), Dn(e);
          break;
        case 22:
          e.memoizedState === null && Dn(e);
          break;
        case 30:
          Dn(e);
          break;
        default:
          Dn(e);
      }
    }
    function Dn(e) {
      for (e = e.child; e !== null; )
        xa(e), e = e.sibling;
    }
    function Ny(e, t, n, i) {
      var o = n.flags;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          Pl(
            e,
            n,
            i
          ), Dy(n, sn);
          break;
        case 1:
          if (Pl(
            e,
            n,
            i
          ), t = n.stateNode, typeof t.componentDidMount == "function" && Ae(
            n,
            s0,
            n,
            t
          ), t = n.updateQueue, t !== null) {
            e = n.stateNode;
            try {
              Ae(
                n,
                Hg,
                t,
                e
              );
            } catch (f) {
              xt(n, n.return, f);
            }
          }
          i && o & 64 && My(n), Ac(n, n.return);
          break;
        case 27:
          yr(n);
        case 26:
        case 5:
          Pl(
            e,
            n,
            i
          ), i && t === null && o & 4 && kp(n), Ac(n, n.return);
          break;
        case 12:
          if (i && o & 4) {
            o = jn(), Pl(
              e,
              n,
              i
            ), i = n.stateNode, i.effectDuration += ro(o);
            try {
              Ae(
                n,
                Cy,
                n,
                t,
                Bv,
                i.effectDuration
              );
            } catch (f) {
              xt(n, n.return, f);
            }
          } else
            Pl(
              e,
              n,
              i
            );
          break;
        case 13:
          Pl(
            e,
            n,
            i
          ), i && o & 4 && mr(e, n);
          break;
        case 22:
          n.memoizedState === null && Pl(
            e,
            n,
            i
          ), Ac(n, n.return);
          break;
        case 30:
          break;
        default:
          Pl(
            e,
            n,
            i
          );
      }
    }
    function Pl(e, t, n) {
      for (n = n && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        Ny(
          e,
          t.alternate,
          t,
          n
        ), t = t.sibling;
    }
    function Na(e, t) {
      var n = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && aa(e), n != null && hc(n));
    }
    function fl(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (aa(t), e != null && hc(e));
    }
    function Vn(e, t, n, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          ud(
            e,
            t,
            n,
            i
          ), t = t.sibling;
    }
    function ud(e, t, n, i) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Vn(
            e,
            t,
            n,
            i
          ), o & 2048 && ld(t, Jl | bu);
          break;
        case 1:
          Vn(
            e,
            t,
            n,
            i
          );
          break;
        case 3:
          var f = jn();
          Vn(
            e,
            t,
            n,
            i
          ), o & 2048 && (n = null, t.alternate !== null && (n = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== n && (aa(t), n != null && hc(n))), e.passiveEffectDuration += fo(f);
          break;
        case 12:
          if (o & 2048) {
            o = jn(), Vn(
              e,
              t,
              n,
              i
            ), e = t.stateNode, e.passiveEffectDuration += ro(o);
            try {
              Ae(
                t,
                Ng,
                t,
                t.alternate,
                Bv,
                e.passiveEffectDuration
              );
            } catch (h) {
              xt(t, t.return, h);
            }
          } else
            Vn(
              e,
              t,
              n,
              i
            );
          break;
        case 13:
          Vn(
            e,
            t,
            n,
            i
          );
          break;
        case 23:
          break;
        case 22:
          f = t.stateNode;
          var d = t.alternate;
          t.memoizedState !== null ? f._visibility & Qr ? Vn(
            e,
            t,
            n,
            i
          ) : wo(
            e,
            t
          ) : f._visibility & Qr ? Vn(
            e,
            t,
            n,
            i
          ) : (f._visibility |= Qr, Mi(
            e,
            t,
            n,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), o & 2048 && Na(d, t);
          break;
        case 24:
          Vn(
            e,
            t,
            n,
            i
          ), o & 2048 && fl(t.alternate, t);
          break;
        default:
          Vn(
            e,
            t,
            n,
            i
          );
      }
    }
    function Mi(e, t, n, i, o) {
      for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        wy(
          e,
          t,
          n,
          i,
          o
        ), t = t.sibling;
    }
    function wy(e, t, n, i, o) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Mi(
            e,
            t,
            n,
            i,
            o
          ), ld(t, Jl);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & Qr ? Mi(
            e,
            t,
            n,
            i,
            o
          ) : wo(
            e,
            t
          ) : (d._visibility |= Qr, Mi(
            e,
            t,
            n,
            i,
            o
          )), o && f & 2048 && Na(
            t.alternate,
            t
          );
          break;
        case 24:
          Mi(
            e,
            t,
            n,
            i,
            o
          ), o && f & 2048 && fl(t.alternate, t);
          break;
        default:
          Mi(
            e,
            t,
            n,
            i,
            o
          );
      }
    }
    function wo(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var n = e, i = t, o = i.flags;
          switch (i.tag) {
            case 22:
              wo(
                n,
                i
              ), o & 2048 && Na(
                i.alternate,
                i
              );
              break;
            case 24:
              wo(
                n,
                i
              ), o & 2048 && fl(
                i.alternate,
                i
              );
              break;
            default:
              wo(
                n,
                i
              );
          }
          t = t.sibling;
        }
    }
    function fa(e) {
      if (e.subtreeFlags & tp)
        for (e = e.child; e !== null; )
          vr(e), e = e.sibling;
    }
    function vr(e) {
      switch (e.tag) {
        case 26:
          fa(e), e.flags & tp && e.memoizedState !== null && yv(
            ci,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          fa(e);
          break;
        case 3:
        case 4:
          var t = ci;
          ci = Td(
            e.stateNode.containerInfo
          ), fa(e), ci = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = tp, tp = 16777216, fa(e), tp = t) : fa(e));
          break;
        default:
          fa(e);
      }
    }
    function qy(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function qo(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            nn = i, id(
              i,
              e
            );
          }
        qy(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          By(e), e = e.sibling;
    }
    function By(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          qo(e), e.flags & 2048 && nd(
            e,
            e.return,
            Jl | bu
          );
          break;
        case 3:
          var t = jn();
          qo(e), e.stateNode.passiveEffectDuration += fo(t);
          break;
        case 12:
          t = jn(), qo(e), e.stateNode.passiveEffectDuration += ro(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & Qr && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Oc(e)) : qo(e);
          break;
        default:
          qo(e);
      }
    }
    function Oc(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            nn = i, id(
              i,
              e
            );
          }
        qy(e);
      }
      for (e = e.child; e !== null; )
        Yy(e), e = e.sibling;
    }
    function Yy(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          nd(
            e,
            e.return,
            Jl
          ), Oc(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & Qr && (t._visibility &= -3, Oc(e));
          break;
        default:
          Oc(e);
      }
    }
    function id(e, t) {
      for (; nn !== null; ) {
        var n = nn, i = n;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            nd(
              i,
              t,
              Jl
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && aa(i));
            break;
          case 24:
            hc(i.memoizedState.cache);
        }
        if (i = n.child, i !== null) i.return = n, nn = i;
        else
          e: for (n = e; nn !== null; ) {
            i = nn;
            var o = i.sibling, f = i.return;
            if (Fp(i), i === n) {
              nn = null;
              break e;
            }
            if (o !== null) {
              o.return = f, nn = o;
              break e;
            }
            nn = f;
          }
      }
    }
    function Ip() {
      CT.forEach(function(e) {
        return e();
      });
    }
    function jy() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || Y.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function Xn(e) {
      if ((Ut & In) !== Qa && rt !== 0)
        return rt & -rt;
      var t = Y.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = kr, e !== 0 ? e : md()) : Of();
    }
    function Ly() {
      Ka === 0 && (Ka = (rt & 536870912) === 0 || Et ? Ce() : 536870912);
      var e = Eu.current;
      return e !== null && (e.flags |= 32), Ka;
    }
    function nt(e, t, n) {
      if (Th && console.error("useInsertionEffect must not schedule updates."), _0 && (Fv = !0), (e === Jt && (Bt === Pr || Bt === es) || e.cancelPendingCommit !== null) && (Vu(e, 0), Gu(
        e,
        rt,
        Ka,
        !1
      )), va(e, n), (Ut & In) !== 0 && e === Jt) {
        if (ru)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = ct && pe(ct) || "Unknown", wb.has(e) || (wb.add(e), t = pe(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              Nb || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), Nb = !0);
          }
      } else
        ha && cl(e, t, n), Fy(t), e === Jt && ((Ut & In) === Qa && (hf |= n), Sl === Ir && Gu(
          e,
          rt,
          Ka,
          !1
        )), ra(e);
    }
    function Cl(e, t, n) {
      if ((Ut & (In | oi)) !== Qa)
        throw Error("Should not already be working.");
      var i = !n && (t & 124) === 0 && (t & e.expiredLanes) === 0 || Yt(e, t), o = i ? Qy(e, t) : gr(e, t, !0), f = i;
      do {
        if (o === Xc) {
          Sh && !i && Gu(e, t, 0, !1);
          break;
        } else {
          if (n = e.current.alternate, f && !Pp(n)) {
            o = gr(e, t, !1), f = !1;
            continue;
          }
          if (o === vh) {
            if (f = t, e.errorRecoveryDisabledLanes & f)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                o = e;
                var h = d;
                d = cp;
                var v = o.current.memoizedState.isDehydrated;
                if (v && (Vu(
                  o,
                  h
                ).flags |= 256), h = gr(
                  o,
                  h,
                  !1
                ), h !== vh) {
                  if (E0 && !v) {
                    o.errorRecoveryDisabledLanes |= f, hf |= f, o = Ir;
                    break e;
                  }
                  o = Pn, Pn = d, o !== null && (Pn === null ? Pn = o : Pn.push.apply(
                    Pn,
                    o
                  ));
                }
                o = h;
              }
              if (f = !1, o !== vh) continue;
            }
          }
          if (o === np) {
            Vu(e, 0), Gu(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, o) {
              case Xc:
              case np:
                throw Error("Root did not complete. This is a bug in React.");
              case Ir:
                if ((t & 4194048) !== t) break;
              case kv:
                Gu(
                  i,
                  t,
                  Ka,
                  !sf
                );
                break e;
              case vh:
                Pn = null;
                break;
              case S0:
              case Db:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (Y.actQueue !== null)
              wa(
                i,
                n,
                t,
                Pn,
                op,
                $v,
                Ka,
                hf,
                ts
              );
            else {
              if ((t & 62914560) === t && (f = A0 + zb - Xl(), 10 < f)) {
                if (Gu(
                  i,
                  t,
                  Ka,
                  !sf
                ), $l(i, 0, !0) !== 0) break e;
                i.timeoutHandle = Xb(
                  Gy.bind(
                    null,
                    i,
                    n,
                    Pn,
                    op,
                    $v,
                    t,
                    Ka,
                    hf,
                    ts,
                    sf,
                    o,
                    NT,
                    CS,
                    0
                  ),
                  f
                );
                break e;
              }
              Gy(
                i,
                n,
                Pn,
                op,
                $v,
                t,
                Ka,
                hf,
                ts,
                sf,
                o,
                HT,
                CS,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      ra(e);
    }
    function Gy(e, t, n, i, o, f, d, h, v, g, L, Q, B, K) {
      if (e.timeoutHandle = is, Q = t.subtreeFlags, (Q & 8192 || (Q & 16785408) === 16785408) && (yp = { stylesheets: null, count: 0, unsuspend: hv }, vr(t), Q = mv(), Q !== null)) {
        e.cancelPendingCommit = Q(
          wa.bind(
            null,
            e,
            t,
            f,
            n,
            i,
            o,
            d,
            h,
            v,
            L,
            xT,
            B,
            K
          )
        ), Gu(
          e,
          f,
          d,
          !g
        );
        return;
      }
      wa(
        e,
        t,
        f,
        n,
        i,
        o,
        d,
        h,
        v
      );
    }
    function Pp(e) {
      for (var t = e; ; ) {
        var n = t.tag;
        if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null)))
          for (var i = 0; i < n.length; i++) {
            var o = n[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!$n(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (n = t.child, t.subtreeFlags & 16384 && n !== null)
          n.return = t, t = n;
        else {
          if (t === e) break;
          for (; t.sibling === null; ) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          t.sibling.return = t.return, t = t.sibling;
        }
      }
      return !0;
    }
    function Gu(e, t, n, i) {
      t &= ~R0, t &= ~hf, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - Hl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      n !== 0 && bl(e, n, t);
    }
    function Dc() {
      return (Ut & (In | oi)) === Qa ? (Ci(0), !1) : !0;
    }
    function cd() {
      if (ct !== null) {
        if (Bt === pa)
          var e = ct.return;
        else
          e = ct, _s(), Ma(e), rh = null, Pm = 0, e = ct;
        for (; e !== null; )
          Oy(e.alternate, e), e = e.return;
        ct = null;
      }
    }
    function Vu(e, t) {
      var n = e.timeoutHandle;
      n !== is && (e.timeoutHandle = is, JT(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), cd(), Jt = e, ct = n = Pa(e.current, null), rt = t, Bt = pa, Za = null, sf = !1, Sh = Yt(e, t), E0 = !1, Sl = Xc, ts = Ka = R0 = hf = df = 0, Pn = cp = null, $v = !1, (t & 8) !== 0 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var o = 31 - Hl(i), f = 1 << o;
          t |= e[o], i &= ~f;
        }
      return Wi = t, Ts(), t = zS(), 1e3 < t - MS && (Y.recentlyCreatedOwnerStacks = 0, MS = t), ui.discardPendingWarnings(), n;
    }
    function od(e, t) {
      Le = null, Y.H = Kv, Y.getCurrentStack = null, ru = !1, Zl = null, t === $m || t === Gv ? (t = Ln(), Bt = up) : t === xS ? (t = Ln(), Bt = Mb) : Bt = t === vb ? T0 : t !== null && typeof t == "object" && typeof t.then == "function" ? gh : ap, Za = t;
      var n = ct;
      if (n === null)
        Sl = np, _o(
          e,
          mn(t, e.current)
        );
      else
        switch (n.mode & rn && vi(n), Ml(), Bt) {
          case ap:
            me !== null && typeof me.markComponentErrored == "function" && me.markComponentErrored(
              n,
              t,
              rt
            );
            break;
          case Pr:
          case es:
          case up:
          case gh:
          case ip:
            me !== null && typeof me.markComponentSuspended == "function" && me.markComponentSuspended(
              n,
              t,
              rt
            );
        }
    }
    function Vy() {
      var e = Y.H;
      return Y.H = Kv, e === null ? Kv : e;
    }
    function Xy() {
      var e = Y.A;
      return Y.A = _T, e;
    }
    function fd() {
      Sl = Ir, sf || (rt & 4194048) !== rt && Eu.current !== null || (Sh = !0), (df & 134217727) === 0 && (hf & 134217727) === 0 || Jt === null || Gu(
        Jt,
        rt,
        Ka,
        !1
      );
    }
    function gr(e, t, n) {
      var i = Ut;
      Ut |= In;
      var o = Vy(), f = Xy();
      if (Jt !== e || rt !== t) {
        if (ha) {
          var d = e.memoizedUpdaters;
          0 < d.size && (zc(e, rt), d.clear()), Af(e, t);
        }
        op = null, Vu(e, t);
      }
      Ja(t), t = !1, d = Sl;
      e: do
        try {
          if (Bt !== pa && ct !== null) {
            var h = ct, v = Za;
            switch (Bt) {
              case T0:
                cd(), d = kv;
                break e;
              case up:
              case Pr:
              case es:
              case gh:
                Eu.current === null && (t = !0);
                var g = Bt;
                if (Bt = pa, Za = null, Mc(e, h, v, g), n && Sh) {
                  d = Xc;
                  break e;
                }
                break;
              default:
                g = Bt, Bt = pa, Za = null, Mc(e, h, v, g);
            }
          }
          rd(), d = Sl;
          break;
        } catch (L) {
          od(e, L);
        }
      while (!0);
      return t && e.shellSuspendCounter++, _s(), Ut = i, Y.H = o, Y.A = f, it(), ct === null && (Jt = null, rt = 0, Ts()), d;
    }
    function rd() {
      for (; ct !== null; ) sd(ct);
    }
    function Qy(e, t) {
      var n = Ut;
      Ut |= In;
      var i = Vy(), o = Xy();
      if (Jt !== e || rt !== t) {
        if (ha) {
          var f = e.memoizedUpdaters;
          0 < f.size && (zc(e, rt), f.clear()), Af(e, t);
        }
        op = null, Wv = Xl() + _b, Vu(e, t);
      } else
        Sh = Yt(
          e,
          t
        );
      Ja(t);
      e: do
        try {
          if (Bt !== pa && ct !== null)
            t: switch (t = ct, f = Za, Bt) {
              case ap:
                Bt = pa, Za = null, Mc(
                  e,
                  t,
                  f,
                  ap
                );
                break;
              case Pr:
              case es:
                if (xs(f)) {
                  Bt = pa, Za = null, Sr(t);
                  break;
                }
                t = function() {
                  Bt !== Pr && Bt !== es || Jt !== e || (Bt = ip), ra(e);
                }, f.then(t, t);
                break e;
              case up:
                Bt = ip;
                break e;
              case Mb:
                Bt = b0;
                break e;
              case ip:
                xs(f) ? (Bt = pa, Za = null, Sr(t)) : (Bt = pa, Za = null, Mc(
                  e,
                  t,
                  f,
                  ip
                ));
                break;
              case b0:
                var d = null;
                switch (ct.tag) {
                  case 26:
                    d = ct.memoizedState;
                  case 5:
                  case 27:
                    var h = ct;
                    if (!d || dm(d)) {
                      Bt = pa, Za = null;
                      var v = h.sibling;
                      if (v !== null) ct = v;
                      else {
                        var g = h.return;
                        g !== null ? (ct = g, Bo(g)) : ct = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                Bt = pa, Za = null, Mc(
                  e,
                  t,
                  f,
                  b0
                );
                break;
              case gh:
                Bt = pa, Za = null, Mc(
                  e,
                  t,
                  f,
                  gh
                );
                break;
              case T0:
                cd(), Sl = kv;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          Y.actQueue !== null ? rd() : ev();
          break;
        } catch (L) {
          od(e, L);
        }
      while (!0);
      return _s(), Y.H = i, Y.A = o, Ut = n, ct !== null ? (me !== null && typeof me.markRenderYielded == "function" && me.markRenderYielded(), Xc) : (it(), Jt = null, rt = 0, Ts(), Sl);
    }
    function ev() {
      for (; ct !== null && !Lg(); )
        sd(ct);
    }
    function sd(e) {
      var t = e.alternate;
      (e.mode & rn) !== Wt ? (Uu(e), t = Ae(
        e,
        Di,
        t,
        e,
        Wi
      ), vi(e)) : t = Ae(
        e,
        Di,
        t,
        e,
        Wi
      ), e.memoizedProps = e.pendingProps, t === null ? Bo(e) : ct = t;
    }
    function Sr(e) {
      var t = Ae(e, Zy, e);
      e.memoizedProps = e.pendingProps, t === null ? Bo(e) : ct = t;
    }
    function Zy(e) {
      var t = e.alternate, n = (e.mode & rn) !== Wt;
      switch (n && Uu(e), e.tag) {
        case 15:
        case 0:
          t = my(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            rt
          );
          break;
        case 11:
          t = my(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            rt
          );
          break;
        case 5:
          Ma(e);
        default:
          Oy(t, e), e = ct = Qh(e, Wi), t = Di(t, e, Wi);
      }
      return n && vi(e), t;
    }
    function Mc(e, t, n, i) {
      _s(), Ma(t), rh = null, Pm = 0;
      var o = t.return;
      try {
        if ($s(
          e,
          o,
          t,
          n,
          rt
        )) {
          Sl = np, _o(
            e,
            mn(n, e.current)
          ), ct = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw ct = o, f;
        Sl = np, _o(
          e,
          mn(n, e.current)
        ), ct = null;
        return;
      }
      t.flags & 32768 ? (Et || i === ap ? e = !0 : Sh || (rt & 536870912) !== 0 ? e = !1 : (sf = e = !0, (i === Pr || i === es || i === up || i === gh) && (i = Eu.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Ky(t, e)) : Bo(t);
    }
    function Bo(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          Ky(
            t,
            sf
          );
          return;
        }
        var n = t.alternate;
        if (e = t.return, Uu(t), n = Ae(
          t,
          Zp,
          n,
          t,
          Wi
        ), (t.mode & rn) !== Wt && Us(t), n !== null) {
          ct = n;
          return;
        }
        if (t = t.sibling, t !== null) {
          ct = t;
          return;
        }
        ct = t = e;
      } while (t !== null);
      Sl === Xc && (Sl = Db);
    }
    function Ky(e, t) {
      do {
        var n = Kp(e.alternate, e);
        if (n !== null) {
          n.flags &= 32767, ct = n;
          return;
        }
        if ((e.mode & rn) !== Wt) {
          Us(e), n = e.actualDuration;
          for (var i = e.child; i !== null; )
            n += i.actualDuration, i = i.sibling;
          e.actualDuration = n;
        }
        if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
          ct = e;
          return;
        }
        ct = e = n;
      } while (e !== null);
      Sl = kv, ct = null;
    }
    function wa(e, t, n, i, o, f, d, h, v) {
      e.cancelPendingCommit = null;
      do
        zi();
      while (dn !== ls);
      if (ui.flushLegacyContextWarning(), ui.flushPendingUnsafeLifecycleWarnings(), (Ut & (In | oi)) !== Qa)
        throw Error("Should not already be working.");
      if (me !== null && typeof me.markCommitStarted == "function" && me.markCommitStarted(n), t === null) gt();
      else {
        if (n === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= Ig, Bl(
          e,
          n,
          f,
          d,
          h,
          v
        ), e === Jt && (ct = Jt = null, rt = 0), bh = t, mf = e, pf = n, D0 = f, M0 = o, xb = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, av(Po, function() {
          return Yo(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), Bv = uh(), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
          i = Y.T, Y.T = null, o = Dt.p, Dt.p = kn, d = Ut, Ut |= oi;
          try {
            Wp(e, t, n);
          } finally {
            Ut = d, Dt.p = o, Y.T = i;
          }
        }
        dn = Cb, dd(), tv(), Jy();
      }
    }
    function dd() {
      if (dn === Cb) {
        dn = ls;
        var e = mf, t = bh, n = pf, i = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || i) {
          i = Y.T, Y.T = null;
          var o = Dt.p;
          Dt.p = kn;
          var f = Ut;
          Ut |= oi;
          try {
            mh = n, ph = e, Hy(t, e), ph = mh = null, n = Y0;
            var d = Bp(e.containerInfo), h = n.focusedElem, v = n.selectionRange;
            if (d !== h && h && h.ownerDocument && qp(
              h.ownerDocument.documentElement,
              h
            )) {
              if (v !== null && Gh(h)) {
                var g = v.start, L = v.end;
                if (L === void 0 && (L = g), "selectionStart" in h)
                  h.selectionStart = g, h.selectionEnd = Math.min(
                    L,
                    h.value.length
                  );
                else {
                  var Q = h.ownerDocument || document, B = Q && Q.defaultView || window;
                  if (B.getSelection) {
                    var K = B.getSelection(), Ee = h.textContent.length, we = Math.min(
                      v.start,
                      Ee
                    ), kt = v.end === void 0 ? we : Math.min(v.end, Ee);
                    !K.extend && we > kt && (d = kt, kt = we, we = d);
                    var ht = wp(
                      h,
                      we
                    ), T = wp(
                      h,
                      kt
                    );
                    if (ht && T && (K.rangeCount !== 1 || K.anchorNode !== ht.node || K.anchorOffset !== ht.offset || K.focusNode !== T.node || K.focusOffset !== T.offset)) {
                      var R = Q.createRange();
                      R.setStart(ht.node, ht.offset), K.removeAllRanges(), we > kt ? (K.addRange(R), K.extend(T.node, T.offset)) : (R.setEnd(T.node, T.offset), K.addRange(R));
                    }
                  }
                }
              }
              for (Q = [], K = h; K = K.parentNode; )
                K.nodeType === 1 && Q.push({
                  element: K,
                  left: K.scrollLeft,
                  top: K.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < Q.length; h++) {
                var M = Q[h];
                M.element.scrollLeft = M.left, M.element.scrollTop = M.top;
              }
            }
            dg = !!B0, Y0 = B0 = null;
          } finally {
            Ut = f, Dt.p = o, Y.T = i;
          }
        }
        e.current = t, dn = Ub;
      }
    }
    function tv() {
      if (dn === Ub) {
        dn = ls;
        var e = mf, t = bh, n = pf, i = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || i) {
          i = Y.T, Y.T = null;
          var o = Dt.p;
          Dt.p = kn;
          var f = Ut;
          Ut |= oi;
          try {
            me !== null && typeof me.markLayoutEffectsStarted == "function" && me.markLayoutEffectsStarted(n), mh = n, ph = e, Uy(
              e,
              t.alternate,
              t
            ), ph = mh = null, me !== null && typeof me.markLayoutEffectsStopped == "function" && me.markLayoutEffectsStopped();
          } finally {
            Ut = f, Dt.p = o, Y.T = i;
          }
        }
        dn = Hb;
      }
    }
    function Jy() {
      if (dn === wT || dn === Hb) {
        dn = ls, Gg();
        var e = mf, t = bh, n = pf, i = xb, o = (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0;
        o ? dn = O0 : (dn = ls, bh = mf = null, ky(e, e.pendingLanes), ns = 0, rp = null);
        var f = e.pendingLanes;
        if (f === 0 && (yf = null), o || qa(e), o = $c(n), t = t.stateNode, Ql && typeof Ql.onCommitFiberRoot == "function")
          try {
            var d = (t.current.flags & 128) === 128;
            switch (o) {
              case kn:
                var h = xr;
                break;
              case fu:
                h = Sm;
                break;
              case ti:
                h = Po;
                break;
              case jd:
                h = Tm;
                break;
              default:
                h = Po;
            }
            Ql.onCommitFiberRoot(
              wc,
              t,
              h,
              d
            );
          } catch (Q) {
            rl || (rl = !0, console.error(
              "React instrumentation encountered an error: %s",
              Q
            ));
          }
        if (ha && e.memoizedUpdaters.clear(), Ip(), i !== null) {
          d = Y.T, h = Dt.p, Dt.p = kn, Y.T = null;
          try {
            var v = e.onRecoverableError;
            for (t = 0; t < i.length; t++) {
              var g = i[t], L = Xu(g.stack);
              Ae(
                g.source,
                v,
                g.value,
                L
              );
            }
          } finally {
            Y.T = d, Dt.p = h;
          }
        }
        (pf & 3) !== 0 && zi(), ra(e), f = e.pendingLanes, (n & 4194090) !== 0 && (f & 42) !== 0 ? (jv = !0, e === z0 ? fp++ : (fp = 0, z0 = e)) : fp = 0, Ci(0), gt();
      }
    }
    function Xu(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function ky(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, hc(t)));
    }
    function zi(e) {
      return dd(), tv(), Jy(), Yo();
    }
    function Yo() {
      if (dn !== O0) return !1;
      var e = mf, t = D0;
      D0 = 0;
      var n = $c(pf), i = ti > n ? ti : n;
      n = Y.T;
      var o = Dt.p;
      try {
        Dt.p = i, Y.T = null, i = M0, M0 = null;
        var f = mf, d = pf;
        if (dn = ls, bh = mf = null, pf = 0, (Ut & (In | oi)) !== Qa)
          throw Error("Cannot flush passive effects while already rendering.");
        _0 = !0, Fv = !1, me !== null && typeof me.markPassiveEffectsStarted == "function" && me.markPassiveEffectsStarted(d);
        var h = Ut;
        if (Ut |= oi, By(f.current), ud(
          f,
          f.current,
          d,
          i
        ), me !== null && typeof me.markPassiveEffectsStopped == "function" && me.markPassiveEffectsStopped(), qa(f), Ut = h, Ci(0, !1), Fv ? f === rp ? ns++ : (ns = 0, rp = f) : ns = 0, Fv = _0 = !1, Ql && typeof Ql.onPostCommitFiberRoot == "function")
          try {
            Ql.onPostCommitFiberRoot(wc, f);
          } catch (g) {
            rl || (rl = !0, console.error(
              "React instrumentation encountered an error: %s",
              g
            ));
          }
        var v = f.current.stateNode;
        return v.effectDuration = 0, v.passiveEffectDuration = 0, !0;
      } finally {
        Dt.p = o, Y.T = n, ky(e, t);
      }
    }
    function $t(e, t, n) {
      t = mn(n, t), t = nl(e.stateNode, t, 2), e = Aa(e, t, 2), e !== null && (va(e, 2), ra(e));
    }
    function xt(e, t, n) {
      if (Th = !1, e.tag === 3)
        $t(e, e, n);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            $t(
              t,
              e,
              n
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (yf === null || !yf.has(i))) {
              e = mn(n, e), n = ur(2), i = Aa(t, n, 2), i !== null && (Tc(
                n,
                i,
                t,
                e
              ), va(i, 2), ra(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          n
        );
      }
    }
    function $y(e, t, n) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new UT();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(n) || (E0 = !0, o.add(n), i = lv.bind(null, e, t, n), ha && zc(e, n), t.then(i, i));
    }
    function lv(e, t, n) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, jy() && Y.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), Jt === e && (rt & n) === n && (Sl === Ir || Sl === S0 && (rt & 62914560) === rt && Xl() - A0 < zb ? (Ut & In) === Qa && Vu(e, 0) : R0 |= n, ts === rt && (ts = 0)), ra(e);
    }
    function jo(e, t) {
      t === 0 && (t = ka()), e = pn(e, t), e !== null && (va(e, t), ra(e));
    }
    function _i(e) {
      var t = e.memoizedState, n = 0;
      t !== null && (n = t.retryLane), jo(e, n);
    }
    function nv(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (n = o.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        case 22:
          i = e.stateNode._retryCache;
          break;
        default:
          throw Error(
            "Pinged unknown suspense boundary type. This is probably a bug in React."
          );
      }
      i !== null && i.delete(t), jo(e, n);
    }
    function hd(e, t, n) {
      if ((t.subtreeFlags & 67117056) !== 0)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === xc;
          f = n || f, o.tag !== 22 ? o.flags & 67108864 ? f && Ae(
            o,
            Lo,
            i,
            o,
            (o.mode & AS) === Wt
          ) : hd(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? Ae(
            o,
            Lo,
            i,
            o
          ) : o.subtreeFlags & 67108864 && Ae(
            o,
            hd,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function Lo(e, t) {
      var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      qe(!0);
      try {
        xa(t), n && Yy(t), Ny(e, t.alternate, t, !1), n && wy(e, t, 0, null, !1, 0);
      } finally {
        qe(!1);
      }
    }
    function qa(e) {
      var t = !0;
      e.current.mode & (Nn | ai) || (t = !1), hd(
        e,
        e.current,
        t
      );
    }
    function Wy(e) {
      if ((Ut & In) === Qa) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = pe(e) || "ReactComponent", Iv !== null) {
            if (Iv.has(t)) return;
            Iv.add(t);
          } else Iv = /* @__PURE__ */ new Set([t]);
          Ae(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function zc(e, t) {
      ha && e.memoizedUpdaters.forEach(function(n) {
        cl(e, n, t);
      });
    }
    function av(e, t) {
      var n = Y.actQueue;
      return n !== null ? (n.push(t), YT) : gm(e, t);
    }
    function Fy(e) {
      jy() && Y.actQueue === null && Ae(e, function() {
        console.error(
          `An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`,
          pe(e)
        );
      });
    }
    function ra(e) {
      e !== Eh && e.next === null && (Eh === null ? Pv = Eh = e : Eh = Eh.next = e), eg = !0, Y.actQueue !== null ? U0 || (U0 = !0, iv()) : C0 || (C0 = !0, iv());
    }
    function Ci(e, t) {
      if (!H0 && eg) {
        H0 = !0;
        do
          for (var n = !1, i = Pv; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - Hl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (n = !0, Iy(i, f));
            } else
              f = rt, f = $l(
                i,
                i === Jt ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== is
              ), (f & 3) === 0 || Yt(i, f) || (n = !0, Iy(i, f));
            i = i.next;
          }
        while (n);
        H0 = !1;
      }
    }
    function uv() {
      Ba();
    }
    function Ba() {
      eg = U0 = C0 = !1;
      var e = 0;
      as !== 0 && (am() && (e = as), as = 0);
      for (var t = Xl(), n = null, i = Pv; i !== null; ) {
        var o = i.next, f = al(i, t);
        f === 0 ? (i.next = null, n === null ? Pv = o : n.next = o, o === null && (Eh = n)) : (n = i, (e !== 0 || (f & 3) !== 0) && (eg = !0)), i = o;
      }
      Ci(e);
    }
    function al(e, t) {
      for (var n = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - Hl(f), h = 1 << d, v = o[d];
        v === -1 ? ((h & n) === 0 || (h & i) !== 0) && (o[d] = sl(h, t)) : v <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = Jt, n = rt, n = $l(
        e,
        e === t ? n : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== is
      ), i = e.callbackNode, n === 0 || e === t && (Bt === Pr || Bt === es) || e.cancelPendingCommit !== null)
        return i !== null && vl(i), e.callbackNode = null, e.callbackPriority = 0;
      if ((n & 3) === 0 || Yt(e, n)) {
        if (t = n & -n, t !== e.callbackPriority || Y.actQueue !== null && i !== x0)
          vl(i);
        else return t;
        switch ($c(n)) {
          case kn:
          case fu:
            n = Sm;
            break;
          case ti:
            n = Po;
            break;
          case jd:
            n = Tm;
            break;
          default:
            n = Po;
        }
        return i = yd.bind(null, e), Y.actQueue !== null ? (Y.actQueue.push(i), n = x0) : n = gm(n, i), e.callbackPriority = t, e.callbackNode = n, t;
      }
      return i !== null && vl(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function yd(e, t) {
      if (jv = Yv = !1, dn !== ls && dn !== O0)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var n = e.callbackNode;
      if (zi() && e.callbackNode !== n)
        return null;
      var i = rt;
      return i = $l(
        e,
        e === Jt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== is
      ), i === 0 ? null : (Cl(
        e,
        i,
        t
      ), al(e, Xl()), e.callbackNode != null && e.callbackNode === n ? yd.bind(null, e) : null);
    }
    function Iy(e, t) {
      if (zi()) return null;
      Yv = jv, jv = !1, Cl(e, t, !0);
    }
    function vl(e) {
      e !== x0 && e !== null && Ev(e);
    }
    function iv() {
      Y.actQueue !== null && Y.actQueue.push(function() {
        return Ba(), null;
      }), kT(function() {
        (Ut & (In | oi)) !== Qa ? gm(
          xr,
          uv
        ) : Ba();
      });
    }
    function md() {
      return as === 0 && (as = Ce()), as;
    }
    function Py(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Z(e, "action"), zu("" + e));
    }
    function Zt(e, t) {
      var n = t.ownerDocument.createElement("input");
      return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
    }
    function Mn(e, t, n, i, o) {
      if (t === "submit" && n && n.stateNode === o) {
        var f = Py(
          (o[xn] || null).action
        ), d = i.submitter;
        d && (t = (t = d[xn] || null) ? Py(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new Mt(
          "action",
          "action",
          null,
          i,
          o
        );
        e.push({
          event: h,
          listeners: [
            {
              instance: null,
              listener: function() {
                if (i.defaultPrevented) {
                  if (as !== 0) {
                    var v = d ? Zt(
                      o,
                      d
                    ) : new FormData(o), g = {
                      pending: !0,
                      data: v,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(g), Vs(
                      n,
                      g,
                      null,
                      v
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), v = d ? Zt(
                    o,
                    d
                  ) : new FormData(o), g = {
                    pending: !0,
                    data: v,
                    method: o.method,
                    action: f
                  }, Object.freeze(g), Vs(
                    n,
                    g,
                    f,
                    v
                  ));
              },
              currentTarget: o
            }
          ]
        });
      }
    }
    function sa(e, t, n) {
      e.currentTarget = n;
      try {
        t(e);
      } catch (i) {
        y0(i);
      }
      e.currentTarget = null;
    }
    function em(e, t) {
      t = (t & 4) !== 0;
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], v = h.instance, g = h.currentTarget;
              if (h = h.listener, v !== o && f.isPropagationStopped())
                break e;
              v !== null ? Ae(
                v,
                sa,
                f,
                h,
                g
              ) : sa(f, h, g), o = v;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], v = h.instance, g = h.currentTarget, h = h.listener, v !== o && f.isPropagationStopped())
                break e;
              v !== null ? Ae(
                v,
                sa,
                f,
                h,
                g
              ) : sa(f, h, g), o = v;
            }
        }
      }
    }
    function at(e, t) {
      N0.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var n = t[Ld];
      n === void 0 && (n = t[Ld] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      n.has(i) || (zn(t, e, 2, !1), n.add(i));
    }
    function tm(e, t, n) {
      N0.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), zn(
        n,
        e,
        i,
        t
      );
    }
    function br(e) {
      if (!e[tg]) {
        e[tg] = !0, qc.forEach(function(n) {
          n !== "selectionchange" && (N0.has(n) || tm(n, !1, e), tm(n, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[tg] || (t[tg] = !0, tm("selectionchange", !1, t));
      }
    }
    function zn(e, t, n, i) {
      switch (ji(t)) {
        case kn:
          var o = zd;
          break;
        case fu:
          o = $o;
          break;
        default:
          o = Dr;
      }
      n = o.bind(
        null,
        t,
        n,
        e
      ), o = void 0, !$ || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, n, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, n, !0) : o !== void 0 ? e.addEventListener(t, n, {
        passive: o
      }) : e.addEventListener(
        t,
        n,
        !1
      );
    }
    function Qn(e, t, n, i, o) {
      var f = i;
      if ((t & 1) === 0 && (t & 2) === 0 && i !== null)
        e: for (; ; ) {
          if (i === null) return;
          var d = i.tag;
          if (d === 3 || d === 4) {
            var h = i.stateNode.containerInfo;
            if (h === o) break;
            if (d === 4)
              for (d = i.return; d !== null; ) {
                var v = d.tag;
                if ((v === 3 || v === 4) && d.stateNode.containerInfo === o)
                  return;
                d = d.return;
              }
            for (; h !== null; ) {
              if (d = Yl(h), d === null) return;
              if (v = d.tag, v === 5 || v === 6 || v === 26 || v === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      ao(function() {
        var g = f, L = Sa(n), Q = [];
        e: {
          var B = RS.get(e);
          if (B !== void 0) {
            var K = Mt, Ee = e;
            switch (e) {
              case "keypress":
                if (ac(n) === 0) break e;
              case "keydown":
              case "keyup":
                K = tT;
                break;
              case "focusin":
                Ee = "focus", K = hu;
                break;
              case "focusout":
                Ee = "blur", K = hu;
                break;
              case "beforeblur":
              case "afterblur":
                K = hu;
                break;
              case "click":
                if (n.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                K = ze;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                K = Nl;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                K = aT;
                break;
              case SS:
              case bS:
              case TS:
                K = K1;
                break;
              case ES:
                K = iT;
                break;
              case "scroll":
              case "scrollend":
                K = z;
                break;
              case "wheel":
                K = oT;
                break;
              case "copy":
              case "cut":
              case "paste":
                K = k1;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                K = sS;
                break;
              case "toggle":
              case "beforetoggle":
                K = rT;
            }
            var we = (t & 4) !== 0, kt = !we && (e === "scroll" || e === "scrollend"), ht = we ? B !== null ? B + "Capture" : null : B;
            we = [];
            for (var T = g, R; T !== null; ) {
              var M = T;
              if (R = M.stateNode, M = M.tag, M !== 5 && M !== 26 && M !== 27 || R === null || ht === null || (M = la(T, ht), M != null && we.push(
                Go(
                  T,
                  M,
                  R
                )
              )), kt) break;
              T = T.return;
            }
            0 < we.length && (B = new K(
              B,
              Ee,
              null,
              n,
              L
            ), Q.push({
              event: B,
              listeners: we
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (B = e === "mouseover" || e === "pointerover", K = e === "mouseout" || e === "pointerout", B && n !== s && (Ee = n.relatedTarget || n.fromElement) && (Yl(Ee) || Ee[Qi]))
              break e;
            if ((K || B) && (B = L.window === L ? L : (B = L.ownerDocument) ? B.defaultView || B.parentWindow : window, K ? (Ee = n.relatedTarget || n.toElement, K = g, Ee = Ee ? Yl(Ee) : null, Ee !== null && (kt = He(Ee), we = Ee.tag, Ee !== kt || we !== 5 && we !== 27 && we !== 6) && (Ee = null)) : (K = null, Ee = g), K !== Ee)) {
              if (we = ze, M = "onMouseLeave", ht = "onMouseEnter", T = "mouse", (e === "pointerout" || e === "pointerover") && (we = sS, M = "onPointerLeave", ht = "onPointerEnter", T = "pointer"), kt = K == null ? B : ea(K), R = Ee == null ? B : ea(Ee), B = new we(
                M,
                T + "leave",
                K,
                n,
                L
              ), B.target = kt, B.relatedTarget = R, M = null, Yl(L) === g && (we = new we(
                ht,
                T + "enter",
                Ee,
                n,
                L
              ), we.target = R, we.relatedTarget = kt, M = we), kt = M, K && Ee)
                t: {
                  for (we = K, ht = Ee, T = 0, R = we; R; R = _c(R))
                    T++;
                  for (R = 0, M = ht; M; M = _c(M))
                    R++;
                  for (; 0 < T - R; )
                    we = _c(we), T--;
                  for (; 0 < R - T; )
                    ht = _c(ht), R--;
                  for (; T--; ) {
                    if (we === ht || ht !== null && we === ht.alternate)
                      break t;
                    we = _c(we), ht = _c(ht);
                  }
                  we = null;
                }
              else we = null;
              K !== null && Qu(
                Q,
                B,
                K,
                we,
                !1
              ), Ee !== null && kt !== null && Qu(
                Q,
                kt,
                Ee,
                we,
                !0
              );
            }
          }
          e: {
            if (B = g ? ea(g) : window, K = B.nodeName && B.nodeName.toLowerCase(), K === "select" || K === "input" && B.type === "file")
              var J = Hp;
            else if (gs(B))
              if (vS)
                J = zg;
              else {
                J = Dg;
                var de = jh;
              }
            else
              K = B.nodeName, !K || K.toLowerCase() !== "input" || B.type !== "checkbox" && B.type !== "radio" ? g && lc(g.elementType) && (J = Hp) : J = Mg;
            if (J && (J = J(e, g))) {
              uo(
                Q,
                J,
                n,
                L
              );
              break e;
            }
            de && de(e, B, g), e === "focusout" && g && B.type === "number" && g.memoizedProps.value != null && rs(B, "number", B.value);
          }
          switch (de = g ? ea(g) : window, e) {
            case "focusin":
              (gs(de) || de.contentEditable === "true") && (Fd = de, Kg = g, Gm = null);
              break;
            case "focusout":
              Gm = Kg = Fd = null;
              break;
            case "mousedown":
              Jg = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Jg = !1, bs(
                Q,
                n,
                L
              );
              break;
            case "selectionchange":
              if (yT) break;
            case "keydown":
            case "keyup":
              bs(
                Q,
                n,
                L
              );
          }
          var Ze;
          if (Zg)
            e: {
              switch (e) {
                case "compositionstart":
                  var Re = "onCompositionStart";
                  break e;
                case "compositionend":
                  Re = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  Re = "onCompositionUpdate";
                  break e;
              }
              Re = void 0;
            }
          else
            Wd ? hi(e, n) && (Re = "onCompositionEnd") : e === "keydown" && n.keyCode === dS && (Re = "onCompositionStart");
          Re && (hS && n.locale !== "ko" && (Wd || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && Wd && (Ze = vs()) : (w = L, G = "value" in w ? w.value : w.textContent, Wd = !0)), de = en(
            g,
            Re
          ), 0 < de.length && (Re = new rS(
            Re,
            e,
            null,
            n,
            L
          ), Q.push({
            event: Re,
            listeners: de
          }), Ze ? Re.data = Ze : (Ze = wf(n), Ze !== null && (Re.data = Ze)))), (Ze = dT ? qf(e, n) : Og(e, n)) && (Re = en(
            g,
            "onBeforeInput"
          ), 0 < Re.length && (de = new W1(
            "onBeforeInput",
            "beforeinput",
            null,
            n,
            L
          ), Q.push({
            event: de,
            listeners: Re
          }), de.data = Ze)), Mn(
            Q,
            e,
            g,
            n,
            L
          );
        }
        em(Q, t);
      });
    }
    function Go(e, t, n) {
      return {
        instance: e,
        listener: t,
        currentTarget: n
      };
    }
    function en(e, t) {
      for (var n = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = la(e, n), o != null && i.unshift(
          Go(e, o, f)
        ), o = la(e, t), o != null && i.push(
          Go(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function _c(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function Qu(e, t, n, i, o) {
      for (var f = t._reactName, d = []; n !== null && n !== i; ) {
        var h = n, v = h.alternate, g = h.stateNode;
        if (h = h.tag, v !== null && v === i) break;
        h !== 5 && h !== 26 && h !== 27 || g === null || (v = g, o ? (g = la(n, f), g != null && d.unshift(
          Go(n, g, v)
        )) : o || (g = la(n, f), g != null && d.push(
          Go(n, g, v)
        ))), n = n.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function Zu(e, t) {
      _p(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || xv || (xv = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var n = {
        registrationNameDependencies: Va,
        possibleRegistrationNames: Gd
      };
      lc(e) || typeof t.is == "string" || Cp(e, t, n), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function Kt(e, t, n, i) {
      t !== n && (n = Ku(n), Ku(t) !== n && (i[e] = t));
    }
    function lm(e, t, n) {
      t.forEach(function(i) {
        n[Vo(i)] = i === "style" ? pd(e) : e.getAttribute(i);
      });
    }
    function da(e, t) {
      t === !1 ? console.error(
        "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
        e,
        e,
        e
      ) : console.error(
        "Expected `%s` listener to be a function, instead got a value of `%s` type.",
        e,
        typeof t
      );
    }
    function Ya(e, t) {
      return e = e.namespaceURI === Jd || e.namespaceURI === ni ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function Ku(e) {
      return O(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        E(e)
      ), k(e)), (typeof e == "string" ? e : "" + e).replace(jT, `
`).replace(LT, "");
    }
    function Cc(e, t) {
      return t = Ku(t), Ku(e) === t;
    }
    function Ui() {
    }
    function St(e, t, n, i, o, f) {
      switch (n) {
        case "children":
          typeof i == "string" ? (lo(i, t, !1), t === "body" || t === "textarea" && i === "" || Uf(e, i)) : (typeof i == "number" || typeof i == "bigint") && (lo("" + i, t, !1), t !== "body" && Uf(e, "" + i));
          break;
        case "className":
          Ye(e, "class", i);
          break;
        case "tabIndex":
          Ye(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          Ye(e, n, i);
          break;
        case "style":
          ms(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            Ye(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || n !== "href")) {
            console.error(
              n === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              n,
              n
            ), e.removeAttribute(n);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(n);
            break;
          }
          Z(i, n), i = zu("" + i), e.setAttribute(n, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? n === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || ag || (ag = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || ng || (ng = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? n === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || lg ? t !== "button" || o.type == null || o.type === "submit" || lg ? typeof i == "function" && (o.name == null || Yb || (Yb = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || ag || (ag = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || ng || (ng = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (lg = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (lg = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            n === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              n,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (n === "formAction" ? (t !== "input" && St(e, t, "name", o.name, o, null), St(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), St(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), St(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (St(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), St(e, t, "method", o.method, o, null), St(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(n);
            break;
          }
          Z(i, n), i = zu("" + i), e.setAttribute(n, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && da(n, i), e.onclick = Ui);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && da(n, i), at("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && da(n, i), at("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (n = i.__html, n != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = n;
            }
          }
          break;
        case "multiple":
          e.multiple = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "muted":
          e.muted = i && typeof i != "function" && typeof i != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
            e.removeAttribute("xlink:href");
            break;
          }
          Z(i, n), n = zu("" + i), e.setAttributeNS(us, "xlink:href", n);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (Z(i, n), e.setAttribute(n, "" + i)) : e.removeAttribute(n);
          break;
        case "inert":
          i !== "" || ug[n] || (ug[n] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            n
          ));
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (Z(i, n), e.setAttribute(n, i)) : e.removeAttribute(n);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (Z(i, n), e.setAttribute(n, i)) : e.removeAttribute(n);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(n) : (Z(i, n), e.setAttribute(n, i));
          break;
        case "popover":
          at("beforetoggle", e), at("toggle", e), dt(e, "popover", i);
          break;
        case "xlinkActuate":
          hl(
            e,
            us,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          hl(
            e,
            us,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          hl(
            e,
            us,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          hl(
            e,
            us,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          hl(
            e,
            us,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          hl(
            e,
            us,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          hl(
            e,
            w0,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          hl(
            e,
            w0,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          hl(
            e,
            w0,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), dt(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          jb || i == null || typeof i != "object" || (jb = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N" ? (n = nc(n), dt(e, n, i)) : Va.hasOwnProperty(n) && i != null && typeof i != "function" && da(n, i);
      }
    }
    function Hi(e, t, n, i, o, f) {
      switch (n) {
        case "style":
          ms(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (n = i.__html, n != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = n;
            }
          }
          break;
        case "children":
          typeof i == "string" ? Uf(e, i) : (typeof i == "number" || typeof i == "bigint") && Uf(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && da(n, i), at("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && da(n, i), at("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && da(n, i), e.onclick = Ui);
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          break;
        case "innerText":
        case "textContent":
          break;
        default:
          if (Va.hasOwnProperty(n))
            i != null && typeof i != "function" && da(n, i);
          else
            e: {
              if (n[0] === "o" && n[1] === "n" && (o = n.endsWith("Capture"), t = n.slice(2, o ? n.length - 7 : void 0), f = e[xn] || null, f = f != null ? f[n] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, i, o);
                break e;
              }
              n in e ? e[n] = i : i === !0 ? e.setAttribute(n, "") : dt(e, n, i);
            }
      }
    }
    function Ul(e, t, n) {
      switch (Zu(t, n), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          at("error", e), at("load", e);
          var i = !1, o = !1, f;
          for (f in n)
            if (n.hasOwnProperty(f)) {
              var d = n[f];
              if (d != null)
                switch (f) {
                  case "src":
                    i = !0;
                    break;
                  case "srcSet":
                    o = !0;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    St(e, t, f, d, n, null);
                }
            }
          o && St(e, t, "srcSet", n.srcSet, n, null), i && St(e, t, "src", n.src, n, null);
          return;
        case "input":
          Te("input", n), at("invalid", e);
          var h = f = d = o = null, v = null, g = null;
          for (i in n)
            if (n.hasOwnProperty(i)) {
              var L = n[i];
              if (L != null)
                switch (i) {
                  case "name":
                    o = L;
                    break;
                  case "type":
                    d = L;
                    break;
                  case "checked":
                    v = L;
                    break;
                  case "defaultChecked":
                    g = L;
                    break;
                  case "value":
                    f = L;
                    break;
                  case "defaultValue":
                    h = L;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (L != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    St(e, t, i, L, n, null);
                }
            }
          Pi(e, n), _h(
            e,
            f,
            h,
            v,
            g,
            d,
            o,
            !1
          ), ol(e);
          return;
        case "select":
          Te("select", n), at("invalid", e), i = d = f = null;
          for (o in n)
            if (n.hasOwnProperty(o) && (h = n[o], h != null))
              switch (o) {
                case "value":
                  f = h;
                  break;
                case "defaultValue":
                  d = h;
                  break;
                case "multiple":
                  i = h;
                default:
                  St(
                    e,
                    t,
                    o,
                    h,
                    n,
                    null
                  );
              }
          Ia(e, n), t = f, n = d, e.multiple = !!i, t != null ? Du(e, !!i, t, !1) : n != null && Du(e, !!i, n, !0);
          return;
        case "textarea":
          Te("textarea", n), at("invalid", e), f = o = i = null;
          for (d in n)
            if (n.hasOwnProperty(d) && (h = n[d], h != null))
              switch (d) {
                case "value":
                  i = h;
                  break;
                case "defaultValue":
                  o = h;
                  break;
                case "children":
                  f = h;
                  break;
                case "dangerouslySetInnerHTML":
                  if (h != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  St(
                    e,
                    t,
                    d,
                    h,
                    n,
                    null
                  );
              }
          ss(e, n), ec(e, i, o, f), ol(e);
          return;
        case "option":
          zp(e, n);
          for (v in n)
            if (n.hasOwnProperty(v) && (i = n[v], i != null))
              switch (v) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  St(e, t, v, i, n, null);
              }
          return;
        case "dialog":
          at("beforetoggle", e), at("toggle", e), at("cancel", e), at("close", e);
          break;
        case "iframe":
        case "object":
          at("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < sp.length; i++)
            at(sp[i], e);
          break;
        case "image":
          at("error", e), at("load", e);
          break;
        case "details":
          at("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          at("error", e), at("load", e);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (g in n)
            if (n.hasOwnProperty(g) && (i = n[g], i != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  St(e, t, g, i, n, null);
              }
          return;
        default:
          if (lc(t)) {
            for (L in n)
              n.hasOwnProperty(L) && (i = n[L], i !== void 0 && Hi(
                e,
                t,
                L,
                i,
                n,
                void 0
              ));
            return;
          }
      }
      for (h in n)
        n.hasOwnProperty(h) && (i = n[h], i != null && St(e, t, h, i, n, null));
    }
    function cv(e, t, n, i) {
      switch (Zu(t, i), t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var o = null, f = null, d = null, h = null, v = null, g = null, L = null;
          for (K in n) {
            var Q = n[K];
            if (n.hasOwnProperty(K) && Q != null)
              switch (K) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  v = Q;
                default:
                  i.hasOwnProperty(K) || St(
                    e,
                    t,
                    K,
                    null,
                    i,
                    Q
                  );
              }
          }
          for (var B in i) {
            var K = i[B];
            if (Q = n[B], i.hasOwnProperty(B) && (K != null || Q != null))
              switch (B) {
                case "type":
                  f = K;
                  break;
                case "name":
                  o = K;
                  break;
                case "checked":
                  g = K;
                  break;
                case "defaultChecked":
                  L = K;
                  break;
                case "value":
                  d = K;
                  break;
                case "defaultValue":
                  h = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  K !== Q && St(
                    e,
                    t,
                    B,
                    K,
                    i,
                    Q
                  );
              }
          }
          t = n.type === "checkbox" || n.type === "radio" ? n.checked != null : n.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || Bb || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), Bb = !0), !t || i || qb || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), qb = !0), zh(
            e,
            d,
            h,
            v,
            g,
            L,
            f,
            o
          );
          return;
        case "select":
          K = d = h = B = null;
          for (f in n)
            if (v = n[f], n.hasOwnProperty(f) && v != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  K = v;
                default:
                  i.hasOwnProperty(f) || St(
                    e,
                    t,
                    f,
                    null,
                    i,
                    v
                  );
              }
          for (o in i)
            if (f = i[o], v = n[o], i.hasOwnProperty(o) && (f != null || v != null))
              switch (o) {
                case "value":
                  B = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== v && St(
                    e,
                    t,
                    o,
                    f,
                    i,
                    v
                  );
              }
          i = h, t = d, n = K, B != null ? Du(e, !!t, B, !1) : !!n != !!t && (i != null ? Du(e, !!t, i, !0) : Du(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          K = B = null;
          for (h in n)
            if (o = n[h], n.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  St(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = n[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  B = o;
                  break;
                case "defaultValue":
                  K = o;
                  break;
                case "children":
                  break;
                case "dangerouslySetInnerHTML":
                  if (o != null)
                    throw Error(
                      "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                    );
                  break;
                default:
                  o !== f && St(e, t, d, o, i, f);
              }
          Ch(e, B, K);
          return;
        case "option":
          for (var Ee in n)
            if (B = n[Ee], n.hasOwnProperty(Ee) && B != null && !i.hasOwnProperty(Ee))
              switch (Ee) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  St(
                    e,
                    t,
                    Ee,
                    null,
                    i,
                    B
                  );
              }
          for (v in i)
            if (B = i[v], K = n[v], i.hasOwnProperty(v) && B !== K && (B != null || K != null))
              switch (v) {
                case "selected":
                  e.selected = B && typeof B != "function" && typeof B != "symbol";
                  break;
                default:
                  St(
                    e,
                    t,
                    v,
                    B,
                    i,
                    K
                  );
              }
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var we in n)
            B = n[we], n.hasOwnProperty(we) && B != null && !i.hasOwnProperty(we) && St(
              e,
              t,
              we,
              null,
              i,
              B
            );
          for (g in i)
            if (B = i[g], K = n[g], i.hasOwnProperty(g) && B !== K && (B != null || K != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (B != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  St(
                    e,
                    t,
                    g,
                    B,
                    i,
                    K
                  );
              }
          return;
        default:
          if (lc(t)) {
            for (var kt in n)
              B = n[kt], n.hasOwnProperty(kt) && B !== void 0 && !i.hasOwnProperty(kt) && Hi(
                e,
                t,
                kt,
                void 0,
                i,
                B
              );
            for (L in i)
              B = i[L], K = n[L], !i.hasOwnProperty(L) || B === K || B === void 0 && K === void 0 || Hi(
                e,
                t,
                L,
                B,
                i,
                K
              );
            return;
          }
      }
      for (var ht in n)
        B = n[ht], n.hasOwnProperty(ht) && B != null && !i.hasOwnProperty(ht) && St(e, t, ht, null, i, B);
      for (Q in i)
        B = i[Q], K = n[Q], !i.hasOwnProperty(Q) || B === K || B == null && K == null || St(e, t, Q, B, i, K);
    }
    function Vo(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function pd(e) {
      var t = {};
      e = e.style;
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function Tr(e, t, n) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (re(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || Bm.has(f) ? (re(d, f), i += o + f.replace(li, "-$1").toLowerCase().replace(af, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(li, "-$1").toLowerCase().replace(af, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = Ku(i), Ku(t) !== i && (n.style = pd(e)));
      }
    }
    function Zn(e, t, n, i, o, f) {
      if (o.delete(n), e = e.getAttribute(n), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (Z(i, t), e === "" + i)
              return;
        }
      Kt(t, e, i, f);
    }
    function ov(e, t, n, i, o, f) {
      if (o.delete(n), e = e.getAttribute(n), e === null) {
        switch (typeof i) {
          case "function":
          case "symbol":
            return;
        }
        if (!i) return;
      } else
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (i) return;
        }
      Kt(t, e, i, f);
    }
    function nm(e, t, n, i, o, f) {
      if (o.delete(n), e = e.getAttribute(n), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
            break;
          default:
            if (Z(i, n), e === "" + i)
              return;
        }
      Kt(t, e, i, f);
    }
    function Ct(e, t, n, i, o, f) {
      if (o.delete(n), e = e.getAttribute(n), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
          default:
            if (isNaN(i)) return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (!isNaN(i) && (Z(i, t), e === "" + i))
              return;
        }
      Kt(t, e, i, f);
    }
    function Nt(e, t, n, i, o, f) {
      if (o.delete(n), e = e.getAttribute(n), e === null)
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            return;
        }
      else if (i != null)
        switch (typeof i) {
          case "function":
          case "symbol":
          case "boolean":
            break;
          default:
            if (Z(i, t), n = zu("" + i), e === n)
              return;
        }
      Kt(t, e, i, f);
    }
    function ut(e, t, n, i) {
      for (var o = {}, f = /* @__PURE__ */ new Set(), d = e.attributes, h = 0; h < d.length; h++)
        switch (d[h].name.toLowerCase()) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            f.add(d[h].name);
        }
      if (lc(t)) {
        for (var v in n)
          if (n.hasOwnProperty(v)) {
            var g = n[v];
            if (g != null) {
              if (Va.hasOwnProperty(v))
                typeof g != "function" && da(v, g);
              else if (n.suppressHydrationWarning !== !0)
                switch (v) {
                  case "children":
                    typeof g != "string" && typeof g != "number" || Kt(
                      "children",
                      e.textContent,
                      g,
                      o
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    d = e.innerHTML, g = g ? g.__html : void 0, g != null && (g = Ya(e, g), Kt(
                      v,
                      d,
                      g,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(v), Tr(e, g, o);
                    continue;
                  case "offsetParent":
                  case "offsetTop":
                  case "offsetLeft":
                  case "offsetWidth":
                  case "offsetHeight":
                  case "isContentEditable":
                  case "outerText":
                  case "outerHTML":
                    f.delete(v.toLowerCase()), console.error(
                      "Assignment to read-only property will result in a no-op: `%s`",
                      v
                    );
                    continue;
                  case "className":
                    f.delete("class"), d = Ge(
                      e,
                      "class",
                      g
                    ), Kt(
                      "className",
                      d,
                      g,
                      o
                    );
                    continue;
                  default:
                    i.context === Zc && t !== "svg" && t !== "math" ? f.delete(v.toLowerCase()) : f.delete(v), d = Ge(
                      e,
                      v,
                      g
                    ), Kt(
                      v,
                      d,
                      g,
                      o
                    );
                }
            }
          }
      } else
        for (g in n)
          if (n.hasOwnProperty(g) && (v = n[g], v != null)) {
            if (Va.hasOwnProperty(g))
              typeof v != "function" && da(g, v);
            else if (n.suppressHydrationWarning !== !0)
              switch (g) {
                case "children":
                  typeof v != "string" && typeof v != "number" || Kt(
                    "children",
                    e.textContent,
                    v,
                    o
                  );
                  continue;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "value":
                case "checked":
                case "selected":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                  continue;
                case "dangerouslySetInnerHTML":
                  d = e.innerHTML, v = v ? v.__html : void 0, v != null && (v = Ya(e, v), d !== v && (o[g] = { __html: d }));
                  continue;
                case "className":
                  Zn(
                    e,
                    g,
                    "class",
                    v,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  Zn(
                    e,
                    g,
                    "tabindex",
                    v,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(g), Tr(e, v, o);
                  continue;
                case "multiple":
                  f.delete(g), Kt(
                    g,
                    e.multiple,
                    v,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(g), Kt(
                    g,
                    e.muted,
                    v,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), Kt(
                    g,
                    e.autofocus,
                    v,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(g), d = e.getAttribute("data"), Kt(
                      g,
                      d,
                      v,
                      o
                    );
                    continue;
                  }
                case "src":
                case "href":
                  if (!(v !== "" || t === "a" && g === "href" || t === "object" && g === "data")) {
                    console.error(
                      g === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                      g,
                      g
                    );
                    continue;
                  }
                  Nt(
                    e,
                    g,
                    g,
                    v,
                    f,
                    o
                  );
                  continue;
                case "action":
                case "formAction":
                  if (d = e.getAttribute(g), typeof v == "function") {
                    f.delete(g.toLowerCase()), g === "formAction" ? (f.delete("name"), f.delete("formenctype"), f.delete("formmethod"), f.delete("formtarget")) : (f.delete("enctype"), f.delete("method"), f.delete("target"));
                    continue;
                  } else if (d === GT) {
                    f.delete(g.toLowerCase()), Kt(
                      g,
                      "function",
                      v,
                      o
                    );
                    continue;
                  }
                  Nt(
                    e,
                    g,
                    g.toLowerCase(),
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  Nt(
                    e,
                    g,
                    "xlink:href",
                    v,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  nm(
                    e,
                    g,
                    "contenteditable",
                    v,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  nm(
                    e,
                    g,
                    "spellcheck",
                    v,
                    f,
                    o
                  );
                  continue;
                case "draggable":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                  nm(
                    e,
                    g,
                    g,
                    v,
                    f,
                    o
                  );
                  continue;
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                  ov(
                    e,
                    g,
                    g.toLowerCase(),
                    v,
                    f,
                    o
                  );
                  continue;
                case "capture":
                case "download":
                  e: {
                    h = e;
                    var L = d = g, Q = o;
                    if (f.delete(L), h = h.getAttribute(L), h === null)
                      switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "symbol":
                          break e;
                        default:
                          if (v === !1) break e;
                      }
                    else if (v != null)
                      switch (typeof v) {
                        case "function":
                        case "symbol":
                          break;
                        case "boolean":
                          if (v === !0 && h === "") break e;
                          break;
                        default:
                          if (Z(v, d), h === "" + v)
                            break e;
                      }
                    Kt(
                      d,
                      h,
                      v,
                      Q
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, L = d = g, Q = o, f.delete(L), h = h.getAttribute(L), h === null)
                      switch (typeof v) {
                        case "undefined":
                        case "function":
                        case "symbol":
                        case "boolean":
                          break e;
                        default:
                          if (isNaN(v) || 1 > v) break e;
                      }
                    else if (v != null)
                      switch (typeof v) {
                        case "function":
                        case "symbol":
                        case "boolean":
                          break;
                        default:
                          if (!(isNaN(v) || 1 > v) && (Z(v, d), h === "" + v))
                            break e;
                      }
                    Kt(
                      d,
                      h,
                      v,
                      Q
                    );
                  }
                  continue;
                case "rowSpan":
                  Ct(
                    e,
                    g,
                    "rowspan",
                    v,
                    f,
                    o
                  );
                  continue;
                case "start":
                  Ct(
                    e,
                    g,
                    g,
                    v,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  Zn(
                    e,
                    g,
                    "x-height",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  Zn(
                    e,
                    g,
                    "xlink:actuate",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  Zn(
                    e,
                    g,
                    "xlink:arcrole",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  Zn(
                    e,
                    g,
                    "xlink:role",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  Zn(
                    e,
                    g,
                    "xlink:show",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  Zn(
                    e,
                    g,
                    "xlink:title",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  Zn(
                    e,
                    g,
                    "xlink:type",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  Zn(
                    e,
                    g,
                    "xml:base",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  Zn(
                    e,
                    g,
                    "xml:lang",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  Zn(
                    e,
                    g,
                    "xml:space",
                    v,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  v !== "" || ug[g] || (ug[g] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    g
                  )), ov(
                    e,
                    g,
                    g,
                    v,
                    f,
                    o
                  );
                  continue;
                default:
                  if (!(2 < g.length) || g[0] !== "o" && g[0] !== "O" || g[1] !== "n" && g[1] !== "N") {
                    h = nc(g), d = !1, i.context === Zc && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (L = g.toLowerCase(), L = Xr.hasOwnProperty(
                      L
                    ) && Xr[L] || null, L !== null && L !== g && (d = !0, f.delete(L)), f.delete(h));
                    e: if (L = e, Q = h, h = v, Ie(Q))
                      if (L.hasAttribute(Q))
                        L = L.getAttribute(
                          Q
                        ), Z(
                          h,
                          Q
                        ), h = L === "" + h ? h : L;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (L = Q.toLowerCase().slice(0, 5), L !== "data-" && L !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || Kt(
                      g,
                      h,
                      v,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && n.suppressHydrationWarning !== !0 && lm(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function pt(e, t) {
      switch (e.length) {
        case 0:
          return "";
        case 1:
          return e[0];
        case 2:
          return e[0] + " " + t + " " + e[1];
        default:
          return e.slice(0, -1).join(", ") + ", " + t + " " + e[e.length - 1];
      }
    }
    function bt(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function _n(e) {
      switch (e) {
        case ni:
          return Rh;
        case Jd:
          return og;
        default:
          return Zc;
      }
    }
    function Ju(e, t) {
      if (e === Zc)
        switch (t) {
          case "svg":
            return Rh;
          case "math":
            return og;
          default:
            return Zc;
        }
      return e === Rh && t === "foreignObject" ? Zc : e;
    }
    function xi(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function am() {
      var e = window.event;
      return e && e.type === "popstate" ? e === j0 ? !1 : (j0 = e, !0) : (j0 = null, !1);
    }
    function ku(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function ul(e, t, n) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && e.focus();
          break;
        case "img":
          n.src ? e.src = n.src : n.srcSet && (e.srcset = n.srcSet);
      }
    }
    function Ni(e, t, n, i) {
      cv(e, t, n, i), e[xn] = i;
    }
    function wi(e) {
      Uf(e, "");
    }
    function um(e, t, n) {
      e.nodeValue = n;
    }
    function Rl(e) {
      return e === "head";
    }
    function Xo(e, t) {
      e.removeChild(t);
    }
    function Er(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function fn(e, t) {
      var n = t, i = 0, o = 0;
      do {
        var f = n.nextSibling;
        if (e.removeChild(n), f && f.nodeType === 8)
          if (n = f.data, n === cg) {
            if (0 < i && 8 > i) {
              n = i;
              var d = e.ownerDocument;
              if (n & XT && Ko(d.documentElement), n & QT && Ko(d.body), n & ZT)
                for (n = d.head, Ko(n), d = n.firstChild; d; ) {
                  var h = d.nextSibling, v = d.nodeName;
                  d[wr] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && d.rel.toLowerCase() === "stylesheet" || n.removeChild(d), d = h;
                }
            }
            if (o === 0) {
              e.removeChild(f), Fo(t);
              return;
            }
            o--;
          } else
            n === ig || n === Qc || n === dp ? o++ : i = n.charCodeAt(0) - 48;
        else i = 0;
        n = f;
      } while (n);
      Fo(t);
    }
    function im(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function cm(e) {
      e.nodeValue = "";
    }
    function vd(e, t) {
      t = t[KT], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function gd(e, t) {
      e.nodeValue = t;
    }
    function uu(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var n = t;
        switch (t = t.nextSibling, n.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            uu(n), ga(n);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (n.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(n);
      }
    }
    function Vl(e, t, n, i) {
      for (; e.nodeType === 1; ) {
        var o = n;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[wr])
            switch (t) {
              case "meta":
                if (!e.hasAttribute("itemprop")) break;
                return e;
              case "link":
                if (f = e.getAttribute("rel"), f === "stylesheet" && e.hasAttribute("data-precedence"))
                  break;
                if (f !== o.rel || e.getAttribute("href") !== (o.href == null || o.href === "" ? null : o.href) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin) || e.getAttribute("title") !== (o.title == null ? null : o.title))
                  break;
                return e;
              case "style":
                if (e.hasAttribute("data-precedence")) break;
                return e;
              case "script":
                if (f = e.getAttribute("src"), (f !== (o.src == null ? null : o.src) || e.getAttribute("type") !== (o.type == null ? null : o.type) || e.getAttribute("crossorigin") !== (o.crossOrigin == null ? null : o.crossOrigin)) && f && e.hasAttribute("async") && !e.hasAttribute("itemprop"))
                  break;
                return e;
              default:
                return e;
            }
        } else if (t === "input" && e.type === "hidden") {
          Z(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = Cn(e.nextSibling), e === null) break;
      }
      return null;
    }
    function qi(e, t, n) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = Cn(e.nextSibling), e === null)) return null;
      return e;
    }
    function Bi(e) {
      return e.data === dp || e.data === Qc && e.ownerDocument.readyState === Gb;
    }
    function Qo(e, t) {
      var n = e.ownerDocument;
      if (e.data !== Qc || n.readyState === Gb)
        t();
      else {
        var i = function() {
          t(), n.removeEventListener("DOMContentLoaded", i);
        };
        n.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function Cn(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === ig || t === dp || t === Qc || t === q0 || t === Lb)
            break;
          if (t === cg) return null;
        }
      }
      return e;
    }
    function Sd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), n = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          n[Vo(f.name)] = f.name.toLowerCase() === "style" ? pd(e) : f.value;
        }
        return { type: t, props: n };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function om(e, t, n) {
      return n === null || n[VT] !== !0 ? (e.nodeValue === t ? e = null : (t = Ku(t), e = Ku(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function Zo(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === cg) {
            if (t === 0)
              return Cn(e.nextSibling);
            t--;
          } else
            n !== ig && n !== dp && n !== Qc || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function bd(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === ig || n === dp || n === Qc) {
            if (t === 0) return e;
            t--;
          } else n === cg && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Kn(e) {
      Fo(e);
    }
    function fv(e) {
      Fo(e);
    }
    function Un(e, t, n, i, o) {
      switch (o && ys(e, i.ancestorInfo), t = bt(n), e) {
        case "html":
          if (e = t.documentElement, !e)
            throw Error(
              "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "head":
          if (e = t.head, !e)
            throw Error(
              "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        case "body":
          if (e = t.body, !e)
            throw Error(
              "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
            );
          return e;
        default:
          throw Error(
            "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
    }
    function rv(e, t, n, i) {
      if (!n[Qi] && yn(n)) {
        var o = n.tagName.toLowerCase();
        console.error(
          "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
          o,
          o,
          o
        );
      }
      switch (e) {
        case "html":
        case "head":
        case "body":
          break;
        default:
          console.error(
            "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
          );
      }
      for (o = n.attributes; o.length; )
        n.removeAttributeNode(o[0]);
      Ul(n, e, t), n[tn] = i, n[xn] = t;
    }
    function Ko(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      ga(e);
    }
    function Td(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function $u(e, t, n) {
      var i = Ah;
      if (i && typeof t == "string" && t) {
        var o = zl(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof n == "string" && (o += '[crossorigin="' + n + '"]'), Jb.has(o) || (Jb.add(o), e = { rel: e, crossOrigin: n, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), Ul(t, "link", e), C(t), i.head.appendChild(t)));
      }
    }
    function Rr(e, t, n, i) {
      var o = (o = cu.current) ? Td(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof n.precedence == "string" && typeof n.href == "string" ? (n = ja(n.href), t = p(o).hoistableStyles, i = t.get(n), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
            e = ja(n.href);
            var f = p(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: cs, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              ko(e)
            )) && !f._p && (d.instance = f, d.state.loading = hp | Ru), !Au.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: n.href,
                crossOrigin: n.crossOrigin,
                integrity: n.integrity,
                media: n.media,
                hrefLang: n.hrefLang,
                referrerPolicy: n.referrerPolicy
              };
              Au.set(e, h), f || sv(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw n = `

  - ` + Jo(t) + `
  + ` + Jo(n), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n
              );
            return d;
          }
          if (t && i !== null)
            throw n = `

  - ` + Jo(t) + `
  + ` + Jo(n), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + n
            );
          return null;
        case "script":
          return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Yi(n), t = p(o).hoistableScripts, i = t.get(n), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function Jo(e) {
      var t = 0, n = "<link";
      return typeof e.rel == "string" ? (t++, n += ' rel="' + e.rel + '"') : ou.call(e, "rel") && (t++, n += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, n += ' href="' + e.href + '"') : ou.call(e, "href") && (t++, n += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, n += ' precedence="' + e.precedence + '"') : ou.call(e, "precedence") && (t++, n += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (n += " ..."), n + " />";
    }
    function ja(e) {
      return 'href="' + zl(e) + '"';
    }
    function ko(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function fm(e) {
      return je({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function sv(e, t, n, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = hp : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= hp;
      }), t.addEventListener("error", function() {
        return i.loading |= Zb;
      }), Ul(t, "link", n), C(t), e.head.appendChild(t));
    }
    function Yi(e) {
      return '[src="' + zl(e) + '"]';
    }
    function Uc(e) {
      return "script[async]" + e;
    }
    function dv(e, t, n) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + zl(n.href) + '"]'
            );
            if (i)
              return t.instance = i, C(i), i;
            var o = je({}, n, {
              "data-href": n.href,
              "data-precedence": n.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), C(i), Ul(i, "style", o), Ed(i, n.precedence, e), t.instance = i;
          case "stylesheet":
            o = ja(n.href);
            var f = e.querySelector(
              ko(o)
            );
            if (f)
              return t.state.loading |= Ru, t.instance = f, C(f), f;
            i = fm(n), (o = Au.get(o)) && rm(i, o), f = (e.ownerDocument || e).createElement("link"), C(f);
            var d = f;
            return d._p = new Promise(function(h, v) {
              d.onload = h, d.onerror = v;
            }), Ul(f, "link", i), t.state.loading |= Ru, Ed(f, n.precedence, e), t.instance = f;
          case "script":
            return f = Yi(n.src), (o = e.querySelector(
              Uc(f)
            )) ? (t.instance = o, C(o), o) : (i = n, (o = Au.get(f)) && (i = je({}, n), Rd(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), C(o), Ul(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & Ru) === cs && (i = t.instance, t.state.loading |= Ru, Ed(i, n.precedence, e));
      return t.instance;
    }
    function Ed(e, t, n) {
      for (var i = n.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
    }
    function rm(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function Rd(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function sm(e, t, n) {
      if (fg === null) {
        var i = /* @__PURE__ */ new Map(), o = fg = /* @__PURE__ */ new Map();
        o.set(n, i);
      } else
        o = fg, i = o.get(n), i || (i = /* @__PURE__ */ new Map(), o.set(n, i));
      if (i.has(e)) return i;
      for (i.set(e, null), n = n.getElementsByTagName(e), o = 0; o < n.length; o++) {
        var f = n[o];
        if (!(f[wr] || f[tn] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== ni) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function Hc(e, t, n) {
      e = e.ownerDocument || e, e.head.insertBefore(
        n,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function Ad(e, t, n) {
      var i = !n.ancestorInfo.containerTagInScope;
      if (n.context === Rh || t.itemProp != null)
        return !i || t.itemProp == null || e !== "meta" && e !== "title" && e !== "style" && e !== "link" && e !== "script" || console.error(
          "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
          e,
          e
        ), !1;
      switch (e) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") {
            i && console.error(
              'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
            );
            break;
          }
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) {
            if (t.rel === "stylesheet" && typeof t.precedence == "string") {
              e = t.href;
              var o = t.onError, f = t.disabled;
              n = [], t.onLoad && n.push("`onLoad`"), o && n.push("`onError`"), f != null && n.push("`disabled`"), o = pt(n, "and"), o += n.length === 1 ? " prop" : " props", f = n.length === 1 ? "an " + o : "the " + o, n.length && console.error(
                'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                e,
                f,
                o
              );
            }
            i && (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" ? console.error(
              "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
            ) : (t.onError || t.onLoad) && console.error(
              "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ));
            break;
          }
          switch (t.rel) {
            case "stylesheet":
              return e = t.precedence, t = t.disabled, typeof e != "string" && i && console.error(
                'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
              ), typeof e == "string" && t == null;
            default:
              return !0;
          }
        case "script":
          if (e = t.async && typeof t.async != "function" && typeof t.async != "symbol", !e || t.onLoad || t.onError || !t.src || typeof t.src != "string") {
            i && (e ? t.onLoad || t.onError ? console.error(
              "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
            ) : console.error(
              'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
            ));
            break;
          }
          return !0;
        case "noscript":
        case "template":
          i && console.error(
            "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
            e
          );
      }
      return !1;
    }
    function dm(e) {
      return !(e.type === "stylesheet" && (e.state.loading & Kb) === cs);
    }
    function hv() {
    }
    function yv(e, t, n) {
      if (yp === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = yp;
      if (t.type === "stylesheet" && (typeof n.media != "string" || matchMedia(n.media).matches !== !1) && (t.state.loading & Ru) === cs) {
        if (t.instance === null) {
          var o = ja(n.href), f = e.querySelector(
            ko(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = Ar.bind(i), e.then(i, i)), t.state.loading |= Ru, t.instance = f, C(f);
            return;
          }
          f = e.ownerDocument || e, n = fm(n), (o = Au.get(o)) && rm(n, o), f = f.createElement("link"), C(f);
          var d = f;
          d._p = new Promise(function(h, v) {
            d.onload = h, d.onerror = v;
          }), Ul(f, "link", n), t.instance = f;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & Kb) === cs && (i.count++, t = Ar.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function mv() {
      if (yp === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = yp;
      return e.stylesheets && e.count === 0 && Od(e, e.stylesheets), 0 < e.count ? function(t) {
        var n = setTimeout(function() {
          if (e.stylesheets && Od(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(n);
        };
      } : null;
    }
    function Ar() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          Od(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function Od(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, rg = /* @__PURE__ */ new Map(), t.forEach(Dd, e), rg = null, Ar.call(e));
    }
    function Dd(e, t) {
      if (!(t.state.loading & Ru)) {
        var n = rg.get(e);
        if (n) var i = n.get(G0);
        else {
          n = /* @__PURE__ */ new Map(), rg.set(e, n);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (n.set(d.dataset.precedence, d), i = d);
          }
          i && n.set(G0, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = n.get(d) || i, f === i && n.set(G0, o), n.set(d, o), this.count++, i = Ar.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= Ru;
      }
    }
    function pv(e, t, n, i, o, f, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = is, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $a(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $a(0), this.hiddenUpdates = $a(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
    }
    function hm(e, t, n, i, o, f, d, h, v, g, L, Q) {
      return e = new pv(
        e,
        t,
        n,
        d,
        h,
        v,
        g,
        Q
      ), t = gT, f === !0 && (t |= Nn | ai), ha && (t |= rn), f = _(3, null, null, t), e.current = f, f.stateNode = e, t = Fh(), aa(t), e.pooledCache = t, aa(t), f.memoizedState = {
        element: i,
        isDehydrated: n,
        cache: t
      }, gi(f), e;
    }
    function wt(e) {
      return e ? (e = cf, e) : cf;
    }
    function Or(e, t, n, i, o, f) {
      if (Ql && typeof Ql.onScheduleFiberRoot == "function")
        try {
          Ql.onScheduleFiberRoot(wc, i, n);
        } catch (d) {
          rl || (rl = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      me !== null && typeof me.markRenderScheduled == "function" && me.markRenderScheduled(t), o = wt(o), i.context === null ? i.context = o : i.pendingContext = o, ru && Zl !== null && !Fb && (Fb = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        pe(Zl) || "Unknown"
      )), i = Ra(t), i.payload = { element: n }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), n = Aa(e, i, t), n !== null && (nt(n, e, t), yc(n, e, t));
    }
    function vv(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function Md(e, t) {
      vv(e, t), (e = e.alternate) && vv(e, t);
    }
    function gv(e) {
      if (e.tag === 13) {
        var t = pn(e, 67108864);
        t !== null && nt(t, e, 67108864), Md(e, 67108864);
      }
    }
    function wg() {
      return Zl;
    }
    function qg() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; 31 > n; n++) {
        var i = At(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function zd(e, t, n, i) {
      var o = Y.T;
      Y.T = null;
      var f = Dt.p;
      try {
        Dt.p = kn, Dr(e, t, n, i);
      } finally {
        Dt.p = f, Y.T = o;
      }
    }
    function $o(e, t, n, i) {
      var o = Y.T;
      Y.T = null;
      var f = Dt.p;
      try {
        Dt.p = fu, Dr(e, t, n, i);
      } finally {
        Dt.p = f, Y.T = o;
      }
    }
    function Dr(e, t, n, i) {
      if (dg) {
        var o = Wo(i);
        if (o === null)
          Qn(
            e,
            t,
            i,
            hg,
            n
          ), La(e, i);
        else if (Bg(
          o,
          e,
          t,
          n,
          i
        ))
          i.stopPropagation();
        else if (La(e, i), t & 4 && -1 < WT.indexOf(e)) {
          for (; o !== null; ) {
            var f = yn(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = Je(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var v = 1 << 31 - Hl(d);
                        h.entanglements[1] |= v, d &= ~v;
                      }
                      ra(f), (Ut & (In | oi)) === Qa && (Wv = Xl() + _b, Ci(0));
                    }
                  }
                  break;
                case 13:
                  h = pn(f, 2), h !== null && nt(h, f, 2), Dc(), Md(f, 2);
              }
            if (f = Wo(i), f === null && Qn(
              e,
              t,
              i,
              hg,
              n
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          Qn(
            e,
            t,
            i,
            null,
            n
          );
      }
    }
    function Wo(e) {
      return e = Sa(e), Mr(e);
    }
    function Mr(e) {
      if (hg = null, e = Yl(e), e !== null) {
        var t = He(e);
        if (t === null) e = null;
        else {
          var n = t.tag;
          if (n === 13) {
            if (e = st(t), e !== null) return e;
            e = null;
          } else if (n === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return hg = e, null;
    }
    function ji(e) {
      switch (e) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return kn;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return fu;
        case "message":
          switch (Rv()) {
            case xr:
              return kn;
            case Sm:
              return fu;
            case Po:
            case bm:
              return ti;
            case Tm:
              return jd;
            default:
              return ti;
          }
        default:
          return ti;
      }
    }
    function La(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          vf = null;
          break;
        case "dragenter":
        case "dragleave":
          gf = null;
          break;
        case "mouseover":
        case "mouseout":
          Sf = null;
          break;
        case "pointerover":
        case "pointerout":
          pp.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          vp.delete(t.pointerId);
      }
    }
    function Wu(e, t, n, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = yn(t), t !== null && gv(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function Bg(e, t, n, i, o) {
      switch (t) {
        case "focusin":
          return vf = Wu(
            vf,
            e,
            t,
            n,
            i,
            o
          ), !0;
        case "dragenter":
          return gf = Wu(
            gf,
            e,
            t,
            n,
            i,
            o
          ), !0;
        case "mouseover":
          return Sf = Wu(
            Sf,
            e,
            t,
            n,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return pp.set(
            f,
            Wu(
              pp.get(f) || null,
              e,
              t,
              n,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, vp.set(
            f,
            Wu(
              vp.get(f) || null,
              e,
              t,
              n,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function ym(e) {
      var t = Yl(e.target);
      if (t !== null) {
        var n = He(t);
        if (n !== null) {
          if (t = n.tag, t === 13) {
            if (t = st(n), t !== null) {
              e.blockedOn = t, Ou(e.priority, function() {
                if (n.tag === 13) {
                  var i = Xn(n);
                  i = hn(i);
                  var o = pn(
                    n,
                    i
                  );
                  o !== null && nt(o, n, i), Md(n, i);
                }
              });
              return;
            }
          } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function zr(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var n = Wo(e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var i = new n.constructor(
            n.type,
            n
          ), o = i;
          s !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = o, n.target.dispatchEvent(i), s === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = null;
        } else
          return t = yn(n), t !== null && gv(t), e.blockedOn = n, !1;
        t.shift();
      }
      return !0;
    }
    function mm(e, t, n) {
      zr(e) && n.delete(t);
    }
    function Sv() {
      V0 = !1, vf !== null && zr(vf) && (vf = null), gf !== null && zr(gf) && (gf = null), Sf !== null && zr(Sf) && (Sf = null), pp.forEach(mm), vp.forEach(mm);
    }
    function _d(e, t) {
      e.blockedOn === t && (e.blockedOn = null, V0 || (V0 = !0, il.unstable_scheduleCallback(
        il.unstable_NormalPriority,
        Sv
      )));
    }
    function Cd(e) {
      yg !== e && (yg = e, il.unstable_scheduleCallback(
        il.unstable_NormalPriority,
        function() {
          yg === e && (yg = null);
          for (var t = 0; t < e.length; t += 3) {
            var n = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (Mr(i || n) === null)
                continue;
              break;
            }
            var f = yn(n);
            f !== null && (e.splice(t, 3), t -= 3, n = {
              pending: !0,
              data: o,
              method: n.method,
              action: i
            }, Object.freeze(n), Vs(
              f,
              n,
              i,
              o
            ));
          }
        }
      ));
    }
    function Fo(e) {
      function t(v) {
        return _d(v, e);
      }
      vf !== null && _d(vf, e), gf !== null && _d(gf, e), Sf !== null && _d(Sf, e), pp.forEach(t), vp.forEach(t);
      for (var n = 0; n < bf.length; n++) {
        var i = bf[n];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < bf.length && (n = bf[0], n.blockedOn === null); )
        ym(n), n.blockedOn === null && bf.shift();
      if (n = (e.ownerDocument || e).$$reactFormReplay, n != null)
        for (i = 0; i < n.length; i += 3) {
          var o = n[i], f = n[i + 1], d = o[xn] || null;
          if (typeof f == "function")
            d || Cd(n);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[xn] || null)
                h = d.formAction;
              else if (Mr(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? n[i + 1] = h : (n.splice(i, 3), i -= 3), Cd(n);
          }
        }
    }
    function Ud(e) {
      this._internalRoot = e;
    }
    function Hd(e) {
      this._internalRoot = e;
    }
    function xd(e) {
      e[Qi] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var il = N1(), pm = Rf(), Yg = w1(), je = Object.assign, jg = Symbol.for("react.element"), Fu = Symbol.for("react.transitional.element"), Qe = Symbol.for("react.portal"), Li = Symbol.for("react.fragment"), xc = Symbol.for("react.strict_mode"), _r = Symbol.for("react.profiler"), bv = Symbol.for("react.provider"), Cr = Symbol.for("react.consumer"), Hn = Symbol.for("react.context"), Gi = Symbol.for("react.forward_ref"), Vi = Symbol.for("react.suspense"), Nd = Symbol.for("react.suspense_list"), wd = Symbol.for("react.memo"), Jn = Symbol.for("react.lazy"), qd = Symbol.for("react.activity"), Tv = Symbol.for("react.memo_cache_sentinel"), Ur = Symbol.iterator, qt = Symbol.for("react.client.reference"), Al = Array.isArray, Y = pm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Dt = Yg.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, vm = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), Hr = [], Io = [], iu = -1, Iu = ft(null), Nc = ft(null), cu = ft(null), Bd = ft(null), ou = Object.prototype.hasOwnProperty, gm = il.unstable_scheduleCallback, Ev = il.unstable_cancelCallback, Lg = il.unstable_shouldYield, Gg = il.unstable_requestPaint, Xl = il.unstable_now, Rv = il.unstable_getCurrentPriorityLevel, xr = il.unstable_ImmediatePriority, Sm = il.unstable_UserBlockingPriority, Po = il.unstable_NormalPriority, bm = il.unstable_LowPriority, Tm = il.unstable_IdlePriority, Ga = il.log, Em = il.unstable_setDisableYieldValue, wc = null, Ql = null, me = null, rl = !1, ha = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", Hl = Math.clz32 ? Math.clz32 : It, Pu = Math.log, Vg = Math.LN2, Yd = 256, ei = 4194304, kn = 2, fu = 8, ti = 32, jd = 268435456, Xi = Math.random().toString(36).slice(2), tn = "__reactFiber$" + Xi, xn = "__reactProps$" + Xi, Qi = "__reactContainer$" + Xi, Ld = "__reactEvents$" + Xi, ef = "__reactListeners$" + Xi, Nr = "__reactHandles$" + Xi, Rm = "__reactResources$" + Xi, wr = "__reactMarker$" + Xi, qc = /* @__PURE__ */ new Set(), Va = {}, Gd = {}, Vd = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, Am = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Xd = {}, qr = {}, tf = 0, Om, Av, Dm, lf, Ov, Dv, Mv;
    Wa.__reactDisabledLog = !0;
    var nf, Br, Yr = !1, Mm = new (typeof WeakMap == "function" ? WeakMap : Map)(), Zl = null, ru = !1, zv = /[\n"\\]/g, zm = !1, _m = !1, Cm = !1, Qd = !1, Um = !1, jr = !1, _v = ["value", "defaultValue"], Cv = !1, Zd = /["'&<>\n\t]|^\s|\s$/, Hm = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Lr = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), xm = Lr.concat(["button"]), Uv = "dd dt li option optgroup p rp rt".split(" "), Kd = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null,
      containerTagInScope: null,
      implicitRootScope: !1
    }, Xa = {}, su = {
      animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
        " "
      ),
      background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
        " "
      ),
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
        " "
      ),
      borderBlockEnd: [
        "borderBlockEndColor",
        "borderBlockEndStyle",
        "borderBlockEndWidth"
      ],
      borderBlockStart: [
        "borderBlockStartColor",
        "borderBlockStartStyle",
        "borderBlockStartWidth"
      ],
      borderBottom: [
        "borderBottomColor",
        "borderBottomStyle",
        "borderBottomWidth"
      ],
      borderColor: [
        "borderBottomColor",
        "borderLeftColor",
        "borderRightColor",
        "borderTopColor"
      ],
      borderImage: [
        "borderImageOutset",
        "borderImageRepeat",
        "borderImageSlice",
        "borderImageSource",
        "borderImageWidth"
      ],
      borderInlineEnd: [
        "borderInlineEndColor",
        "borderInlineEndStyle",
        "borderInlineEndWidth"
      ],
      borderInlineStart: [
        "borderInlineStartColor",
        "borderInlineStartStyle",
        "borderInlineStartWidth"
      ],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: [
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
        "borderTopLeftRadius",
        "borderTopRightRadius"
      ],
      borderRight: [
        "borderRightColor",
        "borderRightStyle",
        "borderRightWidth"
      ],
      borderStyle: [
        "borderBottomStyle",
        "borderLeftStyle",
        "borderRightStyle",
        "borderTopStyle"
      ],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: [
        "borderBottomWidth",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth"
      ],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
        " "
      ),
      fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
        " "
      ),
      gap: ["columnGap", "rowGap"],
      grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
        " "
      ),
      gridArea: [
        "gridColumnEnd",
        "gridColumnStart",
        "gridRowEnd",
        "gridRowStart"
      ],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: [
        "gridTemplateAreas",
        "gridTemplateColumns",
        "gridTemplateRows"
      ],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
        " "
      ),
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: [
        "textDecorationColor",
        "textDecorationLine",
        "textDecorationStyle"
      ],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: [
        "transitionDelay",
        "transitionDuration",
        "transitionProperty",
        "transitionTimingFunction"
      ],
      wordWrap: ["overflowWrap"]
    }, li = /([A-Z])/g, af = /^ms-/, Gr = /^(?:webkit|moz|o)[A-Z]/, Zi = /^-ms-/, Xg = /-(.)/g, Nm = /;\s*$/, du = {}, wm = {}, qm = !1, Vr = !1, Bm = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), Jd = "http://www.w3.org/1998/Math/MathML", ni = "http://www.w3.org/2000/svg", kd = /* @__PURE__ */ new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"]
    ]), Xr = {
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      fetchpriority: "fetchPriority",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      inert: "inert",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      popover: "popover",
      popovertarget: "popoverTarget",
      popovertargetaction: "popoverTargetAction",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      transformorigin: "transformOrigin",
      "transform-origin": "transformOrigin",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, uf = {
      "aria-current": 0,
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      "aria-hidden": 0,
      "aria-invalid": 0,
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, Ki = {}, $d = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Hv = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), xv = !1, xl = {}, l = /^on./, a = /^on[^A-Z]/, u = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), c = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), r = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, s = null, y = null, m = null, b = !1, x = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), $ = !1;
    if (x)
      try {
        var I = {};
        Object.defineProperty(I, "passive", {
          get: function() {
            $ = !0;
          }
        }), window.addEventListener("test", I, I), window.removeEventListener("test", I, I);
      } catch {
        $ = !1;
      }
    var w = null, G = null, Ue = null, _e = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Mt = Ll(_e), U = je({}, _e, { view: 0, detail: 0 }), z = Ll(U), N, F, ge, We = je({}, U, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Fl,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== ge && (ge && e.type === "mousemove" ? (N = e.screenX - ge.screenX, F = e.screenY - ge.screenY) : F = N = 0, ge = e), N);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : F;
      }
    }), ze = Ll(We), xe = je({}, We, { dataTransfer: 0 }), Nl = Ll(xe), Tt = je({}, U, { relatedTarget: 0 }), hu = Ll(Tt), Qg = je({}, _e, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), K1 = Ll(Qg), J1 = je({}, _e, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), k1 = Ll(J1), $1 = je({}, _e, { data: 0 }), rS = Ll(
      $1
    ), W1 = rS, F1 = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, I1 = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    }, P1 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, eT = je({}, U, {
      key: function(e) {
        if (e.key) {
          var t = F1[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = ac(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? I1[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Fl,
      charCode: function(e) {
        return e.type === "keypress" ? ac(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? ac(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), tT = Ll(eT), lT = je({}, We, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), sS = Ll(lT), nT = je({}, U, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Fl
    }), aT = Ll(nT), uT = je({}, _e, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), iT = Ll(uT), cT = je({}, We, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), oT = Ll(cT), fT = je({}, _e, {
      newState: 0,
      oldState: 0
    }), rT = Ll(fT), sT = [9, 13, 27, 32], dS = 229, Zg = x && "CompositionEvent" in window, Ym = null;
    x && "documentMode" in document && (Ym = document.documentMode);
    var dT = x && "TextEvent" in window && !Ym, hS = x && (!Zg || Ym && 8 < Ym && 11 >= Ym), yS = 32, mS = String.fromCharCode(yS), pS = !1, Wd = !1, hT = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    }, jm = null, Lm = null, vS = !1;
    x && (vS = Yh("input") && (!document.documentMode || 9 < document.documentMode));
    var $n = typeof Object.is == "function" ? Object.is : _g, yT = x && "documentMode" in document && 11 >= document.documentMode, Fd = null, Kg = null, Gm = null, Jg = !1, Id = {
      animationend: uc("Animation", "AnimationEnd"),
      animationiteration: uc("Animation", "AnimationIteration"),
      animationstart: uc("Animation", "AnimationStart"),
      transitionrun: uc("Transition", "TransitionRun"),
      transitionstart: uc("Transition", "TransitionStart"),
      transitioncancel: uc("Transition", "TransitionCancel"),
      transitionend: uc("Transition", "TransitionEnd")
    }, kg = {}, gS = {};
    x && (gS = document.createElement("div").style, "AnimationEvent" in window || (delete Id.animationend.animation, delete Id.animationiteration.animation, delete Id.animationstart.animation), "TransitionEvent" in window || delete Id.transitionend.transition);
    var SS = ic("animationend"), bS = ic("animationiteration"), TS = ic("animationstart"), mT = ic("transitionrun"), pT = ic("transitionstart"), vT = ic("transitioncancel"), ES = ic("transitionend"), RS = /* @__PURE__ */ new Map(), $g = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    $g.push("scrollEnd");
    var Wg = /* @__PURE__ */ new WeakMap(), Fg = 1, Qr = 2, yu = [], Pd = 0, Ig = 0, cf = {};
    Object.freeze(cf);
    var mu = null, eh = null, Wt = 0, gT = 1, rn = 2, Nn = 8, ai = 16, AS = 64, OS = !1;
    try {
      var DS = Object.preventExtensions({});
    } catch {
      OS = !0;
    }
    var th = [], lh = 0, Nv = null, wv = 0, pu = [], vu = 0, Zr = null, Bc = 1, Yc = "", Wn = null, gl = null, Et = !1, jc = !1, gu = null, Kr = null, Ji = !1, Pg = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), MS = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var ST = performance, zS = function() {
        return ST.now();
      };
    else {
      var bT = Date;
      zS = function() {
        return bT.now();
      };
    }
    var e0 = ft(null), t0 = ft(null), _S = {}, qv = null, nh = null, ah = !1, TT = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(n, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(n) {
          return n();
        });
      };
    }, ET = il.unstable_scheduleCallback, RT = il.unstable_NormalPriority, Kl = {
      $$typeof: Hn,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, uh = il.unstable_now, CS = -0, Bv = -0, ya = -1.1, Jr = -0, Yv = !1, jv = !1, Vm = null, l0 = 0, kr = 0, ih = null, US = Y.S;
    Y.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && Gp(e, t), US !== null && US(e, t);
    };
    var $r = ft(null), ui = {
      recordUnsafeLifecycleWarnings: function() {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function() {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    }, Xm = [], Qm = [], Zm = [], Km = [], Jm = [], km = [], Wr = /* @__PURE__ */ new Set();
    ui.recordUnsafeLifecycleWarnings = function(e, t) {
      Wr.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && Xm.push(e), e.mode & Nn && typeof t.UNSAFE_componentWillMount == "function" && Qm.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Zm.push(e), e.mode & Nn && typeof t.UNSAFE_componentWillReceiveProps == "function" && Km.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Jm.push(e), e.mode & Nn && typeof t.UNSAFE_componentWillUpdate == "function" && km.push(e));
    }, ui.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < Xm.length && (Xm.forEach(function(h) {
        e.add(
          pe(h) || "Component"
        ), Wr.add(h.type);
      }), Xm = []);
      var t = /* @__PURE__ */ new Set();
      0 < Qm.length && (Qm.forEach(function(h) {
        t.add(
          pe(h) || "Component"
        ), Wr.add(h.type);
      }), Qm = []);
      var n = /* @__PURE__ */ new Set();
      0 < Zm.length && (Zm.forEach(function(h) {
        n.add(
          pe(h) || "Component"
        ), Wr.add(h.type);
      }), Zm = []);
      var i = /* @__PURE__ */ new Set();
      0 < Km.length && (Km.forEach(
        function(h) {
          i.add(
            pe(h) || "Component"
          ), Wr.add(h.type);
        }
      ), Km = []);
      var o = /* @__PURE__ */ new Set();
      0 < Jm.length && (Jm.forEach(function(h) {
        o.add(
          pe(h) || "Component"
        ), Wr.add(h.type);
      }), Jm = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < km.length && (km.forEach(function(h) {
        f.add(
          pe(h) || "Component"
        ), Wr.add(h.type);
      }), km = []), 0 < t.size) {
        var d = q(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = q(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = q(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = q(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < n.size && (d = q(
        n
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = q(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var Lv = /* @__PURE__ */ new Map(), HS = /* @__PURE__ */ new Set();
    ui.recordLegacyContextWarning = function(e, t) {
      for (var n = null, i = e; i !== null; )
        i.mode & Nn && (n = i), i = i.return;
      n === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !HS.has(e.type) && (i = Lv.get(n), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Lv.set(n, i)), i.push(e));
    }, ui.flushLegacyContextWarning = function() {
      Lv.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], n = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            n.add(pe(o) || "Component"), HS.add(o.type);
          });
          var i = q(n);
          Ae(t, function() {
            console.error(
              `Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://react.dev/link/legacy-context`,
              i
            );
          });
        }
      });
    }, ui.discardPendingWarnings = function() {
      Xm = [], Qm = [], Zm = [], Km = [], Jm = [], km = [], Lv = /* @__PURE__ */ new Map();
    };
    var $m = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), xS = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), Gv = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), n0 = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Wm = null, Vv = !1, Su = 0, bu = 1, Fn = 2, sn = 4, Jl = 8, NS = 0, wS = 1, qS = 2, a0 = 3, of = !1, BS = !1, u0 = null, i0 = !1, ch = ft(null), Xv = ft(0), oh, YS = /* @__PURE__ */ new Set(), jS = /* @__PURE__ */ new Set(), c0 = /* @__PURE__ */ new Set(), LS = /* @__PURE__ */ new Set(), ff = 0, Le = null, Gt = null, wl = null, Qv = !1, fh = !1, Fr = !1, Zv = 0, Fm = 0, Lc = null, AT = 0, OT = 25, X = null, Tu = null, Gc = -1, Im = !1, Kv = {
      readContext: Xt,
      use: ll,
      useCallback: Lt,
      useContext: Lt,
      useEffect: Lt,
      useImperativeHandle: Lt,
      useLayoutEffect: Lt,
      useInsertionEffect: Lt,
      useMemo: Lt,
      useReducer: Lt,
      useRef: Lt,
      useState: Lt,
      useDebugValue: Lt,
      useDeferredValue: Lt,
      useTransition: Lt,
      useSyncExternalStore: Lt,
      useId: Lt,
      useHostTransitionStatus: Lt,
      useFormState: Lt,
      useActionState: Lt,
      useOptimistic: Lt,
      useMemoCache: Lt,
      useCacheRefresh: Lt
    }, o0 = null, GS = null, f0 = null, VS = null, ki = null, ii = null, Jv = null;
    o0 = {
      readContext: function(e) {
        return Xt(e);
      },
      use: ll,
      useCallback: function(e, t) {
        return X = "useCallback", ke(), bi(t), Eo(e, t);
      },
      useContext: function(e) {
        return X = "useContext", ke(), Xt(e);
      },
      useEffect: function(e, t) {
        return X = "useEffect", ke(), bi(t), Wf(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", ke(), bi(n), qu(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        X = "useInsertionEffect", ke(), bi(t), ia(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", ke(), bi(t), iy(e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", ke(), bi(t);
        var n = Y.H;
        Y.H = ki;
        try {
          return vc(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", ke();
        var i = Y.H;
        Y.H = ki;
        try {
          return Nu(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function(e) {
        return X = "useRef", ke(), Ai(e);
      },
      useState: function(e) {
        X = "useState", ke();
        var t = Y.H;
        Y.H = ki;
        try {
          return _a(e);
        } finally {
          Y.H = t;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", ke();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", ke(), Ro(e, t);
      },
      useTransition: function() {
        return X = "useTransition", ke(), Pf();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", ke(), qs(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", ke(), gc();
      },
      useFormState: function(e, t) {
        return X = "useFormState", ke(), ho(), So(e, t);
      },
      useActionState: function(e, t) {
        return X = "useActionState", ke(), So(e, t);
      },
      useOptimistic: function(e) {
        return X = "useOptimistic", ke(), eu(e);
      },
      useHostTransitionStatus: Tn,
      useMemoCache: Ht,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ke(), er();
      }
    }, GS = {
      readContext: function(e) {
        return Xt(e);
      },
      use: ll,
      useCallback: function(e, t) {
        return X = "useCallback", ne(), Eo(e, t);
      },
      useContext: function(e) {
        return X = "useContext", ne(), Xt(e);
      },
      useEffect: function(e, t) {
        return X = "useEffect", ne(), Wf(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", ne(), qu(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        X = "useInsertionEffect", ne(), ia(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", ne(), iy(e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", ne();
        var n = Y.H;
        Y.H = ki;
        try {
          return vc(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", ne();
        var i = Y.H;
        Y.H = ki;
        try {
          return Nu(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function(e) {
        return X = "useRef", ne(), Ai(e);
      },
      useState: function(e) {
        X = "useState", ne();
        var t = Y.H;
        Y.H = ki;
        try {
          return _a(e);
        } finally {
          Y.H = t;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", ne();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", ne(), Ro(e, t);
      },
      useTransition: function() {
        return X = "useTransition", ne(), Pf();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", ne(), qs(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", ne(), gc();
      },
      useActionState: function(e, t) {
        return X = "useActionState", ne(), So(e, t);
      },
      useFormState: function(e, t) {
        return X = "useFormState", ne(), ho(), So(e, t);
      },
      useOptimistic: function(e) {
        return X = "useOptimistic", ne(), eu(e);
      },
      useHostTransitionStatus: Tn,
      useMemoCache: Ht,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ne(), er();
      }
    }, f0 = {
      readContext: function(e) {
        return Xt(e);
      },
      use: ll,
      useCallback: function(e, t) {
        return X = "useCallback", ne(), Ff(e, t);
      },
      useContext: function(e) {
        return X = "useContext", ne(), Xt(e);
      },
      useEffect: function(e, t) {
        X = "useEffect", ne(), bn(2048, Jl, e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", ne(), To(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return X = "useInsertionEffect", ne(), bn(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", ne(), bn(4, sn, e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", ne();
        var n = Y.H;
        Y.H = ii;
        try {
          return If(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", ne();
        var i = Y.H;
        Y.H = ii;
        try {
          return cn(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function() {
        return X = "useRef", ne(), _t().memoizedState;
      },
      useState: function() {
        X = "useState", ne();
        var e = Y.H;
        Y.H = ii;
        try {
          return cn($e);
        } finally {
          Y.H = e;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", ne();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", ne(), Gs(e, t);
      },
      useTransition: function() {
        return X = "useTransition", ne(), Xs();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", ne(), Jf(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", ne(), _t().memoizedState;
      },
      useFormState: function(e) {
        return X = "useFormState", ne(), ho(), Ls(e);
      },
      useActionState: function(e) {
        return X = "useActionState", ne(), Ls(e);
      },
      useOptimistic: function(e, t) {
        return X = "useOptimistic", ne(), tu(e, t);
      },
      useHostTransitionStatus: Tn,
      useMemoCache: Ht,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ne(), _t().memoizedState;
      }
    }, VS = {
      readContext: function(e) {
        return Xt(e);
      },
      use: ll,
      useCallback: function(e, t) {
        return X = "useCallback", ne(), Ff(e, t);
      },
      useContext: function(e) {
        return X = "useContext", ne(), Xt(e);
      },
      useEffect: function(e, t) {
        X = "useEffect", ne(), bn(2048, Jl, e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", ne(), To(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return X = "useInsertionEffect", ne(), bn(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", ne(), bn(4, sn, e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", ne();
        var n = Y.H;
        Y.H = Jv;
        try {
          return If(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", ne();
        var i = Y.H;
        Y.H = Jv;
        try {
          return za(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function() {
        return X = "useRef", ne(), _t().memoizedState;
      },
      useState: function() {
        X = "useState", ne();
        var e = Y.H;
        Y.H = Jv;
        try {
          return za($e);
        } finally {
          Y.H = e;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", ne();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", ne(), oy(e, t);
      },
      useTransition: function() {
        return X = "useTransition", ne(), Yu();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", ne(), Jf(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", ne(), _t().memoizedState;
      },
      useFormState: function(e) {
        return X = "useFormState", ne(), ho(), Ri(e);
      },
      useActionState: function(e) {
        return X = "useActionState", ne(), Ri(e);
      },
      useOptimistic: function(e, t) {
        return X = "useOptimistic", ne(), js(e, t);
      },
      useHostTransitionStatus: Tn,
      useMemoCache: Ht,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ne(), _t().memoizedState;
      }
    }, ki = {
      readContext: function(e) {
        return P(), Xt(e);
      },
      use: function(e) {
        return A(), ll(e);
      },
      useCallback: function(e, t) {
        return X = "useCallback", A(), ke(), Eo(e, t);
      },
      useContext: function(e) {
        return X = "useContext", A(), ke(), Xt(e);
      },
      useEffect: function(e, t) {
        return X = "useEffect", A(), ke(), Wf(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", A(), ke(), qu(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        X = "useInsertionEffect", A(), ke(), ia(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", A(), ke(), iy(e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", A(), ke();
        var n = Y.H;
        Y.H = ki;
        try {
          return vc(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", A(), ke();
        var i = Y.H;
        Y.H = ki;
        try {
          return Nu(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function(e) {
        return X = "useRef", A(), ke(), Ai(e);
      },
      useState: function(e) {
        X = "useState", A(), ke();
        var t = Y.H;
        Y.H = ki;
        try {
          return _a(e);
        } finally {
          Y.H = t;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", A(), ke();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", A(), ke(), Ro(e, t);
      },
      useTransition: function() {
        return X = "useTransition", A(), ke(), Pf();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", A(), ke(), qs(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", A(), ke(), gc();
      },
      useFormState: function(e, t) {
        return X = "useFormState", A(), ke(), So(e, t);
      },
      useActionState: function(e, t) {
        return X = "useActionState", A(), ke(), So(e, t);
      },
      useOptimistic: function(e) {
        return X = "useOptimistic", A(), ke(), eu(e);
      },
      useMemoCache: function(e) {
        return A(), Ht(e);
      },
      useHostTransitionStatus: Tn,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ke(), er();
      }
    }, ii = {
      readContext: function(e) {
        return P(), Xt(e);
      },
      use: function(e) {
        return A(), ll(e);
      },
      useCallback: function(e, t) {
        return X = "useCallback", A(), ne(), Ff(e, t);
      },
      useContext: function(e) {
        return X = "useContext", A(), ne(), Xt(e);
      },
      useEffect: function(e, t) {
        X = "useEffect", A(), ne(), bn(2048, Jl, e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", A(), ne(), To(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return X = "useInsertionEffect", A(), ne(), bn(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", A(), ne(), bn(4, sn, e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", A(), ne();
        var n = Y.H;
        Y.H = ii;
        try {
          return If(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", A(), ne();
        var i = Y.H;
        Y.H = ii;
        try {
          return cn(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function() {
        return X = "useRef", A(), ne(), _t().memoizedState;
      },
      useState: function() {
        X = "useState", A(), ne();
        var e = Y.H;
        Y.H = ii;
        try {
          return cn($e);
        } finally {
          Y.H = e;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", A(), ne();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", A(), ne(), Gs(e, t);
      },
      useTransition: function() {
        return X = "useTransition", A(), ne(), Xs();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", A(), ne(), Jf(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", A(), ne(), _t().memoizedState;
      },
      useFormState: function(e) {
        return X = "useFormState", A(), ne(), Ls(e);
      },
      useActionState: function(e) {
        return X = "useActionState", A(), ne(), Ls(e);
      },
      useOptimistic: function(e, t) {
        return X = "useOptimistic", A(), ne(), tu(e, t);
      },
      useMemoCache: function(e) {
        return A(), Ht(e);
      },
      useHostTransitionStatus: Tn,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ne(), _t().memoizedState;
      }
    }, Jv = {
      readContext: function(e) {
        return P(), Xt(e);
      },
      use: function(e) {
        return A(), ll(e);
      },
      useCallback: function(e, t) {
        return X = "useCallback", A(), ne(), Ff(e, t);
      },
      useContext: function(e) {
        return X = "useContext", A(), ne(), Xt(e);
      },
      useEffect: function(e, t) {
        X = "useEffect", A(), ne(), bn(2048, Jl, e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return X = "useImperativeHandle", A(), ne(), To(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return X = "useInsertionEffect", A(), ne(), bn(4, Fn, e, t);
      },
      useLayoutEffect: function(e, t) {
        return X = "useLayoutEffect", A(), ne(), bn(4, sn, e, t);
      },
      useMemo: function(e, t) {
        X = "useMemo", A(), ne();
        var n = Y.H;
        Y.H = ii;
        try {
          return If(e, t);
        } finally {
          Y.H = n;
        }
      },
      useReducer: function(e, t, n) {
        X = "useReducer", A(), ne();
        var i = Y.H;
        Y.H = ii;
        try {
          return za(e, t, n);
        } finally {
          Y.H = i;
        }
      },
      useRef: function() {
        return X = "useRef", A(), ne(), _t().memoizedState;
      },
      useState: function() {
        X = "useState", A(), ne();
        var e = Y.H;
        Y.H = ii;
        try {
          return za($e);
        } finally {
          Y.H = e;
        }
      },
      useDebugValue: function() {
        X = "useDebugValue", A(), ne();
      },
      useDeferredValue: function(e, t) {
        return X = "useDeferredValue", A(), ne(), oy(e, t);
      },
      useTransition: function() {
        return X = "useTransition", A(), ne(), Yu();
      },
      useSyncExternalStore: function(e, t, n) {
        return X = "useSyncExternalStore", A(), ne(), Jf(
          e,
          t,
          n
        );
      },
      useId: function() {
        return X = "useId", A(), ne(), _t().memoizedState;
      },
      useFormState: function(e) {
        return X = "useFormState", A(), ne(), Ri(e);
      },
      useActionState: function(e) {
        return X = "useActionState", A(), ne(), Ri(e);
      },
      useOptimistic: function(e, t) {
        return X = "useOptimistic", A(), ne(), js(e, t);
      },
      useMemoCache: function(e) {
        return A(), Ht(e);
      },
      useHostTransitionStatus: Tn,
      useCacheRefresh: function() {
        return X = "useCacheRefresh", ne(), _t().memoizedState;
      }
    };
    var XS = {
      "react-stack-bottom-frame": function(e, t, n) {
        var i = ru;
        ru = !0;
        try {
          return e(t, n);
        } finally {
          ru = i;
        }
      }
    }, r0 = XS["react-stack-bottom-frame"].bind(XS), QS = {
      "react-stack-bottom-frame": function(e) {
        var t = ru;
        ru = !0;
        try {
          return e.render();
        } finally {
          ru = t;
        }
      }
    }, ZS = QS["react-stack-bottom-frame"].bind(QS), KS = {
      "react-stack-bottom-frame": function(e, t) {
        try {
          t.componentDidMount();
        } catch (n) {
          xt(e, e.return, n);
        }
      }
    }, s0 = KS["react-stack-bottom-frame"].bind(KS), JS = {
      "react-stack-bottom-frame": function(e, t, n, i, o) {
        try {
          t.componentDidUpdate(n, i, o);
        } catch (f) {
          xt(e, e.return, f);
        }
      }
    }, kS = JS["react-stack-bottom-frame"].bind(JS), $S = {
      "react-stack-bottom-frame": function(e, t) {
        var n = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: n !== null ? n : ""
        });
      }
    }, DT = $S["react-stack-bottom-frame"].bind($S), WS = {
      "react-stack-bottom-frame": function(e, t, n) {
        try {
          n.componentWillUnmount();
        } catch (i) {
          xt(e, t, i);
        }
      }
    }, FS = WS["react-stack-bottom-frame"].bind(WS), IS = {
      "react-stack-bottom-frame": function(e) {
        e.resourceKind != null && console.error(
          "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
          e.resourceKind
        );
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, MT = IS["react-stack-bottom-frame"].bind(IS), PS = {
      "react-stack-bottom-frame": function(e, t, n) {
        try {
          n();
        } catch (i) {
          xt(e, t, i);
        }
      }
    }, zT = PS["react-stack-bottom-frame"].bind(PS), eb = {
      "react-stack-bottom-frame": function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, rf = eb["react-stack-bottom-frame"].bind(eb), rh = null, Pm = 0, Pe = null, d0, tb = d0 = !1, lb = {}, nb = {}, ab = {};
    te = function(e, t, n) {
      if (n !== null && typeof n == "object" && n._store && (!n._store.validated && n.key == null || n._store.validated === 2)) {
        if (typeof n._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        n._store.validated = 1;
        var i = pe(e), o = i || "null";
        if (!lb[o]) {
          lb[o] = !0, n = n._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = pe(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          n != null && e !== n && (i = null, typeof n.tag == "number" ? i = pe(n) : typeof n.name == "string" && (i = n.name), i && (d = " It was passed a child from " + i + ".")), Ae(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var sh = bc(!0), ub = bc(!1), Eu = ft(null), $i = null, dh = 1, ep = 2, kl = ft(0), ib = {}, cb = /* @__PURE__ */ new Set(), ob = /* @__PURE__ */ new Set(), fb = /* @__PURE__ */ new Set(), rb = /* @__PURE__ */ new Set(), sb = /* @__PURE__ */ new Set(), db = /* @__PURE__ */ new Set(), hb = /* @__PURE__ */ new Set(), yb = /* @__PURE__ */ new Set(), mb = /* @__PURE__ */ new Set(), pb = /* @__PURE__ */ new Set();
    Object.freeze(ib);
    var h0 = {
      enqueueSetState: function(e, t, n) {
        e = e._reactInternals;
        var i = Xn(e), o = Ra(i);
        o.payload = t, n != null && (el(n), o.callback = n), t = Aa(e, o, i), t !== null && (nt(t, e, i), yc(t, e, i)), mt(e, i);
      },
      enqueueReplaceState: function(e, t, n) {
        e = e._reactInternals;
        var i = Xn(e), o = Ra(i);
        o.tag = wS, o.payload = t, n != null && (el(n), o.callback = n), t = Aa(e, o, i), t !== null && (nt(t, e, i), yc(t, e, i)), mt(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var n = Xn(e), i = Ra(n);
        i.tag = qS, t != null && (el(t), i.callback = t), t = Aa(e, i, n), t !== null && (nt(t, e, n), yc(t, e, n)), me !== null && typeof me.markForceUpdateScheduled == "function" && me.markForceUpdateScheduled(e, n);
      }
    }, y0 = typeof reportError == "function" ? reportError : function(e) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
          error: e
        });
        if (!window.dispatchEvent(t)) return;
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", e);
        return;
      }
      console.error(e);
    }, hh = null, m0 = null, vb = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), ln = !1, gb = {}, Sb = {}, bb = {}, Tb = {}, yh = !1, Eb = {}, p0 = {}, v0 = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, Rb = !1, Ab = null;
    Ab = /* @__PURE__ */ new Set();
    var Vc = !1, Ol = !1, g0 = !1, Ob = typeof WeakSet == "function" ? WeakSet : Set, nn = null, mh = null, ph = null, ql = null, ma = !1, ci = null, tp = 8192, _T = {
      getCacheForType: function(e) {
        var t = Xt(Kl), n = t.data.get(e);
        return n === void 0 && (n = e(), t.data.set(e, n)), n;
      },
      getOwner: function() {
        return Zl;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var lp = Symbol.for;
      lp("selector.component"), lp("selector.has_pseudo_class"), lp("selector.role"), lp("selector.test_id"), lp("selector.text");
    }
    var CT = [], UT = typeof WeakMap == "function" ? WeakMap : Map, Qa = 0, In = 2, oi = 4, Xc = 0, np = 1, vh = 2, S0 = 3, Ir = 4, kv = 6, Db = 5, Ut = Qa, Jt = null, ct = null, rt = 0, pa = 0, ap = 1, Pr = 2, up = 3, Mb = 4, b0 = 5, gh = 6, ip = 7, T0 = 8, es = 9, Bt = pa, Za = null, sf = !1, Sh = !1, E0 = !1, Wi = 0, Sl = Xc, df = 0, hf = 0, R0 = 0, Ka = 0, ts = 0, cp = null, Pn = null, $v = !1, A0 = 0, zb = 300, Wv = 1 / 0, _b = 500, op = null, yf = null, HT = 0, xT = 1, NT = 2, ls = 0, Cb = 1, Ub = 2, Hb = 3, wT = 4, O0 = 5, dn = 0, mf = null, bh = null, pf = 0, D0 = 0, M0 = null, xb = null, qT = 50, fp = 0, z0 = null, _0 = !1, Fv = !1, BT = 50, ns = 0, rp = null, Th = !1, Iv = null, Nb = !1, wb = /* @__PURE__ */ new Set(), YT = {}, Pv = null, Eh = null, C0 = !1, U0 = !1, eg = !1, H0 = !1, as = 0, x0 = {};
    (function() {
      for (var e = 0; e < $g.length; e++) {
        var t = $g[e], n = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), ba(n, "on" + t);
      }
      ba(SS, "onAnimationEnd"), ba(bS, "onAnimationIteration"), ba(TS, "onAnimationStart"), ba("dblclick", "onDoubleClick"), ba("focusin", "onFocus"), ba("focusout", "onBlur"), ba(mT, "onTransitionRun"), ba(pT, "onTransitionStart"), ba(vT, "onTransitionCancel"), ba(ES, "onTransitionEnd");
    })(), se("onMouseEnter", ["mouseout", "mouseover"]), se("onMouseLeave", ["mouseout", "mouseover"]), se("onPointerEnter", ["pointerout", "pointerover"]), se("onPointerLeave", ["pointerout", "pointerover"]), oe(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), oe(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), oe("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), oe(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), oe(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), oe(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var sp = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), N0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(sp)
    ), tg = "_reactListening" + Math.random().toString(36).slice(2), qb = !1, Bb = !1, lg = !1, Yb = !1, ng = !1, ag = !1, jb = !1, ug = {}, jT = /\r\n?/g, LT = /\u0000|\uFFFD/g, us = "http://www.w3.org/1999/xlink", w0 = "http://www.w3.org/XML/1998/namespace", GT = "javascript:throw new Error('React form unexpectedly submitted.')", VT = "suppressHydrationWarning", ig = "$", cg = "/$", Qc = "$?", dp = "$!", XT = 1, QT = 2, ZT = 4, q0 = "F!", Lb = "F", Gb = "complete", KT = "style", Zc = 0, Rh = 1, og = 2, B0 = null, Y0 = null, Vb = { dialog: !0, webview: !0 }, j0 = null, Xb = typeof setTimeout == "function" ? setTimeout : void 0, JT = typeof clearTimeout == "function" ? clearTimeout : void 0, is = -1, Qb = typeof Promise == "function" ? Promise : void 0, kT = typeof queueMicrotask == "function" ? queueMicrotask : typeof Qb < "u" ? function(e) {
      return Qb.resolve(null).then(e).catch(ku);
    } : Xb, L0 = null, cs = 0, hp = 1, Zb = 2, Kb = 3, Ru = 4, Au = /* @__PURE__ */ new Map(), Jb = /* @__PURE__ */ new Set(), Kc = Dt.d;
    Dt.d = {
      f: function() {
        var e = Kc.f(), t = Dc();
        return e || t;
      },
      r: function(e) {
        var t = yn(e);
        t !== null && t.tag === 5 && t.type === "form" ? Bu(t) : Kc.r(e);
      },
      D: function(e) {
        Kc.D(e), $u("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Kc.C(e, t), $u("preconnect", e, t);
      },
      L: function(e, t, n) {
        Kc.L(e, t, n);
        var i = Ah;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + zl(t) + '"]';
          t === "image" && n && n.imageSrcSet ? (o += '[imagesrcset="' + zl(
            n.imageSrcSet
          ) + '"]', typeof n.imageSizes == "string" && (o += '[imagesizes="' + zl(
            n.imageSizes
          ) + '"]')) : o += '[href="' + zl(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = ja(e);
              break;
            case "script":
              f = Yi(e);
          }
          Au.has(f) || (e = je(
            {
              rel: "preload",
              href: t === "image" && n && n.imageSrcSet ? void 0 : e,
              as: t
            },
            n
          ), Au.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            ko(f)
          ) || t === "script" && i.querySelector(Uc(f)) || (t = i.createElement("link"), Ul(t, "link", e), C(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Kc.m(e, t);
        var n = Ah;
        if (n && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + zl(i) + '"][href="' + zl(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = Yi(e);
          }
          if (!Au.has(f) && (e = je({ rel: "modulepreload", href: e }, t), Au.set(f, e), n.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (n.querySelector(Uc(f)))
                  return;
            }
            i = n.createElement("link"), Ul(i, "link", e), C(i), n.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Kc.X(e, t);
        var n = Ah;
        if (n && e) {
          var i = p(n).hoistableScripts, o = Yi(e), f = i.get(o);
          f || (f = n.querySelector(
            Uc(o)
          ), f || (e = je({ src: e, async: !0 }, t), (t = Au.get(o)) && Rd(e, t), f = n.createElement("script"), C(f), Ul(f, "link", e), n.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, n) {
        Kc.S(e, t, n);
        var i = Ah;
        if (i && e) {
          var o = p(i).hoistableStyles, f = ja(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: cs, preload: null };
            if (d = i.querySelector(
              ko(f)
            ))
              h.loading = hp | Ru;
            else {
              e = je(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                n
              ), (n = Au.get(f)) && rm(e, n);
              var v = d = i.createElement("link");
              C(v), Ul(v, "link", e), v._p = new Promise(function(g, L) {
                v.onload = g, v.onerror = L;
              }), v.addEventListener("load", function() {
                h.loading |= hp;
              }), v.addEventListener("error", function() {
                h.loading |= Zb;
              }), h.loading |= Ru, Ed(d, t, i);
            }
            d = {
              type: "stylesheet",
              instance: d,
              count: 1,
              state: h
            }, o.set(f, d);
          }
        }
      },
      M: function(e, t) {
        Kc.M(e, t);
        var n = Ah;
        if (n && e) {
          var i = p(n).hoistableScripts, o = Yi(e), f = i.get(o);
          f || (f = n.querySelector(
            Uc(o)
          ), f || (e = je({ src: e, async: !0, type: "module" }, t), (t = Au.get(o)) && Rd(e, t), f = n.createElement("script"), C(f), Ul(f, "link", e), n.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var Ah = typeof document > "u" ? null : document, fg = null, yp = null, G0 = null, rg = null, os = vm, mp = {
      $$typeof: Hn,
      Provider: null,
      Consumer: null,
      _currentValue: os,
      _currentValue2: os,
      _threadCount: 0
    }, kb = "%c%s%c ", $b = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", Wb = "", sg = " ", $T = Function.prototype.bind, Fb = !1, Ib = null, Pb = null, e1 = null, t1 = null, l1 = null, n1 = null, a1 = null, u1 = null, i1 = null;
    Ib = function(e, t, n, i) {
      t = H(e, t), t !== null && (n = W(t.memoizedState, n, 0, i), t.memoizedState = n, t.baseState = n, e.memoizedProps = je({}, e.memoizedProps), n = pn(e, 2), n !== null && nt(n, e, 2));
    }, Pb = function(e, t, n) {
      t = H(e, t), t !== null && (n = ce(t.memoizedState, n, 0), t.memoizedState = n, t.baseState = n, e.memoizedProps = je({}, e.memoizedProps), n = pn(e, 2), n !== null && nt(n, e, 2));
    }, e1 = function(e, t, n, i) {
      t = H(e, t), t !== null && (n = D(t.memoizedState, n, i), t.memoizedState = n, t.baseState = n, e.memoizedProps = je({}, e.memoizedProps), n = pn(e, 2), n !== null && nt(n, e, 2));
    }, t1 = function(e, t, n) {
      e.pendingProps = W(e.memoizedProps, t, 0, n), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = pn(e, 2), t !== null && nt(t, e, 2);
    }, l1 = function(e, t) {
      e.pendingProps = ce(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = pn(e, 2), t !== null && nt(t, e, 2);
    }, n1 = function(e, t, n) {
      e.pendingProps = D(
        e.memoizedProps,
        t,
        n
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = pn(e, 2), t !== null && nt(t, e, 2);
    }, a1 = function(e) {
      var t = pn(e, 2);
      t !== null && nt(t, e, 2);
    }, u1 = function(e) {
      ve = e;
    }, i1 = function(e) {
      ae = e;
    };
    var dg = !0, hg = null, V0 = !1, vf = null, gf = null, Sf = null, pp = /* @__PURE__ */ new Map(), vp = /* @__PURE__ */ new Map(), bf = [], WT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), yg = null;
    if (Hd.prototype.render = Ud.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var n = arguments;
      typeof n[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : ye(n[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof n[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), n = e;
      var i = t.current, o = Xn(i);
      Or(i, o, n, t, null, null);
    }, Hd.prototype.unmount = Ud.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (Ut & (In | oi)) !== Qa && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), Or(e.current, 2, null, e, null, null), Dc(), t[Qi] = null;
      }
    }, Hd.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = Of();
        e = { blockedOn: null, target: e, priority: t };
        for (var n = 0; n < bf.length && t !== 0 && t < bf[n].priority; n++) ;
        bf.splice(n, 0, e), n === 0 && ym(e);
      }
    }, function() {
      var e = pm.version;
      if (e !== "19.1.0")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.1.0
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    }(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), Dt.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = Me(t), e = e !== null ? yt(e) : null, e = e === null ? null : e.stateNode, e;
    }, !function() {
      var e = {
        bundleType: 1,
        version: "19.1.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: Y,
        reconcilerVersion: "19.1.0"
      };
      return e.overrideHookState = Ib, e.overrideHookStateDeletePath = Pb, e.overrideHookStateRenamePath = e1, e.overrideProps = t1, e.overridePropsDeletePath = l1, e.overridePropsRenamePath = n1, e.scheduleUpdate = a1, e.setErrorHandler = u1, e.setSuspenseHandler = i1, e.scheduleRefresh = fe, e.scheduleRoot = ee, e.setRefreshHandler = Be, e.getCurrentFiber = wg, e.getLaneLabelMap = qg, e.injectProfilingHooks = vt, be(e);
    }() && x && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var c1 = window.location.protocol;
      /^(https?|file):$/.test(c1) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (c1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    Tp.createRoot = function(e, t) {
      if (!ye(e))
        throw Error("Target container is not a DOM element.");
      xd(e);
      var n = !1, i = "", o = Xp, f = Js, d = ks, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === Fu && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = hm(
        e,
        1,
        !1,
        null,
        null,
        n,
        i,
        o,
        f,
        d,
        h,
        null
      ), e[Qi] = t.current, br(e), new Ud(t);
    }, Tp.hydrateRoot = function(e, t, n) {
      if (!ye(e))
        throw Error("Target container is not a DOM element.");
      xd(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = Xp, d = Js, h = ks, v = null, g = null;
      return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onUncaughtError !== void 0 && (f = n.onUncaughtError), n.onCaughtError !== void 0 && (d = n.onCaughtError), n.onRecoverableError !== void 0 && (h = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (v = n.unstable_transitionCallbacks), n.formState !== void 0 && (g = n.formState)), t = hm(
        e,
        1,
        !0,
        t,
        n ?? null,
        i,
        o,
        f,
        d,
        h,
        v,
        g
      ), t.context = wt(null), n = t.current, i = Xn(n), i = hn(i), o = Ra(i), o.callback = null, Aa(n, o, i), n = i, t.current.lanes = n, va(t, n), ra(t), e[Qi] = t.current, br(e), new Hd(t);
    }, Tp.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), Tp;
}
var E1;
function fE() {
  if (E1) return vg.exports;
  E1 = 1;
  var S = {};
  function H() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (S.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(H);
      } catch (W) {
        console.error(W);
      }
    }
  }
  return S.NODE_ENV === "production" ? (H(), vg.exports = cE()) : vg.exports = oE(), vg.exports;
}
var q1 = fE();
const rE = /* @__PURE__ */ x1(q1);
var bg = { exports: {} }, Z0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var R1;
function sE() {
  if (R1) return Z0;
  R1 = 1;
  var S = Rf();
  function H(ue, q) {
    return ue === q && (ue !== 0 || 1 / ue === 1 / q) || ue !== ue && q !== q;
  }
  var W = typeof Object.is == "function" ? Object.is : H, D = S.useState, ie = S.useEffect, ce = S.useLayoutEffect, ae = S.useDebugValue;
  function ve(ue, q) {
    var _ = q(), ee = D({ inst: { value: _, getSnapshot: q } }), fe = ee[0].inst, Be = ee[1];
    return ce(
      function() {
        fe.value = _, fe.getSnapshot = q, te(fe) && Be({ inst: fe });
      },
      [ue, _, q]
    ), ie(
      function() {
        return te(fe) && Be({ inst: fe }), ue(function() {
          te(fe) && Be({ inst: fe });
        });
      },
      [ue]
    ), ae(_), _;
  }
  function te(ue) {
    var q = ue.getSnapshot;
    ue = ue.value;
    try {
      var _ = q();
      return !W(ue, _);
    } catch {
      return !0;
    }
  }
  function A(ue, q) {
    return q();
  }
  var P = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? A : ve;
  return Z0.useSyncExternalStore = S.useSyncExternalStore !== void 0 ? S.useSyncExternalStore : P, Z0;
}
var K0 = {}, A1;
function dE() {
  if (A1) return K0;
  A1 = 1;
  var S = {};
  /**
   * @license React
   * use-sync-external-store-shim.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return S.NODE_ENV !== "production" && function() {
    function H(ee, fe) {
      return ee === fe && (ee !== 0 || 1 / ee === 1 / fe) || ee !== ee && fe !== fe;
    }
    function W(ee, fe) {
      ue || ce.startTransition === void 0 || (ue = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var Be = fe();
      if (!q) {
        var ye = fe();
        ae(Be, ye) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), q = !0);
      }
      ye = ve({
        inst: { value: Be, getSnapshot: fe }
      });
      var He = ye[0].inst, st = ye[1];
      return A(
        function() {
          He.value = Be, He.getSnapshot = fe, D(He) && st({ inst: He });
        },
        [ee, Be, fe]
      ), te(
        function() {
          return D(He) && st({ inst: He }), ee(function() {
            D(He) && st({ inst: He });
          });
        },
        [ee]
      ), P(Be), Be;
    }
    function D(ee) {
      var fe = ee.getSnapshot;
      ee = ee.value;
      try {
        var Be = fe();
        return !ae(ee, Be);
      } catch {
        return !0;
      }
    }
    function ie(ee, fe) {
      return fe();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var ce = Rf(), ae = typeof Object.is == "function" ? Object.is : H, ve = ce.useState, te = ce.useEffect, A = ce.useLayoutEffect, P = ce.useDebugValue, ue = !1, q = !1, _ = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? ie : W;
    K0.useSyncExternalStore = ce.useSyncExternalStore !== void 0 ? ce.useSyncExternalStore : _, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), K0;
}
var O1;
function hE() {
  if (O1) return bg.exports;
  O1 = 1;
  var S = {};
  return S.NODE_ENV === "production" ? bg.exports = sE() : bg.exports = dE(), bg.exports;
}
var yE = hE();
const B1 = 0, Y1 = 1, j1 = 2, D1 = 3;
var M1 = Object.prototype.hasOwnProperty;
function eS(S, H) {
  var W, D;
  if (S === H) return !0;
  if (S && H && (W = S.constructor) === H.constructor) {
    if (W === Date) return S.getTime() === H.getTime();
    if (W === RegExp) return S.toString() === H.toString();
    if (W === Array) {
      if ((D = S.length) === H.length)
        for (; D-- && eS(S[D], H[D]); ) ;
      return D === -1;
    }
    if (!W || typeof S == "object") {
      D = 0;
      for (W in S)
        if (M1.call(S, W) && ++D && !M1.call(H, W) || !(W in H) || !eS(S[W], H[W])) return !1;
      return Object.keys(H).length === D;
    }
  }
  return S !== S && H !== H;
}
const kc = /* @__PURE__ */ new WeakMap(), Tf = () => {
}, Bn = (
  /*#__NOINLINE__*/
  Tf()
), tS = Object, zt = (S) => S === Bn, Fi = (S) => typeof S == "function", Ef = (S, H) => ({
  ...S,
  ...H
}), L1 = (S) => Fi(S.then), J0 = {}, Tg = {}, oS = "undefined", Op = typeof window != oS, lS = typeof document != oS, mE = Op && "Deno" in window, pE = () => Op && typeof window.requestAnimationFrame != oS, G1 = (S, H) => {
  const W = kc.get(S);
  return [
    // Getter
    () => !zt(H) && S.get(H) || J0,
    // Setter
    (D) => {
      if (!zt(H)) {
        const ie = S.get(H);
        H in Tg || (Tg[H] = ie), W[5](H, Ef(ie, D), ie || J0);
      }
    },
    // Subscriber
    W[6],
    // Get server cache snapshot
    () => !zt(H) && H in Tg ? Tg[H] : !zt(H) && S.get(H) || J0
  ];
};
let nS = !0;
const vE = () => nS, [aS, uS] = Op && window.addEventListener ? [
  window.addEventListener.bind(window),
  window.removeEventListener.bind(window)
] : [
  Tf,
  Tf
], gE = () => {
  const S = lS && document.visibilityState;
  return zt(S) || S !== "hidden";
}, SE = (S) => (lS && document.addEventListener("visibilitychange", S), aS("focus", S), () => {
  lS && document.removeEventListener("visibilitychange", S), uS("focus", S);
}), bE = (S) => {
  const H = () => {
    nS = !0, S();
  }, W = () => {
    nS = !1;
  };
  return aS("online", H), aS("offline", W), () => {
    uS("online", H), uS("offline", W);
  };
}, TE = {
  isOnline: vE,
  isVisible: gE
}, EE = {
  initFocus: SE,
  initReconnect: bE
}, z1 = !Ap.useId, Rp = !Op || mE, RE = (S) => pE() ? window.requestAnimationFrame(S) : setTimeout(S, 1), k0 = Rp ? tl.useEffect : tl.useLayoutEffect, $0 = typeof navigator < "u" && navigator.connection, _1 = !Rp && $0 && ([
  "slow-2g",
  "2g"
].includes($0.effectiveType) || $0.saveData), Eg = /* @__PURE__ */ new WeakMap(), AE = (S) => tS.prototype.toString.call(S), W0 = (S, H) => S === `[object ${H}]`;
let OE = 0;
const iS = (S) => {
  const H = typeof S, W = AE(S), D = W0(W, "Date"), ie = W0(W, "RegExp"), ce = W0(W, "Object");
  let ae, ve;
  if (tS(S) === S && !D && !ie) {
    if (ae = Eg.get(S), ae) return ae;
    if (ae = ++OE + "~", Eg.set(S, ae), Array.isArray(S)) {
      for (ae = "@", ve = 0; ve < S.length; ve++)
        ae += iS(S[ve]) + ",";
      Eg.set(S, ae);
    }
    if (ce) {
      ae = "#";
      const te = tS.keys(S).sort();
      for (; !zt(ve = te.pop()); )
        zt(S[ve]) || (ae += ve + ":" + iS(S[ve]) + ",");
      Eg.set(S, ae);
    }
  } else
    ae = D ? S.toJSON() : H == "symbol" ? S.toString() : H == "string" ? JSON.stringify(S) : "" + S;
  return ae;
}, fS = (S) => {
  if (Fi(S))
    try {
      S = S();
    } catch {
      S = "";
    }
  const H = S;
  return S = typeof S == "string" ? S : (Array.isArray(S) ? S.length : S) ? iS(S) : "", [
    S,
    H
  ];
};
let DE = 0;
const cS = () => ++DE;
async function V1(...S) {
  const [H, W, D, ie] = S, ce = Ef({
    populateCache: !0,
    throwOnError: !0
  }, typeof ie == "boolean" ? {
    revalidate: ie
  } : ie || {});
  let ae = ce.populateCache;
  const ve = ce.rollbackOnError;
  let te = ce.optimisticData;
  const A = (q) => typeof ve == "function" ? ve(q) : ve !== !1, P = ce.throwOnError;
  if (Fi(W)) {
    const q = W, _ = [], ee = H.keys();
    for (const fe of ee)
      // Skip the special useSWRInfinite and useSWRSubscription keys.
      !/^\$(inf|sub)\$/.test(fe) && q(H.get(fe)._k) && _.push(fe);
    return Promise.all(_.map(ue));
  }
  return ue(W);
  async function ue(q) {
    const [_] = fS(q);
    if (!_) return;
    const [ee, fe] = G1(H, _), [Be, ye, He, st] = kc.get(H), ot = () => {
      const Xe = Be[_];
      return (Fi(ce.revalidate) ? ce.revalidate(ee().data, q) : ce.revalidate !== !1) && (delete He[_], delete st[_], Xe && Xe[0]) ? Xe[0](j1).then(() => ee().data) : ee().data;
    };
    if (S.length < 3)
      return ot();
    let Me = D, yt, tt = !1;
    const Oe = cS();
    ye[_] = [
      Oe,
      0
    ];
    const Rt = !zt(te), pe = ee(), ft = pe.data, Se = pe._c, Ne = zt(Se) ? ft : Se;
    if (Rt && (te = Fi(te) ? te(Ne, ft) : te, fe({
      data: te,
      _c: Ne
    })), Fi(Me))
      try {
        Me = Me(Ne);
      } catch (Xe) {
        yt = Xe, tt = !0;
      }
    if (Me && L1(Me))
      if (Me = await Me.catch((Xe) => {
        yt = Xe, tt = !0;
      }), Oe !== ye[_][0]) {
        if (tt) throw yt;
        return Me;
      } else tt && Rt && A(yt) && (ae = !0, fe({
        data: Ne,
        _c: Bn
      }));
    if (ae && !tt)
      if (Fi(ae)) {
        const Xe = ae(Me, Ne);
        fe({
          data: Xe,
          error: Bn,
          _c: Bn
        });
      } else
        fe({
          data: Me,
          error: Bn,
          _c: Bn
        });
    if (ye[_][1] = cS(), Promise.resolve(ot()).then(() => {
      fe({
        _c: Bn
      });
    }), tt) {
      if (P) throw yt;
      return;
    }
    return Me;
  }
}
const C1 = (S, H) => {
  for (const W in S)
    S[W][0] && S[W][0](H);
}, ME = (S, H) => {
  if (!kc.has(S)) {
    const W = Ef(EE, H), D = /* @__PURE__ */ Object.create(null), ie = V1.bind(Bn, S);
    let ce = Tf;
    const ae = /* @__PURE__ */ Object.create(null), ve = (P, ue) => {
      const q = ae[P] || [];
      return ae[P] = q, q.push(ue), () => q.splice(q.indexOf(ue), 1);
    }, te = (P, ue, q) => {
      S.set(P, ue);
      const _ = ae[P];
      if (_)
        for (const ee of _)
          ee(ue, q);
    }, A = () => {
      if (!kc.has(S) && (kc.set(S, [
        D,
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        /* @__PURE__ */ Object.create(null),
        ie,
        te,
        ve
      ]), !Rp)) {
        const P = W.initFocus(setTimeout.bind(Bn, C1.bind(Bn, D, B1))), ue = W.initReconnect(setTimeout.bind(Bn, C1.bind(Bn, D, Y1)));
        ce = () => {
          P && P(), ue && ue(), kc.delete(S);
        };
      }
    };
    return A(), [
      S,
      ie,
      A,
      ce
    ];
  }
  return [
    S,
    kc.get(S)[4]
  ];
}, zE = (S, H, W, D, ie) => {
  const ce = W.errorRetryCount, ae = ie.retryCount, ve = ~~((Math.random() + 0.5) * (1 << (ae < 8 ? ae : 8))) * W.errorRetryInterval;
  !zt(ce) && ae > ce || setTimeout(D, ve, ie);
}, _E = eS, [X1, CE] = ME(/* @__PURE__ */ new Map()), UE = Ef(
  {
    // events
    onLoadingSlow: Tf,
    onSuccess: Tf,
    onError: Tf,
    onErrorRetry: zE,
    onDiscarded: Tf,
    // switches
    revalidateOnFocus: !0,
    revalidateOnReconnect: !0,
    revalidateIfStale: !0,
    shouldRetryOnError: !0,
    // timeouts
    errorRetryInterval: _1 ? 1e4 : 5e3,
    focusThrottleInterval: 5 * 1e3,
    dedupingInterval: 2 * 1e3,
    loadingTimeout: _1 ? 5e3 : 3e3,
    // providers
    compare: _E,
    isPaused: () => !1,
    cache: X1,
    mutate: CE,
    fallback: {}
  },
  // use web preset by default
  TE
), HE = (S, H) => {
  const W = Ef(S, H);
  if (H) {
    const { use: D, fallback: ie } = S, { use: ce, fallback: ae } = H;
    D && ce && (W.use = D.concat(ce)), ie && ae && (W.fallback = Ef(ie, ae));
  }
  return W;
}, xE = tl.createContext({}), NE = "$inf$", Q1 = Op && window.__SWR_DEVTOOLS_USE__, wE = Q1 ? window.__SWR_DEVTOOLS_USE__ : [], qE = () => {
  Q1 && (window.__SWR_DEVTOOLS_REACT__ = Ap);
}, BE = (S) => Fi(S[1]) ? [
  S[0],
  S[1],
  S[2] || {}
] : [
  S[0],
  null,
  (S[1] === null ? S[2] : S[1]) || {}
], YE = () => {
  const S = tl.useContext(xE);
  return tl.useMemo(() => Ef(UE, S), [
    S
  ]);
}, jE = (S) => (H, W, D) => S(H, W && ((...ce) => {
  const [ae] = fS(H), [, , , ve] = kc.get(X1);
  if (ae.startsWith(NE))
    return W(...ce);
  const te = ve[ae];
  return zt(te) ? W(...ce) : (delete ve[ae], te);
}), D), LE = wE.concat(jE), GE = (S) => function(...W) {
  const D = YE(), [ie, ce, ae] = BE(W), ve = HE(D, ae);
  let te = S;
  const { use: A } = ve, P = (A || []).concat(LE);
  for (let ue = P.length; ue--; )
    te = P[ue](te);
  return te(ie, ce || ve.fetcher || null, ve);
}, VE = (S, H, W) => {
  const D = H[S] || (H[S] = []);
  return D.push(W), () => {
    const ie = D.indexOf(W);
    ie >= 0 && (D[ie] = D[D.length - 1], D.pop());
  };
};
qE();
const F0 = Ap.use || // This extra generic is to avoid TypeScript mixing up the generic and JSX sytax
// and emitting an error.
// We assume that this is only for the `use(thenable)` case, not `use(context)`.
// https://github.com/facebook/react/blob/aed00dacfb79d17c53218404c52b1c7aa59c4a89/packages/react-server/src/ReactFizzThenable.js#L45
((S) => {
  switch (S.status) {
    case "pending":
      throw S;
    case "fulfilled":
      return S.value;
    case "rejected":
      throw S.reason;
    default:
      throw S.status = "pending", S.then((H) => {
        S.status = "fulfilled", S.value = H;
      }, (H) => {
        S.status = "rejected", S.reason = H;
      }), S;
  }
}), I0 = {
  dedupe: !0
}, U1 = Promise.resolve(Bn), XE = (S, H, W) => {
  const { cache: D, compare: ie, suspense: ce, fallbackData: ae, revalidateOnMount: ve, revalidateIfStale: te, refreshInterval: A, refreshWhenHidden: P, refreshWhenOffline: ue, keepPreviousData: q } = W, [_, ee, fe, Be] = kc.get(D), [ye, He] = fS(S), st = tl.useRef(!1), ot = tl.useRef(!1), Me = tl.useRef(ye), yt = tl.useRef(H), tt = tl.useRef(W), Oe = () => tt.current, Rt = () => Oe().isVisible() && Oe().isOnline(), [pe, ft, Se, Ne] = G1(D, ye), Xe = tl.useRef({}).current, lt = zt(ae) ? zt(W.fallback) ? Bn : W.fallback[ye] : ae, V = (it, mt) => {
    for (const It in Xe) {
      const At = It;
      if (At === "data") {
        if (!ie(it[At], mt[At]) && (!zt(it[At]) || !ie(De, mt[At])))
          return !1;
      } else if (mt[At] !== it[At])
        return !1;
    }
    return !0;
  }, j = tl.useMemo(() => {
    const it = !ye || !H ? !1 : zt(ve) ? Oe().isPaused() || ce ? !1 : te !== !1 : ve, mt = (sl) => {
      const Ce = Ef(sl);
      return delete Ce._k, it ? {
        isValidating: !0,
        isLoading: !0,
        ...Ce
      } : Ce;
    }, It = pe(), At = Ne(), Je = mt(It), $l = It === At ? Je : mt(At);
    let Yt = Je;
    return [
      () => {
        const sl = mt(pe());
        return V(sl, Yt) ? (Yt.data = sl.data, Yt.isLoading = sl.isLoading, Yt.isValidating = sl.isValidating, Yt.error = sl.error, Yt) : (Yt = sl, sl);
      },
      () => $l
    ];
  }, [
    D,
    ye
  ]), le = yE.useSyncExternalStore(tl.useCallback(
    (it) => Se(ye, (mt, It) => {
      V(It, mt) || it();
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      D,
      ye
    ]
  ), j[0], j[1]), he = !st.current, E = _[ye] && _[ye].length > 0, O = le.data, k = zt(O) ? lt && L1(lt) ? F0(lt) : lt : O, Z = le.error, re = tl.useRef(k), De = q ? zt(O) ? zt(re.current) ? k : re.current : O : k, be = E && !zt(Z) ? !1 : he && !zt(ve) ? ve : Oe().isPaused() ? !1 : ce ? zt(k) ? !1 : te : zt(k) || te, qe = !!(ye && H && he && be), vt = zt(le.isValidating) ? qe : le.isValidating, gt = zt(le.isLoading) ? qe : le.isLoading, Vt = tl.useCallback(
    async (it) => {
      const mt = yt.current;
      if (!ye || !mt || ot.current || Oe().isPaused())
        return !1;
      let It, At, Je = !0;
      const $l = it || {}, Yt = !fe[ye] || !$l.dedupe, sl = () => z1 ? !ot.current && ye === Me.current && st.current : ye === Me.current, Ce = {
        isValidating: !1,
        isLoading: !1
      }, ka = () => {
        ft(Ce);
      }, $a = () => {
        const Bl = fe[ye];
        Bl && Bl[1] === At && delete fe[ye];
      }, va = {
        isValidating: !0
      };
      zt(pe().data) && (va.isLoading = !0);
      try {
        if (Yt && (ft(va), W.loadingTimeout && zt(pe().data) && setTimeout(() => {
          Je && sl() && Oe().onLoadingSlow(ye, W);
        }, W.loadingTimeout), fe[ye] = [
          mt(He),
          cS()
        ]), [It, At] = fe[ye], It = await It, Yt && setTimeout($a, W.dedupingInterval), !fe[ye] || fe[ye][1] !== At)
          return Yt && sl() && Oe().onDiscarded(ye), !1;
        Ce.error = Bn;
        const Bl = ee[ye];
        if (!zt(Bl) && // case 1
        (At <= Bl[0] || // case 2
        At <= Bl[1] || // case 3
        Bl[1] === 0))
          return ka(), Yt && sl() && Oe().onDiscarded(ye), !1;
        const bl = pe().data;
        Ce.data = ie(bl, It) ? bl : It, Yt && sl() && Oe().onSuccess(It, ye, W);
      } catch (Bl) {
        $a();
        const bl = Oe(), { shouldRetryOnError: dl } = bl;
        bl.isPaused() || (Ce.error = Bl, Yt && sl() && (bl.onError(Bl, ye, bl), (dl === !0 || Fi(dl) && dl(Bl)) && (!Oe().revalidateOnFocus || !Oe().revalidateOnReconnect || Rt()) && bl.onErrorRetry(Bl, ye, bl, (hn) => {
          const cl = _[ye];
          cl && cl[0] && cl[0](D1, hn);
        }, {
          retryCount: ($l.retryCount || 0) + 1,
          dedupe: !0
        })));
      }
      return Je = !1, ka(), !0;
    },
    // `setState` is immutable, and `eventsCallback`, `fnArg`, and
    // `keyValidating` are depending on `key`, so we can exclude them from
    // the deps array.
    //
    // FIXME:
    // `fn` and `config` might be changed during the lifecycle,
    // but they might be changed every render like this.
    // `useSWR('key', () => fetch('/api/'), { suspense: true })`
    // So we omit the values from the deps array
    // even though it might cause unexpected behaviors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      ye,
      D
    ]
  ), Ml = tl.useCallback(
    // Use callback to make sure `keyRef.current` returns latest result every time
    (...it) => V1(D, Me.current, ...it),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  if (k0(() => {
    yt.current = H, tt.current = W, zt(O) || (re.current = O);
  }), k0(() => {
    if (!ye) return;
    const it = Vt.bind(Bn, I0);
    let mt = 0;
    Oe().revalidateOnFocus && (mt = Date.now() + Oe().focusThrottleInterval);
    const At = VE(ye, _, (Je, $l = {}) => {
      if (Je == B1) {
        const Yt = Date.now();
        Oe().revalidateOnFocus && Yt > mt && Rt() && (mt = Yt + Oe().focusThrottleInterval, it());
      } else if (Je == Y1)
        Oe().revalidateOnReconnect && Rt() && it();
      else {
        if (Je == j1)
          return Vt();
        if (Je == D1)
          return Vt($l);
      }
    });
    return ot.current = !1, Me.current = ye, st.current = !0, ft({
      _k: He
    }), be && (fe[ye] || (zt(k) || Rp ? it() : RE(it))), () => {
      ot.current = !0, At();
    };
  }, [
    ye
  ]), k0(() => {
    let it;
    function mt() {
      const At = Fi(A) ? A(pe().data) : A;
      At && it !== -1 && (it = setTimeout(It, At));
    }
    function It() {
      !pe().error && (P || Oe().isVisible()) && (ue || Oe().isOnline()) ? Vt(I0).then(mt) : mt();
    }
    return mt(), () => {
      it && (clearTimeout(it), it = -1);
    };
  }, [
    A,
    P,
    ue,
    ye
  ]), tl.useDebugValue(De), ce) {
    const it = ye && zt(k);
    if (!z1 && Rp && it)
      throw new Error("Fallback data is required when using Suspense in SSR.");
    it && (yt.current = H, tt.current = W, ot.current = !1);
    const mt = Be[ye], It = !zt(mt) && it ? Ml(mt) : U1;
    if (F0(It), !zt(Z) && it)
      throw Z;
    const At = it ? Vt(I0) : U1;
    !zt(De) && it && (At.status = "fulfilled", At.value = !0), F0(At);
  }
  return {
    mutate: Ml,
    get data() {
      return Xe.data = !0, De;
    },
    get error() {
      return Xe.error = !0, Z;
    },
    get isValidating() {
      return Xe.isValidating = !0, vt;
    },
    get isLoading() {
      return Xe.isLoading = !0, gt;
    }
  };
}, Z1 = GE(XE), QE = async (S) => {
  const H = new FormData();
  H.append("ACMS_POST_Zoho_Module", "exec"), H.append("formToken", window.csrfToken || "");
  const ie = await (await fetch(S, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: H
  })).json();
  return console.log("Fetched modules:", ie), ie;
}, ZE = () => {
  const { data: S, error: H, isLoading: W, mutate: D } = Z1(
    window.ACMS.Config.root,
    QE
    // {
    //   revalidateOnFocus: false,
    //   revalidateOnReconnect: false,
    //   shouldRetryOnError: false,
    // }
  );
  return {
    modules: S || [],
    isLoading: W,
    error: H,
    mutate: D
  };
}, KE = ({ name: S, value: H, relationItemId: W, onModuleChange: D }) => {
  const { modules: ie, isLoading: ce } = ZE(), [ae, ve] = tl.useState(H || "");
  tl.useEffect(() => {
    console.log(ie);
  }, [ie]), tl.useEffect(() => {
    ve(H || "");
  }, [H]);
  const te = (A) => {
    const P = A.target.value;
    ve(P), D && D(P);
  };
  return /* @__PURE__ */ fi.jsxs(
    "select",
    {
      name: S,
      className: "acms-admin-form-width-full",
      value: ae,
      onChange: te,
      disabled: ce,
      children: [
        /* @__PURE__ */ fi.jsx("option", { value: "", children: ce ? "モジュールを読み込み中..." : "モジュールを選択" }),
        ie.map((A) => /* @__PURE__ */ fi.jsx("option", { value: A.apiName, children: A.moduleName }, A.apiName))
      ]
    }
  );
}, JE = async (S) => (await new Promise((W) => setTimeout(W, 300)), {
  Leads: [
    { fieldName: "メール", apiName: "Email" },
    { fieldName: "名", apiName: "First_Name" },
    { fieldName: "姓", apiName: "Last_Name" },
    { fieldName: "電話番号", apiName: "Phone" },
    { fieldName: "会社", apiName: "Company" }
  ],
  Contacts: [
    { fieldName: "メール", apiName: "Email" },
    { fieldName: "名", apiName: "First_Name" },
    { fieldName: "姓", apiName: "Last_Name" },
    { fieldName: "モバイル", apiName: "Mobile" },
    { fieldName: "部門", apiName: "Department" }
  ],
  Accounts: [
    { fieldName: "取引先名", apiName: "Account_Name" },
    { fieldName: "電話番号", apiName: "Phone" },
    { fieldName: "ウェブサイト", apiName: "Website" },
    { fieldName: "業界", apiName: "Industry" }
  ],
  Deals: [
    { fieldName: "商談名", apiName: "Deal_Name" },
    { fieldName: "金額", apiName: "Amount" },
    { fieldName: "ステージ", apiName: "Stage" },
    { fieldName: "確度", apiName: "Probability" }
  ]
}[S] || []), kE = (S) => {
  const { data: H, error: W, isLoading: D, mutate: ie } = Z1(
    S ? `module-fields-${S}` : null,
    () => S ? JE(S) : Promise.resolve([]),
    {
      revalidateOnFocus: !1,
      revalidateOnReconnect: !1,
      shouldRetryOnError: !1
    }
  );
  return {
    fields: H || [],
    isLoading: D,
    error: W,
    mutate: ie
  };
}, $E = ({ name: S, value: H, moduleApiName: W }) => {
  const [D, ie] = tl.useState(H || ""), { fields: ce, isLoading: ae } = kE(W);
  tl.useEffect(() => {
    ie(H || "");
  }, [H]);
  const ve = (te) => {
    const A = te.target.value;
    ie(A);
  };
  return /* @__PURE__ */ fi.jsxs(
    "select",
    {
      name: S,
      className: "acms-admin-form-width-full",
      value: D,
      onChange: ve,
      children: [
        /* @__PURE__ */ fi.jsx("option", { value: "", children: ae ? "項目を読み込み中..." : "項目を選択" }),
        ce.map((te) => /* @__PURE__ */ fi.jsx("option", { value: te.apiName, children: te.fieldName }, te.apiName))
      ]
    }
  );
}, P0 = "#js-acms-zoho-link-field", WE = (S) => /* @__PURE__ */ fi.jsx(KE, { ...S }), FE = (S) => /* @__PURE__ */ fi.jsx($E, { ...S });
function IE() {
  const [S, H] = tl.useState(/* @__PURE__ */ new Map()), W = Ap.useRef(/* @__PURE__ */ new Map()), D = (A) => {
    let P = W.current.get(A);
    if (!P)
      try {
        P = q1.createRoot(A), W.current.set(A, P), H((ue) => new Map(ue.set(A, P)));
      } catch (ue) {
        return console.error("Error creating React root:", ue), null;
      }
    return P;
  };
  tl.useEffect(() => {
    if (!document.querySelector(P0))
      return;
    ie();
    const P = (ue) => {
      var _;
      const q = (_ = ue.detail) == null ? void 0 : _.item;
      q && q.closest(P0) && ce(q);
    };
    return window.ACMS && window.ACMS.addListener && window.ACMS.addListener("acmsAddCustomFieldGroup", P), document.addEventListener("acmsAddCustomFieldGroup", P), () => {
      W.current.forEach((ue) => ue.unmount()), window.ACMS && window.ACMS.removeListener && window.ACMS.removeListener("acmsAddCustomFieldGroup", P), document.removeEventListener("acmsAddCustomFieldGroup", P);
    };
  }, []);
  const ie = () => {
    const A = document.querySelector(P0);
    if (!A) return;
    A.querySelectorAll("tbody tr:not(.item-template)").forEach(ce);
  }, ce = (A) => {
    const P = A.querySelector("div[data-acms-zoho-link-field-module]"), ue = A.querySelector("div[data-acms-zoho-link-field-item]");
    P && ae(P), ue && ve(ue);
  }, ae = (A) => {
    const P = A.getAttribute("name") || "", ue = A.getAttribute("value") || "", q = A.closest("tr"), _ = q == null ? void 0 : q.querySelector("div[data-acms-zoho-link-field-item]"), ee = D(A);
    ee && ee.render(
      WE({
        name: P,
        value: ue,
        relationItemId: null,
        onModuleChange: (fe) => te(fe, _)
      })
    );
  }, ve = (A, P = null) => {
    const ue = A.getAttribute("name") || "", q = A.getAttribute("value") || "", _ = D(A);
    _ && _.render(
      FE({
        name: ue,
        value: q,
        moduleApiName: P
      })
    );
  }, te = (A, P) => {
    P && ve(P, A);
  };
  return null;
}
function PE() {
  return /* @__PURE__ */ fi.jsx(IE, {});
}
let fs = document.getElementById("js-acms-zoho");
var H1;
if (!fs) {
  const S = document.getElementById("js-acms-zoho-link-field");
  S && (fs = document.createElement("div"), fs.id = "js-acms-zoho-container", fs.style.display = "none", (H1 = S.parentNode) == null || H1.insertBefore(fs, S));
}
fs ? rE.createRoot(fs).render(/* @__PURE__ */ fi.jsx(Ap.StrictMode, { children: /* @__PURE__ */ fi.jsx(PE, {}) })) : console.error("No suitable DOM element found for React root");
