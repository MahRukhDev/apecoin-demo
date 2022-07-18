(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([
  [888],
  {
    5851: function (t, e, n) {
      "use strict";
      n.d(e, {
        i: function () {
          return r;
        },
      });
      const r = "abi/5.5.0";
    },
    4243: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return O;
        },
        $: function () {
          return R;
        },
      });
      var r = n(6441),
        i = n(6881),
        o = n(1581),
        a = n(5851),
        s = n(1184),
        u = n(9485);
      class l extends s.XI {
        constructor(t) {
          super("address", "address", t, !1);
        }
        defaultValue() {
          return "0x0000000000000000000000000000000000000000";
        }
        encode(t, e) {
          try {
            e = (0, u.getAddress)(e);
          } catch (n) {
            this._throwError(n.message, e);
          }
          return t.writeValue(e);
        }
        decode(t) {
          return (0, u.getAddress)(
            (0, r.hexZeroPad)(t.readValue().toHexString(), 20)
          );
        }
      }
      class c extends s.XI {
        constructor(t) {
          super(t.name, t.type, void 0, t.dynamic), (this.coder = t);
        }
        defaultValue() {
          return this.coder.defaultValue();
        }
        encode(t, e) {
          return this.coder.encode(t, e);
        }
        decode(t) {
          return this.coder.decode(t);
        }
      }
      const h = new o.Logger(a.i);
      function f(t, e, n) {
        let r = null;
        if (Array.isArray(n)) r = n;
        else if (n && "object" === typeof n) {
          let t = {};
          r = e.map((e) => {
            const r = e.localName;
            return (
              r ||
                h.throwError(
                  "cannot encode object for signature with missing names",
                  o.Logger.errors.INVALID_ARGUMENT,
                  { argument: "values", coder: e, value: n }
                ),
              t[r] &&
                h.throwError(
                  "cannot encode object for signature with duplicate names",
                  o.Logger.errors.INVALID_ARGUMENT,
                  { argument: "values", coder: e, value: n }
                ),
              (t[r] = !0),
              n[r]
            );
          });
        } else h.throwArgumentError("invalid tuple value", "tuple", n);
        e.length !== r.length &&
          h.throwArgumentError("types/value length mismatch", "tuple", n);
        let i = new s.QV(t.wordSize),
          a = new s.QV(t.wordSize),
          u = [];
        e.forEach((t, e) => {
          let n = r[e];
          if (t.dynamic) {
            let e = a.length;
            t.encode(a, n);
            let r = i.writeUpdatableValue();
            u.push((t) => {
              r(t + e);
            });
          } else t.encode(i, n);
        }),
          u.forEach((t) => {
            t(i.length);
          });
        let l = t.appendWriter(i);
        return (l += t.appendWriter(a)), l;
      }
      function d(t, e) {
        let n = [],
          r = t.subReader(0);
        e.forEach((e) => {
          let i = null;
          if (e.dynamic) {
            let n = t.readValue(),
              s = r.subReader(n.toNumber());
            try {
              i = e.decode(s);
            } catch (a) {
              if (a.code === o.Logger.errors.BUFFER_OVERRUN) throw a;
              (i = a),
                (i.baseType = e.name),
                (i.name = e.localName),
                (i.type = e.type);
            }
          } else
            try {
              i = e.decode(t);
            } catch (a) {
              if (a.code === o.Logger.errors.BUFFER_OVERRUN) throw a;
              (i = a),
                (i.baseType = e.name),
                (i.name = e.localName),
                (i.type = e.type);
            }
          void 0 != i && n.push(i);
        });
        const i = e.reduce((t, e) => {
          const n = e.localName;
          return n && (t[n] || (t[n] = 0), t[n]++), t;
        }, {});
        e.forEach((t, e) => {
          let r = t.localName;
          if (!r || 1 !== i[r]) return;
          if (("length" === r && (r = "_length"), null != n[r])) return;
          const o = n[e];
          o instanceof Error
            ? Object.defineProperty(n, r, {
                enumerable: !0,
                get: () => {
                  throw o;
                },
              })
            : (n[r] = o);
        });
        for (let o = 0; o < n.length; o++) {
          const t = n[o];
          t instanceof Error &&
            Object.defineProperty(n, o, {
              enumerable: !0,
              get: () => {
                throw t;
              },
            });
        }
        return Object.freeze(n);
      }
      class p extends s.XI {
        constructor(t, e, n) {
          super(
            "array",
            t.type + "[" + (e >= 0 ? e : "") + "]",
            n,
            -1 === e || t.dynamic
          ),
            (this.coder = t),
            (this.length = e);
        }
        defaultValue() {
          const t = this.coder.defaultValue(),
            e = [];
          for (let n = 0; n < this.length; n++) e.push(t);
          return e;
        }
        encode(t, e) {
          Array.isArray(e) || this._throwError("expected array value", e);
          let n = this.length;
          -1 === n && ((n = e.length), t.writeValue(e.length)),
            h.checkArgumentCount(
              e.length,
              n,
              "coder array" + (this.localName ? " " + this.localName : "")
            );
          let r = [];
          for (let i = 0; i < e.length; i++) r.push(this.coder);
          return f(t, r, e);
        }
        decode(t) {
          let e = this.length;
          -1 === e &&
            ((e = t.readValue().toNumber()),
            32 * e > t._data.length &&
              h.throwError(
                "insufficient data length",
                o.Logger.errors.BUFFER_OVERRUN,
                { length: t._data.length, count: e }
              ));
          let n = [];
          for (let r = 0; r < e; r++) n.push(new c(this.coder));
          return t.coerce(this.name, d(t, n));
        }
      }
      class m extends s.XI {
        constructor(t) {
          super("bool", "bool", t, !1);
        }
        defaultValue() {
          return !1;
        }
        encode(t, e) {
          return t.writeValue(e ? 1 : 0);
        }
        decode(t) {
          return t.coerce(this.type, !t.readValue().isZero());
        }
      }
      class y extends s.XI {
        constructor(t, e) {
          super(t, t, e, !0);
        }
        defaultValue() {
          return "0x";
        }
        encode(t, e) {
          e = (0, r.arrayify)(e);
          let n = t.writeValue(e.length);
          return (n += t.writeBytes(e)), n;
        }
        decode(t) {
          return t.readBytes(t.readValue().toNumber(), !0);
        }
      }
      class g extends y {
        constructor(t) {
          super("bytes", t);
        }
        decode(t) {
          return t.coerce(this.name, (0, r.hexlify)(super.decode(t)));
        }
      }
      class v extends s.XI {
        constructor(t, e) {
          let n = "bytes" + String(t);
          super(n, n, e, !1), (this.size = t);
        }
        defaultValue() {
          return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(
            0,
            2 + 2 * this.size
          );
        }
        encode(t, e) {
          let n = (0, r.arrayify)(e);
          return (
            n.length !== this.size &&
              this._throwError("incorrect data length", e),
            t.writeBytes(n)
          );
        }
        decode(t) {
          return t.coerce(this.name, (0, r.hexlify)(t.readBytes(this.size)));
        }
      }
      class b extends s.XI {
        constructor(t) {
          super("null", "", t, !1);
        }
        defaultValue() {
          return null;
        }
        encode(t, e) {
          return null != e && this._throwError("not null", e), t.writeBytes([]);
        }
        decode(t) {
          return t.readBytes(0), t.coerce(this.name, null);
        }
      }
      var w = n(2593),
        x = n(1046);
      class E extends s.XI {
        constructor(t, e, n) {
          const r = (e ? "int" : "uint") + 8 * t;
          super(r, r, n, !1), (this.size = t), (this.signed = e);
        }
        defaultValue() {
          return 0;
        }
        encode(t, e) {
          let n = w.O$.from(e),
            r = x.Bz.mask(8 * t.wordSize);
          if (this.signed) {
            let t = r.mask(8 * this.size - 1);
            (n.gt(t) || n.lt(t.add(x.fh).mul(x.tL))) &&
              this._throwError("value out-of-bounds", e);
          } else
            (n.lt(x._Y) || n.gt(r.mask(8 * this.size))) &&
              this._throwError("value out-of-bounds", e);
          return (
            (n = n.toTwos(8 * this.size).mask(8 * this.size)),
            this.signed &&
              (n = n.fromTwos(8 * this.size).toTwos(8 * t.wordSize)),
            t.writeValue(n)
          );
        }
        decode(t) {
          let e = t.readValue().mask(8 * this.size);
          return (
            this.signed && (e = e.fromTwos(8 * this.size)),
            t.coerce(this.name, e)
          );
        }
      }
      var T = n(9251);
      class A extends y {
        constructor(t) {
          super("string", t);
        }
        defaultValue() {
          return "";
        }
        encode(t, e) {
          return super.encode(t, (0, T.Y0)(e));
        }
        decode(t) {
          return (0, T.ZN)(super.decode(t));
        }
      }
      class M extends s.XI {
        constructor(t, e) {
          let n = !1;
          const r = [];
          t.forEach((t) => {
            t.dynamic && (n = !0), r.push(t.type);
          });
          super("tuple", "tuple(" + r.join(",") + ")", e, n), (this.coders = t);
        }
        defaultValue() {
          const t = [];
          this.coders.forEach((e) => {
            t.push(e.defaultValue());
          });
          const e = this.coders.reduce((t, e) => {
            const n = e.localName;
            return n && (t[n] || (t[n] = 0), t[n]++), t;
          }, {});
          return (
            this.coders.forEach((n, r) => {
              let i = n.localName;
              i &&
                1 === e[i] &&
                ("length" === i && (i = "_length"),
                null == t[i] && (t[i] = t[r]));
            }),
            Object.freeze(t)
          );
        }
        encode(t, e) {
          return f(t, this.coders, e);
        }
        decode(t) {
          return t.coerce(this.name, d(t, this.coders));
        }
      }
      var _ = n(1388);
      const k = new o.Logger(a.i),
        S = new RegExp(/^bytes([0-9]*)$/),
        P = new RegExp(/^(u?int)([0-9]*)$/);
      class O {
        constructor(t) {
          k.checkNew(new.target, O),
            (0, i.defineReadOnly)(this, "coerceFunc", t || null);
        }
        _getCoder(t) {
          switch (t.baseType) {
            case "address":
              return new l(t.name);
            case "bool":
              return new m(t.name);
            case "string":
              return new A(t.name);
            case "bytes":
              return new g(t.name);
            case "array":
              return new p(
                this._getCoder(t.arrayChildren),
                t.arrayLength,
                t.name
              );
            case "tuple":
              return new M(
                (t.components || []).map((t) => this._getCoder(t)),
                t.name
              );
            case "":
              return new b(t.name);
          }
          let e = t.type.match(P);
          if (e) {
            let n = parseInt(e[2] || "256");
            return (
              (0 === n || n > 256 || n % 8 !== 0) &&
                k.throwArgumentError(
                  "invalid " + e[1] + " bit length",
                  "param",
                  t
                ),
              new E(n / 8, "int" === e[1], t.name)
            );
          }
          if (((e = t.type.match(S)), e)) {
            let n = parseInt(e[1]);
            return (
              (0 === n || n > 32) &&
                k.throwArgumentError("invalid bytes length", "param", t),
              new v(n, t.name)
            );
          }
          return k.throwArgumentError("invalid type", "type", t.type);
        }
        _getWordSize() {
          return 32;
        }
        _getReader(t, e) {
          return new s.Ej(t, this._getWordSize(), this.coerceFunc, e);
        }
        _getWriter() {
          return new s.QV(this._getWordSize());
        }
        getDefaultValue(t) {
          const e = t.map((t) => this._getCoder(_._R.from(t)));
          return new M(e, "_").defaultValue();
        }
        encode(t, e) {
          t.length !== e.length &&
            k.throwError(
              "types/values length mismatch",
              o.Logger.errors.INVALID_ARGUMENT,
              {
                count: { types: t.length, values: e.length },
                value: { types: t, values: e },
              }
            );
          const n = t.map((t) => this._getCoder(_._R.from(t))),
            r = new M(n, "_"),
            i = this._getWriter();
          return r.encode(i, e), i.data;
        }
        decode(t, e, n) {
          const i = t.map((t) => this._getCoder(_._R.from(t)));
          return new M(i, "_").decode(this._getReader((0, r.arrayify)(e), n));
        }
      }
      const R = new O();
    },
    1184: function (t, e, n) {
      "use strict";
      n.d(e, {
        BR: function () {
          return l;
        },
        XI: function () {
          return c;
        },
        QV: function () {
          return h;
        },
        Ej: function () {
          return f;
        },
      });
      var r = n(6441),
        i = n(2593),
        o = n(6881),
        a = n(1581),
        s = n(5851);
      const u = new a.Logger(s.i);
      function l(t) {
        const e = [],
          n = function (t, r) {
            if (Array.isArray(r))
              for (let o in r) {
                const a = t.slice();
                a.push(o);
                try {
                  n(a, r[o]);
                } catch (i) {
                  e.push({ path: a, error: i });
                }
              }
          };
        return n([], t), e;
      }
      class c {
        constructor(t, e, n, r) {
          (this.name = t),
            (this.type = e),
            (this.localName = n),
            (this.dynamic = r);
        }
        _throwError(t, e) {
          u.throwArgumentError(t, this.localName, e);
        }
      }
      class h {
        constructor(t) {
          (0, o.defineReadOnly)(this, "wordSize", t || 32),
            (this._data = []),
            (this._dataLength = 0),
            (this._padding = new Uint8Array(t));
        }
        get data() {
          return (0, r.hexConcat)(this._data);
        }
        get length() {
          return this._dataLength;
        }
        _writeData(t) {
          return this._data.push(t), (this._dataLength += t.length), t.length;
        }
        appendWriter(t) {
          return this._writeData((0, r.concat)(t._data));
        }
        writeBytes(t) {
          let e = (0, r.arrayify)(t);
          const n = e.length % this.wordSize;
          return (
            n && (e = (0, r.concat)([e, this._padding.slice(n)])),
            this._writeData(e)
          );
        }
        _getValue(t) {
          let e = (0, r.arrayify)(i.O$.from(t));
          return (
            e.length > this.wordSize &&
              u.throwError(
                "value out-of-bounds",
                a.Logger.errors.BUFFER_OVERRUN,
                { length: this.wordSize, offset: e.length }
              ),
            e.length % this.wordSize &&
              (e = (0, r.concat)([
                this._padding.slice(e.length % this.wordSize),
                e,
              ])),
            e
          );
        }
        writeValue(t) {
          return this._writeData(this._getValue(t));
        }
        writeUpdatableValue() {
          const t = this._data.length;
          return (
            this._data.push(this._padding),
            (this._dataLength += this.wordSize),
            (e) => {
              this._data[t] = this._getValue(e);
            }
          );
        }
      }
      class f {
        constructor(t, e, n, i) {
          (0, o.defineReadOnly)(this, "_data", (0, r.arrayify)(t)),
            (0, o.defineReadOnly)(this, "wordSize", e || 32),
            (0, o.defineReadOnly)(this, "_coerceFunc", n),
            (0, o.defineReadOnly)(this, "allowLoose", i),
            (this._offset = 0);
        }
        get data() {
          return (0, r.hexlify)(this._data);
        }
        get consumed() {
          return this._offset;
        }
        static coerce(t, e) {
          let n = t.match("^u?int([0-9]+)$");
          return n && parseInt(n[1]) <= 48 && (e = e.toNumber()), e;
        }
        coerce(t, e) {
          return this._coerceFunc ? this._coerceFunc(t, e) : f.coerce(t, e);
        }
        _peekBytes(t, e, n) {
          let r = Math.ceil(e / this.wordSize) * this.wordSize;
          return (
            this._offset + r > this._data.length &&
              (this.allowLoose && n && this._offset + e <= this._data.length
                ? (r = e)
                : u.throwError(
                    "data out-of-bounds",
                    a.Logger.errors.BUFFER_OVERRUN,
                    { length: this._data.length, offset: this._offset + r }
                  )),
            this._data.slice(this._offset, this._offset + r)
          );
        }
        subReader(t) {
          return new f(
            this._data.slice(this._offset + t),
            this.wordSize,
            this._coerceFunc,
            this.allowLoose
          );
        }
        readBytes(t, e) {
          let n = this._peekBytes(0, t, !!e);
          return (this._offset += n.length), n.slice(0, t);
        }
        readValue() {
          return i.O$.from(this.readBytes(this.wordSize));
        }
      }
    },
    1388: function (t, e, n) {
      "use strict";
      n.d(e, {
        pc: function () {
          return d;
        },
        _R: function () {
          return m;
        },
        HY: function () {
          return g;
        },
        QV: function () {
          return v;
        },
        Xg: function () {
          return E;
        },
        YW: function () {
          return T;
        },
        IC: function () {
          return M;
        },
      });
      var r = n(2593),
        i = n(6881),
        o = n(1581),
        a = n(5851);
      const s = new o.Logger(a.i),
        u = {};
      let l = { calldata: !0, memory: !0, storage: !0 },
        c = { calldata: !0, memory: !0 };
      function h(t, e) {
        if ("bytes" === t || "string" === t) {
          if (l[e]) return !0;
        } else if ("address" === t) {
          if ("payable" === e) return !0;
        } else if ((t.indexOf("[") >= 0 || "tuple" === t) && c[e]) return !0;
        return (
          (l[e] || "payable" === e) &&
            s.throwArgumentError("invalid modifier", "name", e),
          !1
        );
      }
      function f(t, e) {
        for (let n in e) (0, i.defineReadOnly)(t, n, e[n]);
      }
      const d = Object.freeze({
          sighash: "sighash",
          minimal: "minimal",
          full: "full",
          json: "json",
        }),
        p = new RegExp(/^(.*)\[([0-9]*)\]$/);
      class m {
        constructor(t, e) {
          t !== u &&
            s.throwError(
              "use fromString",
              o.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "new ParamType()" }
            ),
            f(this, e);
          let n = this.type.match(p);
          f(
            this,
            n
              ? {
                  arrayLength: parseInt(n[2] || "-1"),
                  arrayChildren: m.fromObject({
                    type: n[1],
                    components: this.components,
                  }),
                  baseType: "array",
                }
              : {
                  arrayLength: null,
                  arrayChildren: null,
                  baseType: null != this.components ? "tuple" : this.type,
                }
          ),
            (this._isParamType = !0),
            Object.freeze(this);
        }
        format(t) {
          if (
            (t || (t = d.sighash),
            d[t] || s.throwArgumentError("invalid format type", "format", t),
            t === d.json)
          ) {
            let e = {
              type: "tuple" === this.baseType ? "tuple" : this.type,
              name: this.name || void 0,
            };
            return (
              "boolean" === typeof this.indexed && (e.indexed = this.indexed),
              this.components &&
                (e.components = this.components.map((e) =>
                  JSON.parse(e.format(t))
                )),
              JSON.stringify(e)
            );
          }
          let e = "";
          return (
            "array" === this.baseType
              ? ((e += this.arrayChildren.format(t)),
                (e +=
                  "[" +
                  (this.arrayLength < 0 ? "" : String(this.arrayLength)) +
                  "]"))
              : "tuple" === this.baseType
              ? (t !== d.sighash && (e += this.type),
                (e +=
                  "(" +
                  this.components
                    .map((e) => e.format(t))
                    .join(t === d.full ? ", " : ",") +
                  ")"))
              : (e += this.type),
            t !== d.sighash &&
              (!0 === this.indexed && (e += " indexed"),
              t === d.full && this.name && (e += " " + this.name)),
            e
          );
        }
        static from(t, e) {
          return "string" === typeof t ? m.fromString(t, e) : m.fromObject(t);
        }
        static fromObject(t) {
          return m.isParamType(t)
            ? t
            : new m(u, {
                name: t.name || null,
                type: _(t.type),
                indexed: null == t.indexed ? null : !!t.indexed,
                components: t.components
                  ? t.components.map(m.fromObject)
                  : null,
              });
        }
        static fromString(t, e) {
          return (
            (n = (function (t, e) {
              let n = t;
              function r(e) {
                s.throwArgumentError(
                  `unexpected character at position ${e}`,
                  "param",
                  t
                );
              }
              function i(t) {
                let n = {
                  type: "",
                  name: "",
                  parent: t,
                  state: { allowType: !0 },
                };
                return e && (n.indexed = !1), n;
              }
              t = t.replace(/\s/g, " ");
              let o = { type: "", name: "", state: { allowType: !0 } },
                a = o;
              for (let s = 0; s < t.length; s++) {
                let n = t[s];
                switch (n) {
                  case "(":
                    a.state.allowType && "" === a.type
                      ? (a.type = "tuple")
                      : a.state.allowParams || r(s),
                      (a.state.allowType = !1),
                      (a.type = _(a.type)),
                      (a.components = [i(a)]),
                      (a = a.components[0]);
                    break;
                  case ")":
                    delete a.state,
                      "indexed" === a.name &&
                        (e || r(s), (a.indexed = !0), (a.name = "")),
                      h(a.type, a.name) && (a.name = ""),
                      (a.type = _(a.type));
                    let t = a;
                    (a = a.parent),
                      a || r(s),
                      delete t.parent,
                      (a.state.allowParams = !1),
                      (a.state.allowName = !0),
                      (a.state.allowArray = !0);
                    break;
                  case ",":
                    delete a.state,
                      "indexed" === a.name &&
                        (e || r(s), (a.indexed = !0), (a.name = "")),
                      h(a.type, a.name) && (a.name = ""),
                      (a.type = _(a.type));
                    let o = i(a.parent);
                    a.parent.components.push(o), delete a.parent, (a = o);
                    break;
                  case " ":
                    a.state.allowType &&
                      "" !== a.type &&
                      ((a.type = _(a.type)),
                      delete a.state.allowType,
                      (a.state.allowName = !0),
                      (a.state.allowParams = !0)),
                      a.state.allowName &&
                        "" !== a.name &&
                        ("indexed" === a.name
                          ? (e || r(s),
                            a.indexed && r(s),
                            (a.indexed = !0),
                            (a.name = ""))
                          : h(a.type, a.name)
                          ? (a.name = "")
                          : (a.state.allowName = !1));
                    break;
                  case "[":
                    a.state.allowArray || r(s),
                      (a.type += n),
                      (a.state.allowArray = !1),
                      (a.state.allowName = !1),
                      (a.state.readArray = !0);
                    break;
                  case "]":
                    a.state.readArray || r(s),
                      (a.type += n),
                      (a.state.readArray = !1),
                      (a.state.allowArray = !0),
                      (a.state.allowName = !0);
                    break;
                  default:
                    a.state.allowType
                      ? ((a.type += n),
                        (a.state.allowParams = !0),
                        (a.state.allowArray = !0))
                      : a.state.allowName
                      ? ((a.name += n), delete a.state.allowArray)
                      : a.state.readArray
                      ? (a.type += n)
                      : r(s);
                }
              }
              return (
                a.parent && s.throwArgumentError("unexpected eof", "param", t),
                delete o.state,
                "indexed" === a.name
                  ? (e || r(n.length - 7),
                    a.indexed && r(n.length - 7),
                    (a.indexed = !0),
                    (a.name = ""))
                  : h(a.type, a.name) && (a.name = ""),
                (o.type = _(o.type)),
                o
              );
            })(t, !!e)),
            m.fromObject({
              name: n.name,
              type: n.type,
              indexed: n.indexed,
              components: n.components,
            })
          );
          var n;
        }
        static isParamType(t) {
          return !(null == t || !t._isParamType);
        }
      }
      function y(t, e) {
        return (function (t) {
          t = t.trim();
          let e = [],
            n = "",
            r = 0;
          for (let i = 0; i < t.length; i++) {
            let o = t[i];
            "," === o && 0 === r
              ? (e.push(n), (n = ""))
              : ((n += o),
                "(" === o
                  ? r++
                  : ")" === o &&
                    (r--,
                    -1 === r &&
                      s.throwArgumentError(
                        "unbalanced parenthesis",
                        "value",
                        t
                      )));
          }
          n && e.push(n);
          return e;
        })(t).map((t) => m.fromString(t, e));
      }
      class g {
        constructor(t, e) {
          t !== u &&
            s.throwError(
              "use a static from method",
              o.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "new Fragment()" }
            ),
            f(this, e),
            (this._isFragment = !0),
            Object.freeze(this);
        }
        static from(t) {
          return g.isFragment(t)
            ? t
            : "string" === typeof t
            ? g.fromString(t)
            : g.fromObject(t);
        }
        static fromObject(t) {
          if (g.isFragment(t)) return t;
          switch (t.type) {
            case "function":
              return T.fromObject(t);
            case "event":
              return v.fromObject(t);
            case "constructor":
              return E.fromObject(t);
            case "error":
              return M.fromObject(t);
            case "fallback":
            case "receive":
              return null;
          }
          return s.throwArgumentError("invalid fragment object", "value", t);
        }
        static fromString(t) {
          return "event" ===
            (t = (t = (t = t.replace(/\s/g, " "))
              .replace(/\(/g, " (")
              .replace(/\)/g, ") ")
              .replace(/\s+/g, " ")).trim()).split(" ")[0]
            ? v.fromString(t.substring(5).trim())
            : "function" === t.split(" ")[0]
            ? T.fromString(t.substring(8).trim())
            : "constructor" === t.split("(")[0].trim()
            ? E.fromString(t.trim())
            : "error" === t.split(" ")[0]
            ? M.fromString(t.substring(5).trim())
            : s.throwArgumentError("unsupported fragment", "value", t);
        }
        static isFragment(t) {
          return !(!t || !t._isFragment);
        }
      }
      class v extends g {
        format(t) {
          if (
            (t || (t = d.sighash),
            d[t] || s.throwArgumentError("invalid format type", "format", t),
            t === d.json)
          )
            return JSON.stringify({
              type: "event",
              anonymous: this.anonymous,
              name: this.name,
              inputs: this.inputs.map((e) => JSON.parse(e.format(t))),
            });
          let e = "";
          return (
            t !== d.sighash && (e += "event "),
            (e +=
              this.name +
              "(" +
              this.inputs
                .map((e) => e.format(t))
                .join(t === d.full ? ", " : ",") +
              ") "),
            t !== d.sighash && this.anonymous && (e += "anonymous "),
            e.trim()
          );
        }
        static from(t) {
          return "string" === typeof t ? v.fromString(t) : v.fromObject(t);
        }
        static fromObject(t) {
          if (v.isEventFragment(t)) return t;
          "event" !== t.type &&
            s.throwArgumentError("invalid event object", "value", t);
          const e = {
            name: S(t.name),
            anonymous: t.anonymous,
            inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
            type: "event",
          };
          return new v(u, e);
        }
        static fromString(t) {
          let e = t.match(P);
          e || s.throwArgumentError("invalid event string", "value", t);
          let n = !1;
          return (
            e[3].split(" ").forEach((t) => {
              switch (t.trim()) {
                case "anonymous":
                  n = !0;
                  break;
                case "":
                  break;
                default:
                  s.warn("unknown modifier: " + t);
              }
            }),
            v.fromObject({
              name: e[1].trim(),
              anonymous: n,
              inputs: y(e[2], !0),
              type: "event",
            })
          );
        }
        static isEventFragment(t) {
          return t && t._isFragment && "event" === t.type;
        }
      }
      function b(t, e) {
        e.gas = null;
        let n = t.split("@");
        return 1 !== n.length
          ? (n.length > 2 &&
              s.throwArgumentError(
                "invalid human-readable ABI signature",
                "value",
                t
              ),
            n[1].match(/^[0-9]+$/) ||
              s.throwArgumentError(
                "invalid human-readable ABI signature gas",
                "value",
                t
              ),
            (e.gas = r.O$.from(n[1])),
            n[0])
          : t;
      }
      function w(t, e) {
        (e.constant = !1),
          (e.payable = !1),
          (e.stateMutability = "nonpayable"),
          t.split(" ").forEach((t) => {
            switch (t.trim()) {
              case "constant":
                e.constant = !0;
                break;
              case "payable":
                (e.payable = !0), (e.stateMutability = "payable");
                break;
              case "nonpayable":
                (e.payable = !1), (e.stateMutability = "nonpayable");
                break;
              case "pure":
                (e.constant = !0), (e.stateMutability = "pure");
                break;
              case "view":
                (e.constant = !0), (e.stateMutability = "view");
                break;
              case "external":
              case "public":
              case "":
                break;
              default:
                console.log("unknown modifier: " + t);
            }
          });
      }
      function x(t) {
        let e = { constant: !1, payable: !0, stateMutability: "payable" };
        return (
          null != t.stateMutability
            ? ((e.stateMutability = t.stateMutability),
              (e.constant =
                "view" === e.stateMutability || "pure" === e.stateMutability),
              null != t.constant &&
                !!t.constant !== e.constant &&
                s.throwArgumentError(
                  "cannot have constant function with mutability " +
                    e.stateMutability,
                  "value",
                  t
                ),
              (e.payable = "payable" === e.stateMutability),
              null != t.payable &&
                !!t.payable !== e.payable &&
                s.throwArgumentError(
                  "cannot have payable function with mutability " +
                    e.stateMutability,
                  "value",
                  t
                ))
            : null != t.payable
            ? ((e.payable = !!t.payable),
              null != t.constant ||
                e.payable ||
                "constructor" === t.type ||
                s.throwArgumentError(
                  "unable to determine stateMutability",
                  "value",
                  t
                ),
              (e.constant = !!t.constant),
              e.constant
                ? (e.stateMutability = "view")
                : (e.stateMutability = e.payable ? "payable" : "nonpayable"),
              e.payable &&
                e.constant &&
                s.throwArgumentError(
                  "cannot have constant payable function",
                  "value",
                  t
                ))
            : null != t.constant
            ? ((e.constant = !!t.constant),
              (e.payable = !e.constant),
              (e.stateMutability = e.constant ? "view" : "payable"))
            : "constructor" !== t.type &&
              s.throwArgumentError(
                "unable to determine stateMutability",
                "value",
                t
              ),
          e
        );
      }
      class E extends g {
        format(t) {
          if (
            (t || (t = d.sighash),
            d[t] || s.throwArgumentError("invalid format type", "format", t),
            t === d.json)
          )
            return JSON.stringify({
              type: "constructor",
              stateMutability:
                "nonpayable" !== this.stateMutability
                  ? this.stateMutability
                  : void 0,
              payable: this.payable,
              gas: this.gas ? this.gas.toNumber() : void 0,
              inputs: this.inputs.map((e) => JSON.parse(e.format(t))),
            });
          t === d.sighash &&
            s.throwError(
              "cannot format a constructor for sighash",
              o.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "format(sighash)" }
            );
          let e =
            "constructor(" +
            this.inputs
              .map((e) => e.format(t))
              .join(t === d.full ? ", " : ",") +
            ") ";
          return (
            this.stateMutability &&
              "nonpayable" !== this.stateMutability &&
              (e += this.stateMutability + " "),
            e.trim()
          );
        }
        static from(t) {
          return "string" === typeof t ? E.fromString(t) : E.fromObject(t);
        }
        static fromObject(t) {
          if (E.isConstructorFragment(t)) return t;
          "constructor" !== t.type &&
            s.throwArgumentError("invalid constructor object", "value", t);
          let e = x(t);
          e.constant &&
            s.throwArgumentError("constructor cannot be constant", "value", t);
          const n = {
            name: null,
            type: t.type,
            inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
            payable: e.payable,
            stateMutability: e.stateMutability,
            gas: t.gas ? r.O$.from(t.gas) : null,
          };
          return new E(u, n);
        }
        static fromString(t) {
          let e = { type: "constructor" },
            n = (t = b(t, e)).match(P);
          return (
            (n && "constructor" === n[1].trim()) ||
              s.throwArgumentError("invalid constructor string", "value", t),
            (e.inputs = y(n[2].trim(), !1)),
            w(n[3].trim(), e),
            E.fromObject(e)
          );
        }
        static isConstructorFragment(t) {
          return t && t._isFragment && "constructor" === t.type;
        }
      }
      class T extends E {
        format(t) {
          if (
            (t || (t = d.sighash),
            d[t] || s.throwArgumentError("invalid format type", "format", t),
            t === d.json)
          )
            return JSON.stringify({
              type: "function",
              name: this.name,
              constant: this.constant,
              stateMutability:
                "nonpayable" !== this.stateMutability
                  ? this.stateMutability
                  : void 0,
              payable: this.payable,
              gas: this.gas ? this.gas.toNumber() : void 0,
              inputs: this.inputs.map((e) => JSON.parse(e.format(t))),
              outputs: this.outputs.map((e) => JSON.parse(e.format(t))),
            });
          let e = "";
          return (
            t !== d.sighash && (e += "function "),
            (e +=
              this.name +
              "(" +
              this.inputs
                .map((e) => e.format(t))
                .join(t === d.full ? ", " : ",") +
              ") "),
            t !== d.sighash &&
              (this.stateMutability
                ? "nonpayable" !== this.stateMutability &&
                  (e += this.stateMutability + " ")
                : this.constant && (e += "view "),
              this.outputs &&
                this.outputs.length &&
                (e +=
                  "returns (" +
                  this.outputs.map((e) => e.format(t)).join(", ") +
                  ") "),
              null != this.gas && (e += "@" + this.gas.toString() + " ")),
            e.trim()
          );
        }
        static from(t) {
          return "string" === typeof t ? T.fromString(t) : T.fromObject(t);
        }
        static fromObject(t) {
          if (T.isFunctionFragment(t)) return t;
          "function" !== t.type &&
            s.throwArgumentError("invalid function object", "value", t);
          let e = x(t);
          const n = {
            type: t.type,
            name: S(t.name),
            constant: e.constant,
            inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
            outputs: t.outputs ? t.outputs.map(m.fromObject) : [],
            payable: e.payable,
            stateMutability: e.stateMutability,
            gas: t.gas ? r.O$.from(t.gas) : null,
          };
          return new T(u, n);
        }
        static fromString(t) {
          let e = { type: "function" },
            n = (t = b(t, e)).split(" returns ");
          n.length > 2 &&
            s.throwArgumentError("invalid function string", "value", t);
          let r = n[0].match(P);
          if (
            (r ||
              s.throwArgumentError("invalid function signature", "value", t),
            (e.name = r[1].trim()),
            e.name && S(e.name),
            (e.inputs = y(r[2], !1)),
            w(r[3].trim(), e),
            n.length > 1)
          ) {
            let r = n[1].match(P);
            ("" == r[1].trim() && "" == r[3].trim()) ||
              s.throwArgumentError("unexpected tokens", "value", t),
              (e.outputs = y(r[2], !1));
          } else e.outputs = [];
          return T.fromObject(e);
        }
        static isFunctionFragment(t) {
          return t && t._isFragment && "function" === t.type;
        }
      }
      function A(t) {
        const e = t.format();
        return (
          ("Error(string)" !== e && "Panic(uint256)" !== e) ||
            s.throwArgumentError(
              `cannot specify user defined ${e} error`,
              "fragment",
              t
            ),
          t
        );
      }
      class M extends g {
        format(t) {
          if (
            (t || (t = d.sighash),
            d[t] || s.throwArgumentError("invalid format type", "format", t),
            t === d.json)
          )
            return JSON.stringify({
              type: "error",
              name: this.name,
              inputs: this.inputs.map((e) => JSON.parse(e.format(t))),
            });
          let e = "";
          return (
            t !== d.sighash && (e += "error "),
            (e +=
              this.name +
              "(" +
              this.inputs
                .map((e) => e.format(t))
                .join(t === d.full ? ", " : ",") +
              ") "),
            e.trim()
          );
        }
        static from(t) {
          return "string" === typeof t ? M.fromString(t) : M.fromObject(t);
        }
        static fromObject(t) {
          if (M.isErrorFragment(t)) return t;
          "error" !== t.type &&
            s.throwArgumentError("invalid error object", "value", t);
          const e = {
            type: t.type,
            name: S(t.name),
            inputs: t.inputs ? t.inputs.map(m.fromObject) : [],
          };
          return A(new M(u, e));
        }
        static fromString(t) {
          let e = { type: "error" },
            n = t.match(P);
          return (
            n || s.throwArgumentError("invalid error signature", "value", t),
            (e.name = n[1].trim()),
            e.name && S(e.name),
            (e.inputs = y(n[2], !1)),
            A(M.fromObject(e))
          );
        }
        static isErrorFragment(t) {
          return t && t._isFragment && "error" === t.type;
        }
      }
      function _(t) {
        return (
          t.match(/^uint($|[^1-9])/)
            ? (t = "uint256" + t.substring(4))
            : t.match(/^int($|[^1-9])/) && (t = "int256" + t.substring(3)),
          t
        );
      }
      const k = new RegExp("^[a-zA-Z$_][a-zA-Z0-9$_]*$");
      function S(t) {
        return (
          (t && t.match(k)) ||
            s.throwArgumentError(`invalid identifier "${t}"`, "value", t),
          t
        );
      }
      const P = new RegExp("^([^)(]*)\\((.*)\\)([^)(]*)$");
    },
    8198: function (t, e, n) {
      "use strict";
      n.d(e, {
        CC: function () {
          return p;
        },
        vk: function () {
          return m;
        },
        Hk: function () {
          return g;
        },
        vU: function () {
          return w;
        },
      });
      var r = n(9485),
        i = n(2593),
        o = n(6441),
        a = n(2046),
        s = n(8197),
        u = n(6881),
        l = n(4243),
        c = n(1388),
        h = n(1581),
        f = n(5851);
      const d = new h.Logger(f.i);
      class p extends u.Description {}
      class m extends u.Description {}
      class y extends u.Description {}
      class g extends u.Description {
        static isIndexed(t) {
          return !(!t || !t._isIndexed);
        }
      }
      const v = {
        "0x08c379a0": {
          signature: "Error(string)",
          name: "Error",
          inputs: ["string"],
          reason: !0,
        },
        "0x4e487b71": {
          signature: "Panic(uint256)",
          name: "Panic",
          inputs: ["uint256"],
        },
      };
      function b(t, e) {
        const n = new Error(
          `deferred error during ABI decoding triggered accessing ${t}`
        );
        return (n.error = e), n;
      }
      class w {
        constructor(t) {
          d.checkNew(new.target, w);
          let e = [];
          (e = "string" === typeof t ? JSON.parse(t) : t),
            (0, u.defineReadOnly)(
              this,
              "fragments",
              e.map((t) => c.HY.from(t)).filter((t) => null != t)
            ),
            (0, u.defineReadOnly)(
              this,
              "_abiCoder",
              (0, u.getStatic)(new.target, "getAbiCoder")()
            ),
            (0, u.defineReadOnly)(this, "functions", {}),
            (0, u.defineReadOnly)(this, "errors", {}),
            (0, u.defineReadOnly)(this, "events", {}),
            (0, u.defineReadOnly)(this, "structs", {}),
            this.fragments.forEach((t) => {
              let e = null;
              switch (t.type) {
                case "constructor":
                  return this.deploy
                    ? void d.warn("duplicate definition - constructor")
                    : void (0, u.defineReadOnly)(this, "deploy", t);
                case "function":
                  e = this.functions;
                  break;
                case "event":
                  e = this.events;
                  break;
                case "error":
                  e = this.errors;
                  break;
                default:
                  return;
              }
              let n = t.format();
              e[n] ? d.warn("duplicate definition - " + n) : (e[n] = t);
            }),
            this.deploy ||
              (0, u.defineReadOnly)(
                this,
                "deploy",
                c.Xg.from({ payable: !1, type: "constructor" })
              ),
            (0, u.defineReadOnly)(this, "_isInterface", !0);
        }
        format(t) {
          t || (t = c.pc.full),
            t === c.pc.sighash &&
              d.throwArgumentError(
                "interface does not support formatting sighash",
                "format",
                t
              );
          const e = this.fragments.map((e) => e.format(t));
          return t === c.pc.json
            ? JSON.stringify(e.map((t) => JSON.parse(t)))
            : e;
        }
        static getAbiCoder() {
          return l.$;
        }
        static getAddress(t) {
          return (0, r.getAddress)(t);
        }
        static getSighash(t) {
          return (0, o.hexDataSlice)((0, a.id)(t.format()), 0, 4);
        }
        static getEventTopic(t) {
          return (0, a.id)(t.format());
        }
        getFunction(t) {
          if ((0, o.isHexString)(t)) {
            for (const e in this.functions)
              if (t === this.getSighash(e)) return this.functions[e];
            d.throwArgumentError("no matching function", "sighash", t);
          }
          if (-1 === t.indexOf("(")) {
            const e = t.trim(),
              n = Object.keys(this.functions).filter(
                (t) => t.split("(")[0] === e
              );
            return (
              0 === n.length
                ? d.throwArgumentError("no matching function", "name", e)
                : n.length > 1 &&
                  d.throwArgumentError(
                    "multiple matching functions",
                    "name",
                    e
                  ),
              this.functions[n[0]]
            );
          }
          const e = this.functions[c.YW.fromString(t).format()];
          return (
            e || d.throwArgumentError("no matching function", "signature", t), e
          );
        }
        getEvent(t) {
          if ((0, o.isHexString)(t)) {
            const e = t.toLowerCase();
            for (const t in this.events)
              if (e === this.getEventTopic(t)) return this.events[t];
            d.throwArgumentError("no matching event", "topichash", e);
          }
          if (-1 === t.indexOf("(")) {
            const e = t.trim(),
              n = Object.keys(this.events).filter((t) => t.split("(")[0] === e);
            return (
              0 === n.length
                ? d.throwArgumentError("no matching event", "name", e)
                : n.length > 1 &&
                  d.throwArgumentError("multiple matching events", "name", e),
              this.events[n[0]]
            );
          }
          const e = this.events[c.QV.fromString(t).format()];
          return (
            e || d.throwArgumentError("no matching event", "signature", t), e
          );
        }
        getError(t) {
          if ((0, o.isHexString)(t)) {
            const e = (0, u.getStatic)(this.constructor, "getSighash");
            for (const n in this.errors) {
              if (t === e(this.errors[n])) return this.errors[n];
            }
            d.throwArgumentError("no matching error", "sighash", t);
          }
          if (-1 === t.indexOf("(")) {
            const e = t.trim(),
              n = Object.keys(this.errors).filter((t) => t.split("(")[0] === e);
            return (
              0 === n.length
                ? d.throwArgumentError("no matching error", "name", e)
                : n.length > 1 &&
                  d.throwArgumentError("multiple matching errors", "name", e),
              this.errors[n[0]]
            );
          }
          const e = this.errors[c.YW.fromString(t).format()];
          return (
            e || d.throwArgumentError("no matching error", "signature", t), e
          );
        }
        getSighash(t) {
          if ("string" === typeof t)
            try {
              t = this.getFunction(t);
            } catch (e) {
              try {
                t = this.getError(t);
              } catch (n) {
                throw e;
              }
            }
          return (0, u.getStatic)(this.constructor, "getSighash")(t);
        }
        getEventTopic(t) {
          return (
            "string" === typeof t && (t = this.getEvent(t)),
            (0, u.getStatic)(this.constructor, "getEventTopic")(t)
          );
        }
        _decodeParams(t, e) {
          return this._abiCoder.decode(t, e);
        }
        _encodeParams(t, e) {
          return this._abiCoder.encode(t, e);
        }
        encodeDeploy(t) {
          return this._encodeParams(this.deploy.inputs, t || []);
        }
        decodeErrorResult(t, e) {
          "string" === typeof t && (t = this.getError(t));
          const n = (0, o.arrayify)(e);
          return (
            (0, o.hexlify)(n.slice(0, 4)) !== this.getSighash(t) &&
              d.throwArgumentError(
                `data signature does not match error ${t.name}.`,
                "data",
                (0, o.hexlify)(n)
              ),
            this._decodeParams(t.inputs, n.slice(4))
          );
        }
        encodeErrorResult(t, e) {
          return (
            "string" === typeof t && (t = this.getError(t)),
            (0, o.hexlify)(
              (0, o.concat)([
                this.getSighash(t),
                this._encodeParams(t.inputs, e || []),
              ])
            )
          );
        }
        decodeFunctionData(t, e) {
          "string" === typeof t && (t = this.getFunction(t));
          const n = (0, o.arrayify)(e);
          return (
            (0, o.hexlify)(n.slice(0, 4)) !== this.getSighash(t) &&
              d.throwArgumentError(
                `data signature does not match function ${t.name}.`,
                "data",
                (0, o.hexlify)(n)
              ),
            this._decodeParams(t.inputs, n.slice(4))
          );
        }
        encodeFunctionData(t, e) {
          return (
            "string" === typeof t && (t = this.getFunction(t)),
            (0, o.hexlify)(
              (0, o.concat)([
                this.getSighash(t),
                this._encodeParams(t.inputs, e || []),
              ])
            )
          );
        }
        decodeFunctionResult(t, e) {
          "string" === typeof t && (t = this.getFunction(t));
          let n = (0, o.arrayify)(e),
            r = null,
            i = null,
            a = null,
            s = null;
          switch (n.length % this._abiCoder._getWordSize()) {
            case 0:
              try {
                return this._abiCoder.decode(t.outputs, n);
              } catch (u) {}
              break;
            case 4: {
              const t = (0, o.hexlify)(n.slice(0, 4)),
                e = v[t];
              if (e)
                (i = this._abiCoder.decode(e.inputs, n.slice(4))),
                  (a = e.name),
                  (s = e.signature),
                  e.reason && (r = i[0]);
              else
                try {
                  const e = this.getError(t);
                  (i = this._abiCoder.decode(e.inputs, n.slice(4))),
                    (a = e.name),
                    (s = e.format());
                } catch (u) {
                  console.log(u);
                }
              break;
            }
          }
          return d.throwError(
            "call revert exception",
            h.Logger.errors.CALL_EXCEPTION,
            {
              method: t.format(),
              errorArgs: i,
              errorName: a,
              errorSignature: s,
              reason: r,
            }
          );
        }
        encodeFunctionResult(t, e) {
          return (
            "string" === typeof t && (t = this.getFunction(t)),
            (0, o.hexlify)(this._abiCoder.encode(t.outputs, e || []))
          );
        }
        encodeFilterTopics(t, e) {
          "string" === typeof t && (t = this.getEvent(t)),
            e.length > t.inputs.length &&
              d.throwError(
                "too many arguments for " + t.format(),
                h.Logger.errors.UNEXPECTED_ARGUMENT,
                { argument: "values", value: e }
              );
          let n = [];
          t.anonymous || n.push(this.getEventTopic(t));
          const r = (t, e) =>
            "string" === t.type
              ? (0, a.id)(e)
              : "bytes" === t.type
              ? (0, s.keccak256)((0, o.hexlify)(e))
              : ("address" === t.type &&
                  this._abiCoder.encode(["address"], [e]),
                (0, o.hexZeroPad)((0, o.hexlify)(e), 32));
          for (
            e.forEach((e, i) => {
              let o = t.inputs[i];
              o.indexed
                ? null == e
                  ? n.push(null)
                  : "array" === o.baseType || "tuple" === o.baseType
                  ? d.throwArgumentError(
                      "filtering with tuples or arrays not supported",
                      "contract." + o.name,
                      e
                    )
                  : Array.isArray(e)
                  ? n.push(e.map((t) => r(o, t)))
                  : n.push(r(o, e))
                : null != e &&
                  d.throwArgumentError(
                    "cannot filter non-indexed parameters; must be null",
                    "contract." + o.name,
                    e
                  );
            });
            n.length && null === n[n.length - 1];

          )
            n.pop();
          return n;
        }
        encodeEventLog(t, e) {
          "string" === typeof t && (t = this.getEvent(t));
          const n = [],
            r = [],
            i = [];
          return (
            t.anonymous || n.push(this.getEventTopic(t)),
            e.length !== t.inputs.length &&
              d.throwArgumentError(
                "event arguments/values mismatch",
                "values",
                e
              ),
            t.inputs.forEach((t, o) => {
              const u = e[o];
              if (t.indexed)
                if ("string" === t.type) n.push((0, a.id)(u));
                else if ("bytes" === t.type) n.push((0, s.keccak256)(u));
                else {
                  if ("tuple" === t.baseType || "array" === t.baseType)
                    throw new Error("not implemented");
                  n.push(this._abiCoder.encode([t.type], [u]));
                }
              else r.push(t), i.push(u);
            }),
            { data: this._abiCoder.encode(r, i), topics: n }
          );
        }
        decodeEventLog(t, e, n) {
          if (
            ("string" === typeof t && (t = this.getEvent(t)),
            null != n && !t.anonymous)
          ) {
            let e = this.getEventTopic(t);
            ((0, o.isHexString)(n[0], 32) && n[0].toLowerCase() === e) ||
              d.throwError(
                "fragment/topic mismatch",
                h.Logger.errors.INVALID_ARGUMENT,
                { argument: "topics[0]", expected: e, value: n[0] }
              ),
              (n = n.slice(1));
          }
          let r = [],
            i = [],
            a = [];
          t.inputs.forEach((t, e) => {
            t.indexed
              ? "string" === t.type ||
                "bytes" === t.type ||
                "tuple" === t.baseType ||
                "array" === t.baseType
                ? (r.push(c._R.fromObject({ type: "bytes32", name: t.name })),
                  a.push(!0))
                : (r.push(t), a.push(!1))
              : (i.push(t), a.push(!1));
          });
          let s = null != n ? this._abiCoder.decode(r, (0, o.concat)(n)) : null,
            u = this._abiCoder.decode(i, e, !0),
            l = [],
            f = 0,
            p = 0;
          t.inputs.forEach((t, e) => {
            if (t.indexed)
              if (null == s) l[e] = new g({ _isIndexed: !0, hash: null });
              else if (a[e]) l[e] = new g({ _isIndexed: !0, hash: s[p++] });
              else
                try {
                  l[e] = s[p++];
                } catch (n) {
                  l[e] = n;
                }
            else
              try {
                l[e] = u[f++];
              } catch (n) {
                l[e] = n;
              }
            if (t.name && null == l[t.name]) {
              const n = l[e];
              n instanceof Error
                ? Object.defineProperty(l, t.name, {
                    enumerable: !0,
                    get: () => {
                      throw b(`property ${JSON.stringify(t.name)}`, n);
                    },
                  })
                : (l[t.name] = n);
            }
          });
          for (let o = 0; o < l.length; o++) {
            const t = l[o];
            t instanceof Error &&
              Object.defineProperty(l, o, {
                enumerable: !0,
                get: () => {
                  throw b(`index ${o}`, t);
                },
              });
          }
          return Object.freeze(l);
        }
        parseTransaction(t) {
          let e = this.getFunction(t.data.substring(0, 10).toLowerCase());
          return e
            ? new m({
                args: this._abiCoder.decode(
                  e.inputs,
                  "0x" + t.data.substring(10)
                ),
                functionFragment: e,
                name: e.name,
                signature: e.format(),
                sighash: this.getSighash(e),
                value: i.O$.from(t.value || "0"),
              })
            : null;
        }
        parseLog(t) {
          let e = this.getEvent(t.topics[0]);
          return !e || e.anonymous
            ? null
            : new p({
                eventFragment: e,
                name: e.name,
                signature: e.format(),
                topic: this.getEventTopic(e),
                args: this.decodeEventLog(e, t.data, t.topics),
              });
        }
        parseError(t) {
          const e = (0, o.hexlify)(t);
          let n = this.getError(e.substring(0, 10).toLowerCase());
          return n
            ? new y({
                args: this._abiCoder.decode(n.inputs, "0x" + e.substring(10)),
                errorFragment: n,
                name: n.name,
                signature: n.format(),
                sighash: this.getSighash(n),
              })
            : null;
        }
        static isInterface(t) {
          return !(!t || !t._isInterface);
        }
      }
    },
    1556: function (t, e, n) {
      "use strict";
      n.d(e, {
        Sg: function () {
          return u;
        },
        zt: function () {
          return l;
        },
      });
      var r = n(2593),
        i = n(6881),
        o = n(1581);
      var a = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const s = new o.Logger("abstract-provider/5.5.1");
      class u extends i.Description {
        static isForkEvent(t) {
          return !(!t || !t._isForkEvent);
        }
      }
      class l {
        constructor() {
          s.checkAbstract(new.target, l),
            (0, i.defineReadOnly)(this, "_isProvider", !0);
        }
        getFeeData() {
          return a(this, void 0, void 0, function* () {
            const { block: t, gasPrice: e } = yield (0, i.resolveProperties)({
              block: this.getBlock("latest"),
              gasPrice: this.getGasPrice().catch((t) => null),
            });
            let n = null,
              o = null;
            return (
              t &&
                t.baseFeePerGas &&
                ((o = r.O$.from("2500000000")),
                (n = t.baseFeePerGas.mul(2).add(o))),
              { maxFeePerGas: n, maxPriorityFeePerGas: o, gasPrice: e }
            );
          });
        }
        addListener(t, e) {
          return this.on(t, e);
        }
        removeListener(t, e) {
          return this.off(t, e);
        }
        static isProvider(t) {
          return !(!t || !t._isProvider);
        }
      }
    },
    8088: function (t, e, n) {
      "use strict";
      n.d(e, {
        E: function () {
          return l;
        },
        b: function () {
          return c;
        },
      });
      var r = n(6881),
        i = n(1581);
      var o = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const a = new i.Logger("abstract-signer/5.5.0"),
        s = [
          "accessList",
          "chainId",
          "customData",
          "data",
          "from",
          "gasLimit",
          "gasPrice",
          "maxFeePerGas",
          "maxPriorityFeePerGas",
          "nonce",
          "to",
          "type",
          "value",
        ],
        u = [
          i.Logger.errors.INSUFFICIENT_FUNDS,
          i.Logger.errors.NONCE_EXPIRED,
          i.Logger.errors.REPLACEMENT_UNDERPRICED,
        ];
      class l {
        constructor() {
          a.checkAbstract(new.target, l),
            (0, r.defineReadOnly)(this, "_isSigner", !0);
        }
        getBalance(t) {
          return o(this, void 0, void 0, function* () {
            return (
              this._checkProvider("getBalance"),
              yield this.provider.getBalance(this.getAddress(), t)
            );
          });
        }
        getTransactionCount(t) {
          return o(this, void 0, void 0, function* () {
            return (
              this._checkProvider("getTransactionCount"),
              yield this.provider.getTransactionCount(this.getAddress(), t)
            );
          });
        }
        estimateGas(t) {
          return o(this, void 0, void 0, function* () {
            this._checkProvider("estimateGas");
            const e = yield (0, r.resolveProperties)(this.checkTransaction(t));
            return yield this.provider.estimateGas(e);
          });
        }
        call(t, e) {
          return o(this, void 0, void 0, function* () {
            this._checkProvider("call");
            const n = yield (0, r.resolveProperties)(this.checkTransaction(t));
            return yield this.provider.call(n, e);
          });
        }
        sendTransaction(t) {
          return o(this, void 0, void 0, function* () {
            this._checkProvider("sendTransaction");
            const e = yield this.populateTransaction(t),
              n = yield this.signTransaction(e);
            return yield this.provider.sendTransaction(n);
          });
        }
        getChainId() {
          return o(this, void 0, void 0, function* () {
            this._checkProvider("getChainId");
            return (yield this.provider.getNetwork()).chainId;
          });
        }
        getGasPrice() {
          return o(this, void 0, void 0, function* () {
            return (
              this._checkProvider("getGasPrice"),
              yield this.provider.getGasPrice()
            );
          });
        }
        getFeeData() {
          return o(this, void 0, void 0, function* () {
            return (
              this._checkProvider("getFeeData"),
              yield this.provider.getFeeData()
            );
          });
        }
        resolveName(t) {
          return o(this, void 0, void 0, function* () {
            return (
              this._checkProvider("resolveName"),
              yield this.provider.resolveName(t)
            );
          });
        }
        checkTransaction(t) {
          for (const n in t)
            -1 === s.indexOf(n) &&
              a.throwArgumentError(
                "invalid transaction key: " + n,
                "transaction",
                t
              );
          const e = (0, r.shallowCopy)(t);
          return (
            null == e.from
              ? (e.from = this.getAddress())
              : (e.from = Promise.all([
                  Promise.resolve(e.from),
                  this.getAddress(),
                ]).then(
                  (e) => (
                    e[0].toLowerCase() !== e[1].toLowerCase() &&
                      a.throwArgumentError(
                        "from address mismatch",
                        "transaction",
                        t
                      ),
                    e[0]
                  )
                )),
            e
          );
        }
        populateTransaction(t) {
          return o(this, void 0, void 0, function* () {
            const e = yield (0, r.resolveProperties)(this.checkTransaction(t));
            null != e.to &&
              ((e.to = Promise.resolve(e.to).then((t) =>
                o(this, void 0, void 0, function* () {
                  if (null == t) return null;
                  const e = yield this.resolveName(t);
                  return (
                    null == e &&
                      a.throwArgumentError(
                        "provided ENS name resolves to null",
                        "tx.to",
                        t
                      ),
                    e
                  );
                })
              )),
              e.to.catch((t) => {}));
            const n = null != e.maxFeePerGas || null != e.maxPriorityFeePerGas;
            if (
              (null == e.gasPrice || (2 !== e.type && !n)
                ? (0 !== e.type && 1 !== e.type) ||
                  !n ||
                  a.throwArgumentError(
                    "pre-eip-1559 transaction do not support maxFeePerGas/maxPriorityFeePerGas",
                    "transaction",
                    t
                  )
                : a.throwArgumentError(
                    "eip-1559 transaction do not support gasPrice",
                    "transaction",
                    t
                  ),
              (2 !== e.type && null != e.type) ||
                null == e.maxFeePerGas ||
                null == e.maxPriorityFeePerGas)
            )
              if (0 === e.type || 1 === e.type)
                null == e.gasPrice && (e.gasPrice = this.getGasPrice());
              else {
                const t = yield this.getFeeData();
                if (null == e.type)
                  if (null != t.maxFeePerGas && null != t.maxPriorityFeePerGas)
                    if (((e.type = 2), null != e.gasPrice)) {
                      const t = e.gasPrice;
                      delete e.gasPrice,
                        (e.maxFeePerGas = t),
                        (e.maxPriorityFeePerGas = t);
                    } else
                      null == e.maxFeePerGas &&
                        (e.maxFeePerGas = t.maxFeePerGas),
                        null == e.maxPriorityFeePerGas &&
                          (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas);
                  else
                    null != t.gasPrice
                      ? (n &&
                          a.throwError(
                            "network does not support EIP-1559",
                            i.Logger.errors.UNSUPPORTED_OPERATION,
                            { operation: "populateTransaction" }
                          ),
                        null == e.gasPrice && (e.gasPrice = t.gasPrice),
                        (e.type = 0))
                      : a.throwError(
                          "failed to get consistent fee data",
                          i.Logger.errors.UNSUPPORTED_OPERATION,
                          { operation: "signer.getFeeData" }
                        );
                else
                  2 === e.type &&
                    (null == e.maxFeePerGas &&
                      (e.maxFeePerGas = t.maxFeePerGas),
                    null == e.maxPriorityFeePerGas &&
                      (e.maxPriorityFeePerGas = t.maxPriorityFeePerGas));
              }
            else e.type = 2;
            return (
              null == e.nonce &&
                (e.nonce = this.getTransactionCount("pending")),
              null == e.gasLimit &&
                (e.gasLimit = this.estimateGas(e).catch((t) => {
                  if (u.indexOf(t.code) >= 0) throw t;
                  return a.throwError(
                    "cannot estimate gas; transaction may fail or may require manual gas limit",
                    i.Logger.errors.UNPREDICTABLE_GAS_LIMIT,
                    { error: t, tx: e }
                  );
                })),
              null == e.chainId
                ? (e.chainId = this.getChainId())
                : (e.chainId = Promise.all([
                    Promise.resolve(e.chainId),
                    this.getChainId(),
                  ]).then(
                    (e) => (
                      0 !== e[1] &&
                        e[0] !== e[1] &&
                        a.throwArgumentError(
                          "chainId address mismatch",
                          "transaction",
                          t
                        ),
                      e[0]
                    )
                  )),
              yield (0, r.resolveProperties)(e)
            );
          });
        }
        _checkProvider(t) {
          this.provider ||
            a.throwError(
              "missing provider",
              i.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: t || "_checkProvider" }
            );
        }
        static isSigner(t) {
          return !(!t || !t._isSigner);
        }
      }
      class c extends l {
        constructor(t, e) {
          a.checkNew(new.target, c),
            super(),
            (0, r.defineReadOnly)(this, "address", t),
            (0, r.defineReadOnly)(this, "provider", e || null);
        }
        getAddress() {
          return Promise.resolve(this.address);
        }
        _fail(t, e) {
          return Promise.resolve().then(() => {
            a.throwError(t, i.Logger.errors.UNSUPPORTED_OPERATION, {
              operation: e,
            });
          });
        }
        signMessage(t) {
          return this._fail("VoidSigner cannot sign messages", "signMessage");
        }
        signTransaction(t) {
          return this._fail(
            "VoidSigner cannot sign transactions",
            "signTransaction"
          );
        }
        _signTypedData(t, e, n) {
          return this._fail(
            "VoidSigner cannot sign typed data",
            "signTypedData"
          );
        }
        connect(t) {
          return new c(this.address, t);
        }
      }
    },
    9485: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          getAddress: function () {
            return d;
          },
          getContractAddress: function () {
            return y;
          },
          getCreate2Address: function () {
            return g;
          },
          getIcapAddress: function () {
            return m;
          },
          isAddress: function () {
            return p;
          },
        });
      var r = n(6441),
        i = n(2593),
        o = n(8197),
        a = n(9052);
      const s = new (n(1581).Logger)("address/5.5.0");
      function u(t) {
        (0, r.isHexString)(t, 20) ||
          s.throwArgumentError("invalid address", "address", t);
        const e = (t = t.toLowerCase()).substring(2).split(""),
          n = new Uint8Array(40);
        for (let r = 0; r < 40; r++) n[r] = e[r].charCodeAt(0);
        const i = (0, r.arrayify)((0, o.keccak256)(n));
        for (let r = 0; r < 40; r += 2)
          i[r >> 1] >> 4 >= 8 && (e[r] = e[r].toUpperCase()),
            (15 & i[r >> 1]) >= 8 && (e[r + 1] = e[r + 1].toUpperCase());
        return "0x" + e.join("");
      }
      const l = {};
      for (let v = 0; v < 10; v++) l[String(v)] = String(v);
      for (let v = 0; v < 26; v++)
        l[String.fromCharCode(65 + v)] = String(10 + v);
      const c = Math.floor(
        ((h = 9007199254740991),
        Math.log10 ? Math.log10(h) : Math.log(h) / Math.LN10)
      );
      var h;
      function f(t) {
        let e = (t =
          (t = t.toUpperCase()).substring(4) + t.substring(0, 2) + "00")
          .split("")
          .map((t) => l[t])
          .join("");
        for (; e.length >= c; ) {
          let t = e.substring(0, c);
          e = (parseInt(t, 10) % 97) + e.substring(t.length);
        }
        let n = String(98 - (parseInt(e, 10) % 97));
        for (; n.length < 2; ) n = "0" + n;
        return n;
      }
      function d(t) {
        let e = null;
        if (
          ("string" !== typeof t &&
            s.throwArgumentError("invalid address", "address", t),
          t.match(/^(0x)?[0-9a-fA-F]{40}$/))
        )
          "0x" !== t.substring(0, 2) && (t = "0x" + t),
            (e = u(t)),
            t.match(/([A-F].*[a-f])|([a-f].*[A-F])/) &&
              e !== t &&
              s.throwArgumentError("bad address checksum", "address", t);
        else if (t.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
          for (
            t.substring(2, 4) !== f(t) &&
              s.throwArgumentError("bad icap checksum", "address", t),
              e = (0, i.g$)(t.substring(4));
            e.length < 40;

          )
            e = "0" + e;
          e = u("0x" + e);
        } else s.throwArgumentError("invalid address", "address", t);
        return e;
      }
      function p(t) {
        try {
          return d(t), !0;
        } catch (e) {}
        return !1;
      }
      function m(t) {
        let e = (0, i.t2)(d(t).substring(2)).toUpperCase();
        for (; e.length < 30; ) e = "0" + e;
        return "XE" + f("XE00" + e) + e;
      }
      function y(t) {
        let e = null;
        try {
          e = d(t.from);
        } catch (u) {
          s.throwArgumentError("missing from address", "transaction", t);
        }
        const n = (0, r.stripZeros)(
          (0, r.arrayify)(i.O$.from(t.nonce).toHexString())
        );
        return d(
          (0, r.hexDataSlice)((0, o.keccak256)((0, a.encode)([e, n])), 12)
        );
      }
      function g(t, e, n) {
        return (
          32 !== (0, r.hexDataLength)(e) &&
            s.throwArgumentError("salt must be 32 bytes", "salt", e),
          32 !== (0, r.hexDataLength)(n) &&
            s.throwArgumentError(
              "initCodeHash must be 32 bytes",
              "initCodeHash",
              n
            ),
          d(
            (0, r.hexDataSlice)(
              (0, o.keccak256)((0, r.concat)(["0xff", d(t), e, n])),
              12
            )
          )
        );
      }
    },
    9567: function (t, e, n) {
      "use strict";
      n.d(e, {
        J: function () {
          return i;
        },
        c: function () {
          return o;
        },
      });
      var r = n(6441);
      function i(t) {
        t = atob(t);
        const e = [];
        for (let n = 0; n < t.length; n++) e.push(t.charCodeAt(n));
        return (0, r.arrayify)(e);
      }
      function o(t) {
        t = (0, r.arrayify)(t);
        let e = "";
        for (let n = 0; n < t.length; n++) e += String.fromCharCode(t[n]);
        return btoa(e);
      }
    },
    7727: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          BaseX: function () {
            return o;
          },
          Base32: function () {
            return a;
          },
          Base58: function () {
            return s;
          },
        });
      var r = n(6441),
        i = n(6881);
      class o {
        constructor(t) {
          (0, i.defineReadOnly)(this, "alphabet", t),
            (0, i.defineReadOnly)(this, "base", t.length),
            (0, i.defineReadOnly)(this, "_alphabetMap", {}),
            (0, i.defineReadOnly)(this, "_leader", t.charAt(0));
          for (let e = 0; e < t.length; e++) this._alphabetMap[t.charAt(e)] = e;
        }
        encode(t) {
          let e = (0, r.arrayify)(t);
          if (0 === e.length) return "";
          let n = [0];
          for (let r = 0; r < e.length; ++r) {
            let t = e[r];
            for (let e = 0; e < n.length; ++e)
              (t += n[e] << 8),
                (n[e] = t % this.base),
                (t = (t / this.base) | 0);
            for (; t > 0; ) n.push(t % this.base), (t = (t / this.base) | 0);
          }
          let i = "";
          for (let r = 0; 0 === e[r] && r < e.length - 1; ++r)
            i += this._leader;
          for (let r = n.length - 1; r >= 0; --r) i += this.alphabet[n[r]];
          return i;
        }
        decode(t) {
          if ("string" !== typeof t) throw new TypeError("Expected String");
          let e = [];
          if (0 === t.length) return new Uint8Array(e);
          e.push(0);
          for (let n = 0; n < t.length; n++) {
            let r = this._alphabetMap[t[n]];
            if (void 0 === r)
              throw new Error("Non-base" + this.base + " character");
            let i = r;
            for (let t = 0; t < e.length; ++t)
              (i += e[t] * this.base), (e[t] = 255 & i), (i >>= 8);
            for (; i > 0; ) e.push(255 & i), (i >>= 8);
          }
          for (let n = 0; t[n] === this._leader && n < t.length - 1; ++n)
            e.push(0);
          return (0, r.arrayify)(new Uint8Array(e.reverse()));
        }
      }
      const a = new o("abcdefghijklmnopqrstuvwxyz234567"),
        s = new o("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
    },
    8794: function (t, e, n) {
      "use strict";
      n.d(e, {
        i: function () {
          return r;
        },
      });
      const r = "bignumber/5.5.0";
    },
    2593: function (t, e, n) {
      "use strict";
      n.d(e, {
        Zm: function () {
          return f;
        },
        O$: function () {
          return p;
        },
        g$: function () {
          return b;
        },
        t2: function () {
          return w;
        },
      });
      var r = n(3550),
        i = n.n(r),
        o = n(6441),
        a = n(1581),
        s = n(8794),
        u = i().BN;
      const l = new a.Logger(s.i),
        c = {},
        h = 9007199254740991;
      function f(t) {
        return (
          null != t &&
          (p.isBigNumber(t) ||
            ("number" === typeof t && t % 1 === 0) ||
            ("string" === typeof t && !!t.match(/^-?[0-9]+$/)) ||
            (0, o.isHexString)(t) ||
            "bigint" === typeof t ||
            (0, o.isBytes)(t))
        );
      }
      let d = !1;
      class p {
        constructor(t, e) {
          l.checkNew(new.target, p),
            t !== c &&
              l.throwError(
                "cannot call constructor directly; use BigNumber.from",
                a.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "new (BigNumber)" }
              ),
            (this._hex = e),
            (this._isBigNumber = !0),
            Object.freeze(this);
        }
        fromTwos(t) {
          return y(g(this).fromTwos(t));
        }
        toTwos(t) {
          return y(g(this).toTwos(t));
        }
        abs() {
          return "-" === this._hex[0] ? p.from(this._hex.substring(1)) : this;
        }
        add(t) {
          return y(g(this).add(g(t)));
        }
        sub(t) {
          return y(g(this).sub(g(t)));
        }
        div(t) {
          return (
            p.from(t).isZero() && v("division by zero", "div"),
            y(g(this).div(g(t)))
          );
        }
        mul(t) {
          return y(g(this).mul(g(t)));
        }
        mod(t) {
          const e = g(t);
          return (
            e.isNeg() && v("cannot modulo negative values", "mod"),
            y(g(this).umod(e))
          );
        }
        pow(t) {
          const e = g(t);
          return (
            e.isNeg() && v("cannot raise to negative values", "pow"),
            y(g(this).pow(e))
          );
        }
        and(t) {
          const e = g(t);
          return (
            (this.isNegative() || e.isNeg()) &&
              v("cannot 'and' negative values", "and"),
            y(g(this).and(e))
          );
        }
        or(t) {
          const e = g(t);
          return (
            (this.isNegative() || e.isNeg()) &&
              v("cannot 'or' negative values", "or"),
            y(g(this).or(e))
          );
        }
        xor(t) {
          const e = g(t);
          return (
            (this.isNegative() || e.isNeg()) &&
              v("cannot 'xor' negative values", "xor"),
            y(g(this).xor(e))
          );
        }
        mask(t) {
          return (
            (this.isNegative() || t < 0) &&
              v("cannot mask negative values", "mask"),
            y(g(this).maskn(t))
          );
        }
        shl(t) {
          return (
            (this.isNegative() || t < 0) &&
              v("cannot shift negative values", "shl"),
            y(g(this).shln(t))
          );
        }
        shr(t) {
          return (
            (this.isNegative() || t < 0) &&
              v("cannot shift negative values", "shr"),
            y(g(this).shrn(t))
          );
        }
        eq(t) {
          return g(this).eq(g(t));
        }
        lt(t) {
          return g(this).lt(g(t));
        }
        lte(t) {
          return g(this).lte(g(t));
        }
        gt(t) {
          return g(this).gt(g(t));
        }
        gte(t) {
          return g(this).gte(g(t));
        }
        isNegative() {
          return "-" === this._hex[0];
        }
        isZero() {
          return g(this).isZero();
        }
        toNumber() {
          try {
            return g(this).toNumber();
          } catch (t) {
            v("overflow", "toNumber", this.toString());
          }
          return null;
        }
        toBigInt() {
          try {
            return BigInt(this.toString());
          } catch (t) {}
          return l.throwError(
            "this platform does not support BigInt",
            a.Logger.errors.UNSUPPORTED_OPERATION,
            { value: this.toString() }
          );
        }
        toString() {
          return (
            arguments.length > 0 &&
              (10 === arguments[0]
                ? d ||
                  ((d = !0),
                  l.warn(
                    "BigNumber.toString does not accept any parameters; base-10 is assumed"
                  ))
                : 16 === arguments[0]
                ? l.throwError(
                    "BigNumber.toString does not accept any parameters; use bigNumber.toHexString()",
                    a.Logger.errors.UNEXPECTED_ARGUMENT,
                    {}
                  )
                : l.throwError(
                    "BigNumber.toString does not accept parameters",
                    a.Logger.errors.UNEXPECTED_ARGUMENT,
                    {}
                  )),
            g(this).toString(10)
          );
        }
        toHexString() {
          return this._hex;
        }
        toJSON(t) {
          return { type: "BigNumber", hex: this.toHexString() };
        }
        static from(t) {
          if (t instanceof p) return t;
          if ("string" === typeof t)
            return t.match(/^-?0x[0-9a-f]+$/i)
              ? new p(c, m(t))
              : t.match(/^-?[0-9]+$/)
              ? new p(c, m(new u(t)))
              : l.throwArgumentError("invalid BigNumber string", "value", t);
          if ("number" === typeof t)
            return (
              t % 1 && v("underflow", "BigNumber.from", t),
              (t >= h || t <= -h) && v("overflow", "BigNumber.from", t),
              p.from(String(t))
            );
          const e = t;
          if ("bigint" === typeof e) return p.from(e.toString());
          if ((0, o.isBytes)(e)) return p.from((0, o.hexlify)(e));
          if (e)
            if (e.toHexString) {
              const t = e.toHexString();
              if ("string" === typeof t) return p.from(t);
            } else {
              let t = e._hex;
              if (
                (null == t && "BigNumber" === e.type && (t = e.hex),
                "string" === typeof t &&
                  ((0, o.isHexString)(t) ||
                    ("-" === t[0] && (0, o.isHexString)(t.substring(1)))))
              )
                return p.from(t);
            }
          return l.throwArgumentError("invalid BigNumber value", "value", t);
        }
        static isBigNumber(t) {
          return !(!t || !t._isBigNumber);
        }
      }
      function m(t) {
        if ("string" !== typeof t) return m(t.toString(16));
        if ("-" === t[0])
          return (
            "-" === (t = t.substring(1))[0] &&
              l.throwArgumentError("invalid hex", "value", t),
            "0x00" === (t = m(t)) ? t : "-" + t
          );
        if (("0x" !== t.substring(0, 2) && (t = "0x" + t), "0x" === t))
          return "0x00";
        for (
          t.length % 2 && (t = "0x0" + t.substring(2));
          t.length > 4 && "0x00" === t.substring(0, 4);

        )
          t = "0x" + t.substring(4);
        return t;
      }
      function y(t) {
        return p.from(m(t));
      }
      function g(t) {
        const e = p.from(t).toHexString();
        return "-" === e[0]
          ? new u("-" + e.substring(3), 16)
          : new u(e.substring(2), 16);
      }
      function v(t, e, n) {
        const r = { fault: t, operation: e };
        return (
          null != n && (r.value = n),
          l.throwError(t, a.Logger.errors.NUMERIC_FAULT, r)
        );
      }
      function b(t) {
        return new u(t, 36).toString(16);
      }
      function w(t) {
        return new u(t, 16).toString(36);
      }
    },
    6441: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          arrayify: function () {
            return l;
          },
          concat: function () {
            return c;
          },
          hexConcat: function () {
            return v;
          },
          hexDataLength: function () {
            return y;
          },
          hexDataSlice: function () {
            return g;
          },
          hexStripZeros: function () {
            return w;
          },
          hexValue: function () {
            return b;
          },
          hexZeroPad: function () {
            return x;
          },
          hexlify: function () {
            return m;
          },
          isBytes: function () {
            return u;
          },
          isBytesLike: function () {
            return a;
          },
          isHexString: function () {
            return d;
          },
          joinSignature: function () {
            return T;
          },
          splitSignature: function () {
            return E;
          },
          stripZeros: function () {
            return h;
          },
          zeroPad: function () {
            return f;
          },
        });
      const r = new (n(1581).Logger)("bytes/5.5.0");
      function i(t) {
        return !!t.toHexString;
      }
      function o(t) {
        return (
          t.slice ||
            (t.slice = function () {
              const e = Array.prototype.slice.call(arguments);
              return o(new Uint8Array(Array.prototype.slice.apply(t, e)));
            }),
          t
        );
      }
      function a(t) {
        return (d(t) && !(t.length % 2)) || u(t);
      }
      function s(t) {
        return "number" === typeof t && t == t && t % 1 === 0;
      }
      function u(t) {
        if (null == t) return !1;
        if (t.constructor === Uint8Array) return !0;
        if ("string" === typeof t) return !1;
        if (!s(t.length) || t.length < 0) return !1;
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          if (!s(n) || n < 0 || n >= 256) return !1;
        }
        return !0;
      }
      function l(t, e) {
        if ((e || (e = {}), "number" === typeof t)) {
          r.checkSafeUint53(t, "invalid arrayify value");
          const e = [];
          for (; t; ) e.unshift(255 & t), (t = parseInt(String(t / 256)));
          return 0 === e.length && e.push(0), o(new Uint8Array(e));
        }
        if (
          (e.allowMissingPrefix &&
            "string" === typeof t &&
            "0x" !== t.substring(0, 2) &&
            (t = "0x" + t),
          i(t) && (t = t.toHexString()),
          d(t))
        ) {
          let n = t.substring(2);
          n.length % 2 &&
            ("left" === e.hexPad
              ? (n = "0x0" + n.substring(2))
              : "right" === e.hexPad
              ? (n += "0")
              : r.throwArgumentError("hex data is odd-length", "value", t));
          const i = [];
          for (let t = 0; t < n.length; t += 2)
            i.push(parseInt(n.substring(t, t + 2), 16));
          return o(new Uint8Array(i));
        }
        return u(t)
          ? o(new Uint8Array(t))
          : r.throwArgumentError("invalid arrayify value", "value", t);
      }
      function c(t) {
        const e = t.map((t) => l(t)),
          n = e.reduce((t, e) => t + e.length, 0),
          r = new Uint8Array(n);
        return e.reduce((t, e) => (r.set(e, t), t + e.length), 0), o(r);
      }
      function h(t) {
        let e = l(t);
        if (0 === e.length) return e;
        let n = 0;
        for (; n < e.length && 0 === e[n]; ) n++;
        return n && (e = e.slice(n)), e;
      }
      function f(t, e) {
        (t = l(t)).length > e &&
          r.throwArgumentError("value out of range", "value", arguments[0]);
        const n = new Uint8Array(e);
        return n.set(t, e - t.length), o(n);
      }
      function d(t, e) {
        return (
          !("string" !== typeof t || !t.match(/^0x[0-9A-Fa-f]*$/)) &&
          (!e || t.length === 2 + 2 * e)
        );
      }
      const p = "0123456789abcdef";
      function m(t, e) {
        if ((e || (e = {}), "number" === typeof t)) {
          r.checkSafeUint53(t, "invalid hexlify value");
          let e = "";
          for (; t; ) (e = p[15 & t] + e), (t = Math.floor(t / 16));
          return e.length ? (e.length % 2 && (e = "0" + e), "0x" + e) : "0x00";
        }
        if ("bigint" === typeof t)
          return (t = t.toString(16)).length % 2 ? "0x0" + t : "0x" + t;
        if (
          (e.allowMissingPrefix &&
            "string" === typeof t &&
            "0x" !== t.substring(0, 2) &&
            (t = "0x" + t),
          i(t))
        )
          return t.toHexString();
        if (d(t))
          return (
            t.length % 2 &&
              ("left" === e.hexPad
                ? (t = "0x0" + t.substring(2))
                : "right" === e.hexPad
                ? (t += "0")
                : r.throwArgumentError("hex data is odd-length", "value", t)),
            t.toLowerCase()
          );
        if (u(t)) {
          let e = "0x";
          for (let n = 0; n < t.length; n++) {
            let r = t[n];
            e += p[(240 & r) >> 4] + p[15 & r];
          }
          return e;
        }
        return r.throwArgumentError("invalid hexlify value", "value", t);
      }
      function y(t) {
        if ("string" !== typeof t) t = m(t);
        else if (!d(t) || t.length % 2) return null;
        return (t.length - 2) / 2;
      }
      function g(t, e, n) {
        return (
          "string" !== typeof t
            ? (t = m(t))
            : (!d(t) || t.length % 2) &&
              r.throwArgumentError("invalid hexData", "value", t),
          (e = 2 + 2 * e),
          null != n ? "0x" + t.substring(e, 2 + 2 * n) : "0x" + t.substring(e)
        );
      }
      function v(t) {
        let e = "0x";
        return (
          t.forEach((t) => {
            e += m(t).substring(2);
          }),
          e
        );
      }
      function b(t) {
        const e = w(m(t, { hexPad: "left" }));
        return "0x" === e ? "0x0" : e;
      }
      function w(t) {
        "string" !== typeof t && (t = m(t)),
          d(t) || r.throwArgumentError("invalid hex string", "value", t),
          (t = t.substring(2));
        let e = 0;
        for (; e < t.length && "0" === t[e]; ) e++;
        return "0x" + t.substring(e);
      }
      function x(t, e) {
        for (
          "string" !== typeof t
            ? (t = m(t))
            : d(t) || r.throwArgumentError("invalid hex string", "value", t),
            t.length > 2 * e + 2 &&
              r.throwArgumentError("value out of range", "value", arguments[1]);
          t.length < 2 * e + 2;

        )
          t = "0x0" + t.substring(2);
        return t;
      }
      function E(t) {
        const e = { r: "0x", s: "0x", _vs: "0x", recoveryParam: 0, v: 0 };
        if (a(t)) {
          const n = l(t);
          65 !== n.length &&
            r.throwArgumentError(
              "invalid signature string; must be 65 bytes",
              "signature",
              t
            ),
            (e.r = m(n.slice(0, 32))),
            (e.s = m(n.slice(32, 64))),
            (e.v = n[64]),
            e.v < 27 &&
              (0 === e.v || 1 === e.v
                ? (e.v += 27)
                : r.throwArgumentError(
                    "signature invalid v byte",
                    "signature",
                    t
                  )),
            (e.recoveryParam = 1 - (e.v % 2)),
            e.recoveryParam && (n[32] |= 128),
            (e._vs = m(n.slice(32, 64)));
        } else {
          if (
            ((e.r = t.r),
            (e.s = t.s),
            (e.v = t.v),
            (e.recoveryParam = t.recoveryParam),
            (e._vs = t._vs),
            null != e._vs)
          ) {
            const n = f(l(e._vs), 32);
            e._vs = m(n);
            const i = n[0] >= 128 ? 1 : 0;
            null == e.recoveryParam
              ? (e.recoveryParam = i)
              : e.recoveryParam !== i &&
                r.throwArgumentError(
                  "signature recoveryParam mismatch _vs",
                  "signature",
                  t
                ),
              (n[0] &= 127);
            const o = m(n);
            null == e.s
              ? (e.s = o)
              : e.s !== o &&
                r.throwArgumentError(
                  "signature v mismatch _vs",
                  "signature",
                  t
                );
          }
          if (null == e.recoveryParam)
            null == e.v
              ? r.throwArgumentError(
                  "signature missing v and recoveryParam",
                  "signature",
                  t
                )
              : 0 === e.v || 1 === e.v
              ? (e.recoveryParam = e.v)
              : (e.recoveryParam = 1 - (e.v % 2));
          else if (null == e.v) e.v = 27 + e.recoveryParam;
          else {
            const n = 0 === e.v || 1 === e.v ? e.v : 1 - (e.v % 2);
            e.recoveryParam !== n &&
              r.throwArgumentError(
                "signature recoveryParam mismatch v",
                "signature",
                t
              );
          }
          null != e.r && d(e.r)
            ? (e.r = x(e.r, 32))
            : r.throwArgumentError(
                "signature missing or invalid r",
                "signature",
                t
              ),
            null != e.s && d(e.s)
              ? (e.s = x(e.s, 32))
              : r.throwArgumentError(
                  "signature missing or invalid s",
                  "signature",
                  t
                );
          const n = l(e.s);
          n[0] >= 128 &&
            r.throwArgumentError("signature s out of range", "signature", t),
            e.recoveryParam && (n[0] |= 128);
          const i = m(n);
          e._vs &&
            (d(e._vs) ||
              r.throwArgumentError("signature invalid _vs", "signature", t),
            (e._vs = x(e._vs, 32))),
            null == e._vs
              ? (e._vs = i)
              : e._vs !== i &&
                r.throwArgumentError(
                  "signature _vs mismatch v and s",
                  "signature",
                  t
                );
        }
        return e;
      }
      function T(t) {
        return m(c([(t = E(t)).r, t.s, t.recoveryParam ? "0x1c" : "0x1b"]));
      }
    },
    1046: function (t, e, n) {
      "use strict";
      n.d(e, {
        tL: function () {
          return i;
        },
        _Y: function () {
          return o;
        },
        fh: function () {
          return a;
        },
        Bz: function () {
          return s;
        },
      });
      var r = n(2593);
      const i = r.O$.from(-1),
        o = r.O$.from(0),
        a = r.O$.from(1),
        s = r.O$.from(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
    },
    7218: function (t, e, n) {
      "use strict";
      n.d(e, {
        R: function () {
          return r;
        },
      });
      const r =
        "0x0000000000000000000000000000000000000000000000000000000000000000";
    },
    5644: function (t, e, n) {
      "use strict";
      n.d(e, {
        i: function () {
          return r;
        },
      });
      const r = "hash/5.5.0";
    },
    2046: function (t, e, n) {
      "use strict";
      n.d(e, {
        id: function () {
          return o;
        },
      });
      var r = n(8197),
        i = n(9251);
      function o(t) {
        return (0, r.keccak256)((0, i.Y0)(t));
      }
    },
    4706: function (t, e, n) {
      "use strict";
      n.d(e, {
        r: function () {
          return f;
        },
        V: function () {
          return d;
        },
      });
      var r = n(6441),
        i = n(5637),
        o = n(9251),
        a = n(8197),
        s = n(1581),
        u = n(5644);
      const l = new s.Logger(u.i),
        c = new Uint8Array(32);
      c.fill(0);
      const h = new RegExp("^((.*)\\.)?([^.]+)$");
      function f(t) {
        try {
          const e = t.split(".");
          for (let t = 0; t < e.length; t++)
            if (0 === (0, i.Ll)(e[t]).length) throw new Error("empty");
          return !0;
        } catch (e) {}
        return !1;
      }
      function d(t) {
        "string" !== typeof t &&
          l.throwArgumentError("invalid ENS name; not a string", "name", t);
        let e = t,
          n = c;
        for (; e.length; ) {
          const s = e.match(h);
          (null != s && "" !== s[2]) ||
            l.throwArgumentError(
              "invalid ENS address; missing component",
              "name",
              t
            );
          const u = (0, o.Y0)((0, i.Ll)(s[3]));
          (n = (0, a.keccak256)((0, r.concat)([n, (0, a.keccak256)(u)]))),
            (e = s[2] || "");
        }
        return (0, r.hexlify)(n);
      }
    },
    7827: function (t, e, n) {
      "use strict";
      n.d(e, {
        E: function () {
          return _;
        },
      });
      var r = n(9485),
        i = n(2593),
        o = n(6441),
        a = n(8197),
        s = n(6881),
        u = n(1581),
        l = n(5644),
        c = n(2046),
        h = function (t, e, n, r) {
          return new (n || (n = Promise))(function (i, o) {
            function a(t) {
              try {
                u(r.next(t));
              } catch (e) {
                o(e);
              }
            }
            function s(t) {
              try {
                u(r.throw(t));
              } catch (e) {
                o(e);
              }
            }
            function u(t) {
              var e;
              t.done
                ? i(t.value)
                : ((e = t.value),
                  e instanceof n
                    ? e
                    : new n(function (t) {
                        t(e);
                      })).then(a, s);
            }
            u((r = r.apply(t, e || [])).next());
          });
        };
      const f = new u.Logger(l.i),
        d = new Uint8Array(32);
      d.fill(0);
      const p = i.O$.from(-1),
        m = i.O$.from(0),
        y = i.O$.from(1),
        g = i.O$.from(
          "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        );
      const v = (0, o.hexZeroPad)(y.toHexString(), 32),
        b = (0, o.hexZeroPad)(m.toHexString(), 32),
        w = {
          name: "string",
          version: "string",
          chainId: "uint256",
          verifyingContract: "address",
          salt: "bytes32",
        },
        x = ["name", "version", "chainId", "verifyingContract", "salt"];
      function E(t) {
        return function (e) {
          return (
            "string" !== typeof e &&
              f.throwArgumentError(
                `invalid domain value for ${JSON.stringify(t)}`,
                `domain.${t}`,
                e
              ),
            e
          );
        };
      }
      const T = {
        name: E("name"),
        version: E("version"),
        chainId: function (t) {
          try {
            return i.O$.from(t).toString();
          } catch (e) {}
          return f.throwArgumentError(
            'invalid domain value for "chainId"',
            "domain.chainId",
            t
          );
        },
        verifyingContract: function (t) {
          try {
            return (0, r.getAddress)(t).toLowerCase();
          } catch (e) {}
          return f.throwArgumentError(
            'invalid domain value "verifyingContract"',
            "domain.verifyingContract",
            t
          );
        },
        salt: function (t) {
          try {
            const e = (0, o.arrayify)(t);
            if (32 !== e.length) throw new Error("bad length");
            return (0, o.hexlify)(e);
          } catch (e) {}
          return f.throwArgumentError(
            'invalid domain value "salt"',
            "domain.salt",
            t
          );
        },
      };
      function A(t) {
        {
          const e = t.match(/^(u?)int(\d*)$/);
          if (e) {
            const n = "" === e[1],
              r = parseInt(e[2] || "256");
            (r % 8 !== 0 || r > 256 || (e[2] && e[2] !== String(r))) &&
              f.throwArgumentError("invalid numeric width", "type", t);
            const a = g.mask(n ? r - 1 : r),
              s = n ? a.add(y).mul(p) : m;
            return function (e) {
              const n = i.O$.from(e);
              return (
                (n.lt(s) || n.gt(a)) &&
                  f.throwArgumentError(
                    `value out-of-bounds for ${t}`,
                    "value",
                    e
                  ),
                (0, o.hexZeroPad)(n.toTwos(256).toHexString(), 32)
              );
            };
          }
        }
        {
          const e = t.match(/^bytes(\d+)$/);
          if (e) {
            const n = parseInt(e[1]);
            return (
              (0 === n || n > 32 || e[1] !== String(n)) &&
                f.throwArgumentError("invalid bytes width", "type", t),
              function (e) {
                return (
                  (0, o.arrayify)(e).length !== n &&
                    f.throwArgumentError(`invalid length for ${t}`, "value", e),
                  (function (t) {
                    const e = (0, o.arrayify)(t),
                      n = e.length % 32;
                    return n
                      ? (0, o.hexConcat)([e, d.slice(n)])
                      : (0, o.hexlify)(e);
                  })(e)
                );
              }
            );
          }
        }
        switch (t) {
          case "address":
            return function (t) {
              return (0, o.hexZeroPad)((0, r.getAddress)(t), 32);
            };
          case "bool":
            return function (t) {
              return t ? v : b;
            };
          case "bytes":
            return function (t) {
              return (0, a.keccak256)(t);
            };
          case "string":
            return function (t) {
              return (0, c.id)(t);
            };
        }
        return null;
      }
      function M(t, e) {
        return `${t}(${e
          .map(({ name: t, type: e }) => e + " " + t)
          .join(",")})`;
      }
      class _ {
        constructor(t) {
          (0, s.defineReadOnly)(
            this,
            "types",
            Object.freeze((0, s.deepCopy)(t))
          ),
            (0, s.defineReadOnly)(this, "_encoderCache", {}),
            (0, s.defineReadOnly)(this, "_types", {});
          const e = {},
            n = {},
            r = {};
          Object.keys(t).forEach((t) => {
            (e[t] = {}), (n[t] = []), (r[t] = {});
          });
          for (const o in t) {
            const r = {};
            t[o].forEach((i) => {
              r[i.name] &&
                f.throwArgumentError(
                  `duplicate variable name ${JSON.stringify(
                    i.name
                  )} in ${JSON.stringify(o)}`,
                  "types",
                  t
                ),
                (r[i.name] = !0);
              const a = i.type.match(/^([^\x5b]*)(\x5b|$)/)[1];
              a === o &&
                f.throwArgumentError(
                  `circular type reference to ${JSON.stringify(a)}`,
                  "types",
                  t
                );
              A(a) ||
                (n[a] ||
                  f.throwArgumentError(
                    `unknown type ${JSON.stringify(a)}`,
                    "types",
                    t
                  ),
                n[a].push(o),
                (e[o][a] = !0));
            });
          }
          const i = Object.keys(n).filter((t) => 0 === n[t].length);
          0 === i.length
            ? f.throwArgumentError("missing primary type", "types", t)
            : i.length > 1 &&
              f.throwArgumentError(
                `ambiguous primary types or unused types: ${i
                  .map((t) => JSON.stringify(t))
                  .join(", ")}`,
                "types",
                t
              ),
            (0, s.defineReadOnly)(this, "primaryType", i[0]),
            (function i(o, a) {
              a[o] &&
                f.throwArgumentError(
                  `circular type reference to ${JSON.stringify(o)}`,
                  "types",
                  t
                ),
                (a[o] = !0),
                Object.keys(e[o]).forEach((t) => {
                  n[t] &&
                    (i(t, a),
                    Object.keys(a).forEach((e) => {
                      r[e][t] = !0;
                    }));
                }),
                delete a[o];
            })(this.primaryType, {});
          for (const o in r) {
            const e = Object.keys(r[o]);
            e.sort(),
              (this._types[o] = M(o, t[o]) + e.map((e) => M(e, t[e])).join(""));
          }
        }
        getEncoder(t) {
          let e = this._encoderCache[t];
          return e || (e = this._encoderCache[t] = this._getEncoder(t)), e;
        }
        _getEncoder(t) {
          {
            const e = A(t);
            if (e) return e;
          }
          const e = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
          if (e) {
            const t = e[1],
              n = this.getEncoder(t),
              r = parseInt(e[3]);
            return (e) => {
              r >= 0 &&
                e.length !== r &&
                f.throwArgumentError(
                  "array length mismatch; expected length ${ arrayLength }",
                  "value",
                  e
                );
              let i = e.map(n);
              return (
                this._types[t] && (i = i.map(a.keccak256)),
                (0, a.keccak256)((0, o.hexConcat)(i))
              );
            };
          }
          const n = this.types[t];
          if (n) {
            const e = (0, c.id)(this._types[t]);
            return (t) => {
              const r = n.map(({ name: e, type: n }) => {
                const r = this.getEncoder(n)(t[e]);
                return this._types[n] ? (0, a.keccak256)(r) : r;
              });
              return r.unshift(e), (0, o.hexConcat)(r);
            };
          }
          return f.throwArgumentError(`unknown type: ${t}`, "type", t);
        }
        encodeType(t) {
          const e = this._types[t];
          return (
            e ||
              f.throwArgumentError(
                `unknown type: ${JSON.stringify(t)}`,
                "name",
                t
              ),
            e
          );
        }
        encodeData(t, e) {
          return this.getEncoder(t)(e);
        }
        hashStruct(t, e) {
          return (0, a.keccak256)(this.encodeData(t, e));
        }
        encode(t) {
          return this.encodeData(this.primaryType, t);
        }
        hash(t) {
          return this.hashStruct(this.primaryType, t);
        }
        _visit(t, e, n) {
          if (A(t)) return n(t, e);
          const r = t.match(/^(.*)(\x5b(\d*)\x5d)$/);
          if (r) {
            const t = r[1],
              i = parseInt(r[3]);
            return (
              i >= 0 &&
                e.length !== i &&
                f.throwArgumentError(
                  "array length mismatch; expected length ${ arrayLength }",
                  "value",
                  e
                ),
              e.map((e) => this._visit(t, e, n))
            );
          }
          const i = this.types[t];
          return i
            ? i.reduce(
                (t, { name: r, type: i }) => (
                  (t[r] = this._visit(i, e[r], n)), t
                ),
                {}
              )
            : f.throwArgumentError(`unknown type: ${t}`, "type", t);
        }
        visit(t, e) {
          return this._visit(this.primaryType, t, e);
        }
        static from(t) {
          return new _(t);
        }
        static getPrimaryType(t) {
          return _.from(t).primaryType;
        }
        static hashStruct(t, e, n) {
          return _.from(e).hashStruct(t, n);
        }
        static hashDomain(t) {
          const e = [];
          for (const n in t) {
            const r = w[n];
            r ||
              f.throwArgumentError(
                `invalid typed-data domain key: ${JSON.stringify(n)}`,
                "domain",
                t
              ),
              e.push({ name: n, type: r });
          }
          return (
            e.sort((t, e) => x.indexOf(t.name) - x.indexOf(e.name)),
            _.hashStruct("EIP712Domain", { EIP712Domain: e }, t)
          );
        }
        static encode(t, e, n) {
          return (0, o.hexConcat)([
            "0x1901",
            _.hashDomain(t),
            _.from(e).hash(n),
          ]);
        }
        static hash(t, e, n) {
          return (0, a.keccak256)(_.encode(t, e, n));
        }
        static resolveNames(t, e, n, r) {
          return h(this, void 0, void 0, function* () {
            t = (0, s.shallowCopy)(t);
            const i = {};
            t.verifyingContract &&
              !(0, o.isHexString)(t.verifyingContract, 20) &&
              (i[t.verifyingContract] = "0x");
            const a = _.from(e);
            a.visit(
              n,
              (t, e) => (
                "address" !== t || (0, o.isHexString)(e, 20) || (i[e] = "0x"), e
              )
            );
            for (const t in i) i[t] = yield r(t);
            return (
              t.verifyingContract &&
                i[t.verifyingContract] &&
                (t.verifyingContract = i[t.verifyingContract]),
              (n = a.visit(n, (t, e) => ("address" === t && i[e] ? i[e] : e))),
              { domain: t, value: n }
            );
          });
        }
        static getPayload(t, e, n) {
          _.hashDomain(t);
          const r = {},
            a = [];
          x.forEach((e) => {
            const n = t[e];
            null != n && ((r[e] = T[e](n)), a.push({ name: e, type: w[e] }));
          });
          const u = _.from(e),
            l = (0, s.shallowCopy)(e);
          return (
            l.EIP712Domain
              ? f.throwArgumentError(
                  "types must not contain EIP712Domain type",
                  "types.EIP712Domain",
                  e
                )
              : (l.EIP712Domain = a),
            u.encode(n),
            {
              types: l,
              domain: r,
              primaryType: u.primaryType,
              message: u.visit(n, (t, e) => {
                if (t.match(/^bytes(\d*)/))
                  return (0, o.hexlify)((0, o.arrayify)(e));
                if (t.match(/^u?int/)) return i.O$.from(e).toString();
                switch (t) {
                  case "address":
                    return e.toLowerCase();
                  case "bool":
                    return !!e;
                  case "string":
                    return (
                      "string" !== typeof e &&
                        f.throwArgumentError("invalid string", "value", e),
                      e
                    );
                }
                return f.throwArgumentError("unsupported type", "type", t);
              }),
            }
          );
        }
      }
    },
    8197: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          keccak256: function () {
            return a;
          },
        });
      var r = n(1094),
        i = n.n(r),
        o = n(6441);
      function a(t) {
        return "0x" + i().keccak_256((0, o.arrayify)(t));
      }
    },
    1581: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          ErrorCode: function () {
            return c;
          },
          LogLevel: function () {
            return l;
          },
          Logger: function () {
            return f;
          },
        });
      let r = !1,
        i = !1;
      const o = { debug: 1, default: 2, info: 2, warning: 3, error: 4, off: 5 };
      let a = o.default,
        s = null;
      const u = (function () {
        try {
          const t = [];
          if (
            (["NFD", "NFC", "NFKD", "NFKC"].forEach((e) => {
              try {
                if ("test" !== "test".normalize(e))
                  throw new Error("bad normalize");
              } catch (n) {
                t.push(e);
              }
            }),
            t.length)
          )
            throw new Error("missing " + t.join(", "));
          if (
            String.fromCharCode(233).normalize("NFD") !==
            String.fromCharCode(101, 769)
          )
            throw new Error("broken implementation");
        } catch (t) {
          return t.message;
        }
        return null;
      })();
      var l, c;
      !(function (t) {
        (t.DEBUG = "DEBUG"),
          (t.INFO = "INFO"),
          (t.WARNING = "WARNING"),
          (t.ERROR = "ERROR"),
          (t.OFF = "OFF");
      })(l || (l = {})),
        (function (t) {
          (t.UNKNOWN_ERROR = "UNKNOWN_ERROR"),
            (t.NOT_IMPLEMENTED = "NOT_IMPLEMENTED"),
            (t.UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION"),
            (t.NETWORK_ERROR = "NETWORK_ERROR"),
            (t.SERVER_ERROR = "SERVER_ERROR"),
            (t.TIMEOUT = "TIMEOUT"),
            (t.BUFFER_OVERRUN = "BUFFER_OVERRUN"),
            (t.NUMERIC_FAULT = "NUMERIC_FAULT"),
            (t.MISSING_NEW = "MISSING_NEW"),
            (t.INVALID_ARGUMENT = "INVALID_ARGUMENT"),
            (t.MISSING_ARGUMENT = "MISSING_ARGUMENT"),
            (t.UNEXPECTED_ARGUMENT = "UNEXPECTED_ARGUMENT"),
            (t.CALL_EXCEPTION = "CALL_EXCEPTION"),
            (t.INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS"),
            (t.NONCE_EXPIRED = "NONCE_EXPIRED"),
            (t.REPLACEMENT_UNDERPRICED = "REPLACEMENT_UNDERPRICED"),
            (t.UNPREDICTABLE_GAS_LIMIT = "UNPREDICTABLE_GAS_LIMIT"),
            (t.TRANSACTION_REPLACED = "TRANSACTION_REPLACED");
        })(c || (c = {}));
      const h = "0123456789abcdef";
      class f {
        constructor(t) {
          Object.defineProperty(this, "version", {
            enumerable: !0,
            value: t,
            writable: !1,
          });
        }
        _log(t, e) {
          const n = t.toLowerCase();
          null == o[n] &&
            this.throwArgumentError("invalid log level name", "logLevel", t),
            a > o[n] || console.log.apply(console, e);
        }
        debug(...t) {
          this._log(f.levels.DEBUG, t);
        }
        info(...t) {
          this._log(f.levels.INFO, t);
        }
        warn(...t) {
          this._log(f.levels.WARNING, t);
        }
        makeError(t, e, n) {
          if (i) return this.makeError("censored error", e, {});
          e || (e = f.errors.UNKNOWN_ERROR), n || (n = {});
          const r = [];
          Object.keys(n).forEach((t) => {
            const e = n[t];
            try {
              if (e instanceof Uint8Array) {
                let n = "";
                for (let t = 0; t < e.length; t++)
                  (n += h[e[t] >> 4]), (n += h[15 & e[t]]);
                r.push(t + "=Uint8Array(0x" + n + ")");
              } else r.push(t + "=" + JSON.stringify(e));
            } catch (a) {
              r.push(t + "=" + JSON.stringify(n[t].toString()));
            }
          }),
            r.push(`code=${e}`),
            r.push(`version=${this.version}`);
          const o = t;
          r.length && (t += " (" + r.join(", ") + ")");
          const a = new Error(t);
          return (
            (a.reason = o),
            (a.code = e),
            Object.keys(n).forEach(function (t) {
              a[t] = n[t];
            }),
            a
          );
        }
        throwError(t, e, n) {
          throw this.makeError(t, e, n);
        }
        throwArgumentError(t, e, n) {
          return this.throwError(t, f.errors.INVALID_ARGUMENT, {
            argument: e,
            value: n,
          });
        }
        assert(t, e, n, r) {
          t || this.throwError(e, n, r);
        }
        assertArgument(t, e, n, r) {
          t || this.throwArgumentError(e, n, r);
        }
        checkNormalize(t) {
          null == t && (t = "platform missing String.prototype.normalize"),
            u &&
              this.throwError(
                "platform missing String.prototype.normalize",
                f.errors.UNSUPPORTED_OPERATION,
                { operation: "String.prototype.normalize", form: u }
              );
        }
        checkSafeUint53(t, e) {
          "number" === typeof t &&
            (null == e && (e = "value not safe"),
            (t < 0 || t >= 9007199254740991) &&
              this.throwError(e, f.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: t,
              }),
            t % 1 &&
              this.throwError(e, f.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: t,
              }));
        }
        checkArgumentCount(t, e, n) {
          (n = n ? ": " + n : ""),
            t < e &&
              this.throwError(
                "missing argument" + n,
                f.errors.MISSING_ARGUMENT,
                { count: t, expectedCount: e }
              ),
            t > e &&
              this.throwError(
                "too many arguments" + n,
                f.errors.UNEXPECTED_ARGUMENT,
                { count: t, expectedCount: e }
              );
        }
        checkNew(t, e) {
          (t !== Object && null != t) ||
            this.throwError("missing new", f.errors.MISSING_NEW, {
              name: e.name,
            });
        }
        checkAbstract(t, e) {
          t === e
            ? this.throwError(
                "cannot instantiate abstract class " +
                  JSON.stringify(e.name) +
                  " directly; use a sub-class",
                f.errors.UNSUPPORTED_OPERATION,
                { name: t.name, operation: "new" }
              )
            : (t !== Object && null != t) ||
              this.throwError("missing new", f.errors.MISSING_NEW, {
                name: e.name,
              });
        }
        static globalLogger() {
          return s || (s = new f("logger/5.5.0")), s;
        }
        static setCensorship(t, e) {
          if (
            (!t &&
              e &&
              this.globalLogger().throwError(
                "cannot permanently disable censorship",
                f.errors.UNSUPPORTED_OPERATION,
                { operation: "setCensorship" }
              ),
            r)
          ) {
            if (!t) return;
            this.globalLogger().throwError(
              "error censorship permanent",
              f.errors.UNSUPPORTED_OPERATION,
              { operation: "setCensorship" }
            );
          }
          (i = !!t), (r = !!e);
        }
        static setLogLevel(t) {
          const e = o[t.toLowerCase()];
          null != e
            ? (a = e)
            : f.globalLogger().warn("invalid log level - " + t);
        }
        static from(t) {
          return new f(t);
        }
      }
      (f.errors = c), (f.levels = l);
    },
    6881: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          Description: function () {
            return m;
          },
          checkProperties: function () {
            return l;
          },
          deepCopy: function () {
            return p;
          },
          defineReadOnly: function () {
            return a;
          },
          getStatic: function () {
            return s;
          },
          resolveProperties: function () {
            return u;
          },
          shallowCopy: function () {
            return c;
          },
        });
      var r = n(1581);
      var i = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const o = new r.Logger("properties/5.5.0");
      function a(t, e, n) {
        Object.defineProperty(t, e, { enumerable: !0, value: n, writable: !1 });
      }
      function s(t, e) {
        for (let n = 0; n < 32; n++) {
          if (t[e]) return t[e];
          if (!t.prototype || "object" !== typeof t.prototype) break;
          t = Object.getPrototypeOf(t.prototype).constructor;
        }
        return null;
      }
      function u(t) {
        return i(this, void 0, void 0, function* () {
          const e = Object.keys(t).map((e) => {
            const n = t[e];
            return Promise.resolve(n).then((t) => ({ key: e, value: t }));
          });
          return (yield Promise.all(e)).reduce(
            (t, e) => ((t[e.key] = e.value), t),
            {}
          );
        });
      }
      function l(t, e) {
        (t && "object" === typeof t) ||
          o.throwArgumentError("invalid object", "object", t),
          Object.keys(t).forEach((n) => {
            e[n] ||
              o.throwArgumentError(
                "invalid object key - " + n,
                "transaction:" + n,
                t
              );
          });
      }
      function c(t) {
        const e = {};
        for (const n in t) e[n] = t[n];
        return e;
      }
      const h = {
        bigint: !0,
        boolean: !0,
        function: !0,
        number: !0,
        string: !0,
      };
      function f(t) {
        if (void 0 === t || null === t || h[typeof t]) return !0;
        if (Array.isArray(t) || "object" === typeof t) {
          if (!Object.isFrozen(t)) return !1;
          const n = Object.keys(t);
          for (let r = 0; r < n.length; r++) {
            let i = null;
            try {
              i = t[n[r]];
            } catch (e) {
              continue;
            }
            if (!f(i)) return !1;
          }
          return !0;
        }
        return o.throwArgumentError("Cannot deepCopy " + typeof t, "object", t);
      }
      function d(t) {
        if (f(t)) return t;
        if (Array.isArray(t)) return Object.freeze(t.map((t) => p(t)));
        if ("object" === typeof t) {
          const e = {};
          for (const n in t) {
            const r = t[n];
            void 0 !== r && a(e, n, p(r));
          }
          return e;
        }
        return o.throwArgumentError("Cannot deepCopy " + typeof t, "object", t);
      }
      function p(t) {
        return d(t);
      }
      class m {
        constructor(t) {
          for (const e in t) this[e] = p(t[e]);
        }
      }
    },
    9052: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          decode: function () {
            return f;
          },
          encode: function () {
            return l;
          },
        });
      var r = n(6441),
        i = n(1581);
      const o = new i.Logger("rlp/5.5.0");
      function a(t) {
        const e = [];
        for (; t; ) e.unshift(255 & t), (t >>= 8);
        return e;
      }
      function s(t, e, n) {
        let r = 0;
        for (let i = 0; i < n; i++) r = 256 * r + t[e + i];
        return r;
      }
      function u(t) {
        if (Array.isArray(t)) {
          let e = [];
          if (
            (t.forEach(function (t) {
              e = e.concat(u(t));
            }),
            e.length <= 55)
          )
            return e.unshift(192 + e.length), e;
          const n = a(e.length);
          return n.unshift(247 + n.length), n.concat(e);
        }
        (0, r.isBytesLike)(t) ||
          o.throwArgumentError("RLP object must be BytesLike", "object", t);
        const e = Array.prototype.slice.call((0, r.arrayify)(t));
        if (1 === e.length && e[0] <= 127) return e;
        if (e.length <= 55) return e.unshift(128 + e.length), e;
        const n = a(e.length);
        return n.unshift(183 + n.length), n.concat(e);
      }
      function l(t) {
        return (0, r.hexlify)(u(t));
      }
      function c(t, e, n, r) {
        const a = [];
        for (; n < e + 1 + r; ) {
          const s = h(t, n);
          a.push(s.result),
            (n += s.consumed) > e + 1 + r &&
              o.throwError(
                "child data too short",
                i.Logger.errors.BUFFER_OVERRUN,
                {}
              );
        }
        return { consumed: 1 + r, result: a };
      }
      function h(t, e) {
        if (
          (0 === t.length &&
            o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {}),
          t[e] >= 248)
        ) {
          const n = t[e] - 247;
          e + 1 + n > t.length &&
            o.throwError(
              "data short segment too short",
              i.Logger.errors.BUFFER_OVERRUN,
              {}
            );
          const r = s(t, e + 1, n);
          return (
            e + 1 + n + r > t.length &&
              o.throwError(
                "data long segment too short",
                i.Logger.errors.BUFFER_OVERRUN,
                {}
              ),
            c(t, e, e + 1 + n, n + r)
          );
        }
        if (t[e] >= 192) {
          const n = t[e] - 192;
          return (
            e + 1 + n > t.length &&
              o.throwError(
                "data array too short",
                i.Logger.errors.BUFFER_OVERRUN,
                {}
              ),
            c(t, e, e + 1, n)
          );
        }
        if (t[e] >= 184) {
          const n = t[e] - 183;
          e + 1 + n > t.length &&
            o.throwError(
              "data array too short",
              i.Logger.errors.BUFFER_OVERRUN,
              {}
            );
          const a = s(t, e + 1, n);
          e + 1 + n + a > t.length &&
            o.throwError(
              "data array too short",
              i.Logger.errors.BUFFER_OVERRUN,
              {}
            );
          return {
            consumed: 1 + n + a,
            result: (0, r.hexlify)(t.slice(e + 1 + n, e + 1 + n + a)),
          };
        }
        if (t[e] >= 128) {
          const n = t[e] - 128;
          e + 1 + n > t.length &&
            o.throwError("data too short", i.Logger.errors.BUFFER_OVERRUN, {});
          return {
            consumed: 1 + n,
            result: (0, r.hexlify)(t.slice(e + 1, e + 1 + n)),
          };
        }
        return { consumed: 1, result: (0, r.hexlify)(t[e]) };
      }
      function f(t) {
        const e = (0, r.arrayify)(t),
          n = h(e, 0);
        return (
          n.consumed !== e.length &&
            o.throwArgumentError("invalid rlp data", "data", t),
          n.result
        );
      }
    },
    2006: function (t, e, n) {
      "use strict";
      n.d(e, {
        Gy: function () {
          return f;
        },
        bP: function () {
          return l;
        },
        JQ: function () {
          return c;
        },
        o: function () {
          return h;
        },
      });
      var r = n(3715),
        i = n.n(r),
        o = n(6441),
        a = n(1261),
        s = n(1581);
      const u = new s.Logger("sha2/5.5.0");
      function l(t) {
        return (
          "0x" +
          i()
            .ripemd160()
            .update((0, o.arrayify)(t))
            .digest("hex")
        );
      }
      function c(t) {
        return (
          "0x" +
          i()
            .sha256()
            .update((0, o.arrayify)(t))
            .digest("hex")
        );
      }
      function h(t) {
        return (
          "0x" +
          i()
            .sha512()
            .update((0, o.arrayify)(t))
            .digest("hex")
        );
      }
      function f(t, e, n) {
        return (
          a.p[t] ||
            u.throwError(
              "unsupported algorithm " + t,
              s.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "hmac", algorithm: t }
            ),
          "0x" +
            i()
              .hmac(i()[t], (0, o.arrayify)(e))
              .update((0, o.arrayify)(n))
              .digest("hex")
        );
      }
    },
    1261: function (t, e, n) {
      "use strict";
      var r;
      n.d(e, {
        p: function () {
          return r;
        },
      }),
        (function (t) {
          (t.sha256 = "sha256"), (t.sha512 = "sha512");
        })(r || (r = {}));
    },
    7669: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          SigningKey: function () {
            return X;
          },
          computePublicKey: function () {
            return K;
          },
          recoverPublicKey: function () {
            return Z;
          },
        });
      var r = n(3550),
        i = n.n(r),
        o = n(3715),
        a = n.n(o);
      "undefined" !== typeof globalThis
        ? globalThis
        : "undefined" !== typeof window
        ? window
        : "undefined" !== typeof n.g
        ? n.g
        : "undefined" !== typeof self && self;
      function s(t, e, n) {
        return (
          (n = {
            path: e,
            exports: {},
            require: function (t, e) {
              return (function () {
                throw new Error(
                  "Dynamic requires are not currently supported by @rollup/plugin-commonjs"
                );
              })((void 0 === e || null === e) && n.path);
            },
          }),
          t(n, n.exports),
          n.exports
        );
      }
      var u = l;
      function l(t, e) {
        if (!t) throw new Error(e || "Assertion failed");
      }
      l.equal = function (t, e, n) {
        if (t != e) throw new Error(n || "Assertion failed: " + t + " != " + e);
      };
      var c = s(function (t, e) {
          var n = e;
          function r(t) {
            return 1 === t.length ? "0" + t : t;
          }
          function i(t) {
            for (var e = "", n = 0; n < t.length; n++)
              e += r(t[n].toString(16));
            return e;
          }
          (n.toArray = function (t, e) {
            if (Array.isArray(t)) return t.slice();
            if (!t) return [];
            var n = [];
            if ("string" !== typeof t) {
              for (var r = 0; r < t.length; r++) n[r] = 0 | t[r];
              return n;
            }
            if ("hex" === e) {
              (t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 !== 0 &&
                (t = "0" + t);
              for (r = 0; r < t.length; r += 2)
                n.push(parseInt(t[r] + t[r + 1], 16));
            } else
              for (r = 0; r < t.length; r++) {
                var i = t.charCodeAt(r),
                  o = i >> 8,
                  a = 255 & i;
                o ? n.push(o, a) : n.push(a);
              }
            return n;
          }),
            (n.zero2 = r),
            (n.toHex = i),
            (n.encode = function (t, e) {
              return "hex" === e ? i(t) : t;
            });
        }),
        h = s(function (t, e) {
          var n = e;
          (n.assert = u),
            (n.toArray = c.toArray),
            (n.zero2 = c.zero2),
            (n.toHex = c.toHex),
            (n.encode = c.encode),
            (n.getNAF = function (t, e, n) {
              var r = new Array(Math.max(t.bitLength(), n) + 1);
              r.fill(0);
              for (
                var i = 1 << (e + 1), o = t.clone(), a = 0;
                a < r.length;
                a++
              ) {
                var s,
                  u = o.andln(i - 1);
                o.isOdd()
                  ? ((s = u > (i >> 1) - 1 ? (i >> 1) - u : u), o.isubn(s))
                  : (s = 0),
                  (r[a] = s),
                  o.iushrn(1);
              }
              return r;
            }),
            (n.getJSF = function (t, e) {
              var n = [[], []];
              (t = t.clone()), (e = e.clone());
              for (var r, i = 0, o = 0; t.cmpn(-i) > 0 || e.cmpn(-o) > 0; ) {
                var a,
                  s,
                  u = (t.andln(3) + i) & 3,
                  l = (e.andln(3) + o) & 3;
                3 === u && (u = -1),
                  3 === l && (l = -1),
                  (a =
                    0 === (1 & u)
                      ? 0
                      : (3 !== (r = (t.andln(7) + i) & 7) && 5 !== r) || 2 !== l
                      ? u
                      : -u),
                  n[0].push(a),
                  (s =
                    0 === (1 & l)
                      ? 0
                      : (3 !== (r = (e.andln(7) + o) & 7) && 5 !== r) || 2 !== u
                      ? l
                      : -l),
                  n[1].push(s),
                  2 * i === a + 1 && (i = 1 - i),
                  2 * o === s + 1 && (o = 1 - o),
                  t.iushrn(1),
                  e.iushrn(1);
              }
              return n;
            }),
            (n.cachedProperty = function (t, e, n) {
              var r = "_" + e;
              t.prototype[e] = function () {
                return void 0 !== this[r] ? this[r] : (this[r] = n.call(this));
              };
            }),
            (n.parseBytes = function (t) {
              return "string" === typeof t ? n.toArray(t, "hex") : t;
            }),
            (n.intFromLE = function (t) {
              return new (i())(t, "hex", "le");
            });
        }),
        f = h.getNAF,
        d = h.getJSF,
        p = h.assert;
      function m(t, e) {
        (this.type = t),
          (this.p = new (i())(e.p, 16)),
          (this.red = e.prime ? i().red(e.prime) : i().mont(this.p)),
          (this.zero = new (i())(0).toRed(this.red)),
          (this.one = new (i())(1).toRed(this.red)),
          (this.two = new (i())(2).toRed(this.red)),
          (this.n = e.n && new (i())(e.n, 16)),
          (this.g = e.g && this.pointFromJSON(e.g, e.gRed)),
          (this._wnafT1 = new Array(4)),
          (this._wnafT2 = new Array(4)),
          (this._wnafT3 = new Array(4)),
          (this._wnafT4 = new Array(4)),
          (this._bitLength = this.n ? this.n.bitLength() : 0);
        var n = this.n && this.p.div(this.n);
        !n || n.cmpn(100) > 0
          ? (this.redN = null)
          : ((this._maxwellTrick = !0), (this.redN = this.n.toRed(this.red)));
      }
      var y = m;
      function g(t, e) {
        (this.curve = t), (this.type = e), (this.precomputed = null);
      }
      (m.prototype.point = function () {
        throw new Error("Not implemented");
      }),
        (m.prototype.validate = function () {
          throw new Error("Not implemented");
        }),
        (m.prototype._fixedNafMul = function (t, e) {
          p(t.precomputed);
          var n = t._getDoubles(),
            r = f(e, 1, this._bitLength),
            i = (1 << (n.step + 1)) - (n.step % 2 === 0 ? 2 : 1);
          i /= 3;
          var o,
            a,
            s = [];
          for (o = 0; o < r.length; o += n.step) {
            a = 0;
            for (var u = o + n.step - 1; u >= o; u--) a = (a << 1) + r[u];
            s.push(a);
          }
          for (
            var l = this.jpoint(null, null, null),
              c = this.jpoint(null, null, null),
              h = i;
            h > 0;
            h--
          ) {
            for (o = 0; o < s.length; o++)
              (a = s[o]) === h
                ? (c = c.mixedAdd(n.points[o]))
                : a === -h && (c = c.mixedAdd(n.points[o].neg()));
            l = l.add(c);
          }
          return l.toP();
        }),
        (m.prototype._wnafMul = function (t, e) {
          var n = 4,
            r = t._getNAFPoints(n);
          n = r.wnd;
          for (
            var i = r.points,
              o = f(e, n, this._bitLength),
              a = this.jpoint(null, null, null),
              s = o.length - 1;
            s >= 0;
            s--
          ) {
            for (var u = 0; s >= 0 && 0 === o[s]; s--) u++;
            if ((s >= 0 && u++, (a = a.dblp(u)), s < 0)) break;
            var l = o[s];
            p(0 !== l),
              (a =
                "affine" === t.type
                  ? l > 0
                    ? a.mixedAdd(i[(l - 1) >> 1])
                    : a.mixedAdd(i[(-l - 1) >> 1].neg())
                  : l > 0
                  ? a.add(i[(l - 1) >> 1])
                  : a.add(i[(-l - 1) >> 1].neg()));
          }
          return "affine" === t.type ? a.toP() : a;
        }),
        (m.prototype._wnafMulAdd = function (t, e, n, r, i) {
          var o,
            a,
            s,
            u = this._wnafT1,
            l = this._wnafT2,
            c = this._wnafT3,
            h = 0;
          for (o = 0; o < r; o++) {
            var p = (s = e[o])._getNAFPoints(t);
            (u[o] = p.wnd), (l[o] = p.points);
          }
          for (o = r - 1; o >= 1; o -= 2) {
            var m = o - 1,
              y = o;
            if (1 === u[m] && 1 === u[y]) {
              var g = [e[m], null, null, e[y]];
              0 === e[m].y.cmp(e[y].y)
                ? ((g[1] = e[m].add(e[y])),
                  (g[2] = e[m].toJ().mixedAdd(e[y].neg())))
                : 0 === e[m].y.cmp(e[y].y.redNeg())
                ? ((g[1] = e[m].toJ().mixedAdd(e[y])),
                  (g[2] = e[m].add(e[y].neg())))
                : ((g[1] = e[m].toJ().mixedAdd(e[y])),
                  (g[2] = e[m].toJ().mixedAdd(e[y].neg())));
              var v = [-3, -1, -5, -7, 0, 7, 5, 1, 3],
                b = d(n[m], n[y]);
              for (
                h = Math.max(b[0].length, h),
                  c[m] = new Array(h),
                  c[y] = new Array(h),
                  a = 0;
                a < h;
                a++
              ) {
                var w = 0 | b[0][a],
                  x = 0 | b[1][a];
                (c[m][a] = v[3 * (w + 1) + (x + 1)]), (c[y][a] = 0), (l[m] = g);
              }
            } else
              (c[m] = f(n[m], u[m], this._bitLength)),
                (c[y] = f(n[y], u[y], this._bitLength)),
                (h = Math.max(c[m].length, h)),
                (h = Math.max(c[y].length, h));
          }
          var E = this.jpoint(null, null, null),
            T = this._wnafT4;
          for (o = h; o >= 0; o--) {
            for (var A = 0; o >= 0; ) {
              var M = !0;
              for (a = 0; a < r; a++)
                (T[a] = 0 | c[a][o]), 0 !== T[a] && (M = !1);
              if (!M) break;
              A++, o--;
            }
            if ((o >= 0 && A++, (E = E.dblp(A)), o < 0)) break;
            for (a = 0; a < r; a++) {
              var _ = T[a];
              0 !== _ &&
                (_ > 0
                  ? (s = l[a][(_ - 1) >> 1])
                  : _ < 0 && (s = l[a][(-_ - 1) >> 1].neg()),
                (E = "affine" === s.type ? E.mixedAdd(s) : E.add(s)));
            }
          }
          for (o = 0; o < r; o++) l[o] = null;
          return i ? E : E.toP();
        }),
        (m.BasePoint = g),
        (g.prototype.eq = function () {
          throw new Error("Not implemented");
        }),
        (g.prototype.validate = function () {
          return this.curve.validate(this);
        }),
        (m.prototype.decodePoint = function (t, e) {
          t = h.toArray(t, e);
          var n = this.p.byteLength();
          if (
            (4 === t[0] || 6 === t[0] || 7 === t[0]) &&
            t.length - 1 === 2 * n
          )
            return (
              6 === t[0]
                ? p(t[t.length - 1] % 2 === 0)
                : 7 === t[0] && p(t[t.length - 1] % 2 === 1),
              this.point(t.slice(1, 1 + n), t.slice(1 + n, 1 + 2 * n))
            );
          if ((2 === t[0] || 3 === t[0]) && t.length - 1 === n)
            return this.pointFromX(t.slice(1, 1 + n), 3 === t[0]);
          throw new Error("Unknown point format");
        }),
        (g.prototype.encodeCompressed = function (t) {
          return this.encode(t, !0);
        }),
        (g.prototype._encode = function (t) {
          var e = this.curve.p.byteLength(),
            n = this.getX().toArray("be", e);
          return t
            ? [this.getY().isEven() ? 2 : 3].concat(n)
            : [4].concat(n, this.getY().toArray("be", e));
        }),
        (g.prototype.encode = function (t, e) {
          return h.encode(this._encode(e), t);
        }),
        (g.prototype.precompute = function (t) {
          if (this.precomputed) return this;
          var e = { doubles: null, naf: null, beta: null };
          return (
            (e.naf = this._getNAFPoints(8)),
            (e.doubles = this._getDoubles(4, t)),
            (e.beta = this._getBeta()),
            (this.precomputed = e),
            this
          );
        }),
        (g.prototype._hasDoubles = function (t) {
          if (!this.precomputed) return !1;
          var e = this.precomputed.doubles;
          return (
            !!e && e.points.length >= Math.ceil((t.bitLength() + 1) / e.step)
          );
        }),
        (g.prototype._getDoubles = function (t, e) {
          if (this.precomputed && this.precomputed.doubles)
            return this.precomputed.doubles;
          for (var n = [this], r = this, i = 0; i < e; i += t) {
            for (var o = 0; o < t; o++) r = r.dbl();
            n.push(r);
          }
          return { step: t, points: n };
        }),
        (g.prototype._getNAFPoints = function (t) {
          if (this.precomputed && this.precomputed.naf)
            return this.precomputed.naf;
          for (
            var e = [this],
              n = (1 << t) - 1,
              r = 1 === n ? null : this.dbl(),
              i = 1;
            i < n;
            i++
          )
            e[i] = e[i - 1].add(r);
          return { wnd: t, points: e };
        }),
        (g.prototype._getBeta = function () {
          return null;
        }),
        (g.prototype.dblp = function (t) {
          for (var e = this, n = 0; n < t; n++) e = e.dbl();
          return e;
        });
      var v = s(function (t) {
          "function" === typeof Object.create
            ? (t.exports = function (t, e) {
                e &&
                  ((t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })));
              })
            : (t.exports = function (t, e) {
                if (e) {
                  t.super_ = e;
                  var n = function () {};
                  (n.prototype = e.prototype),
                    (t.prototype = new n()),
                    (t.prototype.constructor = t);
                }
              });
        }),
        b = h.assert;
      function w(t) {
        y.call(this, "short", t),
          (this.a = new (i())(t.a, 16).toRed(this.red)),
          (this.b = new (i())(t.b, 16).toRed(this.red)),
          (this.tinv = this.two.redInvm()),
          (this.zeroA = 0 === this.a.fromRed().cmpn(0)),
          (this.threeA = 0 === this.a.fromRed().sub(this.p).cmpn(-3)),
          (this.endo = this._getEndomorphism(t)),
          (this._endoWnafT1 = new Array(4)),
          (this._endoWnafT2 = new Array(4));
      }
      v(w, y);
      var x = w;
      function E(t, e, n, r) {
        y.BasePoint.call(this, t, "affine"),
          null === e && null === n
            ? ((this.x = null), (this.y = null), (this.inf = !0))
            : ((this.x = new (i())(e, 16)),
              (this.y = new (i())(n, 16)),
              r &&
                (this.x.forceRed(this.curve.red),
                this.y.forceRed(this.curve.red)),
              this.x.red || (this.x = this.x.toRed(this.curve.red)),
              this.y.red || (this.y = this.y.toRed(this.curve.red)),
              (this.inf = !1));
      }
      function T(t, e, n, r) {
        y.BasePoint.call(this, t, "jacobian"),
          null === e && null === n && null === r
            ? ((this.x = this.curve.one),
              (this.y = this.curve.one),
              (this.z = new (i())(0)))
            : ((this.x = new (i())(e, 16)),
              (this.y = new (i())(n, 16)),
              (this.z = new (i())(r, 16))),
          this.x.red || (this.x = this.x.toRed(this.curve.red)),
          this.y.red || (this.y = this.y.toRed(this.curve.red)),
          this.z.red || (this.z = this.z.toRed(this.curve.red)),
          (this.zOne = this.z === this.curve.one);
      }
      (w.prototype._getEndomorphism = function (t) {
        if (this.zeroA && this.g && this.n && 1 === this.p.modn(3)) {
          var e, n;
          if (t.beta) e = new (i())(t.beta, 16).toRed(this.red);
          else {
            var r = this._getEndoRoots(this.p);
            e = (e = r[0].cmp(r[1]) < 0 ? r[0] : r[1]).toRed(this.red);
          }
          if (t.lambda) n = new (i())(t.lambda, 16);
          else {
            var o = this._getEndoRoots(this.n);
            0 === this.g.mul(o[0]).x.cmp(this.g.x.redMul(e))
              ? (n = o[0])
              : ((n = o[1]), b(0 === this.g.mul(n).x.cmp(this.g.x.redMul(e))));
          }
          return {
            beta: e,
            lambda: n,
            basis: t.basis
              ? t.basis.map(function (t) {
                  return { a: new (i())(t.a, 16), b: new (i())(t.b, 16) };
                })
              : this._getEndoBasis(n),
          };
        }
      }),
        (w.prototype._getEndoRoots = function (t) {
          var e = t === this.p ? this.red : i().mont(t),
            n = new (i())(2).toRed(e).redInvm(),
            r = n.redNeg(),
            o = new (i())(3).toRed(e).redNeg().redSqrt().redMul(n);
          return [r.redAdd(o).fromRed(), r.redSub(o).fromRed()];
        }),
        (w.prototype._getEndoBasis = function (t) {
          for (
            var e,
              n,
              r,
              o,
              a,
              s,
              u,
              l,
              c,
              h = this.n.ushrn(Math.floor(this.n.bitLength() / 2)),
              f = t,
              d = this.n.clone(),
              p = new (i())(1),
              m = new (i())(0),
              y = new (i())(0),
              g = new (i())(1),
              v = 0;
            0 !== f.cmpn(0);

          ) {
            var b = d.div(f);
            (l = d.sub(b.mul(f))), (c = y.sub(b.mul(p)));
            var w = g.sub(b.mul(m));
            if (!r && l.cmp(h) < 0)
              (e = u.neg()), (n = p), (r = l.neg()), (o = c);
            else if (r && 2 === ++v) break;
            (u = l), (d = f), (f = l), (y = p), (p = c), (g = m), (m = w);
          }
          (a = l.neg()), (s = c);
          var x = r.sqr().add(o.sqr());
          return (
            a.sqr().add(s.sqr()).cmp(x) >= 0 && ((a = e), (s = n)),
            r.negative && ((r = r.neg()), (o = o.neg())),
            a.negative && ((a = a.neg()), (s = s.neg())),
            [
              { a: r, b: o },
              { a: a, b: s },
            ]
          );
        }),
        (w.prototype._endoSplit = function (t) {
          var e = this.endo.basis,
            n = e[0],
            r = e[1],
            i = r.b.mul(t).divRound(this.n),
            o = n.b.neg().mul(t).divRound(this.n),
            a = i.mul(n.a),
            s = o.mul(r.a),
            u = i.mul(n.b),
            l = o.mul(r.b);
          return { k1: t.sub(a).sub(s), k2: u.add(l).neg() };
        }),
        (w.prototype.pointFromX = function (t, e) {
          (t = new (i())(t, 16)).red || (t = t.toRed(this.red));
          var n = t
              .redSqr()
              .redMul(t)
              .redIAdd(t.redMul(this.a))
              .redIAdd(this.b),
            r = n.redSqrt();
          if (0 !== r.redSqr().redSub(n).cmp(this.zero))
            throw new Error("invalid point");
          var o = r.fromRed().isOdd();
          return ((e && !o) || (!e && o)) && (r = r.redNeg()), this.point(t, r);
        }),
        (w.prototype.validate = function (t) {
          if (t.inf) return !0;
          var e = t.x,
            n = t.y,
            r = this.a.redMul(e),
            i = e.redSqr().redMul(e).redIAdd(r).redIAdd(this.b);
          return 0 === n.redSqr().redISub(i).cmpn(0);
        }),
        (w.prototype._endoWnafMulAdd = function (t, e, n) {
          for (
            var r = this._endoWnafT1, i = this._endoWnafT2, o = 0;
            o < t.length;
            o++
          ) {
            var a = this._endoSplit(e[o]),
              s = t[o],
              u = s._getBeta();
            a.k1.negative && (a.k1.ineg(), (s = s.neg(!0))),
              a.k2.negative && (a.k2.ineg(), (u = u.neg(!0))),
              (r[2 * o] = s),
              (r[2 * o + 1] = u),
              (i[2 * o] = a.k1),
              (i[2 * o + 1] = a.k2);
          }
          for (
            var l = this._wnafMulAdd(1, r, i, 2 * o, n), c = 0;
            c < 2 * o;
            c++
          )
            (r[c] = null), (i[c] = null);
          return l;
        }),
        v(E, y.BasePoint),
        (w.prototype.point = function (t, e, n) {
          return new E(this, t, e, n);
        }),
        (w.prototype.pointFromJSON = function (t, e) {
          return E.fromJSON(this, t, e);
        }),
        (E.prototype._getBeta = function () {
          if (this.curve.endo) {
            var t = this.precomputed;
            if (t && t.beta) return t.beta;
            var e = this.curve.point(
              this.x.redMul(this.curve.endo.beta),
              this.y
            );
            if (t) {
              var n = this.curve,
                r = function (t) {
                  return n.point(t.x.redMul(n.endo.beta), t.y);
                };
              (t.beta = e),
                (e.precomputed = {
                  beta: null,
                  naf: t.naf && { wnd: t.naf.wnd, points: t.naf.points.map(r) },
                  doubles: t.doubles && {
                    step: t.doubles.step,
                    points: t.doubles.points.map(r),
                  },
                });
            }
            return e;
          }
        }),
        (E.prototype.toJSON = function () {
          return this.precomputed
            ? [
                this.x,
                this.y,
                this.precomputed && {
                  doubles: this.precomputed.doubles && {
                    step: this.precomputed.doubles.step,
                    points: this.precomputed.doubles.points.slice(1),
                  },
                  naf: this.precomputed.naf && {
                    wnd: this.precomputed.naf.wnd,
                    points: this.precomputed.naf.points.slice(1),
                  },
                },
              ]
            : [this.x, this.y];
        }),
        (E.fromJSON = function (t, e, n) {
          "string" === typeof e && (e = JSON.parse(e));
          var r = t.point(e[0], e[1], n);
          if (!e[2]) return r;
          function i(e) {
            return t.point(e[0], e[1], n);
          }
          var o = e[2];
          return (
            (r.precomputed = {
              beta: null,
              doubles: o.doubles && {
                step: o.doubles.step,
                points: [r].concat(o.doubles.points.map(i)),
              },
              naf: o.naf && {
                wnd: o.naf.wnd,
                points: [r].concat(o.naf.points.map(i)),
              },
            }),
            r
          );
        }),
        (E.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC Point Infinity>"
            : "<EC Point x: " +
                this.x.fromRed().toString(16, 2) +
                " y: " +
                this.y.fromRed().toString(16, 2) +
                ">";
        }),
        (E.prototype.isInfinity = function () {
          return this.inf;
        }),
        (E.prototype.add = function (t) {
          if (this.inf) return t;
          if (t.inf) return this;
          if (this.eq(t)) return this.dbl();
          if (this.neg().eq(t)) return this.curve.point(null, null);
          if (0 === this.x.cmp(t.x)) return this.curve.point(null, null);
          var e = this.y.redSub(t.y);
          0 !== e.cmpn(0) && (e = e.redMul(this.x.redSub(t.x).redInvm()));
          var n = e.redSqr().redISub(this.x).redISub(t.x),
            r = e.redMul(this.x.redSub(n)).redISub(this.y);
          return this.curve.point(n, r);
        }),
        (E.prototype.dbl = function () {
          if (this.inf) return this;
          var t = this.y.redAdd(this.y);
          if (0 === t.cmpn(0)) return this.curve.point(null, null);
          var e = this.curve.a,
            n = this.x.redSqr(),
            r = t.redInvm(),
            i = n.redAdd(n).redIAdd(n).redIAdd(e).redMul(r),
            o = i.redSqr().redISub(this.x.redAdd(this.x)),
            a = i.redMul(this.x.redSub(o)).redISub(this.y);
          return this.curve.point(o, a);
        }),
        (E.prototype.getX = function () {
          return this.x.fromRed();
        }),
        (E.prototype.getY = function () {
          return this.y.fromRed();
        }),
        (E.prototype.mul = function (t) {
          return (
            (t = new (i())(t, 16)),
            this.isInfinity()
              ? this
              : this._hasDoubles(t)
              ? this.curve._fixedNafMul(this, t)
              : this.curve.endo
              ? this.curve._endoWnafMulAdd([this], [t])
              : this.curve._wnafMul(this, t)
          );
        }),
        (E.prototype.mulAdd = function (t, e, n) {
          var r = [this, e],
            i = [t, n];
          return this.curve.endo
            ? this.curve._endoWnafMulAdd(r, i)
            : this.curve._wnafMulAdd(1, r, i, 2);
        }),
        (E.prototype.jmulAdd = function (t, e, n) {
          var r = [this, e],
            i = [t, n];
          return this.curve.endo
            ? this.curve._endoWnafMulAdd(r, i, !0)
            : this.curve._wnafMulAdd(1, r, i, 2, !0);
        }),
        (E.prototype.eq = function (t) {
          return (
            this === t ||
            (this.inf === t.inf &&
              (this.inf || (0 === this.x.cmp(t.x) && 0 === this.y.cmp(t.y))))
          );
        }),
        (E.prototype.neg = function (t) {
          if (this.inf) return this;
          var e = this.curve.point(this.x, this.y.redNeg());
          if (t && this.precomputed) {
            var n = this.precomputed,
              r = function (t) {
                return t.neg();
              };
            e.precomputed = {
              naf: n.naf && { wnd: n.naf.wnd, points: n.naf.points.map(r) },
              doubles: n.doubles && {
                step: n.doubles.step,
                points: n.doubles.points.map(r),
              },
            };
          }
          return e;
        }),
        (E.prototype.toJ = function () {
          return this.inf
            ? this.curve.jpoint(null, null, null)
            : this.curve.jpoint(this.x, this.y, this.curve.one);
        }),
        v(T, y.BasePoint),
        (w.prototype.jpoint = function (t, e, n) {
          return new T(this, t, e, n);
        }),
        (T.prototype.toP = function () {
          if (this.isInfinity()) return this.curve.point(null, null);
          var t = this.z.redInvm(),
            e = t.redSqr(),
            n = this.x.redMul(e),
            r = this.y.redMul(e).redMul(t);
          return this.curve.point(n, r);
        }),
        (T.prototype.neg = function () {
          return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
        }),
        (T.prototype.add = function (t) {
          if (this.isInfinity()) return t;
          if (t.isInfinity()) return this;
          var e = t.z.redSqr(),
            n = this.z.redSqr(),
            r = this.x.redMul(e),
            i = t.x.redMul(n),
            o = this.y.redMul(e.redMul(t.z)),
            a = t.y.redMul(n.redMul(this.z)),
            s = r.redSub(i),
            u = o.redSub(a);
          if (0 === s.cmpn(0))
            return 0 !== u.cmpn(0)
              ? this.curve.jpoint(null, null, null)
              : this.dbl();
          var l = s.redSqr(),
            c = l.redMul(s),
            h = r.redMul(l),
            f = u.redSqr().redIAdd(c).redISub(h).redISub(h),
            d = u.redMul(h.redISub(f)).redISub(o.redMul(c)),
            p = this.z.redMul(t.z).redMul(s);
          return this.curve.jpoint(f, d, p);
        }),
        (T.prototype.mixedAdd = function (t) {
          if (this.isInfinity()) return t.toJ();
          if (t.isInfinity()) return this;
          var e = this.z.redSqr(),
            n = this.x,
            r = t.x.redMul(e),
            i = this.y,
            o = t.y.redMul(e).redMul(this.z),
            a = n.redSub(r),
            s = i.redSub(o);
          if (0 === a.cmpn(0))
            return 0 !== s.cmpn(0)
              ? this.curve.jpoint(null, null, null)
              : this.dbl();
          var u = a.redSqr(),
            l = u.redMul(a),
            c = n.redMul(u),
            h = s.redSqr().redIAdd(l).redISub(c).redISub(c),
            f = s.redMul(c.redISub(h)).redISub(i.redMul(l)),
            d = this.z.redMul(a);
          return this.curve.jpoint(h, f, d);
        }),
        (T.prototype.dblp = function (t) {
          if (0 === t) return this;
          if (this.isInfinity()) return this;
          if (!t) return this.dbl();
          var e;
          if (this.curve.zeroA || this.curve.threeA) {
            var n = this;
            for (e = 0; e < t; e++) n = n.dbl();
            return n;
          }
          var r = this.curve.a,
            i = this.curve.tinv,
            o = this.x,
            a = this.y,
            s = this.z,
            u = s.redSqr().redSqr(),
            l = a.redAdd(a);
          for (e = 0; e < t; e++) {
            var c = o.redSqr(),
              h = l.redSqr(),
              f = h.redSqr(),
              d = c.redAdd(c).redIAdd(c).redIAdd(r.redMul(u)),
              p = o.redMul(h),
              m = d.redSqr().redISub(p.redAdd(p)),
              y = p.redISub(m),
              g = d.redMul(y);
            g = g.redIAdd(g).redISub(f);
            var v = l.redMul(s);
            e + 1 < t && (u = u.redMul(f)), (o = m), (s = v), (l = g);
          }
          return this.curve.jpoint(o, l.redMul(i), s);
        }),
        (T.prototype.dbl = function () {
          return this.isInfinity()
            ? this
            : this.curve.zeroA
            ? this._zeroDbl()
            : this.curve.threeA
            ? this._threeDbl()
            : this._dbl();
        }),
        (T.prototype._zeroDbl = function () {
          var t, e, n;
          if (this.zOne) {
            var r = this.x.redSqr(),
              i = this.y.redSqr(),
              o = i.redSqr(),
              a = this.x.redAdd(i).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r),
              u = s.redSqr().redISub(a).redISub(a),
              l = o.redIAdd(o);
            (l = (l = l.redIAdd(l)).redIAdd(l)),
              (t = u),
              (e = s.redMul(a.redISub(u)).redISub(l)),
              (n = this.y.redAdd(this.y));
          } else {
            var c = this.x.redSqr(),
              h = this.y.redSqr(),
              f = h.redSqr(),
              d = this.x.redAdd(h).redSqr().redISub(c).redISub(f);
            d = d.redIAdd(d);
            var p = c.redAdd(c).redIAdd(c),
              m = p.redSqr(),
              y = f.redIAdd(f);
            (y = (y = y.redIAdd(y)).redIAdd(y)),
              (t = m.redISub(d).redISub(d)),
              (e = p.redMul(d.redISub(t)).redISub(y)),
              (n = (n = this.y.redMul(this.z)).redIAdd(n));
          }
          return this.curve.jpoint(t, e, n);
        }),
        (T.prototype._threeDbl = function () {
          var t, e, n;
          if (this.zOne) {
            var r = this.x.redSqr(),
              i = this.y.redSqr(),
              o = i.redSqr(),
              a = this.x.redAdd(i).redSqr().redISub(r).redISub(o);
            a = a.redIAdd(a);
            var s = r.redAdd(r).redIAdd(r).redIAdd(this.curve.a),
              u = s.redSqr().redISub(a).redISub(a);
            t = u;
            var l = o.redIAdd(o);
            (l = (l = l.redIAdd(l)).redIAdd(l)),
              (e = s.redMul(a.redISub(u)).redISub(l)),
              (n = this.y.redAdd(this.y));
          } else {
            var c = this.z.redSqr(),
              h = this.y.redSqr(),
              f = this.x.redMul(h),
              d = this.x.redSub(c).redMul(this.x.redAdd(c));
            d = d.redAdd(d).redIAdd(d);
            var p = f.redIAdd(f),
              m = (p = p.redIAdd(p)).redAdd(p);
            (t = d.redSqr().redISub(m)),
              (n = this.y.redAdd(this.z).redSqr().redISub(h).redISub(c));
            var y = h.redSqr();
            (y = (y = (y = y.redIAdd(y)).redIAdd(y)).redIAdd(y)),
              (e = d.redMul(p.redISub(t)).redISub(y));
          }
          return this.curve.jpoint(t, e, n);
        }),
        (T.prototype._dbl = function () {
          var t = this.curve.a,
            e = this.x,
            n = this.y,
            r = this.z,
            i = r.redSqr().redSqr(),
            o = e.redSqr(),
            a = n.redSqr(),
            s = o.redAdd(o).redIAdd(o).redIAdd(t.redMul(i)),
            u = e.redAdd(e),
            l = (u = u.redIAdd(u)).redMul(a),
            c = s.redSqr().redISub(l.redAdd(l)),
            h = l.redISub(c),
            f = a.redSqr();
          f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
          var d = s.redMul(h).redISub(f),
            p = n.redAdd(n).redMul(r);
          return this.curve.jpoint(c, d, p);
        }),
        (T.prototype.trpl = function () {
          if (!this.curve.zeroA) return this.dbl().add(this);
          var t = this.x.redSqr(),
            e = this.y.redSqr(),
            n = this.z.redSqr(),
            r = e.redSqr(),
            i = t.redAdd(t).redIAdd(t),
            o = i.redSqr(),
            a = this.x.redAdd(e).redSqr().redISub(t).redISub(r),
            s = (a = (a = (a = a.redIAdd(a)).redAdd(a).redIAdd(a)).redISub(
              o
            )).redSqr(),
            u = r.redIAdd(r);
          u = (u = (u = u.redIAdd(u)).redIAdd(u)).redIAdd(u);
          var l = i.redIAdd(a).redSqr().redISub(o).redISub(s).redISub(u),
            c = e.redMul(l);
          c = (c = c.redIAdd(c)).redIAdd(c);
          var h = this.x.redMul(s).redISub(c);
          h = (h = h.redIAdd(h)).redIAdd(h);
          var f = this.y.redMul(l.redMul(u.redISub(l)).redISub(a.redMul(s)));
          f = (f = (f = f.redIAdd(f)).redIAdd(f)).redIAdd(f);
          var d = this.z.redAdd(a).redSqr().redISub(n).redISub(s);
          return this.curve.jpoint(h, f, d);
        }),
        (T.prototype.mul = function (t, e) {
          return (t = new (i())(t, e)), this.curve._wnafMul(this, t);
        }),
        (T.prototype.eq = function (t) {
          if ("affine" === t.type) return this.eq(t.toJ());
          if (this === t) return !0;
          var e = this.z.redSqr(),
            n = t.z.redSqr();
          if (0 !== this.x.redMul(n).redISub(t.x.redMul(e)).cmpn(0)) return !1;
          var r = e.redMul(this.z),
            i = n.redMul(t.z);
          return 0 === this.y.redMul(i).redISub(t.y.redMul(r)).cmpn(0);
        }),
        (T.prototype.eqXToP = function (t) {
          var e = this.z.redSqr(),
            n = t.toRed(this.curve.red).redMul(e);
          if (0 === this.x.cmp(n)) return !0;
          for (var r = t.clone(), i = this.curve.redN.redMul(e); ; ) {
            if ((r.iadd(this.curve.n), r.cmp(this.curve.p) >= 0)) return !1;
            if ((n.redIAdd(i), 0 === this.x.cmp(n))) return !0;
          }
        }),
        (T.prototype.inspect = function () {
          return this.isInfinity()
            ? "<EC JPoint Infinity>"
            : "<EC JPoint x: " +
                this.x.toString(16, 2) +
                " y: " +
                this.y.toString(16, 2) +
                " z: " +
                this.z.toString(16, 2) +
                ">";
        }),
        (T.prototype.isInfinity = function () {
          return 0 === this.z.cmpn(0);
        });
      var A = s(function (t, e) {
          var n = e;
          (n.base = y), (n.short = x), (n.mont = null), (n.edwards = null);
        }),
        M = s(function (t, e) {
          var n,
            r = e,
            i = h.assert;
          function o(t) {
            "short" === t.type
              ? (this.curve = new A.short(t))
              : "edwards" === t.type
              ? (this.curve = new A.edwards(t))
              : (this.curve = new A.mont(t)),
              (this.g = this.curve.g),
              (this.n = this.curve.n),
              (this.hash = t.hash),
              i(this.g.validate(), "Invalid curve"),
              i(this.g.mul(this.n).isInfinity(), "Invalid curve, G*N != O");
          }
          function s(t, e) {
            Object.defineProperty(r, t, {
              configurable: !0,
              enumerable: !0,
              get: function () {
                var n = new o(e);
                return (
                  Object.defineProperty(r, t, {
                    configurable: !0,
                    enumerable: !0,
                    value: n,
                  }),
                  n
                );
              },
            });
          }
          (r.PresetCurve = o),
            s("p192", {
              type: "short",
              prime: "p192",
              p: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff",
              a: "ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc",
              b: "64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1",
              n: "ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831",
              hash: a().sha256,
              gRed: !1,
              g: [
                "188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012",
                "07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811",
              ],
            }),
            s("p224", {
              type: "short",
              prime: "p224",
              p: "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001",
              a: "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe",
              b: "b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4",
              n: "ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d",
              hash: a().sha256,
              gRed: !1,
              g: [
                "b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21",
                "bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34",
              ],
            }),
            s("p256", {
              type: "short",
              prime: null,
              p: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff",
              a: "ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc",
              b: "5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b",
              n: "ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551",
              hash: a().sha256,
              gRed: !1,
              g: [
                "6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296",
                "4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5",
              ],
            }),
            s("p384", {
              type: "short",
              prime: null,
              p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 ffffffff",
              a: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe ffffffff 00000000 00000000 fffffffc",
              b: "b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f 5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef",
              n: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 f4372ddf 581a0db2 48b0a77a ecec196a ccc52973",
              hash: a().sha384,
              gRed: !1,
              g: [
                "aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 5502f25d bf55296c 3a545e38 72760ab7",
                "3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 0a60b1ce 1d7e819d 7a431d7c 90ea0e5f",
              ],
            }),
            s("p521", {
              type: "short",
              prime: null,
              p: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff",
              a: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffc",
              b: "00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b 99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd 3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00",
              n: "000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409",
              hash: a().sha512,
              gRed: !1,
              g: [
                "000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66",
                "00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 3fad0761 353c7086 a272c240 88be9476 9fd16650",
              ],
            }),
            s("curve25519", {
              type: "mont",
              prime: "p25519",
              p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
              a: "76d06",
              b: "1",
              n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
              hash: a().sha256,
              gRed: !1,
              g: ["9"],
            }),
            s("ed25519", {
              type: "edwards",
              prime: "p25519",
              p: "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed",
              a: "-1",
              c: "1",
              d: "52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3",
              n: "1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed",
              hash: a().sha256,
              gRed: !1,
              g: [
                "216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a",
                "6666666666666666666666666666666666666666666666666666666666666658",
              ],
            });
          try {
            n = null.crash();
          } catch (u) {
            n = void 0;
          }
          s("secp256k1", {
            type: "short",
            prime: "k256",
            p: "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f",
            a: "0",
            b: "7",
            n: "ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141",
            h: "1",
            hash: a().sha256,
            beta: "7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee",
            lambda:
              "5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72",
            basis: [
              {
                a: "3086d221a7d46bcde86c90e49284eb15",
                b: "-e4437ed6010e88286f547fa90abfe4c3",
              },
              {
                a: "114ca50f7a8e2f3f657c1108d9d44cfd8",
                b: "3086d221a7d46bcde86c90e49284eb15",
              },
            ],
            gRed: !1,
            g: [
              "79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
              "483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
              n,
            ],
          });
        });
      function _(t) {
        if (!(this instanceof _)) return new _(t);
        (this.hash = t.hash),
          (this.predResist = !!t.predResist),
          (this.outLen = this.hash.outSize),
          (this.minEntropy = t.minEntropy || this.hash.hmacStrength),
          (this._reseed = null),
          (this.reseedInterval = null),
          (this.K = null),
          (this.V = null);
        var e = c.toArray(t.entropy, t.entropyEnc || "hex"),
          n = c.toArray(t.nonce, t.nonceEnc || "hex"),
          r = c.toArray(t.pers, t.persEnc || "hex");
        u(
          e.length >= this.minEntropy / 8,
          "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
        ),
          this._init(e, n, r);
      }
      var k = _;
      (_.prototype._init = function (t, e, n) {
        var r = t.concat(e).concat(n);
        (this.K = new Array(this.outLen / 8)),
          (this.V = new Array(this.outLen / 8));
        for (var i = 0; i < this.V.length; i++)
          (this.K[i] = 0), (this.V[i] = 1);
        this._update(r),
          (this._reseed = 1),
          (this.reseedInterval = 281474976710656);
      }),
        (_.prototype._hmac = function () {
          return new (a().hmac)(this.hash, this.K);
        }),
        (_.prototype._update = function (t) {
          var e = this._hmac().update(this.V).update([0]);
          t && (e = e.update(t)),
            (this.K = e.digest()),
            (this.V = this._hmac().update(this.V).digest()),
            t &&
              ((this.K = this._hmac()
                .update(this.V)
                .update([1])
                .update(t)
                .digest()),
              (this.V = this._hmac().update(this.V).digest()));
        }),
        (_.prototype.reseed = function (t, e, n, r) {
          "string" !== typeof e && ((r = n), (n = e), (e = null)),
            (t = c.toArray(t, e)),
            (n = c.toArray(n, r)),
            u(
              t.length >= this.minEntropy / 8,
              "Not enough entropy. Minimum is: " + this.minEntropy + " bits"
            ),
            this._update(t.concat(n || [])),
            (this._reseed = 1);
        }),
        (_.prototype.generate = function (t, e, n, r) {
          if (this._reseed > this.reseedInterval)
            throw new Error("Reseed is required");
          "string" !== typeof e && ((r = n), (n = e), (e = null)),
            n && ((n = c.toArray(n, r || "hex")), this._update(n));
          for (var i = []; i.length < t; )
            (this.V = this._hmac().update(this.V).digest()),
              (i = i.concat(this.V));
          var o = i.slice(0, t);
          return this._update(n), this._reseed++, c.encode(o, e);
        });
      var S = h.assert;
      function P(t, e) {
        (this.ec = t),
          (this.priv = null),
          (this.pub = null),
          e.priv && this._importPrivate(e.priv, e.privEnc),
          e.pub && this._importPublic(e.pub, e.pubEnc);
      }
      var O = P;
      (P.fromPublic = function (t, e, n) {
        return e instanceof P ? e : new P(t, { pub: e, pubEnc: n });
      }),
        (P.fromPrivate = function (t, e, n) {
          return e instanceof P ? e : new P(t, { priv: e, privEnc: n });
        }),
        (P.prototype.validate = function () {
          var t = this.getPublic();
          return t.isInfinity()
            ? { result: !1, reason: "Invalid public key" }
            : t.validate()
            ? t.mul(this.ec.curve.n).isInfinity()
              ? { result: !0, reason: null }
              : { result: !1, reason: "Public key * N != O" }
            : { result: !1, reason: "Public key is not a point" };
        }),
        (P.prototype.getPublic = function (t, e) {
          return (
            "string" === typeof t && ((e = t), (t = null)),
            this.pub || (this.pub = this.ec.g.mul(this.priv)),
            e ? this.pub.encode(e, t) : this.pub
          );
        }),
        (P.prototype.getPrivate = function (t) {
          return "hex" === t ? this.priv.toString(16, 2) : this.priv;
        }),
        (P.prototype._importPrivate = function (t, e) {
          (this.priv = new (i())(t, e || 16)),
            (this.priv = this.priv.umod(this.ec.curve.n));
        }),
        (P.prototype._importPublic = function (t, e) {
          if (t.x || t.y)
            return (
              "mont" === this.ec.curve.type
                ? S(t.x, "Need x coordinate")
                : ("short" !== this.ec.curve.type &&
                    "edwards" !== this.ec.curve.type) ||
                  S(t.x && t.y, "Need both x and y coordinate"),
              void (this.pub = this.ec.curve.point(t.x, t.y))
            );
          this.pub = this.ec.curve.decodePoint(t, e);
        }),
        (P.prototype.derive = function (t) {
          return (
            t.validate() || S(t.validate(), "public point not validated"),
            t.mul(this.priv).getX()
          );
        }),
        (P.prototype.sign = function (t, e, n) {
          return this.ec.sign(t, this, e, n);
        }),
        (P.prototype.verify = function (t, e) {
          return this.ec.verify(t, e, this);
        }),
        (P.prototype.inspect = function () {
          return (
            "<Key priv: " +
            (this.priv && this.priv.toString(16, 2)) +
            " pub: " +
            (this.pub && this.pub.inspect()) +
            " >"
          );
        });
      var R = h.assert;
      function N(t, e) {
        if (t instanceof N) return t;
        this._importDER(t, e) ||
          (R(t.r && t.s, "Signature without r or s"),
          (this.r = new (i())(t.r, 16)),
          (this.s = new (i())(t.s, 16)),
          void 0 === t.recoveryParam
            ? (this.recoveryParam = null)
            : (this.recoveryParam = t.recoveryParam));
      }
      var I = N;
      function C() {
        this.place = 0;
      }
      function L(t, e) {
        var n = t[e.place++];
        if (!(128 & n)) return n;
        var r = 15 & n;
        if (0 === r || r > 4) return !1;
        for (var i = 0, o = 0, a = e.place; o < r; o++, a++)
          (i <<= 8), (i |= t[a]), (i >>>= 0);
        return !(i <= 127) && ((e.place = a), i);
      }
      function B(t) {
        for (var e = 0, n = t.length - 1; !t[e] && !(128 & t[e + 1]) && e < n; )
          e++;
        return 0 === e ? t : t.slice(e);
      }
      function F(t, e) {
        if (e < 128) t.push(e);
        else {
          var n = 1 + ((Math.log(e) / Math.LN2) >>> 3);
          for (t.push(128 | n); --n; ) t.push((e >>> (n << 3)) & 255);
          t.push(e);
        }
      }
      (N.prototype._importDER = function (t, e) {
        t = h.toArray(t, e);
        var n = new C();
        if (48 !== t[n.place++]) return !1;
        var r = L(t, n);
        if (!1 === r) return !1;
        if (r + n.place !== t.length) return !1;
        if (2 !== t[n.place++]) return !1;
        var o = L(t, n);
        if (!1 === o) return !1;
        var a = t.slice(n.place, o + n.place);
        if (((n.place += o), 2 !== t[n.place++])) return !1;
        var s = L(t, n);
        if (!1 === s) return !1;
        if (t.length !== s + n.place) return !1;
        var u = t.slice(n.place, s + n.place);
        if (0 === a[0]) {
          if (!(128 & a[1])) return !1;
          a = a.slice(1);
        }
        if (0 === u[0]) {
          if (!(128 & u[1])) return !1;
          u = u.slice(1);
        }
        return (
          (this.r = new (i())(a)),
          (this.s = new (i())(u)),
          (this.recoveryParam = null),
          !0
        );
      }),
        (N.prototype.toDER = function (t) {
          var e = this.r.toArray(),
            n = this.s.toArray();
          for (
            128 & e[0] && (e = [0].concat(e)),
              128 & n[0] && (n = [0].concat(n)),
              e = B(e),
              n = B(n);
            !n[0] && !(128 & n[1]);

          )
            n = n.slice(1);
          var r = [2];
          F(r, e.length), (r = r.concat(e)).push(2), F(r, n.length);
          var i = r.concat(n),
            o = [48];
          return F(o, i.length), (o = o.concat(i)), h.encode(o, t);
        });
      var j = function () {
          throw new Error("unsupported");
        },
        D = h.assert;
      function U(t) {
        if (!(this instanceof U)) return new U(t);
        "string" === typeof t &&
          (D(Object.prototype.hasOwnProperty.call(M, t), "Unknown curve " + t),
          (t = M[t])),
          t instanceof M.PresetCurve && (t = { curve: t }),
          (this.curve = t.curve.curve),
          (this.n = this.curve.n),
          (this.nh = this.n.ushrn(1)),
          (this.g = this.curve.g),
          (this.g = t.curve.g),
          this.g.precompute(t.curve.n.bitLength() + 1),
          (this.hash = t.hash || t.curve.hash);
      }
      var V = U;
      (U.prototype.keyPair = function (t) {
        return new O(this, t);
      }),
        (U.prototype.keyFromPrivate = function (t, e) {
          return O.fromPrivate(this, t, e);
        }),
        (U.prototype.keyFromPublic = function (t, e) {
          return O.fromPublic(this, t, e);
        }),
        (U.prototype.genKeyPair = function (t) {
          t || (t = {});
          for (
            var e = new k({
                hash: this.hash,
                pers: t.pers,
                persEnc: t.persEnc || "utf8",
                entropy: t.entropy || j(this.hash.hmacStrength),
                entropyEnc: (t.entropy && t.entropyEnc) || "utf8",
                nonce: this.n.toArray(),
              }),
              n = this.n.byteLength(),
              r = this.n.sub(new (i())(2));
            ;

          ) {
            var o = new (i())(e.generate(n));
            if (!(o.cmp(r) > 0)) return o.iaddn(1), this.keyFromPrivate(o);
          }
        }),
        (U.prototype._truncateToN = function (t, e) {
          var n = 8 * t.byteLength() - this.n.bitLength();
          return (
            n > 0 && (t = t.ushrn(n)),
            !e && t.cmp(this.n) >= 0 ? t.sub(this.n) : t
          );
        }),
        (U.prototype.sign = function (t, e, n, r) {
          "object" === typeof n && ((r = n), (n = null)),
            r || (r = {}),
            (e = this.keyFromPrivate(e, n)),
            (t = this._truncateToN(new (i())(t, 16)));
          for (
            var o = this.n.byteLength(),
              a = e.getPrivate().toArray("be", o),
              s = t.toArray("be", o),
              u = new k({
                hash: this.hash,
                entropy: a,
                nonce: s,
                pers: r.pers,
                persEnc: r.persEnc || "utf8",
              }),
              l = this.n.sub(new (i())(1)),
              c = 0;
            ;
            c++
          ) {
            var h = r.k ? r.k(c) : new (i())(u.generate(this.n.byteLength()));
            if (
              !((h = this._truncateToN(h, !0)).cmpn(1) <= 0 || h.cmp(l) >= 0)
            ) {
              var f = this.g.mul(h);
              if (!f.isInfinity()) {
                var d = f.getX(),
                  p = d.umod(this.n);
                if (0 !== p.cmpn(0)) {
                  var m = h.invm(this.n).mul(p.mul(e.getPrivate()).iadd(t));
                  if (0 !== (m = m.umod(this.n)).cmpn(0)) {
                    var y =
                      (f.getY().isOdd() ? 1 : 0) | (0 !== d.cmp(p) ? 2 : 0);
                    return (
                      r.canonical &&
                        m.cmp(this.nh) > 0 &&
                        ((m = this.n.sub(m)), (y ^= 1)),
                      new I({ r: p, s: m, recoveryParam: y })
                    );
                  }
                }
              }
            }
          }
        }),
        (U.prototype.verify = function (t, e, n, r) {
          (t = this._truncateToN(new (i())(t, 16))),
            (n = this.keyFromPublic(n, r));
          var o = (e = new I(e, "hex")).r,
            a = e.s;
          if (o.cmpn(1) < 0 || o.cmp(this.n) >= 0) return !1;
          if (a.cmpn(1) < 0 || a.cmp(this.n) >= 0) return !1;
          var s,
            u = a.invm(this.n),
            l = u.mul(t).umod(this.n),
            c = u.mul(o).umod(this.n);
          return this.curve._maxwellTrick
            ? !(s = this.g.jmulAdd(l, n.getPublic(), c)).isInfinity() &&
                s.eqXToP(o)
            : !(s = this.g.mulAdd(l, n.getPublic(), c)).isInfinity() &&
                0 === s.getX().umod(this.n).cmp(o);
        }),
        (U.prototype.recoverPubKey = function (t, e, n, r) {
          D((3 & n) === n, "The recovery param is more than two bits"),
            (e = new I(e, r));
          var o = this.n,
            a = new (i())(t),
            s = e.r,
            u = e.s,
            l = 1 & n,
            c = n >> 1;
          if (s.cmp(this.curve.p.umod(this.curve.n)) >= 0 && c)
            throw new Error("Unable to find sencond key candinate");
          s = c
            ? this.curve.pointFromX(s.add(this.curve.n), l)
            : this.curve.pointFromX(s, l);
          var h = e.r.invm(o),
            f = o.sub(a).mul(h).umod(o),
            d = u.mul(h).umod(o);
          return this.g.mulAdd(f, s, d);
        }),
        (U.prototype.getKeyRecoveryParam = function (t, e, n, r) {
          if (null !== (e = new I(e, r)).recoveryParam) return e.recoveryParam;
          for (var i = 0; i < 4; i++) {
            var o;
            try {
              o = this.recoverPubKey(t, e, i);
            } catch (t) {
              continue;
            }
            if (o.eq(n)) return i;
          }
          throw new Error("Unable to find valid recovery factor");
        });
      var G = s(function (t, e) {
          var n = e;
          (n.version = "6.5.4"),
            (n.utils = h),
            (n.rand = function () {
              throw new Error("unsupported");
            }),
            (n.curve = A),
            (n.curves = M),
            (n.ec = V),
            (n.eddsa = null);
        }).ec,
        z = n(6441),
        $ = n(6881);
      const H = new (n(1581).Logger)("signing-key/5.5.0");
      let q = null;
      function W() {
        return q || (q = new G("secp256k1")), q;
      }
      class X {
        constructor(t) {
          (0, $.defineReadOnly)(this, "curve", "secp256k1"),
            (0, $.defineReadOnly)(this, "privateKey", (0, z.hexlify)(t));
          const e = W().keyFromPrivate((0, z.arrayify)(this.privateKey));
          (0, $.defineReadOnly)(
            this,
            "publicKey",
            "0x" + e.getPublic(!1, "hex")
          ),
            (0, $.defineReadOnly)(
              this,
              "compressedPublicKey",
              "0x" + e.getPublic(!0, "hex")
            ),
            (0, $.defineReadOnly)(this, "_isSigningKey", !0);
        }
        _addPoint(t) {
          const e = W().keyFromPublic((0, z.arrayify)(this.publicKey)),
            n = W().keyFromPublic((0, z.arrayify)(t));
          return "0x" + e.pub.add(n.pub).encodeCompressed("hex");
        }
        signDigest(t) {
          const e = W().keyFromPrivate((0, z.arrayify)(this.privateKey)),
            n = (0, z.arrayify)(t);
          32 !== n.length &&
            H.throwArgumentError("bad digest length", "digest", t);
          const r = e.sign(n, { canonical: !0 });
          return (0, z.splitSignature)({
            recoveryParam: r.recoveryParam,
            r: (0, z.hexZeroPad)("0x" + r.r.toString(16), 32),
            s: (0, z.hexZeroPad)("0x" + r.s.toString(16), 32),
          });
        }
        computeSharedSecret(t) {
          const e = W().keyFromPrivate((0, z.arrayify)(this.privateKey)),
            n = W().keyFromPublic((0, z.arrayify)(K(t)));
          return (0, z.hexZeroPad)(
            "0x" + e.derive(n.getPublic()).toString(16),
            32
          );
        }
        static isSigningKey(t) {
          return !(!t || !t._isSigningKey);
        }
      }
      function Z(t, e) {
        const n = (0, z.splitSignature)(e),
          r = { r: (0, z.arrayify)(n.r), s: (0, z.arrayify)(n.s) };
        return (
          "0x" +
          W()
            .recoverPubKey((0, z.arrayify)(t), r, n.recoveryParam)
            .encode("hex", !1)
        );
      }
      function K(t, e) {
        const n = (0, z.arrayify)(t);
        if (32 === n.length) {
          const t = new X(n);
          return e
            ? "0x" + W().keyFromPrivate(n).getPublic(!0, "hex")
            : t.publicKey;
        }
        return 33 === n.length
          ? e
            ? (0, z.hexlify)(n)
            : "0x" + W().keyFromPublic(n).getPublic(!1, "hex")
          : 65 === n.length
          ? e
            ? "0x" + W().keyFromPublic(n).getPublic(!0, "hex")
            : (0, z.hexlify)(n)
          : H.throwArgumentError(
              "invalid public or private key",
              "key",
              "[REDACTED]"
            );
      }
    },
    5637: function (t, e, n) {
      "use strict";
      n.d(e, {
        Ll: function () {
          return p;
        },
      });
      var r = n(9251);
      function i(t, e) {
        e ||
          (e = function (t) {
            return [parseInt(t, 16)];
          });
        let n = 0,
          r = {};
        return (
          t.split(",").forEach((t) => {
            let i = t.split(":");
            (n += parseInt(i[0], 16)), (r[n] = e(i[1]));
          }),
          r
        );
      }
      function o(t) {
        let e = 0;
        return t.split(",").map((t) => {
          let n = t.split("-");
          1 === n.length ? (n[1] = "0") : "" === n[1] && (n[1] = "1");
          let r = e + parseInt(n[0], 16);
          return (e = parseInt(n[1], 16)), { l: r, h: e };
        });
      }
      function a(t, e) {
        let n = 0;
        for (let r = 0; r < e.length; r++) {
          let i = e[r];
          if (
            ((n += i.l), t >= n && t <= n + i.h && (t - n) % (i.d || 1) === 0)
          ) {
            if (i.e && -1 !== i.e.indexOf(t - n)) continue;
            return i;
          }
        }
        return null;
      }
      const s = o(
          "221,13-1b,5f-,40-10,51-f,11-3,3-3,2-2,2-4,8,2,15,2d,28-8,88,48,27-,3-5,11-20,27-,8,28,3-5,12,18,b-a,1c-4,6-16,2-d,2-2,2,1b-4,17-9,8f-,10,f,1f-2,1c-34,33-14e,4,36-,13-,6-2,1a-f,4,9-,3-,17,8,2-2,5-,2,8-,3-,4-8,2-3,3,6-,16-6,2-,7-3,3-,17,8,3,3,3-,2,6-3,3-,4-a,5,2-6,10-b,4,8,2,4,17,8,3,6-,b,4,4-,2-e,2-4,b-10,4,9-,3-,17,8,3-,5-,9-2,3-,4-7,3-3,3,4-3,c-10,3,7-2,4,5-2,3,2,3-2,3-2,4-2,9,4-3,6-2,4,5-8,2-e,d-d,4,9,4,18,b,6-3,8,4,5-6,3-8,3-3,b-11,3,9,4,18,b,6-3,8,4,5-6,3-6,2,3-3,b-11,3,9,4,18,11-3,7-,4,5-8,2-7,3-3,b-11,3,13-2,19,a,2-,8-2,2-3,7,2,9-11,4-b,3b-3,1e-24,3,2-,3,2-,2-5,5,8,4,2,2-,3,e,4-,6,2,7-,b-,3-21,49,23-5,1c-3,9,25,10-,2-2f,23,6,3,8-2,5-5,1b-45,27-9,2a-,2-3,5b-4,45-4,53-5,8,40,2,5-,8,2,5-,28,2,5-,20,2,5-,8,2,5-,8,8,18,20,2,5-,8,28,14-5,1d-22,56-b,277-8,1e-2,52-e,e,8-a,18-8,15-b,e,4,3-b,5e-2,b-15,10,b-5,59-7,2b-555,9d-3,5b-5,17-,7-,27-,7-,9,2,2,2,20-,36,10,f-,7,14-,4,a,54-3,2-6,6-5,9-,1c-10,13-1d,1c-14,3c-,10-6,32-b,240-30,28-18,c-14,a0,115-,3,66-,b-76,5,5-,1d,24,2,5-2,2,8-,35-2,19,f-10,1d-3,311-37f,1b,5a-b,d7-19,d-3,41,57-,68-4,29-3,5f,29-37,2e-2,25-c,2c-2,4e-3,30,78-3,64-,20,19b7-49,51a7-59,48e-2,38-738,2ba5-5b,222f-,3c-94,8-b,6-4,1b,6,2,3,3,6d-20,16e-f,41-,37-7,2e-2,11-f,5-b,18-,b,14,5-3,6,88-,2,bf-2,7-,7-,7-,4-2,8,8-9,8-2ff,20,5-b,1c-b4,27-,27-cbb1,f7-9,28-2,b5-221,56,48,3-,2-,3-,5,d,2,5,3,42,5-,9,8,1d,5,6,2-2,8,153-3,123-3,33-27fd,a6da-5128,21f-5df,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3-fffd,3,2-1d,61-ff7d"
        ),
        u = "ad,34f,1806,180b,180c,180d,200b,200c,200d,2060,feff"
          .split(",")
          .map((t) => parseInt(t, 16)),
        l = [
          { h: 25, s: 32, l: 65 },
          { h: 30, s: 32, e: [23], l: 127 },
          { h: 54, s: 1, e: [48], l: 64, d: 2 },
          { h: 14, s: 1, l: 57, d: 2 },
          { h: 44, s: 1, l: 17, d: 2 },
          { h: 10, s: 1, e: [2, 6, 8], l: 61, d: 2 },
          { h: 16, s: 1, l: 68, d: 2 },
          { h: 84, s: 1, e: [18, 24, 66], l: 19, d: 2 },
          { h: 26, s: 32, e: [17], l: 435 },
          { h: 22, s: 1, l: 71, d: 2 },
          { h: 15, s: 80, l: 40 },
          { h: 31, s: 32, l: 16 },
          { h: 32, s: 1, l: 80, d: 2 },
          { h: 52, s: 1, l: 42, d: 2 },
          { h: 12, s: 1, l: 55, d: 2 },
          { h: 40, s: 1, e: [38], l: 15, d: 2 },
          { h: 14, s: 1, l: 48, d: 2 },
          { h: 37, s: 48, l: 49 },
          { h: 148, s: 1, l: 6351, d: 2 },
          { h: 88, s: 1, l: 160, d: 2 },
          { h: 15, s: 16, l: 704 },
          { h: 25, s: 26, l: 854 },
          { h: 25, s: 32, l: 55915 },
          { h: 37, s: 40, l: 1247 },
          { h: 25, s: -119711, l: 53248 },
          { h: 25, s: -119763, l: 52 },
          { h: 25, s: -119815, l: 52 },
          { h: 25, s: -119867, e: [1, 4, 5, 7, 8, 11, 12, 17], l: 52 },
          { h: 25, s: -119919, l: 52 },
          { h: 24, s: -119971, e: [2, 7, 8, 17], l: 52 },
          { h: 24, s: -120023, e: [2, 7, 13, 15, 16, 17], l: 52 },
          { h: 25, s: -120075, l: 52 },
          { h: 25, s: -120127, l: 52 },
          { h: 25, s: -120179, l: 52 },
          { h: 25, s: -120231, l: 52 },
          { h: 25, s: -120283, l: 52 },
          { h: 25, s: -120335, l: 52 },
          { h: 24, s: -119543, e: [17], l: 56 },
          { h: 24, s: -119601, e: [17], l: 58 },
          { h: 24, s: -119659, e: [17], l: 58 },
          { h: 24, s: -119717, e: [17], l: 58 },
          { h: 24, s: -119775, e: [17], l: 58 },
        ],
        c = i(
          "b5:3bc,c3:ff,7:73,2:253,5:254,3:256,1:257,5:259,1:25b,3:260,1:263,2:269,1:268,5:26f,1:272,2:275,7:280,3:283,5:288,3:28a,1:28b,5:292,3f:195,1:1bf,29:19e,125:3b9,8b:3b2,1:3b8,1:3c5,3:3c6,1:3c0,1a:3ba,1:3c1,1:3c3,2:3b8,1:3b5,1bc9:3b9,1c:1f76,1:1f77,f:1f7a,1:1f7b,d:1f78,1:1f79,1:1f7c,1:1f7d,107:63,5:25b,4:68,1:68,1:68,3:69,1:69,1:6c,3:6e,4:70,1:71,1:72,1:72,1:72,7:7a,2:3c9,2:7a,2:6b,1:e5,1:62,1:63,3:65,1:66,2:6d,b:3b3,1:3c0,6:64,1b574:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3,20:3b8,1a:3c3"
        ),
        h = i(
          "179:1,2:1,2:1,5:1,2:1,a:4f,a:1,8:1,2:1,2:1,3:1,5:1,3:1,4:1,2:1,3:1,4:1,8:2,1:1,2:2,1:1,2:2,27:2,195:26,2:25,1:25,1:25,2:40,2:3f,1:3f,33:1,11:-6,1:-9,1ac7:-3a,6d:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,b:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,c:-8,2:-8,2:-8,2:-8,9:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,1:-8,49:-8,1:-8,1:-4a,1:-4a,d:-56,1:-56,1:-56,1:-56,d:-8,1:-8,f:-8,1:-8,3:-7"
        ),
        f = i(
          "df:00730073,51:00690307,19:02BC006E,a7:006A030C,18a:002003B9,16:03B903080301,20:03C503080301,1d7:05650582,190f:00680331,1:00740308,1:0077030A,1:0079030A,1:006102BE,b6:03C50313,2:03C503130300,2:03C503130301,2:03C503130342,2a:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F0003B9,1:1F0103B9,1:1F0203B9,1:1F0303B9,1:1F0403B9,1:1F0503B9,1:1F0603B9,1:1F0703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F2003B9,1:1F2103B9,1:1F2203B9,1:1F2303B9,1:1F2403B9,1:1F2503B9,1:1F2603B9,1:1F2703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,1:1F6003B9,1:1F6103B9,1:1F6203B9,1:1F6303B9,1:1F6403B9,1:1F6503B9,1:1F6603B9,1:1F6703B9,3:1F7003B9,1:03B103B9,1:03AC03B9,2:03B10342,1:03B1034203B9,5:03B103B9,6:1F7403B9,1:03B703B9,1:03AE03B9,2:03B70342,1:03B7034203B9,5:03B703B9,6:03B903080300,1:03B903080301,3:03B90342,1:03B903080342,b:03C503080300,1:03C503080301,1:03C10313,2:03C50342,1:03C503080342,b:1F7C03B9,1:03C903B9,1:03CE03B9,2:03C90342,1:03C9034203B9,5:03C903B9,ac:00720073,5b:00B00063,6:00B00066,d:006E006F,a:0073006D,1:00740065006C,1:0074006D,124f:006800700061,2:00610075,2:006F0076,b:00700061,1:006E0061,1:03BC0061,1:006D0061,1:006B0061,1:006B0062,1:006D0062,1:00670062,3:00700066,1:006E0066,1:03BC0066,4:0068007A,1:006B0068007A,1:006D0068007A,1:00670068007A,1:00740068007A,15:00700061,1:006B00700061,1:006D00700061,1:006700700061,8:00700076,1:006E0076,1:03BC0076,1:006D0076,1:006B0076,1:006D0076,1:00700077,1:006E0077,1:03BC0077,1:006D0077,1:006B0077,1:006D0077,1:006B03C9,1:006D03C9,2:00620071,3:00632215006B0067,1:0063006F002E,1:00640062,1:00670079,2:00680070,2:006B006B,1:006B006D,9:00700068,2:00700070006D,1:00700072,2:00730076,1:00770062,c723:00660066,1:00660069,1:0066006C,1:006600660069,1:00660066006C,1:00730074,1:00730074,d:05740576,1:05740565,1:0574056B,1:057E0576,1:0574056D",
          function (t) {
            if (t.length % 4 !== 0) throw new Error("bad data");
            let e = [];
            for (let n = 0; n < t.length; n += 4)
              e.push(parseInt(t.substring(n, n + 4), 16));
            return e;
          }
        ),
        d = o(
          "80-20,2a0-,39c,32,f71,18e,7f2-f,19-7,30-4,7-5,f81-b,5,a800-20ff,4d1-1f,110,fa-6,d174-7,2e84-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,ffff-,2,1f-5f,ff7f-20001"
        );
      function p(t) {
        if (t.match(/^[a-z0-9-]*$/i) && t.length <= 59) return t.toLowerCase();
        let e = (0, r.XL)(t);
        var n;
        (n = e.map((t) => {
          if (u.indexOf(t) >= 0) return [];
          if (t >= 65024 && t <= 65039) return [];
          let e = (function (t) {
            let e = a(t, l);
            if (e) return [t + e.s];
            let n = c[t];
            if (n) return n;
            let r = h[t];
            return r ? [t + r[0]] : f[t] || null;
          })(t);
          return e || [t];
        })),
          (e = n.reduce(
            (t, e) => (
              e.forEach((e) => {
                t.push(e);
              }),
              t
            ),
            []
          )),
          (e = (0, r.XL)((0, r.uu)(e), r.Uj.NFKC)),
          e.forEach((t) => {
            if (a(t, d)) throw new Error("STRINGPREP_CONTAINS_PROHIBITED");
          }),
          e.forEach((t) => {
            if (a(t, s)) throw new Error("STRINGPREP_CONTAINS_UNASSIGNED");
          });
        let i = (0, r.uu)(e);
        if (
          "-" === i.substring(0, 1) ||
          "--" === i.substring(2, 4) ||
          "-" === i.substring(i.length - 1)
        )
          throw new Error("invalid hyphen");
        if (i.length > 63) throw new Error("too long");
        return i;
      }
    },
    9251: function (t, e, n) {
      "use strict";
      n.d(e, {
        Uj: function () {
          return o;
        },
        te: function () {
          return u;
        },
        Uw: function () {
          return a;
        },
        U$: function () {
          return f;
        },
        uu: function () {
          return d;
        },
        Y0: function () {
          return c;
        },
        XL: function () {
          return m;
        },
        ZN: function () {
          return p;
        },
      });
      var r = n(6441);
      const i = new (n(1581).Logger)("strings/5.5.0");
      var o, a;
      function s(t, e, n, r, i) {
        if (t === a.BAD_PREFIX || t === a.UNEXPECTED_CONTINUE) {
          let t = 0;
          for (let r = e + 1; r < n.length && n[r] >> 6 === 2; r++) t++;
          return t;
        }
        return t === a.OVERRUN ? n.length - e - 1 : 0;
      }
      !(function (t) {
        (t.current = ""),
          (t.NFC = "NFC"),
          (t.NFD = "NFD"),
          (t.NFKC = "NFKC"),
          (t.NFKD = "NFKD");
      })(o || (o = {})),
        (function (t) {
          (t.UNEXPECTED_CONTINUE = "unexpected continuation byte"),
            (t.BAD_PREFIX = "bad codepoint prefix"),
            (t.OVERRUN = "string overrun"),
            (t.MISSING_CONTINUE = "missing continuation byte"),
            (t.OUT_OF_RANGE = "out of UTF-8 range"),
            (t.UTF16_SURROGATE = "UTF-16 surrogate"),
            (t.OVERLONG = "overlong representation");
        })(a || (a = {}));
      const u = Object.freeze({
        error: function (t, e, n, r, o) {
          return i.throwArgumentError(
            `invalid codepoint at offset ${e}; ${t}`,
            "bytes",
            n
          );
        },
        ignore: s,
        replace: function (t, e, n, r, i) {
          return t === a.OVERLONG
            ? (r.push(i), 0)
            : (r.push(65533), s(t, e, n));
        },
      });
      function l(t, e) {
        null == e && (e = u.error), (t = (0, r.arrayify)(t));
        const n = [];
        let i = 0;
        for (; i < t.length; ) {
          const r = t[i++];
          if (r >> 7 === 0) {
            n.push(r);
            continue;
          }
          let o = null,
            s = null;
          if (192 === (224 & r)) (o = 1), (s = 127);
          else if (224 === (240 & r)) (o = 2), (s = 2047);
          else {
            if (240 !== (248 & r)) {
              i += e(
                128 === (192 & r) ? a.UNEXPECTED_CONTINUE : a.BAD_PREFIX,
                i - 1,
                t,
                n
              );
              continue;
            }
            (o = 3), (s = 65535);
          }
          if (i - 1 + o >= t.length) {
            i += e(a.OVERRUN, i - 1, t, n);
            continue;
          }
          let u = r & ((1 << (8 - o - 1)) - 1);
          for (let l = 0; l < o; l++) {
            let r = t[i];
            if (128 != (192 & r)) {
              (i += e(a.MISSING_CONTINUE, i, t, n)), (u = null);
              break;
            }
            (u = (u << 6) | (63 & r)), i++;
          }
          null !== u &&
            (u > 1114111
              ? (i += e(a.OUT_OF_RANGE, i - 1 - o, t, n, u))
              : u >= 55296 && u <= 57343
              ? (i += e(a.UTF16_SURROGATE, i - 1 - o, t, n, u))
              : u <= s
              ? (i += e(a.OVERLONG, i - 1 - o, t, n, u))
              : n.push(u));
        }
        return n;
      }
      function c(t, e = o.current) {
        e != o.current && (i.checkNormalize(), (t = t.normalize(e)));
        let n = [];
        for (let r = 0; r < t.length; r++) {
          const e = t.charCodeAt(r);
          if (e < 128) n.push(e);
          else if (e < 2048) n.push((e >> 6) | 192), n.push((63 & e) | 128);
          else if (55296 == (64512 & e)) {
            r++;
            const i = t.charCodeAt(r);
            if (r >= t.length || 56320 !== (64512 & i))
              throw new Error("invalid utf-8 string");
            const o = 65536 + ((1023 & e) << 10) + (1023 & i);
            n.push((o >> 18) | 240),
              n.push(((o >> 12) & 63) | 128),
              n.push(((o >> 6) & 63) | 128),
              n.push((63 & o) | 128);
          } else
            n.push((e >> 12) | 224),
              n.push(((e >> 6) & 63) | 128),
              n.push((63 & e) | 128);
        }
        return (0, r.arrayify)(n);
      }
      function h(t) {
        const e = "0000" + t.toString(16);
        return "\\u" + e.substring(e.length - 4);
      }
      function f(t, e) {
        return (
          '"' +
          l(t, e)
            .map((t) => {
              if (t < 256) {
                switch (t) {
                  case 8:
                    return "\\b";
                  case 9:
                    return "\\t";
                  case 10:
                    return "\\n";
                  case 13:
                    return "\\r";
                  case 34:
                    return '\\"';
                  case 92:
                    return "\\\\";
                }
                if (t >= 32 && t < 127) return String.fromCharCode(t);
              }
              return t <= 65535
                ? h(t)
                : h(55296 + (((t -= 65536) >> 10) & 1023)) +
                    h(56320 + (1023 & t));
            })
            .join("") +
          '"'
        );
      }
      function d(t) {
        return t
          .map((t) =>
            t <= 65535
              ? String.fromCharCode(t)
              : ((t -= 65536),
                String.fromCharCode(
                  55296 + ((t >> 10) & 1023),
                  56320 + (1023 & t)
                ))
          )
          .join("");
      }
      function p(t, e) {
        return d(l(t, e));
      }
      function m(t, e = o.current) {
        return l(c(t, e));
      }
    },
    3875: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          TransactionTypes: function () {
            return d;
          },
          accessListify: function () {
            return E;
          },
          computeAddress: function () {
            return v;
          },
          parse: function () {
            return S;
          },
          recoverAddress: function () {
            return b;
          },
          serialize: function () {
            return _;
          },
        });
      var r = n(9485),
        i = n(2593),
        o = n(6441),
        a = n(1046),
        s = n(8197),
        u = n(6881),
        l = n(9052),
        c = n(7669),
        h = n(1581);
      const f = new h.Logger("transactions/5.5.0");
      var d;
      function p(t) {
        return "0x" === t ? null : (0, r.getAddress)(t);
      }
      function m(t) {
        return "0x" === t ? a._Y : i.O$.from(t);
      }
      !(function (t) {
        (t[(t.legacy = 0)] = "legacy"),
          (t[(t.eip2930 = 1)] = "eip2930"),
          (t[(t.eip1559 = 2)] = "eip1559");
      })(d || (d = {}));
      const y = [
          { name: "nonce", maxLength: 32, numeric: !0 },
          { name: "gasPrice", maxLength: 32, numeric: !0 },
          { name: "gasLimit", maxLength: 32, numeric: !0 },
          { name: "to", length: 20 },
          { name: "value", maxLength: 32, numeric: !0 },
          { name: "data" },
        ],
        g = {
          chainId: !0,
          data: !0,
          gasLimit: !0,
          gasPrice: !0,
          nonce: !0,
          to: !0,
          type: !0,
          value: !0,
        };
      function v(t) {
        const e = (0, c.computePublicKey)(t);
        return (0, r.getAddress)(
          (0, o.hexDataSlice)((0, s.keccak256)((0, o.hexDataSlice)(e, 1)), 12)
        );
      }
      function b(t, e) {
        return v((0, c.recoverPublicKey)((0, o.arrayify)(t), e));
      }
      function w(t, e) {
        const n = (0, o.stripZeros)(i.O$.from(t).toHexString());
        return (
          n.length > 32 &&
            f.throwArgumentError(
              "invalid length for " + e,
              "transaction:" + e,
              t
            ),
          n
        );
      }
      function x(t, e) {
        return {
          address: (0, r.getAddress)(t),
          storageKeys: (e || []).map(
            (e, n) => (
              32 !== (0, o.hexDataLength)(e) &&
                f.throwArgumentError(
                  "invalid access list storageKey",
                  `accessList[${t}:${n}]`,
                  e
                ),
              e.toLowerCase()
            )
          ),
        };
      }
      function E(t) {
        if (Array.isArray(t))
          return t.map((t, e) =>
            Array.isArray(t)
              ? (t.length > 2 &&
                  f.throwArgumentError(
                    "access list expected to be [ address, storageKeys[] ]",
                    `value[${e}]`,
                    t
                  ),
                x(t[0], t[1]))
              : x(t.address, t.storageKeys)
          );
        const e = Object.keys(t).map((e) => {
          const n = t[e].reduce((t, e) => ((t[e] = !0), t), {});
          return x(e, Object.keys(n).sort());
        });
        return e.sort((t, e) => t.address.localeCompare(e.address)), e;
      }
      function T(t) {
        return E(t).map((t) => [t.address, t.storageKeys]);
      }
      function A(t, e) {
        if (null != t.gasPrice) {
          const e = i.O$.from(t.gasPrice),
            n = i.O$.from(t.maxFeePerGas || 0);
          e.eq(n) ||
            f.throwArgumentError(
              "mismatch EIP-1559 gasPrice != maxFeePerGas",
              "tx",
              { gasPrice: e, maxFeePerGas: n }
            );
        }
        const n = [
          w(t.chainId || 0, "chainId"),
          w(t.nonce || 0, "nonce"),
          w(t.maxPriorityFeePerGas || 0, "maxPriorityFeePerGas"),
          w(t.maxFeePerGas || 0, "maxFeePerGas"),
          w(t.gasLimit || 0, "gasLimit"),
          null != t.to ? (0, r.getAddress)(t.to) : "0x",
          w(t.value || 0, "value"),
          t.data || "0x",
          T(t.accessList || []),
        ];
        if (e) {
          const t = (0, o.splitSignature)(e);
          n.push(w(t.recoveryParam, "recoveryParam")),
            n.push((0, o.stripZeros)(t.r)),
            n.push((0, o.stripZeros)(t.s));
        }
        return (0, o.hexConcat)(["0x02", l.encode(n)]);
      }
      function M(t, e) {
        const n = [
          w(t.chainId || 0, "chainId"),
          w(t.nonce || 0, "nonce"),
          w(t.gasPrice || 0, "gasPrice"),
          w(t.gasLimit || 0, "gasLimit"),
          null != t.to ? (0, r.getAddress)(t.to) : "0x",
          w(t.value || 0, "value"),
          t.data || "0x",
          T(t.accessList || []),
        ];
        if (e) {
          const t = (0, o.splitSignature)(e);
          n.push(w(t.recoveryParam, "recoveryParam")),
            n.push((0, o.stripZeros)(t.r)),
            n.push((0, o.stripZeros)(t.s));
        }
        return (0, o.hexConcat)(["0x01", l.encode(n)]);
      }
      function _(t, e) {
        if (null == t.type || 0 === t.type)
          return (
            null != t.accessList &&
              f.throwArgumentError(
                "untyped transactions do not support accessList; include type: 1",
                "transaction",
                t
              ),
            (function (t, e) {
              (0, u.checkProperties)(t, g);
              const n = [];
              y.forEach(function (e) {
                let r = t[e.name] || [];
                const i = {};
                e.numeric && (i.hexPad = "left"),
                  (r = (0, o.arrayify)((0, o.hexlify)(r, i))),
                  e.length &&
                    r.length !== e.length &&
                    r.length > 0 &&
                    f.throwArgumentError(
                      "invalid length for " + e.name,
                      "transaction:" + e.name,
                      r
                    ),
                  e.maxLength &&
                    ((r = (0, o.stripZeros)(r)),
                    r.length > e.maxLength &&
                      f.throwArgumentError(
                        "invalid length for " + e.name,
                        "transaction:" + e.name,
                        r
                      )),
                  n.push((0, o.hexlify)(r));
              });
              let r = 0;
              if (
                (null != t.chainId
                  ? ((r = t.chainId),
                    "number" !== typeof r &&
                      f.throwArgumentError(
                        "invalid transaction.chainId",
                        "transaction",
                        t
                      ))
                  : e &&
                    !(0, o.isBytesLike)(e) &&
                    e.v > 28 &&
                    (r = Math.floor((e.v - 35) / 2)),
                0 !== r &&
                  (n.push((0, o.hexlify)(r)), n.push("0x"), n.push("0x")),
                !e)
              )
                return l.encode(n);
              const i = (0, o.splitSignature)(e);
              let a = 27 + i.recoveryParam;
              return (
                0 !== r
                  ? (n.pop(),
                    n.pop(),
                    n.pop(),
                    (a += 2 * r + 8),
                    i.v > 28 &&
                      i.v !== a &&
                      f.throwArgumentError(
                        "transaction.chainId/signature.v mismatch",
                        "signature",
                        e
                      ))
                  : i.v !== a &&
                    f.throwArgumentError(
                      "transaction.chainId/signature.v mismatch",
                      "signature",
                      e
                    ),
                n.push((0, o.hexlify)(a)),
                n.push((0, o.stripZeros)((0, o.arrayify)(i.r))),
                n.push((0, o.stripZeros)((0, o.arrayify)(i.s))),
                l.encode(n)
              );
            })(t, e)
          );
        switch (t.type) {
          case 1:
            return M(t, e);
          case 2:
            return A(t, e);
        }
        return f.throwError(
          `unsupported transaction type: ${t.type}`,
          h.Logger.errors.UNSUPPORTED_OPERATION,
          { operation: "serializeTransaction", transactionType: t.type }
        );
      }
      function k(t, e, n) {
        try {
          const n = m(e[0]).toNumber();
          if (0 !== n && 1 !== n) throw new Error("bad recid");
          t.v = n;
        } catch (r) {
          f.throwArgumentError("invalid v for transaction type: 1", "v", e[0]);
        }
        (t.r = (0, o.hexZeroPad)(e[1], 32)),
          (t.s = (0, o.hexZeroPad)(e[2], 32));
        try {
          const e = (0, s.keccak256)(n(t));
          t.from = b(e, { r: t.r, s: t.s, recoveryParam: t.v });
        } catch (r) {
          console.log(r);
        }
      }
      function S(t) {
        const e = (0, o.arrayify)(t);
        if (e[0] > 127)
          return (function (t) {
            const e = l.decode(t);
            9 !== e.length &&
              6 !== e.length &&
              f.throwArgumentError(
                "invalid raw transaction",
                "rawTransaction",
                t
              );
            const n = {
              nonce: m(e[0]).toNumber(),
              gasPrice: m(e[1]),
              gasLimit: m(e[2]),
              to: p(e[3]),
              value: m(e[4]),
              data: e[5],
              chainId: 0,
            };
            if (6 === e.length) return n;
            try {
              n.v = i.O$.from(e[6]).toNumber();
            } catch (r) {
              return console.log(r), n;
            }
            if (
              ((n.r = (0, o.hexZeroPad)(e[7], 32)),
              (n.s = (0, o.hexZeroPad)(e[8], 32)),
              i.O$.from(n.r).isZero() && i.O$.from(n.s).isZero())
            )
              (n.chainId = n.v), (n.v = 0);
            else {
              (n.chainId = Math.floor((n.v - 35) / 2)),
                n.chainId < 0 && (n.chainId = 0);
              let i = n.v - 27;
              const a = e.slice(0, 6);
              0 !== n.chainId &&
                (a.push((0, o.hexlify)(n.chainId)),
                a.push("0x"),
                a.push("0x"),
                (i -= 2 * n.chainId + 8));
              const u = (0, s.keccak256)(l.encode(a));
              try {
                n.from = b(u, {
                  r: (0, o.hexlify)(n.r),
                  s: (0, o.hexlify)(n.s),
                  recoveryParam: i,
                });
              } catch (r) {
                console.log(r);
              }
              n.hash = (0, s.keccak256)(t);
            }
            return (n.type = null), n;
          })(e);
        switch (e[0]) {
          case 1:
            return (function (t) {
              const e = l.decode(t.slice(1));
              8 !== e.length &&
                11 !== e.length &&
                f.throwArgumentError(
                  "invalid component count for transaction type: 1",
                  "payload",
                  (0, o.hexlify)(t)
                );
              const n = {
                type: 1,
                chainId: m(e[0]).toNumber(),
                nonce: m(e[1]).toNumber(),
                gasPrice: m(e[2]),
                gasLimit: m(e[3]),
                to: p(e[4]),
                value: m(e[5]),
                data: e[6],
                accessList: E(e[7]),
              };
              return (
                8 === e.length ||
                  ((n.hash = (0, s.keccak256)(t)), k(n, e.slice(8), M)),
                n
              );
            })(e);
          case 2:
            return (function (t) {
              const e = l.decode(t.slice(1));
              9 !== e.length &&
                12 !== e.length &&
                f.throwArgumentError(
                  "invalid component count for transaction type: 2",
                  "payload",
                  (0, o.hexlify)(t)
                );
              const n = m(e[2]),
                r = m(e[3]),
                i = {
                  type: 2,
                  chainId: m(e[0]).toNumber(),
                  nonce: m(e[1]).toNumber(),
                  maxPriorityFeePerGas: n,
                  maxFeePerGas: r,
                  gasPrice: null,
                  gasLimit: m(e[4]),
                  to: p(e[5]),
                  value: m(e[6]),
                  data: e[7],
                  accessList: E(e[8]),
                };
              return (
                9 === e.length ||
                  ((i.hash = (0, s.keccak256)(t)), k(i, e.slice(9), A)),
                i
              );
            })(e);
        }
        return f.throwError(
          `unsupported transaction type: ${e[0]}`,
          h.Logger.errors.UNSUPPORTED_OPERATION,
          { operation: "parseTransaction", transactionType: e[0] }
        );
      }
    },
    7707: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          _fetchData: function () {
            return p;
          },
          fetchJson: function () {
            return m;
          },
          poll: function () {
            return y;
          },
        });
      var r = n(9567),
        i = n(6441),
        o = n(6881),
        a = n(9251),
        s = n(1581);
      var u = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      function l(t, e) {
        return u(this, void 0, void 0, function* () {
          null == e && (e = {});
          const n = {
            method: e.method || "GET",
            headers: e.headers || {},
            body: e.body || void 0,
          };
          !0 !== e.skipFetchSetup &&
            ((n.mode = "cors"),
            (n.cache = "no-cache"),
            (n.credentials = "same-origin"),
            (n.redirect = "follow"),
            (n.referrer = "client"));
          const r = yield fetch(t, n),
            o = yield r.arrayBuffer(),
            a = {};
          return (
            r.headers.forEach
              ? r.headers.forEach((t, e) => {
                  a[e.toLowerCase()] = t;
                })
              : r.headers.keys().forEach((t) => {
                  a[t.toLowerCase()] = r.headers.get(t);
                }),
            {
              headers: a,
              statusCode: r.status,
              statusMessage: r.statusText,
              body: (0, i.arrayify)(new Uint8Array(o)),
            }
          );
        });
      }
      var c = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const h = new s.Logger("web/5.5.1");
      function f(t) {
        return new Promise((e) => {
          setTimeout(e, t);
        });
      }
      function d(t, e) {
        if (null == t) return null;
        if ("string" === typeof t) return t;
        if ((0, i.isBytesLike)(t)) {
          if (
            e &&
            ("text" === e.split("/")[0] ||
              "application/json" === e.split(";")[0].trim())
          )
            try {
              return (0, a.ZN)(t);
            } catch (n) {}
          return (0, i.hexlify)(t);
        }
        return t;
      }
      function p(t, e, n) {
        const i =
          "object" === typeof t && null != t.throttleLimit
            ? t.throttleLimit
            : 12;
        h.assertArgument(
          i > 0 && i % 1 === 0,
          "invalid connection throttle limit",
          "connection.throttleLimit",
          i
        );
        const o = "object" === typeof t ? t.throttleCallback : null,
          u =
            "object" === typeof t && "number" === typeof t.throttleSlotInterval
              ? t.throttleSlotInterval
              : 100;
        h.assertArgument(
          u > 0 && u % 1 === 0,
          "invalid connection throttle slot interval",
          "connection.throttleSlotInterval",
          u
        );
        const p = {};
        let m = null;
        const y = { method: "GET" };
        let g = !1,
          v = 12e4;
        if ("string" === typeof t) m = t;
        else if ("object" === typeof t) {
          if (
            ((null != t && null != t.url) ||
              h.throwArgumentError("missing URL", "connection.url", t),
            (m = t.url),
            "number" === typeof t.timeout && t.timeout > 0 && (v = t.timeout),
            t.headers)
          )
            for (const e in t.headers)
              (p[e.toLowerCase()] = { key: e, value: String(t.headers[e]) }),
                ["if-none-match", "if-modified-since"].indexOf(
                  e.toLowerCase()
                ) >= 0 && (g = !0);
          if (
            ((y.allowGzip = !!t.allowGzip),
            null != t.user && null != t.password)
          ) {
            "https:" !== m.substring(0, 6) &&
              !0 !== t.allowInsecureAuthentication &&
              h.throwError(
                "basic authentication requires a secure https url",
                s.Logger.errors.INVALID_ARGUMENT,
                {
                  argument: "url",
                  url: m,
                  user: t.user,
                  password: "[REDACTED]",
                }
              );
            const e = t.user + ":" + t.password;
            p.authorization = {
              key: "Authorization",
              value: "Basic " + (0, r.c)((0, a.Y0)(e)),
            };
          }
        }
        const b = new RegExp("^data:([a-z0-9-]+/[a-z0-9-]+);base64,(.*)$", "i"),
          w = m ? m.match(b) : null;
        if (w)
          try {
            const t = {
              statusCode: 200,
              statusMessage: "OK",
              headers: { "content-type": w[1] },
              body: (0, r.J)(w[2]),
            };
            let e = t.body;
            return n && (e = n(t.body, t)), Promise.resolve(e);
          } catch (A) {
            h.throwError(
              "processing response error",
              s.Logger.errors.SERVER_ERROR,
              {
                body: d(w[1], w[2]),
                error: A,
                requestBody: null,
                requestMethod: "GET",
                url: m,
              }
            );
          }
        e &&
          ((y.method = "POST"),
          (y.body = e),
          null == p["content-type"] &&
            (p["content-type"] = {
              key: "Content-Type",
              value: "application/octet-stream",
            }),
          null == p["content-length"] &&
            (p["content-length"] = {
              key: "Content-Length",
              value: String(e.length),
            }));
        const x = {};
        Object.keys(p).forEach((t) => {
          const e = p[t];
          x[e.key] = e.value;
        }),
          (y.headers = x);
        const E = (function () {
            let t = null;
            return {
              promise: new Promise(function (e, n) {
                v &&
                  (t = setTimeout(() => {
                    null != t &&
                      ((t = null),
                      n(
                        h.makeError("timeout", s.Logger.errors.TIMEOUT, {
                          requestBody: d(y.body, x["content-type"]),
                          requestMethod: y.method,
                          timeout: v,
                          url: m,
                        })
                      ));
                  }, v));
              }),
              cancel: function () {
                null != t && (clearTimeout(t), (t = null));
              },
            };
          })(),
          T = (function () {
            return c(this, void 0, void 0, function* () {
              for (let t = 0; t < i; t++) {
                let e = null;
                try {
                  if (((e = yield l(m, y)), t < i))
                    if (301 === e.statusCode || 302 === e.statusCode) {
                      const t = e.headers.location || "";
                      if ("GET" === y.method && t.match(/^https:/)) {
                        m = e.headers.location;
                        continue;
                      }
                    } else if (429 === e.statusCode) {
                      let n = !0;
                      if ((o && (n = yield o(t, m)), n)) {
                        let n = 0;
                        const r = e.headers["retry-after"];
                        (n =
                          "string" === typeof r && r.match(/^[1-9][0-9]*$/)
                            ? 1e3 * parseInt(r)
                            : u *
                              parseInt(String(Math.random() * Math.pow(2, t)))),
                          yield f(n);
                        continue;
                      }
                    }
                } catch (A) {
                  (e = A.response),
                    null == e &&
                      (E.cancel(),
                      h.throwError(
                        "missing response",
                        s.Logger.errors.SERVER_ERROR,
                        {
                          requestBody: d(y.body, x["content-type"]),
                          requestMethod: y.method,
                          serverError: A,
                          url: m,
                        }
                      ));
                }
                let r = e.body;
                if (
                  (g && 304 === e.statusCode
                    ? (r = null)
                    : (e.statusCode < 200 || e.statusCode >= 300) &&
                      (E.cancel(),
                      h.throwError(
                        "bad response",
                        s.Logger.errors.SERVER_ERROR,
                        {
                          status: e.statusCode,
                          headers: e.headers,
                          body: d(
                            r,
                            e.headers ? e.headers["content-type"] : null
                          ),
                          requestBody: d(y.body, x["content-type"]),
                          requestMethod: y.method,
                          url: m,
                        }
                      )),
                  n)
                )
                  try {
                    const t = yield n(r, e);
                    return E.cancel(), t;
                  } catch (A) {
                    if (A.throttleRetry && t < i) {
                      let e = !0;
                      if ((o && (e = yield o(t, m)), e)) {
                        const e =
                          u * parseInt(String(Math.random() * Math.pow(2, t)));
                        yield f(e);
                        continue;
                      }
                    }
                    E.cancel(),
                      h.throwError(
                        "processing response error",
                        s.Logger.errors.SERVER_ERROR,
                        {
                          body: d(
                            r,
                            e.headers ? e.headers["content-type"] : null
                          ),
                          error: A,
                          requestBody: d(y.body, x["content-type"]),
                          requestMethod: y.method,
                          url: m,
                        }
                      );
                  }
                return E.cancel(), r;
              }
              return h.throwError(
                "failed response",
                s.Logger.errors.SERVER_ERROR,
                {
                  requestBody: d(y.body, x["content-type"]),
                  requestMethod: y.method,
                  url: m,
                }
              );
            });
          })();
        return Promise.race([E.promise, T]);
      }
      function m(t, e, n) {
        let r = null;
        if (null != e) {
          r = (0, a.Y0)(e);
          const n = "string" === typeof t ? { url: t } : (0, o.shallowCopy)(t);
          if (n.headers) {
            0 !==
              Object.keys(n.headers).filter(
                (t) => "content-type" === t.toLowerCase()
              ).length ||
              ((n.headers = (0, o.shallowCopy)(n.headers)),
              (n.headers["content-type"] = "application/json"));
          } else n.headers = { "content-type": "application/json" };
          t = n;
        }
        return p(t, r, (t, e) => {
          let r = null;
          if (null != t)
            try {
              r = JSON.parse((0, a.ZN)(t));
            } catch (i) {
              h.throwError("invalid JSON", s.Logger.errors.SERVER_ERROR, {
                body: t,
                error: i,
              });
            }
          return n && (r = n(r, e)), r;
        });
      }
      function y(t, e) {
        return (
          e || (e = {}),
          null == (e = (0, o.shallowCopy)(e)).floor && (e.floor = 0),
          null == e.ceiling && (e.ceiling = 1e4),
          null == e.interval && (e.interval = 250),
          new Promise(function (n, r) {
            let i = null,
              o = !1;
            const a = () => !o && ((o = !0), i && clearTimeout(i), !0);
            e.timeout &&
              (i = setTimeout(() => {
                a() && r(new Error("timeout"));
              }, e.timeout));
            const s = e.retryLimit;
            let u = 0;
            !(function i() {
              return t().then(
                function (t) {
                  if (void 0 !== t) a() && n(t);
                  else if (e.oncePoll) e.oncePoll.once("poll", i);
                  else if (e.onceBlock) e.onceBlock.once("block", i);
                  else if (!o) {
                    if ((u++, u > s))
                      return void (a() && r(new Error("retry limit reached")));
                    let t =
                      e.interval *
                      parseInt(String(Math.random() * Math.pow(2, u)));
                    t < e.floor && (t = e.floor),
                      t > e.ceiling && (t = e.ceiling),
                      setTimeout(i, t);
                  }
                  return null;
                },
                function (t) {
                  a() && r(t);
                }
              );
            })();
          })
        );
      }
    },
    2882: function (t) {
      "use strict";
      for (
        var e = "qpzry9x8gf2tvdw0s3jn54khce6mua7l", n = {}, r = 0;
        r < e.length;
        r++
      ) {
        var i = e.charAt(r);
        if (void 0 !== n[i]) throw new TypeError(i + " is ambiguous");
        n[i] = r;
      }
      function o(t) {
        var e = t >> 25;
        return (
          ((33554431 & t) << 5) ^
          (996825010 & -((e >> 0) & 1)) ^
          (642813549 & -((e >> 1) & 1)) ^
          (513874426 & -((e >> 2) & 1)) ^
          (1027748829 & -((e >> 3) & 1)) ^
          (705979059 & -((e >> 4) & 1))
        );
      }
      function a(t) {
        for (var e = 1, n = 0; n < t.length; ++n) {
          var r = t.charCodeAt(n);
          if (r < 33 || r > 126) return "Invalid prefix (" + t + ")";
          e = o(e) ^ (r >> 5);
        }
        for (e = o(e), n = 0; n < t.length; ++n) {
          var i = t.charCodeAt(n);
          e = o(e) ^ (31 & i);
        }
        return e;
      }
      function s(t, e) {
        if (((e = e || 90), t.length < 8)) return t + " too short";
        if (t.length > e) return "Exceeds length limit";
        var r = t.toLowerCase(),
          i = t.toUpperCase();
        if (t !== r && t !== i) return "Mixed-case string " + t;
        var s = (t = r).lastIndexOf("1");
        if (-1 === s) return "No separator character for " + t;
        if (0 === s) return "Missing prefix for " + t;
        var u = t.slice(0, s),
          l = t.slice(s + 1);
        if (l.length < 6) return "Data too short";
        var c = a(u);
        if ("string" === typeof c) return c;
        for (var h = [], f = 0; f < l.length; ++f) {
          var d = l.charAt(f),
            p = n[d];
          if (void 0 === p) return "Unknown character " + d;
          (c = o(c) ^ p), f + 6 >= l.length || h.push(p);
        }
        return 1 !== c ? "Invalid checksum for " + t : { prefix: u, words: h };
      }
      function u(t, e, n, r) {
        for (
          var i = 0, o = 0, a = (1 << n) - 1, s = [], u = 0;
          u < t.length;
          ++u
        )
          for (i = (i << e) | t[u], o += e; o >= n; )
            (o -= n), s.push((i >> o) & a);
        if (r) o > 0 && s.push((i << (n - o)) & a);
        else {
          if (o >= e) return "Excess padding";
          if ((i << (n - o)) & a) return "Non-zero padding";
        }
        return s;
      }
      t.exports = {
        decodeUnsafe: function () {
          var t = s.apply(null, arguments);
          if ("object" === typeof t) return t;
        },
        decode: function (t) {
          var e = s.apply(null, arguments);
          if ("object" === typeof e) return e;
          throw new Error(e);
        },
        encode: function (t, n, r) {
          if (((r = r || 90), t.length + 7 + n.length > r))
            throw new TypeError("Exceeds length limit");
          var i = a((t = t.toLowerCase()));
          if ("string" === typeof i) throw new Error(i);
          for (var s = t + "1", u = 0; u < n.length; ++u) {
            var l = n[u];
            if (l >> 5 !== 0) throw new Error("Non 5-bit word");
            (i = o(i) ^ l), (s += e.charAt(l));
          }
          for (u = 0; u < 6; ++u) i = o(i);
          for (i ^= 1, u = 0; u < 6; ++u) {
            s += e.charAt((i >> (5 * (5 - u))) & 31);
          }
          return s;
        },
        toWordsUnsafe: function (t) {
          var e = u(t, 8, 5, !0);
          if (Array.isArray(e)) return e;
        },
        toWords: function (t) {
          var e = u(t, 8, 5, !0);
          if (Array.isArray(e)) return e;
          throw new Error(e);
        },
        fromWordsUnsafe: function (t) {
          var e = u(t, 5, 8, !1);
          if (Array.isArray(e)) return e;
        },
        fromWords: function (t) {
          var e = u(t, 5, 8, !1);
          if (Array.isArray(e)) return e;
          throw new Error(e);
        },
      };
    },
    3550: function (t, e, n) {
      !(function (t, e) {
        "use strict";
        function r(t, e) {
          if (!t) throw new Error(e || "Assertion failed");
        }
        function i(t, e) {
          t.super_ = e;
          var n = function () {};
          (n.prototype = e.prototype),
            (t.prototype = new n()),
            (t.prototype.constructor = t);
        }
        function o(t, e, n) {
          if (o.isBN(t)) return t;
          (this.negative = 0),
            (this.words = null),
            (this.length = 0),
            (this.red = null),
            null !== t &&
              (("le" !== e && "be" !== e) || ((n = e), (e = 10)),
              this._init(t || 0, e || 10, n || "be"));
        }
        var a;
        "object" === typeof t ? (t.exports = o) : (e.BN = o),
          (o.BN = o),
          (o.wordSize = 26);
        try {
          a =
            "undefined" !== typeof window &&
            "undefined" !== typeof window.Buffer
              ? window.Buffer
              : n(6601).Buffer;
        } catch (M) {}
        function s(t, e) {
          var n = t.charCodeAt(e);
          return n >= 65 && n <= 70
            ? n - 55
            : n >= 97 && n <= 102
            ? n - 87
            : (n - 48) & 15;
        }
        function u(t, e, n) {
          var r = s(t, n);
          return n - 1 >= e && (r |= s(t, n - 1) << 4), r;
        }
        function l(t, e, n, r) {
          for (var i = 0, o = Math.min(t.length, n), a = e; a < o; a++) {
            var s = t.charCodeAt(a) - 48;
            (i *= r), (i += s >= 49 ? s - 49 + 10 : s >= 17 ? s - 17 + 10 : s);
          }
          return i;
        }
        (o.isBN = function (t) {
          return (
            t instanceof o ||
            (null !== t &&
              "object" === typeof t &&
              t.constructor.wordSize === o.wordSize &&
              Array.isArray(t.words))
          );
        }),
          (o.max = function (t, e) {
            return t.cmp(e) > 0 ? t : e;
          }),
          (o.min = function (t, e) {
            return t.cmp(e) < 0 ? t : e;
          }),
          (o.prototype._init = function (t, e, n) {
            if ("number" === typeof t) return this._initNumber(t, e, n);
            if ("object" === typeof t) return this._initArray(t, e, n);
            "hex" === e && (e = 16), r(e === (0 | e) && e >= 2 && e <= 36);
            var i = 0;
            "-" === (t = t.toString().replace(/\s+/g, ""))[0] &&
              (i++, (this.negative = 1)),
              i < t.length &&
                (16 === e
                  ? this._parseHex(t, i, n)
                  : (this._parseBase(t, e, i),
                    "le" === n && this._initArray(this.toArray(), e, n)));
          }),
          (o.prototype._initNumber = function (t, e, n) {
            t < 0 && ((this.negative = 1), (t = -t)),
              t < 67108864
                ? ((this.words = [67108863 & t]), (this.length = 1))
                : t < 4503599627370496
                ? ((this.words = [67108863 & t, (t / 67108864) & 67108863]),
                  (this.length = 2))
                : (r(t < 9007199254740992),
                  (this.words = [67108863 & t, (t / 67108864) & 67108863, 1]),
                  (this.length = 3)),
              "le" === n && this._initArray(this.toArray(), e, n);
          }),
          (o.prototype._initArray = function (t, e, n) {
            if ((r("number" === typeof t.length), t.length <= 0))
              return (this.words = [0]), (this.length = 1), this;
            (this.length = Math.ceil(t.length / 3)),
              (this.words = new Array(this.length));
            for (var i = 0; i < this.length; i++) this.words[i] = 0;
            var o,
              a,
              s = 0;
            if ("be" === n)
              for (i = t.length - 1, o = 0; i >= 0; i -= 3)
                (a = t[i] | (t[i - 1] << 8) | (t[i - 2] << 16)),
                  (this.words[o] |= (a << s) & 67108863),
                  (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), o++);
            else if ("le" === n)
              for (i = 0, o = 0; i < t.length; i += 3)
                (a = t[i] | (t[i + 1] << 8) | (t[i + 2] << 16)),
                  (this.words[o] |= (a << s) & 67108863),
                  (this.words[o + 1] = (a >>> (26 - s)) & 67108863),
                  (s += 24) >= 26 && ((s -= 26), o++);
            return this.strip();
          }),
          (o.prototype._parseHex = function (t, e, n) {
            (this.length = Math.ceil((t.length - e) / 6)),
              (this.words = new Array(this.length));
            for (var r = 0; r < this.length; r++) this.words[r] = 0;
            var i,
              o = 0,
              a = 0;
            if ("be" === n)
              for (r = t.length - 1; r >= e; r -= 2)
                (i = u(t, e, r) << o),
                  (this.words[a] |= 67108863 & i),
                  o >= 18
                    ? ((o -= 18), (a += 1), (this.words[a] |= i >>> 26))
                    : (o += 8);
            else
              for (
                r = (t.length - e) % 2 === 0 ? e + 1 : e;
                r < t.length;
                r += 2
              )
                (i = u(t, e, r) << o),
                  (this.words[a] |= 67108863 & i),
                  o >= 18
                    ? ((o -= 18), (a += 1), (this.words[a] |= i >>> 26))
                    : (o += 8);
            this.strip();
          }),
          (o.prototype._parseBase = function (t, e, n) {
            (this.words = [0]), (this.length = 1);
            for (var r = 0, i = 1; i <= 67108863; i *= e) r++;
            r--, (i = (i / e) | 0);
            for (
              var o = t.length - n,
                a = o % r,
                s = Math.min(o, o - a) + n,
                u = 0,
                c = n;
              c < s;
              c += r
            )
              (u = l(t, c, c + r, e)),
                this.imuln(i),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u);
            if (0 !== a) {
              var h = 1;
              for (u = l(t, c, t.length, e), c = 0; c < a; c++) h *= e;
              this.imuln(h),
                this.words[0] + u < 67108864
                  ? (this.words[0] += u)
                  : this._iaddn(u);
            }
            this.strip();
          }),
          (o.prototype.copy = function (t) {
            t.words = new Array(this.length);
            for (var e = 0; e < this.length; e++) t.words[e] = this.words[e];
            (t.length = this.length),
              (t.negative = this.negative),
              (t.red = this.red);
          }),
          (o.prototype.clone = function () {
            var t = new o(null);
            return this.copy(t), t;
          }),
          (o.prototype._expand = function (t) {
            for (; this.length < t; ) this.words[this.length++] = 0;
            return this;
          }),
          (o.prototype.strip = function () {
            for (; this.length > 1 && 0 === this.words[this.length - 1]; )
              this.length--;
            return this._normSign();
          }),
          (o.prototype._normSign = function () {
            return (
              1 === this.length && 0 === this.words[0] && (this.negative = 0),
              this
            );
          }),
          (o.prototype.inspect = function () {
            return (this.red ? "<BN-R: " : "<BN: ") + this.toString(16) + ">";
          });
        var c = [
            "",
            "0",
            "00",
            "000",
            "0000",
            "00000",
            "000000",
            "0000000",
            "00000000",
            "000000000",
            "0000000000",
            "00000000000",
            "000000000000",
            "0000000000000",
            "00000000000000",
            "000000000000000",
            "0000000000000000",
            "00000000000000000",
            "000000000000000000",
            "0000000000000000000",
            "00000000000000000000",
            "000000000000000000000",
            "0000000000000000000000",
            "00000000000000000000000",
            "000000000000000000000000",
            "0000000000000000000000000",
          ],
          h = [
            0, 0, 25, 16, 12, 11, 10, 9, 8, 8, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6, 6,
            5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          ],
          f = [
            0, 0, 33554432, 43046721, 16777216, 48828125, 60466176, 40353607,
            16777216, 43046721, 1e7, 19487171, 35831808, 62748517, 7529536,
            11390625, 16777216, 24137569, 34012224, 47045881, 64e6, 4084101,
            5153632, 6436343, 7962624, 9765625, 11881376, 14348907, 17210368,
            20511149, 243e5, 28629151, 33554432, 39135393, 45435424, 52521875,
            60466176,
          ];
        function d(t, e, n) {
          n.negative = e.negative ^ t.negative;
          var r = (t.length + e.length) | 0;
          (n.length = r), (r = (r - 1) | 0);
          var i = 0 | t.words[0],
            o = 0 | e.words[0],
            a = i * o,
            s = 67108863 & a,
            u = (a / 67108864) | 0;
          n.words[0] = s;
          for (var l = 1; l < r; l++) {
            for (
              var c = u >>> 26,
                h = 67108863 & u,
                f = Math.min(l, e.length - 1),
                d = Math.max(0, l - t.length + 1);
              d <= f;
              d++
            ) {
              var p = (l - d) | 0;
              (c +=
                ((a = (i = 0 | t.words[p]) * (o = 0 | e.words[d]) + h) /
                  67108864) |
                0),
                (h = 67108863 & a);
            }
            (n.words[l] = 0 | h), (u = 0 | c);
          }
          return 0 !== u ? (n.words[l] = 0 | u) : n.length--, n.strip();
        }
        (o.prototype.toString = function (t, e) {
          var n;
          if (((e = 0 | e || 1), 16 === (t = t || 10) || "hex" === t)) {
            n = "";
            for (var i = 0, o = 0, a = 0; a < this.length; a++) {
              var s = this.words[a],
                u = (16777215 & ((s << i) | o)).toString(16);
              (n =
                0 !== (o = (s >>> (24 - i)) & 16777215) || a !== this.length - 1
                  ? c[6 - u.length] + u + n
                  : u + n),
                (i += 2) >= 26 && ((i -= 26), a--);
            }
            for (0 !== o && (n = o.toString(16) + n); n.length % e !== 0; )
              n = "0" + n;
            return 0 !== this.negative && (n = "-" + n), n;
          }
          if (t === (0 | t) && t >= 2 && t <= 36) {
            var l = h[t],
              d = f[t];
            n = "";
            var p = this.clone();
            for (p.negative = 0; !p.isZero(); ) {
              var m = p.modn(d).toString(t);
              n = (p = p.idivn(d)).isZero() ? m + n : c[l - m.length] + m + n;
            }
            for (this.isZero() && (n = "0" + n); n.length % e !== 0; )
              n = "0" + n;
            return 0 !== this.negative && (n = "-" + n), n;
          }
          r(!1, "Base should be between 2 and 36");
        }),
          (o.prototype.toNumber = function () {
            var t = this.words[0];
            return (
              2 === this.length
                ? (t += 67108864 * this.words[1])
                : 3 === this.length && 1 === this.words[2]
                ? (t += 4503599627370496 + 67108864 * this.words[1])
                : this.length > 2 &&
                  r(!1, "Number can only safely store up to 53 bits"),
              0 !== this.negative ? -t : t
            );
          }),
          (o.prototype.toJSON = function () {
            return this.toString(16);
          }),
          (o.prototype.toBuffer = function (t, e) {
            return r("undefined" !== typeof a), this.toArrayLike(a, t, e);
          }),
          (o.prototype.toArray = function (t, e) {
            return this.toArrayLike(Array, t, e);
          }),
          (o.prototype.toArrayLike = function (t, e, n) {
            var i = this.byteLength(),
              o = n || Math.max(1, i);
            r(i <= o, "byte array longer than desired length"),
              r(o > 0, "Requested array length <= 0"),
              this.strip();
            var a,
              s,
              u = "le" === e,
              l = new t(o),
              c = this.clone();
            if (u) {
              for (s = 0; !c.isZero(); s++)
                (a = c.andln(255)), c.iushrn(8), (l[s] = a);
              for (; s < o; s++) l[s] = 0;
            } else {
              for (s = 0; s < o - i; s++) l[s] = 0;
              for (s = 0; !c.isZero(); s++)
                (a = c.andln(255)), c.iushrn(8), (l[o - s - 1] = a);
            }
            return l;
          }),
          Math.clz32
            ? (o.prototype._countBits = function (t) {
                return 32 - Math.clz32(t);
              })
            : (o.prototype._countBits = function (t) {
                var e = t,
                  n = 0;
                return (
                  e >= 4096 && ((n += 13), (e >>>= 13)),
                  e >= 64 && ((n += 7), (e >>>= 7)),
                  e >= 8 && ((n += 4), (e >>>= 4)),
                  e >= 2 && ((n += 2), (e >>>= 2)),
                  n + e
                );
              }),
          (o.prototype._zeroBits = function (t) {
            if (0 === t) return 26;
            var e = t,
              n = 0;
            return (
              0 === (8191 & e) && ((n += 13), (e >>>= 13)),
              0 === (127 & e) && ((n += 7), (e >>>= 7)),
              0 === (15 & e) && ((n += 4), (e >>>= 4)),
              0 === (3 & e) && ((n += 2), (e >>>= 2)),
              0 === (1 & e) && n++,
              n
            );
          }),
          (o.prototype.bitLength = function () {
            var t = this.words[this.length - 1],
              e = this._countBits(t);
            return 26 * (this.length - 1) + e;
          }),
          (o.prototype.zeroBits = function () {
            if (this.isZero()) return 0;
            for (var t = 0, e = 0; e < this.length; e++) {
              var n = this._zeroBits(this.words[e]);
              if (((t += n), 26 !== n)) break;
            }
            return t;
          }),
          (o.prototype.byteLength = function () {
            return Math.ceil(this.bitLength() / 8);
          }),
          (o.prototype.toTwos = function (t) {
            return 0 !== this.negative
              ? this.abs().inotn(t).iaddn(1)
              : this.clone();
          }),
          (o.prototype.fromTwos = function (t) {
            return this.testn(t - 1)
              ? this.notn(t).iaddn(1).ineg()
              : this.clone();
          }),
          (o.prototype.isNeg = function () {
            return 0 !== this.negative;
          }),
          (o.prototype.neg = function () {
            return this.clone().ineg();
          }),
          (o.prototype.ineg = function () {
            return this.isZero() || (this.negative ^= 1), this;
          }),
          (o.prototype.iuor = function (t) {
            for (; this.length < t.length; ) this.words[this.length++] = 0;
            for (var e = 0; e < t.length; e++)
              this.words[e] = this.words[e] | t.words[e];
            return this.strip();
          }),
          (o.prototype.ior = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuor(t);
          }),
          (o.prototype.or = function (t) {
            return this.length > t.length
              ? this.clone().ior(t)
              : t.clone().ior(this);
          }),
          (o.prototype.uor = function (t) {
            return this.length > t.length
              ? this.clone().iuor(t)
              : t.clone().iuor(this);
          }),
          (o.prototype.iuand = function (t) {
            var e;
            e = this.length > t.length ? t : this;
            for (var n = 0; n < e.length; n++)
              this.words[n] = this.words[n] & t.words[n];
            return (this.length = e.length), this.strip();
          }),
          (o.prototype.iand = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuand(t);
          }),
          (o.prototype.and = function (t) {
            return this.length > t.length
              ? this.clone().iand(t)
              : t.clone().iand(this);
          }),
          (o.prototype.uand = function (t) {
            return this.length > t.length
              ? this.clone().iuand(t)
              : t.clone().iuand(this);
          }),
          (o.prototype.iuxor = function (t) {
            var e, n;
            this.length > t.length
              ? ((e = this), (n = t))
              : ((e = t), (n = this));
            for (var r = 0; r < n.length; r++)
              this.words[r] = e.words[r] ^ n.words[r];
            if (this !== e)
              for (; r < e.length; r++) this.words[r] = e.words[r];
            return (this.length = e.length), this.strip();
          }),
          (o.prototype.ixor = function (t) {
            return r(0 === (this.negative | t.negative)), this.iuxor(t);
          }),
          (o.prototype.xor = function (t) {
            return this.length > t.length
              ? this.clone().ixor(t)
              : t.clone().ixor(this);
          }),
          (o.prototype.uxor = function (t) {
            return this.length > t.length
              ? this.clone().iuxor(t)
              : t.clone().iuxor(this);
          }),
          (o.prototype.inotn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = 0 | Math.ceil(t / 26),
              n = t % 26;
            this._expand(e), n > 0 && e--;
            for (var i = 0; i < e; i++)
              this.words[i] = 67108863 & ~this.words[i];
            return (
              n > 0 &&
                (this.words[i] = ~this.words[i] & (67108863 >> (26 - n))),
              this.strip()
            );
          }),
          (o.prototype.notn = function (t) {
            return this.clone().inotn(t);
          }),
          (o.prototype.setn = function (t, e) {
            r("number" === typeof t && t >= 0);
            var n = (t / 26) | 0,
              i = t % 26;
            return (
              this._expand(n + 1),
              (this.words[n] = e
                ? this.words[n] | (1 << i)
                : this.words[n] & ~(1 << i)),
              this.strip()
            );
          }),
          (o.prototype.iadd = function (t) {
            var e, n, r;
            if (0 !== this.negative && 0 === t.negative)
              return (
                (this.negative = 0),
                (e = this.isub(t)),
                (this.negative ^= 1),
                this._normSign()
              );
            if (0 === this.negative && 0 !== t.negative)
              return (
                (t.negative = 0),
                (e = this.isub(t)),
                (t.negative = 1),
                e._normSign()
              );
            this.length > t.length
              ? ((n = this), (r = t))
              : ((n = t), (r = this));
            for (var i = 0, o = 0; o < r.length; o++)
              (e = (0 | n.words[o]) + (0 | r.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            for (; 0 !== i && o < n.length; o++)
              (e = (0 | n.words[o]) + i),
                (this.words[o] = 67108863 & e),
                (i = e >>> 26);
            if (((this.length = n.length), 0 !== i))
              (this.words[this.length] = i), this.length++;
            else if (n !== this)
              for (; o < n.length; o++) this.words[o] = n.words[o];
            return this;
          }),
          (o.prototype.add = function (t) {
            var e;
            return 0 !== t.negative && 0 === this.negative
              ? ((t.negative = 0), (e = this.sub(t)), (t.negative ^= 1), e)
              : 0 === t.negative && 0 !== this.negative
              ? ((this.negative = 0), (e = t.sub(this)), (this.negative = 1), e)
              : this.length > t.length
              ? this.clone().iadd(t)
              : t.clone().iadd(this);
          }),
          (o.prototype.isub = function (t) {
            if (0 !== t.negative) {
              t.negative = 0;
              var e = this.iadd(t);
              return (t.negative = 1), e._normSign();
            }
            if (0 !== this.negative)
              return (
                (this.negative = 0),
                this.iadd(t),
                (this.negative = 1),
                this._normSign()
              );
            var n,
              r,
              i = this.cmp(t);
            if (0 === i)
              return (
                (this.negative = 0),
                (this.length = 1),
                (this.words[0] = 0),
                this
              );
            i > 0 ? ((n = this), (r = t)) : ((n = t), (r = this));
            for (var o = 0, a = 0; a < r.length; a++)
              (o = (e = (0 | n.words[a]) - (0 | r.words[a]) + o) >> 26),
                (this.words[a] = 67108863 & e);
            for (; 0 !== o && a < n.length; a++)
              (o = (e = (0 | n.words[a]) + o) >> 26),
                (this.words[a] = 67108863 & e);
            if (0 === o && a < n.length && n !== this)
              for (; a < n.length; a++) this.words[a] = n.words[a];
            return (
              (this.length = Math.max(this.length, a)),
              n !== this && (this.negative = 1),
              this.strip()
            );
          }),
          (o.prototype.sub = function (t) {
            return this.clone().isub(t);
          });
        var p = function (t, e, n) {
          var r,
            i,
            o,
            a = t.words,
            s = e.words,
            u = n.words,
            l = 0,
            c = 0 | a[0],
            h = 8191 & c,
            f = c >>> 13,
            d = 0 | a[1],
            p = 8191 & d,
            m = d >>> 13,
            y = 0 | a[2],
            g = 8191 & y,
            v = y >>> 13,
            b = 0 | a[3],
            w = 8191 & b,
            x = b >>> 13,
            E = 0 | a[4],
            T = 8191 & E,
            A = E >>> 13,
            M = 0 | a[5],
            _ = 8191 & M,
            k = M >>> 13,
            S = 0 | a[6],
            P = 8191 & S,
            O = S >>> 13,
            R = 0 | a[7],
            N = 8191 & R,
            I = R >>> 13,
            C = 0 | a[8],
            L = 8191 & C,
            B = C >>> 13,
            F = 0 | a[9],
            j = 8191 & F,
            D = F >>> 13,
            U = 0 | s[0],
            V = 8191 & U,
            G = U >>> 13,
            z = 0 | s[1],
            $ = 8191 & z,
            H = z >>> 13,
            q = 0 | s[2],
            W = 8191 & q,
            X = q >>> 13,
            Z = 0 | s[3],
            K = 8191 & Z,
            J = Z >>> 13,
            Y = 0 | s[4],
            Q = 8191 & Y,
            tt = Y >>> 13,
            et = 0 | s[5],
            nt = 8191 & et,
            rt = et >>> 13,
            it = 0 | s[6],
            ot = 8191 & it,
            at = it >>> 13,
            st = 0 | s[7],
            ut = 8191 & st,
            lt = st >>> 13,
            ct = 0 | s[8],
            ht = 8191 & ct,
            ft = ct >>> 13,
            dt = 0 | s[9],
            pt = 8191 & dt,
            mt = dt >>> 13;
          (n.negative = t.negative ^ e.negative), (n.length = 19);
          var yt =
            (((l + (r = Math.imul(h, V))) | 0) +
              ((8191 & (i = ((i = Math.imul(h, G)) + Math.imul(f, V)) | 0)) <<
                13)) |
            0;
          (l = ((((o = Math.imul(f, G)) + (i >>> 13)) | 0) + (yt >>> 26)) | 0),
            (yt &= 67108863),
            (r = Math.imul(p, V)),
            (i = ((i = Math.imul(p, G)) + Math.imul(m, V)) | 0),
            (o = Math.imul(m, G));
          var gt =
            (((l + (r = (r + Math.imul(h, $)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, H)) | 0) + Math.imul(f, $)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, H)) | 0) + (i >>> 13)) | 0) +
              (gt >>> 26)) |
            0),
            (gt &= 67108863),
            (r = Math.imul(g, V)),
            (i = ((i = Math.imul(g, G)) + Math.imul(v, V)) | 0),
            (o = Math.imul(v, G)),
            (r = (r + Math.imul(p, $)) | 0),
            (i = ((i = (i + Math.imul(p, H)) | 0) + Math.imul(m, $)) | 0),
            (o = (o + Math.imul(m, H)) | 0);
          var vt =
            (((l + (r = (r + Math.imul(h, W)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, X)) | 0) + Math.imul(f, W)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, X)) | 0) + (i >>> 13)) | 0) +
              (vt >>> 26)) |
            0),
            (vt &= 67108863),
            (r = Math.imul(w, V)),
            (i = ((i = Math.imul(w, G)) + Math.imul(x, V)) | 0),
            (o = Math.imul(x, G)),
            (r = (r + Math.imul(g, $)) | 0),
            (i = ((i = (i + Math.imul(g, H)) | 0) + Math.imul(v, $)) | 0),
            (o = (o + Math.imul(v, H)) | 0),
            (r = (r + Math.imul(p, W)) | 0),
            (i = ((i = (i + Math.imul(p, X)) | 0) + Math.imul(m, W)) | 0),
            (o = (o + Math.imul(m, X)) | 0);
          var bt =
            (((l + (r = (r + Math.imul(h, K)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, J)) | 0) + Math.imul(f, K)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, J)) | 0) + (i >>> 13)) | 0) +
              (bt >>> 26)) |
            0),
            (bt &= 67108863),
            (r = Math.imul(T, V)),
            (i = ((i = Math.imul(T, G)) + Math.imul(A, V)) | 0),
            (o = Math.imul(A, G)),
            (r = (r + Math.imul(w, $)) | 0),
            (i = ((i = (i + Math.imul(w, H)) | 0) + Math.imul(x, $)) | 0),
            (o = (o + Math.imul(x, H)) | 0),
            (r = (r + Math.imul(g, W)) | 0),
            (i = ((i = (i + Math.imul(g, X)) | 0) + Math.imul(v, W)) | 0),
            (o = (o + Math.imul(v, X)) | 0),
            (r = (r + Math.imul(p, K)) | 0),
            (i = ((i = (i + Math.imul(p, J)) | 0) + Math.imul(m, K)) | 0),
            (o = (o + Math.imul(m, J)) | 0);
          var wt =
            (((l + (r = (r + Math.imul(h, Q)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, tt)) | 0) + Math.imul(f, Q)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, tt)) | 0) + (i >>> 13)) | 0) +
              (wt >>> 26)) |
            0),
            (wt &= 67108863),
            (r = Math.imul(_, V)),
            (i = ((i = Math.imul(_, G)) + Math.imul(k, V)) | 0),
            (o = Math.imul(k, G)),
            (r = (r + Math.imul(T, $)) | 0),
            (i = ((i = (i + Math.imul(T, H)) | 0) + Math.imul(A, $)) | 0),
            (o = (o + Math.imul(A, H)) | 0),
            (r = (r + Math.imul(w, W)) | 0),
            (i = ((i = (i + Math.imul(w, X)) | 0) + Math.imul(x, W)) | 0),
            (o = (o + Math.imul(x, X)) | 0),
            (r = (r + Math.imul(g, K)) | 0),
            (i = ((i = (i + Math.imul(g, J)) | 0) + Math.imul(v, K)) | 0),
            (o = (o + Math.imul(v, J)) | 0),
            (r = (r + Math.imul(p, Q)) | 0),
            (i = ((i = (i + Math.imul(p, tt)) | 0) + Math.imul(m, Q)) | 0),
            (o = (o + Math.imul(m, tt)) | 0);
          var xt =
            (((l + (r = (r + Math.imul(h, nt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, rt)) | 0) + Math.imul(f, nt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, rt)) | 0) + (i >>> 13)) | 0) +
              (xt >>> 26)) |
            0),
            (xt &= 67108863),
            (r = Math.imul(P, V)),
            (i = ((i = Math.imul(P, G)) + Math.imul(O, V)) | 0),
            (o = Math.imul(O, G)),
            (r = (r + Math.imul(_, $)) | 0),
            (i = ((i = (i + Math.imul(_, H)) | 0) + Math.imul(k, $)) | 0),
            (o = (o + Math.imul(k, H)) | 0),
            (r = (r + Math.imul(T, W)) | 0),
            (i = ((i = (i + Math.imul(T, X)) | 0) + Math.imul(A, W)) | 0),
            (o = (o + Math.imul(A, X)) | 0),
            (r = (r + Math.imul(w, K)) | 0),
            (i = ((i = (i + Math.imul(w, J)) | 0) + Math.imul(x, K)) | 0),
            (o = (o + Math.imul(x, J)) | 0),
            (r = (r + Math.imul(g, Q)) | 0),
            (i = ((i = (i + Math.imul(g, tt)) | 0) + Math.imul(v, Q)) | 0),
            (o = (o + Math.imul(v, tt)) | 0),
            (r = (r + Math.imul(p, nt)) | 0),
            (i = ((i = (i + Math.imul(p, rt)) | 0) + Math.imul(m, nt)) | 0),
            (o = (o + Math.imul(m, rt)) | 0);
          var Et =
            (((l + (r = (r + Math.imul(h, ot)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, at)) | 0) + Math.imul(f, ot)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, at)) | 0) + (i >>> 13)) | 0) +
              (Et >>> 26)) |
            0),
            (Et &= 67108863),
            (r = Math.imul(N, V)),
            (i = ((i = Math.imul(N, G)) + Math.imul(I, V)) | 0),
            (o = Math.imul(I, G)),
            (r = (r + Math.imul(P, $)) | 0),
            (i = ((i = (i + Math.imul(P, H)) | 0) + Math.imul(O, $)) | 0),
            (o = (o + Math.imul(O, H)) | 0),
            (r = (r + Math.imul(_, W)) | 0),
            (i = ((i = (i + Math.imul(_, X)) | 0) + Math.imul(k, W)) | 0),
            (o = (o + Math.imul(k, X)) | 0),
            (r = (r + Math.imul(T, K)) | 0),
            (i = ((i = (i + Math.imul(T, J)) | 0) + Math.imul(A, K)) | 0),
            (o = (o + Math.imul(A, J)) | 0),
            (r = (r + Math.imul(w, Q)) | 0),
            (i = ((i = (i + Math.imul(w, tt)) | 0) + Math.imul(x, Q)) | 0),
            (o = (o + Math.imul(x, tt)) | 0),
            (r = (r + Math.imul(g, nt)) | 0),
            (i = ((i = (i + Math.imul(g, rt)) | 0) + Math.imul(v, nt)) | 0),
            (o = (o + Math.imul(v, rt)) | 0),
            (r = (r + Math.imul(p, ot)) | 0),
            (i = ((i = (i + Math.imul(p, at)) | 0) + Math.imul(m, ot)) | 0),
            (o = (o + Math.imul(m, at)) | 0);
          var Tt =
            (((l + (r = (r + Math.imul(h, ut)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, lt)) | 0) + Math.imul(f, ut)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, lt)) | 0) + (i >>> 13)) | 0) +
              (Tt >>> 26)) |
            0),
            (Tt &= 67108863),
            (r = Math.imul(L, V)),
            (i = ((i = Math.imul(L, G)) + Math.imul(B, V)) | 0),
            (o = Math.imul(B, G)),
            (r = (r + Math.imul(N, $)) | 0),
            (i = ((i = (i + Math.imul(N, H)) | 0) + Math.imul(I, $)) | 0),
            (o = (o + Math.imul(I, H)) | 0),
            (r = (r + Math.imul(P, W)) | 0),
            (i = ((i = (i + Math.imul(P, X)) | 0) + Math.imul(O, W)) | 0),
            (o = (o + Math.imul(O, X)) | 0),
            (r = (r + Math.imul(_, K)) | 0),
            (i = ((i = (i + Math.imul(_, J)) | 0) + Math.imul(k, K)) | 0),
            (o = (o + Math.imul(k, J)) | 0),
            (r = (r + Math.imul(T, Q)) | 0),
            (i = ((i = (i + Math.imul(T, tt)) | 0) + Math.imul(A, Q)) | 0),
            (o = (o + Math.imul(A, tt)) | 0),
            (r = (r + Math.imul(w, nt)) | 0),
            (i = ((i = (i + Math.imul(w, rt)) | 0) + Math.imul(x, nt)) | 0),
            (o = (o + Math.imul(x, rt)) | 0),
            (r = (r + Math.imul(g, ot)) | 0),
            (i = ((i = (i + Math.imul(g, at)) | 0) + Math.imul(v, ot)) | 0),
            (o = (o + Math.imul(v, at)) | 0),
            (r = (r + Math.imul(p, ut)) | 0),
            (i = ((i = (i + Math.imul(p, lt)) | 0) + Math.imul(m, ut)) | 0),
            (o = (o + Math.imul(m, lt)) | 0);
          var At =
            (((l + (r = (r + Math.imul(h, ht)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, ft)) | 0) + Math.imul(f, ht)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, ft)) | 0) + (i >>> 13)) | 0) +
              (At >>> 26)) |
            0),
            (At &= 67108863),
            (r = Math.imul(j, V)),
            (i = ((i = Math.imul(j, G)) + Math.imul(D, V)) | 0),
            (o = Math.imul(D, G)),
            (r = (r + Math.imul(L, $)) | 0),
            (i = ((i = (i + Math.imul(L, H)) | 0) + Math.imul(B, $)) | 0),
            (o = (o + Math.imul(B, H)) | 0),
            (r = (r + Math.imul(N, W)) | 0),
            (i = ((i = (i + Math.imul(N, X)) | 0) + Math.imul(I, W)) | 0),
            (o = (o + Math.imul(I, X)) | 0),
            (r = (r + Math.imul(P, K)) | 0),
            (i = ((i = (i + Math.imul(P, J)) | 0) + Math.imul(O, K)) | 0),
            (o = (o + Math.imul(O, J)) | 0),
            (r = (r + Math.imul(_, Q)) | 0),
            (i = ((i = (i + Math.imul(_, tt)) | 0) + Math.imul(k, Q)) | 0),
            (o = (o + Math.imul(k, tt)) | 0),
            (r = (r + Math.imul(T, nt)) | 0),
            (i = ((i = (i + Math.imul(T, rt)) | 0) + Math.imul(A, nt)) | 0),
            (o = (o + Math.imul(A, rt)) | 0),
            (r = (r + Math.imul(w, ot)) | 0),
            (i = ((i = (i + Math.imul(w, at)) | 0) + Math.imul(x, ot)) | 0),
            (o = (o + Math.imul(x, at)) | 0),
            (r = (r + Math.imul(g, ut)) | 0),
            (i = ((i = (i + Math.imul(g, lt)) | 0) + Math.imul(v, ut)) | 0),
            (o = (o + Math.imul(v, lt)) | 0),
            (r = (r + Math.imul(p, ht)) | 0),
            (i = ((i = (i + Math.imul(p, ft)) | 0) + Math.imul(m, ht)) | 0),
            (o = (o + Math.imul(m, ft)) | 0);
          var Mt =
            (((l + (r = (r + Math.imul(h, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(h, mt)) | 0) + Math.imul(f, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(f, mt)) | 0) + (i >>> 13)) | 0) +
              (Mt >>> 26)) |
            0),
            (Mt &= 67108863),
            (r = Math.imul(j, $)),
            (i = ((i = Math.imul(j, H)) + Math.imul(D, $)) | 0),
            (o = Math.imul(D, H)),
            (r = (r + Math.imul(L, W)) | 0),
            (i = ((i = (i + Math.imul(L, X)) | 0) + Math.imul(B, W)) | 0),
            (o = (o + Math.imul(B, X)) | 0),
            (r = (r + Math.imul(N, K)) | 0),
            (i = ((i = (i + Math.imul(N, J)) | 0) + Math.imul(I, K)) | 0),
            (o = (o + Math.imul(I, J)) | 0),
            (r = (r + Math.imul(P, Q)) | 0),
            (i = ((i = (i + Math.imul(P, tt)) | 0) + Math.imul(O, Q)) | 0),
            (o = (o + Math.imul(O, tt)) | 0),
            (r = (r + Math.imul(_, nt)) | 0),
            (i = ((i = (i + Math.imul(_, rt)) | 0) + Math.imul(k, nt)) | 0),
            (o = (o + Math.imul(k, rt)) | 0),
            (r = (r + Math.imul(T, ot)) | 0),
            (i = ((i = (i + Math.imul(T, at)) | 0) + Math.imul(A, ot)) | 0),
            (o = (o + Math.imul(A, at)) | 0),
            (r = (r + Math.imul(w, ut)) | 0),
            (i = ((i = (i + Math.imul(w, lt)) | 0) + Math.imul(x, ut)) | 0),
            (o = (o + Math.imul(x, lt)) | 0),
            (r = (r + Math.imul(g, ht)) | 0),
            (i = ((i = (i + Math.imul(g, ft)) | 0) + Math.imul(v, ht)) | 0),
            (o = (o + Math.imul(v, ft)) | 0);
          var _t =
            (((l + (r = (r + Math.imul(p, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(p, mt)) | 0) + Math.imul(m, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(m, mt)) | 0) + (i >>> 13)) | 0) +
              (_t >>> 26)) |
            0),
            (_t &= 67108863),
            (r = Math.imul(j, W)),
            (i = ((i = Math.imul(j, X)) + Math.imul(D, W)) | 0),
            (o = Math.imul(D, X)),
            (r = (r + Math.imul(L, K)) | 0),
            (i = ((i = (i + Math.imul(L, J)) | 0) + Math.imul(B, K)) | 0),
            (o = (o + Math.imul(B, J)) | 0),
            (r = (r + Math.imul(N, Q)) | 0),
            (i = ((i = (i + Math.imul(N, tt)) | 0) + Math.imul(I, Q)) | 0),
            (o = (o + Math.imul(I, tt)) | 0),
            (r = (r + Math.imul(P, nt)) | 0),
            (i = ((i = (i + Math.imul(P, rt)) | 0) + Math.imul(O, nt)) | 0),
            (o = (o + Math.imul(O, rt)) | 0),
            (r = (r + Math.imul(_, ot)) | 0),
            (i = ((i = (i + Math.imul(_, at)) | 0) + Math.imul(k, ot)) | 0),
            (o = (o + Math.imul(k, at)) | 0),
            (r = (r + Math.imul(T, ut)) | 0),
            (i = ((i = (i + Math.imul(T, lt)) | 0) + Math.imul(A, ut)) | 0),
            (o = (o + Math.imul(A, lt)) | 0),
            (r = (r + Math.imul(w, ht)) | 0),
            (i = ((i = (i + Math.imul(w, ft)) | 0) + Math.imul(x, ht)) | 0),
            (o = (o + Math.imul(x, ft)) | 0);
          var kt =
            (((l + (r = (r + Math.imul(g, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(g, mt)) | 0) + Math.imul(v, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(v, mt)) | 0) + (i >>> 13)) | 0) +
              (kt >>> 26)) |
            0),
            (kt &= 67108863),
            (r = Math.imul(j, K)),
            (i = ((i = Math.imul(j, J)) + Math.imul(D, K)) | 0),
            (o = Math.imul(D, J)),
            (r = (r + Math.imul(L, Q)) | 0),
            (i = ((i = (i + Math.imul(L, tt)) | 0) + Math.imul(B, Q)) | 0),
            (o = (o + Math.imul(B, tt)) | 0),
            (r = (r + Math.imul(N, nt)) | 0),
            (i = ((i = (i + Math.imul(N, rt)) | 0) + Math.imul(I, nt)) | 0),
            (o = (o + Math.imul(I, rt)) | 0),
            (r = (r + Math.imul(P, ot)) | 0),
            (i = ((i = (i + Math.imul(P, at)) | 0) + Math.imul(O, ot)) | 0),
            (o = (o + Math.imul(O, at)) | 0),
            (r = (r + Math.imul(_, ut)) | 0),
            (i = ((i = (i + Math.imul(_, lt)) | 0) + Math.imul(k, ut)) | 0),
            (o = (o + Math.imul(k, lt)) | 0),
            (r = (r + Math.imul(T, ht)) | 0),
            (i = ((i = (i + Math.imul(T, ft)) | 0) + Math.imul(A, ht)) | 0),
            (o = (o + Math.imul(A, ft)) | 0);
          var St =
            (((l + (r = (r + Math.imul(w, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(w, mt)) | 0) + Math.imul(x, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(x, mt)) | 0) + (i >>> 13)) | 0) +
              (St >>> 26)) |
            0),
            (St &= 67108863),
            (r = Math.imul(j, Q)),
            (i = ((i = Math.imul(j, tt)) + Math.imul(D, Q)) | 0),
            (o = Math.imul(D, tt)),
            (r = (r + Math.imul(L, nt)) | 0),
            (i = ((i = (i + Math.imul(L, rt)) | 0) + Math.imul(B, nt)) | 0),
            (o = (o + Math.imul(B, rt)) | 0),
            (r = (r + Math.imul(N, ot)) | 0),
            (i = ((i = (i + Math.imul(N, at)) | 0) + Math.imul(I, ot)) | 0),
            (o = (o + Math.imul(I, at)) | 0),
            (r = (r + Math.imul(P, ut)) | 0),
            (i = ((i = (i + Math.imul(P, lt)) | 0) + Math.imul(O, ut)) | 0),
            (o = (o + Math.imul(O, lt)) | 0),
            (r = (r + Math.imul(_, ht)) | 0),
            (i = ((i = (i + Math.imul(_, ft)) | 0) + Math.imul(k, ht)) | 0),
            (o = (o + Math.imul(k, ft)) | 0);
          var Pt =
            (((l + (r = (r + Math.imul(T, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(T, mt)) | 0) + Math.imul(A, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(A, mt)) | 0) + (i >>> 13)) | 0) +
              (Pt >>> 26)) |
            0),
            (Pt &= 67108863),
            (r = Math.imul(j, nt)),
            (i = ((i = Math.imul(j, rt)) + Math.imul(D, nt)) | 0),
            (o = Math.imul(D, rt)),
            (r = (r + Math.imul(L, ot)) | 0),
            (i = ((i = (i + Math.imul(L, at)) | 0) + Math.imul(B, ot)) | 0),
            (o = (o + Math.imul(B, at)) | 0),
            (r = (r + Math.imul(N, ut)) | 0),
            (i = ((i = (i + Math.imul(N, lt)) | 0) + Math.imul(I, ut)) | 0),
            (o = (o + Math.imul(I, lt)) | 0),
            (r = (r + Math.imul(P, ht)) | 0),
            (i = ((i = (i + Math.imul(P, ft)) | 0) + Math.imul(O, ht)) | 0),
            (o = (o + Math.imul(O, ft)) | 0);
          var Ot =
            (((l + (r = (r + Math.imul(_, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(_, mt)) | 0) + Math.imul(k, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(k, mt)) | 0) + (i >>> 13)) | 0) +
              (Ot >>> 26)) |
            0),
            (Ot &= 67108863),
            (r = Math.imul(j, ot)),
            (i = ((i = Math.imul(j, at)) + Math.imul(D, ot)) | 0),
            (o = Math.imul(D, at)),
            (r = (r + Math.imul(L, ut)) | 0),
            (i = ((i = (i + Math.imul(L, lt)) | 0) + Math.imul(B, ut)) | 0),
            (o = (o + Math.imul(B, lt)) | 0),
            (r = (r + Math.imul(N, ht)) | 0),
            (i = ((i = (i + Math.imul(N, ft)) | 0) + Math.imul(I, ht)) | 0),
            (o = (o + Math.imul(I, ft)) | 0);
          var Rt =
            (((l + (r = (r + Math.imul(P, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(P, mt)) | 0) + Math.imul(O, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(O, mt)) | 0) + (i >>> 13)) | 0) +
              (Rt >>> 26)) |
            0),
            (Rt &= 67108863),
            (r = Math.imul(j, ut)),
            (i = ((i = Math.imul(j, lt)) + Math.imul(D, ut)) | 0),
            (o = Math.imul(D, lt)),
            (r = (r + Math.imul(L, ht)) | 0),
            (i = ((i = (i + Math.imul(L, ft)) | 0) + Math.imul(B, ht)) | 0),
            (o = (o + Math.imul(B, ft)) | 0);
          var Nt =
            (((l + (r = (r + Math.imul(N, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(N, mt)) | 0) + Math.imul(I, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(I, mt)) | 0) + (i >>> 13)) | 0) +
              (Nt >>> 26)) |
            0),
            (Nt &= 67108863),
            (r = Math.imul(j, ht)),
            (i = ((i = Math.imul(j, ft)) + Math.imul(D, ht)) | 0),
            (o = Math.imul(D, ft));
          var It =
            (((l + (r = (r + Math.imul(L, pt)) | 0)) | 0) +
              ((8191 &
                (i =
                  ((i = (i + Math.imul(L, mt)) | 0) + Math.imul(B, pt)) | 0)) <<
                13)) |
            0;
          (l =
            ((((o = (o + Math.imul(B, mt)) | 0) + (i >>> 13)) | 0) +
              (It >>> 26)) |
            0),
            (It &= 67108863);
          var Ct =
            (((l + (r = Math.imul(j, pt))) | 0) +
              ((8191 & (i = ((i = Math.imul(j, mt)) + Math.imul(D, pt)) | 0)) <<
                13)) |
            0;
          return (
            (l =
              ((((o = Math.imul(D, mt)) + (i >>> 13)) | 0) + (Ct >>> 26)) | 0),
            (Ct &= 67108863),
            (u[0] = yt),
            (u[1] = gt),
            (u[2] = vt),
            (u[3] = bt),
            (u[4] = wt),
            (u[5] = xt),
            (u[6] = Et),
            (u[7] = Tt),
            (u[8] = At),
            (u[9] = Mt),
            (u[10] = _t),
            (u[11] = kt),
            (u[12] = St),
            (u[13] = Pt),
            (u[14] = Ot),
            (u[15] = Rt),
            (u[16] = Nt),
            (u[17] = It),
            (u[18] = Ct),
            0 !== l && ((u[19] = l), n.length++),
            n
          );
        };
        function m(t, e, n) {
          return new y().mulp(t, e, n);
        }
        function y(t, e) {
          (this.x = t), (this.y = e);
        }
        Math.imul || (p = d),
          (o.prototype.mulTo = function (t, e) {
            var n,
              r = this.length + t.length;
            return (
              (n =
                10 === this.length && 10 === t.length
                  ? p(this, t, e)
                  : r < 63
                  ? d(this, t, e)
                  : r < 1024
                  ? (function (t, e, n) {
                      (n.negative = e.negative ^ t.negative),
                        (n.length = t.length + e.length);
                      for (var r = 0, i = 0, o = 0; o < n.length - 1; o++) {
                        var a = i;
                        i = 0;
                        for (
                          var s = 67108863 & r,
                            u = Math.min(o, e.length - 1),
                            l = Math.max(0, o - t.length + 1);
                          l <= u;
                          l++
                        ) {
                          var c = o - l,
                            h = (0 | t.words[c]) * (0 | e.words[l]),
                            f = 67108863 & h;
                          (s = 67108863 & (f = (f + s) | 0)),
                            (i +=
                              (a =
                                ((a = (a + ((h / 67108864) | 0)) | 0) +
                                  (f >>> 26)) |
                                0) >>> 26),
                            (a &= 67108863);
                        }
                        (n.words[o] = s), (r = a), (a = i);
                      }
                      return 0 !== r ? (n.words[o] = r) : n.length--, n.strip();
                    })(this, t, e)
                  : m(this, t, e)),
              n
            );
          }),
          (y.prototype.makeRBT = function (t) {
            for (
              var e = new Array(t), n = o.prototype._countBits(t) - 1, r = 0;
              r < t;
              r++
            )
              e[r] = this.revBin(r, n, t);
            return e;
          }),
          (y.prototype.revBin = function (t, e, n) {
            if (0 === t || t === n - 1) return t;
            for (var r = 0, i = 0; i < e; i++)
              (r |= (1 & t) << (e - i - 1)), (t >>= 1);
            return r;
          }),
          (y.prototype.permute = function (t, e, n, r, i, o) {
            for (var a = 0; a < o; a++) (r[a] = e[t[a]]), (i[a] = n[t[a]]);
          }),
          (y.prototype.transform = function (t, e, n, r, i, o) {
            this.permute(o, t, e, n, r, i);
            for (var a = 1; a < i; a <<= 1)
              for (
                var s = a << 1,
                  u = Math.cos((2 * Math.PI) / s),
                  l = Math.sin((2 * Math.PI) / s),
                  c = 0;
                c < i;
                c += s
              )
                for (var h = u, f = l, d = 0; d < a; d++) {
                  var p = n[c + d],
                    m = r[c + d],
                    y = n[c + d + a],
                    g = r[c + d + a],
                    v = h * y - f * g;
                  (g = h * g + f * y),
                    (y = v),
                    (n[c + d] = p + y),
                    (r[c + d] = m + g),
                    (n[c + d + a] = p - y),
                    (r[c + d + a] = m - g),
                    d !== s &&
                      ((v = u * h - l * f), (f = u * f + l * h), (h = v));
                }
          }),
          (y.prototype.guessLen13b = function (t, e) {
            var n = 1 | Math.max(e, t),
              r = 1 & n,
              i = 0;
            for (n = (n / 2) | 0; n; n >>>= 1) i++;
            return 1 << (i + 1 + r);
          }),
          (y.prototype.conjugate = function (t, e, n) {
            if (!(n <= 1))
              for (var r = 0; r < n / 2; r++) {
                var i = t[r];
                (t[r] = t[n - r - 1]),
                  (t[n - r - 1] = i),
                  (i = e[r]),
                  (e[r] = -e[n - r - 1]),
                  (e[n - r - 1] = -i);
              }
          }),
          (y.prototype.normalize13b = function (t, e) {
            for (var n = 0, r = 0; r < e / 2; r++) {
              var i =
                8192 * Math.round(t[2 * r + 1] / e) +
                Math.round(t[2 * r] / e) +
                n;
              (t[r] = 67108863 & i),
                (n = i < 67108864 ? 0 : (i / 67108864) | 0);
            }
            return t;
          }),
          (y.prototype.convert13b = function (t, e, n, i) {
            for (var o = 0, a = 0; a < e; a++)
              (o += 0 | t[a]),
                (n[2 * a] = 8191 & o),
                (o >>>= 13),
                (n[2 * a + 1] = 8191 & o),
                (o >>>= 13);
            for (a = 2 * e; a < i; ++a) n[a] = 0;
            r(0 === o), r(0 === (-8192 & o));
          }),
          (y.prototype.stub = function (t) {
            for (var e = new Array(t), n = 0; n < t; n++) e[n] = 0;
            return e;
          }),
          (y.prototype.mulp = function (t, e, n) {
            var r = 2 * this.guessLen13b(t.length, e.length),
              i = this.makeRBT(r),
              o = this.stub(r),
              a = new Array(r),
              s = new Array(r),
              u = new Array(r),
              l = new Array(r),
              c = new Array(r),
              h = new Array(r),
              f = n.words;
            (f.length = r),
              this.convert13b(t.words, t.length, a, r),
              this.convert13b(e.words, e.length, l, r),
              this.transform(a, o, s, u, r, i),
              this.transform(l, o, c, h, r, i);
            for (var d = 0; d < r; d++) {
              var p = s[d] * c[d] - u[d] * h[d];
              (u[d] = s[d] * h[d] + u[d] * c[d]), (s[d] = p);
            }
            return (
              this.conjugate(s, u, r),
              this.transform(s, u, f, o, r, i),
              this.conjugate(f, o, r),
              this.normalize13b(f, r),
              (n.negative = t.negative ^ e.negative),
              (n.length = t.length + e.length),
              n.strip()
            );
          }),
          (o.prototype.mul = function (t) {
            var e = new o(null);
            return (
              (e.words = new Array(this.length + t.length)), this.mulTo(t, e)
            );
          }),
          (o.prototype.mulf = function (t) {
            var e = new o(null);
            return (e.words = new Array(this.length + t.length)), m(this, t, e);
          }),
          (o.prototype.imul = function (t) {
            return this.clone().mulTo(t, this);
          }),
          (o.prototype.imuln = function (t) {
            r("number" === typeof t), r(t < 67108864);
            for (var e = 0, n = 0; n < this.length; n++) {
              var i = (0 | this.words[n]) * t,
                o = (67108863 & i) + (67108863 & e);
              (e >>= 26),
                (e += (i / 67108864) | 0),
                (e += o >>> 26),
                (this.words[n] = 67108863 & o);
            }
            return 0 !== e && ((this.words[n] = e), this.length++), this;
          }),
          (o.prototype.muln = function (t) {
            return this.clone().imuln(t);
          }),
          (o.prototype.sqr = function () {
            return this.mul(this);
          }),
          (o.prototype.isqr = function () {
            return this.imul(this.clone());
          }),
          (o.prototype.pow = function (t) {
            var e = (function (t) {
              for (var e = new Array(t.bitLength()), n = 0; n < e.length; n++) {
                var r = (n / 26) | 0,
                  i = n % 26;
                e[n] = (t.words[r] & (1 << i)) >>> i;
              }
              return e;
            })(t);
            if (0 === e.length) return new o(1);
            for (
              var n = this, r = 0;
              r < e.length && 0 === e[r];
              r++, n = n.sqr()
            );
            if (++r < e.length)
              for (var i = n.sqr(); r < e.length; r++, i = i.sqr())
                0 !== e[r] && (n = n.mul(i));
            return n;
          }),
          (o.prototype.iushln = function (t) {
            r("number" === typeof t && t >= 0);
            var e,
              n = t % 26,
              i = (t - n) / 26,
              o = (67108863 >>> (26 - n)) << (26 - n);
            if (0 !== n) {
              var a = 0;
              for (e = 0; e < this.length; e++) {
                var s = this.words[e] & o,
                  u = ((0 | this.words[e]) - s) << n;
                (this.words[e] = u | a), (a = s >>> (26 - n));
              }
              a && ((this.words[e] = a), this.length++);
            }
            if (0 !== i) {
              for (e = this.length - 1; e >= 0; e--)
                this.words[e + i] = this.words[e];
              for (e = 0; e < i; e++) this.words[e] = 0;
              this.length += i;
            }
            return this.strip();
          }),
          (o.prototype.ishln = function (t) {
            return r(0 === this.negative), this.iushln(t);
          }),
          (o.prototype.iushrn = function (t, e, n) {
            var i;
            r("number" === typeof t && t >= 0),
              (i = e ? (e - (e % 26)) / 26 : 0);
            var o = t % 26,
              a = Math.min((t - o) / 26, this.length),
              s = 67108863 ^ ((67108863 >>> o) << o),
              u = n;
            if (((i -= a), (i = Math.max(0, i)), u)) {
              for (var l = 0; l < a; l++) u.words[l] = this.words[l];
              u.length = a;
            }
            if (0 === a);
            else if (this.length > a)
              for (this.length -= a, l = 0; l < this.length; l++)
                this.words[l] = this.words[l + a];
            else (this.words[0] = 0), (this.length = 1);
            var c = 0;
            for (l = this.length - 1; l >= 0 && (0 !== c || l >= i); l--) {
              var h = 0 | this.words[l];
              (this.words[l] = (c << (26 - o)) | (h >>> o)), (c = h & s);
            }
            return (
              u && 0 !== c && (u.words[u.length++] = c),
              0 === this.length && ((this.words[0] = 0), (this.length = 1)),
              this.strip()
            );
          }),
          (o.prototype.ishrn = function (t, e, n) {
            return r(0 === this.negative), this.iushrn(t, e, n);
          }),
          (o.prototype.shln = function (t) {
            return this.clone().ishln(t);
          }),
          (o.prototype.ushln = function (t) {
            return this.clone().iushln(t);
          }),
          (o.prototype.shrn = function (t) {
            return this.clone().ishrn(t);
          }),
          (o.prototype.ushrn = function (t) {
            return this.clone().iushrn(t);
          }),
          (o.prototype.testn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = t % 26,
              n = (t - e) / 26,
              i = 1 << e;
            return !(this.length <= n) && !!(this.words[n] & i);
          }),
          (o.prototype.imaskn = function (t) {
            r("number" === typeof t && t >= 0);
            var e = t % 26,
              n = (t - e) / 26;
            if (
              (r(
                0 === this.negative,
                "imaskn works only with positive numbers"
              ),
              this.length <= n)
            )
              return this;
            if (
              (0 !== e && n++,
              (this.length = Math.min(n, this.length)),
              0 !== e)
            ) {
              var i = 67108863 ^ ((67108863 >>> e) << e);
              this.words[this.length - 1] &= i;
            }
            return this.strip();
          }),
          (o.prototype.maskn = function (t) {
            return this.clone().imaskn(t);
          }),
          (o.prototype.iaddn = function (t) {
            return (
              r("number" === typeof t),
              r(t < 67108864),
              t < 0
                ? this.isubn(-t)
                : 0 !== this.negative
                ? 1 === this.length && (0 | this.words[0]) < t
                  ? ((this.words[0] = t - (0 | this.words[0])),
                    (this.negative = 0),
                    this)
                  : ((this.negative = 0),
                    this.isubn(t),
                    (this.negative = 1),
                    this)
                : this._iaddn(t)
            );
          }),
          (o.prototype._iaddn = function (t) {
            this.words[0] += t;
            for (var e = 0; e < this.length && this.words[e] >= 67108864; e++)
              (this.words[e] -= 67108864),
                e === this.length - 1
                  ? (this.words[e + 1] = 1)
                  : this.words[e + 1]++;
            return (this.length = Math.max(this.length, e + 1)), this;
          }),
          (o.prototype.isubn = function (t) {
            if ((r("number" === typeof t), r(t < 67108864), t < 0))
              return this.iaddn(-t);
            if (0 !== this.negative)
              return (
                (this.negative = 0), this.iaddn(t), (this.negative = 1), this
              );
            if (((this.words[0] -= t), 1 === this.length && this.words[0] < 0))
              (this.words[0] = -this.words[0]), (this.negative = 1);
            else
              for (var e = 0; e < this.length && this.words[e] < 0; e++)
                (this.words[e] += 67108864), (this.words[e + 1] -= 1);
            return this.strip();
          }),
          (o.prototype.addn = function (t) {
            return this.clone().iaddn(t);
          }),
          (o.prototype.subn = function (t) {
            return this.clone().isubn(t);
          }),
          (o.prototype.iabs = function () {
            return (this.negative = 0), this;
          }),
          (o.prototype.abs = function () {
            return this.clone().iabs();
          }),
          (o.prototype._ishlnsubmul = function (t, e, n) {
            var i,
              o,
              a = t.length + n;
            this._expand(a);
            var s = 0;
            for (i = 0; i < t.length; i++) {
              o = (0 | this.words[i + n]) + s;
              var u = (0 | t.words[i]) * e;
              (s = ((o -= 67108863 & u) >> 26) - ((u / 67108864) | 0)),
                (this.words[i + n] = 67108863 & o);
            }
            for (; i < this.length - n; i++)
              (s = (o = (0 | this.words[i + n]) + s) >> 26),
                (this.words[i + n] = 67108863 & o);
            if (0 === s) return this.strip();
            for (r(-1 === s), s = 0, i = 0; i < this.length; i++)
              (s = (o = -(0 | this.words[i]) + s) >> 26),
                (this.words[i] = 67108863 & o);
            return (this.negative = 1), this.strip();
          }),
          (o.prototype._wordDiv = function (t, e) {
            var n = (this.length, t.length),
              r = this.clone(),
              i = t,
              a = 0 | i.words[i.length - 1];
            0 !== (n = 26 - this._countBits(a)) &&
              ((i = i.ushln(n)), r.iushln(n), (a = 0 | i.words[i.length - 1]));
            var s,
              u = r.length - i.length;
            if ("mod" !== e) {
              ((s = new o(null)).length = u + 1),
                (s.words = new Array(s.length));
              for (var l = 0; l < s.length; l++) s.words[l] = 0;
            }
            var c = r.clone()._ishlnsubmul(i, 1, u);
            0 === c.negative && ((r = c), s && (s.words[u] = 1));
            for (var h = u - 1; h >= 0; h--) {
              var f =
                67108864 * (0 | r.words[i.length + h]) +
                (0 | r.words[i.length + h - 1]);
              for (
                f = Math.min((f / a) | 0, 67108863), r._ishlnsubmul(i, f, h);
                0 !== r.negative;

              )
                f--,
                  (r.negative = 0),
                  r._ishlnsubmul(i, 1, h),
                  r.isZero() || (r.negative ^= 1);
              s && (s.words[h] = f);
            }
            return (
              s && s.strip(),
              r.strip(),
              "div" !== e && 0 !== n && r.iushrn(n),
              { div: s || null, mod: r }
            );
          }),
          (o.prototype.divmod = function (t, e, n) {
            return (
              r(!t.isZero()),
              this.isZero()
                ? { div: new o(0), mod: new o(0) }
                : 0 !== this.negative && 0 === t.negative
                ? ((s = this.neg().divmod(t, e)),
                  "mod" !== e && (i = s.div.neg()),
                  "div" !== e &&
                    ((a = s.mod.neg()), n && 0 !== a.negative && a.iadd(t)),
                  { div: i, mod: a })
                : 0 === this.negative && 0 !== t.negative
                ? ((s = this.divmod(t.neg(), e)),
                  "mod" !== e && (i = s.div.neg()),
                  { div: i, mod: s.mod })
                : 0 !== (this.negative & t.negative)
                ? ((s = this.neg().divmod(t.neg(), e)),
                  "div" !== e &&
                    ((a = s.mod.neg()), n && 0 !== a.negative && a.isub(t)),
                  { div: s.div, mod: a })
                : t.length > this.length || this.cmp(t) < 0
                ? { div: new o(0), mod: this }
                : 1 === t.length
                ? "div" === e
                  ? { div: this.divn(t.words[0]), mod: null }
                  : "mod" === e
                  ? { div: null, mod: new o(this.modn(t.words[0])) }
                  : {
                      div: this.divn(t.words[0]),
                      mod: new o(this.modn(t.words[0])),
                    }
                : this._wordDiv(t, e)
            );
            var i, a, s;
          }),
          (o.prototype.div = function (t) {
            return this.divmod(t, "div", !1).div;
          }),
          (o.prototype.mod = function (t) {
            return this.divmod(t, "mod", !1).mod;
          }),
          (o.prototype.umod = function (t) {
            return this.divmod(t, "mod", !0).mod;
          }),
          (o.prototype.divRound = function (t) {
            var e = this.divmod(t);
            if (e.mod.isZero()) return e.div;
            var n = 0 !== e.div.negative ? e.mod.isub(t) : e.mod,
              r = t.ushrn(1),
              i = t.andln(1),
              o = n.cmp(r);
            return o < 0 || (1 === i && 0 === o)
              ? e.div
              : 0 !== e.div.negative
              ? e.div.isubn(1)
              : e.div.iaddn(1);
          }),
          (o.prototype.modn = function (t) {
            r(t <= 67108863);
            for (var e = (1 << 26) % t, n = 0, i = this.length - 1; i >= 0; i--)
              n = (e * n + (0 | this.words[i])) % t;
            return n;
          }),
          (o.prototype.idivn = function (t) {
            r(t <= 67108863);
            for (var e = 0, n = this.length - 1; n >= 0; n--) {
              var i = (0 | this.words[n]) + 67108864 * e;
              (this.words[n] = (i / t) | 0), (e = i % t);
            }
            return this.strip();
          }),
          (o.prototype.divn = function (t) {
            return this.clone().idivn(t);
          }),
          (o.prototype.egcd = function (t) {
            r(0 === t.negative), r(!t.isZero());
            var e = this,
              n = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i = new o(1), a = new o(0), s = new o(0), u = new o(1), l = 0;
              e.isEven() && n.isEven();

            )
              e.iushrn(1), n.iushrn(1), ++l;
            for (var c = n.clone(), h = e.clone(); !e.isZero(); ) {
              for (
                var f = 0, d = 1;
                0 === (e.words[0] & d) && f < 26;
                ++f, d <<= 1
              );
              if (f > 0)
                for (e.iushrn(f); f-- > 0; )
                  (i.isOdd() || a.isOdd()) && (i.iadd(c), a.isub(h)),
                    i.iushrn(1),
                    a.iushrn(1);
              for (
                var p = 0, m = 1;
                0 === (n.words[0] & m) && p < 26;
                ++p, m <<= 1
              );
              if (p > 0)
                for (n.iushrn(p); p-- > 0; )
                  (s.isOdd() || u.isOdd()) && (s.iadd(c), u.isub(h)),
                    s.iushrn(1),
                    u.iushrn(1);
              e.cmp(n) >= 0
                ? (e.isub(n), i.isub(s), a.isub(u))
                : (n.isub(e), s.isub(i), u.isub(a));
            }
            return { a: s, b: u, gcd: n.iushln(l) };
          }),
          (o.prototype._invmp = function (t) {
            r(0 === t.negative), r(!t.isZero());
            var e = this,
              n = t.clone();
            e = 0 !== e.negative ? e.umod(t) : e.clone();
            for (
              var i, a = new o(1), s = new o(0), u = n.clone();
              e.cmpn(1) > 0 && n.cmpn(1) > 0;

            ) {
              for (
                var l = 0, c = 1;
                0 === (e.words[0] & c) && l < 26;
                ++l, c <<= 1
              );
              if (l > 0)
                for (e.iushrn(l); l-- > 0; )
                  a.isOdd() && a.iadd(u), a.iushrn(1);
              for (
                var h = 0, f = 1;
                0 === (n.words[0] & f) && h < 26;
                ++h, f <<= 1
              );
              if (h > 0)
                for (n.iushrn(h); h-- > 0; )
                  s.isOdd() && s.iadd(u), s.iushrn(1);
              e.cmp(n) >= 0 ? (e.isub(n), a.isub(s)) : (n.isub(e), s.isub(a));
            }
            return (i = 0 === e.cmpn(1) ? a : s).cmpn(0) < 0 && i.iadd(t), i;
          }),
          (o.prototype.gcd = function (t) {
            if (this.isZero()) return t.abs();
            if (t.isZero()) return this.abs();
            var e = this.clone(),
              n = t.clone();
            (e.negative = 0), (n.negative = 0);
            for (var r = 0; e.isEven() && n.isEven(); r++)
              e.iushrn(1), n.iushrn(1);
            for (;;) {
              for (; e.isEven(); ) e.iushrn(1);
              for (; n.isEven(); ) n.iushrn(1);
              var i = e.cmp(n);
              if (i < 0) {
                var o = e;
                (e = n), (n = o);
              } else if (0 === i || 0 === n.cmpn(1)) break;
              e.isub(n);
            }
            return n.iushln(r);
          }),
          (o.prototype.invm = function (t) {
            return this.egcd(t).a.umod(t);
          }),
          (o.prototype.isEven = function () {
            return 0 === (1 & this.words[0]);
          }),
          (o.prototype.isOdd = function () {
            return 1 === (1 & this.words[0]);
          }),
          (o.prototype.andln = function (t) {
            return this.words[0] & t;
          }),
          (o.prototype.bincn = function (t) {
            r("number" === typeof t);
            var e = t % 26,
              n = (t - e) / 26,
              i = 1 << e;
            if (this.length <= n)
              return this._expand(n + 1), (this.words[n] |= i), this;
            for (var o = i, a = n; 0 !== o && a < this.length; a++) {
              var s = 0 | this.words[a];
              (o = (s += o) >>> 26), (s &= 67108863), (this.words[a] = s);
            }
            return 0 !== o && ((this.words[a] = o), this.length++), this;
          }),
          (o.prototype.isZero = function () {
            return 1 === this.length && 0 === this.words[0];
          }),
          (o.prototype.cmpn = function (t) {
            var e,
              n = t < 0;
            if (0 !== this.negative && !n) return -1;
            if (0 === this.negative && n) return 1;
            if ((this.strip(), this.length > 1)) e = 1;
            else {
              n && (t = -t), r(t <= 67108863, "Number is too big");
              var i = 0 | this.words[0];
              e = i === t ? 0 : i < t ? -1 : 1;
            }
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.cmp = function (t) {
            if (0 !== this.negative && 0 === t.negative) return -1;
            if (0 === this.negative && 0 !== t.negative) return 1;
            var e = this.ucmp(t);
            return 0 !== this.negative ? 0 | -e : e;
          }),
          (o.prototype.ucmp = function (t) {
            if (this.length > t.length) return 1;
            if (this.length < t.length) return -1;
            for (var e = 0, n = this.length - 1; n >= 0; n--) {
              var r = 0 | this.words[n],
                i = 0 | t.words[n];
              if (r !== i) {
                r < i ? (e = -1) : r > i && (e = 1);
                break;
              }
            }
            return e;
          }),
          (o.prototype.gtn = function (t) {
            return 1 === this.cmpn(t);
          }),
          (o.prototype.gt = function (t) {
            return 1 === this.cmp(t);
          }),
          (o.prototype.gten = function (t) {
            return this.cmpn(t) >= 0;
          }),
          (o.prototype.gte = function (t) {
            return this.cmp(t) >= 0;
          }),
          (o.prototype.ltn = function (t) {
            return -1 === this.cmpn(t);
          }),
          (o.prototype.lt = function (t) {
            return -1 === this.cmp(t);
          }),
          (o.prototype.lten = function (t) {
            return this.cmpn(t) <= 0;
          }),
          (o.prototype.lte = function (t) {
            return this.cmp(t) <= 0;
          }),
          (o.prototype.eqn = function (t) {
            return 0 === this.cmpn(t);
          }),
          (o.prototype.eq = function (t) {
            return 0 === this.cmp(t);
          }),
          (o.red = function (t) {
            return new T(t);
          }),
          (o.prototype.toRed = function (t) {
            return (
              r(!this.red, "Already a number in reduction context"),
              r(0 === this.negative, "red works only with positives"),
              t.convertTo(this)._forceRed(t)
            );
          }),
          (o.prototype.fromRed = function () {
            return (
              r(
                this.red,
                "fromRed works only with numbers in reduction context"
              ),
              this.red.convertFrom(this)
            );
          }),
          (o.prototype._forceRed = function (t) {
            return (this.red = t), this;
          }),
          (o.prototype.forceRed = function (t) {
            return (
              r(!this.red, "Already a number in reduction context"),
              this._forceRed(t)
            );
          }),
          (o.prototype.redAdd = function (t) {
            return (
              r(this.red, "redAdd works only with red numbers"),
              this.red.add(this, t)
            );
          }),
          (o.prototype.redIAdd = function (t) {
            return (
              r(this.red, "redIAdd works only with red numbers"),
              this.red.iadd(this, t)
            );
          }),
          (o.prototype.redSub = function (t) {
            return (
              r(this.red, "redSub works only with red numbers"),
              this.red.sub(this, t)
            );
          }),
          (o.prototype.redISub = function (t) {
            return (
              r(this.red, "redISub works only with red numbers"),
              this.red.isub(this, t)
            );
          }),
          (o.prototype.redShl = function (t) {
            return (
              r(this.red, "redShl works only with red numbers"),
              this.red.shl(this, t)
            );
          }),
          (o.prototype.redMul = function (t) {
            return (
              r(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.mul(this, t)
            );
          }),
          (o.prototype.redIMul = function (t) {
            return (
              r(this.red, "redMul works only with red numbers"),
              this.red._verify2(this, t),
              this.red.imul(this, t)
            );
          }),
          (o.prototype.redSqr = function () {
            return (
              r(this.red, "redSqr works only with red numbers"),
              this.red._verify1(this),
              this.red.sqr(this)
            );
          }),
          (o.prototype.redISqr = function () {
            return (
              r(this.red, "redISqr works only with red numbers"),
              this.red._verify1(this),
              this.red.isqr(this)
            );
          }),
          (o.prototype.redSqrt = function () {
            return (
              r(this.red, "redSqrt works only with red numbers"),
              this.red._verify1(this),
              this.red.sqrt(this)
            );
          }),
          (o.prototype.redInvm = function () {
            return (
              r(this.red, "redInvm works only with red numbers"),
              this.red._verify1(this),
              this.red.invm(this)
            );
          }),
          (o.prototype.redNeg = function () {
            return (
              r(this.red, "redNeg works only with red numbers"),
              this.red._verify1(this),
              this.red.neg(this)
            );
          }),
          (o.prototype.redPow = function (t) {
            return (
              r(this.red && !t.red, "redPow(normalNum)"),
              this.red._verify1(this),
              this.red.pow(this, t)
            );
          });
        var g = { k256: null, p224: null, p192: null, p25519: null };
        function v(t, e) {
          (this.name = t),
            (this.p = new o(e, 16)),
            (this.n = this.p.bitLength()),
            (this.k = new o(1).iushln(this.n).isub(this.p)),
            (this.tmp = this._tmp());
        }
        function b() {
          v.call(
            this,
            "k256",
            "ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f"
          );
        }
        function w() {
          v.call(
            this,
            "p224",
            "ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001"
          );
        }
        function x() {
          v.call(
            this,
            "p192",
            "ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff"
          );
        }
        function E() {
          v.call(
            this,
            "25519",
            "7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed"
          );
        }
        function T(t) {
          if ("string" === typeof t) {
            var e = o._prime(t);
            (this.m = e.p), (this.prime = e);
          } else
            r(t.gtn(1), "modulus must be greater than 1"),
              (this.m = t),
              (this.prime = null);
        }
        function A(t) {
          T.call(this, t),
            (this.shift = this.m.bitLength()),
            this.shift % 26 !== 0 && (this.shift += 26 - (this.shift % 26)),
            (this.r = new o(1).iushln(this.shift)),
            (this.r2 = this.imod(this.r.sqr())),
            (this.rinv = this.r._invmp(this.m)),
            (this.minv = this.rinv.mul(this.r).isubn(1).div(this.m)),
            (this.minv = this.minv.umod(this.r)),
            (this.minv = this.r.sub(this.minv));
        }
        (v.prototype._tmp = function () {
          var t = new o(null);
          return (t.words = new Array(Math.ceil(this.n / 13))), t;
        }),
          (v.prototype.ireduce = function (t) {
            var e,
              n = t;
            do {
              this.split(n, this.tmp),
                (e = (n = (n = this.imulK(n)).iadd(this.tmp)).bitLength());
            } while (e > this.n);
            var r = e < this.n ? -1 : n.ucmp(this.p);
            return (
              0 === r
                ? ((n.words[0] = 0), (n.length = 1))
                : r > 0
                ? n.isub(this.p)
                : void 0 !== n.strip
                ? n.strip()
                : n._strip(),
              n
            );
          }),
          (v.prototype.split = function (t, e) {
            t.iushrn(this.n, 0, e);
          }),
          (v.prototype.imulK = function (t) {
            return t.imul(this.k);
          }),
          i(b, v),
          (b.prototype.split = function (t, e) {
            for (var n = 4194303, r = Math.min(t.length, 9), i = 0; i < r; i++)
              e.words[i] = t.words[i];
            if (((e.length = r), t.length <= 9))
              return (t.words[0] = 0), void (t.length = 1);
            var o = t.words[9];
            for (e.words[e.length++] = o & n, i = 10; i < t.length; i++) {
              var a = 0 | t.words[i];
              (t.words[i - 10] = ((a & n) << 4) | (o >>> 22)), (o = a);
            }
            (o >>>= 22),
              (t.words[i - 10] = o),
              0 === o && t.length > 10 ? (t.length -= 10) : (t.length -= 9);
          }),
          (b.prototype.imulK = function (t) {
            (t.words[t.length] = 0),
              (t.words[t.length + 1] = 0),
              (t.length += 2);
            for (var e = 0, n = 0; n < t.length; n++) {
              var r = 0 | t.words[n];
              (e += 977 * r),
                (t.words[n] = 67108863 & e),
                (e = 64 * r + ((e / 67108864) | 0));
            }
            return (
              0 === t.words[t.length - 1] &&
                (t.length--, 0 === t.words[t.length - 1] && t.length--),
              t
            );
          }),
          i(w, v),
          i(x, v),
          i(E, v),
          (E.prototype.imulK = function (t) {
            for (var e = 0, n = 0; n < t.length; n++) {
              var r = 19 * (0 | t.words[n]) + e,
                i = 67108863 & r;
              (r >>>= 26), (t.words[n] = i), (e = r);
            }
            return 0 !== e && (t.words[t.length++] = e), t;
          }),
          (o._prime = function (t) {
            if (g[t]) return g[t];
            var e;
            if ("k256" === t) e = new b();
            else if ("p224" === t) e = new w();
            else if ("p192" === t) e = new x();
            else {
              if ("p25519" !== t) throw new Error("Unknown prime " + t);
              e = new E();
            }
            return (g[t] = e), e;
          }),
          (T.prototype._verify1 = function (t) {
            r(0 === t.negative, "red works only with positives"),
              r(t.red, "red works only with red numbers");
          }),
          (T.prototype._verify2 = function (t, e) {
            r(0 === (t.negative | e.negative), "red works only with positives"),
              r(t.red && t.red === e.red, "red works only with red numbers");
          }),
          (T.prototype.imod = function (t) {
            return this.prime
              ? this.prime.ireduce(t)._forceRed(this)
              : t.umod(this.m)._forceRed(this);
          }),
          (T.prototype.neg = function (t) {
            return t.isZero() ? t.clone() : this.m.sub(t)._forceRed(this);
          }),
          (T.prototype.add = function (t, e) {
            this._verify2(t, e);
            var n = t.add(e);
            return n.cmp(this.m) >= 0 && n.isub(this.m), n._forceRed(this);
          }),
          (T.prototype.iadd = function (t, e) {
            this._verify2(t, e);
            var n = t.iadd(e);
            return n.cmp(this.m) >= 0 && n.isub(this.m), n;
          }),
          (T.prototype.sub = function (t, e) {
            this._verify2(t, e);
            var n = t.sub(e);
            return n.cmpn(0) < 0 && n.iadd(this.m), n._forceRed(this);
          }),
          (T.prototype.isub = function (t, e) {
            this._verify2(t, e);
            var n = t.isub(e);
            return n.cmpn(0) < 0 && n.iadd(this.m), n;
          }),
          (T.prototype.shl = function (t, e) {
            return this._verify1(t), this.imod(t.ushln(e));
          }),
          (T.prototype.imul = function (t, e) {
            return this._verify2(t, e), this.imod(t.imul(e));
          }),
          (T.prototype.mul = function (t, e) {
            return this._verify2(t, e), this.imod(t.mul(e));
          }),
          (T.prototype.isqr = function (t) {
            return this.imul(t, t.clone());
          }),
          (T.prototype.sqr = function (t) {
            return this.mul(t, t);
          }),
          (T.prototype.sqrt = function (t) {
            if (t.isZero()) return t.clone();
            var e = this.m.andln(3);
            if ((r(e % 2 === 1), 3 === e)) {
              var n = this.m.add(new o(1)).iushrn(2);
              return this.pow(t, n);
            }
            for (
              var i = this.m.subn(1), a = 0;
              !i.isZero() && 0 === i.andln(1);

            )
              a++, i.iushrn(1);
            r(!i.isZero());
            var s = new o(1).toRed(this),
              u = s.redNeg(),
              l = this.m.subn(1).iushrn(1),
              c = this.m.bitLength();
            for (
              c = new o(2 * c * c).toRed(this);
              0 !== this.pow(c, l).cmp(u);

            )
              c.redIAdd(u);
            for (
              var h = this.pow(c, i),
                f = this.pow(t, i.addn(1).iushrn(1)),
                d = this.pow(t, i),
                p = a;
              0 !== d.cmp(s);

            ) {
              for (var m = d, y = 0; 0 !== m.cmp(s); y++) m = m.redSqr();
              r(y < p);
              var g = this.pow(h, new o(1).iushln(p - y - 1));
              (f = f.redMul(g)), (h = g.redSqr()), (d = d.redMul(h)), (p = y);
            }
            return f;
          }),
          (T.prototype.invm = function (t) {
            var e = t._invmp(this.m);
            return 0 !== e.negative
              ? ((e.negative = 0), this.imod(e).redNeg())
              : this.imod(e);
          }),
          (T.prototype.pow = function (t, e) {
            if (e.isZero()) return new o(1).toRed(this);
            if (0 === e.cmpn(1)) return t.clone();
            var n = new Array(16);
            (n[0] = new o(1).toRed(this)), (n[1] = t);
            for (var r = 2; r < n.length; r++) n[r] = this.mul(n[r - 1], t);
            var i = n[0],
              a = 0,
              s = 0,
              u = e.bitLength() % 26;
            for (0 === u && (u = 26), r = e.length - 1; r >= 0; r--) {
              for (var l = e.words[r], c = u - 1; c >= 0; c--) {
                var h = (l >> c) & 1;
                i !== n[0] && (i = this.sqr(i)),
                  0 !== h || 0 !== a
                    ? ((a <<= 1),
                      (a |= h),
                      (4 === ++s || (0 === r && 0 === c)) &&
                        ((i = this.mul(i, n[a])), (s = 0), (a = 0)))
                    : (s = 0);
              }
              u = 26;
            }
            return i;
          }),
          (T.prototype.convertTo = function (t) {
            var e = t.umod(this.m);
            return e === t ? e.clone() : e;
          }),
          (T.prototype.convertFrom = function (t) {
            var e = t.clone();
            return (e.red = null), e;
          }),
          (o.mont = function (t) {
            return new A(t);
          }),
          i(A, T),
          (A.prototype.convertTo = function (t) {
            return this.imod(t.ushln(this.shift));
          }),
          (A.prototype.convertFrom = function (t) {
            var e = this.imod(t.mul(this.rinv));
            return (e.red = null), e;
          }),
          (A.prototype.imul = function (t, e) {
            if (t.isZero() || e.isZero())
              return (t.words[0] = 0), (t.length = 1), t;
            var n = t.imul(e),
              r = n
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = n.isub(r).iushrn(this.shift),
              o = i;
            return (
              i.cmp(this.m) >= 0
                ? (o = i.isub(this.m))
                : i.cmpn(0) < 0 && (o = i.iadd(this.m)),
              o._forceRed(this)
            );
          }),
          (A.prototype.mul = function (t, e) {
            if (t.isZero() || e.isZero()) return new o(0)._forceRed(this);
            var n = t.mul(e),
              r = n
                .maskn(this.shift)
                .mul(this.minv)
                .imaskn(this.shift)
                .mul(this.m),
              i = n.isub(r).iushrn(this.shift),
              a = i;
            return (
              i.cmp(this.m) >= 0
                ? (a = i.isub(this.m))
                : i.cmpn(0) < 0 && (a = i.iadd(this.m)),
              a._forceRed(this)
            );
          }),
          (A.prototype.invm = function (t) {
            return this.imod(t._invmp(this.m).mul(this.r2))._forceRed(this);
          });
      })((t = n.nmd(t)), this);
    },
    3715: function (t, e, n) {
      var r = e;
      (r.utils = n(6436)),
        (r.common = n(5772)),
        (r.sha = n(9041)),
        (r.ripemd = n(2949)),
        (r.hmac = n(2344)),
        (r.sha1 = r.sha.sha1),
        (r.sha256 = r.sha.sha256),
        (r.sha224 = r.sha.sha224),
        (r.sha384 = r.sha.sha384),
        (r.sha512 = r.sha.sha512),
        (r.ripemd160 = r.ripemd.ripemd160);
    },
    5772: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(9746);
      function o() {
        (this.pending = null),
          (this.pendingTotal = 0),
          (this.blockSize = this.constructor.blockSize),
          (this.outSize = this.constructor.outSize),
          (this.hmacStrength = this.constructor.hmacStrength),
          (this.padLength = this.constructor.padLength / 8),
          (this.endian = "big"),
          (this._delta8 = this.blockSize / 8),
          (this._delta32 = this.blockSize / 32);
      }
      (e.BlockHash = o),
        (o.prototype.update = function (t, e) {
          if (
            ((t = r.toArray(t, e)),
            this.pending
              ? (this.pending = this.pending.concat(t))
              : (this.pending = t),
            (this.pendingTotal += t.length),
            this.pending.length >= this._delta8)
          ) {
            var n = (t = this.pending).length % this._delta8;
            (this.pending = t.slice(t.length - n, t.length)),
              0 === this.pending.length && (this.pending = null),
              (t = r.join32(t, 0, t.length - n, this.endian));
            for (var i = 0; i < t.length; i += this._delta32)
              this._update(t, i, i + this._delta32);
          }
          return this;
        }),
        (o.prototype.digest = function (t) {
          return (
            this.update(this._pad()), i(null === this.pending), this._digest(t)
          );
        }),
        (o.prototype._pad = function () {
          var t = this.pendingTotal,
            e = this._delta8,
            n = e - ((t + this.padLength) % e),
            r = new Array(n + this.padLength);
          r[0] = 128;
          for (var i = 1; i < n; i++) r[i] = 0;
          if (((t <<= 3), "big" === this.endian)) {
            for (var o = 8; o < this.padLength; o++) r[i++] = 0;
            (r[i++] = 0),
              (r[i++] = 0),
              (r[i++] = 0),
              (r[i++] = 0),
              (r[i++] = (t >>> 24) & 255),
              (r[i++] = (t >>> 16) & 255),
              (r[i++] = (t >>> 8) & 255),
              (r[i++] = 255 & t);
          } else
            for (
              r[i++] = 255 & t,
                r[i++] = (t >>> 8) & 255,
                r[i++] = (t >>> 16) & 255,
                r[i++] = (t >>> 24) & 255,
                r[i++] = 0,
                r[i++] = 0,
                r[i++] = 0,
                r[i++] = 0,
                o = 8;
              o < this.padLength;
              o++
            )
              r[i++] = 0;
          return r;
        });
    },
    2344: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(9746);
      function o(t, e, n) {
        if (!(this instanceof o)) return new o(t, e, n);
        (this.Hash = t),
          (this.blockSize = t.blockSize / 8),
          (this.outSize = t.outSize / 8),
          (this.inner = null),
          (this.outer = null),
          this._init(r.toArray(e, n));
      }
      (t.exports = o),
        (o.prototype._init = function (t) {
          t.length > this.blockSize && (t = new this.Hash().update(t).digest()),
            i(t.length <= this.blockSize);
          for (var e = t.length; e < this.blockSize; e++) t.push(0);
          for (e = 0; e < t.length; e++) t[e] ^= 54;
          for (this.inner = new this.Hash().update(t), e = 0; e < t.length; e++)
            t[e] ^= 106;
          this.outer = new this.Hash().update(t);
        }),
        (o.prototype.update = function (t, e) {
          return this.inner.update(t, e), this;
        }),
        (o.prototype.digest = function (t) {
          return this.outer.update(this.inner.digest()), this.outer.digest(t);
        });
    },
    2949: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(5772),
        o = r.rotl32,
        a = r.sum32,
        s = r.sum32_3,
        u = r.sum32_4,
        l = i.BlockHash;
      function c() {
        if (!(this instanceof c)) return new c();
        l.call(this),
          (this.h = [
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]),
          (this.endian = "little");
      }
      function h(t, e, n, r) {
        return t <= 15
          ? e ^ n ^ r
          : t <= 31
          ? (e & n) | (~e & r)
          : t <= 47
          ? (e | ~n) ^ r
          : t <= 63
          ? (e & r) | (n & ~r)
          : e ^ (n | ~r);
      }
      function f(t) {
        return t <= 15
          ? 0
          : t <= 31
          ? 1518500249
          : t <= 47
          ? 1859775393
          : t <= 63
          ? 2400959708
          : 2840853838;
      }
      function d(t) {
        return t <= 15
          ? 1352829926
          : t <= 31
          ? 1548603684
          : t <= 47
          ? 1836072691
          : t <= 63
          ? 2053994217
          : 0;
      }
      r.inherits(c, l),
        (e.ripemd160 = c),
        (c.blockSize = 512),
        (c.outSize = 160),
        (c.hmacStrength = 192),
        (c.padLength = 64),
        (c.prototype._update = function (t, e) {
          for (
            var n = this.h[0],
              r = this.h[1],
              i = this.h[2],
              l = this.h[3],
              c = this.h[4],
              v = n,
              b = r,
              w = i,
              x = l,
              E = c,
              T = 0;
            T < 80;
            T++
          ) {
            var A = a(o(u(n, h(T, r, i, l), t[p[T] + e], f(T)), y[T]), c);
            (n = c),
              (c = l),
              (l = o(i, 10)),
              (i = r),
              (r = A),
              (A = a(o(u(v, h(79 - T, b, w, x), t[m[T] + e], d(T)), g[T]), E)),
              (v = E),
              (E = x),
              (x = o(w, 10)),
              (w = b),
              (b = A);
          }
          (A = s(this.h[1], i, x)),
            (this.h[1] = s(this.h[2], l, E)),
            (this.h[2] = s(this.h[3], c, v)),
            (this.h[3] = s(this.h[4], n, b)),
            (this.h[4] = s(this.h[0], r, w)),
            (this.h[0] = A);
        }),
        (c.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h, "little")
            : r.split32(this.h, "little");
        });
      var p = [
          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10,
          6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7,
          0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5,
          6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13,
        ],
        m = [
          5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0,
          13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8,
          12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10,
          14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11,
        ],
        y = [
          11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13,
          11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13,
          15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5,
          6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5,
          6,
        ],
        g = [
          8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7,
          12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14,
          12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9,
          12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11,
        ];
    },
    9041: function (t, e, n) {
      "use strict";
      (e.sha1 = n(4761)),
        (e.sha224 = n(799)),
        (e.sha256 = n(9344)),
        (e.sha384 = n(772)),
        (e.sha512 = n(5900));
    },
    4761: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(5772),
        o = n(7038),
        a = r.rotl32,
        s = r.sum32,
        u = r.sum32_5,
        l = o.ft_1,
        c = i.BlockHash,
        h = [1518500249, 1859775393, 2400959708, 3395469782];
      function f() {
        if (!(this instanceof f)) return new f();
        c.call(this),
          (this.h = [
            1732584193, 4023233417, 2562383102, 271733878, 3285377520,
          ]),
          (this.W = new Array(80));
      }
      r.inherits(f, c),
        (t.exports = f),
        (f.blockSize = 512),
        (f.outSize = 160),
        (f.hmacStrength = 80),
        (f.padLength = 64),
        (f.prototype._update = function (t, e) {
          for (var n = this.W, r = 0; r < 16; r++) n[r] = t[e + r];
          for (; r < n.length; r++)
            n[r] = a(n[r - 3] ^ n[r - 8] ^ n[r - 14] ^ n[r - 16], 1);
          var i = this.h[0],
            o = this.h[1],
            c = this.h[2],
            f = this.h[3],
            d = this.h[4];
          for (r = 0; r < n.length; r++) {
            var p = ~~(r / 20),
              m = u(a(i, 5), l(p, o, c, f), d, n[r], h[p]);
            (d = f), (f = c), (c = a(o, 30)), (o = i), (i = m);
          }
          (this.h[0] = s(this.h[0], i)),
            (this.h[1] = s(this.h[1], o)),
            (this.h[2] = s(this.h[2], c)),
            (this.h[3] = s(this.h[3], f)),
            (this.h[4] = s(this.h[4], d));
        }),
        (f.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h, "big")
            : r.split32(this.h, "big");
        });
    },
    799: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(9344);
      function o() {
        if (!(this instanceof o)) return new o();
        i.call(this),
          (this.h = [
            3238371032, 914150663, 812702999, 4144912697, 4290775857,
            1750603025, 1694076839, 3204075428,
          ]);
      }
      r.inherits(o, i),
        (t.exports = o),
        (o.blockSize = 512),
        (o.outSize = 224),
        (o.hmacStrength = 192),
        (o.padLength = 64),
        (o.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h.slice(0, 7), "big")
            : r.split32(this.h.slice(0, 7), "big");
        });
    },
    9344: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(5772),
        o = n(7038),
        a = n(9746),
        s = r.sum32,
        u = r.sum32_4,
        l = r.sum32_5,
        c = o.ch32,
        h = o.maj32,
        f = o.s0_256,
        d = o.s1_256,
        p = o.g0_256,
        m = o.g1_256,
        y = i.BlockHash,
        g = [
          1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
          2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
          1925078388, 2162078206, 2614888103, 3248222580, 3835390401,
          4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692,
          1996064986, 2554220882, 2821834349, 2952996808, 3210313671,
          3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912,
          1294757372, 1396182291, 1695183700, 1986661051, 2177026350,
          2456956037, 2730485921, 2820302411, 3259730800, 3345764771,
          3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616,
          659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
          1955562222, 2024104815, 2227730452, 2361852424, 2428436474,
          2756734187, 3204031479, 3329325298,
        ];
      function v() {
        if (!(this instanceof v)) return new v();
        y.call(this),
          (this.h = [
            1779033703, 3144134277, 1013904242, 2773480762, 1359893119,
            2600822924, 528734635, 1541459225,
          ]),
          (this.k = g),
          (this.W = new Array(64));
      }
      r.inherits(v, y),
        (t.exports = v),
        (v.blockSize = 512),
        (v.outSize = 256),
        (v.hmacStrength = 192),
        (v.padLength = 64),
        (v.prototype._update = function (t, e) {
          for (var n = this.W, r = 0; r < 16; r++) n[r] = t[e + r];
          for (; r < n.length; r++)
            n[r] = u(m(n[r - 2]), n[r - 7], p(n[r - 15]), n[r - 16]);
          var i = this.h[0],
            o = this.h[1],
            y = this.h[2],
            g = this.h[3],
            v = this.h[4],
            b = this.h[5],
            w = this.h[6],
            x = this.h[7];
          for (a(this.k.length === n.length), r = 0; r < n.length; r++) {
            var E = l(x, d(v), c(v, b, w), this.k[r], n[r]),
              T = s(f(i), h(i, o, y));
            (x = w),
              (w = b),
              (b = v),
              (v = s(g, E)),
              (g = y),
              (y = o),
              (o = i),
              (i = s(E, T));
          }
          (this.h[0] = s(this.h[0], i)),
            (this.h[1] = s(this.h[1], o)),
            (this.h[2] = s(this.h[2], y)),
            (this.h[3] = s(this.h[3], g)),
            (this.h[4] = s(this.h[4], v)),
            (this.h[5] = s(this.h[5], b)),
            (this.h[6] = s(this.h[6], w)),
            (this.h[7] = s(this.h[7], x));
        }),
        (v.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h, "big")
            : r.split32(this.h, "big");
        });
    },
    772: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(5900);
      function o() {
        if (!(this instanceof o)) return new o();
        i.call(this),
          (this.h = [
            3418070365, 3238371032, 1654270250, 914150663, 2438529370,
            812702999, 355462360, 4144912697, 1731405415, 4290775857,
            2394180231, 1750603025, 3675008525, 1694076839, 1203062813,
            3204075428,
          ]);
      }
      r.inherits(o, i),
        (t.exports = o),
        (o.blockSize = 1024),
        (o.outSize = 384),
        (o.hmacStrength = 192),
        (o.padLength = 128),
        (o.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h.slice(0, 12), "big")
            : r.split32(this.h.slice(0, 12), "big");
        });
    },
    5900: function (t, e, n) {
      "use strict";
      var r = n(6436),
        i = n(5772),
        o = n(9746),
        a = r.rotr64_hi,
        s = r.rotr64_lo,
        u = r.shr64_hi,
        l = r.shr64_lo,
        c = r.sum64,
        h = r.sum64_hi,
        f = r.sum64_lo,
        d = r.sum64_4_hi,
        p = r.sum64_4_lo,
        m = r.sum64_5_hi,
        y = r.sum64_5_lo,
        g = i.BlockHash,
        v = [
          1116352408, 3609767458, 1899447441, 602891725, 3049323471, 3964484399,
          3921009573, 2173295548, 961987163, 4081628472, 1508970993, 3053834265,
          2453635748, 2937671579, 2870763221, 3664609560, 3624381080,
          2734883394, 310598401, 1164996542, 607225278, 1323610764, 1426881987,
          3590304994, 1925078388, 4068182383, 2162078206, 991336113, 2614888103,
          633803317, 3248222580, 3479774868, 3835390401, 2666613458, 4022224774,
          944711139, 264347078, 2341262773, 604807628, 2007800933, 770255983,
          1495990901, 1249150122, 1856431235, 1555081692, 3175218132,
          1996064986, 2198950837, 2554220882, 3999719339, 2821834349, 766784016,
          2952996808, 2566594879, 3210313671, 3203337956, 3336571891,
          1034457026, 3584528711, 2466948901, 113926993, 3758326383, 338241895,
          168717936, 666307205, 1188179964, 773529912, 1546045734, 1294757372,
          1522805485, 1396182291, 2643833823, 1695183700, 2343527390,
          1986661051, 1014477480, 2177026350, 1206759142, 2456956037, 344077627,
          2730485921, 1290863460, 2820302411, 3158454273, 3259730800,
          3505952657, 3345764771, 106217008, 3516065817, 3606008344, 3600352804,
          1432725776, 4094571909, 1467031594, 275423344, 851169720, 430227734,
          3100823752, 506948616, 1363258195, 659060556, 3750685593, 883997877,
          3785050280, 958139571, 3318307427, 1322822218, 3812723403, 1537002063,
          2003034995, 1747873779, 3602036899, 1955562222, 1575990012,
          2024104815, 1125592928, 2227730452, 2716904306, 2361852424, 442776044,
          2428436474, 593698344, 2756734187, 3733110249, 3204031479, 2999351573,
          3329325298, 3815920427, 3391569614, 3928383900, 3515267271, 566280711,
          3940187606, 3454069534, 4118630271, 4000239992, 116418474, 1914138554,
          174292421, 2731055270, 289380356, 3203993006, 460393269, 320620315,
          685471733, 587496836, 852142971, 1086792851, 1017036298, 365543100,
          1126000580, 2618297676, 1288033470, 3409855158, 1501505948,
          4234509866, 1607167915, 987167468, 1816402316, 1246189591,
        ];
      function b() {
        if (!(this instanceof b)) return new b();
        g.call(this),
          (this.h = [
            1779033703, 4089235720, 3144134277, 2227873595, 1013904242,
            4271175723, 2773480762, 1595750129, 1359893119, 2917565137,
            2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209,
          ]),
          (this.k = v),
          (this.W = new Array(160));
      }
      function w(t, e, n, r, i) {
        var o = (t & n) ^ (~t & i);
        return o < 0 && (o += 4294967296), o;
      }
      function x(t, e, n, r, i, o) {
        var a = (e & r) ^ (~e & o);
        return a < 0 && (a += 4294967296), a;
      }
      function E(t, e, n, r, i) {
        var o = (t & n) ^ (t & i) ^ (n & i);
        return o < 0 && (o += 4294967296), o;
      }
      function T(t, e, n, r, i, o) {
        var a = (e & r) ^ (e & o) ^ (r & o);
        return a < 0 && (a += 4294967296), a;
      }
      function A(t, e) {
        var n = a(t, e, 28) ^ a(e, t, 2) ^ a(e, t, 7);
        return n < 0 && (n += 4294967296), n;
      }
      function M(t, e) {
        var n = s(t, e, 28) ^ s(e, t, 2) ^ s(e, t, 7);
        return n < 0 && (n += 4294967296), n;
      }
      function _(t, e) {
        var n = a(t, e, 14) ^ a(t, e, 18) ^ a(e, t, 9);
        return n < 0 && (n += 4294967296), n;
      }
      function k(t, e) {
        var n = s(t, e, 14) ^ s(t, e, 18) ^ s(e, t, 9);
        return n < 0 && (n += 4294967296), n;
      }
      function S(t, e) {
        var n = a(t, e, 1) ^ a(t, e, 8) ^ u(t, e, 7);
        return n < 0 && (n += 4294967296), n;
      }
      function P(t, e) {
        var n = s(t, e, 1) ^ s(t, e, 8) ^ l(t, e, 7);
        return n < 0 && (n += 4294967296), n;
      }
      function O(t, e) {
        var n = a(t, e, 19) ^ a(e, t, 29) ^ u(t, e, 6);
        return n < 0 && (n += 4294967296), n;
      }
      function R(t, e) {
        var n = s(t, e, 19) ^ s(e, t, 29) ^ l(t, e, 6);
        return n < 0 && (n += 4294967296), n;
      }
      r.inherits(b, g),
        (t.exports = b),
        (b.blockSize = 1024),
        (b.outSize = 512),
        (b.hmacStrength = 192),
        (b.padLength = 128),
        (b.prototype._prepareBlock = function (t, e) {
          for (var n = this.W, r = 0; r < 32; r++) n[r] = t[e + r];
          for (; r < n.length; r += 2) {
            var i = O(n[r - 4], n[r - 3]),
              o = R(n[r - 4], n[r - 3]),
              a = n[r - 14],
              s = n[r - 13],
              u = S(n[r - 30], n[r - 29]),
              l = P(n[r - 30], n[r - 29]),
              c = n[r - 32],
              h = n[r - 31];
            (n[r] = d(i, o, a, s, u, l, c, h)),
              (n[r + 1] = p(i, o, a, s, u, l, c, h));
          }
        }),
        (b.prototype._update = function (t, e) {
          this._prepareBlock(t, e);
          var n = this.W,
            r = this.h[0],
            i = this.h[1],
            a = this.h[2],
            s = this.h[3],
            u = this.h[4],
            l = this.h[5],
            d = this.h[6],
            p = this.h[7],
            g = this.h[8],
            v = this.h[9],
            b = this.h[10],
            S = this.h[11],
            P = this.h[12],
            O = this.h[13],
            R = this.h[14],
            N = this.h[15];
          o(this.k.length === n.length);
          for (var I = 0; I < n.length; I += 2) {
            var C = R,
              L = N,
              B = _(g, v),
              F = k(g, v),
              j = w(g, v, b, S, P),
              D = x(g, v, b, S, P, O),
              U = this.k[I],
              V = this.k[I + 1],
              G = n[I],
              z = n[I + 1],
              $ = m(C, L, B, F, j, D, U, V, G, z),
              H = y(C, L, B, F, j, D, U, V, G, z);
            (C = A(r, i)),
              (L = M(r, i)),
              (B = E(r, i, a, s, u)),
              (F = T(r, i, a, s, u, l));
            var q = h(C, L, B, F),
              W = f(C, L, B, F);
            (R = P),
              (N = O),
              (P = b),
              (O = S),
              (b = g),
              (S = v),
              (g = h(d, p, $, H)),
              (v = f(p, p, $, H)),
              (d = u),
              (p = l),
              (u = a),
              (l = s),
              (a = r),
              (s = i),
              (r = h($, H, q, W)),
              (i = f($, H, q, W));
          }
          c(this.h, 0, r, i),
            c(this.h, 2, a, s),
            c(this.h, 4, u, l),
            c(this.h, 6, d, p),
            c(this.h, 8, g, v),
            c(this.h, 10, b, S),
            c(this.h, 12, P, O),
            c(this.h, 14, R, N);
        }),
        (b.prototype._digest = function (t) {
          return "hex" === t
            ? r.toHex32(this.h, "big")
            : r.split32(this.h, "big");
        });
    },
    7038: function (t, e, n) {
      "use strict";
      var r = n(6436).rotr32;
      function i(t, e, n) {
        return (t & e) ^ (~t & n);
      }
      function o(t, e, n) {
        return (t & e) ^ (t & n) ^ (e & n);
      }
      function a(t, e, n) {
        return t ^ e ^ n;
      }
      (e.ft_1 = function (t, e, n, r) {
        return 0 === t
          ? i(e, n, r)
          : 1 === t || 3 === t
          ? a(e, n, r)
          : 2 === t
          ? o(e, n, r)
          : void 0;
      }),
        (e.ch32 = i),
        (e.maj32 = o),
        (e.p32 = a),
        (e.s0_256 = function (t) {
          return r(t, 2) ^ r(t, 13) ^ r(t, 22);
        }),
        (e.s1_256 = function (t) {
          return r(t, 6) ^ r(t, 11) ^ r(t, 25);
        }),
        (e.g0_256 = function (t) {
          return r(t, 7) ^ r(t, 18) ^ (t >>> 3);
        }),
        (e.g1_256 = function (t) {
          return r(t, 17) ^ r(t, 19) ^ (t >>> 10);
        });
    },
    6436: function (t, e, n) {
      "use strict";
      var r = n(9746),
        i = n(5717);
      function o(t, e) {
        return (
          55296 === (64512 & t.charCodeAt(e)) &&
          !(e < 0 || e + 1 >= t.length) &&
          56320 === (64512 & t.charCodeAt(e + 1))
        );
      }
      function a(t) {
        return (
          ((t >>> 24) |
            ((t >>> 8) & 65280) |
            ((t << 8) & 16711680) |
            ((255 & t) << 24)) >>>
          0
        );
      }
      function s(t) {
        return 1 === t.length ? "0" + t : t;
      }
      function u(t) {
        return 7 === t.length
          ? "0" + t
          : 6 === t.length
          ? "00" + t
          : 5 === t.length
          ? "000" + t
          : 4 === t.length
          ? "0000" + t
          : 3 === t.length
          ? "00000" + t
          : 2 === t.length
          ? "000000" + t
          : 1 === t.length
          ? "0000000" + t
          : t;
      }
      (e.inherits = i),
        (e.toArray = function (t, e) {
          if (Array.isArray(t)) return t.slice();
          if (!t) return [];
          var n = [];
          if ("string" === typeof t)
            if (e) {
              if ("hex" === e)
                for (
                  (t = t.replace(/[^a-z0-9]+/gi, "")).length % 2 !== 0 &&
                    (t = "0" + t),
                    i = 0;
                  i < t.length;
                  i += 2
                )
                  n.push(parseInt(t[i] + t[i + 1], 16));
            } else
              for (var r = 0, i = 0; i < t.length; i++) {
                var a = t.charCodeAt(i);
                a < 128
                  ? (n[r++] = a)
                  : a < 2048
                  ? ((n[r++] = (a >> 6) | 192), (n[r++] = (63 & a) | 128))
                  : o(t, i)
                  ? ((a =
                      65536 + ((1023 & a) << 10) + (1023 & t.charCodeAt(++i))),
                    (n[r++] = (a >> 18) | 240),
                    (n[r++] = ((a >> 12) & 63) | 128),
                    (n[r++] = ((a >> 6) & 63) | 128),
                    (n[r++] = (63 & a) | 128))
                  : ((n[r++] = (a >> 12) | 224),
                    (n[r++] = ((a >> 6) & 63) | 128),
                    (n[r++] = (63 & a) | 128));
              }
          else for (i = 0; i < t.length; i++) n[i] = 0 | t[i];
          return n;
        }),
        (e.toHex = function (t) {
          for (var e = "", n = 0; n < t.length; n++) e += s(t[n].toString(16));
          return e;
        }),
        (e.htonl = a),
        (e.toHex32 = function (t, e) {
          for (var n = "", r = 0; r < t.length; r++) {
            var i = t[r];
            "little" === e && (i = a(i)), (n += u(i.toString(16)));
          }
          return n;
        }),
        (e.zero2 = s),
        (e.zero8 = u),
        (e.join32 = function (t, e, n, i) {
          var o = n - e;
          r(o % 4 === 0);
          for (
            var a = new Array(o / 4), s = 0, u = e;
            s < a.length;
            s++, u += 4
          ) {
            var l;
            (l =
              "big" === i
                ? (t[u] << 24) | (t[u + 1] << 16) | (t[u + 2] << 8) | t[u + 3]
                : (t[u + 3] << 24) | (t[u + 2] << 16) | (t[u + 1] << 8) | t[u]),
              (a[s] = l >>> 0);
          }
          return a;
        }),
        (e.split32 = function (t, e) {
          for (
            var n = new Array(4 * t.length), r = 0, i = 0;
            r < t.length;
            r++, i += 4
          ) {
            var o = t[r];
            "big" === e
              ? ((n[i] = o >>> 24),
                (n[i + 1] = (o >>> 16) & 255),
                (n[i + 2] = (o >>> 8) & 255),
                (n[i + 3] = 255 & o))
              : ((n[i + 3] = o >>> 24),
                (n[i + 2] = (o >>> 16) & 255),
                (n[i + 1] = (o >>> 8) & 255),
                (n[i] = 255 & o));
          }
          return n;
        }),
        (e.rotr32 = function (t, e) {
          return (t >>> e) | (t << (32 - e));
        }),
        (e.rotl32 = function (t, e) {
          return (t << e) | (t >>> (32 - e));
        }),
        (e.sum32 = function (t, e) {
          return (t + e) >>> 0;
        }),
        (e.sum32_3 = function (t, e, n) {
          return (t + e + n) >>> 0;
        }),
        (e.sum32_4 = function (t, e, n, r) {
          return (t + e + n + r) >>> 0;
        }),
        (e.sum32_5 = function (t, e, n, r, i) {
          return (t + e + n + r + i) >>> 0;
        }),
        (e.sum64 = function (t, e, n, r) {
          var i = t[e],
            o = (r + t[e + 1]) >>> 0,
            a = (o < r ? 1 : 0) + n + i;
          (t[e] = a >>> 0), (t[e + 1] = o);
        }),
        (e.sum64_hi = function (t, e, n, r) {
          return (((e + r) >>> 0 < e ? 1 : 0) + t + n) >>> 0;
        }),
        (e.sum64_lo = function (t, e, n, r) {
          return (e + r) >>> 0;
        }),
        (e.sum64_4_hi = function (t, e, n, r, i, o, a, s) {
          var u = 0,
            l = e;
          return (
            (u += (l = (l + r) >>> 0) < e ? 1 : 0),
            (u += (l = (l + o) >>> 0) < o ? 1 : 0),
            (t + n + i + a + (u += (l = (l + s) >>> 0) < s ? 1 : 0)) >>> 0
          );
        }),
        (e.sum64_4_lo = function (t, e, n, r, i, o, a, s) {
          return (e + r + o + s) >>> 0;
        }),
        (e.sum64_5_hi = function (t, e, n, r, i, o, a, s, u, l) {
          var c = 0,
            h = e;
          return (
            (c += (h = (h + r) >>> 0) < e ? 1 : 0),
            (c += (h = (h + o) >>> 0) < o ? 1 : 0),
            (c += (h = (h + s) >>> 0) < s ? 1 : 0),
            (t + n + i + a + u + (c += (h = (h + l) >>> 0) < l ? 1 : 0)) >>> 0
          );
        }),
        (e.sum64_5_lo = function (t, e, n, r, i, o, a, s, u, l) {
          return (e + r + o + s + l) >>> 0;
        }),
        (e.rotr64_hi = function (t, e, n) {
          return ((e << (32 - n)) | (t >>> n)) >>> 0;
        }),
        (e.rotr64_lo = function (t, e, n) {
          return ((t << (32 - n)) | (e >>> n)) >>> 0;
        }),
        (e.shr64_hi = function (t, e, n) {
          return t >>> n;
        }),
        (e.shr64_lo = function (t, e, n) {
          return ((t << (32 - n)) | (e >>> n)) >>> 0;
        });
    },
    5717: function (t) {
      "function" === typeof Object.create
        ? (t.exports = function (t, e) {
            e &&
              ((t.super_ = e),
              (t.prototype = Object.create(e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })));
          })
        : (t.exports = function (t, e) {
            if (e) {
              t.super_ = e;
              var n = function () {};
              (n.prototype = e.prototype),
                (t.prototype = new n()),
                (t.prototype.constructor = t);
            }
          });
    },
    1094: function (t, e, n) {
      var r,
        i = n(3454);
      !(function () {
        "use strict";
        var o = "input is invalid type",
          a = "object" === typeof window,
          s = a ? window : {};
        s.JS_SHA3_NO_WINDOW && (a = !1);
        var u = !a && "object" === typeof self;
        !s.JS_SHA3_NO_NODE_JS &&
        "object" === typeof i &&
        i.versions &&
        i.versions.node
          ? (s = n.g)
          : u && (s = self);
        var l = !s.JS_SHA3_NO_COMMON_JS && t.exports,
          c = n.amdO,
          h = !s.JS_SHA3_NO_ARRAY_BUFFER && "undefined" !== typeof ArrayBuffer,
          f = "0123456789abcdef".split(""),
          d = [4, 1024, 262144, 67108864],
          p = [0, 8, 16, 24],
          m = [
            1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0,
            2147483649, 0, 2147516545, 2147483648, 32777, 2147483648, 138, 0,
            136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139,
            2147483648, 32905, 2147483648, 32771, 2147483648, 32770, 2147483648,
            128, 2147483648, 32778, 0, 2147483658, 2147483648, 2147516545,
            2147483648, 32896, 2147483648, 2147483649, 0, 2147516424,
            2147483648,
          ],
          y = [224, 256, 384, 512],
          g = [128, 256],
          v = ["hex", "buffer", "arrayBuffer", "array", "digest"],
          b = { 128: 168, 256: 136 };
        (!s.JS_SHA3_NO_NODE_JS && Array.isArray) ||
          (Array.isArray = function (t) {
            return "[object Array]" === Object.prototype.toString.call(t);
          }),
          !h ||
            (!s.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView) ||
            (ArrayBuffer.isView = function (t) {
              return (
                "object" === typeof t &&
                t.buffer &&
                t.buffer.constructor === ArrayBuffer
              );
            });
        for (
          var w = function (t, e, n) {
              return function (r) {
                return new L(t, e, t).update(r)[n]();
              };
            },
            x = function (t, e, n) {
              return function (r, i) {
                return new L(t, e, i).update(r)[n]();
              };
            },
            E = function (t, e, n) {
              return function (e, r, i, o) {
                return k["cshake" + t].update(e, r, i, o)[n]();
              };
            },
            T = function (t, e, n) {
              return function (e, r, i, o) {
                return k["kmac" + t].update(e, r, i, o)[n]();
              };
            },
            A = function (t, e, n, r) {
              for (var i = 0; i < v.length; ++i) {
                var o = v[i];
                t[o] = e(n, r, o);
              }
              return t;
            },
            M = function (t, e) {
              var n = w(t, e, "hex");
              return (
                (n.create = function () {
                  return new L(t, e, t);
                }),
                (n.update = function (t) {
                  return n.create().update(t);
                }),
                A(n, w, t, e)
              );
            },
            _ = [
              {
                name: "keccak",
                padding: [1, 256, 65536, 16777216],
                bits: y,
                createMethod: M,
              },
              {
                name: "sha3",
                padding: [6, 1536, 393216, 100663296],
                bits: y,
                createMethod: M,
              },
              {
                name: "shake",
                padding: [31, 7936, 2031616, 520093696],
                bits: g,
                createMethod: function (t, e) {
                  var n = x(t, e, "hex");
                  return (
                    (n.create = function (n) {
                      return new L(t, e, n);
                    }),
                    (n.update = function (t, e) {
                      return n.create(e).update(t);
                    }),
                    A(n, x, t, e)
                  );
                },
              },
              {
                name: "cshake",
                padding: d,
                bits: g,
                createMethod: function (t, e) {
                  var n = b[t],
                    r = E(t, 0, "hex");
                  return (
                    (r.create = function (r, i, o) {
                      return i || o
                        ? new L(t, e, r).bytepad([i, o], n)
                        : k["shake" + t].create(r);
                    }),
                    (r.update = function (t, e, n, i) {
                      return r.create(e, n, i).update(t);
                    }),
                    A(r, E, t, e)
                  );
                },
              },
              {
                name: "kmac",
                padding: d,
                bits: g,
                createMethod: function (t, e) {
                  var n = b[t],
                    r = T(t, 0, "hex");
                  return (
                    (r.create = function (r, i, o) {
                      return new B(t, e, i)
                        .bytepad(["KMAC", o], n)
                        .bytepad([r], n);
                    }),
                    (r.update = function (t, e, n, i) {
                      return r.create(t, n, i).update(e);
                    }),
                    A(r, T, t, e)
                  );
                },
              },
            ],
            k = {},
            S = [],
            P = 0;
          P < _.length;
          ++P
        )
          for (var O = _[P], R = O.bits, N = 0; N < R.length; ++N) {
            var I = O.name + "_" + R[N];
            if (
              (S.push(I),
              (k[I] = O.createMethod(R[N], O.padding)),
              "sha3" !== O.name)
            ) {
              var C = O.name + R[N];
              S.push(C), (k[C] = k[I]);
            }
          }
        function L(t, e, n) {
          (this.blocks = []),
            (this.s = []),
            (this.padding = e),
            (this.outputBits = n),
            (this.reset = !0),
            (this.finalized = !1),
            (this.block = 0),
            (this.start = 0),
            (this.blockCount = (1600 - (t << 1)) >> 5),
            (this.byteCount = this.blockCount << 2),
            (this.outputBlocks = n >> 5),
            (this.extraBytes = (31 & n) >> 3);
          for (var r = 0; r < 50; ++r) this.s[r] = 0;
        }
        function B(t, e, n) {
          L.call(this, t, e, n);
        }
        (L.prototype.update = function (t) {
          if (this.finalized) throw new Error("finalize already called");
          var e,
            n = typeof t;
          if ("string" !== n) {
            if ("object" !== n) throw new Error(o);
            if (null === t) throw new Error(o);
            if (h && t.constructor === ArrayBuffer) t = new Uint8Array(t);
            else if (!Array.isArray(t) && (!h || !ArrayBuffer.isView(t)))
              throw new Error(o);
            e = !0;
          }
          for (
            var r,
              i,
              a = this.blocks,
              s = this.byteCount,
              u = t.length,
              l = this.blockCount,
              c = 0,
              f = this.s;
            c < u;

          ) {
            if (this.reset)
              for (this.reset = !1, a[0] = this.block, r = 1; r < l + 1; ++r)
                a[r] = 0;
            if (e)
              for (r = this.start; c < u && r < s; ++c)
                a[r >> 2] |= t[c] << p[3 & r++];
            else
              for (r = this.start; c < u && r < s; ++c)
                (i = t.charCodeAt(c)) < 128
                  ? (a[r >> 2] |= i << p[3 & r++])
                  : i < 2048
                  ? ((a[r >> 2] |= (192 | (i >> 6)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | (63 & i)) << p[3 & r++]))
                  : i < 55296 || i >= 57344
                  ? ((a[r >> 2] |= (224 | (i >> 12)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | ((i >> 6) & 63)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | (63 & i)) << p[3 & r++]))
                  : ((i =
                      65536 +
                      (((1023 & i) << 10) | (1023 & t.charCodeAt(++c)))),
                    (a[r >> 2] |= (240 | (i >> 18)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | ((i >> 12) & 63)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | ((i >> 6) & 63)) << p[3 & r++]),
                    (a[r >> 2] |= (128 | (63 & i)) << p[3 & r++]));
            if (((this.lastByteIndex = r), r >= s)) {
              for (this.start = r - s, this.block = a[l], r = 0; r < l; ++r)
                f[r] ^= a[r];
              F(f), (this.reset = !0);
            } else this.start = r;
          }
          return this;
        }),
          (L.prototype.encode = function (t, e) {
            var n = 255 & t,
              r = 1,
              i = [n];
            for (n = 255 & (t >>= 8); n > 0; )
              i.unshift(n), (n = 255 & (t >>= 8)), ++r;
            return e ? i.push(r) : i.unshift(r), this.update(i), i.length;
          }),
          (L.prototype.encodeString = function (t) {
            var e,
              n = typeof t;
            if ("string" !== n) {
              if ("object" !== n) throw new Error(o);
              if (null === t) throw new Error(o);
              if (h && t.constructor === ArrayBuffer) t = new Uint8Array(t);
              else if (!Array.isArray(t) && (!h || !ArrayBuffer.isView(t)))
                throw new Error(o);
              e = !0;
            }
            var r = 0,
              i = t.length;
            if (e) r = i;
            else
              for (var a = 0; a < t.length; ++a) {
                var s = t.charCodeAt(a);
                s < 128
                  ? (r += 1)
                  : s < 2048
                  ? (r += 2)
                  : s < 55296 || s >= 57344
                  ? (r += 3)
                  : ((s =
                      65536 +
                      (((1023 & s) << 10) | (1023 & t.charCodeAt(++a)))),
                    (r += 4));
              }
            return (r += this.encode(8 * r)), this.update(t), r;
          }),
          (L.prototype.bytepad = function (t, e) {
            for (var n = this.encode(e), r = 0; r < t.length; ++r)
              n += this.encodeString(t[r]);
            var i = e - (n % e),
              o = [];
            return (o.length = i), this.update(o), this;
          }),
          (L.prototype.finalize = function () {
            if (!this.finalized) {
              this.finalized = !0;
              var t = this.blocks,
                e = this.lastByteIndex,
                n = this.blockCount,
                r = this.s;
              if (
                ((t[e >> 2] |= this.padding[3 & e]),
                this.lastByteIndex === this.byteCount)
              )
                for (t[0] = t[n], e = 1; e < n + 1; ++e) t[e] = 0;
              for (t[n - 1] |= 2147483648, e = 0; e < n; ++e) r[e] ^= t[e];
              F(r);
            }
          }),
          (L.prototype.toString = L.prototype.hex =
            function () {
              this.finalize();
              for (
                var t,
                  e = this.blockCount,
                  n = this.s,
                  r = this.outputBlocks,
                  i = this.extraBytes,
                  o = 0,
                  a = 0,
                  s = "";
                a < r;

              ) {
                for (o = 0; o < e && a < r; ++o, ++a)
                  (t = n[o]),
                    (s +=
                      f[(t >> 4) & 15] +
                      f[15 & t] +
                      f[(t >> 12) & 15] +
                      f[(t >> 8) & 15] +
                      f[(t >> 20) & 15] +
                      f[(t >> 16) & 15] +
                      f[(t >> 28) & 15] +
                      f[(t >> 24) & 15]);
                a % e === 0 && (F(n), (o = 0));
              }
              return (
                i &&
                  ((t = n[o]),
                  (s += f[(t >> 4) & 15] + f[15 & t]),
                  i > 1 && (s += f[(t >> 12) & 15] + f[(t >> 8) & 15]),
                  i > 2 && (s += f[(t >> 20) & 15] + f[(t >> 16) & 15])),
                s
              );
            }),
          (L.prototype.arrayBuffer = function () {
            this.finalize();
            var t,
              e = this.blockCount,
              n = this.s,
              r = this.outputBlocks,
              i = this.extraBytes,
              o = 0,
              a = 0,
              s = this.outputBits >> 3;
            t = i ? new ArrayBuffer((r + 1) << 2) : new ArrayBuffer(s);
            for (var u = new Uint32Array(t); a < r; ) {
              for (o = 0; o < e && a < r; ++o, ++a) u[a] = n[o];
              a % e === 0 && F(n);
            }
            return i && ((u[o] = n[o]), (t = t.slice(0, s))), t;
          }),
          (L.prototype.buffer = L.prototype.arrayBuffer),
          (L.prototype.digest = L.prototype.array =
            function () {
              this.finalize();
              for (
                var t,
                  e,
                  n = this.blockCount,
                  r = this.s,
                  i = this.outputBlocks,
                  o = this.extraBytes,
                  a = 0,
                  s = 0,
                  u = [];
                s < i;

              ) {
                for (a = 0; a < n && s < i; ++a, ++s)
                  (t = s << 2),
                    (e = r[a]),
                    (u[t] = 255 & e),
                    (u[t + 1] = (e >> 8) & 255),
                    (u[t + 2] = (e >> 16) & 255),
                    (u[t + 3] = (e >> 24) & 255);
                s % n === 0 && F(r);
              }
              return (
                o &&
                  ((t = s << 2),
                  (e = r[a]),
                  (u[t] = 255 & e),
                  o > 1 && (u[t + 1] = (e >> 8) & 255),
                  o > 2 && (u[t + 2] = (e >> 16) & 255)),
                u
              );
            }),
          (B.prototype = new L()),
          (B.prototype.finalize = function () {
            return (
              this.encode(this.outputBits, !0), L.prototype.finalize.call(this)
            );
          });
        var F = function (t) {
          var e,
            n,
            r,
            i,
            o,
            a,
            s,
            u,
            l,
            c,
            h,
            f,
            d,
            p,
            y,
            g,
            v,
            b,
            w,
            x,
            E,
            T,
            A,
            M,
            _,
            k,
            S,
            P,
            O,
            R,
            N,
            I,
            C,
            L,
            B,
            F,
            j,
            D,
            U,
            V,
            G,
            z,
            $,
            H,
            q,
            W,
            X,
            Z,
            K,
            J,
            Y,
            Q,
            tt,
            et,
            nt,
            rt,
            it,
            ot,
            at,
            st,
            ut,
            lt,
            ct;
          for (r = 0; r < 48; r += 2)
            (i = t[0] ^ t[10] ^ t[20] ^ t[30] ^ t[40]),
              (o = t[1] ^ t[11] ^ t[21] ^ t[31] ^ t[41]),
              (a = t[2] ^ t[12] ^ t[22] ^ t[32] ^ t[42]),
              (s = t[3] ^ t[13] ^ t[23] ^ t[33] ^ t[43]),
              (u = t[4] ^ t[14] ^ t[24] ^ t[34] ^ t[44]),
              (l = t[5] ^ t[15] ^ t[25] ^ t[35] ^ t[45]),
              (c = t[6] ^ t[16] ^ t[26] ^ t[36] ^ t[46]),
              (h = t[7] ^ t[17] ^ t[27] ^ t[37] ^ t[47]),
              (e =
                (f = t[8] ^ t[18] ^ t[28] ^ t[38] ^ t[48]) ^
                ((a << 1) | (s >>> 31))),
              (n =
                (d = t[9] ^ t[19] ^ t[29] ^ t[39] ^ t[49]) ^
                ((s << 1) | (a >>> 31))),
              (t[0] ^= e),
              (t[1] ^= n),
              (t[10] ^= e),
              (t[11] ^= n),
              (t[20] ^= e),
              (t[21] ^= n),
              (t[30] ^= e),
              (t[31] ^= n),
              (t[40] ^= e),
              (t[41] ^= n),
              (e = i ^ ((u << 1) | (l >>> 31))),
              (n = o ^ ((l << 1) | (u >>> 31))),
              (t[2] ^= e),
              (t[3] ^= n),
              (t[12] ^= e),
              (t[13] ^= n),
              (t[22] ^= e),
              (t[23] ^= n),
              (t[32] ^= e),
              (t[33] ^= n),
              (t[42] ^= e),
              (t[43] ^= n),
              (e = a ^ ((c << 1) | (h >>> 31))),
              (n = s ^ ((h << 1) | (c >>> 31))),
              (t[4] ^= e),
              (t[5] ^= n),
              (t[14] ^= e),
              (t[15] ^= n),
              (t[24] ^= e),
              (t[25] ^= n),
              (t[34] ^= e),
              (t[35] ^= n),
              (t[44] ^= e),
              (t[45] ^= n),
              (e = u ^ ((f << 1) | (d >>> 31))),
              (n = l ^ ((d << 1) | (f >>> 31))),
              (t[6] ^= e),
              (t[7] ^= n),
              (t[16] ^= e),
              (t[17] ^= n),
              (t[26] ^= e),
              (t[27] ^= n),
              (t[36] ^= e),
              (t[37] ^= n),
              (t[46] ^= e),
              (t[47] ^= n),
              (e = c ^ ((i << 1) | (o >>> 31))),
              (n = h ^ ((o << 1) | (i >>> 31))),
              (t[8] ^= e),
              (t[9] ^= n),
              (t[18] ^= e),
              (t[19] ^= n),
              (t[28] ^= e),
              (t[29] ^= n),
              (t[38] ^= e),
              (t[39] ^= n),
              (t[48] ^= e),
              (t[49] ^= n),
              (p = t[0]),
              (y = t[1]),
              (W = (t[11] << 4) | (t[10] >>> 28)),
              (X = (t[10] << 4) | (t[11] >>> 28)),
              (P = (t[20] << 3) | (t[21] >>> 29)),
              (O = (t[21] << 3) | (t[20] >>> 29)),
              (st = (t[31] << 9) | (t[30] >>> 23)),
              (ut = (t[30] << 9) | (t[31] >>> 23)),
              (z = (t[40] << 18) | (t[41] >>> 14)),
              ($ = (t[41] << 18) | (t[40] >>> 14)),
              (L = (t[2] << 1) | (t[3] >>> 31)),
              (B = (t[3] << 1) | (t[2] >>> 31)),
              (g = (t[13] << 12) | (t[12] >>> 20)),
              (v = (t[12] << 12) | (t[13] >>> 20)),
              (Z = (t[22] << 10) | (t[23] >>> 22)),
              (K = (t[23] << 10) | (t[22] >>> 22)),
              (R = (t[33] << 13) | (t[32] >>> 19)),
              (N = (t[32] << 13) | (t[33] >>> 19)),
              (lt = (t[42] << 2) | (t[43] >>> 30)),
              (ct = (t[43] << 2) | (t[42] >>> 30)),
              (et = (t[5] << 30) | (t[4] >>> 2)),
              (nt = (t[4] << 30) | (t[5] >>> 2)),
              (F = (t[14] << 6) | (t[15] >>> 26)),
              (j = (t[15] << 6) | (t[14] >>> 26)),
              (b = (t[25] << 11) | (t[24] >>> 21)),
              (w = (t[24] << 11) | (t[25] >>> 21)),
              (J = (t[34] << 15) | (t[35] >>> 17)),
              (Y = (t[35] << 15) | (t[34] >>> 17)),
              (I = (t[45] << 29) | (t[44] >>> 3)),
              (C = (t[44] << 29) | (t[45] >>> 3)),
              (M = (t[6] << 28) | (t[7] >>> 4)),
              (_ = (t[7] << 28) | (t[6] >>> 4)),
              (rt = (t[17] << 23) | (t[16] >>> 9)),
              (it = (t[16] << 23) | (t[17] >>> 9)),
              (D = (t[26] << 25) | (t[27] >>> 7)),
              (U = (t[27] << 25) | (t[26] >>> 7)),
              (x = (t[36] << 21) | (t[37] >>> 11)),
              (E = (t[37] << 21) | (t[36] >>> 11)),
              (Q = (t[47] << 24) | (t[46] >>> 8)),
              (tt = (t[46] << 24) | (t[47] >>> 8)),
              (H = (t[8] << 27) | (t[9] >>> 5)),
              (q = (t[9] << 27) | (t[8] >>> 5)),
              (k = (t[18] << 20) | (t[19] >>> 12)),
              (S = (t[19] << 20) | (t[18] >>> 12)),
              (ot = (t[29] << 7) | (t[28] >>> 25)),
              (at = (t[28] << 7) | (t[29] >>> 25)),
              (V = (t[38] << 8) | (t[39] >>> 24)),
              (G = (t[39] << 8) | (t[38] >>> 24)),
              (T = (t[48] << 14) | (t[49] >>> 18)),
              (A = (t[49] << 14) | (t[48] >>> 18)),
              (t[0] = p ^ (~g & b)),
              (t[1] = y ^ (~v & w)),
              (t[10] = M ^ (~k & P)),
              (t[11] = _ ^ (~S & O)),
              (t[20] = L ^ (~F & D)),
              (t[21] = B ^ (~j & U)),
              (t[30] = H ^ (~W & Z)),
              (t[31] = q ^ (~X & K)),
              (t[40] = et ^ (~rt & ot)),
              (t[41] = nt ^ (~it & at)),
              (t[2] = g ^ (~b & x)),
              (t[3] = v ^ (~w & E)),
              (t[12] = k ^ (~P & R)),
              (t[13] = S ^ (~O & N)),
              (t[22] = F ^ (~D & V)),
              (t[23] = j ^ (~U & G)),
              (t[32] = W ^ (~Z & J)),
              (t[33] = X ^ (~K & Y)),
              (t[42] = rt ^ (~ot & st)),
              (t[43] = it ^ (~at & ut)),
              (t[4] = b ^ (~x & T)),
              (t[5] = w ^ (~E & A)),
              (t[14] = P ^ (~R & I)),
              (t[15] = O ^ (~N & C)),
              (t[24] = D ^ (~V & z)),
              (t[25] = U ^ (~G & $)),
              (t[34] = Z ^ (~J & Q)),
              (t[35] = K ^ (~Y & tt)),
              (t[44] = ot ^ (~st & lt)),
              (t[45] = at ^ (~ut & ct)),
              (t[6] = x ^ (~T & p)),
              (t[7] = E ^ (~A & y)),
              (t[16] = R ^ (~I & M)),
              (t[17] = N ^ (~C & _)),
              (t[26] = V ^ (~z & L)),
              (t[27] = G ^ (~$ & B)),
              (t[36] = J ^ (~Q & H)),
              (t[37] = Y ^ (~tt & q)),
              (t[46] = st ^ (~lt & et)),
              (t[47] = ut ^ (~ct & nt)),
              (t[8] = T ^ (~p & g)),
              (t[9] = A ^ (~y & v)),
              (t[18] = I ^ (~M & k)),
              (t[19] = C ^ (~_ & S)),
              (t[28] = z ^ (~L & F)),
              (t[29] = $ ^ (~B & j)),
              (t[38] = Q ^ (~H & W)),
              (t[39] = tt ^ (~q & X)),
              (t[48] = lt ^ (~et & rt)),
              (t[49] = ct ^ (~nt & it)),
              (t[0] ^= m[r]),
              (t[1] ^= m[r + 1]);
        };
        if (l) t.exports = k;
        else {
          for (P = 0; P < S.length; ++P) s[S[P]] = k[S[P]];
          c &&
            (void 0 ===
              (r = function () {
                return k;
              }.call(e, n, e, t)) ||
              (t.exports = r));
        }
      })();
    },
    9746: function (t) {
      function e(t, e) {
        if (!t) throw new Error(e || "Assertion failed");
      }
      (t.exports = e),
        (e.equal = function (t, e, n) {
          if (t != e)
            throw new Error(n || "Assertion failed: " + t + " != " + e);
        });
    },
    2962: function (t, e, n) {
      "use strict";
      n.d(e, {
        lX: function () {
          return u;
        },
        PB: function () {
          return l;
        },
      });
      var r = n(9008),
        i = n(7294);
      const o = {
          templateTitle: "",
          noindex: !1,
          nofollow: !1,
          defaultOpenGraphImageWidth: 0,
          defaultOpenGraphImageHeight: 0,
          defaultOpenGraphVideoWidth: 0,
          defaultOpenGraphVideoHeight: 0,
        },
        a = (t, e = [], { defaultWidth: n, defaultHeight: r } = {}) =>
          e.reduce(
            (e, o, a) => (
              e.push(
                i.createElement("meta", {
                  key: `og:${t}:0${a}`,
                  property: `og:${t}`,
                  content: o.url,
                })
              ),
              o.alt &&
                e.push(
                  i.createElement("meta", {
                    key: `og:${t}:alt0${a}`,
                    property: `og:${t}:alt`,
                    content: o.alt,
                  })
                ),
              o.secureUrl &&
                e.push(
                  i.createElement("meta", {
                    key: `og:${t}:secure_url0${a}`,
                    property: `og:${t}:secure_url`,
                    content: o.secureUrl.toString(),
                  })
                ),
              o.type &&
                e.push(
                  i.createElement("meta", {
                    key: `og:${t}:type0${a}`,
                    property: `og:${t}:type`,
                    content: o.type.toString(),
                  })
                ),
              o.width
                ? e.push(
                    i.createElement("meta", {
                      key: `og:${t}:width0${a}`,
                      property: `og:${t}:width`,
                      content: o.width.toString(),
                    })
                  )
                : n &&
                  e.push(
                    i.createElement("meta", {
                      key: `og:${t}:width0${a}`,
                      property: `og:${t}:width`,
                      content: n.toString(),
                    })
                  ),
              o.height
                ? e.push(
                    i.createElement("meta", {
                      key: `og:${t}:height${a}`,
                      property: `og:${t}:height`,
                      content: o.height.toString(),
                    })
                  )
                : r &&
                  e.push(
                    i.createElement("meta", {
                      key: `og:${t}:height${a}`,
                      property: `og:${t}:height`,
                      content: r.toString(),
                    })
                  ),
              e
            ),
            []
          ),
        s = (t) => {
          const e = [];
          t.titleTemplate && (o.templateTitle = t.titleTemplate);
          let n = "";
          t.title
            ? ((n = t.title),
              o.templateTitle && (n = o.templateTitle.replace(/%s/g, () => n)))
            : t.defaultTitle && (n = t.defaultTitle),
            n && e.push(i.createElement("title", { key: "title" }, n));
          const r = t.noindex || o.noindex || t.dangerouslySetAllPagesToNoIndex,
            s = t.nofollow || o.nofollow || t.dangerouslySetAllPagesToNoFollow;
          let u = "";
          if (t.robotsProps) {
            const {
              nosnippet: e,
              maxSnippet: n,
              maxImagePreview: r,
              maxVideoPreview: i,
              noarchive: o,
              noimageindex: a,
              notranslate: s,
              unavailableAfter: l,
            } = t.robotsProps;
            u = `${e ? ",nosnippet" : ""}${n ? `,max-snippet:${n}` : ""}${
              r ? `,max-image-preview:${r}` : ""
            }${o ? ",noarchive" : ""}${l ? `,unavailable_after:${l}` : ""}${
              a ? ",noimageindex" : ""
            }${i ? `,max-video-preview:${i}` : ""}${s ? ",notranslate" : ""}`;
          }
          if (
            (r || s
              ? (t.dangerouslySetAllPagesToNoIndex && (o.noindex = !0),
                t.dangerouslySetAllPagesToNoFollow && (o.nofollow = !0),
                e.push(
                  i.createElement("meta", {
                    key: "robots",
                    name: "robots",
                    content: `${r ? "noindex" : "index"},${
                      s ? "nofollow" : "follow"
                    }${u}`,
                  })
                ))
              : e.push(
                  i.createElement("meta", {
                    key: "robots",
                    name: "robots",
                    content: `index,follow${u}`,
                  })
                ),
            t.description &&
              e.push(
                i.createElement("meta", {
                  key: "description",
                  name: "description",
                  content: t.description,
                })
              ),
            t.mobileAlternate &&
              e.push(
                i.createElement("link", {
                  rel: "alternate",
                  key: "mobileAlternate",
                  media: t.mobileAlternate.media,
                  href: t.mobileAlternate.href,
                })
              ),
            t.languageAlternates &&
              t.languageAlternates.length > 0 &&
              t.languageAlternates.forEach((t) => {
                e.push(
                  i.createElement("link", {
                    rel: "alternate",
                    key: `languageAlternate-${t.hrefLang}`,
                    hrefLang: t.hrefLang,
                    href: t.href,
                  })
                );
              }),
            t.twitter &&
              (t.twitter.cardType &&
                e.push(
                  i.createElement("meta", {
                    key: "twitter:card",
                    name: "twitter:card",
                    content: t.twitter.cardType,
                  })
                ),
              t.twitter.site &&
                e.push(
                  i.createElement("meta", {
                    key: "twitter:site",
                    name: "twitter:site",
                    content: t.twitter.site,
                  })
                ),
              t.twitter.handle &&
                e.push(
                  i.createElement("meta", {
                    key: "twitter:creator",
                    name: "twitter:creator",
                    content: t.twitter.handle,
                  })
                )),
            t.facebook &&
              t.facebook.appId &&
              e.push(
                i.createElement("meta", {
                  key: "fb:app_id",
                  property: "fb:app_id",
                  content: t.facebook.appId,
                })
              ),
            (t.openGraph?.title || n) &&
              e.push(
                i.createElement("meta", {
                  key: "og:title",
                  property: "og:title",
                  content: t.openGraph?.title || n,
                })
              ),
            (t.openGraph?.description || t.description) &&
              e.push(
                i.createElement("meta", {
                  key: "og:description",
                  property: "og:description",
                  content: t.openGraph?.description || t.description,
                })
              ),
            t.openGraph)
          ) {
            if (
              ((t.openGraph.url || t.canonical) &&
                e.push(
                  i.createElement("meta", {
                    key: "og:url",
                    property: "og:url",
                    content: t.openGraph.url || t.canonical,
                  })
                ),
              t.openGraph.type)
            ) {
              const n = t.openGraph.type.toLowerCase();
              e.push(
                i.createElement("meta", {
                  key: "og:type",
                  property: "og:type",
                  content: n,
                })
              ),
                "profile" === n && t.openGraph.profile
                  ? (t.openGraph.profile.firstName &&
                      e.push(
                        i.createElement("meta", {
                          key: "profile:first_name",
                          property: "profile:first_name",
                          content: t.openGraph.profile.firstName,
                        })
                      ),
                    t.openGraph.profile.lastName &&
                      e.push(
                        i.createElement("meta", {
                          key: "profile:last_name",
                          property: "profile:last_name",
                          content: t.openGraph.profile.lastName,
                        })
                      ),
                    t.openGraph.profile.username &&
                      e.push(
                        i.createElement("meta", {
                          key: "profile:username",
                          property: "profile:username",
                          content: t.openGraph.profile.username,
                        })
                      ),
                    t.openGraph.profile.gender &&
                      e.push(
                        i.createElement("meta", {
                          key: "profile:gender",
                          property: "profile:gender",
                          content: t.openGraph.profile.gender,
                        })
                      ))
                  : "book" === n && t.openGraph.book
                  ? (t.openGraph.book.authors &&
                      t.openGraph.book.authors.length &&
                      t.openGraph.book.authors.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `book:author:0${n}`,
                            property: "book:author",
                            content: t,
                          })
                        );
                      }),
                    t.openGraph.book.isbn &&
                      e.push(
                        i.createElement("meta", {
                          key: "book:isbn",
                          property: "book:isbn",
                          content: t.openGraph.book.isbn,
                        })
                      ),
                    t.openGraph.book.releaseDate &&
                      e.push(
                        i.createElement("meta", {
                          key: "book:release_date",
                          property: "book:release_date",
                          content: t.openGraph.book.releaseDate,
                        })
                      ),
                    t.openGraph.book.tags &&
                      t.openGraph.book.tags.length &&
                      t.openGraph.book.tags.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `book:tag:0${n}`,
                            property: "book:tag",
                            content: t,
                          })
                        );
                      }))
                  : "article" === n && t.openGraph.article
                  ? (t.openGraph.article.publishedTime &&
                      e.push(
                        i.createElement("meta", {
                          key: "article:published_time",
                          property: "article:published_time",
                          content: t.openGraph.article.publishedTime,
                        })
                      ),
                    t.openGraph.article.modifiedTime &&
                      e.push(
                        i.createElement("meta", {
                          key: "article:modified_time",
                          property: "article:modified_time",
                          content: t.openGraph.article.modifiedTime,
                        })
                      ),
                    t.openGraph.article.expirationTime &&
                      e.push(
                        i.createElement("meta", {
                          key: "article:expiration_time",
                          property: "article:expiration_time",
                          content: t.openGraph.article.expirationTime,
                        })
                      ),
                    t.openGraph.article.authors &&
                      t.openGraph.article.authors.length &&
                      t.openGraph.article.authors.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `article:author:0${n}`,
                            property: "article:author",
                            content: t,
                          })
                        );
                      }),
                    t.openGraph.article.section &&
                      e.push(
                        i.createElement("meta", {
                          key: "article:section",
                          property: "article:section",
                          content: t.openGraph.article.section,
                        })
                      ),
                    t.openGraph.article.tags &&
                      t.openGraph.article.tags.length &&
                      t.openGraph.article.tags.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `article:tag:0${n}`,
                            property: "article:tag",
                            content: t,
                          })
                        );
                      }))
                  : ("video.movie" !== n &&
                      "video.episode" !== n &&
                      "video.tv_show" !== n &&
                      "video.other" !== n) ||
                    !t.openGraph.video ||
                    (t.openGraph.video.actors &&
                      t.openGraph.video.actors.length &&
                      t.openGraph.video.actors.forEach((t, n) => {
                        t.profile &&
                          e.push(
                            i.createElement("meta", {
                              key: `video:actor:0${n}`,
                              property: "video:actor",
                              content: t.profile,
                            })
                          ),
                          t.role &&
                            e.push(
                              i.createElement("meta", {
                                key: `video:actor:role:0${n}`,
                                property: "video:actor:role",
                                content: t.role,
                              })
                            );
                      }),
                    t.openGraph.video.directors &&
                      t.openGraph.video.directors.length &&
                      t.openGraph.video.directors.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `video:director:0${n}`,
                            property: "video:director",
                            content: t,
                          })
                        );
                      }),
                    t.openGraph.video.writers &&
                      t.openGraph.video.writers.length &&
                      t.openGraph.video.writers.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `video:writer:0${n}`,
                            property: "video:writer",
                            content: t,
                          })
                        );
                      }),
                    t.openGraph.video.duration &&
                      e.push(
                        i.createElement("meta", {
                          key: "video:duration",
                          property: "video:duration",
                          content: t.openGraph.video.duration.toString(),
                        })
                      ),
                    t.openGraph.video.releaseDate &&
                      e.push(
                        i.createElement("meta", {
                          key: "video:release_date",
                          property: "video:release_date",
                          content: t.openGraph.video.releaseDate,
                        })
                      ),
                    t.openGraph.video.tags &&
                      t.openGraph.video.tags.length &&
                      t.openGraph.video.tags.forEach((t, n) => {
                        e.push(
                          i.createElement("meta", {
                            key: `video:tag:0${n}`,
                            property: "video:tag",
                            content: t,
                          })
                        );
                      }),
                    t.openGraph.video.series &&
                      e.push(
                        i.createElement("meta", {
                          key: "video:series",
                          property: "video:series",
                          content: t.openGraph.video.series,
                        })
                      ));
            }
            t.defaultOpenGraphImageWidth &&
              (o.defaultOpenGraphImageWidth = t.defaultOpenGraphImageWidth),
              t.defaultOpenGraphImageHeight &&
                (o.defaultOpenGraphImageHeight = t.defaultOpenGraphImageHeight),
              t.openGraph.images &&
                t.openGraph.images.length &&
                e.push(
                  ...a("image", t.openGraph.images, {
                    defaultWidth: o.defaultOpenGraphImageWidth,
                    defaultHeight: o.defaultOpenGraphImageHeight,
                  })
                ),
              t.defaultOpenGraphVideoWidth &&
                (o.defaultOpenGraphVideoWidth = t.defaultOpenGraphVideoWidth),
              t.defaultOpenGraphVideoHeight &&
                (o.defaultOpenGraphVideoHeight = t.defaultOpenGraphVideoHeight),
              t.openGraph.videos &&
                t.openGraph.videos.length &&
                e.push(
                  ...a("video", t.openGraph.videos, {
                    defaultWidth: o.defaultOpenGraphVideoWidth,
                    defaultHeight: o.defaultOpenGraphVideoHeight,
                  })
                ),
              t.openGraph.locale &&
                e.push(
                  i.createElement("meta", {
                    key: "og:locale",
                    property: "og:locale",
                    content: t.openGraph.locale,
                  })
                ),
              t.openGraph.site_name &&
                e.push(
                  i.createElement("meta", {
                    key: "og:site_name",
                    property: "og:site_name",
                    content: t.openGraph.site_name,
                  })
                );
          }
          return (
            t.canonical &&
              e.push(
                i.createElement("link", {
                  rel: "canonical",
                  href: t.canonical,
                  key: "canonical",
                })
              ),
            t.additionalMetaTags &&
              t.additionalMetaTags.length > 0 &&
              t.additionalMetaTags.forEach((t) => {
                e.push(
                  i.createElement("meta", {
                    key: `meta:${
                      t.keyOverride ?? t.name ?? t.property ?? t.httpEquiv
                    }`,
                    ...t,
                  })
                );
              }),
            t.additionalLinkTags?.length &&
              t.additionalLinkTags.forEach((t) => {
                e.push(
                  i.createElement("link", {
                    key: `link${t.keyOverride ?? t.href}${t.rel}`,
                    ...t,
                  })
                );
              }),
            e
          );
        };
      class u extends i.Component {
        render() {
          const {
            title: t,
            titleTemplate: e,
            defaultTitle: n,
            dangerouslySetAllPagesToNoIndex: o = !1,
            dangerouslySetAllPagesToNoFollow: a = !1,
            description: u,
            canonical: l,
            facebook: c,
            openGraph: h,
            additionalMetaTags: f,
            twitter: d,
            defaultOpenGraphImageWidth: p,
            defaultOpenGraphImageHeight: m,
            defaultOpenGraphVideoWidth: y,
            defaultOpenGraphVideoHeight: g,
            mobileAlternate: v,
            languageAlternates: b,
            additionalLinkTags: w,
            robotsProps: x,
          } = this.props;
          return i.createElement(
            r.default,
            null,
            s({
              title: t,
              titleTemplate: e,
              defaultTitle: n,
              dangerouslySetAllPagesToNoIndex: o,
              dangerouslySetAllPagesToNoFollow: a,
              description: u,
              canonical: l,
              facebook: c,
              openGraph: h,
              additionalMetaTags: f,
              twitter: d,
              defaultOpenGraphImageWidth: p,
              defaultOpenGraphImageHeight: m,
              defaultOpenGraphVideoWidth: y,
              defaultOpenGraphVideoHeight: g,
              mobileAlternate: v,
              languageAlternates: b,
              additionalLinkTags: w,
              robotsProps: x,
            })
          );
        }
      }
      class l extends i.Component {
        render() {
          const {
            title: t,
            noindex: e = !1,
            nofollow: n,
            robotsProps: o,
            description: a,
            canonical: u,
            openGraph: l,
            facebook: c,
            twitter: h,
            additionalMetaTags: f,
            titleTemplate: d,
            mobileAlternate: p,
            languageAlternates: m,
            additionalLinkTags: y,
          } = this.props;
          return i.createElement(
            r.default,
            null,
            s({
              title: t,
              noindex: e,
              nofollow: n,
              robotsProps: o,
              description: a,
              canonical: u,
              facebook: c,
              openGraph: l,
              additionalMetaTags: f,
              twitter: h,
              titleTemplate: d,
              mobileAlternate: p,
              languageAlternates: m,
              additionalLinkTags: y,
            })
          );
        }
      }
    },
    3454: function (t, e, n) {
      "use strict";
      var r, i;
      t.exports =
        (null === (r = n.g.process) || void 0 === r ? void 0 : r.env) &&
        "object" ===
          typeof (null === (i = n.g.process) || void 0 === i ? void 0 : i.env)
          ? n.g.process
          : n(7663);
    },
    6363: function (t, e, n) {
      (window.__NEXT_P = window.__NEXT_P || []).push([
        "/_app",
        function () {
          return n(2732);
        },
      ]);
    },
    8418: function (t, e, n) {
      "use strict";
      function r(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function i(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n =
              null == t
                ? null
                : ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
            if (null != n) {
              var r,
                i,
                o = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(t);
                  !(a = (r = n.next()).done) &&
                  (o.push(r.value), !e || o.length !== e);
                  a = !0
                );
              } catch (u) {
                (s = !0), (i = u);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw i;
                }
              }
              return o;
            }
          })(t, e) ||
          (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return r(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return r(t, e);
          })(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      e.default = void 0;
      var o,
        a = (o = n(7294)) && o.__esModule ? o : { default: o },
        s = n(6273),
        u = n(387),
        l = n(7190);
      var c = {};
      function h(t, e, n, r) {
        if (t && s.isLocalURL(e)) {
          t.prefetch(e, n, r).catch(function (t) {
            0;
          });
          var i =
            r && "undefined" !== typeof r.locale ? r.locale : t && t.locale;
          c[e + "%" + n + (i ? "%" + i : "")] = !0;
        }
      }
      var f = function (t) {
        var e,
          n = !1 !== t.prefetch,
          r = u.useRouter(),
          o = a.default.useMemo(
            function () {
              var e = i(s.resolveHref(r, t.href, !0), 2),
                n = e[0],
                o = e[1];
              return { href: n, as: t.as ? s.resolveHref(r, t.as) : o || n };
            },
            [r, t.href, t.as]
          ),
          f = o.href,
          d = o.as,
          p = t.children,
          m = t.replace,
          y = t.shallow,
          g = t.scroll,
          v = t.locale;
        "string" === typeof p && (p = a.default.createElement("a", null, p));
        var b =
            (e = a.default.Children.only(p)) && "object" === typeof e && e.ref,
          w = i(l.useIntersection({ rootMargin: "200px" }), 2),
          x = w[0],
          E = w[1],
          T = a.default.useCallback(
            function (t) {
              x(t),
                b &&
                  ("function" === typeof b
                    ? b(t)
                    : "object" === typeof b && (b.current = t));
            },
            [b, x]
          );
        a.default.useEffect(
          function () {
            var t = E && n && s.isLocalURL(f),
              e = "undefined" !== typeof v ? v : r && r.locale,
              i = c[f + "%" + d + (e ? "%" + e : "")];
            t && !i && h(r, f, d, { locale: e });
          },
          [d, f, E, v, n, r]
        );
        var A = {
          ref: T,
          onClick: function (t) {
            e.props &&
              "function" === typeof e.props.onClick &&
              e.props.onClick(t),
              t.defaultPrevented ||
                (function (t, e, n, r, i, o, a, u) {
                  ("A" !== t.currentTarget.nodeName.toUpperCase() ||
                    (!(function (t) {
                      var e = t.currentTarget.target;
                      return (
                        (e && "_self" !== e) ||
                        t.metaKey ||
                        t.ctrlKey ||
                        t.shiftKey ||
                        t.altKey ||
                        (t.nativeEvent && 2 === t.nativeEvent.which)
                      );
                    })(t) &&
                      s.isLocalURL(n))) &&
                    (t.preventDefault(),
                    e[i ? "replace" : "push"](n, r, {
                      shallow: o,
                      locale: u,
                      scroll: a,
                    }));
                })(t, r, f, d, m, y, g, v);
          },
          onMouseEnter: function (t) {
            e.props &&
              "function" === typeof e.props.onMouseEnter &&
              e.props.onMouseEnter(t),
              s.isLocalURL(f) && h(r, f, d, { priority: !0 });
          },
        };
        if (t.passHref || ("a" === e.type && !("href" in e.props))) {
          var M = "undefined" !== typeof v ? v : r && r.locale,
            _ =
              r &&
              r.isLocaleDomain &&
              s.getDomainLocale(d, M, r && r.locales, r && r.domainLocales);
          A.href = _ || s.addBasePath(s.addLocale(d, M, r && r.defaultLocale));
        }
        return a.default.cloneElement(e, A);
      };
      e.default = f;
    },
    7190: function (t, e, n) {
      "use strict";
      function r(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function i(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n =
              null == t
                ? null
                : ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
            if (null != n) {
              var r,
                i,
                o = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(t);
                  !(a = (r = n.next()).done) &&
                  (o.push(r.value), !e || o.length !== e);
                  a = !0
                );
              } catch (u) {
                (s = !0), (i = u);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw i;
                }
              }
              return o;
            }
          })(t, e) ||
          (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return r(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return r(t, e);
          })(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.useIntersection = function (t) {
          var e = t.rootRef,
            n = t.rootMargin,
            r = t.disabled || !s,
            c = o.useRef(),
            h = i(o.useState(!1), 2),
            f = h[0],
            d = h[1],
            p = i(o.useState(e ? e.current : null), 2),
            m = p[0],
            y = p[1],
            g = o.useCallback(
              function (t) {
                c.current && (c.current(), (c.current = void 0)),
                  r ||
                    f ||
                    (t &&
                      t.tagName &&
                      (c.current = (function (t, e, n) {
                        var r = (function (t) {
                            var e,
                              n = {
                                root: t.root || null,
                                margin: t.rootMargin || "",
                              },
                              r = l.find(function (t) {
                                return (
                                  t.root === n.root && t.margin === n.margin
                                );
                              });
                            r ? (e = u.get(r)) : ((e = u.get(n)), l.push(n));
                            if (e) return e;
                            var i = new Map(),
                              o = new IntersectionObserver(function (t) {
                                t.forEach(function (t) {
                                  var e = i.get(t.target),
                                    n =
                                      t.isIntersecting ||
                                      t.intersectionRatio > 0;
                                  e && n && e(n);
                                });
                              }, t);
                            return (
                              u.set(
                                n,
                                (e = { id: n, observer: o, elements: i })
                              ),
                              e
                            );
                          })(n),
                          i = r.id,
                          o = r.observer,
                          a = r.elements;
                        return (
                          a.set(t, e),
                          o.observe(t),
                          function () {
                            if ((a.delete(t), o.unobserve(t), 0 === a.size)) {
                              o.disconnect(), u.delete(i);
                              var e = l.findIndex(function (t) {
                                return (
                                  t.root === i.root && t.margin === i.margin
                                );
                              });
                              e > -1 && l.splice(e, 1);
                            }
                          }
                        );
                      })(
                        t,
                        function (t) {
                          return t && d(t);
                        },
                        { root: m, rootMargin: n }
                      )));
              },
              [r, m, n, f]
            );
          return (
            o.useEffect(
              function () {
                if (!s && !f) {
                  var t = a.requestIdleCallback(function () {
                    return d(!0);
                  });
                  return function () {
                    return a.cancelIdleCallback(t);
                  };
                }
              },
              [f]
            ),
            o.useEffect(
              function () {
                e && y(e.current);
              },
              [e]
            ),
            [g, f]
          );
        });
      var o = n(7294),
        a = n(9311),
        s = "undefined" !== typeof IntersectionObserver;
      var u = new Map(),
        l = [];
    },
    5939: function (t, e, n) {
      "use strict";
      n.d(e, {
        iG: function () {
          return U;
        },
        Ui: function () {
          return D;
        },
        yE: function () {
          return j;
        },
        Q6: function () {
          return B;
        },
        rK: function () {
          return k;
        },
        fI: function () {
          return C;
        },
        ev: function () {
          return F;
        },
      });
      var r = n(1184),
        i = n(8198),
        o = n(1556),
        a = n(8088),
        s = n(9485),
        u = n(2593),
        l = n(6441),
        c = n(6881),
        h = n(3875),
        f = n(1581);
      var d = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const p = new f.Logger("contracts/5.5.0");
      function m(t, e) {
        return d(this, void 0, void 0, function* () {
          const n = yield e;
          "string" !== typeof n &&
            p.throwArgumentError("invalid address or ENS name", "name", n);
          try {
            return (0, s.getAddress)(n);
          } catch (i) {}
          t ||
            p.throwError(
              "a provider or signer is needed to resolve ENS names",
              f.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "resolveName" }
            );
          const r = yield t.resolveName(n);
          return (
            null == r &&
              p.throwArgumentError(
                "resolver or addr is not configured for ENS name",
                "name",
                n
              ),
            r
          );
        });
      }
      function y(t, e, n) {
        return d(this, void 0, void 0, function* () {
          return Array.isArray(n)
            ? yield Promise.all(
                n.map((n, r) => y(t, Array.isArray(e) ? e[r] : e[n.name], n))
              )
            : "address" === n.type
            ? yield m(t, e)
            : "tuple" === n.type
            ? yield y(t, e, n.components)
            : "array" === n.baseType
            ? Array.isArray(e)
              ? yield Promise.all(e.map((e) => y(t, e, n.arrayChildren)))
              : Promise.reject(
                  p.makeError(
                    "invalid value for array",
                    f.Logger.errors.INVALID_ARGUMENT,
                    { argument: "value", value: e }
                  )
                )
            : e;
        });
      }
      function g(t, e, n) {
        return d(this, void 0, void 0, function* () {
          let r = {};
          n.length === e.inputs.length + 1 &&
            "object" === typeof n[n.length - 1] &&
            (r = (0, c.shallowCopy)(n.pop())),
            p.checkArgumentCount(
              n.length,
              e.inputs.length,
              "passed to contract"
            ),
            t.signer
              ? r.from
                ? (r.from = (0, c.resolveProperties)({
                    override: m(t.signer, r.from),
                    signer: t.signer.getAddress(),
                  }).then((t) =>
                    d(this, void 0, void 0, function* () {
                      return (
                        (0, s.getAddress)(t.signer) !== t.override &&
                          p.throwError(
                            "Contract with a Signer cannot override from",
                            f.Logger.errors.UNSUPPORTED_OPERATION,
                            { operation: "overrides.from" }
                          ),
                        t.override
                      );
                    })
                  ))
                : (r.from = t.signer.getAddress())
              : r.from && (r.from = m(t.provider, r.from));
          const i = yield (0, c.resolveProperties)({
              args: y(t.signer || t.provider, n, e.inputs),
              address: t.resolvedAddress,
              overrides: (0, c.resolveProperties)(r) || {},
            }),
            o = t.interface.encodeFunctionData(e, i.args),
            a = { data: o, to: i.address },
            g = i.overrides;
          if (
            (null != g.nonce && (a.nonce = u.O$.from(g.nonce).toNumber()),
            null != g.gasLimit && (a.gasLimit = u.O$.from(g.gasLimit)),
            null != g.gasPrice && (a.gasPrice = u.O$.from(g.gasPrice)),
            null != g.maxFeePerGas &&
              (a.maxFeePerGas = u.O$.from(g.maxFeePerGas)),
            null != g.maxPriorityFeePerGas &&
              (a.maxPriorityFeePerGas = u.O$.from(g.maxPriorityFeePerGas)),
            null != g.from && (a.from = g.from),
            null != g.type && (a.type = g.type),
            null != g.accessList &&
              (a.accessList = (0, h.accessListify)(g.accessList)),
            null == a.gasLimit && null != e.gas)
          ) {
            let t = 21e3;
            const n = (0, l.arrayify)(o);
            for (let e = 0; e < n.length; e++) (t += 4), n[e] && (t += 64);
            a.gasLimit = u.O$.from(e.gas).add(t);
          }
          if (g.value) {
            const t = u.O$.from(g.value);
            t.isZero() ||
              e.payable ||
              p.throwError(
                "non-payable method cannot override value",
                f.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "overrides.value", value: r.value }
              ),
              (a.value = t);
          }
          g.customData && (a.customData = (0, c.shallowCopy)(g.customData)),
            delete r.nonce,
            delete r.gasLimit,
            delete r.gasPrice,
            delete r.from,
            delete r.value,
            delete r.type,
            delete r.accessList,
            delete r.maxFeePerGas,
            delete r.maxPriorityFeePerGas,
            delete r.customData;
          const v = Object.keys(r).filter((t) => null != r[t]);
          return (
            v.length &&
              p.throwError(
                `cannot override ${v.map((t) => JSON.stringify(t)).join(",")}`,
                f.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "overrides", overrides: v }
              ),
            a
          );
        });
      }
      function v(t, e) {
        const n = e.wait.bind(e);
        e.wait = (e) =>
          n(e).then(
            (e) => (
              (e.events = e.logs.map((n) => {
                let r = (0, c.deepCopy)(n),
                  i = null;
                try {
                  i = t.interface.parseLog(n);
                } catch (o) {}
                return (
                  i &&
                    ((r.args = i.args),
                    (r.decode = (e, n) =>
                      t.interface.decodeEventLog(i.eventFragment, e, n)),
                    (r.event = i.name),
                    (r.eventSignature = i.signature)),
                  (r.removeListener = () => t.provider),
                  (r.getBlock = () => t.provider.getBlock(e.blockHash)),
                  (r.getTransaction = () =>
                    t.provider.getTransaction(e.transactionHash)),
                  (r.getTransactionReceipt = () => Promise.resolve(e)),
                  r
                );
              })),
              e
            )
          );
      }
      function b(t, e, n) {
        const r = t.signer || t.provider;
        return function (...i) {
          return d(this, void 0, void 0, function* () {
            let o;
            if (
              i.length === e.inputs.length + 1 &&
              "object" === typeof i[i.length - 1]
            ) {
              const t = (0, c.shallowCopy)(i.pop());
              null != t.blockTag && (o = yield t.blockTag),
                delete t.blockTag,
                i.push(t);
            }
            null != t.deployTransaction && (yield t._deployed(o));
            const a = yield g(t, e, i),
              s = yield r.call(a, o);
            try {
              let r = t.interface.decodeFunctionResult(e, s);
              return n && 1 === e.outputs.length && (r = r[0]), r;
            } catch (u) {
              throw (
                (u.code === f.Logger.errors.CALL_EXCEPTION &&
                  ((u.address = t.address), (u.args = i), (u.transaction = a)),
                u)
              );
            }
          });
        };
      }
      function w(t, e, n) {
        return e.constant
          ? b(t, e, n)
          : (function (t, e) {
              return function (...n) {
                return d(this, void 0, void 0, function* () {
                  t.signer ||
                    p.throwError(
                      "sending a transaction requires a signer",
                      f.Logger.errors.UNSUPPORTED_OPERATION,
                      { operation: "sendTransaction" }
                    ),
                    null != t.deployTransaction && (yield t._deployed());
                  const r = yield g(t, e, n),
                    i = yield t.signer.sendTransaction(r);
                  return v(t, i), i;
                });
              };
            })(t, e);
      }
      function x(t) {
        return !t.address || (null != t.topics && 0 !== t.topics.length)
          ? (t.address || "*") +
              "@" +
              (t.topics
                ? t.topics
                    .map((t) => (Array.isArray(t) ? t.join("|") : t))
                    .join(":")
                : "")
          : "*";
      }
      class E {
        constructor(t, e) {
          (0, c.defineReadOnly)(this, "tag", t),
            (0, c.defineReadOnly)(this, "filter", e),
            (this._listeners = []);
        }
        addListener(t, e) {
          this._listeners.push({ listener: t, once: e });
        }
        removeListener(t) {
          let e = !1;
          this._listeners = this._listeners.filter(
            (n) => !(!e && n.listener === t) || ((e = !0), !1)
          );
        }
        removeAllListeners() {
          this._listeners = [];
        }
        listeners() {
          return this._listeners.map((t) => t.listener);
        }
        listenerCount() {
          return this._listeners.length;
        }
        run(t) {
          const e = this.listenerCount();
          return (
            (this._listeners = this._listeners.filter((e) => {
              const n = t.slice();
              return (
                setTimeout(() => {
                  e.listener.apply(this, n);
                }, 0),
                !e.once
              );
            })),
            e
          );
        }
        prepareEvent(t) {}
        getEmit(t) {
          return [t];
        }
      }
      class T extends E {
        constructor() {
          super("error", null);
        }
      }
      class A extends E {
        constructor(t, e, n, r) {
          const i = { address: t };
          let o = e.getEventTopic(n);
          r
            ? (o !== r[0] &&
                p.throwArgumentError("topic mismatch", "topics", r),
              (i.topics = r.slice()))
            : (i.topics = [o]),
            super(x(i), i),
            (0, c.defineReadOnly)(this, "address", t),
            (0, c.defineReadOnly)(this, "interface", e),
            (0, c.defineReadOnly)(this, "fragment", n);
        }
        prepareEvent(t) {
          super.prepareEvent(t),
            (t.event = this.fragment.name),
            (t.eventSignature = this.fragment.format()),
            (t.decode = (t, e) =>
              this.interface.decodeEventLog(this.fragment, t, e));
          try {
            t.args = this.interface.decodeEventLog(
              this.fragment,
              t.data,
              t.topics
            );
          } catch (e) {
            (t.args = null), (t.decodeError = e);
          }
        }
        getEmit(t) {
          const e = (0, r.BR)(t.args);
          if (e.length) throw e[0].error;
          const n = (t.args || []).slice();
          return n.push(t), n;
        }
      }
      class M extends E {
        constructor(t, e) {
          super("*", { address: t }),
            (0, c.defineReadOnly)(this, "address", t),
            (0, c.defineReadOnly)(this, "interface", e);
        }
        prepareEvent(t) {
          super.prepareEvent(t);
          try {
            const e = this.interface.parseLog(t);
            (t.event = e.name),
              (t.eventSignature = e.signature),
              (t.decode = (t, n) =>
                this.interface.decodeEventLog(e.eventFragment, t, n)),
              (t.args = e.args);
          } catch (e) {}
        }
      }
      class _ extends class {
        constructor(t, e, n) {
          p.checkNew(new.target, _),
            (0, c.defineReadOnly)(
              this,
              "interface",
              (0, c.getStatic)(new.target, "getInterface")(e)
            ),
            null == n
              ? ((0, c.defineReadOnly)(this, "provider", null),
                (0, c.defineReadOnly)(this, "signer", null))
              : a.E.isSigner(n)
              ? ((0, c.defineReadOnly)(this, "provider", n.provider || null),
                (0, c.defineReadOnly)(this, "signer", n))
              : o.zt.isProvider(n)
              ? ((0, c.defineReadOnly)(this, "provider", n),
                (0, c.defineReadOnly)(this, "signer", null))
              : p.throwArgumentError(
                  "invalid signer or provider",
                  "signerOrProvider",
                  n
                ),
            (0, c.defineReadOnly)(this, "callStatic", {}),
            (0, c.defineReadOnly)(this, "estimateGas", {}),
            (0, c.defineReadOnly)(this, "functions", {}),
            (0, c.defineReadOnly)(this, "populateTransaction", {}),
            (0, c.defineReadOnly)(this, "filters", {});
          {
            const t = {};
            Object.keys(this.interface.events).forEach((e) => {
              const n = this.interface.events[e];
              (0, c.defineReadOnly)(this.filters, e, (...t) => ({
                address: this.address,
                topics: this.interface.encodeFilterTopics(n, t),
              })),
                t[n.name] || (t[n.name] = []),
                t[n.name].push(e);
            }),
              Object.keys(t).forEach((e) => {
                const n = t[e];
                1 === n.length
                  ? (0, c.defineReadOnly)(this.filters, e, this.filters[n[0]])
                  : p.warn(`Duplicate definition of ${e} (${n.join(", ")})`);
              });
          }
          if (
            ((0, c.defineReadOnly)(this, "_runningEvents", {}),
            (0, c.defineReadOnly)(this, "_wrappedEmits", {}),
            null == t &&
              p.throwArgumentError(
                "invalid contract address or ENS name",
                "addressOrName",
                t
              ),
            (0, c.defineReadOnly)(this, "address", t),
            this.provider)
          )
            (0, c.defineReadOnly)(this, "resolvedAddress", m(this.provider, t));
          else
            try {
              (0, c.defineReadOnly)(
                this,
                "resolvedAddress",
                Promise.resolve((0, s.getAddress)(t))
              );
            } catch (u) {
              p.throwError(
                "provider is required to use ENS name as contract address",
                f.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "new Contract" }
              );
            }
          const r = {},
            i = {};
          Object.keys(this.interface.functions).forEach((t) => {
            const e = this.interface.functions[t];
            if (i[t]) p.warn(`Duplicate ABI entry for ${JSON.stringify(t)}`);
            else {
              i[t] = !0;
              {
                const n = e.name;
                r[`%${n}`] || (r[`%${n}`] = []), r[`%${n}`].push(t);
              }
              null == this[t] && (0, c.defineReadOnly)(this, t, w(this, e, !0)),
                null == this.functions[t] &&
                  (0, c.defineReadOnly)(this.functions, t, w(this, e, !1)),
                null == this.callStatic[t] &&
                  (0, c.defineReadOnly)(this.callStatic, t, b(this, e, !0)),
                null == this.populateTransaction[t] &&
                  (0, c.defineReadOnly)(
                    this.populateTransaction,
                    t,
                    (function (t, e) {
                      return function (...n) {
                        return g(t, e, n);
                      };
                    })(this, e)
                  ),
                null == this.estimateGas[t] &&
                  (0, c.defineReadOnly)(
                    this.estimateGas,
                    t,
                    (function (t, e) {
                      const n = t.signer || t.provider;
                      return function (...r) {
                        return d(this, void 0, void 0, function* () {
                          n ||
                            p.throwError(
                              "estimate require a provider or signer",
                              f.Logger.errors.UNSUPPORTED_OPERATION,
                              { operation: "estimateGas" }
                            );
                          const i = yield g(t, e, r);
                          return yield n.estimateGas(i);
                        });
                      };
                    })(this, e)
                  );
            }
          }),
            Object.keys(r).forEach((t) => {
              const e = r[t];
              if (e.length > 1) return;
              t = t.substring(1);
              const n = e[0];
              try {
                null == this[t] && (0, c.defineReadOnly)(this, t, this[n]);
              } catch (i) {}
              null == this.functions[t] &&
                (0, c.defineReadOnly)(this.functions, t, this.functions[n]),
                null == this.callStatic[t] &&
                  (0, c.defineReadOnly)(this.callStatic, t, this.callStatic[n]),
                null == this.populateTransaction[t] &&
                  (0, c.defineReadOnly)(
                    this.populateTransaction,
                    t,
                    this.populateTransaction[n]
                  ),
                null == this.estimateGas[t] &&
                  (0, c.defineReadOnly)(
                    this.estimateGas,
                    t,
                    this.estimateGas[n]
                  );
            });
        }
        static getContractAddress(t) {
          return (0, s.getContractAddress)(t);
        }
        static getInterface(t) {
          return i.vU.isInterface(t) ? t : new i.vU(t);
        }
        deployed() {
          return this._deployed();
        }
        _deployed(t) {
          return (
            this._deployedPromise ||
              (this.deployTransaction
                ? (this._deployedPromise = this.deployTransaction
                    .wait()
                    .then(() => this))
                : (this._deployedPromise = this.provider
                    .getCode(this.address, t)
                    .then(
                      (t) => (
                        "0x" === t &&
                          p.throwError(
                            "contract not deployed",
                            f.Logger.errors.UNSUPPORTED_OPERATION,
                            {
                              contractAddress: this.address,
                              operation: "getDeployed",
                            }
                          ),
                        this
                      )
                    ))),
            this._deployedPromise
          );
        }
        fallback(t) {
          this.signer ||
            p.throwError(
              "sending a transactions require a signer",
              f.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "sendTransaction(fallback)" }
            );
          const e = (0, c.shallowCopy)(t || {});
          return (
            ["from", "to"].forEach(function (t) {
              null != e[t] &&
                p.throwError(
                  "cannot override " + t,
                  f.Logger.errors.UNSUPPORTED_OPERATION,
                  { operation: t }
                );
            }),
            (e.to = this.resolvedAddress),
            this.deployed().then(() => this.signer.sendTransaction(e))
          );
        }
        connect(t) {
          "string" === typeof t && (t = new a.b(t, this.provider));
          const e = new this.constructor(this.address, this.interface, t);
          return (
            this.deployTransaction &&
              (0, c.defineReadOnly)(
                e,
                "deployTransaction",
                this.deployTransaction
              ),
            e
          );
        }
        attach(t) {
          return new this.constructor(
            t,
            this.interface,
            this.signer || this.provider
          );
        }
        static isIndexed(t) {
          return i.Hk.isIndexed(t);
        }
        _normalizeRunningEvent(t) {
          return this._runningEvents[t.tag] ? this._runningEvents[t.tag] : t;
        }
        _getRunningEvent(t) {
          if ("string" === typeof t) {
            if ("error" === t) return this._normalizeRunningEvent(new T());
            if ("event" === t)
              return this._normalizeRunningEvent(new E("event", null));
            if ("*" === t)
              return this._normalizeRunningEvent(
                new M(this.address, this.interface)
              );
            const e = this.interface.getEvent(t);
            return this._normalizeRunningEvent(
              new A(this.address, this.interface, e)
            );
          }
          if (t.topics && t.topics.length > 0) {
            try {
              const e = t.topics[0];
              if ("string" !== typeof e) throw new Error("invalid topic");
              const n = this.interface.getEvent(e);
              return this._normalizeRunningEvent(
                new A(this.address, this.interface, n, t.topics)
              );
            } catch (e) {}
            const n = { address: this.address, topics: t.topics };
            return this._normalizeRunningEvent(new E(x(n), n));
          }
          return this._normalizeRunningEvent(
            new M(this.address, this.interface)
          );
        }
        _checkRunningEvents(t) {
          if (0 === t.listenerCount()) {
            delete this._runningEvents[t.tag];
            const e = this._wrappedEmits[t.tag];
            e &&
              t.filter &&
              (this.provider.off(t.filter, e),
              delete this._wrappedEmits[t.tag]);
          }
        }
        _wrapEvent(t, e, n) {
          const r = (0, c.deepCopy)(e);
          return (
            (r.removeListener = () => {
              n && (t.removeListener(n), this._checkRunningEvents(t));
            }),
            (r.getBlock = () => this.provider.getBlock(e.blockHash)),
            (r.getTransaction = () =>
              this.provider.getTransaction(e.transactionHash)),
            (r.getTransactionReceipt = () =>
              this.provider.getTransactionReceipt(e.transactionHash)),
            t.prepareEvent(r),
            r
          );
        }
        _addEventListener(t, e, n) {
          if (
            (this.provider ||
              p.throwError(
                "events require a provider or a signer with a provider",
                f.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "once" }
              ),
            t.addListener(e, n),
            (this._runningEvents[t.tag] = t),
            !this._wrappedEmits[t.tag])
          ) {
            const n = (n) => {
              let r = this._wrapEvent(t, n, e);
              if (null == r.decodeError)
                try {
                  const e = t.getEmit(r);
                  this.emit(t.filter, ...e);
                } catch (i) {
                  r.decodeError = i.error;
                }
              null != t.filter && this.emit("event", r),
                null != r.decodeError && this.emit("error", r.decodeError, r);
            };
            (this._wrappedEmits[t.tag] = n),
              null != t.filter && this.provider.on(t.filter, n);
          }
        }
        queryFilter(t, e, n) {
          const r = this._getRunningEvent(t),
            i = (0, c.shallowCopy)(r.filter);
          return (
            "string" === typeof e && (0, l.isHexString)(e, 32)
              ? (null != n &&
                  p.throwArgumentError(
                    "cannot specify toBlock with blockhash",
                    "toBlock",
                    n
                  ),
                (i.blockHash = e))
              : ((i.fromBlock = null != e ? e : 0),
                (i.toBlock = null != n ? n : "latest")),
            this.provider
              .getLogs(i)
              .then((t) => t.map((t) => this._wrapEvent(r, t, null)))
          );
        }
        on(t, e) {
          return this._addEventListener(this._getRunningEvent(t), e, !1), this;
        }
        once(t, e) {
          return this._addEventListener(this._getRunningEvent(t), e, !0), this;
        }
        emit(t, ...e) {
          if (!this.provider) return !1;
          const n = this._getRunningEvent(t),
            r = n.run(e) > 0;
          return this._checkRunningEvents(n), r;
        }
        listenerCount(t) {
          return this.provider
            ? null == t
              ? Object.keys(this._runningEvents).reduce(
                  (t, e) => t + this._runningEvents[e].listenerCount(),
                  0
                )
              : this._getRunningEvent(t).listenerCount()
            : 0;
        }
        listeners(t) {
          if (!this.provider) return [];
          if (null == t) {
            const t = [];
            for (let e in this._runningEvents)
              this._runningEvents[e].listeners().forEach((e) => {
                t.push(e);
              });
            return t;
          }
          return this._getRunningEvent(t).listeners();
        }
        removeAllListeners(t) {
          if (!this.provider) return this;
          if (null == t) {
            for (const t in this._runningEvents) {
              const e = this._runningEvents[t];
              e.removeAllListeners(), this._checkRunningEvents(e);
            }
            return this;
          }
          const e = this._getRunningEvent(t);
          return e.removeAllListeners(), this._checkRunningEvents(e), this;
        }
        off(t, e) {
          if (!this.provider) return this;
          const n = this._getRunningEvent(t);
          return n.removeListener(e), this._checkRunningEvents(n), this;
        }
        removeListener(t, e) {
          return this.off(t, e);
        }
      } {}
      var k,
        S,
        P = n(9664),
        O = JSON.parse(
          '{"Mt":[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]}'
        ),
        R = JSON.parse(
          '{"Mt":[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"}]}'
        );
      function N(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      !(function (t) {
        (t.BAYC = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"),
          (t.MAYC = "0x60e4d786628fea6478f785a6d7e704777c86a7c6"),
          (t.BAKC = "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623"),
          (t.ApeCoin = "0x4d224452801aced8b2f0aebe155379bb5d594381"),
          (t.Airdrop = "0x025C6da5BD0e6A5dd1350fda9e3B6a614B205a1F"),
          (t.Grape = "0x3474927033e071CA0ec9C20263AAE52E3efED951"),
          (t.Durian = "0xF06A3B212f6E48642F7BAcEDfB99e2e8beE58DF4"),
          (t.Alpha = "0x00E64c0A96C5362CAC3dF438CE8F5Ed495E7c2FC"),
          (t.Beta = "0x0E8d4aFBAd6eDc9a4a777eeEB3B3B7E4004901d9"),
          (t.Gamma = "0xDd1D45EcD83dC30BE3E2e3201f07d0A63583DB4c");
      })(k || (k = {}));
      var I,
        C =
          (N((S = {}), k.BAYC, "Bored Ape"),
          N(S, k.MAYC, "Mutant Ape"),
          N(S, k.BAKC, "Kennel Club"),
          N(S, k.ApeCoin, "ApeCoin"),
          N(S, k.Airdrop, "Airdrop Claim ApeCoin"),
          N(S, k.Grape, "Airdrop Test"),
          N(S, k.Durian, "Durian"),
          N(S, k.Alpha, "Alpha"),
          N(S, k.Beta, "Beta"),
          N(S, k.Gamma, "Gamma"),
          S),
        L =
          (N((I = {}), k.BAYC, n(9752)),
          N(I, k.MAYC, n(6850)),
          N(I, k.BAKC, n(8677)),
          N(I, k.ApeCoin, O.Mt),
          N(I, k.Airdrop, n(211)),
          N(I, k.Grape, n(211)),
          N(I, k.Durian, O.Mt),
          N(I, k.Alpha, R.Mt),
          N(I, k.Beta, R.Mt),
          N(I, k.Gamma, R.Mt),
          I),
        B = V(k.BAYC),
        F = V(k.MAYC),
        j = V(k.BAKC),
        D = V(k.ApeCoin),
        U = V(k.Airdrop);
      V(k.Alpha), V(k.Beta), V(k.Gamma), V(k.Grape), V(k.Durian);
      function V(t) {
        var e = C[t],
          n = L[t];
        return (
          (0, P.hu)(
            (0, P.JG)(n),
            "Could not get contract for ".concat(
              t,
              ". Make sure the ABI is defined and registered in the ABIs Map."
            )
          ),
          {
            name: e,
            address: t,
            withProvider: function (e) {
              return new _(t, n, e);
            },
            withSigner: function (e) {
              return new _(t, n, e);
            },
          }
        );
      }
    },
    8400: function (t, e, n) {
      "use strict";
      n.d(e, {
        Un: function () {
          return ve;
        },
        $6: function () {
          return ge;
        },
        vt: function () {
          return ye;
        },
      });
      var r = n(4051),
        i = n.n(r),
        o = n(7294),
        a = n(6881),
        s = n(1581);
      const u = "providers/5.5.3";
      var l = n(8088),
        c = n(2593),
        h = n(6441),
        f = n(7827),
        d = n(9251),
        p = n(3875),
        m = n(7707),
        y = n(1556),
        g = n(7727),
        v = n(7218),
        b = n(4706);
      const w = new s.Logger("networks/5.5.2");
      function x(t) {
        const e = function (e, n) {
          null == n && (n = {});
          const r = [];
          if (e.InfuraProvider)
            try {
              r.push(new e.InfuraProvider(t, n.infura));
            } catch (i) {}
          if (e.EtherscanProvider)
            try {
              r.push(new e.EtherscanProvider(t, n.etherscan));
            } catch (i) {}
          if (e.AlchemyProvider)
            try {
              r.push(new e.AlchemyProvider(t, n.alchemy));
            } catch (i) {}
          if (e.PocketProvider) {
            const n = ["goerli", "ropsten", "rinkeby"];
            try {
              const i = new e.PocketProvider(t);
              i.network && -1 === n.indexOf(i.network.name) && r.push(i);
            } catch (i) {}
          }
          if (e.CloudflareProvider)
            try {
              r.push(new e.CloudflareProvider(t));
            } catch (i) {}
          if (0 === r.length) return null;
          if (e.FallbackProvider) {
            let i = 1;
            return (
              null != n.quorum ? (i = n.quorum) : "homestead" === t && (i = 2),
              new e.FallbackProvider(r, i)
            );
          }
          return r[0];
        };
        return (
          (e.renetwork = function (t) {
            return x(t);
          }),
          e
        );
      }
      function E(t, e) {
        const n = function (n, r) {
          return n.JsonRpcProvider ? new n.JsonRpcProvider(t, e) : null;
        };
        return (
          (n.renetwork = function (e) {
            return E(t, e);
          }),
          n
        );
      }
      const T = {
          chainId: 1,
          ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          name: "homestead",
          _defaultProvider: x("homestead"),
        },
        A = {
          chainId: 3,
          ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
          name: "ropsten",
          _defaultProvider: x("ropsten"),
        },
        M = {
          chainId: 63,
          name: "classicMordor",
          _defaultProvider: E(
            "https://www.ethercluster.com/mordor",
            "classicMordor"
          ),
        },
        _ = {
          unspecified: { chainId: 0, name: "unspecified" },
          homestead: T,
          mainnet: T,
          morden: { chainId: 2, name: "morden" },
          ropsten: A,
          testnet: A,
          rinkeby: {
            chainId: 4,
            ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
            name: "rinkeby",
            _defaultProvider: x("rinkeby"),
          },
          kovan: { chainId: 42, name: "kovan", _defaultProvider: x("kovan") },
          goerli: {
            chainId: 5,
            ensAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
            name: "goerli",
            _defaultProvider: x("goerli"),
          },
          kintsugi: { chainId: 1337702, name: "kintsugi" },
          classic: {
            chainId: 61,
            name: "classic",
            _defaultProvider: E("https://www.ethercluster.com/etc", "classic"),
          },
          classicMorden: { chainId: 62, name: "classicMorden" },
          classicMordor: M,
          classicTestnet: M,
          classicKotti: {
            chainId: 6,
            name: "classicKotti",
            _defaultProvider: E(
              "https://www.ethercluster.com/kotti",
              "classicKotti"
            ),
          },
          xdai: { chainId: 100, name: "xdai" },
          matic: { chainId: 137, name: "matic" },
          maticmum: { chainId: 80001, name: "maticmum" },
          optimism: { chainId: 10, name: "optimism" },
          "optimism-kovan": { chainId: 69, name: "optimism-kovan" },
          "optimism-goerli": { chainId: 420, name: "optimism-goerli" },
          arbitrum: { chainId: 42161, name: "arbitrum" },
          "arbitrum-rinkeby": { chainId: 421611, name: "arbitrum-rinkeby" },
          bnb: { chainId: 56, name: "bnb" },
          bnbt: { chainId: 97, name: "bnbt" },
        };
      var k = n(2006),
        S = n(2882),
        P = n.n(S),
        O = n(9485);
      const R = new s.Logger(u);
      class N {
        constructor() {
          R.checkNew(new.target, N), (this.formats = this.getDefaultFormats());
        }
        getDefaultFormats() {
          const t = {},
            e = this.address.bind(this),
            n = this.bigNumber.bind(this),
            r = this.blockTag.bind(this),
            i = this.data.bind(this),
            o = this.hash.bind(this),
            s = this.hex.bind(this),
            u = this.number.bind(this),
            l = this.type.bind(this);
          return (
            (t.transaction = {
              hash: o,
              type: l,
              accessList: N.allowNull(this.accessList.bind(this), null),
              blockHash: N.allowNull(o, null),
              blockNumber: N.allowNull(u, null),
              transactionIndex: N.allowNull(u, null),
              confirmations: N.allowNull(u, null),
              from: e,
              gasPrice: N.allowNull(n),
              maxPriorityFeePerGas: N.allowNull(n),
              maxFeePerGas: N.allowNull(n),
              gasLimit: n,
              to: N.allowNull(e, null),
              value: n,
              nonce: u,
              data: i,
              r: N.allowNull(this.uint256),
              s: N.allowNull(this.uint256),
              v: N.allowNull(u),
              creates: N.allowNull(e, null),
              raw: N.allowNull(i),
            }),
            (t.transactionRequest = {
              from: N.allowNull(e),
              nonce: N.allowNull(u),
              gasLimit: N.allowNull(n),
              gasPrice: N.allowNull(n),
              maxPriorityFeePerGas: N.allowNull(n),
              maxFeePerGas: N.allowNull(n),
              to: N.allowNull(e),
              value: N.allowNull(n),
              data: N.allowNull((t) => this.data(t, !0)),
              type: N.allowNull(u),
              accessList: N.allowNull(this.accessList.bind(this), null),
            }),
            (t.receiptLog = {
              transactionIndex: u,
              blockNumber: u,
              transactionHash: o,
              address: e,
              topics: N.arrayOf(o),
              data: i,
              logIndex: u,
              blockHash: o,
            }),
            (t.receipt = {
              to: N.allowNull(this.address, null),
              from: N.allowNull(this.address, null),
              contractAddress: N.allowNull(e, null),
              transactionIndex: u,
              root: N.allowNull(s),
              gasUsed: n,
              logsBloom: N.allowNull(i),
              blockHash: o,
              transactionHash: o,
              logs: N.arrayOf(this.receiptLog.bind(this)),
              blockNumber: u,
              confirmations: N.allowNull(u, null),
              cumulativeGasUsed: n,
              effectiveGasPrice: N.allowNull(n),
              status: N.allowNull(u),
              type: l,
            }),
            (t.block = {
              hash: o,
              parentHash: o,
              number: u,
              timestamp: u,
              nonce: N.allowNull(s),
              difficulty: this.difficulty.bind(this),
              gasLimit: n,
              gasUsed: n,
              miner: e,
              extraData: i,
              transactions: N.allowNull(N.arrayOf(o)),
              baseFeePerGas: N.allowNull(n),
            }),
            (t.blockWithTransactions = (0, a.shallowCopy)(t.block)),
            (t.blockWithTransactions.transactions = N.allowNull(
              N.arrayOf(this.transactionResponse.bind(this))
            )),
            (t.filter = {
              fromBlock: N.allowNull(r, void 0),
              toBlock: N.allowNull(r, void 0),
              blockHash: N.allowNull(o, void 0),
              address: N.allowNull(e, void 0),
              topics: N.allowNull(this.topics.bind(this), void 0),
            }),
            (t.filterLog = {
              blockNumber: N.allowNull(u),
              blockHash: N.allowNull(o),
              transactionIndex: u,
              removed: N.allowNull(this.boolean.bind(this)),
              address: e,
              data: N.allowFalsish(i, "0x"),
              topics: N.arrayOf(o),
              transactionHash: o,
              logIndex: u,
            }),
            t
          );
        }
        accessList(t) {
          return (0, p.accessListify)(t || []);
        }
        number(t) {
          return "0x" === t ? 0 : c.O$.from(t).toNumber();
        }
        type(t) {
          return "0x" === t || null == t ? 0 : c.O$.from(t).toNumber();
        }
        bigNumber(t) {
          return c.O$.from(t);
        }
        boolean(t) {
          if ("boolean" === typeof t) return t;
          if ("string" === typeof t) {
            if ("true" === (t = t.toLowerCase())) return !0;
            if ("false" === t) return !1;
          }
          throw new Error("invalid boolean - " + t);
        }
        hex(t, e) {
          return "string" === typeof t &&
            (e || "0x" === t.substring(0, 2) || (t = "0x" + t),
            (0, h.isHexString)(t))
            ? t.toLowerCase()
            : R.throwArgumentError("invalid hash", "value", t);
        }
        data(t, e) {
          const n = this.hex(t, e);
          if (n.length % 2 !== 0)
            throw new Error("invalid data; odd-length - " + t);
          return n;
        }
        address(t) {
          return (0, O.getAddress)(t);
        }
        callAddress(t) {
          if (!(0, h.isHexString)(t, 32)) return null;
          const e = (0, O.getAddress)((0, h.hexDataSlice)(t, 12));
          return "0x0000000000000000000000000000000000000000" === e ? null : e;
        }
        contractAddress(t) {
          return (0, O.getContractAddress)(t);
        }
        blockTag(t) {
          if (null == t) return "latest";
          if ("earliest" === t) return "0x0";
          if ("latest" === t || "pending" === t) return t;
          if ("number" === typeof t || (0, h.isHexString)(t))
            return (0, h.hexValue)(t);
          throw new Error("invalid blockTag");
        }
        hash(t, e) {
          const n = this.hex(t, e);
          return 32 !== (0, h.hexDataLength)(n)
            ? R.throwArgumentError("invalid hash", "value", t)
            : n;
        }
        difficulty(t) {
          if (null == t) return null;
          const e = c.O$.from(t);
          try {
            return e.toNumber();
          } catch (n) {}
          return null;
        }
        uint256(t) {
          if (!(0, h.isHexString)(t)) throw new Error("invalid uint256");
          return (0, h.hexZeroPad)(t, 32);
        }
        _block(t, e) {
          null != t.author && null == t.miner && (t.miner = t.author);
          const n = null != t._difficulty ? t._difficulty : t.difficulty,
            r = N.check(e, t);
          return (r._difficulty = null == n ? null : c.O$.from(n)), r;
        }
        block(t) {
          return this._block(t, this.formats.block);
        }
        blockWithTransactions(t) {
          return this._block(t, this.formats.blockWithTransactions);
        }
        transactionRequest(t) {
          return N.check(this.formats.transactionRequest, t);
        }
        transactionResponse(t) {
          null != t.gas && null == t.gasLimit && (t.gasLimit = t.gas),
            t.to &&
              c.O$.from(t.to).isZero() &&
              (t.to = "0x0000000000000000000000000000000000000000"),
            null != t.input && null == t.data && (t.data = t.input),
            null == t.to &&
              null == t.creates &&
              (t.creates = this.contractAddress(t)),
            (1 !== t.type && 2 !== t.type) ||
              null != t.accessList ||
              (t.accessList = []);
          const e = N.check(this.formats.transaction, t);
          if (null != t.chainId) {
            let n = t.chainId;
            (0, h.isHexString)(n) && (n = c.O$.from(n).toNumber()),
              (e.chainId = n);
          } else {
            let n = t.networkId;
            null == n && null == e.v && (n = t.chainId),
              (0, h.isHexString)(n) && (n = c.O$.from(n).toNumber()),
              "number" !== typeof n &&
                null != e.v &&
                ((n = (e.v - 35) / 2), n < 0 && (n = 0), (n = parseInt(n))),
              "number" !== typeof n && (n = 0),
              (e.chainId = n);
          }
          return (
            e.blockHash &&
              "x" === e.blockHash.replace(/0/g, "") &&
              (e.blockHash = null),
            e
          );
        }
        transaction(t) {
          return (0, p.parse)(t);
        }
        receiptLog(t) {
          return N.check(this.formats.receiptLog, t);
        }
        receipt(t) {
          const e = N.check(this.formats.receipt, t);
          if (null != e.root)
            if (e.root.length <= 4) {
              const t = c.O$.from(e.root).toNumber();
              0 === t || 1 === t
                ? (null != e.status &&
                    e.status !== t &&
                    R.throwArgumentError(
                      "alt-root-status/status mismatch",
                      "value",
                      { root: e.root, status: e.status }
                    ),
                  (e.status = t),
                  delete e.root)
                : R.throwArgumentError(
                    "invalid alt-root-status",
                    "value.root",
                    e.root
                  );
            } else
              66 !== e.root.length &&
                R.throwArgumentError("invalid root hash", "value.root", e.root);
          return null != e.status && (e.byzantium = !0), e;
        }
        topics(t) {
          return Array.isArray(t)
            ? t.map((t) => this.topics(t))
            : null != t
            ? this.hash(t, !0)
            : null;
        }
        filter(t) {
          return N.check(this.formats.filter, t);
        }
        filterLog(t) {
          return N.check(this.formats.filterLog, t);
        }
        static check(t, e) {
          const n = {};
          for (const i in t)
            try {
              const r = t[i](e[i]);
              void 0 !== r && (n[i] = r);
            } catch (r) {
              throw ((r.checkKey = i), (r.checkValue = e[i]), r);
            }
          return n;
        }
        static allowNull(t, e) {
          return function (n) {
            return null == n ? e : t(n);
          };
        }
        static allowFalsish(t, e) {
          return function (n) {
            return n ? t(n) : e;
          };
        }
        static arrayOf(t) {
          return function (e) {
            if (!Array.isArray(e)) throw new Error("not an array");
            const n = [];
            return (
              e.forEach(function (e) {
                n.push(t(e));
              }),
              n
            );
          };
        }
      }
      var I = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const C = new s.Logger(u);
      function L(t) {
        return null == t
          ? "null"
          : (32 !== (0, h.hexDataLength)(t) &&
              C.throwArgumentError("invalid topic", "topic", t),
            t.toLowerCase());
      }
      function B(t) {
        for (t = t.slice(); t.length > 0 && null == t[t.length - 1]; ) t.pop();
        return t
          .map((t) => {
            if (Array.isArray(t)) {
              const e = {};
              t.forEach((t) => {
                e[L(t)] = !0;
              });
              const n = Object.keys(e);
              return n.sort(), n.join("|");
            }
            return L(t);
          })
          .join("&");
      }
      function F(t) {
        if ("string" === typeof t) {
          if (((t = t.toLowerCase()), 32 === (0, h.hexDataLength)(t)))
            return "tx:" + t;
          if (-1 === t.indexOf(":")) return t;
        } else {
          if (Array.isArray(t)) return "filter:*:" + B(t);
          if (y.Sg.isForkEvent(t))
            throw (C.warn("not implemented"), new Error("not implemented"));
          if (t && "object" === typeof t)
            return "filter:" + (t.address || "*") + ":" + B(t.topics || []);
        }
        throw new Error("invalid event - " + t);
      }
      function j() {
        return new Date().getTime();
      }
      function D(t) {
        return new Promise((e) => {
          setTimeout(e, t);
        });
      }
      const U = ["block", "network", "pending", "poll"];
      class V {
        constructor(t, e, n) {
          (0, a.defineReadOnly)(this, "tag", t),
            (0, a.defineReadOnly)(this, "listener", e),
            (0, a.defineReadOnly)(this, "once", n);
        }
        get event() {
          switch (this.type) {
            case "tx":
              return this.hash;
            case "filter":
              return this.filter;
          }
          return this.tag;
        }
        get type() {
          return this.tag.split(":")[0];
        }
        get hash() {
          const t = this.tag.split(":");
          return "tx" !== t[0] ? null : t[1];
        }
        get filter() {
          const t = this.tag.split(":");
          if ("filter" !== t[0]) return null;
          const e = t[1],
            n =
              "" === (r = t[2])
                ? []
                : r.split(/&/g).map((t) => {
                    if ("" === t) return [];
                    const e = t
                      .split("|")
                      .map((t) => ("null" === t ? null : t));
                    return 1 === e.length ? e[0] : e;
                  });
          var r;
          const i = {};
          return (
            n.length > 0 && (i.topics = n), e && "*" !== e && (i.address = e), i
          );
        }
        pollable() {
          return this.tag.indexOf(":") >= 0 || U.indexOf(this.tag) >= 0;
        }
      }
      const G = {
        0: { symbol: "btc", p2pkh: 0, p2sh: 5, prefix: "bc" },
        2: { symbol: "ltc", p2pkh: 48, p2sh: 50, prefix: "ltc" },
        3: { symbol: "doge", p2pkh: 30, p2sh: 22 },
        60: { symbol: "eth", ilk: "eth" },
        61: { symbol: "etc", ilk: "eth" },
        700: { symbol: "xdai", ilk: "eth" },
      };
      function z(t) {
        return (0, h.hexZeroPad)(c.O$.from(t).toHexString(), 32);
      }
      function $(t) {
        return g.Base58.encode(
          (0, h.concat)([t, (0, h.hexDataSlice)((0, k.JQ)((0, k.JQ)(t)), 0, 4)])
        );
      }
      const H = new RegExp("^(ipfs)://(.*)$", "i"),
        q = [
          new RegExp("^(https)://(.*)$", "i"),
          new RegExp("^(data):(.*)$", "i"),
          H,
          new RegExp("^eip155:[0-9]+/(erc[0-9]+):(.*)$", "i"),
        ];
      function W(t) {
        try {
          return (0, d.ZN)(X(t));
        } catch (e) {}
        return null;
      }
      function X(t) {
        if ("0x" === t) return null;
        const e = c.O$.from((0, h.hexDataSlice)(t, 0, 32)).toNumber(),
          n = c.O$.from((0, h.hexDataSlice)(t, e, e + 32)).toNumber();
        return (0, h.hexDataSlice)(t, e + 32, e + 32 + n);
      }
      function Z(t) {
        return (
          t.match(/^ipfs:\/\/ipfs\//i)
            ? (t = t.substring(12))
            : t.match(/^ipfs:\/\//i)
            ? (t = t.substring(7))
            : C.throwArgumentError("unsupported IPFS format", "link", t),
          `https://gateway.ipfs.io/ipfs/${t}`
        );
      }
      class K {
        constructor(t, e, n, r) {
          (0, a.defineReadOnly)(this, "provider", t),
            (0, a.defineReadOnly)(this, "name", n),
            (0, a.defineReadOnly)(this, "address", t.formatter.address(e)),
            (0, a.defineReadOnly)(this, "_resolvedAddress", r);
        }
        _fetchBytes(t, e) {
          return I(this, void 0, void 0, function* () {
            const n = {
              to: this.address,
              data: (0, h.hexConcat)([t, (0, b.V)(this.name), e || "0x"]),
            };
            try {
              return X(yield this.provider.call(n));
            } catch (r) {
              return r.code, s.Logger.errors.CALL_EXCEPTION, null;
            }
          });
        }
        _getAddress(t, e) {
          const n = G[String(t)];
          if (
            (null == n &&
              C.throwError(
                `unsupported coin type: ${t}`,
                s.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: `getAddress(${t})` }
              ),
            "eth" === n.ilk)
          )
            return this.provider.formatter.address(e);
          const r = (0, h.arrayify)(e);
          if (null != n.p2pkh) {
            const t = e.match(/^0x76a9([0-9a-f][0-9a-f])([0-9a-f]*)88ac$/);
            if (t) {
              const e = parseInt(t[1], 16);
              if (t[2].length === 2 * e && e >= 1 && e <= 75)
                return $((0, h.concat)([[n.p2pkh], "0x" + t[2]]));
            }
          }
          if (null != n.p2sh) {
            const t = e.match(/^0xa9([0-9a-f][0-9a-f])([0-9a-f]*)87$/);
            if (t) {
              const e = parseInt(t[1], 16);
              if (t[2].length === 2 * e && e >= 1 && e <= 75)
                return $((0, h.concat)([[n.p2sh], "0x" + t[2]]));
            }
          }
          if (null != n.prefix) {
            const t = r[1];
            let e = r[0];
            if (
              (0 === e ? 20 !== t && 32 !== t && (e = -1) : (e = -1),
              e >= 0 && r.length === 2 + t && t >= 1 && t <= 75)
            ) {
              const t = P().toWords(r.slice(2));
              return t.unshift(e), P().encode(n.prefix, t);
            }
          }
          return null;
        }
        getAddress(t) {
          return I(this, void 0, void 0, function* () {
            if ((null == t && (t = 60), 60 === t))
              try {
                const t = {
                    to: this.address,
                    data: "0x3b3b57de" + (0, b.V)(this.name).substring(2),
                  },
                  e = yield this.provider.call(t);
                return "0x" === e || e === v.R
                  ? null
                  : this.provider.formatter.callAddress(e);
              } catch (r) {
                if (r.code === s.Logger.errors.CALL_EXCEPTION) return null;
                throw r;
              }
            const e = yield this._fetchBytes("0xf1cb7e06", z(t));
            if (null == e || "0x" === e) return null;
            const n = this._getAddress(t, e);
            return (
              null == n &&
                C.throwError(
                  "invalid or unsupported coin data",
                  s.Logger.errors.UNSUPPORTED_OPERATION,
                  { operation: `getAddress(${t})`, coinType: t, data: e }
                ),
              n
            );
          });
        }
        getAvatar() {
          return I(this, void 0, void 0, function* () {
            const t = [{ type: "name", content: this.name }];
            try {
              const e = yield this.getText("avatar");
              if (null == e) return null;
              for (let n = 0; n < q.length; n++) {
                const r = e.match(q[n]);
                if (null == r) continue;
                const i = r[1].toLowerCase();
                switch (i) {
                  case "https":
                    return (
                      t.push({ type: "url", content: e }),
                      { linkage: t, url: e }
                    );
                  case "data":
                    return (
                      t.push({ type: "data", content: e }),
                      { linkage: t, url: e }
                    );
                  case "ipfs":
                    return (
                      t.push({ type: "ipfs", content: e }),
                      { linkage: t, url: Z(e) }
                    );
                  case "erc721":
                  case "erc1155": {
                    const n = "erc721" === i ? "0xc87b56dd" : "0x0e89341c";
                    t.push({ type: i, content: e });
                    const o =
                        this._resolvedAddress || (yield this.getAddress()),
                      a = (r[2] || "").split("/");
                    if (2 !== a.length) return null;
                    const s = yield this.provider.formatter.address(a[0]),
                      u = (0, h.hexZeroPad)(c.O$.from(a[1]).toHexString(), 32);
                    if ("erc721" === i) {
                      const e = this.provider.formatter.callAddress(
                        yield this.provider.call({
                          to: s,
                          data: (0, h.hexConcat)(["0x6352211e", u]),
                        })
                      );
                      if (o !== e) return null;
                      t.push({ type: "owner", content: e });
                    } else if ("erc1155" === i) {
                      const e = c.O$.from(
                        yield this.provider.call({
                          to: s,
                          data: (0, h.hexConcat)([
                            "0x00fdd58e",
                            (0, h.hexZeroPad)(o, 32),
                            u,
                          ]),
                        })
                      );
                      if (e.isZero()) return null;
                      t.push({ type: "balance", content: e.toString() });
                    }
                    const l = {
                      to: this.provider.formatter.address(a[0]),
                      data: (0, h.hexConcat)([n, u]),
                    };
                    let f = W(yield this.provider.call(l));
                    if (null == f) return null;
                    t.push({ type: "metadata-url-base", content: f }),
                      "erc1155" === i &&
                        ((f = f.replace("{id}", u.substring(2))),
                        t.push({ type: "metadata-url-expanded", content: f })),
                      f.match(/^ipfs:/i) && (f = Z(f)),
                      t.push({ type: "metadata-url", content: f });
                    const d = yield (0, m.fetchJson)(f);
                    if (!d) return null;
                    t.push({ type: "metadata", content: JSON.stringify(d) });
                    let p = d.image;
                    if ("string" !== typeof p) return null;
                    if (p.match(/^(https:\/\/|data:)/i));
                    else {
                      if (null == p.match(H)) return null;
                      t.push({ type: "url-ipfs", content: p }), (p = Z(p));
                    }
                    return (
                      t.push({ type: "url", content: p }),
                      { linkage: t, url: p }
                    );
                  }
                }
              }
            } catch (e) {}
            return null;
          });
        }
        getContentHash() {
          return I(this, void 0, void 0, function* () {
            const t = yield this._fetchBytes("0xbc1c58d1");
            if (null == t || "0x" === t) return null;
            const e = t.match(
              /^0xe3010170(([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f]*))$/
            );
            if (e) {
              const t = parseInt(e[3], 16);
              if (e[4].length === 2 * t)
                return "ipfs://" + g.Base58.encode("0x" + e[1]);
            }
            const n = t.match(/^0xe40101fa011b20([0-9a-f]*)$/);
            return n && 64 === n[1].length
              ? "bzz://" + n[1]
              : C.throwError(
                  "invalid or unsupported content hash data",
                  s.Logger.errors.UNSUPPORTED_OPERATION,
                  { operation: "getContentHash()", data: t }
                );
          });
        }
        getText(t) {
          return I(this, void 0, void 0, function* () {
            let e = (0, d.Y0)(t);
            (e = (0, h.concat)([z(64), z(e.length), e])),
              e.length % 32 !== 0 &&
                (e = (0, h.concat)([
                  e,
                  (0, h.hexZeroPad)("0x", 32 - (t.length % 32)),
                ]));
            const n = yield this._fetchBytes("0x59d1d43c", (0, h.hexlify)(e));
            return null == n || "0x" === n ? null : (0, d.ZN)(n);
          });
        }
      }
      let J = null,
        Y = 1;
      class Q extends y.zt {
        constructor(t) {
          if (
            (C.checkNew(new.target, y.zt),
            super(),
            (this._events = []),
            (this._emitted = { block: -2 }),
            (this.formatter = new.target.getFormatter()),
            (0, a.defineReadOnly)(this, "anyNetwork", "any" === t),
            this.anyNetwork && (t = this.detectNetwork()),
            t instanceof Promise)
          )
            (this._networkPromise = t),
              t.catch((t) => {}),
              this._ready().catch((t) => {});
          else {
            const e = (0, a.getStatic)(new.target, "getNetwork")(t);
            e
              ? ((0, a.defineReadOnly)(this, "_network", e),
                this.emit("network", e, null))
              : C.throwArgumentError("invalid network", "network", t);
          }
          (this._maxInternalBlockNumber = -1024),
            (this._lastBlockNumber = -2),
            (this._pollingInterval = 4e3),
            (this._fastQueryDate = 0);
        }
        _ready() {
          return I(this, void 0, void 0, function* () {
            if (null == this._network) {
              let e = null;
              if (this._networkPromise)
                try {
                  e = yield this._networkPromise;
                } catch (t) {}
              null == e && (e = yield this.detectNetwork()),
                e ||
                  C.throwError(
                    "no network detected",
                    s.Logger.errors.UNKNOWN_ERROR,
                    {}
                  ),
                null == this._network &&
                  (this.anyNetwork
                    ? (this._network = e)
                    : (0, a.defineReadOnly)(this, "_network", e),
                  this.emit("network", e, null));
            }
            return this._network;
          });
        }
        get ready() {
          return (0, m.poll)(() =>
            this._ready().then(
              (t) => t,
              (t) => {
                if (
                  t.code !== s.Logger.errors.NETWORK_ERROR ||
                  "noNetwork" !== t.event
                )
                  throw t;
              }
            )
          );
        }
        static getFormatter() {
          return null == J && (J = new N()), J;
        }
        static getNetwork(t) {
          return (function (t) {
            if (null == t) return null;
            if ("number" === typeof t) {
              for (const e in _) {
                const n = _[e];
                if (n.chainId === t)
                  return {
                    name: n.name,
                    chainId: n.chainId,
                    ensAddress: n.ensAddress || null,
                    _defaultProvider: n._defaultProvider || null,
                  };
              }
              return { chainId: t, name: "unknown" };
            }
            if ("string" === typeof t) {
              const e = _[t];
              return null == e
                ? null
                : {
                    name: e.name,
                    chainId: e.chainId,
                    ensAddress: e.ensAddress,
                    _defaultProvider: e._defaultProvider || null,
                  };
            }
            const e = _[t.name];
            if (!e)
              return (
                "number" !== typeof t.chainId &&
                  w.throwArgumentError("invalid network chainId", "network", t),
                t
              );
            0 !== t.chainId &&
              t.chainId !== e.chainId &&
              w.throwArgumentError("network chainId mismatch", "network", t);
            let n = t._defaultProvider || null;
            var r;
            return (
              null == n &&
                e._defaultProvider &&
                (n =
                  (r = e._defaultProvider) && "function" === typeof r.renetwork
                    ? e._defaultProvider.renetwork(t)
                    : e._defaultProvider),
              {
                name: t.name,
                chainId: e.chainId,
                ensAddress: t.ensAddress || e.ensAddress || null,
                _defaultProvider: n,
              }
            );
          })(null == t ? "homestead" : t);
        }
        _getInternalBlockNumber(t) {
          return I(this, void 0, void 0, function* () {
            if ((yield this._ready(), t > 0))
              for (; this._internalBlockNumber; ) {
                const e = this._internalBlockNumber;
                try {
                  const n = yield e;
                  if (j() - n.respTime <= t) return n.blockNumber;
                  break;
                } catch (r) {
                  if (this._internalBlockNumber === e) break;
                }
              }
            const e = j(),
              n = (0, a.resolveProperties)({
                blockNumber: this.perform("getBlockNumber", {}),
                networkError: this.getNetwork().then(
                  (t) => null,
                  (t) => t
                ),
              }).then(({ blockNumber: t, networkError: r }) => {
                if (r)
                  throw (
                    (this._internalBlockNumber === n &&
                      (this._internalBlockNumber = null),
                    r)
                  );
                const i = j();
                return (
                  (t = c.O$.from(t).toNumber()) <
                    this._maxInternalBlockNumber &&
                    (t = this._maxInternalBlockNumber),
                  (this._maxInternalBlockNumber = t),
                  this._setFastBlockNumber(t),
                  { blockNumber: t, reqTime: e, respTime: i }
                );
              });
            return (
              (this._internalBlockNumber = n),
              n.catch((t) => {
                this._internalBlockNumber === n &&
                  (this._internalBlockNumber = null);
              }),
              (yield n).blockNumber
            );
          });
        }
        poll() {
          return I(this, void 0, void 0, function* () {
            const t = Y++,
              e = [];
            let n = null;
            try {
              n = yield this._getInternalBlockNumber(
                100 + this.pollingInterval / 2
              );
            } catch (r) {
              return void this.emit("error", r);
            }
            if (
              (this._setFastBlockNumber(n),
              this.emit("poll", t, n),
              n !== this._lastBlockNumber)
            ) {
              if (
                (-2 === this._emitted.block && (this._emitted.block = n - 1),
                Math.abs(this._emitted.block - n) > 1e3)
              )
                C.warn(
                  `network block skew detected; skipping block events (emitted=${this._emitted.block} blockNumber${n})`
                ),
                  this.emit(
                    "error",
                    C.makeError(
                      "network block skew detected",
                      s.Logger.errors.NETWORK_ERROR,
                      {
                        blockNumber: n,
                        event: "blockSkew",
                        previousBlockNumber: this._emitted.block,
                      }
                    )
                  ),
                  this.emit("block", n);
              else
                for (let t = this._emitted.block + 1; t <= n; t++)
                  this.emit("block", t);
              this._emitted.block !== n &&
                ((this._emitted.block = n),
                Object.keys(this._emitted).forEach((t) => {
                  if ("block" === t) return;
                  const e = this._emitted[t];
                  "pending" !== e && n - e > 12 && delete this._emitted[t];
                })),
                -2 === this._lastBlockNumber && (this._lastBlockNumber = n - 1),
                this._events.forEach((t) => {
                  switch (t.type) {
                    case "tx": {
                      const n = t.hash;
                      let r = this.getTransactionReceipt(n)
                        .then((t) =>
                          t && null != t.blockNumber
                            ? ((this._emitted["t:" + n] = t.blockNumber),
                              this.emit(n, t),
                              null)
                            : null
                        )
                        .catch((t) => {
                          this.emit("error", t);
                        });
                      e.push(r);
                      break;
                    }
                    case "filter": {
                      const r = t.filter;
                      (r.fromBlock = this._lastBlockNumber + 1),
                        (r.toBlock = n);
                      const i = this.getLogs(r)
                        .then((t) => {
                          0 !== t.length &&
                            t.forEach((t) => {
                              (this._emitted["b:" + t.blockHash] =
                                t.blockNumber),
                                (this._emitted["t:" + t.transactionHash] =
                                  t.blockNumber),
                                this.emit(r, t);
                            });
                        })
                        .catch((t) => {
                          this.emit("error", t);
                        });
                      e.push(i);
                      break;
                    }
                  }
                }),
                (this._lastBlockNumber = n),
                Promise.all(e)
                  .then(() => {
                    this.emit("didPoll", t);
                  })
                  .catch((t) => {
                    this.emit("error", t);
                  });
            } else this.emit("didPoll", t);
          });
        }
        resetEventsBlock(t) {
          (this._lastBlockNumber = t - 1), this.polling && this.poll();
        }
        get network() {
          return this._network;
        }
        detectNetwork() {
          return I(this, void 0, void 0, function* () {
            return C.throwError(
              "provider does not support network detection",
              s.Logger.errors.UNSUPPORTED_OPERATION,
              { operation: "provider.detectNetwork" }
            );
          });
        }
        getNetwork() {
          return I(this, void 0, void 0, function* () {
            const t = yield this._ready(),
              e = yield this.detectNetwork();
            if (t.chainId !== e.chainId) {
              if (this.anyNetwork)
                return (
                  (this._network = e),
                  (this._lastBlockNumber = -2),
                  (this._fastBlockNumber = null),
                  (this._fastBlockNumberPromise = null),
                  (this._fastQueryDate = 0),
                  (this._emitted.block = -2),
                  (this._maxInternalBlockNumber = -1024),
                  (this._internalBlockNumber = null),
                  this.emit("network", e, t),
                  yield D(0),
                  this._network
                );
              const n = C.makeError(
                "underlying network changed",
                s.Logger.errors.NETWORK_ERROR,
                { event: "changed", network: t, detectedNetwork: e }
              );
              throw (this.emit("error", n), n);
            }
            return t;
          });
        }
        get blockNumber() {
          return (
            this._getInternalBlockNumber(100 + this.pollingInterval / 2).then(
              (t) => {
                this._setFastBlockNumber(t);
              },
              (t) => {}
            ),
            null != this._fastBlockNumber ? this._fastBlockNumber : -1
          );
        }
        get polling() {
          return null != this._poller;
        }
        set polling(t) {
          t && !this._poller
            ? ((this._poller = setInterval(() => {
                this.poll();
              }, this.pollingInterval)),
              this._bootstrapPoll ||
                (this._bootstrapPoll = setTimeout(() => {
                  this.poll(),
                    (this._bootstrapPoll = setTimeout(() => {
                      this._poller || this.poll(), (this._bootstrapPoll = null);
                    }, this.pollingInterval));
                }, 0)))
            : !t &&
              this._poller &&
              (clearInterval(this._poller), (this._poller = null));
        }
        get pollingInterval() {
          return this._pollingInterval;
        }
        set pollingInterval(t) {
          if ("number" !== typeof t || t <= 0 || parseInt(String(t)) != t)
            throw new Error("invalid polling interval");
          (this._pollingInterval = t),
            this._poller &&
              (clearInterval(this._poller),
              (this._poller = setInterval(() => {
                this.poll();
              }, this._pollingInterval)));
        }
        _getFastBlockNumber() {
          const t = j();
          return (
            t - this._fastQueryDate > 2 * this._pollingInterval &&
              ((this._fastQueryDate = t),
              (this._fastBlockNumberPromise = this.getBlockNumber().then(
                (t) => (
                  (null == this._fastBlockNumber ||
                    t > this._fastBlockNumber) &&
                    (this._fastBlockNumber = t),
                  this._fastBlockNumber
                )
              ))),
            this._fastBlockNumberPromise
          );
        }
        _setFastBlockNumber(t) {
          (null != this._fastBlockNumber && t < this._fastBlockNumber) ||
            ((this._fastQueryDate = j()),
            (null == this._fastBlockNumber || t > this._fastBlockNumber) &&
              ((this._fastBlockNumber = t),
              (this._fastBlockNumberPromise = Promise.resolve(t))));
        }
        waitForTransaction(t, e, n) {
          return I(this, void 0, void 0, function* () {
            return this._waitForTransaction(t, null == e ? 1 : e, n || 0, null);
          });
        }
        _waitForTransaction(t, e, n, r) {
          return I(this, void 0, void 0, function* () {
            const i = yield this.getTransactionReceipt(t);
            return (i ? i.confirmations : 0) >= e
              ? i
              : new Promise((i, o) => {
                  const a = [];
                  let u = !1;
                  const l = function () {
                      return (
                        !!u ||
                        ((u = !0),
                        a.forEach((t) => {
                          t();
                        }),
                        !1)
                      );
                    },
                    c = (t) => {
                      t.confirmations < e || l() || i(t);
                    };
                  if (
                    (this.on(t, c),
                    a.push(() => {
                      this.removeListener(t, c);
                    }),
                    r)
                  ) {
                    let n = r.startBlock,
                      i = null;
                    const c = (a) =>
                      I(this, void 0, void 0, function* () {
                        u ||
                          (yield D(1e3),
                          this.getTransactionCount(r.from).then(
                            (h) =>
                              I(this, void 0, void 0, function* () {
                                if (!u) {
                                  if (h <= r.nonce) n = a;
                                  else {
                                    {
                                      const e = yield this.getTransaction(t);
                                      if (e && null != e.blockNumber) return;
                                    }
                                    for (
                                      null == i &&
                                      ((i = n - 3),
                                      i < r.startBlock && (i = r.startBlock));
                                      i <= a;

                                    ) {
                                      if (u) return;
                                      const n =
                                        yield this.getBlockWithTransactions(i);
                                      for (
                                        let i = 0;
                                        i < n.transactions.length;
                                        i++
                                      ) {
                                        const a = n.transactions[i];
                                        if (a.hash === t) return;
                                        if (
                                          a.from === r.from &&
                                          a.nonce === r.nonce
                                        ) {
                                          if (u) return;
                                          const n =
                                            yield this.waitForTransaction(
                                              a.hash,
                                              e
                                            );
                                          if (l()) return;
                                          let i = "replaced";
                                          return (
                                            a.data === r.data &&
                                            a.to === r.to &&
                                            a.value.eq(r.value)
                                              ? (i = "repriced")
                                              : "0x" === a.data &&
                                                a.from === a.to &&
                                                a.value.isZero() &&
                                                (i = "cancelled"),
                                            void o(
                                              C.makeError(
                                                "transaction was replaced",
                                                s.Logger.errors
                                                  .TRANSACTION_REPLACED,
                                                {
                                                  cancelled:
                                                    "replaced" === i ||
                                                    "cancelled" === i,
                                                  reason: i,
                                                  replacement:
                                                    this._wrapTransaction(a),
                                                  hash: t,
                                                  receipt: n,
                                                }
                                              )
                                            )
                                          );
                                        }
                                      }
                                      i++;
                                    }
                                  }
                                  u || this.once("block", c);
                                }
                              }),
                            (t) => {
                              u || this.once("block", c);
                            }
                          ));
                      });
                    if (u) return;
                    this.once("block", c),
                      a.push(() => {
                        this.removeListener("block", c);
                      });
                  }
                  if ("number" === typeof n && n > 0) {
                    const t = setTimeout(() => {
                      l() ||
                        o(
                          C.makeError(
                            "timeout exceeded",
                            s.Logger.errors.TIMEOUT,
                            { timeout: n }
                          )
                        );
                    }, n);
                    t.unref && t.unref(),
                      a.push(() => {
                        clearTimeout(t);
                      });
                  }
                });
          });
        }
        getBlockNumber() {
          return I(this, void 0, void 0, function* () {
            return this._getInternalBlockNumber(0);
          });
        }
        getGasPrice() {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const t = yield this.perform("getGasPrice", {});
            try {
              return c.O$.from(t);
            } catch (e) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "getGasPrice", result: t, error: e }
              );
            }
          });
        }
        getBalance(t, e) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const n = yield (0, a.resolveProperties)({
                address: this._getAddress(t),
                blockTag: this._getBlockTag(e),
              }),
              r = yield this.perform("getBalance", n);
            try {
              return c.O$.from(r);
            } catch (i) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "getBalance", params: n, result: r, error: i }
              );
            }
          });
        }
        getTransactionCount(t, e) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const n = yield (0, a.resolveProperties)({
                address: this._getAddress(t),
                blockTag: this._getBlockTag(e),
              }),
              r = yield this.perform("getTransactionCount", n);
            try {
              return c.O$.from(r).toNumber();
            } catch (i) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                {
                  method: "getTransactionCount",
                  params: n,
                  result: r,
                  error: i,
                }
              );
            }
          });
        }
        getCode(t, e) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const n = yield (0, a.resolveProperties)({
                address: this._getAddress(t),
                blockTag: this._getBlockTag(e),
              }),
              r = yield this.perform("getCode", n);
            try {
              return (0, h.hexlify)(r);
            } catch (i) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "getCode", params: n, result: r, error: i }
              );
            }
          });
        }
        getStorageAt(t, e, n) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const r = yield (0, a.resolveProperties)({
                address: this._getAddress(t),
                blockTag: this._getBlockTag(n),
                position: Promise.resolve(e).then((t) => (0, h.hexValue)(t)),
              }),
              i = yield this.perform("getStorageAt", r);
            try {
              return (0, h.hexlify)(i);
            } catch (o) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "getStorageAt", params: r, result: i, error: o }
              );
            }
          });
        }
        _wrapTransaction(t, e, n) {
          if (null != e && 32 !== (0, h.hexDataLength)(e))
            throw new Error("invalid response - sendTransaction");
          const r = t;
          return (
            null != e &&
              t.hash !== e &&
              C.throwError(
                "Transaction hash mismatch from Provider.sendTransaction.",
                s.Logger.errors.UNKNOWN_ERROR,
                { expectedHash: t.hash, returnedHash: e }
              ),
            (r.wait = (e, r) =>
              I(this, void 0, void 0, function* () {
                let i;
                null == e && (e = 1),
                  null == r && (r = 0),
                  0 !== e &&
                    null != n &&
                    (i = {
                      data: t.data,
                      from: t.from,
                      nonce: t.nonce,
                      to: t.to,
                      value: t.value,
                      startBlock: n,
                    });
                const o = yield this._waitForTransaction(t.hash, e, r, i);
                return null == o && 0 === e
                  ? null
                  : ((this._emitted["t:" + t.hash] = o.blockNumber),
                    0 === o.status &&
                      C.throwError(
                        "transaction failed",
                        s.Logger.errors.CALL_EXCEPTION,
                        { transactionHash: t.hash, transaction: t, receipt: o }
                      ),
                    o);
              })),
            r
          );
        }
        sendTransaction(t) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const e = yield Promise.resolve(t).then((t) => (0, h.hexlify)(t)),
              n = this.formatter.transaction(t);
            null == n.confirmations && (n.confirmations = 0);
            const r = yield this._getInternalBlockNumber(
              100 + 2 * this.pollingInterval
            );
            try {
              const t = yield this.perform("sendTransaction", {
                signedTransaction: e,
              });
              return this._wrapTransaction(n, t, r);
            } catch (i) {
              throw ((i.transaction = n), (i.transactionHash = n.hash), i);
            }
          });
        }
        _getTransactionRequest(t) {
          return I(this, void 0, void 0, function* () {
            const e = yield t,
              n = {};
            return (
              ["from", "to"].forEach((t) => {
                null != e[t] &&
                  (n[t] = Promise.resolve(e[t]).then((t) =>
                    t ? this._getAddress(t) : null
                  ));
              }),
              [
                "gasLimit",
                "gasPrice",
                "maxFeePerGas",
                "maxPriorityFeePerGas",
                "value",
              ].forEach((t) => {
                null != e[t] &&
                  (n[t] = Promise.resolve(e[t]).then((t) =>
                    t ? c.O$.from(t) : null
                  ));
              }),
              ["type"].forEach((t) => {
                null != e[t] &&
                  (n[t] = Promise.resolve(e[t]).then((t) =>
                    null != t ? t : null
                  ));
              }),
              e.accessList &&
                (n.accessList = this.formatter.accessList(e.accessList)),
              ["data"].forEach((t) => {
                null != e[t] &&
                  (n[t] = Promise.resolve(e[t]).then((t) =>
                    t ? (0, h.hexlify)(t) : null
                  ));
              }),
              this.formatter.transactionRequest(
                yield (0, a.resolveProperties)(n)
              )
            );
          });
        }
        _getFilter(t) {
          return I(this, void 0, void 0, function* () {
            t = yield t;
            const e = {};
            return (
              null != t.address && (e.address = this._getAddress(t.address)),
              ["blockHash", "topics"].forEach((n) => {
                null != t[n] && (e[n] = t[n]);
              }),
              ["fromBlock", "toBlock"].forEach((n) => {
                null != t[n] && (e[n] = this._getBlockTag(t[n]));
              }),
              this.formatter.filter(yield (0, a.resolveProperties)(e))
            );
          });
        }
        call(t, e) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const n = yield (0, a.resolveProperties)({
                transaction: this._getTransactionRequest(t),
                blockTag: this._getBlockTag(e),
              }),
              r = yield this.perform("call", n);
            try {
              return (0, h.hexlify)(r);
            } catch (i) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "call", params: n, result: r, error: i }
              );
            }
          });
        }
        estimateGas(t) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const e = yield (0, a.resolveProperties)({
                transaction: this._getTransactionRequest(t),
              }),
              n = yield this.perform("estimateGas", e);
            try {
              return c.O$.from(n);
            } catch (r) {
              return C.throwError(
                "bad result from backend",
                s.Logger.errors.SERVER_ERROR,
                { method: "estimateGas", params: e, result: n, error: r }
              );
            }
          });
        }
        _getAddress(t) {
          return I(this, void 0, void 0, function* () {
            "string" !== typeof (t = yield t) &&
              C.throwArgumentError("invalid address or ENS name", "name", t);
            const e = yield this.resolveName(t);
            return (
              null == e &&
                C.throwError(
                  "ENS name not configured",
                  s.Logger.errors.UNSUPPORTED_OPERATION,
                  { operation: `resolveName(${JSON.stringify(t)})` }
                ),
              e
            );
          });
        }
        _getBlock(t, e) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork(), (t = yield t);
            let n = -128;
            const r = { includeTransactions: !!e };
            if ((0, h.isHexString)(t, 32)) r.blockHash = t;
            else
              try {
                (r.blockTag = yield this._getBlockTag(t)),
                  (0, h.isHexString)(r.blockTag) &&
                    (n = parseInt(r.blockTag.substring(2), 16));
              } catch (i) {
                C.throwArgumentError(
                  "invalid block hash or block tag",
                  "blockHashOrBlockTag",
                  t
                );
              }
            return (0, m.poll)(
              () =>
                I(this, void 0, void 0, function* () {
                  const t = yield this.perform("getBlock", r);
                  if (null == t)
                    return (null != r.blockHash &&
                      null == this._emitted["b:" + r.blockHash]) ||
                      (null != r.blockTag && n > this._emitted.block)
                      ? null
                      : void 0;
                  if (e) {
                    let e = null;
                    for (let r = 0; r < t.transactions.length; r++) {
                      const n = t.transactions[r];
                      if (null == n.blockNumber) n.confirmations = 0;
                      else if (null == n.confirmations) {
                        null == e &&
                          (e = yield this._getInternalBlockNumber(
                            100 + 2 * this.pollingInterval
                          ));
                        let t = e - n.blockNumber + 1;
                        t <= 0 && (t = 1), (n.confirmations = t);
                      }
                    }
                    const n = this.formatter.blockWithTransactions(t);
                    return (
                      (n.transactions = n.transactions.map((t) =>
                        this._wrapTransaction(t)
                      )),
                      n
                    );
                  }
                  return this.formatter.block(t);
                }),
              { oncePoll: this }
            );
          });
        }
        getBlock(t) {
          return this._getBlock(t, !1);
        }
        getBlockWithTransactions(t) {
          return this._getBlock(t, !0);
        }
        getTransaction(t) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork(), (t = yield t);
            const e = { transactionHash: this.formatter.hash(t, !0) };
            return (0, m.poll)(
              () =>
                I(this, void 0, void 0, function* () {
                  const n = yield this.perform("getTransaction", e);
                  if (null == n)
                    return null == this._emitted["t:" + t] ? null : void 0;
                  const r = this.formatter.transactionResponse(n);
                  if (null == r.blockNumber) r.confirmations = 0;
                  else if (null == r.confirmations) {
                    let t =
                      (yield this._getInternalBlockNumber(
                        100 + 2 * this.pollingInterval
                      )) -
                      r.blockNumber +
                      1;
                    t <= 0 && (t = 1), (r.confirmations = t);
                  }
                  return this._wrapTransaction(r);
                }),
              { oncePoll: this }
            );
          });
        }
        getTransactionReceipt(t) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork(), (t = yield t);
            const e = { transactionHash: this.formatter.hash(t, !0) };
            return (0, m.poll)(
              () =>
                I(this, void 0, void 0, function* () {
                  const n = yield this.perform("getTransactionReceipt", e);
                  if (null == n)
                    return null == this._emitted["t:" + t] ? null : void 0;
                  if (null == n.blockHash) return;
                  const r = this.formatter.receipt(n);
                  if (null == r.blockNumber) r.confirmations = 0;
                  else if (null == r.confirmations) {
                    let t =
                      (yield this._getInternalBlockNumber(
                        100 + 2 * this.pollingInterval
                      )) -
                      r.blockNumber +
                      1;
                    t <= 0 && (t = 1), (r.confirmations = t);
                  }
                  return r;
                }),
              { oncePoll: this }
            );
          });
        }
        getLogs(t) {
          return I(this, void 0, void 0, function* () {
            yield this.getNetwork();
            const e = yield (0, a.resolveProperties)({
                filter: this._getFilter(t),
              }),
              n = yield this.perform("getLogs", e);
            return (
              n.forEach((t) => {
                null == t.removed && (t.removed = !1);
              }),
              N.arrayOf(this.formatter.filterLog.bind(this.formatter))(n)
            );
          });
        }
        getEtherPrice() {
          return I(this, void 0, void 0, function* () {
            return yield this.getNetwork(), this.perform("getEtherPrice", {});
          });
        }
        _getBlockTag(t) {
          return I(this, void 0, void 0, function* () {
            if ("number" === typeof (t = yield t) && t < 0) {
              t % 1 && C.throwArgumentError("invalid BlockTag", "blockTag", t);
              let e = yield this._getInternalBlockNumber(
                100 + 2 * this.pollingInterval
              );
              return (e += t), e < 0 && (e = 0), this.formatter.blockTag(e);
            }
            return this.formatter.blockTag(t);
          });
        }
        getResolver(t) {
          return I(this, void 0, void 0, function* () {
            try {
              const e = yield this._getResolver(t);
              return null == e ? null : new K(this, e, t);
            } catch (e) {
              if (e.code === s.Logger.errors.CALL_EXCEPTION) return null;
              throw e;
            }
          });
        }
        _getResolver(t) {
          return I(this, void 0, void 0, function* () {
            const e = yield this.getNetwork();
            e.ensAddress ||
              C.throwError(
                "network does not support ENS",
                s.Logger.errors.UNSUPPORTED_OPERATION,
                { operation: "ENS", network: e.name }
              );
            const n = {
              to: e.ensAddress,
              data: "0x0178b8bf" + (0, b.V)(t).substring(2),
            };
            try {
              return this.formatter.callAddress(yield this.call(n));
            } catch (r) {
              if (r.code === s.Logger.errors.CALL_EXCEPTION) return null;
              throw r;
            }
          });
        }
        resolveName(t) {
          return I(this, void 0, void 0, function* () {
            t = yield t;
            try {
              return Promise.resolve(this.formatter.address(t));
            } catch (n) {
              if ((0, h.isHexString)(t)) throw n;
            }
            "string" !== typeof t &&
              C.throwArgumentError("invalid ENS name", "name", t);
            const e = yield this.getResolver(t);
            return e ? yield e.getAddress() : null;
          });
        }
        lookupAddress(t) {
          return I(this, void 0, void 0, function* () {
            t = yield t;
            const e =
                (t = this.formatter.address(t)).substring(2).toLowerCase() +
                ".addr.reverse",
              n = yield this._getResolver(e);
            if (!n) return null;
            let r = (0, h.arrayify)(
              yield this.call({
                to: n,
                data: "0x691f3431" + (0, b.V)(e).substring(2),
              })
            );
            if (r.length < 32 || !c.O$.from(r.slice(0, 32)).eq(32)) return null;
            if (((r = r.slice(32)), r.length < 32)) return null;
            const i = c.O$.from(r.slice(0, 32)).toNumber();
            if (((r = r.slice(32)), i > r.length)) return null;
            const o = (0, d.ZN)(r.slice(0, i));
            return (yield this.resolveName(o)) != t ? null : o;
          });
        }
        getAvatar(t) {
          return I(this, void 0, void 0, function* () {
            let e = null;
            if ((0, h.isHexString)(t)) {
              const n = this.formatter.address(t),
                r = n.substring(2).toLowerCase() + ".addr.reverse",
                i = yield this._getResolver(r);
              if (!i) return null;
              e = new K(this, i, "_", n);
            } else if (((e = yield this.getResolver(t)), !e)) return null;
            const n = yield e.getAvatar();
            return null == n ? null : n.url;
          });
        }
        perform(t, e) {
          return C.throwError(
            t + " not implemented",
            s.Logger.errors.NOT_IMPLEMENTED,
            { operation: t }
          );
        }
        _startEvent(t) {
          this.polling = this._events.filter((t) => t.pollable()).length > 0;
        }
        _stopEvent(t) {
          this.polling = this._events.filter((t) => t.pollable()).length > 0;
        }
        _addEventListener(t, e, n) {
          const r = new V(F(t), e, n);
          return this._events.push(r), this._startEvent(r), this;
        }
        on(t, e) {
          return this._addEventListener(t, e, !1);
        }
        once(t, e) {
          return this._addEventListener(t, e, !0);
        }
        emit(t, ...e) {
          let n = !1,
            r = [],
            i = F(t);
          return (
            (this._events = this._events.filter(
              (t) =>
                t.tag !== i ||
                (setTimeout(() => {
                  t.listener.apply(this, e);
                }, 0),
                (n = !0),
                !t.once || (r.push(t), !1))
            )),
            r.forEach((t) => {
              this._stopEvent(t);
            }),
            n
          );
        }
        listenerCount(t) {
          if (!t) return this._events.length;
          let e = F(t);
          return this._events.filter((t) => t.tag === e).length;
        }
        listeners(t) {
          if (null == t) return this._events.map((t) => t.listener);
          let e = F(t);
          return this._events.filter((t) => t.tag === e).map((t) => t.listener);
        }
        off(t, e) {
          if (null == e) return this.removeAllListeners(t);
          const n = [];
          let r = !1,
            i = F(t);
          return (
            (this._events = this._events.filter(
              (t) =>
                t.tag !== i ||
                t.listener != e ||
                !!r ||
                ((r = !0), n.push(t), !1)
            )),
            n.forEach((t) => {
              this._stopEvent(t);
            }),
            this
          );
        }
        removeAllListeners(t) {
          let e = [];
          if (null == t) (e = this._events), (this._events = []);
          else {
            const n = F(t);
            this._events = this._events.filter(
              (t) => t.tag !== n || (e.push(t), !1)
            );
          }
          return (
            e.forEach((t) => {
              this._stopEvent(t);
            }),
            this
          );
        }
      }
      var tt = function (t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      };
      const et = new s.Logger(u),
        nt = ["call", "estimateGas"];
      function rt(t, e, n) {
        if ("call" === t && e.code === s.Logger.errors.SERVER_ERROR) {
          const t = e.error;
          if (t && t.message.match("reverted") && (0, h.isHexString)(t.data))
            return t.data;
          et.throwError(
            "missing revert data in call exception",
            s.Logger.errors.CALL_EXCEPTION,
            { error: e, data: "0x" }
          );
        }
        let r = e.message;
        e.code === s.Logger.errors.SERVER_ERROR &&
        e.error &&
        "string" === typeof e.error.message
          ? (r = e.error.message)
          : "string" === typeof e.body
          ? (r = e.body)
          : "string" === typeof e.responseText && (r = e.responseText),
          (r = (r || "").toLowerCase());
        const i = n.transaction || n.signedTransaction;
        throw (
          (r.match(/insufficient funds|base fee exceeds gas limit/) &&
            et.throwError(
              "insufficient funds for intrinsic transaction cost",
              s.Logger.errors.INSUFFICIENT_FUNDS,
              { error: e, method: t, transaction: i }
            ),
          r.match(/nonce too low/) &&
            et.throwError(
              "nonce has already been used",
              s.Logger.errors.NONCE_EXPIRED,
              { error: e, method: t, transaction: i }
            ),
          r.match(/replacement transaction underpriced/) &&
            et.throwError(
              "replacement fee too low",
              s.Logger.errors.REPLACEMENT_UNDERPRICED,
              { error: e, method: t, transaction: i }
            ),
          r.match(/only replay-protected/) &&
            et.throwError(
              "legacy pre-eip-155 transactions not supported",
              s.Logger.errors.UNSUPPORTED_OPERATION,
              { error: e, method: t, transaction: i }
            ),
          nt.indexOf(t) >= 0 &&
            r.match(
              /gas required exceeds allowance|always failing transaction|execution reverted/
            ) &&
            et.throwError(
              "cannot estimate gas; transaction may fail or may require manual gas limit",
              s.Logger.errors.UNPREDICTABLE_GAS_LIMIT,
              { error: e, method: t, transaction: i }
            ),
          e)
        );
      }
      function it(t) {
        return new Promise(function (e) {
          setTimeout(e, t);
        });
      }
      function ot(t) {
        if (t.error) {
          const e = new Error(t.error.message);
          throw ((e.code = t.error.code), (e.data = t.error.data), e);
        }
        return t.result;
      }
      function at(t) {
        return t ? t.toLowerCase() : t;
      }
      const st = {};
      class ut extends l.E {
        constructor(t, e, n) {
          if ((et.checkNew(new.target, ut), super(), t !== st))
            throw new Error(
              "do not call the JsonRpcSigner constructor directly; use provider.getSigner"
            );
          (0, a.defineReadOnly)(this, "provider", e),
            null == n && (n = 0),
            "string" === typeof n
              ? ((0, a.defineReadOnly)(
                  this,
                  "_address",
                  this.provider.formatter.address(n)
                ),
                (0, a.defineReadOnly)(this, "_index", null))
              : "number" === typeof n
              ? ((0, a.defineReadOnly)(this, "_index", n),
                (0, a.defineReadOnly)(this, "_address", null))
              : et.throwArgumentError(
                  "invalid address or index",
                  "addressOrIndex",
                  n
                );
        }
        connect(t) {
          return et.throwError(
            "cannot alter JSON-RPC Signer connection",
            s.Logger.errors.UNSUPPORTED_OPERATION,
            { operation: "connect" }
          );
        }
        connectUnchecked() {
          return new lt(st, this.provider, this._address || this._index);
        }
        getAddress() {
          return this._address
            ? Promise.resolve(this._address)
            : this.provider
                .send("eth_accounts", [])
                .then(
                  (t) => (
                    t.length <= this._index &&
                      et.throwError(
                        "unknown account #" + this._index,
                        s.Logger.errors.UNSUPPORTED_OPERATION,
                        { operation: "getAddress" }
                      ),
                    this.provider.formatter.address(t[this._index])
                  )
                );
        }
        sendUncheckedTransaction(t) {
          t = (0, a.shallowCopy)(t);
          const e = this.getAddress().then(
            (t) => (t && (t = t.toLowerCase()), t)
          );
          if (null == t.gasLimit) {
            const n = (0, a.shallowCopy)(t);
            (n.from = e), (t.gasLimit = this.provider.estimateGas(n));
          }
          return (
            null != t.to &&
              (t.to = Promise.resolve(t.to).then((t) =>
                tt(this, void 0, void 0, function* () {
                  if (null == t) return null;
                  const e = yield this.provider.resolveName(t);
                  return (
                    null == e &&
                      et.throwArgumentError(
                        "provided ENS name resolves to null",
                        "tx.to",
                        t
                      ),
                    e
                  );
                })
              )),
            (0, a.resolveProperties)({
              tx: (0, a.resolveProperties)(t),
              sender: e,
            }).then(({ tx: e, sender: n }) => {
              null != e.from
                ? e.from.toLowerCase() !== n &&
                  et.throwArgumentError(
                    "from address mismatch",
                    "transaction",
                    t
                  )
                : (e.from = n);
              const r = this.provider.constructor.hexlifyTransaction(e, {
                from: !0,
              });
              return this.provider.send("eth_sendTransaction", [r]).then(
                (t) => t,
                (t) => rt("sendTransaction", t, r)
              );
            })
          );
        }
        signTransaction(t) {
          return et.throwError(
            "signing transactions is unsupported",
            s.Logger.errors.UNSUPPORTED_OPERATION,
            { operation: "signTransaction" }
          );
        }
        sendTransaction(t) {
          return tt(this, void 0, void 0, function* () {
            const e = yield this.provider._getInternalBlockNumber(
                100 + 2 * this.provider.pollingInterval
              ),
              n = yield this.sendUncheckedTransaction(t);
            try {
              return yield (0, m.poll)(
                () =>
                  tt(this, void 0, void 0, function* () {
                    const t = yield this.provider.getTransaction(n);
                    if (null !== t)
                      return this.provider._wrapTransaction(t, n, e);
                  }),
                { oncePoll: this.provider }
              );
            } catch (r) {
              throw ((r.transactionHash = n), r);
            }
          });
        }
        signMessage(t) {
          return tt(this, void 0, void 0, function* () {
            const e = "string" === typeof t ? (0, d.Y0)(t) : t,
              n = yield this.getAddress();
            return yield this.provider.send("personal_sign", [
              (0, h.hexlify)(e),
              n.toLowerCase(),
            ]);
          });
        }
        _legacySignMessage(t) {
          return tt(this, void 0, void 0, function* () {
            const e = "string" === typeof t ? (0, d.Y0)(t) : t,
              n = yield this.getAddress();
            return yield this.provider.send("eth_sign", [
              n.toLowerCase(),
              (0, h.hexlify)(e),
            ]);
          });
        }
        _signTypedData(t, e, n) {
          return tt(this, void 0, void 0, function* () {
            const r = yield f.E.resolveNames(t, e, n, (t) =>
                this.provider.resolveName(t)
              ),
              i = yield this.getAddress();
            return yield this.provider.send("eth_signTypedData_v4", [
              i.toLowerCase(),
              JSON.stringify(f.E.getPayload(r.domain, e, r.value)),
            ]);
          });
        }
        unlock(t) {
          return tt(this, void 0, void 0, function* () {
            const e = this.provider,
              n = yield this.getAddress();
            return e.send("personal_unlockAccount", [n.toLowerCase(), t, null]);
          });
        }
      }
      class lt extends ut {
        sendTransaction(t) {
          return this.sendUncheckedTransaction(t).then((t) => ({
            hash: t,
            nonce: null,
            gasLimit: null,
            gasPrice: null,
            data: null,
            value: null,
            chainId: null,
            confirmations: 0,
            from: null,
            wait: (e) => this.provider.waitForTransaction(t, e),
          }));
        }
      }
      const ct = {
        chainId: !0,
        data: !0,
        gasLimit: !0,
        gasPrice: !0,
        nonce: !0,
        to: !0,
        value: !0,
        type: !0,
        accessList: !0,
        maxFeePerGas: !0,
        maxPriorityFeePerGas: !0,
      };
      class ht extends Q {
        constructor(t, e) {
          et.checkNew(new.target, ht);
          let n = e;
          null == n &&
            (n = new Promise((t, e) => {
              setTimeout(() => {
                this.detectNetwork().then(
                  (e) => {
                    t(e);
                  },
                  (t) => {
                    e(t);
                  }
                );
              }, 0);
            })),
            super(n),
            t || (t = (0, a.getStatic)(this.constructor, "defaultUrl")()),
            "string" === typeof t
              ? (0, a.defineReadOnly)(
                  this,
                  "connection",
                  Object.freeze({ url: t })
                )
              : (0, a.defineReadOnly)(
                  this,
                  "connection",
                  Object.freeze((0, a.shallowCopy)(t))
                ),
            (this._nextId = 42);
        }
        get _cache() {
          return (
            null == this._eventLoopCache && (this._eventLoopCache = {}),
            this._eventLoopCache
          );
        }
        static defaultUrl() {
          return "http://localhost:8545";
        }
        detectNetwork() {
          return (
            this._cache.detectNetwork ||
              ((this._cache.detectNetwork = this._uncachedDetectNetwork()),
              setTimeout(() => {
                this._cache.detectNetwork = null;
              }, 0)),
            this._cache.detectNetwork
          );
        }
        _uncachedDetectNetwork() {
          return tt(this, void 0, void 0, function* () {
            yield it(0);
            let t = null;
            try {
              t = yield this.send("eth_chainId", []);
            } catch (e) {
              try {
                t = yield this.send("net_version", []);
              } catch (e) {}
            }
            if (null != t) {
              const n = (0, a.getStatic)(this.constructor, "getNetwork");
              try {
                return n(c.O$.from(t).toNumber());
              } catch (e) {
                return et.throwError(
                  "could not detect network",
                  s.Logger.errors.NETWORK_ERROR,
                  { chainId: t, event: "invalidNetwork", serverError: e }
                );
              }
            }
            return et.throwError(
              "could not detect network",
              s.Logger.errors.NETWORK_ERROR,
              { event: "noNetwork" }
            );
          });
        }
        getSigner(t) {
          return new ut(st, this, t);
        }
        getUncheckedSigner(t) {
          return this.getSigner(t).connectUnchecked();
        }
        listAccounts() {
          return this.send("eth_accounts", []).then((t) =>
            t.map((t) => this.formatter.address(t))
          );
        }
        send(t, e) {
          const n = {
            method: t,
            params: e,
            id: this._nextId++,
            jsonrpc: "2.0",
          };
          this.emit("debug", {
            action: "request",
            request: (0, a.deepCopy)(n),
            provider: this,
          });
          const r = ["eth_chainId", "eth_blockNumber"].indexOf(t) >= 0;
          if (r && this._cache[t]) return this._cache[t];
          const i = (0, m.fetchJson)(
            this.connection,
            JSON.stringify(n),
            ot
          ).then(
            (t) => (
              this.emit("debug", {
                action: "response",
                request: n,
                response: t,
                provider: this,
              }),
              t
            ),
            (t) => {
              throw (
                (this.emit("debug", {
                  action: "response",
                  error: t,
                  request: n,
                  provider: this,
                }),
                t)
              );
            }
          );
          return (
            r &&
              ((this._cache[t] = i),
              setTimeout(() => {
                this._cache[t] = null;
              }, 0)),
            i
          );
        }
        prepareRequest(t, e) {
          switch (t) {
            case "getBlockNumber":
              return ["eth_blockNumber", []];
            case "getGasPrice":
              return ["eth_gasPrice", []];
            case "getBalance":
              return ["eth_getBalance", [at(e.address), e.blockTag]];
            case "getTransactionCount":
              return ["eth_getTransactionCount", [at(e.address), e.blockTag]];
            case "getCode":
              return ["eth_getCode", [at(e.address), e.blockTag]];
            case "getStorageAt":
              return [
                "eth_getStorageAt",
                [at(e.address), e.position, e.blockTag],
              ];
            case "sendTransaction":
              return ["eth_sendRawTransaction", [e.signedTransaction]];
            case "getBlock":
              return e.blockTag
                ? [
                    "eth_getBlockByNumber",
                    [e.blockTag, !!e.includeTransactions],
                  ]
                : e.blockHash
                ? ["eth_getBlockByHash", [e.blockHash, !!e.includeTransactions]]
                : null;
            case "getTransaction":
              return ["eth_getTransactionByHash", [e.transactionHash]];
            case "getTransactionReceipt":
              return ["eth_getTransactionReceipt", [e.transactionHash]];
            case "call":
              return [
                "eth_call",
                [
                  (0, a.getStatic)(this.constructor, "hexlifyTransaction")(
                    e.transaction,
                    { from: !0 }
                  ),
                  e.blockTag,
                ],
              ];
            case "estimateGas":
              return [
                "eth_estimateGas",
                [
                  (0, a.getStatic)(this.constructor, "hexlifyTransaction")(
                    e.transaction,
                    { from: !0 }
                  ),
                ],
              ];
            case "getLogs":
              return (
                e.filter &&
                  null != e.filter.address &&
                  (e.filter.address = at(e.filter.address)),
                ["eth_getLogs", [e.filter]]
              );
          }
          return null;
        }
        perform(t, e) {
          return tt(this, void 0, void 0, function* () {
            if ("call" === t || "estimateGas" === t) {
              const t = e.transaction;
              if (
                t &&
                null != t.type &&
                c.O$.from(t.type).isZero() &&
                null == t.maxFeePerGas &&
                null == t.maxPriorityFeePerGas
              ) {
                const n = yield this.getFeeData();
                null == n.maxFeePerGas &&
                  null == n.maxPriorityFeePerGas &&
                  (((e = (0, a.shallowCopy)(e)).transaction = (0,
                  a.shallowCopy)(t)),
                  delete e.transaction.type);
              }
            }
            const n = this.prepareRequest(t, e);
            null == n &&
              et.throwError(
                t + " not implemented",
                s.Logger.errors.NOT_IMPLEMENTED,
                { operation: t }
              );
            try {
              return yield this.send(n[0], n[1]);
            } catch (r) {
              return rt(t, r, e);
            }
          });
        }
        _startEvent(t) {
          "pending" === t.tag && this._startPending(), super._startEvent(t);
        }
        _startPending() {
          if (null != this._pendingFilter) return;
          const t = this,
            e = this.send("eth_newPendingTransactionFilter", []);
          (this._pendingFilter = e),
            e
              .then(function (n) {
                return (
                  (function r() {
                    t.send("eth_getFilterChanges", [n])
                      .then(function (n) {
                        if (t._pendingFilter != e) return null;
                        let r = Promise.resolve();
                        return (
                          n.forEach(function (e) {
                            (t._emitted["t:" + e.toLowerCase()] = "pending"),
                              (r = r.then(function () {
                                return t.getTransaction(e).then(function (e) {
                                  return t.emit("pending", e), null;
                                });
                              }));
                          }),
                          r.then(function () {
                            return it(1e3);
                          })
                        );
                      })
                      .then(function () {
                        if (t._pendingFilter == e)
                          return (
                            setTimeout(function () {
                              r();
                            }, 0),
                            null
                          );
                        t.send("eth_uninstallFilter", [n]);
                      })
                      .catch((t) => {});
                  })(),
                  n
                );
              })
              .catch((t) => {});
        }
        _stopEvent(t) {
          "pending" === t.tag &&
            0 === this.listenerCount("pending") &&
            (this._pendingFilter = null),
            super._stopEvent(t);
        }
        static hexlifyTransaction(t, e) {
          const n = (0, a.shallowCopy)(ct);
          if (e) for (const i in e) e[i] && (n[i] = !0);
          (0, a.checkProperties)(t, n);
          const r = {};
          return (
            [
              "gasLimit",
              "gasPrice",
              "type",
              "maxFeePerGas",
              "maxPriorityFeePerGas",
              "nonce",
              "value",
            ].forEach(function (e) {
              if (null == t[e]) return;
              const n = (0, h.hexValue)(t[e]);
              "gasLimit" === e && (e = "gas"), (r[e] = n);
            }),
            ["from", "to", "data"].forEach(function (e) {
              null != t[e] && (r[e] = (0, h.hexlify)(t[e]));
            }),
            t.accessList && (r.accessList = (0, p.accessListify)(t.accessList)),
            r
          );
        }
      }
      const ft = new s.Logger(u);
      let dt = 1;
      function pt(t, e) {
        const n = "Web3LegacyFetcher";
        return function (t, r) {
          const i = { method: t, params: r, id: dt++, jsonrpc: "2.0" };
          return new Promise((t, r) => {
            this.emit("debug", {
              action: "request",
              fetcher: n,
              request: (0, a.deepCopy)(i),
              provider: this,
            }),
              e(i, (e, o) => {
                if (e)
                  return (
                    this.emit("debug", {
                      action: "response",
                      fetcher: n,
                      error: e,
                      request: i,
                      provider: this,
                    }),
                    r(e)
                  );
                if (
                  (this.emit("debug", {
                    action: "response",
                    fetcher: n,
                    request: i,
                    response: o,
                    provider: this,
                  }),
                  o.error)
                ) {
                  const t = new Error(o.error.message);
                  return (t.code = o.error.code), (t.data = o.error.data), r(t);
                }
                t(o.result);
              });
          });
        };
      }
      class mt extends ht {
        constructor(t, e) {
          ft.checkNew(new.target, mt),
            null == t &&
              ft.throwArgumentError("missing provider", "provider", t);
          let n = null,
            r = null,
            i = null;
          "function" === typeof t
            ? ((n = "unknown:"), (r = t))
            : ((n = t.host || t.path || ""),
              !n && t.isMetaMask && (n = "metamask"),
              (i = t),
              t.request
                ? ("" === n && (n = "eip-1193:"),
                  (r = (function (t) {
                    return function (e, n) {
                      null == n && (n = []);
                      const r = { method: e, params: n };
                      return (
                        this.emit("debug", {
                          action: "request",
                          fetcher: "Eip1193Fetcher",
                          request: (0, a.deepCopy)(r),
                          provider: this,
                        }),
                        t.request(r).then(
                          (t) => (
                            this.emit("debug", {
                              action: "response",
                              fetcher: "Eip1193Fetcher",
                              request: r,
                              response: t,
                              provider: this,
                            }),
                            t
                          ),
                          (t) => {
                            throw (
                              (this.emit("debug", {
                                action: "response",
                                fetcher: "Eip1193Fetcher",
                                request: r,
                                error: t,
                                provider: this,
                              }),
                              t)
                            );
                          }
                        )
                      );
                    };
                  })(t)))
                : t.sendAsync
                ? (r = pt(0, t.sendAsync.bind(t)))
                : t.send
                ? (r = pt(0, t.send.bind(t)))
                : ft.throwArgumentError("unsupported provider", "provider", t),
              n || (n = "unknown:")),
            super(n, e),
            (0, a.defineReadOnly)(this, "jsonRpcFetchFunc", r),
            (0, a.defineReadOnly)(this, "provider", i);
        }
        send(t, e) {
          return this.jsonRpcFetchFunc(t, e);
        }
      }
      function yt(t) {
        let e;
        const n = new Set(),
          r = (t, r) => {
            const i = "function" === typeof t ? t(e) : t;
            if (i !== e) {
              const t = e;
              (e = r ? i : Object.assign({}, e, i)), n.forEach((n) => n(e, t));
            }
          },
          i = () => e,
          o = {
            setState: r,
            getState: i,
            subscribe: (t, r, o) =>
              r || o
                ? ((t, r = i, o = Object.is) => {
                    console.warn(
                      "[DEPRECATED] Please use `subscribeWithSelector` middleware"
                    );
                    let a = r(e);
                    function s() {
                      const n = r(e);
                      if (!o(a, n)) {
                        const e = a;
                        t((a = n), e);
                      }
                    }
                    return n.add(s), () => n.delete(s);
                  })(t, r, o)
                : (n.add(t), () => n.delete(t)),
            destroy: () => n.clear(),
          };
        return (e = t(r, i, o)), o;
      }
      const gt =
        "undefined" === typeof window ||
        !window.navigator ||
        /ServerSideRendering|^Deno\//.test(window.navigator.userAgent)
          ? o.useEffect
          : o.useLayoutEffect;
      Object.defineProperty,
        Object.getOwnPropertySymbols,
        Object.prototype.hasOwnProperty,
        Object.prototype.propertyIsEnumerable;
      Object.defineProperty,
        Object.getOwnPropertySymbols,
        Object.prototype.hasOwnProperty,
        Object.prototype.propertyIsEnumerable;
      function vt(t, e, n, r) {
        return new (n || (n = Promise))(function (i, o) {
          function a(t) {
            try {
              u(r.next(t));
            } catch (e) {
              o(e);
            }
          }
          function s(t) {
            try {
              u(r.throw(t));
            } catch (e) {
              o(e);
            }
          }
          function u(t) {
            var e;
            t.done
              ? i(t.value)
              : ((e = t.value),
                e instanceof n
                  ? e
                  : new n(function (t) {
                      t(e);
                    })).then(a, s);
          }
          u((r = r.apply(t, e || [])).next());
        });
      }
      function bt(t, e) {
        var n,
          r,
          i,
          o,
          a = {
            label: 0,
            sent: function () {
              if (1 & i[0]) throw i[1];
              return i[1];
            },
            trys: [],
            ops: [],
          };
        return (
          (o = { next: s(0), throw: s(1), return: s(2) }),
          "function" === typeof Symbol &&
            (o[Symbol.iterator] = function () {
              return this;
            }),
          o
        );
        function s(o) {
          return function (s) {
            return (function (o) {
              if (n) throw new TypeError("Generator is already executing.");
              for (; a; )
                try {
                  if (
                    ((n = 1),
                    r &&
                      (i =
                        2 & o[0]
                          ? r.return
                          : o[0]
                          ? r.throw || ((i = r.return) && i.call(r), 0)
                          : r.next) &&
                      !(i = i.call(r, o[1])).done)
                  )
                    return i;
                  switch (((r = 0), i && (o = [2 & o[0], i.value]), o[0])) {
                    case 0:
                    case 1:
                      i = o;
                      break;
                    case 4:
                      return a.label++, { value: o[1], done: !1 };
                    case 5:
                      a.label++, (r = o[1]), (o = [0]);
                      continue;
                    case 7:
                      (o = a.ops.pop()), a.trys.pop();
                      continue;
                    default:
                      if (
                        !(i = (i = a.trys).length > 0 && i[i.length - 1]) &&
                        (6 === o[0] || 2 === o[0])
                      ) {
                        a = 0;
                        continue;
                      }
                      if (3 === o[0] && (!i || (o[1] > i[0] && o[1] < i[3]))) {
                        a.label = o[1];
                        break;
                      }
                      if (6 === o[0] && a.label < i[1]) {
                        (a.label = i[1]), (i = o);
                        break;
                      }
                      if (i && a.label < i[2]) {
                        (a.label = i[2]), a.ops.push(o);
                        break;
                      }
                      i[2] && a.ops.pop(), a.trys.pop();
                      continue;
                  }
                  o = e.call(t, a);
                } catch (s) {
                  (o = [6, s]), (r = 0);
                } finally {
                  n = i = 0;
                }
              if (5 & o[0]) throw o[1];
              return { value: o[0] ? o[1] : void 0, done: !0 };
            })([o, s]);
          };
        }
      }
      var wt,
        xt = function () {},
        Et = xt(),
        Tt = Object,
        At = function (t) {
          return t === Et;
        },
        Mt = function (t) {
          return "function" == typeof t;
        },
        _t = function (t, e) {
          return Tt.assign({}, t, e);
        },
        kt = "undefined",
        St = function () {
          return typeof window != kt;
        },
        Pt = new WeakMap(),
        Ot = 0,
        Rt = function (t) {
          var e,
            n,
            r = typeof t,
            i = t && t.constructor,
            o = i == Date;
          if (Tt(t) !== t || o || i == RegExp)
            e = o
              ? t.toJSON()
              : "symbol" == r
              ? t.toString()
              : "string" == r
              ? JSON.stringify(t)
              : "" + t;
          else {
            if ((e = Pt.get(t))) return e;
            if (((e = ++Ot + "~"), Pt.set(t, e), i == Array)) {
              for (e = "@", n = 0; n < t.length; n++) e += Rt(t[n]) + ",";
              Pt.set(t, e);
            }
            if (i == Tt) {
              e = "#";
              for (var a = Tt.keys(t).sort(); !At((n = a.pop())); )
                At(t[n]) || (e += n + ":" + Rt(t[n]) + ",");
              Pt.set(t, e);
            }
          }
          return e;
        },
        Nt = !0,
        It = St(),
        Ct = typeof document != kt,
        Lt =
          It && window.addEventListener
            ? window.addEventListener.bind(window)
            : xt,
        Bt = Ct ? document.addEventListener.bind(document) : xt,
        Ft =
          It && window.removeEventListener
            ? window.removeEventListener.bind(window)
            : xt,
        jt = Ct ? document.removeEventListener.bind(document) : xt,
        Dt = {
          isOnline: function () {
            return Nt;
          },
          isVisible: function () {
            var t = Ct && document.visibilityState;
            return At(t) || "hidden" !== t;
          },
        },
        Ut = {
          initFocus: function (t) {
            return (
              Bt("visibilitychange", t),
              Lt("focus", t),
              function () {
                jt("visibilitychange", t), Ft("focus", t);
              }
            );
          },
          initReconnect: function (t) {
            var e = function () {
                (Nt = !0), t();
              },
              n = function () {
                Nt = !1;
              };
            return (
              Lt("online", e),
              Lt("offline", n),
              function () {
                Ft("online", e), Ft("offline", n);
              }
            );
          },
        },
        Vt = !St() || "Deno" in window,
        Gt = function (t) {
          return St() && typeof window.requestAnimationFrame != kt
            ? window.requestAnimationFrame(t)
            : setTimeout(t, 1);
        },
        zt = Vt ? o.useEffect : o.useLayoutEffect,
        $t = "undefined" !== typeof navigator && navigator.connection,
        Ht =
          !Vt &&
          $t &&
          (["slow-2g", "2g"].includes($t.effectiveType) || $t.saveData),
        qt = function (t) {
          if (Mt(t))
            try {
              t = t();
            } catch (n) {
              t = "";
            }
          var e = [].concat(t);
          return [
            (t =
              "string" == typeof t
                ? t
                : (Array.isArray(t) ? t.length : t)
                ? Rt(t)
                : ""),
            e,
            t ? "$swr$" + t : "",
          ];
        },
        Wt = new WeakMap(),
        Xt = function (t, e, n, r, i, o, a) {
          void 0 === a && (a = !0);
          var s = Wt.get(t),
            u = s[0],
            l = s[1],
            c = s[3],
            h = u[e],
            f = l[e];
          if (a && f) for (var d = 0; d < f.length; ++d) f[d](n, r, i);
          return o && (delete c[e], h && h[0])
            ? h[0](2).then(function () {
                return t.get(e);
              })
            : t.get(e);
        },
        Zt = 0,
        Kt = function () {
          return ++Zt;
        },
        Jt = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          return vt(void 0, void 0, void 0, function () {
            var e, n, r, i, o, a, s, u, l, c, h, f, d, p, m, y, g, v, b, w;
            return bt(this, function (x) {
              switch (x.label) {
                case 0:
                  if (
                    ((e = t[0]),
                    (n = t[1]),
                    (r = t[2]),
                    (i = t[3]),
                    (a =
                      !!At(
                        (o =
                          "boolean" === typeof i ? { revalidate: i } : i || {})
                          .populateCache
                      ) || o.populateCache),
                    (s = !1 !== o.revalidate),
                    (u = !1 !== o.rollbackOnError),
                    (l = o.optimisticData),
                    (c = qt(n)),
                    (h = c[0]),
                    (f = c[2]),
                    !h)
                  )
                    return [2];
                  if (((d = Wt.get(e)), (p = d[2]), t.length < 3))
                    return [2, Xt(e, h, e.get(h), Et, Et, s, !0)];
                  if (
                    ((m = r),
                    (g = Kt()),
                    (p[h] = [g, 0]),
                    (v = !At(l)),
                    (b = e.get(h)),
                    v && (e.set(h, l), Xt(e, h, l)),
                    Mt(m))
                  )
                    try {
                      m = m(e.get(h));
                    } catch (E) {
                      y = E;
                    }
                  return m && Mt(m.then)
                    ? [
                        4,
                        m.catch(function (t) {
                          y = t;
                        }),
                      ]
                    : [3, 2];
                case 1:
                  if (((m = x.sent()), g !== p[h][0])) {
                    if (y) throw y;
                    return [2, m];
                  }
                  y && v && u && ((a = !0), (m = b), e.set(h, b)),
                    (x.label = 2);
                case 2:
                  return (
                    a &&
                      (y || (Mt(a) && (m = a(m, b)), e.set(h, m)),
                      e.set(f, _t(e.get(f), { error: y }))),
                    (p[h][1] = Kt()),
                    [4, Xt(e, h, m, y, Et, s, !!a)]
                  );
                case 3:
                  if (((w = x.sent()), y)) throw y;
                  return [2, a ? w : m];
              }
            });
          });
        },
        Yt = function (t, e) {
          for (var n in t) t[n][0] && t[n][0](e);
        },
        Qt = function (t, e) {
          if (!Wt.has(t)) {
            var n = _t(Ut, e),
              r = {},
              i = Jt.bind(Et, t),
              o = xt;
            if ((Wt.set(t, [r, {}, {}, {}, i]), !Vt)) {
              var a = n.initFocus(setTimeout.bind(Et, Yt.bind(Et, r, 0))),
                s = n.initReconnect(setTimeout.bind(Et, Yt.bind(Et, r, 1)));
              o = function () {
                a && a(), s && s(), Wt.delete(t);
              };
            }
            return [t, i, o];
          }
          return [t, Wt.get(t)[4]];
        },
        te = Qt(new Map()),
        ee = te[0],
        ne = te[1],
        re = _t(
          {
            onLoadingSlow: xt,
            onSuccess: xt,
            onError: xt,
            onErrorRetry: function (t, e, n, r, i) {
              var o = n.errorRetryCount,
                a = i.retryCount,
                s =
                  ~~((Math.random() + 0.5) * (1 << (a < 8 ? a : 8))) *
                  n.errorRetryInterval;
              (!At(o) && a > o) || setTimeout(r, s, i);
            },
            onDiscarded: xt,
            revalidateOnFocus: !0,
            revalidateOnReconnect: !0,
            revalidateIfStale: !0,
            shouldRetryOnError: !0,
            errorRetryInterval: Ht ? 1e4 : 5e3,
            focusThrottleInterval: 5e3,
            dedupingInterval: 2e3,
            loadingTimeout: Ht ? 5e3 : 3e3,
            compare: function (t, e) {
              return Rt(t) == Rt(e);
            },
            isPaused: function () {
              return !1;
            },
            cache: ee,
            mutate: ne,
            fallback: {},
          },
          Dt
        ),
        ie = function (t, e) {
          var n = _t(t, e);
          if (e) {
            var r = t.use,
              i = t.fallback,
              o = e.use,
              a = e.fallback;
            r && o && (n.use = r.concat(o)), i && a && (n.fallback = _t(i, a));
          }
          return n;
        },
        oe = (0, o.createContext)({}),
        ae = function (t) {
          return Mt(t[1])
            ? [t[0], t[1], t[2] || {}]
            : [t[0], null, (null === t[1] ? t[2] : t[1]) || {}];
        },
        se = function () {
          return _t(re, (0, o.useContext)(oe));
        },
        ue = function (t, e, n) {
          var r = e[t] || (e[t] = []);
          return (
            r.push(n),
            function () {
              var t = r.indexOf(n);
              t >= 0 && ((r[t] = r[r.length - 1]), r.pop());
            }
          );
        },
        le = { dedupe: !0 },
        ce =
          (Tt.defineProperty(
            function (t) {
              var e = t.value,
                n = ie((0, o.useContext)(oe), e),
                r = e && e.provider,
                i = (0, o.useState)(function () {
                  return r ? Qt(r(n.cache || ee), e) : Et;
                })[0];
              return (
                i && ((n.cache = i[0]), (n.mutate = i[1])),
                zt(function () {
                  return i ? i[2] : Et;
                }, []),
                (0, o.createElement)(oe.Provider, _t(t, { value: n }))
              );
            },
            "default",
            { value: re }
          ),
          (wt = function (t, e, n) {
            var r = n.cache,
              i = n.compare,
              a = n.fallbackData,
              s = n.suspense,
              u = n.revalidateOnMount,
              l = n.refreshInterval,
              c = n.refreshWhenHidden,
              h = n.refreshWhenOffline,
              f = Wt.get(r),
              d = f[0],
              p = f[1],
              m = f[2],
              y = f[3],
              g = qt(t),
              v = g[0],
              b = g[1],
              w = g[2],
              x = (0, o.useRef)(!1),
              E = (0, o.useRef)(!1),
              T = (0, o.useRef)(v),
              A = (0, o.useRef)(e),
              M = (0, o.useRef)(n),
              _ = function () {
                return M.current;
              },
              k = function () {
                return _().isVisible() && _().isOnline();
              },
              S = function (t) {
                return r.set(w, _t(r.get(w), t));
              },
              P = r.get(v),
              O = At(a) ? n.fallback[v] : a,
              R = At(P) ? O : P,
              N = r.get(w) || {},
              I = N.error,
              C = !x.current,
              L = function () {
                return C && !At(u)
                  ? u
                  : !_().isPaused() &&
                      (s ? !At(R) : At(R) || n.revalidateIfStale);
              },
              B = !(!v || !e) && (!!N.isValidating || (C && L())),
              F = (function (t, e) {
                var n = (0, o.useState)({})[1],
                  r = (0, o.useRef)(t),
                  i = (0, o.useRef)({ data: !1, error: !1, isValidating: !1 }),
                  a = (0, o.useCallback)(function (t) {
                    var o = !1,
                      a = r.current;
                    for (var s in t) {
                      var u = s;
                      a[u] !== t[u] &&
                        ((a[u] = t[u]), i.current[u] && (o = !0));
                    }
                    o && !e.current && n({});
                  }, []);
                return (
                  zt(function () {
                    r.current = t;
                  }),
                  [r, i.current, a]
                );
              })({ data: R, error: I, isValidating: B }, E),
              j = F[0],
              D = F[1],
              U = F[2],
              V = (0, o.useCallback)(
                function (t) {
                  return vt(void 0, void 0, void 0, function () {
                    var e, o, a, s, u, l, c, h, f, d, p, g, w;
                    return bt(this, function (M) {
                      switch (M.label) {
                        case 0:
                          if (
                            ((e = A.current),
                            !v || !e || E.current || _().isPaused())
                          )
                            return [2, !1];
                          (s = !0),
                            (u = t || {}),
                            (l = !y[v] || !u.dedupe),
                            (c = function () {
                              return !E.current && v === T.current && x.current;
                            }),
                            (h = function () {
                              var t = y[v];
                              t && t[1] === a && delete y[v];
                            }),
                            (f = { isValidating: !1 }),
                            (d = function () {
                              S({ isValidating: !1 }), c() && U(f);
                            }),
                            S({ isValidating: !0 }),
                            U({ isValidating: !0 }),
                            (M.label = 1);
                        case 1:
                          return (
                            M.trys.push([1, 3, , 4]),
                            l &&
                              (Xt(r, v, j.current.data, j.current.error, !0),
                              n.loadingTimeout &&
                                !r.get(v) &&
                                setTimeout(function () {
                                  s && c() && _().onLoadingSlow(v, n);
                                }, n.loadingTimeout),
                              (y[v] = [e.apply(void 0, b), Kt()])),
                            (w = y[v]),
                            (o = w[0]),
                            (a = w[1]),
                            [4, o]
                          );
                        case 2:
                          return (
                            (o = M.sent()),
                            l && setTimeout(h, n.dedupingInterval),
                            y[v] && y[v][1] === a
                              ? (S({ error: Et }),
                                (f.error = Et),
                                (p = m[v]),
                                !At(p) && (a <= p[0] || a <= p[1] || 0 === p[1])
                                  ? (d(),
                                    l && c() && _().onDiscarded(v),
                                    [2, !1])
                                  : (i(j.current.data, o)
                                      ? (f.data = j.current.data)
                                      : (f.data = o),
                                    i(r.get(v), o) || r.set(v, o),
                                    l && c() && _().onSuccess(o, v, n),
                                    [3, 4]))
                              : (l && c() && _().onDiscarded(v), [2, !1])
                          );
                        case 3:
                          return (
                            (g = M.sent()),
                            h(),
                            _().isPaused() ||
                              (S({ error: g }),
                              (f.error = g),
                              l &&
                                c() &&
                                (_().onError(g, v, n),
                                (("boolean" === typeof n.shouldRetryOnError &&
                                  n.shouldRetryOnError) ||
                                  (Mt(n.shouldRetryOnError) &&
                                    n.shouldRetryOnError(g))) &&
                                  k() &&
                                  _().onErrorRetry(g, v, n, V, {
                                    retryCount: (u.retryCount || 0) + 1,
                                    dedupe: !0,
                                  }))),
                            [3, 4]
                          );
                        case 4:
                          return (
                            (s = !1),
                            d(),
                            c() && l && Xt(r, v, f.data, f.error, !1),
                            [2, !0]
                          );
                      }
                    });
                  });
                },
                [v]
              ),
              G = (0, o.useCallback)(
                Jt.bind(Et, r, function () {
                  return T.current;
                }),
                []
              );
            if (
              (zt(function () {
                (A.current = e), (M.current = n);
              }),
              zt(
                function () {
                  if (v) {
                    var t = v !== T.current,
                      e = V.bind(Et, le),
                      n = 0,
                      r = ue(v, p, function (t, e, n) {
                        U(
                          _t(
                            { error: e, isValidating: n },
                            i(j.current.data, t) ? Et : { data: t }
                          )
                        );
                      }),
                      o = ue(v, d, function (t) {
                        if (0 == t) {
                          var r = Date.now();
                          _().revalidateOnFocus &&
                            r > n &&
                            k() &&
                            ((n = r + _().focusThrottleInterval), e());
                        } else if (1 == t)
                          _().revalidateOnReconnect && k() && e();
                        else if (2 == t) return V();
                      });
                    return (
                      (E.current = !1),
                      (T.current = v),
                      (x.current = !0),
                      t && U({ data: R, error: I, isValidating: B }),
                      L() && (At(R) || Vt ? e() : Gt(e)),
                      function () {
                        (E.current = !0), r(), o();
                      }
                    );
                  }
                },
                [v, V]
              ),
              zt(
                function () {
                  var t;
                  function e() {
                    var e = Mt(l) ? l(R) : l;
                    e && -1 !== t && (t = setTimeout(n, e));
                  }
                  function n() {
                    j.current.error ||
                    (!c && !_().isVisible()) ||
                    (!h && !_().isOnline())
                      ? e()
                      : V(le).then(e);
                  }
                  return (
                    e(),
                    function () {
                      t && (clearTimeout(t), (t = -1));
                    }
                  );
                },
                [l, c, h, V]
              ),
              (0, o.useDebugValue)(R),
              s && At(R) && v)
            )
              throw (
                ((A.current = e),
                (M.current = n),
                (E.current = !1),
                At(I) ? V(le) : I)
              );
            return {
              mutate: G,
              get data() {
                return (D.data = !0), R;
              },
              get error() {
                return (D.error = !0), I;
              },
              get isValidating() {
                return (D.isValidating = !0), B;
              },
            };
          }),
          function () {
            for (var t = [], e = 0; e < arguments.length; e++)
              t[e] = arguments[e];
            var n = se(),
              r = ae(t),
              i = r[0],
              o = r[1],
              a = r[2],
              s = ie(n, a),
              u = wt,
              l = s.use;
            if (l) for (var c = l.length; c-- > 0; ) u = l[c](u);
            return u(i, o || s.fetcher, s);
          });
      function he(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
      }
      function fe(t, e, n, r, i, o, a) {
        try {
          var s = t[o](a),
            u = s.value;
        } catch (l) {
          return void n(l);
        }
        s.done ? e(u) : Promise.resolve(u).then(r, i);
      }
      function de(t) {
        return function () {
          var e = this,
            n = arguments;
          return new Promise(function (r, i) {
            var o = t.apply(e, n);
            function a(t) {
              fe(o, r, i, a, s, "next", t);
            }
            function s(t) {
              fe(o, r, i, a, s, "throw", t);
            }
            a(void 0);
          });
        };
      }
      function pe(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function me(t, e) {
        return (
          (function (t) {
            if (Array.isArray(t)) return t;
          })(t) ||
          (function (t, e) {
            var n =
              null == t
                ? null
                : ("undefined" !== typeof Symbol && t[Symbol.iterator]) ||
                  t["@@iterator"];
            if (null != n) {
              var r,
                i,
                o = [],
                a = !0,
                s = !1;
              try {
                for (
                  n = n.call(t);
                  !(a = (r = n.next()).done) &&
                  (o.push(r.value), !e || o.length !== e);
                  a = !0
                );
              } catch (u) {
                (s = !0), (i = u);
              } finally {
                try {
                  a || null == n.return || n.return();
                } finally {
                  if (s) throw i;
                }
              }
              return o;
            }
          })(t, e) ||
          (function (t, e) {
            if (!t) return;
            if ("string" === typeof t) return he(t, e);
            var n = Object.prototype.toString.call(t).slice(8, -1);
            "Object" === n && t.constructor && (n = t.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(n);
            if (
              "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            )
              return he(t, e);
          })(t, e) ||
          (function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          })()
        );
      }
      var ye = (function (t) {
          const e = "function" === typeof t ? yt(t) : t,
            n = (t = e.getState, n = Object.is) => {
              const [, r] = (0, o.useReducer)((t) => t + 1, 0),
                i = e.getState(),
                a = (0, o.useRef)(i),
                s = (0, o.useRef)(t),
                u = (0, o.useRef)(n),
                l = (0, o.useRef)(!1),
                c = (0, o.useRef)();
              let h;
              void 0 === c.current && (c.current = t(i));
              let f = !1;
              (a.current !== i ||
                s.current !== t ||
                u.current !== n ||
                l.current) &&
                ((h = t(i)), (f = !n(c.current, h))),
                gt(() => {
                  f && (c.current = h),
                    (a.current = i),
                    (s.current = t),
                    (u.current = n),
                    (l.current = !1);
                });
              const d = (0, o.useRef)(i);
              gt(() => {
                const t = () => {
                    try {
                      const t = e.getState(),
                        n = s.current(t);
                      u.current(c.current, n) ||
                        ((a.current = t), (c.current = n), r());
                    } catch (t) {
                      (l.current = !0), r();
                    }
                  },
                  n = e.subscribe(t);
                return e.getState() !== d.current && t(), n;
              }, []);
              const p = f ? h : c.current;
              return (0, o.useDebugValue)(p), p;
            };
          return (
            Object.assign(n, e),
            (n[Symbol.iterator] = function () {
              console.warn(
                "[useStore, api] = create() is deprecated and will be removed in v4"
              );
              const t = [n, e];
              return {
                next() {
                  const e = t.length <= 0;
                  return { value: t.shift(), done: e };
                },
              };
            }),
            n
          );
        })(
          (
            (t, e) => (n, r, i) =>
              Object.assign({}, t, e(n, r, i))
          )(
            {
              provider: null,
              fetcher: null,
              account: "",
              isConnected: !1,
              hasProvider: !1,
              contracts: new Map(),
            },
            function (t) {
              return {
                initializeStore: function (e) {
                  return t(
                    (function (t) {
                      for (var e = 1; e < arguments.length; e++) {
                        var n = null != arguments[e] ? arguments[e] : {},
                          r = Object.keys(n);
                        "function" === typeof Object.getOwnPropertySymbols &&
                          (r = r.concat(
                            Object.getOwnPropertySymbols(n).filter(function (
                              t
                            ) {
                              return Object.getOwnPropertyDescriptor(n, t)
                                .enumerable;
                            })
                          )),
                          r.forEach(function (e) {
                            pe(t, e, n[e]);
                          });
                      }
                      return t;
                    })({}, e)
                  );
                },
                setContract: function (e, n) {
                  return t(function (t) {
                    return t.provider
                      ? (t.contracts.set(e, n),
                        { contracts: new Map(t.contracts) })
                      : { contracts: t.contracts };
                  });
                },
              };
            }
          )
        ),
        ge = function () {
          var t = ye(function (t) {
            return t.initializeStore;
          });
          (0, o.useEffect)(
            function () {
              var e = function () {
                console.warn("Detected change, reloading..."),
                  window.location.reload();
              };
              if (window.ethereum) {
                var n = new mt(window.ethereum),
                  r = function (t, e) {
                    return n.jsonRpcFetchFunc(t, e);
                  };
                return (
                  o(),
                  window.ethereum.on("accountsChanged", o),
                  window.ethereum.on("chainChanged", e),
                  window.ethereum.on("disconnect", e),
                  function () {
                    window.ethereum.removeListener("accountsChanged", o),
                      window.ethereum.removeListener("chainChanged", e),
                      window.ethereum.removeListener("disconnect", e);
                  }
                );
              }
              function o() {
                return a.apply(this, arguments);
              }
              function a() {
                return (a = de(
                  i().mark(function e() {
                    var o, a;
                    return i().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.prev = 0),
                                (e.t0 = me),
                                (e.next = 4),
                                n.listAccounts()
                              );
                            case 4:
                              (e.t1 = e.sent),
                                (o = (0, e.t0)(e.t1, 1)),
                                (a = o[0]),
                                t({
                                  provider: n,
                                  fetcher: r,
                                  account: a || "",
                                  isConnected: Boolean(a),
                                  hasProvider: Boolean(n),
                                  contracts: new Map(),
                                }),
                                (e.next = 13);
                              break;
                            case 10:
                              (e.prev = 10),
                                (e.t2 = e.catch(0)),
                                console.error(e.t2);
                            case 13:
                            case "end":
                              return e.stop();
                          }
                      },
                      e,
                      null,
                      [[0, 10]]
                    );
                  })
                )).apply(this, arguments);
              }
            },
            [t]
          );
        };
      function ve(t, e) {
        var n = ye(function (t) {
            return t.fetcher;
          }),
          r = ce(n ? [t, e] : null, n || null),
          i = r.data,
          o = r.error;
        return [i, { loading: !o && !i, error: o }];
      }
    },
    7055: function (t, e, n) {
      "use strict";
      function r() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        return e.filter(Boolean).join(" ");
      }
      n.d(e, {
        A: function () {
          return r;
        },
      });
    },
    9664: function (t, e, n) {
      "use strict";
      function r(t, e) {
        return null != e &&
          "undefined" !== typeof Symbol &&
          e[Symbol.hasInstance]
          ? e[Symbol.hasInstance](t)
          : t instanceof e;
      }
      n.d(e, {
        hu: function () {
          return i;
        },
        Ft: function () {
          return o;
        },
        jn: function () {
          return a;
        },
        HD: function () {
          return s;
        },
        xb: function () {
          return u;
        },
        on: function () {
          return l;
        },
        JG: function () {
          return c;
        },
      });
      function i(t, e) {
        if (!t) throw new TypeError(e);
      }
      function o(t) {
        return null === t;
      }
      function a(t) {
        return "boolean" === typeof t;
      }
      function s(t) {
        return "string" === typeof t;
      }
      function u(t) {
        return (function (t) {
          return Array.isArray(t);
        })(t)
          ? 0 === t.length
          : (function (t) {
              return r(t, Map);
            })(t) ||
            (function (t) {
              return r(t, Set);
            })(t)
          ? 0 === t.size
          : (function (t) {
              return !o(t) && "object" === typeof t;
            })(t)
          ? 0 === Object.getOwnPropertyNames(t).length
          : !!s(t) && "" === t;
      }
      function l(t) {
        return (
          o(t) ||
          (function (t) {
            return "undefined" === typeof t;
          })(t)
        );
      }
      function c(t) {
        return !l(t);
      }
    },
    2732: function (t, e, n) {
      "use strict";
      n.r(e),
        n.d(e, {
          default: function () {
            return ws;
          },
        });
      var r = n(5893),
        i = (n(6930), n(472), n(2962)),
        o = function (t, e) {
          return (
            (o =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (t, e) {
                  t.__proto__ = e;
                }) ||
              function (t, e) {
                for (var n in e)
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              }),
            o(t, e)
          );
        };
      function a(t, e) {
        if ("function" !== typeof e && null !== e)
          throw new TypeError(
            "Class extends value " + String(e) + " is not a constructor or null"
          );
        function n() {
          this.constructor = t;
        }
        o(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      }
      var s = function () {
        return (
          (s =
            Object.assign ||
            function (t) {
              for (var e, n = 1, r = arguments.length; n < r; n++)
                for (var i in (e = arguments[n]))
                  Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
              return t;
            }),
          s.apply(this, arguments)
        );
      };
      function u(t, e) {
        var n = {};
        for (var r in t)
          Object.prototype.hasOwnProperty.call(t, r) &&
            e.indexOf(r) < 0 &&
            (n[r] = t[r]);
        if (null != t && "function" === typeof Object.getOwnPropertySymbols) {
          var i = 0;
          for (r = Object.getOwnPropertySymbols(t); i < r.length; i++)
            e.indexOf(r[i]) < 0 &&
              Object.prototype.propertyIsEnumerable.call(t, r[i]) &&
              (n[r[i]] = t[r[i]]);
        }
        return n;
      }
      Object.create;
      function l(t) {
        var e = "function" === typeof Symbol && Symbol.iterator,
          n = e && t[e],
          r = 0;
        if (n) return n.call(t);
        if (t && "number" === typeof t.length)
          return {
            next: function () {
              return (
                t && r >= t.length && (t = void 0),
                { value: t && t[r++], done: !t }
              );
            },
          };
        throw new TypeError(
          e ? "Object is not iterable." : "Symbol.iterator is not defined."
        );
      }
      function c(t, e) {
        var n = "function" === typeof Symbol && t[Symbol.iterator];
        if (!n) return t;
        var r,
          i,
          o = n.call(t),
          a = [];
        try {
          for (; (void 0 === e || e-- > 0) && !(r = o.next()).done; )
            a.push(r.value);
        } catch (s) {
          i = { error: s };
        } finally {
          try {
            r && !r.done && (n = o.return) && n.call(o);
          } finally {
            if (i) throw i.error;
          }
        }
        return a;
      }
      function h(t, e, n) {
        if (n || 2 === arguments.length)
          for (var r, i = 0, o = e.length; i < o; i++)
            (!r && i in e) ||
              (r || (r = Array.prototype.slice.call(e, 0, i)), (r[i] = e[i]));
        return t.concat(r || Array.prototype.slice.call(e));
      }
      Object.create;
      var f = n(7294),
        d = (0, f.createContext)({ strict: !1 }),
        p = function (t) {
          return {
            isEnabled: function (e) {
              return t.some(function (t) {
                return !!e[t];
              });
            },
          };
        },
        m = {
          measureLayout: p(["layout", "layoutId", "drag"]),
          animation: p([
            "animate",
            "exit",
            "variants",
            "whileHover",
            "whileTap",
            "whileFocus",
            "whileDrag",
            "whileInView",
          ]),
          exit: p(["exit"]),
          drag: p(["drag", "dragControls"]),
          focus: p(["whileFocus"]),
          hover: p(["whileHover", "onHoverStart", "onHoverEnd"]),
          tap: p(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
          pan: p(["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"]),
          inView: p(["whileInView", "onViewportEnter", "onViewportLeave"]),
        };
      function y(t) {
        for (var e in t)
          null !== t[e] &&
            ("projectionNodeConstructor" === e
              ? (m.projectionNodeConstructor = t[e])
              : (m[e].Component = t[e]));
      }
      function g(t) {
        var e = t.children,
          n = t.features,
          r = t.strict,
          i = void 0 !== r && r,
          o = c((0, f.useState)(!v(n)), 2)[1],
          a = (0, f.useRef)(void 0);
        if (!v(n)) {
          var s = n.renderer,
            l = u(n, ["renderer"]);
          (a.current = s), y(l);
        }
        return (
          (0, f.useEffect)(function () {
            v(n) &&
              n().then(function (t) {
                var e = t.renderer;
                y(u(t, ["renderer"])), (a.current = e), o(!0);
              });
          }, []),
          f.createElement(
            d.Provider,
            { value: { renderer: a.current, strict: i } },
            e
          )
        );
      }
      function v(t) {
        return "function" === typeof t;
      }
      function b(t) {
        return "object" === typeof t && "function" === typeof t.start;
      }
      var w = (0, f.createContext)(null);
      function x(t) {
        var e = (0, f.useRef)(null);
        return null === e.current && (e.current = t()), e.current;
      }
      var E = 0,
        T = function () {
          return E++;
        },
        A = function () {
          return x(T);
        };
      function M() {
        var t = (0, f.useContext)(w);
        if (null === t) return [!0, null];
        var e = t.isPresent,
          n = t.onExitComplete,
          r = t.register,
          i = A();
        (0, f.useEffect)(function () {
          return r(i);
        }, []);
        return !e && n
          ? [
              !1,
              function () {
                return null === n || void 0 === n ? void 0 : n(i);
              },
            ]
          : [!0];
      }
      var _ = function (t) {
        return Array.isArray(t);
      };
      function k(t, e) {
        if (!Array.isArray(e)) return !1;
        var n = e.length;
        if (n !== t.length) return !1;
        for (var r = 0; r < n; r++) if (e[r] !== t[r]) return !1;
        return !0;
      }
      const S = (t, e, n) => Math.min(Math.max(n, t), e),
        P = 0.001;
      function O({
        duration: t = 800,
        bounce: e = 0.25,
        velocity: n = 0,
        mass: r = 1,
      }) {
        let i,
          o,
          a = 1 - e;
        (a = S(0.05, 1, a)),
          (t = S(0.01, 10, t / 1e3)),
          a < 1
            ? ((i = (e) => {
                const r = e * a,
                  i = r * t,
                  o = r - n,
                  s = R(e, a),
                  u = Math.exp(-i);
                return P - (o / s) * u;
              }),
              (o = (e) => {
                const r = e * a * t,
                  o = r * n + n,
                  s = Math.pow(a, 2) * Math.pow(e, 2) * t,
                  u = Math.exp(-r),
                  l = R(Math.pow(e, 2), a);
                return ((-i(e) + P > 0 ? -1 : 1) * ((o - s) * u)) / l;
              }))
            : ((i = (e) => Math.exp(-e * t) * ((e - n) * t + 1) - 0.001),
              (o = (e) => Math.exp(-e * t) * (t * t * (n - e))));
        const s = (function (t, e, n) {
          let r = n;
          for (let i = 1; i < 12; i++) r -= t(r) / e(r);
          return r;
        })(i, o, 5 / t);
        if (((t *= 1e3), isNaN(s)))
          return { stiffness: 100, damping: 10, duration: t };
        {
          const e = Math.pow(s, 2) * r;
          return {
            stiffness: e,
            damping: 2 * a * Math.sqrt(r * e),
            duration: t,
          };
        }
      }
      function R(t, e) {
        return t * Math.sqrt(1 - e * e);
      }
      const N = ["duration", "bounce"],
        I = ["stiffness", "damping", "mass"];
      function C(t, e) {
        return e.some((e) => void 0 !== t[e]);
      }
      function L(t) {
        var { from: e = 0, to: n = 1, restSpeed: r = 2, restDelta: i } = t,
          o = u(t, ["from", "to", "restSpeed", "restDelta"]);
        const a = { done: !1, value: e };
        let {
            stiffness: s,
            damping: l,
            mass: c,
            velocity: h,
            duration: f,
            isResolvedFromDuration: d,
          } = (function (t) {
            let e = Object.assign(
              {
                velocity: 0,
                stiffness: 100,
                damping: 10,
                mass: 1,
                isResolvedFromDuration: !1,
              },
              t
            );
            if (!C(t, I) && C(t, N)) {
              const n = O(t);
              (e = Object.assign(Object.assign(Object.assign({}, e), n), {
                velocity: 0,
                mass: 1,
              })),
                (e.isResolvedFromDuration = !0);
            }
            return e;
          })(o),
          p = B,
          m = B;
        function y() {
          const t = h ? -h / 1e3 : 0,
            r = n - e,
            o = l / (2 * Math.sqrt(s * c)),
            a = Math.sqrt(s / c) / 1e3;
          if (
            (void 0 === i && (i = Math.min(Math.abs(n - e) / 100, 0.4)), o < 1)
          ) {
            const e = R(a, o);
            (p = (i) => {
              const s = Math.exp(-o * a * i);
              return (
                n -
                s *
                  (((t + o * a * r) / e) * Math.sin(e * i) +
                    r * Math.cos(e * i))
              );
            }),
              (m = (n) => {
                const i = Math.exp(-o * a * n);
                return (
                  o *
                    a *
                    i *
                    ((Math.sin(e * n) * (t + o * a * r)) / e +
                      r * Math.cos(e * n)) -
                  i *
                    (Math.cos(e * n) * (t + o * a * r) -
                      e * r * Math.sin(e * n))
                );
              });
          } else if (1 === o)
            p = (e) => n - Math.exp(-a * e) * (r + (t + a * r) * e);
          else {
            const e = a * Math.sqrt(o * o - 1);
            p = (i) => {
              const s = Math.exp(-o * a * i),
                u = Math.min(e * i, 300);
              return (
                n -
                (s * ((t + o * a * r) * Math.sinh(u) + e * r * Math.cosh(u))) /
                  e
              );
            };
          }
        }
        return (
          y(),
          {
            next: (t) => {
              const e = p(t);
              if (d) a.done = t >= f;
              else {
                const o = 1e3 * m(t),
                  s = Math.abs(o) <= r,
                  u = Math.abs(n - e) <= i;
                a.done = s && u;
              }
              return (a.value = a.done ? n : e), a;
            },
            flipTarget: () => {
              (h = -h), ([e, n] = [n, e]), y();
            },
          }
        );
      }
      L.needsInterpolation = (t, e) =>
        "string" === typeof t || "string" === typeof e;
      const B = (t) => 0,
        F = (t, e, n) => {
          const r = e - t;
          return 0 === r ? 1 : (n - t) / r;
        },
        j = (t, e, n) => -n * t + n * e + t,
        D = (t, e) => (n) => Math.max(Math.min(n, e), t),
        U = (t) => (t % 1 ? Number(t.toFixed(5)) : t),
        V = /(-)?([\d]*\.?[\d])+/g,
        G =
          /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))/gi,
        z =
          /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2,3}\s*\/*\s*[\d\.]+%?\))$/i;
      function $(t) {
        return "string" === typeof t;
      }
      const H = {
          test: (t) => "number" === typeof t,
          parse: parseFloat,
          transform: (t) => t,
        },
        q = Object.assign(Object.assign({}, H), { transform: D(0, 1) }),
        W = Object.assign(Object.assign({}, H), { default: 1 }),
        X = (t, e) => (n) =>
          Boolean(
            ($(n) && z.test(n) && n.startsWith(t)) ||
              (e && Object.prototype.hasOwnProperty.call(n, e))
          ),
        Z = (t, e, n) => (r) => {
          if (!$(r)) return r;
          const [i, o, a, s] = r.match(V);
          return {
            [t]: parseFloat(i),
            [e]: parseFloat(o),
            [n]: parseFloat(a),
            alpha: void 0 !== s ? parseFloat(s) : 1,
          };
        },
        K = D(0, 255),
        J = Object.assign(Object.assign({}, H), {
          transform: (t) => Math.round(K(t)),
        }),
        Y = {
          test: X("rgb", "red"),
          parse: Z("red", "green", "blue"),
          transform: ({ red: t, green: e, blue: n, alpha: r = 1 }) =>
            "rgba(" +
            J.transform(t) +
            ", " +
            J.transform(e) +
            ", " +
            J.transform(n) +
            ", " +
            U(q.transform(r)) +
            ")",
        };
      const Q = {
          test: X("#"),
          parse: function (t) {
            let e = "",
              n = "",
              r = "",
              i = "";
            return (
              t.length > 5
                ? ((e = t.substr(1, 2)),
                  (n = t.substr(3, 2)),
                  (r = t.substr(5, 2)),
                  (i = t.substr(7, 2)))
                : ((e = t.substr(1, 1)),
                  (n = t.substr(2, 1)),
                  (r = t.substr(3, 1)),
                  (i = t.substr(4, 1)),
                  (e += e),
                  (n += n),
                  (r += r),
                  (i += i)),
              {
                red: parseInt(e, 16),
                green: parseInt(n, 16),
                blue: parseInt(r, 16),
                alpha: i ? parseInt(i, 16) / 255 : 1,
              }
            );
          },
          transform: Y.transform,
        },
        tt = (t) => ({
          test: (e) => $(e) && e.endsWith(t) && 1 === e.split(" ").length,
          parse: parseFloat,
          transform: (e) => `${e}${t}`,
        }),
        et = tt("deg"),
        nt = tt("%"),
        rt = tt("px"),
        it = tt("vh"),
        ot = tt("vw"),
        at = Object.assign(Object.assign({}, nt), {
          parse: (t) => nt.parse(t) / 100,
          transform: (t) => nt.transform(100 * t),
        }),
        st = {
          test: X("hsl", "hue"),
          parse: Z("hue", "saturation", "lightness"),
          transform: ({ hue: t, saturation: e, lightness: n, alpha: r = 1 }) =>
            "hsla(" +
            Math.round(t) +
            ", " +
            nt.transform(U(e)) +
            ", " +
            nt.transform(U(n)) +
            ", " +
            U(q.transform(r)) +
            ")",
        };
      function ut(t, e, n) {
        return (
          n < 0 && (n += 1),
          n > 1 && (n -= 1),
          n < 1 / 6
            ? t + 6 * (e - t) * n
            : n < 0.5
            ? e
            : n < 2 / 3
            ? t + (e - t) * (2 / 3 - n) * 6
            : t
        );
      }
      function lt({ hue: t, saturation: e, lightness: n, alpha: r }) {
        (t /= 360), (n /= 100);
        let i = 0,
          o = 0,
          a = 0;
        if ((e /= 100)) {
          const r = n < 0.5 ? n * (1 + e) : n + e - n * e,
            s = 2 * n - r;
          (i = ut(s, r, t + 1 / 3)),
            (o = ut(s, r, t)),
            (a = ut(s, r, t - 1 / 3));
        } else i = o = a = n;
        return {
          red: Math.round(255 * i),
          green: Math.round(255 * o),
          blue: Math.round(255 * a),
          alpha: r,
        };
      }
      const ct = (t, e, n) => {
          const r = t * t,
            i = e * e;
          return Math.sqrt(Math.max(0, n * (i - r) + r));
        },
        ht = [Q, Y, st],
        ft = (t) => ht.find((e) => e.test(t)),
        dt = (t) =>
          `'${t}' is not an animatable color. Use the equivalent color code instead.`,
        pt = (t, e) => {
          let n = ft(t),
            r = ft(e);
          dt(t), dt(e);
          let i = n.parse(t),
            o = r.parse(e);
          n === st && ((i = lt(i)), (n = Y)),
            r === st && ((o = lt(o)), (r = Y));
          const a = Object.assign({}, i);
          return (t) => {
            for (const e in a) "alpha" !== e && (a[e] = ct(i[e], o[e], t));
            return (a.alpha = j(i.alpha, o.alpha, t)), n.transform(a);
          };
        },
        mt = {
          test: (t) => Y.test(t) || Q.test(t) || st.test(t),
          parse: (t) =>
            Y.test(t) ? Y.parse(t) : st.test(t) ? st.parse(t) : Q.parse(t),
          transform: (t) =>
            $(t)
              ? t
              : t.hasOwnProperty("red")
              ? Y.transform(t)
              : st.transform(t),
        },
        yt = "${c}",
        gt = "${n}";
      function vt(t) {
        "number" === typeof t && (t = `${t}`);
        const e = [];
        let n = 0;
        const r = t.match(G);
        r &&
          ((n = r.length), (t = t.replace(G, yt)), e.push(...r.map(mt.parse)));
        const i = t.match(V);
        return (
          i && ((t = t.replace(V, gt)), e.push(...i.map(H.parse))),
          { values: e, numColors: n, tokenised: t }
        );
      }
      function bt(t) {
        return vt(t).values;
      }
      function wt(t) {
        const { values: e, numColors: n, tokenised: r } = vt(t),
          i = e.length;
        return (t) => {
          let e = r;
          for (let r = 0; r < i; r++)
            e = e.replace(
              r < n ? yt : gt,
              r < n ? mt.transform(t[r]) : U(t[r])
            );
          return e;
        };
      }
      const xt = (t) => ("number" === typeof t ? 0 : t);
      const Et = {
          test: function (t) {
            var e, n, r, i;
            return (
              isNaN(t) &&
              $(t) &&
              (null !==
                (n =
                  null === (e = t.match(V)) || void 0 === e
                    ? void 0
                    : e.length) && void 0 !== n
                ? n
                : 0) +
                (null !==
                  (i =
                    null === (r = t.match(G)) || void 0 === r
                      ? void 0
                      : r.length) && void 0 !== i
                  ? i
                  : 0) >
                0
            );
          },
          parse: bt,
          createTransformer: wt,
          getAnimatableNone: function (t) {
            const e = bt(t);
            return wt(t)(e.map(xt));
          },
        },
        Tt = (t) => "number" === typeof t,
        At = (t, e) => (n) => e(t(n)),
        Mt = (...t) => t.reduce(At);
      function _t(t, e) {
        return Tt(t) ? (n) => j(t, e, n) : mt.test(t) ? pt(t, e) : Ot(t, e);
      }
      const kt = (t, e) => {
          const n = [...t],
            r = n.length,
            i = t.map((t, n) => _t(t, e[n]));
          return (t) => {
            for (let e = 0; e < r; e++) n[e] = i[e](t);
            return n;
          };
        },
        St = (t, e) => {
          const n = Object.assign(Object.assign({}, t), e),
            r = {};
          for (const i in n)
            void 0 !== t[i] && void 0 !== e[i] && (r[i] = _t(t[i], e[i]));
          return (t) => {
            for (const e in r) n[e] = r[e](t);
            return n;
          };
        };
      function Pt(t) {
        const e = Et.parse(t),
          n = e.length;
        let r = 0,
          i = 0,
          o = 0;
        for (let a = 0; a < n; a++)
          r || "number" === typeof e[a] ? r++ : void 0 !== e[a].hue ? o++ : i++;
        return { parsed: e, numNumbers: r, numRGB: i, numHSL: o };
      }
      const Ot = (t, e) => {
          const n = Et.createTransformer(e),
            r = Pt(t),
            i = Pt(e);
          return r.numHSL === i.numHSL &&
            r.numRGB === i.numRGB &&
            r.numNumbers >= i.numNumbers
            ? Mt(kt(r.parsed, i.parsed), n)
            : (n) => `${n > 0 ? e : t}`;
        },
        Rt = (t, e) => (n) => j(t, e, n);
      function Nt(t, e, n) {
        const r = [],
          i =
            n ||
            ("number" === typeof (o = t[0])
              ? Rt
              : "string" === typeof o
              ? mt.test(o)
                ? pt
                : Ot
              : Array.isArray(o)
              ? kt
              : "object" === typeof o
              ? St
              : void 0);
        var o;
        const a = t.length - 1;
        for (let s = 0; s < a; s++) {
          let n = i(t[s], t[s + 1]);
          if (e) {
            const t = Array.isArray(e) ? e[s] : e;
            n = Mt(t, n);
          }
          r.push(n);
        }
        return r;
      }
      function It(t, e, { clamp: n = !0, ease: r, mixer: i } = {}) {
        const o = t.length;
        e.length,
          !r || !Array.isArray(r) || r.length,
          t[0] > t[o - 1] &&
            ((t = [].concat(t)), (e = [].concat(e)), t.reverse(), e.reverse());
        const a = Nt(e, r, i),
          s =
            2 === o
              ? (function ([t, e], [n]) {
                  return (r) => n(F(t, e, r));
                })(t, a)
              : (function (t, e) {
                  const n = t.length,
                    r = n - 1;
                  return (i) => {
                    let o = 0,
                      a = !1;
                    if (
                      (i <= t[0]
                        ? (a = !0)
                        : i >= t[r] && ((o = r - 1), (a = !0)),
                      !a)
                    ) {
                      let e = 1;
                      for (; e < n && !(t[e] > i || e === r); e++);
                      o = e - 1;
                    }
                    const s = F(t[o], t[o + 1], i);
                    return e[o](s);
                  };
                })(t, a);
        return n ? (e) => s(S(t[0], t[o - 1], e)) : s;
      }
      const Ct = (t) => (e) => 1 - t(1 - e),
        Lt = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
        Bt = (t) => (e) => e * e * ((t + 1) * e - t),
        Ft = (t) => t,
        jt = ((Dt = 2), (t) => Math.pow(t, Dt));
      var Dt;
      const Ut = Ct(jt),
        Vt = Lt(jt),
        Gt = (t) => 1 - Math.sin(Math.acos(t)),
        zt = Ct(Gt),
        $t = Lt(zt),
        Ht = Bt(1.525),
        qt = Ct(Ht),
        Wt = Lt(Ht),
        Xt = ((t) => {
          const e = Bt(t);
          return (t) =>
            (t *= 2) < 1 ? 0.5 * e(t) : 0.5 * (2 - Math.pow(2, -10 * (t - 1)));
        })(1.525),
        Zt = (t) => {
          if (1 === t || 0 === t) return t;
          const e = t * t;
          return t < 0.36363636363636365
            ? 7.5625 * e
            : t < 0.7272727272727273
            ? 9.075 * e - 9.9 * t + 3.4
            : t < 0.9
            ? 12.066481994459833 * e - 19.63545706371191 * t + 8.898060941828255
            : 10.8 * t * t - 20.52 * t + 10.72;
        },
        Kt = Ct(Zt);
      function Jt(t, e) {
        return t.map(() => e || Vt).splice(0, t.length - 1);
      }
      function Yt({
        from: t = 0,
        to: e = 1,
        ease: n,
        offset: r,
        duration: i = 300,
      }) {
        const o = { done: !1, value: t },
          a = Array.isArray(e) ? e : [t, e],
          s = (function (t, e) {
            return t.map((t) => t * e);
          })(
            r && r.length === a.length
              ? r
              : (function (t) {
                  const e = t.length;
                  return t.map((t, n) => (0 !== n ? n / (e - 1) : 0));
                })(a),
            i
          );
        function u() {
          return It(s, a, { ease: Array.isArray(n) ? n : Jt(a, n) });
        }
        let l = u();
        return {
          next: (t) => ((o.value = l(t)), (o.done = t >= i), o),
          flipTarget: () => {
            a.reverse(), (l = u());
          },
        };
      }
      const Qt = {
        keyframes: Yt,
        spring: L,
        decay: function ({
          velocity: t = 0,
          from: e = 0,
          power: n = 0.8,
          timeConstant: r = 350,
          restDelta: i = 0.5,
          modifyTarget: o,
        }) {
          const a = { done: !1, value: e };
          let s = n * t;
          const u = e + s,
            l = void 0 === o ? u : o(u);
          return (
            l !== u && (s = l - e),
            {
              next: (t) => {
                const e = -s * Math.exp(-t / r);
                return (
                  (a.done = !(e > i || e < -i)),
                  (a.value = a.done ? l : l + e),
                  a
                );
              },
              flipTarget: () => {},
            }
          );
        },
      };
      const te = (1 / 60) * 1e3,
        ee =
          "undefined" !== typeof performance
            ? () => performance.now()
            : () => Date.now(),
        ne =
          "undefined" !== typeof window
            ? (t) => window.requestAnimationFrame(t)
            : (t) => setTimeout(() => t(ee()), te);
      let re = !0,
        ie = !1,
        oe = !1;
      const ae = { delta: 0, timestamp: 0 },
        se = ["read", "update", "preRender", "render", "postRender"],
        ue = se.reduce(
          (t, e) => (
            (t[e] = (function (t) {
              let e = [],
                n = [],
                r = 0,
                i = !1,
                o = !1;
              const a = new WeakSet(),
                s = {
                  schedule: (t, o = !1, s = !1) => {
                    const u = s && i,
                      l = u ? e : n;
                    return (
                      o && a.add(t),
                      -1 === l.indexOf(t) &&
                        (l.push(t), u && i && (r = e.length)),
                      t
                    );
                  },
                  cancel: (t) => {
                    const e = n.indexOf(t);
                    -1 !== e && n.splice(e, 1), a.delete(t);
                  },
                  process: (u) => {
                    if (i) o = !0;
                    else {
                      if (
                        ((i = !0),
                        ([e, n] = [n, e]),
                        (n.length = 0),
                        (r = e.length),
                        r)
                      )
                        for (let n = 0; n < r; n++) {
                          const r = e[n];
                          r(u), a.has(r) && (s.schedule(r), t());
                        }
                      (i = !1), o && ((o = !1), s.process(u));
                    }
                  },
                };
              return s;
            })(() => (ie = !0))),
            t
          ),
          {}
        ),
        le = se.reduce((t, e) => {
          const n = ue[e];
          return (
            (t[e] = (t, e = !1, r = !1) => (ie || pe(), n.schedule(t, e, r))), t
          );
        }, {}),
        ce = se.reduce((t, e) => ((t[e] = ue[e].cancel), t), {}),
        he = se.reduce((t, e) => ((t[e] = () => ue[e].process(ae)), t), {}),
        fe = (t) => ue[t].process(ae),
        de = (t) => {
          (ie = !1),
            (ae.delta = re ? te : Math.max(Math.min(t - ae.timestamp, 40), 1)),
            (ae.timestamp = t),
            (oe = !0),
            se.forEach(fe),
            (oe = !1),
            ie && ((re = !1), ne(de));
        },
        pe = () => {
          (ie = !0), (re = !0), oe || ne(de);
        },
        me = () => ae;
      var ye = le;
      function ge(t, e, n = 0) {
        return t - e - n;
      }
      const ve = (t) => {
        const e = ({ delta: e }) => t(e);
        return { start: () => ye.update(e, !0), stop: () => ce.update(e) };
      };
      function be(t) {
        var e,
          n,
          {
            from: r,
            autoplay: i = !0,
            driver: o = ve,
            elapsed: a = 0,
            repeat: s = 0,
            repeatType: l = "loop",
            repeatDelay: c = 0,
            onPlay: h,
            onStop: f,
            onComplete: d,
            onRepeat: p,
            onUpdate: m,
          } = t,
          y = u(t, [
            "from",
            "autoplay",
            "driver",
            "elapsed",
            "repeat",
            "repeatType",
            "repeatDelay",
            "onPlay",
            "onStop",
            "onComplete",
            "onRepeat",
            "onUpdate",
          ]);
        let g,
          v,
          b,
          { to: w } = y,
          x = 0,
          E = y.duration,
          T = !1,
          A = !0;
        const M = (function (t) {
          if (Array.isArray(t.to)) return Yt;
          if (Qt[t.type]) return Qt[t.type];
          const e = new Set(Object.keys(t));
          return e.has("ease") || (e.has("duration") && !e.has("dampingRatio"))
            ? Yt
            : e.has("dampingRatio") ||
              e.has("stiffness") ||
              e.has("mass") ||
              e.has("damping") ||
              e.has("restSpeed") ||
              e.has("restDelta")
            ? L
            : Yt;
        })(y);
        (null === (n = (e = M).needsInterpolation) || void 0 === n
          ? void 0
          : n.call(e, r, w)) &&
          ((b = It([0, 100], [r, w], { clamp: !1 })), (r = 0), (w = 100));
        const _ = M(Object.assign(Object.assign({}, y), { from: r, to: w }));
        function k() {
          x++,
            "reverse" === l
              ? ((A = x % 2 === 0),
                (a = (function (t, e, n = 0, r = !0) {
                  return r ? ge(e + -t, e, n) : e - (t - e) + n;
                })(a, E, c, A)))
              : ((a = ge(a, E, c)), "mirror" === l && _.flipTarget()),
            (T = !1),
            p && p();
        }
        function S(t) {
          if ((A || (t = -t), (a += t), !T)) {
            const t = _.next(Math.max(0, a));
            (v = t.value), b && (v = b(v)), (T = A ? t.done : a <= 0);
          }
          null === m || void 0 === m || m(v),
            T &&
              (0 === x && ((null !== E && void 0 !== E) || (E = a)),
              x < s
                ? (function (t, e, n, r) {
                    return r ? t >= e + n : t <= -n;
                  })(a, E, c, A) && k()
                : (g.stop(), d && d()));
        }
        return (
          i && (null === h || void 0 === h || h(), (g = o(S)), g.start()),
          {
            stop: () => {
              null === f || void 0 === f || f(), g.stop();
            },
          }
        );
      }
      function we(t, e) {
        return e ? t * (1e3 / e) : 0;
      }
      var xe = function (t) {
        return 1e3 * t;
      };
      const Ee = (t, e) => 1 - 3 * e + 3 * t,
        Te = (t, e) => 3 * e - 6 * t,
        Ae = (t) => 3 * t,
        Me = (t, e, n) => ((Ee(e, n) * t + Te(e, n)) * t + Ae(e)) * t,
        _e = (t, e, n) => 3 * Ee(e, n) * t * t + 2 * Te(e, n) * t + Ae(e);
      const ke = 0.1;
      function Se(t, e, n, r) {
        if (t === e && n === r) return Ft;
        const i = new Float32Array(11);
        for (let a = 0; a < 11; ++a) i[a] = Me(a * ke, t, n);
        function o(e) {
          let r = 0,
            o = 1;
          for (; 10 !== o && i[o] <= e; ++o) r += ke;
          --o;
          const a = r + ((e - i[o]) / (i[o + 1] - i[o])) * ke,
            s = _e(a, t, n);
          return s >= 0.001
            ? (function (t, e, n, r) {
                for (let i = 0; i < 8; ++i) {
                  const i = _e(e, n, r);
                  if (0 === i) return e;
                  e -= (Me(e, n, r) - t) / i;
                }
                return e;
              })(e, a, t, n)
            : 0 === s
            ? a
            : (function (t, e, n, r, i) {
                let o,
                  a,
                  s = 0;
                do {
                  (a = e + (n - e) / 2),
                    (o = Me(a, r, i) - t),
                    o > 0 ? (n = a) : (e = a);
                } while (Math.abs(o) > 1e-7 && ++s < 10);
                return a;
              })(e, r, r + ke, t, n);
        }
        return (t) => (0 === t || 1 === t ? t : Me(o(t), e, r));
      }
      var Pe = {
          linear: Ft,
          easeIn: jt,
          easeInOut: Vt,
          easeOut: Ut,
          circIn: Gt,
          circInOut: $t,
          circOut: zt,
          backIn: Ht,
          backInOut: Wt,
          backOut: qt,
          anticipate: Xt,
          bounceIn: Kt,
          bounceInOut: (t) =>
            t < 0.5 ? 0.5 * (1 - Zt(1 - 2 * t)) : 0.5 * Zt(2 * t - 1) + 0.5,
          bounceOut: Zt,
        },
        Oe = function (t) {
          if (Array.isArray(t)) {
            t.length;
            var e = c(t, 4);
            return Se(e[0], e[1], e[2], e[3]);
          }
          return "string" === typeof t
            ? ("Invalid easing type '".concat(t, "'"), Pe[t])
            : t;
        },
        Re = function (t, e) {
          return (
            "zIndex" !== t &&
            (!("number" !== typeof e && !Array.isArray(e)) ||
              !("string" !== typeof e || !Et.test(e) || e.startsWith("url(")))
          );
        },
        Ne = function () {
          return { type: "spring", stiffness: 500, damping: 25, restSpeed: 10 };
        },
        Ie = function (t) {
          return {
            type: "spring",
            stiffness: 550,
            damping: 0 === t ? 2 * Math.sqrt(550) : 30,
            restSpeed: 10,
          };
        },
        Ce = function () {
          return { type: "keyframes", ease: "linear", duration: 0.3 };
        },
        Le = function (t) {
          return { type: "keyframes", duration: 0.8, values: t };
        },
        Be = {
          x: Ne,
          y: Ne,
          z: Ne,
          rotate: Ne,
          rotateX: Ne,
          rotateY: Ne,
          rotateZ: Ne,
          scaleX: Ie,
          scaleY: Ie,
          scale: Ie,
          opacity: Ce,
          backgroundColor: Ce,
          color: Ce,
          default: Ie,
        };
      const Fe = new Set(["brightness", "contrast", "saturate", "opacity"]);
      function je(t) {
        let [e, n] = t.slice(0, -1).split("(");
        if ("drop-shadow" === e) return t;
        const [r] = n.match(V) || [];
        if (!r) return t;
        const i = n.replace(r, "");
        let o = Fe.has(e) ? 1 : 0;
        return r !== n && (o *= 100), e + "(" + o + i + ")";
      }
      const De = /([a-z-]*)\(.*?\)/g,
        Ue = Object.assign(Object.assign({}, Et), {
          getAnimatableNone: (t) => {
            const e = t.match(De);
            return e ? e.map(je).join(" ") : t;
          },
        });
      var Ve = s(s({}, H), { transform: Math.round }),
        Ge = {
          borderWidth: rt,
          borderTopWidth: rt,
          borderRightWidth: rt,
          borderBottomWidth: rt,
          borderLeftWidth: rt,
          borderRadius: rt,
          radius: rt,
          borderTopLeftRadius: rt,
          borderTopRightRadius: rt,
          borderBottomRightRadius: rt,
          borderBottomLeftRadius: rt,
          width: rt,
          maxWidth: rt,
          height: rt,
          maxHeight: rt,
          size: rt,
          top: rt,
          right: rt,
          bottom: rt,
          left: rt,
          padding: rt,
          paddingTop: rt,
          paddingRight: rt,
          paddingBottom: rt,
          paddingLeft: rt,
          margin: rt,
          marginTop: rt,
          marginRight: rt,
          marginBottom: rt,
          marginLeft: rt,
          rotate: et,
          rotateX: et,
          rotateY: et,
          rotateZ: et,
          scale: W,
          scaleX: W,
          scaleY: W,
          scaleZ: W,
          skew: et,
          skewX: et,
          skewY: et,
          distance: rt,
          translateX: rt,
          translateY: rt,
          translateZ: rt,
          x: rt,
          y: rt,
          z: rt,
          perspective: rt,
          transformPerspective: rt,
          opacity: q,
          originX: at,
          originY: at,
          originZ: rt,
          zIndex: Ve,
          fillOpacity: q,
          strokeOpacity: q,
          numOctaves: Ve,
        },
        ze = s(s({}, Ge), {
          color: mt,
          backgroundColor: mt,
          outlineColor: mt,
          fill: mt,
          stroke: mt,
          borderColor: mt,
          borderTopColor: mt,
          borderRightColor: mt,
          borderBottomColor: mt,
          borderLeftColor: mt,
          filter: Ue,
          WebkitFilter: Ue,
        }),
        $e = function (t) {
          return ze[t];
        };
      function He(t, e) {
        var n,
          r = $e(t);
        return (
          r !== Ue && (r = Et),
          null === (n = r.getAnimatableNone) || void 0 === n
            ? void 0
            : n.call(r, e)
        );
      }
      var qe = !1,
        We = function (t) {
          return _(t) ? t[t.length - 1] || 0 : t;
        };
      function Xe(t) {
        var e = t.ease,
          n = t.times,
          r = t.yoyo,
          i = t.flip,
          o = t.loop,
          a = u(t, ["ease", "times", "yoyo", "flip", "loop"]),
          l = s({}, a);
        return (
          n && (l.offset = n),
          a.duration && (l.duration = xe(a.duration)),
          a.repeatDelay && (l.repeatDelay = xe(a.repeatDelay)),
          e &&
            (l.ease = (function (t) {
              return Array.isArray(t) && "number" !== typeof t[0];
            })(e)
              ? e.map(Oe)
              : Oe(e)),
          "tween" === a.type && (l.type = "keyframes"),
          (r || o || i) &&
            (!0,
            r
              ? (l.repeatType = "reverse")
              : o
              ? (l.repeatType = "loop")
              : i && (l.repeatType = "mirror"),
            (l.repeat = o || r || i || a.repeat)),
          "spring" !== a.type && (l.type = "keyframes"),
          l
        );
      }
      function Ze(t, e, n) {
        var r;
        return (
          Array.isArray(e.to) &&
            ((null !== (r = t.duration) && void 0 !== r) || (t.duration = 0.8)),
          (function (t) {
            Array.isArray(t.to) &&
              null === t.to[0] &&
              ((t.to = h([], c(t.to), !1)), (t.to[0] = t.from));
          })(e),
          (function (t) {
            t.when,
              t.delay,
              t.delayChildren,
              t.staggerChildren,
              t.staggerDirection,
              t.repeat,
              t.repeatType,
              t.repeatDelay,
              t.from;
            var e = u(t, [
              "when",
              "delay",
              "delayChildren",
              "staggerChildren",
              "staggerDirection",
              "repeat",
              "repeatType",
              "repeatDelay",
              "from",
            ]);
            return !!Object.keys(e).length;
          })(t) ||
            (t = s(
              s({}, t),
              (function (t, e) {
                var n;
                return (
                  (n = _(e) ? Le : Be[t] || Be.default), s({ to: e }, n(e))
                );
              })(n, e.to)
            )),
          s(s({}, e), Xe(t))
        );
      }
      function Ke(t, e, n, r, i) {
        var o,
          a = Qe(r, t),
          u = null !== (o = a.from) && void 0 !== o ? o : e.get(),
          l = Re(t, n);
        "none" === u && l && "string" === typeof n
          ? (u = He(t, n))
          : Je(u) && "string" === typeof n
          ? (u = Ye(n))
          : !Array.isArray(n) && Je(n) && "string" === typeof u && (n = Ye(u));
        var c = Re(t, u);
        return (
          "You are trying to animate "
            .concat(t, ' from "')
            .concat(u, '" to "')
            .concat(n, '". ')
            .concat(
              u,
              " is not an animatable value - to enable this animation set "
            )
            .concat(u, " to a value animatable to ")
            .concat(n, " via the `style` property."),
          c && l && !1 !== a.type
            ? function () {
                var r = {
                  from: u,
                  to: n,
                  velocity: e.getVelocity(),
                  onComplete: i,
                  onUpdate: function (t) {
                    return e.set(t);
                  },
                };
                return "inertia" === a.type || "decay" === a.type
                  ? (function ({
                      from: t = 0,
                      velocity: e = 0,
                      min: n,
                      max: r,
                      power: i = 0.8,
                      timeConstant: o = 750,
                      bounceStiffness: a = 500,
                      bounceDamping: s = 10,
                      restDelta: u = 1,
                      modifyTarget: l,
                      driver: c,
                      onUpdate: h,
                      onComplete: f,
                      onStop: d,
                    }) {
                      let p;
                      function m(t) {
                        return (
                          (void 0 !== n && t < n) || (void 0 !== r && t > r)
                        );
                      }
                      function y(t) {
                        return void 0 === n
                          ? r
                          : void 0 === r || Math.abs(n - t) < Math.abs(r - t)
                          ? n
                          : r;
                      }
                      function g(t) {
                        null === p || void 0 === p || p.stop(),
                          (p = be(
                            Object.assign(Object.assign({}, t), {
                              driver: c,
                              onUpdate: (e) => {
                                var n;
                                null === h || void 0 === h || h(e),
                                  null === (n = t.onUpdate) ||
                                    void 0 === n ||
                                    n.call(t, e);
                              },
                              onComplete: f,
                              onStop: d,
                            })
                          ));
                      }
                      function v(t) {
                        g(
                          Object.assign(
                            {
                              type: "spring",
                              stiffness: a,
                              damping: s,
                              restDelta: u,
                            },
                            t
                          )
                        );
                      }
                      if (m(t)) v({ from: t, velocity: e, to: y(t) });
                      else {
                        let r = i * e + t;
                        "undefined" !== typeof l && (r = l(r));
                        const a = y(r),
                          s = a === n ? -1 : 1;
                        let c, h;
                        const f = (t) => {
                          (c = h),
                            (h = t),
                            (e = we(t - c, me().delta)),
                            ((1 === s && t > a) || (-1 === s && t < a)) &&
                              v({ from: t, to: a, velocity: e });
                        };
                        g({
                          type: "decay",
                          from: t,
                          velocity: e,
                          timeConstant: o,
                          power: i,
                          restDelta: u,
                          modifyTarget: l,
                          onUpdate: m(r) ? f : void 0,
                        });
                      }
                      return {
                        stop: () =>
                          null === p || void 0 === p ? void 0 : p.stop(),
                      };
                    })(s(s({}, r), a))
                  : be(
                      s(s({}, Ze(a, r, t)), {
                        onUpdate: function (t) {
                          var e;
                          r.onUpdate(t),
                            null === (e = a.onUpdate) ||
                              void 0 === e ||
                              e.call(a, t);
                        },
                        onComplete: function () {
                          var t;
                          r.onComplete(),
                            null === (t = a.onComplete) ||
                              void 0 === t ||
                              t.call(a);
                        },
                      })
                    );
              }
            : function () {
                var t,
                  r,
                  o = We(n);
                return (
                  e.set(o),
                  i(),
                  null ===
                    (t = null === a || void 0 === a ? void 0 : a.onUpdate) ||
                    void 0 === t ||
                    t.call(a, o),
                  null ===
                    (r = null === a || void 0 === a ? void 0 : a.onComplete) ||
                    void 0 === r ||
                    r.call(a),
                  { stop: function () {} }
                );
              }
        );
      }
      function Je(t) {
        return (
          0 === t ||
          ("string" === typeof t &&
            0 === parseFloat(t) &&
            -1 === t.indexOf(" "))
        );
      }
      function Ye(t) {
        return "number" === typeof t ? 0 : He("", t);
      }
      function Qe(t, e) {
        return t[e] || t.default || t;
      }
      function tn(t, e, n, r) {
        return (
          void 0 === r && (r = {}),
          qe && (r = { type: !1 }),
          e.start(function (i) {
            var o,
              a,
              s = Ke(t, e, n, r, i),
              u = (function (t, e) {
                var n, r;
                return null !==
                  (r =
                    null !== (n = (Qe(t, e) || {}).delay) && void 0 !== n
                      ? n
                      : t.delay) && void 0 !== r
                  ? r
                  : 0;
              })(r, t),
              l = function () {
                return (a = s());
              };
            return (
              u ? (o = window.setTimeout(l, xe(u))) : l(),
              function () {
                clearTimeout(o), null === a || void 0 === a || a.stop();
              }
            );
          })
        );
      }
      var en = function (t) {
        return /^0[^.\s]+$/.test(t);
      };
      function nn(t, e) {
        -1 === t.indexOf(e) && t.push(e);
      }
      function rn(t, e) {
        var n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      var on = (function () {
          function t() {
            this.subscriptions = [];
          }
          return (
            (t.prototype.add = function (t) {
              var e = this;
              return (
                nn(this.subscriptions, t),
                function () {
                  return rn(e.subscriptions, t);
                }
              );
            }),
            (t.prototype.notify = function (t, e, n) {
              var r = this.subscriptions.length;
              if (r)
                if (1 === r) this.subscriptions[0](t, e, n);
                else
                  for (var i = 0; i < r; i++) {
                    var o = this.subscriptions[i];
                    o && o(t, e, n);
                  }
            }),
            (t.prototype.getSize = function () {
              return this.subscriptions.length;
            }),
            (t.prototype.clear = function () {
              this.subscriptions.length = 0;
            }),
            t
          );
        })(),
        an = (function () {
          function t(t) {
            var e,
              n = this;
            (this.timeDelta = 0),
              (this.lastUpdated = 0),
              (this.updateSubscribers = new on()),
              (this.velocityUpdateSubscribers = new on()),
              (this.renderSubscribers = new on()),
              (this.canTrackVelocity = !1),
              (this.updateAndNotify = function (t, e) {
                void 0 === e && (e = !0), (n.prev = n.current), (n.current = t);
                var r = me(),
                  i = r.delta,
                  o = r.timestamp;
                n.lastUpdated !== o &&
                  ((n.timeDelta = i),
                  (n.lastUpdated = o),
                  ye.postRender(n.scheduleVelocityCheck)),
                  n.prev !== n.current && n.updateSubscribers.notify(n.current),
                  n.velocityUpdateSubscribers.getSize() &&
                    n.velocityUpdateSubscribers.notify(n.getVelocity()),
                  e && n.renderSubscribers.notify(n.current);
              }),
              (this.scheduleVelocityCheck = function () {
                return ye.postRender(n.velocityCheck);
              }),
              (this.velocityCheck = function (t) {
                t.timestamp !== n.lastUpdated &&
                  ((n.prev = n.current),
                  n.velocityUpdateSubscribers.notify(n.getVelocity()));
              }),
              (this.hasAnimated = !1),
              (this.prev = this.current = t),
              (this.canTrackVelocity =
                ((e = this.current), !isNaN(parseFloat(e))));
          }
          return (
            (t.prototype.onChange = function (t) {
              return this.updateSubscribers.add(t);
            }),
            (t.prototype.clearListeners = function () {
              this.updateSubscribers.clear();
            }),
            (t.prototype.onRenderRequest = function (t) {
              return t(this.get()), this.renderSubscribers.add(t);
            }),
            (t.prototype.attach = function (t) {
              this.passiveEffect = t;
            }),
            (t.prototype.set = function (t, e) {
              void 0 === e && (e = !0),
                e && this.passiveEffect
                  ? this.passiveEffect(t, this.updateAndNotify)
                  : this.updateAndNotify(t, e);
            }),
            (t.prototype.get = function () {
              return this.current;
            }),
            (t.prototype.getPrevious = function () {
              return this.prev;
            }),
            (t.prototype.getVelocity = function () {
              return this.canTrackVelocity
                ? we(
                    parseFloat(this.current) - parseFloat(this.prev),
                    this.timeDelta
                  )
                : 0;
            }),
            (t.prototype.start = function (t) {
              var e = this;
              return (
                this.stop(),
                new Promise(function (n) {
                  (e.hasAnimated = !0), (e.stopAnimation = t(n));
                }).then(function () {
                  return e.clearAnimation();
                })
              );
            }),
            (t.prototype.stop = function () {
              this.stopAnimation && this.stopAnimation(), this.clearAnimation();
            }),
            (t.prototype.isAnimating = function () {
              return !!this.stopAnimation;
            }),
            (t.prototype.clearAnimation = function () {
              this.stopAnimation = null;
            }),
            (t.prototype.destroy = function () {
              this.updateSubscribers.clear(),
                this.renderSubscribers.clear(),
                this.stop();
            }),
            t
          );
        })();
      function sn(t) {
        return new an(t);
      }
      var un = function (t) {
          return function (e) {
            return e.test(t);
          };
        },
        ln = [
          H,
          rt,
          nt,
          et,
          ot,
          it,
          {
            test: function (t) {
              return "auto" === t;
            },
            parse: function (t) {
              return t;
            },
          },
        ],
        cn = function (t) {
          return ln.find(un(t));
        },
        hn = h(h([], c(ln), !1), [mt, Et], !1),
        fn = function (t) {
          return hn.find(un(t));
        };
      function dn(t) {
        return Array.isArray(t);
      }
      function pn(t) {
        return "string" === typeof t || dn(t);
      }
      function mn(t, e, n, r, i) {
        var o;
        return (
          void 0 === r && (r = {}),
          void 0 === i && (i = {}),
          "function" === typeof e &&
            (e = e(null !== n && void 0 !== n ? n : t.custom, r, i)),
          "string" === typeof e &&
            (e = null === (o = t.variants) || void 0 === o ? void 0 : o[e]),
          "function" === typeof e &&
            (e = e(null !== n && void 0 !== n ? n : t.custom, r, i)),
          e
        );
      }
      function yn(t, e, n) {
        var r = t.getProps();
        return mn(
          r,
          e,
          null !== n && void 0 !== n ? n : r.custom,
          (function (t) {
            var e = {};
            return (
              t.forEachValue(function (t, n) {
                return (e[n] = t.get());
              }),
              e
            );
          })(t),
          (function (t) {
            var e = {};
            return (
              t.forEachValue(function (t, n) {
                return (e[n] = t.getVelocity());
              }),
              e
            );
          })(t)
        );
      }
      function gn(t) {
        var e;
        return (
          "function" ===
            typeof (null === (e = t.animate) || void 0 === e
              ? void 0
              : e.start) ||
          pn(t.initial) ||
          pn(t.animate) ||
          pn(t.whileHover) ||
          pn(t.whileDrag) ||
          pn(t.whileTap) ||
          pn(t.whileFocus) ||
          pn(t.exit)
        );
      }
      function vn(t) {
        return Boolean(gn(t) || t.variants);
      }
      function bn(t, e, n) {
        t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, sn(n));
      }
      function wn(t, e) {
        var n = yn(t, e),
          r = n ? t.makeTargetAnimatable(n, !1) : {},
          i = r.transitionEnd,
          o = void 0 === i ? {} : i;
        r.transition;
        var a = u(r, ["transitionEnd", "transition"]);
        for (var l in (a = s(s({}, a), o))) {
          bn(t, l, We(a[l]));
        }
      }
      function xn(t, e) {
        if (e) return (e[t] || e.default || e).from;
      }
      var En = ["", "X", "Y", "Z"],
        Tn = ["transformPerspective", "x", "y", "z"];
      function An(t, e) {
        return Tn.indexOf(t) - Tn.indexOf(e);
      }
      ["translate", "scale", "rotate", "skew"].forEach(function (t) {
        return En.forEach(function (e) {
          return Tn.push(t + e);
        });
      });
      var Mn = new Set(Tn);
      function _n(t) {
        return Mn.has(t);
      }
      var kn,
        Sn = new Set(["originX", "originY", "originZ"]);
      function Pn(t) {
        return Sn.has(t);
      }
      function On(t, e, n) {
        var r;
        void 0 === n && (n = {});
        var i = yn(t, e, n.custom),
          o = (i || {}).transition,
          a = void 0 === o ? t.getDefaultTransition() || {} : o;
        n.transitionOverride && (a = n.transitionOverride);
        var u = i
            ? function () {
                return Rn(t, i, n);
              }
            : function () {
                return Promise.resolve();
              },
          l = (
            null === (r = t.variantChildren) || void 0 === r ? void 0 : r.size
          )
            ? function (r) {
                void 0 === r && (r = 0);
                var i = a.delayChildren,
                  o = void 0 === i ? 0 : i,
                  u = a.staggerChildren,
                  l = a.staggerDirection;
                return (function (t, e, n, r, i, o) {
                  void 0 === n && (n = 0);
                  void 0 === r && (r = 0);
                  void 0 === i && (i = 1);
                  var a = [],
                    u = (t.variantChildren.size - 1) * r,
                    l =
                      1 === i
                        ? function (t) {
                            return void 0 === t && (t = 0), t * r;
                          }
                        : function (t) {
                            return void 0 === t && (t = 0), u - t * r;
                          };
                  return (
                    Array.from(t.variantChildren)
                      .sort(Nn)
                      .forEach(function (t, r) {
                        a.push(
                          On(t, e, s(s({}, o), { delay: n + l(r) })).then(
                            function () {
                              return t.notifyAnimationComplete(e);
                            }
                          )
                        );
                      }),
                    Promise.all(a)
                  );
                })(t, e, o + r, u, l, n);
              }
            : function () {
                return Promise.resolve();
              },
          h = a.when;
        if (h) {
          var f = c("beforeChildren" === h ? [u, l] : [l, u], 2),
            d = f[0],
            p = f[1];
          return d().then(p);
        }
        return Promise.all([u(), l(n.delay)]);
      }
      function Rn(t, e, n) {
        var r,
          i = void 0 === n ? {} : n,
          o = i.delay,
          a = void 0 === o ? 0 : o,
          l = i.transitionOverride,
          c = i.type,
          h = t.makeTargetAnimatable(e),
          f = h.transition,
          d = void 0 === f ? t.getDefaultTransition() : f,
          p = h.transitionEnd,
          m = u(h, ["transition", "transitionEnd"]);
        l && (d = l);
        var y = [],
          g =
            c &&
            (null === (r = t.animationState) || void 0 === r
              ? void 0
              : r.getState()[c]);
        for (var v in m) {
          var b = t.getValue(v),
            w = m[v];
          if (!(!b || void 0 === w || (g && In(g, v)))) {
            var x = s({ delay: a }, d);
            t.shouldReduceMotion &&
              _n(v) &&
              (x = s(s({}, x), { type: !1, delay: 0 }));
            var E = tn(v, b, w, x);
            y.push(E);
          }
        }
        return Promise.all(y).then(function () {
          p && wn(t, p);
        });
      }
      function Nn(t, e) {
        return t.sortNodePosition(e);
      }
      function In(t, e) {
        var n = t.protectedKeys,
          r = t.needsAnimating,
          i = n.hasOwnProperty(e) && !0 !== r[e];
        return (r[e] = !1), i;
      }
      !(function (t) {
        (t.Animate = "animate"),
          (t.Hover = "whileHover"),
          (t.Tap = "whileTap"),
          (t.Drag = "whileDrag"),
          (t.Focus = "whileFocus"),
          (t.InView = "whileInView"),
          (t.Exit = "exit");
      })(kn || (kn = {}));
      var Cn = [
          kn.Animate,
          kn.InView,
          kn.Focus,
          kn.Hover,
          kn.Tap,
          kn.Drag,
          kn.Exit,
        ],
        Ln = h([], c(Cn), !1).reverse(),
        Bn = Cn.length;
      function Fn(t) {
        return function (e) {
          return Promise.all(
            e.map(function (e) {
              var n = e.animation,
                r = e.options;
              return (function (t, e, n) {
                var r;
                if (
                  (void 0 === n && (n = {}),
                  t.notifyAnimationStart(e),
                  Array.isArray(e))
                ) {
                  var i = e.map(function (e) {
                    return On(t, e, n);
                  });
                  r = Promise.all(i);
                } else if ("string" === typeof e) r = On(t, e, n);
                else {
                  var o = "function" === typeof e ? yn(t, e, n.custom) : e;
                  r = Rn(t, o, n);
                }
                return r.then(function () {
                  return t.notifyAnimationComplete(e);
                });
              })(t, n, r);
            })
          );
        };
      }
      function jn(t) {
        var e = Fn(t),
          n = (function () {
            var t;
            return (
              ((t = {})[kn.Animate] = Dn(!0)),
              (t[kn.InView] = Dn()),
              (t[kn.Hover] = Dn()),
              (t[kn.Tap] = Dn()),
              (t[kn.Drag] = Dn()),
              (t[kn.Focus] = Dn()),
              (t[kn.Exit] = Dn()),
              t
            );
          })(),
          r = {},
          i = !0,
          o = function (e, n) {
            var r = yn(t, n);
            if (r) {
              r.transition;
              var i = r.transitionEnd,
                o = u(r, ["transition", "transitionEnd"]);
              e = s(s(s({}, e), o), i);
            }
            return e;
          };
        function a(a, u) {
          for (
            var l,
              f = t.getProps(),
              d = t.getVariantContext(!0) || {},
              p = [],
              m = new Set(),
              y = {},
              g = 1 / 0,
              v = function (e) {
                var r = Ln[e],
                  v = n[r],
                  w = null !== (l = f[r]) && void 0 !== l ? l : d[r],
                  x = pn(w),
                  E = r === u ? v.isActive : null;
                !1 === E && (g = e);
                var T = w === d[r] && w !== f[r] && x;
                if (
                  (T && i && t.manuallyAnimateOnMount && (T = !1),
                  (v.protectedKeys = s({}, y)),
                  (!v.isActive && null === E) ||
                    (!w && !v.prevProp) ||
                    b(w) ||
                    "boolean" === typeof w)
                )
                  return "continue";
                var A = (function (t, e) {
                    if ("string" === typeof e) return e !== t;
                    if (dn(e)) return !k(e, t);
                    return !1;
                  })(v.prevProp, w),
                  M = A || (r === u && v.isActive && !T && x) || (e > g && x),
                  S = Array.isArray(w) ? w : [w],
                  P = S.reduce(o, {});
                !1 === E && (P = {});
                var O = v.prevResolvedValues,
                  R = void 0 === O ? {} : O,
                  N = s(s({}, R), P),
                  I = function (t) {
                    (M = !0), m.delete(t), (v.needsAnimating[t] = !0);
                  };
                for (var C in N) {
                  var L = P[C],
                    B = R[C];
                  y.hasOwnProperty(C) ||
                    (L !== B
                      ? _(L) && _(B)
                        ? !k(L, B) || A
                          ? I(C)
                          : (v.protectedKeys[C] = !0)
                        : void 0 !== L
                        ? I(C)
                        : m.add(C)
                      : void 0 !== L && m.has(C)
                      ? I(C)
                      : (v.protectedKeys[C] = !0));
                }
                (v.prevProp = w),
                  (v.prevResolvedValues = P),
                  v.isActive && (y = s(s({}, y), P)),
                  i && t.blockInitialAnimation && (M = !1),
                  M &&
                    !T &&
                    p.push.apply(
                      p,
                      h(
                        [],
                        c(
                          S.map(function (t) {
                            return { animation: t, options: s({ type: r }, a) };
                          })
                        ),
                        !1
                      )
                    );
              },
              w = 0;
            w < Bn;
            w++
          )
            v(w);
          if (((r = s({}, y)), m.size)) {
            var x = {};
            m.forEach(function (e) {
              var n = t.getBaseTarget(e);
              void 0 !== n && (x[e] = n);
            }),
              p.push({ animation: x });
          }
          var E = Boolean(p.length);
          return (
            i && !1 === f.initial && !t.manuallyAnimateOnMount && (E = !1),
            (i = !1),
            E ? e(p) : Promise.resolve()
          );
        }
        return {
          isAnimated: function (t) {
            return void 0 !== r[t];
          },
          animateChanges: a,
          setActive: function (e, r, i) {
            var o;
            if (n[e].isActive === r) return Promise.resolve();
            null === (o = t.variantChildren) ||
              void 0 === o ||
              o.forEach(function (t) {
                var n;
                return null === (n = t.animationState) || void 0 === n
                  ? void 0
                  : n.setActive(e, r);
              }),
              (n[e].isActive = r);
            var s = a(i, e);
            for (var u in n) n[u].protectedKeys = {};
            return s;
          },
          setAnimateFunction: function (n) {
            e = n(t);
          },
          getState: function () {
            return n;
          },
        };
      }
      function Dn(t) {
        return (
          void 0 === t && (t = !1),
          {
            isActive: t,
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {},
          }
        );
      }
      var Un = function (t) {
          return function (e) {
            return t(e), null;
          };
        },
        Vn = {
          animation: Un(function (t) {
            var e = t.visualElement,
              n = t.animate;
            e.animationState || (e.animationState = jn(e)),
              b(n) &&
                (0, f.useEffect)(
                  function () {
                    return n.subscribe(e);
                  },
                  [n]
                );
          }),
          exit: Un(function (t) {
            var e = t.custom,
              n = t.visualElement,
              r = c(M(), 2),
              i = r[0],
              o = r[1],
              a = (0, f.useContext)(w);
            (0, f.useEffect)(
              function () {
                var t, r;
                n.isPresent = i;
                var s =
                  null === (t = n.animationState) || void 0 === t
                    ? void 0
                    : t.setActive(kn.Exit, !i, {
                        custom:
                          null !==
                            (r =
                              null === a || void 0 === a ? void 0 : a.custom) &&
                          void 0 !== r
                            ? r
                            : e,
                      });
                !i && (null === s || void 0 === s || s.then(o));
              },
              [i]
            );
          }),
        };
      function Gn(t, e, n, r) {
        return (
          t.addEventListener(e, n, r),
          function () {
            return t.removeEventListener(e, n, r);
          }
        );
      }
      function zn(t, e, n, r) {
        (0, f.useEffect)(
          function () {
            var i = t.current;
            if (n && i) return Gn(i, e, n, r);
          },
          [t, e, n, r]
        );
      }
      function $n(t) {
        return "undefined" !== typeof PointerEvent && t instanceof PointerEvent
          ? !("mouse" !== t.pointerType)
          : t instanceof MouseEvent;
      }
      function Hn(t) {
        return !!t.touches;
      }
      var qn = { pageX: 0, pageY: 0 };
      function Wn(t, e) {
        void 0 === e && (e = "page");
        var n = t.touches[0] || t.changedTouches[0] || qn;
        return { x: n[e + "X"], y: n[e + "Y"] };
      }
      function Xn(t, e) {
        return void 0 === e && (e = "page"), { x: t[e + "X"], y: t[e + "Y"] };
      }
      function Zn(t, e) {
        return (
          void 0 === e && (e = "page"), { point: Hn(t) ? Wn(t, e) : Xn(t, e) }
        );
      }
      var Kn = function (t, e) {
          void 0 === e && (e = !1);
          var n,
            r = function (e) {
              return t(e, Zn(e));
            };
          return e
            ? ((n = r),
              function (t) {
                var e = t instanceof MouseEvent;
                (!e || (e && 0 === t.button)) && n(t);
              })
            : r;
        },
        Jn = "undefined" !== typeof window,
        Yn = {
          pointerdown: "mousedown",
          pointermove: "mousemove",
          pointerup: "mouseup",
          pointercancel: "mousecancel",
          pointerover: "mouseover",
          pointerout: "mouseout",
          pointerenter: "mouseenter",
          pointerleave: "mouseleave",
        },
        Qn = {
          pointerdown: "touchstart",
          pointermove: "touchmove",
          pointerup: "touchend",
          pointercancel: "touchcancel",
        };
      function tr(t) {
        return Jn && null === window.onpointerdown
          ? t
          : Jn && null === window.ontouchstart
          ? Qn[t]
          : Jn && null === window.onmousedown
          ? Yn[t]
          : t;
      }
      function er(t, e, n, r) {
        return Gn(t, tr(e), Kn(n, "pointerdown" === e), r);
      }
      function nr(t, e, n, r) {
        return zn(t, tr(e), n && Kn(n, "pointerdown" === e), r);
      }
      function rr(t) {
        var e = null;
        return function () {
          return (
            null === e &&
            ((e = t),
            function () {
              e = null;
            })
          );
        };
      }
      var ir = rr("dragHorizontal"),
        or = rr("dragVertical");
      function ar(t) {
        var e = !1;
        if ("y" === t) e = or();
        else if ("x" === t) e = ir();
        else {
          var n = ir(),
            r = or();
          n && r
            ? (e = function () {
                n(), r();
              })
            : (n && n(), r && r());
        }
        return e;
      }
      function sr() {
        var t = ar(!0);
        return !t || (t(), !1);
      }
      function ur(t, e, n) {
        return function (r, i) {
          var o;
          $n(r) &&
            !sr() &&
            (null === (o = t.animationState) ||
              void 0 === o ||
              o.setActive(kn.Hover, e),
            null === n || void 0 === n || n(r, i));
        };
      }
      var lr = function (t, e) {
        return !!e && (t === e || lr(t, e.parentElement));
      };
      function cr(t) {
        return (0, f.useEffect)(function () {
          return function () {
            return t();
          };
        }, []);
      }
      var hr = new WeakMap(),
        fr = new WeakMap(),
        dr = function (t) {
          var e;
          null === (e = hr.get(t.target)) || void 0 === e || e(t);
        },
        pr = function (t) {
          t.forEach(dr);
        };
      function mr(t, e, n) {
        var r = (function (t) {
          var e = t.root,
            n = u(t, ["root"]),
            r = e || document;
          fr.has(r) || fr.set(r, {});
          var i = fr.get(r),
            o = JSON.stringify(n);
          return (
            i[o] || (i[o] = new IntersectionObserver(pr, s({ root: e }, n))),
            i[o]
          );
        })(e);
        return (
          hr.set(t, n),
          r.observe(t),
          function () {
            hr.delete(t), r.unobserve(t);
          }
        );
      }
      var yr = { some: 0, all: 1 };
      function gr(t, e, n, r) {
        var i = r.root,
          o = r.margin,
          a = r.amount,
          s = void 0 === a ? "some" : a,
          u = r.once;
        (0, f.useEffect)(
          function () {
            if (t) {
              var r = {
                root: null === i || void 0 === i ? void 0 : i.current,
                rootMargin: o,
                threshold: "number" === typeof s ? s : yr[s],
              };
              return mr(n.getInstance(), r, function (t) {
                var r,
                  i = t.isIntersecting;
                if (
                  e.isInView !== i &&
                  ((e.isInView = i), !u || i || !e.hasEnteredView)
                ) {
                  i && (e.hasEnteredView = !0),
                    null === (r = n.animationState) ||
                      void 0 === r ||
                      r.setActive(kn.InView, i);
                  var o = n.getProps(),
                    a = i ? o.onViewportEnter : o.onViewportLeave;
                  null === a || void 0 === a || a(t);
                }
              });
            }
          },
          [t, i, o, s]
        );
      }
      function vr(t, e, n, r) {
        var i = r.fallback,
          o = void 0 === i || i;
        (0, f.useEffect)(
          function () {
            t &&
              o &&
              requestAnimationFrame(function () {
                var t;
                e.hasEnteredView = !0;
                var r = n.getProps().onViewportEnter;
                null === r || void 0 === r || r(null),
                  null === (t = n.animationState) ||
                    void 0 === t ||
                    t.setActive(kn.InView, !0);
              });
          },
          [t]
        );
      }
      var br = {
          inView: Un(function (t) {
            var e = t.visualElement,
              n = t.whileInView,
              r = t.onViewportEnter,
              i = t.onViewportLeave,
              o = t.viewport,
              a = void 0 === o ? {} : o,
              s = (0, f.useRef)({ hasEnteredView: !1, isInView: !1 }),
              u = Boolean(n || r || i);
            a.once && s.current.hasEnteredView && (u = !1),
              ("undefined" === typeof IntersectionObserver ? vr : gr)(
                u,
                s.current,
                e,
                a
              );
          }),
          tap: Un(function (t) {
            var e = t.onTap,
              n = t.onTapStart,
              r = t.onTapCancel,
              i = t.whileTap,
              o = t.visualElement,
              a = e || n || r || i,
              s = (0, f.useRef)(!1),
              u = (0, f.useRef)(null);
            function l() {
              var t;
              null === (t = u.current) || void 0 === t || t.call(u),
                (u.current = null);
            }
            function c() {
              var t;
              return (
                l(),
                (s.current = !1),
                null === (t = o.animationState) ||
                  void 0 === t ||
                  t.setActive(kn.Tap, !1),
                !sr()
              );
            }
            function h(t, n) {
              c() &&
                (lr(o.getInstance(), t.target)
                  ? null === e || void 0 === e || e(t, n)
                  : null === r || void 0 === r || r(t, n));
            }
            function d(t, e) {
              c() && (null === r || void 0 === r || r(t, e));
            }
            nr(
              o,
              "pointerdown",
              a
                ? function (t, e) {
                    var r;
                    l(),
                      s.current ||
                        ((s.current = !0),
                        (u.current = Mt(
                          er(window, "pointerup", h),
                          er(window, "pointercancel", d)
                        )),
                        null === (r = o.animationState) ||
                          void 0 === r ||
                          r.setActive(kn.Tap, !0),
                        null === n || void 0 === n || n(t, e));
                  }
                : void 0
            ),
              cr(l);
          }),
          focus: Un(function (t) {
            var e = t.whileFocus,
              n = t.visualElement;
            zn(
              n,
              "focus",
              e
                ? function () {
                    var t;
                    null === (t = n.animationState) ||
                      void 0 === t ||
                      t.setActive(kn.Focus, !0);
                  }
                : void 0
            ),
              zn(
                n,
                "blur",
                e
                  ? function () {
                      var t;
                      null === (t = n.animationState) ||
                        void 0 === t ||
                        t.setActive(kn.Focus, !1);
                    }
                  : void 0
              );
          }),
          hover: Un(function (t) {
            var e = t.onHoverStart,
              n = t.onHoverEnd,
              r = t.whileHover,
              i = t.visualElement;
            nr(i, "pointerenter", e || r ? ur(i, !0, e) : void 0),
              nr(i, "pointerleave", n || r ? ur(i, !1, n) : void 0);
          }),
        },
        wr = function (t) {
          return Boolean(null !== t && "object" === typeof t && t.getVelocity);
        },
        xr = [
          "LayoutMeasure",
          "BeforeLayoutMeasure",
          "LayoutUpdate",
          "ViewportBoxUpdate",
          "Update",
          "Render",
          "AnimationComplete",
          "LayoutAnimationComplete",
          "AnimationStart",
          "SetAxisTarget",
          "Unmount",
        ];
      var Er = function (t) {
          var e = t.treeType,
            n = void 0 === e ? "" : e,
            r = t.build,
            i = t.getBaseTarget,
            o = t.makeTargetAnimatable,
            a = t.measureViewportBox,
            u = t.render,
            l = t.readValueFromInstance,
            f = t.removeValueFromRenderState,
            d = t.sortNodePosition,
            p = t.scrapeMotionValuesFromProps;
          return function (t, e) {
            var m = t.parent,
              y = t.props,
              g = t.presenceId,
              v = t.blockInitialAnimation,
              b = t.visualState,
              w = t.shouldReduceMotion;
            void 0 === e && (e = {});
            var x,
              E,
              T = !1,
              A = b.latestValues,
              M = b.renderState,
              _ = (function () {
                var t = xr.map(function () {
                    return new on();
                  }),
                  e = {},
                  n = {
                    clearAllListeners: function () {
                      return t.forEach(function (t) {
                        return t.clear();
                      });
                    },
                    updatePropListeners: function (t) {
                      xr.forEach(function (r) {
                        var i,
                          o = "on" + r,
                          a = t[o];
                        null === (i = e[r]) || void 0 === i || i.call(e),
                          a && (e[r] = n[o](a));
                      });
                    },
                  };
                return (
                  t.forEach(function (t, e) {
                    (n["on" + xr[e]] = function (e) {
                      return t.add(e);
                    }),
                      (n["notify" + xr[e]] = function () {
                        for (var e = [], n = 0; n < arguments.length; n++)
                          e[n] = arguments[n];
                        return t.notify.apply(t, h([], c(e), !1));
                      });
                  }),
                  n
                );
              })(),
              k = new Map(),
              S = new Map(),
              P = {},
              O = s({}, A);
            function R() {
              x && T && (N(), u(x, M, y.style, U.projection));
            }
            function N() {
              r(U, M, A, e, y);
            }
            function I() {
              _.notifyUpdate(A);
            }
            function C(t, e) {
              var n = e.onChange(function (e) {
                  (A[t] = e), y.onUpdate && ye.update(I, !1, !0);
                }),
                r = e.onRenderRequest(U.scheduleRender);
              S.set(t, function () {
                n(), r();
              });
            }
            var L = p(y);
            for (var B in L) {
              var F = L[B];
              void 0 !== A[B] && wr(F) && F.set(A[B], !1);
            }
            var j = gn(y),
              D = vn(y),
              U = s(
                s(
                  {
                    treeType: n,
                    current: null,
                    depth: m ? m.depth + 1 : 0,
                    parent: m,
                    children: new Set(),
                    presenceId: g,
                    shouldReduceMotion: w,
                    variantChildren: D ? new Set() : void 0,
                    isVisible: void 0,
                    manuallyAnimateOnMount: Boolean(
                      null === m || void 0 === m ? void 0 : m.isMounted()
                    ),
                    blockInitialAnimation: v,
                    isMounted: function () {
                      return Boolean(x);
                    },
                    mount: function (t) {
                      (T = !0),
                        (x = U.current = t),
                        U.projection && U.projection.mount(t),
                        D &&
                          m &&
                          !j &&
                          (E =
                            null === m || void 0 === m
                              ? void 0
                              : m.addVariantChild(U)),
                        k.forEach(function (t, e) {
                          return C(e, t);
                        }),
                        null === m || void 0 === m || m.children.add(U),
                        U.setProps(y);
                    },
                    unmount: function () {
                      var t;
                      null === (t = U.projection) ||
                        void 0 === t ||
                        t.unmount(),
                        ce.update(I),
                        ce.render(R),
                        S.forEach(function (t) {
                          return t();
                        }),
                        null === E || void 0 === E || E(),
                        null === m || void 0 === m || m.children.delete(U),
                        _.clearAllListeners(),
                        (x = void 0),
                        (T = !1);
                    },
                    addVariantChild: function (t) {
                      var e,
                        n = U.getClosestVariantNode();
                      if (n)
                        return (
                          null === (e = n.variantChildren) ||
                            void 0 === e ||
                            e.add(t),
                          function () {
                            return n.variantChildren.delete(t);
                          }
                        );
                    },
                    sortNodePosition: function (t) {
                      return d && n === t.treeType
                        ? d(U.getInstance(), t.getInstance())
                        : 0;
                    },
                    getClosestVariantNode: function () {
                      return D
                        ? U
                        : null === m || void 0 === m
                        ? void 0
                        : m.getClosestVariantNode();
                    },
                    getLayoutId: function () {
                      return y.layoutId;
                    },
                    getInstance: function () {
                      return x;
                    },
                    getStaticValue: function (t) {
                      return A[t];
                    },
                    setStaticValue: function (t, e) {
                      return (A[t] = e);
                    },
                    getLatestValues: function () {
                      return A;
                    },
                    setVisibility: function (t) {
                      U.isVisible !== t &&
                        ((U.isVisible = t), U.scheduleRender());
                    },
                    makeTargetAnimatable: function (t, e) {
                      return void 0 === e && (e = !0), o(U, t, y, e);
                    },
                    measureViewportBox: function () {
                      return a(x, y);
                    },
                    addValue: function (t, e) {
                      U.hasValue(t) && U.removeValue(t),
                        k.set(t, e),
                        (A[t] = e.get()),
                        C(t, e);
                    },
                    removeValue: function (t) {
                      var e;
                      k.delete(t),
                        null === (e = S.get(t)) || void 0 === e || e(),
                        S.delete(t),
                        delete A[t],
                        f(t, M);
                    },
                    hasValue: function (t) {
                      return k.has(t);
                    },
                    getValue: function (t, e) {
                      var n = k.get(t);
                      return (
                        void 0 === n &&
                          void 0 !== e &&
                          ((n = sn(e)), U.addValue(t, n)),
                        n
                      );
                    },
                    forEachValue: function (t) {
                      return k.forEach(t);
                    },
                    readValue: function (t) {
                      var n;
                      return null !== (n = A[t]) && void 0 !== n
                        ? n
                        : l(x, t, e);
                    },
                    setBaseTarget: function (t, e) {
                      O[t] = e;
                    },
                    getBaseTarget: function (t) {
                      if (i) {
                        var e = i(y, t);
                        if (void 0 !== e && !wr(e)) return e;
                      }
                      return O[t];
                    },
                  },
                  _
                ),
                {
                  build: function () {
                    return N(), M;
                  },
                  scheduleRender: function () {
                    ye.render(R, !1, !0);
                  },
                  syncRender: R,
                  setProps: function (t) {
                    (t.transformTemplate || y.transformTemplate) &&
                      U.scheduleRender(),
                      (y = t),
                      _.updatePropListeners(t),
                      (P = (function (t, e, n) {
                        var r;
                        for (var i in e) {
                          var o = e[i],
                            a = n[i];
                          if (wr(o)) t.addValue(i, o);
                          else if (wr(a)) t.addValue(i, sn(o));
                          else if (a !== o)
                            if (t.hasValue(i)) {
                              var s = t.getValue(i);
                              !s.hasAnimated && s.set(o);
                            } else
                              t.addValue(
                                i,
                                sn(
                                  null !== (r = t.getStaticValue(i)) &&
                                    void 0 !== r
                                    ? r
                                    : o
                                )
                              );
                        }
                        for (var i in n) void 0 === e[i] && t.removeValue(i);
                        return e;
                      })(U, p(y), P));
                  },
                  getProps: function () {
                    return y;
                  },
                  getVariant: function (t) {
                    var e;
                    return null === (e = y.variants) || void 0 === e
                      ? void 0
                      : e[t];
                  },
                  getDefaultTransition: function () {
                    return y.transition;
                  },
                  getTransformPagePoint: function () {
                    return y.transformPagePoint;
                  },
                  getVariantContext: function (t) {
                    if ((void 0 === t && (t = !1), t))
                      return null === m || void 0 === m
                        ? void 0
                        : m.getVariantContext();
                    if (!j) {
                      var e =
                        (null === m || void 0 === m
                          ? void 0
                          : m.getVariantContext()) || {};
                      return void 0 !== y.initial && (e.initial = y.initial), e;
                    }
                    for (var n = {}, r = 0; r < Ar; r++) {
                      var i = Tr[r],
                        o = y[i];
                      (pn(o) || !1 === o) && (n[i] = o);
                    }
                    return n;
                  },
                }
              );
            return U;
          };
        },
        Tr = h(["initial"], c(Cn), !1),
        Ar = Tr.length,
        Mr = {
          x: "translateX",
          y: "translateY",
          z: "translateZ",
          transformPerspective: "perspective",
        };
      function _r(t) {
        return t.startsWith("--");
      }
      var kr = function (t, e) {
        return e && "number" === typeof t ? e.transform(t) : t;
      };
      function Sr(t, e, n, r) {
        var i,
          o = t.style,
          a = t.vars,
          s = t.transform,
          u = t.transformKeys,
          l = t.transformOrigin;
        u.length = 0;
        var c = !1,
          h = !1,
          f = !0;
        for (var d in e) {
          var p = e[d];
          if (_r(d)) a[d] = p;
          else {
            var m = Ge[d],
              y = kr(p, m);
            if (_n(d)) {
              if (((c = !0), (s[d] = y), u.push(d), !f)) continue;
              p !== (null !== (i = m.default) && void 0 !== i ? i : 0) &&
                (f = !1);
            } else Pn(d) ? ((l[d] = y), (h = !0)) : (o[d] = y);
          }
        }
        c
          ? (o.transform = (function (t, e, n, r) {
              var i = t.transform,
                o = t.transformKeys,
                a = e.enableHardwareAcceleration,
                s = void 0 === a || a,
                u = e.allowTransformNone,
                l = void 0 === u || u,
                c = "";
              o.sort(An);
              for (var h = !1, f = o.length, d = 0; d < f; d++) {
                var p = o[d];
                (c += "".concat(Mr[p] || p, "(").concat(i[p], ") ")),
                  "z" === p && (h = !0);
              }
              return (
                !h && s ? (c += "translateZ(0)") : (c = c.trim()),
                r ? (c = r(i, n ? "" : c)) : l && n && (c = "none"),
                c
              );
            })(t, n, f, r))
          : r
          ? (o.transform = r({}, ""))
          : !e.transform && o.transform && (o.transform = "none"),
          h &&
            (o.transformOrigin = (function (t) {
              var e = t.originX,
                n = void 0 === e ? "50%" : e,
                r = t.originY,
                i = void 0 === r ? "50%" : r,
                o = t.originZ,
                a = void 0 === o ? 0 : o;
              return "".concat(n, " ").concat(i, " ").concat(a);
            })(l));
      }
      function Pr(t) {
        return "string" === typeof t && t.startsWith("var(--");
      }
      var Or = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
      function Rr(t, e, n) {
        void 0 === n && (n = 1),
          'Max CSS variable fallback depth detected in property "'.concat(
            t,
            '". This may indicate a circular fallback dependency.'
          );
        var r = c(
            (function (t) {
              var e = Or.exec(t);
              if (!e) return [,];
              var n = c(e, 3);
              return [n[1], n[2]];
            })(t),
            2
          ),
          i = r[0],
          o = r[1];
        if (i) {
          var a = window.getComputedStyle(e).getPropertyValue(i);
          return a ? a.trim() : Pr(o) ? Rr(o, e, n + 1) : o;
        }
      }
      var Nr,
        Ir = new Set([
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          "x",
          "y",
        ]),
        Cr = function (t) {
          return Ir.has(t);
        },
        Lr = function (t, e) {
          t.set(e, !1), t.set(e);
        },
        Br = function (t) {
          return t === H || t === rt;
        };
      !(function (t) {
        (t.width = "width"),
          (t.height = "height"),
          (t.left = "left"),
          (t.right = "right"),
          (t.top = "top"),
          (t.bottom = "bottom");
      })(Nr || (Nr = {}));
      var Fr = function (t, e) {
          return parseFloat(t.split(", ")[e]);
        },
        jr = function (t, e) {
          return function (n, r) {
            var i = r.transform;
            if ("none" === i || !i) return 0;
            var o = i.match(/^matrix3d\((.+)\)$/);
            if (o) return Fr(o[1], e);
            var a = i.match(/^matrix\((.+)\)$/);
            return a ? Fr(a[1], t) : 0;
          };
        },
        Dr = new Set(["x", "y", "z"]),
        Ur = Tn.filter(function (t) {
          return !Dr.has(t);
        });
      var Vr = {
          width: function (t, e) {
            var n = t.x,
              r = e.paddingLeft,
              i = void 0 === r ? "0" : r,
              o = e.paddingRight,
              a = void 0 === o ? "0" : o;
            return n.max - n.min - parseFloat(i) - parseFloat(a);
          },
          height: function (t, e) {
            var n = t.y,
              r = e.paddingTop,
              i = void 0 === r ? "0" : r,
              o = e.paddingBottom,
              a = void 0 === o ? "0" : o;
            return n.max - n.min - parseFloat(i) - parseFloat(a);
          },
          top: function (t, e) {
            var n = e.top;
            return parseFloat(n);
          },
          left: function (t, e) {
            var n = e.left;
            return parseFloat(n);
          },
          bottom: function (t, e) {
            var n = t.y,
              r = e.top;
            return parseFloat(r) + (n.max - n.min);
          },
          right: function (t, e) {
            var n = t.x,
              r = e.left;
            return parseFloat(r) + (n.max - n.min);
          },
          x: jr(4, 13),
          y: jr(5, 14),
        },
        Gr = function (t, e, n, r) {
          void 0 === n && (n = {}),
            void 0 === r && (r = {}),
            (e = s({}, e)),
            (r = s({}, r));
          var i = Object.keys(e).filter(Cr),
            o = [],
            a = !1,
            u = [];
          if (
            (i.forEach(function (i) {
              var s = t.getValue(i);
              if (t.hasValue(i)) {
                var l,
                  c = n[i],
                  h = cn(c),
                  f = e[i];
                if (_(f)) {
                  var d = f.length,
                    p = null === f[0] ? 1 : 0;
                  (c = f[p]), (h = cn(c));
                  for (var m = p; m < d; m++)
                    l ? cn(f[m]) : (l = cn(f[m])) === h || (Br(h) && Br(l));
                } else l = cn(f);
                if (h !== l)
                  if (Br(h) && Br(l)) {
                    var y = s.get();
                    "string" === typeof y && s.set(parseFloat(y)),
                      "string" === typeof f
                        ? (e[i] = parseFloat(f))
                        : Array.isArray(f) &&
                          l === rt &&
                          (e[i] = f.map(parseFloat));
                  } else
                    (null === h || void 0 === h ? void 0 : h.transform) &&
                    (null === l || void 0 === l ? void 0 : l.transform) &&
                    (0 === c || 0 === f)
                      ? 0 === c
                        ? s.set(l.transform(c))
                        : (e[i] = h.transform(f))
                      : (a ||
                          ((o = (function (t) {
                            var e = [];
                            return (
                              Ur.forEach(function (n) {
                                var r = t.getValue(n);
                                void 0 !== r &&
                                  (e.push([n, r.get()]),
                                  r.set(n.startsWith("scale") ? 1 : 0));
                              }),
                              e.length && t.syncRender(),
                              e
                            );
                          })(t)),
                          (a = !0)),
                        u.push(i),
                        (r[i] = void 0 !== r[i] ? r[i] : e[i]),
                        Lr(s, f));
              }
            }),
            u.length)
          ) {
            var l = (function (t, e, n) {
              var r = e.measureViewportBox(),
                i = e.getInstance(),
                o = getComputedStyle(i),
                a = o.display,
                s = {};
              "none" === a && e.setStaticValue("display", t.display || "block"),
                n.forEach(function (t) {
                  s[t] = Vr[t](r, o);
                }),
                e.syncRender();
              var u = e.measureViewportBox();
              return (
                n.forEach(function (n) {
                  var r = e.getValue(n);
                  Lr(r, s[n]), (t[n] = Vr[n](u, o));
                }),
                t
              );
            })(e, t, u);
            return (
              o.length &&
                o.forEach(function (e) {
                  var n = c(e, 2),
                    r = n[0],
                    i = n[1];
                  t.getValue(r).set(i);
                }),
              t.syncRender(),
              { target: l, transitionEnd: r }
            );
          }
          return { target: e, transitionEnd: r };
        };
      function zr(t, e, n, r) {
        return (function (t) {
          return Object.keys(t).some(Cr);
        })(e)
          ? Gr(t, e, n, r)
          : { target: e, transitionEnd: r };
      }
      var $r = function (t, e, n, r) {
          var i = (function (t, e, n) {
            var r,
              i = u(e, []),
              o = t.getInstance();
            if (!(o instanceof Element)) return { target: i, transitionEnd: n };
            for (var a in (n && (n = s({}, n)),
            t.forEachValue(function (t) {
              var e = t.get();
              if (Pr(e)) {
                var n = Rr(e, o);
                n && t.set(n);
              }
            }),
            i)) {
              var l = i[a];
              if (Pr(l)) {
                var c = Rr(l, o);
                c &&
                  ((i[a] = c),
                  n && ((null !== (r = n[a]) && void 0 !== r) || (n[a] = l)));
              }
            }
            return { target: i, transitionEnd: n };
          })(t, e, r);
          return zr(t, (e = i.target), n, (r = i.transitionEnd));
        },
        Hr = {};
      function qr(t, e) {
        var n = e.layout,
          r = e.layoutId;
        return (
          _n(t) ||
          Pn(t) ||
          ((n || void 0 !== r) && (!!Hr[t] || "opacity" === t))
        );
      }
      function Wr(t) {
        var e = t.style,
          n = {};
        for (var r in e) (wr(e[r]) || qr(r, t)) && (n[r] = e[r]);
        return n;
      }
      function Xr(t, e, n, r) {
        var i = e.style,
          o = e.vars;
        for (var a in (Object.assign(t.style, i, r && r.getProjectionStyles(n)),
        o))
          t.style.setProperty(a, o[a]);
      }
      function Zr(t) {
        var e = t.top;
        return {
          x: { min: t.left, max: t.right },
          y: { min: e, max: t.bottom },
        };
      }
      function Kr(t) {
        return void 0 === t || 1 === t;
      }
      function Jr(t) {
        var e = t.scale,
          n = t.scaleX,
          r = t.scaleY;
        return !Kr(e) || !Kr(n) || !Kr(r);
      }
      function Yr(t) {
        return (
          Jr(t) ||
          Qr(t.x) ||
          Qr(t.y) ||
          t.z ||
          t.rotate ||
          t.rotateX ||
          t.rotateY
        );
      }
      function Qr(t) {
        return t && "0%" !== t;
      }
      function ti(t, e, n) {
        return n + e * (t - n);
      }
      function ei(t, e, n, r, i) {
        return void 0 !== i && (t = ti(t, i, r)), ti(t, n, r) + e;
      }
      function ni(t, e, n, r, i) {
        void 0 === e && (e = 0),
          void 0 === n && (n = 1),
          (t.min = ei(t.min, e, n, r, i)),
          (t.max = ei(t.max, e, n, r, i));
      }
      function ri(t, e) {
        var n = e.x,
          r = e.y;
        ni(t.x, n.translate, n.scale, n.originPoint),
          ni(t.y, r.translate, r.scale, r.originPoint);
      }
      function ii(t, e) {
        (t.min = t.min + e), (t.max = t.max + e);
      }
      function oi(t, e, n) {
        var r = c(n, 3),
          i = r[0],
          o = r[1],
          a = r[2],
          s = void 0 !== e[a] ? e[a] : 0.5,
          u = j(t.min, t.max, s);
        ni(t, e[i], e[o], u, e.scale);
      }
      var ai = ["x", "scaleX", "originX"],
        si = ["y", "scaleY", "originY"];
      function ui(t, e) {
        oi(t.x, e, ai), oi(t.y, e, si);
      }
      function li(t, e) {
        return Zr(
          (function (t, e) {
            if (!e) return t;
            var n = e({ x: t.left, y: t.top }),
              r = e({ x: t.right, y: t.bottom });
            return { top: n.y, left: n.x, bottom: r.y, right: r.x };
          })(t.getBoundingClientRect(), e)
        );
      }
      var ci = {
          treeType: "dom",
          readValueFromInstance: function (t, e) {
            if (_n(e)) {
              var n = $e(e);
              return (n && n.default) || 0;
            }
            var r,
              i = ((r = t), window.getComputedStyle(r));
            return (_r(e) ? i.getPropertyValue(e) : i[e]) || 0;
          },
          sortNodePosition: function (t, e) {
            return 2 & t.compareDocumentPosition(e) ? 1 : -1;
          },
          getBaseTarget: function (t, e) {
            var n;
            return null === (n = t.style) || void 0 === n ? void 0 : n[e];
          },
          measureViewportBox: function (t, e) {
            return li(t, e.transformPagePoint);
          },
          resetTransform: function (t, e, n) {
            var r = n.transformTemplate;
            (e.style.transform = r ? r({}, "") : "none"), t.scheduleRender();
          },
          restoreTransform: function (t, e) {
            t.style.transform = e.style.transform;
          },
          removeValueFromRenderState: function (t, e) {
            var n = e.vars,
              r = e.style;
            delete n[t], delete r[t];
          },
          makeTargetAnimatable: function (t, e, n, r) {
            var i = n.transformValues;
            void 0 === r && (r = !0);
            var o = e.transition,
              a = e.transitionEnd,
              l = u(e, ["transition", "transitionEnd"]),
              c = (function (t, e, n) {
                var r,
                  i,
                  o = {};
                for (var a in t)
                  o[a] =
                    null !== (r = xn(a, e)) && void 0 !== r
                      ? r
                      : null === (i = n.getValue(a)) || void 0 === i
                      ? void 0
                      : i.get();
                return o;
              })(l, o || {}, t);
            if ((i && (a && (a = i(a)), l && (l = i(l)), c && (c = i(c))), r)) {
              !(function (t, e, n) {
                var r,
                  i,
                  o,
                  a,
                  s = Object.keys(e).filter(function (e) {
                    return !t.hasValue(e);
                  }),
                  u = s.length;
                if (u)
                  for (var l = 0; l < u; l++) {
                    var c = s[l],
                      h = e[c],
                      f = null;
                    Array.isArray(h) && (f = h[0]),
                      null === f &&
                        (f =
                          null !==
                            (i =
                              null !== (r = n[c]) && void 0 !== r
                                ? r
                                : t.readValue(c)) && void 0 !== i
                            ? i
                            : e[c]),
                      void 0 !== f &&
                        null !== f &&
                        ("string" === typeof f &&
                        (/^\-?\d*\.?\d+$/.test(f) || en(f))
                          ? (f = parseFloat(f))
                          : !fn(f) && Et.test(h) && (f = He(c, h)),
                        t.addValue(c, sn(f)),
                        (null !== (o = (a = n)[c]) && void 0 !== o) ||
                          (a[c] = f),
                        t.setBaseTarget(c, f));
                  }
              })(t, l, c);
              var h = $r(t, l, c, a);
              (a = h.transitionEnd), (l = h.target);
            }
            return s({ transition: o, transitionEnd: a }, l);
          },
          scrapeMotionValuesFromProps: Wr,
          build: function (t, e, n, r, i) {
            void 0 !== t.isVisible &&
              (e.style.visibility = t.isVisible ? "visible" : "hidden"),
              Sr(e, n, r, i.transformTemplate);
          },
          render: Xr,
        },
        hi = Er(ci);
      function fi(t) {
        var e = Wr(t);
        for (var n in t) {
          if (wr(t[n]))
            e["x" === n || "y" === n ? "attr" + n.toUpperCase() : n] = t[n];
        }
        return e;
      }
      function di(t, e, n) {
        return "string" === typeof t ? t : rt.transform(e + n * t);
      }
      var pi = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
        mi = { offset: "strokeDashoffset", array: "strokeDasharray" };
      function yi(t, e, n, r) {
        var i = e.attrX,
          o = e.attrY,
          a = e.originX,
          s = e.originY,
          l = e.pathLength,
          c = e.pathSpacing,
          h = void 0 === c ? 1 : c,
          f = e.pathOffset,
          d = void 0 === f ? 0 : f;
        Sr(
          t,
          u(e, [
            "attrX",
            "attrY",
            "originX",
            "originY",
            "pathLength",
            "pathSpacing",
            "pathOffset",
          ]),
          n,
          r
        ),
          (t.attrs = t.style),
          (t.style = {});
        var p = t.attrs,
          m = t.style,
          y = t.dimensions;
        p.transform && (y && (m.transform = p.transform), delete p.transform),
          y &&
            (void 0 !== a || void 0 !== s || m.transform) &&
            (m.transformOrigin = (function (t, e, n) {
              var r = di(e, t.x, t.width),
                i = di(n, t.y, t.height);
              return "".concat(r, " ").concat(i);
            })(y, void 0 !== a ? a : 0.5, void 0 !== s ? s : 0.5)),
          void 0 !== i && (p.x = i),
          void 0 !== o && (p.y = o),
          void 0 !== l &&
            (function (t, e, n, r, i) {
              void 0 === n && (n = 1),
                void 0 === r && (r = 0),
                void 0 === i && (i = !0),
                (t.pathLength = 1);
              var o = i ? pi : mi;
              t[o.offset] = rt.transform(-r);
              var a = rt.transform(e),
                s = rt.transform(n);
              t[o.array] = "".concat(a, " ").concat(s);
            })(p, l, h, d, !1);
      }
      var gi = /([a-z])([A-Z])/g,
        vi = function (t) {
          return t.replace(gi, "$1-$2").toLowerCase();
        },
        bi = new Set([
          "baseFrequency",
          "diffuseConstant",
          "kernelMatrix",
          "kernelUnitLength",
          "keySplines",
          "keyTimes",
          "limitingConeAngle",
          "markerHeight",
          "markerWidth",
          "numOctaves",
          "targetX",
          "targetY",
          "surfaceScale",
          "specularConstant",
          "specularExponent",
          "stdDeviation",
          "tableValues",
          "viewBox",
          "gradientTransform",
          "pathLength",
        ]);
      function wi(t, e) {
        for (var n in (Xr(t, e), e.attrs))
          t.setAttribute(bi.has(n) ? n : vi(n), e.attrs[n]);
      }
      var xi = Er(
          s(s({}, ci), {
            getBaseTarget: function (t, e) {
              return t[e];
            },
            readValueFromInstance: function (t, e) {
              var n;
              return _n(e)
                ? (null === (n = $e(e)) || void 0 === n ? void 0 : n.default) ||
                    0
                : ((e = bi.has(e) ? e : vi(e)), t.getAttribute(e));
            },
            scrapeMotionValuesFromProps: fi,
            build: function (t, e, n, r, i) {
              yi(e, n, r, i.transformTemplate);
            },
            render: wi,
          })
        ),
        Ei = [
          "animate",
          "circle",
          "defs",
          "desc",
          "ellipse",
          "g",
          "image",
          "line",
          "filter",
          "marker",
          "mask",
          "metadata",
          "path",
          "pattern",
          "polygon",
          "polyline",
          "rect",
          "stop",
          "svg",
          "switch",
          "symbol",
          "text",
          "tspan",
          "use",
          "view",
        ];
      function Ti(t) {
        return (
          "string" === typeof t &&
          !t.includes("-") &&
          !!(Ei.indexOf(t) > -1 || /[A-Z]/.test(t))
        );
      }
      var Ai = function (t, e) {
          return Ti(t)
            ? xi(e, { enableHardwareAcceleration: !1 })
            : hi(e, { enableHardwareAcceleration: !0 });
        },
        Mi = s(s({ renderer: Ai }, Vn), br),
        _i = Object.keys(m),
        ki = _i.length;
      var Si = (0, f.createContext)({
          transformPagePoint: function (t) {
            return t;
          },
          isStatic: !1,
          reducedMotion: "never",
        }),
        Pi = (0, f.createContext)({});
      var Oi = Jn ? f.useLayoutEffect : f.useEffect,
        Ri = { current: null },
        Ni = !1;
      function Ii() {
        return (
          !Ni &&
            (function () {
              if (((Ni = !0), "undefined" !== typeof window))
                if (window.matchMedia) {
                  var t = window.matchMedia("(prefers-reduced-motion)"),
                    e = function () {
                      return (Ri.current = t.matches);
                    };
                  t.addListener(e), e();
                } else Ri.current = !1;
            })(),
          c((0, f.useState)(Ri.current), 1)[0]
        );
      }
      function Ci(t, e, n, r) {
        var i = (0, f.useContext)(d),
          o = (0, f.useContext)(Pi).visualElement,
          a = (0, f.useContext)(w),
          s = (function () {
            var t = Ii(),
              e = (0, f.useContext)(Si).reducedMotion;
            return "never" !== e && ("always" === e || t);
          })(),
          u = (0, f.useRef)(void 0);
        r || (r = i.renderer),
          !u.current &&
            r &&
            (u.current = r(t, {
              visualState: e,
              parent: o,
              props: n,
              presenceId: null === a || void 0 === a ? void 0 : a.id,
              blockInitialAnimation:
                !1 === (null === a || void 0 === a ? void 0 : a.initial),
              shouldReduceMotion: s,
            }));
        var l = u.current;
        return (
          Oi(function () {
            null === l || void 0 === l || l.syncRender();
          }),
          (0, f.useEffect)(function () {
            var t;
            null ===
              (t = null === l || void 0 === l ? void 0 : l.animationState) ||
              void 0 === t ||
              t.animateChanges();
          }),
          Oi(function () {
            return function () {
              return null === l || void 0 === l ? void 0 : l.notifyUnmount();
            };
          }, []),
          l
        );
      }
      function Li(t) {
        return (
          "object" === typeof t &&
          Object.prototype.hasOwnProperty.call(t, "current")
        );
      }
      function Bi(t) {
        var e = (function (t, e) {
            if (gn(t)) {
              var n = t.initial,
                r = t.animate;
              return {
                initial: !1 === n || pn(n) ? n : void 0,
                animate: pn(r) ? r : void 0,
              };
            }
            return !1 !== t.inherit ? e : {};
          })(t, (0, f.useContext)(Pi)),
          n = e.initial,
          r = e.animate;
        return (0, f.useMemo)(
          function () {
            return { initial: n, animate: r };
          },
          [Fi(n), Fi(r)]
        );
      }
      function Fi(t) {
        return Array.isArray(t) ? t.join(" ") : t;
      }
      var ji = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
        Di = ji.length,
        Ui = function (t) {
          return "string" === typeof t ? parseFloat(t) : t;
        },
        Vi = function (t) {
          return "number" === typeof t || rt.test(t);
        };
      function Gi(t, e) {
        var n;
        return null !== (n = t[e]) && void 0 !== n ? n : t.borderRadius;
      }
      var zi = Hi(0, 0.5, zt),
        $i = Hi(0.5, 0.95, Ft);
      function Hi(t, e, n) {
        return function (r) {
          return r < t ? 0 : r > e ? 1 : n(F(t, e, r));
        };
      }
      function qi(t, e) {
        (t.min = e.min), (t.max = e.max);
      }
      function Wi(t, e) {
        qi(t.x, e.x), qi(t.y, e.y);
      }
      const Xi = (t) => t.hasOwnProperty("x") && t.hasOwnProperty("y"),
        Zi = (t) => Xi(t) && t.hasOwnProperty("z"),
        Ki = (t, e) => Math.abs(t - e);
      function Ji(t, e) {
        if (Tt(t) && Tt(e)) return Ki(t, e);
        if (Xi(t) && Xi(e)) {
          const n = Ki(t.x, e.x),
            r = Ki(t.y, e.y),
            i = Zi(t) && Zi(e) ? Ki(t.z, e.z) : 0;
          return Math.sqrt(Math.pow(n, 2) + Math.pow(r, 2) + Math.pow(i, 2));
        }
      }
      function Yi(t) {
        return t.max - t.min;
      }
      function Qi(t, e, n) {
        return (
          void 0 === e && (e = 0), void 0 === n && (n = 0.01), Ji(t, e) < n
        );
      }
      function to(t, e, n, r) {
        void 0 === r && (r = 0.5),
          (t.origin = r),
          (t.originPoint = j(e.min, e.max, t.origin)),
          (t.scale = Yi(n) / Yi(e)),
          (Qi(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1),
          (t.translate = j(n.min, n.max, t.origin) - t.originPoint),
          (Qi(t.translate) || isNaN(t.translate)) && (t.translate = 0);
      }
      function eo(t, e, n, r) {
        to(t.x, e.x, n.x, null === r || void 0 === r ? void 0 : r.originX),
          to(t.y, e.y, n.y, null === r || void 0 === r ? void 0 : r.originY);
      }
      function no(t, e, n) {
        (t.min = n.min + e.min), (t.max = t.min + Yi(e));
      }
      function ro(t, e, n) {
        (t.min = e.min - n.min), (t.max = t.min + Yi(e));
      }
      function io(t, e, n) {
        ro(t.x, e.x, n.x), ro(t.y, e.y, n.y);
      }
      function oo(t, e, n, r, i) {
        return (
          (t = ti((t -= e), 1 / n, r)), void 0 !== i && (t = ti(t, 1 / i, r)), t
        );
      }
      function ao(t, e, n, r, i) {
        var o = c(n, 3),
          a = o[0],
          s = o[1],
          u = o[2];
        !(function (t, e, n, r, i, o, a) {
          if (
            (void 0 === e && (e = 0),
            void 0 === n && (n = 1),
            void 0 === r && (r = 0.5),
            void 0 === o && (o = t),
            void 0 === a && (a = t),
            nt.test(e) &&
              ((e = parseFloat(e)), (e = j(a.min, a.max, e / 100) - a.min)),
            "number" === typeof e)
          ) {
            var s = j(o.min, o.max, r);
            t === o && (s -= e),
              (t.min = oo(t.min, e, n, s, i)),
              (t.max = oo(t.max, e, n, s, i));
          }
        })(t, e[a], e[s], e[u], e.scale, r, i);
      }
      var so = ["x", "scaleX", "originX"],
        uo = ["y", "scaleY", "originY"];
      function lo(t, e, n, r) {
        ao(
          t.x,
          e,
          so,
          null === n || void 0 === n ? void 0 : n.x,
          null === r || void 0 === r ? void 0 : r.x
        ),
          ao(
            t.y,
            e,
            uo,
            null === n || void 0 === n ? void 0 : n.y,
            null === r || void 0 === r ? void 0 : r.y
          );
      }
      function co(t) {
        return 0 === t.translate && 1 === t.scale;
      }
      function ho(t) {
        return co(t.x) && co(t.y);
      }
      function fo(t, e) {
        return (
          t.x.min === e.x.min &&
          t.x.max === e.x.max &&
          t.y.min === e.y.min &&
          t.y.max === e.y.max
        );
      }
      var po = (function () {
        function t() {
          this.members = [];
        }
        return (
          (t.prototype.add = function (t) {
            nn(this.members, t), t.scheduleRender();
          }),
          (t.prototype.remove = function (t) {
            if (
              (rn(this.members, t),
              t === this.prevLead && (this.prevLead = void 0),
              t === this.lead)
            ) {
              var e = this.members[this.members.length - 1];
              e && this.promote(e);
            }
          }),
          (t.prototype.relegate = function (t) {
            var e,
              n = this.members.findIndex(function (e) {
                return t === e;
              });
            if (0 === n) return !1;
            for (var r = n; r >= 0; r--) {
              var i = this.members[r];
              if (!1 !== i.isPresent) {
                e = i;
                break;
              }
            }
            return !!e && (this.promote(e), !0);
          }),
          (t.prototype.promote = function (t, e) {
            var n,
              r = this.lead;
            t !== r &&
              ((this.prevLead = r),
              (this.lead = t),
              t.show(),
              r &&
                (r.instance && r.scheduleRender(),
                t.scheduleRender(),
                (t.resumeFrom = r),
                e && (t.resumeFrom.preserveOpacity = !0),
                r.snapshot &&
                  ((t.snapshot = r.snapshot),
                  (t.snapshot.latestValues =
                    r.animationValues || r.latestValues),
                  (t.snapshot.isShared = !0)),
                (null === (n = t.root) || void 0 === n
                  ? void 0
                  : n.isUpdating) && (t.isLayoutDirty = !0),
                !1 === t.options.crossfade && r.hide()));
          }),
          (t.prototype.exitAnimationComplete = function () {
            this.members.forEach(function (t) {
              var e, n, r, i, o;
              null === (n = (e = t.options).onExitComplete) ||
                void 0 === n ||
                n.call(e),
                null ===
                  (o =
                    null === (r = t.resumingFrom) || void 0 === r
                      ? void 0
                      : (i = r.options).onExitComplete) ||
                  void 0 === o ||
                  o.call(i);
            });
          }),
          (t.prototype.scheduleRender = function () {
            this.members.forEach(function (t) {
              t.instance && t.scheduleRender(!1);
            });
          }),
          (t.prototype.removeLeadSnapshot = function () {
            this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
          }),
          t
        );
      })();
      function mo(t, e, n) {
        var r = t.x.translate / e.x,
          i = t.y.translate / e.y,
          o = "translate3d(".concat(r, "px, ").concat(i, "px, 0) ");
        if (n) {
          var a = n.rotate,
            s = n.rotateX,
            u = n.rotateY;
          a && (o += "rotate(".concat(a, "deg) ")),
            s && (o += "rotateX(".concat(s, "deg) ")),
            u && (o += "rotateY(".concat(u, "deg) "));
        }
        return "translate3d(0px, 0px, 0) scale(1, 1)" ===
          (o += "scale(".concat(t.x.scale, ", ").concat(t.y.scale, ")"))
          ? "none"
          : o;
      }
      function yo(t) {
        return [t("x"), t("y")];
      }
      var go = function (t, e) {
          return t.depth - e.depth;
        },
        vo = (function () {
          function t() {
            (this.children = []), (this.isDirty = !1);
          }
          return (
            (t.prototype.add = function (t) {
              nn(this.children, t), (this.isDirty = !0);
            }),
            (t.prototype.remove = function (t) {
              rn(this.children, t), (this.isDirty = !0);
            }),
            (t.prototype.forEach = function (t) {
              this.isDirty && this.children.sort(go),
                (this.isDirty = !1),
                this.children.forEach(t);
            }),
            t
          );
        })();
      function bo(t) {
        var e,
          n = wr(t) ? t.get() : t;
        return (
          (e = n),
          Boolean(e && "object" === typeof e && e.mix && e.toValue)
            ? n.toValue()
            : n
        );
      }
      var wo = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
      function xo(t) {
        var e = t.attachResizeListener,
          n = t.defaultParent,
          r = t.measureScroll,
          i = t.resetTransform;
        return (function () {
          function t(t, e, r) {
            var i = this;
            void 0 === e && (e = {}),
              void 0 === r && (r = null === n || void 0 === n ? void 0 : n()),
              (this.children = new Set()),
              (this.options = {}),
              (this.isTreeAnimating = !1),
              (this.isAnimationBlocked = !1),
              (this.isLayoutDirty = !1),
              (this.updateManuallyBlocked = !1),
              (this.updateBlockedByResize = !1),
              (this.isUpdating = !1),
              (this.isSVG = !1),
              (this.needsReset = !1),
              (this.shouldResetTransform = !1),
              (this.treeScale = { x: 1, y: 1 }),
              (this.eventHandlers = new Map()),
              (this.potentialNodes = new Map()),
              (this.checkUpdateFailed = function () {
                i.isUpdating && ((i.isUpdating = !1), i.clearAllSnapshots());
              }),
              (this.updateProjection = function () {
                i.nodes.forEach(So), i.nodes.forEach(Po);
              }),
              (this.hasProjected = !1),
              (this.isVisible = !0),
              (this.animationProgress = 0),
              (this.sharedNodes = new Map()),
              (this.id = t),
              (this.latestValues = e),
              (this.root = r ? r.root || r : this),
              (this.path = r ? h(h([], c(r.path), !1), [r], !1) : []),
              (this.parent = r),
              (this.depth = r ? r.depth + 1 : 0),
              t && this.root.registerPotentialNode(t, this);
            for (var o = 0; o < this.path.length; o++)
              this.path[o].shouldResetTransform = !0;
            this.root === this && (this.nodes = new vo());
          }
          return (
            (t.prototype.addEventListener = function (t, e) {
              return (
                this.eventHandlers.has(t) ||
                  this.eventHandlers.set(t, new on()),
                this.eventHandlers.get(t).add(e)
              );
            }),
            (t.prototype.notifyListeners = function (t) {
              for (var e = [], n = 1; n < arguments.length; n++)
                e[n - 1] = arguments[n];
              var r = this.eventHandlers.get(t);
              null === r || void 0 === r || r.notify.apply(r, h([], c(e), !1));
            }),
            (t.prototype.hasListeners = function (t) {
              return this.eventHandlers.has(t);
            }),
            (t.prototype.registerPotentialNode = function (t, e) {
              this.potentialNodes.set(t, e);
            }),
            (t.prototype.mount = function (t, n) {
              var r,
                i = this;
              if ((void 0 === n && (n = !1), !this.instance)) {
                (this.isSVG = t instanceof SVGElement && "svg" !== t.tagName),
                  (this.instance = t);
                var o = this.options,
                  a = o.layoutId,
                  u = o.layout,
                  l = o.visualElement;
                if (
                  (l && !l.getInstance() && l.mount(t),
                  this.root.nodes.add(this),
                  null === (r = this.parent) ||
                    void 0 === r ||
                    r.children.add(this),
                  this.id && this.root.potentialNodes.delete(this.id),
                  n && (u || a) && (this.isLayoutDirty = !0),
                  e)
                ) {
                  var c,
                    h = function () {
                      return (i.root.updateBlockedByResize = !1);
                    };
                  e(t, function () {
                    (i.root.updateBlockedByResize = !0),
                      clearTimeout(c),
                      (c = window.setTimeout(h, 250)),
                      wo.hasAnimatedSinceResize &&
                        ((wo.hasAnimatedSinceResize = !1), i.nodes.forEach(ko));
                  });
                }
                a && this.root.registerSharedNode(a, this),
                  !1 !== this.options.animate &&
                    l &&
                    (a || u) &&
                    this.addEventListener("didUpdate", function (t) {
                      var e,
                        n,
                        r,
                        o,
                        a,
                        u = t.delta,
                        c = t.hasLayoutChanged,
                        h = t.hasRelativeTargetChanged,
                        f = t.layout;
                      if (i.isTreeAnimationBlocked())
                        return (
                          (i.target = void 0), void (i.relativeTarget = void 0)
                        );
                      var d =
                          null !==
                            (n =
                              null !== (e = i.options.transition) &&
                              void 0 !== e
                                ? e
                                : l.getDefaultTransition()) && void 0 !== n
                            ? n
                            : Lo,
                        p = l.getProps().onLayoutAnimationComplete,
                        m = !i.targetLayout || !fo(i.targetLayout, f) || h,
                        y = !c && h;
                      if (
                        (null === (r = i.resumeFrom) || void 0 === r
                          ? void 0
                          : r.instance) ||
                        y ||
                        (c && (m || !i.currentAnimation))
                      ) {
                        i.resumeFrom &&
                          ((i.resumingFrom = i.resumeFrom),
                          (i.resumingFrom.resumingFrom = void 0)),
                          i.setAnimationOrigin(u, y);
                        var g = s(s({}, Qe(d, "layout")), { onComplete: p });
                        l.shouldReduceMotion && ((g.delay = 0), (g.type = !1)),
                          i.startAnimation(g);
                      } else c || 0 !== i.animationProgress || i.finishAnimation(), i.isLead() && (null === (a = (o = i.options).onExitComplete) || void 0 === a || a.call(o));
                      i.targetLayout = f;
                    });
              }
            }),
            (t.prototype.unmount = function () {
              var t, e;
              this.options.layoutId && this.willUpdate(),
                this.root.nodes.remove(this),
                null === (t = this.getStack()) ||
                  void 0 === t ||
                  t.remove(this),
                null === (e = this.parent) ||
                  void 0 === e ||
                  e.children.delete(this),
                (this.instance = void 0),
                ce.preRender(this.updateProjection);
            }),
            (t.prototype.blockUpdate = function () {
              this.updateManuallyBlocked = !0;
            }),
            (t.prototype.unblockUpdate = function () {
              this.updateManuallyBlocked = !1;
            }),
            (t.prototype.isUpdateBlocked = function () {
              return this.updateManuallyBlocked || this.updateBlockedByResize;
            }),
            (t.prototype.isTreeAnimationBlocked = function () {
              var t;
              return (
                this.isAnimationBlocked ||
                (null === (t = this.parent) || void 0 === t
                  ? void 0
                  : t.isTreeAnimationBlocked()) ||
                !1
              );
            }),
            (t.prototype.startUpdate = function () {
              var t;
              this.isUpdateBlocked() ||
                ((this.isUpdating = !0),
                null === (t = this.nodes) || void 0 === t || t.forEach(Oo));
            }),
            (t.prototype.willUpdate = function (t) {
              var e, n, r;
              if ((void 0 === t && (t = !0), this.root.isUpdateBlocked()))
                null === (n = (e = this.options).onExitComplete) ||
                  void 0 === n ||
                  n.call(e);
              else if (
                (!this.root.isUpdating && this.root.startUpdate(),
                !this.isLayoutDirty)
              ) {
                this.isLayoutDirty = !0;
                for (var i = 0; i < this.path.length; i++) {
                  var o = this.path[i];
                  (o.shouldResetTransform = !0), o.updateScroll();
                }
                var a = this.options,
                  s = a.layoutId,
                  u = a.layout;
                if (void 0 !== s || u) {
                  var l =
                    null === (r = this.options.visualElement) || void 0 === r
                      ? void 0
                      : r.getProps().transformTemplate;
                  (this.prevTransformTemplateValue =
                    null === l || void 0 === l
                      ? void 0
                      : l(this.latestValues, "")),
                    this.updateSnapshot(),
                    t && this.notifyListeners("willUpdate");
                }
              }
            }),
            (t.prototype.didUpdate = function () {
              if (this.isUpdateBlocked())
                return (
                  this.unblockUpdate(),
                  this.clearAllSnapshots(),
                  void this.nodes.forEach(Mo)
                );
              this.isUpdating &&
                ((this.isUpdating = !1),
                this.potentialNodes.size &&
                  (this.potentialNodes.forEach(Bo),
                  this.potentialNodes.clear()),
                this.nodes.forEach(_o),
                this.nodes.forEach(Eo),
                this.nodes.forEach(To),
                this.clearAllSnapshots(),
                he.update(),
                he.preRender(),
                he.render());
            }),
            (t.prototype.clearAllSnapshots = function () {
              this.nodes.forEach(Ao), this.sharedNodes.forEach(Ro);
            }),
            (t.prototype.scheduleUpdateProjection = function () {
              ye.preRender(this.updateProjection, !1, !0);
            }),
            (t.prototype.scheduleCheckAfterUnmount = function () {
              var t = this;
              ye.postRender(function () {
                t.isLayoutDirty
                  ? t.root.didUpdate()
                  : t.root.checkUpdateFailed();
              });
            }),
            (t.prototype.updateSnapshot = function () {
              if (!this.snapshot && this.instance) {
                var t = this.measure(),
                  e = this.removeTransform(this.removeElementScroll(t));
                jo(e),
                  (this.snapshot = {
                    measured: t,
                    layout: e,
                    latestValues: {},
                  });
              }
            }),
            (t.prototype.updateLayout = function () {
              var t;
              if (
                this.instance &&
                (this.updateScroll(),
                (this.options.alwaysMeasureLayout && this.isLead()) ||
                  this.isLayoutDirty)
              ) {
                if (this.resumeFrom && !this.resumeFrom.instance)
                  for (var e = 0; e < this.path.length; e++) {
                    this.path[e].updateScroll();
                  }
                var n = this.measure();
                jo(n);
                var r = this.layout;
                (this.layout = {
                  measured: n,
                  actual: this.removeElementScroll(n),
                }),
                  (this.layoutCorrected = {
                    x: { min: 0, max: 0 },
                    y: { min: 0, max: 0 },
                  }),
                  (this.isLayoutDirty = !1),
                  (this.projectionDelta = void 0),
                  this.notifyListeners("measure", this.layout.actual),
                  null === (t = this.options.visualElement) ||
                    void 0 === t ||
                    t.notifyLayoutMeasure(
                      this.layout.actual,
                      null === r || void 0 === r ? void 0 : r.actual
                    );
              }
            }),
            (t.prototype.updateScroll = function () {
              this.options.layoutScroll &&
                this.instance &&
                (this.scroll = r(this.instance));
            }),
            (t.prototype.resetTransform = function () {
              var t;
              if (i) {
                var e = this.isLayoutDirty || this.shouldResetTransform,
                  n = this.projectionDelta && !ho(this.projectionDelta),
                  r =
                    null === (t = this.options.visualElement) || void 0 === t
                      ? void 0
                      : t.getProps().transformTemplate,
                  o =
                    null === r || void 0 === r
                      ? void 0
                      : r(this.latestValues, ""),
                  a = o !== this.prevTransformTemplateValue;
                e &&
                  (n || Yr(this.latestValues) || a) &&
                  (i(this.instance, o),
                  (this.shouldResetTransform = !1),
                  this.scheduleRender());
              }
            }),
            (t.prototype.measure = function () {
              var t = this.options.visualElement;
              if (!t) return { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              var e = t.measureViewportBox(),
                n = this.root.scroll;
              return n && (ii(e.x, n.x), ii(e.y, n.y)), e;
            }),
            (t.prototype.removeElementScroll = function (t) {
              var e = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Wi(e, t);
              for (var n = 0; n < this.path.length; n++) {
                var r = this.path[n],
                  i = r.scroll,
                  o = r.options;
                r !== this.root &&
                  i &&
                  o.layoutScroll &&
                  (ii(e.x, i.x), ii(e.y, i.y));
              }
              return e;
            }),
            (t.prototype.applyTransform = function (t, e) {
              void 0 === e && (e = !1);
              var n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Wi(n, t);
              for (var r = 0; r < this.path.length; r++) {
                var i = this.path[r];
                !e &&
                  i.options.layoutScroll &&
                  i.scroll &&
                  i !== i.root &&
                  ui(n, { x: -i.scroll.x, y: -i.scroll.y }),
                  Yr(i.latestValues) && ui(n, i.latestValues);
              }
              return Yr(this.latestValues) && ui(n, this.latestValues), n;
            }),
            (t.prototype.removeTransform = function (t) {
              var e,
                n = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              Wi(n, t);
              for (var r = 0; r < this.path.length; r++) {
                var i = this.path[r];
                if (i.instance && Yr(i.latestValues)) {
                  Jr(i.latestValues) && i.updateSnapshot();
                  var o = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
                  Wi(o, i.measure()),
                    lo(
                      n,
                      i.latestValues,
                      null === (e = i.snapshot) || void 0 === e
                        ? void 0
                        : e.layout,
                      o
                    );
                }
              }
              return Yr(this.latestValues) && lo(n, this.latestValues), n;
            }),
            (t.prototype.setTargetDelta = function (t) {
              (this.targetDelta = t), this.root.scheduleUpdateProjection();
            }),
            (t.prototype.setOptions = function (t) {
              var e;
              this.options = s(s(s({}, this.options), t), {
                crossfade: null === (e = t.crossfade) || void 0 === e || e,
              });
            }),
            (t.prototype.clearMeasurements = function () {
              (this.scroll = void 0),
                (this.layout = void 0),
                (this.snapshot = void 0),
                (this.prevTransformTemplateValue = void 0),
                (this.targetDelta = void 0),
                (this.target = void 0),
                (this.isLayoutDirty = !1);
            }),
            (t.prototype.resolveTargetDelta = function () {
              var t,
                e,
                n,
                r,
                i = this.options,
                o = i.layout,
                a = i.layoutId;
              this.layout &&
                (o || a) &&
                (this.targetDelta ||
                  this.relativeTarget ||
                  ((this.relativeParent = this.getClosestProjectingParent()),
                  this.relativeParent &&
                    this.relativeParent.layout &&
                    ((this.relativeTarget = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 },
                    }),
                    (this.relativeTargetOrigin = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 },
                    }),
                    io(
                      this.relativeTargetOrigin,
                      this.layout.actual,
                      this.relativeParent.layout.actual
                    ),
                    Wi(this.relativeTarget, this.relativeTargetOrigin))),
                (this.relativeTarget || this.targetDelta) &&
                  (this.target ||
                    ((this.target = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 },
                    }),
                    (this.targetWithTransforms = {
                      x: { min: 0, max: 0 },
                      y: { min: 0, max: 0 },
                    })),
                  this.relativeTarget &&
                  this.relativeTargetOrigin &&
                  (null === (t = this.relativeParent) || void 0 === t
                    ? void 0
                    : t.target)
                    ? ((e = this.target),
                      (n = this.relativeTarget),
                      (r = this.relativeParent.target),
                      no(e.x, n.x, r.x),
                      no(e.y, n.y, r.y))
                    : this.targetDelta
                    ? (Boolean(this.resumingFrom)
                        ? (this.target = this.applyTransform(
                            this.layout.actual
                          ))
                        : Wi(this.target, this.layout.actual),
                      ri(this.target, this.targetDelta))
                    : Wi(this.target, this.layout.actual),
                  this.attemptToResolveRelativeTarget &&
                    ((this.attemptToResolveRelativeTarget = !1),
                    (this.relativeParent = this.getClosestProjectingParent()),
                    this.relativeParent &&
                      Boolean(this.relativeParent.resumingFrom) ===
                        Boolean(this.resumingFrom) &&
                      !this.relativeParent.options.layoutScroll &&
                      this.relativeParent.target &&
                      ((this.relativeTarget = {
                        x: { min: 0, max: 0 },
                        y: { min: 0, max: 0 },
                      }),
                      (this.relativeTargetOrigin = {
                        x: { min: 0, max: 0 },
                        y: { min: 0, max: 0 },
                      }),
                      io(
                        this.relativeTargetOrigin,
                        this.target,
                        this.relativeParent.target
                      ),
                      Wi(this.relativeTarget, this.relativeTargetOrigin)))));
            }),
            (t.prototype.getClosestProjectingParent = function () {
              if (this.parent && !Yr(this.parent.latestValues))
                return (this.parent.relativeTarget ||
                  this.parent.targetDelta) &&
                  this.parent.layout
                  ? this.parent
                  : this.parent.getClosestProjectingParent();
            }),
            (t.prototype.calcProjection = function () {
              var t,
                e = this.options,
                n = e.layout,
                r = e.layoutId;
              if (
                ((this.isTreeAnimating = Boolean(
                  (null === (t = this.parent) || void 0 === t
                    ? void 0
                    : t.isTreeAnimating) ||
                    this.currentAnimation ||
                    this.pendingAnimation
                )),
                this.isTreeAnimating ||
                  (this.targetDelta = this.relativeTarget = void 0),
                this.layout && (n || r))
              ) {
                var i = this.getLead();
                Wi(this.layoutCorrected, this.layout.actual),
                  (function (t, e, n, r) {
                    var i, o;
                    void 0 === r && (r = !1);
                    var a = n.length;
                    if (a) {
                      var s, u;
                      e.x = e.y = 1;
                      for (var l = 0; l < a; l++)
                        (u = (s = n[l]).projectionDelta),
                          "contents" !==
                            (null ===
                              (o =
                                null === (i = s.instance) || void 0 === i
                                  ? void 0
                                  : i.style) || void 0 === o
                              ? void 0
                              : o.display) &&
                            (r &&
                              s.options.layoutScroll &&
                              s.scroll &&
                              s !== s.root &&
                              ui(t, { x: -s.scroll.x, y: -s.scroll.y }),
                            u &&
                              ((e.x *= u.x.scale),
                              (e.y *= u.y.scale),
                              ri(t, u)),
                            r && Yr(s.latestValues) && ui(t, s.latestValues));
                    }
                  })(
                    this.layoutCorrected,
                    this.treeScale,
                    this.path,
                    Boolean(this.resumingFrom) || this !== i
                  );
                var o = i.target;
                if (o) {
                  this.projectionDelta ||
                    ((this.projectionDelta = {
                      x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                      y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                    }),
                    (this.projectionDeltaWithTransform = {
                      x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                      y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                    }));
                  var a = this.treeScale.x,
                    s = this.treeScale.y,
                    u = this.projectionTransform;
                  eo(
                    this.projectionDelta,
                    this.layoutCorrected,
                    o,
                    this.latestValues
                  ),
                    (this.projectionTransform = mo(
                      this.projectionDelta,
                      this.treeScale
                    )),
                    (this.projectionTransform === u &&
                      this.treeScale.x === a &&
                      this.treeScale.y === s) ||
                      ((this.hasProjected = !0),
                      this.scheduleRender(),
                      this.notifyListeners("projectionUpdate", o));
                }
              }
            }),
            (t.prototype.hide = function () {
              this.isVisible = !1;
            }),
            (t.prototype.show = function () {
              this.isVisible = !0;
            }),
            (t.prototype.scheduleRender = function (t) {
              var e, n, r;
              void 0 === t && (t = !0),
                null === (n = (e = this.options).scheduleRender) ||
                  void 0 === n ||
                  n.call(e),
                t &&
                  (null === (r = this.getStack()) ||
                    void 0 === r ||
                    r.scheduleRender()),
                this.resumingFrom &&
                  !this.resumingFrom.instance &&
                  (this.resumingFrom = void 0);
            }),
            (t.prototype.setAnimationOrigin = function (t, e) {
              var n,
                r = this;
              void 0 === e && (e = !1);
              var i = this.snapshot,
                o =
                  (null === i || void 0 === i ? void 0 : i.latestValues) || {},
                a = s({}, this.latestValues),
                u = {
                  x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                  y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
                };
              (this.relativeTarget = this.relativeTargetOrigin = void 0),
                (this.attemptToResolveRelativeTarget = !e);
              var l = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } },
                c = null === i || void 0 === i ? void 0 : i.isShared,
                h =
                  ((null === (n = this.getStack()) || void 0 === n
                    ? void 0
                    : n.members.length) || 0) <= 1,
                f = Boolean(
                  c &&
                    !h &&
                    !0 === this.options.crossfade &&
                    !this.path.some(Co)
                );
              (this.animationProgress = 0),
                (this.mixTargetDelta = function (e) {
                  var n,
                    i,
                    s,
                    d,
                    p,
                    m = e / 1e3;
                  No(u.x, t.x, m),
                    No(u.y, t.y, m),
                    r.setTargetDelta(u),
                    r.relativeTarget &&
                      r.relativeTargetOrigin &&
                      r.layout &&
                      (null === (n = r.relativeParent) || void 0 === n
                        ? void 0
                        : n.layout) &&
                      (io(l, r.layout.actual, r.relativeParent.layout.actual),
                      (i = r.relativeTarget),
                      (s = r.relativeTargetOrigin),
                      (d = l),
                      (p = m),
                      Io(i.x, s.x, d.x, p),
                      Io(i.y, s.y, d.y, p)),
                    c &&
                      ((r.animationValues = a),
                      (function (t, e, n, r, i, o) {
                        var a, s, u, l;
                        i
                          ? ((t.opacity = j(
                              0,
                              null !== (a = n.opacity) && void 0 !== a ? a : 1,
                              zi(r)
                            )),
                            (t.opacityExit = j(
                              null !== (s = e.opacity) && void 0 !== s ? s : 1,
                              0,
                              $i(r)
                            )))
                          : o &&
                            (t.opacity = j(
                              null !== (u = e.opacity) && void 0 !== u ? u : 1,
                              null !== (l = n.opacity) && void 0 !== l ? l : 1,
                              r
                            ));
                        for (var c = 0; c < Di; c++) {
                          var h = "border".concat(ji[c], "Radius"),
                            f = Gi(e, h),
                            d = Gi(n, h);
                          (void 0 === f && void 0 === d) ||
                            (f || (f = 0),
                            d || (d = 0),
                            0 === f || 0 === d || Vi(f) === Vi(d)
                              ? ((t[h] = Math.max(j(Ui(f), Ui(d), r), 0)),
                                (nt.test(d) || nt.test(f)) && (t[h] += "%"))
                              : (t[h] = d));
                        }
                        (e.rotate || n.rotate) &&
                          (t.rotate = j(e.rotate || 0, n.rotate || 0, r));
                      })(a, o, r.latestValues, m, f, h)),
                    r.root.scheduleUpdateProjection(),
                    r.scheduleRender(),
                    (r.animationProgress = m);
                }),
                this.mixTargetDelta(0);
            }),
            (t.prototype.startAnimation = function (t) {
              var e,
                n,
                r = this;
              null === (e = this.currentAnimation) || void 0 === e || e.stop(),
                this.resumingFrom &&
                  (null === (n = this.resumingFrom.currentAnimation) ||
                    void 0 === n ||
                    n.stop()),
                this.pendingAnimation &&
                  (ce.update(this.pendingAnimation),
                  (this.pendingAnimation = void 0)),
                (this.pendingAnimation = ye.update(function () {
                  (wo.hasAnimatedSinceResize = !0),
                    (r.currentAnimation = (function (t, e, n) {
                      void 0 === n && (n = {});
                      var r = wr(t) ? t : sn(t);
                      return (
                        tn("", r, e, n),
                        {
                          stop: function () {
                            return r.stop();
                          },
                          isAnimating: function () {
                            return r.isAnimating();
                          },
                        }
                      );
                    })(
                      0,
                      1e3,
                      s(s({}, t), {
                        onUpdate: function (e) {
                          var n;
                          r.mixTargetDelta(e),
                            null === (n = t.onUpdate) ||
                              void 0 === n ||
                              n.call(t, e);
                        },
                        onComplete: function () {
                          var e;
                          null === (e = t.onComplete) ||
                            void 0 === e ||
                            e.call(t),
                            r.completeAnimation();
                        },
                      })
                    )),
                    r.resumingFrom &&
                      (r.resumingFrom.currentAnimation = r.currentAnimation),
                    (r.pendingAnimation = void 0);
                }));
            }),
            (t.prototype.completeAnimation = function () {
              var t;
              this.resumingFrom &&
                ((this.resumingFrom.currentAnimation = void 0),
                (this.resumingFrom.preserveOpacity = void 0)),
                null === (t = this.getStack()) ||
                  void 0 === t ||
                  t.exitAnimationComplete(),
                (this.resumingFrom =
                  this.currentAnimation =
                  this.animationValues =
                    void 0),
                this.notifyListeners("animationComplete");
            }),
            (t.prototype.finishAnimation = function () {
              var t;
              this.currentAnimation &&
                (null === (t = this.mixTargetDelta) ||
                  void 0 === t ||
                  t.call(this, 1e3),
                this.currentAnimation.stop()),
                this.completeAnimation();
            }),
            (t.prototype.applyTransformsToTarget = function () {
              var t = this.getLead(),
                e = t.targetWithTransforms,
                n = t.target,
                r = t.layout,
                i = t.latestValues;
              e &&
                n &&
                r &&
                (Wi(e, n),
                ui(e, i),
                eo(
                  this.projectionDeltaWithTransform,
                  this.layoutCorrected,
                  e,
                  i
                ));
            }),
            (t.prototype.registerSharedNode = function (t, e) {
              var n, r, i;
              this.sharedNodes.has(t) || this.sharedNodes.set(t, new po()),
                this.sharedNodes.get(t).add(e),
                e.promote({
                  transition:
                    null === (n = e.options.initialPromotionConfig) ||
                    void 0 === n
                      ? void 0
                      : n.transition,
                  preserveFollowOpacity:
                    null ===
                      (i =
                        null === (r = e.options.initialPromotionConfig) ||
                        void 0 === r
                          ? void 0
                          : r.shouldPreserveFollowOpacity) || void 0 === i
                      ? void 0
                      : i.call(r, e),
                });
            }),
            (t.prototype.isLead = function () {
              var t = this.getStack();
              return !t || t.lead === this;
            }),
            (t.prototype.getLead = function () {
              var t;
              return (
                (this.options.layoutId &&
                  (null === (t = this.getStack()) || void 0 === t
                    ? void 0
                    : t.lead)) ||
                this
              );
            }),
            (t.prototype.getPrevLead = function () {
              var t;
              return this.options.layoutId
                ? null === (t = this.getStack()) || void 0 === t
                  ? void 0
                  : t.prevLead
                : void 0;
            }),
            (t.prototype.getStack = function () {
              var t = this.options.layoutId;
              if (t) return this.root.sharedNodes.get(t);
            }),
            (t.prototype.promote = function (t) {
              var e = void 0 === t ? {} : t,
                n = e.needsReset,
                r = e.transition,
                i = e.preserveFollowOpacity,
                o = this.getStack();
              o && o.promote(this, i),
                n && ((this.projectionDelta = void 0), (this.needsReset = !0)),
                r && this.setOptions({ transition: r });
            }),
            (t.prototype.relegate = function () {
              var t = this.getStack();
              return !!t && t.relegate(this);
            }),
            (t.prototype.resetRotation = function () {
              var t = this.options.visualElement;
              if (t) {
                for (var e = !1, n = {}, r = 0; r < En.length; r++) {
                  var i = "rotate" + En[r];
                  t.getStaticValue(i) &&
                    ((e = !0),
                    (n[i] = t.getStaticValue(i)),
                    t.setStaticValue(i, 0));
                }
                if (e) {
                  for (var i in (null === t || void 0 === t || t.syncRender(),
                  n))
                    t.setStaticValue(i, n[i]);
                  t.scheduleRender();
                }
              }
            }),
            (t.prototype.getProjectionStyles = function (t) {
              var e, n, r, i, o, a;
              void 0 === t && (t = {});
              var s = {};
              if (!this.instance || this.isSVG) return s;
              if (!this.isVisible) return { visibility: "hidden" };
              s.visibility = "";
              var u =
                null === (e = this.options.visualElement) || void 0 === e
                  ? void 0
                  : e.getProps().transformTemplate;
              if (this.needsReset)
                return (
                  (this.needsReset = !1),
                  (s.opacity = ""),
                  (s.pointerEvents = bo(t.pointerEvents) || ""),
                  (s.transform = u ? u(this.latestValues, "") : "none"),
                  s
                );
              var l = this.getLead();
              if (!this.projectionDelta || !this.layout || !l.target) {
                var c = {};
                return (
                  this.options.layoutId &&
                    ((c.opacity =
                      null !== (n = this.latestValues.opacity) && void 0 !== n
                        ? n
                        : 1),
                    (c.pointerEvents = bo(t.pointerEvents) || "")),
                  this.hasProjected &&
                    !Yr(this.latestValues) &&
                    ((c.transform = u ? u({}, "") : "none"),
                    (this.hasProjected = !1)),
                  c
                );
              }
              var h = l.animationValues || l.latestValues;
              this.applyTransformsToTarget(),
                (s.transform = mo(
                  this.projectionDeltaWithTransform,
                  this.treeScale,
                  h
                )),
                u && (s.transform = u(h, s.transform));
              var f = this.projectionDelta,
                d = f.x,
                p = f.y;
              for (var m in ((s.transformOrigin = ""
                .concat(100 * d.origin, "% ")
                .concat(100 * p.origin, "% 0")),
              l.animationValues
                ? (s.opacity =
                    l === this
                      ? null !==
                          (i =
                            null !== (r = h.opacity) && void 0 !== r
                              ? r
                              : this.latestValues.opacity) && void 0 !== i
                        ? i
                        : 1
                      : this.preserveOpacity
                      ? this.latestValues.opacity
                      : h.opacityExit)
                : (s.opacity =
                    l === this
                      ? null !== (o = h.opacity) && void 0 !== o
                        ? o
                        : ""
                      : null !== (a = h.opacityExit) && void 0 !== a
                      ? a
                      : 0),
              Hr))
                if (void 0 !== h[m]) {
                  var y = Hr[m],
                    g = y.correct,
                    v = y.applyTo,
                    b = g(h[m], l);
                  if (v) for (var w = v.length, x = 0; x < w; x++) s[v[x]] = b;
                  else s[m] = b;
                }
              return (
                this.options.layoutId &&
                  (s.pointerEvents =
                    l === this ? bo(t.pointerEvents) || "" : "none"),
                s
              );
            }),
            (t.prototype.clearSnapshot = function () {
              this.resumeFrom = this.snapshot = void 0;
            }),
            (t.prototype.resetTree = function () {
              this.root.nodes.forEach(function (t) {
                var e;
                return null === (e = t.currentAnimation) || void 0 === e
                  ? void 0
                  : e.stop();
              }),
                this.root.nodes.forEach(Mo),
                this.root.sharedNodes.clear();
            }),
            t
          );
        })();
      }
      function Eo(t) {
        t.updateLayout();
      }
      function To(t) {
        var e,
          n,
          r,
          i,
          o =
            null !==
              (n =
                null === (e = t.resumeFrom) || void 0 === e
                  ? void 0
                  : e.snapshot) && void 0 !== n
              ? n
              : t.snapshot;
        if (t.isLead() && t.layout && o && t.hasListeners("didUpdate")) {
          var a = t.layout,
            s = a.actual,
            u = a.measured;
          "size" === t.options.animationType
            ? yo(function (t) {
                var e = o.isShared ? o.measured[t] : o.layout[t],
                  n = Yi(e);
                (e.min = s[t].min), (e.max = e.min + n);
              })
            : "position" === t.options.animationType &&
              yo(function (t) {
                var e = o.isShared ? o.measured[t] : o.layout[t],
                  n = Yi(s[t]);
                e.max = e.min + n;
              });
          var l = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          };
          eo(l, s, o.layout);
          var c = {
            x: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
            y: { translate: 0, scale: 1, origin: 0, originPoint: 0 },
          };
          o.isShared
            ? eo(c, t.applyTransform(u, !0), o.measured)
            : eo(c, s, o.layout);
          var h = !ho(l),
            f = !1;
          if (
            !t.resumeFrom &&
            ((t.relativeParent = t.getClosestProjectingParent()),
            t.relativeParent && !t.relativeParent.resumeFrom)
          ) {
            var d = t.relativeParent,
              p = d.snapshot,
              m = d.layout;
            if (p && m) {
              var y = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              io(y, o.layout, p.layout);
              var g = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } };
              io(g, s, m.actual), fo(y, g) || (f = !0);
            }
          }
          t.notifyListeners("didUpdate", {
            layout: s,
            snapshot: o,
            delta: c,
            layoutDelta: l,
            hasLayoutChanged: h,
            hasRelativeTargetChanged: f,
          });
        } else
          t.isLead() &&
            (null === (i = (r = t.options).onExitComplete) ||
              void 0 === i ||
              i.call(r));
        t.options.transition = void 0;
      }
      function Ao(t) {
        t.clearSnapshot();
      }
      function Mo(t) {
        t.clearMeasurements();
      }
      function _o(t) {
        var e = t.options.visualElement;
        (null === e || void 0 === e
          ? void 0
          : e.getProps().onBeforeLayoutMeasure) &&
          e.notifyBeforeLayoutMeasure(),
          t.resetTransform();
      }
      function ko(t) {
        t.finishAnimation(),
          (t.targetDelta = t.relativeTarget = t.target = void 0);
      }
      function So(t) {
        t.resolveTargetDelta();
      }
      function Po(t) {
        t.calcProjection();
      }
      function Oo(t) {
        t.resetRotation();
      }
      function Ro(t) {
        t.removeLeadSnapshot();
      }
      function No(t, e, n) {
        (t.translate = j(e.translate, 0, n)),
          (t.scale = j(e.scale, 1, n)),
          (t.origin = e.origin),
          (t.originPoint = e.originPoint);
      }
      function Io(t, e, n, r) {
        (t.min = j(e.min, n.min, r)), (t.max = j(e.max, n.max, r));
      }
      function Co(t) {
        return t.animationValues && void 0 !== t.animationValues.opacityExit;
      }
      var Lo = { duration: 0.45, ease: [0.4, 0, 0.1, 1] };
      function Bo(t, e) {
        for (var n = t.root, r = t.path.length - 1; r >= 0; r--)
          if (Boolean(t.path[r].instance)) {
            n = t.path[r];
            break;
          }
        var i = (n && n !== t.root ? n.instance : document).querySelector(
          '[data-projection-id="'.concat(e, '"]')
        );
        i && t.mount(i, !0);
      }
      function Fo(t) {
        (t.min = Math.round(t.min)), (t.max = Math.round(t.max));
      }
      function jo(t) {
        Fo(t.x), Fo(t.y);
      }
      var Do = 1;
      var Uo = (0, f.createContext)({}),
        Vo = (0, f.createContext)({});
      var Go = (function (t) {
        function e() {
          return (null !== t && t.apply(this, arguments)) || this;
        }
        return (
          a(e, t),
          (e.prototype.getSnapshotBeforeUpdate = function () {
            return this.updateProps(), null;
          }),
          (e.prototype.componentDidUpdate = function () {}),
          (e.prototype.updateProps = function () {
            var t = this.props,
              e = t.visualElement,
              n = t.props;
            e && e.setProps(n);
          }),
          (e.prototype.render = function () {
            return this.props.children;
          }),
          e
        );
      })(f.Component);
      function zo(t) {
        var e = t.preloadedFeatures,
          n = t.createVisualElement,
          r = t.projectionNodeConstructor,
          i = t.useRender,
          o = t.useVisualState,
          a = t.Component;
        return (
          e && y(e),
          (0, f.forwardRef)(function (t, e) {
            var u = (function (t) {
              var e,
                n = t.layoutId,
                r =
                  null === (e = (0, f.useContext)(Uo)) || void 0 === e
                    ? void 0
                    : e.id;
              return r && void 0 !== n ? r + "-" + n : n;
            })(t);
            t = s(s({}, t), { layoutId: u });
            var l = (0, f.useContext)(Si),
              c = null,
              h = Bi(t),
              p = l.isStatic
                ? void 0
                : x(function () {
                    if (wo.hasEverUpdated) return Do++;
                  }),
              y = o(t, l.isStatic);
            return (
              !l.isStatic &&
                Jn &&
                ((h.visualElement = Ci(a, y, s(s({}, l), t), n)),
                (function (t, e, n, r) {
                  var i,
                    o = e.layoutId,
                    a = e.layout,
                    s = e.drag,
                    u = e.dragConstraints,
                    l = e.layoutScroll,
                    c = (0, f.useContext)(Vo);
                  r &&
                    n &&
                    !(null === n || void 0 === n ? void 0 : n.projection) &&
                    ((n.projection = new r(
                      t,
                      n.getLatestValues(),
                      null === (i = n.parent) || void 0 === i
                        ? void 0
                        : i.projection
                    )),
                    n.projection.setOptions({
                      layoutId: o,
                      layout: a,
                      alwaysMeasureLayout: Boolean(s) || (u && Li(u)),
                      visualElement: n,
                      scheduleRender: function () {
                        return n.scheduleRender();
                      },
                      animationType: "string" === typeof a ? a : "both",
                      initialPromotionConfig: c,
                      layoutScroll: l,
                    }));
                })(p, t, h.visualElement, r || m.projectionNodeConstructor),
                (c = (function (t, e, n) {
                  var r = [];
                  if (((0, f.useContext)(d), !e)) return null;
                  for (var i = 0; i < ki; i++) {
                    var o = _i[i],
                      a = m[o],
                      u = a.isEnabled,
                      l = a.Component;
                    u(t) &&
                      l &&
                      r.push(
                        f.createElement(
                          l,
                          s({ key: o }, t, { visualElement: e })
                        )
                      );
                  }
                  return r;
                })(t, h.visualElement))),
              f.createElement(
                Go,
                { visualElement: h.visualElement, props: s(s({}, l), t) },
                c,
                f.createElement(
                  Pi.Provider,
                  { value: h },
                  i(
                    a,
                    t,
                    p,
                    (function (t, e, n) {
                      return (0, f.useCallback)(
                        function (r) {
                          var i;
                          r &&
                            (null === (i = t.mount) ||
                              void 0 === i ||
                              i.call(t, r)),
                            e && (r ? e.mount(r) : e.unmount()),
                            n &&
                              ("function" === typeof n
                                ? n(r)
                                : Li(n) && (n.current = r));
                        },
                        [e]
                      );
                    })(y, h.visualElement, e),
                    y,
                    l.isStatic,
                    h.visualElement
                  )
                )
              )
            );
          })
        );
      }
      function $o(t) {
        function e(e, n) {
          return void 0 === n && (n = {}), zo(t(e, n));
        }
        if ("undefined" === typeof Proxy) return e;
        var n = new Map();
        return new Proxy(e, {
          get: function (t, r) {
            return n.has(r) || n.set(r, e(r)), n.get(r);
          },
        });
      }
      var Ho = function () {
        return {
          style: {},
          transform: {},
          transformKeys: [],
          transformOrigin: {},
          vars: {},
        };
      };
      function qo(t, e, n) {
        for (var r in e) wr(e[r]) || qr(r, n) || (t[r] = e[r]);
      }
      function Wo(t, e, n) {
        var r = {};
        return (
          qo(r, t.style || {}, t),
          Object.assign(
            r,
            (function (t, e, n) {
              var r = t.transformTemplate;
              return (0, f.useMemo)(
                function () {
                  var t = {
                    style: {},
                    transform: {},
                    transformKeys: [],
                    transformOrigin: {},
                    vars: {},
                  };
                  Sr(t, e, { enableHardwareAcceleration: !n }, r);
                  var i = t.style;
                  return s(s({}, t.vars), i);
                },
                [e]
              );
            })(t, e, n)
          ),
          t.transformValues && (r = t.transformValues(r)),
          r
        );
      }
      function Xo(t, e, n) {
        var r = {},
          i = Wo(t, e, n);
        return (
          Boolean(t.drag) &&
            !1 !== t.dragListener &&
            ((r.draggable = !1),
            (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = "none"),
            (i.touchAction =
              !0 === t.drag
                ? "none"
                : "pan-".concat("x" === t.drag ? "y" : "x"))),
          (r.style = i),
          r
        );
      }
      var Zo = new Set([
        "initial",
        "animate",
        "exit",
        "style",
        "variants",
        "transition",
        "transformTemplate",
        "transformValues",
        "custom",
        "inherit",
        "layout",
        "layoutId",
        "layoutDependency",
        "onLayoutAnimationComplete",
        "onLayoutMeasure",
        "onBeforeLayoutMeasure",
        "onAnimationStart",
        "onAnimationComplete",
        "onUpdate",
        "onDragStart",
        "onDrag",
        "onDragEnd",
        "onMeasureDragConstraints",
        "onDirectionLock",
        "onDragTransitionEnd",
        "drag",
        "dragControls",
        "dragListener",
        "dragConstraints",
        "dragDirectionLock",
        "dragSnapToOrigin",
        "_dragX",
        "_dragY",
        "dragElastic",
        "dragMomentum",
        "dragPropagation",
        "dragTransition",
        "whileDrag",
        "onPan",
        "onPanStart",
        "onPanEnd",
        "onPanSessionStart",
        "onTap",
        "onTapStart",
        "onTapCancel",
        "onHoverStart",
        "onHoverEnd",
        "whileFocus",
        "whileTap",
        "whileHover",
        "whileInView",
        "onViewportEnter",
        "onViewportLeave",
        "viewport",
        "layoutScroll",
      ]);
      function Ko(t) {
        return Zo.has(t);
      }
      var Jo,
        Yo = function (t) {
          return !Ko(t);
        };
      try {
        (Jo = require("@emotion/is-prop-valid").default) &&
          (Yo = function (t) {
            return t.startsWith("on") ? !Ko(t) : Jo(t);
          });
      } catch (xs) {}
      var Qo = function () {
        return s(
          s(
            {},
            {
              style: {},
              transform: {},
              transformKeys: [],
              transformOrigin: {},
              vars: {},
            }
          ),
          { attrs: {} }
        );
      };
      function ta(t, e) {
        var n = (0, f.useMemo)(
          function () {
            var n = Qo();
            return (
              yi(n, e, { enableHardwareAcceleration: !1 }, t.transformTemplate),
              s(s({}, n.attrs), { style: s({}, n.style) })
            );
          },
          [e]
        );
        if (t.style) {
          var r = {};
          qo(r, t.style, t), (n.style = s(s({}, r), n.style));
        }
        return n;
      }
      function ea(t) {
        void 0 === t && (t = !1);
        return function (e, n, r, i, o, a) {
          var u = o.latestValues,
            l = (Ti(e) ? ta : Xo)(n, u, a),
            c = (function (t, e, n) {
              var r = {};
              for (var i in t)
                (Yo(i) ||
                  (!0 === n && Ko(i)) ||
                  (!e && !Ko(i)) ||
                  (t.draggable && i.startsWith("onDrag"))) &&
                  (r[i] = t[i]);
              return r;
            })(n, "string" === typeof e, t),
            h = s(s(s({}, c), l), { ref: i });
          return r && (h["data-projection-id"] = r), (0, f.createElement)(e, h);
        };
      }
      function na(t, e, n, r) {
        var i = t.scrapeMotionValuesFromProps,
          o = t.createRenderState,
          a = t.onMount,
          s = { latestValues: ia(e, n, r, i), renderState: o() };
        return (
          a &&
            (s.mount = function (t) {
              return a(e, t, s);
            }),
          s
        );
      }
      var ra = function (t) {
        return function (e, n) {
          var r = (0, f.useContext)(Pi),
            i = (0, f.useContext)(w);
          return n
            ? na(t, e, r, i)
            : x(function () {
                return na(t, e, r, i);
              });
        };
      };
      function ia(t, e, n, r) {
        var i = {},
          o = !1 === (null === n || void 0 === n ? void 0 : n.initial),
          a = r(t);
        for (var s in a) i[s] = bo(a[s]);
        var l = t.initial,
          c = t.animate,
          h = gn(t),
          f = vn(t);
        e &&
          f &&
          !h &&
          !1 !== t.inherit &&
          ((null !== l && void 0 !== l) || (l = e.initial),
          (null !== c && void 0 !== c) || (c = e.animate));
        var d = o || !1 === l,
          p = d ? c : l;
        p &&
          "boolean" !== typeof p &&
          !b(p) &&
          (Array.isArray(p) ? p : [p]).forEach(function (e) {
            var n = mn(t, e);
            if (n) {
              var r = n.transitionEnd;
              n.transition;
              var o = u(n, ["transitionEnd", "transition"]);
              for (var a in o) {
                var s = o[a];
                if (Array.isArray(s)) s = s[d ? s.length - 1 : 0];
                null !== s && (i[a] = s);
              }
              for (var a in r) i[a] = r[a];
            }
          });
        return i;
      }
      var oa = {
          useVisualState: ra({
            scrapeMotionValuesFromProps: fi,
            createRenderState: Qo,
            onMount: function (t, e, n) {
              var r = n.renderState,
                i = n.latestValues;
              try {
                r.dimensions =
                  "function" === typeof e.getBBox
                    ? e.getBBox()
                    : e.getBoundingClientRect();
              } catch (o) {
                r.dimensions = { x: 0, y: 0, width: 0, height: 0 };
              }
              yi(r, i, { enableHardwareAcceleration: !1 }, t.transformTemplate),
                wi(e, r);
            },
          }),
        },
        aa = {
          useVisualState: ra({
            scrapeMotionValuesFromProps: Wr,
            createRenderState: Ho,
          }),
        };
      function sa(t, e, n, r, i) {
        var o = e.forwardMotionProps,
          a = void 0 !== o && o,
          u = Ti(t) ? oa : aa;
        return s(s({}, u), {
          preloadedFeatures: n,
          useRender: ea(a),
          createVisualElement: r,
          projectionNodeConstructor: i,
          Component: t,
        });
      }
      var ua = $o(sa);
      function la() {
        var t = (0, f.useRef)(!1);
        return (
          Oi(function () {
            return (
              (t.current = !0),
              function () {
                t.current = !1;
              }
            );
          }, []),
          t
        );
      }
      var ca = function (t) {
        var e = t.children,
          n = t.initial,
          r = t.isPresent,
          i = t.onExitComplete,
          o = t.custom,
          a = t.presenceAffectsLayout,
          s = x(ha),
          u = A(),
          c = (0, f.useMemo)(
            function () {
              return {
                id: u,
                initial: n,
                isPresent: r,
                custom: o,
                onExitComplete: function (t) {
                  var e, n;
                  s.set(t, !0);
                  try {
                    for (
                      var r = l(s.values()), o = r.next();
                      !o.done;
                      o = r.next()
                    ) {
                      if (!o.value) return;
                    }
                  } catch (a) {
                    e = { error: a };
                  } finally {
                    try {
                      o && !o.done && (n = r.return) && n.call(r);
                    } finally {
                      if (e) throw e.error;
                    }
                  }
                  null === i || void 0 === i || i();
                },
                register: function (t) {
                  return (
                    s.set(t, !1),
                    function () {
                      return s.delete(t);
                    }
                  );
                },
              };
            },
            a ? void 0 : [r]
          );
        return (
          (0, f.useMemo)(
            function () {
              s.forEach(function (t, e) {
                return s.set(e, !1);
              });
            },
            [r]
          ),
          f.useEffect(
            function () {
              !r && !s.size && (null === i || void 0 === i || i());
            },
            [r]
          ),
          f.createElement(w.Provider, { value: c }, e)
        );
      };
      function ha() {
        return new Map();
      }
      var fa = function (t) {
        return t.key || "";
      };
      var da = function (t) {
          var e = t.children,
            n = t.custom,
            r = t.initial,
            i = void 0 === r || r,
            o = t.onExitComplete,
            a = t.exitBeforeEnter,
            s = t.presenceAffectsLayout,
            u = void 0 === s || s,
            l = c(
              (function () {
                var t = la(),
                  e = c((0, f.useState)(0), 2),
                  n = e[0],
                  r = e[1],
                  i = (0, f.useCallback)(
                    function () {
                      t.current && r(n + 1);
                    },
                    [n]
                  );
                return [
                  (0, f.useCallback)(
                    function () {
                      return ye.postRender(i);
                    },
                    [i]
                  ),
                  n,
                ];
              })(),
              1
            ),
            d = l[0],
            p = (0, f.useContext)(Uo).forceRender;
          p && (d = p);
          var m = la(),
            y = (function (t) {
              var e = [];
              return (
                f.Children.forEach(t, function (t) {
                  (0, f.isValidElement)(t) && e.push(t);
                }),
                e
              );
            })(e),
            g = y,
            v = new Set(),
            b = (0, f.useRef)(g),
            w = (0, f.useRef)(new Map()).current,
            x = (0, f.useRef)(!0);
          if (
            (Oi(function () {
              (x.current = !1),
                (function (t, e) {
                  t.forEach(function (t) {
                    var n = fa(t);
                    e.set(n, t);
                  });
                })(y, w),
                (b.current = g);
            }),
            cr(function () {
              (x.current = !0), w.clear(), v.clear();
            }),
            x.current)
          )
            return f.createElement(
              f.Fragment,
              null,
              g.map(function (t) {
                return f.createElement(
                  ca,
                  {
                    key: fa(t),
                    isPresent: !0,
                    initial: !!i && void 0,
                    presenceAffectsLayout: u,
                  },
                  t
                );
              })
            );
          g = h([], c(g), !1);
          for (
            var E = b.current.map(fa), T = y.map(fa), A = E.length, M = 0;
            M < A;
            M++
          ) {
            var _ = E[M];
            -1 === T.indexOf(_) && v.add(_);
          }
          return (
            a && v.size && (g = []),
            v.forEach(function (t) {
              if (-1 === T.indexOf(t)) {
                var e = w.get(t);
                if (e) {
                  var r = E.indexOf(t);
                  g.splice(
                    r,
                    0,
                    f.createElement(
                      ca,
                      {
                        key: fa(e),
                        isPresent: !1,
                        onExitComplete: function () {
                          w.delete(t), v.delete(t);
                          var e = b.current.findIndex(function (e) {
                            return e.key === t;
                          });
                          if ((b.current.splice(e, 1), !v.size)) {
                            if (((b.current = y), !1 === m.current)) return;
                            d(), o && o();
                          }
                        },
                        custom: n,
                        presenceAffectsLayout: u,
                      },
                      e
                    )
                  );
                }
              }
            }),
            (g = g.map(function (t) {
              var e = t.key;
              return v.has(e)
                ? t
                : f.createElement(
                    ca,
                    { key: fa(t), isPresent: !0, presenceAffectsLayout: u },
                    t
                  );
            })),
            f.createElement(
              f.Fragment,
              null,
              v.size
                ? g
                : g.map(function (t) {
                    return (0, f.cloneElement)(t);
                  })
            )
          );
        },
        pa = n(1664),
        ma = n(1163),
        ya = n(7055),
        ga = function () {
          return (0, r.jsx)("svg", {
            className: "ml-[6px]",
            width: "7",
            height: "7",
            viewBox: "0 0 7 7",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, r.jsx)("path", {
              d: "M6.5 0.5H0M6.5 0.5V7M6.5 0.5L0.382353 6.61765",
              stroke: "#E5E5E5",
              strokeWidth: "0.7",
            }),
          });
        },
        va = function () {
          return (0, r.jsx)("svg", {
            className: "ml-[6px]",
            width: "7",
            height: "8",
            viewBox: "0 0 7 8",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: (0, r.jsx)("path", {
              d: "M0.5 7H6.5M3.5 0V5.6M3.5 5.6L1 3M3.5 5.6L6 3",
              stroke: "#E5E5E5",
              strokeWidth: "0.7",
            }),
          });
        };
      function ba() {
        return (0, r.jsx)("svg", {
          fill: "none",
          height: "11",
          viewBox: "0 0 14 11",
          width: "14",
          xmlns: "http://www.w3.org/2000/svg",
          children: (0, r.jsx)("path", {
            d: "m13.1613 1.49865c-.4842.21497-1.0047.35974-1.5508.425.5577-.33397.986-.86316 1.1872-1.493809-.5215.309291-1.0995.534129-1.7148.655319-.4919-.524803-1.19438-.852738-1.9709-.852738-1.74332 0-3.02435 1.626518-2.63061 3.314998-2.24345-.11242-4.233-1.18726-5.565035-2.820901-.707419 1.213581-.366871 2.801161.835195 3.605101-.442-.01426-.858776-.13546-1.222356-.33781-.029613 1.25087.866996 2.42113 2.165576 2.68161-.38003.1031-.79625.12723-1.21961.04607.34329 1.07264 1.34026 1.853 2.52258 1.87493-1.13516.89003-2.56535 1.28762-3.99774 1.11871 1.19494.76607 2.61471 1.21307 4.13923 1.21307 5.01335 0 7.84577-4.23413 7.67467-8.03171.5276-.38113.9855-.85658 1.3474-1.39784z",
            fill: "#8a8a8a",
          }),
        });
      }
      function wa() {
        return (0, r.jsxs)("svg", {
          fill: "none",
          height: "14",
          viewBox: "0 0 14 14",
          width: "14",
          xmlns: "http://www.w3.org/2000/svg",
          xmlnsXlink: "http://www.w3.org/1999/xlink",
          children: [
            (0, r.jsx)("clipPath", {
              id: "a",
              children: (0, r.jsx)("path", {
                d: "m0 0h13.1613v13.1613h-13.1613z",
              }),
            }),
            (0, r.jsx)("g", {
              clipPath: "url(#a)",
              children: (0, r.jsx)("path", {
                d: "m6.58071 1.18616c1.75703 0 1.96542.00658 2.65967.03839 1.78332.08116 2.61632.92732 2.69752 2.69751.0318.69371.0378.9021.0378 2.65913 0 1.75758-.0065 1.96542-.0378 2.65913-.0817 1.76858-.9125 2.61638-2.69752 2.69748-.69425.0318-.90154.0384-2.65967.0384-1.75704 0-1.96542-.0066-2.65913-.0384-1.78774-.0817-2.61636-.9317-2.69752-2.69803-.03181-.6937-.03839-.90154-.03839-2.65912 0-1.75704.00713-1.96488.03839-2.65913.08171-1.76965.91252-2.61636 2.69752-2.69752.69426-.03126.90209-.03784 2.65913-.03784zm0-1.18616c-1.7872 0-2.01094.00767742-2.71287.0394839-2.38988.1096771-3.718069 1.4356761-3.8277467 3.8277461-.03235485.70248-.04003226.92622-.04003226 2.71342 0 1.78719.00767741 2.01148.03948386 2.71341.1096771 2.38984 1.4356751 3.71804 3.8277451 3.82774.70248.0318.92622.0395 2.71342.0395 1.78719 0 2.01148-.0077 2.71342-.0395 2.38767-.1097 3.71917-1.4357 3.82717-3.82774.0324-.70193.0401-.92622.0401-2.71341 0-1.7872-.0077-2.01094-.0395-2.71288-.1075-2.38767-1.4352-3.71806-3.82723-3.8277377-.70248-.03235488-.92677-.0400323-2.71396-.0400323zm0 3.20148c-1.86617 0-3.37916 1.513-3.37916 3.37917 0 1.86616 1.51299 3.3797 3.37916 3.3797 1.86616 0 3.37916-1.51299 3.37916-3.3797 0-1.86617-1.513-3.37917-3.37916-3.37917zm0 5.57271c-1.21139 0-2.19355-.98161-2.19355-2.19354 0-1.21139.98216-2.19355 2.19355-2.19355 1.21138 0 2.19354.98216 2.19354 2.19355 0 1.21193-.98216 2.19354-2.19354 2.19354zm3.51299-6.49564c-.43654 0-.79025.35371-.79025.78968 0 .43596.35371.78967.79025.78967.4359 0 .7891-.35371.7891-.78967 0-.43597-.3532-.78968-.7891-.78968z",
                fill: "#8a8a8a",
              }),
            }),
          ],
        });
      }
      function xa(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function Ea(t) {
        var e = t.items;
        return (0, r.jsx)("ul", {
          className: "flex overflow-hidden",
          children: e.map(function (t) {
            return (0, r.jsx)(
              Ta,
              (function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var n = null != arguments[e] ? arguments[e] : {},
                    r = Object.keys(n);
                  "function" === typeof Object.getOwnPropertySymbols &&
                    (r = r.concat(
                      Object.getOwnPropertySymbols(n).filter(function (t) {
                        return Object.getOwnPropertyDescriptor(n, t).enumerable;
                      })
                    )),
                    r.forEach(function (e) {
                      xa(t, e, n[e]);
                    });
                }
                return t;
              })({}, t),
              t.href
            );
          }),
        });
      }
      function Ta(t) {
        var e = t.href,
          n = t.label,
          i = e === (0, ma.useRouter)().pathname,
          o = e.startsWith("http"),
          a = e.endsWith(".zip");
        return (0, r.jsx)("li", {
          className: (0, ya.A)(
            "tick group relative flex h-nav text-xs uppercase hover:before:h-[12px]",
            i && "before:h-[12px]"
          ),
          children: (0, r.jsx)(pa.default, {
            href: e,
            scroll: !1,
            children: (0, r.jsxs)("a", {
              className: "-ml-px flex items-center pr-lg",
              target: o ? "_blank" : "_self",
              rel: o ? "noopener noreferrer" : "",
              children: [
                (0, r.jsx)("span", { children: n }),
                " ",
                o && (0, r.jsx)(ga, {}),
                " ",
                a && (0, r.jsx)(va, {}),
              ],
            }),
          }),
        });
      }
      var Aa = (function () {
        function t(t, e, n) {
          var r = this,
            i = (void 0 === n ? {} : n).transformPagePoint;
          if (
            ((this.startEvent = null),
            (this.lastMoveEvent = null),
            (this.lastMoveEventInfo = null),
            (this.handlers = {}),
            (this.updatePoint = function () {
              if (r.lastMoveEvent && r.lastMoveEventInfo) {
                var t = ka(r.lastMoveEventInfo, r.history),
                  e = null !== r.startEvent,
                  n = Ji(t.offset, { x: 0, y: 0 }) >= 3;
                if (e || n) {
                  var i = t.point,
                    o = me().timestamp;
                  r.history.push(s(s({}, i), { timestamp: o }));
                  var a = r.handlers,
                    u = a.onStart,
                    l = a.onMove;
                  e ||
                    (u && u(r.lastMoveEvent, t),
                    (r.startEvent = r.lastMoveEvent)),
                    l && l(r.lastMoveEvent, t);
                }
              }
            }),
            (this.handlePointerMove = function (t, e) {
              (r.lastMoveEvent = t),
                (r.lastMoveEventInfo = Ma(e, r.transformPagePoint)),
                $n(t) && 0 === t.buttons
                  ? r.handlePointerUp(t, e)
                  : ye.update(r.updatePoint, !0);
            }),
            (this.handlePointerUp = function (t, e) {
              r.end();
              var n = r.handlers,
                i = n.onEnd,
                o = n.onSessionEnd,
                a = ka(Ma(e, r.transformPagePoint), r.history);
              r.startEvent && i && i(t, a), o && o(t, a);
            }),
            !(Hn(t) && t.touches.length > 1))
          ) {
            (this.handlers = e), (this.transformPagePoint = i);
            var o = Ma(Zn(t), this.transformPagePoint),
              a = o.point,
              u = me().timestamp;
            this.history = [s(s({}, a), { timestamp: u })];
            var l = e.onSessionStart;
            l && l(t, ka(o, this.history)),
              (this.removeListeners = Mt(
                er(window, "pointermove", this.handlePointerMove),
                er(window, "pointerup", this.handlePointerUp),
                er(window, "pointercancel", this.handlePointerUp)
              ));
          }
        }
        return (
          (t.prototype.updateHandlers = function (t) {
            this.handlers = t;
          }),
          (t.prototype.end = function () {
            this.removeListeners && this.removeListeners(),
              ce.update(this.updatePoint);
          }),
          t
        );
      })();
      function Ma(t, e) {
        return e ? { point: e(t.point) } : t;
      }
      function _a(t, e) {
        return { x: t.x - e.x, y: t.y - e.y };
      }
      function ka(t, e) {
        var n = t.point;
        return {
          point: n,
          delta: _a(n, Pa(e)),
          offset: _a(n, Sa(e)),
          velocity: Oa(e, 0.1),
        };
      }
      function Sa(t) {
        return t[0];
      }
      function Pa(t) {
        return t[t.length - 1];
      }
      function Oa(t, e) {
        if (t.length < 2) return { x: 0, y: 0 };
        for (
          var n = t.length - 1, r = null, i = Pa(t);
          n >= 0 && ((r = t[n]), !(i.timestamp - r.timestamp > xe(e)));

        )
          n--;
        if (!r) return { x: 0, y: 0 };
        var o = (i.timestamp - r.timestamp) / 1e3;
        if (0 === o) return { x: 0, y: 0 };
        var a = { x: (i.x - r.x) / o, y: (i.y - r.y) / o };
        return a.x === 1 / 0 && (a.x = 0), a.y === 1 / 0 && (a.y = 0), a;
      }
      function Ra(t, e, n) {
        return {
          min: void 0 !== e ? t.min + e : void 0,
          max: void 0 !== n ? t.max + n - (t.max - t.min) : void 0,
        };
      }
      function Na(t, e) {
        var n,
          r = e.min - t.min,
          i = e.max - t.max;
        return (
          e.max - e.min < t.max - t.min &&
            ((r = (n = c([i, r], 2))[0]), (i = n[1])),
          { min: r, max: i }
        );
      }
      var Ia = 0.35;
      function Ca(t, e, n) {
        return { min: La(t, e), max: La(t, n) };
      }
      function La(t, e) {
        var n;
        return "number" === typeof t
          ? t
          : null !== (n = t[e]) && void 0 !== n
          ? n
          : 0;
      }
      var Ba = new WeakMap(),
        Fa = (function () {
          function t(t) {
            (this.openGlobalLock = null),
              (this.isDragging = !1),
              (this.currentDirection = null),
              (this.originPoint = { x: 0, y: 0 }),
              (this.constraints = !1),
              (this.hasMutatedConstraints = !1),
              (this.elastic = { x: { min: 0, max: 0 }, y: { min: 0, max: 0 } }),
              (this.visualElement = t);
          }
          return (
            (t.prototype.start = function (t, e) {
              var n = this,
                r = (void 0 === e ? {} : e).snapToCursor,
                i = void 0 !== r && r;
              if (!1 !== this.visualElement.isPresent) {
                this.panSession = new Aa(
                  t,
                  {
                    onSessionStart: function (t) {
                      n.stopAnimation(),
                        i && n.snapToCursor(Zn(t, "page").point);
                    },
                    onStart: function (t, e) {
                      var r,
                        i = n.getProps(),
                        o = i.drag,
                        a = i.dragPropagation,
                        s = i.onDragStart;
                      (!o ||
                        a ||
                        (n.openGlobalLock && n.openGlobalLock(),
                        (n.openGlobalLock = ar(o)),
                        n.openGlobalLock)) &&
                        ((n.isDragging = !0),
                        (n.currentDirection = null),
                        n.resolveConstraints(),
                        n.visualElement.projection &&
                          ((n.visualElement.projection.isAnimationBlocked = !0),
                          (n.visualElement.projection.target = void 0)),
                        yo(function (t) {
                          var e,
                            r,
                            i = n.getAxisMotionValue(t).get() || 0;
                          if (nt.test(i)) {
                            var o =
                              null ===
                                (r =
                                  null === (e = n.visualElement.projection) ||
                                  void 0 === e
                                    ? void 0
                                    : e.layout) || void 0 === r
                                ? void 0
                                : r.actual[t];
                            if (o) i = Yi(o) * (parseFloat(i) / 100);
                          }
                          n.originPoint[t] = i;
                        }),
                        null === s || void 0 === s || s(t, e),
                        null === (r = n.visualElement.animationState) ||
                          void 0 === r ||
                          r.setActive(kn.Drag, !0));
                    },
                    onMove: function (t, e) {
                      var r = n.getProps(),
                        i = r.dragPropagation,
                        o = r.dragDirectionLock,
                        a = r.onDirectionLock,
                        s = r.onDrag;
                      if (i || n.openGlobalLock) {
                        var u = e.offset;
                        if (o && null === n.currentDirection)
                          return (
                            (n.currentDirection = (function (t, e) {
                              void 0 === e && (e = 10);
                              var n = null;
                              Math.abs(t.y) > e
                                ? (n = "y")
                                : Math.abs(t.x) > e && (n = "x");
                              return n;
                            })(u)),
                            void (
                              null !== n.currentDirection &&
                              (null === a ||
                                void 0 === a ||
                                a(n.currentDirection))
                            )
                          );
                        n.updateAxis("x", e.point, u),
                          n.updateAxis("y", e.point, u),
                          n.visualElement.syncRender(),
                          null === s || void 0 === s || s(t, e);
                      }
                    },
                    onSessionEnd: function (t, e) {
                      return n.stop(t, e);
                    },
                  },
                  {
                    transformPagePoint:
                      this.visualElement.getTransformPagePoint(),
                  }
                );
              }
            }),
            (t.prototype.stop = function (t, e) {
              var n = this.isDragging;
              if ((this.cancel(), n)) {
                var r = e.velocity;
                this.startAnimation(r);
                var i = this.getProps().onDragEnd;
                null === i || void 0 === i || i(t, e);
              }
            }),
            (t.prototype.cancel = function () {
              var t, e;
              (this.isDragging = !1),
                this.visualElement.projection &&
                  (this.visualElement.projection.isAnimationBlocked = !1),
                null === (t = this.panSession) || void 0 === t || t.end(),
                (this.panSession = void 0),
                !this.getProps().dragPropagation &&
                  this.openGlobalLock &&
                  (this.openGlobalLock(), (this.openGlobalLock = null)),
                null === (e = this.visualElement.animationState) ||
                  void 0 === e ||
                  e.setActive(kn.Drag, !1);
            }),
            (t.prototype.updateAxis = function (t, e, n) {
              var r = this.getProps().drag;
              if (n && ja(t, r, this.currentDirection)) {
                var i = this.getAxisMotionValue(t),
                  o = this.originPoint[t] + n[t];
                this.constraints &&
                  this.constraints[t] &&
                  (o = (function (t, e, n) {
                    var r = e.min,
                      i = e.max;
                    return (
                      void 0 !== r && t < r
                        ? (t = n ? j(r, t, n.min) : Math.max(t, r))
                        : void 0 !== i &&
                          t > i &&
                          (t = n ? j(i, t, n.max) : Math.min(t, i)),
                      t
                    );
                  })(o, this.constraints[t], this.elastic[t])),
                  i.set(o);
              }
            }),
            (t.prototype.resolveConstraints = function () {
              var t = this,
                e = this.getProps(),
                n = e.dragConstraints,
                r = e.dragElastic,
                i = (this.visualElement.projection || {}).layout,
                o = this.constraints;
              n && Li(n)
                ? this.constraints ||
                  (this.constraints = this.resolveRefConstraints())
                : (this.constraints =
                    !(!n || !i) &&
                    (function (t, e) {
                      var n = e.top,
                        r = e.left,
                        i = e.bottom,
                        o = e.right;
                      return { x: Ra(t.x, r, o), y: Ra(t.y, n, i) };
                    })(i.actual, n)),
                (this.elastic = (function (t) {
                  return (
                    void 0 === t && (t = Ia),
                    !1 === t ? (t = 0) : !0 === t && (t = Ia),
                    { x: Ca(t, "left", "right"), y: Ca(t, "top", "bottom") }
                  );
                })(r)),
                o !== this.constraints &&
                  i &&
                  this.constraints &&
                  !this.hasMutatedConstraints &&
                  yo(function (e) {
                    t.getAxisMotionValue(e) &&
                      (t.constraints[e] = (function (t, e) {
                        var n = {};
                        return (
                          void 0 !== e.min && (n.min = e.min - t.min),
                          void 0 !== e.max && (n.max = e.max - t.min),
                          n
                        );
                      })(i.actual[e], t.constraints[e]));
                  });
            }),
            (t.prototype.resolveRefConstraints = function () {
              var t = this.getProps(),
                e = t.dragConstraints,
                n = t.onMeasureDragConstraints;
              if (!e || !Li(e)) return !1;
              var r = e.current,
                i = this.visualElement.projection;
              if (!i || !i.layout) return !1;
              var o = (function (t, e, n) {
                  var r = li(t, n),
                    i = e.scroll;
                  return i && (ii(r.x, i.x), ii(r.y, i.y)), r;
                })(r, i.root, this.visualElement.getTransformPagePoint()),
                a = (function (t, e) {
                  return { x: Na(t.x, e.x), y: Na(t.y, e.y) };
                })(i.layout.actual, o);
              if (n) {
                var s = n(
                  (function (t) {
                    var e = t.x,
                      n = t.y;
                    return {
                      top: n.min,
                      right: e.max,
                      bottom: n.max,
                      left: e.min,
                    };
                  })(a)
                );
                (this.hasMutatedConstraints = !!s), s && (a = Zr(s));
              }
              return a;
            }),
            (t.prototype.startAnimation = function (t) {
              var e = this,
                n = this.getProps(),
                r = n.drag,
                i = n.dragMomentum,
                o = n.dragElastic,
                a = n.dragTransition,
                u = n.dragSnapToOrigin,
                l = n.onDragTransitionEnd,
                c = this.constraints || {},
                h = yo(function (n) {
                  var l;
                  if (ja(n, r, e.currentDirection)) {
                    var h =
                      null !==
                        (l = null === c || void 0 === c ? void 0 : c[n]) &&
                      void 0 !== l
                        ? l
                        : {};
                    u && (h = { min: 0, max: 0 });
                    var f = o ? 200 : 1e6,
                      d = o ? 40 : 1e7,
                      p = s(
                        s(
                          {
                            type: "inertia",
                            velocity: i ? t[n] : 0,
                            bounceStiffness: f,
                            bounceDamping: d,
                            timeConstant: 750,
                            restDelta: 1,
                            restSpeed: 10,
                          },
                          a
                        ),
                        h
                      );
                    return e.startAxisValueAnimation(n, p);
                  }
                });
              return Promise.all(h).then(l);
            }),
            (t.prototype.startAxisValueAnimation = function (t, e) {
              return tn(t, this.getAxisMotionValue(t), 0, e);
            }),
            (t.prototype.stopAnimation = function () {
              var t = this;
              yo(function (e) {
                return t.getAxisMotionValue(e).stop();
              });
            }),
            (t.prototype.getAxisMotionValue = function (t) {
              var e,
                n,
                r = "_drag" + t.toUpperCase(),
                i = this.visualElement.getProps()[r];
              return (
                i ||
                this.visualElement.getValue(
                  t,
                  null !==
                    (n =
                      null === (e = this.visualElement.getProps().initial) ||
                      void 0 === e
                        ? void 0
                        : e[t]) && void 0 !== n
                    ? n
                    : 0
                )
              );
            }),
            (t.prototype.snapToCursor = function (t) {
              var e = this;
              yo(function (n) {
                if (ja(n, e.getProps().drag, e.currentDirection)) {
                  var r = e.visualElement.projection,
                    i = e.getAxisMotionValue(n);
                  if (r && r.layout) {
                    var o = r.layout.actual[n],
                      a = o.min,
                      s = o.max;
                    i.set(t[n] - j(a, s, 0.5));
                  }
                }
              });
            }),
            (t.prototype.scalePositionWithinConstraints = function () {
              var t,
                e = this,
                n = this.getProps(),
                r = n.drag,
                i = n.dragConstraints,
                o = this.visualElement.projection;
              if (Li(i) && o && this.constraints) {
                this.stopAnimation();
                var a = { x: 0, y: 0 };
                yo(function (t) {
                  var n = e.getAxisMotionValue(t);
                  if (n) {
                    var r = n.get();
                    a[t] = (function (t, e) {
                      var n = 0.5,
                        r = Yi(t),
                        i = Yi(e);
                      return (
                        i > r
                          ? (n = F(e.min, e.max - r, t.min))
                          : r > i && (n = F(t.min, t.max - i, e.min)),
                        S(0, 1, n)
                      );
                    })({ min: r, max: r }, e.constraints[t]);
                  }
                });
                var s = this.visualElement.getProps().transformTemplate;
                (this.visualElement.getInstance().style.transform = s
                  ? s({}, "")
                  : "none"),
                  null === (t = o.root) || void 0 === t || t.updateScroll(),
                  o.updateLayout(),
                  this.resolveConstraints(),
                  yo(function (t) {
                    if (ja(t, r, null)) {
                      var n = e.getAxisMotionValue(t),
                        i = e.constraints[t],
                        o = i.min,
                        s = i.max;
                      n.set(j(o, s, a[t]));
                    }
                  });
              }
            }),
            (t.prototype.addListeners = function () {
              var t,
                e = this;
              Ba.set(this.visualElement, this);
              var n = er(
                  this.visualElement.getInstance(),
                  "pointerdown",
                  function (t) {
                    var n = e.getProps(),
                      r = n.drag,
                      i = n.dragListener;
                    r && (void 0 === i || i) && e.start(t);
                  }
                ),
                r = function () {
                  Li(e.getProps().dragConstraints) &&
                    (e.constraints = e.resolveRefConstraints());
                },
                i = this.visualElement.projection,
                o = i.addEventListener("measure", r);
              i &&
                !i.layout &&
                (null === (t = i.root) || void 0 === t || t.updateScroll(),
                i.updateLayout()),
                r();
              var a = Gn(window, "resize", function () {
                e.scalePositionWithinConstraints();
              });
              return (
                i.addEventListener("didUpdate", function (t) {
                  var n = t.delta,
                    r = t.hasLayoutChanged;
                  e.isDragging &&
                    r &&
                    (yo(function (t) {
                      var r = e.getAxisMotionValue(t);
                      r &&
                        ((e.originPoint[t] += n[t].translate),
                        r.set(r.get() + n[t].translate));
                    }),
                    e.visualElement.syncRender());
                }),
                function () {
                  a(), n(), o();
                }
              );
            }),
            (t.prototype.getProps = function () {
              var t = this.visualElement.getProps(),
                e = t.drag,
                n = void 0 !== e && e,
                r = t.dragDirectionLock,
                i = void 0 !== r && r,
                o = t.dragPropagation,
                a = void 0 !== o && o,
                u = t.dragConstraints,
                l = void 0 !== u && u,
                c = t.dragElastic,
                h = void 0 === c ? Ia : c,
                f = t.dragMomentum,
                d = void 0 === f || f;
              return s(s({}, t), {
                drag: n,
                dragDirectionLock: i,
                dragPropagation: a,
                dragConstraints: l,
                dragElastic: h,
                dragMomentum: d,
              });
            }),
            t
          );
        })();
      function ja(t, e, n) {
        return (!0 === e || e === t) && (null === n || n === t);
      }
      var Da = {
        pan: Un(function (t) {
          var e = t.onPan,
            n = t.onPanStart,
            r = t.onPanEnd,
            i = t.onPanSessionStart,
            o = t.visualElement,
            a = e || n || r || i,
            s = (0, f.useRef)(null),
            u = (0, f.useContext)(Si).transformPagePoint,
            l = {
              onSessionStart: i,
              onStart: n,
              onMove: e,
              onEnd: function (t, e) {
                (s.current = null), r && r(t, e);
              },
            };
          (0, f.useEffect)(function () {
            null !== s.current && s.current.updateHandlers(l);
          }),
            nr(
              o,
              "pointerdown",
              a &&
                function (t) {
                  s.current = new Aa(t, l, { transformPagePoint: u });
                }
            ),
            cr(function () {
              return s.current && s.current.end();
            });
        }),
        drag: Un(function (t) {
          var e = t.dragControls,
            n = t.visualElement,
            r = x(function () {
              return new Fa(n);
            });
          (0, f.useEffect)(
            function () {
              return e && e.subscribe(r);
            },
            [r, e]
          ),
            (0, f.useEffect)(
              function () {
                return r.addListeners();
              },
              [r]
            );
        }),
      };
      function Ua(t, e) {
        return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
      }
      var Va = {
          correct: function (t, e) {
            if (!e.target) return t;
            if ("string" === typeof t) {
              if (!rt.test(t)) return t;
              t = parseFloat(t);
            }
            var n = Ua(t, e.target.x),
              r = Ua(t, e.target.y);
            return "".concat(n, "% ").concat(r, "%");
          },
        },
        Ga = "_$css",
        za = {
          correct: function (t, e) {
            var n = e.treeScale,
              r = e.projectionDelta,
              i = t,
              o = t.includes("var("),
              a = [];
            o &&
              (t = t.replace(Or, function (t) {
                return a.push(t), Ga;
              }));
            var s = Et.parse(t);
            if (s.length > 5) return i;
            var u = Et.createTransformer(t),
              l = "number" !== typeof s[0] ? 1 : 0,
              c = r.x.scale * n.x,
              h = r.y.scale * n.y;
            (s[0 + l] /= c), (s[1 + l] /= h);
            var f = j(c, h, 0.5);
            "number" === typeof s[2 + l] && (s[2 + l] /= f),
              "number" === typeof s[3 + l] && (s[3 + l] /= f);
            var d = u(s);
            if (o) {
              var p = 0;
              d = d.replace(Ga, function () {
                var t = a[p];
                return p++, t;
              });
            }
            return d;
          },
        },
        $a = (function (t) {
          function e() {
            return (null !== t && t.apply(this, arguments)) || this;
          }
          return (
            a(e, t),
            (e.prototype.componentDidMount = function () {
              var t,
                e = this,
                n = this.props,
                r = n.visualElement,
                i = n.layoutGroup,
                o = n.switchLayoutGroup,
                a = n.layoutId,
                u = r.projection;
              (t = Ha),
                Object.assign(Hr, t),
                u &&
                  ((null === i || void 0 === i ? void 0 : i.group) &&
                    i.group.add(u),
                  (null === o || void 0 === o ? void 0 : o.register) &&
                    a &&
                    o.register(u),
                  u.root.didUpdate(),
                  u.addEventListener("animationComplete", function () {
                    e.safeToRemove();
                  }),
                  u.setOptions(
                    s(s({}, u.options), {
                      onExitComplete: function () {
                        return e.safeToRemove();
                      },
                    })
                  )),
                (wo.hasEverUpdated = !0);
            }),
            (e.prototype.getSnapshotBeforeUpdate = function (t) {
              var e = this,
                n = this.props,
                r = n.layoutDependency,
                i = n.visualElement,
                o = n.drag,
                a = n.isPresent,
                s = i.projection;
              return s
                ? ((s.isPresent = a),
                  o || t.layoutDependency !== r || void 0 === r
                    ? s.willUpdate()
                    : this.safeToRemove(),
                  t.isPresent !== a &&
                    (a
                      ? s.promote()
                      : s.relegate() ||
                        ye.postRender(function () {
                          var t;
                          (null === (t = s.getStack()) || void 0 === t
                            ? void 0
                            : t.members.length) || e.safeToRemove();
                        })),
                  null)
                : null;
            }),
            (e.prototype.componentDidUpdate = function () {
              var t = this.props.visualElement.projection;
              t &&
                (t.root.didUpdate(),
                !t.currentAnimation && t.isLead() && this.safeToRemove());
            }),
            (e.prototype.componentWillUnmount = function () {
              var t = this.props,
                e = t.visualElement,
                n = t.layoutGroup,
                r = t.switchLayoutGroup,
                i = e.projection;
              i &&
                (i.scheduleCheckAfterUnmount(),
                (null === n || void 0 === n ? void 0 : n.group) &&
                  n.group.remove(i),
                (null === r || void 0 === r ? void 0 : r.deregister) &&
                  r.deregister(i));
            }),
            (e.prototype.safeToRemove = function () {
              var t = this.props.safeToRemove;
              null === t || void 0 === t || t();
            }),
            (e.prototype.render = function () {
              return null;
            }),
            e
          );
        })(f.Component);
      var Ha = {
          borderRadius: s(s({}, Va), {
            applyTo: [
              "borderTopLeftRadius",
              "borderTopRightRadius",
              "borderBottomLeftRadius",
              "borderBottomRightRadius",
            ],
          }),
          borderTopLeftRadius: Va,
          borderTopRightRadius: Va,
          borderBottomLeftRadius: Va,
          borderBottomRightRadius: Va,
          boxShadow: za,
        },
        qa = {
          measureLayout: function (t) {
            var e = c(M(), 2),
              n = e[0],
              r = e[1],
              i = (0, f.useContext)(Uo);
            return f.createElement(
              $a,
              s({}, t, {
                layoutGroup: i,
                switchLayoutGroup: (0, f.useContext)(Vo),
                isPresent: n,
                safeToRemove: r,
              })
            );
          },
        },
        Wa = xo({
          attachResizeListener: function (t, e) {
            return (
              t.addEventListener("resize", e, { passive: !0 }),
              function () {
                return t.removeEventListener("resize", e);
              }
            );
          },
          measureScroll: function () {
            return {
              x:
                document.documentElement.scrollLeft || document.body.scrollLeft,
              y: document.documentElement.scrollTop || document.body.scrollTop,
            };
          },
        }),
        Xa = { current: void 0 },
        Za = xo({
          measureScroll: function (t) {
            return { x: t.scrollLeft, y: t.scrollTop };
          },
          defaultParent: function () {
            if (!Xa.current) {
              var t = new Wa(0, {});
              t.mount(window),
                t.setOptions({ layoutScroll: !0 }),
                (Xa.current = t);
            }
            return Xa.current;
          },
          resetTransform: function (t, e) {
            t.style.transform = null !== e && void 0 !== e ? e : "none";
          },
        }),
        Ka = s(s(s(s({}, Vn), br), Da), qa),
        Ja = $o(function (t, e) {
          return sa(t, e, Ka, Ai, Za);
        });
      var Ya = [
          { href: "/about", label: "About" },
          { href: "/governance", label: "Governance" },
          { href: "/claim", label: "Claim" },
          { href: "https://snapshot.org/#/apecoin.eth", label: "Proposals" },
          { href: "https://forum.apecoin.com", label: "Discussion" },
        ],
        Qa = [
          { href: "/terms", label: "Terms" },
          { href: "/privacy", label: "Privacy" },
          { href: "mailto:support@apecoin.com", label: "Support" },
          { href: "mailto:press@apecoin.com", label: "Press Inquiries" },
          { href: "/assets/press/ApeCoin_Press_Kit.zip", label: "Press Kit" },
        ],
        ts = {
          twitter: { href: "https://twitter.com/apecoin", label: "Twitter" },
          instagram: {
            href: "https://instagram.com/apecoindao",
            label: "Instagram",
          },
        };
      function es(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function ns(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              es(t, e, n[e]);
            });
        }
        return t;
      }
      function rs() {
        var t = function () {
            o(!1);
          },
          e = (0, ma.useRouter)(),
          n = (0, f.useState)(!1),
          i = n[0],
          o = n[1];
        return (
          (0, f.useEffect)(
            function () {
              return (
                e.events.on("routeChangeComplete", t),
                function () {
                  e.events.off("routeChangeComplete", t);
                }
              );
            },
            [e.events]
          ),
          (0, f.useEffect)(
            function () {
              return (
                (document.body.style.overflow = i ? "hidden" : "auto"),
                function () {
                  document.body.style.overflow = "auto";
                }
              );
            },
            [i]
          ),
          (0, r.jsxs)(r.Fragment, {
            children: [
              (0, r.jsx)(os, {
                isOpen: i,
                onClick: function () {
                  o(function (t) {
                    return !t;
                  });
                },
              }),
              (0, r.jsx)(is, { isOpen: i }),
            ],
          })
        );
      }
      function is(t) {
        var e = t.isOpen;
        return (0, r.jsxs)(Ja.nav, {
          initial: !1,
          animate: { x: e ? 0 : "-100%" },
          transition: { duration: 0.3 },
          className:
            "fixed top-0 left-0 z-10 flex h-full w-full max-w-sm flex-col bg-black pt-xxl",
          children: [
            (0, r.jsxs)("ul", {
              children: [
                Ya.map(function (t) {
                  var e = t.href.startsWith("http");
                  return (0,
                  r.jsx)("li", { className: "text-lg font-semibold uppercase", children: (0, r.jsx)(pa.default, { href: t.href, children: (0, r.jsxs)("a", { className: "flex items-center py-xs px-gutter", children: [(0, r.jsx)("span", { children: t.label }), e && (0, r.jsx)(ga, {})] }) }) }, t.href);
                }),
                (0, r.jsx)("li", {
                  className:
                    "mt-sm border-t border-white/10 pt-sm text-lg font-semibold uppercase",
                  children: (0, r.jsx)(pa.default, {
                    href: "/exchanges",
                    children: (0, r.jsx)("a", {
                      className: "flex items-center py-xs px-gutter",
                      children: (0, r.jsx)("span", { children: "Buy/Sell" }),
                    }),
                  }),
                }),
              ],
            }),
            (0, r.jsx)("ul", {
              className: "mt-auto mb-md",
              children: Qa.map(function (t) {
                return (0,
                r.jsx)("li", { className: "text-base font-semibold uppercase text-white/50", children: (0, r.jsx)(pa.default, { href: t.href, children: (0, r.jsx)("a", { className: "flex items-center py-xs px-gutter", children: (0, r.jsx)("span", { children: t.label }) }) }) }, t.href);
              }),
            }),
          ],
        });
      }
      var os = function (t) {
          var e = t.isOpen,
            n = t.onClick,
            i = {
              stroke: "currentColor",
              strokeWidth: 1,
              vectorEffect: "non-scaling-stroke",
              initial: !1,
              animate: e ? "opened" : "closed",
              transition: { duration: 0.2 },
            };
          return (0, r.jsxs)("button", {
            onClick: n,
            className: "relative z-20 -mt-[24px] h-nav",
            children: [
              (0, r.jsxs)(Ja.svg, {
                viewBox: "0 0 ".concat(28, " ").concat(48),
                overflow: "visible",
                preserveAspectRatio: "none",
                width: 28,
                height: 48,
                children: [
                  (0, r.jsx)(
                    Ja.line,
                    ns({ x1: "0", x2: 28, y1: "12", y2: "12", variants: as }, i)
                  ),
                  (0, r.jsx)(
                    Ja.line,
                    ns({ x1: "0", x2: 28, y1: "18", y2: "18", variants: ss }, i)
                  ),
                ],
              }),
              (0, r.jsx)("span", {
                className: (0, ya.A)(
                  "absolute bottom-0 left-0  text-xs uppercase transition-opacity",
                  e ? "opacity-0" : "opacity-1"
                ),
                children: "Menu",
              }),
            ],
          });
        },
        as = {
          closed: { rotate: 0, translateY: 0 },
          opened: { rotate: 45, translateX: 0, translateY: 8 },
        },
        ss = {
          closed: { rotate: 0, translateY: 0 },
          opened: { rotate: -45, translateX: 0, translateY: 2 },
        };
      function us() {
        var t = (function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = (0, f.useState)(e),
            r = n[0],
            i = n[1];
          return (
            (0, f.useEffect)(
              function () {
                var e = matchMedia(t),
                  n = function () {
                    return i(e.matches);
                  };
                return (
                  n(),
                  e.addEventListener("change", n),
                  function () {
                    e.removeEventListener("change", n);
                  }
                );
              },
              [t]
            ),
            r
          );
        })("(max-width: 960px)");
        return (0, r.jsx)("header", {
          className: "sticky top-0 left-0 z-50 h-header w-full bg-dither",
          children: (0, r.jsxs)("div", {
            className:
              "wrapper flex h-full items-center justify-between gap-x-gutter",
            children: [
              (0, r.jsx)(pa.default, {
                href: "/",
                children: (0, r.jsx)("a", {
                  className:
                    "z-50 -mt-[20px] flex h-nav items-center laptop:-mt-[1px]",
                  children: (0, r.jsx)("img", {
                    src: "/assets/wordmark.svg",
                    alt: "ApeCoin",
                    className: "w-[96px] laptop:w-[76px]",
                  }),
                }),
              }),
              !t &&
                (0, r.jsx)("div", {
                  className: "border-t laptop:flex-1",
                  children: (0, r.jsx)(Ea, { items: Ya }),
                }),
              (0, r.jsx)("div", {
                className:
                  "relative z-50 hidden flex-1 border-t text-xs uppercase laptop:block laptop:flex-[0_0_25%]",
                children: (0, r.jsx)(Ea, {
                  items: [{ href: "/exchanges", label: "Buy/Sell" }],
                }),
              }),
              t && (0, r.jsx)(rs, {}),
            ],
          }),
        });
      }
      var ls = n(5939);
      function cs() {
        return (0, r.jsxs)("footer", {
          className:
            "wrapper mt-md flex flex-wrap items-center opacity-60 laptop:mt-xxl",
          children: [
            (0, r.jsxs)("div", {
              className: "flex w-full items-center gap-x-gutter",
              children: [
                (0, r.jsx)("div", {
                  className: "hidden flex-1 border-t laptop:block",
                  children: (0, r.jsx)(Ea, { items: Qa }),
                }),
                (0, r.jsxs)("div", {
                  className:
                    " tick relative z-50 flex h-nav flex-1 items-center border-t text-xs uppercase laptop:flex-[0_0_25%]",
                  children: [
                    (0, r.jsx)(hs, {
                      icon: (0, r.jsx)(wa, {}),
                      link: ts.instagram,
                    }),
                    (0, r.jsx)(hs, {
                      icon: (0, r.jsx)(ba, {}),
                      link: ts.twitter,
                    }),
                    (0, r.jsxs)("div", {
                      className: "ml-auto",
                      children: [
                        "\xa9 ",
                        new Date().getFullYear(),
                        " Ape Foundation",
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (0, r.jsxs)("div", {
              className: "mb-sm flex-1 text-xs",
              children: [
                (0, r.jsx)("span", {
                  className: "",
                  children: "ApeCoin Smart Contract Address: ",
                }),
                (0, r.jsx)("a", {
                  href: "https://etherscan.io/token/".concat(ls.rK.ApeCoin),
                  target: "_blank",
                  rel: "noreferrer",
                  children: ls.rK.ApeCoin,
                }),
              ],
            }),
          ],
        });
      }
      function hs(t) {
        var e = t.link,
          n = t.icon;
        return (0, r.jsx)("div", {
          className: "relative",
          children: (0, r.jsxs)("a", {
            className: "tick flex h-nav w-lg items-center pr-sm",
            href: e.href,
            target: "_blank",
            rel: "noreferrer noopener",
            children: [
              (0, r.jsx)("span", { className: "sr-only", children: e.label }),
              n,
            ],
          }),
        });
      }
      function fs(t) {
        var e = t.isRootPath;
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsxs)("video", {
              autoPlay: !0,
              muted: !0,
              playsInline: !0,
              loop: !0,
              className:
                "pointer-events-none fixed top-0 left-0 -z-20 h-screen w-full object-contain",
              children: [
                (0, r.jsx)("source", {
                  src: "/assets/videos/wen.webm",
                  type: "video/webm",
                }),
                (0, r.jsx)("source", {
                  src: "/assets/videos/wen.mp4",
                  type: "video/mp4",
                }),
              ],
            }),
            (0, r.jsx)("div", {
              className: (0, ya.A)(
                "pointer-events-none fixed top-0 left-0 -z-10 h-screen w-full bg-black/75 backdrop-blur transition-opacity duration-1000",
                e ? "opacity-0" : "opacity-1"
              ),
            }),
          ],
        });
      }
      function ds(t) {
        var e = t.route,
          n = t.children;
        return (0, r.jsx)(da, {
          exitBeforeEnter: !0,
          onExitComplete: ps,
          children: (0, r.jsx)(
            ua.main,
            {
              id: "__main",
              variants: ms,
              initial: "hidden",
              animate: "visible",
              exit: "hidden",
              transition: { duration: 0.3 },
              children: n,
            },
            e
          ),
        });
      }
      function ps() {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
      var ms = {
          hidden: { opacity: 0, transition: { duration: 0.3 } },
          visible: { opacity: 1, transition: { duration: 0.3 } },
        },
        ys = n(8400),
        gs = {
          defaultTitle: "ApeCoin",
          titleTemplate: "%s",
          description:
            "A token made to support the evolution of art, gaming, entertainment, digital and physical events, storytelling, and everything else web3 dreams up. The official token of Bored Ape Yacht Club.",
          openGraph: {
            type: "website",
            locale: "en_US",
            url: "https://apecoindemo.netlify.app",
            site_name: "ApeCoin",
            images: [
              {
                url: "https://apecoindemo.netlify.app/assets/share.jpg",
                width: 1200,
                height: 800,
                alt: "ApeCoin",
              },
            ],
          },
          twitter: {
            handle: "@apecoin",
            site: "@apecoin",
            cardType: "summary_large_image",
          },
          additionalMetaTags: [{ name: "theme-color", content: "#000000" }],
        };
      function vs(t, e, n) {
        return (
          e in t
            ? Object.defineProperty(t, e, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (t[e] = n),
          t
        );
      }
      function bs(t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = null != arguments[e] ? arguments[e] : {},
            r = Object.keys(n);
          "function" === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function (t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable;
              })
            )),
            r.forEach(function (e) {
              vs(t, e, n[e]);
            });
        }
        return t;
      }
      var ws = function (t) {
        var e = t.Component,
          n = t.pageProps;
        return (
          (0, ys.$6)(),
          (function (t) {
            var e = (0, ma.useRouter)().pathname;
            return (0, r.jsxs)(g, {
              features: Mi,
              children: [
                (0, r.jsx)(fs, { isRootPath: "/" === e }),
                (0, r.jsxs)(ua.div, {
                  id: "__layout",
                  variants: ms,
                  initial: "hidden",
                  animate: "visible",
                  children: [
                    (0, r.jsx)(us, {}),
                    (0, r.jsx)(ds, { route: e, children: t }),
                    (0, r.jsx)(cs, {}),
                  ],
                }),
              ],
            });
          })(
            (0, r.jsxs)(r.Fragment, {
              children: [
                (0, r.jsx)(i.lX, bs({}, gs)),
                (0, r.jsx)(e, bs({}, n)),
              ],
            })
          )
        );
      };
    },
    6930: function () {},
    472: function () {},
    7663: function (t) {
      !(function () {
        var e = {
            162: function (t) {
              var e,
                n,
                r = (t.exports = {});
              function i() {
                throw new Error("setTimeout has not been defined");
              }
              function o() {
                throw new Error("clearTimeout has not been defined");
              }
              function a(t) {
                if (e === setTimeout) return setTimeout(t, 0);
                if ((e === i || !e) && setTimeout)
                  return (e = setTimeout), setTimeout(t, 0);
                try {
                  return e(t, 0);
                } catch (r) {
                  try {
                    return e.call(null, t, 0);
                  } catch (r) {
                    return e.call(this, t, 0);
                  }
                }
              }
              !(function () {
                try {
                  e = "function" === typeof setTimeout ? setTimeout : i;
                } catch (t) {
                  e = i;
                }
                try {
                  n = "function" === typeof clearTimeout ? clearTimeout : o;
                } catch (t) {
                  n = o;
                }
              })();
              var s,
                u = [],
                l = !1,
                c = -1;
              function h() {
                l &&
                  s &&
                  ((l = !1),
                  s.length ? (u = s.concat(u)) : (c = -1),
                  u.length && f());
              }
              function f() {
                if (!l) {
                  var t = a(h);
                  l = !0;
                  for (var e = u.length; e; ) {
                    for (s = u, u = []; ++c < e; ) s && s[c].run();
                    (c = -1), (e = u.length);
                  }
                  (s = null),
                    (l = !1),
                    (function (t) {
                      if (n === clearTimeout) return clearTimeout(t);
                      if ((n === o || !n) && clearTimeout)
                        return (n = clearTimeout), clearTimeout(t);
                      try {
                        n(t);
                      } catch (e) {
                        try {
                          return n.call(null, t);
                        } catch (e) {
                          return n.call(this, t);
                        }
                      }
                    })(t);
                }
              }
              function d(t, e) {
                (this.fun = t), (this.array = e);
              }
              function p() {}
              (r.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1)
                  for (var n = 1; n < arguments.length; n++)
                    e[n - 1] = arguments[n];
                u.push(new d(t, e)), 1 !== u.length || l || a(f);
              }),
                (d.prototype.run = function () {
                  this.fun.apply(null, this.array);
                }),
                (r.title = "browser"),
                (r.browser = !0),
                (r.env = {}),
                (r.argv = []),
                (r.version = ""),
                (r.versions = {}),
                (r.on = p),
                (r.addListener = p),
                (r.once = p),
                (r.off = p),
                (r.removeListener = p),
                (r.removeAllListeners = p),
                (r.emit = p),
                (r.prependListener = p),
                (r.prependOnceListener = p),
                (r.listeners = function (t) {
                  return [];
                }),
                (r.binding = function (t) {
                  throw new Error("process.binding is not supported");
                }),
                (r.cwd = function () {
                  return "/";
                }),
                (r.chdir = function (t) {
                  throw new Error("process.chdir is not supported");
                }),
                (r.umask = function () {
                  return 0;
                });
            },
          },
          n = {};
        function r(t) {
          var i = n[t];
          if (void 0 !== i) return i.exports;
          var o = (n[t] = { exports: {} }),
            a = !0;
          try {
            e[t](o, o.exports, r), (a = !1);
          } finally {
            a && delete n[t];
          }
          return o.exports;
        }
        r.ab = "//";
        var i = r(162);
        t.exports = i;
      })();
    },
    9008: function (t, e, n) {
      t.exports = n(5443);
    },
    1664: function (t, e, n) {
      t.exports = n(8418);
    },
    1163: function (t, e, n) {
      t.exports = n(387);
    },
    6601: function () {},
    211: function (t) {
      "use strict";
      t.exports = JSON.parse(
        '[{"inputs":[{"internalType":"address","name":"_grapesTokenAddress","type":"address"},{"internalType":"address","name":"_alphaContractAddress","type":"address"},{"internalType":"address","name":"_betaContractAddress","type":"address"},{"internalType":"address","name":"_gammaContractAddress","type":"address"},{"internalType":"uint256","name":"_ALPHA_DISTRIBUTION_AMOUNT","type":"uint256"},{"internalType":"uint256","name":"_BETA_DISTRIBUTION_AMOUNT","type":"uint256"},{"internalType":"uint256","name":"_GAMMA_DISTRIBUTION_AMOUNT","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"AirDrop","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"AlphaClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"BetaClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"_claimDuration","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_claimStartTime","type":"uint256"}],"name":"ClaimStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"GammaClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[],"name":"ALPHA_DISTRIBUTION_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"BETA_DISTRIBUTION_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"GAMMA_DISTRIBUTION_AMOUNT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"alpha","outputs":[{"internalType":"contract ERC721Enumerable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"alphaClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"beta","outputs":[{"internalType":"contract ERC721Enumerable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"betaClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimUnclaimedTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"gamma","outputs":[{"internalType":"contract ERC721Enumerable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"gammaClaimed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_account","type":"address"}],"name":"getClaimableTokenAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"grapesToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pauseClaimablePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_claimDuration","type":"uint256"}],"name":"startClaimablePeriod","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalClaimed","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
    },
    8677: function (t) {
      "use strict";
      t.exports = JSON.parse(
        '[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"},{"internalType":"address","name":"dependentContractAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"BakcProvenance","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_DOG_ADOPTION","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"baycTokenId","type":"uint256"}],"name":"adoptDog","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startingIndex","type":"uint256"},{"internalType":"uint256","name":"numDogs","type":"uint256"}],"name":"adoptNDogs","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectionStartingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectionStartingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndexBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"isMinted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxDogs","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"revealTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setBlockTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revealTimeStamp","type":"uint256"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"startingBlockTimestamp","type":"uint256"}],"name":"setStartingBlockTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
    },
    9752: function (t) {
      "use strict";
      t.exports = JSON.parse(
        '[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"maxNftSupply","type":"uint256"},{"internalType":"uint256","name":"saleStart","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"apePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"baseURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"emergencySetStartingIndexBlock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipSaleState","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getProvenanceHash","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRevealTimestamp","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"maxApePurchase","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numberOfTokens","type":"uint256"}],"name":"mintApe","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"reserveApes","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"saleIsActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"baseURI","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"provenanceHash","type":"string"}],"name":"setProvenanceHash","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revealTimeStamp","type":"uint256"}],"name":"setRevealTimestamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndex","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"startingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"startingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
    },
    6850: function (t) {
      "use strict";
      t.exports = JSON.parse(
        '[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"address","name":"baycAddress","type":"address"},{"internalType":"address","name":"baccAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_currentPrice","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_timeElapsed","type":"uint256"}],"name":"MutantPublicSalePaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_saleDuration","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_saleStartTime","type":"uint256"}],"name":"MutantPublicSaleStart","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"_mintedMutantsStartingIndex","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"_megaMutantsStartingIndex","type":"uint256"}],"name":"StartingIndicesSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAYC_PROVENANCE","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"NUM_MEGA_MUTANTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PS_MAX_MUTANTS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PS_MAX_MUTANT_PURCHASE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PS_MUTANT_ENDING_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"SERUM_MUTATION_OFFSET","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"collectionStartingIndexBlock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getMintPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"apeId","type":"uint256"},{"internalType":"uint8","name":"serumTypeId","type":"uint8"}],"name":"getMutantIdForApeAndSerumCombination","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRemainingSaleTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint8","name":"serumType","type":"uint8"},{"internalType":"uint256","name":"apeId","type":"uint256"}],"name":"hasApeBeenMutatedWithType","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"isMinted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"megaMutantsStartingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"numMutants","type":"uint256"}],"name":"mintMutants","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"mintedMutantsStartingIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"serumTypeId","type":"uint256"},{"internalType":"uint256","name":"apeId","type":"uint256"}],"name":"mutateApeWithSerum","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"numMutantsMinted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pausePublicSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"publicSaleActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicSaleDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicSaleMutantStartingPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"publicSaleStartTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"serumMutationActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"uri","type":"string"}],"name":"setBaseURI","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"setStartingIndices","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"saleDuration","type":"uint256"},{"internalType":"uint256","name":"saleStartPrice","type":"uint256"}],"name":"startPublicSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"togglePublicSaleActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"toggleSerumMutationActive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalApesMutated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]'
      );
    },
  },
  function (t) {
    var e = function (e) {
      return t((t.s = e));
    };
    t.O(0, [774, 179], function () {
      return e(6363), e(387);
    });
    var n = t.O();
    _N_E = n;
  },
]);
