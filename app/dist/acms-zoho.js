function Z1(W) {
  return W && W.__esModule && Object.prototype.hasOwnProperty.call(W, "default") ? W.default : W;
}
var ug = { exports: {} }, sp = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _1;
function tT() {
  if (_1) return sp;
  _1 = 1;
  var W = Symbol.for("react.transitional.element"), ee = Symbol.for("react.fragment");
  function Oe(N, Te, ve) {
    var Ae = null;
    if (ve !== void 0 && (Ae = "" + ve), Te.key !== void 0 && (Ae = "" + Te.key), "key" in Te) {
      ve = {};
      for (var Je in Te)
        Je !== "key" && (ve[Je] = Te[Je]);
    } else ve = Te;
    return Te = ve.ref, {
      $$typeof: W,
      type: N,
      key: Ae,
      ref: Te !== void 0 ? Te : null,
      props: ve
    };
  }
  return sp.Fragment = ee, sp.jsx = Oe, sp.jsxs = Oe, sp;
}
var dp = {}, ig = { exports: {} }, Ke = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var C1;
function lT() {
  if (C1) return Ke;
  C1 = 1;
  var W = Symbol.for("react.transitional.element"), ee = Symbol.for("react.portal"), Oe = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), Te = Symbol.for("react.profiler"), ve = Symbol.for("react.consumer"), Ae = Symbol.for("react.context"), Je = Symbol.for("react.forward_ref"), oe = Symbol.for("react.suspense"), D = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), Ve = Symbol.iterator;
  function $(T) {
    return T === null || typeof T != "object" ? null : (T = Ve && T[Ve] || T["@@iterator"], typeof T == "function" ? T : null);
  }
  var C = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, ce = Object.assign, Ie = {};
  function Tt(T, A, J) {
    this.props = T, this.context = A, this.refs = Ie, this.updater = J || C;
  }
  Tt.prototype.isReactComponent = {}, Tt.prototype.setState = function(T, A) {
    if (typeof T != "object" && typeof T != "function" && T != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, T, A, "setState");
  }, Tt.prototype.forceUpdate = function(T) {
    this.updater.enqueueForceUpdate(this, T, "forceUpdate");
  };
  function ht() {
  }
  ht.prototype = Tt.prototype;
  function et(T, A, J) {
    this.props = T, this.context = A, this.refs = Ie, this.updater = J || C;
  }
  var Nt = et.prototype = new ht();
  Nt.constructor = et, ce(Nt, Tt.prototype), Nt.isPureReactComponent = !0;
  var Mt = Array.isArray, xe = { H: null, A: null, T: null, S: null, V: null }, Lt = Object.prototype.hasOwnProperty;
  function Ut(T, A, J, Q, ae, be) {
    return J = be.ref, {
      $$typeof: W,
      type: T,
      key: A,
      ref: J !== void 0 ? J : null,
      props: be
    };
  }
  function ke(T, A) {
    return Ut(
      T.type,
      A,
      void 0,
      void 0,
      void 0,
      T.props
    );
  }
  function Vt(T) {
    return typeof T == "object" && T !== null && T.$$typeof === W;
  }
  function pe(T) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + T.replace(/[=:]/g, function(J) {
      return A[J];
    });
  }
  var gt = /\/+/g;
  function ye(T, A) {
    return typeof T == "object" && T !== null && T.key != null ? pe("" + T.key) : A.toString(36);
  }
  function Qe() {
  }
  function Ct(T) {
    switch (T.status) {
      case "fulfilled":
        return T.value;
      case "rejected":
        throw T.reason;
      default:
        switch (typeof T.status == "string" ? T.then(Qe, Qe) : (T.status = "pending", T.then(
          function(A) {
            T.status === "pending" && (T.status = "fulfilled", T.value = A);
          },
          function(A) {
            T.status === "pending" && (T.status = "rejected", T.reason = A);
          }
        )), T.status) {
          case "fulfilled":
            return T.value;
          case "rejected":
            throw T.reason;
        }
    }
    throw T;
  }
  function ut(T, A, J, Q, ae) {
    var be = typeof T;
    (be === "undefined" || be === "boolean") && (T = null);
    var he = !1;
    if (T === null) he = !0;
    else
      switch (be) {
        case "bigint":
        case "string":
        case "number":
          he = !0;
          break;
        case "object":
          switch (T.$$typeof) {
            case W:
            case ee:
              he = !0;
              break;
            case ie:
              return he = T._init, ut(
                he(T._payload),
                A,
                J,
                Q,
                ae
              );
          }
      }
    if (he)
      return ae = ae(T), he = Q === "" ? "." + ye(T, 0) : Q, Mt(ae) ? (J = "", he != null && (J = he.replace(gt, "$&/") + "/"), ut(ae, A, J, "", function(mt) {
        return mt;
      })) : ae != null && (Vt(ae) && (ae = ke(
        ae,
        J + (ae.key == null || T && T.key === ae.key ? "" : ("" + ae.key).replace(
          gt,
          "$&/"
        ) + "/") + he
      )), A.push(ae)), 1;
    he = 0;
    var _e = Q === "" ? "." : Q + ":";
    if (Mt(T))
      for (var yt = 0; yt < T.length; yt++)
        Q = T[yt], be = _e + ye(Q, yt), he += ut(
          Q,
          A,
          J,
          be,
          ae
        );
    else if (yt = $(T), typeof yt == "function")
      for (T = yt.call(T), yt = 0; !(Q = T.next()).done; )
        Q = Q.value, be = _e + ye(Q, yt++), he += ut(
          Q,
          A,
          J,
          be,
          ae
        );
    else if (be === "object") {
      if (typeof T.then == "function")
        return ut(
          Ct(T),
          A,
          J,
          Q,
          ae
        );
      throw A = String(T), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return he;
  }
  function L(T, A, J) {
    if (T == null) return T;
    var Q = [], ae = 0;
    return ut(T, Q, "", "", function(be) {
      return A.call(J, be, ae++);
    }), Q;
  }
  function Y(T) {
    if (T._status === -1) {
      var A = T._result;
      A = A(), A.then(
        function(J) {
          (T._status === 0 || T._status === -1) && (T._status = 1, T._result = J);
        },
        function(J) {
          (T._status === 0 || T._status === -1) && (T._status = 2, T._result = J);
        }
      ), T._status === -1 && (T._status = 0, T._result = A);
    }
    if (T._status === 1) return T._result.default;
    throw T._result;
  }
  var I = typeof reportError == "function" ? reportError : function(T) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
        error: T
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", T);
      return;
    }
    console.error(T);
  };
  function ue() {
  }
  return Ke.Children = {
    map: L,
    forEach: function(T, A, J) {
      L(
        T,
        function() {
          A.apply(this, arguments);
        },
        J
      );
    },
    count: function(T) {
      var A = 0;
      return L(T, function() {
        A++;
      }), A;
    },
    toArray: function(T) {
      return L(T, function(A) {
        return A;
      }) || [];
    },
    only: function(T) {
      if (!Vt(T))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return T;
    }
  }, Ke.Component = Tt, Ke.Fragment = Oe, Ke.Profiler = Te, Ke.PureComponent = et, Ke.StrictMode = N, Ke.Suspense = oe, Ke.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = xe, Ke.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(T) {
      return xe.H.useMemoCache(T);
    }
  }, Ke.cache = function(T) {
    return function() {
      return T.apply(null, arguments);
    };
  }, Ke.cloneElement = function(T, A, J) {
    if (T == null)
      throw Error(
        "The argument must be a React element, but you passed " + T + "."
      );
    var Q = ce({}, T.props), ae = T.key, be = void 0;
    if (A != null)
      for (he in A.ref !== void 0 && (be = void 0), A.key !== void 0 && (ae = "" + A.key), A)
        !Lt.call(A, he) || he === "key" || he === "__self" || he === "__source" || he === "ref" && A.ref === void 0 || (Q[he] = A[he]);
    var he = arguments.length - 2;
    if (he === 1) Q.children = J;
    else if (1 < he) {
      for (var _e = Array(he), yt = 0; yt < he; yt++)
        _e[yt] = arguments[yt + 2];
      Q.children = _e;
    }
    return Ut(T.type, ae, void 0, void 0, be, Q);
  }, Ke.createContext = function(T) {
    return T = {
      $$typeof: Ae,
      _currentValue: T,
      _currentValue2: T,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, T.Provider = T, T.Consumer = {
      $$typeof: ve,
      _context: T
    }, T;
  }, Ke.createElement = function(T, A, J) {
    var Q, ae = {}, be = null;
    if (A != null)
      for (Q in A.key !== void 0 && (be = "" + A.key), A)
        Lt.call(A, Q) && Q !== "key" && Q !== "__self" && Q !== "__source" && (ae[Q] = A[Q]);
    var he = arguments.length - 2;
    if (he === 1) ae.children = J;
    else if (1 < he) {
      for (var _e = Array(he), yt = 0; yt < he; yt++)
        _e[yt] = arguments[yt + 2];
      ae.children = _e;
    }
    if (T && T.defaultProps)
      for (Q in he = T.defaultProps, he)
        ae[Q] === void 0 && (ae[Q] = he[Q]);
    return Ut(T, be, void 0, void 0, null, ae);
  }, Ke.createRef = function() {
    return { current: null };
  }, Ke.forwardRef = function(T) {
    return { $$typeof: Je, render: T };
  }, Ke.isValidElement = Vt, Ke.lazy = function(T) {
    return {
      $$typeof: ie,
      _payload: { _status: -1, _result: T },
      _init: Y
    };
  }, Ke.memo = function(T, A) {
    return {
      $$typeof: D,
      type: T,
      compare: A === void 0 ? null : A
    };
  }, Ke.startTransition = function(T) {
    var A = xe.T, J = {};
    xe.T = J;
    try {
      var Q = T(), ae = xe.S;
      ae !== null && ae(J, Q), typeof Q == "object" && Q !== null && typeof Q.then == "function" && Q.then(ue, I);
    } catch (be) {
      I(be);
    } finally {
      xe.T = A;
    }
  }, Ke.unstable_useCacheRefresh = function() {
    return xe.H.useCacheRefresh();
  }, Ke.use = function(T) {
    return xe.H.use(T);
  }, Ke.useActionState = function(T, A, J) {
    return xe.H.useActionState(T, A, J);
  }, Ke.useCallback = function(T, A) {
    return xe.H.useCallback(T, A);
  }, Ke.useContext = function(T) {
    return xe.H.useContext(T);
  }, Ke.useDebugValue = function() {
  }, Ke.useDeferredValue = function(T, A) {
    return xe.H.useDeferredValue(T, A);
  }, Ke.useEffect = function(T, A, J) {
    var Q = xe.H;
    if (typeof J == "function")
      throw Error(
        "useEffect CRUD overload is not enabled in this build of React."
      );
    return Q.useEffect(T, A);
  }, Ke.useId = function() {
    return xe.H.useId();
  }, Ke.useImperativeHandle = function(T, A, J) {
    return xe.H.useImperativeHandle(T, A, J);
  }, Ke.useInsertionEffect = function(T, A) {
    return xe.H.useInsertionEffect(T, A);
  }, Ke.useLayoutEffect = function(T, A) {
    return xe.H.useLayoutEffect(T, A);
  }, Ke.useMemo = function(T, A) {
    return xe.H.useMemo(T, A);
  }, Ke.useOptimistic = function(T, A) {
    return xe.H.useOptimistic(T, A);
  }, Ke.useReducer = function(T, A, J) {
    return xe.H.useReducer(T, A, J);
  }, Ke.useRef = function(T) {
    return xe.H.useRef(T);
  }, Ke.useState = function(T) {
    return xe.H.useState(T);
  }, Ke.useSyncExternalStore = function(T, A, J) {
    return xe.H.useSyncExternalStore(
      T,
      A,
      J
    );
  }, Ke.useTransition = function() {
    return xe.H.useTransition();
  }, Ke.version = "19.1.0", Ke;
}
var mp = { exports: {} };
mp.exports;
var H1;
function aT() {
  return H1 || (H1 = 1, function(W, ee) {
    var Oe = {};
    /**
     * @license React
     * react.development.js
     *
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    Oe.NODE_ENV !== "production" && function() {
      function N(p, z) {
        Object.defineProperty(Ae.prototype, p, {
          get: function() {
            console.warn(
              "%s(...) is deprecated in plain JavaScript React classes. %s",
              z[0],
              z[1]
            );
          }
        });
      }
      function Te(p) {
        return p === null || typeof p != "object" ? null : (p = ru && p[ru] || p["@@iterator"], typeof p == "function" ? p : null);
      }
      function ve(p, z) {
        p = (p = p.constructor) && (p.displayName || p.name) || "ReactClass";
        var P = p + "." + z;
        Gi[P] || (console.error(
          "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
          z,
          p
        ), Gi[P] = !0);
      }
      function Ae(p, z, P) {
        this.props = p, this.context = z, this.refs = sf, this.updater = P || Nn;
      }
      function Je() {
      }
      function oe(p, z, P) {
        this.props = p, this.context = z, this.refs = sf, this.updater = P || Nn;
      }
      function D(p) {
        return "" + p;
      }
      function ie(p) {
        try {
          D(p);
          var z = !1;
        } catch {
          z = !0;
        }
        if (z) {
          z = console;
          var P = z.error, te = typeof Symbol == "function" && Symbol.toStringTag && p[Symbol.toStringTag] || p.constructor.name || "Object";
          return P.call(
            z,
            "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
            te
          ), D(p);
        }
      }
      function Ve(p) {
        if (p == null) return null;
        if (typeof p == "function")
          return p.$$typeof === Ir ? null : p.displayName || p.name || null;
        if (typeof p == "string") return p;
        switch (p) {
          case A:
            return "Fragment";
          case Q:
            return "Profiler";
          case J:
            return "StrictMode";
          case _e:
            return "Suspense";
          case yt:
            return "SuspenseList";
          case Kl:
            return "Activity";
        }
        if (typeof p == "object")
          switch (typeof p.tag == "number" && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), p.$$typeof) {
            case T:
              return "Portal";
            case be:
              return (p.displayName || "Context") + ".Provider";
            case ae:
              return (p._context.displayName || "Context") + ".Consumer";
            case he:
              var z = p.render;
              return p = p.displayName, p || (p = z.displayName || z.name || "", p = p !== "" ? "ForwardRef(" + p + ")" : "ForwardRef"), p;
            case mt:
              return z = p.displayName || null, z !== null ? z : Ve(p.type) || "Memo";
            case fl:
              z = p._payload, p = p._init;
              try {
                return Ve(p(z));
              } catch {
              }
          }
        return null;
      }
      function $(p) {
        if (p === A) return "<>";
        if (typeof p == "object" && p !== null && p.$$typeof === fl)
          return "<...>";
        try {
          var z = Ve(p);
          return z ? "<" + z + ">" : "<...>";
        } catch {
          return "<...>";
        }
      }
      function C() {
        var p = Ne.A;
        return p === null ? null : p.getOwner();
      }
      function ce() {
        return Error("react-stack-top-frame");
      }
      function Ie(p) {
        if (Li.call(p, "key")) {
          var z = Object.getOwnPropertyDescriptor(p, "key").get;
          if (z && z.isReactWarning) return !1;
        }
        return p.key !== void 0;
      }
      function Tt(p, z) {
        function P() {
          Iu || (Iu = !0, console.error(
            "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
            z
          ));
        }
        P.isReactWarning = !0, Object.defineProperty(p, "key", {
          get: P,
          configurable: !0
        });
      }
      function ht() {
        var p = Ve(this.type);
        return hu[p] || (hu[p] = !0, console.error(
          "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
        )), p = this.props.ref, p !== void 0 ? p : null;
      }
      function et(p, z, P, te, re, Xe, Ce, lt) {
        return P = Xe.ref, p = {
          $$typeof: ue,
          type: p,
          key: z,
          props: Xe,
          _owner: re
        }, (P !== void 0 ? P : null) !== null ? Object.defineProperty(p, "ref", {
          enumerable: !1,
          get: ht
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
          value: Ce
        }), Object.defineProperty(p, "_debugTask", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: lt
        }), Object.freeze && (Object.freeze(p.props), Object.freeze(p)), p;
      }
      function Nt(p, z) {
        return z = et(
          p.type,
          z,
          void 0,
          void 0,
          p._owner,
          p.props,
          p._debugStack,
          p._debugTask
        ), p._store && (z._store.validated = p._store.validated), z;
      }
      function Mt(p) {
        return typeof p == "object" && p !== null && p.$$typeof === ue;
      }
      function xe(p) {
        var z = { "=": "=0", ":": "=2" };
        return "$" + p.replace(/[=:]/g, function(P) {
          return z[P];
        });
      }
      function Lt(p, z) {
        return typeof p == "object" && p !== null && p.key != null ? (ie(p.key), xe("" + p.key)) : z.toString(36);
      }
      function Ut() {
      }
      function ke(p) {
        switch (p.status) {
          case "fulfilled":
            return p.value;
          case "rejected":
            throw p.reason;
          default:
            switch (typeof p.status == "string" ? p.then(Ut, Ut) : (p.status = "pending", p.then(
              function(z) {
                p.status === "pending" && (p.status = "fulfilled", p.value = z);
              },
              function(z) {
                p.status === "pending" && (p.status = "rejected", p.reason = z);
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
      function Vt(p, z, P, te, re) {
        var Xe = typeof p;
        (Xe === "undefined" || Xe === "boolean") && (p = null);
        var Ce = !1;
        if (p === null) Ce = !0;
        else
          switch (Xe) {
            case "bigint":
            case "string":
            case "number":
              Ce = !0;
              break;
            case "object":
              switch (p.$$typeof) {
                case ue:
                case T:
                  Ce = !0;
                  break;
                case fl:
                  return Ce = p._init, Vt(
                    Ce(p._payload),
                    z,
                    P,
                    te,
                    re
                  );
              }
          }
        if (Ce) {
          Ce = p, re = re(Ce);
          var lt = te === "" ? "." + Lt(Ce, 0) : te;
          return du(re) ? (P = "", lt != null && (P = lt.replace(df, "$&/") + "/"), Vt(re, z, P, "", function(ll) {
            return ll;
          })) : re != null && (Mt(re) && (re.key != null && (Ce && Ce.key === re.key || ie(re.key)), P = Nt(
            re,
            P + (re.key == null || Ce && Ce.key === re.key ? "" : ("" + re.key).replace(
              df,
              "$&/"
            ) + "/") + lt
          ), te !== "" && Ce != null && Mt(Ce) && Ce.key == null && Ce._store && !Ce._store.validated && (P._store.validated = 2), re = P), z.push(re)), 1;
        }
        if (Ce = 0, lt = te === "" ? "." : te + ":", du(p))
          for (var ze = 0; ze < p.length; ze++)
            te = p[ze], Xe = lt + Lt(te, ze), Ce += Vt(
              te,
              z,
              P,
              Xe,
              re
            );
        else if (ze = Te(p), typeof ze == "function")
          for (ze === p.entries && (Ol || console.warn(
            "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
          ), Ol = !0), p = ze.call(p), ze = 0; !(te = p.next()).done; )
            te = te.value, Xe = lt + Lt(te, ze++), Ce += Vt(
              te,
              z,
              P,
              Xe,
              re
            );
        else if (Xe === "object") {
          if (typeof p.then == "function")
            return Vt(
              ke(p),
              z,
              P,
              te,
              re
            );
          throw z = String(p), Error(
            "Objects are not valid as a React child (found: " + (z === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : z) + "). If you meant to render a collection of children, use an array instead."
          );
        }
        return Ce;
      }
      function pe(p, z, P) {
        if (p == null) return p;
        var te = [], re = 0;
        return Vt(p, te, "", "", function(Xe) {
          return z.call(P, Xe, re++);
        }), te;
      }
      function gt(p) {
        if (p._status === -1) {
          var z = p._result;
          z = z(), z.then(
            function(P) {
              (p._status === 0 || p._status === -1) && (p._status = 1, p._result = P);
            },
            function(P) {
              (p._status === 0 || p._status === -1) && (p._status = 2, p._result = P);
            }
          ), p._status === -1 && (p._status = 0, p._result = z);
        }
        if (p._status === 1)
          return z = p._result, z === void 0 && console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`,
            z
          ), "default" in z || console.error(
            `lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`,
            z
          ), z.default;
        throw p._result;
      }
      function ye() {
        var p = Ne.H;
        return p === null && console.error(
          `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
        ), p;
      }
      function Qe() {
      }
      function Ct(p) {
        if (yu === null)
          try {
            var z = ("require" + Math.random()).slice(0, 7);
            yu = (W && W[z]).call(
              W,
              "timers"
            ).setImmediate;
          } catch {
            yu = function(te) {
              hf === !1 && (hf = !0, typeof MessageChannel > "u" && console.error(
                "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
              ));
              var re = new MessageChannel();
              re.port1.onmessage = te, re.port2.postMessage(void 0);
            };
          }
        return yu(p);
      }
      function ut(p) {
        return 1 < p.length && typeof AggregateError == "function" ? new AggregateError(p) : p[0];
      }
      function L(p, z) {
        z !== nn - 1 && console.error(
          "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
        ), nn = z;
      }
      function Y(p, z, P) {
        var te = Ne.actQueue;
        if (te !== null)
          if (te.length !== 0)
            try {
              I(te), Ct(function() {
                return Y(p, z, P);
              });
              return;
            } catch (re) {
              Ne.thrownErrors.push(re);
            }
          else Ne.actQueue = null;
        0 < Ne.thrownErrors.length ? (te = ut(Ne.thrownErrors), Ne.thrownErrors.length = 0, P(te)) : z(p);
      }
      function I(p) {
        if (!ta) {
          ta = !0;
          var z = 0;
          try {
            for (; z < p.length; z++) {
              var P = p[z];
              do {
                Ne.didUsePromise = !1;
                var te = P(!1);
                if (te !== null) {
                  if (Ne.didUsePromise) {
                    p[z] = P, p.splice(0, z);
                    return;
                  }
                  P = te;
                } else break;
              } while (!0);
            }
            p.length = 0;
          } catch (re) {
            p.splice(0, z + 1), Ne.thrownErrors.push(re);
          } finally {
            ta = !1;
          }
        }
      }
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var ue = Symbol.for("react.transitional.element"), T = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), J = Symbol.for("react.strict_mode"), Q = Symbol.for("react.profiler"), ae = Symbol.for("react.consumer"), be = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), _e = Symbol.for("react.suspense"), yt = Symbol.for("react.suspense_list"), mt = Symbol.for("react.memo"), fl = Symbol.for("react.lazy"), Kl = Symbol.for("react.activity"), ru = Symbol.iterator, Gi = {}, Nn = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function(p) {
          ve(p, "forceUpdate");
        },
        enqueueReplaceState: function(p) {
          ve(p, "replaceState");
        },
        enqueueSetState: function(p) {
          ve(p, "setState");
        }
      }, Fr = Object.assign, sf = {};
      Object.freeze(sf), Ae.prototype.isReactComponent = {}, Ae.prototype.setState = function(p, z) {
        if (typeof p != "object" && typeof p != "function" && p != null)
          throw Error(
            "takes an object of state variables to update or a function which returns an object of state variables."
          );
        this.updater.enqueueSetState(this, p, z, "setState");
      }, Ae.prototype.forceUpdate = function(p) {
        this.updater.enqueueForceUpdate(this, p, "forceUpdate");
      };
      var St = {
        isMounted: [
          "isMounted",
          "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
          "replaceState",
          "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
      }, su;
      for (su in St)
        St.hasOwnProperty(su) && N(su, St[su]);
      Je.prototype = Ae.prototype, St = oe.prototype = new Je(), St.constructor = oe, Fr(St, Ae.prototype), St.isPureReactComponent = !0;
      var du = Array.isArray, Ir = Symbol.for("react.client.reference"), Ne = {
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
      }, Li = Object.prototype.hasOwnProperty, Vi = console.createTask ? console.createTask : function() {
        return null;
      };
      St = {
        "react-stack-bottom-frame": function(p) {
          return p();
        }
      };
      var Iu, Pr, hu = {}, Yl = St["react-stack-bottom-frame"].bind(St, ce)(), Ga = Vi($(ce)), Ol = !1, df = /\/+/g, jc = typeof reportError == "function" ? reportError : function(p) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var z = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof p == "object" && p !== null && typeof p.message == "string" ? String(p.message) : String(p),
            error: p
          });
          if (!window.dispatchEvent(z)) return;
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", p);
          return;
        }
        console.error(p);
      }, hf = !1, yu = null, nn = 0, Dl = !1, ta = !1, La = typeof queueMicrotask == "function" ? function(p) {
        queueMicrotask(function() {
          return queueMicrotask(p);
        });
      } : Ct;
      St = Object.freeze({
        __proto__: null,
        c: function(p) {
          return ye().useMemoCache(p);
        }
      }), ee.Children = {
        map: pe,
        forEach: function(p, z, P) {
          pe(
            p,
            function() {
              z.apply(this, arguments);
            },
            P
          );
        },
        count: function(p) {
          var z = 0;
          return pe(p, function() {
            z++;
          }), z;
        },
        toArray: function(p) {
          return pe(p, function(z) {
            return z;
          }) || [];
        },
        only: function(p) {
          if (!Mt(p))
            throw Error(
              "React.Children.only expected to receive a single React element child."
            );
          return p;
        }
      }, ee.Component = Ae, ee.Fragment = A, ee.Profiler = Q, ee.PureComponent = oe, ee.StrictMode = J, ee.Suspense = _e, ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Ne, ee.__COMPILER_RUNTIME = St, ee.act = function(p) {
        var z = Ne.actQueue, P = nn;
        nn++;
        var te = Ne.actQueue = z !== null ? z : [], re = !1;
        try {
          var Xe = p();
        } catch (ze) {
          Ne.thrownErrors.push(ze);
        }
        if (0 < Ne.thrownErrors.length)
          throw L(z, P), p = ut(Ne.thrownErrors), Ne.thrownErrors.length = 0, p;
        if (Xe !== null && typeof Xe == "object" && typeof Xe.then == "function") {
          var Ce = Xe;
          return La(function() {
            re || Dl || (Dl = !0, console.error(
              "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
            ));
          }), {
            then: function(ze, ll) {
              re = !0, Ce.then(
                function(qn) {
                  if (L(z, P), P === 0) {
                    try {
                      I(te), Ct(function() {
                        return Y(
                          qn,
                          ze,
                          ll
                        );
                      });
                    } catch (Bn) {
                      Ne.thrownErrors.push(Bn);
                    }
                    if (0 < Ne.thrownErrors.length) {
                      var gh = ut(
                        Ne.thrownErrors
                      );
                      Ne.thrownErrors.length = 0, ll(gh);
                    }
                  } else ze(qn);
                },
                function(qn) {
                  L(z, P), 0 < Ne.thrownErrors.length && (qn = ut(
                    Ne.thrownErrors
                  ), Ne.thrownErrors.length = 0), ll(qn);
                }
              );
            }
          };
        }
        var lt = Xe;
        if (L(z, P), P === 0 && (I(te), te.length !== 0 && La(function() {
          re || Dl || (Dl = !0, console.error(
            "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
          ));
        }), Ne.actQueue = null), 0 < Ne.thrownErrors.length)
          throw p = ut(Ne.thrownErrors), Ne.thrownErrors.length = 0, p;
        return {
          then: function(ze, ll) {
            re = !0, P === 0 ? (Ne.actQueue = te, Ct(function() {
              return Y(
                lt,
                ze,
                ll
              );
            })) : ze(lt);
          }
        };
      }, ee.cache = function(p) {
        return function() {
          return p.apply(null, arguments);
        };
      }, ee.captureOwnerStack = function() {
        var p = Ne.getCurrentStack;
        return p === null ? null : p();
      }, ee.cloneElement = function(p, z, P) {
        if (p == null)
          throw Error(
            "The argument must be a React element, but you passed " + p + "."
          );
        var te = Fr({}, p.props), re = p.key, Xe = p._owner;
        if (z != null) {
          var Ce;
          e: {
            if (Li.call(z, "ref") && (Ce = Object.getOwnPropertyDescriptor(
              z,
              "ref"
            ).get) && Ce.isReactWarning) {
              Ce = !1;
              break e;
            }
            Ce = z.ref !== void 0;
          }
          Ce && (Xe = C()), Ie(z) && (ie(z.key), re = "" + z.key);
          for (lt in z)
            !Li.call(z, lt) || lt === "key" || lt === "__self" || lt === "__source" || lt === "ref" && z.ref === void 0 || (te[lt] = z[lt]);
        }
        var lt = arguments.length - 2;
        if (lt === 1) te.children = P;
        else if (1 < lt) {
          Ce = Array(lt);
          for (var ze = 0; ze < lt; ze++)
            Ce[ze] = arguments[ze + 2];
          te.children = Ce;
        }
        for (te = et(
          p.type,
          re,
          void 0,
          void 0,
          Xe,
          te,
          p._debugStack,
          p._debugTask
        ), re = 2; re < arguments.length; re++)
          Xe = arguments[re], Mt(Xe) && Xe._store && (Xe._store.validated = 1);
        return te;
      }, ee.createContext = function(p) {
        return p = {
          $$typeof: be,
          _currentValue: p,
          _currentValue2: p,
          _threadCount: 0,
          Provider: null,
          Consumer: null
        }, p.Provider = p, p.Consumer = {
          $$typeof: ae,
          _context: p
        }, p._currentRenderer = null, p._currentRenderer2 = null, p;
      }, ee.createElement = function(p, z, P) {
        for (var te = 2; te < arguments.length; te++) {
          var re = arguments[te];
          Mt(re) && re._store && (re._store.validated = 1);
        }
        if (te = {}, re = null, z != null)
          for (ze in Pr || !("__self" in z) || "key" in z || (Pr = !0, console.warn(
            "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
          )), Ie(z) && (ie(z.key), re = "" + z.key), z)
            Li.call(z, ze) && ze !== "key" && ze !== "__self" && ze !== "__source" && (te[ze] = z[ze]);
        var Xe = arguments.length - 2;
        if (Xe === 1) te.children = P;
        else if (1 < Xe) {
          for (var Ce = Array(Xe), lt = 0; lt < Xe; lt++)
            Ce[lt] = arguments[lt + 2];
          Object.freeze && Object.freeze(Ce), te.children = Ce;
        }
        if (p && p.defaultProps)
          for (ze in Xe = p.defaultProps, Xe)
            te[ze] === void 0 && (te[ze] = Xe[ze]);
        re && Tt(
          te,
          typeof p == "function" ? p.displayName || p.name || "Unknown" : p
        );
        var ze = 1e4 > Ne.recentlyCreatedOwnerStacks++;
        return et(
          p,
          re,
          void 0,
          void 0,
          C(),
          te,
          ze ? Error("react-stack-top-frame") : Yl,
          ze ? Vi($(p)) : Ga
        );
      }, ee.createRef = function() {
        var p = { current: null };
        return Object.seal(p), p;
      }, ee.forwardRef = function(p) {
        p != null && p.$$typeof === mt ? console.error(
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
        var z = { $$typeof: he, render: p }, P;
        return Object.defineProperty(z, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return P;
          },
          set: function(te) {
            P = te, p.name || p.displayName || (Object.defineProperty(p, "name", { value: te }), p.displayName = te);
          }
        }), z;
      }, ee.isValidElement = Mt, ee.lazy = function(p) {
        return {
          $$typeof: fl,
          _payload: { _status: -1, _result: p },
          _init: gt
        };
      }, ee.memo = function(p, z) {
        p == null && console.error(
          "memo: The first argument must be a component. Instead received: %s",
          p === null ? "null" : typeof p
        ), z = {
          $$typeof: mt,
          type: p,
          compare: z === void 0 ? null : z
        };
        var P;
        return Object.defineProperty(z, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return P;
          },
          set: function(te) {
            P = te, p.name || p.displayName || (Object.defineProperty(p, "name", { value: te }), p.displayName = te);
          }
        }), z;
      }, ee.startTransition = function(p) {
        var z = Ne.T, P = {};
        Ne.T = P, P._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var te = p(), re = Ne.S;
          re !== null && re(P, te), typeof te == "object" && te !== null && typeof te.then == "function" && te.then(Qe, jc);
        } catch (Xe) {
          jc(Xe);
        } finally {
          z === null && P._updatedFibers && (p = P._updatedFibers.size, P._updatedFibers.clear(), 10 < p && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          )), Ne.T = z;
        }
      }, ee.unstable_useCacheRefresh = function() {
        return ye().useCacheRefresh();
      }, ee.use = function(p) {
        return ye().use(p);
      }, ee.useActionState = function(p, z, P) {
        return ye().useActionState(
          p,
          z,
          P
        );
      }, ee.useCallback = function(p, z) {
        return ye().useCallback(p, z);
      }, ee.useContext = function(p) {
        var z = ye();
        return p.$$typeof === ae && console.error(
          "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
        ), z.useContext(p);
      }, ee.useDebugValue = function(p, z) {
        return ye().useDebugValue(p, z);
      }, ee.useDeferredValue = function(p, z) {
        return ye().useDeferredValue(p, z);
      }, ee.useEffect = function(p, z, P) {
        p == null && console.warn(
          "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        );
        var te = ye();
        if (typeof P == "function")
          throw Error(
            "useEffect CRUD overload is not enabled in this build of React."
          );
        return te.useEffect(p, z);
      }, ee.useId = function() {
        return ye().useId();
      }, ee.useImperativeHandle = function(p, z, P) {
        return ye().useImperativeHandle(p, z, P);
      }, ee.useInsertionEffect = function(p, z) {
        return p == null && console.warn(
          "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), ye().useInsertionEffect(p, z);
      }, ee.useLayoutEffect = function(p, z) {
        return p == null && console.warn(
          "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
        ), ye().useLayoutEffect(p, z);
      }, ee.useMemo = function(p, z) {
        return ye().useMemo(p, z);
      }, ee.useOptimistic = function(p, z) {
        return ye().useOptimistic(p, z);
      }, ee.useReducer = function(p, z, P) {
        return ye().useReducer(p, z, P);
      }, ee.useRef = function(p) {
        return ye().useRef(p);
      }, ee.useState = function(p) {
        return ye().useState(p);
      }, ee.useSyncExternalStore = function(p, z, P) {
        return ye().useSyncExternalStore(
          p,
          z,
          P
        );
      }, ee.useTransition = function() {
        return ye().useTransition();
      }, ee.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(mp, mp.exports)), mp.exports;
}
var x1;
function vh() {
  if (x1) return ig.exports;
  x1 = 1;
  var W = {};
  return W.NODE_ENV === "production" ? ig.exports = lT() : ig.exports = aT(), ig.exports;
}
var N1;
function nT() {
  if (N1) return dp;
  N1 = 1;
  var W = {};
  /**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return W.NODE_ENV !== "production" && function() {
    function ee(A) {
      if (A == null) return null;
      if (typeof A == "function")
        return A.$$typeof === gt ? null : A.displayName || A.name || null;
      if (typeof A == "string") return A;
      switch (A) {
        case Tt:
          return "Fragment";
        case et:
          return "Profiler";
        case ht:
          return "StrictMode";
        case Lt:
          return "Suspense";
        case Ut:
          return "SuspenseList";
        case pe:
          return "Activity";
      }
      if (typeof A == "object")
        switch (typeof A.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), A.$$typeof) {
          case Ie:
            return "Portal";
          case Mt:
            return (A.displayName || "Context") + ".Provider";
          case Nt:
            return (A._context.displayName || "Context") + ".Consumer";
          case xe:
            var J = A.render;
            return A = A.displayName, A || (A = J.displayName || J.name || "", A = A !== "" ? "ForwardRef(" + A + ")" : "ForwardRef"), A;
          case ke:
            return J = A.displayName || null, J !== null ? J : ee(A.type) || "Memo";
          case Vt:
            J = A._payload, A = A._init;
            try {
              return ee(A(J));
            } catch {
            }
        }
      return null;
    }
    function Oe(A) {
      return "" + A;
    }
    function N(A) {
      try {
        Oe(A);
        var J = !1;
      } catch {
        J = !0;
      }
      if (J) {
        J = console;
        var Q = J.error, ae = typeof Symbol == "function" && Symbol.toStringTag && A[Symbol.toStringTag] || A.constructor.name || "Object";
        return Q.call(
          J,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          ae
        ), Oe(A);
      }
    }
    function Te(A) {
      if (A === Tt) return "<>";
      if (typeof A == "object" && A !== null && A.$$typeof === Vt)
        return "<...>";
      try {
        var J = ee(A);
        return J ? "<" + J + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function ve() {
      var A = ye.A;
      return A === null ? null : A.getOwner();
    }
    function Ae() {
      return Error("react-stack-top-frame");
    }
    function Je(A) {
      if (Qe.call(A, "key")) {
        var J = Object.getOwnPropertyDescriptor(A, "key").get;
        if (J && J.isReactWarning) return !1;
      }
      return A.key !== void 0;
    }
    function oe(A, J) {
      function Q() {
        L || (L = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          J
        ));
      }
      Q.isReactWarning = !0, Object.defineProperty(A, "key", {
        get: Q,
        configurable: !0
      });
    }
    function D() {
      var A = ee(this.type);
      return Y[A] || (Y[A] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), A = this.props.ref, A !== void 0 ? A : null;
    }
    function ie(A, J, Q, ae, be, he, _e, yt) {
      return Q = he.ref, A = {
        $$typeof: ce,
        type: A,
        key: J,
        props: he,
        _owner: be
      }, (Q !== void 0 ? Q : null) !== null ? Object.defineProperty(A, "ref", {
        enumerable: !1,
        get: D
      }) : Object.defineProperty(A, "ref", { enumerable: !1, value: null }), A._store = {}, Object.defineProperty(A._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(A, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(A, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: _e
      }), Object.defineProperty(A, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: yt
      }), Object.freeze && (Object.freeze(A.props), Object.freeze(A)), A;
    }
    function Ve(A, J, Q, ae, be, he, _e, yt) {
      var mt = J.children;
      if (mt !== void 0)
        if (ae)
          if (Ct(mt)) {
            for (ae = 0; ae < mt.length; ae++)
              $(mt[ae]);
            Object.freeze && Object.freeze(mt);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else $(mt);
      if (Qe.call(J, "key")) {
        mt = ee(A);
        var fl = Object.keys(J).filter(function(ru) {
          return ru !== "key";
        });
        ae = 0 < fl.length ? "{key: someKey, " + fl.join(": ..., ") + ": ...}" : "{key: someKey}", T[mt + ae] || (fl = 0 < fl.length ? "{" + fl.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          ae,
          mt,
          fl,
          mt
        ), T[mt + ae] = !0);
      }
      if (mt = null, Q !== void 0 && (N(Q), mt = "" + Q), Je(J) && (N(J.key), mt = "" + J.key), "key" in J) {
        Q = {};
        for (var Kl in J)
          Kl !== "key" && (Q[Kl] = J[Kl]);
      } else Q = J;
      return mt && oe(
        Q,
        typeof A == "function" ? A.displayName || A.name || "Unknown" : A
      ), ie(
        A,
        mt,
        he,
        be,
        ve(),
        Q,
        _e,
        yt
      );
    }
    function $(A) {
      typeof A == "object" && A !== null && A.$$typeof === ce && A._store && (A._store.validated = 1);
    }
    var C = vh(), ce = Symbol.for("react.transitional.element"), Ie = Symbol.for("react.portal"), Tt = Symbol.for("react.fragment"), ht = Symbol.for("react.strict_mode"), et = Symbol.for("react.profiler"), Nt = Symbol.for("react.consumer"), Mt = Symbol.for("react.context"), xe = Symbol.for("react.forward_ref"), Lt = Symbol.for("react.suspense"), Ut = Symbol.for("react.suspense_list"), ke = Symbol.for("react.memo"), Vt = Symbol.for("react.lazy"), pe = Symbol.for("react.activity"), gt = Symbol.for("react.client.reference"), ye = C.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Qe = Object.prototype.hasOwnProperty, Ct = Array.isArray, ut = console.createTask ? console.createTask : function() {
      return null;
    };
    C = {
      "react-stack-bottom-frame": function(A) {
        return A();
      }
    };
    var L, Y = {}, I = C["react-stack-bottom-frame"].bind(
      C,
      Ae
    )(), ue = ut(Te(Ae)), T = {};
    dp.Fragment = Tt, dp.jsx = function(A, J, Q, ae, be) {
      var he = 1e4 > ye.recentlyCreatedOwnerStacks++;
      return Ve(
        A,
        J,
        Q,
        !1,
        ae,
        be,
        he ? Error("react-stack-top-frame") : I,
        he ? ut(Te(A)) : ue
      );
    }, dp.jsxs = function(A, J, Q, ae, be) {
      var he = 1e4 > ye.recentlyCreatedOwnerStacks++;
      return Ve(
        A,
        J,
        Q,
        !0,
        ae,
        be,
        he ? Error("react-stack-top-frame") : I,
        he ? ut(Te(A)) : ue
      );
    };
  }(), dp;
}
var q1;
function uT() {
  if (q1) return ug.exports;
  q1 = 1;
  var W = {};
  return W.NODE_ENV === "production" ? ug.exports = tT() : ug.exports = nT(), ug.exports;
}
var mh = uT(), ph = vh();
const iT = /* @__PURE__ */ Z1(ph);
var cg = { exports: {} }, hp = {}, og = { exports: {} }, _0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var B1;
function cT() {
  return B1 || (B1 = 1, function(W) {
    function ee(L, Y) {
      var I = L.length;
      L.push(Y);
      e: for (; 0 < I; ) {
        var ue = I - 1 >>> 1, T = L[ue];
        if (0 < Te(T, Y))
          L[ue] = Y, L[I] = T, I = ue;
        else break e;
      }
    }
    function Oe(L) {
      return L.length === 0 ? null : L[0];
    }
    function N(L) {
      if (L.length === 0) return null;
      var Y = L[0], I = L.pop();
      if (I !== Y) {
        L[0] = I;
        e: for (var ue = 0, T = L.length, A = T >>> 1; ue < A; ) {
          var J = 2 * (ue + 1) - 1, Q = L[J], ae = J + 1, be = L[ae];
          if (0 > Te(Q, I))
            ae < T && 0 > Te(be, Q) ? (L[ue] = be, L[ae] = I, ue = ae) : (L[ue] = Q, L[J] = I, ue = J);
          else if (ae < T && 0 > Te(be, I))
            L[ue] = be, L[ae] = I, ue = ae;
          else break e;
        }
      }
      return Y;
    }
    function Te(L, Y) {
      var I = L.sortIndex - Y.sortIndex;
      return I !== 0 ? I : L.id - Y.id;
    }
    if (W.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var ve = performance;
      W.unstable_now = function() {
        return ve.now();
      };
    } else {
      var Ae = Date, Je = Ae.now();
      W.unstable_now = function() {
        return Ae.now() - Je;
      };
    }
    var oe = [], D = [], ie = 1, Ve = null, $ = 3, C = !1, ce = !1, Ie = !1, Tt = !1, ht = typeof setTimeout == "function" ? setTimeout : null, et = typeof clearTimeout == "function" ? clearTimeout : null, Nt = typeof setImmediate < "u" ? setImmediate : null;
    function Mt(L) {
      for (var Y = Oe(D); Y !== null; ) {
        if (Y.callback === null) N(D);
        else if (Y.startTime <= L)
          N(D), Y.sortIndex = Y.expirationTime, ee(oe, Y);
        else break;
        Y = Oe(D);
      }
    }
    function xe(L) {
      if (Ie = !1, Mt(L), !ce)
        if (Oe(oe) !== null)
          ce = !0, Lt || (Lt = !0, ye());
        else {
          var Y = Oe(D);
          Y !== null && ut(xe, Y.startTime - L);
        }
    }
    var Lt = !1, Ut = -1, ke = 5, Vt = -1;
    function pe() {
      return Tt ? !0 : !(W.unstable_now() - Vt < ke);
    }
    function gt() {
      if (Tt = !1, Lt) {
        var L = W.unstable_now();
        Vt = L;
        var Y = !0;
        try {
          e: {
            ce = !1, Ie && (Ie = !1, et(Ut), Ut = -1), C = !0;
            var I = $;
            try {
              t: {
                for (Mt(L), Ve = Oe(oe); Ve !== null && !(Ve.expirationTime > L && pe()); ) {
                  var ue = Ve.callback;
                  if (typeof ue == "function") {
                    Ve.callback = null, $ = Ve.priorityLevel;
                    var T = ue(
                      Ve.expirationTime <= L
                    );
                    if (L = W.unstable_now(), typeof T == "function") {
                      Ve.callback = T, Mt(L), Y = !0;
                      break t;
                    }
                    Ve === Oe(oe) && N(oe), Mt(L);
                  } else N(oe);
                  Ve = Oe(oe);
                }
                if (Ve !== null) Y = !0;
                else {
                  var A = Oe(D);
                  A !== null && ut(
                    xe,
                    A.startTime - L
                  ), Y = !1;
                }
              }
              break e;
            } finally {
              Ve = null, $ = I, C = !1;
            }
            Y = void 0;
          }
        } finally {
          Y ? ye() : Lt = !1;
        }
      }
    }
    var ye;
    if (typeof Nt == "function")
      ye = function() {
        Nt(gt);
      };
    else if (typeof MessageChannel < "u") {
      var Qe = new MessageChannel(), Ct = Qe.port2;
      Qe.port1.onmessage = gt, ye = function() {
        Ct.postMessage(null);
      };
    } else
      ye = function() {
        ht(gt, 0);
      };
    function ut(L, Y) {
      Ut = ht(function() {
        L(W.unstable_now());
      }, Y);
    }
    W.unstable_IdlePriority = 5, W.unstable_ImmediatePriority = 1, W.unstable_LowPriority = 4, W.unstable_NormalPriority = 3, W.unstable_Profiling = null, W.unstable_UserBlockingPriority = 2, W.unstable_cancelCallback = function(L) {
      L.callback = null;
    }, W.unstable_forceFrameRate = function(L) {
      0 > L || 125 < L ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : ke = 0 < L ? Math.floor(1e3 / L) : 5;
    }, W.unstable_getCurrentPriorityLevel = function() {
      return $;
    }, W.unstable_next = function(L) {
      switch ($) {
        case 1:
        case 2:
        case 3:
          var Y = 3;
          break;
        default:
          Y = $;
      }
      var I = $;
      $ = Y;
      try {
        return L();
      } finally {
        $ = I;
      }
    }, W.unstable_requestPaint = function() {
      Tt = !0;
    }, W.unstable_runWithPriority = function(L, Y) {
      switch (L) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          L = 3;
      }
      var I = $;
      $ = L;
      try {
        return Y();
      } finally {
        $ = I;
      }
    }, W.unstable_scheduleCallback = function(L, Y, I) {
      var ue = W.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? ue + I : ue) : I = ue, L) {
        case 1:
          var T = -1;
          break;
        case 2:
          T = 250;
          break;
        case 5:
          T = 1073741823;
          break;
        case 4:
          T = 1e4;
          break;
        default:
          T = 5e3;
      }
      return T = I + T, L = {
        id: ie++,
        callback: Y,
        priorityLevel: L,
        startTime: I,
        expirationTime: T,
        sortIndex: -1
      }, I > ue ? (L.sortIndex = I, ee(D, L), Oe(oe) === null && L === Oe(D) && (Ie ? (et(Ut), Ut = -1) : Ie = !0, ut(xe, I - ue))) : (L.sortIndex = T, ee(oe, L), ce || C || (ce = !0, Lt || (Lt = !0, ye()))), L;
    }, W.unstable_shouldYield = pe, W.unstable_wrapCallback = function(L) {
      var Y = $;
      return function() {
        var I = $;
        $ = Y;
        try {
          return L.apply(this, arguments);
        } finally {
          $ = I;
        }
      };
    };
  }(_0)), _0;
}
var C0 = {}, Y1;
function oT() {
  return Y1 || (Y1 = 1, function(W) {
    var ee = {};
    /**
     * @license React
     * scheduler.development.js
     *
     * Copyright (c) Meta Platforms, Inc. and affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    ee.NODE_ENV !== "production" && function() {
      function Oe() {
        if (Lt = !1, pe) {
          var Y = W.unstable_now();
          Qe = Y;
          var I = !0;
          try {
            e: {
              Mt = !1, xe && (xe = !1, ke(gt), gt = -1), Nt = !0;
              var ue = et;
              try {
                t: {
                  for (Je(Y), ht = Te(ce); ht !== null && !(ht.expirationTime > Y && D()); ) {
                    var T = ht.callback;
                    if (typeof T == "function") {
                      ht.callback = null, et = ht.priorityLevel;
                      var A = T(
                        ht.expirationTime <= Y
                      );
                      if (Y = W.unstable_now(), typeof A == "function") {
                        ht.callback = A, Je(Y), I = !0;
                        break t;
                      }
                      ht === Te(ce) && ve(ce), Je(Y);
                    } else ve(ce);
                    ht = Te(ce);
                  }
                  if (ht !== null) I = !0;
                  else {
                    var J = Te(Ie);
                    J !== null && ie(
                      oe,
                      J.startTime - Y
                    ), I = !1;
                  }
                }
                break e;
              } finally {
                ht = null, et = ue, Nt = !1;
              }
              I = void 0;
            }
          } finally {
            I ? Ct() : pe = !1;
          }
        }
      }
      function N(Y, I) {
        var ue = Y.length;
        Y.push(I);
        e: for (; 0 < ue; ) {
          var T = ue - 1 >>> 1, A = Y[T];
          if (0 < Ae(A, I))
            Y[T] = I, Y[ue] = A, ue = T;
          else break e;
        }
      }
      function Te(Y) {
        return Y.length === 0 ? null : Y[0];
      }
      function ve(Y) {
        if (Y.length === 0) return null;
        var I = Y[0], ue = Y.pop();
        if (ue !== I) {
          Y[0] = ue;
          e: for (var T = 0, A = Y.length, J = A >>> 1; T < J; ) {
            var Q = 2 * (T + 1) - 1, ae = Y[Q], be = Q + 1, he = Y[be];
            if (0 > Ae(ae, ue))
              be < A && 0 > Ae(he, ae) ? (Y[T] = he, Y[be] = ue, T = be) : (Y[T] = ae, Y[Q] = ue, T = Q);
            else if (be < A && 0 > Ae(he, ue))
              Y[T] = he, Y[be] = ue, T = be;
            else break e;
          }
        }
        return I;
      }
      function Ae(Y, I) {
        var ue = Y.sortIndex - I.sortIndex;
        return ue !== 0 ? ue : Y.id - I.id;
      }
      function Je(Y) {
        for (var I = Te(Ie); I !== null; ) {
          if (I.callback === null) ve(Ie);
          else if (I.startTime <= Y)
            ve(Ie), I.sortIndex = I.expirationTime, N(ce, I);
          else break;
          I = Te(Ie);
        }
      }
      function oe(Y) {
        if (xe = !1, Je(Y), !Mt)
          if (Te(ce) !== null)
            Mt = !0, pe || (pe = !0, Ct());
          else {
            var I = Te(Ie);
            I !== null && ie(
              oe,
              I.startTime - Y
            );
          }
      }
      function D() {
        return Lt ? !0 : !(W.unstable_now() - Qe < ye);
      }
      function ie(Y, I) {
        gt = Ut(function() {
          Y(W.unstable_now());
        }, I);
      }
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()), W.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
        var Ve = performance;
        W.unstable_now = function() {
          return Ve.now();
        };
      } else {
        var $ = Date, C = $.now();
        W.unstable_now = function() {
          return $.now() - C;
        };
      }
      var ce = [], Ie = [], Tt = 1, ht = null, et = 3, Nt = !1, Mt = !1, xe = !1, Lt = !1, Ut = typeof setTimeout == "function" ? setTimeout : null, ke = typeof clearTimeout == "function" ? clearTimeout : null, Vt = typeof setImmediate < "u" ? setImmediate : null, pe = !1, gt = -1, ye = 5, Qe = -1;
      if (typeof Vt == "function")
        var Ct = function() {
          Vt(Oe);
        };
      else if (typeof MessageChannel < "u") {
        var ut = new MessageChannel(), L = ut.port2;
        ut.port1.onmessage = Oe, Ct = function() {
          L.postMessage(null);
        };
      } else
        Ct = function() {
          Ut(Oe, 0);
        };
      W.unstable_IdlePriority = 5, W.unstable_ImmediatePriority = 1, W.unstable_LowPriority = 4, W.unstable_NormalPriority = 3, W.unstable_Profiling = null, W.unstable_UserBlockingPriority = 2, W.unstable_cancelCallback = function(Y) {
        Y.callback = null;
      }, W.unstable_forceFrameRate = function(Y) {
        0 > Y || 125 < Y ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : ye = 0 < Y ? Math.floor(1e3 / Y) : 5;
      }, W.unstable_getCurrentPriorityLevel = function() {
        return et;
      }, W.unstable_next = function(Y) {
        switch (et) {
          case 1:
          case 2:
          case 3:
            var I = 3;
            break;
          default:
            I = et;
        }
        var ue = et;
        et = I;
        try {
          return Y();
        } finally {
          et = ue;
        }
      }, W.unstable_requestPaint = function() {
        Lt = !0;
      }, W.unstable_runWithPriority = function(Y, I) {
        switch (Y) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            Y = 3;
        }
        var ue = et;
        et = Y;
        try {
          return I();
        } finally {
          et = ue;
        }
      }, W.unstable_scheduleCallback = function(Y, I, ue) {
        var T = W.unstable_now();
        switch (typeof ue == "object" && ue !== null ? (ue = ue.delay, ue = typeof ue == "number" && 0 < ue ? T + ue : T) : ue = T, Y) {
          case 1:
            var A = -1;
            break;
          case 2:
            A = 250;
            break;
          case 5:
            A = 1073741823;
            break;
          case 4:
            A = 1e4;
            break;
          default:
            A = 5e3;
        }
        return A = ue + A, Y = {
          id: Tt++,
          callback: I,
          priorityLevel: Y,
          startTime: ue,
          expirationTime: A,
          sortIndex: -1
        }, ue > T ? (Y.sortIndex = ue, N(Ie, Y), Te(ce) === null && Y === Te(Ie) && (xe ? (ke(gt), gt = -1) : xe = !0, ie(oe, ue - T))) : (Y.sortIndex = A, N(ce, Y), Mt || Nt || (Mt = !0, pe || (pe = !0, Ct()))), Y;
      }, W.unstable_shouldYield = D, W.unstable_wrapCallback = function(Y) {
        var I = et;
        return function() {
          var ue = et;
          et = I;
          try {
            return Y.apply(this, arguments);
          } finally {
            et = ue;
          }
        };
      }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    }();
  }(C0)), C0;
}
var w1;
function K1() {
  if (w1) return og.exports;
  w1 = 1;
  var W = {};
  return W.NODE_ENV === "production" ? og.exports = cT() : og.exports = oT(), og.exports;
}
var fg = { exports: {} }, Ea = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var j1;
function fT() {
  if (j1) return Ea;
  j1 = 1;
  var W = vh();
  function ee(oe) {
    var D = "https://react.dev/errors/" + oe;
    if (1 < arguments.length) {
      D += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var ie = 2; ie < arguments.length; ie++)
        D += "&args[]=" + encodeURIComponent(arguments[ie]);
    }
    return "Minified React error #" + oe + "; visit " + D + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Oe() {
  }
  var N = {
    d: {
      f: Oe,
      r: function() {
        throw Error(ee(522));
      },
      D: Oe,
      C: Oe,
      L: Oe,
      m: Oe,
      X: Oe,
      S: Oe,
      M: Oe
    },
    p: 0,
    findDOMNode: null
  }, Te = Symbol.for("react.portal");
  function ve(oe, D, ie) {
    var Ve = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Te,
      key: Ve == null ? null : "" + Ve,
      children: oe,
      containerInfo: D,
      implementation: ie
    };
  }
  var Ae = W.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Je(oe, D) {
    if (oe === "font") return "";
    if (typeof D == "string")
      return D === "use-credentials" ? D : "";
  }
  return Ea.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = N, Ea.createPortal = function(oe, D) {
    var ie = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!D || D.nodeType !== 1 && D.nodeType !== 9 && D.nodeType !== 11)
      throw Error(ee(299));
    return ve(oe, D, null, ie);
  }, Ea.flushSync = function(oe) {
    var D = Ae.T, ie = N.p;
    try {
      if (Ae.T = null, N.p = 2, oe) return oe();
    } finally {
      Ae.T = D, N.p = ie, N.d.f();
    }
  }, Ea.preconnect = function(oe, D) {
    typeof oe == "string" && (D ? (D = D.crossOrigin, D = typeof D == "string" ? D === "use-credentials" ? D : "" : void 0) : D = null, N.d.C(oe, D));
  }, Ea.prefetchDNS = function(oe) {
    typeof oe == "string" && N.d.D(oe);
  }, Ea.preinit = function(oe, D) {
    if (typeof oe == "string" && D && typeof D.as == "string") {
      var ie = D.as, Ve = Je(ie, D.crossOrigin), $ = typeof D.integrity == "string" ? D.integrity : void 0, C = typeof D.fetchPriority == "string" ? D.fetchPriority : void 0;
      ie === "style" ? N.d.S(
        oe,
        typeof D.precedence == "string" ? D.precedence : void 0,
        {
          crossOrigin: Ve,
          integrity: $,
          fetchPriority: C
        }
      ) : ie === "script" && N.d.X(oe, {
        crossOrigin: Ve,
        integrity: $,
        fetchPriority: C,
        nonce: typeof D.nonce == "string" ? D.nonce : void 0
      });
    }
  }, Ea.preinitModule = function(oe, D) {
    if (typeof oe == "string")
      if (typeof D == "object" && D !== null) {
        if (D.as == null || D.as === "script") {
          var ie = Je(
            D.as,
            D.crossOrigin
          );
          N.d.M(oe, {
            crossOrigin: ie,
            integrity: typeof D.integrity == "string" ? D.integrity : void 0,
            nonce: typeof D.nonce == "string" ? D.nonce : void 0
          });
        }
      } else D == null && N.d.M(oe);
  }, Ea.preload = function(oe, D) {
    if (typeof oe == "string" && typeof D == "object" && D !== null && typeof D.as == "string") {
      var ie = D.as, Ve = Je(ie, D.crossOrigin);
      N.d.L(oe, ie, {
        crossOrigin: Ve,
        integrity: typeof D.integrity == "string" ? D.integrity : void 0,
        nonce: typeof D.nonce == "string" ? D.nonce : void 0,
        type: typeof D.type == "string" ? D.type : void 0,
        fetchPriority: typeof D.fetchPriority == "string" ? D.fetchPriority : void 0,
        referrerPolicy: typeof D.referrerPolicy == "string" ? D.referrerPolicy : void 0,
        imageSrcSet: typeof D.imageSrcSet == "string" ? D.imageSrcSet : void 0,
        imageSizes: typeof D.imageSizes == "string" ? D.imageSizes : void 0,
        media: typeof D.media == "string" ? D.media : void 0
      });
    }
  }, Ea.preloadModule = function(oe, D) {
    if (typeof oe == "string")
      if (D) {
        var ie = Je(D.as, D.crossOrigin);
        N.d.m(oe, {
          as: typeof D.as == "string" && D.as !== "script" ? D.as : void 0,
          crossOrigin: ie,
          integrity: typeof D.integrity == "string" ? D.integrity : void 0
        });
      } else N.d.m(oe);
  }, Ea.requestFormReset = function(oe) {
    N.d.r(oe);
  }, Ea.unstable_batchedUpdates = function(oe, D) {
    return oe(D);
  }, Ea.useFormState = function(oe, D, ie) {
    return Ae.H.useFormState(oe, D, ie);
  }, Ea.useFormStatus = function() {
    return Ae.H.useHostTransitionStatus();
  }, Ea.version = "19.1.0", Ea;
}
var Aa = {}, G1;
function rT() {
  if (G1) return Aa;
  G1 = 1;
  var W = {};
  /**
   * @license React
   * react-dom.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return W.NODE_ENV !== "production" && function() {
    function ee() {
    }
    function Oe($) {
      return "" + $;
    }
    function N($, C, ce) {
      var Ie = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      try {
        Oe(Ie);
        var Tt = !1;
      } catch {
        Tt = !0;
      }
      return Tt && (console.error(
        "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
        typeof Symbol == "function" && Symbol.toStringTag && Ie[Symbol.toStringTag] || Ie.constructor.name || "Object"
      ), Oe(Ie)), {
        $$typeof: ie,
        key: Ie == null ? null : "" + Ie,
        children: $,
        containerInfo: C,
        implementation: ce
      };
    }
    function Te($, C) {
      if ($ === "font") return "";
      if (typeof C == "string")
        return C === "use-credentials" ? C : "";
    }
    function ve($) {
      return $ === null ? "`null`" : $ === void 0 ? "`undefined`" : $ === "" ? "an empty string" : 'something with type "' + typeof $ + '"';
    }
    function Ae($) {
      return $ === null ? "`null`" : $ === void 0 ? "`undefined`" : $ === "" ? "an empty string" : typeof $ == "string" ? JSON.stringify($) : typeof $ == "number" ? "`" + $ + "`" : 'something with type "' + typeof $ + '"';
    }
    function Je() {
      var $ = Ve.H;
      return $ === null && console.error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      ), $;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var oe = vh(), D = {
      d: {
        f: ee,
        r: function() {
          throw Error(
            "Invalid form element. requestFormReset must be passed a form that was rendered by React."
          );
        },
        D: ee,
        C: ee,
        L: ee,
        m: ee,
        X: ee,
        S: ee,
        M: ee
      },
      p: 0,
      findDOMNode: null
    }, ie = Symbol.for("react.portal"), Ve = oe.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"
    ), Aa.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = D, Aa.createPortal = function($, C) {
      var ce = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!C || C.nodeType !== 1 && C.nodeType !== 9 && C.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return N($, C, null, ce);
    }, Aa.flushSync = function($) {
      var C = Ve.T, ce = D.p;
      try {
        if (Ve.T = null, D.p = 2, $)
          return $();
      } finally {
        Ve.T = C, D.p = ce, D.d.f() && console.error(
          "flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."
        );
      }
    }, Aa.preconnect = function($, C) {
      typeof $ == "string" && $ ? C != null && typeof C != "object" ? console.error(
        "ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.",
        Ae(C)
      ) : C != null && typeof C.crossOrigin != "string" && console.error(
        "ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.",
        ve(C.crossOrigin)
      ) : console.error(
        "ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ve($)
      ), typeof $ == "string" && (C ? (C = C.crossOrigin, C = typeof C == "string" ? C === "use-credentials" ? C : "" : void 0) : C = null, D.d.C($, C));
    }, Aa.prefetchDNS = function($) {
      if (typeof $ != "string" || !$)
        console.error(
          "ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
          ve($)
        );
      else if (1 < arguments.length) {
        var C = arguments[1];
        typeof C == "object" && C.hasOwnProperty("crossOrigin") ? console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          Ae(C)
        ) : console.error(
          "ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.",
          Ae(C)
        );
      }
      typeof $ == "string" && D.d.D($);
    }, Aa.preinit = function($, C) {
      if (typeof $ == "string" && $ ? C == null || typeof C != "object" ? console.error(
        "ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.",
        Ae(C)
      ) : C.as !== "style" && C.as !== "script" && console.error(
        'ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".',
        Ae(C.as)
      ) : console.error(
        "ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.",
        ve($)
      ), typeof $ == "string" && C && typeof C.as == "string") {
        var ce = C.as, Ie = Te(ce, C.crossOrigin), Tt = typeof C.integrity == "string" ? C.integrity : void 0, ht = typeof C.fetchPriority == "string" ? C.fetchPriority : void 0;
        ce === "style" ? D.d.S(
          $,
          typeof C.precedence == "string" ? C.precedence : void 0,
          {
            crossOrigin: Ie,
            integrity: Tt,
            fetchPriority: ht
          }
        ) : ce === "script" && D.d.X($, {
          crossOrigin: Ie,
          integrity: Tt,
          fetchPriority: ht,
          nonce: typeof C.nonce == "string" ? C.nonce : void 0
        });
      }
    }, Aa.preinitModule = function($, C) {
      var ce = "";
      if (typeof $ == "string" && $ || (ce += " The `href` argument encountered was " + ve($) + "."), C !== void 0 && typeof C != "object" ? ce += " The `options` argument encountered was " + ve(C) + "." : C && "as" in C && C.as !== "script" && (ce += " The `as` option encountered was " + Ae(C.as) + "."), ce)
        console.error(
          "ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s",
          ce
        );
      else
        switch (ce = C && typeof C.as == "string" ? C.as : "script", ce) {
          case "script":
            break;
          default:
            ce = Ae(ce), console.error(
              'ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)',
              ce,
              $
            );
        }
      typeof $ == "string" && (typeof C == "object" && C !== null ? (C.as == null || C.as === "script") && (ce = Te(
        C.as,
        C.crossOrigin
      ), D.d.M($, {
        crossOrigin: ce,
        integrity: typeof C.integrity == "string" ? C.integrity : void 0,
        nonce: typeof C.nonce == "string" ? C.nonce : void 0
      })) : C == null && D.d.M($));
    }, Aa.preload = function($, C) {
      var ce = "";
      if (typeof $ == "string" && $ || (ce += " The `href` argument encountered was " + ve($) + "."), C == null || typeof C != "object" ? ce += " The `options` argument encountered was " + ve(C) + "." : typeof C.as == "string" && C.as || (ce += " The `as` option encountered was " + ve(C.as) + "."), ce && console.error(
        'ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s',
        ce
      ), typeof $ == "string" && typeof C == "object" && C !== null && typeof C.as == "string") {
        ce = C.as;
        var Ie = Te(
          ce,
          C.crossOrigin
        );
        D.d.L($, ce, {
          crossOrigin: Ie,
          integrity: typeof C.integrity == "string" ? C.integrity : void 0,
          nonce: typeof C.nonce == "string" ? C.nonce : void 0,
          type: typeof C.type == "string" ? C.type : void 0,
          fetchPriority: typeof C.fetchPriority == "string" ? C.fetchPriority : void 0,
          referrerPolicy: typeof C.referrerPolicy == "string" ? C.referrerPolicy : void 0,
          imageSrcSet: typeof C.imageSrcSet == "string" ? C.imageSrcSet : void 0,
          imageSizes: typeof C.imageSizes == "string" ? C.imageSizes : void 0,
          media: typeof C.media == "string" ? C.media : void 0
        });
      }
    }, Aa.preloadModule = function($, C) {
      var ce = "";
      typeof $ == "string" && $ || (ce += " The `href` argument encountered was " + ve($) + "."), C !== void 0 && typeof C != "object" ? ce += " The `options` argument encountered was " + ve(C) + "." : C && "as" in C && typeof C.as != "string" && (ce += " The `as` option encountered was " + ve(C.as) + "."), ce && console.error(
        'ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s',
        ce
      ), typeof $ == "string" && (C ? (ce = Te(
        C.as,
        C.crossOrigin
      ), D.d.m($, {
        as: typeof C.as == "string" && C.as !== "script" ? C.as : void 0,
        crossOrigin: ce,
        integrity: typeof C.integrity == "string" ? C.integrity : void 0
      })) : D.d.m($));
    }, Aa.requestFormReset = function($) {
      D.d.r($);
    }, Aa.unstable_batchedUpdates = function($, C) {
      return $(C);
    }, Aa.useFormState = function($, C, ce) {
      return Je().useFormState($, C, ce);
    }, Aa.useFormStatus = function() {
      return Je().useHostTransitionStatus();
    }, Aa.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), Aa;
}
var L1;
function J1() {
  if (L1) return fg.exports;
  L1 = 1;
  var W = {};
  function ee() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (W.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ee);
      } catch (Oe) {
        console.error(Oe);
      }
    }
  }
  return W.NODE_ENV === "production" ? (ee(), fg.exports = fT()) : fg.exports = rT(), fg.exports;
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
var V1;
function sT() {
  if (V1) return hp;
  V1 = 1;
  var W = K1(), ee = vh(), Oe = J1();
  function N(l) {
    var n = "https://react.dev/errors/" + l;
    if (1 < arguments.length) {
      n += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var u = 2; u < arguments.length; u++)
        n += "&args[]=" + encodeURIComponent(arguments[u]);
    }
    return "Minified React error #" + l + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function Te(l) {
    return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
  }
  function ve(l) {
    var n = l, u = l;
    if (l.alternate) for (; n.return; ) n = n.return;
    else {
      l = n;
      do
        n = l, (n.flags & 4098) !== 0 && (u = n.return), l = n.return;
      while (l);
    }
    return n.tag === 3 ? u : null;
  }
  function Ae(l) {
    if (l.tag === 13) {
      var n = l.memoizedState;
      if (n === null && (l = l.alternate, l !== null && (n = l.memoizedState)), n !== null) return n.dehydrated;
    }
    return null;
  }
  function Je(l) {
    if (ve(l) !== l)
      throw Error(N(188));
  }
  function oe(l) {
    var n = l.alternate;
    if (!n) {
      if (n = ve(l), n === null) throw Error(N(188));
      return n !== l ? null : l;
    }
    for (var u = l, c = n; ; ) {
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
          if (s === u) return Je(r), l;
          if (s === c) return Je(r), n;
          s = s.sibling;
        }
        throw Error(N(188));
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
          if (!y) throw Error(N(189));
        }
      }
      if (u.alternate !== c) throw Error(N(190));
    }
    if (u.tag !== 3) throw Error(N(188));
    return u.stateNode.current === u ? l : n;
  }
  function D(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l;
    for (l = l.child; l !== null; ) {
      if (n = D(l), n !== null) return n;
      l = l.sibling;
    }
    return null;
  }
  var ie = Object.assign, Ve = Symbol.for("react.element"), $ = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), ce = Symbol.for("react.fragment"), Ie = Symbol.for("react.strict_mode"), Tt = Symbol.for("react.profiler"), ht = Symbol.for("react.provider"), et = Symbol.for("react.consumer"), Nt = Symbol.for("react.context"), Mt = Symbol.for("react.forward_ref"), xe = Symbol.for("react.suspense"), Lt = Symbol.for("react.suspense_list"), Ut = Symbol.for("react.memo"), ke = Symbol.for("react.lazy"), Vt = Symbol.for("react.activity"), pe = Symbol.for("react.memo_cache_sentinel"), gt = Symbol.iterator;
  function ye(l) {
    return l === null || typeof l != "object" ? null : (l = gt && l[gt] || l["@@iterator"], typeof l == "function" ? l : null);
  }
  var Qe = Symbol.for("react.client.reference");
  function Ct(l) {
    if (l == null) return null;
    if (typeof l == "function")
      return l.$$typeof === Qe ? null : l.displayName || l.name || null;
    if (typeof l == "string") return l;
    switch (l) {
      case ce:
        return "Fragment";
      case Tt:
        return "Profiler";
      case Ie:
        return "StrictMode";
      case xe:
        return "Suspense";
      case Lt:
        return "SuspenseList";
      case Vt:
        return "Activity";
    }
    if (typeof l == "object")
      switch (l.$$typeof) {
        case C:
          return "Portal";
        case Nt:
          return (l.displayName || "Context") + ".Provider";
        case et:
          return (l._context.displayName || "Context") + ".Consumer";
        case Mt:
          var n = l.render;
          return l = l.displayName, l || (l = n.displayName || n.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
        case Ut:
          return n = l.displayName || null, n !== null ? n : Ct(l.type) || "Memo";
        case ke:
          n = l._payload, l = l._init;
          try {
            return Ct(l(n));
          } catch {
          }
      }
    return null;
  }
  var ut = Array.isArray, L = ee.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Y = Oe.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, I = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ue = [], T = -1;
  function A(l) {
    return { current: l };
  }
  function J(l) {
    0 > T || (l.current = ue[T], ue[T] = null, T--);
  }
  function Q(l, n) {
    T++, ue[T] = l.current, l.current = n;
  }
  var ae = A(null), be = A(null), he = A(null), _e = A(null);
  function yt(l, n) {
    switch (Q(he, n), Q(be, l), Q(ae, null), n.nodeType) {
      case 9:
      case 11:
        l = (l = n.documentElement) && (l = l.namespaceURI) ? Zn(l) : 0;
        break;
      default:
        if (l = n.tagName, n = n.namespaceURI)
          n = Zn(n), l = Lu(n, l);
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
    J(ae), Q(ae, l);
  }
  function mt() {
    J(ae), J(be), J(he);
  }
  function fl(l) {
    l.memoizedState !== null && Q(_e, l);
    var n = ae.current, u = Lu(n, l.type);
    n !== u && (Q(be, l), Q(ae, u));
  }
  function Kl(l) {
    be.current === l && (J(ae), J(be)), _e.current === l && (J(_e), xl._currentValue = I);
  }
  var ru = Object.prototype.hasOwnProperty, Gi = W.unstable_scheduleCallback, Nn = W.unstable_cancelCallback, Fr = W.unstable_shouldYield, sf = W.unstable_requestPaint, St = W.unstable_now, su = W.unstable_getCurrentPriorityLevel, du = W.unstable_ImmediatePriority, Ir = W.unstable_UserBlockingPriority, Ne = W.unstable_NormalPriority, Li = W.unstable_LowPriority, Vi = W.unstable_IdlePriority, Iu = W.log, Pr = W.unstable_setDisableYieldValue, hu = null, Yl = null;
  function Ga(l) {
    if (typeof Iu == "function" && Pr(l), Yl && typeof Yl.setStrictMode == "function")
      try {
        Yl.setStrictMode(hu, l);
      } catch {
      }
  }
  var Ol = Math.clz32 ? Math.clz32 : hf, df = Math.log, jc = Math.LN2;
  function hf(l) {
    return l >>>= 0, l === 0 ? 32 : 31 - (df(l) / jc | 0) | 0;
  }
  var yu = 256, nn = 4194304;
  function Dl(l) {
    var n = l & 42;
    if (n !== 0) return n;
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
  function ta(l, n, u) {
    var c = l.pendingLanes;
    if (c === 0) return 0;
    var r = 0, s = l.suspendedLanes, y = l.pingedLanes;
    l = l.warmLanes;
    var m = c & 134217727;
    return m !== 0 ? (c = m & ~s, c !== 0 ? r = Dl(c) : (y &= m, y !== 0 ? r = Dl(y) : u || (u = m & ~l, u !== 0 && (r = Dl(u))))) : (m = c & ~s, m !== 0 ? r = Dl(m) : y !== 0 ? r = Dl(y) : u || (u = c & ~l, u !== 0 && (r = Dl(u)))), r === 0 ? 0 : n !== 0 && n !== r && (n & s) === 0 && (s = r & -r, u = n & -n, s >= u || s === 32 && (u & 4194048) !== 0) ? n : r;
  }
  function La(l, n) {
    return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & n) === 0;
  }
  function p(l, n) {
    switch (l) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return n + 250;
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
        return n + 5e3;
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
  function z() {
    var l = yu;
    return yu <<= 1, (yu & 4194048) === 0 && (yu = 256), l;
  }
  function P() {
    var l = nn;
    return nn <<= 1, (nn & 62914560) === 0 && (nn = 4194304), l;
  }
  function te(l) {
    for (var n = [], u = 0; 31 > u; u++) n.push(l);
    return n;
  }
  function re(l, n) {
    l.pendingLanes |= n, n !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
  }
  function Xe(l, n, u, c, r, s) {
    var y = l.pendingLanes;
    l.pendingLanes = u, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= u, l.entangledLanes &= u, l.errorRecoveryDisabledLanes &= u, l.shellSuspendCounter = 0;
    var m = l.entanglements, S = l.expirationTimes, U = l.hiddenUpdates;
    for (u = y & ~u; 0 < u; ) {
      var Z = 31 - Ol(u), k = 1 << Z;
      m[Z] = 0, S[Z] = -1;
      var H = U[Z];
      if (H !== null)
        for (U[Z] = null, Z = 0; Z < H.length; Z++) {
          var w = H[Z];
          w !== null && (w.lane &= -536870913);
        }
      u &= ~k;
    }
    c !== 0 && Ce(l, c, 0), s !== 0 && r === 0 && l.tag !== 0 && (l.suspendedLanes |= s & ~(y & ~n));
  }
  function Ce(l, n, u) {
    l.pendingLanes |= n, l.suspendedLanes &= ~n;
    var c = 31 - Ol(n);
    l.entangledLanes |= n, l.entanglements[c] = l.entanglements[c] | 1073741824 | u & 4194090;
  }
  function lt(l, n) {
    var u = l.entangledLanes |= n;
    for (l = l.entanglements; u; ) {
      var c = 31 - Ol(u), r = 1 << c;
      r & n | l[c] & n && (l[c] |= n), u &= ~r;
    }
  }
  function ze(l) {
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
  function ll(l) {
    return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function qn() {
    var l = Y.p;
    return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : Tv(l.type));
  }
  function gh(l, n) {
    var u = Y.p;
    try {
      return Y.p = l, n();
    } finally {
      Y.p = u;
    }
  }
  var Bn = Math.random().toString(36).slice(2), _t = "__reactFiber$" + Bn, wl = "__reactProps$" + Bn, Xi = "__reactContainer$" + Bn, Sh = "__reactEvents$" + Bn, pp = "__reactListeners$" + Bn, vp = "__reactHandles$" + Bn, yf = "__reactResources$" + Bn, mf = "__reactMarker$" + Bn;
  function me(l) {
    delete l[_t], delete l[wl], delete l[Sh], delete l[pp], delete l[vp];
  }
  function Pu(l) {
    var n = l[_t];
    if (n) return n;
    for (var u = l.parentNode; u; ) {
      if (n = u[Xi] || u[_t]) {
        if (u = n.alternate, n.child !== null || u !== null && u.child !== null)
          for (l = Dc(l); l !== null; ) {
            if (u = l[_t]) return u;
            l = Dc(l);
          }
        return n;
      }
      l = u, u = l.parentNode;
    }
    return null;
  }
  function zl(l) {
    if (l = l[_t] || l[Xi]) {
      var n = l.tag;
      if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3)
        return l;
    }
    return null;
  }
  function Gc(l) {
    var n = l.tag;
    if (n === 5 || n === 26 || n === 27 || n === 6) return l.stateNode;
    throw Error(N(33));
  }
  function Lc(l) {
    var n = l[yf];
    return n || (n = l[yf] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), n;
  }
  function Pt(l) {
    l[mf] = !0;
  }
  var bh = /* @__PURE__ */ new Set(), pf = {};
  function pl(l, n) {
    Qi(l, n), Qi(l + "Capture", n);
  }
  function Qi(l, n) {
    for (pf[l] = n, l = 0; l < n.length; l++)
      bh.add(n[l]);
  }
  var Th = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Eh = {}, es = {};
  function gp(l) {
    return ru.call(es, l) ? !0 : ru.call(Eh, l) ? !1 : Th.test(l) ? es[l] = !0 : (Eh[l] = !0, !1);
  }
  function vf(l, n, u) {
    if (gp(n))
      if (u === null) l.removeAttribute(n);
      else {
        switch (typeof u) {
          case "undefined":
          case "function":
          case "symbol":
            l.removeAttribute(n);
            return;
          case "boolean":
            var c = n.toLowerCase().slice(0, 5);
            if (c !== "data-" && c !== "aria-") {
              l.removeAttribute(n);
              return;
            }
        }
        l.setAttribute(n, "" + u);
      }
  }
  function mu(l, n, u) {
    if (u === null) l.removeAttribute(n);
    else {
      switch (typeof u) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          l.removeAttribute(n);
          return;
      }
      l.setAttribute(n, "" + u);
    }
  }
  function Yn(l, n, u, c) {
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
      l.setAttributeNS(n, u, "" + c);
    }
  }
  var ts, Ah;
  function Zi(l) {
    if (ts === void 0)
      try {
        throw Error();
      } catch (u) {
        var n = u.stack.trim().match(/\n( *(at )?)/);
        ts = n && n[1] || "", Ah = -1 < u.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < u.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ts + l + Ah;
  }
  var ls = !1;
  function Jl(l, n) {
    if (!l || ls) return "";
    ls = !0;
    var u = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var c = {
        DetermineComponentFrameRoot: function() {
          try {
            if (n) {
              var k = function() {
                throw Error();
              };
              if (Object.defineProperty(k.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(k, []);
                } catch (w) {
                  var H = w;
                }
                Reflect.construct(l, [], k);
              } else {
                try {
                  k.call();
                } catch (w) {
                  H = w;
                }
                l.call(k.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (w) {
                H = w;
              }
              (k = l()) && typeof k.catch == "function" && k.catch(function() {
              });
            }
          } catch (w) {
            if (w && H && typeof w.stack == "string")
              return [w.stack, H.stack];
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
        var S = y.split(`
`), U = m.split(`
`);
        for (r = c = 0; c < S.length && !S[c].includes("DetermineComponentFrameRoot"); )
          c++;
        for (; r < U.length && !U[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (c === S.length || r === U.length)
          for (c = S.length - 1, r = U.length - 1; 1 <= c && 0 <= r && S[c] !== U[r]; )
            r--;
        for (; 1 <= c && 0 <= r; c--, r--)
          if (S[c] !== U[r]) {
            if (c !== 1 || r !== 1)
              do
                if (c--, r--, 0 > r || S[c] !== U[r]) {
                  var Z = `
` + S[c].replace(" at new ", " at ");
                  return l.displayName && Z.includes("<anonymous>") && (Z = Z.replace("<anonymous>", l.displayName)), Z;
                }
              while (1 <= c && 0 <= r);
            break;
          }
      }
    } finally {
      ls = !1, Error.prepareStackTrace = u;
    }
    return (u = l ? l.displayName || l.name : "") ? Zi(u) : "";
  }
  function Vc(l) {
    switch (l.tag) {
      case 26:
      case 27:
      case 5:
        return Zi(l.type);
      case 16:
        return Zi("Lazy");
      case 13:
        return Zi("Suspense");
      case 19:
        return Zi("SuspenseList");
      case 0:
      case 15:
        return Jl(l.type, !1);
      case 11:
        return Jl(l.type.render, !1);
      case 1:
        return Jl(l.type, !0);
      case 31:
        return Zi("Activity");
      default:
        return "";
    }
  }
  function ei(l) {
    try {
      var n = "";
      do
        n += Vc(l), l = l.return;
      while (l);
      return n;
    } catch (u) {
      return `
Error generating stack: ` + u.message + `
` + u.stack;
    }
  }
  function Ra(l) {
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
  function Xc(l) {
    var n = l.type;
    return (l = l.nodeName) && l.toLowerCase() === "input" && (n === "checkbox" || n === "radio");
  }
  function as(l) {
    var n = Xc(l) ? "checked" : "value", u = Object.getOwnPropertyDescriptor(
      l.constructor.prototype,
      n
    ), c = "" + l[n];
    if (!l.hasOwnProperty(n) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
      var r = u.get, s = u.set;
      return Object.defineProperty(l, n, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(y) {
          c = "" + y, s.call(this, y);
        }
      }), Object.defineProperty(l, n, {
        enumerable: u.enumerable
      }), {
        getValue: function() {
          return c;
        },
        setValue: function(y) {
          c = "" + y;
        },
        stopTracking: function() {
          l._valueTracker = null, delete l[n];
        }
      };
    }
  }
  function Qc(l) {
    l._valueTracker || (l._valueTracker = as(l));
  }
  function Zc(l) {
    if (!l) return !1;
    var n = l._valueTracker;
    if (!n) return !0;
    var u = n.getValue(), c = "";
    return l && (c = Xc(l) ? l.checked ? "true" : "false" : l.value), l = c, l !== u ? (n.setValue(l), !0) : !1;
  }
  function pu(l) {
    if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
    try {
      return l.activeElement || l.body;
    } catch {
      return l.body;
    }
  }
  var Rh = /[\n"\\]/g;
  function Va(l) {
    return l.replace(
      Rh,
      function(n) {
        return "\\" + n.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Oh(l, n, u, c, r, s, y, m) {
    l.name = "", y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? l.type = y : l.removeAttribute("type"), n != null ? y === "number" ? (n === 0 && l.value === "" || l.value != n) && (l.value = "" + Ra(n)) : l.value !== "" + Ra(n) && (l.value = "" + Ra(n)) : y !== "submit" && y !== "reset" || l.removeAttribute("value"), n != null ? gf(l, y, Ra(n)) : u != null ? gf(l, y, Ra(u)) : c != null && l.removeAttribute("value"), r == null && s != null && (l.defaultChecked = !!s), r != null && (l.checked = r && typeof r != "function" && typeof r != "symbol"), m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? l.name = "" + Ra(m) : l.removeAttribute("name");
  }
  function Dh(l, n, u, c, r, s, y, m) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (l.type = s), n != null || u != null) {
      if (!(s !== "submit" && s !== "reset" || n != null))
        return;
      u = u != null ? "" + Ra(u) : "", n = n != null ? "" + Ra(n) : u, m || n === l.value || (l.value = n), l.defaultValue = n;
    }
    c = c ?? r, c = typeof c != "function" && typeof c != "symbol" && !!c, l.checked = m ? l.checked : !!c, l.defaultChecked = !!c, y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" && (l.name = y);
  }
  function gf(l, n, u) {
    n === "number" && pu(l.ownerDocument) === l || l.defaultValue === "" + u || (l.defaultValue = "" + u);
  }
  function ti(l, n, u, c) {
    if (l = l.options, n) {
      n = {};
      for (var r = 0; r < u.length; r++)
        n["$" + u[r]] = !0;
      for (u = 0; u < l.length; u++)
        r = n.hasOwnProperty("$" + l[u].value), l[u].selected !== r && (l[u].selected = r), r && c && (l[u].defaultSelected = !0);
    } else {
      for (u = "" + Ra(u), n = null, r = 0; r < l.length; r++) {
        if (l[r].value === u) {
          l[r].selected = !0, c && (l[r].defaultSelected = !0);
          return;
        }
        n !== null || l[r].disabled || (n = l[r]);
      }
      n !== null && (n.selected = !0);
    }
  }
  function zh(l, n, u) {
    if (n != null && (n = "" + Ra(n), n !== l.value && (l.value = n), u == null)) {
      l.defaultValue !== n && (l.defaultValue = n);
      return;
    }
    l.defaultValue = u != null ? "" + Ra(u) : "";
  }
  function Mh(l, n, u, c) {
    if (n == null) {
      if (c != null) {
        if (u != null) throw Error(N(92));
        if (ut(c)) {
          if (1 < c.length) throw Error(N(93));
          c = c[0];
        }
        u = c;
      }
      u == null && (u = ""), n = u;
    }
    u = Ra(n), l.defaultValue = u, c = l.textContent, c === u && c !== "" && c !== null && (l.value = c);
  }
  function Ki(l, n) {
    if (n) {
      var u = l.firstChild;
      if (u && u === l.lastChild && u.nodeType === 3) {
        u.nodeValue = n;
        return;
      }
    }
    l.textContent = n;
  }
  var rg = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Uh(l, n, u) {
    var c = n.indexOf("--") === 0;
    u == null || typeof u == "boolean" || u === "" ? c ? l.setProperty(n, "") : n === "float" ? l.cssFloat = "" : l[n] = "" : c ? l.setProperty(n, u) : typeof u != "number" || u === 0 || rg.has(n) ? n === "float" ? l.cssFloat = u : l[n] = ("" + u).trim() : l[n] = u + "px";
  }
  function ns(l, n, u) {
    if (n != null && typeof n != "object")
      throw Error(N(62));
    if (l = l.style, u != null) {
      for (var c in u)
        !u.hasOwnProperty(c) || n != null && n.hasOwnProperty(c) || (c.indexOf("--") === 0 ? l.setProperty(c, "") : c === "float" ? l.cssFloat = "" : l[c] = "");
      for (var r in n)
        c = n[r], n.hasOwnProperty(r) && u[r] !== c && Uh(l, r, c);
    } else
      for (var s in n)
        n.hasOwnProperty(s) && Uh(l, s, n[s]);
  }
  function Kc(l) {
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
  var Sf = /* @__PURE__ */ new Map([
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
  ]), sg = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function bf(l) {
    return sg.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
  }
  var us = null;
  function Ji(l) {
    return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
  }
  var ki = null, Jc = null;
  function Sp(l) {
    var n = zl(l);
    if (n && (l = n.stateNode)) {
      var u = l[wl] || null;
      e: switch (l = n.stateNode, n.type) {
        case "input":
          if (Oh(
            l,
            u.value,
            u.defaultValue,
            u.defaultValue,
            u.checked,
            u.defaultChecked,
            u.type,
            u.name
          ), n = u.name, u.type === "radio" && n != null) {
            for (u = l; u.parentNode; ) u = u.parentNode;
            for (u = u.querySelectorAll(
              'input[name="' + Va(
                "" + n
              ) + '"][type="radio"]'
            ), n = 0; n < u.length; n++) {
              var c = u[n];
              if (c !== l && c.form === l.form) {
                var r = c[wl] || null;
                if (!r) throw Error(N(90));
                Oh(
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
            for (n = 0; n < u.length; n++)
              c = u[n], c.form === l.form && Zc(c);
          }
          break e;
        case "textarea":
          zh(l, u.value, u.defaultValue);
          break e;
        case "select":
          n = u.value, n != null && ti(l, !!u.multiple, n, !1);
      }
    }
  }
  var _h = !1;
  function bp(l, n, u) {
    if (_h) return l(n, u);
    _h = !0;
    try {
      var c = l(n);
      return c;
    } finally {
      if (_h = !1, (ki !== null || Jc !== null) && (sr(), ki && (n = ki, l = Jc, Jc = ki = null, Sp(n), l)))
        for (n = 0; n < l.length; n++) Sp(l[n]);
    }
  }
  function vu(l, n) {
    var u = l.stateNode;
    if (u === null) return null;
    var c = u[wl] || null;
    if (c === null) return null;
    u = c[n];
    e: switch (n) {
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
        N(231, n, typeof u)
      );
    return u;
  }
  var un = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), is = !1;
  if (un)
    try {
      var kc = {};
      Object.defineProperty(kc, "passive", {
        get: function() {
          is = !0;
        }
      }), window.addEventListener("test", kc, kc), window.removeEventListener("test", kc, kc);
    } catch {
      is = !1;
    }
  var Xa = null, cs = null, $i = null;
  function Tf() {
    if ($i) return $i;
    var l, n = cs, u = n.length, c, r = "value" in Xa ? Xa.value : Xa.textContent, s = r.length;
    for (l = 0; l < u && n[l] === r[l]; l++) ;
    var y = u - l;
    for (c = 1; c <= y && n[u - c] === r[s - c]; c++) ;
    return $i = r.slice(l, 1 < c ? 1 - c : void 0);
  }
  function Ef(l) {
    var n = l.keyCode;
    return "charCode" in l ? (l = l.charCode, l === 0 && n === 13 && (l = 13)) : l = n, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
  }
  function Ml() {
    return !0;
  }
  function Tp() {
    return !1;
  }
  function jl(l) {
    function n(u, c, r, s, y) {
      this._reactName = u, this._targetInst = r, this.type = c, this.nativeEvent = s, this.target = y, this.currentTarget = null;
      for (var m in l)
        l.hasOwnProperty(m) && (u = l[m], this[m] = u ? u(s) : s[m]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? Ml : Tp, this.isPropagationStopped = Tp, this;
    }
    return ie(n.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var u = this.nativeEvent;
        u && (u.preventDefault ? u.preventDefault() : typeof u.returnValue != "unknown" && (u.returnValue = !1), this.isDefaultPrevented = Ml);
      },
      stopPropagation: function() {
        var u = this.nativeEvent;
        u && (u.stopPropagation ? u.stopPropagation() : typeof u.cancelBubble != "unknown" && (u.cancelBubble = !0), this.isPropagationStopped = Ml);
      },
      persist: function() {
      },
      isPersistent: Ml
    }), n;
  }
  var li = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(l) {
      return l.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Af = jl(li), Rf = ie({}, li, { view: 0, detail: 0 }), dg = jl(Rf), os, Ch, $c, fs = ie({}, Rf, {
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
    getModifierState: rs,
    button: 0,
    buttons: 0,
    relatedTarget: function(l) {
      return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
    },
    movementX: function(l) {
      return "movementX" in l ? l.movementX : (l !== $c && ($c && l.type === "mousemove" ? (os = l.screenX - $c.screenX, Ch = l.screenY - $c.screenY) : Ch = os = 0, $c = l), os);
    },
    movementY: function(l) {
      return "movementY" in l ? l.movementY : Ch;
    }
  }), Of = jl(fs), Ep = ie({}, fs, { dataTransfer: 0 }), Ap = jl(Ep), Rp = ie({}, Rf, { relatedTarget: 0 }), Hh = jl(Rp), hg = ie({}, li, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), yg = jl(hg), mg = ie({}, li, {
    clipboardData: function(l) {
      return "clipboardData" in l ? l.clipboardData : window.clipboardData;
    }
  }), pg = jl(mg), Df = ie({}, li, { data: 0 }), xh = jl(Df), Op = {
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
  }, Dp = {
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
  }, zp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function Nh(l) {
    var n = this.nativeEvent;
    return n.getModifierState ? n.getModifierState(l) : (l = zp[l]) ? !!n[l] : !1;
  }
  function rs() {
    return Nh;
  }
  var Wi = ie({}, Rf, {
    key: function(l) {
      if (l.key) {
        var n = Op[l.key] || l.key;
        if (n !== "Unidentified") return n;
      }
      return l.type === "keypress" ? (l = Ef(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? Dp[l.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: rs,
    charCode: function(l) {
      return l.type === "keypress" ? Ef(l) : 0;
    },
    keyCode: function(l) {
      return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    },
    which: function(l) {
      return l.type === "keypress" ? Ef(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
    }
  }), Fi = jl(Wi), cn = ie({}, fs, {
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
  }), la = jl(cn), ss = ie({}, Rf, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: rs
  }), ds = jl(ss), qh = ie({}, li, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), aa = jl(qh), Mp = ie({}, fs, {
    deltaX: function(l) {
      return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
    },
    deltaY: function(l) {
      return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), hs = jl(Mp), Ii = ie({}, li, {
    newState: 0,
    oldState: 0
  }), Bh = jl(Ii), Up = [9, 13, 27, 32], ys = un && "CompositionEvent" in window, Pi = null;
  un && "documentMode" in document && (Pi = document.documentMode);
  var vg = un && "TextEvent" in window && !Pi, ms = un && (!ys || Pi && 8 < Pi && 11 >= Pi), wn = " ", Yh = !1;
  function ps(l, n) {
    switch (l) {
      case "keyup":
        return Up.indexOf(n.keyCode) !== -1;
      case "keydown":
        return n.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function zf(l) {
    return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
  }
  var Qa = !1;
  function wh(l, n) {
    switch (l) {
      case "compositionend":
        return zf(n);
      case "keypress":
        return n.which !== 32 ? null : (Yh = !0, wn);
      case "textInput":
        return l = n.data, l === wn && Yh ? null : l;
      default:
        return null;
    }
  }
  function jh(l, n) {
    if (Qa)
      return l === "compositionend" || !ys && ps(l, n) ? (l = Tf(), $i = cs = Xa = null, Qa = !1, l) : null;
    switch (l) {
      case "paste":
        return null;
      case "keypress":
        if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
          if (n.char && 1 < n.char.length)
            return n.char;
          if (n.which) return String.fromCharCode(n.which);
        }
        return null;
      case "compositionend":
        return ms && n.locale !== "ko" ? null : n.data;
      default:
        return null;
    }
  }
  var ec = {
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
  function Gh(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n === "input" ? !!ec[l.type] : n === "textarea";
  }
  function vs(l, n, u, c) {
    ki ? Jc ? Jc.push(c) : Jc = [c] : ki = c, n = _i(n, "onChange"), 0 < n.length && (u = new Af(
      "onChange",
      "change",
      null,
      u,
      c
    ), l.push({ event: u, listeners: n }));
  }
  var tc = null, on = null;
  function lc(l) {
    Gu(l, 0);
  }
  function Wc(l) {
    var n = Gc(l);
    if (Zc(n)) return l;
  }
  function ai(l, n) {
    if (l === "change") return n;
  }
  var Lh = !1;
  if (un) {
    var gs;
    if (un) {
      var ac = "oninput" in document;
      if (!ac) {
        var Fc = document.createElement("div");
        Fc.setAttribute("oninput", "return;"), ac = typeof Fc.oninput == "function";
      }
      gs = ac;
    } else gs = !1;
    Lh = gs && (!document.documentMode || 9 < document.documentMode);
  }
  function Vh() {
    tc && (tc.detachEvent("onpropertychange", Ic), on = tc = null);
  }
  function Ic(l) {
    if (l.propertyName === "value" && Wc(on)) {
      var n = [];
      vs(
        n,
        on,
        l,
        Ji(l)
      ), bp(lc, n);
    }
  }
  function _p(l, n, u) {
    l === "focusin" ? (Vh(), tc = n, on = u, tc.attachEvent("onpropertychange", Ic)) : l === "focusout" && Vh();
  }
  function Ss(l) {
    if (l === "selectionchange" || l === "keyup" || l === "keydown")
      return Wc(on);
  }
  function ni(l, n) {
    if (l === "click") return Wc(n);
  }
  function gu(l, n) {
    if (l === "input" || l === "change")
      return Wc(n);
  }
  function Xh(l, n) {
    return l === n && (l !== 0 || 1 / l === 1 / n) || l !== l && n !== n;
  }
  var kl = typeof Object.is == "function" ? Object.is : Xh;
  function Su(l, n) {
    if (kl(l, n)) return !0;
    if (typeof l != "object" || l === null || typeof n != "object" || n === null)
      return !1;
    var u = Object.keys(l), c = Object.keys(n);
    if (u.length !== c.length) return !1;
    for (c = 0; c < u.length; c++) {
      var r = u[c];
      if (!ru.call(n, r) || !kl(l[r], n[r]))
        return !1;
    }
    return !0;
  }
  function Mf(l) {
    for (; l && l.firstChild; ) l = l.firstChild;
    return l;
  }
  function ui(l, n) {
    var u = Mf(l);
    l = 0;
    for (var c; u; ) {
      if (u.nodeType === 3) {
        if (c = l + u.textContent.length, l <= n && c >= n)
          return { node: u, offset: n - l };
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
      u = Mf(u);
    }
  }
  function qt(l, n) {
    return l && n ? l === n ? !0 : l && l.nodeType === 3 ? !1 : n && n.nodeType === 3 ? qt(l, n.parentNode) : "contains" in l ? l.contains(n) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(n) & 16) : !1 : !1;
  }
  function Uf(l) {
    l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
    for (var n = pu(l.document); n instanceof l.HTMLIFrameElement; ) {
      try {
        var u = typeof n.contentWindow.location.href == "string";
      } catch {
        u = !1;
      }
      if (u) l = n.contentWindow;
      else break;
      n = pu(l.document);
    }
    return n;
  }
  function bs(l) {
    var n = l && l.nodeName && l.nodeName.toLowerCase();
    return n && (n === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || n === "textarea" || l.contentEditable === "true");
  }
  var Qh = un && "documentMode" in document && 11 >= document.documentMode, Za = null, nc = null, Oa = null, Pc = !1;
  function eo(l, n, u) {
    var c = u.window === u ? u.document : u.nodeType === 9 ? u : u.ownerDocument;
    Pc || Za == null || Za !== pu(c) || (c = Za, "selectionStart" in c && bs(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = {
      anchorNode: c.anchorNode,
      anchorOffset: c.anchorOffset,
      focusNode: c.focusNode,
      focusOffset: c.focusOffset
    }), Oa && Su(Oa, c) || (Oa = c, c = _i(nc, "onSelect"), 0 < c.length && (n = new Af(
      "onSelect",
      "select",
      null,
      n,
      u
    ), l.push({ event: n, listeners: c }), n.target = Za)));
  }
  function bu(l, n) {
    var u = {};
    return u[l.toLowerCase()] = n.toLowerCase(), u["Webkit" + l] = "webkit" + n, u["Moz" + l] = "moz" + n, u;
  }
  var ii = {
    animationend: bu("Animation", "AnimationEnd"),
    animationiteration: bu("Animation", "AnimationIteration"),
    animationstart: bu("Animation", "AnimationStart"),
    transitionrun: bu("Transition", "TransitionRun"),
    transitionstart: bu("Transition", "TransitionStart"),
    transitioncancel: bu("Transition", "TransitionCancel"),
    transitionend: bu("Transition", "TransitionEnd")
  }, Ts = {}, fn = {};
  un && (fn = document.createElement("div").style, "AnimationEvent" in window || (delete ii.animationend.animation, delete ii.animationiteration.animation, delete ii.animationstart.animation), "TransitionEvent" in window || delete ii.transitionend.transition);
  function Gl(l) {
    if (Ts[l]) return Ts[l];
    if (!ii[l]) return l;
    var n = ii[l], u;
    for (u in n)
      if (n.hasOwnProperty(u) && u in fn)
        return Ts[l] = n[u];
    return l;
  }
  var _f = Gl("animationend"), Cp = Gl("animationiteration"), Zh = Gl("animationstart"), gg = Gl("transitionrun"), Kh = Gl("transitionstart"), Es = Gl("transitioncancel"), Jh = Gl("transitionend"), kh = /* @__PURE__ */ new Map(), As = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  As.push("scrollEnd");
  function na(l, n) {
    kh.set(l, n), pl(n, [l]);
  }
  var $h = /* @__PURE__ */ new WeakMap();
  function Da(l, n) {
    if (typeof l == "object" && l !== null) {
      var u = $h.get(l);
      return u !== void 0 ? u : (n = {
        value: l,
        source: n,
        stack: ei(n)
      }, $h.set(l, n), n);
    }
    return {
      value: l,
      source: n,
      stack: ei(n)
    };
  }
  var za = [], ci = 0, Cf = 0;
  function rn() {
    for (var l = ci, n = Cf = ci = 0; n < l; ) {
      var u = za[n];
      za[n++] = null;
      var c = za[n];
      za[n++] = null;
      var r = za[n];
      za[n++] = null;
      var s = za[n];
      if (za[n++] = null, c !== null && r !== null) {
        var y = c.pending;
        y === null ? r.next = r : (r.next = y.next, y.next = r), c.pending = r;
      }
      s !== 0 && to(u, r, s);
    }
  }
  function sn(l, n, u, c) {
    za[ci++] = l, za[ci++] = n, za[ci++] = u, za[ci++] = c, Cf |= c, l.lanes |= c, l = l.alternate, l !== null && (l.lanes |= c);
  }
  function uc(l, n, u, c) {
    return sn(l, n, u, c), oi(l);
  }
  function Tu(l, n) {
    return sn(l, null, null, n), oi(l);
  }
  function to(l, n, u) {
    l.lanes |= u;
    var c = l.alternate;
    c !== null && (c.lanes |= u);
    for (var r = !1, s = l.return; s !== null; )
      s.childLanes |= u, c = s.alternate, c !== null && (c.childLanes |= u), s.tag === 22 && (l = s.stateNode, l === null || l._visibility & 1 || (r = !0)), l = s, s = s.return;
    return l.tag === 3 ? (s = l.stateNode, r && n !== null && (r = 31 - Ol(u), l = s.hiddenUpdates, c = l[r], c === null ? l[r] = [n] : c.push(n), n.lane = u | 536870912), s) : null;
  }
  function oi(l) {
    if (50 < qo)
      throw qo = 0, rd = null, Error(N(185));
    for (var n = l.return; n !== null; )
      l = n, n = l.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ic = {};
  function Sg(l, n, u, c) {
    this.tag = l, this.key = u, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function ua(l, n, u, c) {
    return new Sg(l, n, u, c);
  }
  function Rs(l) {
    return l = l.prototype, !(!l || !l.isReactComponent);
  }
  function dn(l, n) {
    var u = l.alternate;
    return u === null ? (u = ua(
      l.tag,
      n,
      l.key,
      l.mode
    ), u.elementType = l.elementType, u.type = l.type, u.stateNode = l.stateNode, u.alternate = l, l.alternate = u) : (u.pendingProps = n, u.type = l.type, u.flags = 0, u.subtreeFlags = 0, u.deletions = null), u.flags = l.flags & 65011712, u.childLanes = l.childLanes, u.lanes = l.lanes, u.child = l.child, u.memoizedProps = l.memoizedProps, u.memoizedState = l.memoizedState, u.updateQueue = l.updateQueue, n = l.dependencies, u.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }, u.sibling = l.sibling, u.index = l.index, u.ref = l.ref, u.refCleanup = l.refCleanup, u;
  }
  function Os(l, n) {
    l.flags &= 65011714;
    var u = l.alternate;
    return u === null ? (l.childLanes = 0, l.lanes = n, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = u.childLanes, l.lanes = u.lanes, l.child = u.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = u.memoizedProps, l.memoizedState = u.memoizedState, l.updateQueue = u.updateQueue, l.type = u.type, n = u.dependencies, l.dependencies = n === null ? null : {
      lanes: n.lanes,
      firstContext: n.firstContext
    }), l;
  }
  function we(l, n, u, c, r, s) {
    var y = 0;
    if (c = l, typeof l == "function") Rs(l) && (y = 1);
    else if (typeof l == "string")
      y = yv(
        l,
        u,
        ae.current
      ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
    else
      e: switch (l) {
        case Vt:
          return l = ua(31, u, n, r), l.elementType = Vt, l.lanes = s, l;
        case ce:
          return F(u.children, r, s, n);
        case Ie:
          y = 8, r |= 24;
          break;
        case Tt:
          return l = ua(12, u, n, r | 2), l.elementType = Tt, l.lanes = s, l;
        case xe:
          return l = ua(13, u, n, r), l.elementType = xe, l.lanes = s, l;
        case Lt:
          return l = ua(19, u, n, r), l.elementType = Lt, l.lanes = s, l;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case ht:
              case Nt:
                y = 10;
                break e;
              case et:
                y = 9;
                break e;
              case Mt:
                y = 11;
                break e;
              case Ut:
                y = 14;
                break e;
              case ke:
                y = 16, c = null;
                break e;
            }
          y = 29, u = Error(
            N(130, l === null ? "null" : typeof l, "")
          ), c = null;
      }
    return n = ua(y, u, n, r), n.elementType = l, n.type = c, n.lanes = s, n;
  }
  function F(l, n, u, c) {
    return l = ua(7, l, c, n), l.lanes = u, l;
  }
  function fi(l, n, u) {
    return l = ua(6, l, null, n), l.lanes = u, l;
  }
  function lo(l, n, u) {
    return n = ua(
      4,
      l.children !== null ? l.children : [],
      l.key,
      n
    ), n.lanes = u, n.stateNode = {
      containerInfo: l.containerInfo,
      pendingChildren: null,
      implementation: l.implementation
    }, n;
  }
  var Ht = [], ri = 0, ao = null, Hf = 0, ia = [], Ka = 0, Eu = null, hn = 1, yn = "";
  function al(l, n) {
    Ht[ri++] = Hf, Ht[ri++] = ao, ao = l, Hf = n;
  }
  function pt(l, n, u) {
    ia[Ka++] = hn, ia[Ka++] = yn, ia[Ka++] = Eu, Eu = l;
    var c = hn;
    l = yn;
    var r = 32 - Ol(c) - 1;
    c &= ~(1 << r), u += 1;
    var s = 32 - Ol(n) + r;
    if (30 < s) {
      var y = r - r % 5;
      s = (c & (1 << y) - 1).toString(32), c >>= y, r -= y, hn = 1 << 32 - Ol(n) + r | u << r | c, yn = s + l;
    } else
      hn = 1 << s | u << r | c, yn = l;
  }
  function xf(l) {
    l.return !== null && (al(l, 1), pt(l, 1, 0));
  }
  function cc(l) {
    for (; l === ao; )
      ao = Ht[--ri], Ht[ri] = null, Hf = Ht[--ri], Ht[ri] = null;
    for (; l === Eu; )
      Eu = ia[--Ka], ia[Ka] = null, yn = ia[--Ka], ia[Ka] = null, hn = ia[--Ka], ia[Ka] = null;
  }
  var kt = null, Et = null, je = !1, Au = null, $l = !1, Nf = Error(N(519));
  function mn(l) {
    var n = Error(N(418, ""));
    throw io(Da(n, l)), Nf;
  }
  function Ds(l) {
    var n = l.stateNode, u = l.type, c = l.memoizedProps;
    switch (n[_t] = l, n[wl] = c, u) {
      case "dialog":
        qe("cancel", n), qe("close", n);
        break;
      case "iframe":
      case "object":
      case "embed":
        qe("load", n);
        break;
      case "video":
      case "audio":
        for (u = 0; u < Me.length; u++)
          qe(Me[u], n);
        break;
      case "source":
        qe("error", n);
        break;
      case "img":
      case "image":
      case "link":
        qe("error", n), qe("load", n);
        break;
      case "details":
        qe("toggle", n);
        break;
      case "input":
        qe("invalid", n), Dh(
          n,
          c.value,
          c.defaultValue,
          c.checked,
          c.defaultChecked,
          c.type,
          c.name,
          !0
        ), Qc(n);
        break;
      case "select":
        qe("invalid", n);
        break;
      case "textarea":
        qe("invalid", n), Mh(n, c.value, c.defaultValue, c.children), Qc(n);
    }
    u = c.children, typeof u != "string" && typeof u != "number" && typeof u != "bigint" || n.textContent === "" + u || c.suppressHydrationWarning === !0 || sv(n.textContent, u) ? (c.popover != null && (qe("beforetoggle", n), qe("toggle", n)), c.onScroll != null && qe("scroll", n), c.onScrollEnd != null && qe("scrollend", n), c.onClick != null && (n.onclick = Sr), n = !0) : n = !1, n || mn(l);
  }
  function qf(l) {
    for (kt = l.return; kt; )
      switch (kt.tag) {
        case 5:
        case 13:
          $l = !1;
          return;
        case 27:
        case 3:
          $l = !0;
          return;
        default:
          kt = kt.return;
      }
  }
  function no(l) {
    if (l !== kt) return !1;
    if (!je) return qf(l), je = !0, !1;
    var n = l.tag, u;
    if ((u = n !== 3 && n !== 27) && ((u = n === 5) && (u = l.type, u = !(u !== "form" && u !== "button") || Oc(l.type, l.memoizedProps)), u = !u), u && Et && mn(l), qf(l), n === 13) {
      if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(N(317));
      e: {
        for (l = l.nextSibling, n = 0; l; ) {
          if (l.nodeType === 8)
            if (u = l.data, u === "/$") {
              if (n === 0) {
                Et = Mn(l.nextSibling);
                break e;
              }
              n--;
            } else
              u !== "$" && u !== "$!" && u !== "$?" || n++;
          l = l.nextSibling;
        }
        Et = null;
      }
    } else
      n === 27 ? (n = Et, Cl(l.type) ? (l = mm, mm = null, Et = l) : Et = n) : Et = kt ? Mn(l.stateNode.nextSibling) : null;
    return !0;
  }
  function uo() {
    Et = kt = null, je = !1;
  }
  function Wh() {
    var l = Au;
    return l !== null && (Fl === null ? Fl = l : Fl.push.apply(
      Fl,
      l
    ), Au = null), l;
  }
  function io(l) {
    Au === null ? Au = [l] : Au.push(l);
  }
  var zs = A(null), Ru = null, pn = null;
  function jn(l, n, u) {
    Q(zs, n._currentValue), n._currentValue = u;
  }
  function Gn(l) {
    l._currentValue = zs.current, J(zs);
  }
  function Ms(l, n, u) {
    for (; l !== null; ) {
      var c = l.alternate;
      if ((l.childLanes & n) !== n ? (l.childLanes |= n, c !== null && (c.childLanes |= n)) : c !== null && (c.childLanes & n) !== n && (c.childLanes |= n), l === u) break;
      l = l.return;
    }
  }
  function Us(l, n, u, c) {
    var r = l.child;
    for (r !== null && (r.return = l); r !== null; ) {
      var s = r.dependencies;
      if (s !== null) {
        var y = r.child;
        s = s.firstContext;
        e: for (; s !== null; ) {
          var m = s;
          s = r;
          for (var S = 0; S < n.length; S++)
            if (m.context === n[S]) {
              s.lanes |= u, m = s.alternate, m !== null && (m.lanes |= u), Ms(
                s.return,
                u,
                l
              ), c || (y = null);
              break e;
            }
          s = m.next;
        }
      } else if (r.tag === 18) {
        if (y = r.return, y === null) throw Error(N(341));
        y.lanes |= u, s = y.alternate, s !== null && (s.lanes |= u), Ms(y, u, l), y = null;
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
  function Bf(l, n, u, c) {
    l = null;
    for (var r = n, s = !1; r !== null; ) {
      if (!s) {
        if ((r.flags & 524288) !== 0) s = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var y = r.alternate;
        if (y === null) throw Error(N(387));
        if (y = y.memoizedProps, y !== null) {
          var m = r.type;
          kl(r.pendingProps.value, y.value) || (l !== null ? l.push(m) : l = [m]);
        }
      } else if (r === _e.current) {
        if (y = r.alternate, y === null) throw Error(N(387));
        y.memoizedState.memoizedState !== r.memoizedState.memoizedState && (l !== null ? l.push(xl) : l = [xl]);
      }
      r = r.return;
    }
    l !== null && Us(
      n,
      l,
      u,
      c
    ), n.flags |= 262144;
  }
  function Yf(l) {
    for (l = l.firstContext; l !== null; ) {
      if (!kl(
        l.context._currentValue,
        l.memoizedValue
      ))
        return !0;
      l = l.next;
    }
    return !1;
  }
  function si(l) {
    Ru = l, pn = null, l = l.dependencies, l !== null && (l.firstContext = null);
  }
  function Ul(l) {
    return Fh(Ru, l);
  }
  function co(l, n) {
    return Ru === null && si(l), Fh(l, n);
  }
  function Fh(l, n) {
    var u = n._currentValue;
    if (n = { context: n, memoizedValue: u, next: null }, pn === null) {
      if (l === null) throw Error(N(308));
      pn = n, l.dependencies = { lanes: 0, firstContext: n }, l.flags |= 524288;
    } else pn = pn.next = n;
    return u;
  }
  var Hp = typeof AbortController < "u" ? AbortController : function() {
    var l = [], n = this.signal = {
      aborted: !1,
      addEventListener: function(u, c) {
        l.push(c);
      }
    };
    this.abort = function() {
      n.aborted = !0, l.forEach(function(u) {
        return u();
      });
    };
  }, oo = W.unstable_scheduleCallback, _s = W.unstable_NormalPriority, nl = {
    $$typeof: Nt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function Ih() {
    return {
      controller: new Hp(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function di(l) {
    l.refCount--, l.refCount === 0 && oo(_s, function() {
      l.controller.abort();
    });
  }
  var Ln = null, fo = 0, hi = 0, Ja = null;
  function ca(l, n) {
    if (Ln === null) {
      var u = Ln = [];
      fo = 0, hi = bd(), Ja = {
        status: "pending",
        value: void 0,
        then: function(c) {
          u.push(c);
        }
      };
    }
    return fo++, n.then(wf, wf), n;
  }
  function wf() {
    if (--fo === 0 && Ln !== null) {
      Ja !== null && (Ja.status = "fulfilled");
      var l = Ln;
      Ln = null, hi = 0, Ja = null;
      for (var n = 0; n < l.length; n++) (0, l[n])();
    }
  }
  function Ph(l, n) {
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
        c.status = "fulfilled", c.value = n;
        for (var r = 0; r < u.length; r++) (0, u[r])(n);
      },
      function(r) {
        for (c.status = "rejected", c.reason = r, r = 0; r < u.length; r++)
          (0, u[r])(void 0);
      }
    ), c;
  }
  var ey = L.S;
  L.S = function(l, n) {
    typeof n == "object" && n !== null && typeof n.then == "function" && ca(l, n), ey !== null && ey(l, n);
  };
  var Ou = A(null);
  function ro() {
    var l = Ou.current;
    return l !== null ? l : Rt.pooledCache;
  }
  function so(l, n) {
    n === null ? Q(Ou, Ou.current) : Q(Ou, n.pool);
  }
  function jf() {
    var l = ro();
    return l === null ? null : { parent: nl._currentValue, pool: l };
  }
  var oc = Error(N(460)), Gf = Error(N(474)), ho = Error(N(542)), Cs = { then: function() {
  } };
  function ty(l) {
    return l = l.status, l === "fulfilled" || l === "rejected";
  }
  function yo() {
  }
  function ly(l, n, u) {
    switch (u = l[u], u === void 0 ? l.push(n) : u !== n && (n.then(yo, yo), n = u), n.status) {
      case "fulfilled":
        return n.value;
      case "rejected":
        throw l = n.reason, ay(l), l;
      default:
        if (typeof n.status == "string") n.then(yo, yo);
        else {
          if (l = Rt, l !== null && 100 < l.shellSuspendCounter)
            throw Error(N(482));
          l = n, l.status = "pending", l.then(
            function(c) {
              if (n.status === "pending") {
                var r = n;
                r.status = "fulfilled", r.value = c;
              }
            },
            function(c) {
              if (n.status === "pending") {
                var r = n;
                r.status = "rejected", r.reason = c;
              }
            }
          );
        }
        switch (n.status) {
          case "fulfilled":
            return n.value;
          case "rejected":
            throw l = n.reason, ay(l), l;
        }
        throw mo = n, oc;
    }
  }
  var mo = null;
  function Hs() {
    if (mo === null) throw Error(N(459));
    var l = mo;
    return mo = null, l;
  }
  function ay(l) {
    if (l === oc || l === ho)
      throw Error(N(483));
  }
  var Du = !1;
  function Lf(l) {
    l.updateQueue = {
      baseState: l.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function xs(l, n) {
    l = l.updateQueue, n.updateQueue === l && (n.updateQueue = {
      baseState: l.baseState,
      firstBaseUpdate: l.firstBaseUpdate,
      lastBaseUpdate: l.lastBaseUpdate,
      shared: l.shared,
      callbacks: null
    });
  }
  function zu(l) {
    return { lane: l, tag: 0, payload: null, callback: null, next: null };
  }
  function oa(l, n, u) {
    var c = l.updateQueue;
    if (c === null) return null;
    if (c = c.shared, (vt & 2) !== 0) {
      var r = c.pending;
      return r === null ? n.next = n : (n.next = r.next, r.next = n), c.pending = n, n = oi(l), to(l, null, u), n;
    }
    return sn(l, c, n, u), oi(l);
  }
  function fc(l, n, u) {
    if (n = n.updateQueue, n !== null && (n = n.shared, (u & 4194048) !== 0)) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, lt(l, u);
    }
  }
  function Vf(l, n) {
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
        s === null ? r = s = n : s = s.next = n;
      } else r = s = n;
      u = {
        baseState: c.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: s,
        shared: c.shared,
        callbacks: c.callbacks
      }, l.updateQueue = u;
      return;
    }
    l = u.lastBaseUpdate, l === null ? u.firstBaseUpdate = n : l.next = n, u.lastBaseUpdate = n;
  }
  var ny = !1;
  function Xf() {
    if (ny) {
      var l = Ja;
      if (l !== null) throw l;
    }
  }
  function po(l, n, u, c) {
    ny = !1;
    var r = l.updateQueue;
    Du = !1;
    var s = r.firstBaseUpdate, y = r.lastBaseUpdate, m = r.shared.pending;
    if (m !== null) {
      r.shared.pending = null;
      var S = m, U = S.next;
      S.next = null, y === null ? s = U : y.next = U, y = S;
      var Z = l.alternate;
      Z !== null && (Z = Z.updateQueue, m = Z.lastBaseUpdate, m !== y && (m === null ? Z.firstBaseUpdate = U : m.next = U, Z.lastBaseUpdate = S));
    }
    if (s !== null) {
      var k = r.baseState;
      y = 0, Z = U = S = null, m = s;
      do {
        var H = m.lane & -536870913, w = H !== m.lane;
        if (w ? (nt & H) === H : (c & H) === H) {
          H !== 0 && H === hi && (ny = !0), Z !== null && (Z = Z.next = {
            lane: 0,
            tag: m.tag,
            payload: m.payload,
            callback: null,
            next: null
          });
          e: {
            var Ee = l, Se = m;
            H = n;
            var dt = u;
            switch (Se.tag) {
              case 1:
                if (Ee = Se.payload, typeof Ee == "function") {
                  k = Ee.call(dt, k, H);
                  break e;
                }
                k = Ee;
                break e;
              case 3:
                Ee.flags = Ee.flags & -65537 | 128;
              case 0:
                if (Ee = Se.payload, H = typeof Ee == "function" ? Ee.call(dt, k, H) : Ee, H == null) break e;
                k = ie({}, k, H);
                break e;
              case 2:
                Du = !0;
            }
          }
          H = m.callback, H !== null && (l.flags |= 64, w && (l.flags |= 8192), w = r.callbacks, w === null ? r.callbacks = [H] : w.push(H));
        } else
          w = {
            lane: H,
            tag: m.tag,
            payload: m.payload,
            callback: m.callback,
            next: null
          }, Z === null ? (U = Z = w, S = k) : Z = Z.next = w, y |= H;
        if (m = m.next, m === null) {
          if (m = r.shared.pending, m === null)
            break;
          w = m, m = w.next, w.next = null, r.lastBaseUpdate = w, r.shared.pending = null;
        }
      } while (!0);
      Z === null && (S = k), r.baseState = S, r.firstBaseUpdate = U, r.lastBaseUpdate = Z, s === null && (r.shared.lanes = 0), Ai |= y, l.lanes = y, l.memoizedState = k;
    }
  }
  function vo(l, n) {
    if (typeof l != "function")
      throw Error(N(191, l));
    l.call(n);
  }
  function Ns(l, n) {
    var u = l.callbacks;
    if (u !== null)
      for (l.callbacks = null, l = 0; l < u.length; l++)
        vo(u[l], n);
  }
  var Mu = A(null), Qf = A(0);
  function uy(l, n) {
    l = Yu, Q(Qf, l), Q(Mu, n), Yu = l | n.baseLanes;
  }
  function rl() {
    Q(Qf, Yu), Q(Mu, Mu.current);
  }
  function go() {
    Yu = Qf.current, J(Mu), J(Qf);
  }
  var vn = 0, He = null, rt = null, Kt = null, rc = !1, sc = !1, fa = !1, Zf = 0, ka = 0, ra = null, qs = 0;
  function Jt() {
    throw Error(N(321));
  }
  function Kf(l, n) {
    if (n === null) return !1;
    for (var u = 0; u < n.length && u < l.length; u++)
      if (!kl(l[u], n[u])) return !1;
    return !0;
  }
  function Bs(l, n, u, c, r, s) {
    return vn = s, He = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, L.H = l === null || l.memoizedState === null ? Gp : Ry, fa = !1, s = u(c, r), fa = !1, sc && (s = yi(
      n,
      u,
      c,
      r
    )), iy(l), s;
  }
  function iy(l) {
    L.H = lr;
    var n = rt !== null && rt.next !== null;
    if (vn = 0, Kt = rt = He = null, rc = !1, ka = 0, ra = null, n) throw Error(N(300));
    l === null || $e || (l = l.dependencies, l !== null && Yf(l) && ($e = !0));
  }
  function yi(l, n, u, c) {
    He = l;
    var r = 0;
    do {
      if (sc && (ra = null), ka = 0, sc = !1, 25 <= r) throw Error(N(301));
      if (r += 1, Kt = rt = null, l.updateQueue != null) {
        var s = l.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      L.H = Lp, s = n(u, c);
    } while (sc);
    return s;
  }
  function xp() {
    var l = L.H, n = l.useState()[0];
    return n = typeof n.then == "function" ? dc(n) : n, l = l.useState()[0], (rt !== null ? rt.memoizedState : null) !== l && (He.flags |= 1024), n;
  }
  function Ys() {
    var l = Zf !== 0;
    return Zf = 0, l;
  }
  function ws(l, n, u) {
    n.updateQueue = l.updateQueue, n.flags &= -2053, l.lanes &= ~u;
  }
  function So(l) {
    if (rc) {
      for (l = l.memoizedState; l !== null; ) {
        var n = l.queue;
        n !== null && (n.pending = null), l = l.next;
      }
      rc = !1;
    }
    vn = 0, Kt = rt = He = null, sc = !1, ka = Zf = 0, ra = null;
  }
  function Wl() {
    var l = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Kt === null ? He.memoizedState = Kt = l : Kt = Kt.next = l, Kt;
  }
  function $t() {
    if (rt === null) {
      var l = He.alternate;
      l = l !== null ? l.memoizedState : null;
    } else l = rt.next;
    var n = Kt === null ? He.memoizedState : Kt.next;
    if (n !== null)
      Kt = n, rt = l;
    else {
      if (l === null)
        throw He.alternate === null ? Error(N(467)) : Error(N(310));
      rt = l, l = {
        memoizedState: rt.memoizedState,
        baseState: rt.baseState,
        baseQueue: rt.baseQueue,
        queue: rt.queue,
        next: null
      }, Kt === null ? He.memoizedState = Kt = l : Kt = Kt.next = l;
    }
    return Kt;
  }
  function Jf() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function dc(l) {
    var n = ka;
    return ka += 1, ra === null && (ra = []), l = ly(ra, l, n), n = He, (Kt === null ? n.memoizedState : Kt.next) === null && (n = n.alternate, L.H = n === null || n.memoizedState === null ? Gp : Ry), l;
  }
  function js(l) {
    if (l !== null && typeof l == "object") {
      if (typeof l.then == "function") return dc(l);
      if (l.$$typeof === Nt) return Ul(l);
    }
    throw Error(N(438, String(l)));
  }
  function sl(l) {
    var n = null, u = He.updateQueue;
    if (u !== null && (n = u.memoCache), n == null) {
      var c = He.alternate;
      c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (n = {
        data: c.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (n == null && (n = { data: [], index: 0 }), u === null && (u = Jf(), He.updateQueue = u), u.memoCache = n, u = n.data[n.index], u === void 0)
      for (u = n.data[n.index] = Array(l), c = 0; c < l; c++)
        u[c] = pe;
    return n.index++, u;
  }
  function Vn(l, n) {
    return typeof n == "function" ? n(l) : n;
  }
  function kf(l) {
    var n = $t();
    return Gs(n, rt, l);
  }
  function Gs(l, n, u) {
    var c = l.queue;
    if (c === null) throw Error(N(311));
    c.lastRenderedReducer = u;
    var r = l.baseQueue, s = c.pending;
    if (s !== null) {
      if (r !== null) {
        var y = r.next;
        r.next = s.next, s.next = y;
      }
      n.baseQueue = r = s, c.pending = null;
    }
    if (s = l.baseState, r === null) l.memoizedState = s;
    else {
      n = r.next;
      var m = y = null, S = null, U = n, Z = !1;
      do {
        var k = U.lane & -536870913;
        if (k !== U.lane ? (nt & k) === k : (vn & k) === k) {
          var H = U.revertLane;
          if (H === 0)
            S !== null && (S = S.next = {
              lane: 0,
              revertLane: 0,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), k === hi && (Z = !0);
          else if ((vn & H) === H) {
            U = U.next, H === hi && (Z = !0);
            continue;
          } else
            k = {
              lane: 0,
              revertLane: U.revertLane,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, S === null ? (m = S = k, y = s) : S = S.next = k, He.lanes |= H, Ai |= H;
          k = U.action, fa && u(s, k), s = U.hasEagerState ? U.eagerState : u(s, k);
        } else
          H = {
            lane: k,
            revertLane: U.revertLane,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, S === null ? (m = S = H, y = s) : S = S.next = H, He.lanes |= k, Ai |= k;
        U = U.next;
      } while (U !== null && U !== n);
      if (S === null ? y = s : S.next = m, !kl(s, l.memoizedState) && ($e = !0, Z && (u = Ja, u !== null)))
        throw u;
      l.memoizedState = s, l.baseState = y, l.baseQueue = S, c.lastRenderedState = s;
    }
    return r === null && (c.lanes = 0), [l.memoizedState, c.dispatch];
  }
  function Ls(l) {
    var n = $t(), u = n.queue;
    if (u === null) throw Error(N(311));
    u.lastRenderedReducer = l;
    var c = u.dispatch, r = u.pending, s = n.memoizedState;
    if (r !== null) {
      u.pending = null;
      var y = r = r.next;
      do
        s = l(s, y.action), y = y.next;
      while (y !== r);
      kl(s, n.memoizedState) || ($e = !0), n.memoizedState = s, n.baseQueue === null && (n.baseState = s), u.lastRenderedState = s;
    }
    return [s, c];
  }
  function cy(l, n, u) {
    var c = He, r = $t(), s = je;
    if (s) {
      if (u === void 0) throw Error(N(407));
      u = u();
    } else u = n();
    var y = !kl(
      (rt || r).memoizedState,
      u
    );
    y && (r.memoizedState = u, $e = !0), r = r.queue;
    var m = oy.bind(null, c, r, l);
    if (Uu(2048, 8, m, [l]), r.getSnapshot !== n || y || Kt !== null && Kt.memoizedState.tag & 1) {
      if (c.flags |= 2048, mi(
        9,
        $a(),
        Vs.bind(
          null,
          c,
          r,
          u,
          n
        ),
        null
      ), Rt === null) throw Error(N(349));
      s || (vn & 124) !== 0 || $f(c, n, u);
    }
    return u;
  }
  function $f(l, n, u) {
    l.flags |= 16384, l = { getSnapshot: n, value: u }, n = He.updateQueue, n === null ? (n = Jf(), He.updateQueue = n, n.stores = [l]) : (u = n.stores, u === null ? n.stores = [l] : u.push(l));
  }
  function Vs(l, n, u, c) {
    n.value = u, n.getSnapshot = c, fy(n) && ry(l);
  }
  function oy(l, n, u) {
    return u(function() {
      fy(n) && ry(l);
    });
  }
  function fy(l) {
    var n = l.getSnapshot;
    l = l.value;
    try {
      var u = n();
      return !kl(l, u);
    } catch {
      return !0;
    }
  }
  function ry(l) {
    var n = Tu(l, 2);
    n !== null && ga(n, l, 2);
  }
  function Wf(l) {
    var n = Wl();
    if (typeof l == "function") {
      var u = l;
      if (l = u(), fa) {
        Ga(!0);
        try {
          u();
        } finally {
          Ga(!1);
        }
      }
    }
    return n.memoizedState = n.baseState = l, n.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vn,
      lastRenderedState: l
    }, n;
  }
  function Xs(l, n, u, c) {
    return l.baseState = u, Gs(
      l,
      rt,
      typeof c == "function" ? c : Vn
    );
  }
  function sy(l, n, u, c, r) {
    if (Eo(l)) throw Error(N(485));
    if (l = n.action, l !== null) {
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
      L.T !== null ? u(!0) : s.isTransition = !1, c(s), u = n.pending, u === null ? (s.next = n.pending = s, dy(n, s)) : (s.next = u.next, n.pending = u.next = s);
    }
  }
  function dy(l, n) {
    var u = n.action, c = n.payload, r = l.state;
    if (n.isTransition) {
      var s = L.T, y = {};
      L.T = y;
      try {
        var m = u(r, c), S = L.S;
        S !== null && S(y, m), Qs(l, n, m);
      } catch (U) {
        If(l, n, U);
      } finally {
        L.T = s;
      }
    } else
      try {
        s = u(r, c), Qs(l, n, s);
      } catch (U) {
        If(l, n, U);
      }
  }
  function Qs(l, n, u) {
    u !== null && typeof u == "object" && typeof u.then == "function" ? u.then(
      function(c) {
        Ff(l, n, c);
      },
      function(c) {
        return If(l, n, c);
      }
    ) : Ff(l, n, u);
  }
  function Ff(l, n, u) {
    n.status = "fulfilled", n.value = u, hy(n), l.state = u, n = l.pending, n !== null && (u = n.next, u === n ? l.pending = null : (u = u.next, n.next = u, dy(l, u)));
  }
  function If(l, n, u) {
    var c = l.pending;
    if (l.pending = null, c !== null) {
      c = c.next;
      do
        n.status = "rejected", n.reason = u, hy(n), n = n.next;
      while (n !== c);
    }
    l.action = null;
  }
  function hy(l) {
    l = l.listeners;
    for (var n = 0; n < l.length; n++) (0, l[n])();
  }
  function yy(l, n) {
    return n;
  }
  function Zs(l, n) {
    if (je) {
      var u = Rt.formState;
      if (u !== null) {
        e: {
          var c = He;
          if (je) {
            if (Et) {
              t: {
                for (var r = Et, s = $l; r.nodeType !== 8; ) {
                  if (!s) {
                    r = null;
                    break t;
                  }
                  if (r = Mn(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break t;
                  }
                }
                s = r.data, r = s === "F!" || s === "F" ? r : null;
              }
              if (r) {
                Et = Mn(
                  r.nextSibling
                ), c = r.data === "F!";
                break e;
              }
            }
            mn(c);
          }
          c = !1;
        }
        c && (n = u[0]);
      }
    }
    return u = Wl(), u.memoizedState = u.baseState = n, c = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: yy,
      lastRenderedState: n
    }, u.queue = c, u = ks.bind(
      null,
      He,
      c
    ), c.dispatch = u, c = Wf(!1), s = er.bind(
      null,
      He,
      !1,
      c.queue
    ), c = Wl(), r = {
      state: n,
      dispatch: null,
      action: l,
      pending: null
    }, c.queue = r, u = sy.bind(
      null,
      He,
      r,
      s,
      u
    ), r.dispatch = u, c.memoizedState = l, [n, u, !1];
  }
  function my(l) {
    var n = $t();
    return Xn(n, rt, l);
  }
  function Xn(l, n, u) {
    if (n = Gs(
      l,
      n,
      yy
    )[0], l = kf(Vn)[0], typeof n == "object" && n !== null && typeof n.then == "function")
      try {
        var c = dc(n);
      } catch (y) {
        throw y === oc ? ho : y;
      }
    else c = n;
    n = $t();
    var r = n.queue, s = r.dispatch;
    return u !== n.memoizedState && (He.flags |= 2048, mi(
      9,
      $a(),
      py.bind(null, r, u),
      null
    )), [c, s, l];
  }
  function py(l, n) {
    l.action = n;
  }
  function Np(l) {
    var n = $t(), u = rt;
    if (u !== null)
      return Xn(n, u, l);
    $t(), n = n.memoizedState, u = $t();
    var c = u.queue.dispatch;
    return u.memoizedState = l, [n, c, !1];
  }
  function mi(l, n, u, c) {
    return l = { tag: l, create: u, deps: c, inst: n, next: null }, n = He.updateQueue, n === null && (n = Jf(), He.updateQueue = n), u = n.lastEffect, u === null ? n.lastEffect = l.next = l : (c = u.next, u.next = l, l.next = c, n.lastEffect = l), l;
  }
  function $a() {
    return { destroy: void 0, resource: void 0 };
  }
  function vy() {
    return $t().memoizedState;
  }
  function hc(l, n, u, c) {
    var r = Wl();
    c = c === void 0 ? null : c, He.flags |= l, r.memoizedState = mi(
      1 | n,
      $a(),
      u,
      c
    );
  }
  function Uu(l, n, u, c) {
    var r = $t();
    c = c === void 0 ? null : c;
    var s = r.memoizedState.inst;
    rt !== null && c !== null && Kf(c, rt.memoizedState.deps) ? r.memoizedState = mi(n, s, u, c) : (He.flags |= l, r.memoizedState = mi(
      1 | n,
      s,
      u,
      c
    ));
  }
  function Bt(l, n) {
    hc(8390656, 8, l, n);
  }
  function qp(l, n) {
    Uu(2048, 8, l, n);
  }
  function Bp(l, n) {
    return Uu(4, 2, l, n);
  }
  function gy(l, n) {
    return Uu(4, 4, l, n);
  }
  function gn(l, n) {
    if (typeof n == "function") {
      l = l();
      var u = n(l);
      return function() {
        typeof u == "function" ? u() : n(null);
      };
    }
    if (n != null)
      return l = l(), n.current = l, function() {
        n.current = null;
      };
  }
  function Sy(l, n, u) {
    u = u != null ? u.concat([l]) : null, Uu(4, 4, gn.bind(null, n, l), u);
  }
  function Pf() {
  }
  function bo(l, n) {
    var u = $t();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    return n !== null && Kf(n, c[1]) ? c[0] : (u.memoizedState = [l, n], l);
  }
  function yc(l, n) {
    var u = $t();
    n = n === void 0 ? null : n;
    var c = u.memoizedState;
    if (n !== null && Kf(n, c[1]))
      return c[0];
    if (c = l(), fa) {
      Ga(!0);
      try {
        l();
      } finally {
        Ga(!1);
      }
    }
    return u.memoizedState = [c, n], c;
  }
  function Ks(l, n, u) {
    return u === void 0 || (vn & 1073741824) !== 0 ? l.memoizedState = n : (l.memoizedState = u, l = Pp(), He.lanes |= l, Ai |= l, u);
  }
  function Js(l, n, u, c) {
    return kl(u, n) ? u : Mu.current !== null ? (l = Ks(l, u, c), kl(l, n) || ($e = !0), l) : (vn & 42) === 0 ? ($e = !0, l.memoizedState = u) : (l = Pp(), He.lanes |= l, Ai |= l, n);
  }
  function by(l, n, u, c, r) {
    var s = Y.p;
    Y.p = s !== 0 && 8 > s ? s : 8;
    var y = L.T, m = {};
    L.T = m, er(l, !1, n, u);
    try {
      var S = r(), U = L.S;
      if (U !== null && U(m, S), S !== null && typeof S == "object" && typeof S.then == "function") {
        var Z = Ph(
          S,
          c
        );
        To(
          l,
          n,
          Z,
          Ha(l)
        );
      } else
        To(
          l,
          n,
          c,
          Ha(l)
        );
    } catch (k) {
      To(
        l,
        n,
        { then: function() {
        }, status: "rejected", reason: k },
        Ha()
      );
    } finally {
      Y.p = s, L.T = y;
    }
  }
  function bg() {
  }
  function Ty(l, n, u, c) {
    if (l.tag !== 5) throw Error(N(476));
    var r = Ey(l).queue;
    by(
      l,
      r,
      n,
      I,
      u === null ? bg : function() {
        return Yp(l), u(c);
      }
    );
  }
  function Ey(l) {
    var n = l.memoizedState;
    if (n !== null) return n;
    n = {
      memoizedState: I,
      baseState: I,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vn,
        lastRenderedState: I
      },
      next: null
    };
    var u = {};
    return n.next = {
      memoizedState: u,
      baseState: u,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vn,
        lastRenderedState: u
      },
      next: null
    }, l.memoizedState = n, l = l.alternate, l !== null && (l.memoizedState = n), n;
  }
  function Yp(l) {
    var n = Ey(l).next.queue;
    To(l, n, {}, Ha());
  }
  function mc() {
    return Ul(xl);
  }
  function Sn() {
    return $t().memoizedState;
  }
  function Ay() {
    return $t().memoizedState;
  }
  function Tg(l) {
    for (var n = l.return; n !== null; ) {
      switch (n.tag) {
        case 24:
        case 3:
          var u = Ha();
          l = zu(u);
          var c = oa(n, l, u);
          c !== null && (ga(c, n, u), fc(c, n, u)), n = { cache: Ih() }, l.payload = n;
          return;
      }
      n = n.return;
    }
  }
  function wp(l, n, u) {
    var c = Ha();
    u = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Eo(l) ? tr(n, u) : (u = uc(l, n, u, c), u !== null && (ga(u, l, c), jp(u, n, c)));
  }
  function ks(l, n, u) {
    var c = Ha();
    To(l, n, u, c);
  }
  function To(l, n, u, c) {
    var r = {
      lane: c,
      revertLane: 0,
      action: u,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Eo(l)) tr(n, r);
    else {
      var s = l.alternate;
      if (l.lanes === 0 && (s === null || s.lanes === 0) && (s = n.lastRenderedReducer, s !== null))
        try {
          var y = n.lastRenderedState, m = s(y, u);
          if (r.hasEagerState = !0, r.eagerState = m, kl(m, y))
            return sn(l, n, r, 0), Rt === null && rn(), !1;
        } catch {
        } finally {
        }
      if (u = uc(l, n, r, c), u !== null)
        return ga(u, l, c), jp(u, n, c), !0;
    }
    return !1;
  }
  function er(l, n, u, c) {
    if (c = {
      lane: 2,
      revertLane: bd(),
      action: c,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Eo(l)) {
      if (n) throw Error(N(479));
    } else
      n = uc(
        l,
        u,
        c,
        2
      ), n !== null && ga(n, l, 2);
  }
  function Eo(l) {
    var n = l.alternate;
    return l === He || n !== null && n === He;
  }
  function tr(l, n) {
    sc = rc = !0;
    var u = l.pending;
    u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n;
  }
  function jp(l, n, u) {
    if ((u & 4194048) !== 0) {
      var c = n.lanes;
      c &= l.pendingLanes, u |= c, n.lanes = u, lt(l, u);
    }
  }
  var lr = {
    readContext: Ul,
    use: js,
    useCallback: Jt,
    useContext: Jt,
    useEffect: Jt,
    useImperativeHandle: Jt,
    useLayoutEffect: Jt,
    useInsertionEffect: Jt,
    useMemo: Jt,
    useReducer: Jt,
    useRef: Jt,
    useState: Jt,
    useDebugValue: Jt,
    useDeferredValue: Jt,
    useTransition: Jt,
    useSyncExternalStore: Jt,
    useId: Jt,
    useHostTransitionStatus: Jt,
    useFormState: Jt,
    useActionState: Jt,
    useOptimistic: Jt,
    useMemoCache: Jt,
    useCacheRefresh: Jt
  }, Gp = {
    readContext: Ul,
    use: js,
    useCallback: function(l, n) {
      return Wl().memoizedState = [
        l,
        n === void 0 ? null : n
      ], l;
    },
    useContext: Ul,
    useEffect: Bt,
    useImperativeHandle: function(l, n, u) {
      u = u != null ? u.concat([l]) : null, hc(
        4194308,
        4,
        gn.bind(null, n, l),
        u
      );
    },
    useLayoutEffect: function(l, n) {
      return hc(4194308, 4, l, n);
    },
    useInsertionEffect: function(l, n) {
      hc(4, 2, l, n);
    },
    useMemo: function(l, n) {
      var u = Wl();
      n = n === void 0 ? null : n;
      var c = l();
      if (fa) {
        Ga(!0);
        try {
          l();
        } finally {
          Ga(!1);
        }
      }
      return u.memoizedState = [c, n], c;
    },
    useReducer: function(l, n, u) {
      var c = Wl();
      if (u !== void 0) {
        var r = u(n);
        if (fa) {
          Ga(!0);
          try {
            u(n);
          } finally {
            Ga(!1);
          }
        }
      } else r = n;
      return c.memoizedState = c.baseState = r, l = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: l,
        lastRenderedState: r
      }, c.queue = l, l = l.dispatch = wp.bind(
        null,
        He,
        l
      ), [c.memoizedState, l];
    },
    useRef: function(l) {
      var n = Wl();
      return l = { current: l }, n.memoizedState = l;
    },
    useState: function(l) {
      l = Wf(l);
      var n = l.queue, u = ks.bind(null, He, n);
      return n.dispatch = u, [l.memoizedState, u];
    },
    useDebugValue: Pf,
    useDeferredValue: function(l, n) {
      var u = Wl();
      return Ks(u, l, n);
    },
    useTransition: function() {
      var l = Wf(!1);
      return l = by.bind(
        null,
        He,
        l.queue,
        !0,
        !1
      ), Wl().memoizedState = l, [!1, l];
    },
    useSyncExternalStore: function(l, n, u) {
      var c = He, r = Wl();
      if (je) {
        if (u === void 0)
          throw Error(N(407));
        u = u();
      } else {
        if (u = n(), Rt === null)
          throw Error(N(349));
        (nt & 124) !== 0 || $f(c, n, u);
      }
      r.memoizedState = u;
      var s = { value: u, getSnapshot: n };
      return r.queue = s, Bt(oy.bind(null, c, s, l), [
        l
      ]), c.flags |= 2048, mi(
        9,
        $a(),
        Vs.bind(
          null,
          c,
          s,
          u,
          n
        ),
        null
      ), u;
    },
    useId: function() {
      var l = Wl(), n = Rt.identifierPrefix;
      if (je) {
        var u = yn, c = hn;
        u = (c & ~(1 << 32 - Ol(c) - 1)).toString(32) + u, n = "«" + n + "R" + u, u = Zf++, 0 < u && (n += "H" + u.toString(32)), n += "»";
      } else
        u = qs++, n = "«" + n + "r" + u.toString(32) + "»";
      return l.memoizedState = n;
    },
    useHostTransitionStatus: mc,
    useFormState: Zs,
    useActionState: Zs,
    useOptimistic: function(l) {
      var n = Wl();
      n.memoizedState = n.baseState = l;
      var u = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return n.queue = u, n = er.bind(
        null,
        He,
        !0,
        u
      ), u.dispatch = n, [l, n];
    },
    useMemoCache: sl,
    useCacheRefresh: function() {
      return Wl().memoizedState = Tg.bind(
        null,
        He
      );
    }
  }, Ry = {
    readContext: Ul,
    use: js,
    useCallback: bo,
    useContext: Ul,
    useEffect: qp,
    useImperativeHandle: Sy,
    useInsertionEffect: Bp,
    useLayoutEffect: gy,
    useMemo: yc,
    useReducer: kf,
    useRef: vy,
    useState: function() {
      return kf(Vn);
    },
    useDebugValue: Pf,
    useDeferredValue: function(l, n) {
      var u = $t();
      return Js(
        u,
        rt.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = kf(Vn)[0], n = $t().memoizedState;
      return [
        typeof l == "boolean" ? l : dc(l),
        n
      ];
    },
    useSyncExternalStore: cy,
    useId: Sn,
    useHostTransitionStatus: mc,
    useFormState: my,
    useActionState: my,
    useOptimistic: function(l, n) {
      var u = $t();
      return Xs(u, rt, l, n);
    },
    useMemoCache: sl,
    useCacheRefresh: Ay
  }, Lp = {
    readContext: Ul,
    use: js,
    useCallback: bo,
    useContext: Ul,
    useEffect: qp,
    useImperativeHandle: Sy,
    useInsertionEffect: Bp,
    useLayoutEffect: gy,
    useMemo: yc,
    useReducer: Ls,
    useRef: vy,
    useState: function() {
      return Ls(Vn);
    },
    useDebugValue: Pf,
    useDeferredValue: function(l, n) {
      var u = $t();
      return rt === null ? Ks(u, l, n) : Js(
        u,
        rt.memoizedState,
        l,
        n
      );
    },
    useTransition: function() {
      var l = Ls(Vn)[0], n = $t().memoizedState;
      return [
        typeof l == "boolean" ? l : dc(l),
        n
      ];
    },
    useSyncExternalStore: cy,
    useId: Sn,
    useHostTransitionStatus: mc,
    useFormState: Np,
    useActionState: Np,
    useOptimistic: function(l, n) {
      var u = $t();
      return rt !== null ? Xs(u, rt, l, n) : (u.baseState = l, [l, u.queue.dispatch]);
    },
    useMemoCache: sl,
    useCacheRefresh: Ay
  }, sa = null, Ao = 0;
  function ar(l) {
    var n = Ao;
    return Ao += 1, sa === null && (sa = []), ly(sa, l, n);
  }
  function nr(l, n) {
    n = n.props.ref, l.ref = n !== void 0 ? n : null;
  }
  function Ro(l, n) {
    throw n.$$typeof === Ve ? Error(N(525)) : (l = Object.prototype.toString.call(n), Error(
      N(
        31,
        l === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : l
      )
    ));
  }
  function da(l) {
    var n = l._init;
    return n(l._payload);
  }
  function Oy(l) {
    function n(M, O) {
      if (l) {
        var _ = M.deletions;
        _ === null ? (M.deletions = [O], M.flags |= 16) : _.push(O);
      }
    }
    function u(M, O) {
      if (!l) return null;
      for (; O !== null; )
        n(M, O), O = O.sibling;
      return null;
    }
    function c(M) {
      for (var O = /* @__PURE__ */ new Map(); M !== null; )
        M.key !== null ? O.set(M.key, M) : O.set(M.index, M), M = M.sibling;
      return O;
    }
    function r(M, O) {
      return M = dn(M, O), M.index = 0, M.sibling = null, M;
    }
    function s(M, O, _) {
      return M.index = _, l ? (_ = M.alternate, _ !== null ? (_ = _.index, _ < O ? (M.flags |= 67108866, O) : _) : (M.flags |= 67108866, O)) : (M.flags |= 1048576, O);
    }
    function y(M) {
      return l && M.alternate === null && (M.flags |= 67108866), M;
    }
    function m(M, O, _, K) {
      return O === null || O.tag !== 6 ? (O = fi(_, M.mode, K), O.return = M, O) : (O = r(O, _), O.return = M, O);
    }
    function S(M, O, _, K) {
      var fe = _.type;
      return fe === ce ? Z(
        M,
        O,
        _.props.children,
        K,
        _.key
      ) : O !== null && (O.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === ke && da(fe) === O.type) ? (O = r(O, _.props), nr(O, _), O.return = M, O) : (O = we(
        _.type,
        _.key,
        _.props,
        null,
        M.mode,
        K
      ), nr(O, _), O.return = M, O);
    }
    function U(M, O, _, K) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== _.containerInfo || O.stateNode.implementation !== _.implementation ? (O = lo(_, M.mode, K), O.return = M, O) : (O = r(O, _.children || []), O.return = M, O);
    }
    function Z(M, O, _, K, fe) {
      return O === null || O.tag !== 7 ? (O = F(
        _,
        M.mode,
        K,
        fe
      ), O.return = M, O) : (O = r(O, _), O.return = M, O);
    }
    function k(M, O, _) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return O = fi(
          "" + O,
          M.mode,
          _
        ), O.return = M, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case $:
            return _ = we(
              O.type,
              O.key,
              O.props,
              null,
              M.mode,
              _
            ), nr(_, O), _.return = M, _;
          case C:
            return O = lo(
              O,
              M.mode,
              _
            ), O.return = M, O;
          case ke:
            var K = O._init;
            return O = K(O._payload), k(M, O, _);
        }
        if (ut(O) || ye(O))
          return O = F(
            O,
            M.mode,
            _,
            null
          ), O.return = M, O;
        if (typeof O.then == "function")
          return k(M, ar(O), _);
        if (O.$$typeof === Nt)
          return k(
            M,
            co(M, O),
            _
          );
        Ro(M, O);
      }
      return null;
    }
    function H(M, O, _, K) {
      var fe = O !== null ? O.key : null;
      if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint")
        return fe !== null ? null : m(M, O, "" + _, K);
      if (typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case $:
            return _.key === fe ? S(M, O, _, K) : null;
          case C:
            return _.key === fe ? U(M, O, _, K) : null;
          case ke:
            return fe = _._init, _ = fe(_._payload), H(M, O, _, K);
        }
        if (ut(_) || ye(_))
          return fe !== null ? null : Z(M, O, _, K, null);
        if (typeof _.then == "function")
          return H(
            M,
            O,
            ar(_),
            K
          );
        if (_.$$typeof === Nt)
          return H(
            M,
            O,
            co(M, _),
            K
          );
        Ro(M, _);
      }
      return null;
    }
    function w(M, O, _, K, fe) {
      if (typeof K == "string" && K !== "" || typeof K == "number" || typeof K == "bigint")
        return M = M.get(_) || null, m(O, M, "" + K, fe);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case $:
            return M = M.get(
              K.key === null ? _ : K.key
            ) || null, S(O, M, K, fe);
          case C:
            return M = M.get(
              K.key === null ? _ : K.key
            ) || null, U(O, M, K, fe);
          case ke:
            var Ge = K._init;
            return K = Ge(K._payload), w(
              M,
              O,
              _,
              K,
              fe
            );
        }
        if (ut(K) || ye(K))
          return M = M.get(_) || null, Z(O, M, K, fe, null);
        if (typeof K.then == "function")
          return w(
            M,
            O,
            _,
            ar(K),
            fe
          );
        if (K.$$typeof === Nt)
          return w(
            M,
            O,
            _,
            co(O, K),
            fe
          );
        Ro(O, K);
      }
      return null;
    }
    function Ee(M, O, _, K) {
      for (var fe = null, Ge = null, ge = O, Re = O = 0, El = null; ge !== null && Re < _.length; Re++) {
        ge.index > Re ? (El = ge, ge = null) : El = ge.sibling;
        var ot = H(
          M,
          ge,
          _[Re],
          K
        );
        if (ot === null) {
          ge === null && (ge = El);
          break;
        }
        l && ge && ot.alternate === null && n(M, ge), O = s(ot, O, Re), Ge === null ? fe = ot : Ge.sibling = ot, Ge = ot, ge = El;
      }
      if (Re === _.length)
        return u(M, ge), je && al(M, Re), fe;
      if (ge === null) {
        for (; Re < _.length; Re++)
          ge = k(M, _[Re], K), ge !== null && (O = s(
            ge,
            O,
            Re
          ), Ge === null ? fe = ge : Ge.sibling = ge, Ge = ge);
        return je && al(M, Re), fe;
      }
      for (ge = c(ge); Re < _.length; Re++)
        El = w(
          ge,
          M,
          Re,
          _[Re],
          K
        ), El !== null && (l && El.alternate !== null && ge.delete(
          El.key === null ? Re : El.key
        ), O = s(
          El,
          O,
          Re
        ), Ge === null ? fe = El : Ge.sibling = El, Ge = El);
      return l && ge.forEach(function(In) {
        return n(M, In);
      }), je && al(M, Re), fe;
    }
    function Se(M, O, _, K) {
      if (_ == null) throw Error(N(151));
      for (var fe = null, Ge = null, ge = O, Re = O = 0, El = null, ot = _.next(); ge !== null && !ot.done; Re++, ot = _.next()) {
        ge.index > Re ? (El = ge, ge = null) : El = ge.sibling;
        var In = H(M, ge, ot.value, K);
        if (In === null) {
          ge === null && (ge = El);
          break;
        }
        l && ge && In.alternate === null && n(M, ge), O = s(In, O, Re), Ge === null ? fe = In : Ge.sibling = In, Ge = In, ge = El;
      }
      if (ot.done)
        return u(M, ge), je && al(M, Re), fe;
      if (ge === null) {
        for (; !ot.done; Re++, ot = _.next())
          ot = k(M, ot.value, K), ot !== null && (O = s(ot, O, Re), Ge === null ? fe = ot : Ge.sibling = ot, Ge = ot);
        return je && al(M, Re), fe;
      }
      for (ge = c(ge); !ot.done; Re++, ot = _.next())
        ot = w(ge, M, Re, ot.value, K), ot !== null && (l && ot.alternate !== null && ge.delete(ot.key === null ? Re : ot.key), O = s(ot, O, Re), Ge === null ? fe = ot : Ge.sibling = ot, Ge = ot);
      return l && ge.forEach(function(Cg) {
        return n(M, Cg);
      }), je && al(M, Re), fe;
    }
    function dt(M, O, _, K) {
      if (typeof _ == "object" && _ !== null && _.type === ce && _.key === null && (_ = _.props.children), typeof _ == "object" && _ !== null) {
        switch (_.$$typeof) {
          case $:
            e: {
              for (var fe = _.key; O !== null; ) {
                if (O.key === fe) {
                  if (fe = _.type, fe === ce) {
                    if (O.tag === 7) {
                      u(
                        M,
                        O.sibling
                      ), K = r(
                        O,
                        _.props.children
                      ), K.return = M, M = K;
                      break e;
                    }
                  } else if (O.elementType === fe || typeof fe == "object" && fe !== null && fe.$$typeof === ke && da(fe) === O.type) {
                    u(
                      M,
                      O.sibling
                    ), K = r(O, _.props), nr(K, _), K.return = M, M = K;
                    break e;
                  }
                  u(M, O);
                  break;
                } else n(M, O);
                O = O.sibling;
              }
              _.type === ce ? (K = F(
                _.props.children,
                M.mode,
                K,
                _.key
              ), K.return = M, M = K) : (K = we(
                _.type,
                _.key,
                _.props,
                null,
                M.mode,
                K
              ), nr(K, _), K.return = M, M = K);
            }
            return y(M);
          case C:
            e: {
              for (fe = _.key; O !== null; ) {
                if (O.key === fe)
                  if (O.tag === 4 && O.stateNode.containerInfo === _.containerInfo && O.stateNode.implementation === _.implementation) {
                    u(
                      M,
                      O.sibling
                    ), K = r(O, _.children || []), K.return = M, M = K;
                    break e;
                  } else {
                    u(M, O);
                    break;
                  }
                else n(M, O);
                O = O.sibling;
              }
              K = lo(_, M.mode, K), K.return = M, M = K;
            }
            return y(M);
          case ke:
            return fe = _._init, _ = fe(_._payload), dt(
              M,
              O,
              _,
              K
            );
        }
        if (ut(_))
          return Ee(
            M,
            O,
            _,
            K
          );
        if (ye(_)) {
          if (fe = ye(_), typeof fe != "function") throw Error(N(150));
          return _ = fe.call(_), Se(
            M,
            O,
            _,
            K
          );
        }
        if (typeof _.then == "function")
          return dt(
            M,
            O,
            ar(_),
            K
          );
        if (_.$$typeof === Nt)
          return dt(
            M,
            O,
            co(M, _),
            K
          );
        Ro(M, _);
      }
      return typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint" ? (_ = "" + _, O !== null && O.tag === 6 ? (u(M, O.sibling), K = r(O, _), K.return = M, M = K) : (u(M, O), K = fi(_, M.mode, K), K.return = M, M = K), y(M)) : u(M, O);
    }
    return function(M, O, _, K) {
      try {
        Ao = 0;
        var fe = dt(
          M,
          O,
          _,
          K
        );
        return sa = null, fe;
      } catch (ge) {
        if (ge === oc || ge === ho) throw ge;
        var Ge = ua(29, ge, null, M.mode);
        return Ge.lanes = K, Ge.return = M, Ge;
      } finally {
      }
    };
  }
  var vl = Oy(!0), Dy = Oy(!1), ul = A(null), bn = null;
  function ha(l) {
    var n = l.alternate;
    Q(el, el.current & 1), Q(ul, l), bn === null && (n === null || Mu.current !== null || n.memoizedState !== null) && (bn = l);
  }
  function zy(l) {
    if (l.tag === 22) {
      if (Q(el, el.current), Q(ul, l), bn === null) {
        var n = l.alternate;
        n !== null && n.memoizedState !== null && (bn = l);
      }
    } else Ll();
  }
  function Ll() {
    Q(el, el.current), Q(ul, ul.current);
  }
  function Tn(l) {
    J(ul), bn === l && (bn = null), J(el);
  }
  var el = A(0);
  function Ma(l) {
    for (var n = l; n !== null; ) {
      if (n.tag === 13) {
        var u = n.memoizedState;
        if (u !== null && (u = u.dehydrated, u === null || u.data === "$?" || hm(u)))
          return n;
      } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
        if ((n.flags & 128) !== 0) return n;
      } else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === l) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === l) return null;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return null;
  }
  function $s(l, n, u, c) {
    n = l.memoizedState, u = u(c, n), u = u == null ? n : ie({}, n, u), l.memoizedState = u, l.lanes === 0 && (l.updateQueue.baseState = u);
  }
  var pi = {
    enqueueSetState: function(l, n, u) {
      l = l._reactInternals;
      var c = Ha(), r = zu(c);
      r.payload = n, u != null && (r.callback = u), n = oa(l, r, c), n !== null && (ga(n, l, c), fc(n, l, c));
    },
    enqueueReplaceState: function(l, n, u) {
      l = l._reactInternals;
      var c = Ha(), r = zu(c);
      r.tag = 1, r.payload = n, u != null && (r.callback = u), n = oa(l, r, c), n !== null && (ga(n, l, c), fc(n, l, c));
    },
    enqueueForceUpdate: function(l, n) {
      l = l._reactInternals;
      var u = Ha(), c = zu(u);
      c.tag = 2, n != null && (c.callback = n), n = oa(l, c, u), n !== null && (ga(n, l, u), fc(n, l, u));
    }
  };
  function My(l, n, u, c, r, s, y) {
    return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(c, s, y) : n.prototype && n.prototype.isPureReactComponent ? !Su(u, c) || !Su(r, s) : !0;
  }
  function Oo(l, n, u, c) {
    l = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(u, c), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(u, c), n.state !== l && pi.enqueueReplaceState(n, n.state, null);
  }
  function Wa(l, n) {
    var u = n;
    if ("ref" in n) {
      u = {};
      for (var c in n)
        c !== "ref" && (u[c] = n[c]);
    }
    if (l = l.defaultProps) {
      u === n && (u = ie({}, u));
      for (var r in l)
        u[r] === void 0 && (u[r] = l[r]);
    }
    return u;
  }
  var ur = typeof reportError == "function" ? reportError : function(l) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var n = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
        error: l
      });
      if (!window.dispatchEvent(n)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", l);
      return;
    }
    console.error(l);
  };
  function Uy(l) {
    ur(l);
  }
  function Do(l) {
    console.error(l);
  }
  function _y(l) {
    ur(l);
  }
  function pc(l, n) {
    try {
      var u = l.onUncaughtError;
      u(n.value, { componentStack: n.stack });
    } catch (c) {
      setTimeout(function() {
        throw c;
      });
    }
  }
  function Cy(l, n, u) {
    try {
      var c = l.onCaughtError;
      c(u.value, {
        componentStack: u.stack,
        errorBoundary: n.tag === 1 ? n.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Ws(l, n, u) {
    return u = zu(u), u.tag = 3, u.payload = { element: null }, u.callback = function() {
      pc(l, n);
    }, u;
  }
  function Vp(l) {
    return l = zu(l), l.tag = 3, l;
  }
  function Hy(l, n, u, c) {
    var r = u.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var s = c.value;
      l.payload = function() {
        return r(s);
      }, l.callback = function() {
        Cy(n, u, c);
      };
    }
    var y = u.stateNode;
    y !== null && typeof y.componentDidCatch == "function" && (l.callback = function() {
      Cy(n, u, c), typeof r != "function" && (Qn === null ? Qn = /* @__PURE__ */ new Set([this]) : Qn.add(this));
      var m = c.stack;
      this.componentDidCatch(c.value, {
        componentStack: m !== null ? m : ""
      });
    });
  }
  function Ua(l, n, u, c, r) {
    if (u.flags |= 32768, c !== null && typeof c == "object" && typeof c.then == "function") {
      if (n = u.alternate, n !== null && Bf(
        n,
        u,
        r,
        !0
      ), u = ul.current, u !== null) {
        switch (u.tag) {
          case 13:
            return bn === null ? zi() : u.alternate === null && Ft === 0 && (Ft = 3), u.flags &= -257, u.flags |= 65536, u.lanes = r, c === Cs ? u.flags |= 16384 : (n = u.updateQueue, n === null ? u.updateQueue = /* @__PURE__ */ new Set([c]) : n.add(c), hr(l, c, r)), !1;
          case 22:
            return u.flags |= 65536, c === Cs ? u.flags |= 16384 : (n = u.updateQueue, n === null ? (n = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([c])
            }, u.updateQueue = n) : (u = n.retryQueue, u === null ? n.retryQueue = /* @__PURE__ */ new Set([c]) : u.add(c)), hr(l, c, r)), !1;
        }
        throw Error(N(435, u.tag));
      }
      return hr(l, c, r), zi(), !1;
    }
    if (je)
      return n = ul.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = r, c !== Nf && (l = Error(N(422), { cause: c }), io(Da(l, u)))) : (c !== Nf && (n = Error(N(423), {
        cause: c
      }), io(
        Da(n, u)
      )), l = l.current.alternate, l.flags |= 65536, r &= -r, l.lanes |= r, c = Da(c, u), r = Ws(
        l.stateNode,
        c,
        r
      ), Vf(l, r), Ft !== 4 && (Ft = 2)), !1;
    var s = Error(N(520), { cause: c });
    if (s = Da(s, u), rr === null ? rr = [s] : rr.push(s), Ft !== 4 && (Ft = 2), n === null) return !0;
    c = Da(c, u), u = n;
    do {
      switch (u.tag) {
        case 3:
          return u.flags |= 65536, l = r & -r, u.lanes |= l, l = Ws(u.stateNode, c, l), Vf(u, l), !1;
        case 1:
          if (n = u.type, s = u.stateNode, (u.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (Qn === null || !Qn.has(s))))
            return u.flags |= 65536, r &= -r, u.lanes |= r, r = Vp(r), Hy(
              r,
              l,
              u,
              c
            ), Vf(u, r), !1;
      }
      u = u.return;
    } while (u !== null);
    return !1;
  }
  var xy = Error(N(461)), $e = !1;
  function gl(l, n, u, c) {
    n.child = l === null ? Dy(n, null, u, c) : vl(
      n,
      l.child,
      u,
      c
    );
  }
  function Ny(l, n, u, c, r) {
    u = u.render;
    var s = n.ref;
    if ("ref" in c) {
      var y = {};
      for (var m in c)
        m !== "ref" && (y[m] = c[m]);
    } else y = c;
    return si(n), c = Bs(
      l,
      n,
      u,
      y,
      s,
      r
    ), m = Ys(), l !== null && !$e ? (ws(l, n, r), En(l, n, r)) : (je && m && xf(n), n.flags |= 1, gl(l, n, c, r), n.child);
  }
  function Xp(l, n, u, c, r) {
    if (l === null) {
      var s = u.type;
      return typeof s == "function" && !Rs(s) && s.defaultProps === void 0 && u.compare === null ? (n.tag = 15, n.type = s, _u(
        l,
        n,
        s,
        c,
        r
      )) : (l = we(
        u.type,
        null,
        c,
        n,
        n.mode,
        r
      ), l.ref = n.ref, l.return = n, n.child = l);
    }
    if (s = l.child, !ld(l, r)) {
      var y = s.memoizedProps;
      if (u = u.compare, u = u !== null ? u : Su, u(y, c) && l.ref === n.ref)
        return En(l, n, r);
    }
    return n.flags |= 1, l = dn(s, c), l.ref = n.ref, l.return = n, n.child = l;
  }
  function _u(l, n, u, c, r) {
    if (l !== null) {
      var s = l.memoizedProps;
      if (Su(s, c) && l.ref === n.ref)
        if ($e = !1, n.pendingProps = c = s, ld(l, r))
          (l.flags & 131072) !== 0 && ($e = !0);
        else
          return n.lanes = l.lanes, En(l, n, r);
    }
    return Is(
      l,
      n,
      u,
      c,
      r
    );
  }
  function vc(l, n, u) {
    var c = n.pendingProps, r = c.children, s = l !== null ? l.memoizedState : null;
    if (c.mode === "hidden") {
      if ((n.flags & 128) !== 0) {
        if (c = s !== null ? s.baseLanes | u : u, l !== null) {
          for (r = n.child = l.child, s = 0; r !== null; )
            s = s | r.lanes | r.childLanes, r = r.sibling;
          n.childLanes = s & ~c;
        } else n.childLanes = 0, n.child = null;
        return Fs(
          l,
          n,
          c,
          u
        );
      }
      if ((u & 536870912) !== 0)
        n.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && so(
          n,
          s !== null ? s.cachePool : null
        ), s !== null ? uy(n, s) : rl(), zy(n);
      else
        return n.lanes = n.childLanes = 536870912, Fs(
          l,
          n,
          s !== null ? s.baseLanes | u : u,
          u
        );
    } else
      s !== null ? (so(n, s.cachePool), uy(n, s), Ll(), n.memoizedState = null) : (l !== null && so(n, null), rl(), Ll());
    return gl(l, n, r, u), n.child;
  }
  function Fs(l, n, u, c) {
    var r = ro();
    return r = r === null ? null : { parent: nl._currentValue, pool: r }, n.memoizedState = {
      baseLanes: u,
      cachePool: r
    }, l !== null && so(n, null), rl(), zy(n), l !== null && Bf(l, n, c, !0), null;
  }
  function Cu(l, n) {
    var u = n.ref;
    if (u === null)
      l !== null && l.ref !== null && (n.flags |= 4194816);
    else {
      if (typeof u != "function" && typeof u != "object")
        throw Error(N(284));
      (l === null || l.ref !== u) && (n.flags |= 4194816);
    }
  }
  function Is(l, n, u, c, r) {
    return si(n), u = Bs(
      l,
      n,
      u,
      c,
      void 0,
      r
    ), c = Ys(), l !== null && !$e ? (ws(l, n, r), En(l, n, r)) : (je && c && xf(n), n.flags |= 1, gl(l, n, u, r), n.child);
  }
  function qy(l, n, u, c, r, s) {
    return si(n), n.updateQueue = null, u = yi(
      n,
      c,
      u,
      r
    ), iy(l), c = Ys(), l !== null && !$e ? (ws(l, n, s), En(l, n, s)) : (je && c && xf(n), n.flags |= 1, gl(l, n, u, s), n.child);
  }
  function By(l, n, u, c, r) {
    if (si(n), n.stateNode === null) {
      var s = ic, y = u.contextType;
      typeof y == "object" && y !== null && (s = Ul(y)), s = new u(c, s), n.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = pi, n.stateNode = s, s._reactInternals = n, s = n.stateNode, s.props = c, s.state = n.memoizedState, s.refs = {}, Lf(n), y = u.contextType, s.context = typeof y == "object" && y !== null ? Ul(y) : ic, s.state = n.memoizedState, y = u.getDerivedStateFromProps, typeof y == "function" && ($s(
        n,
        u,
        y,
        c
      ), s.state = n.memoizedState), typeof u.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (y = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), y !== s.state && pi.enqueueReplaceState(s, s.state, null), po(n, c, s, r), Xf(), s.state = n.memoizedState), typeof s.componentDidMount == "function" && (n.flags |= 4194308), c = !0;
    } else if (l === null) {
      s = n.stateNode;
      var m = n.memoizedProps, S = Wa(u, m);
      s.props = S;
      var U = s.context, Z = u.contextType;
      y = ic, typeof Z == "object" && Z !== null && (y = Ul(Z));
      var k = u.getDerivedStateFromProps;
      Z = typeof k == "function" || typeof s.getSnapshotBeforeUpdate == "function", m = n.pendingProps !== m, Z || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m || U !== y) && Oo(
        n,
        s,
        c,
        y
      ), Du = !1;
      var H = n.memoizedState;
      s.state = H, po(n, c, s, r), Xf(), U = n.memoizedState, m || H !== U || Du ? (typeof k == "function" && ($s(
        n,
        u,
        k,
        c
      ), U = n.memoizedState), (S = Du || My(
        n,
        u,
        S,
        c,
        H,
        U,
        y
      )) ? (Z || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = c, n.memoizedState = U), s.props = c, s.state = U, s.context = y, c = S) : (typeof s.componentDidMount == "function" && (n.flags |= 4194308), c = !1);
    } else {
      s = n.stateNode, xs(l, n), y = n.memoizedProps, Z = Wa(u, y), s.props = Z, k = n.pendingProps, H = s.context, U = u.contextType, S = ic, typeof U == "object" && U !== null && (S = Ul(U)), m = u.getDerivedStateFromProps, (U = typeof m == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (y !== k || H !== S) && Oo(
        n,
        s,
        c,
        S
      ), Du = !1, H = n.memoizedState, s.state = H, po(n, c, s, r), Xf();
      var w = n.memoizedState;
      y !== k || H !== w || Du || l !== null && l.dependencies !== null && Yf(l.dependencies) ? (typeof m == "function" && ($s(
        n,
        u,
        m,
        c
      ), w = n.memoizedState), (Z = Du || My(
        n,
        u,
        Z,
        c,
        H,
        w,
        S
      ) || l !== null && l.dependencies !== null && Yf(l.dependencies)) ? (U || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(c, w, S), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        c,
        w,
        S
      )), typeof s.componentDidUpdate == "function" && (n.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || y === l.memoizedProps && H === l.memoizedState || (n.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && H === l.memoizedState || (n.flags |= 1024), n.memoizedProps = c, n.memoizedState = w), s.props = c, s.state = w, s.context = S, c = Z) : (typeof s.componentDidUpdate != "function" || y === l.memoizedProps && H === l.memoizedState || (n.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || y === l.memoizedProps && H === l.memoizedState || (n.flags |= 1024), c = !1);
    }
    return s = c, Cu(l, n), c = (n.flags & 128) !== 0, s || c ? (s = n.stateNode, u = c && typeof u.getDerivedStateFromError != "function" ? null : s.render(), n.flags |= 1, l !== null && c ? (n.child = vl(
      n,
      l.child,
      null,
      r
    ), n.child = vl(
      n,
      null,
      u,
      r
    )) : gl(l, n, u, r), n.memoizedState = s.state, l = n.child) : l = En(
      l,
      n,
      r
    ), l;
  }
  function Ps(l, n, u, c) {
    return uo(), n.flags |= 256, gl(l, n, u, c), n.child;
  }
  var ir = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function ed(l) {
    return { baseLanes: l, cachePool: jf() };
  }
  function Yy(l, n, u) {
    return l = l !== null ? l.childLanes & ~u : 0, n && (l |= dl), l;
  }
  function Qp(l, n, u) {
    var c = n.pendingProps, r = !1, s = (n.flags & 128) !== 0, y;
    if ((y = s) || (y = l !== null && l.memoizedState === null ? !1 : (el.current & 2) !== 0), y && (r = !0, n.flags &= -129), y = (n.flags & 32) !== 0, n.flags &= -33, l === null) {
      if (je) {
        if (r ? ha(n) : Ll(), je) {
          var m = Et, S;
          if (S = m) {
            e: {
              for (S = m, m = $l; S.nodeType !== 8; ) {
                if (!m) {
                  m = null;
                  break e;
                }
                if (S = Mn(
                  S.nextSibling
                ), S === null) {
                  m = null;
                  break e;
                }
              }
              m = S;
            }
            m !== null ? (n.memoizedState = {
              dehydrated: m,
              treeContext: Eu !== null ? { id: hn, overflow: yn } : null,
              retryLane: 536870912,
              hydrationErrors: null
            }, S = ua(
              18,
              null,
              null,
              0
            ), S.stateNode = m, S.return = n, n.child = S, kt = n, Et = null, S = !0) : S = !1;
          }
          S || mn(n);
        }
        if (m = n.memoizedState, m !== null && (m = m.dehydrated, m !== null))
          return hm(m) ? n.lanes = 32 : n.lanes = 536870912, null;
        Tn(n);
      }
      return m = c.children, c = c.fallback, r ? (Ll(), r = n.mode, m = cr(
        { mode: "hidden", children: m },
        r
      ), c = F(
        c,
        r,
        u,
        null
      ), m.return = n, c.return = n, m.sibling = c, n.child = m, r = n.child, r.memoizedState = ed(u), r.childLanes = Yy(
        l,
        y,
        u
      ), n.memoizedState = ir, c) : (ha(n), td(n, m));
    }
    if (S = l.memoizedState, S !== null && (m = S.dehydrated, m !== null)) {
      if (s)
        n.flags & 256 ? (ha(n), n.flags &= -257, n = wy(
          l,
          n,
          u
        )) : n.memoizedState !== null ? (Ll(), n.child = l.child, n.flags |= 128, n = null) : (Ll(), r = c.fallback, m = n.mode, c = cr(
          { mode: "visible", children: c.children },
          m
        ), r = F(
          r,
          m,
          u,
          null
        ), r.flags |= 2, c.return = n, r.return = n, c.sibling = r, n.child = c, vl(
          n,
          l.child,
          null,
          u
        ), c = n.child, c.memoizedState = ed(u), c.childLanes = Yy(
          l,
          y,
          u
        ), n.memoizedState = ir, n = r);
      else if (ha(n), hm(m)) {
        if (y = m.nextSibling && m.nextSibling.dataset, y) var U = y.dgst;
        y = U, c = Error(N(419)), c.stack = "", c.digest = y, io({ value: c, source: null, stack: null }), n = wy(
          l,
          n,
          u
        );
      } else if ($e || Bf(l, n, u, !1), y = (u & l.childLanes) !== 0, $e || y) {
        if (y = Rt, y !== null && (c = u & -u, c = (c & 42) !== 0 ? 1 : ze(c), c = (c & (y.suspendedLanes | u)) !== 0 ? 0 : c, c !== 0 && c !== S.retryLane))
          throw S.retryLane = c, Tu(l, c), ga(y, l, c), xy;
        m.data === "$?" || zi(), n = wy(
          l,
          n,
          u
        );
      } else
        m.data === "$?" ? (n.flags |= 192, n.child = l.child, n = null) : (l = S.treeContext, Et = Mn(
          m.nextSibling
        ), kt = n, je = !0, Au = null, $l = !1, l !== null && (ia[Ka++] = hn, ia[Ka++] = yn, ia[Ka++] = Eu, hn = l.id, yn = l.overflow, Eu = n), n = td(
          n,
          c.children
        ), n.flags |= 4096);
      return n;
    }
    return r ? (Ll(), r = c.fallback, m = n.mode, S = l.child, U = S.sibling, c = dn(S, {
      mode: "hidden",
      children: c.children
    }), c.subtreeFlags = S.subtreeFlags & 65011712, U !== null ? r = dn(U, r) : (r = F(
      r,
      m,
      u,
      null
    ), r.flags |= 2), r.return = n, c.return = n, c.sibling = r, n.child = c, c = r, r = n.child, m = l.child.memoizedState, m === null ? m = ed(u) : (S = m.cachePool, S !== null ? (U = nl._currentValue, S = S.parent !== U ? { parent: U, pool: U } : S) : S = jf(), m = {
      baseLanes: m.baseLanes | u,
      cachePool: S
    }), r.memoizedState = m, r.childLanes = Yy(
      l,
      y,
      u
    ), n.memoizedState = ir, c) : (ha(n), u = l.child, l = u.sibling, u = dn(u, {
      mode: "visible",
      children: c.children
    }), u.return = n, u.sibling = null, l !== null && (y = n.deletions, y === null ? (n.deletions = [l], n.flags |= 16) : y.push(l)), n.child = u, n.memoizedState = null, u);
  }
  function td(l, n) {
    return n = cr(
      { mode: "visible", children: n },
      l.mode
    ), n.return = l, l.child = n;
  }
  function cr(l, n) {
    return l = ua(22, l, null, n), l.lanes = 0, l.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }, l;
  }
  function wy(l, n, u) {
    return vl(n, l.child, null, u), l = td(
      n,
      n.pendingProps.children
    ), l.flags |= 2, n.memoizedState = null, l;
  }
  function gc(l, n, u) {
    l.lanes |= n;
    var c = l.alternate;
    c !== null && (c.lanes |= n), Ms(l.return, n, u);
  }
  function zo(l, n, u, c, r) {
    var s = l.memoizedState;
    s === null ? l.memoizedState = {
      isBackwards: n,
      rendering: null,
      renderingStartTime: 0,
      last: c,
      tail: u,
      tailMode: r
    } : (s.isBackwards = n, s.rendering = null, s.renderingStartTime = 0, s.last = c, s.tail = u, s.tailMode = r);
  }
  function jy(l, n, u) {
    var c = n.pendingProps, r = c.revealOrder, s = c.tail;
    if (gl(l, n, c.children, u), c = el.current, (c & 2) !== 0)
      c = c & 1 | 2, n.flags |= 128;
    else {
      if (l !== null && (l.flags & 128) !== 0)
        e: for (l = n.child; l !== null; ) {
          if (l.tag === 13)
            l.memoizedState !== null && gc(l, u, n);
          else if (l.tag === 19)
            gc(l, u, n);
          else if (l.child !== null) {
            l.child.return = l, l = l.child;
            continue;
          }
          if (l === n) break e;
          for (; l.sibling === null; ) {
            if (l.return === null || l.return === n)
              break e;
            l = l.return;
          }
          l.sibling.return = l.return, l = l.sibling;
        }
      c &= 1;
    }
    switch (Q(el, c), r) {
      case "forwards":
        for (u = n.child, r = null; u !== null; )
          l = u.alternate, l !== null && Ma(l) === null && (r = u), u = u.sibling;
        u = r, u === null ? (r = n.child, n.child = null) : (r = u.sibling, u.sibling = null), zo(
          n,
          !1,
          r,
          u,
          s
        );
        break;
      case "backwards":
        for (u = null, r = n.child, n.child = null; r !== null; ) {
          if (l = r.alternate, l !== null && Ma(l) === null) {
            n.child = r;
            break;
          }
          l = r.sibling, r.sibling = u, u = r, r = l;
        }
        zo(
          n,
          !0,
          u,
          null,
          s
        );
        break;
      case "together":
        zo(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
    return n.child;
  }
  function En(l, n, u) {
    if (l !== null && (n.dependencies = l.dependencies), Ai |= n.lanes, (u & n.childLanes) === 0)
      if (l !== null) {
        if (Bf(
          l,
          n,
          u,
          !1
        ), (u & n.childLanes) === 0)
          return null;
      } else return null;
    if (l !== null && n.child !== l.child)
      throw Error(N(153));
    if (n.child !== null) {
      for (l = n.child, u = dn(l, l.pendingProps), n.child = u, u.return = n; l.sibling !== null; )
        l = l.sibling, u = u.sibling = dn(l, l.pendingProps), u.return = n;
      u.sibling = null;
    }
    return n.child;
  }
  function ld(l, n) {
    return (l.lanes & n) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Yf(l)));
  }
  function Zp(l, n, u) {
    switch (n.tag) {
      case 3:
        yt(n, n.stateNode.containerInfo), jn(n, nl, l.memoizedState.cache), uo();
        break;
      case 27:
      case 5:
        fl(n);
        break;
      case 4:
        yt(n, n.stateNode.containerInfo);
        break;
      case 10:
        jn(
          n,
          n.type,
          n.memoizedProps.value
        );
        break;
      case 13:
        var c = n.memoizedState;
        if (c !== null)
          return c.dehydrated !== null ? (ha(n), n.flags |= 128, null) : (u & n.child.childLanes) !== 0 ? Qp(l, n, u) : (ha(n), l = En(
            l,
            n,
            u
          ), l !== null ? l.sibling : null);
        ha(n);
        break;
      case 19:
        var r = (l.flags & 128) !== 0;
        if (c = (u & n.childLanes) !== 0, c || (Bf(
          l,
          n,
          u,
          !1
        ), c = (u & n.childLanes) !== 0), r) {
          if (c)
            return jy(
              l,
              n,
              u
            );
          n.flags |= 128;
        }
        if (r = n.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), Q(el, el.current), c) break;
        return null;
      case 22:
      case 23:
        return n.lanes = 0, vc(l, n, u);
      case 24:
        jn(n, nl, l.memoizedState.cache);
    }
    return En(l, n, u);
  }
  function Gy(l, n, u) {
    if (l !== null)
      if (l.memoizedProps !== n.pendingProps)
        $e = !0;
      else {
        if (!ld(l, u) && (n.flags & 128) === 0)
          return $e = !1, Zp(
            l,
            n,
            u
          );
        $e = (l.flags & 131072) !== 0;
      }
    else
      $e = !1, je && (n.flags & 1048576) !== 0 && pt(n, Hf, n.index);
    switch (n.lanes = 0, n.tag) {
      case 16:
        e: {
          l = n.pendingProps;
          var c = n.elementType, r = c._init;
          if (c = r(c._payload), n.type = c, typeof c == "function")
            Rs(c) ? (l = Wa(c, l), n.tag = 1, n = By(
              null,
              n,
              c,
              l,
              u
            )) : (n.tag = 0, n = Is(
              null,
              n,
              c,
              l,
              u
            ));
          else {
            if (c != null) {
              if (r = c.$$typeof, r === Mt) {
                n.tag = 11, n = Ny(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              } else if (r === Ut) {
                n.tag = 14, n = Xp(
                  null,
                  n,
                  c,
                  l,
                  u
                );
                break e;
              }
            }
            throw n = Ct(c) || c, Error(N(306, n, ""));
          }
        }
        return n;
      case 0:
        return Is(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 1:
        return c = n.type, r = Wa(
          c,
          n.pendingProps
        ), By(
          l,
          n,
          c,
          r,
          u
        );
      case 3:
        e: {
          if (yt(
            n,
            n.stateNode.containerInfo
          ), l === null) throw Error(N(387));
          c = n.pendingProps;
          var s = n.memoizedState;
          r = s.element, xs(l, n), po(n, c, null, u);
          var y = n.memoizedState;
          if (c = y.cache, jn(n, nl, c), c !== s.cache && Us(
            n,
            [nl],
            u,
            !0
          ), Xf(), c = y.element, s.isDehydrated)
            if (s = {
              element: c,
              isDehydrated: !1,
              cache: y.cache
            }, n.updateQueue.baseState = s, n.memoizedState = s, n.flags & 256) {
              n = Ps(
                l,
                n,
                c,
                u
              );
              break e;
            } else if (c !== r) {
              r = Da(
                Error(N(424)),
                n
              ), io(r), n = Ps(
                l,
                n,
                c,
                u
              );
              break e;
            } else {
              switch (l = n.stateNode.containerInfo, l.nodeType) {
                case 9:
                  l = l.body;
                  break;
                default:
                  l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
              }
              for (Et = Mn(l.firstChild), kt = n, je = !0, Au = null, $l = !0, u = Dy(
                n,
                null,
                c,
                u
              ), n.child = u; u; )
                u.flags = u.flags & -3 | 4096, u = u.sibling;
            }
          else {
            if (uo(), c === r) {
              n = En(
                l,
                n,
                u
              );
              break e;
            }
            gl(
              l,
              n,
              c,
              u
            );
          }
          n = n.child;
        }
        return n;
      case 26:
        return Cu(l, n), l === null ? (u = _d(
          n.type,
          null,
          n.pendingProps,
          null
        )) ? n.memoizedState = u : je || (u = n.type, l = n.pendingProps, c = Vo(
          he.current
        ).createElement(u), c[_t] = n, c[wl] = l, q(c, u, l), Pt(c), n.stateNode = c) : n.memoizedState = _d(
          n.type,
          l.memoizedProps,
          n.pendingProps,
          l.memoizedState
        ), null;
      case 27:
        return fl(n), l === null && je && (c = n.stateNode = Hl(
          n.type,
          n.pendingProps,
          he.current
        ), kt = n, $l = !0, r = Et, Cl(n.type) ? (mm = r, Et = Mn(
          c.firstChild
        )) : Et = r), gl(
          l,
          n,
          n.pendingProps.children,
          u
        ), Cu(l, n), l === null && (n.flags |= 4194304), n.child;
      case 5:
        return l === null && je && ((r = c = Et) && (c = dm(
          c,
          n.type,
          n.pendingProps,
          $l
        ), c !== null ? (n.stateNode = c, kt = n, Et = Mn(
          c.firstChild
        ), $l = !1, r = !0) : r = !1), r || mn(n)), fl(n), r = n.type, s = n.pendingProps, y = l !== null ? l.memoizedProps : null, c = s.children, Oc(r, s) ? c = null : y !== null && Oc(r, y) && (n.flags |= 32), n.memoizedState !== null && (r = Bs(
          l,
          n,
          xp,
          null,
          null,
          u
        ), xl._currentValue = r), Cu(l, n), gl(l, n, c, u), n.child;
      case 6:
        return l === null && je && ((l = u = Et) && (u = Xo(
          u,
          n.pendingProps,
          $l
        ), u !== null ? (n.stateNode = u, kt = n, Et = null, l = !0) : l = !1), l || mn(n)), null;
      case 13:
        return Qp(l, n, u);
      case 4:
        return yt(
          n,
          n.stateNode.containerInfo
        ), c = n.pendingProps, l === null ? n.child = vl(
          n,
          null,
          c,
          u
        ) : gl(
          l,
          n,
          c,
          u
        ), n.child;
      case 11:
        return Ny(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 7:
        return gl(
          l,
          n,
          n.pendingProps,
          u
        ), n.child;
      case 8:
        return gl(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 12:
        return gl(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 10:
        return c = n.pendingProps, jn(n, n.type, c.value), gl(
          l,
          n,
          c.children,
          u
        ), n.child;
      case 9:
        return r = n.type._context, c = n.pendingProps.children, si(n), r = Ul(r), c = c(r), n.flags |= 1, gl(l, n, c, u), n.child;
      case 14:
        return Xp(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 15:
        return _u(
          l,
          n,
          n.type,
          n.pendingProps,
          u
        );
      case 19:
        return jy(l, n, u);
      case 31:
        return c = n.pendingProps, u = n.mode, c = {
          mode: c.mode,
          children: c.children
        }, l === null ? (u = cr(
          c,
          u
        ), u.ref = n.ref, n.child = u, u.return = n, n = u) : (u = dn(l.child, c), u.ref = n.ref, n.child = u, u.return = n, n = u), n;
      case 22:
        return vc(l, n, u);
      case 24:
        return si(n), c = Ul(nl), l === null ? (r = ro(), r === null && (r = Rt, s = Ih(), r.pooledCache = s, s.refCount++, s !== null && (r.pooledCacheLanes |= u), r = s), n.memoizedState = {
          parent: c,
          cache: r
        }, Lf(n), jn(n, nl, r)) : ((l.lanes & u) !== 0 && (xs(l, n), po(n, null, null, u), Xf()), r = l.memoizedState, s = n.memoizedState, r.parent !== c ? (r = { parent: c, cache: c }, n.memoizedState = r, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = r), jn(n, nl, c)) : (c = s.cache, jn(n, nl, c), c !== r.cache && Us(
          n,
          [nl],
          u,
          !0
        ))), gl(
          l,
          n,
          n.pendingProps.children,
          u
        ), n.child;
      case 29:
        throw n.pendingProps;
    }
    throw Error(N(156, n.tag));
  }
  function Hu(l) {
    l.flags |= 4;
  }
  function Ly(l, n) {
    if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0)
      l.flags &= -16777217;
    else if (l.flags |= 16777216, !Sm(n)) {
      if (n = ul.current, n !== null && ((nt & 4194048) === nt ? bn !== null : (nt & 62914560) !== nt && (nt & 536870912) === 0 || n !== bn))
        throw mo = Cs, Gf;
      l.flags |= 8192;
    }
  }
  function vi(l, n) {
    n !== null && (l.flags |= 4), l.flags & 16384 && (n = l.tag !== 22 ? P() : 536870912, l.lanes |= n, xo |= n);
  }
  function Mo(l, n) {
    if (!je)
      switch (l.tailMode) {
        case "hidden":
          n = l.tail;
          for (var u = null; n !== null; )
            n.alternate !== null && (u = n), n = n.sibling;
          u === null ? l.tail = null : u.sibling = null;
          break;
        case "collapsed":
          u = l.tail;
          for (var c = null; u !== null; )
            u.alternate !== null && (c = u), u = u.sibling;
          c === null ? n || l.tail === null ? l.tail = null : l.tail.sibling = null : c.sibling = null;
      }
  }
  function Xt(l) {
    var n = l.alternate !== null && l.alternate.child === l.child, u = 0, c = 0;
    if (n)
      for (var r = l.child; r !== null; )
        u |= r.lanes | r.childLanes, c |= r.subtreeFlags & 65011712, c |= r.flags & 65011712, r.return = l, r = r.sibling;
    else
      for (r = l.child; r !== null; )
        u |= r.lanes | r.childLanes, c |= r.subtreeFlags, c |= r.flags, r.return = l, r = r.sibling;
    return l.subtreeFlags |= c, l.childLanes = u, n;
  }
  function At(l, n, u) {
    var c = n.pendingProps;
    switch (cc(n), n.tag) {
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
        return Xt(n), null;
      case 1:
        return Xt(n), null;
      case 3:
        return u = n.stateNode, c = null, l !== null && (c = l.memoizedState.cache), n.memoizedState.cache !== c && (n.flags |= 2048), Gn(nl), mt(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (l === null || l.child === null) && (no(n) ? Hu(n) : l === null || l.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Wh())), Xt(n), null;
      case 26:
        return u = n.memoizedState, l === null ? (Hu(n), u !== null ? (Xt(n), Ly(n, u)) : (Xt(n), n.flags &= -16777217)) : u ? u !== l.memoizedState ? (Hu(n), Xt(n), Ly(n, u)) : (Xt(n), n.flags &= -16777217) : (l.memoizedProps !== c && Hu(n), Xt(n), n.flags &= -16777217), null;
      case 27:
        Kl(n), u = he.current;
        var r = n.type;
        if (l !== null && n.stateNode != null)
          l.memoizedProps !== c && Hu(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(N(166));
            return Xt(n), null;
          }
          l = ae.current, no(n) ? Ds(n) : (l = Hl(r, c, u), n.stateNode = l, Hu(n));
        }
        return Xt(n), null;
      case 5:
        if (Kl(n), u = n.type, l !== null && n.stateNode != null)
          l.memoizedProps !== c && Hu(n);
        else {
          if (!c) {
            if (n.stateNode === null)
              throw Error(N(166));
            return Xt(n), null;
          }
          if (l = ae.current, no(n))
            Ds(n);
          else {
            switch (r = Vo(
              he.current
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
            l[_t] = n, l[wl] = c;
            e: for (r = n.child; r !== null; ) {
              if (r.tag === 5 || r.tag === 6)
                l.appendChild(r.stateNode);
              else if (r.tag !== 4 && r.tag !== 27 && r.child !== null) {
                r.child.return = r, r = r.child;
                continue;
              }
              if (r === n) break e;
              for (; r.sibling === null; ) {
                if (r.return === null || r.return === n)
                  break e;
                r = r.return;
              }
              r.sibling.return = r.return, r = r.sibling;
            }
            n.stateNode = l;
            e: switch (q(l, u, c), u) {
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
            l && Hu(n);
          }
        }
        return Xt(n), n.flags &= -16777217, null;
      case 6:
        if (l && n.stateNode != null)
          l.memoizedProps !== c && Hu(n);
        else {
          if (typeof c != "string" && n.stateNode === null)
            throw Error(N(166));
          if (l = he.current, no(n)) {
            if (l = n.stateNode, u = n.memoizedProps, c = null, r = kt, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  c = r.memoizedProps;
              }
            l[_t] = n, l = !!(l.nodeValue === u || c !== null && c.suppressHydrationWarning === !0 || sv(l.nodeValue, u)), l || mn(n);
          } else
            l = Vo(l).createTextNode(
              c
            ), l[_t] = n, n.stateNode = l;
        }
        return Xt(n), null;
      case 13:
        if (c = n.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
          if (r = no(n), c !== null && c.dehydrated !== null) {
            if (l === null) {
              if (!r) throw Error(N(318));
              if (r = n.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(N(317));
              r[_t] = n;
            } else
              uo(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
            Xt(n), r = !1;
          } else
            r = Wh(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return n.flags & 256 ? (Tn(n), n) : (Tn(n), null);
        }
        if (Tn(n), (n.flags & 128) !== 0)
          return n.lanes = u, n;
        if (u = c !== null, l = l !== null && l.memoizedState !== null, u) {
          c = n.child, r = null, c.alternate !== null && c.alternate.memoizedState !== null && c.alternate.memoizedState.cachePool !== null && (r = c.alternate.memoizedState.cachePool.pool);
          var s = null;
          c.memoizedState !== null && c.memoizedState.cachePool !== null && (s = c.memoizedState.cachePool.pool), s !== r && (c.flags |= 2048);
        }
        return u !== l && u && (n.child.flags |= 8192), vi(n, n.updateQueue), Xt(n), null;
      case 4:
        return mt(), l === null && vr(n.stateNode.containerInfo), Xt(n), null;
      case 10:
        return Gn(n.type), Xt(n), null;
      case 19:
        if (J(el), r = n.memoizedState, r === null) return Xt(n), null;
        if (c = (n.flags & 128) !== 0, s = r.rendering, s === null)
          if (c) Mo(r, !1);
          else {
            if (Ft !== 0 || l !== null && (l.flags & 128) !== 0)
              for (l = n.child; l !== null; ) {
                if (s = Ma(l), s !== null) {
                  for (n.flags |= 128, Mo(r, !1), l = s.updateQueue, n.updateQueue = l, vi(n, l), n.subtreeFlags = 0, l = u, u = n.child; u !== null; )
                    Os(u, l), u = u.sibling;
                  return Q(
                    el,
                    el.current & 1 | 2
                  ), n.child;
                }
                l = l.sibling;
              }
            r.tail !== null && St() > cd && (n.flags |= 128, c = !0, Mo(r, !1), n.lanes = 4194304);
          }
        else {
          if (!c)
            if (l = Ma(s), l !== null) {
              if (n.flags |= 128, c = !0, l = l.updateQueue, n.updateQueue = l, vi(n, l), Mo(r, !0), r.tail === null && r.tailMode === "hidden" && !s.alternate && !je)
                return Xt(n), null;
            } else
              2 * St() - r.renderingStartTime > cd && u !== 536870912 && (n.flags |= 128, c = !0, Mo(r, !1), n.lanes = 4194304);
          r.isBackwards ? (s.sibling = n.child, n.child = s) : (l = r.last, l !== null ? l.sibling = s : n.child = s, r.last = s);
        }
        return r.tail !== null ? (n = r.tail, r.rendering = n, r.tail = n.sibling, r.renderingStartTime = St(), n.sibling = null, l = el.current, Q(el, c ? l & 1 | 2 : l & 1), n) : (Xt(n), null);
      case 22:
      case 23:
        return Tn(n), go(), c = n.memoizedState !== null, l !== null ? l.memoizedState !== null !== c && (n.flags |= 8192) : c && (n.flags |= 8192), c ? (u & 536870912) !== 0 && (n.flags & 128) === 0 && (Xt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Xt(n), u = n.updateQueue, u !== null && vi(n, u.retryQueue), u = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), c = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (c = n.memoizedState.cachePool.pool), c !== u && (n.flags |= 2048), l !== null && J(Ou), null;
      case 24:
        return u = null, l !== null && (u = l.memoizedState.cache), n.memoizedState.cache !== u && (n.flags |= 2048), Gn(nl), Xt(n), null;
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(N(156, n.tag));
  }
  function Vy(l, n) {
    switch (cc(n), n.tag) {
      case 1:
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 3:
        return Gn(nl), mt(), l = n.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (n.flags = l & -65537 | 128, n) : null;
      case 26:
      case 27:
      case 5:
        return Kl(n), null;
      case 13:
        if (Tn(n), l = n.memoizedState, l !== null && l.dehydrated !== null) {
          if (n.alternate === null)
            throw Error(N(340));
          uo();
        }
        return l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 19:
        return J(el), null;
      case 4:
        return mt(), null;
      case 10:
        return Gn(n.type), null;
      case 22:
      case 23:
        return Tn(n), go(), l !== null && J(Ou), l = n.flags, l & 65536 ? (n.flags = l & -65537 | 128, n) : null;
      case 24:
        return Gn(nl), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kp(l, n) {
    switch (cc(n), n.tag) {
      case 3:
        Gn(nl), mt();
        break;
      case 26:
      case 27:
      case 5:
        Kl(n);
        break;
      case 4:
        mt();
        break;
      case 13:
        Tn(n);
        break;
      case 19:
        J(el);
        break;
      case 10:
        Gn(n.type);
        break;
      case 22:
      case 23:
        Tn(n), go(), l !== null && J(Ou);
        break;
      case 24:
        Gn(nl);
    }
  }
  function Uo(l, n) {
    try {
      var u = n.updateQueue, c = u !== null ? u.lastEffect : null;
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
      Ot(n, n.return, m);
    }
  }
  function gi(l, n, u) {
    try {
      var c = n.updateQueue, r = c !== null ? c.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        c = s;
        do {
          if ((c.tag & l) === l) {
            var y = c.inst, m = y.destroy;
            if (m !== void 0) {
              y.destroy = void 0, r = n;
              var S = u, U = m;
              try {
                U();
              } catch (Z) {
                Ot(
                  r,
                  S,
                  Z
                );
              }
            }
          }
          c = c.next;
        } while (c !== s);
      }
    } catch (Z) {
      Ot(n, n.return, Z);
    }
  }
  function Jp(l) {
    var n = l.updateQueue;
    if (n !== null) {
      var u = l.stateNode;
      try {
        Ns(n, u);
      } catch (c) {
        Ot(l, l.return, c);
      }
    }
  }
  function ad(l, n, u) {
    u.props = Wa(
      l.type,
      l.memoizedProps
    ), u.state = l.memoizedState;
    try {
      u.componentWillUnmount();
    } catch (c) {
      Ot(l, n, c);
    }
  }
  function _o(l, n) {
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
      Ot(l, n, r);
    }
  }
  function An(l, n) {
    var u = l.ref, c = l.refCleanup;
    if (u !== null)
      if (typeof c == "function")
        try {
          c();
        } catch (r) {
          Ot(l, n, r);
        } finally {
          l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
        }
      else if (typeof u == "function")
        try {
          u(null);
        } catch (r) {
          Ot(l, n, r);
        }
      else u.current = null;
  }
  function Xy(l) {
    var n = l.type, u = l.memoizedProps, c = l.stateNode;
    try {
      e: switch (n) {
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
      Ot(l, l.return, r);
    }
  }
  function Sc(l, n, u) {
    try {
      var c = l.stateNode;
      st(c, l.type, u, n), c[wl] = n;
    } catch (r) {
      Ot(l, l.return, r);
    }
  }
  function kp(l) {
    return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && Cl(l.type) || l.tag === 4;
  }
  function Qy(l) {
    e: for (; ; ) {
      for (; l.sibling === null; ) {
        if (l.return === null || kp(l.return)) return null;
        l = l.return;
      }
      for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
        if (l.tag === 27 && Cl(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue e;
        l.child.return = l, l = l.child;
      }
      if (!(l.flags & 2)) return l.stateNode;
    }
  }
  function Fa(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? (u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u).insertBefore(l, n) : (n = u.nodeType === 9 ? u.body : u.nodeName === "HTML" ? u.ownerDocument.body : u, n.appendChild(l), u = u._reactRootContainer, u != null || n.onclick !== null || (n.onclick = Sr));
    else if (c !== 4 && (c === 27 && Cl(l.type) && (u = l.stateNode, n = null), l = l.child, l !== null))
      for (Fa(l, n, u), l = l.sibling; l !== null; )
        Fa(l, n, u), l = l.sibling;
  }
  function Si(l, n, u) {
    var c = l.tag;
    if (c === 5 || c === 6)
      l = l.stateNode, n ? u.insertBefore(l, n) : u.appendChild(l);
    else if (c !== 4 && (c === 27 && Cl(l.type) && (u = l.stateNode), l = l.child, l !== null))
      for (Si(l, n, u), l = l.sibling; l !== null; )
        Si(l, n, u), l = l.sibling;
  }
  function $p(l) {
    var n = l.stateNode, u = l.memoizedProps;
    try {
      for (var c = l.type, r = n.attributes; r.length; )
        n.removeAttributeNode(r[0]);
      q(n, c, u), n[_t] = l, n[wl] = u;
    } catch (s) {
      Ot(l, l.return, s);
    }
  }
  var Rn = !1, Wt = !1, nd = !1, Zy = typeof WeakSet == "function" ? WeakSet : Set, il = null;
  function Wp(l, n) {
    if (l = l.containerInfo, rm = zr, l = Uf(l), bs(l)) {
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
            var y = 0, m = -1, S = -1, U = 0, Z = 0, k = l, H = null;
            t: for (; ; ) {
              for (var w; k !== u || r !== 0 && k.nodeType !== 3 || (m = y + r), k !== s || c !== 0 && k.nodeType !== 3 || (S = y + c), k.nodeType === 3 && (y += k.nodeValue.length), (w = k.firstChild) !== null; )
                H = k, k = w;
              for (; ; ) {
                if (k === l) break t;
                if (H === u && ++U === r && (m = y), H === s && ++Z === c && (S = y), (w = k.nextSibling) !== null) break;
                k = H, H = k.parentNode;
              }
              k = w;
            }
            u = m === -1 || S === -1 ? null : { start: m, end: S };
          } else u = null;
        }
      u = u || { start: 0, end: 0 };
    } else u = null;
    for (br = { focusedElem: l, selectionRange: u }, zr = !1, il = n; il !== null; )
      if (n = il, l = n.child, (n.subtreeFlags & 1024) !== 0 && l !== null)
        l.return = n, il = l;
      else
        for (; il !== null; ) {
          switch (n = il, s = n.alternate, l = n.flags, n.tag) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((l & 1024) !== 0 && s !== null) {
                l = void 0, u = n, r = s.memoizedProps, s = s.memoizedState, c = u.stateNode;
                try {
                  var Ee = Wa(
                    u.type,
                    r,
                    u.elementType === u.type
                  );
                  l = c.getSnapshotBeforeUpdate(
                    Ee,
                    s
                  ), c.__reactInternalSnapshotBeforeUpdate = l;
                } catch (Se) {
                  Ot(
                    u,
                    u.return,
                    Se
                  );
                }
              }
              break;
            case 3:
              if ((l & 1024) !== 0) {
                if (l = n.stateNode.containerInfo, u = l.nodeType, u === 9)
                  Tr(l);
                else if (u === 1)
                  switch (l.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Tr(l);
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
              if ((l & 1024) !== 0) throw Error(N(163));
          }
          if (l = n.sibling, l !== null) {
            l.return = n.return, il = l;
            break;
          }
          il = n.return;
        }
  }
  function ud(l, n, u) {
    var c = u.flags;
    switch (u.tag) {
      case 0:
      case 11:
      case 15:
        xu(l, u), c & 4 && Uo(5, u);
        break;
      case 1:
        if (xu(l, u), c & 4)
          if (l = u.stateNode, n === null)
            try {
              l.componentDidMount();
            } catch (y) {
              Ot(u, u.return, y);
            }
          else {
            var r = Wa(
              u.type,
              n.memoizedProps
            );
            n = n.memoizedState;
            try {
              l.componentDidUpdate(
                r,
                n,
                l.__reactInternalSnapshotBeforeUpdate
              );
            } catch (y) {
              Ot(
                u,
                u.return,
                y
              );
            }
          }
        c & 64 && Jp(u), c & 512 && _o(u, u.return);
        break;
      case 3:
        if (xu(l, u), c & 64 && (l = u.updateQueue, l !== null)) {
          if (n = null, u.child !== null)
            switch (u.child.tag) {
              case 27:
              case 5:
                n = u.child.stateNode;
                break;
              case 1:
                n = u.child.stateNode;
            }
          try {
            Ns(l, n);
          } catch (y) {
            Ot(u, u.return, y);
          }
        }
        break;
      case 27:
        n === null && c & 4 && $p(u);
      case 26:
      case 5:
        xu(l, u), n === null && c & 4 && Xy(u), c & 512 && _o(u, u.return);
        break;
      case 12:
        xu(l, u);
        break;
      case 13:
        xu(l, u), c & 4 && We(l, u), c & 64 && (l = u.memoizedState, l !== null && (l = l.dehydrated, l !== null && (u = ov.bind(
          null,
          u
        ), ym(l, u))));
        break;
      case 22:
        if (c = u.memoizedState !== null || Rn, !c) {
          n = n !== null && n.memoizedState !== null || Wt, r = Rn;
          var s = Wt;
          Rn = c, (Wt = n) && !s ? wt(
            l,
            u,
            (u.subtreeFlags & 8772) !== 0
          ) : xu(l, u), Rn = r, Wt = s;
        }
        break;
      case 30:
        break;
      default:
        xu(l, u);
    }
  }
  function Ky(l) {
    var n = l.alternate;
    n !== null && (l.alternate = null, Ky(n)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (n = l.stateNode, n !== null && me(n)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
  }
  var Yt = null, ya = !1;
  function Ia(l, n, u) {
    for (u = u.child; u !== null; )
      Jy(l, n, u), u = u.sibling;
  }
  function Jy(l, n, u) {
    if (Yl && typeof Yl.onCommitFiberUnmount == "function")
      try {
        Yl.onCommitFiberUnmount(hu, u);
      } catch {
      }
    switch (u.tag) {
      case 26:
        Wt || An(u, n), Ia(
          l,
          n,
          u
        ), u.memoizedState ? u.memoizedState.count-- : u.stateNode && (u = u.stateNode, u.parentNode.removeChild(u));
        break;
      case 27:
        Wt || An(u, n);
        var c = Yt, r = ya;
        Cl(u.type) && (Yt = u.stateNode, ya = !1), Ia(
          l,
          n,
          u
        ), ne(u.stateNode), Yt = c, ya = r;
        break;
      case 5:
        Wt || An(u, n);
      case 6:
        if (c = Yt, r = ya, Yt = null, Ia(
          l,
          n,
          u
        ), Yt = c, ya = r, Yt !== null)
          if (ya)
            try {
              (Yt.nodeType === 9 ? Yt.body : Yt.nodeName === "HTML" ? Yt.ownerDocument.body : Yt).removeChild(u.stateNode);
            } catch (s) {
              Ot(
                u,
                n,
                s
              );
            }
          else
            try {
              Yt.removeChild(u.stateNode);
            } catch (s) {
              Ot(
                u,
                n,
                s
              );
            }
        break;
      case 18:
        Yt !== null && (ya ? (l = Yt, hv(
          l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
          u.stateNode
        ), $o(l)) : hv(Yt, u.stateNode));
        break;
      case 4:
        c = Yt, r = ya, Yt = u.stateNode.containerInfo, ya = !0, Ia(
          l,
          n,
          u
        ), Yt = c, ya = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        Wt || gi(2, u, n), Wt || gi(4, u, n), Ia(
          l,
          n,
          u
        );
        break;
      case 1:
        Wt || (An(u, n), c = u.stateNode, typeof c.componentWillUnmount == "function" && ad(
          u,
          n,
          c
        )), Ia(
          l,
          n,
          u
        );
        break;
      case 21:
        Ia(
          l,
          n,
          u
        );
        break;
      case 22:
        Wt = (c = Wt) || u.memoizedState !== null, Ia(
          l,
          n,
          u
        ), Wt = c;
        break;
      default:
        Ia(
          l,
          n,
          u
        );
    }
  }
  function We(l, n) {
    if (n.memoizedState === null && (l = n.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
      try {
        $o(l);
      } catch (u) {
        Ot(n, n.return, u);
      }
  }
  function ky(l) {
    switch (l.tag) {
      case 13:
      case 19:
        var n = l.stateNode;
        return n === null && (n = l.stateNode = new Zy()), n;
      case 22:
        return l = l.stateNode, n = l._retryCache, n === null && (n = l._retryCache = new Zy()), n;
      default:
        throw Error(N(435, l.tag));
    }
  }
  function or(l, n) {
    var u = ky(l);
    n.forEach(function(c) {
      var r = Eg.bind(null, l, c);
      u.has(c) || (u.add(c), c.then(r, r));
    });
  }
  function ma(l, n) {
    var u = n.deletions;
    if (u !== null)
      for (var c = 0; c < u.length; c++) {
        var r = u[c], s = l, y = n, m = y;
        e: for (; m !== null; ) {
          switch (m.tag) {
            case 27:
              if (Cl(m.type)) {
                Yt = m.stateNode, ya = !1;
                break e;
              }
              break;
            case 5:
              Yt = m.stateNode, ya = !1;
              break e;
            case 3:
            case 4:
              Yt = m.stateNode.containerInfo, ya = !0;
              break e;
          }
          m = m.return;
        }
        if (Yt === null) throw Error(N(160));
        Jy(s, y, r), Yt = null, ya = !1, s = r.alternate, s !== null && (s.return = null), r.return = null;
      }
    if (n.subtreeFlags & 13878)
      for (n = n.child; n !== null; )
        Co(n, l), n = n.sibling;
  }
  var _a = null;
  function Co(l, n) {
    var u = l.alternate, c = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        ma(n, l), Vl(l), c & 4 && (gi(3, l, l.return), Uo(3, l), gi(5, l, l.return));
        break;
      case 1:
        ma(n, l), Vl(l), c & 512 && (Wt || u === null || An(u, u.return)), c & 64 && Rn && (l = l.updateQueue, l !== null && (c = l.callbacks, c !== null && (u = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = u === null ? c : u.concat(c))));
        break;
      case 26:
        var r = _a;
        if (ma(n, l), Vl(l), c & 512 && (Wt || u === null || An(u, u.return)), c & 4) {
          var s = u !== null ? u.memoizedState : null;
          if (c = l.memoizedState, u === null)
            if (c === null)
              if (l.stateNode === null) {
                e: {
                  c = l.type, u = l.memoizedProps, r = r.ownerDocument || r;
                  t: switch (c) {
                    case "title":
                      s = r.getElementsByTagName("title")[0], (!s || s[mf] || s[_t] || s.namespaceURI === "http://www.w3.org/2000/svg" || s.hasAttribute("itemprop")) && (s = r.createElement(c), r.head.insertBefore(
                        s,
                        r.querySelector("head > title")
                      )), q(s, c, u), s[_t] = l, Pt(s), c = s;
                      break e;
                    case "link":
                      var y = Zo(
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
                      s = r.createElement(c), q(s, c, u), r.head.appendChild(s);
                      break;
                    case "meta":
                      if (y = Zo(
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
                      s = r.createElement(c), q(s, c, u), r.head.appendChild(s);
                      break;
                    default:
                      throw Error(N(468, c));
                  }
                  s[_t] = l, Pt(s), c = s;
                }
                l.stateNode = c;
              } else
                gm(
                  r,
                  l.type,
                  l.stateNode
                );
            else
              l.stateNode = Cd(
                r,
                c,
                l.memoizedProps
              );
          else
            s !== c ? (s === null ? u.stateNode !== null && (u = u.stateNode, u.parentNode.removeChild(u)) : s.count--, c === null ? gm(
              r,
              l.type,
              l.stateNode
            ) : Cd(
              r,
              c,
              l.memoizedProps
            )) : c === null && l.stateNode !== null && Sc(
              l,
              l.memoizedProps,
              u.memoizedProps
            );
        }
        break;
      case 27:
        ma(n, l), Vl(l), c & 512 && (Wt || u === null || An(u, u.return)), u !== null && c & 4 && Sc(
          l,
          l.memoizedProps,
          u.memoizedProps
        );
        break;
      case 5:
        if (ma(n, l), Vl(l), c & 512 && (Wt || u === null || An(u, u.return)), l.flags & 32) {
          r = l.stateNode;
          try {
            Ki(r, "");
          } catch (w) {
            Ot(l, l.return, w);
          }
        }
        c & 4 && l.stateNode != null && (r = l.memoizedProps, Sc(
          l,
          r,
          u !== null ? u.memoizedProps : r
        )), c & 1024 && (nd = !0);
        break;
      case 6:
        if (ma(n, l), Vl(l), c & 4) {
          if (l.stateNode === null)
            throw Error(N(162));
          c = l.memoizedProps, u = l.stateNode;
          try {
            u.nodeValue = c;
          } catch (w) {
            Ot(l, l.return, w);
          }
        }
        break;
      case 3:
        if (Rr = null, r = _a, _a = bl(n.containerInfo), ma(n, l), _a = r, Vl(l), c & 4 && u !== null && u.memoizedState.isDehydrated)
          try {
            $o(n.containerInfo);
          } catch (w) {
            Ot(l, l.return, w);
          }
        nd && (nd = !1, bc(l));
        break;
      case 4:
        c = _a, _a = bl(
          l.stateNode.containerInfo
        ), ma(n, l), Vl(l), _a = c;
        break;
      case 12:
        ma(n, l), Vl(l);
        break;
      case 13:
        ma(n, l), Vl(l), l.child.flags & 8192 && l.memoizedState !== null != (u !== null && u.memoizedState !== null) && (em = St()), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, or(l, c)));
        break;
      case 22:
        r = l.memoizedState !== null;
        var S = u !== null && u.memoizedState !== null, U = Rn, Z = Wt;
        if (Rn = U || r, Wt = Z || S, ma(n, l), Wt = Z, Rn = U, Vl(l), c & 8192)
          e: for (n = l.stateNode, n._visibility = r ? n._visibility & -2 : n._visibility | 1, r && (u === null || S || Rn || Wt || Nu(l)), u = null, n = l; ; ) {
            if (n.tag === 5 || n.tag === 26) {
              if (u === null) {
                S = u = n;
                try {
                  if (s = S.stateNode, r)
                    y = s.style, typeof y.setProperty == "function" ? y.setProperty("display", "none", "important") : y.display = "none";
                  else {
                    m = S.stateNode;
                    var k = S.memoizedProps.style, H = k != null && k.hasOwnProperty("display") ? k.display : null;
                    m.style.display = H == null || typeof H == "boolean" ? "" : ("" + H).trim();
                  }
                } catch (w) {
                  Ot(S, S.return, w);
                }
              }
            } else if (n.tag === 6) {
              if (u === null) {
                S = n;
                try {
                  S.stateNode.nodeValue = r ? "" : S.memoizedProps;
                } catch (w) {
                  Ot(S, S.return, w);
                }
              }
            } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === l) && n.child !== null) {
              n.child.return = n, n = n.child;
              continue;
            }
            if (n === l) break e;
            for (; n.sibling === null; ) {
              if (n.return === null || n.return === l) break e;
              u === n && (u = null), n = n.return;
            }
            u === n && (u = null), n.sibling.return = n.return, n = n.sibling;
          }
        c & 4 && (c = l.updateQueue, c !== null && (u = c.retryQueue, u !== null && (c.retryQueue = null, or(l, u))));
        break;
      case 19:
        ma(n, l), Vl(l), c & 4 && (c = l.updateQueue, c !== null && (l.updateQueue = null, or(l, c)));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        ma(n, l), Vl(l);
    }
  }
  function Vl(l) {
    var n = l.flags;
    if (n & 2) {
      try {
        for (var u, c = l.return; c !== null; ) {
          if (kp(c)) {
            u = c;
            break;
          }
          c = c.return;
        }
        if (u == null) throw Error(N(160));
        switch (u.tag) {
          case 27:
            var r = u.stateNode, s = Qy(l);
            Si(l, s, r);
            break;
          case 5:
            var y = u.stateNode;
            u.flags & 32 && (Ki(y, ""), u.flags &= -33);
            var m = Qy(l);
            Si(l, m, y);
            break;
          case 3:
          case 4:
            var S = u.stateNode.containerInfo, U = Qy(l);
            Fa(
              l,
              U,
              S
            );
            break;
          default:
            throw Error(N(161));
        }
      } catch (Z) {
        Ot(l, l.return, Z);
      }
      l.flags &= -3;
    }
    n & 4096 && (l.flags &= -4097);
  }
  function bc(l) {
    if (l.subtreeFlags & 1024)
      for (l = l.child; l !== null; ) {
        var n = l;
        bc(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), l = l.sibling;
      }
  }
  function xu(l, n) {
    if (n.subtreeFlags & 8772)
      for (n = n.child; n !== null; )
        ud(l, n.alternate, n), n = n.sibling;
  }
  function Nu(l) {
    for (l = l.child; l !== null; ) {
      var n = l;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          gi(4, n, n.return), Nu(n);
          break;
        case 1:
          An(n, n.return);
          var u = n.stateNode;
          typeof u.componentWillUnmount == "function" && ad(
            n,
            n.return,
            u
          ), Nu(n);
          break;
        case 27:
          ne(n.stateNode);
        case 26:
        case 5:
          An(n, n.return), Nu(n);
          break;
        case 22:
          n.memoizedState === null && Nu(n);
          break;
        case 30:
          Nu(n);
          break;
        default:
          Nu(n);
      }
      l = l.sibling;
    }
  }
  function wt(l, n, u) {
    for (u = u && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null; ) {
      var c = n.alternate, r = l, s = n, y = s.flags;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          wt(
            r,
            s,
            u
          ), Uo(4, s);
          break;
        case 1:
          if (wt(
            r,
            s,
            u
          ), c = s, r = c.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (U) {
              Ot(c, c.return, U);
            }
          if (c = s, r = c.updateQueue, r !== null) {
            var m = c.stateNode;
            try {
              var S = r.shared.hiddenCallbacks;
              if (S !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < S.length; r++)
                  vo(S[r], m);
            } catch (U) {
              Ot(c, c.return, U);
            }
          }
          u && y & 64 && Jp(s), _o(s, s.return);
          break;
        case 27:
          $p(s);
        case 26:
        case 5:
          wt(
            r,
            s,
            u
          ), u && c === null && y & 4 && Xy(s), _o(s, s.return);
          break;
        case 12:
          wt(
            r,
            s,
            u
          );
          break;
        case 13:
          wt(
            r,
            s,
            u
          ), u && y & 4 && We(r, s);
          break;
        case 22:
          s.memoizedState === null && wt(
            r,
            s,
            u
          ), _o(s, s.return);
          break;
        case 30:
          break;
        default:
          wt(
            r,
            s,
            u
          );
      }
      n = n.sibling;
    }
  }
  function $y(l, n) {
    var u = null;
    l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (u = l.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== u && (l != null && l.refCount++, u != null && di(u));
  }
  function Pa(l, n) {
    l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && di(l));
  }
  function On(l, n, u, c) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; )
        qu(
          l,
          n,
          u,
          c
        ), n = n.sibling;
  }
  function qu(l, n, u, c) {
    var r = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        On(
          l,
          n,
          u,
          c
        ), r & 2048 && Uo(9, n);
        break;
      case 1:
        On(
          l,
          n,
          u,
          c
        );
        break;
      case 3:
        On(
          l,
          n,
          u,
          c
        ), r & 2048 && (l = null, n.alternate !== null && (l = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== l && (n.refCount++, l != null && di(l)));
        break;
      case 12:
        if (r & 2048) {
          On(
            l,
            n,
            u,
            c
          ), l = n.stateNode;
          try {
            var s = n.memoizedProps, y = s.id, m = s.onPostCommit;
            typeof m == "function" && m(
              y,
              n.alternate === null ? "mount" : "update",
              l.passiveEffectDuration,
              -0
            );
          } catch (S) {
            Ot(n, n.return, S);
          }
        } else
          On(
            l,
            n,
            u,
            c
          );
        break;
      case 13:
        On(
          l,
          n,
          u,
          c
        );
        break;
      case 23:
        break;
      case 22:
        s = n.stateNode, y = n.alternate, n.memoizedState !== null ? s._visibility & 2 ? On(
          l,
          n,
          u,
          c
        ) : bi(l, n) : s._visibility & 2 ? On(
          l,
          n,
          u,
          c
        ) : (s._visibility |= 2, Tc(
          l,
          n,
          u,
          c,
          (n.subtreeFlags & 10256) !== 0
        )), r & 2048 && $y(y, n);
        break;
      case 24:
        On(
          l,
          n,
          u,
          c
        ), r & 2048 && Pa(n.alternate, n);
        break;
      default:
        On(
          l,
          n,
          u,
          c
        );
    }
  }
  function Tc(l, n, u, c, r) {
    for (r = r && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null; ) {
      var s = l, y = n, m = u, S = c, U = y.flags;
      switch (y.tag) {
        case 0:
        case 11:
        case 15:
          Tc(
            s,
            y,
            m,
            S,
            r
          ), Uo(8, y);
          break;
        case 23:
          break;
        case 22:
          var Z = y.stateNode;
          y.memoizedState !== null ? Z._visibility & 2 ? Tc(
            s,
            y,
            m,
            S,
            r
          ) : bi(
            s,
            y
          ) : (Z._visibility |= 2, Tc(
            s,
            y,
            m,
            S,
            r
          )), r && U & 2048 && $y(
            y.alternate,
            y
          );
          break;
        case 24:
          Tc(
            s,
            y,
            m,
            S,
            r
          ), r && U & 2048 && Pa(y.alternate, y);
          break;
        default:
          Tc(
            s,
            y,
            m,
            S,
            r
          );
      }
      n = n.sibling;
    }
  }
  function bi(l, n) {
    if (n.subtreeFlags & 10256)
      for (n = n.child; n !== null; ) {
        var u = l, c = n, r = c.flags;
        switch (c.tag) {
          case 22:
            bi(u, c), r & 2048 && $y(
              c.alternate,
              c
            );
            break;
          case 24:
            bi(u, c), r & 2048 && Pa(c.alternate, c);
            break;
          default:
            bi(u, c);
        }
        n = n.sibling;
      }
  }
  var it = 8192;
  function Ti(l) {
    if (l.subtreeFlags & it)
      for (l = l.child; l !== null; )
        Sl(l), l = l.sibling;
  }
  function Sl(l) {
    switch (l.tag) {
      case 26:
        Ti(l), l.flags & it && l.memoizedState !== null && pv(
          _a,
          l.memoizedState,
          l.memoizedProps
        );
        break;
      case 5:
        Ti(l);
        break;
      case 3:
      case 4:
        var n = _a;
        _a = bl(l.stateNode.containerInfo), Ti(l), _a = n;
        break;
      case 22:
        l.memoizedState === null && (n = l.alternate, n !== null && n.memoizedState !== null ? (n = it, it = 16777216, Ti(l), it = n) : Ti(l));
        break;
      default:
        Ti(l);
    }
  }
  function Fp(l) {
    var n = l.alternate;
    if (n !== null && (l = n.child, l !== null)) {
      n.child = null;
      do
        n = l.sibling, l.sibling = null, l = n;
      while (l !== null);
    }
  }
  function Ho(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          il = c, Ca(
            c,
            l
          );
        }
      Fp(l);
    }
    if (l.subtreeFlags & 10256)
      for (l = l.child; l !== null; )
        id(l), l = l.sibling;
  }
  function id(l) {
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        Ho(l), l.flags & 2048 && gi(9, l, l.return);
        break;
      case 3:
        Ho(l);
        break;
      case 12:
        Ho(l);
        break;
      case 22:
        var n = l.stateNode;
        l.memoizedState !== null && n._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (n._visibility &= -3, fr(l)) : Ho(l);
        break;
      default:
        Ho(l);
    }
  }
  function fr(l) {
    var n = l.deletions;
    if ((l.flags & 16) !== 0) {
      if (n !== null)
        for (var u = 0; u < n.length; u++) {
          var c = n[u];
          il = c, Ca(
            c,
            l
          );
        }
      Fp(l);
    }
    for (l = l.child; l !== null; ) {
      switch (n = l, n.tag) {
        case 0:
        case 11:
        case 15:
          gi(8, n, n.return), fr(n);
          break;
        case 22:
          u = n.stateNode, u._visibility & 2 && (u._visibility &= -3, fr(n));
          break;
        default:
          fr(n);
      }
      l = l.sibling;
    }
  }
  function Ca(l, n) {
    for (; il !== null; ) {
      var u = il;
      switch (u.tag) {
        case 0:
        case 11:
        case 15:
          gi(8, u, n);
          break;
        case 23:
        case 22:
          if (u.memoizedState !== null && u.memoizedState.cachePool !== null) {
            var c = u.memoizedState.cachePool.pool;
            c != null && c.refCount++;
          }
          break;
        case 24:
          di(u.memoizedState.cache);
      }
      if (c = u.child, c !== null) c.return = u, il = c;
      else
        e: for (u = l; il !== null; ) {
          c = il;
          var r = c.sibling, s = c.return;
          if (Ky(c), c === u) {
            il = null;
            break e;
          }
          if (r !== null) {
            r.return = s, il = r;
            break e;
          }
          il = s;
        }
    }
  }
  var Ip = {
    getCacheForType: function(l) {
      var n = Ul(nl), u = n.data.get(l);
      return u === void 0 && (u = l(), n.data.set(l, u)), u;
    }
  }, Wy = typeof WeakMap == "function" ? WeakMap : Map, vt = 0, Rt = null, Fe = null, nt = 0, ct = 0, pa = null, Bu = !1, Ei = !1, Fy = !1, Yu = 0, Ft = 0, Ai = 0, Ri = 0, Iy = 0, dl = 0, xo = 0, rr = null, Fl = null, Py = !1, em = 0, cd = 1 / 0, od = null, Qn = null, _l = 0, Oi = null, Di = null, No = 0, va = 0, fd = null, tm = null, qo = 0, rd = null;
  function Ha() {
    if ((vt & 2) !== 0 && nt !== 0)
      return nt & -nt;
    if (L.T !== null) {
      var l = hi;
      return l !== 0 ? l : bd();
    }
    return qn();
  }
  function Pp() {
    dl === 0 && (dl = (nt & 536870912) === 0 || je ? z() : 536870912);
    var l = ul.current;
    return l !== null && (l.flags |= 32), dl;
  }
  function ga(l, n, u) {
    (l === Rt && (ct === 2 || ct === 9) || l.cancelPendingCommit !== null) && (Dn(l, 0), wu(
      l,
      nt,
      dl,
      !1
    )), re(l, u), ((vt & 2) === 0 || l !== Rt) && (l === Rt && ((vt & 2) === 0 && (Ri |= u), Ft === 4 && wu(
      l,
      nt,
      dl,
      !1
    )), zn(l));
  }
  function ev(l, n, u) {
    if ((vt & 6) !== 0) throw Error(N(327));
    var c = !u && (n & 124) === 0 && (n & l.expiredLanes) === 0 || La(l, n), r = c ? dd(l, n) : Ec(l, n, !0), s = c;
    do {
      if (r === 0) {
        Ei && !c && wu(l, n, 0, !1);
        break;
      } else {
        if (u = l.current.alternate, s && !sd(u)) {
          r = Ec(l, n, !1), s = !1;
          continue;
        }
        if (r === 2) {
          if (s = n, l.errorRecoveryDisabledLanes & s)
            var y = 0;
          else
            y = l.pendingLanes & -536870913, y = y !== 0 ? y : y & 536870912 ? 536870912 : 0;
          if (y !== 0) {
            n = y;
            e: {
              var m = l;
              r = rr;
              var S = m.current.memoizedState.isDehydrated;
              if (S && (Dn(m, y).flags |= 256), y = Ec(
                m,
                y,
                !1
              ), y !== 2) {
                if (Fy && !S) {
                  m.errorRecoveryDisabledLanes |= s, Ri |= s, r = 4;
                  break e;
                }
                s = Fl, Fl = r, s !== null && (Fl === null ? Fl = s : Fl.push.apply(
                  Fl,
                  s
                ));
              }
              r = y;
            }
            if (s = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          Dn(l, 0), wu(l, n, 0, !0);
          break;
        }
        e: {
          switch (c = l, s = r, s) {
            case 0:
            case 1:
              throw Error(N(345));
            case 4:
              if ((n & 4194048) !== n) break;
            case 6:
              wu(
                c,
                n,
                dl,
                !Bu
              );
              break e;
            case 2:
              Fl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(N(329));
          }
          if ((n & 62914560) === n && (r = em + 300 - St(), 10 < r)) {
            if (wu(
              c,
              n,
              dl,
              !Bu
            ), ta(c, 0, !0) !== 0) break e;
            c.timeoutHandle = Jn(
              Bo.bind(
                null,
                c,
                u,
                Fl,
                od,
                Py,
                n,
                dl,
                Ri,
                xo,
                Bu,
                s,
                2,
                -0,
                0
              ),
              r
            );
            break e;
          }
          Bo(
            c,
            u,
            Fl,
            od,
            Py,
            n,
            dl,
            Ri,
            xo,
            Bu,
            s,
            0,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    zn(l);
  }
  function Bo(l, n, u, c, r, s, y, m, S, U, Z, k, H, w) {
    if (l.timeoutHandle = -1, k = n.subtreeFlags, (k & 8192 || (k & 16785408) === 16785408) && (Ko = { stylesheets: null, count: 0, unsuspend: mv }, Sl(n), k = vv(), k !== null)) {
      l.cancelPendingCommit = k(
        av.bind(
          null,
          l,
          n,
          s,
          u,
          c,
          r,
          y,
          m,
          S,
          Z,
          1,
          H,
          w
        )
      ), wu(l, s, y, !U);
      return;
    }
    av(
      l,
      n,
      s,
      u,
      c,
      r,
      y,
      m,
      S
    );
  }
  function sd(l) {
    for (var n = l; ; ) {
      var u = n.tag;
      if ((u === 0 || u === 11 || u === 15) && n.flags & 16384 && (u = n.updateQueue, u !== null && (u = u.stores, u !== null)))
        for (var c = 0; c < u.length; c++) {
          var r = u[c], s = r.getSnapshot;
          r = r.value;
          try {
            if (!kl(s(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (u = n.child, n.subtreeFlags & 16384 && u !== null)
        u.return = n, n = u;
      else {
        if (n === l) break;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === l) return !0;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
    }
    return !0;
  }
  function wu(l, n, u, c) {
    n &= ~Iy, n &= ~Ri, l.suspendedLanes |= n, l.pingedLanes &= ~n, c && (l.warmLanes |= n), c = l.expirationTimes;
    for (var r = n; 0 < r; ) {
      var s = 31 - Ol(r), y = 1 << s;
      c[s] = -1, r &= ~y;
    }
    u !== 0 && Ce(l, u, n);
  }
  function sr() {
    return (vt & 6) === 0 ? (ju(0), !1) : !0;
  }
  function Yo() {
    if (Fe !== null) {
      if (ct === 0)
        var l = Fe.return;
      else
        l = Fe, pn = Ru = null, So(l), sa = null, Ao = 0, l = Fe;
      for (; l !== null; )
        Kp(l.alternate, l), l = l.return;
      Fe = null;
    }
  }
  function Dn(l, n) {
    var u = l.timeoutHandle;
    u !== -1 && (l.timeoutHandle = -1, sm(u)), u = l.cancelPendingCommit, u !== null && (l.cancelPendingCommit = null, u()), Yo(), Rt = l, Fe = u = dn(l.current, null), nt = n, ct = 0, pa = null, Bu = !1, Ei = La(l, n), Fy = !1, xo = dl = Iy = Ri = Ai = Ft = 0, Fl = rr = null, Py = !1, (n & 8) !== 0 && (n |= n & 32);
    var c = l.entangledLanes;
    if (c !== 0)
      for (l = l.entanglements, c &= n; 0 < c; ) {
        var r = 31 - Ol(c), s = 1 << r;
        n |= l[r], c &= ~s;
      }
    return Yu = n, rn(), u;
  }
  function wo(l, n) {
    He = null, L.H = lr, n === oc || n === ho ? (n = Hs(), ct = 3) : n === Gf ? (n = Hs(), ct = 4) : ct = n === xy ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, pa = n, Fe === null && (Ft = 1, pc(
      l,
      Da(n, l.current)
    ));
  }
  function lm() {
    var l = L.H;
    return L.H = lr, l === null ? lr : l;
  }
  function tv() {
    var l = L.A;
    return L.A = Ip, l;
  }
  function zi() {
    Ft = 4, Bu || (nt & 4194048) !== nt && ul.current !== null || (Ei = !0), (Ai & 134217727) === 0 && (Ri & 134217727) === 0 || Rt === null || wu(
      Rt,
      nt,
      dl,
      !1
    );
  }
  function Ec(l, n, u) {
    var c = vt;
    vt |= 2;
    var r = lm(), s = tv();
    (Rt !== l || nt !== n) && (od = null, Dn(l, n)), n = !1;
    var y = Ft;
    e: do
      try {
        if (ct !== 0 && Fe !== null) {
          var m = Fe, S = pa;
          switch (ct) {
            case 8:
              Yo(), y = 6;
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              ul.current === null && (n = !0);
              var U = ct;
              if (ct = 0, pa = null, Ac(l, m, S, U), u && Ei) {
                y = 0;
                break e;
              }
              break;
            default:
              U = ct, ct = 0, pa = null, Ac(l, m, S, U);
          }
        }
        lv(), y = Ft;
        break;
      } catch (Z) {
        wo(l, Z);
      }
    while (!0);
    return n && l.shellSuspendCounter++, pn = Ru = null, vt = c, L.H = r, L.A = s, Fe === null && (Rt = null, nt = 0, rn()), y;
  }
  function lv() {
    for (; Fe !== null; ) hd(Fe);
  }
  function dd(l, n) {
    var u = vt;
    vt |= 2;
    var c = lm(), r = tv();
    Rt !== l || nt !== n ? (od = null, cd = St() + 500, Dn(l, n)) : Ei = La(
      l,
      n
    );
    e: do
      try {
        if (ct !== 0 && Fe !== null) {
          n = Fe;
          var s = pa;
          t: switch (ct) {
            case 1:
              ct = 0, pa = null, Ac(l, n, s, 1);
              break;
            case 2:
            case 9:
              if (ty(s)) {
                ct = 0, pa = null, nm(n);
                break;
              }
              n = function() {
                ct !== 2 && ct !== 9 || Rt !== l || (ct = 7), zn(l);
              }, s.then(n, n);
              break e;
            case 3:
              ct = 7;
              break e;
            case 4:
              ct = 5;
              break e;
            case 7:
              ty(s) ? (ct = 0, pa = null, nm(n)) : (ct = 0, pa = null, Ac(l, n, s, 7));
              break;
            case 5:
              var y = null;
              switch (Fe.tag) {
                case 26:
                  y = Fe.memoizedState;
                case 5:
                case 27:
                  var m = Fe;
                  if (!y || Sm(y)) {
                    ct = 0, pa = null;
                    var S = m.sibling;
                    if (S !== null) Fe = S;
                    else {
                      var U = m.return;
                      U !== null ? (Fe = U, yd(U)) : Fe = null;
                    }
                    break t;
                  }
              }
              ct = 0, pa = null, Ac(l, n, s, 5);
              break;
            case 6:
              ct = 0, pa = null, Ac(l, n, s, 6);
              break;
            case 8:
              Yo(), Ft = 6;
              break e;
            default:
              throw Error(N(462));
          }
        }
        am();
        break;
      } catch (Z) {
        wo(l, Z);
      }
    while (!0);
    return pn = Ru = null, L.H = c, L.A = r, vt = u, Fe !== null ? 0 : (Rt = null, nt = 0, rn(), Ft);
  }
  function am() {
    for (; Fe !== null && !Fr(); )
      hd(Fe);
  }
  function hd(l) {
    var n = Gy(l.alternate, l, Yu);
    l.memoizedProps = l.pendingProps, n === null ? yd(l) : Fe = n;
  }
  function nm(l) {
    var n = l, u = n.alternate;
    switch (n.tag) {
      case 15:
      case 0:
        n = qy(
          u,
          n,
          n.pendingProps,
          n.type,
          void 0,
          nt
        );
        break;
      case 11:
        n = qy(
          u,
          n,
          n.pendingProps,
          n.type.render,
          n.ref,
          nt
        );
        break;
      case 5:
        So(n);
      default:
        Kp(u, n), n = Fe = Os(n, Yu), n = Gy(u, n, Yu);
    }
    l.memoizedProps = l.pendingProps, n === null ? yd(l) : Fe = n;
  }
  function Ac(l, n, u, c) {
    pn = Ru = null, So(n), sa = null, Ao = 0;
    var r = n.return;
    try {
      if (Ua(
        l,
        r,
        n,
        u,
        nt
      )) {
        Ft = 1, pc(
          l,
          Da(u, l.current)
        ), Fe = null;
        return;
      }
    } catch (s) {
      if (r !== null) throw Fe = r, s;
      Ft = 1, pc(
        l,
        Da(u, l.current)
      ), Fe = null;
      return;
    }
    n.flags & 32768 ? (je || c === 1 ? l = !0 : Ei || (nt & 536870912) !== 0 ? l = !1 : (Bu = l = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = ul.current, c !== null && c.tag === 13 && (c.flags |= 16384))), um(n, l)) : yd(n);
  }
  function yd(l) {
    var n = l;
    do {
      if ((n.flags & 32768) !== 0) {
        um(
          n,
          Bu
        );
        return;
      }
      l = n.return;
      var u = At(
        n.alternate,
        n,
        Yu
      );
      if (u !== null) {
        Fe = u;
        return;
      }
      if (n = n.sibling, n !== null) {
        Fe = n;
        return;
      }
      Fe = n = l;
    } while (n !== null);
    Ft === 0 && (Ft = 5);
  }
  function um(l, n) {
    do {
      var u = Vy(l.alternate, l);
      if (u !== null) {
        u.flags &= 32767, Fe = u;
        return;
      }
      if (u = l.return, u !== null && (u.flags |= 32768, u.subtreeFlags = 0, u.deletions = null), !n && (l = l.sibling, l !== null)) {
        Fe = l;
        return;
      }
      Fe = l = u;
    } while (l !== null);
    Ft = 6, Fe = null;
  }
  function av(l, n, u, c, r, s, y, m, S) {
    l.cancelPendingCommit = null;
    do
      pd();
    while (_l !== 0);
    if ((vt & 6) !== 0) throw Error(N(327));
    if (n !== null) {
      if (n === l.current) throw Error(N(177));
      if (s = n.lanes | n.childLanes, s |= Cf, Xe(
        l,
        u,
        s,
        y,
        m,
        S
      ), l === Rt && (Fe = Rt = null, nt = 0), Di = n, Oi = l, No = u, va = s, fd = r, tm = c, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, Ag(Ne, function() {
        return iv(), null;
      })) : (l.callbackNode = null, l.callbackPriority = 0), c = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || c) {
        c = L.T, L.T = null, r = Y.p, Y.p = 2, y = vt, vt |= 4;
        try {
          Wp(l, n, u);
        } finally {
          vt = y, Y.p = r, L.T = c;
        }
      }
      _l = 1, nv(), uv(), dr();
    }
  }
  function nv() {
    if (_l === 1) {
      _l = 0;
      var l = Oi, n = Di, u = (n.flags & 13878) !== 0;
      if ((n.subtreeFlags & 13878) !== 0 || u) {
        u = L.T, L.T = null;
        var c = Y.p;
        Y.p = 2;
        var r = vt;
        vt |= 4;
        try {
          Co(n, l);
          var s = br, y = Uf(l.containerInfo), m = s.focusedElem, S = s.selectionRange;
          if (y !== m && m && m.ownerDocument && qt(
            m.ownerDocument.documentElement,
            m
          )) {
            if (S !== null && bs(m)) {
              var U = S.start, Z = S.end;
              if (Z === void 0 && (Z = U), "selectionStart" in m)
                m.selectionStart = U, m.selectionEnd = Math.min(
                  Z,
                  m.value.length
                );
              else {
                var k = m.ownerDocument || document, H = k && k.defaultView || window;
                if (H.getSelection) {
                  var w = H.getSelection(), Ee = m.textContent.length, Se = Math.min(S.start, Ee), dt = S.end === void 0 ? Se : Math.min(S.end, Ee);
                  !w.extend && Se > dt && (y = dt, dt = Se, Se = y);
                  var M = ui(
                    m,
                    Se
                  ), O = ui(
                    m,
                    dt
                  );
                  if (M && O && (w.rangeCount !== 1 || w.anchorNode !== M.node || w.anchorOffset !== M.offset || w.focusNode !== O.node || w.focusOffset !== O.offset)) {
                    var _ = k.createRange();
                    _.setStart(M.node, M.offset), w.removeAllRanges(), Se > dt ? (w.addRange(_), w.extend(O.node, O.offset)) : (_.setEnd(O.node, O.offset), w.addRange(_));
                  }
                }
              }
            }
            for (k = [], w = m; w = w.parentNode; )
              w.nodeType === 1 && k.push({
                element: w,
                left: w.scrollLeft,
                top: w.scrollTop
              });
            for (typeof m.focus == "function" && m.focus(), m = 0; m < k.length; m++) {
              var K = k[m];
              K.element.scrollLeft = K.left, K.element.scrollTop = K.top;
            }
          }
          zr = !!rm, br = rm = null;
        } finally {
          vt = r, Y.p = c, L.T = u;
        }
      }
      l.current = n, _l = 2;
    }
  }
  function uv() {
    if (_l === 2) {
      _l = 0;
      var l = Oi, n = Di, u = (n.flags & 8772) !== 0;
      if ((n.subtreeFlags & 8772) !== 0 || u) {
        u = L.T, L.T = null;
        var c = Y.p;
        Y.p = 2;
        var r = vt;
        vt |= 4;
        try {
          ud(l, n.alternate, n);
        } finally {
          vt = r, Y.p = c, L.T = u;
        }
      }
      _l = 3;
    }
  }
  function dr() {
    if (_l === 4 || _l === 3) {
      _l = 0, sf();
      var l = Oi, n = Di, u = No, c = tm;
      (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? _l = 5 : (_l = 0, Di = Oi = null, md(l, l.pendingLanes));
      var r = l.pendingLanes;
      if (r === 0 && (Qn = null), ll(u), n = n.stateNode, Yl && typeof Yl.onCommitFiberRoot == "function")
        try {
          Yl.onCommitFiberRoot(
            hu,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (c !== null) {
        n = L.T, r = Y.p, Y.p = 2, L.T = null;
        try {
          for (var s = l.onRecoverableError, y = 0; y < c.length; y++) {
            var m = c[y];
            s(m.value, {
              componentStack: m.stack
            });
          }
        } finally {
          L.T = n, Y.p = r;
        }
      }
      (No & 3) !== 0 && pd(), zn(l), r = l.pendingLanes, (u & 4194090) !== 0 && (r & 42) !== 0 ? l === rd ? qo++ : (qo = 0, rd = l) : qo = 0, ju(0);
    }
  }
  function md(l, n) {
    (l.pooledCacheLanes &= n) === 0 && (n = l.pooledCache, n != null && (l.pooledCache = null, di(n)));
  }
  function pd(l) {
    return nv(), uv(), dr(), iv();
  }
  function iv() {
    if (_l !== 5) return !1;
    var l = Oi, n = va;
    va = 0;
    var u = ll(No), c = L.T, r = Y.p;
    try {
      Y.p = 32 > u ? 32 : u, L.T = null, u = fd, fd = null;
      var s = Oi, y = No;
      if (_l = 0, Di = Oi = null, No = 0, (vt & 6) !== 0) throw Error(N(331));
      var m = vt;
      if (vt |= 4, id(s.current), qu(
        s,
        s.current,
        y,
        u
      ), vt = m, ju(0, !1), Yl && typeof Yl.onPostCommitFiberRoot == "function")
        try {
          Yl.onPostCommitFiberRoot(hu, s);
        } catch {
        }
      return !0;
    } finally {
      Y.p = r, L.T = c, md(l, n);
    }
  }
  function im(l, n, u) {
    n = Da(u, n), n = Ws(l.stateNode, n, 2), l = oa(l, n, 2), l !== null && (re(l, 2), zn(l));
  }
  function Ot(l, n, u) {
    if (l.tag === 3)
      im(l, l, u);
    else
      for (; n !== null; ) {
        if (n.tag === 3) {
          im(
            n,
            l,
            u
          );
          break;
        } else if (n.tag === 1) {
          var c = n.stateNode;
          if (typeof n.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Qn === null || !Qn.has(c))) {
            l = Da(u, l), u = Vp(2), c = oa(n, u, 2), c !== null && (Hy(
              u,
              c,
              n,
              l
            ), re(c, 2), zn(c));
            break;
          }
        }
        n = n.return;
      }
  }
  function hr(l, n, u) {
    var c = l.pingCache;
    if (c === null) {
      c = l.pingCache = new Wy();
      var r = /* @__PURE__ */ new Set();
      c.set(n, r);
    } else
      r = c.get(n), r === void 0 && (r = /* @__PURE__ */ new Set(), c.set(n, r));
    r.has(u) || (Fy = !0, r.add(u), l = cv.bind(null, l, n, u), n.then(l, l));
  }
  function cv(l, n, u) {
    var c = l.pingCache;
    c !== null && c.delete(n), l.pingedLanes |= l.suspendedLanes & u, l.warmLanes &= ~u, Rt === l && (nt & u) === u && (Ft === 4 || Ft === 3 && (nt & 62914560) === nt && 300 > St() - em ? (vt & 2) === 0 && Dn(l, 0) : Iy |= u, xo === nt && (xo = 0)), zn(l);
  }
  function vd(l, n) {
    n === 0 && (n = P()), l = Tu(l, n), l !== null && (re(l, n), zn(l));
  }
  function ov(l) {
    var n = l.memoizedState, u = 0;
    n !== null && (u = n.retryLane), vd(l, u);
  }
  function Eg(l, n) {
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
        throw Error(N(314));
    }
    c !== null && c.delete(n), vd(l, u);
  }
  function Ag(l, n) {
    return Gi(l, n);
  }
  var gd = null, jo = null, yr = !1, Go = !1, mr = !1, Mi = 0;
  function zn(l) {
    l !== jo && l.next === null && (jo === null ? gd = jo = l : jo = jo.next = l), Go = !0, yr || (yr = !0, Sd());
  }
  function ju(l, n) {
    if (!mr && Go) {
      mr = !0;
      do
        for (var u = !1, c = gd; c !== null; ) {
          if (l !== 0) {
            var r = c.pendingLanes;
            if (r === 0) var s = 0;
            else {
              var y = c.suspendedLanes, m = c.pingedLanes;
              s = (1 << 31 - Ol(42 | l) + 1) - 1, s &= r & ~(y & ~m), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (u = !0, fv(c, s));
          } else
            s = nt, s = ta(
              c,
              c === Rt ? s : 0,
              c.cancelPendingCommit !== null || c.timeoutHandle !== -1
            ), (s & 3) === 0 || La(c, s) || (u = !0, fv(c, s));
          c = c.next;
        }
      while (u);
      mr = !1;
    }
  }
  function Rg() {
    cm();
  }
  function cm() {
    Go = yr = !1;
    var l = 0;
    Mi !== 0 && (zd() && (l = Mi), Mi = 0);
    for (var n = St(), u = null, c = gd; c !== null; ) {
      var r = c.next, s = pr(c, n);
      s === 0 ? (c.next = null, u === null ? gd = r : u.next = r, r === null && (jo = u)) : (u = c, (l !== 0 || (s & 3) !== 0) && (Go = !0)), c = r;
    }
    ju(l);
  }
  function pr(l, n) {
    for (var u = l.suspendedLanes, c = l.pingedLanes, r = l.expirationTimes, s = l.pendingLanes & -62914561; 0 < s; ) {
      var y = 31 - Ol(s), m = 1 << y, S = r[y];
      S === -1 ? ((m & u) === 0 || (m & c) !== 0) && (r[y] = p(m, n)) : S <= n && (l.expiredLanes |= m), s &= ~m;
    }
    if (n = Rt, u = nt, u = ta(
      l,
      l === n ? u : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c = l.callbackNode, u === 0 || l === n && (ct === 2 || ct === 9) || l.cancelPendingCommit !== null)
      return c !== null && c !== null && Nn(c), l.callbackNode = null, l.callbackPriority = 0;
    if ((u & 3) === 0 || La(l, u)) {
      if (n = u & -u, n === l.callbackPriority) return n;
      switch (c !== null && Nn(c), ll(u)) {
        case 2:
        case 8:
          u = Ir;
          break;
        case 32:
          u = Ne;
          break;
        case 268435456:
          u = Vi;
          break;
        default:
          u = Ne;
      }
      return c = om.bind(null, l), u = Gi(u, c), l.callbackPriority = n, l.callbackNode = u, n;
    }
    return c !== null && c !== null && Nn(c), l.callbackPriority = 2, l.callbackNode = null, 2;
  }
  function om(l, n) {
    if (_l !== 0 && _l !== 5)
      return l.callbackNode = null, l.callbackPriority = 0, null;
    var u = l.callbackNode;
    if (pd() && l.callbackNode !== u)
      return null;
    var c = nt;
    return c = ta(
      l,
      l === Rt ? c : 0,
      l.cancelPendingCommit !== null || l.timeoutHandle !== -1
    ), c === 0 ? null : (ev(l, c, n), pr(l, St()), l.callbackNode != null && l.callbackNode === u ? om.bind(null, l) : null);
  }
  function fv(l, n) {
    if (pd()) return null;
    ev(l, n, !0);
  }
  function Sd() {
    zg(function() {
      (vt & 6) !== 0 ? Gi(
        du,
        Rg
      ) : cm();
    });
  }
  function bd() {
    return Mi === 0 && (Mi = z()), Mi;
  }
  function Lo(l) {
    return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : bf("" + l);
  }
  function Td(l, n) {
    var u = n.ownerDocument.createElement("input");
    return u.name = n.name, u.value = n.value, l.id && u.setAttribute("form", l.id), n.parentNode.insertBefore(u, n), l = new FormData(l), u.parentNode.removeChild(u), l;
  }
  function Ed(l, n, u, c, r) {
    if (n === "submit" && u && u.stateNode === r) {
      var s = Lo(
        (r[wl] || null).action
      ), y = c.submitter;
      y && (n = (n = y[wl] || null) ? Lo(n.formAction) : y.getAttribute("formAction"), n !== null && (s = n, y = null));
      var m = new Af(
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
                if (Mi !== 0) {
                  var S = y ? Td(r, y) : new FormData(r);
                  Ty(
                    u,
                    {
                      pending: !0,
                      data: S,
                      method: r.method,
                      action: s
                    },
                    null,
                    S
                  );
                }
              } else
                typeof s == "function" && (m.preventDefault(), S = y ? Td(r, y) : new FormData(r), Ty(
                  u,
                  {
                    pending: !0,
                    data: S,
                    method: r.method,
                    action: s
                  },
                  s,
                  S
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var Ad = 0; Ad < As.length; Ad++) {
    var It = As[Ad], fm = It.toLowerCase(), Og = It[0].toUpperCase() + It.slice(1);
    na(
      fm,
      "on" + Og
    );
  }
  na(_f, "onAnimationEnd"), na(Cp, "onAnimationIteration"), na(Zh, "onAnimationStart"), na("dblclick", "onDoubleClick"), na("focusin", "onFocus"), na("focusout", "onBlur"), na(gg, "onTransitionRun"), na(Kh, "onTransitionStart"), na(Es, "onTransitionCancel"), na(Jh, "onTransitionEnd"), Qi("onMouseEnter", ["mouseout", "mouseover"]), Qi("onMouseLeave", ["mouseout", "mouseover"]), Qi("onPointerEnter", ["pointerout", "pointerover"]), Qi("onPointerLeave", ["pointerout", "pointerover"]), pl(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), pl(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), pl("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), pl(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), pl(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), pl(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Me = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), Dg = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Me)
  );
  function Gu(l, n) {
    n = (n & 4) !== 0;
    for (var u = 0; u < l.length; u++) {
      var c = l[u], r = c.event;
      c = c.listeners;
      e: {
        var s = void 0;
        if (n)
          for (var y = c.length - 1; 0 <= y; y--) {
            var m = c[y], S = m.instance, U = m.currentTarget;
            if (m = m.listener, S !== s && r.isPropagationStopped())
              break e;
            s = m, r.currentTarget = U;
            try {
              s(r);
            } catch (Z) {
              ur(Z);
            }
            r.currentTarget = null, s = S;
          }
        else
          for (y = 0; y < c.length; y++) {
            if (m = c[y], S = m.instance, U = m.currentTarget, m = m.listener, S !== s && r.isPropagationStopped())
              break e;
            s = m, r.currentTarget = U;
            try {
              s(r);
            } catch (Z) {
              ur(Z);
            }
            r.currentTarget = null, s = S;
          }
      }
    }
  }
  function qe(l, n) {
    var u = n[Sh];
    u === void 0 && (u = n[Sh] = /* @__PURE__ */ new Set());
    var c = l + "__bubble";
    u.has(c) || (rv(n, l, 2, !1), u.add(c));
  }
  function Ui(l, n, u) {
    var c = 0;
    n && (c |= 4), rv(
      u,
      l,
      c,
      n
    );
  }
  var Rc = "_reactListening" + Math.random().toString(36).slice(2);
  function vr(l) {
    if (!l[Rc]) {
      l[Rc] = !0, bh.forEach(function(u) {
        u !== "selectionchange" && (Dg.has(u) || Ui(u, !1, l), Ui(u, !0, l));
      });
      var n = l.nodeType === 9 ? l : l.ownerDocument;
      n === null || n[Rc] || (n[Rc] = !0, Ui("selectionchange", !1, n));
    }
  }
  function rv(l, n, u, c) {
    switch (Tv(n)) {
      case 2:
        var r = Sv;
        break;
      case 8:
        r = bv;
        break;
      default:
        r = qd;
    }
    u = r.bind(
      null,
      n,
      u,
      l
    ), r = void 0, !is || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (r = !0), c ? r !== void 0 ? l.addEventListener(n, u, {
      capture: !0,
      passive: r
    }) : l.addEventListener(n, u, !0) : r !== void 0 ? l.addEventListener(n, u, {
      passive: r
    }) : l.addEventListener(n, u, !1);
  }
  function gr(l, n, u, c, r) {
    var s = c;
    if ((n & 1) === 0 && (n & 2) === 0 && c !== null)
      e: for (; ; ) {
        if (c === null) return;
        var y = c.tag;
        if (y === 3 || y === 4) {
          var m = c.stateNode.containerInfo;
          if (m === r) break;
          if (y === 4)
            for (y = c.return; y !== null; ) {
              var S = y.tag;
              if ((S === 3 || S === 4) && y.stateNode.containerInfo === r)
                return;
              y = y.return;
            }
          for (; m !== null; ) {
            if (y = Pu(m), y === null) return;
            if (S = y.tag, S === 5 || S === 6 || S === 26 || S === 27) {
              c = s = y;
              continue e;
            }
            m = m.parentNode;
          }
        }
        c = c.return;
      }
    bp(function() {
      var U = s, Z = Ji(u), k = [];
      e: {
        var H = kh.get(l);
        if (H !== void 0) {
          var w = Af, Ee = l;
          switch (l) {
            case "keypress":
              if (Ef(u) === 0) break e;
            case "keydown":
            case "keyup":
              w = Fi;
              break;
            case "focusin":
              Ee = "focus", w = Hh;
              break;
            case "focusout":
              Ee = "blur", w = Hh;
              break;
            case "beforeblur":
            case "afterblur":
              w = Hh;
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
              w = Of;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              w = Ap;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              w = ds;
              break;
            case _f:
            case Cp:
            case Zh:
              w = yg;
              break;
            case Jh:
              w = aa;
              break;
            case "scroll":
            case "scrollend":
              w = dg;
              break;
            case "wheel":
              w = hs;
              break;
            case "copy":
            case "cut":
            case "paste":
              w = pg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              w = la;
              break;
            case "toggle":
            case "beforetoggle":
              w = Bh;
          }
          var Se = (n & 4) !== 0, dt = !Se && (l === "scroll" || l === "scrollend"), M = Se ? H !== null ? H + "Capture" : null : H;
          Se = [];
          for (var O = U, _; O !== null; ) {
            var K = O;
            if (_ = K.stateNode, K = K.tag, K !== 5 && K !== 26 && K !== 27 || _ === null || M === null || (K = vu(O, M), K != null && Se.push(
              Sa(O, K, _)
            )), dt) break;
            O = O.return;
          }
          0 < Se.length && (H = new w(
            H,
            Ee,
            null,
            u,
            Z
          ), k.push({ event: H, listeners: Se }));
        }
      }
      if ((n & 7) === 0) {
        e: {
          if (H = l === "mouseover" || l === "pointerover", w = l === "mouseout" || l === "pointerout", H && u !== us && (Ee = u.relatedTarget || u.fromElement) && (Pu(Ee) || Ee[Xi]))
            break e;
          if ((w || H) && (H = Z.window === Z ? Z : (H = Z.ownerDocument) ? H.defaultView || H.parentWindow : window, w ? (Ee = u.relatedTarget || u.toElement, w = U, Ee = Ee ? Pu(Ee) : null, Ee !== null && (dt = ve(Ee), Se = Ee.tag, Ee !== dt || Se !== 5 && Se !== 27 && Se !== 6) && (Ee = null)) : (w = null, Ee = U), w !== Ee)) {
            if (Se = Of, K = "onMouseLeave", M = "onMouseEnter", O = "mouse", (l === "pointerout" || l === "pointerover") && (Se = la, K = "onPointerLeave", M = "onPointerEnter", O = "pointer"), dt = w == null ? H : Gc(w), _ = Ee == null ? H : Gc(Ee), H = new Se(
              K,
              O + "leave",
              w,
              u,
              Z
            ), H.target = dt, H.relatedTarget = _, K = null, Pu(Z) === U && (Se = new Se(
              M,
              O + "enter",
              Ee,
              u,
              Z
            ), Se.target = _, Se.relatedTarget = dt, K = Se), dt = K, w && Ee)
              t: {
                for (Se = w, M = Ee, O = 0, _ = Se; _; _ = Ci(_))
                  O++;
                for (_ = 0, K = M; K; K = Ci(K))
                  _++;
                for (; 0 < O - _; )
                  Se = Ci(Se), O--;
                for (; 0 < _ - O; )
                  M = Ci(M), _--;
                for (; O--; ) {
                  if (Se === M || M !== null && Se === M.alternate)
                    break t;
                  Se = Ci(Se), M = Ci(M);
                }
                Se = null;
              }
            else Se = null;
            w !== null && Rd(
              k,
              H,
              w,
              Se,
              !1
            ), Ee !== null && dt !== null && Rd(
              k,
              dt,
              Ee,
              Se,
              !0
            );
          }
        }
        e: {
          if (H = U ? Gc(U) : window, w = H.nodeName && H.nodeName.toLowerCase(), w === "select" || w === "input" && H.type === "file")
            var fe = ai;
          else if (Gh(H))
            if (Lh)
              fe = gu;
            else {
              fe = Ss;
              var Ge = _p;
            }
          else
            w = H.nodeName, !w || w.toLowerCase() !== "input" || H.type !== "checkbox" && H.type !== "radio" ? U && Kc(U.elementType) && (fe = ai) : fe = ni;
          if (fe && (fe = fe(l, U))) {
            vs(
              k,
              fe,
              u,
              Z
            );
            break e;
          }
          Ge && Ge(l, H, U), l === "focusout" && U && H.type === "number" && U.memoizedProps.value != null && gf(H, "number", H.value);
        }
        switch (Ge = U ? Gc(U) : window, l) {
          case "focusin":
            (Gh(Ge) || Ge.contentEditable === "true") && (Za = Ge, nc = U, Oa = null);
            break;
          case "focusout":
            Oa = nc = Za = null;
            break;
          case "mousedown":
            Pc = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Pc = !1, eo(k, u, Z);
            break;
          case "selectionchange":
            if (Qh) break;
          case "keydown":
          case "keyup":
            eo(k, u, Z);
        }
        var ge;
        if (ys)
          e: {
            switch (l) {
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
          Qa ? ps(l, u) && (Re = "onCompositionEnd") : l === "keydown" && u.keyCode === 229 && (Re = "onCompositionStart");
        Re && (ms && u.locale !== "ko" && (Qa || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && Qa && (ge = Tf()) : (Xa = Z, cs = "value" in Xa ? Xa.value : Xa.textContent, Qa = !0)), Ge = _i(U, Re), 0 < Ge.length && (Re = new xh(
          Re,
          l,
          null,
          u,
          Z
        ), k.push({ event: Re, listeners: Ge }), ge ? Re.data = ge : (ge = zf(u), ge !== null && (Re.data = ge)))), (ge = vg ? wh(l, u) : jh(l, u)) && (Re = _i(U, "onBeforeInput"), 0 < Re.length && (Ge = new xh(
          "onBeforeInput",
          "beforeinput",
          null,
          u,
          Z
        ), k.push({
          event: Ge,
          listeners: Re
        }), Ge.data = ge)), Ed(
          k,
          l,
          U,
          u,
          Z
        );
      }
      Gu(k, n);
    });
  }
  function Sa(l, n, u) {
    return {
      instance: l,
      listener: n,
      currentTarget: u
    };
  }
  function _i(l, n) {
    for (var u = n + "Capture", c = []; l !== null; ) {
      var r = l, s = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || s === null || (r = vu(l, u), r != null && c.unshift(
        Sa(l, r, s)
      ), r = vu(l, n), r != null && c.push(
        Sa(l, r, s)
      )), l.tag === 3) return c;
      l = l.return;
    }
    return [];
  }
  function Ci(l) {
    if (l === null) return null;
    do
      l = l.return;
    while (l && l.tag !== 5 && l.tag !== 27);
    return l || null;
  }
  function Rd(l, n, u, c, r) {
    for (var s = n._reactName, y = []; u !== null && u !== c; ) {
      var m = u, S = m.alternate, U = m.stateNode;
      if (m = m.tag, S !== null && S === c) break;
      m !== 5 && m !== 26 && m !== 27 || U === null || (S = U, r ? (U = vu(u, s), U != null && y.unshift(
        Sa(u, U, S)
      )) : r || (U = vu(u, s), U != null && y.push(
        Sa(u, U, S)
      ))), u = u.return;
    }
    y.length !== 0 && l.push({ event: n, listeners: y });
  }
  var Od = /\r\n?/g, xa = /\u0000|\uFFFD/g;
  function Dd(l) {
    return (typeof l == "string" ? l : "" + l).replace(Od, `
`).replace(xa, "");
  }
  function sv(l, n) {
    return n = Dd(n), Dd(l) === n;
  }
  function Sr() {
  }
  function Dt(l, n, u, c, r, s) {
    switch (u) {
      case "children":
        typeof c == "string" ? n === "body" || n === "textarea" && c === "" || Ki(l, c) : (typeof c == "number" || typeof c == "bigint") && n !== "body" && Ki(l, "" + c);
        break;
      case "className":
        mu(l, "class", c);
        break;
      case "tabIndex":
        mu(l, "tabindex", c);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        mu(l, u, c);
        break;
      case "style":
        ns(l, c, s);
        break;
      case "data":
        if (n !== "object") {
          mu(l, "data", c);
          break;
        }
      case "src":
      case "href":
        if (c === "" && (n !== "a" || u !== "href")) {
          l.removeAttribute(u);
          break;
        }
        if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = bf("" + c), l.setAttribute(u, c);
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
          typeof s == "function" && (u === "formAction" ? (n !== "input" && Dt(l, n, "name", r.name, r, null), Dt(
            l,
            n,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Dt(
            l,
            n,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Dt(
            l,
            n,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Dt(l, n, "encType", r.encType, r, null), Dt(l, n, "method", r.method, r, null), Dt(l, n, "target", r.target, r, null)));
        if (c == null || typeof c == "symbol" || typeof c == "boolean") {
          l.removeAttribute(u);
          break;
        }
        c = bf("" + c), l.setAttribute(u, c);
        break;
      case "onClick":
        c != null && (l.onclick = Sr);
        break;
      case "onScroll":
        c != null && qe("scroll", l);
        break;
      case "onScrollEnd":
        c != null && qe("scrollend", l);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(N(61));
          if (u = c.__html, u != null) {
            if (r.children != null) throw Error(N(60));
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
        u = bf("" + c), l.setAttributeNS(
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
        qe("beforetoggle", l), qe("toggle", l), vf(l, "popover", c);
        break;
      case "xlinkActuate":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          c
        );
        break;
      case "xlinkArcrole":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          c
        );
        break;
      case "xlinkRole":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          c
        );
        break;
      case "xlinkShow":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          c
        );
        break;
      case "xlinkTitle":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          c
        );
        break;
      case "xlinkType":
        Yn(
          l,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          c
        );
        break;
      case "xmlBase":
        Yn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          c
        );
        break;
      case "xmlLang":
        Yn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          c
        );
        break;
      case "xmlSpace":
        Yn(
          l,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          c
        );
        break;
      case "is":
        vf(l, "is", c);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < u.length) || u[0] !== "o" && u[0] !== "O" || u[1] !== "n" && u[1] !== "N") && (u = Sf.get(u) || u, vf(l, u, c));
    }
  }
  function hl(l, n, u, c, r, s) {
    switch (u) {
      case "style":
        ns(l, c, s);
        break;
      case "dangerouslySetInnerHTML":
        if (c != null) {
          if (typeof c != "object" || !("__html" in c))
            throw Error(N(61));
          if (u = c.__html, u != null) {
            if (r.children != null) throw Error(N(60));
            l.innerHTML = u;
          }
        }
        break;
      case "children":
        typeof c == "string" ? Ki(l, c) : (typeof c == "number" || typeof c == "bigint") && Ki(l, "" + c);
        break;
      case "onScroll":
        c != null && qe("scroll", l);
        break;
      case "onScrollEnd":
        c != null && qe("scrollend", l);
        break;
      case "onClick":
        c != null && (l.onclick = Sr);
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
        if (!pf.hasOwnProperty(u))
          e: {
            if (u[0] === "o" && u[1] === "n" && (r = u.endsWith("Capture"), n = u.slice(2, r ? u.length - 7 : void 0), s = l[wl] || null, s = s != null ? s[u] : null, typeof s == "function" && l.removeEventListener(n, s, r), typeof c == "function")) {
              typeof s != "function" && s !== null && (u in l ? l[u] = null : l.hasAttribute(u) && l.removeAttribute(u)), l.addEventListener(n, c, r);
              break e;
            }
            u in l ? l[u] = c : c === !0 ? l.setAttribute(u, "") : vf(l, u, c);
          }
    }
  }
  function q(l, n, u) {
    switch (n) {
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
        qe("error", l), qe("load", l);
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
                  throw Error(N(137, n));
                default:
                  Dt(l, n, s, y, u, null);
              }
          }
        r && Dt(l, n, "srcSet", u.srcSet, u, null), c && Dt(l, n, "src", u.src, u, null);
        return;
      case "input":
        qe("invalid", l);
        var m = s = y = r = null, S = null, U = null;
        for (c in u)
          if (u.hasOwnProperty(c)) {
            var Z = u[c];
            if (Z != null)
              switch (c) {
                case "name":
                  r = Z;
                  break;
                case "type":
                  y = Z;
                  break;
                case "checked":
                  S = Z;
                  break;
                case "defaultChecked":
                  U = Z;
                  break;
                case "value":
                  s = Z;
                  break;
                case "defaultValue":
                  m = Z;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (Z != null)
                    throw Error(N(137, n));
                  break;
                default:
                  Dt(l, n, c, Z, u, null);
              }
          }
        Dh(
          l,
          s,
          m,
          S,
          U,
          y,
          r,
          !1
        ), Qc(l);
        return;
      case "select":
        qe("invalid", l), c = y = s = null;
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
                Dt(l, n, r, m, u, null);
            }
        n = s, u = y, l.multiple = !!c, n != null ? ti(l, !!c, n, !1) : u != null && ti(l, !!c, u, !0);
        return;
      case "textarea":
        qe("invalid", l), s = r = c = null;
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
                if (m != null) throw Error(N(91));
                break;
              default:
                Dt(l, n, y, m, u, null);
            }
        Mh(l, c, r, s), Qc(l);
        return;
      case "option":
        for (S in u)
          if (u.hasOwnProperty(S) && (c = u[S], c != null))
            switch (S) {
              case "selected":
                l.selected = c && typeof c != "function" && typeof c != "symbol";
                break;
              default:
                Dt(l, n, S, c, u, null);
            }
        return;
      case "dialog":
        qe("beforetoggle", l), qe("toggle", l), qe("cancel", l), qe("close", l);
        break;
      case "iframe":
      case "object":
        qe("load", l);
        break;
      case "video":
      case "audio":
        for (c = 0; c < Me.length; c++)
          qe(Me[c], l);
        break;
      case "image":
        qe("error", l), qe("load", l);
        break;
      case "details":
        qe("toggle", l);
        break;
      case "embed":
      case "source":
      case "link":
        qe("error", l), qe("load", l);
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
        for (U in u)
          if (u.hasOwnProperty(U) && (c = u[U], c != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(N(137, n));
              default:
                Dt(l, n, U, c, u, null);
            }
        return;
      default:
        if (Kc(n)) {
          for (Z in u)
            u.hasOwnProperty(Z) && (c = u[Z], c !== void 0 && hl(
              l,
              n,
              Z,
              c,
              u,
              void 0
            ));
          return;
        }
    }
    for (m in u)
      u.hasOwnProperty(m) && (c = u[m], c != null && Dt(l, n, m, c, u, null));
  }
  function st(l, n, u, c) {
    switch (n) {
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
        var r = null, s = null, y = null, m = null, S = null, U = null, Z = null;
        for (w in u) {
          var k = u[w];
          if (u.hasOwnProperty(w) && k != null)
            switch (w) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                S = k;
              default:
                c.hasOwnProperty(w) || Dt(l, n, w, null, c, k);
            }
        }
        for (var H in c) {
          var w = c[H];
          if (k = u[H], c.hasOwnProperty(H) && (w != null || k != null))
            switch (H) {
              case "type":
                s = w;
                break;
              case "name":
                r = w;
                break;
              case "checked":
                U = w;
                break;
              case "defaultChecked":
                Z = w;
                break;
              case "value":
                y = w;
                break;
              case "defaultValue":
                m = w;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (w != null)
                  throw Error(N(137, n));
                break;
              default:
                w !== k && Dt(
                  l,
                  n,
                  H,
                  w,
                  c,
                  k
                );
            }
        }
        Oh(
          l,
          y,
          m,
          S,
          U,
          Z,
          s,
          r
        );
        return;
      case "select":
        w = y = m = H = null;
        for (s in u)
          if (S = u[s], u.hasOwnProperty(s) && S != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                w = S;
              default:
                c.hasOwnProperty(s) || Dt(
                  l,
                  n,
                  s,
                  null,
                  c,
                  S
                );
            }
        for (r in c)
          if (s = c[r], S = u[r], c.hasOwnProperty(r) && (s != null || S != null))
            switch (r) {
              case "value":
                H = s;
                break;
              case "defaultValue":
                m = s;
                break;
              case "multiple":
                y = s;
              default:
                s !== S && Dt(
                  l,
                  n,
                  r,
                  s,
                  c,
                  S
                );
            }
        n = m, u = y, c = w, H != null ? ti(l, !!u, H, !1) : !!c != !!u && (n != null ? ti(l, !!u, n, !0) : ti(l, !!u, u ? [] : "", !1));
        return;
      case "textarea":
        w = H = null;
        for (m in u)
          if (r = u[m], u.hasOwnProperty(m) && r != null && !c.hasOwnProperty(m))
            switch (m) {
              case "value":
                break;
              case "children":
                break;
              default:
                Dt(l, n, m, null, c, r);
            }
        for (y in c)
          if (r = c[y], s = u[y], c.hasOwnProperty(y) && (r != null || s != null))
            switch (y) {
              case "value":
                H = r;
                break;
              case "defaultValue":
                w = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(N(91));
                break;
              default:
                r !== s && Dt(l, n, y, r, c, s);
            }
        zh(l, H, w);
        return;
      case "option":
        for (var Ee in u)
          if (H = u[Ee], u.hasOwnProperty(Ee) && H != null && !c.hasOwnProperty(Ee))
            switch (Ee) {
              case "selected":
                l.selected = !1;
                break;
              default:
                Dt(
                  l,
                  n,
                  Ee,
                  null,
                  c,
                  H
                );
            }
        for (S in c)
          if (H = c[S], w = u[S], c.hasOwnProperty(S) && H !== w && (H != null || w != null))
            switch (S) {
              case "selected":
                l.selected = H && typeof H != "function" && typeof H != "symbol";
                break;
              default:
                Dt(
                  l,
                  n,
                  S,
                  H,
                  c,
                  w
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
        for (var Se in u)
          H = u[Se], u.hasOwnProperty(Se) && H != null && !c.hasOwnProperty(Se) && Dt(l, n, Se, null, c, H);
        for (U in c)
          if (H = c[U], w = u[U], c.hasOwnProperty(U) && H !== w && (H != null || w != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (H != null)
                  throw Error(N(137, n));
                break;
              default:
                Dt(
                  l,
                  n,
                  U,
                  H,
                  c,
                  w
                );
            }
        return;
      default:
        if (Kc(n)) {
          for (var dt in u)
            H = u[dt], u.hasOwnProperty(dt) && H !== void 0 && !c.hasOwnProperty(dt) && hl(
              l,
              n,
              dt,
              void 0,
              c,
              H
            );
          for (Z in c)
            H = c[Z], w = u[Z], !c.hasOwnProperty(Z) || H === w || H === void 0 && w === void 0 || hl(
              l,
              n,
              Z,
              H,
              c,
              w
            );
          return;
        }
    }
    for (var M in u)
      H = u[M], u.hasOwnProperty(M) && H != null && !c.hasOwnProperty(M) && Dt(l, n, M, null, c, H);
    for (k in c)
      H = c[k], w = u[k], !c.hasOwnProperty(k) || H === w || H == null && w == null || Dt(l, n, k, H, c, w);
  }
  var rm = null, br = null;
  function Vo(l) {
    return l.nodeType === 9 ? l : l.ownerDocument;
  }
  function Zn(l) {
    switch (l) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Lu(l, n) {
    if (l === 0)
      switch (n) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return l === 1 && n === "foreignObject" ? 0 : l;
  }
  function Oc(l, n) {
    return l === "textarea" || l === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null;
  }
  var Kn = null;
  function zd() {
    var l = window.event;
    return l && l.type === "popstate" ? l === Kn ? !1 : (Kn = l, !0) : (Kn = null, !1);
  }
  var Jn = typeof setTimeout == "function" ? setTimeout : void 0, sm = typeof clearTimeout == "function" ? clearTimeout : void 0, dv = typeof Promise == "function" ? Promise : void 0, zg = typeof queueMicrotask == "function" ? queueMicrotask : typeof dv < "u" ? function(l) {
    return dv.resolve(null).then(l).catch(Mg);
  } : Jn;
  function Mg(l) {
    setTimeout(function() {
      throw l;
    });
  }
  function Cl(l) {
    return l === "head";
  }
  function hv(l, n) {
    var u = n, c = 0, r = 0;
    do {
      var s = u.nextSibling;
      if (l.removeChild(u), s && s.nodeType === 8)
        if (u = s.data, u === "/$") {
          if (0 < c && 8 > c) {
            u = c;
            var y = l.ownerDocument;
            if (u & 1 && ne(y.documentElement), u & 2 && ne(y.body), u & 4)
              for (u = y.head, ne(u), y = u.firstChild; y; ) {
                var m = y.nextSibling, S = y.nodeName;
                y[mf] || S === "SCRIPT" || S === "STYLE" || S === "LINK" && y.rel.toLowerCase() === "stylesheet" || u.removeChild(y), y = m;
              }
          }
          if (r === 0) {
            l.removeChild(s), $o(n);
            return;
          }
          r--;
        } else
          u === "$" || u === "$?" || u === "$!" ? r++ : c = u.charCodeAt(0) - 48;
      else c = 0;
      u = s;
    } while (u);
    $o(n);
  }
  function Tr(l) {
    var n = l.firstChild;
    for (n && n.nodeType === 10 && (n = n.nextSibling); n; ) {
      var u = n;
      switch (n = n.nextSibling, u.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Tr(u), me(u);
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
  function dm(l, n, u, c) {
    for (; l.nodeType === 1; ) {
      var r = u;
      if (l.nodeName.toLowerCase() !== n.toLowerCase()) {
        if (!c && (l.nodeName !== "INPUT" || l.type !== "hidden"))
          break;
      } else if (c) {
        if (!l[mf])
          switch (n) {
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
      } else if (n === "input" && l.type === "hidden") {
        var s = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && l.getAttribute("name") === s)
          return l;
      } else return l;
      if (l = Mn(l.nextSibling), l === null) break;
    }
    return null;
  }
  function Xo(l, n, u) {
    if (n === "") return null;
    for (; l.nodeType !== 3; )
      if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !u || (l = Mn(l.nextSibling), l === null)) return null;
    return l;
  }
  function hm(l) {
    return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState === "complete";
  }
  function ym(l, n) {
    var u = l.ownerDocument;
    if (l.data !== "$?" || u.readyState === "complete")
      n();
    else {
      var c = function() {
        n(), u.removeEventListener("DOMContentLoaded", c);
      };
      u.addEventListener("DOMContentLoaded", c), l._reactRetry = c;
    }
  }
  function Mn(l) {
    for (; l != null; l = l.nextSibling) {
      var n = l.nodeType;
      if (n === 1 || n === 3) break;
      if (n === 8) {
        if (n = l.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F")
          break;
        if (n === "/$") return null;
      }
    }
    return l;
  }
  var mm = null;
  function Dc(l) {
    l = l.previousSibling;
    for (var n = 0; l; ) {
      if (l.nodeType === 8) {
        var u = l.data;
        if (u === "$" || u === "$!" || u === "$?") {
          if (n === 0) return l;
          n--;
        } else u === "/$" && n++;
      }
      l = l.previousSibling;
    }
    return null;
  }
  function Hl(l, n, u) {
    switch (n = Vo(u), l) {
      case "html":
        if (l = n.documentElement, !l) throw Error(N(452));
        return l;
      case "head":
        if (l = n.head, !l) throw Error(N(453));
        return l;
      case "body":
        if (l = n.body, !l) throw Error(N(454));
        return l;
      default:
        throw Error(N(451));
    }
  }
  function ne(l) {
    for (var n = l.attributes; n.length; )
      l.removeAttributeNode(n[0]);
    me(l);
  }
  var tl = /* @__PURE__ */ new Map(), en = /* @__PURE__ */ new Set();
  function bl(l) {
    return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
  }
  var Vu = Y.d;
  Y.d = {
    f: Ug,
    r: Md,
    D: kn,
    C: Qu,
    L: Ud,
    m: Hi,
    X: ba,
    S: Xl,
    M: xi
  };
  function Ug() {
    var l = Vu.f(), n = sr();
    return l || n;
  }
  function Md(l) {
    var n = zl(l);
    n !== null && n.tag === 5 && n.type === "form" ? Yp(n) : Vu.r(l);
  }
  var Xu = typeof document > "u" ? null : document;
  function Na(l, n, u) {
    var c = Xu;
    if (c && typeof n == "string" && n) {
      var r = Va(n);
      r = 'link[rel="' + l + '"][href="' + r + '"]', typeof u == "string" && (r += '[crossorigin="' + u + '"]'), en.has(r) || (en.add(r), l = { rel: l, crossOrigin: u, href: n }, c.querySelector(r) === null && (n = c.createElement("link"), q(n, "link", l), Pt(n), c.head.appendChild(n)));
    }
  }
  function kn(l) {
    Vu.D(l), Na("dns-prefetch", l, null);
  }
  function Qu(l, n) {
    Vu.C(l, n), Na("preconnect", l, n);
  }
  function Ud(l, n, u) {
    Vu.L(l, n, u);
    var c = Xu;
    if (c && l && n) {
      var r = 'link[rel="preload"][as="' + Va(n) + '"]';
      n === "image" && u && u.imageSrcSet ? (r += '[imagesrcset="' + Va(
        u.imageSrcSet
      ) + '"]', typeof u.imageSizes == "string" && (r += '[imagesizes="' + Va(
        u.imageSizes
      ) + '"]')) : r += '[href="' + Va(l) + '"]';
      var s = r;
      switch (n) {
        case "style":
          s = Qo(l);
          break;
        case "script":
          s = zc(l);
      }
      tl.has(s) || (l = ie(
        {
          rel: "preload",
          href: n === "image" && u && u.imageSrcSet ? void 0 : l,
          as: n
        },
        u
      ), tl.set(s, l), c.querySelector(r) !== null || n === "style" && c.querySelector(Er(s)) || n === "script" && c.querySelector(Un(s)) || (n = c.createElement("link"), q(n, "link", l), Pt(n), c.head.appendChild(n)));
    }
  }
  function Hi(l, n) {
    Vu.m(l, n);
    var u = Xu;
    if (u && l) {
      var c = n && typeof n.as == "string" ? n.as : "script", r = 'link[rel="modulepreload"][as="' + Va(c) + '"][href="' + Va(l) + '"]', s = r;
      switch (c) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = zc(l);
      }
      if (!tl.has(s) && (l = ie({ rel: "modulepreload", href: l }, n), tl.set(s, l), u.querySelector(r) === null)) {
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (u.querySelector(Un(s)))
              return;
        }
        c = u.createElement("link"), q(c, "link", l), Pt(c), u.head.appendChild(c);
      }
    }
  }
  function Xl(l, n, u) {
    Vu.S(l, n, u);
    var c = Xu;
    if (c && l) {
      var r = Lc(c).hoistableStyles, s = Qo(l);
      n = n || "default";
      var y = r.get(s);
      if (!y) {
        var m = { loading: 0, preload: null };
        if (y = c.querySelector(
          Er(s)
        ))
          m.loading = 5;
        else {
          l = ie(
            { rel: "stylesheet", href: l, "data-precedence": n },
            u
          ), (u = tl.get(s)) && vm(l, u);
          var S = y = c.createElement("link");
          Pt(S), q(S, "link", l), S._p = new Promise(function(U, Z) {
            S.onload = U, S.onerror = Z;
          }), S.addEventListener("load", function() {
            m.loading |= 1;
          }), S.addEventListener("error", function() {
            m.loading |= 2;
          }), m.loading |= 4, Hd(y, n, c);
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
  function ba(l, n) {
    Vu.X(l, n);
    var u = Xu;
    if (u && l) {
      var c = Lc(u).hoistableScripts, r = zc(l), s = c.get(r);
      s || (s = u.querySelector(Un(r)), s || (l = ie({ src: l, async: !0 }, n), (n = tl.get(r)) && xd(l, n), s = u.createElement("script"), Pt(s), q(s, "link", l), u.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, c.set(r, s));
    }
  }
  function xi(l, n) {
    Vu.M(l, n);
    var u = Xu;
    if (u && l) {
      var c = Lc(u).hoistableScripts, r = zc(l), s = c.get(r);
      s || (s = u.querySelector(Un(r)), s || (l = ie({ src: l, async: !0, type: "module" }, n), (n = tl.get(r)) && xd(l, n), s = u.createElement("script"), Pt(s), q(s, "link", l), u.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, c.set(r, s));
    }
  }
  function _d(l, n, u, c) {
    var r = (r = he.current) ? bl(r) : null;
    if (!r) throw Error(N(446));
    switch (l) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof u.precedence == "string" && typeof u.href == "string" ? (n = Qo(u.href), u = Lc(
          r
        ).hoistableStyles, c = u.get(n), c || (c = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (u.rel === "stylesheet" && typeof u.href == "string" && typeof u.precedence == "string") {
          l = Qo(u.href);
          var s = Lc(
            r
          ).hoistableStyles, y = s.get(l);
          if (y || (r = r.ownerDocument || r, y = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(l, y), (s = r.querySelector(
            Er(l)
          )) && !s._p && (y.instance = s, y.state.loading = 5), tl.has(l) || (u = {
            rel: "preload",
            as: "style",
            href: u.href,
            crossOrigin: u.crossOrigin,
            integrity: u.integrity,
            media: u.media,
            hrefLang: u.hrefLang,
            referrerPolicy: u.referrerPolicy
          }, tl.set(l, u), s || Ar(
            r,
            l,
            u,
            y.state
          ))), n && c === null)
            throw Error(N(528, ""));
          return y;
        }
        if (n && c !== null)
          throw Error(N(529, ""));
        return null;
      case "script":
        return n = u.async, u = u.src, typeof u == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = zc(u), u = Lc(
          r
        ).hoistableScripts, c = u.get(n), c || (c = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, u.set(n, c)), c) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(N(444, l));
    }
  }
  function Qo(l) {
    return 'href="' + Va(l) + '"';
  }
  function Er(l) {
    return 'link[rel="stylesheet"][' + l + "]";
  }
  function pm(l) {
    return ie({}, l, {
      "data-precedence": l.precedence,
      precedence: null
    });
  }
  function Ar(l, n, u, c) {
    l.querySelector('link[rel="preload"][as="style"][' + n + "]") ? c.loading = 1 : (n = l.createElement("link"), c.preload = n, n.addEventListener("load", function() {
      return c.loading |= 1;
    }), n.addEventListener("error", function() {
      return c.loading |= 2;
    }), q(n, "link", u), Pt(n), l.head.appendChild(n));
  }
  function zc(l) {
    return '[src="' + Va(l) + '"]';
  }
  function Un(l) {
    return "script[async]" + l;
  }
  function Cd(l, n, u) {
    if (n.count++, n.instance === null)
      switch (n.type) {
        case "style":
          var c = l.querySelector(
            'style[data-href~="' + Va(u.href) + '"]'
          );
          if (c)
            return n.instance = c, Pt(c), c;
          var r = ie({}, u, {
            "data-href": u.href,
            "data-precedence": u.precedence,
            href: null,
            precedence: null
          });
          return c = (l.ownerDocument || l).createElement(
            "style"
          ), Pt(c), q(c, "style", r), Hd(c, u.precedence, l), n.instance = c;
        case "stylesheet":
          r = Qo(u.href);
          var s = l.querySelector(
            Er(r)
          );
          if (s)
            return n.state.loading |= 4, n.instance = s, Pt(s), s;
          c = pm(u), (r = tl.get(r)) && vm(c, r), s = (l.ownerDocument || l).createElement("link"), Pt(s);
          var y = s;
          return y._p = new Promise(function(m, S) {
            y.onload = m, y.onerror = S;
          }), q(s, "link", c), n.state.loading |= 4, Hd(s, u.precedence, l), n.instance = s;
        case "script":
          return s = zc(u.src), (r = l.querySelector(
            Un(s)
          )) ? (n.instance = r, Pt(r), r) : (c = u, (r = tl.get(s)) && (c = ie({}, u), xd(c, r)), l = l.ownerDocument || l, r = l.createElement("script"), Pt(r), q(r, "link", c), l.head.appendChild(r), n.instance = r);
        case "void":
          return null;
        default:
          throw Error(N(443, n.type));
      }
    else
      n.type === "stylesheet" && (n.state.loading & 4) === 0 && (c = n.instance, n.state.loading |= 4, Hd(c, u.precedence, l));
    return n.instance;
  }
  function Hd(l, n, u) {
    for (var c = u.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = c.length ? c[c.length - 1] : null, s = r, y = 0; y < c.length; y++) {
      var m = c[y];
      if (m.dataset.precedence === n) s = m;
      else if (s !== r) break;
    }
    s ? s.parentNode.insertBefore(l, s.nextSibling) : (n = u.nodeType === 9 ? u.head : u, n.insertBefore(l, n.firstChild));
  }
  function vm(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.title == null && (l.title = n.title);
  }
  function xd(l, n) {
    l.crossOrigin == null && (l.crossOrigin = n.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = n.referrerPolicy), l.integrity == null && (l.integrity = n.integrity);
  }
  var Rr = null;
  function Zo(l, n, u) {
    if (Rr === null) {
      var c = /* @__PURE__ */ new Map(), r = Rr = /* @__PURE__ */ new Map();
      r.set(u, c);
    } else
      r = Rr, c = r.get(u), c || (c = /* @__PURE__ */ new Map(), r.set(u, c));
    if (c.has(l)) return c;
    for (c.set(l, null), u = u.getElementsByTagName(l), r = 0; r < u.length; r++) {
      var s = u[r];
      if (!(s[mf] || s[_t] || l === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var y = s.getAttribute(n) || "";
        y = l + y;
        var m = c.get(y);
        m ? m.push(s) : c.set(y, [s]);
      }
    }
    return c;
  }
  function gm(l, n, u) {
    l = l.ownerDocument || l, l.head.insertBefore(
      u,
      n === "title" ? l.querySelector("head > title") : null
    );
  }
  function yv(l, n, u) {
    if (u === 1 || n.itemProp != null) return !1;
    switch (l) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "")
          break;
        return !0;
      case "link":
        if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError)
          break;
        switch (n.rel) {
          case "stylesheet":
            return l = n.disabled, typeof n.precedence == "string" && l == null;
          default:
            return !0;
        }
      case "script":
        if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string")
          return !0;
    }
    return !1;
  }
  function Sm(l) {
    return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
  }
  var Ko = null;
  function mv() {
  }
  function pv(l, n, u) {
    if (Ko === null) throw Error(N(475));
    var c = Ko;
    if (n.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = Qo(u.href), s = l.querySelector(
          Er(r)
        );
        if (s) {
          l = s._p, l !== null && typeof l == "object" && typeof l.then == "function" && (c.count++, c = Jo.bind(c), l.then(c, c)), n.state.loading |= 4, n.instance = s, Pt(s);
          return;
        }
        s = l.ownerDocument || l, u = pm(u), (r = tl.get(r)) && vm(u, r), s = s.createElement("link"), Pt(s);
        var y = s;
        y._p = new Promise(function(m, S) {
          y.onload = m, y.onerror = S;
        }), q(s, "link", u), n.instance = s;
      }
      c.stylesheets === null && (c.stylesheets = /* @__PURE__ */ new Map()), c.stylesheets.set(n, l), (l = n.state.preload) && (n.state.loading & 3) === 0 && (c.count++, n = Jo.bind(c), l.addEventListener("load", n), l.addEventListener("error", n));
    }
  }
  function vv() {
    if (Ko === null) throw Error(N(475));
    var l = Ko;
    return l.stylesheets && l.count === 0 && Dr(l, l.stylesheets), 0 < l.count ? function(n) {
      var u = setTimeout(function() {
        if (l.stylesheets && Dr(l, l.stylesheets), l.unsuspend) {
          var c = l.unsuspend;
          l.unsuspend = null, c();
        }
      }, 6e4);
      return l.unsuspend = n, function() {
        l.unsuspend = null, clearTimeout(u);
      };
    } : null;
  }
  function Jo() {
    if (this.count--, this.count === 0) {
      if (this.stylesheets) Dr(this, this.stylesheets);
      else if (this.unsuspend) {
        var l = this.unsuspend;
        this.unsuspend = null, l();
      }
    }
  }
  var Or = null;
  function Dr(l, n) {
    l.stylesheets = null, l.unsuspend !== null && (l.count++, Or = /* @__PURE__ */ new Map(), n.forEach(bm, l), Or = null, Jo.call(l));
  }
  function bm(l, n) {
    if (!(n.state.loading & 4)) {
      var u = Or.get(l);
      if (u) var c = u.get(null);
      else {
        u = /* @__PURE__ */ new Map(), Or.set(l, u);
        for (var r = l.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < r.length; s++) {
          var y = r[s];
          (y.nodeName === "LINK" || y.getAttribute("media") !== "not all") && (u.set(y.dataset.precedence, y), c = y);
        }
        c && u.set(null, c);
      }
      r = n.instance, y = r.getAttribute("data-precedence"), s = u.get(y) || c, s === c && u.set(null, r), u.set(y, r), this.count++, c = Jo.bind(this), r.addEventListener("load", c), r.addEventListener("error", c), s ? s.parentNode.insertBefore(r, s.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(r, l.firstChild)), n.state.loading |= 4;
    }
  }
  var xl = {
    $$typeof: Nt,
    Provider: null,
    Consumer: null,
    _currentValue: I,
    _currentValue2: I,
    _threadCount: 0
  };
  function $n(l, n, u, c, r, s, y, m) {
    this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = te(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = te(0), this.hiddenUpdates = te(null), this.identifierPrefix = c, this.onUncaughtError = r, this.onCaughtError = s, this.onRecoverableError = y, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = m, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function gv(l, n, u, c, r, s, y, m, S, U, Z, k) {
    return l = new $n(
      l,
      n,
      u,
      y,
      m,
      S,
      U,
      k
    ), n = 1, s === !0 && (n |= 24), s = ua(3, null, null, n), l.current = s, s.stateNode = l, n = Ih(), n.refCount++, l.pooledCache = n, n.refCount++, s.memoizedState = {
      element: c,
      isDehydrated: u,
      cache: n
    }, Lf(s), l;
  }
  function Tm(l) {
    return l ? (l = ic, l) : ic;
  }
  function Em(l, n, u, c, r, s) {
    r = Tm(r), c.context === null ? c.context = r : c.pendingContext = r, c = zu(n), c.payload = { element: u }, s = s === void 0 ? null : s, s !== null && (c.callback = s), u = oa(l, c, n), u !== null && (ga(u, l, n), fc(u, l, n));
  }
  function Am(l, n) {
    if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
      var u = l.retryLane;
      l.retryLane = u !== 0 && u < n ? u : n;
    }
  }
  function Nd(l, n) {
    Am(l, n), (l = l.alternate) && Am(l, n);
  }
  function Rm(l) {
    if (l.tag === 13) {
      var n = Tu(l, 67108864);
      n !== null && ga(n, l, 67108864), Nd(l, 67108864);
    }
  }
  var zr = !0;
  function Sv(l, n, u, c) {
    var r = L.T;
    L.T = null;
    var s = Y.p;
    try {
      Y.p = 2, qd(l, n, u, c);
    } finally {
      Y.p = s, L.T = r;
    }
  }
  function bv(l, n, u, c) {
    var r = L.T;
    L.T = null;
    var s = Y.p;
    try {
      Y.p = 8, qd(l, n, u, c);
    } finally {
      Y.p = s, L.T = r;
    }
  }
  function qd(l, n, u, c) {
    if (zr) {
      var r = Om(c);
      if (r === null)
        gr(
          l,
          n,
          c,
          Mr,
          u
        ), zm(l, c);
      else if (Mm(
        r,
        l,
        n,
        u,
        c
      ))
        c.stopPropagation();
      else if (zm(l, c), n & 4 && -1 < _g.indexOf(l)) {
        for (; r !== null; ) {
          var s = zl(r);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var y = Dl(s.pendingLanes);
                  if (y !== 0) {
                    var m = s;
                    for (m.pendingLanes |= 2, m.entangledLanes |= 2; y; ) {
                      var S = 1 << 31 - Ol(y);
                      m.entanglements[1] |= S, y &= ~S;
                    }
                    zn(s), (vt & 6) === 0 && (cd = St() + 500, ju(0));
                  }
                }
                break;
              case 13:
                m = Tu(s, 2), m !== null && ga(m, s, 2), sr(), Nd(s, 2);
            }
          if (s = Om(c), s === null && gr(
            l,
            n,
            c,
            Mr,
            u
          ), s === r) break;
          r = s;
        }
        r !== null && c.stopPropagation();
      } else
        gr(
          l,
          n,
          c,
          null,
          u
        );
    }
  }
  function Om(l) {
    return l = Ji(l), Dm(l);
  }
  var Mr = null;
  function Dm(l) {
    if (Mr = null, l = Pu(l), l !== null) {
      var n = ve(l);
      if (n === null) l = null;
      else {
        var u = n.tag;
        if (u === 13) {
          if (l = Ae(n), l !== null) return l;
          l = null;
        } else if (u === 3) {
          if (n.stateNode.current.memoizedState.isDehydrated)
            return n.tag === 3 ? n.stateNode.containerInfo : null;
          l = null;
        } else n !== l && (l = null);
      }
    }
    return Mr = l, null;
  }
  function Tv(l) {
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
        switch (su()) {
          case du:
            return 2;
          case Ir:
            return 8;
          case Ne:
          case Li:
            return 32;
          case Vi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Bd = !1, _n = null, Wn = null, Zu = null, ko = /* @__PURE__ */ new Map(), Ur = /* @__PURE__ */ new Map(), Ni = [], _g = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function zm(l, n) {
    switch (l) {
      case "focusin":
      case "focusout":
        _n = null;
        break;
      case "dragenter":
      case "dragleave":
        Wn = null;
        break;
      case "mouseover":
      case "mouseout":
        Zu = null;
        break;
      case "pointerover":
      case "pointerout":
        ko.delete(n.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ur.delete(n.pointerId);
    }
  }
  function Fn(l, n, u, c, r, s) {
    return l === null || l.nativeEvent !== s ? (l = {
      blockedOn: n,
      domEventName: u,
      eventSystemFlags: c,
      nativeEvent: s,
      targetContainers: [r]
    }, n !== null && (n = zl(n), n !== null && Rm(n)), l) : (l.eventSystemFlags |= c, n = l.targetContainers, r !== null && n.indexOf(r) === -1 && n.push(r), l);
  }
  function Mm(l, n, u, c, r) {
    switch (n) {
      case "focusin":
        return _n = Fn(
          _n,
          l,
          n,
          u,
          c,
          r
        ), !0;
      case "dragenter":
        return Wn = Fn(
          Wn,
          l,
          n,
          u,
          c,
          r
        ), !0;
      case "mouseover":
        return Zu = Fn(
          Zu,
          l,
          n,
          u,
          c,
          r
        ), !0;
      case "pointerover":
        var s = r.pointerId;
        return ko.set(
          s,
          Fn(
            ko.get(s) || null,
            l,
            n,
            u,
            c,
            r
          )
        ), !0;
      case "gotpointercapture":
        return s = r.pointerId, Ur.set(
          s,
          Fn(
            Ur.get(s) || null,
            l,
            n,
            u,
            c,
            r
          )
        ), !0;
    }
    return !1;
  }
  function Um(l) {
    var n = Pu(l.target);
    if (n !== null) {
      var u = ve(n);
      if (u !== null) {
        if (n = u.tag, n === 13) {
          if (n = Ae(u), n !== null) {
            l.blockedOn = n, gh(l.priority, function() {
              if (u.tag === 13) {
                var c = Ha();
                c = ze(c);
                var r = Tu(u, c);
                r !== null && ga(r, u, c), Nd(u, c);
              }
            });
            return;
          }
        } else if (n === 3 && u.stateNode.current.memoizedState.isDehydrated) {
          l.blockedOn = u.tag === 3 ? u.stateNode.containerInfo : null;
          return;
        }
      }
    }
    l.blockedOn = null;
  }
  function _r(l) {
    if (l.blockedOn !== null) return !1;
    for (var n = l.targetContainers; 0 < n.length; ) {
      var u = Om(l.nativeEvent);
      if (u === null) {
        u = l.nativeEvent;
        var c = new u.constructor(
          u.type,
          u
        );
        us = c, u.target.dispatchEvent(c), us = null;
      } else
        return n = zl(u), n !== null && Rm(n), l.blockedOn = u, !1;
      n.shift();
    }
    return !0;
  }
  function _m(l, n, u) {
    _r(l) && u.delete(n);
  }
  function Yd() {
    Bd = !1, _n !== null && _r(_n) && (_n = null), Wn !== null && _r(Wn) && (Wn = null), Zu !== null && _r(Zu) && (Zu = null), ko.forEach(_m), Ur.forEach(_m);
  }
  function Ku(l, n) {
    l.blockedOn === n && (l.blockedOn = null, Bd || (Bd = !0, W.unstable_scheduleCallback(
      W.unstable_NormalPriority,
      Yd
    )));
  }
  var wd = null;
  function Cr(l) {
    wd !== l && (wd = l, W.unstable_scheduleCallback(
      W.unstable_NormalPriority,
      function() {
        wd === l && (wd = null);
        for (var n = 0; n < l.length; n += 3) {
          var u = l[n], c = l[n + 1], r = l[n + 2];
          if (typeof c != "function") {
            if (Dm(c || u) === null)
              continue;
            break;
          }
          var s = zl(u);
          s !== null && (l.splice(n, 3), n -= 3, Ty(
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
  function $o(l) {
    function n(S) {
      return Ku(S, l);
    }
    _n !== null && Ku(_n, l), Wn !== null && Ku(Wn, l), Zu !== null && Ku(Zu, l), ko.forEach(n), Ur.forEach(n);
    for (var u = 0; u < Ni.length; u++) {
      var c = Ni[u];
      c.blockedOn === l && (c.blockedOn = null);
    }
    for (; 0 < Ni.length && (u = Ni[0], u.blockedOn === null); )
      Um(u), u.blockedOn === null && Ni.shift();
    if (u = (l.ownerDocument || l).$$reactFormReplay, u != null)
      for (c = 0; c < u.length; c += 3) {
        var r = u[c], s = u[c + 1], y = r[wl] || null;
        if (typeof s == "function")
          y || Cr(u);
        else if (y) {
          var m = null;
          if (s && s.hasAttribute("formAction")) {
            if (r = s, y = s[wl] || null)
              m = y.formAction;
            else if (Dm(r) !== null) continue;
          } else m = y.action;
          typeof m == "function" ? u[c + 1] = m : (u.splice(c, 3), c -= 3), Cr(u);
        }
      }
  }
  function qi(l) {
    this._internalRoot = l;
  }
  jd.prototype.render = qi.prototype.render = function(l) {
    var n = this._internalRoot;
    if (n === null) throw Error(N(409));
    var u = n.current, c = Ha();
    Em(u, c, l, n, null, null);
  }, jd.prototype.unmount = qi.prototype.unmount = function() {
    var l = this._internalRoot;
    if (l !== null) {
      this._internalRoot = null;
      var n = l.containerInfo;
      Em(l.current, 2, null, l, null, null), sr(), n[Xi] = null;
    }
  };
  function jd(l) {
    this._internalRoot = l;
  }
  jd.prototype.unstable_scheduleHydration = function(l) {
    if (l) {
      var n = qn();
      l = { blockedOn: null, target: l, priority: n };
      for (var u = 0; u < Ni.length && n !== 0 && n < Ni[u].priority; u++) ;
      Ni.splice(u, 0, l), u === 0 && Um(l);
    }
  };
  var Ev = ee.version;
  if (Ev !== "19.1.0")
    throw Error(
      N(
        527,
        Ev,
        "19.1.0"
      )
    );
  Y.findDOMNode = function(l) {
    var n = l._reactInternals;
    if (n === void 0)
      throw typeof l.render == "function" ? Error(N(188)) : (l = Object.keys(l).join(","), Error(N(268, l)));
    return l = oe(n), l = l !== null ? D(l) : null, l = l === null ? null : l.stateNode, l;
  };
  var Av = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: L,
    reconcilerVersion: "19.1.0"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Tl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Tl.isDisabled && Tl.supportsFiber)
      try {
        hu = Tl.inject(
          Av
        ), Yl = Tl;
      } catch {
      }
  }
  return hp.createRoot = function(l, n) {
    if (!Te(l)) throw Error(N(299));
    var u = !1, c = "", r = Uy, s = Do, y = _y, m = null;
    return n != null && (n.unstable_strictMode === !0 && (u = !0), n.identifierPrefix !== void 0 && (c = n.identifierPrefix), n.onUncaughtError !== void 0 && (r = n.onUncaughtError), n.onCaughtError !== void 0 && (s = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (m = n.unstable_transitionCallbacks)), n = gv(
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
    ), l[Xi] = n.current, vr(l), new qi(n);
  }, hp.hydrateRoot = function(l, n, u) {
    if (!Te(l)) throw Error(N(299));
    var c = !1, r = "", s = Uy, y = Do, m = _y, S = null, U = null;
    return u != null && (u.unstable_strictMode === !0 && (c = !0), u.identifierPrefix !== void 0 && (r = u.identifierPrefix), u.onUncaughtError !== void 0 && (s = u.onUncaughtError), u.onCaughtError !== void 0 && (y = u.onCaughtError), u.onRecoverableError !== void 0 && (m = u.onRecoverableError), u.unstable_transitionCallbacks !== void 0 && (S = u.unstable_transitionCallbacks), u.formState !== void 0 && (U = u.formState)), n = gv(
      l,
      1,
      !0,
      n,
      u ?? null,
      c,
      r,
      s,
      y,
      m,
      S,
      U
    ), n.context = Tm(null), u = n.current, c = Ha(), c = ze(c), r = zu(c), r.callback = null, oa(u, r, c), u = c, n.current.lanes = u, re(n, u), zn(n), l[Xi] = n.current, vr(l), new jd(n);
  }, hp.version = "19.1.0", hp;
}
var yp = {}, X1;
function dT() {
  if (X1) return yp;
  X1 = 1;
  var W = {};
  /**
   * @license React
   * react-dom-client.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  return W.NODE_ENV !== "production" && function() {
    function ee(e, t) {
      for (e = e.memoizedState; e !== null && 0 < t; )
        e = e.next, t--;
      return e;
    }
    function Oe(e, t, a, i) {
      if (a >= t.length) return i;
      var o = t[a], f = hl(e) ? e.slice() : Me({}, e);
      return f[o] = Oe(e[o], t, a + 1, i), f;
    }
    function N(e, t, a) {
      if (t.length !== a.length)
        console.warn("copyWithRename() expects paths of the same length");
      else {
        for (var i = 0; i < a.length - 1; i++)
          if (t[i] !== a[i]) {
            console.warn(
              "copyWithRename() expects paths to be the same except for the deepest key"
            );
            return;
          }
        return Te(e, t, a, 0);
      }
    }
    function Te(e, t, a, i) {
      var o = t[i], f = hl(e) ? e.slice() : Me({}, e);
      return i + 1 === t.length ? (f[a[i]] = f[o], hl(f) ? f.splice(o, 1) : delete f[o]) : f[o] = Te(
        e[o],
        t,
        a,
        i + 1
      ), f;
    }
    function ve(e, t, a) {
      var i = t[a], o = hl(e) ? e.slice() : Me({}, e);
      return a + 1 === t.length ? (hl(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = ve(e[i], t, a + 1), o);
    }
    function Ae() {
      return !1;
    }
    function Je() {
      return null;
    }
    function oe() {
    }
    function D() {
      console.error(
        "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
      );
    }
    function ie() {
      console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      );
    }
    function Ve() {
    }
    function $(e) {
      var t = [];
      return e.forEach(function(a) {
        t.push(a);
      }), t.sort().join(", ");
    }
    function C(e, t, a, i) {
      return new vg(e, t, a, i);
    }
    function ce(e, t) {
      e.context === Wo && (hr(e.current, 2, t, e, null, null), vc());
    }
    function Ie(e, t) {
      if (eu !== null) {
        var a = t.staleFamilies;
        t = t.updatedFamilies, vi(), Pi(
          e.current,
          t,
          a
        ), vc();
      }
    }
    function Tt(e) {
      eu = e;
    }
    function ht(e) {
      return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
    }
    function et(e) {
      var t = e, a = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          t = e, (t.flags & 4098) !== 0 && (a = t.return), e = t.return;
        while (e);
      }
      return t.tag === 3 ? a : null;
    }
    function Nt(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
      }
      return null;
    }
    function Mt(e) {
      if (et(e) !== e)
        throw Error("Unable to find node on an unmounted component.");
    }
    function xe(e) {
      var t = e.alternate;
      if (!t) {
        if (t = et(e), t === null)
          throw Error("Unable to find node on an unmounted component.");
        return t !== e ? null : e;
      }
      for (var a = e, i = t; ; ) {
        var o = a.return;
        if (o === null) break;
        var f = o.alternate;
        if (f === null) {
          if (i = o.return, i !== null) {
            a = i;
            continue;
          }
          break;
        }
        if (o.child === f.child) {
          for (f = o.child; f; ) {
            if (f === a) return Mt(o), e;
            if (f === i) return Mt(o), t;
            f = f.sibling;
          }
          throw Error("Unable to find node on an unmounted component.");
        }
        if (a.return !== i.return) a = o, i = f;
        else {
          for (var d = !1, h = o.child; h; ) {
            if (h === a) {
              d = !0, a = o, i = f;
              break;
            }
            if (h === i) {
              d = !0, i = o, a = f;
              break;
            }
            h = h.sibling;
          }
          if (!d) {
            for (h = f.child; h; ) {
              if (h === a) {
                d = !0, a = f, i = o;
                break;
              }
              if (h === i) {
                d = !0, i = f, a = o;
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
        if (a.alternate !== i)
          throw Error(
            "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
          );
      }
      if (a.tag !== 3)
        throw Error("Unable to find node on an unmounted component.");
      return a.stateNode.current === a ? e : t;
    }
    function Lt(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return e;
      for (e = e.child; e !== null; ) {
        if (t = Lt(e), t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    function Ut(e) {
      return e === null || typeof e != "object" ? null : (e = Sr && e[Sr] || e["@@iterator"], typeof e == "function" ? e : null);
    }
    function ke(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === Dt ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case Ui:
          return "Fragment";
        case vr:
          return "Profiler";
        case Rc:
          return "StrictMode";
        case Ci:
          return "Suspense";
        case Rd:
          return "SuspenseList";
        case Dd:
          return "Activity";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case qe:
            return "Portal";
          case Sa:
            return (e.displayName || "Context") + ".Provider";
          case gr:
            return (e._context.displayName || "Context") + ".Consumer";
          case _i:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case Od:
            return t = e.displayName || null, t !== null ? t : ke(e.type) || "Memo";
          case xa:
            t = e._payload, e = e._init;
            try {
              return ke(e(t));
            } catch {
            }
        }
      return null;
    }
    function Vt(e) {
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
          return ke(t);
        case 8:
          return t === Rc ? "StrictMode" : "Mode";
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
            for (var a = t.length - 1; 0 <= a; a--)
              if (typeof t[a].name == "string") return t[a].name;
          }
          if (e.return !== null)
            return pe(e.return);
      }
      return null;
    }
    function gt(e) {
      return { current: e };
    }
    function ye(e, t) {
      0 > Zn ? console.error("Unexpected pop.") : (t !== Vo[Zn] && console.error("Unexpected Fiber popped."), e.current = br[Zn], br[Zn] = null, Vo[Zn] = null, Zn--);
    }
    function Qe(e, t, a) {
      Zn++, br[Zn] = e.current, Vo[Zn] = a, e.current = t;
    }
    function Ct(e) {
      return e === null && console.error(
        "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
      ), e;
    }
    function ut(e, t) {
      Qe(Kn, t, e), Qe(Oc, e, e), Qe(Lu, null, e);
      var a = t.nodeType;
      switch (a) {
        case 9:
        case 11:
          a = a === 9 ? "#document" : "#fragment", t = (t = t.documentElement) && (t = t.namespaceURI) ? pa(t) : Bc;
          break;
        default:
          if (a = t.tagName, t = t.namespaceURI)
            t = pa(t), t = Bu(
              t,
              a
            );
          else
            switch (a) {
              case "svg":
                t = hh;
                break;
              case "math":
                t = Iv;
                break;
              default:
                t = Bc;
            }
      }
      a = a.toLowerCase(), a = Mh(null, a), a = {
        context: t,
        ancestorInfo: a
      }, ye(Lu, e), Qe(Lu, a, e);
    }
    function L(e) {
      ye(Lu, e), ye(Oc, e), ye(Kn, e);
    }
    function Y() {
      return Ct(Lu.current);
    }
    function I(e) {
      e.memoizedState !== null && Qe(zd, e, e);
      var t = Ct(Lu.current), a = e.type, i = Bu(t.context, a);
      a = Mh(t.ancestorInfo, a), i = { context: i, ancestorInfo: a }, t !== i && (Qe(Oc, e, e), Qe(Lu, i, e));
    }
    function ue(e) {
      Oc.current === e && (ye(Lu, e), ye(Oc, e)), zd.current === e && (ye(zd, e), op._currentValue = Wr);
    }
    function T(e) {
      return typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
    }
    function A(e) {
      try {
        return J(e), !1;
      } catch {
        return !0;
      }
    }
    function J(e) {
      return "" + e;
    }
    function Q(e, t) {
      if (A(e))
        return console.error(
          "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          T(e)
        ), J(e);
    }
    function ae(e, t) {
      if (A(e))
        return console.error(
          "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
          t,
          T(e)
        ), J(e);
    }
    function be(e) {
      if (A(e))
        return console.error(
          "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
          T(e)
        ), J(e);
    }
    function he(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u") return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled) return !0;
      if (!t.supportsFiber)
        return console.error(
          "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
        ), !0;
      try {
        Dc = t.inject(e), Hl = t;
      } catch (a) {
        console.error("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function _e(e) {
      if (typeof Mn == "function" && mm(e), Hl && typeof Hl.setStrictMode == "function")
        try {
          Hl.setStrictMode(Dc, e);
        } catch (t) {
          tl || (tl = !0, console.error(
            "React instrumentation encountered an error: %s",
            t
          ));
        }
    }
    function yt(e) {
      ne = e;
    }
    function mt() {
      ne !== null && typeof ne.markCommitStopped == "function" && ne.markCommitStopped();
    }
    function fl(e) {
      ne !== null && typeof ne.markComponentRenderStarted == "function" && ne.markComponentRenderStarted(e);
    }
    function Kl() {
      ne !== null && typeof ne.markComponentRenderStopped == "function" && ne.markComponentRenderStopped();
    }
    function ru(e) {
      ne !== null && typeof ne.markRenderStarted == "function" && ne.markRenderStarted(e);
    }
    function Gi() {
      ne !== null && typeof ne.markRenderStopped == "function" && ne.markRenderStopped();
    }
    function Nn(e, t) {
      ne !== null && typeof ne.markStateUpdateScheduled == "function" && ne.markStateUpdateScheduled(e, t);
    }
    function Fr(e) {
      return e >>>= 0, e === 0 ? 32 : 31 - (Vu(e) / Ug | 0) | 0;
    }
    function sf(e) {
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
    function St(e) {
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
    function su(e, t, a) {
      var i = e.pendingLanes;
      if (i === 0) return 0;
      var o = 0, f = e.suspendedLanes, d = e.pingedLanes;
      e = e.warmLanes;
      var h = i & 134217727;
      return h !== 0 ? (i = h & ~f, i !== 0 ? o = St(i) : (d &= h, d !== 0 ? o = St(d) : a || (a = h & ~e, a !== 0 && (o = St(a))))) : (h = i & ~f, h !== 0 ? o = St(h) : d !== 0 ? o = St(d) : a || (a = i & ~e, a !== 0 && (o = St(a)))), o === 0 ? 0 : t !== 0 && t !== o && (t & f) === 0 && (f = o & -o, a = t & -t, f >= a || f === 32 && (a & 4194048) !== 0) ? t : o;
    }
    function du(e, t) {
      return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
    }
    function Ir(e, t) {
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
    function Ne() {
      var e = Md;
      return Md <<= 1, (Md & 4194048) === 0 && (Md = 256), e;
    }
    function Li() {
      var e = Xu;
      return Xu <<= 1, (Xu & 62914560) === 0 && (Xu = 4194304), e;
    }
    function Vi(e) {
      for (var t = [], a = 0; 31 > a; a++) t.push(e);
      return t;
    }
    function Iu(e, t) {
      e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
    }
    function Pr(e, t, a, i, o, f) {
      var d = e.pendingLanes;
      e.pendingLanes = a, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= a, e.entangledLanes &= a, e.errorRecoveryDisabledLanes &= a, e.shellSuspendCounter = 0;
      var h = e.entanglements, v = e.expirationTimes, g = e.hiddenUpdates;
      for (a = d & ~a; 0 < a; ) {
        var B = 31 - bl(a), G = 1 << B;
        h[B] = 0, v[B] = -1;
        var x = g[B];
        if (x !== null)
          for (g[B] = null, B = 0; B < x.length; B++) {
            var V = x[B];
            V !== null && (V.lane &= -536870913);
          }
        a &= ~G;
      }
      i !== 0 && hu(e, i, 0), f !== 0 && o === 0 && e.tag !== 0 && (e.suspendedLanes |= f & ~(d & ~t));
    }
    function hu(e, t, a) {
      e.pendingLanes |= t, e.suspendedLanes &= ~t;
      var i = 31 - bl(t);
      e.entangledLanes |= t, e.entanglements[i] = e.entanglements[i] | 1073741824 | a & 4194090;
    }
    function Yl(e, t) {
      var a = e.entangledLanes |= t;
      for (e = e.entanglements; a; ) {
        var i = 31 - bl(a), o = 1 << i;
        o & t | e[i] & t && (e[i] |= t), a &= ~o;
      }
    }
    function Ga(e) {
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
    function Ol(e, t, a) {
      if (en)
        for (e = e.pendingUpdatersLaneMap; 0 < a; ) {
          var i = 31 - bl(a), o = 1 << i;
          e[i].add(t), a &= ~o;
        }
    }
    function df(e, t) {
      if (en)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; 0 < t; ) {
          var o = 31 - bl(t);
          e = 1 << o, o = a[o], 0 < o.size && (o.forEach(function(f) {
            var d = f.alternate;
            d !== null && i.has(d) || i.add(f);
          }), o.clear()), t &= ~e;
        }
    }
    function jc(e) {
      return e &= -e, Na < e ? kn < e ? (e & 134217727) !== 0 ? Qu : Ud : kn : Na;
    }
    function hf() {
      var e = st.p;
      return e !== 0 ? e : (e = window.event, e === void 0 ? Qu : Mi(e.type));
    }
    function yu(e, t) {
      var a = st.p;
      try {
        return st.p = e, t();
      } finally {
        st.p = a;
      }
    }
    function nn(e) {
      delete e[Xl], delete e[ba], delete e[_d], delete e[Qo], delete e[Er];
    }
    function Dl(e) {
      var t = e[Xl];
      if (t) return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[xi] || a[Xl]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (e = rd(e); e !== null; ) {
              if (a = e[Xl])
                return a;
              e = rd(e);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function ta(e) {
      if (e = e[Xl] || e[xi]) {
        var t = e.tag;
        if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
          return e;
      }
      return null;
    }
    function La(e) {
      var t = e.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6)
        return e.stateNode;
      throw Error("getNodeFromInstance: Invalid argument.");
    }
    function p(e) {
      var t = e[pm];
      return t || (t = e[pm] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), t;
    }
    function z(e) {
      e[Ar] = !0;
    }
    function P(e, t) {
      te(e, t), te(e + "Capture", t);
    }
    function te(e, t) {
      Un[e] && console.error(
        "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
        e
      ), Un[e] = t;
      var a = e.toLowerCase();
      for (Cd[a] = e, e === "onDoubleClick" && (Cd.ondblclick = e), e = 0; e < t.length; e++)
        zc.add(t[e]);
    }
    function re(e, t) {
      Hd[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || console.error(
        e === "select" ? "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`." : "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
      ), t.onChange || t.readOnly || t.disabled || t.checked == null || console.error(
        "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
      );
    }
    function Xe(e) {
      return Jn.call(Rr, e) ? !0 : Jn.call(xd, e) ? !1 : vm.test(e) ? Rr[e] = !0 : (xd[e] = !0, console.error("Invalid attribute name: `%s`", e), !1);
    }
    function Ce(e, t, a) {
      if (Xe(t)) {
        if (!e.hasAttribute(t)) {
          switch (typeof a) {
            case "symbol":
            case "object":
              return a;
            case "function":
              return a;
            case "boolean":
              if (a === !1) return a;
          }
          return a === void 0 ? void 0 : null;
        }
        return e = e.getAttribute(t), e === "" && a === !0 ? !0 : (Q(a, t), e === "" + a ? a : e);
      }
    }
    function lt(e, t, a) {
      if (Xe(t))
        if (a === null) e.removeAttribute(t);
        else {
          switch (typeof a) {
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
          Q(a, t), e.setAttribute(t, "" + a);
        }
    }
    function ze(e, t, a) {
      if (a === null) e.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(t);
            return;
        }
        Q(a, t), e.setAttribute(t, "" + a);
      }
    }
    function ll(e, t, a, i) {
      if (i === null) e.removeAttribute(a);
      else {
        switch (typeof i) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            e.removeAttribute(a);
            return;
        }
        Q(i, a), e.setAttributeNS(t, a, "" + i);
      }
    }
    function qn() {
    }
    function gh() {
      if (Zo === 0) {
        gm = console.log, yv = console.info, Sm = console.warn, Ko = console.error, mv = console.group, pv = console.groupCollapsed, vv = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: qn,
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
      Zo++;
    }
    function Bn() {
      if (Zo--, Zo === 0) {
        var e = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: Me({}, e, { value: gm }),
          info: Me({}, e, { value: yv }),
          warn: Me({}, e, { value: Sm }),
          error: Me({}, e, { value: Ko }),
          group: Me({}, e, { value: mv }),
          groupCollapsed: Me({}, e, { value: pv }),
          groupEnd: Me({}, e, { value: vv })
        });
      }
      0 > Zo && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function _t(e) {
      if (Jo === void 0)
        try {
          throw Error();
        } catch (a) {
          var t = a.stack.trim().match(/\n( *(at )?)/);
          Jo = t && t[1] || "", Or = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Jo + e + Or;
    }
    function wl(e, t) {
      if (!e || Dr) return "";
      var a = bm.get(e);
      if (a !== void 0) return a;
      Dr = !0, a = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var i = null;
      i = q.H, q.H = null, gh();
      try {
        var o = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var x = function() {
                  throw Error();
                };
                if (Object.defineProperty(x.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(x, []);
                  } catch (se) {
                    var V = se;
                  }
                  Reflect.construct(e, [], x);
                } else {
                  try {
                    x.call();
                  } catch (se) {
                    V = se;
                  }
                  e.call(x.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (se) {
                  V = se;
                }
                (x = e()) && typeof x.catch == "function" && x.catch(function() {
                });
              }
            } catch (se) {
              if (se && V && typeof se.stack == "string")
                return [se.stack, V.stack];
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
`), B = v.split(`
`);
          for (d = f = 0; f < g.length && !g[f].includes(
            "DetermineComponentFrameRoot"
          ); )
            f++;
          for (; d < B.length && !B[d].includes(
            "DetermineComponentFrameRoot"
          ); )
            d++;
          if (f === g.length || d === B.length)
            for (f = g.length - 1, d = B.length - 1; 1 <= f && 0 <= d && g[f] !== B[d]; )
              d--;
          for (; 1 <= f && 0 <= d; f--, d--)
            if (g[f] !== B[d]) {
              if (f !== 1 || d !== 1)
                do
                  if (f--, d--, 0 > d || g[f] !== B[d]) {
                    var G = `
` + g[f].replace(
                      " at new ",
                      " at "
                    );
                    return e.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", e.displayName)), typeof e == "function" && bm.set(e, G), G;
                  }
                while (1 <= f && 0 <= d);
              break;
            }
        }
      } finally {
        Dr = !1, q.H = i, Bn(), Error.prepareStackTrace = a;
      }
      return g = (g = e ? e.displayName || e.name : "") ? _t(g) : "", typeof e == "function" && bm.set(e, g), g;
    }
    function Xi(e) {
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
    function Sh(e) {
      switch (e.tag) {
        case 26:
        case 27:
        case 5:
          return _t(e.type);
        case 16:
          return _t("Lazy");
        case 13:
          return _t("Suspense");
        case 19:
          return _t("SuspenseList");
        case 0:
        case 15:
          return wl(e.type, !1);
        case 11:
          return wl(e.type.render, !1);
        case 1:
          return wl(e.type, !0);
        case 31:
          return _t("Activity");
        default:
          return "";
      }
    }
    function pp(e) {
      try {
        var t = "";
        do {
          t += Sh(e);
          var a = e._debugInfo;
          if (a)
            for (var i = a.length - 1; 0 <= i; i--) {
              var o = a[i];
              if (typeof o.name == "string") {
                var f = t, d = o.env, h = _t(
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
    function vp(e) {
      return (e = e ? e.displayName || e.name : "") ? _t(e) : "";
    }
    function yf() {
      if (xl === null) return null;
      var e = xl._debugOwner;
      return e != null ? Vt(e) : null;
    }
    function mf() {
      if (xl === null) return "";
      var e = xl;
      try {
        var t = "";
        switch (e.tag === 6 && (e = e.return), e.tag) {
          case 26:
          case 27:
          case 5:
            t += _t(e.type);
            break;
          case 13:
            t += _t("Suspense");
            break;
          case 19:
            t += _t("SuspenseList");
            break;
          case 31:
            t += _t("Activity");
            break;
          case 30:
          case 0:
          case 15:
          case 1:
            e._debugOwner || t !== "" || (t += vp(
              e.type
            ));
            break;
          case 11:
            e._debugOwner || t !== "" || (t += vp(
              e.type.render
            ));
        }
        for (; e; )
          if (typeof e.tag == "number") {
            var a = e;
            e = a._debugOwner;
            var i = a._debugStack;
            e && i && (typeof i != "string" && (a._debugStack = i = Xi(i)), i !== "" && (t += `
` + i));
          } else if (e.debugStack != null) {
            var o = e.debugStack;
            (e = e.owner) && o && (t += `
` + Xi(o));
          } else break;
        var f = t;
      } catch (d) {
        f = `
Error generating stack: ` + d.message + `
` + d.stack;
      }
      return f;
    }
    function me(e, t, a, i, o, f, d) {
      var h = xl;
      Pu(e);
      try {
        return e !== null && e._debugTask ? e._debugTask.run(
          t.bind(null, a, i, o, f, d)
        ) : t(a, i, o, f, d);
      } finally {
        Pu(h);
      }
      throw Error(
        "runWithFiberInDEV should never be called in production. This is a bug in React."
      );
    }
    function Pu(e) {
      q.getCurrentStack = e === null ? null : mf, $n = !1, xl = e;
    }
    function zl(e) {
      switch (typeof e) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return be(e), e;
        default:
          return "";
      }
    }
    function Gc(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Lc(e) {
      var t = Gc(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(
        e.constructor.prototype,
        t
      );
      be(e[t]);
      var i = "" + e[t];
      if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
        var o = a.get, f = a.set;
        return Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(d) {
            be(d), i = "" + d, f.call(this, d);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        }), {
          getValue: function() {
            return i;
          },
          setValue: function(d) {
            be(d), i = "" + d;
          },
          stopTracking: function() {
            e._valueTracker = null, delete e[t];
          }
        };
      }
    }
    function Pt(e) {
      e._valueTracker || (e._valueTracker = Lc(e));
    }
    function bh(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var a = t.getValue(), i = "";
      return e && (i = Gc(e) ? e.checked ? "true" : "false" : e.value), e = i, e !== a ? (t.setValue(e), !0) : !1;
    }
    function pf(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function pl(e) {
      return e.replace(
        gv,
        function(t) {
          return "\\" + t.charCodeAt(0).toString(16) + " ";
        }
      );
    }
    function Qi(e, t) {
      t.checked === void 0 || t.defaultChecked === void 0 || Em || (console.error(
        "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        yf() || "A component",
        t.type
      ), Em = !0), t.value === void 0 || t.defaultValue === void 0 || Tm || (console.error(
        "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
        yf() || "A component",
        t.type
      ), Tm = !0);
    }
    function Th(e, t, a, i, o, f, d, h) {
      e.name = "", d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" ? (Q(d, "type"), e.type = d) : e.removeAttribute("type"), t != null ? d === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + zl(t)) : e.value !== "" + zl(t) && (e.value = "" + zl(t)) : d !== "submit" && d !== "reset" || e.removeAttribute("value"), t != null ? es(e, d, zl(t)) : a != null ? es(e, d, zl(a)) : i != null && e.removeAttribute("value"), o == null && f != null && (e.defaultChecked = !!f), o != null && (e.checked = o && typeof o != "function" && typeof o != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? (Q(h, "name"), e.name = "" + zl(h)) : e.removeAttribute("name");
    }
    function Eh(e, t, a, i, o, f, d, h) {
      if (f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (Q(f, "type"), e.type = f), t != null || a != null) {
        if (!(f !== "submit" && f !== "reset" || t != null))
          return;
        a = a != null ? "" + zl(a) : "", t = t != null ? "" + zl(t) : a, h || t === e.value || (e.value = t), e.defaultValue = t;
      }
      i = i ?? o, i = typeof i != "function" && typeof i != "symbol" && !!i, e.checked = h ? e.checked : !!i, e.defaultChecked = !!i, d != null && typeof d != "function" && typeof d != "symbol" && typeof d != "boolean" && (Q(d, "name"), e.name = d);
    }
    function es(e, t, a) {
      t === "number" && pf(e.ownerDocument) === e || e.defaultValue === "" + a || (e.defaultValue = "" + a);
    }
    function gp(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? fm.Children.forEach(t.children, function(a) {
        a == null || typeof a == "string" || typeof a == "number" || typeof a == "bigint" || Nd || (Nd = !0, console.error(
          "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
        ));
      }) : t.dangerouslySetInnerHTML == null || Rm || (Rm = !0, console.error(
        "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
      ))), t.selected == null || Am || (console.error(
        "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
      ), Am = !0);
    }
    function vf() {
      var e = yf();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    function mu(e, t, a, i) {
      if (e = e.options, t) {
        t = {};
        for (var o = 0; o < a.length; o++)
          t["$" + a[o]] = !0;
        for (a = 0; a < e.length; a++)
          o = t.hasOwnProperty("$" + e[a].value), e[a].selected !== o && (e[a].selected = o), o && i && (e[a].defaultSelected = !0);
      } else {
        for (a = "" + zl(a), t = null, o = 0; o < e.length; o++) {
          if (e[o].value === a) {
            e[o].selected = !0, i && (e[o].defaultSelected = !0);
            return;
          }
          t !== null || e[o].disabled || (t = e[o]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function Yn(e, t) {
      for (e = 0; e < Sv.length; e++) {
        var a = Sv[e];
        if (t[a] != null) {
          var i = hl(t[a]);
          t.multiple && !i ? console.error(
            "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
            a,
            vf()
          ) : !t.multiple && i && console.error(
            "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
            a,
            vf()
          );
        }
      }
      t.value === void 0 || t.defaultValue === void 0 || zr || (console.error(
        "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
      ), zr = !0);
    }
    function ts(e, t) {
      t.value === void 0 || t.defaultValue === void 0 || bv || (console.error(
        "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
        yf() || "A component"
      ), bv = !0), t.children != null && t.value == null && console.error(
        "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
      );
    }
    function Ah(e, t, a) {
      if (t != null && (t = "" + zl(t), t !== e.value && (e.value = t), a == null)) {
        e.defaultValue !== t && (e.defaultValue = t);
        return;
      }
      e.defaultValue = a != null ? "" + zl(a) : "";
    }
    function Zi(e, t, a, i) {
      if (t == null) {
        if (i != null) {
          if (a != null)
            throw Error(
              "If you supply `defaultValue` on a <textarea>, do not pass children."
            );
          if (hl(i)) {
            if (1 < i.length)
              throw Error("<textarea> can only have at most one child.");
            i = i[0];
          }
          a = i;
        }
        a == null && (a = ""), t = a;
      }
      a = zl(t), e.defaultValue = a, i = e.textContent, i === a && i !== "" && i !== null && (e.value = i);
    }
    function ls(e, t) {
      return e.serverProps === void 0 && e.serverTail.length === 0 && e.children.length === 1 && 3 < e.distanceFromLeaf && e.distanceFromLeaf > 15 - t ? ls(e.children[0], t) : e;
    }
    function Jl(e) {
      return "  " + "  ".repeat(e);
    }
    function Vc(e) {
      return "+ " + "  ".repeat(e);
    }
    function ei(e) {
      return "- " + "  ".repeat(e);
    }
    function Ra(e) {
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
    function Xc(e, t) {
      return qd.test(e) ? (e = JSON.stringify(e), e.length > t - 2 ? 8 > t ? '{"..."}' : "{" + e.slice(0, t - 7) + '..."}' : "{" + e + "}") : e.length > t ? 5 > t ? '{"..."}' : e.slice(0, t - 3) + "..." : e;
    }
    function as(e, t, a) {
      var i = 120 - 2 * a;
      if (t === null)
        return Vc(a) + Xc(e, i) + `
`;
      if (typeof t == "string") {
        for (var o = 0; o < t.length && o < e.length && t.charCodeAt(o) === e.charCodeAt(o); o++) ;
        return o > i - 8 && 10 < o && (e = "..." + e.slice(o - 8), t = "..." + t.slice(o - 8)), Vc(a) + Xc(e, i) + `
` + ei(a) + Xc(t, i) + `
`;
      }
      return Jl(a) + Xc(e, i) + `
`;
    }
    function Qc(e) {
      return Object.prototype.toString.call(e).replace(/^\[object (.*)\]$/, function(t, a) {
        return a;
      });
    }
    function Zc(e, t) {
      switch (typeof e) {
        case "string":
          return e = JSON.stringify(e), e.length > t ? 5 > t ? '"..."' : e.slice(0, t - 4) + '..."' : e;
        case "object":
          if (e === null) return "null";
          if (hl(e)) return "[...]";
          if (e.$$typeof === Gu)
            return (t = ke(e.type)) ? "<" + t + ">" : "<...>";
          var a = Qc(e);
          if (a === "Object") {
            a = "", t -= 2;
            for (var i in e)
              if (e.hasOwnProperty(i)) {
                var o = JSON.stringify(i);
                if (o !== '"' + i + '"' && (i = o), t -= i.length - 2, o = Zc(
                  e[i],
                  15 > t ? t : 15
                ), t -= o.length, 0 > t) {
                  a += a === "" ? "..." : ", ...";
                  break;
                }
                a += (a === "" ? "" : ",") + i + ":" + o;
              }
            return "{" + a + "}";
          }
          return a;
        case "function":
          return (t = e.displayName || e.name) ? "function " + t : "function";
        default:
          return String(e);
      }
    }
    function pu(e, t) {
      return typeof e != "string" || qd.test(e) ? "{" + Zc(e, t - 2) + "}" : e.length > t - 2 ? 5 > t ? '"..."' : '"' + e.slice(0, t - 5) + '..."' : '"' + e + '"';
    }
    function Rh(e, t, a) {
      var i = 120 - a.length - e.length, o = [], f;
      for (f in t)
        if (t.hasOwnProperty(f) && f !== "children") {
          var d = pu(
            t[f],
            120 - a.length - f.length - 1
          );
          i -= f.length + d.length + 2, o.push(f + "=" + d);
        }
      return o.length === 0 ? a + "<" + e + `>
` : 0 < i ? a + "<" + e + " " + o.join(" ") + `>
` : a + "<" + e + `
` + a + "  " + o.join(`
` + a + "  ") + `
` + a + `>
`;
    }
    function Va(e, t, a) {
      var i = "", o = Me({}, t), f;
      for (f in e)
        if (e.hasOwnProperty(f)) {
          delete o[f];
          var d = 120 - 2 * a - f.length - 2, h = Zc(e[f], d);
          t.hasOwnProperty(f) ? (d = Zc(t[f], d), i += Vc(a) + f + ": " + h + `
`, i += ei(a) + f + ": " + d + `
`) : i += Vc(a) + f + ": " + h + `
`;
        }
      for (var v in o)
        o.hasOwnProperty(v) && (e = Zc(
          o[v],
          120 - 2 * a - v.length - 2
        ), i += ei(a) + v + ": " + e + `
`);
      return i;
    }
    function Oh(e, t, a, i) {
      var o = "", f = /* @__PURE__ */ new Map();
      for (g in a)
        a.hasOwnProperty(g) && f.set(
          g.toLowerCase(),
          g
        );
      if (f.size === 1 && f.has("children"))
        o += Rh(
          e,
          t,
          Jl(i)
        );
      else {
        for (var d in t)
          if (t.hasOwnProperty(d) && d !== "children") {
            var h = 120 - 2 * (i + 1) - d.length - 1, v = f.get(d.toLowerCase());
            if (v !== void 0) {
              f.delete(d.toLowerCase());
              var g = t[d];
              v = a[v];
              var B = pu(
                g,
                h
              );
              h = pu(
                v,
                h
              ), typeof g == "object" && g !== null && typeof v == "object" && v !== null && Qc(g) === "Object" && Qc(v) === "Object" && (2 < Object.keys(g).length || 2 < Object.keys(v).length || -1 < B.indexOf("...") || -1 < h.indexOf("...")) ? o += Jl(i + 1) + d + `={{
` + Va(
                g,
                v,
                i + 2
              ) + Jl(i + 1) + `}}
` : (o += Vc(i + 1) + d + "=" + B + `
`, o += ei(i + 1) + d + "=" + h + `
`);
            } else
              o += Jl(i + 1) + d + "=" + pu(t[d], h) + `
`;
          }
        f.forEach(function(G) {
          if (G !== "children") {
            var x = 120 - 2 * (i + 1) - G.length - 1;
            o += ei(i + 1) + G + "=" + pu(a[G], x) + `
`;
          }
        }), o = o === "" ? Jl(i) + "<" + e + `>
` : Jl(i) + "<" + e + `
` + o + Jl(i) + `>
`;
      }
      return e = a.children, t = t.children, typeof e == "string" || typeof e == "number" || typeof e == "bigint" ? (f = "", (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (f = "" + t), o += as(f, "" + e, i + 1)) : (typeof t == "string" || typeof t == "number" || typeof t == "bigint") && (o = e == null ? o + as("" + t, null, i + 1) : o + as("" + t, void 0, i + 1)), o;
    }
    function Dh(e, t) {
      var a = Ra(e);
      if (a === null) {
        for (a = "", e = e.child; e; )
          a += Dh(e, t), e = e.sibling;
        return a;
      }
      return Jl(t) + "<" + a + `>
`;
    }
    function gf(e, t) {
      var a = ls(e, t);
      if (a !== e && (e.children.length !== 1 || e.children[0] !== a))
        return Jl(t) + `...
` + gf(a, t + 1);
      a = "";
      var i = e.fiber._debugInfo;
      if (i)
        for (var o = 0; o < i.length; o++) {
          var f = i[o].name;
          typeof f == "string" && (a += Jl(t) + "<" + f + `>
`, t++);
        }
      if (i = "", o = e.fiber.pendingProps, e.fiber.tag === 6)
        i = as(o, e.serverProps, t), t++;
      else if (f = Ra(e.fiber), f !== null)
        if (e.serverProps === void 0) {
          i = t;
          var d = 120 - 2 * i - f.length - 2, h = "";
          for (g in o)
            if (o.hasOwnProperty(g) && g !== "children") {
              var v = pu(o[g], 15);
              if (d -= g.length + v.length + 2, 0 > d) {
                h += " ...";
                break;
              }
              h += " " + g + "=" + v;
            }
          i = Jl(i) + "<" + f + h + `>
`, t++;
        } else
          e.serverProps === null ? (i = Rh(
            f,
            o,
            Vc(t)
          ), t++) : typeof e.serverProps == "string" ? console.error(
            "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
          ) : (i = Oh(
            f,
            o,
            e.serverProps,
            t
          ), t++);
      var g = "";
      for (o = e.fiber.child, f = 0; o && f < e.children.length; )
        d = e.children[f], d.fiber === o ? (g += gf(d, t), f++) : g += Dh(o, t), o = o.sibling;
      for (o && 0 < e.children.length && (g += Jl(t) + `...
`), o = e.serverTail, e.serverProps === null && t--, e = 0; e < o.length; e++)
        f = o[e], g = typeof f == "string" ? g + (ei(t) + Xc(f, 120 - 2 * t) + `
`) : g + Rh(
          f.type,
          f.props,
          ei(t)
        );
      return a + i + g;
    }
    function ti(e) {
      try {
        return `

` + gf(e, 0);
      } catch {
        return "";
      }
    }
    function zh(e, t, a) {
      for (var i = t, o = null, f = 0; i; )
        i === e && (f = 0), o = {
          fiber: i,
          children: o !== null ? [o] : [],
          serverProps: i === t ? a : i === e ? null : void 0,
          serverTail: [],
          distanceFromLeaf: f
        }, f++, i = i.return;
      return o !== null ? ti(o).replaceAll(/^[+-]/gm, ">") : "";
    }
    function Mh(e, t) {
      var a = Me({}, e || Bd), i = { tag: t };
      return Mr.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Dm.indexOf(t) !== -1 && (a.pTagInButtonScope = null), Om.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), t === "#document" || t === "html" ? a.containerTagInScope = null : a.containerTagInScope || (a.containerTagInScope = i), e !== null || t !== "#document" && t !== "html" && t !== "body" ? a.implicitRootScope === !0 && (a.implicitRootScope = !1) : a.implicitRootScope = !0, a;
    }
    function Ki(e, t, a) {
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
          if (a) break;
          return e === "head" || e === "body" || e === "frameset";
        case "frameset":
          return e === "frame";
        case "#document":
          if (!a) return e === "html";
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
          return Tv.indexOf(t) === -1;
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
          return a || t === null;
        case "html":
          return a && t === "#document" || t === null;
        case "body":
          return a && (t === "#document" || t === "html") || t === null;
      }
      return !0;
    }
    function rg(e, t) {
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
    function Uh(e, t) {
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
    function ns(e, t) {
      t = t || Bd;
      var a = t.current;
      if (t = (a = Ki(
        e,
        a && a.tag,
        t.implicitRootScope
      ) ? null : a) ? null : rg(e, t), t = a || t, !t) return !0;
      var i = t.tag;
      if (t = String(!!a) + "|" + e + "|" + i, _n[t]) return !1;
      _n[t] = !0;
      var o = (t = xl) ? Uh(t.return, i) : null, f = t !== null && o !== null ? zh(o, t, null) : "", d = "<" + e + ">";
      return a ? (a = "", i === "table" && e === "tr" && (a += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
        `In HTML, %s cannot be a child of <%s>.%s
This will cause a hydration error.%s`,
        d,
        i,
        a,
        f
      )) : console.error(
        `In HTML, %s cannot be a descendant of <%s>.
This will cause a hydration error.%s`,
        d,
        i,
        f
      ), t && (e = t.return, o === null || e === null || o === e && e._debugOwner === t._debugOwner || me(o, function() {
        console.error(
          `<%s> cannot contain a nested %s.
See this log for the ancestor stack trace.`,
          i,
          d
        );
      })), !1;
    }
    function Kc(e, t, a) {
      if (a || Ki("#text", t, !1))
        return !0;
      if (a = "#text|" + t, _n[a]) return !1;
      _n[a] = !0;
      var i = (a = xl) ? Uh(a, t) : null;
      return a = a !== null && i !== null ? zh(
        i,
        a,
        a.tag !== 6 ? { children: null } : null
      ) : "", /\S/.test(e) ? console.error(
        `In HTML, text nodes cannot be a child of <%s>.
This will cause a hydration error.%s`,
        t,
        a
      ) : console.error(
        `In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.
This will cause a hydration error.%s`,
        t,
        a
      ), !1;
    }
    function Sf(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    function sg(e) {
      return e.replace(_g, function(t, a) {
        return a.toUpperCase();
      });
    }
    function bf(e, t, a) {
      var i = t.indexOf("--") === 0;
      i || (-1 < t.indexOf("-") ? Fn.hasOwnProperty(t) && Fn[t] || (Fn[t] = !0, console.error(
        "Unsupported style property %s. Did you mean %s?",
        t,
        sg(t.replace(Ni, "ms-"))
      )) : Ur.test(t) ? Fn.hasOwnProperty(t) && Fn[t] || (Fn[t] = !0, console.error(
        "Unsupported vendor-prefixed style property %s. Did you mean %s?",
        t,
        t.charAt(0).toUpperCase() + t.slice(1)
      )) : !zm.test(a) || Mm.hasOwnProperty(a) && Mm[a] || (Mm[a] = !0, console.error(
        `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
        t,
        a.replace(zm, "")
      )), typeof a == "number" && (isNaN(a) ? Um || (Um = !0, console.error(
        "`NaN` is an invalid value for the `%s` css style property.",
        t
      )) : isFinite(a) || _r || (_r = !0, console.error(
        "`Infinity` is an invalid value for the `%s` css style property.",
        t
      )))), a == null || typeof a == "boolean" || a === "" ? i ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : i ? e.setProperty(t, a) : typeof a != "number" || a === 0 || _m.has(t) ? t === "float" ? e.cssFloat = a : (ae(a, t), e[t] = ("" + a).trim()) : e[t] = a + "px";
    }
    function us(e, t, a) {
      if (t != null && typeof t != "object")
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      if (t && Object.freeze(t), e = e.style, a != null) {
        if (t) {
          var i = {};
          if (a) {
            for (var o in a)
              if (a.hasOwnProperty(o) && !t.hasOwnProperty(o))
                for (var f = Wn[o] || [o], d = 0; d < f.length; d++)
                  i[f[d]] = o;
          }
          for (var h in t)
            if (t.hasOwnProperty(h) && (!a || a[h] !== t[h]))
              for (o = Wn[h] || [h], f = 0; f < o.length; f++)
                i[o[f]] = h;
          h = {};
          for (var v in t)
            for (o = Wn[v] || [v], f = 0; f < o.length; f++)
              h[o[f]] = v;
          v = {};
          for (var g in i)
            if (o = i[g], (f = h[g]) && o !== f && (d = o + "," + f, !v[d])) {
              v[d] = !0, d = console;
              var B = t[o];
              d.error.call(
                d,
                "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                B == null || typeof B == "boolean" || B === "" ? "Removing" : "Updating",
                o,
                f
              );
            }
        }
        for (var G in a)
          !a.hasOwnProperty(G) || t != null && t.hasOwnProperty(G) || (G.indexOf("--") === 0 ? e.setProperty(G, "") : G === "float" ? e.cssFloat = "" : e[G] = "");
        for (var x in t)
          g = t[x], t.hasOwnProperty(x) && a[x] !== g && bf(e, x, g);
      } else
        for (i in t)
          t.hasOwnProperty(i) && bf(e, i, t[i]);
    }
    function Ji(e) {
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
    function ki(e) {
      return wd.get(e) || e;
    }
    function Jc(e, t) {
      if (Jn.call(qi, t) && qi[t])
        return !0;
      if (Ev.test(t)) {
        if (e = "aria-" + t.slice(4).toLowerCase(), e = $o.hasOwnProperty(e) ? e : null, e == null)
          return console.error(
            "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
            t
          ), qi[t] = !0;
        if (t !== e)
          return console.error(
            "Invalid ARIA attribute `%s`. Did you mean `%s`?",
            t,
            e
          ), qi[t] = !0;
      }
      if (jd.test(t)) {
        if (e = t.toLowerCase(), e = $o.hasOwnProperty(e) ? e : null, e == null) return qi[t] = !0, !1;
        t !== e && (console.error(
          "Unknown ARIA attribute `%s`. Did you mean `%s`?",
          t,
          e
        ), qi[t] = !0);
      }
      return !0;
    }
    function Sp(e, t) {
      var a = [], i;
      for (i in t)
        Jc(e, i) || a.push(i);
      t = a.map(function(o) {
        return "`" + o + "`";
      }).join(", "), a.length === 1 ? console.error(
        "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      ) : 1 < a.length && console.error(
        "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
        t,
        e
      );
    }
    function _h(e, t, a, i) {
      if (Jn.call(Tl, t) && Tl[t])
        return !0;
      var o = t.toLowerCase();
      if (o === "onfocusin" || o === "onfocusout")
        return console.error(
          "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
        ), Tl[t] = !0;
      if (typeof a == "function" && (e === "form" && t === "action" || e === "input" && t === "formAction" || e === "button" && t === "formAction"))
        return !0;
      if (i != null) {
        if (e = i.possibleRegistrationNames, i.registrationNameDependencies.hasOwnProperty(t))
          return !0;
        if (i = e.hasOwnProperty(o) ? e[o] : null, i != null)
          return console.error(
            "Invalid event handler property `%s`. Did you mean `%s`?",
            t,
            i
          ), Tl[t] = !0;
        if (l.test(t))
          return console.error(
            "Unknown event handler property `%s`. It will be ignored.",
            t
          ), Tl[t] = !0;
      } else if (l.test(t))
        return n.test(t) && console.error(
          "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
          t
        ), Tl[t] = !0;
      if (u.test(t) || c.test(t)) return !0;
      if (o === "innerhtml")
        return console.error(
          "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
        ), Tl[t] = !0;
      if (o === "aria")
        return console.error(
          "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
        ), Tl[t] = !0;
      if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
        return console.error(
          "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
          typeof a
        ), Tl[t] = !0;
      if (typeof a == "number" && isNaN(a))
        return console.error(
          "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
          t
        ), Tl[t] = !0;
      if (Cr.hasOwnProperty(o)) {
        if (o = Cr[o], o !== t)
          return console.error(
            "Invalid DOM property `%s`. Did you mean `%s`?",
            t,
            o
          ), Tl[t] = !0;
      } else if (t !== o)
        return console.error(
          "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
          t,
          o
        ), Tl[t] = !0;
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
      switch (typeof a) {
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
              return o = t.toLowerCase().slice(0, 5), o === "data-" || o === "aria-" ? !0 : (a ? console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                a,
                t,
                t,
                a,
                t
              ) : console.error(
                'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                a,
                t,
                t,
                a,
                t,
                t,
                t
              ), Tl[t] = !0);
          }
        case "function":
        case "symbol":
          return Tl[t] = !0, !1;
        case "string":
          if (a === "false" || a === "true") {
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
              a,
              t,
              a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
              t,
              a
            ), Tl[t] = !0;
          }
      }
      return !0;
    }
    function bp(e, t, a) {
      var i = [], o;
      for (o in t)
        _h(e, o, t[o], a) || i.push(o);
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
    function vu(e) {
      return r.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
    }
    function un(e) {
      return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
    }
    function is(e) {
      var t = ta(e);
      if (t && (e = t.stateNode)) {
        var a = e[ba] || null;
        e: switch (e = t.stateNode, t.type) {
          case "input":
            if (Th(
              e,
              a.value,
              a.defaultValue,
              a.defaultValue,
              a.checked,
              a.defaultChecked,
              a.type,
              a.name
            ), t = a.name, a.type === "radio" && t != null) {
              for (a = e; a.parentNode; ) a = a.parentNode;
              for (Q(t, "name"), a = a.querySelectorAll(
                'input[name="' + pl(
                  "" + t
                ) + '"][type="radio"]'
              ), t = 0; t < a.length; t++) {
                var i = a[t];
                if (i !== e && i.form === e.form) {
                  var o = i[ba] || null;
                  if (!o)
                    throw Error(
                      "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                    );
                  Th(
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
              for (t = 0; t < a.length; t++)
                i = a[t], i.form === e.form && bh(i);
            }
            break e;
          case "textarea":
            Ah(e, a.value, a.defaultValue);
            break e;
          case "select":
            t = a.value, t != null && mu(e, !!a.multiple, t, !1);
        }
      }
    }
    function kc(e, t, a) {
      if (S) return e(t, a);
      S = !0;
      try {
        var i = e(t);
        return i;
      } finally {
        if (S = !1, (y !== null || m !== null) && (vc(), y && (t = y, e = m, m = y = null, is(t), e)))
          for (t = 0; t < e.length; t++) is(e[t]);
      }
    }
    function Xa(e, t) {
      var a = e.stateNode;
      if (a === null) return null;
      var i = a[ba] || null;
      if (i === null) return null;
      a = i[t];
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
      if (a && typeof a != "function")
        throw Error(
          "Expected `" + t + "` listener to be a function, instead got a value of `" + typeof a + "` type."
        );
      return a;
    }
    function cs() {
      if (Ee) return Ee;
      var e, t = w, a = t.length, i, o = "value" in H ? H.value : H.textContent, f = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++) ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[f - i]; i++) ;
      return Ee = o.slice(e, 1 < i ? 1 - i : void 0);
    }
    function $i(e) {
      var t = e.keyCode;
      return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
    }
    function Tf() {
      return !0;
    }
    function Ef() {
      return !1;
    }
    function Ml(e) {
      function t(a, i, o, f, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = f, this.target = d, this.currentTarget = null;
        for (var h in e)
          e.hasOwnProperty(h) && (a = e[h], this[h] = a ? a(f) : f[h]);
        return this.isDefaultPrevented = (f.defaultPrevented != null ? f.defaultPrevented : f.returnValue === !1) ? Tf : Ef, this.isPropagationStopped = Ef, this;
      }
      return Me(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Tf);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Tf);
        },
        persist: function() {
        },
        isPersistent: Tf
      }), t;
    }
    function Tp(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = lb[e]) ? !!t[e] : !1;
    }
    function jl() {
      return Tp;
    }
    function li(e, t) {
      switch (e) {
        case "keyup":
          return yb.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== N0;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Af(e) {
      return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
    }
    function Rf(e, t) {
      switch (e) {
        case "compositionend":
          return Af(t);
        case "keypress":
          return t.which !== B0 ? null : (w0 = !0, Y0);
        case "textInput":
          return e = t.data, e === Y0 && w0 ? null : e;
        default:
          return null;
      }
    }
    function dg(e, t) {
      if (Gd)
        return e === "compositionend" || !Hg && li(e, t) ? (e = cs(), Ee = w = H = null, Gd = !1, e) : null;
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
          return q0 && t.locale !== "ko" ? null : t.data;
        default:
          return null;
      }
    }
    function os(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!pb[e.type] : t === "textarea";
    }
    function Ch(e) {
      if (!U) return !1;
      e = "on" + e;
      var t = e in document;
      return t || (t = document.createElement("div"), t.setAttribute(e, "return;"), t = typeof t[e] == "function"), t;
    }
    function $c(e, t, a, i) {
      y ? m ? m.push(i) : m = [i] : y = i, t = Vl(t, "onChange"), 0 < t.length && (a = new dt(
        "onChange",
        "change",
        null,
        a,
        i
      ), e.push({ event: a, listeners: t }));
    }
    function fs(e) {
      Jy(e, 0);
    }
    function Of(e) {
      var t = La(e);
      if (bh(t)) return e;
    }
    function Ep(e, t) {
      if (e === "change") return t;
    }
    function Ap() {
      Hm && (Hm.detachEvent("onpropertychange", Rp), xm = Hm = null);
    }
    function Rp(e) {
      if (e.propertyName === "value" && Of(xm)) {
        var t = [];
        $c(
          t,
          xm,
          e,
          un(e)
        ), kc(fs, t);
      }
    }
    function Hh(e, t, a) {
      e === "focusin" ? (Ap(), Hm = t, xm = a, Hm.attachEvent("onpropertychange", Rp)) : e === "focusout" && Ap();
    }
    function hg(e) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return Of(xm);
    }
    function yg(e, t) {
      if (e === "click") return Of(t);
    }
    function mg(e, t) {
      if (e === "input" || e === "change")
        return Of(t);
    }
    function pg(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    function Df(e, t) {
      if (qa(e, t)) return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length) return !1;
      for (i = 0; i < a.length; i++) {
        var o = a[i];
        if (!Jn.call(t, o) || !qa(e[o], t[o]))
          return !1;
      }
      return !0;
    }
    function xh(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Op(e, t) {
      var a = xh(e);
      e = 0;
      for (var i; a; ) {
        if (a.nodeType === 3) {
          if (i = e + a.textContent.length, e <= t && i >= t)
            return { node: a, offset: t - e };
          e = i;
        }
        e: {
          for (; a; ) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break e;
            }
            a = a.parentNode;
          }
          a = void 0;
        }
        a = xh(a);
      }
    }
    function Dp(e, t) {
      return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Dp(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
    }
    function zp(e) {
      e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
      for (var t = pf(e.document); t instanceof e.HTMLIFrameElement; ) {
        try {
          var a = typeof t.contentWindow.location.href == "string";
        } catch {
          a = !1;
        }
        if (a) e = t.contentWindow;
        else break;
        t = pf(e.document);
      }
      return t;
    }
    function Nh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function rs(e, t, a) {
      var i = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      Ng || Ld == null || Ld !== pf(i) || (i = Ld, "selectionStart" in i && Nh(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
        anchorNode: i.anchorNode,
        anchorOffset: i.anchorOffset,
        focusNode: i.focusNode,
        focusOffset: i.focusOffset
      }), Nm && Df(Nm, i) || (Nm = i, i = Vl(xg, "onSelect"), 0 < i.length && (t = new dt(
        "onSelect",
        "select",
        null,
        t,
        a
      ), e.push({ event: t, listeners: i }), t.target = Ld)));
    }
    function Wi(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    function Fi(e) {
      if (qg[e]) return qg[e];
      if (!Vd[e]) return e;
      var t = Vd[e], a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in G0)
          return qg[e] = t[a];
      return e;
    }
    function cn(e, t) {
      Z0.set(e, t), P(t, [e]);
    }
    function la(e, t) {
      if (typeof e == "object" && e !== null) {
        var a = Yg.get(e);
        return a !== void 0 ? a : (t = {
          value: e,
          source: t,
          stack: pp(t)
        }, Yg.set(e, t), t);
      }
      return {
        value: e,
        source: t,
        stack: pp(t)
      };
    }
    function ss() {
      for (var e = Xd, t = jg = Xd = 0; t < e; ) {
        var a = Pn[t];
        Pn[t++] = null;
        var i = Pn[t];
        Pn[t++] = null;
        var o = Pn[t];
        Pn[t++] = null;
        var f = Pn[t];
        if (Pn[t++] = null, i !== null && o !== null) {
          var d = i.pending;
          d === null ? o.next = o : (o.next = d.next, d.next = o), i.pending = o;
        }
        f !== 0 && Mp(a, o, f);
      }
    }
    function ds(e, t, a, i) {
      Pn[Xd++] = e, Pn[Xd++] = t, Pn[Xd++] = a, Pn[Xd++] = i, jg |= i, e.lanes |= i, e = e.alternate, e !== null && (e.lanes |= i);
    }
    function qh(e, t, a, i) {
      return ds(e, t, a, i), hs(e);
    }
    function aa(e, t) {
      return ds(e, null, null, t), hs(e);
    }
    function Mp(e, t, a) {
      e.lanes |= a;
      var i = e.alternate;
      i !== null && (i.lanes |= a);
      for (var o = !1, f = e.return; f !== null; )
        f.childLanes |= a, i = f.alternate, i !== null && (i.childLanes |= a), f.tag === 22 && (e = f.stateNode, e === null || e._visibility & wg || (o = !0)), e = f, f = f.return;
      return e.tag === 3 ? (f = e.stateNode, o && t !== null && (o = 31 - bl(a), e = f.hiddenUpdates, i = e[o], i === null ? e[o] = [t] : i.push(t), t.lane = a | 536870912), f) : null;
    }
    function hs(e) {
      if (lp > jb)
        throw Zr = lp = 0, ap = m0 = null, Error(
          "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
        );
      Zr > Gb && (Zr = 0, ap = null, console.error(
        "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
      )), e.alternate === null && (e.flags & 4098) !== 0 && Xy(e);
      for (var t = e, a = t.return; a !== null; )
        t.alternate === null && (t.flags & 4098) !== 0 && Xy(e), t = a, a = t.return;
      return t.tag === 3 ? t.stateNode : null;
    }
    function Ii(e) {
      if (eu === null) return e;
      var t = eu(e);
      return t === void 0 ? e : t.current;
    }
    function Bh(e) {
      if (eu === null) return e;
      var t = eu(e);
      return t === void 0 ? e != null && typeof e.render == "function" && (t = Ii(e.render), e.render !== t) ? (t = { $$typeof: _i, render: t }, e.displayName !== void 0 && (t.displayName = e.displayName), t) : e : t.current;
    }
    function Up(e, t) {
      if (eu === null) return !1;
      var a = e.elementType;
      t = t.type;
      var i = !1, o = typeof t == "object" && t !== null ? t.$$typeof : null;
      switch (e.tag) {
        case 1:
          typeof t == "function" && (i = !0);
          break;
        case 0:
          (typeof t == "function" || o === xa) && (i = !0);
          break;
        case 11:
          (o === _i || o === xa) && (i = !0);
          break;
        case 14:
        case 15:
          (o === Od || o === xa) && (i = !0);
          break;
        default:
          return !1;
      }
      return !!(i && (e = eu(a), e !== void 0 && e === eu(t)));
    }
    function ys(e) {
      eu !== null && typeof WeakSet == "function" && (Qd === null && (Qd = /* @__PURE__ */ new WeakSet()), Qd.add(e));
    }
    function Pi(e, t, a) {
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
      if (eu === null)
        throw Error("Expected resolveFamily to be set during hot reload.");
      var g = !1;
      h = !1, v !== null && (v = eu(v), v !== void 0 && (a.has(v) ? h = !0 : t.has(v) && (d === 1 ? h = !0 : g = !0))), Qd !== null && (Qd.has(e) || i !== null && Qd.has(i)) && (h = !0), h && (e._debugNeedsRemount = !0), (h || g) && (i = aa(e, 2), i !== null && $e(i, e, 2)), o === null || h || Pi(
        o,
        t,
        a
      ), f !== null && Pi(
        f,
        t,
        a
      );
    }
    function vg(e, t, a, i) {
      this.tag = e, this.key = a, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null, this.actualDuration = -0, this.actualStartTime = -1.1, this.treeBaseDuration = this.selfBaseDuration = -0, this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, J0 || typeof Object.preventExtensions != "function" || Object.preventExtensions(this);
    }
    function ms(e) {
      return e = e.prototype, !(!e || !e.isReactComponent);
    }
    function wn(e, t) {
      var a = e.alternate;
      switch (a === null ? (a = C(
        e.tag,
        t,
        e.key,
        e.mode
      ), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugOwner = e._debugOwner, a._debugStack = e._debugStack, a._debugTask = e._debugTask, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = 0, a.subtreeFlags = 0, a.deletions = null, a.actualDuration = -0, a.actualStartTime = -1.1), a.flags = e.flags & 65011712, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue, t = e.dependencies, a.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.refCleanup = e.refCleanup, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugInfo = e._debugInfo, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case 0:
        case 15:
          a.type = Ii(e.type);
          break;
        case 1:
          a.type = Ii(e.type);
          break;
        case 11:
          a.type = Bh(e.type);
      }
      return a;
    }
    function Yh(e, t) {
      e.flags &= 65011714;
      var a = e.alternate;
      return a === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0) : (e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type, t = a.dependencies, e.dependencies = t === null ? null : {
        lanes: t.lanes,
        firstContext: t.firstContext,
        _debugThenableState: t._debugThenableState
      }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration), e;
    }
    function ps(e, t, a, i, o, f) {
      var d = 0, h = e;
      if (typeof e == "function")
        ms(e) && (d = 1), h = Ii(h);
      else if (typeof e == "string")
        d = Y(), d = yd(e, a, d) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
      else
        e: switch (e) {
          case Dd:
            return t = C(31, a, t, o), t.elementType = Dd, t.lanes = f, t;
          case Ui:
            return Qa(
              a.children,
              o,
              f,
              t
            );
          case Rc:
            d = 8, o |= Ta, o |= Ju;
            break;
          case vr:
            return e = a, i = o, typeof e.id != "string" && console.error(
              'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
              typeof e.id
            ), t = C(12, e, t, i | Il), t.elementType = vr, t.lanes = f, t.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, t;
          case Ci:
            return t = C(13, a, t, o), t.elementType = Ci, t.lanes = f, t;
          case Rd:
            return t = C(19, a, t, o), t.elementType = Rd, t.lanes = f, t;
          default:
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case rv:
                case Sa:
                  d = 10;
                  break e;
                case gr:
                  d = 9;
                  break e;
                case _i:
                  d = 11, h = Bh(h);
                  break e;
                case Od:
                  d = 14;
                  break e;
                case xa:
                  d = 16, h = null;
                  break e;
              }
            h = "", (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (h += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), e === null ? a = "null" : hl(e) ? a = "array" : e !== void 0 && e.$$typeof === Gu ? (a = "<" + (ke(e.type) || "Unknown") + " />", h = " Did you accidentally export a JSX literal instead of a component?") : a = typeof e, (d = i ? Vt(i) : null) && (h += `

Check the render method of \`` + d + "`."), d = 29, a = Error(
              "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (a + "." + h)
            ), h = null;
        }
      return t = C(d, a, t, o), t.elementType = e, t.type = h, t.lanes = f, t._debugOwner = i, t;
    }
    function zf(e, t, a) {
      return t = ps(
        e.type,
        e.key,
        e.props,
        e._owner,
        t,
        a
      ), t._debugOwner = e._owner, t._debugStack = e._debugStack, t._debugTask = e._debugTask, t;
    }
    function Qa(e, t, a, i) {
      return e = C(7, e, i, t), e.lanes = a, e;
    }
    function wh(e, t, a) {
      return e = C(6, e, null, t), e.lanes = a, e;
    }
    function jh(e, t, a) {
      return t = C(
        4,
        e.children !== null ? e.children : [],
        e.key,
        t
      ), t.lanes = a, t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation
      }, t;
    }
    function ec(e, t) {
      on(), Zd[Kd++] = Ov, Zd[Kd++] = Rv, Rv = e, Ov = t;
    }
    function Gh(e, t, a) {
      on(), tu[lu++] = Mc, tu[lu++] = Uc, tu[lu++] = xr, xr = e;
      var i = Mc;
      e = Uc;
      var o = 32 - bl(i) - 1;
      i &= ~(1 << o), a += 1;
      var f = 32 - bl(t) + o;
      if (30 < f) {
        var d = o - o % 5;
        f = (i & (1 << d) - 1).toString(32), i >>= d, o -= d, Mc = 1 << 32 - bl(t) + o | a << o | i, Uc = f + e;
      } else
        Mc = 1 << f | a << o | i, Uc = e;
    }
    function vs(e) {
      on(), e.return !== null && (ec(e, 1), Gh(e, 1, 0));
    }
    function tc(e) {
      for (; e === Rv; )
        Rv = Zd[--Kd], Zd[Kd] = null, Ov = Zd[--Kd], Zd[Kd] = null;
      for (; e === xr; )
        xr = tu[--lu], tu[lu] = null, Uc = tu[--lu], tu[lu] = null, Mc = tu[--lu], tu[lu] = null;
    }
    function on() {
      ft || console.error(
        "Expected to be hydrating. This is a bug in React. Please file an issue."
      );
    }
    function lc(e, t) {
      if (e.return === null) {
        if (au === null)
          au = {
            fiber: e,
            children: [],
            serverProps: void 0,
            serverTail: [],
            distanceFromLeaf: t
          };
        else {
          if (au.fiber !== e)
            throw Error(
              "Saw multiple hydration diff roots in a pass. This is a bug in React."
            );
          au.distanceFromLeaf > t && (au.distanceFromLeaf = t);
        }
        return au;
      }
      var a = lc(
        e.return,
        t + 1
      ).children;
      return 0 < a.length && a[a.length - 1].fiber === e ? (a = a[a.length - 1], a.distanceFromLeaf > t && (a.distanceFromLeaf = t), a) : (t = {
        fiber: e,
        children: [],
        serverProps: void 0,
        serverTail: [],
        distanceFromLeaf: t
      }, a.push(t), t);
    }
    function Wc(e, t) {
      _c || (e = lc(e, 0), e.serverProps = null, t !== null && (t = fd(t), e.serverTail.push(t)));
    }
    function ai(e) {
      var t = "", a = au;
      throw a !== null && (au = null, t = ti(a)), Ic(
        la(
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
      ), Gg;
    }
    function Lh(e) {
      var t = e.stateNode, a = e.type, i = e.memoizedProps;
      switch (t[Xl] = e, t[ba] = i, Nu(a, i), a) {
        case "dialog":
          We("cancel", t), We("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          We("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < np.length; a++)
            We(np[a], t);
          break;
        case "source":
          We("error", t);
          break;
        case "img":
        case "image":
        case "link":
          We("error", t), We("load", t);
          break;
        case "details":
          We("toggle", t);
          break;
        case "input":
          re("input", i), We("invalid", t), Qi(t, i), Eh(
            t,
            i.value,
            i.defaultValue,
            i.checked,
            i.defaultChecked,
            i.type,
            i.name,
            !0
          ), Pt(t);
          break;
        case "option":
          gp(t, i);
          break;
        case "select":
          re("select", i), We("invalid", t), Yn(t, i);
          break;
        case "textarea":
          re("textarea", i), We("invalid", t), ts(t, i), Zi(
            t,
            i.value,
            i.defaultValue,
            i.children
          ), Pt(t);
      }
      a = i.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" || t.textContent === "" + a || i.suppressHydrationWarning === !0 || Tc(t.textContent, a) ? (i.popover != null && (We("beforetoggle", t), We("toggle", t)), i.onScroll != null && We("scroll", t), i.onScrollEnd != null && We("scrollend", t), i.onClick != null && (t.onclick = bi), t = !0) : t = !1, t || ai(e);
    }
    function gs(e) {
      for (Ba = e.return; Ba; )
        switch (Ba.tag) {
          case 5:
          case 13:
            Bi = !1;
            return;
          case 27:
          case 3:
            Bi = !0;
            return;
          default:
            Ba = Ba.return;
        }
    }
    function ac(e) {
      if (e !== Ba) return !1;
      if (!ft)
        return gs(e), ft = !0, !1;
      var t = e.tag, a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = e.type, a = !(a !== "form" && a !== "button") || Ei(e.type, e.memoizedProps)), a = !a), a && cl) {
        for (a = cl; a; ) {
          var i = lc(e, 0), o = fd(a);
          i.serverTail.push(o), a = o.type === "Suspense" ? qo(a) : va(a.nextSibling);
        }
        ai(e);
      }
      if (gs(e), t === 13) {
        if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e)
          throw Error(
            "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
          );
        cl = qo(e);
      } else
        t === 27 ? (t = cl, dl(e.type) ? (e = z0, z0 = null, cl = e) : cl = t) : cl = Ba ? va(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Fc() {
      cl = Ba = null, _c = ft = !1;
    }
    function Vh() {
      var e = Nr;
      return e !== null && (ja === null ? ja = e : ja.push.apply(
        ja,
        e
      ), Nr = null), e;
    }
    function Ic(e) {
      Nr === null ? Nr = [e] : Nr.push(e);
    }
    function _p() {
      var e = au;
      if (e !== null) {
        au = null;
        for (var t = ti(e); 0 < e.children.length; )
          e = e.children[0];
        me(e.fiber, function() {
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
    function Ss() {
      Jd = Dv = null, kd = !1;
    }
    function ni(e, t, a) {
      Qe(Lg, t._currentValue, e), t._currentValue = a, Qe(Vg, t._currentRenderer, e), t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== F0 && console.error(
        "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
      ), t._currentRenderer = F0;
    }
    function gu(e, t) {
      e._currentValue = Lg.current;
      var a = Vg.current;
      ye(Vg, t), e._currentRenderer = a, ye(Lg, t);
    }
    function Xh(e, t, a) {
      for (; e !== null; ) {
        var i = e.alternate;
        if ((e.childLanes & t) !== t ? (e.childLanes |= t, i !== null && (i.childLanes |= t)) : i !== null && (i.childLanes & t) !== t && (i.childLanes |= t), e === a) break;
        e = e.return;
      }
      e !== a && console.error(
        "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function kl(e, t, a, i) {
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
                f.lanes |= a, h = f.alternate, h !== null && (h.lanes |= a), Xh(
                  f.return,
                  a,
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
          d.lanes |= a, f = d.alternate, f !== null && (f.lanes |= a), Xh(
            d,
            a,
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
    function Su(e, t, a, i) {
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
            qa(o.pendingProps.value, d.value) || (e !== null ? e.push(h) : e = [h]);
          }
        } else if (o === zd.current) {
          if (d = o.alternate, d === null)
            throw Error("Should have a current fiber. This is a bug in React.");
          d.memoizedState.memoizedState !== o.memoizedState.memoizedState && (e !== null ? e.push(op) : e = [op]);
        }
        o = o.return;
      }
      e !== null && kl(
        t,
        e,
        a,
        i
      ), t.flags |= 262144;
    }
    function Mf(e) {
      for (e = e.firstContext; e !== null; ) {
        if (!qa(
          e.context._currentValue,
          e.memoizedValue
        ))
          return !0;
        e = e.next;
      }
      return !1;
    }
    function ui(e) {
      Dv = e, Jd = null, e = e.dependencies, e !== null && (e.firstContext = null);
    }
    function qt(e) {
      return kd && console.error(
        "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
      ), bs(Dv, e);
    }
    function Uf(e, t) {
      return Dv === null && ui(e), bs(e, t);
    }
    function bs(e, t) {
      var a = t._currentValue;
      if (t = { context: t, memoizedValue: a, next: null }, Jd === null) {
        if (e === null)
          throw Error(
            "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
          );
        Jd = t, e.dependencies = {
          lanes: 0,
          firstContext: t,
          _debugThenableState: null
        }, e.flags |= 524288;
      } else Jd = Jd.next = t;
      return a;
    }
    function Qh() {
      return {
        controller: new Rb(),
        data: /* @__PURE__ */ new Map(),
        refCount: 0
      };
    }
    function Za(e) {
      e.controller.signal.aborted && console.warn(
        "A cache instance was retained after it was already freed. This likely indicates a bug in React."
      ), e.refCount++;
    }
    function nc(e) {
      e.refCount--, 0 > e.refCount && console.warn(
        "A cache instance was released after it was already freed. This likely indicates a bug in React."
      ), e.refCount === 0 && Ob(Db, function() {
        e.controller.abort();
      });
    }
    function Oa() {
      var e = qr;
      return qr = 0, e;
    }
    function Pc(e) {
      var t = qr;
      return qr = e, t;
    }
    function eo(e) {
      var t = qr;
      return qr += e, t;
    }
    function bu(e) {
      tn = $d(), 0 > e.actualStartTime && (e.actualStartTime = tn);
    }
    function ii(e) {
      if (0 <= tn) {
        var t = $d() - tn;
        e.actualDuration += t, e.selfBaseDuration = t, tn = -1;
      }
    }
    function Ts(e) {
      if (0 <= tn) {
        var t = $d() - tn;
        e.actualDuration += t, tn = -1;
      }
    }
    function fn() {
      if (0 <= tn) {
        var e = $d() - tn;
        tn = -1, qr += e;
      }
    }
    function Gl() {
      tn = $d();
    }
    function _f(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Cp(e, t) {
      if (qm === null) {
        var a = qm = [];
        Xg = 0, Br = ud(), Wd = {
          status: "pending",
          value: void 0,
          then: function(i) {
            a.push(i);
          }
        };
      }
      return Xg++, t.then(Zh, Zh), t;
    }
    function Zh() {
      if (--Xg === 0 && qm !== null) {
        Wd !== null && (Wd.status = "fulfilled");
        var e = qm;
        qm = null, Br = 0, Wd = null;
        for (var t = 0; t < e.length; t++) (0, e[t])();
      }
    }
    function gg(e, t) {
      var a = [], i = {
        status: "pending",
        value: null,
        reason: null,
        then: function(o) {
          a.push(o);
        }
      };
      return e.then(
        function() {
          i.status = "fulfilled", i.value = t;
          for (var o = 0; o < a.length; o++) (0, a[o])(t);
        },
        function(o) {
          for (i.status = "rejected", i.reason = o, o = 0; o < a.length; o++)
            (0, a[o])(void 0);
        }
      ), i;
    }
    function Kh() {
      var e = Yr.current;
      return e !== null ? e : jt.pooledCache;
    }
    function Es(e, t) {
      t === null ? Qe(Yr, Yr.current, e) : Qe(Yr, t.pool, e);
    }
    function Jh() {
      var e = Kh();
      return e === null ? null : { parent: Nl._currentValue, pool: e };
    }
    function kh() {
      return { didWarnAboutUncachedPromise: !1, thenables: [] };
    }
    function As(e) {
      return e = e.status, e === "fulfilled" || e === "rejected";
    }
    function na() {
    }
    function $h(e, t, a) {
      q.actQueue !== null && (q.didUsePromise = !0);
      var i = e.thenables;
      switch (a = i[a], a === void 0 ? i.push(t) : a !== t && (e.didWarnAboutUncachedPromise || (e.didWarnAboutUncachedPromise = !0, console.error(
        "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
      )), t.then(na, na), t = a), t.status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw e = t.reason, za(e), e;
        default:
          if (typeof t.status == "string")
            t.then(na, na);
          else {
            if (e = jt, e !== null && 100 < e.shellSuspendCounter)
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
              throw e = t.reason, za(e), e;
          }
          throw Xm = t, Hv = !0, Vm;
      }
    }
    function Da() {
      if (Xm === null)
        throw Error(
          "Expected a suspended thenable. This is a bug in React. Please file an issue."
        );
      var e = Xm;
      return Xm = null, Hv = !1, e;
    }
    function za(e) {
      if (e === Vm || e === Cv)
        throw Error(
          "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
        );
    }
    function ci(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: { pending: null, lanes: 0, hiddenCallbacks: null },
        callbacks: null
      };
    }
    function Cf(e, t) {
      e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        callbacks: null
      });
    }
    function rn(e) {
      return {
        lane: e,
        tag: lS,
        payload: null,
        callback: null,
        next: null
      };
    }
    function sn(e, t, a) {
      var i = e.updateQueue;
      if (i === null) return null;
      if (i = i.shared, Kg === i && !uS) {
        var o = pe(e);
        console.error(
          `An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.

Please update the following component: %s`,
          o
        ), uS = !0;
      }
      return (bt & wa) !== Cn ? (o = i.pending, o === null ? t.next = t : (t.next = o.next, o.next = t), i.pending = t, t = hs(e), Mp(e, null, a), t) : (ds(e, i, t, a), hs(e));
    }
    function uc(e, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Yl(e, a);
      }
    }
    function Tu(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null && (i = i.updateQueue, a === i)) {
        var o = null, f = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var d = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            f === null ? o = f = d : f = f.next = d, a = a.next;
          } while (a !== null);
          f === null ? o = f = t : f = f.next = t;
        } else o = f = t;
        a = {
          baseState: i.baseState,
          firstBaseUpdate: o,
          lastBaseUpdate: f,
          shared: i.shared,
          callbacks: i.callbacks
        }, e.updateQueue = a;
        return;
      }
      e = a.lastBaseUpdate, e === null ? a.firstBaseUpdate = t : e.next = t, a.lastBaseUpdate = t;
    }
    function to() {
      if (Jg) {
        var e = Wd;
        if (e !== null) throw e;
      }
    }
    function oi(e, t, a, i) {
      Jg = !1;
      var o = e.updateQueue;
      Fo = !1, Kg = o.shared;
      var f = o.firstBaseUpdate, d = o.lastBaseUpdate, h = o.shared.pending;
      if (h !== null) {
        o.shared.pending = null;
        var v = h, g = v.next;
        v.next = null, d === null ? f = g : d.next = g, d = v;
        var B = e.alternate;
        B !== null && (B = B.updateQueue, h = B.lastBaseUpdate, h !== d && (h === null ? B.firstBaseUpdate = g : h.next = g, B.lastBaseUpdate = v));
      }
      if (f !== null) {
        var G = o.baseState;
        d = 0, B = g = v = null, h = f;
        do {
          var x = h.lane & -536870913, V = x !== h.lane;
          if (V ? (tt & x) === x : (i & x) === x) {
            x !== 0 && x === Br && (Jg = !0), B !== null && (B = B.next = {
              lane: 0,
              tag: h.tag,
              payload: h.payload,
              callback: null,
              next: null
            });
            e: {
              x = e;
              var se = h, De = t, Gt = a;
              switch (se.tag) {
                case aS:
                  if (se = se.payload, typeof se == "function") {
                    kd = !0;
                    var at = se.call(
                      Gt,
                      G,
                      De
                    );
                    if (x.mode & Ta) {
                      _e(!0);
                      try {
                        se.call(Gt, G, De);
                      } finally {
                        _e(!1);
                      }
                    }
                    kd = !1, G = at;
                    break e;
                  }
                  G = se;
                  break e;
                case Zg:
                  x.flags = x.flags & -65537 | 128;
                case lS:
                  if (at = se.payload, typeof at == "function") {
                    if (kd = !0, se = at.call(
                      Gt,
                      G,
                      De
                    ), x.mode & Ta) {
                      _e(!0);
                      try {
                        at.call(Gt, G, De);
                      } finally {
                        _e(!1);
                      }
                    }
                    kd = !1;
                  } else se = at;
                  if (se == null) break e;
                  G = Me({}, G, se);
                  break e;
                case nS:
                  Fo = !0;
              }
            }
            x = h.callback, x !== null && (e.flags |= 64, V && (e.flags |= 8192), V = o.callbacks, V === null ? o.callbacks = [x] : V.push(x));
          } else
            V = {
              lane: x,
              tag: h.tag,
              payload: h.payload,
              callback: h.callback,
              next: null
            }, B === null ? (g = B = V, v = G) : B = B.next = V, d |= x;
          if (h = h.next, h === null) {
            if (h = o.shared.pending, h === null)
              break;
            V = h, h = V.next, V.next = null, o.lastBaseUpdate = V, o.shared.pending = null;
          }
        } while (!0);
        B === null && (v = G), o.baseState = v, o.firstBaseUpdate = g, o.lastBaseUpdate = B, f === null && (o.shared.lanes = 0), tf |= d, e.lanes = d, e.memoizedState = G;
      }
      Kg = null;
    }
    function ic(e, t) {
      if (typeof e != "function")
        throw Error(
          "Invalid argument passed as callback. Expected a function. Instead received: " + e
        );
      e.call(t);
    }
    function Sg(e, t) {
      var a = e.shared.hiddenCallbacks;
      if (a !== null)
        for (e.shared.hiddenCallbacks = null, e = 0; e < a.length; e++)
          ic(a[e], t);
    }
    function ua(e, t) {
      var a = e.callbacks;
      if (a !== null)
        for (e.callbacks = null, e = 0; e < a.length; e++)
          ic(a[e], t);
    }
    function Rs(e, t) {
      var a = ji;
      Qe(xv, a, e), Qe(Fd, t, e), ji = a | t.baseLanes;
    }
    function dn(e) {
      Qe(xv, ji, e), Qe(
        Fd,
        Fd.current,
        e
      );
    }
    function Os(e) {
      ji = xv.current, ye(Fd, e), ye(xv, e);
    }
    function we() {
      var e = j;
      iu === null ? iu = [e] : iu.push(e);
    }
    function F() {
      var e = j;
      if (iu !== null && (Hc++, iu[Hc] !== e)) {
        var t = pe(Ue);
        if (!iS.has(t) && (iS.add(t), iu !== null)) {
          for (var a = "", i = 0; i <= Hc; i++) {
            var o = iu[i], f = i === Hc ? e : o;
            for (o = i + 1 + ". " + o; 30 > o.length; )
              o += " ";
            o += f + `
`, a += o;
          }
          console.error(
            `React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`,
            t,
            a
          );
        }
      }
    }
    function fi(e) {
      e == null || hl(e) || console.error(
        "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
        j,
        typeof e
      );
    }
    function lo() {
      var e = pe(Ue);
      oS.has(e) || (oS.add(e), console.error(
        "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
        e
      ));
    }
    function Ht() {
      throw Error(
        `Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`
      );
    }
    function ri(e, t) {
      if (Zm) return !1;
      if (t === null)
        return console.error(
          "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
          j
        ), !1;
      e.length !== t.length && console.error(
        `The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`,
        j,
        "[" + t.join(", ") + "]",
        "[" + e.join(", ") + "]"
      );
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!qa(e[a], t[a])) return !1;
      return !0;
    }
    function ao(e, t, a, i, o, f) {
      Io = f, Ue = t, iu = e !== null ? e._debugHookTypes : null, Hc = -1, Zm = e !== null && e.type !== t.type, (Object.prototype.toString.call(a) === "[object AsyncFunction]" || Object.prototype.toString.call(a) === "[object AsyncGeneratorFunction]") && (f = pe(Ue), kg.has(f) || (kg.add(f), console.error(
        "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
        f === null ? "An unknown Component" : "<" + f + ">"
      ))), t.memoizedState = null, t.updateQueue = null, t.lanes = 0, q.H = e !== null && e.memoizedState !== null ? Wg : iu !== null ? fS : $g, jr = f = (t.mode & Ta) !== Qt;
      var d = Fg(a, i, o);
      if (jr = !1, Pd && (d = ia(
        t,
        a,
        i,
        o
      )), f) {
        _e(!0);
        try {
          d = ia(
            t,
            a,
            i,
            o
          );
        } finally {
          _e(!1);
        }
      }
      return Hf(e, t), d;
    }
    function Hf(e, t) {
      t._debugHookTypes = iu, t.dependencies === null ? Cc !== null && (t.dependencies = {
        lanes: 0,
        firstContext: null,
        _debugThenableState: Cc
      }) : t.dependencies._debugThenableState = Cc, q.H = Bv;
      var a = xt !== null && xt.next !== null;
      if (Io = 0, iu = j = Al = xt = Ue = null, Hc = -1, e !== null && (e.flags & 65011712) !== (t.flags & 65011712) && console.error(
        "Internal React error: Expected static flag was missing. Please notify the React team."
      ), Nv = !1, Qm = 0, Cc = null, a)
        throw Error(
          "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
        );
      e === null || Ql || (e = e.dependencies, e !== null && Mf(e) && (Ql = !0)), Hv ? (Hv = !1, e = !0) : e = !1, e && (t = pe(t) || "Unknown", cS.has(t) || kg.has(t) || (cS.add(t), console.error(
        "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
      )));
    }
    function ia(e, t, a, i) {
      Ue = e;
      var o = 0;
      do {
        if (Pd && (Cc = null), Qm = 0, Pd = !1, o >= Mb)
          throw Error(
            "Too many re-renders. React limits the number of renders to prevent an infinite loop."
          );
        if (o += 1, Zm = !1, Al = xt = null, e.updateQueue != null) {
          var f = e.updateQueue;
          f.lastEffect = null, f.events = null, f.stores = null, f.memoCache != null && (f.memoCache.index = 0);
        }
        Hc = -1, q.H = rS, f = Fg(t, a, i);
      } while (Pd);
      return f;
    }
    function Ka() {
      var e = q.H, t = e.useState()[0];
      return t = typeof t.then == "function" ? cc(t) : t, e = e.useState()[0], (xt !== null ? xt.memoizedState : null) !== e && (Ue.flags |= 1024), t;
    }
    function Eu() {
      var e = qv !== 0;
      return qv = 0, e;
    }
    function hn(e, t, a) {
      t.updateQueue = e.updateQueue, t.flags = (t.mode & Ju) !== Qt ? t.flags & -402655237 : t.flags & -2053, e.lanes &= ~a;
    }
    function yn(e) {
      if (Nv) {
        for (e = e.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Nv = !1;
      }
      Io = 0, iu = Al = xt = Ue = null, Hc = -1, j = null, Pd = !1, Qm = qv = 0, Cc = null;
    }
    function al() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Al === null ? Ue.memoizedState = Al = e : Al = Al.next = e, Al;
    }
    function pt() {
      if (xt === null) {
        var e = Ue.alternate;
        e = e !== null ? e.memoizedState : null;
      } else e = xt.next;
      var t = Al === null ? Ue.memoizedState : Al.next;
      if (t !== null)
        Al = t, xt = e;
      else {
        if (e === null)
          throw Ue.alternate === null ? Error(
            "Update hook called on initial render. This is likely a bug in React. Please file an issue."
          ) : Error("Rendered more hooks than during the previous render.");
        xt = e, e = {
          memoizedState: xt.memoizedState,
          baseState: xt.baseState,
          baseQueue: xt.baseQueue,
          queue: xt.queue,
          next: null
        }, Al === null ? Ue.memoizedState = Al = e : Al = Al.next = e;
      }
      return Al;
    }
    function xf() {
      return { lastEffect: null, events: null, stores: null, memoCache: null };
    }
    function cc(e) {
      var t = Qm;
      return Qm += 1, Cc === null && (Cc = kh()), e = $h(Cc, e, t), t = Ue, (Al === null ? t.memoizedState : Al.next) === null && (t = t.alternate, q.H = t !== null && t.memoizedState !== null ? Wg : $g), e;
    }
    function kt(e) {
      if (e !== null && typeof e == "object") {
        if (typeof e.then == "function") return cc(e);
        if (e.$$typeof === Sa) return qt(e);
      }
      throw Error("An unsupported type was passed to use(): " + String(e));
    }
    function Et(e) {
      var t = null, a = Ue.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var i = Ue.alternate;
        i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (t = {
          data: i.data.map(function(o) {
            return o.slice();
          }),
          index: 0
        })));
      }
      if (t == null && (t = { data: [], index: 0 }), a === null && (a = xf(), Ue.updateQueue = a), a.memoCache = t, a = t.data[t.index], a === void 0 || Zm)
        for (a = t.data[t.index] = Array(e), i = 0; i < e; i++)
          a[i] = sv;
      else
        a.length !== e && console.error(
          "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
          a.length,
          e
        );
      return t.index++, a;
    }
    function je(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function Au(e, t, a) {
      var i = al();
      if (a !== void 0) {
        var o = a(t);
        if (jr) {
          _e(!0);
          try {
            a(t);
          } finally {
            _e(!1);
          }
        }
      } else o = t;
      return i.memoizedState = i.baseState = o, e = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      }, i.queue = e, e = e.dispatch = Xf.bind(
        null,
        Ue,
        e
      ), [i.memoizedState, e];
    }
    function $l(e) {
      var t = pt();
      return Nf(t, xt, e);
    }
    function Nf(e, t, a) {
      var i = e.queue;
      if (i === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      i.lastRenderedReducer = a;
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
        var h = d = null, v = null, g = t, B = !1;
        do {
          var G = g.lane & -536870913;
          if (G !== g.lane ? (tt & G) === G : (Io & G) === G) {
            var x = g.revertLane;
            if (x === 0)
              v !== null && (v = v.next = {
                lane: 0,
                revertLane: 0,
                action: g.action,
                hasEagerState: g.hasEagerState,
                eagerState: g.eagerState,
                next: null
              }), G === Br && (B = !0);
            else if ((Io & x) === x) {
              g = g.next, x === Br && (B = !0);
              continue;
            } else
              G = {
                lane: 0,
                revertLane: g.revertLane,
                action: g.action,
                hasEagerState: g.hasEagerState,
                eagerState: g.eagerState,
                next: null
              }, v === null ? (h = v = G, d = f) : v = v.next = G, Ue.lanes |= x, tf |= x;
            G = g.action, jr && a(f, G), f = g.hasEagerState ? g.eagerState : a(f, G);
          } else
            x = {
              lane: G,
              revertLane: g.revertLane,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null
            }, v === null ? (h = v = x, d = f) : v = v.next = x, Ue.lanes |= G, tf |= G;
          g = g.next;
        } while (g !== null && g !== t);
        if (v === null ? d = f : v.next = h, !qa(f, e.memoizedState) && (Ql = !0, B && (a = Wd, a !== null)))
          throw a;
        e.memoizedState = f, e.baseState = d, e.baseQueue = v, i.lastRenderedState = f;
      }
      return o === null && (i.lanes = 0), [e.memoizedState, i.dispatch];
    }
    function mn(e) {
      var t = pt(), a = t.queue;
      if (a === null)
        throw Error(
          "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
        );
      a.lastRenderedReducer = e;
      var i = a.dispatch, o = a.pending, f = t.memoizedState;
      if (o !== null) {
        a.pending = null;
        var d = o = o.next;
        do
          f = e(f, d.action), d = d.next;
        while (d !== o);
        qa(f, t.memoizedState) || (Ql = !0), t.memoizedState = f, t.baseQueue === null && (t.baseState = f), a.lastRenderedState = f;
      }
      return [f, i];
    }
    function Ds(e, t, a) {
      var i = Ue, o = al();
      if (ft) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        var f = a();
        Id || f === a() || (console.error(
          "The result of getServerSnapshot should be cached to avoid an infinite loop"
        ), Id = !0);
      } else {
        if (f = t(), Id || (a = t(), qa(f, a) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Id = !0)), jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        (tt & 124) !== 0 || no(i, t, f);
      }
      return o.memoizedState = f, a = { value: f, getSnapshot: t }, o.queue = a, wf(
        Wh.bind(null, i, a, e),
        [e]
      ), i.flags |= 2048, Ln(
        uu | ql,
        fo(),
        uo.bind(
          null,
          i,
          a,
          f,
          t
        ),
        null
      ), f;
    }
    function qf(e, t, a) {
      var i = Ue, o = pt(), f = ft;
      if (f) {
        if (a === void 0)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        a = a();
      } else if (a = t(), !Id) {
        var d = t();
        qa(a, d) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), Id = !0);
      }
      (d = !qa(
        (xt || o).memoizedState,
        a
      )) && (o.memoizedState = a, Ql = !0), o = o.queue;
      var h = Wh.bind(null, i, o, e);
      if (ca(2048, ql, h, [e]), o.getSnapshot !== t || d || Al !== null && Al.memoizedState.tag & uu) {
        if (i.flags |= 2048, Ln(
          uu | ql,
          fo(),
          uo.bind(
            null,
            i,
            o,
            a,
            t
          ),
          null
        ), jt === null)
          throw Error(
            "Expected a work-in-progress root. This is a bug in React. Please file an issue."
          );
        f || (Io & 124) !== 0 || no(i, t, a);
      }
      return a;
    }
    function no(e, t, a) {
      e.flags |= 16384, e = { getSnapshot: t, value: a }, t = Ue.updateQueue, t === null ? (t = xf(), Ue.updateQueue = t, t.stores = [e]) : (a = t.stores, a === null ? t.stores = [e] : a.push(e));
    }
    function uo(e, t, a, i) {
      t.value = a, t.getSnapshot = i, io(t) && zs(e);
    }
    function Wh(e, t, a) {
      return a(function() {
        io(t) && zs(e);
      });
    }
    function io(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var a = t();
        return !qa(e, a);
      } catch {
        return !0;
      }
    }
    function zs(e) {
      var t = aa(e, 2);
      t !== null && $e(t, e, 2);
    }
    function Ru(e) {
      var t = al();
      if (typeof e == "function") {
        var a = e;
        if (e = a(), jr) {
          _e(!0);
          try {
            a();
          } finally {
            _e(!1);
          }
        }
      }
      return t.memoizedState = t.baseState = e, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: je,
        lastRenderedState: e
      }, t;
    }
    function pn(e) {
      e = Ru(e);
      var t = e.queue, a = po.bind(null, Ue, t);
      return t.dispatch = a, [e.memoizedState, a];
    }
    function jn(e) {
      var t = al();
      t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return t.queue = a, t = Ns.bind(
        null,
        Ue,
        !0,
        a
      ), a.dispatch = t, [e, t];
    }
    function Gn(e, t) {
      var a = pt();
      return Ms(a, xt, e, t);
    }
    function Ms(e, t, a, i) {
      return e.baseState = a, Nf(
        e,
        xt,
        typeof i == "function" ? i : je
      );
    }
    function Us(e, t) {
      var a = pt();
      return xt !== null ? Ms(a, xt, e, t) : (a.baseState = e, [e, a.queue.dispatch]);
    }
    function Bf(e, t, a, i, o) {
      if (Mu(e))
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
        q.T !== null ? a(!0) : f.isTransition = !1, i(f), a = t.pending, a === null ? (f.next = t.pending = f, Yf(t, f)) : (f.next = a.next, t.pending = a.next = f);
      }
    }
    function Yf(e, t) {
      var a = t.action, i = t.payload, o = e.state;
      if (t.isTransition) {
        var f = q.T, d = {};
        q.T = d, q.T._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var h = a(o, i), v = q.S;
          v !== null && v(d, h), si(e, t, h);
        } catch (g) {
          co(e, t, g);
        } finally {
          q.T = f, f === null && d._updatedFibers && (e = d._updatedFibers.size, d._updatedFibers.clear(), 10 < e && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      } else
        try {
          d = a(o, i), si(e, t, d);
        } catch (g) {
          co(e, t, g);
        }
    }
    function si(e, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? (a.then(
        function(i) {
          Ul(e, t, i);
        },
        function(i) {
          return co(e, t, i);
        }
      ), t.isTransition || console.error(
        "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
      )) : Ul(e, t, a);
    }
    function Ul(e, t, a) {
      t.status = "fulfilled", t.value = a, Fh(t), e.state = a, t = e.pending, t !== null && (a = t.next, a === t ? e.pending = null : (a = a.next, t.next = a, Yf(e, a)));
    }
    function co(e, t, a) {
      var i = e.pending;
      if (e.pending = null, i !== null) {
        i = i.next;
        do
          t.status = "rejected", t.reason = a, Fh(t), t = t.next;
        while (t !== i);
      }
      e.action = null;
    }
    function Fh(e) {
      e = e.listeners;
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
    function Hp(e, t) {
      return t;
    }
    function oo(e, t) {
      if (ft) {
        var a = jt.formState;
        if (a !== null) {
          e: {
            var i = Ue;
            if (ft) {
              if (cl) {
                t: {
                  for (var o = cl, f = Bi; o.nodeType !== 8; ) {
                    if (!f) {
                      o = null;
                      break t;
                    }
                    if (o = va(
                      o.nextSibling
                    ), o === null) {
                      o = null;
                      break t;
                    }
                  }
                  f = o.data, o = f === A0 || f === o1 ? o : null;
                }
                if (o) {
                  cl = va(
                    o.nextSibling
                  ), i = o.data === A0;
                  break e;
                }
              }
              ai(i);
            }
            i = !1;
          }
          i && (t = a[0]);
        }
      }
      return a = al(), a.memoizedState = a.baseState = t, i = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Hp,
        lastRenderedState: t
      }, a.queue = i, a = po.bind(
        null,
        Ue,
        i
      ), i.dispatch = a, i = Ru(!1), f = Ns.bind(
        null,
        Ue,
        !1,
        i.queue
      ), i = al(), o = {
        state: t,
        dispatch: null,
        action: e,
        pending: null
      }, i.queue = o, a = Bf.bind(
        null,
        Ue,
        o,
        f,
        a
      ), o.dispatch = a, i.memoizedState = e, [t, a, !1];
    }
    function _s(e) {
      var t = pt();
      return nl(t, xt, e);
    }
    function nl(e, t, a) {
      if (t = Nf(
        e,
        t,
        Hp
      )[0], e = $l(je)[0], typeof t == "object" && t !== null && typeof t.then == "function")
        try {
          var i = cc(t);
        } catch (d) {
          throw d === Vm ? Cv : d;
        }
      else i = t;
      t = pt();
      var o = t.queue, f = o.dispatch;
      return a !== t.memoizedState && (Ue.flags |= 2048, Ln(
        uu | ql,
        fo(),
        Ih.bind(null, o, a),
        null
      )), [i, f, e];
    }
    function Ih(e, t) {
      e.action = t;
    }
    function di(e) {
      var t = pt(), a = xt;
      if (a !== null)
        return nl(t, a, e);
      pt(), t = t.memoizedState, a = pt();
      var i = a.queue.dispatch;
      return a.memoizedState = e, [t, i, !1];
    }
    function Ln(e, t, a, i) {
      return e = {
        tag: e,
        create: a,
        deps: i,
        inst: t,
        next: null
      }, t = Ue.updateQueue, t === null && (t = xf(), Ue.updateQueue = t), a = t.lastEffect, a === null ? t.lastEffect = e.next = e : (i = a.next, a.next = e, e.next = i, t.lastEffect = e), e;
    }
    function fo() {
      return { destroy: void 0, resource: void 0 };
    }
    function hi(e) {
      var t = al();
      return e = { current: e }, t.memoizedState = e;
    }
    function Ja(e, t, a, i) {
      var o = al();
      i = i === void 0 ? null : i, Ue.flags |= e, o.memoizedState = Ln(
        uu | t,
        fo(),
        a,
        i
      );
    }
    function ca(e, t, a, i) {
      var o = pt();
      i = i === void 0 ? null : i;
      var f = o.memoizedState.inst;
      xt !== null && i !== null && ri(i, xt.memoizedState.deps) ? o.memoizedState = Ln(t, f, a, i) : (Ue.flags |= e, o.memoizedState = Ln(
        uu | t,
        f,
        a,
        i
      ));
    }
    function wf(e, t) {
      (Ue.mode & Ju) !== Qt && (Ue.mode & K0) === Qt ? Ja(276826112, ql, e, t) : Ja(8390656, ql, e, t);
    }
    function Ph(e, t) {
      var a = 4194308;
      return (Ue.mode & Ju) !== Qt && (a |= 134217728), Ja(a, Pl, e, t);
    }
    function ey(e, t) {
      if (typeof t == "function") {
        e = e();
        var a = t(e);
        return function() {
          typeof a == "function" ? a() : t(null);
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
    function Ou(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null;
      var i = 4194308;
      (Ue.mode & Ju) !== Qt && (i |= 134217728), Ja(
        i,
        Pl,
        ey.bind(null, t, e),
        a
      );
    }
    function ro(e, t, a) {
      typeof t != "function" && console.error(
        "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
        t !== null ? typeof t : "null"
      ), a = a != null ? a.concat([e]) : null, ca(
        4,
        Pl,
        ey.bind(null, t, e),
        a
      );
    }
    function so(e, t) {
      return al().memoizedState = [
        e,
        t === void 0 ? null : t
      ], e;
    }
    function jf(e, t) {
      var a = pt();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      return t !== null && ri(t, i[1]) ? i[0] : (a.memoizedState = [e, t], e);
    }
    function oc(e, t) {
      var a = al();
      t = t === void 0 ? null : t;
      var i = e();
      if (jr) {
        _e(!0);
        try {
          e();
        } finally {
          _e(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function Gf(e, t) {
      var a = pt();
      t = t === void 0 ? null : t;
      var i = a.memoizedState;
      if (t !== null && ri(t, i[1]))
        return i[0];
      if (i = e(), jr) {
        _e(!0);
        try {
          e();
        } finally {
          _e(!1);
        }
      }
      return a.memoizedState = [i, t], i;
    }
    function ho(e, t) {
      var a = al();
      return yo(a, e, t);
    }
    function Cs(e, t) {
      var a = pt();
      return ly(
        a,
        xt.memoizedState,
        e,
        t
      );
    }
    function ty(e, t) {
      var a = pt();
      return xt === null ? yo(a, e, t) : ly(
        a,
        xt.memoizedState,
        e,
        t
      );
    }
    function yo(e, t, a) {
      return a === void 0 || (Io & 1073741824) !== 0 ? e.memoizedState = t : (e.memoizedState = a, e = xy(), Ue.lanes |= e, tf |= e, a);
    }
    function ly(e, t, a, i) {
      return qa(a, t) ? a : Fd.current !== null ? (e = yo(e, a, i), qa(e, t) || (Ql = !0), e) : (Io & 42) === 0 ? (Ql = !0, e.memoizedState = a) : (e = xy(), Ue.lanes |= e, tf |= e, t);
    }
    function mo(e, t, a, i, o) {
      var f = st.p;
      st.p = f !== 0 && f < kn ? f : kn;
      var d = q.T, h = {};
      q.T = h, Ns(e, !1, t, a), h._updatedFibers = /* @__PURE__ */ new Set();
      try {
        var v = o(), g = q.S;
        if (g !== null && g(h, v), v !== null && typeof v == "object" && typeof v.then == "function") {
          var B = gg(
            v,
            i
          );
          vo(
            e,
            t,
            B,
            Ua(e)
          );
        } else
          vo(
            e,
            t,
            i,
            Ua(e)
          );
      } catch (G) {
        vo(
          e,
          t,
          { then: function() {
          }, status: "rejected", reason: G },
          Ua(e)
        );
      } finally {
        st.p = f, q.T = d, d === null && h._updatedFibers && (e = h._updatedFibers.size, h._updatedFibers.clear(), 10 < e && console.warn(
          "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
        ));
      }
    }
    function Hs(e, t, a, i) {
      if (e.tag !== 5)
        throw Error(
          "Expected the form instance to be a HostComponent. This is a bug in React."
        );
      var o = ay(e).queue;
      mo(
        e,
        o,
        t,
        Wr,
        a === null ? Ve : function() {
          return Du(e), a(i);
        }
      );
    }
    function ay(e) {
      var t = e.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: Wr,
        baseState: Wr,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: je,
          lastRenderedState: Wr
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: je,
          lastRenderedState: a
        },
        next: null
      }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
    }
    function Du(e) {
      q.T === null && console.error(
        "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
      );
      var t = ay(e).next.queue;
      vo(
        e,
        t,
        {},
        Ua(e)
      );
    }
    function Lf() {
      var e = Ru(!1);
      return e = mo.bind(
        null,
        Ue,
        e.queue,
        !0,
        !1
      ), al().memoizedState = e, [!1, e];
    }
    function xs() {
      var e = $l(je)[0], t = pt().memoizedState;
      return [
        typeof e == "boolean" ? e : cc(e),
        t
      ];
    }
    function zu() {
      var e = mn(je)[0], t = pt().memoizedState;
      return [
        typeof e == "boolean" ? e : cc(e),
        t
      ];
    }
    function oa() {
      return qt(op);
    }
    function fc() {
      var e = al(), t = jt.identifierPrefix;
      if (ft) {
        var a = Uc, i = Mc;
        a = (i & ~(1 << 32 - bl(i) - 1)).toString(32) + a, t = "«" + t + "R" + a, a = qv++, 0 < a && (t += "H" + a.toString(32)), t += "»";
      } else
        a = zb++, t = "«" + t + "r" + a.toString(32) + "»";
      return e.memoizedState = t;
    }
    function Vf() {
      return al().memoizedState = ny.bind(
        null,
        Ue
      );
    }
    function ny(e, t) {
      for (var a = e.return; a !== null; ) {
        switch (a.tag) {
          case 24:
          case 3:
            var i = Ua(a);
            e = rn(i);
            var o = sn(a, e, i);
            o !== null && ($e(o, a, i), uc(o, a, i)), a = Qh(), t != null && o !== null && console.error(
              "The seed argument is not enabled outside experimental channels."
            ), e.payload = { cache: a };
            return;
        }
        a = a.return;
      }
    }
    function Xf(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Ua(e);
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      Mu(e) ? Qf(t, o) : (o = qh(e, t, o, i), o !== null && ($e(o, e, i), uy(o, t, i))), Nn(e, i);
    }
    function po(e, t, a) {
      var i = arguments;
      typeof i[3] == "function" && console.error(
        "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
      ), i = Ua(e), vo(e, t, a, i), Nn(e, i);
    }
    function vo(e, t, a, i) {
      var o = {
        lane: i,
        revertLane: 0,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (Mu(e)) Qf(t, o);
      else {
        var f = e.alternate;
        if (e.lanes === 0 && (f === null || f.lanes === 0) && (f = t.lastRenderedReducer, f !== null)) {
          var d = q.H;
          q.H = $u;
          try {
            var h = t.lastRenderedState, v = f(h, a);
            if (o.hasEagerState = !0, o.eagerState = v, qa(v, h))
              return ds(e, t, o, 0), jt === null && ss(), !1;
          } catch {
          } finally {
            q.H = d;
          }
        }
        if (a = qh(e, t, o, i), a !== null)
          return $e(a, e, i), uy(a, t, i), !0;
      }
      return !1;
    }
    function Ns(e, t, a, i) {
      if (q.T === null && Br === 0 && console.error(
        "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
      ), i = {
        lane: 2,
        revertLane: ud(),
        action: i,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, Mu(e)) {
        if (t)
          throw Error("Cannot update optimistic state while rendering.");
        console.error("Cannot call startTransition while rendering.");
      } else
        t = qh(
          e,
          a,
          i,
          2
        ), t !== null && $e(t, e, 2);
      Nn(e, 2);
    }
    function Mu(e) {
      var t = e.alternate;
      return e === Ue || t !== null && t === Ue;
    }
    function Qf(e, t) {
      Pd = Nv = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function uy(e, t, a) {
      if ((a & 4194048) !== 0) {
        var i = t.lanes;
        i &= e.pendingLanes, a |= i, t.lanes = a, Yl(e, a);
      }
    }
    function rl(e) {
      var t = Ze;
      return e != null && (Ze = t === null ? e : t.concat(e)), t;
    }
    function go(e, t, a) {
      for (var i = Object.keys(e.props), o = 0; o < i.length; o++) {
        var f = i[o];
        if (f !== "children" && f !== "key") {
          t === null && (t = zf(e, a.mode, 0), t._debugInfo = Ze, t.return = a), me(
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
    function vn(e) {
      var t = Km;
      return Km += 1, eh === null && (eh = kh()), $h(eh, e, t);
    }
    function He(e, t) {
      t = t.props.ref, e.ref = t !== void 0 ? t : null;
    }
    function rt(e, t) {
      throw t.$$typeof === Dg ? Error(
        `A React Element from an older version of React was rendered. This is not supported. It can happen if:
- Multiple copies of the "react" package is used.
- A library pre-bundled an old copy of "react" or "react/jsx-runtime".
- A compiler tries to "inline" JSX instead of using the runtime.`
      ) : (e = Object.prototype.toString.call(t), Error(
        "Objects are not valid as a React child (found: " + (e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e) + "). If you meant to render a collection of children, use an array instead."
      ));
    }
    function Kt(e, t) {
      var a = pe(e) || "Component";
      OS[a] || (OS[a] = !0, t = t.displayName || t.name || "Component", e.tag === 3 ? console.error(
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
        a,
        t,
        a
      ));
    }
    function rc(e, t) {
      var a = pe(e) || "Component";
      DS[a] || (DS[a] = !0, t = String(t), e.tag === 3 ? console.error(
        `Symbols are not valid as a React child.
  root.render(%s)`,
        t
      ) : console.error(
        `Symbols are not valid as a React child.
  <%s>%s</%s>`,
        a,
        t,
        a
      ));
    }
    function sc(e) {
      function t(b, E) {
        if (e) {
          var R = b.deletions;
          R === null ? (b.deletions = [E], b.flags |= 16) : R.push(E);
        }
      }
      function a(b, E) {
        if (!e) return null;
        for (; E !== null; )
          t(b, E), E = E.sibling;
        return null;
      }
      function i(b) {
        for (var E = /* @__PURE__ */ new Map(); b !== null; )
          b.key !== null ? E.set(b.key, b) : E.set(b.index, b), b = b.sibling;
        return E;
      }
      function o(b, E) {
        return b = wn(b, E), b.index = 0, b.sibling = null, b;
      }
      function f(b, E, R) {
        return b.index = R, e ? (R = b.alternate, R !== null ? (R = R.index, R < E ? (b.flags |= 67108866, E) : R) : (b.flags |= 67108866, E)) : (b.flags |= 1048576, E);
      }
      function d(b) {
        return e && b.alternate === null && (b.flags |= 67108866), b;
      }
      function h(b, E, R, X) {
        return E === null || E.tag !== 6 ? (E = wh(
          R,
          b.mode,
          X
        ), E.return = b, E._debugOwner = b, E._debugTask = b._debugTask, E._debugInfo = Ze, E) : (E = o(E, R), E.return = b, E._debugInfo = Ze, E);
      }
      function v(b, E, R, X) {
        var le = R.type;
        return le === Ui ? (E = B(
          b,
          E,
          R.props.children,
          X,
          R.key
        ), go(R, E, b), E) : E !== null && (E.elementType === le || Up(E, R) || typeof le == "object" && le !== null && le.$$typeof === xa && Po(le) === E.type) ? (E = o(E, R.props), He(E, R), E.return = b, E._debugOwner = R._owner, E._debugInfo = Ze, E) : (E = zf(R, b.mode, X), He(E, R), E.return = b, E._debugInfo = Ze, E);
      }
      function g(b, E, R, X) {
        return E === null || E.tag !== 4 || E.stateNode.containerInfo !== R.containerInfo || E.stateNode.implementation !== R.implementation ? (E = jh(R, b.mode, X), E.return = b, E._debugInfo = Ze, E) : (E = o(E, R.children || []), E.return = b, E._debugInfo = Ze, E);
      }
      function B(b, E, R, X, le) {
        return E === null || E.tag !== 7 ? (E = Qa(
          R,
          b.mode,
          X,
          le
        ), E.return = b, E._debugOwner = b, E._debugTask = b._debugTask, E._debugInfo = Ze, E) : (E = o(E, R), E.return = b, E._debugInfo = Ze, E);
      }
      function G(b, E, R) {
        if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
          return E = wh(
            "" + E,
            b.mode,
            R
          ), E.return = b, E._debugOwner = b, E._debugTask = b._debugTask, E._debugInfo = Ze, E;
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case Gu:
              return R = zf(
                E,
                b.mode,
                R
              ), He(R, E), R.return = b, b = rl(E._debugInfo), R._debugInfo = Ze, Ze = b, R;
            case qe:
              return E = jh(
                E,
                b.mode,
                R
              ), E.return = b, E._debugInfo = Ze, E;
            case xa:
              var X = rl(E._debugInfo);
              return E = Po(E), b = G(b, E, R), Ze = X, b;
          }
          if (hl(E) || Ut(E))
            return R = Qa(
              E,
              b.mode,
              R,
              null
            ), R.return = b, R._debugOwner = b, R._debugTask = b._debugTask, b = rl(E._debugInfo), R._debugInfo = Ze, Ze = b, R;
          if (typeof E.then == "function")
            return X = rl(E._debugInfo), b = G(
              b,
              vn(E),
              R
            ), Ze = X, b;
          if (E.$$typeof === Sa)
            return G(
              b,
              Uf(b, E),
              R
            );
          rt(b, E);
        }
        return typeof E == "function" && Kt(b, E), typeof E == "symbol" && rc(b, E), null;
      }
      function x(b, E, R, X) {
        var le = E !== null ? E.key : null;
        if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
          return le !== null ? null : h(b, E, "" + R, X);
        if (typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case Gu:
              return R.key === le ? (le = rl(R._debugInfo), b = v(
                b,
                E,
                R,
                X
              ), Ze = le, b) : null;
            case qe:
              return R.key === le ? g(b, E, R, X) : null;
            case xa:
              return le = rl(R._debugInfo), R = Po(R), b = x(
                b,
                E,
                R,
                X
              ), Ze = le, b;
          }
          if (hl(R) || Ut(R))
            return le !== null ? null : (le = rl(R._debugInfo), b = B(
              b,
              E,
              R,
              X,
              null
            ), Ze = le, b);
          if (typeof R.then == "function")
            return le = rl(R._debugInfo), b = x(
              b,
              E,
              vn(R),
              X
            ), Ze = le, b;
          if (R.$$typeof === Sa)
            return x(
              b,
              E,
              Uf(b, R),
              X
            );
          rt(b, R);
        }
        return typeof R == "function" && Kt(b, R), typeof R == "symbol" && rc(b, R), null;
      }
      function V(b, E, R, X, le) {
        if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
          return b = b.get(R) || null, h(E, b, "" + X, le);
        if (typeof X == "object" && X !== null) {
          switch (X.$$typeof) {
            case Gu:
              return R = b.get(
                X.key === null ? R : X.key
              ) || null, b = rl(X._debugInfo), E = v(
                E,
                R,
                X,
                le
              ), Ze = b, E;
            case qe:
              return b = b.get(
                X.key === null ? R : X.key
              ) || null, g(E, b, X, le);
            case xa:
              var Be = rl(X._debugInfo);
              return X = Po(X), E = V(
                b,
                E,
                R,
                X,
                le
              ), Ze = Be, E;
          }
          if (hl(X) || Ut(X))
            return R = b.get(R) || null, b = rl(X._debugInfo), E = B(
              E,
              R,
              X,
              le,
              null
            ), Ze = b, E;
          if (typeof X.then == "function")
            return Be = rl(X._debugInfo), E = V(
              b,
              E,
              R,
              vn(X),
              le
            ), Ze = Be, E;
          if (X.$$typeof === Sa)
            return V(
              b,
              E,
              R,
              Uf(E, X),
              le
            );
          rt(E, X);
        }
        return typeof X == "function" && Kt(E, X), typeof X == "symbol" && rc(E, X), null;
      }
      function se(b, E, R, X) {
        if (typeof R != "object" || R === null) return X;
        switch (R.$$typeof) {
          case Gu:
          case qe:
            oe(b, E, R);
            var le = R.key;
            if (typeof le != "string") break;
            if (X === null) {
              X = /* @__PURE__ */ new Set(), X.add(le);
              break;
            }
            if (!X.has(le)) {
              X.add(le);
              break;
            }
            me(E, function() {
              console.error(
                "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                le
              );
            });
            break;
          case xa:
            R = Po(R), se(b, E, R, X);
        }
        return X;
      }
      function De(b, E, R, X) {
        for (var le = null, Be = null, de = null, Ye = E, Le = E = 0, Zt = null; Ye !== null && Le < R.length; Le++) {
          Ye.index > Le ? (Zt = Ye, Ye = null) : Zt = Ye.sibling;
          var ml = x(
            b,
            Ye,
            R[Le],
            X
          );
          if (ml === null) {
            Ye === null && (Ye = Zt);
            break;
          }
          le = se(
            b,
            ml,
            R[Le],
            le
          ), e && Ye && ml.alternate === null && t(b, Ye), E = f(ml, E, Le), de === null ? Be = ml : de.sibling = ml, de = ml, Ye = Zt;
        }
        if (Le === R.length)
          return a(b, Ye), ft && ec(b, Le), Be;
        if (Ye === null) {
          for (; Le < R.length; Le++)
            Ye = G(b, R[Le], X), Ye !== null && (le = se(
              b,
              Ye,
              R[Le],
              le
            ), E = f(
              Ye,
              E,
              Le
            ), de === null ? Be = Ye : de.sibling = Ye, de = Ye);
          return ft && ec(b, Le), Be;
        }
        for (Ye = i(Ye); Le < R.length; Le++)
          Zt = V(
            Ye,
            b,
            Le,
            R[Le],
            X
          ), Zt !== null && (le = se(
            b,
            Zt,
            R[Le],
            le
          ), e && Zt.alternate !== null && Ye.delete(
            Zt.key === null ? Le : Zt.key
          ), E = f(
            Zt,
            E,
            Le
          ), de === null ? Be = Zt : de.sibling = Zt, de = Zt);
        return e && Ye.forEach(function(wc) {
          return t(b, wc);
        }), ft && ec(b, Le), Be;
      }
      function Gt(b, E, R, X) {
        if (R == null)
          throw Error("An iterable object provided no iterator.");
        for (var le = null, Be = null, de = E, Ye = E = 0, Le = null, Zt = null, ml = R.next(); de !== null && !ml.done; Ye++, ml = R.next()) {
          de.index > Ye ? (Le = de, de = null) : Le = de.sibling;
          var wc = x(b, de, ml.value, X);
          if (wc === null) {
            de === null && (de = Le);
            break;
          }
          Zt = se(
            b,
            wc,
            ml.value,
            Zt
          ), e && de && wc.alternate === null && t(b, de), E = f(wc, E, Ye), Be === null ? le = wc : Be.sibling = wc, Be = wc, de = Le;
        }
        if (ml.done)
          return a(b, de), ft && ec(b, Ye), le;
        if (de === null) {
          for (; !ml.done; Ye++, ml = R.next())
            de = G(b, ml.value, X), de !== null && (Zt = se(
              b,
              de,
              ml.value,
              Zt
            ), E = f(
              de,
              E,
              Ye
            ), Be === null ? le = de : Be.sibling = de, Be = de);
          return ft && ec(b, Ye), le;
        }
        for (de = i(de); !ml.done; Ye++, ml = R.next())
          Le = V(
            de,
            b,
            Ye,
            ml.value,
            X
          ), Le !== null && (Zt = se(
            b,
            Le,
            ml.value,
            Zt
          ), e && Le.alternate !== null && de.delete(
            Le.key === null ? Ye : Le.key
          ), E = f(
            Le,
            E,
            Ye
          ), Be === null ? le = Le : Be.sibling = Le, Be = Le);
        return e && de.forEach(function(eT) {
          return t(b, eT);
        }), ft && ec(b, Ye), le;
      }
      function at(b, E, R, X) {
        if (typeof R == "object" && R !== null && R.type === Ui && R.key === null && (go(R, null, b), R = R.props.children), typeof R == "object" && R !== null) {
          switch (R.$$typeof) {
            case Gu:
              var le = rl(R._debugInfo);
              e: {
                for (var Be = R.key; E !== null; ) {
                  if (E.key === Be) {
                    if (Be = R.type, Be === Ui) {
                      if (E.tag === 7) {
                        a(
                          b,
                          E.sibling
                        ), X = o(
                          E,
                          R.props.children
                        ), X.return = b, X._debugOwner = R._owner, X._debugInfo = Ze, go(R, X, b), b = X;
                        break e;
                      }
                    } else if (E.elementType === Be || Up(
                      E,
                      R
                    ) || typeof Be == "object" && Be !== null && Be.$$typeof === xa && Po(Be) === E.type) {
                      a(
                        b,
                        E.sibling
                      ), X = o(E, R.props), He(X, R), X.return = b, X._debugOwner = R._owner, X._debugInfo = Ze, b = X;
                      break e;
                    }
                    a(b, E);
                    break;
                  } else t(b, E);
                  E = E.sibling;
                }
                R.type === Ui ? (X = Qa(
                  R.props.children,
                  b.mode,
                  X,
                  R.key
                ), X.return = b, X._debugOwner = b, X._debugTask = b._debugTask, X._debugInfo = Ze, go(R, X, b), b = X) : (X = zf(
                  R,
                  b.mode,
                  X
                ), He(X, R), X.return = b, X._debugInfo = Ze, b = X);
              }
              return b = d(b), Ze = le, b;
            case qe:
              e: {
                for (le = R, R = le.key; E !== null; ) {
                  if (E.key === R)
                    if (E.tag === 4 && E.stateNode.containerInfo === le.containerInfo && E.stateNode.implementation === le.implementation) {
                      a(
                        b,
                        E.sibling
                      ), X = o(
                        E,
                        le.children || []
                      ), X.return = b, b = X;
                      break e;
                    } else {
                      a(b, E);
                      break;
                    }
                  else t(b, E);
                  E = E.sibling;
                }
                X = jh(
                  le,
                  b.mode,
                  X
                ), X.return = b, b = X;
              }
              return d(b);
            case xa:
              return le = rl(R._debugInfo), R = Po(R), b = at(
                b,
                E,
                R,
                X
              ), Ze = le, b;
          }
          if (hl(R))
            return le = rl(R._debugInfo), b = De(
              b,
              E,
              R,
              X
            ), Ze = le, b;
          if (Ut(R)) {
            if (le = rl(R._debugInfo), Be = Ut(R), typeof Be != "function")
              throw Error(
                "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
              );
            var de = Be.call(R);
            return de === R ? (b.tag !== 0 || Object.prototype.toString.call(b.type) !== "[object GeneratorFunction]" || Object.prototype.toString.call(de) !== "[object Generator]") && (AS || console.error(
              "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
            ), AS = !0) : R.entries !== Be || Pg || (console.error(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), Pg = !0), b = Gt(
              b,
              E,
              de,
              X
            ), Ze = le, b;
          }
          if (typeof R.then == "function")
            return le = rl(R._debugInfo), b = at(
              b,
              E,
              vn(R),
              X
            ), Ze = le, b;
          if (R.$$typeof === Sa)
            return at(
              b,
              E,
              Uf(b, R),
              X
            );
          rt(b, R);
        }
        return typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint" ? (le = "" + R, E !== null && E.tag === 6 ? (a(
          b,
          E.sibling
        ), X = o(E, le), X.return = b, b = X) : (a(b, E), X = wh(
          le,
          b.mode,
          X
        ), X.return = b, X._debugOwner = b, X._debugTask = b._debugTask, X._debugInfo = Ze, b = X), d(b)) : (typeof R == "function" && Kt(b, R), typeof R == "symbol" && rc(b, R), a(b, E));
      }
      return function(b, E, R, X) {
        var le = Ze;
        Ze = null;
        try {
          Km = 0;
          var Be = at(
            b,
            E,
            R,
            X
          );
          return eh = null, Be;
        } catch (Zt) {
          if (Zt === Vm || Zt === Cv) throw Zt;
          var de = C(29, Zt, null, b.mode);
          de.lanes = X, de.return = b;
          var Ye = de._debugInfo = Ze;
          if (de._debugOwner = b._debugOwner, de._debugTask = b._debugTask, Ye != null) {
            for (var Le = Ye.length - 1; 0 <= Le; Le--)
              if (typeof Ye[Le].stack == "string") {
                de._debugOwner = Ye[Le], de._debugTask = Ye[Le].debugTask;
                break;
              }
          }
          return de;
        } finally {
          Ze = le;
        }
      };
    }
    function fa(e) {
      var t = e.alternate;
      Qe(
        Bl,
        Bl.current & lh,
        e
      ), Qe(cu, e, e), wi === null && (t === null || Fd.current !== null || t.memoizedState !== null) && (wi = e);
    }
    function Zf(e) {
      if (e.tag === 22) {
        if (Qe(Bl, Bl.current, e), Qe(cu, e, e), wi === null) {
          var t = e.alternate;
          t !== null && t.memoizedState !== null && (wi = e);
        }
      } else ka(e);
    }
    function ka(e) {
      Qe(Bl, Bl.current, e), Qe(
        cu,
        cu.current,
        e
      );
    }
    function ra(e) {
      ye(cu, e), wi === e && (wi = null), ye(Bl, e);
    }
    function qs(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || a.data === qc || Di(a)))
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
    function Jt(e) {
      if (e !== null && typeof e != "function") {
        var t = String(e);
        wS.has(t) || (wS.add(t), console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          e
        ));
      }
    }
    function Kf(e, t, a, i) {
      var o = e.memoizedState, f = a(i, o);
      if (e.mode & Ta) {
        _e(!0);
        try {
          f = a(i, o);
        } finally {
          _e(!1);
        }
      }
      f === void 0 && (t = ke(t) || "Component", NS.has(t) || (NS.add(t), console.error(
        "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
        t
      ))), o = f == null ? o : Me({}, o, f), e.memoizedState = o, e.lanes === 0 && (e.updateQueue.baseState = o);
    }
    function Bs(e, t, a, i, o, f, d) {
      var h = e.stateNode;
      if (typeof h.shouldComponentUpdate == "function") {
        if (a = h.shouldComponentUpdate(
          i,
          f,
          d
        ), e.mode & Ta) {
          _e(!0);
          try {
            a = h.shouldComponentUpdate(
              i,
              f,
              d
            );
          } finally {
            _e(!1);
          }
        }
        return a === void 0 && console.error(
          "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
          ke(t) || "Component"
        ), a;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Df(a, i) || !Df(o, f) : !0;
    }
    function iy(e, t, a, i) {
      var o = t.state;
      typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o && (e = pe(e) || "Component", US.has(e) || (US.add(e), console.error(
        "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
        e
      )), e0.enqueueReplaceState(
        t,
        t.state,
        null
      ));
    }
    function yi(e, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var i in t)
          i !== "ref" && (a[i] = t[i]);
      }
      if (e = e.defaultProps) {
        a === t && (a = Me({}, a));
        for (var o in e)
          a[o] === void 0 && (a[o] = e[o]);
      }
      return a;
    }
    function xp(e) {
      t0(e), console.warn(
        `%s

%s
`,
        ah ? "An error occurred in the <" + ah + "> component." : "An error occurred in one of your React components.",
        `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.`
      );
    }
    function Ys(e) {
      var t = ah ? "The above error occurred in the <" + ah + "> component." : "The above error occurred in one of your React components.", a = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((l0 || "Anonymous") + ".");
      if (typeof e == "object" && e !== null && typeof e.environmentName == "string") {
        var i = e.environmentName;
        e = [
          `%o

%s

%s
`,
          e,
          t,
          a
        ].slice(0), typeof e[0] == "string" ? e.splice(
          0,
          1,
          p1 + e[0],
          v1,
          tg + i + tg,
          g1
        ) : e.splice(
          0,
          0,
          p1,
          v1,
          tg + i + tg,
          g1
        ), e.unshift(console), i = Ib.apply(console.error, e), i();
      } else
        console.error(
          `%o

%s

%s
`,
          e,
          t,
          a
        );
    }
    function ws(e) {
      t0(e);
    }
    function So(e, t) {
      try {
        ah = t.source ? pe(t.source) : null, l0 = null;
        var a = t.value;
        if (q.actQueue !== null)
          q.thrownErrors.push(a);
        else {
          var i = e.onUncaughtError;
          i(a, { componentStack: t.stack });
        }
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function Wl(e, t, a) {
      try {
        ah = a.source ? pe(a.source) : null, l0 = pe(t);
        var i = e.onCaughtError;
        i(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        });
      } catch (o) {
        setTimeout(function() {
          throw o;
        });
      }
    }
    function $t(e, t, a) {
      return a = rn(a), a.tag = Zg, a.payload = { element: null }, a.callback = function() {
        me(t.source, So, e, t);
      }, a;
    }
    function Jf(e) {
      return e = rn(e), e.tag = Zg, e;
    }
    function dc(e, t, a, i) {
      var o = a.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var f = i.value;
        e.payload = function() {
          return o(f);
        }, e.callback = function() {
          ys(a), me(
            i.source,
            Wl,
            t,
            a,
            i
          );
        };
      }
      var d = a.stateNode;
      d !== null && typeof d.componentDidCatch == "function" && (e.callback = function() {
        ys(a), me(
          i.source,
          Wl,
          t,
          a,
          i
        ), typeof o != "function" && (af === null ? af = /* @__PURE__ */ new Set([this]) : af.add(this)), Ub(this, i), typeof o == "function" || (a.lanes & 2) === 0 && console.error(
          "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
          pe(a) || "Unknown"
        );
      });
    }
    function js(e, t, a, i, o) {
      if (a.flags |= 32768, en && Sc(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        if (t = a.alternate, t !== null && Su(
          t,
          a,
          o,
          !0
        ), ft && (_c = !0), a = cu.current, a !== null) {
          switch (a.tag) {
            case 13:
              return wi === null ? Ps() : a.alternate === null && ol === Nc && (ol = i0), a.flags &= -257, a.flags |= 65536, a.lanes = o, i === Qg ? a.flags |= 16384 : (t = a.updateQueue, t === null ? a.updateQueue = /* @__PURE__ */ new Set([i]) : t.add(i), Vy(e, i, o)), !1;
            case 22:
              return a.flags |= 65536, i === Qg ? a.flags |= 16384 : (t = a.updateQueue, t === null ? (t = {
                transitions: null,
                markerInstances: null,
                retryQueue: /* @__PURE__ */ new Set([i])
              }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue = /* @__PURE__ */ new Set([i]) : a.add(i)), Vy(e, i, o)), !1;
          }
          throw Error(
            "Unexpected Suspense handler tag (" + a.tag + "). This is a bug in React."
          );
        }
        return Vy(e, i, o), Ps(), !1;
      }
      if (ft)
        return _c = !0, t = cu.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = o, i !== Gg && Ic(
          la(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
              { cause: i }
            ),
            a
          )
        )) : (i !== Gg && Ic(
          la(
            Error(
              "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
              { cause: i }
            ),
            a
          )
        ), e = e.current.alternate, e.flags |= 65536, o &= -o, e.lanes |= o, i = la(i, a), o = $t(
          e.stateNode,
          i,
          o
        ), Tu(e, o), ol !== Gr && (ol = ch)), !1;
      var f = la(
        Error(
          "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
          { cause: i }
        ),
        a
      );
      if (ep === null ? ep = [f] : ep.push(f), ol !== Gr && (ol = ch), t === null) return !0;
      i = la(i, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, e = o & -o, a.lanes |= e, e = $t(
              a.stateNode,
              i,
              e
            ), Tu(a, e), !1;
          case 1:
            if (t = a.type, f = a.stateNode, (a.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || f !== null && typeof f.componentDidCatch == "function" && (af === null || !af.has(f))))
              return a.flags |= 65536, o &= -o, a.lanes |= o, o = Jf(o), dc(
                o,
                e,
                a,
                i
              ), Tu(a, o), !1;
        }
        a = a.return;
      } while (a !== null);
      return !1;
    }
    function sl(e, t, a, i) {
      t.child = e === null ? zS(t, null, a, i) : th(
        t,
        e.child,
        a,
        i
      );
    }
    function Vn(e, t, a, i, o) {
      a = a.render;
      var f = t.ref;
      if ("ref" in i) {
        var d = {};
        for (var h in i)
          h !== "ref" && (d[h] = i[h]);
      } else d = i;
      return ui(t), fl(t), i = ao(
        e,
        t,
        a,
        d,
        f,
        o
      ), h = Eu(), Kl(), e !== null && !Ql ? (hn(e, t, o), Xn(e, t, o)) : (ft && h && vs(t), t.flags |= 1, sl(e, t, i, o), t.child);
    }
    function kf(e, t, a, i, o) {
      if (e === null) {
        var f = a.type;
        return typeof f == "function" && !ms(f) && f.defaultProps === void 0 && a.compare === null ? (a = Ii(f), t.tag = 15, t.type = a, Wf(t, f), Gs(
          e,
          t,
          a,
          i,
          o
        )) : (e = ps(
          a.type,
          null,
          i,
          t,
          t.mode,
          o
        ), e.ref = t.ref, e.return = t, t.child = e);
      }
      if (f = e.child, !py(e, o)) {
        var d = f.memoizedProps;
        if (a = a.compare, a = a !== null ? a : Df, a(d, i) && e.ref === t.ref)
          return Xn(
            e,
            t,
            o
          );
      }
      return t.flags |= 1, e = wn(f, i), e.ref = t.ref, e.return = t, t.child = e;
    }
    function Gs(e, t, a, i, o) {
      if (e !== null) {
        var f = e.memoizedProps;
        if (Df(f, i) && e.ref === t.ref && t.type === e.type)
          if (Ql = !1, t.pendingProps = i = f, py(e, o))
            (e.flags & 131072) !== 0 && (Ql = !0);
          else
            return t.lanes = e.lanes, Xn(e, t, o);
      }
      return Vs(
        e,
        t,
        a,
        i,
        o
      );
    }
    function Ls(e, t, a) {
      var i = t.pendingProps, o = i.children, f = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (i = f !== null ? f.baseLanes | a : a, e !== null) {
            for (o = t.child = e.child, f = 0; o !== null; )
              f = f | o.lanes | o.childLanes, o = o.sibling;
            t.childLanes = f & ~i;
          } else t.childLanes = 0, t.child = null;
          return cy(
            e,
            t,
            i,
            a
          );
        }
        if ((a & 536870912) !== 0)
          t.memoizedState = { baseLanes: 0, cachePool: null }, e !== null && Es(
            t,
            f !== null ? f.cachePool : null
          ), f !== null ? Rs(t, f) : dn(t), Zf(t);
        else
          return t.lanes = t.childLanes = 536870912, cy(
            e,
            t,
            f !== null ? f.baseLanes | a : a,
            a
          );
      } else
        f !== null ? (Es(t, f.cachePool), Rs(t, f), ka(t), t.memoizedState = null) : (e !== null && Es(t, null), dn(t), ka(t));
      return sl(e, t, o, a), t.child;
    }
    function cy(e, t, a, i) {
      var o = Kh();
      return o = o === null ? null : {
        parent: Nl._currentValue,
        pool: o
      }, t.memoizedState = {
        baseLanes: a,
        cachePool: o
      }, e !== null && Es(t, null), dn(t), Zf(t), e !== null && Su(e, t, i, !0), null;
    }
    function $f(e, t) {
      var a = t.ref;
      if (a === null)
        e !== null && e.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object")
          throw Error(
            "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
          );
        (e === null || e.ref !== a) && (t.flags |= 4194816);
      }
    }
    function Vs(e, t, a, i, o) {
      if (a.prototype && typeof a.prototype.render == "function") {
        var f = ke(a) || "Unknown";
        GS[f] || (console.error(
          "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
          f,
          f
        ), GS[f] = !0);
      }
      return t.mode & Ta && ku.recordLegacyContextWarning(
        t,
        null
      ), e === null && (Wf(t, t.type), a.contextTypes && (f = ke(a) || "Unknown", VS[f] || (VS[f] = !0, console.error(
        "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
        f
      )))), ui(t), fl(t), a = ao(
        e,
        t,
        a,
        i,
        void 0,
        o
      ), i = Eu(), Kl(), e !== null && !Ql ? (hn(e, t, o), Xn(e, t, o)) : (ft && i && vs(t), t.flags |= 1, sl(e, t, a, o), t.child);
    }
    function oy(e, t, a, i, o, f) {
      return ui(t), fl(t), Hc = -1, Zm = e !== null && e.type !== t.type, t.updateQueue = null, a = ia(
        t,
        i,
        a,
        o
      ), Hf(e, t), i = Eu(), Kl(), e !== null && !Ql ? (hn(e, t, f), Xn(e, t, f)) : (ft && i && vs(t), t.flags |= 1, sl(e, t, a, f), t.child);
    }
    function fy(e, t, a, i, o) {
      switch (Je(t)) {
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
          if (t.lanes |= h, d = jt, d === null)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          h = Jf(h), dc(
            h,
            d,
            t,
            la(f, t)
          ), Tu(t, h);
      }
      if (ui(t), t.stateNode === null) {
        if (d = Wo, f = a.contextType, "contextType" in a && f !== null && (f === void 0 || f.$$typeof !== Sa) && !YS.has(a) && (YS.add(a), h = f === void 0 ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? " However, it is set to a " + typeof f + "." : f.$$typeof === gr ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", console.error(
          "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
          ke(a) || "Component",
          h
        )), typeof f == "object" && f !== null && (d = qt(f)), f = new a(i, d), t.mode & Ta) {
          _e(!0);
          try {
            f = new a(i, d);
          } finally {
            _e(!1);
          }
        }
        if (d = t.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, f.updater = e0, t.stateNode = f, f._reactInternals = t, f._reactInternalInstance = MS, typeof a.getDerivedStateFromProps == "function" && d === null && (d = ke(a) || "Component", _S.has(d) || (_S.add(d), console.error(
          "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
          d,
          f.state === null ? "null" : "undefined",
          d
        ))), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function") {
          var v = h = d = null;
          if (typeof f.componentWillMount == "function" && f.componentWillMount.__suppressDeprecationWarning !== !0 ? d = "componentWillMount" : typeof f.UNSAFE_componentWillMount == "function" && (d = "UNSAFE_componentWillMount"), typeof f.componentWillReceiveProps == "function" && f.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? h = "componentWillReceiveProps" : typeof f.UNSAFE_componentWillReceiveProps == "function" && (h = "UNSAFE_componentWillReceiveProps"), typeof f.componentWillUpdate == "function" && f.componentWillUpdate.__suppressDeprecationWarning !== !0 ? v = "componentWillUpdate" : typeof f.UNSAFE_componentWillUpdate == "function" && (v = "UNSAFE_componentWillUpdate"), d !== null || h !== null || v !== null) {
            f = ke(a) || "Component";
            var g = typeof a.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            HS.has(f) || (HS.add(f), console.error(
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
        f = t.stateNode, d = ke(a) || "Component", f.render || (a.prototype && typeof a.prototype.render == "function" ? console.error(
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
        ), a.childContextTypes && !BS.has(a) && (BS.add(a), console.error(
          "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
          d
        )), a.contextTypes && !qS.has(a) && (qS.add(a), console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
          d
        )), typeof f.componentShouldUpdate == "function" && console.error(
          "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
          d
        ), a.prototype && a.prototype.isPureReactComponent && typeof f.shouldComponentUpdate < "u" && console.error(
          "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
          ke(a) || "A pure component"
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
        ), typeof f.getSnapshotBeforeUpdate != "function" || typeof f.componentDidUpdate == "function" || CS.has(a) || (CS.add(a), console.error(
          "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
          ke(a)
        )), typeof f.getDerivedStateFromProps == "function" && console.error(
          "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof f.getDerivedStateFromError == "function" && console.error(
          "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
          d
        ), typeof a.getSnapshotBeforeUpdate == "function" && console.error(
          "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
          d
        ), (h = f.state) && (typeof h != "object" || hl(h)) && console.error("%s.state: must be set to an object or null", d), typeof f.getChildContext == "function" && typeof a.childContextTypes != "object" && console.error(
          "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
          d
        ), f = t.stateNode, f.props = i, f.state = t.memoizedState, f.refs = {}, ci(t), d = a.contextType, f.context = typeof d == "object" && d !== null ? qt(d) : Wo, f.state === i && (d = ke(a) || "Component", xS.has(d) || (xS.add(d), console.error(
          "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
          d
        ))), t.mode & Ta && ku.recordLegacyContextWarning(
          t,
          f
        ), ku.recordUnsafeLifecycleWarnings(
          t,
          f
        ), f.state = t.memoizedState, d = a.getDerivedStateFromProps, typeof d == "function" && (Kf(
          t,
          a,
          d,
          i
        ), f.state = t.memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (d = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), d !== f.state && (console.error(
          "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          pe(t) || "Component"
        ), e0.enqueueReplaceState(
          f,
          f.state,
          null
        )), oi(t, i, f, o), to(), f.state = t.memoizedState), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ju) !== Qt && (t.flags |= 134217728), f = !0;
      } else if (e === null) {
        f = t.stateNode;
        var B = t.memoizedProps;
        h = yi(a, B), f.props = h;
        var G = f.context;
        v = a.contextType, d = Wo, typeof v == "object" && v !== null && (d = qt(v)), g = a.getDerivedStateFromProps, v = typeof g == "function" || typeof f.getSnapshotBeforeUpdate == "function", B = t.pendingProps !== B, v || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (B || G !== d) && iy(
          t,
          f,
          i,
          d
        ), Fo = !1;
        var x = t.memoizedState;
        f.state = x, oi(t, i, f, o), to(), G = t.memoizedState, B || x !== G || Fo ? (typeof g == "function" && (Kf(
          t,
          a,
          g,
          i
        ), G = t.memoizedState), (h = Fo || Bs(
          t,
          a,
          h,
          i,
          x,
          G,
          d
        )) ? (v || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount()), typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ju) !== Qt && (t.flags |= 134217728)) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ju) !== Qt && (t.flags |= 134217728), t.memoizedProps = i, t.memoizedState = G), f.props = i, f.state = G, f.context = d, f = h) : (typeof f.componentDidMount == "function" && (t.flags |= 4194308), (t.mode & Ju) !== Qt && (t.flags |= 134217728), f = !1);
      } else {
        f = t.stateNode, Cf(e, t), d = t.memoizedProps, v = yi(a, d), f.props = v, g = t.pendingProps, x = f.context, G = a.contextType, h = Wo, typeof G == "object" && G !== null && (h = qt(G)), B = a.getDerivedStateFromProps, (G = typeof B == "function" || typeof f.getSnapshotBeforeUpdate == "function") || typeof f.UNSAFE_componentWillReceiveProps != "function" && typeof f.componentWillReceiveProps != "function" || (d !== g || x !== h) && iy(
          t,
          f,
          i,
          h
        ), Fo = !1, x = t.memoizedState, f.state = x, oi(t, i, f, o), to();
        var V = t.memoizedState;
        d !== g || x !== V || Fo || e !== null && e.dependencies !== null && Mf(e.dependencies) ? (typeof B == "function" && (Kf(
          t,
          a,
          B,
          i
        ), V = t.memoizedState), (v = Fo || Bs(
          t,
          a,
          v,
          i,
          x,
          V,
          h
        ) || e !== null && e.dependencies !== null && Mf(e.dependencies)) ? (G || typeof f.UNSAFE_componentWillUpdate != "function" && typeof f.componentWillUpdate != "function" || (typeof f.componentWillUpdate == "function" && f.componentWillUpdate(i, V, h), typeof f.UNSAFE_componentWillUpdate == "function" && f.UNSAFE_componentWillUpdate(
          i,
          V,
          h
        )), typeof f.componentDidUpdate == "function" && (t.flags |= 4), typeof f.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), t.memoizedProps = i, t.memoizedState = V), f.props = i, f.state = V, f.context = h, f = v) : (typeof f.componentDidUpdate != "function" || d === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof f.getSnapshotBeforeUpdate != "function" || d === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), f = !1);
      }
      if (h = f, $f(e, t), d = (t.flags & 128) !== 0, h || d) {
        if (h = t.stateNode, Pu(t), d && typeof a.getDerivedStateFromError != "function")
          a = null, tn = -1;
        else {
          if (fl(t), a = hS(h), t.mode & Ta) {
            _e(!0);
            try {
              hS(h);
            } finally {
              _e(!1);
            }
          }
          Kl();
        }
        t.flags |= 1, e !== null && d ? (t.child = th(
          t,
          e.child,
          null,
          o
        ), t.child = th(
          t,
          null,
          a,
          o
        )) : sl(e, t, a, o), t.memoizedState = h.state, e = t.child;
      } else
        e = Xn(
          e,
          t,
          o
        );
      return o = t.stateNode, f && o.props !== i && (nh || console.error(
        "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
        pe(t) || "a component"
      ), nh = !0), e;
    }
    function ry(e, t, a, i) {
      return Fc(), t.flags |= 256, sl(e, t, a, i), t.child;
    }
    function Wf(e, t) {
      t && t.childContextTypes && console.error(
        `childContextTypes cannot be defined on a function component.
  %s.childContextTypes = ...`,
        t.displayName || t.name || "Component"
      ), typeof t.getDerivedStateFromProps == "function" && (e = ke(t) || "Unknown", XS[e] || (console.error(
        "%s: Function components do not support getDerivedStateFromProps.",
        e
      ), XS[e] = !0)), typeof t.contextType == "object" && t.contextType !== null && (t = ke(t) || "Unknown", LS[t] || (console.error(
        "%s: Function components do not support contextType.",
        t
      ), LS[t] = !0));
    }
    function Xs(e) {
      return { baseLanes: e, cachePool: Jh() };
    }
    function sy(e, t, a) {
      return e = e !== null ? e.childLanes & ~a : 0, t && (e |= xn), e;
    }
    function dy(e, t, a) {
      var i, o = t.pendingProps;
      Ae(t) && (t.flags |= 128);
      var f = !1, d = (t.flags & 128) !== 0;
      if ((i = d) || (i = e !== null && e.memoizedState === null ? !1 : (Bl.current & Jm) !== 0), i && (f = !0, t.flags &= -129), i = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
        if (ft) {
          if (f ? fa(t) : ka(t), ft) {
            var h = cl, v;
            if (!(v = !h)) {
              e: {
                var g = h;
                for (v = Bi; g.nodeType !== 8; ) {
                  if (!v) {
                    v = null;
                    break e;
                  }
                  if (g = va(g.nextSibling), g === null) {
                    v = null;
                    break e;
                  }
                }
                v = g;
              }
              v !== null ? (on(), t.memoizedState = {
                dehydrated: v,
                treeContext: xr !== null ? { id: Mc, overflow: Uc } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, g = C(18, null, null, Qt), g.stateNode = v, g.return = t, t.child = g, Ba = t, cl = null, v = !0) : v = !1, v = !v;
            }
            v && (Wc(
              t,
              h
            ), ai(t));
          }
          if (h = t.memoizedState, h !== null && (h = h.dehydrated, h !== null))
            return Di(h) ? t.lanes = 32 : t.lanes = 536870912, null;
          ra(t);
        }
        return h = o.children, o = o.fallback, f ? (ka(t), f = t.mode, h = Ff(
          {
            mode: "hidden",
            children: h
          },
          f
        ), o = Qa(
          o,
          f,
          a,
          null
        ), h.return = t, o.return = t, h.sibling = o, t.child = h, f = t.child, f.memoizedState = Xs(a), f.childLanes = sy(
          e,
          i,
          a
        ), t.memoizedState = n0, o) : (fa(t), Qs(
          t,
          h
        ));
      }
      var B = e.memoizedState;
      if (B !== null && (h = B.dehydrated, h !== null)) {
        if (d)
          t.flags & 256 ? (fa(t), t.flags &= -257, t = If(
            e,
            t,
            a
          )) : t.memoizedState !== null ? (ka(t), t.child = e.child, t.flags |= 128, t = null) : (ka(t), f = o.fallback, h = t.mode, o = Ff(
            {
              mode: "visible",
              children: o.children
            },
            h
          ), f = Qa(
            f,
            h,
            a,
            null
          ), f.flags |= 2, o.return = t, f.return = t, o.sibling = f, t.child = o, th(
            t,
            e.child,
            null,
            a
          ), o = t.child, o.memoizedState = Xs(a), o.childLanes = sy(
            e,
            i,
            a
          ), t.memoizedState = n0, t = f);
        else if (fa(t), ft && console.error(
          "We should not be hydrating here. This is a bug in React. Please file a bug."
        ), Di(h)) {
          if (i = h.nextSibling && h.nextSibling.dataset, i) {
            v = i.dgst;
            var G = i.msg;
            g = i.stck;
            var x = i.cstck;
          }
          h = G, i = v, o = g, v = f = x, f = Error(h || "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."), f.stack = o || "", f.digest = i, i = v === void 0 ? null : v, o = {
            value: f,
            source: null,
            stack: i
          }, typeof i == "string" && Yg.set(
            f,
            o
          ), Ic(o), t = If(
            e,
            t,
            a
          );
        } else if (Ql || Su(
          e,
          t,
          a,
          !1
        ), i = (a & e.childLanes) !== 0, Ql || i) {
          if (i = jt, i !== null && (o = a & -a, o = (o & 42) !== 0 ? 1 : Ga(
            o
          ), o = (o & (i.suspendedLanes | a)) !== 0 ? 0 : o, o !== 0 && o !== B.retryLane))
            throw B.retryLane = o, aa(
              e,
              o
            ), $e(
              i,
              e,
              o
            ), jS;
          h.data === qc || Ps(), t = If(
            e,
            t,
            a
          );
        } else
          h.data === qc ? (t.flags |= 192, t.child = e.child, t = null) : (e = B.treeContext, cl = va(
            h.nextSibling
          ), Ba = t, ft = !0, Nr = null, _c = !1, au = null, Bi = !1, e !== null && (on(), tu[lu++] = Mc, tu[lu++] = Uc, tu[lu++] = xr, Mc = e.id, Uc = e.overflow, xr = t), t = Qs(
            t,
            o.children
          ), t.flags |= 4096);
        return t;
      }
      return f ? (ka(t), f = o.fallback, h = t.mode, v = e.child, g = v.sibling, o = wn(
        v,
        {
          mode: "hidden",
          children: o.children
        }
      ), o.subtreeFlags = v.subtreeFlags & 65011712, g !== null ? f = wn(
        g,
        f
      ) : (f = Qa(
        f,
        h,
        a,
        null
      ), f.flags |= 2), f.return = t, o.return = t, o.sibling = f, t.child = o, o = f, f = t.child, h = e.child.memoizedState, h === null ? h = Xs(a) : (v = h.cachePool, v !== null ? (g = Nl._currentValue, v = v.parent !== g ? { parent: g, pool: g } : v) : v = Jh(), h = {
        baseLanes: h.baseLanes | a,
        cachePool: v
      }), f.memoizedState = h, f.childLanes = sy(
        e,
        i,
        a
      ), t.memoizedState = n0, o) : (fa(t), a = e.child, e = a.sibling, a = wn(a, {
        mode: "visible",
        children: o.children
      }), a.return = t, a.sibling = null, e !== null && (i = t.deletions, i === null ? (t.deletions = [e], t.flags |= 16) : i.push(e)), t.child = a, t.memoizedState = null, a);
    }
    function Qs(e, t) {
      return t = Ff(
        { mode: "visible", children: t },
        e.mode
      ), t.return = e, e.child = t;
    }
    function Ff(e, t) {
      return e = C(22, e, null, t), e.lanes = 0, e.stateNode = {
        _visibility: wg,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }, e;
    }
    function If(e, t, a) {
      return th(t, e.child, null, a), e = Qs(
        t,
        t.pendingProps.children
      ), e.flags |= 2, t.memoizedState = null, e;
    }
    function hy(e, t, a) {
      e.lanes |= t;
      var i = e.alternate;
      i !== null && (i.lanes |= t), Xh(
        e.return,
        t,
        a
      );
    }
    function yy(e, t) {
      var a = hl(e);
      return e = !a && typeof Ut(e) == "function", a || e ? (a = a ? "array" : "iterable", console.error(
        "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
        a,
        t,
        a
      ), !1) : !0;
    }
    function Zs(e, t, a, i, o) {
      var f = e.memoizedState;
      f === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = i, f.tail = a, f.tailMode = o);
    }
    function my(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, f = i.tail;
      if (i = i.children, o !== void 0 && o !== "forwards" && o !== "backwards" && o !== "together" && !QS[o])
        if (QS[o] = !0, typeof o == "string")
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
      f === void 0 || a0[f] || (f !== "collapsed" && f !== "hidden" ? (a0[f] = !0, console.error(
        '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
        f
      )) : o !== "forwards" && o !== "backwards" && (a0[f] = !0, console.error(
        '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
        f
      )));
      e: if ((o === "forwards" || o === "backwards") && i !== void 0 && i !== null && i !== !1)
        if (hl(i)) {
          for (var d = 0; d < i.length; d++)
            if (!yy(i[d], d)) break e;
        } else if (d = Ut(i), typeof d == "function") {
          if (d = d.call(i))
            for (var h = d.next(), v = 0; !h.done; h = d.next()) {
              if (!yy(h.value, v)) break e;
              v++;
            }
        } else
          console.error(
            'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
            o
          );
      if (sl(e, t, i, a), i = Bl.current, (i & Jm) !== 0)
        i = i & lh | Jm, t.flags |= 128;
      else {
        if (e !== null && (e.flags & 128) !== 0)
          e: for (e = t.child; e !== null; ) {
            if (e.tag === 13)
              e.memoizedState !== null && hy(
                e,
                a,
                t
              );
            else if (e.tag === 19)
              hy(e, a, t);
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
        i &= lh;
      }
      switch (Qe(Bl, i, t), o) {
        case "forwards":
          for (a = t.child, o = null; a !== null; )
            e = a.alternate, e !== null && qs(e) === null && (o = a), a = a.sibling;
          a = o, a === null ? (o = t.child, t.child = null) : (o = a.sibling, a.sibling = null), Zs(
            t,
            !1,
            o,
            a,
            f
          );
          break;
        case "backwards":
          for (a = null, o = t.child, t.child = null; o !== null; ) {
            if (e = o.alternate, e !== null && qs(e) === null) {
              t.child = o;
              break;
            }
            e = o.sibling, o.sibling = a, a = o, o = e;
          }
          Zs(
            t,
            !0,
            a,
            null,
            f
          );
          break;
        case "together":
          Zs(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
      return t.child;
    }
    function Xn(e, t, a) {
      if (e !== null && (t.dependencies = e.dependencies), tn = -1, tf |= t.lanes, (a & t.childLanes) === 0)
        if (e !== null) {
          if (Su(
            e,
            t,
            a,
            !1
          ), (a & t.childLanes) === 0)
            return null;
        } else return null;
      if (e !== null && t.child !== e.child)
        throw Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        for (e = t.child, a = wn(e, e.pendingProps), t.child = a, a.return = t; e.sibling !== null; )
          e = e.sibling, a = a.sibling = wn(e, e.pendingProps), a.return = t;
        a.sibling = null;
      }
      return t.child;
    }
    function py(e, t) {
      return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Mf(e)));
    }
    function Np(e, t, a) {
      switch (t.tag) {
        case 3:
          ut(
            t,
            t.stateNode.containerInfo
          ), ni(
            t,
            Nl,
            e.memoizedState.cache
          ), Fc();
          break;
        case 27:
        case 5:
          I(t);
          break;
        case 4:
          ut(
            t,
            t.stateNode.containerInfo
          );
          break;
        case 10:
          ni(
            t,
            t.type,
            t.memoizedProps.value
          );
          break;
        case 12:
          (a & t.childLanes) !== 0 && (t.flags |= 4), t.flags |= 2048;
          var i = t.stateNode;
          i.effectDuration = -0, i.passiveEffectDuration = -0;
          break;
        case 13:
          if (i = t.memoizedState, i !== null)
            return i.dehydrated !== null ? (fa(t), t.flags |= 128, null) : (a & t.child.childLanes) !== 0 ? dy(
              e,
              t,
              a
            ) : (fa(t), e = Xn(
              e,
              t,
              a
            ), e !== null ? e.sibling : null);
          fa(t);
          break;
        case 19:
          var o = (e.flags & 128) !== 0;
          if (i = (a & t.childLanes) !== 0, i || (Su(
            e,
            t,
            a,
            !1
          ), i = (a & t.childLanes) !== 0), o) {
            if (i)
              return my(
                e,
                t,
                a
              );
            t.flags |= 128;
          }
          if (o = t.memoizedState, o !== null && (o.rendering = null, o.tail = null, o.lastEffect = null), Qe(
            Bl,
            Bl.current,
            t
          ), i) break;
          return null;
        case 22:
        case 23:
          return t.lanes = 0, Ls(e, t, a);
        case 24:
          ni(
            t,
            Nl,
            e.memoizedState.cache
          );
      }
      return Xn(e, t, a);
    }
    function mi(e, t, a) {
      if (t._debugNeedsRemount && e !== null) {
        a = ps(
          t.type,
          t.key,
          t.pendingProps,
          t._debugOwner || null,
          t.mode,
          t.lanes
        ), a._debugStack = t._debugStack, a._debugTask = t._debugTask;
        var i = t.return;
        if (i === null) throw Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, a._debugInfo = t._debugInfo, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        return t = i.deletions, t === null ? (i.deletions = [e], i.flags |= 16) : t.push(e), a.flags |= 2, a;
      }
      if (e !== null)
        if (e.memoizedProps !== t.pendingProps || t.type !== e.type)
          Ql = !0;
        else {
          if (!py(e, a) && (t.flags & 128) === 0)
            return Ql = !1, Np(
              e,
              t,
              a
            );
          Ql = (e.flags & 131072) !== 0;
        }
      else
        Ql = !1, (i = ft) && (on(), i = (t.flags & 1048576) !== 0), i && (i = t.index, on(), Gh(t, Ov, i));
      switch (t.lanes = 0, t.tag) {
        case 16:
          e: if (i = t.pendingProps, e = Po(t.elementType), t.type = e, typeof e == "function")
            ms(e) ? (i = yi(
              e,
              i
            ), t.tag = 1, t.type = e = Ii(e), t = fy(
              null,
              t,
              e,
              i,
              a
            )) : (t.tag = 0, Wf(t, e), t.type = e = Ii(e), t = Vs(
              null,
              t,
              e,
              i,
              a
            ));
          else {
            if (e != null) {
              if (o = e.$$typeof, o === _i) {
                t.tag = 11, t.type = e = Bh(e), t = Vn(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              } else if (o === Od) {
                t.tag = 14, t = kf(
                  null,
                  t,
                  e,
                  i,
                  a
                );
                break e;
              }
            }
            throw t = "", e !== null && typeof e == "object" && e.$$typeof === xa && (t = " Did you wrap a component in React.lazy() more than once?"), e = ke(e) || e, Error(
              "Element type is invalid. Received a promise that resolves to: " + e + ". Lazy element type must resolve to a class or function." + t
            );
          }
          return t;
        case 0:
          return Vs(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 1:
          return i = t.type, o = yi(
            i,
            t.pendingProps
          ), fy(
            e,
            t,
            i,
            o,
            a
          );
        case 3:
          e: {
            if (ut(
              t,
              t.stateNode.containerInfo
            ), e === null)
              throw Error(
                "Should have a current fiber. This is a bug in React."
              );
            i = t.pendingProps;
            var f = t.memoizedState;
            o = f.element, Cf(e, t), oi(t, i, null, a);
            var d = t.memoizedState;
            if (i = d.cache, ni(t, Nl, i), i !== f.cache && kl(
              t,
              [Nl],
              a,
              !0
            ), to(), i = d.element, f.isDehydrated)
              if (f = {
                element: i,
                isDehydrated: !1,
                cache: d.cache
              }, t.updateQueue.baseState = f, t.memoizedState = f, t.flags & 256) {
                t = ry(
                  e,
                  t,
                  i,
                  a
                );
                break e;
              } else if (i !== o) {
                o = la(
                  Error(
                    "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                  ),
                  t
                ), Ic(o), t = ry(
                  e,
                  t,
                  i,
                  a
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
                for (cl = va(e.firstChild), Ba = t, ft = !0, Nr = null, _c = !1, au = null, Bi = !0, e = zS(
                  t,
                  null,
                  i,
                  a
                ), t.child = e; e; )
                  e.flags = e.flags & -3 | 4096, e = e.sibling;
              }
            else {
              if (Fc(), i === o) {
                t = Xn(
                  e,
                  t,
                  a
                );
                break e;
              }
              sl(
                e,
                t,
                i,
                a
              );
            }
            t = t.child;
          }
          return t;
        case 26:
          return $f(e, t), e === null ? (e = sr(
            t.type,
            null,
            t.pendingProps,
            null
          )) ? t.memoizedState = e : ft || (e = t.type, a = t.pendingProps, i = Ct(
            Kn.current
          ), i = ct(
            i
          ).createElement(e), i[Xl] = t, i[ba] = a, Sl(i, e, a), z(i), t.stateNode = i) : t.memoizedState = sr(
            t.type,
            e.memoizedProps,
            t.pendingProps,
            e.memoizedState
          ), null;
        case 27:
          return I(t), e === null && ft && (i = Ct(Kn.current), o = Y(), i = t.stateNode = ga(
            t.type,
            t.pendingProps,
            i,
            o,
            !1
          ), _c || (o = Fe(
            i,
            t.type,
            t.pendingProps,
            o
          ), o !== null && (lc(t, 0).serverProps = o)), Ba = t, Bi = !0, o = cl, dl(t.type) ? (z0 = o, cl = va(
            i.firstChild
          )) : cl = o), sl(
            e,
            t,
            t.pendingProps.children,
            a
          ), $f(e, t), e === null && (t.flags |= 4194304), t.child;
        case 5:
          return e === null && ft && (f = Y(), i = ns(
            t.type,
            f.ancestorInfo
          ), o = cl, (d = !o) || (d = _l(
            o,
            t.type,
            t.pendingProps,
            Bi
          ), d !== null ? (t.stateNode = d, _c || (f = Fe(
            d,
            t.type,
            t.pendingProps,
            f
          ), f !== null && (lc(t, 0).serverProps = f)), Ba = t, cl = va(
            d.firstChild
          ), Bi = !1, f = !0) : f = !1, d = !f), d && (i && Wc(t, o), ai(t))), I(t), o = t.type, f = t.pendingProps, d = e !== null ? e.memoizedProps : null, i = f.children, Ei(o, f) ? i = null : d !== null && Ei(o, d) && (t.flags |= 32), t.memoizedState !== null && (o = ao(
            e,
            t,
            Ka,
            null,
            null,
            a
          ), op._currentValue = o), $f(e, t), sl(
            e,
            t,
            i,
            a
          ), t.child;
        case 6:
          return e === null && ft && (e = t.pendingProps, a = Y(), i = a.ancestorInfo.current, e = i != null ? Kc(
            e,
            i.tag,
            a.ancestorInfo.implicitRootScope
          ) : !0, a = cl, (i = !a) || (i = Oi(
            a,
            t.pendingProps,
            Bi
          ), i !== null ? (t.stateNode = i, Ba = t, cl = null, i = !0) : i = !1, i = !i), i && (e && Wc(t, a), ai(t))), null;
        case 13:
          return dy(e, t, a);
        case 4:
          return ut(
            t,
            t.stateNode.containerInfo
          ), i = t.pendingProps, e === null ? t.child = th(
            t,
            null,
            i,
            a
          ) : sl(
            e,
            t,
            i,
            a
          ), t.child;
        case 11:
          return Vn(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 7:
          return sl(
            e,
            t,
            t.pendingProps,
            a
          ), t.child;
        case 8:
          return sl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 12:
          return t.flags |= 4, t.flags |= 2048, i = t.stateNode, i.effectDuration = -0, i.passiveEffectDuration = -0, sl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 10:
          return i = t.type, o = t.pendingProps, f = o.value, "value" in o || ZS || (ZS = !0, console.error(
            "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
          )), ni(t, i, f), sl(
            e,
            t,
            o.children,
            a
          ), t.child;
        case 9:
          return o = t.type._context, i = t.pendingProps.children, typeof i != "function" && console.error(
            "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
          ), ui(t), o = qt(o), fl(t), i = Fg(
            i,
            o,
            void 0
          ), Kl(), t.flags |= 1, sl(
            e,
            t,
            i,
            a
          ), t.child;
        case 14:
          return kf(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 15:
          return Gs(
            e,
            t,
            t.type,
            t.pendingProps,
            a
          );
        case 19:
          return my(
            e,
            t,
            a
          );
        case 31:
          return i = t.pendingProps, a = t.mode, i = {
            mode: i.mode,
            children: i.children
          }, e === null ? (e = Ff(
            i,
            a
          ), e.ref = t.ref, t.child = e, e.return = t, t = e) : (e = wn(e.child, i), e.ref = t.ref, t.child = e, e.return = t, t = e), t;
        case 22:
          return Ls(e, t, a);
        case 24:
          return ui(t), i = qt(Nl), e === null ? (o = Kh(), o === null && (o = jt, f = Qh(), o.pooledCache = f, Za(f), f !== null && (o.pooledCacheLanes |= a), o = f), t.memoizedState = {
            parent: i,
            cache: o
          }, ci(t), ni(t, Nl, o)) : ((e.lanes & a) !== 0 && (Cf(e, t), oi(t, null, null, a), to()), o = e.memoizedState, f = t.memoizedState, o.parent !== i ? (o = {
            parent: i,
            cache: i
          }, t.memoizedState = o, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = o), ni(t, Nl, i)) : (i = f.cache, ni(t, Nl, i), i !== o.cache && kl(
            t,
            [Nl],
            a,
            !0
          ))), sl(
            e,
            t,
            t.pendingProps.children,
            a
          ), t.child;
        case 29:
          throw t.pendingProps;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function $a(e) {
      e.flags |= 4;
    }
    function vy(e, t) {
      if (t.type !== "stylesheet" || (t.state.loading & ou) !== $r)
        e.flags &= -16777217;
      else if (e.flags |= 16777216, !um(t)) {
        if (t = cu.current, t !== null && ((tt & 4194048) === tt ? wi !== null : (tt & 62914560) !== tt && (tt & 536870912) === 0 || t !== wi))
          throw Xm = Qg, tS;
        e.flags |= 8192;
      }
    }
    function hc(e, t) {
      t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Li() : 536870912, e.lanes |= t, Xr |= t);
    }
    function Uu(e, t) {
      if (!ft)
        switch (e.tailMode) {
          case "hidden":
            t = e.tail;
            for (var a = null; t !== null; )
              t.alternate !== null && (a = t), t = t.sibling;
            a === null ? e.tail = null : a.sibling = null;
            break;
          case "collapsed":
            a = e.tail;
            for (var i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : i.sibling = null;
        }
    }
    function Bt(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = 0, i = 0;
      if (t)
        if ((e.mode & Il) !== Qt) {
          for (var o = e.selfBaseDuration, f = e.child; f !== null; )
            a |= f.lanes | f.childLanes, i |= f.subtreeFlags & 65011712, i |= f.flags & 65011712, o += f.treeBaseDuration, f = f.sibling;
          e.treeBaseDuration = o;
        } else
          for (o = e.child; o !== null; )
            a |= o.lanes | o.childLanes, i |= o.subtreeFlags & 65011712, i |= o.flags & 65011712, o.return = e, o = o.sibling;
      else if ((e.mode & Il) !== Qt) {
        o = e.actualDuration, f = e.selfBaseDuration;
        for (var d = e.child; d !== null; )
          a |= d.lanes | d.childLanes, i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, f += d.treeBaseDuration, d = d.sibling;
        e.actualDuration = o, e.treeBaseDuration = f;
      } else
        for (o = e.child; o !== null; )
          a |= o.lanes | o.childLanes, i |= o.subtreeFlags, i |= o.flags, o.return = e, o = o.sibling;
      return e.subtreeFlags |= i, e.childLanes = a, t;
    }
    function qp(e, t, a) {
      var i = t.pendingProps;
      switch (tc(t), t.tag) {
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
          return Bt(t), null;
        case 1:
          return Bt(t), null;
        case 3:
          return a = t.stateNode, i = null, e !== null && (i = e.memoizedState.cache), t.memoizedState.cache !== i && (t.flags |= 2048), gu(Nl, t), L(t), a.pendingContext && (a.context = a.pendingContext, a.pendingContext = null), (e === null || e.child === null) && (ac(t) ? (_p(), $a(t)) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Vh())), Bt(t), null;
        case 26:
          return a = t.memoizedState, e === null ? ($a(t), a !== null ? (Bt(t), vy(
            t,
            a
          )) : (Bt(t), t.flags &= -16777217)) : a ? a !== e.memoizedState ? ($a(t), Bt(t), vy(
            t,
            a
          )) : (Bt(t), t.flags &= -16777217) : (e.memoizedProps !== i && $a(t), Bt(t), t.flags &= -16777217), null;
        case 27:
          ue(t), a = Ct(Kn.current);
          var o = t.type;
          if (e !== null && t.stateNode != null)
            e.memoizedProps !== i && $a(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Bt(t), null;
            }
            e = Y(), ac(t) ? Lh(t) : (e = ga(
              o,
              i,
              a,
              e,
              !0
            ), t.stateNode = e, $a(t));
          }
          return Bt(t), null;
        case 5:
          if (ue(t), a = t.type, e !== null && t.stateNode != null)
            e.memoizedProps !== i && $a(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              return Bt(t), null;
            }
            if (o = Y(), ac(t))
              Lh(t);
            else {
              switch (e = Ct(Kn.current), ns(a, o.ancestorInfo), o = o.context, e = ct(e), o) {
                case hh:
                  e = e.createElementNS(Ku, a);
                  break;
                case Iv:
                  e = e.createElementNS(
                    Yd,
                    a
                  );
                  break;
                default:
                  switch (a) {
                    case "svg":
                      e = e.createElementNS(
                        Ku,
                        a
                      );
                      break;
                    case "math":
                      e = e.createElementNS(
                        Yd,
                        a
                      );
                      break;
                    case "script":
                      e = e.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof i.is == "string" ? e.createElement("select", { is: i.is }) : e.createElement("select"), i.multiple ? e.multiple = !0 : i.size && (e.size = i.size);
                      break;
                    default:
                      e = typeof i.is == "string" ? e.createElement(a, {
                        is: i.is
                      }) : e.createElement(a), a.indexOf("-") === -1 && (a !== a.toLowerCase() && console.error(
                        "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                        a
                      ), Object.prototype.toString.call(e) !== "[object HTMLUnknownElement]" || Jn.call(
                        r1,
                        a
                      ) || (r1[a] = !0, console.error(
                        "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                        a
                      )));
                  }
              }
              e[Xl] = t, e[ba] = i;
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
              e: switch (Sl(e, a, i), a) {
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
              e && $a(t);
            }
          }
          return Bt(t), t.flags &= -16777217, null;
        case 6:
          if (e && t.stateNode != null)
            e.memoizedProps !== i && $a(t);
          else {
            if (typeof i != "string" && t.stateNode === null)
              throw Error(
                "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
              );
            if (e = Ct(Kn.current), a = Y(), ac(t)) {
              e = t.stateNode, a = t.memoizedProps, o = !_c, i = null;
              var f = Ba;
              if (f !== null)
                switch (f.tag) {
                  case 3:
                    o && (o = tm(
                      e,
                      a,
                      i
                    ), o !== null && (lc(t, 0).serverProps = o));
                    break;
                  case 27:
                  case 5:
                    i = f.memoizedProps, o && (o = tm(
                      e,
                      a,
                      i
                    ), o !== null && (lc(
                      t,
                      0
                    ).serverProps = o));
                }
              e[Xl] = t, e = !!(e.nodeValue === a || i !== null && i.suppressHydrationWarning === !0 || Tc(e.nodeValue, a)), e || ai(t);
            } else
              o = a.ancestorInfo.current, o != null && Kc(
                i,
                o.tag,
                a.ancestorInfo.implicitRootScope
              ), e = ct(e).createTextNode(
                i
              ), e[Xl] = t, t.stateNode = e;
          }
          return Bt(t), null;
        case 13:
          if (i = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            if (o = ac(t), i !== null && i.dehydrated !== null) {
              if (e === null) {
                if (!o)
                  throw Error(
                    "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                  );
                if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o)
                  throw Error(
                    "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                  );
                o[Xl] = t, Bt(t), (t.mode & Il) !== Qt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              } else
                _p(), Fc(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4, Bt(t), (t.mode & Il) !== Qt && i !== null && (o = t.child, o !== null && (t.treeBaseDuration -= o.treeBaseDuration));
              o = !1;
            } else
              o = Vh(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = o), o = !0;
            if (!o)
              return t.flags & 256 ? (ra(t), t) : (ra(t), null);
          }
          return ra(t), (t.flags & 128) !== 0 ? (t.lanes = a, (t.mode & Il) !== Qt && _f(t), t) : (a = i !== null, e = e !== null && e.memoizedState !== null, a && (i = t.child, o = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (o = i.alternate.memoizedState.cachePool.pool), f = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (f = i.memoizedState.cachePool.pool), f !== o && (i.flags |= 2048)), a !== e && a && (t.child.flags |= 8192), hc(t, t.updateQueue), Bt(t), (t.mode & Il) !== Qt && a && (e = t.child, e !== null && (t.treeBaseDuration -= e.treeBaseDuration)), null);
        case 4:
          return L(t), e === null && or(
            t.stateNode.containerInfo
          ), Bt(t), null;
        case 10:
          return gu(t.type, t), Bt(t), null;
        case 19:
          if (ye(Bl, t), o = t.memoizedState, o === null) return Bt(t), null;
          if (i = (t.flags & 128) !== 0, f = o.rendering, f === null)
            if (i) Uu(o, !1);
            else {
              if (ol !== Nc || e !== null && (e.flags & 128) !== 0)
                for (e = t.child; e !== null; ) {
                  if (f = qs(e), f !== null) {
                    for (t.flags |= 128, Uu(o, !1), e = f.updateQueue, t.updateQueue = e, hc(t, e), t.subtreeFlags = 0, e = a, a = t.child; a !== null; )
                      Yh(a, e), a = a.sibling;
                    return Qe(
                      Bl,
                      Bl.current & lh | Jm,
                      t
                    ), t.child;
                  }
                  e = e.sibling;
                }
              o.tail !== null && Cl() > Gv && (t.flags |= 128, i = !0, Uu(o, !1), t.lanes = 4194304);
            }
          else {
            if (!i)
              if (e = qs(f), e !== null) {
                if (t.flags |= 128, i = !0, e = e.updateQueue, t.updateQueue = e, hc(t, e), Uu(o, !0), o.tail === null && o.tailMode === "hidden" && !f.alternate && !ft)
                  return Bt(t), null;
              } else
                2 * Cl() - o.renderingStartTime > Gv && a !== 536870912 && (t.flags |= 128, i = !0, Uu(o, !1), t.lanes = 4194304);
            o.isBackwards ? (f.sibling = t.child, t.child = f) : (e = o.last, e !== null ? e.sibling = f : t.child = f, o.last = f);
          }
          return o.tail !== null ? (e = o.tail, o.rendering = e, o.tail = e.sibling, o.renderingStartTime = Cl(), e.sibling = null, a = Bl.current, a = i ? a & lh | Jm : a & lh, Qe(Bl, a, t), e) : (Bt(t), null);
        case 22:
        case 23:
          return ra(t), Os(t), i = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== i && (t.flags |= 8192) : i && (t.flags |= 8192), i ? (a & 536870912) !== 0 && (t.flags & 128) === 0 && (Bt(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Bt(t), a = t.updateQueue, a !== null && hc(t, a.retryQueue), a = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), i = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (i = t.memoizedState.cachePool.pool), i !== a && (t.flags |= 2048), e !== null && ye(Yr, t), null;
        case 24:
          return a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), gu(Nl, t), Bt(t), null;
        case 25:
          return null;
        case 30:
          return null;
      }
      throw Error(
        "Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue."
      );
    }
    function Bp(e, t) {
      switch (tc(t), t.tag) {
        case 1:
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Il) !== Qt && _f(t), t) : null;
        case 3:
          return gu(Nl, t), L(t), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return ue(t), null;
        case 13:
          if (ra(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
            if (t.alternate === null)
              throw Error(
                "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
              );
            Fc();
          }
          return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Il) !== Qt && _f(t), t) : null;
        case 19:
          return ye(Bl, t), null;
        case 4:
          return L(t), null;
        case 10:
          return gu(t.type, t), null;
        case 22:
        case 23:
          return ra(t), Os(t), e !== null && ye(Yr, t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, (t.mode & Il) !== Qt && _f(t), t) : null;
        case 24:
          return gu(Nl, t), null;
        case 25:
          return null;
        default:
          return null;
      }
    }
    function gy(e, t) {
      switch (tc(t), t.tag) {
        case 3:
          gu(Nl, t), L(t);
          break;
        case 26:
        case 27:
        case 5:
          ue(t);
          break;
        case 4:
          L(t);
          break;
        case 13:
          ra(t);
          break;
        case 19:
          ye(Bl, t);
          break;
        case 10:
          gu(t.type, t);
          break;
        case 22:
        case 23:
          ra(t), Os(t), e !== null && ye(Yr, t);
          break;
        case 24:
          gu(Nl, t);
      }
    }
    function gn(e) {
      return (e.mode & Il) !== Qt;
    }
    function Sy(e, t) {
      gn(e) ? (Gl(), bo(t, e), fn()) : bo(t, e);
    }
    function Pf(e, t, a) {
      gn(e) ? (Gl(), yc(
        a,
        e,
        t
      ), fn()) : yc(
        a,
        e,
        t
      );
    }
    function bo(e, t) {
      try {
        var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
        if (i !== null) {
          var o = i.next;
          a = o;
          do {
            if ((a.tag & e) === e && ((e & ql) !== nu ? ne !== null && typeof ne.markComponentPassiveEffectMountStarted == "function" && ne.markComponentPassiveEffectMountStarted(
              t
            ) : (e & Pl) !== nu && ne !== null && typeof ne.markComponentLayoutEffectMountStarted == "function" && ne.markComponentLayoutEffectMountStarted(
              t
            ), i = void 0, (e & Ya) !== nu && (sh = !0), i = me(
              t,
              _b,
              a
            ), (e & Ya) !== nu && (sh = !1), (e & ql) !== nu ? ne !== null && typeof ne.markComponentPassiveEffectMountStopped == "function" && ne.markComponentPassiveEffectMountStopped() : (e & Pl) !== nu && ne !== null && typeof ne.markComponentLayoutEffectMountStopped == "function" && ne.markComponentLayoutEffectMountStopped(), i !== void 0 && typeof i != "function")) {
              var f = void 0;
              f = (a.tag & Pl) !== 0 ? "useLayoutEffect" : (a.tag & Ya) !== 0 ? "useInsertionEffect" : "useEffect";
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

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching` : " You returned: " + i, me(
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
            a = a.next;
          } while (a !== o);
        }
      } catch (h) {
        At(t, t.return, h);
      }
    }
    function yc(e, t, a) {
      try {
        var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
        if (o !== null) {
          var f = o.next;
          i = f;
          do {
            if ((i.tag & e) === e) {
              var d = i.inst, h = d.destroy;
              h !== void 0 && (d.destroy = void 0, (e & ql) !== nu ? ne !== null && typeof ne.markComponentPassiveEffectUnmountStarted == "function" && ne.markComponentPassiveEffectUnmountStarted(
                t
              ) : (e & Pl) !== nu && ne !== null && typeof ne.markComponentLayoutEffectUnmountStarted == "function" && ne.markComponentLayoutEffectUnmountStarted(
                t
              ), (e & Ya) !== nu && (sh = !0), o = t, me(
                o,
                Cb,
                o,
                a,
                h
              ), (e & Ya) !== nu && (sh = !1), (e & ql) !== nu ? ne !== null && typeof ne.markComponentPassiveEffectUnmountStopped == "function" && ne.markComponentPassiveEffectUnmountStopped() : (e & Pl) !== nu && ne !== null && typeof ne.markComponentLayoutEffectUnmountStopped == "function" && ne.markComponentLayoutEffectUnmountStopped());
            }
            i = i.next;
          } while (i !== f);
        }
      } catch (v) {
        At(t, t.return, v);
      }
    }
    function Ks(e, t) {
      gn(e) ? (Gl(), bo(t, e), fn()) : bo(t, e);
    }
    function Js(e, t, a) {
      gn(e) ? (Gl(), yc(
        a,
        e,
        t
      ), fn()) : yc(
        a,
        e,
        t
      );
    }
    function by(e) {
      var t = e.updateQueue;
      if (t !== null) {
        var a = e.stateNode;
        e.type.defaultProps || "ref" in e.memoizedProps || nh || (a.props !== e.memoizedProps && console.error(
          "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          pe(e) || "instance"
        ), a.state !== e.memoizedState && console.error(
          "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          pe(e) || "instance"
        ));
        try {
          me(
            e,
            ua,
            t,
            a
          );
        } catch (i) {
          At(e, e.return, i);
        }
      }
    }
    function bg(e, t, a) {
      return e.getSnapshotBeforeUpdate(t, a);
    }
    function Ty(e, t) {
      var a = t.memoizedProps, i = t.memoizedState;
      t = e.stateNode, e.type.defaultProps || "ref" in e.memoizedProps || nh || (t.props !== e.memoizedProps && console.error(
        "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
        pe(e) || "instance"
      ), t.state !== e.memoizedState && console.error(
        "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
        pe(e) || "instance"
      ));
      try {
        var o = yi(
          e.type,
          a,
          e.elementType === e.type
        ), f = me(
          e,
          bg,
          t,
          o,
          i
        );
        a = KS, f !== void 0 || a.has(e.type) || (a.add(e.type), me(e, function() {
          console.error(
            "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
            pe(e)
          );
        })), t.__reactInternalSnapshotBeforeUpdate = f;
      } catch (d) {
        At(e, e.return, d);
      }
    }
    function Ey(e, t, a) {
      a.props = yi(
        e.type,
        e.memoizedProps
      ), a.state = e.memoizedState, gn(e) ? (Gl(), me(
        e,
        SS,
        e,
        t,
        a
      ), fn()) : me(
        e,
        SS,
        e,
        t,
        a
      );
    }
    function Yp(e) {
      var t = e.ref;
      if (t !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        if (typeof t == "function")
          if (gn(e))
            try {
              Gl(), e.refCleanup = t(a);
            } finally {
              fn();
            }
          else e.refCleanup = t(a);
        else
          typeof t == "string" ? console.error("String refs are no longer supported.") : t.hasOwnProperty("current") || console.error(
            "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
            pe(e)
          ), t.current = a;
      }
    }
    function mc(e, t) {
      try {
        me(e, Yp, e);
      } catch (a) {
        At(e, t, a);
      }
    }
    function Sn(e, t) {
      var a = e.ref, i = e.refCleanup;
      if (a !== null)
        if (typeof i == "function")
          try {
            if (gn(e))
              try {
                Gl(), me(e, i);
              } finally {
                fn(e);
              }
            else me(e, i);
          } catch (o) {
            At(e, t, o);
          } finally {
            e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
          }
        else if (typeof a == "function")
          try {
            if (gn(e))
              try {
                Gl(), me(e, a, null);
              } finally {
                fn(e);
              }
            else me(e, a, null);
          } catch (o) {
            At(e, t, o);
          }
        else a.current = null;
    }
    function Ay(e, t, a, i) {
      var o = e.memoizedProps, f = o.id, d = o.onCommit;
      o = o.onRender, t = t === null ? "mount" : "update", Mv && (t = "nested-update"), typeof o == "function" && o(
        f,
        t,
        e.actualDuration,
        e.treeBaseDuration,
        e.actualStartTime,
        a
      ), typeof d == "function" && d(
        e.memoizedProps.id,
        t,
        i,
        a
      );
    }
    function Tg(e, t, a, i) {
      var o = e.memoizedProps;
      e = o.id, o = o.onPostCommit, t = t === null ? "mount" : "update", Mv && (t = "nested-update"), typeof o == "function" && o(
        e,
        t,
        i,
        a
      );
    }
    function wp(e) {
      var t = e.type, a = e.memoizedProps, i = e.stateNode;
      try {
        me(
          e,
          Ft,
          i,
          t,
          a,
          e
        );
      } catch (o) {
        At(e, e.return, o);
      }
    }
    function ks(e, t, a) {
      try {
        me(
          e,
          Ai,
          e.stateNode,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        At(e, e.return, i);
      }
    }
    function To(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && dl(e.type) || e.tag === 4;
    }
    function er(e) {
      e: for (; ; ) {
        for (; e.sibling === null; ) {
          if (e.return === null || To(e.return)) return null;
          e = e.return;
        }
        for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
          if (e.tag === 27 && dl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
          e.child.return = e, e = e.child;
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function Eo(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a).insertBefore(e, t) : (t = a.nodeType === 9 ? a.body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(e), a = a._reactRootContainer, a != null || t.onclick !== null || (t.onclick = bi));
      else if (i !== 4 && (i === 27 && dl(e.type) && (a = e.stateNode, t = null), e = e.child, e !== null))
        for (Eo(e, t, a), e = e.sibling; e !== null; )
          Eo(e, t, a), e = e.sibling;
    }
    function tr(e, t, a) {
      var i = e.tag;
      if (i === 5 || i === 6)
        e = e.stateNode, t ? a.insertBefore(e, t) : a.appendChild(e);
      else if (i !== 4 && (i === 27 && dl(e.type) && (a = e.stateNode), e = e.child, e !== null))
        for (tr(e, t, a), e = e.sibling; e !== null; )
          tr(e, t, a), e = e.sibling;
    }
    function jp(e) {
      for (var t, a = e.return; a !== null; ) {
        if (To(a)) {
          t = a;
          break;
        }
        a = a.return;
      }
      if (t == null)
        throw Error(
          "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
        );
      switch (t.tag) {
        case 27:
          t = t.stateNode, a = er(e), tr(
            e,
            a,
            t
          );
          break;
        case 5:
          a = t.stateNode, t.flags & 32 && (Ri(a), t.flags &= -33), t = er(e), tr(
            e,
            t,
            a
          );
          break;
        case 3:
        case 4:
          t = t.stateNode.containerInfo, a = er(e), Eo(
            e,
            a,
            t
          );
          break;
        default:
          throw Error(
            "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
          );
      }
    }
    function lr(e) {
      var t = e.stateNode, a = e.memoizedProps;
      try {
        me(
          e,
          ev,
          e.type,
          a,
          t,
          e
        );
      } catch (i) {
        At(e, e.return, i);
      }
    }
    function Gp(e, t) {
      if (e = e.containerInfo, R0 = lg, e = zp(e), Nh(e)) {
        if ("selectionStart" in e)
          var a = {
            start: e.selectionStart,
            end: e.selectionEnd
          };
        else
          e: {
            a = (a = e.ownerDocument) && a.defaultView || window;
            var i = a.getSelection && a.getSelection();
            if (i && i.rangeCount !== 0) {
              a = i.anchorNode;
              var o = i.anchorOffset, f = i.focusNode;
              i = i.focusOffset;
              try {
                a.nodeType, f.nodeType;
              } catch {
                a = null;
                break e;
              }
              var d = 0, h = -1, v = -1, g = 0, B = 0, G = e, x = null;
              t: for (; ; ) {
                for (var V; G !== a || o !== 0 && G.nodeType !== 3 || (h = d + o), G !== f || i !== 0 && G.nodeType !== 3 || (v = d + i), G.nodeType === 3 && (d += G.nodeValue.length), (V = G.firstChild) !== null; )
                  x = G, G = V;
                for (; ; ) {
                  if (G === e) break t;
                  if (x === a && ++g === o && (h = d), x === f && ++B === i && (v = d), (V = G.nextSibling) !== null) break;
                  G = x, x = G.parentNode;
                }
                G = V;
              }
              a = h === -1 || v === -1 ? null : { start: h, end: v };
            } else a = null;
          }
        a = a || { start: 0, end: 0 };
      } else a = null;
      for (O0 = {
        focusedElem: e,
        selectionRange: a
      }, lg = !1, Zl = t; Zl !== null; )
        if (t = Zl, e = t.child, (t.subtreeFlags & 1024) !== 0 && e !== null)
          e.return = t, Zl = e;
        else
          for (; Zl !== null; ) {
            switch (e = t = Zl, a = e.alternate, o = e.flags, e.tag) {
              case 0:
                break;
              case 11:
              case 15:
                break;
              case 1:
                (o & 1024) !== 0 && a !== null && Ty(e, a);
                break;
              case 3:
                if ((o & 1024) !== 0) {
                  if (e = e.stateNode.containerInfo, a = e.nodeType, a === 9)
                    Qn(e);
                  else if (a === 1)
                    switch (e.nodeName) {
                      case "HEAD":
                      case "HTML":
                      case "BODY":
                        Qn(e);
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
              e.return = t.return, Zl = e;
              break;
            }
            Zl = t.return;
          }
    }
    function Ry(e, t, a) {
      var i = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          ul(e, a), i & 4 && Sy(a, Pl | uu);
          break;
        case 1:
          if (ul(e, a), i & 4)
            if (e = a.stateNode, t === null)
              a.type.defaultProps || "ref" in a.memoizedProps || nh || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                pe(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                pe(a) || "instance"
              )), gn(a) ? (Gl(), me(
                a,
                Ig,
                a,
                e
              ), fn()) : me(
                a,
                Ig,
                a,
                e
              );
            else {
              var o = yi(
                a.type,
                t.memoizedProps
              );
              t = t.memoizedState, a.type.defaultProps || "ref" in a.memoizedProps || nh || (e.props !== a.memoizedProps && console.error(
                "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                pe(a) || "instance"
              ), e.state !== a.memoizedState && console.error(
                "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                pe(a) || "instance"
              )), gn(a) ? (Gl(), me(
                a,
                pS,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              ), fn()) : me(
                a,
                pS,
                a,
                e,
                o,
                t,
                e.__reactInternalSnapshotBeforeUpdate
              );
            }
          i & 64 && by(a), i & 512 && mc(a, a.return);
          break;
        case 3:
          if (t = Oa(), ul(e, a), i & 64 && (i = a.updateQueue, i !== null)) {
            if (o = null, a.child !== null)
              switch (a.child.tag) {
                case 27:
                case 5:
                  o = a.child.stateNode;
                  break;
                case 1:
                  o = a.child.stateNode;
              }
            try {
              me(
                a,
                ua,
                i,
                o
              );
            } catch (d) {
              At(a, a.return, d);
            }
          }
          e.effectDuration += Pc(t);
          break;
        case 27:
          t === null && i & 4 && lr(a);
        case 26:
        case 5:
          ul(e, a), t === null && i & 4 && wp(a), i & 512 && mc(a, a.return);
          break;
        case 12:
          if (i & 4) {
            i = Oa(), ul(e, a), e = a.stateNode, e.effectDuration += eo(i);
            try {
              me(
                a,
                Ay,
                a,
                t,
                zv,
                e.effectDuration
              );
            } catch (d) {
              At(a, a.return, d);
            }
          } else ul(e, a);
          break;
        case 13:
          ul(e, a), i & 4 && ar(e, a), i & 64 && (e = a.memoizedState, e !== null && (e = e.dehydrated, e !== null && (a = gi.bind(
            null,
            a
          ), No(e, a))));
          break;
        case 22:
          if (i = a.memoizedState !== null || xc, !i) {
            t = t !== null && t.memoizedState !== null || yl, o = xc;
            var f = yl;
            xc = i, (yl = t) && !f ? Ll(
              e,
              a,
              (a.subtreeFlags & 8772) !== 0
            ) : ul(e, a), xc = o, yl = f;
          }
          break;
        case 30:
          break;
        default:
          ul(e, a);
      }
    }
    function Lp(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, Lp(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && nn(t)), e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
    function sa(e, t, a) {
      for (a = a.child; a !== null; )
        Ao(
          e,
          t,
          a
        ), a = a.sibling;
    }
    function Ao(e, t, a) {
      if (Hl && typeof Hl.onCommitFiberUnmount == "function")
        try {
          Hl.onCommitFiberUnmount(Dc, a);
        } catch (f) {
          tl || (tl = !0, console.error(
            "React instrumentation encountered an error: %s",
            f
          ));
        }
      switch (a.tag) {
        case 26:
          yl || Sn(a, t), sa(
            e,
            t,
            a
          ), a.memoizedState ? a.memoizedState.count-- : a.stateNode && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          yl || Sn(a, t);
          var i = Rl, o = ln;
          dl(a.type) && (Rl = a.stateNode, ln = !1), sa(
            e,
            t,
            a
          ), me(
            a,
            Bo,
            a.stateNode
          ), Rl = i, ln = o;
          break;
        case 5:
          yl || Sn(a, t);
        case 6:
          if (i = Rl, o = ln, Rl = null, sa(
            e,
            t,
            a
          ), Rl = i, ln = o, Rl !== null)
            if (ln)
              try {
                me(
                  a,
                  rr,
                  Rl,
                  a.stateNode
                );
              } catch (f) {
                At(
                  a,
                  t,
                  f
                );
              }
            else
              try {
                me(
                  a,
                  xo,
                  Rl,
                  a.stateNode
                );
              } catch (f) {
                At(
                  a,
                  t,
                  f
                );
              }
          break;
        case 18:
          Rl !== null && (ln ? (e = Rl, Fl(
            e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e,
            a.stateNode
          ), Lo(e)) : Fl(Rl, a.stateNode));
          break;
        case 4:
          i = Rl, o = ln, Rl = a.stateNode.containerInfo, ln = !0, sa(
            e,
            t,
            a
          ), Rl = i, ln = o;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          yl || yc(
            Ya,
            a,
            t
          ), yl || Pf(
            a,
            t,
            Pl
          ), sa(
            e,
            t,
            a
          );
          break;
        case 1:
          yl || (Sn(a, t), i = a.stateNode, typeof i.componentWillUnmount == "function" && Ey(
            a,
            t,
            i
          )), sa(
            e,
            t,
            a
          );
          break;
        case 21:
          sa(
            e,
            t,
            a
          );
          break;
        case 22:
          yl = (i = yl) || a.memoizedState !== null, sa(
            e,
            t,
            a
          ), yl = i;
          break;
        default:
          sa(
            e,
            t,
            a
          );
      }
    }
    function ar(e, t) {
      if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null))))
        try {
          me(
            t,
            Pp,
            e
          );
        } catch (a) {
          At(t, t.return, a);
        }
    }
    function nr(e) {
      switch (e.tag) {
        case 13:
        case 19:
          var t = e.stateNode;
          return t === null && (t = e.stateNode = new JS()), t;
        case 22:
          return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new JS()), t;
        default:
          throw Error(
            "Unexpected Suspense handler tag (" + e.tag + "). This is a bug in React."
          );
      }
    }
    function Ro(e, t) {
      var a = nr(e);
      t.forEach(function(i) {
        var o = Jp.bind(null, e, i);
        if (!a.has(i)) {
          if (a.add(i), en)
            if (uh !== null && ih !== null)
              Sc(ih, uh);
            else
              throw Error(
                "Expected finished root and lanes to be set. This is a bug in React."
              );
          i.then(o, o);
        }
      });
    }
    function da(e, t) {
      var a = t.deletions;
      if (a !== null)
        for (var i = 0; i < a.length; i++) {
          var o = e, f = t, d = a[i], h = f;
          e: for (; h !== null; ) {
            switch (h.tag) {
              case 27:
                if (dl(h.type)) {
                  Rl = h.stateNode, ln = !1;
                  break e;
                }
                break;
              case 5:
                Rl = h.stateNode, ln = !1;
                break e;
              case 3:
              case 4:
                Rl = h.stateNode.containerInfo, ln = !0;
                break e;
            }
            h = h.return;
          }
          if (Rl === null)
            throw Error(
              "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
            );
          Ao(o, f, d), Rl = null, ln = !1, o = d, f = o.alternate, f !== null && (f.return = null), o.return = null;
        }
      if (t.subtreeFlags & 13878)
        for (t = t.child; t !== null; )
          Oy(t, e), t = t.sibling;
    }
    function Oy(e, t) {
      var a = e.alternate, i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          da(t, e), vl(e), i & 4 && (yc(
            Ya | uu,
            e,
            e.return
          ), bo(Ya | uu, e), Pf(
            e,
            e.return,
            Pl | uu
          ));
          break;
        case 1:
          da(t, e), vl(e), i & 512 && (yl || a === null || Sn(a, a.return)), i & 64 && xc && (e = e.updateQueue, e !== null && (i = e.callbacks, i !== null && (a = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = a === null ? i : a.concat(i))));
          break;
        case 26:
          var o = Wu;
          if (da(t, e), vl(e), i & 512 && (yl || a === null || Sn(a, a.return)), i & 4)
            if (t = a !== null ? a.memoizedState : null, i = e.memoizedState, a === null)
              if (i === null)
                if (e.stateNode === null) {
                  e: {
                    i = e.type, a = e.memoizedProps, t = o.ownerDocument || o;
                    t: switch (i) {
                      case "title":
                        o = t.getElementsByTagName("title")[0], (!o || o[Ar] || o[Xl] || o.namespaceURI === Ku || o.hasAttribute("itemprop")) && (o = t.createElement(i), t.head.insertBefore(
                          o,
                          t.querySelector("head > title")
                        )), Sl(o, i, a), o[Xl] = e, z(o), i = o;
                        break e;
                      case "link":
                        var f = nm(
                          "link",
                          "href",
                          t
                        ).get(i + (a.href || ""));
                        if (f) {
                          for (var d = 0; d < f.length; d++)
                            if (o = f[d], o.getAttribute("href") === (a.href == null || a.href === "" ? null : a.href) && o.getAttribute("rel") === (a.rel == null ? null : a.rel) && o.getAttribute("title") === (a.title == null ? null : a.title) && o.getAttribute("crossorigin") === (a.crossOrigin == null ? null : a.crossOrigin)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Sl(o, i, a), t.head.appendChild(o);
                        break;
                      case "meta":
                        if (f = nm(
                          "meta",
                          "content",
                          t
                        ).get(i + (a.content || ""))) {
                          for (d = 0; d < f.length; d++)
                            if (o = f[d], Q(
                              a.content,
                              "content"
                            ), o.getAttribute("content") === (a.content == null ? null : "" + a.content) && o.getAttribute("name") === (a.name == null ? null : a.name) && o.getAttribute("property") === (a.property == null ? null : a.property) && o.getAttribute("http-equiv") === (a.httpEquiv == null ? null : a.httpEquiv) && o.getAttribute("charset") === (a.charSet == null ? null : a.charSet)) {
                              f.splice(d, 1);
                              break t;
                            }
                        }
                        o = t.createElement(i), Sl(o, i, a), t.head.appendChild(o);
                        break;
                      default:
                        throw Error(
                          'getNodesForType encountered a type it did not expect: "' + i + '". This is a bug in React.'
                        );
                    }
                    o[Xl] = e, z(o), i = o;
                  }
                  e.stateNode = i;
                } else
                  Ac(
                    o,
                    e.type,
                    e.stateNode
                  );
              else
                e.stateNode = lv(
                  o,
                  i,
                  e.memoizedProps
                );
            else
              t !== i ? (t === null ? a.stateNode !== null && (a = a.stateNode, a.parentNode.removeChild(a)) : t.count--, i === null ? Ac(
                o,
                e.type,
                e.stateNode
              ) : lv(
                o,
                i,
                e.memoizedProps
              )) : i === null && e.stateNode !== null && ks(
                e,
                e.memoizedProps,
                a.memoizedProps
              );
          break;
        case 27:
          da(t, e), vl(e), i & 512 && (yl || a === null || Sn(a, a.return)), a !== null && i & 4 && ks(
            e,
            e.memoizedProps,
            a.memoizedProps
          );
          break;
        case 5:
          if (da(t, e), vl(e), i & 512 && (yl || a === null || Sn(a, a.return)), e.flags & 32) {
            t = e.stateNode;
            try {
              me(e, Ri, t);
            } catch (B) {
              At(e, e.return, B);
            }
          }
          i & 4 && e.stateNode != null && (t = e.memoizedProps, ks(
            e,
            t,
            a !== null ? a.memoizedProps : t
          )), i & 1024 && (u0 = !0, e.type !== "form" && console.error(
            "Unexpected host component type. Expected a form. This is a bug in React."
          ));
          break;
        case 6:
          if (da(t, e), vl(e), i & 4) {
            if (e.stateNode === null)
              throw Error(
                "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
              );
            i = e.memoizedProps, a = a !== null ? a.memoizedProps : i, t = e.stateNode;
            try {
              me(
                e,
                Iy,
                t,
                a,
                i
              );
            } catch (B) {
              At(e, e.return, B);
            }
          }
          break;
        case 3:
          if (o = Oa(), Pv = null, f = Wu, Wu = sd(t.containerInfo), da(t, e), Wu = f, vl(e), i & 4 && a !== null && a.memoizedState.isDehydrated)
            try {
              me(
                e,
                Ha,
                t.containerInfo
              );
            } catch (B) {
              At(e, e.return, B);
            }
          u0 && (u0 = !1, Dy(e)), t.effectDuration += Pc(o);
          break;
        case 4:
          i = Wu, Wu = sd(
            e.stateNode.containerInfo
          ), da(t, e), vl(e), Wu = i;
          break;
        case 12:
          i = Oa(), da(t, e), vl(e), e.stateNode.effectDuration += eo(i);
          break;
        case 13:
          da(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (a !== null && a.memoizedState !== null) && (s0 = Cl()), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Ro(e, i)));
          break;
        case 22:
          o = e.memoizedState !== null;
          var h = a !== null && a.memoizedState !== null, v = xc, g = yl;
          if (xc = v || o, yl = g || h, da(t, e), yl = g, xc = v, vl(e), i & 8192)
            e: for (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | wg, o && (a === null || h || xc || yl || ha(e)), a = null, t = e; ; ) {
              if (t.tag === 5 || t.tag === 26) {
                if (a === null) {
                  h = a = t;
                  try {
                    f = h.stateNode, o ? me(h, Py, f) : me(
                      h,
                      cd,
                      h.stateNode,
                      h.memoizedProps
                    );
                  } catch (B) {
                    At(h, h.return, B);
                  }
                }
              } else if (t.tag === 6) {
                if (a === null) {
                  h = t;
                  try {
                    d = h.stateNode, o ? me(h, em, d) : me(
                      h,
                      od,
                      d,
                      h.memoizedProps
                    );
                  } catch (B) {
                    At(h, h.return, B);
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
                a === t && (a = null), t = t.return;
              }
              a === t && (a = null), t.sibling.return = t.return, t = t.sibling;
            }
          i & 4 && (i = e.updateQueue, i !== null && (a = i.retryQueue, a !== null && (i.retryQueue = null, Ro(e, a))));
          break;
        case 19:
          da(t, e), vl(e), i & 4 && (i = e.updateQueue, i !== null && (e.updateQueue = null, Ro(e, i)));
          break;
        case 30:
          break;
        case 21:
          break;
        default:
          da(t, e), vl(e);
      }
    }
    function vl(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          me(e, jp, e);
        } catch (a) {
          At(e, e.return, a);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function Dy(e) {
      if (e.subtreeFlags & 1024)
        for (e = e.child; e !== null; ) {
          var t = e;
          Dy(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
        }
    }
    function ul(e, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null; )
          Ry(e, t.alternate, t), t = t.sibling;
    }
    function bn(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          Pf(
            e,
            e.return,
            Pl
          ), ha(e);
          break;
        case 1:
          Sn(e, e.return);
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Ey(
            e,
            e.return,
            t
          ), ha(e);
          break;
        case 27:
          me(
            e,
            Bo,
            e.stateNode
          );
        case 26:
        case 5:
          Sn(e, e.return), ha(e);
          break;
        case 22:
          e.memoizedState === null && ha(e);
          break;
        case 30:
          ha(e);
          break;
        default:
          ha(e);
      }
    }
    function ha(e) {
      for (e = e.child; e !== null; )
        bn(e), e = e.sibling;
    }
    function zy(e, t, a, i) {
      var o = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          Ll(
            e,
            a,
            i
          ), Sy(a, Pl);
          break;
        case 1:
          if (Ll(
            e,
            a,
            i
          ), t = a.stateNode, typeof t.componentDidMount == "function" && me(
            a,
            Ig,
            a,
            t
          ), t = a.updateQueue, t !== null) {
            e = a.stateNode;
            try {
              me(
                a,
                Sg,
                t,
                e
              );
            } catch (f) {
              At(a, a.return, f);
            }
          }
          i && o & 64 && by(a), mc(a, a.return);
          break;
        case 27:
          lr(a);
        case 26:
        case 5:
          Ll(
            e,
            a,
            i
          ), i && t === null && o & 4 && wp(a), mc(a, a.return);
          break;
        case 12:
          if (i && o & 4) {
            o = Oa(), Ll(
              e,
              a,
              i
            ), i = a.stateNode, i.effectDuration += eo(o);
            try {
              me(
                a,
                Ay,
                a,
                t,
                zv,
                i.effectDuration
              );
            } catch (f) {
              At(a, a.return, f);
            }
          } else
            Ll(
              e,
              a,
              i
            );
          break;
        case 13:
          Ll(
            e,
            a,
            i
          ), i && o & 4 && ar(e, a);
          break;
        case 22:
          a.memoizedState === null && Ll(
            e,
            a,
            i
          ), mc(a, a.return);
          break;
        case 30:
          break;
        default:
          Ll(
            e,
            a,
            i
          );
      }
    }
    function Ll(e, t, a) {
      for (a = a && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; )
        zy(
          e,
          t.alternate,
          t,
          a
        ), t = t.sibling;
    }
    function Tn(e, t) {
      var a = null;
      e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (a = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== a && (e != null && Za(e), a != null && nc(a));
    }
    function el(e, t) {
      e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (Za(t), e != null && nc(e));
    }
    function Ma(e, t, a, i) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; )
          $s(
            e,
            t,
            a,
            i
          ), t = t.sibling;
    }
    function $s(e, t, a, i) {
      var o = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          Ma(
            e,
            t,
            a,
            i
          ), o & 2048 && Ks(t, ql | uu);
          break;
        case 1:
          Ma(
            e,
            t,
            a,
            i
          );
          break;
        case 3:
          var f = Oa();
          Ma(
            e,
            t,
            a,
            i
          ), o & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (Za(t), a != null && nc(a))), e.passiveEffectDuration += Pc(f);
          break;
        case 12:
          if (o & 2048) {
            o = Oa(), Ma(
              e,
              t,
              a,
              i
            ), e = t.stateNode, e.passiveEffectDuration += eo(o);
            try {
              me(
                t,
                Tg,
                t,
                t.alternate,
                zv,
                e.passiveEffectDuration
              );
            } catch (h) {
              At(t, t.return, h);
            }
          } else
            Ma(
              e,
              t,
              a,
              i
            );
          break;
        case 13:
          Ma(
            e,
            t,
            a,
            i
          );
          break;
        case 23:
          break;
        case 22:
          f = t.stateNode;
          var d = t.alternate;
          t.memoizedState !== null ? f._visibility & Hr ? Ma(
            e,
            t,
            a,
            i
          ) : Oo(
            e,
            t
          ) : f._visibility & Hr ? Ma(
            e,
            t,
            a,
            i
          ) : (f._visibility |= Hr, pi(
            e,
            t,
            a,
            i,
            (t.subtreeFlags & 10256) !== 0
          )), o & 2048 && Tn(d, t);
          break;
        case 24:
          Ma(
            e,
            t,
            a,
            i
          ), o & 2048 && el(t.alternate, t);
          break;
        default:
          Ma(
            e,
            t,
            a,
            i
          );
      }
    }
    function pi(e, t, a, i, o) {
      for (o = o && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; )
        My(
          e,
          t,
          a,
          i,
          o
        ), t = t.sibling;
    }
    function My(e, t, a, i, o) {
      var f = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          pi(
            e,
            t,
            a,
            i,
            o
          ), Ks(t, ql);
          break;
        case 23:
          break;
        case 22:
          var d = t.stateNode;
          t.memoizedState !== null ? d._visibility & Hr ? pi(
            e,
            t,
            a,
            i,
            o
          ) : Oo(
            e,
            t
          ) : (d._visibility |= Hr, pi(
            e,
            t,
            a,
            i,
            o
          )), o && f & 2048 && Tn(
            t.alternate,
            t
          );
          break;
        case 24:
          pi(
            e,
            t,
            a,
            i,
            o
          ), o && f & 2048 && el(t.alternate, t);
          break;
        default:
          pi(
            e,
            t,
            a,
            i,
            o
          );
      }
    }
    function Oo(e, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null; ) {
          var a = e, i = t, o = i.flags;
          switch (i.tag) {
            case 22:
              Oo(
                a,
                i
              ), o & 2048 && Tn(
                i.alternate,
                i
              );
              break;
            case 24:
              Oo(
                a,
                i
              ), o & 2048 && el(
                i.alternate,
                i
              );
              break;
            default:
              Oo(
                a,
                i
              );
          }
          t = t.sibling;
        }
    }
    function Wa(e) {
      if (e.subtreeFlags & km)
        for (e = e.child; e !== null; )
          ur(e), e = e.sibling;
    }
    function ur(e) {
      switch (e.tag) {
        case 26:
          Wa(e), e.flags & km && e.memoizedState !== null && nv(
            Wu,
            e.memoizedState,
            e.memoizedProps
          );
          break;
        case 5:
          Wa(e);
          break;
        case 3:
        case 4:
          var t = Wu;
          Wu = sd(
            e.stateNode.containerInfo
          ), Wa(e), Wu = t;
          break;
        case 22:
          e.memoizedState === null && (t = e.alternate, t !== null && t.memoizedState !== null ? (t = km, km = 16777216, Wa(e), km = t) : Wa(e));
          break;
        default:
          Wa(e);
      }
    }
    function Uy(e) {
      var t = e.alternate;
      if (t !== null && (e = t.child, e !== null)) {
        t.child = null;
        do
          t = e.sibling, e.sibling = null, e = t;
        while (e !== null);
      }
    }
    function Do(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Zl = i, Ws(
              i,
              e
            );
          }
        Uy(e);
      }
      if (e.subtreeFlags & 10256)
        for (e = e.child; e !== null; )
          _y(e), e = e.sibling;
    }
    function _y(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Do(e), e.flags & 2048 && Js(
            e,
            e.return,
            ql | uu
          );
          break;
        case 3:
          var t = Oa();
          Do(e), e.stateNode.passiveEffectDuration += Pc(t);
          break;
        case 12:
          t = Oa(), Do(e), e.stateNode.passiveEffectDuration += eo(t);
          break;
        case 22:
          t = e.stateNode, e.memoizedState !== null && t._visibility & Hr && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, pc(e)) : Do(e);
          break;
        default:
          Do(e);
      }
    }
    function pc(e) {
      var t = e.deletions;
      if ((e.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var i = t[a];
            Zl = i, Ws(
              i,
              e
            );
          }
        Uy(e);
      }
      for (e = e.child; e !== null; )
        Cy(e), e = e.sibling;
    }
    function Cy(e) {
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          Js(
            e,
            e.return,
            ql
          ), pc(e);
          break;
        case 22:
          var t = e.stateNode;
          t._visibility & Hr && (t._visibility &= -3, pc(e));
          break;
        default:
          pc(e);
      }
    }
    function Ws(e, t) {
      for (; Zl !== null; ) {
        var a = Zl, i = a;
        switch (i.tag) {
          case 0:
          case 11:
          case 15:
            Js(
              i,
              t,
              ql
            );
            break;
          case 23:
          case 22:
            i.memoizedState !== null && i.memoizedState.cachePool !== null && (i = i.memoizedState.cachePool.pool, i != null && Za(i));
            break;
          case 24:
            nc(i.memoizedState.cache);
        }
        if (i = a.child, i !== null) i.return = a, Zl = i;
        else
          e: for (a = e; Zl !== null; ) {
            i = Zl;
            var o = i.sibling, f = i.return;
            if (Lp(i), i === a) {
              Zl = null;
              break e;
            }
            if (o !== null) {
              o.return = f, Zl = o;
              break e;
            }
            Zl = f;
          }
      }
    }
    function Vp() {
      xb.forEach(function(e) {
        return e();
      });
    }
    function Hy() {
      var e = typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0;
      return e || q.actQueue === null || console.error(
        "The current testing environment is not configured to support act(...)"
      ), e;
    }
    function Ua(e) {
      if ((bt & wa) !== Cn && tt !== 0)
        return tt & -tt;
      var t = q.T;
      return t !== null ? (t._updatedFibers || (t._updatedFibers = /* @__PURE__ */ new Set()), t._updatedFibers.add(e), e = Br, e !== 0 ? e : ud()) : hf();
    }
    function xy() {
      xn === 0 && (xn = (tt & 536870912) === 0 || ft ? Ne() : 536870912);
      var e = cu.current;
      return e !== null && (e.flags |= 32), xn;
    }
    function $e(e, t, a) {
      if (sh && console.error("useInsertionEffect must not schedule updates."), p0 && (Lv = !0), (e === jt && (zt === Lr || zt === Vr) || e.cancelPendingCommit !== null) && (Cu(e, 0), _u(
        e,
        tt,
        xn,
        !1
      )), Iu(e, a), (bt & wa) !== 0 && e === jt) {
        if ($n)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              e = Pe && pe(Pe) || "Unknown", a1.has(e) || (a1.add(e), t = pe(t) || "Unknown", console.error(
                "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                t,
                e,
                e
              ));
              break;
            case 1:
              l1 || (console.error(
                "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
              ), l1 = !0);
          }
      } else
        en && Ol(e, t, a), Qy(t), e === jt && ((bt & wa) === Cn && (lf |= a), ol === Gr && _u(
          e,
          tt,
          xn,
          !1
        )), Fa(e);
    }
    function gl(e, t, a) {
      if ((bt & (wa | Fu)) !== Cn)
        throw Error("Should not already be working.");
      var i = !a && (t & 124) === 0 && (t & e.expiredLanes) === 0 || du(e, t), o = i ? Yy(e, t) : ir(e, t, !0), f = i;
      do {
        if (o === Nc) {
          fh && !i && _u(e, t, 0, !1);
          break;
        } else {
          if (a = e.current.alternate, f && !Xp(a)) {
            o = ir(e, t, !1), f = !1;
            continue;
          }
          if (o === ch) {
            if (f = t, e.errorRecoveryDisabledLanes & f)
              var d = 0;
            else
              d = e.pendingLanes & -536870913, d = d !== 0 ? d : d & 536870912 ? 536870912 : 0;
            if (d !== 0) {
              t = d;
              e: {
                o = e;
                var h = d;
                d = ep;
                var v = o.current.memoizedState.isDehydrated;
                if (v && (Cu(
                  o,
                  h
                ).flags |= 256), h = ir(
                  o,
                  h,
                  !1
                ), h !== ch) {
                  if (f0 && !v) {
                    o.errorRecoveryDisabledLanes |= f, lf |= f, o = Gr;
                    break e;
                  }
                  o = ja, ja = d, o !== null && (ja === null ? ja = o : ja.push.apply(
                    ja,
                    o
                  ));
                }
                o = h;
              }
              if (f = !1, o !== ch) continue;
            }
          }
          if (o === Wm) {
            Cu(e, 0), _u(e, t, 0, !0);
            break;
          }
          e: {
            switch (i = e, o) {
              case Nc:
              case Wm:
                throw Error("Root did not complete. This is a bug in React.");
              case Gr:
                if ((t & 4194048) !== t) break;
              case wv:
                _u(
                  i,
                  t,
                  xn,
                  !ef
                );
                break e;
              case ch:
                ja = null;
                break;
              case i0:
              case kS:
                break;
              default:
                throw Error("Unknown root exit status.");
            }
            if (q.actQueue !== null)
              En(
                i,
                a,
                t,
                ja,
                tp,
                jv,
                xn,
                lf,
                Xr
              );
            else {
              if ((t & 62914560) === t && (f = s0 + WS - Cl(), 10 < f)) {
                if (_u(
                  i,
                  t,
                  xn,
                  !ef
                ), su(i, 0, !0) !== 0) break e;
                i.timeoutHandle = s1(
                  Ny.bind(
                    null,
                    i,
                    a,
                    ja,
                    tp,
                    jv,
                    t,
                    xn,
                    lf,
                    Xr,
                    ef,
                    o,
                    Yb,
                    I0,
                    0
                  ),
                  f
                );
                break e;
              }
              Ny(
                i,
                a,
                ja,
                tp,
                jv,
                t,
                xn,
                lf,
                Xr,
                ef,
                o,
                qb,
                I0,
                0
              );
            }
          }
        }
        break;
      } while (!0);
      Fa(e);
    }
    function Ny(e, t, a, i, o, f, d, h, v, g, B, G, x, V) {
      if (e.timeoutHandle = kr, G = t.subtreeFlags, (G & 8192 || (G & 16785408) === 16785408) && (cp = { stylesheets: null, count: 0, unsuspend: av }, ur(t), G = uv(), G !== null)) {
        e.cancelPendingCommit = G(
          En.bind(
            null,
            e,
            t,
            f,
            a,
            i,
            o,
            d,
            h,
            v,
            B,
            Bb,
            x,
            V
          )
        ), _u(
          e,
          f,
          d,
          !g
        );
        return;
      }
      En(
        e,
        t,
        f,
        a,
        i,
        o,
        d,
        h,
        v
      );
    }
    function Xp(e) {
      for (var t = e; ; ) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !== null && (a = a.stores, a !== null)))
          for (var i = 0; i < a.length; i++) {
            var o = a[i], f = o.getSnapshot;
            o = o.value;
            try {
              if (!qa(f(), o)) return !1;
            } catch {
              return !1;
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null)
          a.return = t, t = a;
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
    function _u(e, t, a, i) {
      t &= ~r0, t &= ~lf, e.suspendedLanes |= t, e.pingedLanes &= ~t, i && (e.warmLanes |= t), i = e.expirationTimes;
      for (var o = t; 0 < o; ) {
        var f = 31 - bl(o), d = 1 << f;
        i[f] = -1, o &= ~d;
      }
      a !== 0 && hu(e, a, t);
    }
    function vc() {
      return (bt & (wa | Fu)) === Cn ? (Si(0), !1) : !0;
    }
    function Fs() {
      if (Pe !== null) {
        if (zt === an)
          var e = Pe.return;
        else
          e = Pe, Ss(), yn(e), eh = null, Km = 0, e = Pe;
        for (; e !== null; )
          gy(e.alternate, e), e = e.return;
        Pe = null;
      }
    }
    function Cu(e, t) {
      var a = e.timeoutHandle;
      a !== kr && (e.timeoutHandle = kr, Wb(a)), a = e.cancelPendingCommit, a !== null && (e.cancelPendingCommit = null, a()), Fs(), jt = e, Pe = a = wn(e.current, null), tt = t, zt = an, Hn = null, ef = !1, fh = du(e, t), f0 = !1, ol = Nc, Xr = xn = r0 = lf = tf = 0, ja = ep = null, jv = !1, (t & 8) !== 0 && (t |= t & 32);
      var i = e.entangledLanes;
      if (i !== 0)
        for (e = e.entanglements, i &= t; 0 < i; ) {
          var o = 31 - bl(i), f = 1 << o;
          t |= e[o], i &= ~f;
        }
      return ji = t, ss(), t = W0(), 1e3 < t - $0 && (q.recentlyCreatedOwnerStacks = 0, $0 = t), ku.discardPendingWarnings(), a;
    }
    function Is(e, t) {
      Ue = null, q.H = Bv, q.getCurrentStack = null, $n = !1, xl = null, t === Vm || t === Cv ? (t = Da(), zt = Im) : t === tS ? (t = Da(), zt = $S) : zt = t === jS ? o0 : t !== null && typeof t == "object" && typeof t.then == "function" ? oh : Fm, Hn = t;
      var a = Pe;
      if (a === null)
        ol = Wm, So(
          e,
          la(t, e.current)
        );
      else
        switch (a.mode & Il && ii(a), Kl(), zt) {
          case Fm:
            ne !== null && typeof ne.markComponentErrored == "function" && ne.markComponentErrored(
              a,
              t,
              tt
            );
            break;
          case Lr:
          case Vr:
          case Im:
          case oh:
          case Pm:
            ne !== null && typeof ne.markComponentSuspended == "function" && ne.markComponentSuspended(
              a,
              t,
              tt
            );
        }
    }
    function qy() {
      var e = q.H;
      return q.H = Bv, e === null ? Bv : e;
    }
    function By() {
      var e = q.A;
      return q.A = Hb, e;
    }
    function Ps() {
      ol = Gr, ef || (tt & 4194048) !== tt && cu.current !== null || (fh = !0), (tf & 134217727) === 0 && (lf & 134217727) === 0 || jt === null || _u(
        jt,
        tt,
        xn,
        !1
      );
    }
    function ir(e, t, a) {
      var i = bt;
      bt |= wa;
      var o = qy(), f = By();
      if (jt !== e || tt !== t) {
        if (en) {
          var d = e.memoizedUpdaters;
          0 < d.size && (Sc(e, tt), d.clear()), df(e, t);
        }
        tp = null, Cu(e, t);
      }
      ru(t), t = !1, d = ol;
      e: do
        try {
          if (zt !== an && Pe !== null) {
            var h = Pe, v = Hn;
            switch (zt) {
              case o0:
                Fs(), d = wv;
                break e;
              case Im:
              case Lr:
              case Vr:
              case oh:
                cu.current === null && (t = !0);
                var g = zt;
                if (zt = an, Hn = null, gc(e, h, v, g), a && fh) {
                  d = Nc;
                  break e;
                }
                break;
              default:
                g = zt, zt = an, Hn = null, gc(e, h, v, g);
            }
          }
          ed(), d = ol;
          break;
        } catch (B) {
          Is(e, B);
        }
      while (!0);
      return t && e.shellSuspendCounter++, Ss(), bt = i, q.H = o, q.A = f, Gi(), Pe === null && (jt = null, tt = 0, ss()), d;
    }
    function ed() {
      for (; Pe !== null; ) td(Pe);
    }
    function Yy(e, t) {
      var a = bt;
      bt |= wa;
      var i = qy(), o = By();
      if (jt !== e || tt !== t) {
        if (en) {
          var f = e.memoizedUpdaters;
          0 < f.size && (Sc(e, tt), f.clear()), df(e, t);
        }
        tp = null, Gv = Cl() + FS, Cu(e, t);
      } else
        fh = du(
          e,
          t
        );
      ru(t);
      e: do
        try {
          if (zt !== an && Pe !== null)
            t: switch (t = Pe, f = Hn, zt) {
              case Fm:
                zt = an, Hn = null, gc(
                  e,
                  t,
                  f,
                  Fm
                );
                break;
              case Lr:
              case Vr:
                if (As(f)) {
                  zt = an, Hn = null, cr(t);
                  break;
                }
                t = function() {
                  zt !== Lr && zt !== Vr || jt !== e || (zt = Pm), Fa(e);
                }, f.then(t, t);
                break e;
              case Im:
                zt = Pm;
                break e;
              case $S:
                zt = c0;
                break e;
              case Pm:
                As(f) ? (zt = an, Hn = null, cr(t)) : (zt = an, Hn = null, gc(
                  e,
                  t,
                  f,
                  Pm
                ));
                break;
              case c0:
                var d = null;
                switch (Pe.tag) {
                  case 26:
                    d = Pe.memoizedState;
                  case 5:
                  case 27:
                    var h = Pe;
                    if (!d || um(d)) {
                      zt = an, Hn = null;
                      var v = h.sibling;
                      if (v !== null) Pe = v;
                      else {
                        var g = h.return;
                        g !== null ? (Pe = g, zo(g)) : Pe = null;
                      }
                      break t;
                    }
                    break;
                  default:
                    console.error(
                      "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                    );
                }
                zt = an, Hn = null, gc(
                  e,
                  t,
                  f,
                  c0
                );
                break;
              case oh:
                zt = an, Hn = null, gc(
                  e,
                  t,
                  f,
                  oh
                );
                break;
              case o0:
                Fs(), ol = wv;
                break e;
              default:
                throw Error(
                  "Unexpected SuspendedReason. This is a bug in React."
                );
            }
          q.actQueue !== null ? ed() : Qp();
          break;
        } catch (B) {
          Is(e, B);
        }
      while (!0);
      return Ss(), q.H = i, q.A = o, bt = a, Pe !== null ? (ne !== null && typeof ne.markRenderYielded == "function" && ne.markRenderYielded(), Nc) : (Gi(), jt = null, tt = 0, ss(), ol);
    }
    function Qp() {
      for (; Pe !== null && !zg(); )
        td(Pe);
    }
    function td(e) {
      var t = e.alternate;
      (e.mode & Il) !== Qt ? (bu(e), t = me(
        e,
        mi,
        t,
        e,
        ji
      ), ii(e)) : t = me(
        e,
        mi,
        t,
        e,
        ji
      ), e.memoizedProps = e.pendingProps, t === null ? zo(e) : Pe = t;
    }
    function cr(e) {
      var t = me(e, wy, e);
      e.memoizedProps = e.pendingProps, t === null ? zo(e) : Pe = t;
    }
    function wy(e) {
      var t = e.alternate, a = (e.mode & Il) !== Qt;
      switch (a && bu(e), e.tag) {
        case 15:
        case 0:
          t = oy(
            t,
            e,
            e.pendingProps,
            e.type,
            void 0,
            tt
          );
          break;
        case 11:
          t = oy(
            t,
            e,
            e.pendingProps,
            e.type.render,
            e.ref,
            tt
          );
          break;
        case 5:
          yn(e);
        default:
          gy(t, e), e = Pe = Yh(e, ji), t = mi(t, e, ji);
      }
      return a && ii(e), t;
    }
    function gc(e, t, a, i) {
      Ss(), yn(t), eh = null, Km = 0;
      var o = t.return;
      try {
        if (js(
          e,
          o,
          t,
          a,
          tt
        )) {
          ol = Wm, So(
            e,
            la(a, e.current)
          ), Pe = null;
          return;
        }
      } catch (f) {
        if (o !== null) throw Pe = o, f;
        ol = Wm, So(
          e,
          la(a, e.current)
        ), Pe = null;
        return;
      }
      t.flags & 32768 ? (ft || i === Fm ? e = !0 : fh || (tt & 536870912) !== 0 ? e = !1 : (ef = e = !0, (i === Lr || i === Vr || i === Im || i === oh) && (i = cu.current, i !== null && i.tag === 13 && (i.flags |= 16384))), jy(t, e)) : zo(t);
    }
    function zo(e) {
      var t = e;
      do {
        if ((t.flags & 32768) !== 0) {
          jy(
            t,
            ef
          );
          return;
        }
        var a = t.alternate;
        if (e = t.return, bu(t), a = me(
          t,
          qp,
          a,
          t,
          ji
        ), (t.mode & Il) !== Qt && Ts(t), a !== null) {
          Pe = a;
          return;
        }
        if (t = t.sibling, t !== null) {
          Pe = t;
          return;
        }
        Pe = t = e;
      } while (t !== null);
      ol === Nc && (ol = kS);
    }
    function jy(e, t) {
      do {
        var a = Bp(e.alternate, e);
        if (a !== null) {
          a.flags &= 32767, Pe = a;
          return;
        }
        if ((e.mode & Il) !== Qt) {
          Ts(e), a = e.actualDuration;
          for (var i = e.child; i !== null; )
            a += i.actualDuration, i = i.sibling;
          e.actualDuration = a;
        }
        if (a = e.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null), !t && (e = e.sibling, e !== null)) {
          Pe = e;
          return;
        }
        Pe = e = a;
      } while (e !== null);
      ol = wv, Pe = null;
    }
    function En(e, t, a, i, o, f, d, h, v) {
      e.cancelPendingCommit = null;
      do
        vi();
      while (ea !== Qr);
      if (ku.flushLegacyContextWarning(), ku.flushPendingUnsafeLifecycleWarnings(), (bt & (wa | Fu)) !== Cn)
        throw Error("Should not already be working.");
      if (ne !== null && typeof ne.markCommitStarted == "function" && ne.markCommitStarted(a), t === null) mt();
      else {
        if (a === 0 && console.error(
          "finishedLanes should not be empty during a commit. This is a bug in React."
        ), t === e.current)
          throw Error(
            "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
          );
        if (f = t.lanes | t.childLanes, f |= jg, Pr(
          e,
          a,
          f,
          d,
          h,
          v
        ), e === jt && (Pe = jt = null, tt = 0), rh = t, nf = e, uf = a, h0 = f, y0 = o, t1 = i, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, kp(Xo, function() {
          return Mo(), null;
        })) : (e.callbackNode = null, e.callbackPriority = 0), zv = $d(), i = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || i) {
          i = q.T, q.T = null, o = st.p, st.p = Na, d = bt, bt |= Fu;
          try {
            Gp(e, t, a);
          } finally {
            bt = d, st.p = o, q.T = i;
          }
        }
        ea = IS, ld(), Zp(), Gy();
      }
    }
    function ld() {
      if (ea === IS) {
        ea = Qr;
        var e = nf, t = rh, a = uf, i = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || i) {
          i = q.T, q.T = null;
          var o = st.p;
          st.p = Na;
          var f = bt;
          bt |= Fu;
          try {
            uh = a, ih = e, Oy(t, e), ih = uh = null, a = O0;
            var d = zp(e.containerInfo), h = a.focusedElem, v = a.selectionRange;
            if (d !== h && h && h.ownerDocument && Dp(
              h.ownerDocument.documentElement,
              h
            )) {
              if (v !== null && Nh(h)) {
                var g = v.start, B = v.end;
                if (B === void 0 && (B = g), "selectionStart" in h)
                  h.selectionStart = g, h.selectionEnd = Math.min(
                    B,
                    h.value.length
                  );
                else {
                  var G = h.ownerDocument || document, x = G && G.defaultView || window;
                  if (x.getSelection) {
                    var V = x.getSelection(), se = h.textContent.length, De = Math.min(
                      v.start,
                      se
                    ), Gt = v.end === void 0 ? De : Math.min(v.end, se);
                    !V.extend && De > Gt && (d = Gt, Gt = De, De = d);
                    var at = Op(
                      h,
                      De
                    ), b = Op(
                      h,
                      Gt
                    );
                    if (at && b && (V.rangeCount !== 1 || V.anchorNode !== at.node || V.anchorOffset !== at.offset || V.focusNode !== b.node || V.focusOffset !== b.offset)) {
                      var E = G.createRange();
                      E.setStart(at.node, at.offset), V.removeAllRanges(), De > Gt ? (V.addRange(E), V.extend(b.node, b.offset)) : (E.setEnd(b.node, b.offset), V.addRange(E));
                    }
                  }
                }
              }
              for (G = [], V = h; V = V.parentNode; )
                V.nodeType === 1 && G.push({
                  element: V,
                  left: V.scrollLeft,
                  top: V.scrollTop
                });
              for (typeof h.focus == "function" && h.focus(), h = 0; h < G.length; h++) {
                var R = G[h];
                R.element.scrollLeft = R.left, R.element.scrollTop = R.top;
              }
            }
            lg = !!R0, O0 = R0 = null;
          } finally {
            bt = f, st.p = o, q.T = i;
          }
        }
        e.current = t, ea = PS;
      }
    }
    function Zp() {
      if (ea === PS) {
        ea = Qr;
        var e = nf, t = rh, a = uf, i = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || i) {
          i = q.T, q.T = null;
          var o = st.p;
          st.p = Na;
          var f = bt;
          bt |= Fu;
          try {
            ne !== null && typeof ne.markLayoutEffectsStarted == "function" && ne.markLayoutEffectsStarted(a), uh = a, ih = e, Ry(
              e,
              t.alternate,
              t
            ), ih = uh = null, ne !== null && typeof ne.markLayoutEffectsStopped == "function" && ne.markLayoutEffectsStopped();
          } finally {
            bt = f, st.p = o, q.T = i;
          }
        }
        ea = e1;
      }
    }
    function Gy() {
      if (ea === wb || ea === e1) {
        ea = Qr, Mg();
        var e = nf, t = rh, a = uf, i = t1, o = (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0;
        o ? ea = d0 : (ea = Qr, rh = nf = null, Ly(e, e.pendingLanes), Zr = 0, ap = null);
        var f = e.pendingLanes;
        if (f === 0 && (af = null), o || An(e), o = jc(a), t = t.stateNode, Hl && typeof Hl.onCommitFiberRoot == "function")
          try {
            var d = (t.current.flags & 128) === 128;
            switch (o) {
              case Na:
                var h = Tr;
                break;
              case kn:
                h = dm;
                break;
              case Qu:
                h = Xo;
                break;
              case Ud:
                h = ym;
                break;
              default:
                h = Xo;
            }
            Hl.onCommitFiberRoot(
              Dc,
              t,
              h,
              d
            );
          } catch (G) {
            tl || (tl = !0, console.error(
              "React instrumentation encountered an error: %s",
              G
            ));
          }
        if (en && e.memoizedUpdaters.clear(), Vp(), i !== null) {
          d = q.T, h = st.p, st.p = Na, q.T = null;
          try {
            var v = e.onRecoverableError;
            for (t = 0; t < i.length; t++) {
              var g = i[t], B = Hu(g.stack);
              me(
                g.source,
                v,
                g.value,
                B
              );
            }
          } finally {
            q.T = d, st.p = h;
          }
        }
        (uf & 3) !== 0 && vi(), Fa(e), f = e.pendingLanes, (a & 4194090) !== 0 && (f & 42) !== 0 ? (Uv = !0, e === m0 ? lp++ : (lp = 0, m0 = e)) : lp = 0, Si(0), mt();
      }
    }
    function Hu(e) {
      return e = { componentStack: e }, Object.defineProperty(e, "digest", {
        get: function() {
          console.error(
            'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
          );
        }
      }), e;
    }
    function Ly(e, t) {
      (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, nc(t)));
    }
    function vi(e) {
      return ld(), Zp(), Gy(), Mo();
    }
    function Mo() {
      if (ea !== d0) return !1;
      var e = nf, t = h0;
      h0 = 0;
      var a = jc(uf), i = Qu > a ? Qu : a;
      a = q.T;
      var o = st.p;
      try {
        st.p = i, q.T = null, i = y0, y0 = null;
        var f = nf, d = uf;
        if (ea = Qr, rh = nf = null, uf = 0, (bt & (wa | Fu)) !== Cn)
          throw Error("Cannot flush passive effects while already rendering.");
        p0 = !0, Lv = !1, ne !== null && typeof ne.markPassiveEffectsStarted == "function" && ne.markPassiveEffectsStarted(d);
        var h = bt;
        if (bt |= Fu, _y(f.current), $s(
          f,
          f.current,
          d,
          i
        ), ne !== null && typeof ne.markPassiveEffectsStopped == "function" && ne.markPassiveEffectsStopped(), An(f), bt = h, Si(0, !1), Lv ? f === ap ? Zr++ : (Zr = 0, ap = f) : Zr = 0, Lv = p0 = !1, Hl && typeof Hl.onPostCommitFiberRoot == "function")
          try {
            Hl.onPostCommitFiberRoot(Dc, f);
          } catch (g) {
            tl || (tl = !0, console.error(
              "React instrumentation encountered an error: %s",
              g
            ));
          }
        var v = f.current.stateNode;
        return v.effectDuration = 0, v.passiveEffectDuration = 0, !0;
      } finally {
        st.p = o, q.T = a, Ly(e, t);
      }
    }
    function Xt(e, t, a) {
      t = la(a, t), t = $t(e.stateNode, t, 2), e = sn(e, t, 2), e !== null && (Iu(e, 2), Fa(e));
    }
    function At(e, t, a) {
      if (sh = !1, e.tag === 3)
        Xt(e, e, a);
      else {
        for (; t !== null; ) {
          if (t.tag === 3) {
            Xt(
              t,
              e,
              a
            );
            return;
          }
          if (t.tag === 1) {
            var i = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (af === null || !af.has(i))) {
              e = la(a, e), a = Jf(2), i = sn(t, a, 2), i !== null && (dc(
                a,
                i,
                t,
                e
              ), Iu(i, 2), Fa(i));
              return;
            }
          }
          t = t.return;
        }
        console.error(
          `Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`,
          a
        );
      }
    }
    function Vy(e, t, a) {
      var i = e.pingCache;
      if (i === null) {
        i = e.pingCache = new Nb();
        var o = /* @__PURE__ */ new Set();
        i.set(t, o);
      } else
        o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o));
      o.has(a) || (f0 = !0, o.add(a), i = Kp.bind(null, e, t, a), en && Sc(e, a), t.then(i, i));
    }
    function Kp(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t), e.pingedLanes |= e.suspendedLanes & a, e.warmLanes &= ~a, Hy() && q.actQueue === null && console.error(
        `A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act`
      ), jt === e && (tt & a) === a && (ol === Gr || ol === i0 && (tt & 62914560) === tt && Cl() - s0 < WS ? (bt & wa) === Cn && Cu(e, 0) : r0 |= a, Xr === tt && (Xr = 0)), Fa(e);
    }
    function Uo(e, t) {
      t === 0 && (t = Li()), e = aa(e, t), e !== null && (Iu(e, t), Fa(e));
    }
    function gi(e) {
      var t = e.memoizedState, a = 0;
      t !== null && (a = t.retryLane), Uo(e, a);
    }
    function Jp(e, t) {
      var a = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode, o = e.memoizedState;
          o !== null && (a = o.retryLane);
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
      i !== null && i.delete(t), Uo(e, a);
    }
    function ad(e, t, a) {
      if ((t.subtreeFlags & 67117056) !== 0)
        for (t = t.child; t !== null; ) {
          var i = e, o = t, f = o.type === Rc;
          f = a || f, o.tag !== 22 ? o.flags & 67108864 ? f && me(
            o,
            _o,
            i,
            o,
            (o.mode & K0) === Qt
          ) : ad(
            i,
            o,
            f
          ) : o.memoizedState === null && (f && o.flags & 8192 ? me(
            o,
            _o,
            i,
            o
          ) : o.subtreeFlags & 67108864 && me(
            o,
            ad,
            i,
            o,
            f
          )), t = t.sibling;
        }
    }
    function _o(e, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : !0;
      _e(!0);
      try {
        bn(t), a && Cy(t), zy(e, t.alternate, t, !1), a && My(e, t, 0, null, !1, 0);
      } finally {
        _e(!1);
      }
    }
    function An(e) {
      var t = !0;
      e.current.mode & (Ta | Ju) || (t = !1), ad(
        e,
        e.current,
        t
      );
    }
    function Xy(e) {
      if ((bt & wa) === Cn) {
        var t = e.tag;
        if (t === 3 || t === 1 || t === 0 || t === 11 || t === 14 || t === 15) {
          if (t = pe(e) || "ReactComponent", Vv !== null) {
            if (Vv.has(t)) return;
            Vv.add(t);
          } else Vv = /* @__PURE__ */ new Set([t]);
          me(e, function() {
            console.error(
              "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
            );
          });
        }
      }
    }
    function Sc(e, t) {
      en && e.memoizedUpdaters.forEach(function(a) {
        Ol(e, a, t);
      });
    }
    function kp(e, t) {
      var a = q.actQueue;
      return a !== null ? (a.push(t), Lb) : sm(e, t);
    }
    function Qy(e) {
      Hy() && q.actQueue === null && me(e, function() {
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
    function Fa(e) {
      e !== dh && e.next === null && (dh === null ? Xv = dh = e : dh = dh.next = e), Qv = !0, q.actQueue !== null ? g0 || (g0 = !0, Wp()) : v0 || (v0 = !0, Wp());
    }
    function Si(e, t) {
      if (!S0 && Qv) {
        S0 = !0;
        do
          for (var a = !1, i = Xv; i !== null; ) {
            if (e !== 0) {
              var o = i.pendingLanes;
              if (o === 0) var f = 0;
              else {
                var d = i.suspendedLanes, h = i.pingedLanes;
                f = (1 << 31 - bl(42 | e) + 1) - 1, f &= o & ~(d & ~h), f = f & 201326741 ? f & 201326741 | 1 : f ? f | 2 : 0;
              }
              f !== 0 && (a = !0, Zy(i, f));
            } else
              f = tt, f = su(
                i,
                i === jt ? f : 0,
                i.cancelPendingCommit !== null || i.timeoutHandle !== kr
              ), (f & 3) === 0 || du(i, f) || (a = !0, Zy(i, f));
            i = i.next;
          }
        while (a);
        S0 = !1;
      }
    }
    function $p() {
      Rn();
    }
    function Rn() {
      Qv = g0 = v0 = !1;
      var e = 0;
      Kr !== 0 && (Fy() && (e = Kr), Kr = 0);
      for (var t = Cl(), a = null, i = Xv; i !== null; ) {
        var o = i.next, f = Wt(i, t);
        f === 0 ? (i.next = null, a === null ? Xv = o : a.next = o, o === null && (dh = a)) : (a = i, (e !== 0 || (f & 3) !== 0) && (Qv = !0)), i = o;
      }
      Si(e);
    }
    function Wt(e, t) {
      for (var a = e.suspendedLanes, i = e.pingedLanes, o = e.expirationTimes, f = e.pendingLanes & -62914561; 0 < f; ) {
        var d = 31 - bl(f), h = 1 << d, v = o[d];
        v === -1 ? ((h & a) === 0 || (h & i) !== 0) && (o[d] = Ir(h, t)) : v <= t && (e.expiredLanes |= h), f &= ~h;
      }
      if (t = jt, a = tt, a = su(
        e,
        e === t ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== kr
      ), i = e.callbackNode, a === 0 || e === t && (zt === Lr || zt === Vr) || e.cancelPendingCommit !== null)
        return i !== null && il(i), e.callbackNode = null, e.callbackPriority = 0;
      if ((a & 3) === 0 || du(e, a)) {
        if (t = a & -a, t !== e.callbackPriority || q.actQueue !== null && i !== b0)
          il(i);
        else return t;
        switch (jc(a)) {
          case Na:
          case kn:
            a = dm;
            break;
          case Qu:
            a = Xo;
            break;
          case Ud:
            a = ym;
            break;
          default:
            a = Xo;
        }
        return i = nd.bind(null, e), q.actQueue !== null ? (q.actQueue.push(i), a = b0) : a = sm(a, i), e.callbackPriority = t, e.callbackNode = a, t;
      }
      return i !== null && il(i), e.callbackPriority = 2, e.callbackNode = null, 2;
    }
    function nd(e, t) {
      if (Uv = Mv = !1, ea !== Qr && ea !== d0)
        return e.callbackNode = null, e.callbackPriority = 0, null;
      var a = e.callbackNode;
      if (vi() && e.callbackNode !== a)
        return null;
      var i = tt;
      return i = su(
        e,
        e === jt ? i : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== kr
      ), i === 0 ? null : (gl(
        e,
        i,
        t
      ), Wt(e, Cl()), e.callbackNode != null && e.callbackNode === a ? nd.bind(null, e) : null);
    }
    function Zy(e, t) {
      if (vi()) return null;
      Mv = Uv, Uv = !1, gl(e, t, !0);
    }
    function il(e) {
      e !== b0 && e !== null && dv(e);
    }
    function Wp() {
      q.actQueue !== null && q.actQueue.push(function() {
        return Rn(), null;
      }), Fb(function() {
        (bt & (wa | Fu)) !== Cn ? sm(
          Tr,
          $p
        ) : Rn();
      });
    }
    function ud() {
      return Kr === 0 && (Kr = Ne()), Kr;
    }
    function Ky(e) {
      return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : (Q(e, "action"), vu("" + e));
    }
    function Yt(e, t) {
      var a = t.ownerDocument.createElement("input");
      return a.name = t.name, a.value = t.value, e.id && a.setAttribute("form", e.id), t.parentNode.insertBefore(a, t), e = new FormData(e), a.parentNode.removeChild(a), e;
    }
    function ya(e, t, a, i, o) {
      if (t === "submit" && a && a.stateNode === o) {
        var f = Ky(
          (o[ba] || null).action
        ), d = i.submitter;
        d && (t = (t = d[ba] || null) ? Ky(t.formAction) : d.getAttribute("formAction"), t !== null && (f = t, d = null));
        var h = new dt(
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
                  if (Kr !== 0) {
                    var v = d ? Yt(
                      o,
                      d
                    ) : new FormData(o), g = {
                      pending: !0,
                      data: v,
                      method: o.method,
                      action: f
                    };
                    Object.freeze(g), Hs(
                      a,
                      g,
                      null,
                      v
                    );
                  }
                } else
                  typeof f == "function" && (h.preventDefault(), v = d ? Yt(
                    o,
                    d
                  ) : new FormData(o), g = {
                    pending: !0,
                    data: v,
                    method: o.method,
                    action: f
                  }, Object.freeze(g), Hs(
                    a,
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
    function Ia(e, t, a) {
      e.currentTarget = a;
      try {
        t(e);
      } catch (i) {
        t0(i);
      }
      e.currentTarget = null;
    }
    function Jy(e, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        e: {
          var o = void 0, f = i.event;
          if (i = i.listeners, t)
            for (var d = i.length - 1; 0 <= d; d--) {
              var h = i[d], v = h.instance, g = h.currentTarget;
              if (h = h.listener, v !== o && f.isPropagationStopped())
                break e;
              v !== null ? me(
                v,
                Ia,
                f,
                h,
                g
              ) : Ia(f, h, g), o = v;
            }
          else
            for (d = 0; d < i.length; d++) {
              if (h = i[d], v = h.instance, g = h.currentTarget, h = h.listener, v !== o && f.isPropagationStopped())
                break e;
              v !== null ? me(
                v,
                Ia,
                f,
                h,
                g
              ) : Ia(f, h, g), o = v;
            }
        }
      }
    }
    function We(e, t) {
      T0.has(e) || console.error(
        'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
        e
      );
      var a = t[_d];
      a === void 0 && (a = t[_d] = /* @__PURE__ */ new Set());
      var i = e + "__bubble";
      a.has(i) || (ma(t, e, 2, !1), a.add(i));
    }
    function ky(e, t, a) {
      T0.has(e) && !t && console.error(
        'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
        e
      );
      var i = 0;
      t && (i |= 4), ma(
        a,
        e,
        i,
        t
      );
    }
    function or(e) {
      if (!e[Zv]) {
        e[Zv] = !0, zc.forEach(function(a) {
          a !== "selectionchange" && (T0.has(a) || ky(a, !1, e), ky(a, !0, e));
        });
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[Zv] || (t[Zv] = !0, ky("selectionchange", !1, t));
      }
    }
    function ma(e, t, a, i) {
      switch (Mi(t)) {
        case Na:
          var o = gd;
          break;
        case kn:
          o = jo;
          break;
        default:
          o = yr;
      }
      a = o.bind(
        null,
        t,
        a,
        e
      ), o = void 0, !Z || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (o = !0), i ? o !== void 0 ? e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }) : e.addEventListener(t, a, !0) : o !== void 0 ? e.addEventListener(t, a, {
        passive: o
      }) : e.addEventListener(
        t,
        a,
        !1
      );
    }
    function _a(e, t, a, i, o) {
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
              if (d = Dl(h), d === null) return;
              if (v = d.tag, v === 5 || v === 6 || v === 26 || v === 27) {
                i = f = d;
                continue e;
              }
              h = h.parentNode;
            }
          }
          i = i.return;
        }
      kc(function() {
        var g = f, B = un(a), G = [];
        e: {
          var x = Z0.get(e);
          if (x !== void 0) {
            var V = dt, se = e;
            switch (e) {
              case "keypress":
                if ($i(a) === 0) break e;
              case "keydown":
              case "keyup":
                V = nb;
                break;
              case "focusin":
                se = "focus", V = In;
                break;
              case "focusout":
                se = "blur", V = In;
                break;
              case "beforeblur":
              case "afterblur":
                V = In;
                break;
              case "click":
                if (a.button === 2) break e;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                V = ge;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                V = El;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                V = cb;
                break;
              case L0:
              case V0:
              case X0:
                V = $1;
                break;
              case Q0:
                V = fb;
                break;
              case "scroll":
              case "scrollend":
                V = O;
                break;
              case "wheel":
                V = sb;
                break;
              case "copy":
              case "cut":
              case "paste":
                V = F1;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                V = x0;
                break;
              case "toggle":
              case "beforetoggle":
                V = hb;
            }
            var De = (t & 4) !== 0, Gt = !De && (e === "scroll" || e === "scrollend"), at = De ? x !== null ? x + "Capture" : null : x;
            De = [];
            for (var b = g, E; b !== null; ) {
              var R = b;
              if (E = R.stateNode, R = R.tag, R !== 5 && R !== 26 && R !== 27 || E === null || at === null || (R = Xa(b, at), R != null && De.push(
                Co(
                  b,
                  R,
                  E
                )
              )), Gt) break;
              b = b.return;
            }
            0 < De.length && (x = new V(
              x,
              se,
              null,
              a,
              B
            ), G.push({
              event: x,
              listeners: De
            }));
          }
        }
        if ((t & 7) === 0) {
          e: {
            if (x = e === "mouseover" || e === "pointerover", V = e === "mouseout" || e === "pointerout", x && a !== s && (se = a.relatedTarget || a.fromElement) && (Dl(se) || se[xi]))
              break e;
            if ((V || x) && (x = B.window === B ? B : (x = B.ownerDocument) ? x.defaultView || x.parentWindow : window, V ? (se = a.relatedTarget || a.toElement, V = g, se = se ? Dl(se) : null, se !== null && (Gt = et(se), De = se.tag, se !== Gt || De !== 5 && De !== 27 && De !== 6) && (se = null)) : (V = null, se = g), V !== se)) {
              if (De = ge, R = "onMouseLeave", at = "onMouseEnter", b = "mouse", (e === "pointerout" || e === "pointerover") && (De = x0, R = "onPointerLeave", at = "onPointerEnter", b = "pointer"), Gt = V == null ? x : La(V), E = se == null ? x : La(se), x = new De(
                R,
                b + "leave",
                V,
                a,
                B
              ), x.target = Gt, x.relatedTarget = E, R = null, Dl(B) === g && (De = new De(
                at,
                b + "enter",
                se,
                a,
                B
              ), De.target = E, De.relatedTarget = Gt, R = De), Gt = R, V && se)
                t: {
                  for (De = V, at = se, b = 0, E = De; E; E = bc(E))
                    b++;
                  for (E = 0, R = at; R; R = bc(R))
                    E++;
                  for (; 0 < b - E; )
                    De = bc(De), b--;
                  for (; 0 < E - b; )
                    at = bc(at), E--;
                  for (; b--; ) {
                    if (De === at || at !== null && De === at.alternate)
                      break t;
                    De = bc(De), at = bc(at);
                  }
                  De = null;
                }
              else De = null;
              V !== null && xu(
                G,
                x,
                V,
                De,
                !1
              ), se !== null && Gt !== null && xu(
                G,
                Gt,
                se,
                De,
                !0
              );
            }
          }
          e: {
            if (x = g ? La(g) : window, V = x.nodeName && x.nodeName.toLowerCase(), V === "select" || V === "input" && x.type === "file")
              var X = Ep;
            else if (os(x))
              if (j0)
                X = mg;
              else {
                X = hg;
                var le = Hh;
              }
            else
              V = x.nodeName, !V || V.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? g && Ji(g.elementType) && (X = Ep) : X = yg;
            if (X && (X = X(e, g))) {
              $c(
                G,
                X,
                a,
                B
              );
              break e;
            }
            le && le(e, x, g), e === "focusout" && g && x.type === "number" && g.memoizedProps.value != null && es(x, "number", x.value);
          }
          switch (le = g ? La(g) : window, e) {
            case "focusin":
              (os(le) || le.contentEditable === "true") && (Ld = le, xg = g, Nm = null);
              break;
            case "focusout":
              Nm = xg = Ld = null;
              break;
            case "mousedown":
              Ng = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Ng = !1, rs(
                G,
                a,
                B
              );
              break;
            case "selectionchange":
              if (vb) break;
            case "keydown":
            case "keyup":
              rs(
                G,
                a,
                B
              );
          }
          var Be;
          if (Hg)
            e: {
              switch (e) {
                case "compositionstart":
                  var de = "onCompositionStart";
                  break e;
                case "compositionend":
                  de = "onCompositionEnd";
                  break e;
                case "compositionupdate":
                  de = "onCompositionUpdate";
                  break e;
              }
              de = void 0;
            }
          else
            Gd ? li(e, a) && (de = "onCompositionEnd") : e === "keydown" && a.keyCode === N0 && (de = "onCompositionStart");
          de && (q0 && a.locale !== "ko" && (Gd || de !== "onCompositionStart" ? de === "onCompositionEnd" && Gd && (Be = cs()) : (H = B, w = "value" in H ? H.value : H.textContent, Gd = !0)), le = Vl(
            g,
            de
          ), 0 < le.length && (de = new H0(
            de,
            e,
            null,
            a,
            B
          ), G.push({
            event: de,
            listeners: le
          }), Be ? de.data = Be : (Be = Af(a), Be !== null && (de.data = Be)))), (Be = mb ? Rf(e, a) : dg(e, a)) && (de = Vl(
            g,
            "onBeforeInput"
          ), 0 < de.length && (le = new P1(
            "onBeforeInput",
            "beforeinput",
            null,
            a,
            B
          ), G.push({
            event: le,
            listeners: de
          }), le.data = Be)), ya(
            G,
            e,
            g,
            a,
            B
          );
        }
        Jy(G, t);
      });
    }
    function Co(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Vl(e, t) {
      for (var a = t + "Capture", i = []; e !== null; ) {
        var o = e, f = o.stateNode;
        if (o = o.tag, o !== 5 && o !== 26 && o !== 27 || f === null || (o = Xa(e, a), o != null && i.unshift(
          Co(e, o, f)
        ), o = Xa(e, t), o != null && i.push(
          Co(e, o, f)
        )), e.tag === 3) return i;
        e = e.return;
      }
      return [];
    }
    function bc(e) {
      if (e === null) return null;
      do
        e = e.return;
      while (e && e.tag !== 5 && e.tag !== 27);
      return e || null;
    }
    function xu(e, t, a, i, o) {
      for (var f = t._reactName, d = []; a !== null && a !== i; ) {
        var h = a, v = h.alternate, g = h.stateNode;
        if (h = h.tag, v !== null && v === i) break;
        h !== 5 && h !== 26 && h !== 27 || g === null || (v = g, o ? (g = Xa(a, f), g != null && d.unshift(
          Co(a, g, v)
        )) : o || (g = Xa(a, f), g != null && d.push(
          Co(a, g, v)
        ))), a = a.return;
      }
      d.length !== 0 && e.push({ event: t, listeners: d });
    }
    function Nu(e, t) {
      Sp(e, t), e !== "input" && e !== "textarea" && e !== "select" || t == null || t.value !== null || Av || (Av = !0, e === "select" && t.multiple ? console.error(
        "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
        e
      ) : console.error(
        "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
        e
      ));
      var a = {
        registrationNameDependencies: Un,
        possibleRegistrationNames: Cd
      };
      Ji(e) || typeof t.is == "string" || bp(e, t, a), t.contentEditable && !t.suppressContentEditableWarning && t.children != null && console.error(
        "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
      );
    }
    function wt(e, t, a, i) {
      t !== a && (a = qu(a), qu(t) !== a && (i[e] = t));
    }
    function $y(e, t, a) {
      t.forEach(function(i) {
        a[Ho(i)] = i === "style" ? id(e) : e.getAttribute(i);
      });
    }
    function Pa(e, t) {
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
    function On(e, t) {
      return e = e.namespaceURI === Yd || e.namespaceURI === Ku ? e.ownerDocument.createElementNS(
        e.namespaceURI,
        e.tagName
      ) : e.ownerDocument.createElement(e.tagName), e.innerHTML = t, e.innerHTML;
    }
    function qu(e) {
      return A(e) && (console.error(
        "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
        T(e)
      ), J(e)), (typeof e == "string" ? e : "" + e).replace(Vb, `
`).replace(Xb, "");
    }
    function Tc(e, t) {
      return t = qu(t), qu(e) === t;
    }
    function bi() {
    }
    function it(e, t, a, i, o, f) {
      switch (a) {
        case "children":
          typeof i == "string" ? (Kc(i, t, !1), t === "body" || t === "textarea" && i === "" || Sf(e, i)) : (typeof i == "number" || typeof i == "bigint") && (Kc("" + i, t, !1), t !== "body" && Sf(e, "" + i));
          break;
        case "className":
          ze(e, "class", i);
          break;
        case "tabIndex":
          ze(e, "tabindex", i);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ze(e, a, i);
          break;
        case "style":
          us(e, i, f);
          break;
        case "data":
          if (t !== "object") {
            ze(e, "data", i);
            break;
          }
        case "src":
        case "href":
          if (i === "" && (t !== "a" || a !== "href")) {
            console.error(
              a === "src" ? 'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.' : 'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
              a,
              a
            ), e.removeAttribute(a);
            break;
          }
          if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          Q(i, a), i = vu("" + i), e.setAttribute(a, i);
          break;
        case "action":
        case "formAction":
          if (i != null && (t === "form" ? a === "formAction" ? console.error(
            "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
          ) : typeof i == "function" && (o.encType == null && o.method == null || kv || (kv = !0, console.error(
            "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
          )), o.target == null || Jv || (Jv = !0, console.error(
            "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
          ))) : t === "input" || t === "button" ? a === "action" ? console.error(
            "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
          ) : t !== "input" || o.type === "submit" || o.type === "image" || Kv ? t !== "button" || o.type == null || o.type === "submit" || Kv ? typeof i == "function" && (o.name == null || i1 || (i1 = !0, console.error(
            'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
          )), o.formEncType == null && o.formMethod == null || kv || (kv = !0, console.error(
            "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
          )), o.formTarget == null || Jv || (Jv = !0, console.error(
            "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
          ))) : (Kv = !0, console.error(
            'A button can only specify a formAction along with type="submit" or no type.'
          )) : (Kv = !0, console.error(
            'An input can only specify a formAction along with type="submit" or type="image".'
          )) : console.error(
            a === "action" ? "You can only pass the action prop to <form>." : "You can only pass the formAction prop to <input> or <button>."
          )), typeof i == "function") {
            e.setAttribute(
              a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            );
            break;
          } else
            typeof f == "function" && (a === "formAction" ? (t !== "input" && it(e, t, "name", o.name, o, null), it(
              e,
              t,
              "formEncType",
              o.formEncType,
              o,
              null
            ), it(
              e,
              t,
              "formMethod",
              o.formMethod,
              o,
              null
            ), it(
              e,
              t,
              "formTarget",
              o.formTarget,
              o,
              null
            )) : (it(
              e,
              t,
              "encType",
              o.encType,
              o,
              null
            ), it(e, t, "method", o.method, o, null), it(
              e,
              t,
              "target",
              o.target,
              o,
              null
            )));
          if (i == null || typeof i == "symbol" || typeof i == "boolean") {
            e.removeAttribute(a);
            break;
          }
          Q(i, a), i = vu("" + i), e.setAttribute(a, i);
          break;
        case "onClick":
          i != null && (typeof i != "function" && Pa(a, i), e.onclick = bi);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Pa(a, i), We("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Pa(a, i), We("scrollend", e));
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
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
          Q(i, a), a = vu("" + i), e.setAttributeNS(Jr, "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          i != null && typeof i != "function" && typeof i != "symbol" ? (Q(i, a), e.setAttribute(a, "" + i)) : e.removeAttribute(a);
          break;
        case "inert":
          i !== "" || $v[a] || ($v[a] = !0, console.error(
            "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
            a
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
          i && typeof i != "function" && typeof i != "symbol" ? e.setAttribute(a, "") : e.removeAttribute(a);
          break;
        case "capture":
        case "download":
          i === !0 ? e.setAttribute(a, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? (Q(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? (Q(i, a), e.setAttribute(a, i)) : e.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? e.removeAttribute(a) : (Q(i, a), e.setAttribute(a, i));
          break;
        case "popover":
          We("beforetoggle", e), We("toggle", e), lt(e, "popover", i);
          break;
        case "xlinkActuate":
          ll(
            e,
            Jr,
            "xlink:actuate",
            i
          );
          break;
        case "xlinkArcrole":
          ll(
            e,
            Jr,
            "xlink:arcrole",
            i
          );
          break;
        case "xlinkRole":
          ll(
            e,
            Jr,
            "xlink:role",
            i
          );
          break;
        case "xlinkShow":
          ll(
            e,
            Jr,
            "xlink:show",
            i
          );
          break;
        case "xlinkTitle":
          ll(
            e,
            Jr,
            "xlink:title",
            i
          );
          break;
        case "xlinkType":
          ll(
            e,
            Jr,
            "xlink:type",
            i
          );
          break;
        case "xmlBase":
          ll(
            e,
            E0,
            "xml:base",
            i
          );
          break;
        case "xmlLang":
          ll(
            e,
            E0,
            "xml:lang",
            i
          );
          break;
        case "xmlSpace":
          ll(
            e,
            E0,
            "xml:space",
            i
          );
          break;
        case "is":
          f != null && console.error(
            'Cannot update the "is" prop after it has been initialized.'
          ), lt(e, "is", i);
          break;
        case "innerText":
        case "textContent":
          break;
        case "popoverTarget":
          c1 || i == null || typeof i != "object" || (c1 = !0, console.error(
            "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
            i
          ));
        default:
          !(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N" ? (a = ki(a), lt(e, a, i)) : Un.hasOwnProperty(a) && i != null && typeof i != "function" && Pa(a, i);
      }
    }
    function Ti(e, t, a, i, o, f) {
      switch (a) {
        case "style":
          us(e, i, f);
          break;
        case "dangerouslySetInnerHTML":
          if (i != null) {
            if (typeof i != "object" || !("__html" in i))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
              );
            if (a = i.__html, a != null) {
              if (o.children != null)
                throw Error(
                  "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                );
              e.innerHTML = a;
            }
          }
          break;
        case "children":
          typeof i == "string" ? Sf(e, i) : (typeof i == "number" || typeof i == "bigint") && Sf(e, "" + i);
          break;
        case "onScroll":
          i != null && (typeof i != "function" && Pa(a, i), We("scroll", e));
          break;
        case "onScrollEnd":
          i != null && (typeof i != "function" && Pa(a, i), We("scrollend", e));
          break;
        case "onClick":
          i != null && (typeof i != "function" && Pa(a, i), e.onclick = bi);
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
          if (Un.hasOwnProperty(a))
            i != null && typeof i != "function" && Pa(a, i);
          else
            e: {
              if (a[0] === "o" && a[1] === "n" && (o = a.endsWith("Capture"), t = a.slice(2, o ? a.length - 7 : void 0), f = e[ba] || null, f = f != null ? f[a] : null, typeof f == "function" && e.removeEventListener(t, f, o), typeof i == "function")) {
                typeof f != "function" && f !== null && (a in e ? e[a] = null : e.hasAttribute(a) && e.removeAttribute(a)), e.addEventListener(t, i, o);
                break e;
              }
              a in e ? e[a] = i : i === !0 ? e.setAttribute(a, "") : lt(e, a, i);
            }
      }
    }
    function Sl(e, t, a) {
      switch (Nu(t, a), t) {
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
          We("error", e), We("load", e);
          var i = !1, o = !1, f;
          for (f in a)
            if (a.hasOwnProperty(f)) {
              var d = a[f];
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
                    it(e, t, f, d, a, null);
                }
            }
          o && it(e, t, "srcSet", a.srcSet, a, null), i && it(e, t, "src", a.src, a, null);
          return;
        case "input":
          re("input", a), We("invalid", e);
          var h = f = d = o = null, v = null, g = null;
          for (i in a)
            if (a.hasOwnProperty(i)) {
              var B = a[i];
              if (B != null)
                switch (i) {
                  case "name":
                    o = B;
                    break;
                  case "type":
                    d = B;
                    break;
                  case "checked":
                    v = B;
                    break;
                  case "defaultChecked":
                    g = B;
                    break;
                  case "value":
                    f = B;
                    break;
                  case "defaultValue":
                    h = B;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (B != null)
                      throw Error(
                        t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    it(e, t, i, B, a, null);
                }
            }
          Qi(e, a), Eh(
            e,
            f,
            h,
            v,
            g,
            d,
            o,
            !1
          ), Pt(e);
          return;
        case "select":
          re("select", a), We("invalid", e), i = d = f = null;
          for (o in a)
            if (a.hasOwnProperty(o) && (h = a[o], h != null))
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
                  it(
                    e,
                    t,
                    o,
                    h,
                    a,
                    null
                  );
              }
          Yn(e, a), t = f, a = d, e.multiple = !!i, t != null ? mu(e, !!i, t, !1) : a != null && mu(e, !!i, a, !0);
          return;
        case "textarea":
          re("textarea", a), We("invalid", e), f = o = i = null;
          for (d in a)
            if (a.hasOwnProperty(d) && (h = a[d], h != null))
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
                  it(
                    e,
                    t,
                    d,
                    h,
                    a,
                    null
                  );
              }
          ts(e, a), Zi(e, i, o, f), Pt(e);
          return;
        case "option":
          gp(e, a);
          for (v in a)
            if (a.hasOwnProperty(v) && (i = a[v], i != null))
              switch (v) {
                case "selected":
                  e.selected = i && typeof i != "function" && typeof i != "symbol";
                  break;
                default:
                  it(e, t, v, i, a, null);
              }
          return;
        case "dialog":
          We("beforetoggle", e), We("toggle", e), We("cancel", e), We("close", e);
          break;
        case "iframe":
        case "object":
          We("load", e);
          break;
        case "video":
        case "audio":
          for (i = 0; i < np.length; i++)
            We(np[i], e);
          break;
        case "image":
          We("error", e), We("load", e);
          break;
        case "details":
          We("toggle", e);
          break;
        case "embed":
        case "source":
        case "link":
          We("error", e), We("load", e);
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
          for (g in a)
            if (a.hasOwnProperty(g) && (i = a[g], i != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  it(e, t, g, i, a, null);
              }
          return;
        default:
          if (Ji(t)) {
            for (B in a)
              a.hasOwnProperty(B) && (i = a[B], i !== void 0 && Ti(
                e,
                t,
                B,
                i,
                a,
                void 0
              ));
            return;
          }
      }
      for (h in a)
        a.hasOwnProperty(h) && (i = a[h], i != null && it(e, t, h, i, a, null));
    }
    function Fp(e, t, a, i) {
      switch (Nu(t, i), t) {
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
          var o = null, f = null, d = null, h = null, v = null, g = null, B = null;
          for (V in a) {
            var G = a[V];
            if (a.hasOwnProperty(V) && G != null)
              switch (V) {
                case "checked":
                  break;
                case "value":
                  break;
                case "defaultValue":
                  v = G;
                default:
                  i.hasOwnProperty(V) || it(
                    e,
                    t,
                    V,
                    null,
                    i,
                    G
                  );
              }
          }
          for (var x in i) {
            var V = i[x];
            if (G = a[x], i.hasOwnProperty(x) && (V != null || G != null))
              switch (x) {
                case "type":
                  f = V;
                  break;
                case "name":
                  o = V;
                  break;
                case "checked":
                  g = V;
                  break;
                case "defaultChecked":
                  B = V;
                  break;
                case "value":
                  d = V;
                  break;
                case "defaultValue":
                  h = V;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (V != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  V !== G && it(
                    e,
                    t,
                    x,
                    V,
                    i,
                    G
                  );
              }
          }
          t = a.type === "checkbox" || a.type === "radio" ? a.checked != null : a.value != null, i = i.type === "checkbox" || i.type === "radio" ? i.checked != null : i.value != null, t || !i || u1 || (console.error(
            "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), u1 = !0), !t || i || n1 || (console.error(
            "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
          ), n1 = !0), Th(
            e,
            d,
            h,
            v,
            g,
            B,
            f,
            o
          );
          return;
        case "select":
          V = d = h = x = null;
          for (f in a)
            if (v = a[f], a.hasOwnProperty(f) && v != null)
              switch (f) {
                case "value":
                  break;
                case "multiple":
                  V = v;
                default:
                  i.hasOwnProperty(f) || it(
                    e,
                    t,
                    f,
                    null,
                    i,
                    v
                  );
              }
          for (o in i)
            if (f = i[o], v = a[o], i.hasOwnProperty(o) && (f != null || v != null))
              switch (o) {
                case "value":
                  x = f;
                  break;
                case "defaultValue":
                  h = f;
                  break;
                case "multiple":
                  d = f;
                default:
                  f !== v && it(
                    e,
                    t,
                    o,
                    f,
                    i,
                    v
                  );
              }
          i = h, t = d, a = V, x != null ? mu(e, !!t, x, !1) : !!a != !!t && (i != null ? mu(e, !!t, i, !0) : mu(e, !!t, t ? [] : "", !1));
          return;
        case "textarea":
          V = x = null;
          for (h in a)
            if (o = a[h], a.hasOwnProperty(h) && o != null && !i.hasOwnProperty(h))
              switch (h) {
                case "value":
                  break;
                case "children":
                  break;
                default:
                  it(e, t, h, null, i, o);
              }
          for (d in i)
            if (o = i[d], f = a[d], i.hasOwnProperty(d) && (o != null || f != null))
              switch (d) {
                case "value":
                  x = o;
                  break;
                case "defaultValue":
                  V = o;
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
                  o !== f && it(e, t, d, o, i, f);
              }
          Ah(e, x, V);
          return;
        case "option":
          for (var se in a)
            if (x = a[se], a.hasOwnProperty(se) && x != null && !i.hasOwnProperty(se))
              switch (se) {
                case "selected":
                  e.selected = !1;
                  break;
                default:
                  it(
                    e,
                    t,
                    se,
                    null,
                    i,
                    x
                  );
              }
          for (v in i)
            if (x = i[v], V = a[v], i.hasOwnProperty(v) && x !== V && (x != null || V != null))
              switch (v) {
                case "selected":
                  e.selected = x && typeof x != "function" && typeof x != "symbol";
                  break;
                default:
                  it(
                    e,
                    t,
                    v,
                    x,
                    i,
                    V
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
          for (var De in a)
            x = a[De], a.hasOwnProperty(De) && x != null && !i.hasOwnProperty(De) && it(
              e,
              t,
              De,
              null,
              i,
              x
            );
          for (g in i)
            if (x = i[g], V = a[g], i.hasOwnProperty(g) && x !== V && (x != null || V != null))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  if (x != null)
                    throw Error(
                      t + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  break;
                default:
                  it(
                    e,
                    t,
                    g,
                    x,
                    i,
                    V
                  );
              }
          return;
        default:
          if (Ji(t)) {
            for (var Gt in a)
              x = a[Gt], a.hasOwnProperty(Gt) && x !== void 0 && !i.hasOwnProperty(Gt) && Ti(
                e,
                t,
                Gt,
                void 0,
                i,
                x
              );
            for (B in i)
              x = i[B], V = a[B], !i.hasOwnProperty(B) || x === V || x === void 0 && V === void 0 || Ti(
                e,
                t,
                B,
                x,
                i,
                V
              );
            return;
          }
      }
      for (var at in a)
        x = a[at], a.hasOwnProperty(at) && x != null && !i.hasOwnProperty(at) && it(e, t, at, null, i, x);
      for (G in i)
        x = i[G], V = a[G], !i.hasOwnProperty(G) || x === V || x == null && V == null || it(e, t, G, x, i, V);
    }
    function Ho(e) {
      switch (e) {
        case "class":
          return "className";
        case "for":
          return "htmlFor";
        default:
          return e;
      }
    }
    function id(e) {
      var t = {};
      e = e.style;
      for (var a = 0; a < e.length; a++) {
        var i = e[a];
        t[i] = e.getPropertyValue(i);
      }
      return t;
    }
    function fr(e, t, a) {
      if (t != null && typeof t != "object")
        console.error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      else {
        var i, o = i = "", f;
        for (f in t)
          if (t.hasOwnProperty(f)) {
            var d = t[f];
            d != null && typeof d != "boolean" && d !== "" && (f.indexOf("--") === 0 ? (ae(d, f), i += o + f + ":" + ("" + d).trim()) : typeof d != "number" || d === 0 || _m.has(f) ? (ae(d, f), i += o + f.replace(Zu, "-$1").toLowerCase().replace(ko, "-ms-") + ":" + ("" + d).trim()) : i += o + f.replace(Zu, "-$1").toLowerCase().replace(ko, "-ms-") + ":" + d + "px", o = ";");
          }
        i = i || null, t = e.getAttribute("style"), t !== i && (i = qu(i), qu(t) !== i && (a.style = id(e)));
      }
    }
    function Ca(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
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
            if (Q(i, t), e === "" + i)
              return;
        }
      wt(t, e, i, f);
    }
    function Ip(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null) {
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
      wt(t, e, i, f);
    }
    function Wy(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
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
            if (Q(i, a), e === "" + i)
              return;
        }
      wt(t, e, i, f);
    }
    function vt(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
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
            if (!isNaN(i) && (Q(i, t), e === "" + i))
              return;
        }
      wt(t, e, i, f);
    }
    function Rt(e, t, a, i, o, f) {
      if (o.delete(a), e = e.getAttribute(a), e === null)
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
            if (Q(i, t), a = vu("" + i), e === a)
              return;
        }
      wt(t, e, i, f);
    }
    function Fe(e, t, a, i) {
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
      if (Ji(t)) {
        for (var v in a)
          if (a.hasOwnProperty(v)) {
            var g = a[v];
            if (g != null) {
              if (Un.hasOwnProperty(v))
                typeof g != "function" && Pa(v, g);
              else if (a.suppressHydrationWarning !== !0)
                switch (v) {
                  case "children":
                    typeof g != "string" && typeof g != "number" || wt(
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
                    d = e.innerHTML, g = g ? g.__html : void 0, g != null && (g = On(e, g), wt(
                      v,
                      d,
                      g,
                      o
                    ));
                    continue;
                  case "style":
                    f.delete(v), fr(e, g, o);
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
                    f.delete("class"), d = Ce(
                      e,
                      "class",
                      g
                    ), wt(
                      "className",
                      d,
                      g,
                      o
                    );
                    continue;
                  default:
                    i.context === Bc && t !== "svg" && t !== "math" ? f.delete(v.toLowerCase()) : f.delete(v), d = Ce(
                      e,
                      v,
                      g
                    ), wt(
                      v,
                      d,
                      g,
                      o
                    );
                }
            }
          }
      } else
        for (g in a)
          if (a.hasOwnProperty(g) && (v = a[g], v != null)) {
            if (Un.hasOwnProperty(g))
              typeof v != "function" && Pa(g, v);
            else if (a.suppressHydrationWarning !== !0)
              switch (g) {
                case "children":
                  typeof v != "string" && typeof v != "number" || wt(
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
                  d = e.innerHTML, v = v ? v.__html : void 0, v != null && (v = On(e, v), d !== v && (o[g] = { __html: d }));
                  continue;
                case "className":
                  Ca(
                    e,
                    g,
                    "class",
                    v,
                    f,
                    o
                  );
                  continue;
                case "tabIndex":
                  Ca(
                    e,
                    g,
                    "tabindex",
                    v,
                    f,
                    o
                  );
                  continue;
                case "style":
                  f.delete(g), fr(e, v, o);
                  continue;
                case "multiple":
                  f.delete(g), wt(
                    g,
                    e.multiple,
                    v,
                    o
                  );
                  continue;
                case "muted":
                  f.delete(g), wt(
                    g,
                    e.muted,
                    v,
                    o
                  );
                  continue;
                case "autoFocus":
                  f.delete("autofocus"), wt(
                    g,
                    e.autofocus,
                    v,
                    o
                  );
                  continue;
                case "data":
                  if (t !== "object") {
                    f.delete(g), d = e.getAttribute("data"), wt(
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
                  Rt(
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
                  } else if (d === Qb) {
                    f.delete(g.toLowerCase()), wt(
                      g,
                      "function",
                      v,
                      o
                    );
                    continue;
                  }
                  Rt(
                    e,
                    g,
                    g.toLowerCase(),
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkHref":
                  Rt(
                    e,
                    g,
                    "xlink:href",
                    v,
                    f,
                    o
                  );
                  continue;
                case "contentEditable":
                  Wy(
                    e,
                    g,
                    "contenteditable",
                    v,
                    f,
                    o
                  );
                  continue;
                case "spellCheck":
                  Wy(
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
                  Wy(
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
                  Ip(
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
                    var B = d = g, G = o;
                    if (f.delete(B), h = h.getAttribute(B), h === null)
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
                          if (Q(v, d), h === "" + v)
                            break e;
                      }
                    wt(
                      d,
                      h,
                      v,
                      G
                    );
                  }
                  continue;
                case "cols":
                case "rows":
                case "size":
                case "span":
                  e: {
                    if (h = e, B = d = g, G = o, f.delete(B), h = h.getAttribute(B), h === null)
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
                          if (!(isNaN(v) || 1 > v) && (Q(v, d), h === "" + v))
                            break e;
                      }
                    wt(
                      d,
                      h,
                      v,
                      G
                    );
                  }
                  continue;
                case "rowSpan":
                  vt(
                    e,
                    g,
                    "rowspan",
                    v,
                    f,
                    o
                  );
                  continue;
                case "start":
                  vt(
                    e,
                    g,
                    g,
                    v,
                    f,
                    o
                  );
                  continue;
                case "xHeight":
                  Ca(
                    e,
                    g,
                    "x-height",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkActuate":
                  Ca(
                    e,
                    g,
                    "xlink:actuate",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkArcrole":
                  Ca(
                    e,
                    g,
                    "xlink:arcrole",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkRole":
                  Ca(
                    e,
                    g,
                    "xlink:role",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkShow":
                  Ca(
                    e,
                    g,
                    "xlink:show",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkTitle":
                  Ca(
                    e,
                    g,
                    "xlink:title",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xlinkType":
                  Ca(
                    e,
                    g,
                    "xlink:type",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlBase":
                  Ca(
                    e,
                    g,
                    "xml:base",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlLang":
                  Ca(
                    e,
                    g,
                    "xml:lang",
                    v,
                    f,
                    o
                  );
                  continue;
                case "xmlSpace":
                  Ca(
                    e,
                    g,
                    "xml:space",
                    v,
                    f,
                    o
                  );
                  continue;
                case "inert":
                  v !== "" || $v[g] || ($v[g] = !0, console.error(
                    "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                    g
                  )), Ip(
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
                    h = ki(g), d = !1, i.context === Bc && t !== "svg" && t !== "math" ? f.delete(h.toLowerCase()) : (B = g.toLowerCase(), B = Cr.hasOwnProperty(
                      B
                    ) && Cr[B] || null, B !== null && B !== g && (d = !0, f.delete(B)), f.delete(h));
                    e: if (B = e, G = h, h = v, Xe(G))
                      if (B.hasAttribute(G))
                        B = B.getAttribute(
                          G
                        ), Q(
                          h,
                          G
                        ), h = B === "" + h ? h : B;
                      else {
                        switch (typeof h) {
                          case "function":
                          case "symbol":
                            break e;
                          case "boolean":
                            if (B = G.toLowerCase().slice(0, 5), B !== "data-" && B !== "aria-")
                              break e;
                        }
                        h = h === void 0 ? void 0 : null;
                      }
                    else h = void 0;
                    d || wt(
                      g,
                      h,
                      v,
                      o
                    );
                  }
              }
          }
      return 0 < f.size && a.suppressHydrationWarning !== !0 && $y(e, f, o), Object.keys(o).length === 0 ? null : o;
    }
    function nt(e, t) {
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
    function ct(e) {
      return e.nodeType === 9 ? e : e.ownerDocument;
    }
    function pa(e) {
      switch (e) {
        case Ku:
          return hh;
        case Yd:
          return Iv;
        default:
          return Bc;
      }
    }
    function Bu(e, t) {
      if (e === Bc)
        switch (t) {
          case "svg":
            return hh;
          case "math":
            return Iv;
          default:
            return Bc;
        }
      return e === hh && t === "foreignObject" ? Bc : e;
    }
    function Ei(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function Fy() {
      var e = window.event;
      return e && e.type === "popstate" ? e === D0 ? !1 : (D0 = e, !0) : (D0 = null, !1);
    }
    function Yu(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Ft(e, t, a) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          break;
        case "img":
          a.src ? e.src = a.src : a.srcSet && (e.srcset = a.srcSet);
      }
    }
    function Ai(e, t, a, i) {
      Fp(e, t, a, i), e[ba] = i;
    }
    function Ri(e) {
      Sf(e, "");
    }
    function Iy(e, t, a) {
      e.nodeValue = a;
    }
    function dl(e) {
      return e === "head";
    }
    function xo(e, t) {
      e.removeChild(t);
    }
    function rr(e, t) {
      (e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e).removeChild(t);
    }
    function Fl(e, t) {
      var a = t, i = 0, o = 0;
      do {
        var f = a.nextSibling;
        if (e.removeChild(a), f && f.nodeType === 8)
          if (a = f.data, a === Fv) {
            if (0 < i && 8 > i) {
              a = i;
              var d = e.ownerDocument;
              if (a & Kb && Bo(d.documentElement), a & Jb && Bo(d.body), a & kb)
                for (a = d.head, Bo(a), d = a.firstChild; d; ) {
                  var h = d.nextSibling, v = d.nodeName;
                  d[Ar] || v === "SCRIPT" || v === "STYLE" || v === "LINK" && d.rel.toLowerCase() === "stylesheet" || a.removeChild(d), d = h;
                }
            }
            if (o === 0) {
              e.removeChild(f), Lo(t);
              return;
            }
            o--;
          } else
            a === Wv || a === qc || a === up ? o++ : i = a.charCodeAt(0) - 48;
        else i = 0;
        a = f;
      } while (a);
      Lo(t);
    }
    function Py(e) {
      e = e.style, typeof e.setProperty == "function" ? e.setProperty("display", "none", "important") : e.display = "none";
    }
    function em(e) {
      e.nodeValue = "";
    }
    function cd(e, t) {
      t = t[$b], t = t != null && t.hasOwnProperty("display") ? t.display : null, e.style.display = t == null || typeof t == "boolean" ? "" : ("" + t).trim();
    }
    function od(e, t) {
      e.nodeValue = t;
    }
    function Qn(e) {
      var t = e.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            Qn(a), nn(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue;
        }
        e.removeChild(a);
      }
    }
    function _l(e, t, a, i) {
      for (; e.nodeType === 1; ) {
        var o = a;
        if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!i && (e.nodeName !== "INPUT" || e.type !== "hidden"))
            break;
        } else if (i) {
          if (!e[Ar])
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
          Q(o.name, "name");
          var f = o.name == null ? null : "" + o.name;
          if (o.type === "hidden" && e.getAttribute("name") === f)
            return e;
        } else return e;
        if (e = va(e.nextSibling), e === null) break;
      }
      return null;
    }
    function Oi(e, t, a) {
      if (t === "") return null;
      for (; e.nodeType !== 3; )
        if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !a || (e = va(e.nextSibling), e === null)) return null;
      return e;
    }
    function Di(e) {
      return e.data === up || e.data === qc && e.ownerDocument.readyState === f1;
    }
    function No(e, t) {
      var a = e.ownerDocument;
      if (e.data !== qc || a.readyState === f1)
        t();
      else {
        var i = function() {
          t(), a.removeEventListener("DOMContentLoaded", i);
        };
        a.addEventListener("DOMContentLoaded", i), e._reactRetry = i;
      }
    }
    function va(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = e.data, t === Wv || t === up || t === qc || t === A0 || t === o1)
            break;
          if (t === Fv) return null;
        }
      }
      return e;
    }
    function fd(e) {
      if (e.nodeType === 1) {
        for (var t = e.nodeName.toLowerCase(), a = {}, i = e.attributes, o = 0; o < i.length; o++) {
          var f = i[o];
          a[Ho(f.name)] = f.name.toLowerCase() === "style" ? id(e) : f.value;
        }
        return { type: t, props: a };
      }
      return e.nodeType === 8 ? { type: "Suspense", props: {} } : e.nodeValue;
    }
    function tm(e, t, a) {
      return a === null || a[Zb] !== !0 ? (e.nodeValue === t ? e = null : (t = qu(t), e = qu(e.nodeValue) === t ? null : e.nodeValue), e) : null;
    }
    function qo(e) {
      e = e.nextSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Fv) {
            if (t === 0)
              return va(e.nextSibling);
            t--;
          } else
            a !== Wv && a !== up && a !== qc || t++;
        }
        e = e.nextSibling;
      }
      return null;
    }
    function rd(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (e.nodeType === 8) {
          var a = e.data;
          if (a === Wv || a === up || a === qc) {
            if (t === 0) return e;
            t--;
          } else a === Fv && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function Ha(e) {
      Lo(e);
    }
    function Pp(e) {
      Lo(e);
    }
    function ga(e, t, a, i, o) {
      switch (o && ns(e, i.ancestorInfo), t = ct(a), e) {
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
    function ev(e, t, a, i) {
      if (!a[xi] && ta(a)) {
        var o = a.tagName.toLowerCase();
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
      for (o = a.attributes; o.length; )
        a.removeAttributeNode(o[0]);
      Sl(a, e, t), a[Xl] = i, a[ba] = t;
    }
    function Bo(e) {
      for (var t = e.attributes; t.length; )
        e.removeAttributeNode(t[0]);
      nn(e);
    }
    function sd(e) {
      return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
    }
    function wu(e, t, a) {
      var i = yh;
      if (i && typeof t == "string" && t) {
        var o = pl(t);
        o = 'link[rel="' + e + '"][href="' + o + '"]', typeof a == "string" && (o += '[crossorigin="' + a + '"]'), m1.has(o) || (m1.add(o), e = { rel: e, crossOrigin: a, href: t }, i.querySelector(o) === null && (t = i.createElement("link"), Sl(t, "link", e), z(t), i.head.appendChild(t)));
      }
    }
    function sr(e, t, a, i) {
      var o = (o = Kn.current) ? sd(o) : null;
      if (!o)
        throw Error(
          '"resourceRoot" was expected to exist. This is a bug in React.'
        );
      switch (e) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = Dn(a.href), t = p(o).hoistableStyles, i = t.get(a), i || (i = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence == "string") {
            e = Dn(a.href);
            var f = p(o).hoistableStyles, d = f.get(e);
            if (!d && (o = o.ownerDocument || o, d = {
              type: "stylesheet",
              instance: null,
              count: 0,
              state: { loading: $r, preload: null }
            }, f.set(e, d), (f = o.querySelector(
              wo(e)
            )) && !f._p && (d.instance = f, d.state.loading = ip | ou), !fu.has(e))) {
              var h = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              };
              fu.set(e, h), f || tv(
                o,
                e,
                h,
                d.state
              );
            }
            if (t && i === null)
              throw a = `

  - ` + Yo(t) + `
  + ` + Yo(a), Error(
                "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
              );
            return d;
          }
          if (t && i !== null)
            throw a = `

  - ` + Yo(t) + `
  + ` + Yo(a), Error(
              "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + a
            );
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t != "function" && typeof t != "symbol" ? (a = zi(a), t = p(o).hoistableScripts, i = t.get(a), i || (i = {
            type: "script",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, i)), i) : { type: "void", instance: null, count: 0, state: null };
        default:
          throw Error(
            'getResource encountered a type it did not expect: "' + e + '". this is a bug in React.'
          );
      }
    }
    function Yo(e) {
      var t = 0, a = "<link";
      return typeof e.rel == "string" ? (t++, a += ' rel="' + e.rel + '"') : Jn.call(e, "rel") && (t++, a += ' rel="' + (e.rel === null ? "null" : "invalid type " + typeof e.rel) + '"'), typeof e.href == "string" ? (t++, a += ' href="' + e.href + '"') : Jn.call(e, "href") && (t++, a += ' href="' + (e.href === null ? "null" : "invalid type " + typeof e.href) + '"'), typeof e.precedence == "string" ? (t++, a += ' precedence="' + e.precedence + '"') : Jn.call(e, "precedence") && (t++, a += " precedence={" + (e.precedence === null ? "null" : "invalid type " + typeof e.precedence) + "}"), Object.getOwnPropertyNames(e).length > t && (a += " ..."), a + " />";
    }
    function Dn(e) {
      return 'href="' + pl(e) + '"';
    }
    function wo(e) {
      return 'link[rel="stylesheet"][' + e + "]";
    }
    function lm(e) {
      return Me({}, e, {
        "data-precedence": e.precedence,
        precedence: null
      });
    }
    function tv(e, t, a, i) {
      e.querySelector(
        'link[rel="preload"][as="style"][' + t + "]"
      ) ? i.loading = ip : (t = e.createElement("link"), i.preload = t, t.addEventListener("load", function() {
        return i.loading |= ip;
      }), t.addEventListener("error", function() {
        return i.loading |= h1;
      }), Sl(t, "link", a), z(t), e.head.appendChild(t));
    }
    function zi(e) {
      return '[src="' + pl(e) + '"]';
    }
    function Ec(e) {
      return "script[async]" + e;
    }
    function lv(e, t, a) {
      if (t.count++, t.instance === null)
        switch (t.type) {
          case "style":
            var i = e.querySelector(
              'style[data-href~="' + pl(a.href) + '"]'
            );
            if (i)
              return t.instance = i, z(i), i;
            var o = Me({}, a, {
              "data-href": a.href,
              "data-precedence": a.precedence,
              href: null,
              precedence: null
            });
            return i = (e.ownerDocument || e).createElement("style"), z(i), Sl(i, "style", o), dd(i, a.precedence, e), t.instance = i;
          case "stylesheet":
            o = Dn(a.href);
            var f = e.querySelector(
              wo(o)
            );
            if (f)
              return t.state.loading |= ou, t.instance = f, z(f), f;
            i = lm(a), (o = fu.get(o)) && am(i, o), f = (e.ownerDocument || e).createElement("link"), z(f);
            var d = f;
            return d._p = new Promise(function(h, v) {
              d.onload = h, d.onerror = v;
            }), Sl(f, "link", i), t.state.loading |= ou, dd(f, a.precedence, e), t.instance = f;
          case "script":
            return f = zi(a.src), (o = e.querySelector(
              Ec(f)
            )) ? (t.instance = o, z(o), o) : (i = a, (o = fu.get(f)) && (i = Me({}, a), hd(i, o)), e = e.ownerDocument || e, o = e.createElement("script"), z(o), Sl(o, "link", i), e.head.appendChild(o), t.instance = o);
          case "void":
            return null;
          default:
            throw Error(
              'acquireResource encountered a resource type it did not expect: "' + t.type + '". this is a bug in React.'
            );
        }
      else
        t.type === "stylesheet" && (t.state.loading & ou) === $r && (i = t.instance, t.state.loading |= ou, dd(i, a.precedence, e));
      return t.instance;
    }
    function dd(e, t, a) {
      for (var i = a.querySelectorAll(
        'link[rel="stylesheet"][data-precedence],style[data-precedence]'
      ), o = i.length ? i[i.length - 1] : null, f = o, d = 0; d < i.length; d++) {
        var h = i[d];
        if (h.dataset.precedence === t) f = h;
        else if (f !== o) break;
      }
      f ? f.parentNode.insertBefore(e, f.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t.insertBefore(e, t.firstChild));
    }
    function am(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
    }
    function hd(e, t) {
      e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
    }
    function nm(e, t, a) {
      if (Pv === null) {
        var i = /* @__PURE__ */ new Map(), o = Pv = /* @__PURE__ */ new Map();
        o.set(a, i);
      } else
        o = Pv, i = o.get(a), i || (i = /* @__PURE__ */ new Map(), o.set(a, i));
      if (i.has(e)) return i;
      for (i.set(e, null), a = a.getElementsByTagName(e), o = 0; o < a.length; o++) {
        var f = a[o];
        if (!(f[Ar] || f[Xl] || e === "link" && f.getAttribute("rel") === "stylesheet") && f.namespaceURI !== Ku) {
          var d = f.getAttribute(t) || "";
          d = e + d;
          var h = i.get(d);
          h ? h.push(f) : i.set(d, [f]);
        }
      }
      return i;
    }
    function Ac(e, t, a) {
      e = e.ownerDocument || e, e.head.insertBefore(
        a,
        t === "title" ? e.querySelector("head > title") : null
      );
    }
    function yd(e, t, a) {
      var i = !a.ancestorInfo.containerTagInScope;
      if (a.context === hh || t.itemProp != null)
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
              a = [], t.onLoad && a.push("`onLoad`"), o && a.push("`onError`"), f != null && a.push("`disabled`"), o = nt(a, "and"), o += a.length === 1 ? " prop" : " props", f = a.length === 1 ? "an " + o : "the " + o, a.length && console.error(
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
    function um(e) {
      return !(e.type === "stylesheet" && (e.state.loading & y1) === $r);
    }
    function av() {
    }
    function nv(e, t, a) {
      if (cp === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var i = cp;
      if (t.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (t.state.loading & ou) === $r) {
        if (t.instance === null) {
          var o = Dn(a.href), f = e.querySelector(
            wo(o)
          );
          if (f) {
            e = f._p, e !== null && typeof e == "object" && typeof e.then == "function" && (i.count++, i = dr.bind(i), e.then(i, i)), t.state.loading |= ou, t.instance = f, z(f);
            return;
          }
          f = e.ownerDocument || e, a = lm(a), (o = fu.get(o)) && am(a, o), f = f.createElement("link"), z(f);
          var d = f;
          d._p = new Promise(function(h, v) {
            d.onload = h, d.onerror = v;
          }), Sl(f, "link", a), t.instance = f;
        }
        i.stylesheets === null && (i.stylesheets = /* @__PURE__ */ new Map()), i.stylesheets.set(t, e), (e = t.state.preload) && (t.state.loading & y1) === $r && (i.count++, t = dr.bind(i), e.addEventListener("load", t), e.addEventListener("error", t));
      }
    }
    function uv() {
      if (cp === null)
        throw Error(
          "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
        );
      var e = cp;
      return e.stylesheets && e.count === 0 && md(e, e.stylesheets), 0 < e.count ? function(t) {
        var a = setTimeout(function() {
          if (e.stylesheets && md(e, e.stylesheets), e.unsuspend) {
            var i = e.unsuspend;
            e.unsuspend = null, i();
          }
        }, 6e4);
        return e.unsuspend = t, function() {
          e.unsuspend = null, clearTimeout(a);
        };
      } : null;
    }
    function dr() {
      if (this.count--, this.count === 0) {
        if (this.stylesheets)
          md(this, this.stylesheets);
        else if (this.unsuspend) {
          var e = this.unsuspend;
          this.unsuspend = null, e();
        }
      }
    }
    function md(e, t) {
      e.stylesheets = null, e.unsuspend !== null && (e.count++, eg = /* @__PURE__ */ new Map(), t.forEach(pd, e), eg = null, dr.call(e));
    }
    function pd(e, t) {
      if (!(t.state.loading & ou)) {
        var a = eg.get(e);
        if (a) var i = a.get(M0);
        else {
          a = /* @__PURE__ */ new Map(), eg.set(e, a);
          for (var o = e.querySelectorAll(
            "link[data-precedence],style[data-precedence]"
          ), f = 0; f < o.length; f++) {
            var d = o[f];
            (d.nodeName === "LINK" || d.getAttribute("media") !== "not all") && (a.set(d.dataset.precedence, d), i = d);
          }
          i && a.set(M0, i);
        }
        o = t.instance, d = o.getAttribute("data-precedence"), f = a.get(d) || i, f === i && a.set(M0, o), a.set(d, o), this.count++, i = dr.bind(this), o.addEventListener("load", i), o.addEventListener("error", i), f ? f.parentNode.insertBefore(o, f.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(o, e.firstChild)), t.state.loading |= ou;
      }
    }
    function iv(e, t, a, i, o, f, d, h) {
      for (this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = kr, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Vi(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Vi(0), this.hiddenUpdates = Vi(null), this.identifierPrefix = i, this.onUncaughtError = o, this.onCaughtError = f, this.onRecoverableError = d, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = h, this.incompleteTransitions = /* @__PURE__ */ new Map(), this.passiveEffectDuration = this.effectDuration = -0, this.memoizedUpdaters = /* @__PURE__ */ new Set(), e = this.pendingUpdatersLaneMap = [], t = 0; 31 > t; t++) e.push(/* @__PURE__ */ new Set());
      this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
    }
    function im(e, t, a, i, o, f, d, h, v, g, B, G) {
      return e = new iv(
        e,
        t,
        a,
        d,
        h,
        v,
        g,
        G
      ), t = Tb, f === !0 && (t |= Ta | Ju), en && (t |= Il), f = C(3, null, null, t), e.current = f, f.stateNode = e, t = Qh(), Za(t), e.pooledCache = t, Za(t), f.memoizedState = {
        element: i,
        isDehydrated: a,
        cache: t
      }, ci(f), e;
    }
    function Ot(e) {
      return e ? (e = Wo, e) : Wo;
    }
    function hr(e, t, a, i, o, f) {
      if (Hl && typeof Hl.onScheduleFiberRoot == "function")
        try {
          Hl.onScheduleFiberRoot(Dc, i, a);
        } catch (d) {
          tl || (tl = !0, console.error(
            "React instrumentation encountered an error: %s",
            d
          ));
        }
      ne !== null && typeof ne.markRenderScheduled == "function" && ne.markRenderScheduled(t), o = Ot(o), i.context === null ? i.context = o : i.pendingContext = o, $n && xl !== null && !S1 && (S1 = !0, console.error(
        `Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`,
        pe(xl) || "Unknown"
      )), i = rn(t), i.payload = { element: a }, f = f === void 0 ? null : f, f !== null && (typeof f != "function" && console.error(
        "Expected the last optional `callback` argument to be a function. Instead received: %s.",
        f
      ), i.callback = f), a = sn(e, i, t), a !== null && ($e(a, e, t), uc(a, e, t));
    }
    function cv(e, t) {
      if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
        var a = e.retryLane;
        e.retryLane = a !== 0 && a < t ? a : t;
      }
    }
    function vd(e, t) {
      cv(e, t), (e = e.alternate) && cv(e, t);
    }
    function ov(e) {
      if (e.tag === 13) {
        var t = aa(e, 67108864);
        t !== null && $e(t, e, 67108864), vd(e, 67108864);
      }
    }
    function Eg() {
      return xl;
    }
    function Ag() {
      for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; 31 > a; a++) {
        var i = sf(t);
        e.set(t, i), t *= 2;
      }
      return e;
    }
    function gd(e, t, a, i) {
      var o = q.T;
      q.T = null;
      var f = st.p;
      try {
        st.p = Na, yr(e, t, a, i);
      } finally {
        st.p = f, q.T = o;
      }
    }
    function jo(e, t, a, i) {
      var o = q.T;
      q.T = null;
      var f = st.p;
      try {
        st.p = kn, yr(e, t, a, i);
      } finally {
        st.p = f, q.T = o;
      }
    }
    function yr(e, t, a, i) {
      if (lg) {
        var o = Go(i);
        if (o === null)
          _a(
            e,
            t,
            i,
            ag,
            a
          ), zn(e, i);
        else if (Rg(
          o,
          e,
          t,
          a,
          i
        ))
          i.stopPropagation();
        else if (zn(e, i), t & 4 && -1 < Pb.indexOf(e)) {
          for (; o !== null; ) {
            var f = ta(o);
            if (f !== null)
              switch (f.tag) {
                case 3:
                  if (f = f.stateNode, f.current.memoizedState.isDehydrated) {
                    var d = St(f.pendingLanes);
                    if (d !== 0) {
                      var h = f;
                      for (h.pendingLanes |= 2, h.entangledLanes |= 2; d; ) {
                        var v = 1 << 31 - bl(d);
                        h.entanglements[1] |= v, d &= ~v;
                      }
                      Fa(f), (bt & (wa | Fu)) === Cn && (Gv = Cl() + FS, Si(0));
                    }
                  }
                  break;
                case 13:
                  h = aa(f, 2), h !== null && $e(h, f, 2), vc(), vd(f, 2);
              }
            if (f = Go(i), f === null && _a(
              e,
              t,
              i,
              ag,
              a
            ), f === o) break;
            o = f;
          }
          o !== null && i.stopPropagation();
        } else
          _a(
            e,
            t,
            i,
            null,
            a
          );
      }
    }
    function Go(e) {
      return e = un(e), mr(e);
    }
    function mr(e) {
      if (ag = null, e = Dl(e), e !== null) {
        var t = et(e);
        if (t === null) e = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (e = Nt(t), e !== null) return e;
            e = null;
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated)
              return t.tag === 3 ? t.stateNode.containerInfo : null;
            e = null;
          } else t !== e && (e = null);
        }
      }
      return ag = e, null;
    }
    function Mi(e) {
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
          return Na;
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
          return kn;
        case "message":
          switch (hv()) {
            case Tr:
              return Na;
            case dm:
              return kn;
            case Xo:
            case hm:
              return Qu;
            case ym:
              return Ud;
            default:
              return Qu;
          }
        default:
          return Qu;
      }
    }
    function zn(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          cf = null;
          break;
        case "dragenter":
        case "dragleave":
          of = null;
          break;
        case "mouseover":
        case "mouseout":
          ff = null;
          break;
        case "pointerover":
        case "pointerout":
          fp.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          rp.delete(t.pointerId);
      }
    }
    function ju(e, t, a, i, o, f) {
      return e === null || e.nativeEvent !== f ? (e = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: i,
        nativeEvent: f,
        targetContainers: [o]
      }, t !== null && (t = ta(t), t !== null && ov(t)), e) : (e.eventSystemFlags |= i, t = e.targetContainers, o !== null && t.indexOf(o) === -1 && t.push(o), e);
    }
    function Rg(e, t, a, i, o) {
      switch (t) {
        case "focusin":
          return cf = ju(
            cf,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "dragenter":
          return of = ju(
            of,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "mouseover":
          return ff = ju(
            ff,
            e,
            t,
            a,
            i,
            o
          ), !0;
        case "pointerover":
          var f = o.pointerId;
          return fp.set(
            f,
            ju(
              fp.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
        case "gotpointercapture":
          return f = o.pointerId, rp.set(
            f,
            ju(
              rp.get(f) || null,
              e,
              t,
              a,
              i,
              o
            )
          ), !0;
      }
      return !1;
    }
    function cm(e) {
      var t = Dl(e.target);
      if (t !== null) {
        var a = et(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = Nt(a), t !== null) {
              e.blockedOn = t, yu(e.priority, function() {
                if (a.tag === 13) {
                  var i = Ua(a);
                  i = Ga(i);
                  var o = aa(
                    a,
                    i
                  );
                  o !== null && $e(o, a, i), vd(a, i);
                }
              });
              return;
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function pr(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length; ) {
        var a = Go(e.nativeEvent);
        if (a === null) {
          a = e.nativeEvent;
          var i = new a.constructor(
            a.type,
            a
          ), o = i;
          s !== null && console.error(
            "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = o, a.target.dispatchEvent(i), s === null && console.error(
            "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
          ), s = null;
        } else
          return t = ta(a), t !== null && ov(t), e.blockedOn = a, !1;
        t.shift();
      }
      return !0;
    }
    function om(e, t, a) {
      pr(e) && a.delete(t);
    }
    function fv() {
      U0 = !1, cf !== null && pr(cf) && (cf = null), of !== null && pr(of) && (of = null), ff !== null && pr(ff) && (ff = null), fp.forEach(om), rp.forEach(om);
    }
    function Sd(e, t) {
      e.blockedOn === t && (e.blockedOn = null, U0 || (U0 = !0, It.unstable_scheduleCallback(
        It.unstable_NormalPriority,
        fv
      )));
    }
    function bd(e) {
      ng !== e && (ng = e, It.unstable_scheduleCallback(
        It.unstable_NormalPriority,
        function() {
          ng === e && (ng = null);
          for (var t = 0; t < e.length; t += 3) {
            var a = e[t], i = e[t + 1], o = e[t + 2];
            if (typeof i != "function") {
              if (mr(i || a) === null)
                continue;
              break;
            }
            var f = ta(a);
            f !== null && (e.splice(t, 3), t -= 3, a = {
              pending: !0,
              data: o,
              method: a.method,
              action: i
            }, Object.freeze(a), Hs(
              f,
              a,
              i,
              o
            ));
          }
        }
      ));
    }
    function Lo(e) {
      function t(v) {
        return Sd(v, e);
      }
      cf !== null && Sd(cf, e), of !== null && Sd(of, e), ff !== null && Sd(ff, e), fp.forEach(t), rp.forEach(t);
      for (var a = 0; a < rf.length; a++) {
        var i = rf[a];
        i.blockedOn === e && (i.blockedOn = null);
      }
      for (; 0 < rf.length && (a = rf[0], a.blockedOn === null); )
        cm(a), a.blockedOn === null && rf.shift();
      if (a = (e.ownerDocument || e).$$reactFormReplay, a != null)
        for (i = 0; i < a.length; i += 3) {
          var o = a[i], f = a[i + 1], d = o[ba] || null;
          if (typeof f == "function")
            d || bd(a);
          else if (d) {
            var h = null;
            if (f && f.hasAttribute("formAction")) {
              if (o = f, d = f[ba] || null)
                h = d.formAction;
              else if (mr(o) !== null) continue;
            } else h = d.action;
            typeof h == "function" ? a[i + 1] = h : (a.splice(i, 3), i -= 3), bd(a);
          }
        }
    }
    function Td(e) {
      this._internalRoot = e;
    }
    function Ed(e) {
      this._internalRoot = e;
    }
    function Ad(e) {
      e[xi] && (e._reactRootContainer ? console.error(
        "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
      ) : console.error(
        "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
      ));
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var It = K1(), fm = vh(), Og = J1(), Me = Object.assign, Dg = Symbol.for("react.element"), Gu = Symbol.for("react.transitional.element"), qe = Symbol.for("react.portal"), Ui = Symbol.for("react.fragment"), Rc = Symbol.for("react.strict_mode"), vr = Symbol.for("react.profiler"), rv = Symbol.for("react.provider"), gr = Symbol.for("react.consumer"), Sa = Symbol.for("react.context"), _i = Symbol.for("react.forward_ref"), Ci = Symbol.for("react.suspense"), Rd = Symbol.for("react.suspense_list"), Od = Symbol.for("react.memo"), xa = Symbol.for("react.lazy"), Dd = Symbol.for("react.activity"), sv = Symbol.for("react.memo_cache_sentinel"), Sr = Symbol.iterator, Dt = Symbol.for("react.client.reference"), hl = Array.isArray, q = fm.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, st = Og.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, rm = Object.freeze({
      pending: !1,
      data: null,
      method: null,
      action: null
    }), br = [], Vo = [], Zn = -1, Lu = gt(null), Oc = gt(null), Kn = gt(null), zd = gt(null), Jn = Object.prototype.hasOwnProperty, sm = It.unstable_scheduleCallback, dv = It.unstable_cancelCallback, zg = It.unstable_shouldYield, Mg = It.unstable_requestPaint, Cl = It.unstable_now, hv = It.unstable_getCurrentPriorityLevel, Tr = It.unstable_ImmediatePriority, dm = It.unstable_UserBlockingPriority, Xo = It.unstable_NormalPriority, hm = It.unstable_LowPriority, ym = It.unstable_IdlePriority, Mn = It.log, mm = It.unstable_setDisableYieldValue, Dc = null, Hl = null, ne = null, tl = !1, en = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u", bl = Math.clz32 ? Math.clz32 : Fr, Vu = Math.log, Ug = Math.LN2, Md = 256, Xu = 4194304, Na = 2, kn = 8, Qu = 32, Ud = 268435456, Hi = Math.random().toString(36).slice(2), Xl = "__reactFiber$" + Hi, ba = "__reactProps$" + Hi, xi = "__reactContainer$" + Hi, _d = "__reactEvents$" + Hi, Qo = "__reactListeners$" + Hi, Er = "__reactHandles$" + Hi, pm = "__reactResources$" + Hi, Ar = "__reactMarker$" + Hi, zc = /* @__PURE__ */ new Set(), Un = {}, Cd = {}, Hd = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    }, vm = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), xd = {}, Rr = {}, Zo = 0, gm, yv, Sm, Ko, mv, pv, vv;
    qn.__reactDisabledLog = !0;
    var Jo, Or, Dr = !1, bm = new (typeof WeakMap == "function" ? WeakMap : Map)(), xl = null, $n = !1, gv = /[\n"\\]/g, Tm = !1, Em = !1, Am = !1, Nd = !1, Rm = !1, zr = !1, Sv = ["value", "defaultValue"], bv = !1, qd = /["'&<>\n\t]|^\s|\s$/, Om = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
      " "
    ), Mr = "applet caption html table td th marquee object template foreignObject desc title".split(
      " "
    ), Dm = Mr.concat(["button"]), Tv = "dd dt li option optgroup p rp rt".split(" "), Bd = {
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
    }, _n = {}, Wn = {
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
    }, Zu = /([A-Z])/g, ko = /^ms-/, Ur = /^(?:webkit|moz|o)[A-Z]/, Ni = /^-ms-/, _g = /-(.)/g, zm = /;\s*$/, Fn = {}, Mm = {}, Um = !1, _r = !1, _m = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
        " "
      )
    ), Yd = "http://www.w3.org/1998/Math/MathML", Ku = "http://www.w3.org/2000/svg", wd = /* @__PURE__ */ new Map([
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
    ]), Cr = {
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
    }, $o = {
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
    }, qi = {}, jd = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Ev = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), Av = !1, Tl = {}, l = /^on./, n = /^on[^A-Z]/, u = RegExp(
      "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), c = RegExp(
      "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
    ), r = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, s = null, y = null, m = null, S = !1, U = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Z = !1;
    if (U)
      try {
        var k = {};
        Object.defineProperty(k, "passive", {
          get: function() {
            Z = !0;
          }
        }), window.addEventListener("test", k, k), window.removeEventListener("test", k, k);
      } catch {
        Z = !1;
      }
    var H = null, w = null, Ee = null, Se = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, dt = Ml(Se), M = Me({}, Se, { view: 0, detail: 0 }), O = Ml(M), _, K, fe, Ge = Me({}, M, {
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
      getModifierState: jl,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (e !== fe && (fe && e.type === "mousemove" ? (_ = e.screenX - fe.screenX, K = e.screenY - fe.screenY) : K = _ = 0, fe = e), _);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : K;
      }
    }), ge = Ml(Ge), Re = Me({}, Ge, { dataTransfer: 0 }), El = Ml(Re), ot = Me({}, M, { relatedTarget: 0 }), In = Ml(ot), Cg = Me({}, Se, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), $1 = Ml(Cg), W1 = Me({}, Se, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), F1 = Ml(W1), I1 = Me({}, Se, { data: 0 }), H0 = Ml(
      I1
    ), P1 = H0, eb = {
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
    }, tb = {
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
    }, lb = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    }, ab = Me({}, M, {
      key: function(e) {
        if (e.key) {
          var t = eb[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress" ? (e = $i(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? tb[e.keyCode] || "Unidentified" : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: jl,
      charCode: function(e) {
        return e.type === "keypress" ? $i(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? $i(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), nb = Ml(ab), ub = Me({}, Ge, {
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
    }), x0 = Ml(ub), ib = Me({}, M, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: jl
    }), cb = Ml(ib), ob = Me({}, Se, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), fb = Ml(ob), rb = Me({}, Ge, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
      },
      deltaZ: 0,
      deltaMode: 0
    }), sb = Ml(rb), db = Me({}, Se, {
      newState: 0,
      oldState: 0
    }), hb = Ml(db), yb = [9, 13, 27, 32], N0 = 229, Hg = U && "CompositionEvent" in window, Cm = null;
    U && "documentMode" in document && (Cm = document.documentMode);
    var mb = U && "TextEvent" in window && !Cm, q0 = U && (!Hg || Cm && 8 < Cm && 11 >= Cm), B0 = 32, Y0 = String.fromCharCode(B0), w0 = !1, Gd = !1, pb = {
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
    }, Hm = null, xm = null, j0 = !1;
    U && (j0 = Ch("input") && (!document.documentMode || 9 < document.documentMode));
    var qa = typeof Object.is == "function" ? Object.is : pg, vb = U && "documentMode" in document && 11 >= document.documentMode, Ld = null, xg = null, Nm = null, Ng = !1, Vd = {
      animationend: Wi("Animation", "AnimationEnd"),
      animationiteration: Wi("Animation", "AnimationIteration"),
      animationstart: Wi("Animation", "AnimationStart"),
      transitionrun: Wi("Transition", "TransitionRun"),
      transitionstart: Wi("Transition", "TransitionStart"),
      transitioncancel: Wi("Transition", "TransitionCancel"),
      transitionend: Wi("Transition", "TransitionEnd")
    }, qg = {}, G0 = {};
    U && (G0 = document.createElement("div").style, "AnimationEvent" in window || (delete Vd.animationend.animation, delete Vd.animationiteration.animation, delete Vd.animationstart.animation), "TransitionEvent" in window || delete Vd.transitionend.transition);
    var L0 = Fi("animationend"), V0 = Fi("animationiteration"), X0 = Fi("animationstart"), gb = Fi("transitionrun"), Sb = Fi("transitionstart"), bb = Fi("transitioncancel"), Q0 = Fi("transitionend"), Z0 = /* @__PURE__ */ new Map(), Bg = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
    Bg.push("scrollEnd");
    var Yg = /* @__PURE__ */ new WeakMap(), wg = 1, Hr = 2, Pn = [], Xd = 0, jg = 0, Wo = {};
    Object.freeze(Wo);
    var eu = null, Qd = null, Qt = 0, Tb = 1, Il = 2, Ta = 8, Ju = 16, K0 = 64, J0 = !1;
    try {
      var k0 = Object.preventExtensions({});
    } catch {
      J0 = !0;
    }
    var Zd = [], Kd = 0, Rv = null, Ov = 0, tu = [], lu = 0, xr = null, Mc = 1, Uc = "", Ba = null, cl = null, ft = !1, _c = !1, au = null, Nr = null, Bi = !1, Gg = Error(
      "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), $0 = 0;
    if (typeof performance == "object" && typeof performance.now == "function")
      var Eb = performance, W0 = function() {
        return Eb.now();
      };
    else {
      var Ab = Date;
      W0 = function() {
        return Ab.now();
      };
    }
    var Lg = gt(null), Vg = gt(null), F0 = {}, Dv = null, Jd = null, kd = !1, Rb = typeof AbortController < "u" ? AbortController : function() {
      var e = [], t = this.signal = {
        aborted: !1,
        addEventListener: function(a, i) {
          e.push(i);
        }
      };
      this.abort = function() {
        t.aborted = !0, e.forEach(function(a) {
          return a();
        });
      };
    }, Ob = It.unstable_scheduleCallback, Db = It.unstable_NormalPriority, Nl = {
      $$typeof: Sa,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
      _currentRenderer: null,
      _currentRenderer2: null
    }, $d = It.unstable_now, I0 = -0, zv = -0, tn = -1.1, qr = -0, Mv = !1, Uv = !1, qm = null, Xg = 0, Br = 0, Wd = null, P0 = q.S;
    q.S = function(e, t) {
      typeof t == "object" && t !== null && typeof t.then == "function" && Cp(e, t), P0 !== null && P0(e, t);
    };
    var Yr = gt(null), ku = {
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
    }, Bm = [], Ym = [], wm = [], jm = [], Gm = [], Lm = [], wr = /* @__PURE__ */ new Set();
    ku.recordUnsafeLifecycleWarnings = function(e, t) {
      wr.has(e.type) || (typeof t.componentWillMount == "function" && t.componentWillMount.__suppressDeprecationWarning !== !0 && Bm.push(e), e.mode & Ta && typeof t.UNSAFE_componentWillMount == "function" && Ym.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && wm.push(e), e.mode & Ta && typeof t.UNSAFE_componentWillReceiveProps == "function" && jm.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Gm.push(e), e.mode & Ta && typeof t.UNSAFE_componentWillUpdate == "function" && Lm.push(e));
    }, ku.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      0 < Bm.length && (Bm.forEach(function(h) {
        e.add(
          pe(h) || "Component"
        ), wr.add(h.type);
      }), Bm = []);
      var t = /* @__PURE__ */ new Set();
      0 < Ym.length && (Ym.forEach(function(h) {
        t.add(
          pe(h) || "Component"
        ), wr.add(h.type);
      }), Ym = []);
      var a = /* @__PURE__ */ new Set();
      0 < wm.length && (wm.forEach(function(h) {
        a.add(
          pe(h) || "Component"
        ), wr.add(h.type);
      }), wm = []);
      var i = /* @__PURE__ */ new Set();
      0 < jm.length && (jm.forEach(
        function(h) {
          i.add(
            pe(h) || "Component"
          ), wr.add(h.type);
        }
      ), jm = []);
      var o = /* @__PURE__ */ new Set();
      0 < Gm.length && (Gm.forEach(function(h) {
        o.add(
          pe(h) || "Component"
        ), wr.add(h.type);
      }), Gm = []);
      var f = /* @__PURE__ */ new Set();
      if (0 < Lm.length && (Lm.forEach(function(h) {
        f.add(
          pe(h) || "Component"
        ), wr.add(h.type);
      }), Lm = []), 0 < t.size) {
        var d = $(
          t
        );
        console.error(
          `Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`,
          d
        );
      }
      0 < i.size && (d = $(
        i
      ), console.error(
        `Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state

Please update the following components: %s`,
        d
      )), 0 < f.size && (d = $(
        f
      ), console.error(
        `Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`,
        d
      )), 0 < e.size && (d = $(e), console.warn(
        `componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < a.size && (d = $(
        a
      ), console.warn(
        `componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      )), 0 < o.size && (d = $(o), console.warn(
        `componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`,
        d
      ));
    };
    var _v = /* @__PURE__ */ new Map(), eS = /* @__PURE__ */ new Set();
    ku.recordLegacyContextWarning = function(e, t) {
      for (var a = null, i = e; i !== null; )
        i.mode & Ta && (a = i), i = i.return;
      a === null ? console.error(
        "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
      ) : !eS.has(e.type) && (i = _v.get(a), e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], _v.set(a, i)), i.push(e));
    }, ku.flushLegacyContextWarning = function() {
      _v.forEach(function(e) {
        if (e.length !== 0) {
          var t = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(o) {
            a.add(pe(o) || "Component"), eS.add(o.type);
          });
          var i = $(a);
          me(t, function() {
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
    }, ku.discardPendingWarnings = function() {
      Bm = [], Ym = [], wm = [], jm = [], Gm = [], Lm = [], _v = /* @__PURE__ */ new Map();
    };
    var Vm = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
    ), tS = Error(
      "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
    ), Cv = Error(
      "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
    ), Qg = {
      then: function() {
        console.error(
          'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
        );
      }
    }, Xm = null, Hv = !1, nu = 0, uu = 1, Ya = 2, Pl = 4, ql = 8, lS = 0, aS = 1, nS = 2, Zg = 3, Fo = !1, uS = !1, Kg = null, Jg = !1, Fd = gt(null), xv = gt(0), Id, iS = /* @__PURE__ */ new Set(), cS = /* @__PURE__ */ new Set(), kg = /* @__PURE__ */ new Set(), oS = /* @__PURE__ */ new Set(), Io = 0, Ue = null, xt = null, Al = null, Nv = !1, Pd = !1, jr = !1, qv = 0, Qm = 0, Cc = null, zb = 0, Mb = 25, j = null, iu = null, Hc = -1, Zm = !1, Bv = {
      readContext: qt,
      use: kt,
      useCallback: Ht,
      useContext: Ht,
      useEffect: Ht,
      useImperativeHandle: Ht,
      useLayoutEffect: Ht,
      useInsertionEffect: Ht,
      useMemo: Ht,
      useReducer: Ht,
      useRef: Ht,
      useState: Ht,
      useDebugValue: Ht,
      useDeferredValue: Ht,
      useTransition: Ht,
      useSyncExternalStore: Ht,
      useId: Ht,
      useHostTransitionStatus: Ht,
      useFormState: Ht,
      useActionState: Ht,
      useOptimistic: Ht,
      useMemoCache: Ht,
      useCacheRefresh: Ht
    }, $g = null, fS = null, Wg = null, rS = null, Yi = null, $u = null, Yv = null;
    $g = {
      readContext: function(e) {
        return qt(e);
      },
      use: kt,
      useCallback: function(e, t) {
        return j = "useCallback", we(), fi(t), so(e, t);
      },
      useContext: function(e) {
        return j = "useContext", we(), qt(e);
      },
      useEffect: function(e, t) {
        return j = "useEffect", we(), fi(t), wf(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", we(), fi(a), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        j = "useInsertionEffect", we(), fi(t), Ja(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", we(), fi(t), Ph(e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", we(), fi(t);
        var a = q.H;
        q.H = Yi;
        try {
          return oc(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", we();
        var i = q.H;
        q.H = Yi;
        try {
          return Au(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function(e) {
        return j = "useRef", we(), hi(e);
      },
      useState: function(e) {
        j = "useState", we();
        var t = q.H;
        q.H = Yi;
        try {
          return pn(e);
        } finally {
          q.H = t;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", we();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", we(), ho(e, t);
      },
      useTransition: function() {
        return j = "useTransition", we(), Lf();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", we(), Ds(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", we(), fc();
      },
      useFormState: function(e, t) {
        return j = "useFormState", we(), lo(), oo(e, t);
      },
      useActionState: function(e, t) {
        return j = "useActionState", we(), oo(e, t);
      },
      useOptimistic: function(e) {
        return j = "useOptimistic", we(), jn(e);
      },
      useHostTransitionStatus: oa,
      useMemoCache: Et,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", we(), Vf();
      }
    }, fS = {
      readContext: function(e) {
        return qt(e);
      },
      use: kt,
      useCallback: function(e, t) {
        return j = "useCallback", F(), so(e, t);
      },
      useContext: function(e) {
        return j = "useContext", F(), qt(e);
      },
      useEffect: function(e, t) {
        return j = "useEffect", F(), wf(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", F(), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        j = "useInsertionEffect", F(), Ja(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", F(), Ph(e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", F();
        var a = q.H;
        q.H = Yi;
        try {
          return oc(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", F();
        var i = q.H;
        q.H = Yi;
        try {
          return Au(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function(e) {
        return j = "useRef", F(), hi(e);
      },
      useState: function(e) {
        j = "useState", F();
        var t = q.H;
        q.H = Yi;
        try {
          return pn(e);
        } finally {
          q.H = t;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", F();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", F(), ho(e, t);
      },
      useTransition: function() {
        return j = "useTransition", F(), Lf();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", F(), Ds(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", F(), fc();
      },
      useActionState: function(e, t) {
        return j = "useActionState", F(), oo(e, t);
      },
      useFormState: function(e, t) {
        return j = "useFormState", F(), lo(), oo(e, t);
      },
      useOptimistic: function(e) {
        return j = "useOptimistic", F(), jn(e);
      },
      useHostTransitionStatus: oa,
      useMemoCache: Et,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", F(), Vf();
      }
    }, Wg = {
      readContext: function(e) {
        return qt(e);
      },
      use: kt,
      useCallback: function(e, t) {
        return j = "useCallback", F(), jf(e, t);
      },
      useContext: function(e) {
        return j = "useContext", F(), qt(e);
      },
      useEffect: function(e, t) {
        j = "useEffect", F(), ca(2048, ql, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", F(), ro(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return j = "useInsertionEffect", F(), ca(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", F(), ca(4, Pl, e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", F();
        var a = q.H;
        q.H = $u;
        try {
          return Gf(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", F();
        var i = q.H;
        q.H = $u;
        try {
          return $l(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function() {
        return j = "useRef", F(), pt().memoizedState;
      },
      useState: function() {
        j = "useState", F();
        var e = q.H;
        q.H = $u;
        try {
          return $l(je);
        } finally {
          q.H = e;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", F();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", F(), Cs(e, t);
      },
      useTransition: function() {
        return j = "useTransition", F(), xs();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", F(), qf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", F(), pt().memoizedState;
      },
      useFormState: function(e) {
        return j = "useFormState", F(), lo(), _s(e);
      },
      useActionState: function(e) {
        return j = "useActionState", F(), _s(e);
      },
      useOptimistic: function(e, t) {
        return j = "useOptimistic", F(), Gn(e, t);
      },
      useHostTransitionStatus: oa,
      useMemoCache: Et,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", F(), pt().memoizedState;
      }
    }, rS = {
      readContext: function(e) {
        return qt(e);
      },
      use: kt,
      useCallback: function(e, t) {
        return j = "useCallback", F(), jf(e, t);
      },
      useContext: function(e) {
        return j = "useContext", F(), qt(e);
      },
      useEffect: function(e, t) {
        j = "useEffect", F(), ca(2048, ql, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", F(), ro(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return j = "useInsertionEffect", F(), ca(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", F(), ca(4, Pl, e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", F();
        var a = q.H;
        q.H = Yv;
        try {
          return Gf(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", F();
        var i = q.H;
        q.H = Yv;
        try {
          return mn(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function() {
        return j = "useRef", F(), pt().memoizedState;
      },
      useState: function() {
        j = "useState", F();
        var e = q.H;
        q.H = Yv;
        try {
          return mn(je);
        } finally {
          q.H = e;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", F();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", F(), ty(e, t);
      },
      useTransition: function() {
        return j = "useTransition", F(), zu();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", F(), qf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", F(), pt().memoizedState;
      },
      useFormState: function(e) {
        return j = "useFormState", F(), lo(), di(e);
      },
      useActionState: function(e) {
        return j = "useActionState", F(), di(e);
      },
      useOptimistic: function(e, t) {
        return j = "useOptimistic", F(), Us(e, t);
      },
      useHostTransitionStatus: oa,
      useMemoCache: Et,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", F(), pt().memoizedState;
      }
    }, Yi = {
      readContext: function(e) {
        return ie(), qt(e);
      },
      use: function(e) {
        return D(), kt(e);
      },
      useCallback: function(e, t) {
        return j = "useCallback", D(), we(), so(e, t);
      },
      useContext: function(e) {
        return j = "useContext", D(), we(), qt(e);
      },
      useEffect: function(e, t) {
        return j = "useEffect", D(), we(), wf(e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", D(), we(), Ou(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        j = "useInsertionEffect", D(), we(), Ja(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", D(), we(), Ph(e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", D(), we();
        var a = q.H;
        q.H = Yi;
        try {
          return oc(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", D(), we();
        var i = q.H;
        q.H = Yi;
        try {
          return Au(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function(e) {
        return j = "useRef", D(), we(), hi(e);
      },
      useState: function(e) {
        j = "useState", D(), we();
        var t = q.H;
        q.H = Yi;
        try {
          return pn(e);
        } finally {
          q.H = t;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", D(), we();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", D(), we(), ho(e, t);
      },
      useTransition: function() {
        return j = "useTransition", D(), we(), Lf();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", D(), we(), Ds(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", D(), we(), fc();
      },
      useFormState: function(e, t) {
        return j = "useFormState", D(), we(), oo(e, t);
      },
      useActionState: function(e, t) {
        return j = "useActionState", D(), we(), oo(e, t);
      },
      useOptimistic: function(e) {
        return j = "useOptimistic", D(), we(), jn(e);
      },
      useMemoCache: function(e) {
        return D(), Et(e);
      },
      useHostTransitionStatus: oa,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", we(), Vf();
      }
    }, $u = {
      readContext: function(e) {
        return ie(), qt(e);
      },
      use: function(e) {
        return D(), kt(e);
      },
      useCallback: function(e, t) {
        return j = "useCallback", D(), F(), jf(e, t);
      },
      useContext: function(e) {
        return j = "useContext", D(), F(), qt(e);
      },
      useEffect: function(e, t) {
        j = "useEffect", D(), F(), ca(2048, ql, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", D(), F(), ro(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return j = "useInsertionEffect", D(), F(), ca(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", D(), F(), ca(4, Pl, e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", D(), F();
        var a = q.H;
        q.H = $u;
        try {
          return Gf(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", D(), F();
        var i = q.H;
        q.H = $u;
        try {
          return $l(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function() {
        return j = "useRef", D(), F(), pt().memoizedState;
      },
      useState: function() {
        j = "useState", D(), F();
        var e = q.H;
        q.H = $u;
        try {
          return $l(je);
        } finally {
          q.H = e;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", D(), F();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", D(), F(), Cs(e, t);
      },
      useTransition: function() {
        return j = "useTransition", D(), F(), xs();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", D(), F(), qf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", D(), F(), pt().memoizedState;
      },
      useFormState: function(e) {
        return j = "useFormState", D(), F(), _s(e);
      },
      useActionState: function(e) {
        return j = "useActionState", D(), F(), _s(e);
      },
      useOptimistic: function(e, t) {
        return j = "useOptimistic", D(), F(), Gn(e, t);
      },
      useMemoCache: function(e) {
        return D(), Et(e);
      },
      useHostTransitionStatus: oa,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", F(), pt().memoizedState;
      }
    }, Yv = {
      readContext: function(e) {
        return ie(), qt(e);
      },
      use: function(e) {
        return D(), kt(e);
      },
      useCallback: function(e, t) {
        return j = "useCallback", D(), F(), jf(e, t);
      },
      useContext: function(e) {
        return j = "useContext", D(), F(), qt(e);
      },
      useEffect: function(e, t) {
        j = "useEffect", D(), F(), ca(2048, ql, e, t);
      },
      useImperativeHandle: function(e, t, a) {
        return j = "useImperativeHandle", D(), F(), ro(e, t, a);
      },
      useInsertionEffect: function(e, t) {
        return j = "useInsertionEffect", D(), F(), ca(4, Ya, e, t);
      },
      useLayoutEffect: function(e, t) {
        return j = "useLayoutEffect", D(), F(), ca(4, Pl, e, t);
      },
      useMemo: function(e, t) {
        j = "useMemo", D(), F();
        var a = q.H;
        q.H = $u;
        try {
          return Gf(e, t);
        } finally {
          q.H = a;
        }
      },
      useReducer: function(e, t, a) {
        j = "useReducer", D(), F();
        var i = q.H;
        q.H = $u;
        try {
          return mn(e, t, a);
        } finally {
          q.H = i;
        }
      },
      useRef: function() {
        return j = "useRef", D(), F(), pt().memoizedState;
      },
      useState: function() {
        j = "useState", D(), F();
        var e = q.H;
        q.H = $u;
        try {
          return mn(je);
        } finally {
          q.H = e;
        }
      },
      useDebugValue: function() {
        j = "useDebugValue", D(), F();
      },
      useDeferredValue: function(e, t) {
        return j = "useDeferredValue", D(), F(), ty(e, t);
      },
      useTransition: function() {
        return j = "useTransition", D(), F(), zu();
      },
      useSyncExternalStore: function(e, t, a) {
        return j = "useSyncExternalStore", D(), F(), qf(
          e,
          t,
          a
        );
      },
      useId: function() {
        return j = "useId", D(), F(), pt().memoizedState;
      },
      useFormState: function(e) {
        return j = "useFormState", D(), F(), di(e);
      },
      useActionState: function(e) {
        return j = "useActionState", D(), F(), di(e);
      },
      useOptimistic: function(e, t) {
        return j = "useOptimistic", D(), F(), Us(e, t);
      },
      useMemoCache: function(e) {
        return D(), Et(e);
      },
      useHostTransitionStatus: oa,
      useCacheRefresh: function() {
        return j = "useCacheRefresh", F(), pt().memoizedState;
      }
    };
    var sS = {
      "react-stack-bottom-frame": function(e, t, a) {
        var i = $n;
        $n = !0;
        try {
          return e(t, a);
        } finally {
          $n = i;
        }
      }
    }, Fg = sS["react-stack-bottom-frame"].bind(sS), dS = {
      "react-stack-bottom-frame": function(e) {
        var t = $n;
        $n = !0;
        try {
          return e.render();
        } finally {
          $n = t;
        }
      }
    }, hS = dS["react-stack-bottom-frame"].bind(dS), yS = {
      "react-stack-bottom-frame": function(e, t) {
        try {
          t.componentDidMount();
        } catch (a) {
          At(e, e.return, a);
        }
      }
    }, Ig = yS["react-stack-bottom-frame"].bind(yS), mS = {
      "react-stack-bottom-frame": function(e, t, a, i, o) {
        try {
          t.componentDidUpdate(a, i, o);
        } catch (f) {
          At(e, e.return, f);
        }
      }
    }, pS = mS["react-stack-bottom-frame"].bind(mS), vS = {
      "react-stack-bottom-frame": function(e, t) {
        var a = t.stack;
        e.componentDidCatch(t.value, {
          componentStack: a !== null ? a : ""
        });
      }
    }, Ub = vS["react-stack-bottom-frame"].bind(vS), gS = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a.componentWillUnmount();
        } catch (i) {
          At(e, t, i);
        }
      }
    }, SS = gS["react-stack-bottom-frame"].bind(gS), bS = {
      "react-stack-bottom-frame": function(e) {
        e.resourceKind != null && console.error(
          "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
          e.resourceKind
        );
        var t = e.create;
        return e = e.inst, t = t(), e.destroy = t;
      }
    }, _b = bS["react-stack-bottom-frame"].bind(bS), TS = {
      "react-stack-bottom-frame": function(e, t, a) {
        try {
          a();
        } catch (i) {
          At(e, t, i);
        }
      }
    }, Cb = TS["react-stack-bottom-frame"].bind(TS), ES = {
      "react-stack-bottom-frame": function(e) {
        var t = e._init;
        return t(e._payload);
      }
    }, Po = ES["react-stack-bottom-frame"].bind(ES), eh = null, Km = 0, Ze = null, Pg, AS = Pg = !1, RS = {}, OS = {}, DS = {};
    oe = function(e, t, a) {
      if (a !== null && typeof a == "object" && a._store && (!a._store.validated && a.key == null || a._store.validated === 2)) {
        if (typeof a._store != "object")
          throw Error(
            "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
          );
        a._store.validated = 1;
        var i = pe(e), o = i || "null";
        if (!RS[o]) {
          RS[o] = !0, a = a._owner, e = e._debugOwner;
          var f = "";
          e && typeof e.tag == "number" && (o = pe(e)) && (f = `

Check the render method of \`` + o + "`."), f || i && (f = `

Check the top-level render call using <` + i + ">.");
          var d = "";
          a != null && e !== a && (i = null, typeof a.tag == "number" ? i = pe(a) : typeof a.name == "string" && (i = a.name), i && (d = " It was passed a child from " + i + ".")), me(t, function() {
            console.error(
              'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
              f,
              d
            );
          });
        }
      }
    };
    var th = sc(!0), zS = sc(!1), cu = gt(null), wi = null, lh = 1, Jm = 2, Bl = gt(0), MS = {}, US = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), HS = /* @__PURE__ */ new Set(), xS = /* @__PURE__ */ new Set(), NS = /* @__PURE__ */ new Set(), qS = /* @__PURE__ */ new Set(), BS = /* @__PURE__ */ new Set(), YS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set();
    Object.freeze(MS);
    var e0 = {
      enqueueSetState: function(e, t, a) {
        e = e._reactInternals;
        var i = Ua(e), o = rn(i);
        o.payload = t, a != null && (Jt(a), o.callback = a), t = sn(e, o, i), t !== null && ($e(t, e, i), uc(t, e, i)), Nn(e, i);
      },
      enqueueReplaceState: function(e, t, a) {
        e = e._reactInternals;
        var i = Ua(e), o = rn(i);
        o.tag = aS, o.payload = t, a != null && (Jt(a), o.callback = a), t = sn(e, o, i), t !== null && ($e(t, e, i), uc(t, e, i)), Nn(e, i);
      },
      enqueueForceUpdate: function(e, t) {
        e = e._reactInternals;
        var a = Ua(e), i = rn(a);
        i.tag = nS, t != null && (Jt(t), i.callback = t), t = sn(e, i, a), t !== null && ($e(t, e, a), uc(t, e, a)), ne !== null && typeof ne.markForceUpdateScheduled == "function" && ne.markForceUpdateScheduled(e, a);
      }
    }, t0 = typeof reportError == "function" ? reportError : function(e) {
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
    }, ah = null, l0 = null, jS = Error(
      "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
    ), Ql = !1, GS = {}, LS = {}, VS = {}, XS = {}, nh = !1, QS = {}, a0 = {}, n0 = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    }, ZS = !1, KS = null;
    KS = /* @__PURE__ */ new Set();
    var xc = !1, yl = !1, u0 = !1, JS = typeof WeakSet == "function" ? WeakSet : Set, Zl = null, uh = null, ih = null, Rl = null, ln = !1, Wu = null, km = 8192, Hb = {
      getCacheForType: function(e) {
        var t = qt(Nl), a = t.data.get(e);
        return a === void 0 && (a = e(), t.data.set(e, a)), a;
      },
      getOwner: function() {
        return xl;
      }
    };
    if (typeof Symbol == "function" && Symbol.for) {
      var $m = Symbol.for;
      $m("selector.component"), $m("selector.has_pseudo_class"), $m("selector.role"), $m("selector.test_id"), $m("selector.text");
    }
    var xb = [], Nb = typeof WeakMap == "function" ? WeakMap : Map, Cn = 0, wa = 2, Fu = 4, Nc = 0, Wm = 1, ch = 2, i0 = 3, Gr = 4, wv = 6, kS = 5, bt = Cn, jt = null, Pe = null, tt = 0, an = 0, Fm = 1, Lr = 2, Im = 3, $S = 4, c0 = 5, oh = 6, Pm = 7, o0 = 8, Vr = 9, zt = an, Hn = null, ef = !1, fh = !1, f0 = !1, ji = 0, ol = Nc, tf = 0, lf = 0, r0 = 0, xn = 0, Xr = 0, ep = null, ja = null, jv = !1, s0 = 0, WS = 300, Gv = 1 / 0, FS = 500, tp = null, af = null, qb = 0, Bb = 1, Yb = 2, Qr = 0, IS = 1, PS = 2, e1 = 3, wb = 4, d0 = 5, ea = 0, nf = null, rh = null, uf = 0, h0 = 0, y0 = null, t1 = null, jb = 50, lp = 0, m0 = null, p0 = !1, Lv = !1, Gb = 50, Zr = 0, ap = null, sh = !1, Vv = null, l1 = !1, a1 = /* @__PURE__ */ new Set(), Lb = {}, Xv = null, dh = null, v0 = !1, g0 = !1, Qv = !1, S0 = !1, Kr = 0, b0 = {};
    (function() {
      for (var e = 0; e < Bg.length; e++) {
        var t = Bg[e], a = t.toLowerCase();
        t = t[0].toUpperCase() + t.slice(1), cn(a, "on" + t);
      }
      cn(L0, "onAnimationEnd"), cn(V0, "onAnimationIteration"), cn(X0, "onAnimationStart"), cn("dblclick", "onDoubleClick"), cn("focusin", "onFocus"), cn("focusout", "onBlur"), cn(gb, "onTransitionRun"), cn(Sb, "onTransitionStart"), cn(bb, "onTransitionCancel"), cn(Q0, "onTransitionEnd");
    })(), te("onMouseEnter", ["mouseout", "mouseover"]), te("onMouseLeave", ["mouseout", "mouseover"]), te("onPointerEnter", ["pointerout", "pointerover"]), te("onPointerLeave", ["pointerout", "pointerover"]), P(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ), P(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ), P("onBeforeInput", [
      "compositionend",
      "keypress",
      "textInput",
      "paste"
    ]), P(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ), P(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ), P(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    );
    var np = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ), T0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(np)
    ), Zv = "_reactListening" + Math.random().toString(36).slice(2), n1 = !1, u1 = !1, Kv = !1, i1 = !1, Jv = !1, kv = !1, c1 = !1, $v = {}, Vb = /\r\n?/g, Xb = /\u0000|\uFFFD/g, Jr = "http://www.w3.org/1999/xlink", E0 = "http://www.w3.org/XML/1998/namespace", Qb = "javascript:throw new Error('React form unexpectedly submitted.')", Zb = "suppressHydrationWarning", Wv = "$", Fv = "/$", qc = "$?", up = "$!", Kb = 1, Jb = 2, kb = 4, A0 = "F!", o1 = "F", f1 = "complete", $b = "style", Bc = 0, hh = 1, Iv = 2, R0 = null, O0 = null, r1 = { dialog: !0, webview: !0 }, D0 = null, s1 = typeof setTimeout == "function" ? setTimeout : void 0, Wb = typeof clearTimeout == "function" ? clearTimeout : void 0, kr = -1, d1 = typeof Promise == "function" ? Promise : void 0, Fb = typeof queueMicrotask == "function" ? queueMicrotask : typeof d1 < "u" ? function(e) {
      return d1.resolve(null).then(e).catch(Yu);
    } : s1, z0 = null, $r = 0, ip = 1, h1 = 2, y1 = 3, ou = 4, fu = /* @__PURE__ */ new Map(), m1 = /* @__PURE__ */ new Set(), Yc = st.d;
    st.d = {
      f: function() {
        var e = Yc.f(), t = vc();
        return e || t;
      },
      r: function(e) {
        var t = ta(e);
        t !== null && t.tag === 5 && t.type === "form" ? Du(t) : Yc.r(e);
      },
      D: function(e) {
        Yc.D(e), wu("dns-prefetch", e, null);
      },
      C: function(e, t) {
        Yc.C(e, t), wu("preconnect", e, t);
      },
      L: function(e, t, a) {
        Yc.L(e, t, a);
        var i = yh;
        if (i && e && t) {
          var o = 'link[rel="preload"][as="' + pl(t) + '"]';
          t === "image" && a && a.imageSrcSet ? (o += '[imagesrcset="' + pl(
            a.imageSrcSet
          ) + '"]', typeof a.imageSizes == "string" && (o += '[imagesizes="' + pl(
            a.imageSizes
          ) + '"]')) : o += '[href="' + pl(e) + '"]';
          var f = o;
          switch (t) {
            case "style":
              f = Dn(e);
              break;
            case "script":
              f = zi(e);
          }
          fu.has(f) || (e = Me(
            {
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : e,
              as: t
            },
            a
          ), fu.set(f, e), i.querySelector(o) !== null || t === "style" && i.querySelector(
            wo(f)
          ) || t === "script" && i.querySelector(Ec(f)) || (t = i.createElement("link"), Sl(t, "link", e), z(t), i.head.appendChild(t)));
        }
      },
      m: function(e, t) {
        Yc.m(e, t);
        var a = yh;
        if (a && e) {
          var i = t && typeof t.as == "string" ? t.as : "script", o = 'link[rel="modulepreload"][as="' + pl(i) + '"][href="' + pl(e) + '"]', f = o;
          switch (i) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              f = zi(e);
          }
          if (!fu.has(f) && (e = Me({ rel: "modulepreload", href: e }, t), fu.set(f, e), a.querySelector(o) === null)) {
            switch (i) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                if (a.querySelector(Ec(f)))
                  return;
            }
            i = a.createElement("link"), Sl(i, "link", e), z(i), a.head.appendChild(i);
          }
        }
      },
      X: function(e, t) {
        Yc.X(e, t);
        var a = yh;
        if (a && e) {
          var i = p(a).hoistableScripts, o = zi(e), f = i.get(o);
          f || (f = a.querySelector(
            Ec(o)
          ), f || (e = Me({ src: e, async: !0 }, t), (t = fu.get(o)) && hd(e, t), f = a.createElement("script"), z(f), Sl(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      },
      S: function(e, t, a) {
        Yc.S(e, t, a);
        var i = yh;
        if (i && e) {
          var o = p(i).hoistableStyles, f = Dn(e);
          t = t || "default";
          var d = o.get(f);
          if (!d) {
            var h = { loading: $r, preload: null };
            if (d = i.querySelector(
              wo(f)
            ))
              h.loading = ip | ou;
            else {
              e = Me(
                {
                  rel: "stylesheet",
                  href: e,
                  "data-precedence": t
                },
                a
              ), (a = fu.get(f)) && am(e, a);
              var v = d = i.createElement("link");
              z(v), Sl(v, "link", e), v._p = new Promise(function(g, B) {
                v.onload = g, v.onerror = B;
              }), v.addEventListener("load", function() {
                h.loading |= ip;
              }), v.addEventListener("error", function() {
                h.loading |= h1;
              }), h.loading |= ou, dd(d, t, i);
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
        Yc.M(e, t);
        var a = yh;
        if (a && e) {
          var i = p(a).hoistableScripts, o = zi(e), f = i.get(o);
          f || (f = a.querySelector(
            Ec(o)
          ), f || (e = Me({ src: e, async: !0, type: "module" }, t), (t = fu.get(o)) && hd(e, t), f = a.createElement("script"), z(f), Sl(f, "link", e), a.head.appendChild(f)), f = {
            type: "script",
            instance: f,
            count: 1,
            state: null
          }, i.set(o, f));
        }
      }
    };
    var yh = typeof document > "u" ? null : document, Pv = null, cp = null, M0 = null, eg = null, Wr = rm, op = {
      $$typeof: Sa,
      Provider: null,
      Consumer: null,
      _currentValue: Wr,
      _currentValue2: Wr,
      _threadCount: 0
    }, p1 = "%c%s%c ", v1 = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", g1 = "", tg = " ", Ib = Function.prototype.bind, S1 = !1, b1 = null, T1 = null, E1 = null, A1 = null, R1 = null, O1 = null, D1 = null, z1 = null, M1 = null;
    b1 = function(e, t, a, i) {
      t = ee(e, t), t !== null && (a = Oe(t.memoizedState, a, 0, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = aa(e, 2), a !== null && $e(a, e, 2));
    }, T1 = function(e, t, a) {
      t = ee(e, t), t !== null && (a = ve(t.memoizedState, a, 0), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = aa(e, 2), a !== null && $e(a, e, 2));
    }, E1 = function(e, t, a, i) {
      t = ee(e, t), t !== null && (a = N(t.memoizedState, a, i), t.memoizedState = a, t.baseState = a, e.memoizedProps = Me({}, e.memoizedProps), a = aa(e, 2), a !== null && $e(a, e, 2));
    }, A1 = function(e, t, a) {
      e.pendingProps = Oe(e.memoizedProps, t, 0, a), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && $e(t, e, 2);
    }, R1 = function(e, t) {
      e.pendingProps = ve(e.memoizedProps, t, 0), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && $e(t, e, 2);
    }, O1 = function(e, t, a) {
      e.pendingProps = N(
        e.memoizedProps,
        t,
        a
      ), e.alternate && (e.alternate.pendingProps = e.pendingProps), t = aa(e, 2), t !== null && $e(t, e, 2);
    }, D1 = function(e) {
      var t = aa(e, 2);
      t !== null && $e(t, e, 2);
    }, z1 = function(e) {
      Je = e;
    }, M1 = function(e) {
      Ae = e;
    };
    var lg = !0, ag = null, U0 = !1, cf = null, of = null, ff = null, fp = /* @__PURE__ */ new Map(), rp = /* @__PURE__ */ new Map(), rf = [], Pb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
      " "
    ), ng = null;
    if (Ed.prototype.render = Td.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null) throw Error("Cannot update an unmounted root.");
      var a = arguments;
      typeof a[1] == "function" ? console.error(
        "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ) : ht(a[1]) ? console.error(
        "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
      ) : typeof a[1] < "u" && console.error(
        "You passed a second argument to root.render(...) but it only accepts one argument."
      ), a = e;
      var i = t.current, o = Ua(i);
      hr(i, o, a, t, null, null);
    }, Ed.prototype.unmount = Td.prototype.unmount = function() {
      var e = arguments;
      if (typeof e[0] == "function" && console.error(
        "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
      ), e = this._internalRoot, e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        (bt & (wa | Fu)) !== Cn && console.error(
          "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
        ), hr(e.current, 2, null, e, null, null), vc(), t[xi] = null;
      }
    }, Ed.prototype.unstable_scheduleHydration = function(e) {
      if (e) {
        var t = hf();
        e = { blockedOn: null, target: e, priority: t };
        for (var a = 0; a < rf.length && t !== 0 && t < rf[a].priority; a++) ;
        rf.splice(a, 0, e), a === 0 && cm(e);
      }
    }, function() {
      var e = fm.version;
      if (e !== "19.1.0")
        throw Error(
          `Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:
  - react:      ` + (e + `
  - react-dom:  19.1.0
Learn more: https://react.dev/warnings/version-mismatch`)
        );
    }(), typeof Map == "function" && Map.prototype != null && typeof Map.prototype.forEach == "function" && typeof Set == "function" && Set.prototype != null && typeof Set.prototype.clear == "function" && typeof Set.prototype.forEach == "function" || console.error(
      "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
    ), st.findDOMNode = function(e) {
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function" ? Error("Unable to find node on an unmounted component.") : (e = Object.keys(e).join(","), Error(
          "Argument appears to not be a ReactComponent. Keys: " + e
        ));
      return e = xe(t), e = e !== null ? Lt(e) : null, e = e === null ? null : e.stateNode, e;
    }, !function() {
      var e = {
        bundleType: 1,
        version: "19.1.0",
        rendererPackageName: "react-dom",
        currentDispatcherRef: q,
        reconcilerVersion: "19.1.0"
      };
      return e.overrideHookState = b1, e.overrideHookStateDeletePath = T1, e.overrideHookStateRenamePath = E1, e.overrideProps = A1, e.overridePropsDeletePath = R1, e.overridePropsRenamePath = O1, e.scheduleUpdate = D1, e.setErrorHandler = z1, e.setSuspenseHandler = M1, e.scheduleRefresh = Ie, e.scheduleRoot = ce, e.setRefreshHandler = Tt, e.getCurrentFiber = Eg, e.getLaneLabelMap = Ag, e.injectProfilingHooks = yt, he(e);
    }() && U && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && navigator.userAgent.indexOf("Edge") === -1 || -1 < navigator.userAgent.indexOf("Firefox"))) {
      var U1 = window.location.protocol;
      /^(https?|file):$/.test(U1) && console.info(
        "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + (U1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq` : ""),
        "font-weight:bold"
      );
    }
    yp.createRoot = function(e, t) {
      if (!ht(e))
        throw Error("Target container is not a DOM element.");
      Ad(e);
      var a = !1, i = "", o = xp, f = Ys, d = ws, h = null;
      return t != null && (t.hydrate ? console.warn(
        "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
      ) : typeof t == "object" && t !== null && t.$$typeof === Gu && console.error(
        `You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`
      ), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (i = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.unstable_transitionCallbacks !== void 0 && (h = t.unstable_transitionCallbacks)), t = im(
        e,
        1,
        !1,
        null,
        null,
        a,
        i,
        o,
        f,
        d,
        h,
        null
      ), e[xi] = t.current, or(e), new Td(t);
    }, yp.hydrateRoot = function(e, t, a) {
      if (!ht(e))
        throw Error("Target container is not a DOM element.");
      Ad(e), t === void 0 && console.error(
        "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
      );
      var i = !1, o = "", f = xp, d = Ys, h = ws, v = null, g = null;
      return a != null && (a.unstable_strictMode === !0 && (i = !0), a.identifierPrefix !== void 0 && (o = a.identifierPrefix), a.onUncaughtError !== void 0 && (f = a.onUncaughtError), a.onCaughtError !== void 0 && (d = a.onCaughtError), a.onRecoverableError !== void 0 && (h = a.onRecoverableError), a.unstable_transitionCallbacks !== void 0 && (v = a.unstable_transitionCallbacks), a.formState !== void 0 && (g = a.formState)), t = im(
        e,
        1,
        !0,
        t,
        a ?? null,
        i,
        o,
        f,
        d,
        h,
        v,
        g
      ), t.context = Ot(null), a = t.current, i = Ua(a), i = Ga(i), o = rn(i), o.callback = null, sn(a, o, i), a = i, t.current.lanes = a, Iu(t, a), Fa(t), e[xi] = t.current, or(e), new Ed(t);
    }, yp.version = "19.1.0", typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  }(), yp;
}
var Q1;
function hT() {
  if (Q1) return cg.exports;
  Q1 = 1;
  var W = {};
  function ee() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
      if (W.NODE_ENV !== "production")
        throw new Error("^_^");
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ee);
      } catch (Oe) {
        console.error(Oe);
      }
    }
  }
  return W.NODE_ENV === "production" ? (ee(), cg.exports = sT()) : cg.exports = dT(), cg.exports;
}
var k1 = hT();
const yT = /* @__PURE__ */ Z1(k1), mT = ({ scopeElement: W, fieldElement: ee, index: Oe }) => {
  const [N, Te] = ph.useState([]), [ve, Ae] = ph.useState("");
  ph.useEffect(() => {
    if (!W) return;
    Ae(W.value);
    const D = () => {
      Ae(W.value), Je(W.value);
    };
    return W.addEventListener("change", D), W.value && Je(W.value), () => {
      W.removeEventListener("change", D);
    };
  }, [W]);
  const Je = async (D) => {
    if (!D || D === "--") {
      Te([]);
      return;
    }
    try {
      Te([
        { apiName: "Email", displayName: "Email" },
        { apiName: "FirstName", displayName: "名" },
        { apiName: "LastName", displayName: "姓" }
      ]);
    } catch (ie) {
      console.error("フィールド取得エラー:", ie), Te([]);
    }
  }, oe = (D) => {
    if (ee) {
      ee.value = D.target.value;
      const ie = new Event("change", { bubbles: !0 });
      ee.dispatchEvent(ie);
    }
  };
  return /* @__PURE__ */ mh.jsxs(
    "select",
    {
      className: "acms-admin-form-width-full",
      value: (ee == null ? void 0 : ee.value) || "",
      onChange: oe,
      disabled: !ve || ve === "--",
      children: [
        /* @__PURE__ */ mh.jsx("option", { value: "", children: "選択してください" }),
        N.map((D) => /* @__PURE__ */ mh.jsx("option", { value: D.apiName, children: D.displayName }, D.apiName))
      ]
    }
  );
};
function pT() {
  const [W, ee] = ph.useState([]);
  ph.useEffect(() => {
    const N = document.querySelectorAll(".js-zoho-field");
    ee(Array.from(N)), N.forEach((Te, ve) => {
      Oe(Te, ve);
    }), window.ACMS && window.ACMS.addListener && (console.log("acmsAddCustomFieldGroup"), window.ACMS.addListener("acmsAddCustomFieldGroup", (Te) => {
      const ve = Te.obj.item;
      if (ve && ve.classList.contains("js-zoho-field")) {
        const Ae = W.length;
        Oe(ve, Ae), ee((Je) => [...Je, ve]);
      }
    }));
  }, []);
  const Oe = (N, Te) => {
    const ve = N.querySelector('select[name^="zoho_field_scope"]'), Ae = N.querySelector("td:nth-child(4) div"), Je = N.querySelector('input[name^="zoho_field_cms_key"]');
    ve && Ae && (Je && (Je.style.display = "none"), k1.createRoot(Ae).render(
      /* @__PURE__ */ mh.jsx(
        mT,
        {
          scopeElement: ve,
          fieldElement: Je,
          index: Te
        }
      )
    ));
  };
  return null;
}
function vT() {
  return pT(), null;
}
const gT = yT.createRoot(document.getElementById("js-acms-zoho"));
gT.render(/* @__PURE__ */ mh.jsx(iT.StrictMode, { children: /* @__PURE__ */ mh.jsx(vT, {}) }));
