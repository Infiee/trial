// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS((exports, module) => {
  var Events = function() {
  };
  var EE = function(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  };
  var addListener = function(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
    if (!emitter._events[evt])
      emitter._events[evt] = listener, emitter._eventsCount++;
    else if (!emitter._events[evt].fn)
      emitter._events[evt].push(listener);
    else
      emitter._events[evt] = [emitter._events[evt], listener];
    return emitter;
  };
  var clearEvent = function(emitter, evt) {
    if (--emitter._eventsCount === 0)
      emitter._events = new Events;
    else
      delete emitter._events[evt];
  };
  var EventEmitter = function() {
    this._events = new Events;
    this._eventsCount = 0;
  };
  var has = Object.prototype.hasOwnProperty;
  var prefix = "~";
  if (Object.create) {
    Events.prototype = Object.create(null);
    if (!new Events().__proto__)
      prefix = false;
  }
  EventEmitter.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0)
      return names;
    for (name in events = this._events) {
      if (has.call(events, name))
        names.push(prefix ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter.prototype.listeners = function listeners(event) {
    var evt = prefix ? prefix + event : event, handlers = this._events[evt];
    if (!handlers)
      return [];
    if (handlers.fn)
      return [handlers.fn];
    for (var i = 0, l = handlers.length, ee = new Array(l);i < l; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix ? prefix + event : event, listeners = this._events[evt];
    if (!listeners)
      return 0;
    if (listeners.fn)
      return 1;
    return listeners.length;
  };
  EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once)
        this.removeListener(event, listeners.fn, undefined, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1);i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0;i < length; i++) {
        if (listeners[i].once)
          this.removeListener(event, listeners[i].fn, undefined, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args)
              for (j = 1, args = new Array(len - 1);j < len; j++) {
                args[j - 1] = arguments[j];
              }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter.prototype.on = function on(event, fn, context) {
    return addListener(this, event, fn, context, false);
  };
  EventEmitter.prototype.once = function once(event, fn, context) {
    return addListener(this, event, fn, context, true);
  };
  EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
    var evt = prefix ? prefix + event : event;
    if (!this._events[evt])
      return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length;i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length)
        this._events[evt] = events.length === 1 ? events[0] : events;
      else
        clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix ? prefix + event : event;
      if (this._events[evt])
        clearEvent(this, evt);
    } else {
      this._events = new Events;
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  EventEmitter.prototype.addListener = EventEmitter.prototype.on;
  EventEmitter.prefixed = prefix;
  EventEmitter.EventEmitter = EventEmitter;
  if (typeof module !== "undefined") {
    module.exports = EventEmitter;
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var decodeURIComponent2 = function(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type47 = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type47];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type47];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  };
  var hexCodeToInt = function(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  };
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  module.exports = decodeURIComponent2;
});

// node_modules/fast-querystring/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var parse5 = function(input) {
    const result = new Empty;
    if (typeof input !== "string") {
      return result;
    }
    let inputLength = input.length;
    let key = "";
    let value11 = "";
    let startingIndex = -1;
    let equalityIndex = -1;
    let shouldDecodeKey = false;
    let shouldDecodeValue = false;
    let keyHasPlus = false;
    let valueHasPlus = false;
    let hasBothKeyValuePair = false;
    let c = 0;
    for (let i = 0;i < inputLength + 1; i++) {
      c = i !== inputLength ? input.charCodeAt(i) : 38;
      if (c === 38) {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair) {
          equalityIndex = i;
        }
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus) {
            key = key.replace(plusRegex, " ");
          }
          if (shouldDecodeKey) {
            key = fastDecode(key) || key;
          }
          if (hasBothKeyValuePair) {
            value11 = input.slice(equalityIndex + 1, i);
            if (valueHasPlus) {
              value11 = value11.replace(plusRegex, " ");
            }
            if (shouldDecodeValue) {
              value11 = fastDecode(value11) || value11;
            }
          }
          const currentValue = result[key];
          if (currentValue === undefined) {
            result[key] = value11;
          } else {
            if (currentValue.pop) {
              currentValue.push(value11);
            } else {
              result[key] = [currentValue, value11];
            }
          }
        }
        value11 = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
      } else if (c === 61) {
        if (equalityIndex <= startingIndex) {
          equalityIndex = i;
        } else {
          shouldDecodeValue = true;
        }
      } else if (c === 43) {
        if (equalityIndex > startingIndex) {
          valueHasPlus = true;
        } else {
          keyHasPlus = true;
        }
      } else if (c === 37) {
        if (equalityIndex > startingIndex) {
          shouldDecodeValue = true;
        } else {
          shouldDecodeKey = true;
        }
      }
    }
    return result;
  };
  var fastDecode = require_fast_decode_uri_component();
  var plusRegex = /\+/g;
  var Empty = function() {
  };
  Empty.prototype = Object.create(null);
  module.exports = parse5;
});

// node_modules/fast-querystring/lib/internals/querystring.js
var require_querystring = __commonJS((exports, module) => {
  var encodeString = function(str) {
    const len = str.length;
    if (len === 0)
      return "";
    let out = "";
    let lastPos = 0;
    let i = 0;
    outer:
      for (;i < len; i++) {
        let c = str.charCodeAt(i);
        while (c < 128) {
          if (noEscape[c] !== 1) {
            if (lastPos < i)
              out += str.slice(lastPos, i);
            lastPos = i + 1;
            out += hexTable[c];
          }
          if (++i === len)
            break outer;
          c = str.charCodeAt(i);
        }
        if (lastPos < i)
          out += str.slice(lastPos, i);
        if (c < 2048) {
          lastPos = i + 1;
          out += hexTable[192 | c >> 6] + hexTable[128 | c & 63];
          continue;
        }
        if (c < 55296 || c >= 57344) {
          lastPos = i + 1;
          out += hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          continue;
        }
        ++i;
        if (i >= len) {
          throw new Error("URI malformed");
        }
        const c2 = str.charCodeAt(i) & 1023;
        lastPos = i + 1;
        c = 65536 + ((c & 1023) << 10 | c2);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
    if (lastPos === 0)
      return str;
    if (lastPos < len)
      return out + str.slice(lastPos);
    return out;
  };
  var hexTable = Array.from({ length: 256 }, (_, i) => "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
  var noEscape = new Int8Array([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    0,
    0,
    1,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0,
    1,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    1,
    0
  ]);
  module.exports = { encodeString };
});

// node_modules/fast-querystring/lib/stringify.js
var require_stringify = __commonJS((exports, module) => {
  var getAsPrimitive = function(value11) {
    const type47 = typeof value11;
    if (type47 === "string") {
      return encodeString(value11);
    } else if (type47 === "bigint") {
      return value11.toString();
    } else if (type47 === "boolean") {
      return value11 ? "true" : "false";
    } else if (type47 === "number" && Number.isFinite(value11)) {
      return value11 < 1000000000000000000000 ? "" + value11 : encodeString("" + value11);
    }
    return "";
  };
  var stringify = function(input) {
    let result = "";
    if (input === null || typeof input !== "object") {
      return result;
    }
    const separator = "&";
    const keys = Object.keys(input);
    const keyLength = keys.length;
    let valueLength = 0;
    for (let i = 0;i < keyLength; i++) {
      const key = keys[i];
      const value11 = input[key];
      const encodedKey = encodeString(key) + "=";
      if (i) {
        result += separator;
      }
      if (Array.isArray(value11)) {
        valueLength = value11.length;
        for (let j = 0;j < valueLength; j++) {
          if (j) {
            result += separator;
          }
          result += encodedKey;
          result += getAsPrimitive(value11[j]);
        }
      } else {
        result += encodedKey;
        result += getAsPrimitive(value11);
      }
    }
    return result;
  };
  var { encodeString } = require_querystring();
  module.exports = stringify;
});

// node_modules/fast-querystring/lib/index.js
var require_lib = __commonJS((exports, module) => {
  var parse5 = require_parse();
  var stringify = require_stringify();
  var fastQuerystring = {
    parse: parse5,
    stringify
  };
  module.exports = fastQuerystring;
  module.exports.default = fastQuerystring;
  module.exports.parse = parse5;
  module.exports.stringify = stringify;
});

// node_modules/eventemitter3/index.mjs
var import_ = __toESM(require_eventemitter3(), 1);
var eventemitter3_default = import_.default;

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return IsObject(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => {
    {
      return Set2;
    }
  },
  Has: () => {
    {
      return Has;
    }
  },
  Get: () => {
    {
      return Get;
    }
  },
  Entries: () => {
    {
      return Entries;
    }
  },
  Delete: () => {
    {
      return Delete;
    }
  },
  Clear: () => {
    {
      return Clear;
    }
  }
});
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
var map = new Map;
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => {
    {
      return Set3;
    }
  },
  Has: () => {
    {
      return Has2;
    }
  },
  Get: () => {
    {
      return Get2;
    }
  },
  Entries: () => {
    {
      return Entries2;
    }
  },
  Delete: () => {
    {
      return Delete2;
    }
  },
  Clear: () => {
    {
      return Clear2;
    }
  }
});
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
var map2 = new Map;
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => {
    {
      return IsUndefined2;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array2;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol2;
    }
  },
  IsString: () => {
    {
      return IsString2;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp;
    }
  },
  IsObject: () => {
    {
      return IsObject2;
    }
  },
  IsNumber: () => {
    {
      return IsNumber2;
    }
  },
  IsNull: () => {
    {
      return IsNull2;
    }
  },
  IsIterator: () => {
    {
      return IsIterator2;
    }
  },
  IsFunction: () => {
    {
      return IsFunction2;
    }
  },
  IsDate: () => {
    {
      return IsDate2;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean2;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt2;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator2;
    }
  },
  IsArray: () => {
    {
      return IsArray2;
    }
  }
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
var ArrayType = function(value) {
  return value.map((value2) => Visit(value2));
};
var DateType = function(value) {
  return new Date(value.getTime());
};
var Uint8ArrayType = function(value) {
  return new Uint8Array(value);
};
var RegExpType = function(value) {
  return new RegExp(value.source, value.flags);
};
var ObjectType = function(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
};
var Visit = function(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
};
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
var DiscardKey = function(value2, key) {
  const { [key]: _, ...rest } = value2;
  return rest;
};
function Discard(value2, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value2);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value2) {
  return IsObject2(value2) && value2[ReadonlyKind] === "Readonly";
}
function IsOptional(value2) {
  return IsObject2(value2) && value2[OptionalKind] === "Optional";
}
function IsAny(value2) {
  return IsKindOf(value2, "Any");
}
function IsArray3(value2) {
  return IsKindOf(value2, "Array");
}
function IsAsyncIterator3(value2) {
  return IsKindOf(value2, "AsyncIterator");
}
function IsBigInt3(value2) {
  return IsKindOf(value2, "BigInt");
}
function IsBoolean3(value2) {
  return IsKindOf(value2, "Boolean");
}
function IsConstructor(value2) {
  return IsKindOf(value2, "Constructor");
}
function IsDate3(value2) {
  return IsKindOf(value2, "Date");
}
function IsFunction3(value2) {
  return IsKindOf(value2, "Function");
}
function IsInteger2(value2) {
  return IsKindOf(value2, "Integer");
}
function IsIntersect(value2) {
  return IsKindOf(value2, "Intersect");
}
function IsIterator3(value2) {
  return IsKindOf(value2, "Iterator");
}
function IsKindOf(value2, kind) {
  return IsObject2(value2) && Kind in value2 && value2[Kind] === kind;
}
function IsLiteral(value2) {
  return IsKindOf(value2, "Literal");
}
function IsMappedKey(value2) {
  return IsKindOf(value2, "MappedKey");
}
function IsMappedResult(value2) {
  return IsKindOf(value2, "MappedResult");
}
function IsNever(value2) {
  return IsKindOf(value2, "Never");
}
function IsNot(value2) {
  return IsKindOf(value2, "Not");
}
function IsNull3(value2) {
  return IsKindOf(value2, "Null");
}
function IsNumber3(value2) {
  return IsKindOf(value2, "Number");
}
function IsObject3(value2) {
  return IsKindOf(value2, "Object");
}
function IsPromise2(value2) {
  return IsKindOf(value2, "Promise");
}
function IsRecord(value2) {
  return IsKindOf(value2, "Record");
}
function IsRef(value2) {
  return IsKindOf(value2, "Ref");
}
function IsRegExp2(value2) {
  return IsKindOf(value2, "RegExp");
}
function IsString3(value2) {
  return IsKindOf(value2, "String");
}
function IsSymbol3(value2) {
  return IsKindOf(value2, "Symbol");
}
function IsTemplateLiteral(value2) {
  return IsKindOf(value2, "TemplateLiteral");
}
function IsThis(value2) {
  return IsKindOf(value2, "This");
}
function IsTransform(value2) {
  return IsObject2(value2) && TransformKind in value2;
}
function IsTuple(value2) {
  return IsKindOf(value2, "Tuple");
}
function IsUndefined3(value2) {
  return IsKindOf(value2, "Undefined");
}
function IsUnion(value2) {
  return IsKindOf(value2, "Union");
}
function IsUint8Array3(value2) {
  return IsKindOf(value2, "Uint8Array");
}
function IsUnknown(value2) {
  return IsKindOf(value2, "Unknown");
}
function IsUnsafe(value2) {
  return IsKindOf(value2, "Unsafe");
}
function IsVoid(value2) {
  return IsKindOf(value2, "Void");
}
function IsKind(value2) {
  return IsObject2(value2) && Kind in value2 && IsString2(value2[Kind]);
}
function IsSchema(value2) {
  return IsAny(value2) || IsArray3(value2) || IsBoolean3(value2) || IsBigInt3(value2) || IsAsyncIterator3(value2) || IsConstructor(value2) || IsDate3(value2) || IsFunction3(value2) || IsInteger2(value2) || IsIntersect(value2) || IsIterator3(value2) || IsLiteral(value2) || IsMappedKey(value2) || IsMappedResult(value2) || IsNever(value2) || IsNot(value2) || IsNull3(value2) || IsNumber3(value2) || IsObject3(value2) || IsPromise2(value2) || IsRecord(value2) || IsRef(value2) || IsRegExp2(value2) || IsString3(value2) || IsSymbol3(value2) || IsTemplateLiteral(value2) || IsThis(value2) || IsTuple(value2) || IsUndefined3(value2) || IsUnion(value2) || IsUint8Array3(value2) || IsUnknown(value2) || IsUnsafe(value2) || IsVoid(value2) || IsKind(value2);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
var RemoveOptional = function(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
};
var AddOptional = function(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
};
var OptionalWithFlag = function(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
};
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
var FromProperties = function(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
};
var FromMappedResult = function(R, F) {
  return FromProperties(R.properties, F);
};
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
var IsIntersectOptional = function(T) {
  return T.every((L) => IsOptional(L));
};
var RemoveOptionalFromType = function(T) {
  return Discard(T, [OptionalKind]);
};
var RemoveOptionalFromRest = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
};
var ResolveIntersect = function(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
};
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
var IsUnionOptional = function(T) {
  return T.some((L) => IsOptional(L));
};
var RemoveOptionalFromRest2 = function(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
};
var RemoveOptionalFromType2 = function(T) {
  return Discard(T, [OptionalKind]);
};
var ResolveUnion = function(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
};
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
var Unescape = function(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
};
var IsNonEscaped = function(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
};
var IsOpenParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
};
var IsCloseParen = function(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
};
var IsSeparator = function(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
};
var IsGroup = function(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
};
var InGroup = function(pattern) {
  return pattern.slice(1, pattern.length - 1);
};
var IsPrecedenceOr = function(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
};
var IsPrecedenceAnd = function(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
};
var Or = function(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
};
var And = function(pattern) {
  function Group(value2, index) {
    if (!IsOpenParen(value2, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value2.length; scan++) {
      if (IsOpenParen(value2, scan))
        count += 1;
      if (IsCloseParen(value2, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
};
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

class TemplateLiteralParserError extends TypeBoxError {
}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
var IsNumberExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
};
var IsBooleanExpression = function(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
};
var IsStringExpression = function(expression) {
  return expression.type === "const" && expression.const === ".*";
};
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}

class TemplateLiteralFiniteError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}

class TemplateLiteralGenerateError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value2, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value2,
    type: typeof value2
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal3) => Literal(literal3.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}\$`;
var PatternNumberExact = `^${PatternNumber}\$`;
var PatternStringExact = `^${PatternString}\$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
var Escape = function(value2) {
  return value2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var Visit2 = function(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
};
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}

class TemplateLiteralPatternError extends TypeBoxError {
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern2 = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern: pattern2 };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
var FromTemplateLiteral = function(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
};
var FromUnion2 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
};
var FromLiteral = function(T) {
  return [T.toString()];
};
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
var FromProperties2 = function(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
};
var FromMappedResult2 = function(T, R, options) {
  return FromProperties2(T, R.properties, options);
};
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
var FromRest = function(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
};
var FromIntersectRest = function(T) {
  return T.filter((L) => !IsNever(L));
};
var FromIntersect = function(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
};
var FromUnionRest = function(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
};
var FromUnion3 = function(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
};
var FromTuple = function(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
};
var FromArray = function(T, K) {
  return K === "[number]" ? T : Never();
};
var FromProperty = function(T, K) {
  return K in T ? T[K] : Never();
};
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
var FromSchema = function(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
};
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
var MappedIndexPropertyKey = function(T, K, options) {
  return { [K]: Index(T, [K], options) };
};
var MappedIndexPropertyKeys = function(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
};
var MappedIndexProperties = function(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
};
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
var _Object = function(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
};
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
var RemoveReadonly = function(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
};
var AddReadonly = function(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
};
var ReadonlyWithFlag = function(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
};
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
var FromProperties3 = function(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
};
var FromMappedResult3 = function(R, F) {
  return FromProperties3(R.properties, F);
};
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
var SetIntersectManyResolve = function(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
};
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
var FromMappedResult4 = function(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
};
var MappedKeyToKnownMappedResultProperties = function(K) {
  return { [K]: Literal(K) };
};
var MappedKeyToUnknownMappedResultProperties = function(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
};
var MappedKeyToMappedResultProperties = function(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
};
var FromMappedKey = function(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
};
var FromRest2 = function(K, T) {
  return T.map((L) => FromSchemaType(K, L));
};
var FromProperties4 = function(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
};
var FromSchemaType = function(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
};
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
var FromRest3 = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
};
var FromIntersect2 = function(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
};
var FromUnion4 = function(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
};
var FromTuple2 = function(T) {
  return T.map((_, I) => I.toString());
};
var FromArray2 = function(_) {
  return ["[number]"];
};
var FromProperties5 = function(T) {
  return globalThis.Object.getOwnPropertyNames(T);
};
var FromPatternProperties = function(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
};
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern3 = keys.map((key) => `(${key})`);
  return `^(${pattern3.join("|")})\$`;
}
var includePatternProperties = false;

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
var FromProperties6 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
};
var FromMappedResult5 = function(R, options) {
  return FromProperties6(R.properties, options);
};
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
var Intersect2 = function(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
};
var Union2 = function(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
};
var Not = function(schema) {
  return !ExtendsUndefinedCheck(schema.not);
};
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error7) {
  switch (error7.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error7.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error7.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error7.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error7.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error7.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error7.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error7.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error7.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error7.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error7.schema.const === "string" ? `'${error7.schema.const}'` : error7.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error7.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error7.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error7.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error7.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error7.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error7.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error7.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error7.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error7.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error7.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error7.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error7.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error7.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error7.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error7.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error7.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
function SetErrorFunction(callback) {
  errorFunction = callback;
}
function GetErrorFunction() {
  return errorFunction;
}
var errorFunction = DefaultErrorFunction;

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
var Resolve = function(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === undefined)
    throw new TypeDereferenceError(schema);
  return Deref(target, references);
};
function Deref(schema, references) {
  return schema[Kind] === "This" || schema[Kind] === "Ref" ? Resolve(schema, references) : schema;
}

class TypeDereferenceError extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with \$id '${schema.$id}'`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
function* NumberToBytes(value3) {
  const byteCount = value3 === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value3) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value3 >> 8 * (byteCount - 1 - i) & 255;
  }
}
var ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Array);
  for (const item of value3) {
    Visit3(item);
  }
};
var BooleanType = function(value3) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value3 ? 1 : 0);
};
var BigIntType = function(value3) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var DateType2 = function(value3) {
  FNV1A64(ByteMarker.Date);
  Visit3(value3.getTime());
};
var NullType = function(value3) {
  FNV1A64(ByteMarker.Null);
};
var NumberType = function(value3) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value3);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
};
var ObjectType2 = function(value3) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value3).sort()) {
    Visit3(key);
    Visit3(value3[key]);
  }
};
var StringType = function(value3) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value3.length; i++) {
    for (const byte of NumberToBytes(value3.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
};
var SymbolType = function(value3) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value3.description);
};
var Uint8ArrayType2 = function(value3) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value3.length; i++) {
    FNV1A64(value3[i]);
  }
};
var UndefinedType = function(value3) {
  return FNV1A64(ByteMarker.Undefined);
};
var Visit3 = function(value3) {
  if (IsArray(value3))
    return ArrayType2(value3);
  if (IsBoolean(value3))
    return BooleanType(value3);
  if (IsBigInt(value3))
    return BigIntType(value3);
  if (IsDate(value3))
    return DateType2(value3);
  if (IsNull(value3))
    return NullType(value3);
  if (IsNumber(value3))
    return NumberType(value3);
  if (IsStandardObject(value3))
    return ObjectType2(value3);
  if (IsString(value3))
    return StringType(value3);
  if (IsSymbol(value3))
    return SymbolType(value3);
  if (IsUint8Array(value3))
    return Uint8ArrayType2(value3);
  if (IsUndefined(value3))
    return UndefinedType(value3);
  throw new ValueHashError(value3);
};
var FNV1A64 = function(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
};
function Hash(value3) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value3);
  return Accumulator;
}

class ValueHashError extends TypeBoxError {
  constructor(value3) {
    super(`Unable to hash value`);
    this.value = value3;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var EscapeKey = function(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
};
var IsDefined = function(value3) {
  return value3 !== undefined;
};
var Create = function(errorType, schema, path, value3) {
  return { type: errorType, schema, path, value: value3, message: GetErrorFunction()({ errorType, path, schema, value: value3 }) };
};
function* FromAny(schema, references, path, value3) {
}
function* FromArray3(schema, references, path, value3) {
  if (!IsArray(value3)) {
    return yield Create(ValueErrorType.Array, schema, path, value3);
  }
  if (IsDefined(schema.minItems) && !(value3.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value3);
  }
  if (IsDefined(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value3);
  }
  for (let i = 0;i < value3.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value3[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value3);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4, index) => Visit4(containsSchema, references, `${path}${index}`, value4).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value3);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value3);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value3);
  }
}
function* FromAsyncIterator(schema, references, path, value3) {
  if (!IsAsyncIterator(value3))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value3);
}
function* FromBigInt(schema, references, path, value3) {
  if (!IsBigInt(value3))
    return yield Create(ValueErrorType.BigInt, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value3);
  }
}
function* FromBoolean(schema, references, path, value3) {
  if (!IsBoolean(value3))
    yield Create(ValueErrorType.Boolean, schema, path, value3);
}
function* FromConstructor(schema, references, path, value3) {
  yield* Visit4(schema.returns, references, path, value3.prototype);
}
function* FromDate(schema, references, path, value3) {
  if (!IsDate(value3))
    return yield Create(ValueErrorType.Date, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value3);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value3);
  }
}
function* FromFunction(schema, references, path, value3) {
  if (!IsFunction(value3))
    yield Create(ValueErrorType.Function, schema, path, value3);
}
function* FromInteger(schema, references, path, value3) {
  if (!IsInteger(value3))
    return yield Create(ValueErrorType.Integer, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value3);
  }
}
function* FromIntersect3(schema, references, path, value3) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value3).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value3);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value3);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value3)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value3[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value3) {
  if (!IsIterator(value3))
    yield Create(ValueErrorType.Iterator, schema, path, value3);
}
function* FromLiteral2(schema, references, path, value3) {
  if (!(value3 === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value3);
}
function* FromNever(schema, references, path, value3) {
  yield Create(ValueErrorType.Never, schema, path, value3);
}
function* FromNot(schema, references, path, value3) {
  if (Visit4(schema.not, references, path, value3).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value3);
}
function* FromNull(schema, references, path, value3) {
  if (!IsNull(value3))
    yield Create(ValueErrorType.Null, schema, path, value3);
}
function* FromNumber(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return yield Create(ValueErrorType.Number, schema, path, value3);
  if (IsDefined(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value3);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value3);
  }
  if (IsDefined(schema.maximum) && !(value3 <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value3);
  }
  if (IsDefined(schema.minimum) && !(value3 >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value3);
  }
  if (IsDefined(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value3);
  }
}
function* FromObject(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value3);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value3[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value3)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value3[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value3) {
  if (!IsPromise(value3))
    yield Create(ValueErrorType.Promise, schema, path, value3);
}
function* FromRecord(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3))
    return yield Create(ValueErrorType.Object, schema, path, value3);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value3);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value3);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value3)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value3)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromRegExp(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value3)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value3);
  }
}
function* FromString(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  if (IsDefined(schema.minLength) && !(value3.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value3);
  }
  if (IsDefined(schema.maxLength) && !(value3.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value3);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value3);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value3);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value3)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value3);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value3) {
  if (!IsSymbol(value3))
    yield Create(ValueErrorType.Symbol, schema, path, value3);
}
function* FromTemplateLiteral2(schema, references, path, value3) {
  if (!IsString(value3))
    return yield Create(ValueErrorType.String, schema, path, value3);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value3)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value3);
  }
}
function* FromThis(schema, references, path, value3) {
  yield* Visit4(Deref(schema, references), references, path, value3);
}
function* FromTuple3(schema, references, path, value3) {
  if (!IsArray(value3))
    return yield Create(ValueErrorType.Tuple, schema, path, value3);
  if (schema.items === undefined && !(value3.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!(value3.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value3);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value3[i]);
  }
}
function* FromUndefined(schema, references, path, value3) {
  if (!IsUndefined(value3))
    yield Create(ValueErrorType.Undefined, schema, path, value3);
}
function* FromUnion5(schema, references, path, value3) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors2 = [...Visit4(subschema, references, path, value3)];
    if (errors2.length === 0)
      return;
    count += errors2.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value3);
  }
}
function* FromUint8Array(schema, references, path, value3) {
  if (!IsUint8Array(value3))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value3);
  if (IsDefined(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value3);
  }
  if (IsDefined(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value3);
  }
}
function* FromUnknown(schema, references, path, value3) {
}
function* FromVoid(schema, references, path, value3) {
  if (!TypeSystemPolicy.IsVoidLike(value3))
    yield Create(ValueErrorType.Void, schema, path, value3);
}
function* FromKind(schema, references, path, value3) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value3))
    yield Create(ValueErrorType.Kind, schema, path, value3);
}
function* Visit4(schema, references, path, value3) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value3);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value3);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value3);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value3);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value3);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value3);
    case "Date":
      return yield* FromDate(schema_, references_, path, value3);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value3);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value3);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value3);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value3);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value3);
    case "Never":
      return yield* FromNever(schema_, references_, path, value3);
    case "Not":
      return yield* FromNot(schema_, references_, path, value3);
    case "Null":
      return yield* FromNull(schema_, references_, path, value3);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value3);
    case "Object":
      return yield* FromObject(schema_, references_, path, value3);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value3);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value3);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value3);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value3);
    case "String":
      return yield* FromString(schema_, references_, path, value3);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value3);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value3);
    case "This":
      return yield* FromThis(schema_, references_, path, value3);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value3);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value3);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value3);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value3);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value3);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value3);
  }
}
function Errors(...args) {
  const iterator3 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator3);
}
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}

class ValueErrorIterator {
  constructor(iterator3) {
    this.iterator = iterator3;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => {
    {
      return TypeGuardUnknownTypeError;
    }
  },
  IsVoid: () => {
    {
      return IsVoid2;
    }
  },
  IsUnsafe: () => {
    {
      return IsUnsafe2;
    }
  },
  IsUnknown: () => {
    {
      return IsUnknown2;
    }
  },
  IsUnionLiteral: () => {
    {
      return IsUnionLiteral;
    }
  },
  IsUnion: () => {
    {
      return IsUnion2;
    }
  },
  IsUndefined: () => {
    {
      return IsUndefined4;
    }
  },
  IsUint8Array: () => {
    {
      return IsUint8Array4;
    }
  },
  IsTuple: () => {
    {
      return IsTuple2;
    }
  },
  IsTransform: () => {
    {
      return IsTransform2;
    }
  },
  IsThis: () => {
    {
      return IsThis2;
    }
  },
  IsTemplateLiteral: () => {
    {
      return IsTemplateLiteral2;
    }
  },
  IsSymbol: () => {
    {
      return IsSymbol4;
    }
  },
  IsString: () => {
    {
      return IsString4;
    }
  },
  IsSchema: () => {
    {
      return IsSchema2;
    }
  },
  IsRegExp: () => {
    {
      return IsRegExp3;
    }
  },
  IsRef: () => {
    {
      return IsRef2;
    }
  },
  IsRecursive: () => {
    {
      return IsRecursive;
    }
  },
  IsRecord: () => {
    {
      return IsRecord2;
    }
  },
  IsReadonly: () => {
    {
      return IsReadonly2;
    }
  },
  IsProperties: () => {
    {
      return IsProperties;
    }
  },
  IsPromise: () => {
    {
      return IsPromise3;
    }
  },
  IsOptional: () => {
    {
      return IsOptional2;
    }
  },
  IsObject: () => {
    {
      return IsObject4;
    }
  },
  IsNumber: () => {
    {
      return IsNumber4;
    }
  },
  IsNull: () => {
    {
      return IsNull4;
    }
  },
  IsNot: () => {
    {
      return IsNot2;
    }
  },
  IsNever: () => {
    {
      return IsNever2;
    }
  },
  IsMappedResult: () => {
    {
      return IsMappedResult2;
    }
  },
  IsMappedKey: () => {
    {
      return IsMappedKey2;
    }
  },
  IsLiteralValue: () => {
    {
      return IsLiteralValue;
    }
  },
  IsLiteralString: () => {
    {
      return IsLiteralString;
    }
  },
  IsLiteralNumber: () => {
    {
      return IsLiteralNumber;
    }
  },
  IsLiteralBoolean: () => {
    {
      return IsLiteralBoolean;
    }
  },
  IsLiteral: () => {
    {
      return IsLiteral2;
    }
  },
  IsKindOf: () => {
    {
      return IsKindOf2;
    }
  },
  IsKind: () => {
    {
      return IsKind2;
    }
  },
  IsIterator: () => {
    {
      return IsIterator4;
    }
  },
  IsIntersect: () => {
    {
      return IsIntersect2;
    }
  },
  IsInteger: () => {
    {
      return IsInteger3;
    }
  },
  IsFunction: () => {
    {
      return IsFunction4;
    }
  },
  IsDate: () => {
    {
      return IsDate4;
    }
  },
  IsConstructor: () => {
    {
      return IsConstructor2;
    }
  },
  IsBoolean: () => {
    {
      return IsBoolean4;
    }
  },
  IsBigInt: () => {
    {
      return IsBigInt4;
    }
  },
  IsAsyncIterator: () => {
    {
      return IsAsyncIterator4;
    }
  },
  IsArray: () => {
    {
      return IsArray4;
    }
  },
  IsAny: () => {
    {
      return IsAny2;
    }
  }
});
var IsPattern = function(value3) {
  try {
    new RegExp(value3);
    return true;
  } catch {
    return false;
  }
};
var IsControlCharacterFree = function(value3) {
  if (!IsString2(value3))
    return false;
  for (let i = 0;i < value3.length; i++) {
    const code = value3.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
};
var IsAdditionalProperties = function(value3) {
  return IsOptionalBoolean(value3) || IsSchema2(value3);
};
var IsOptionalBigInt = function(value3) {
  return IsUndefined2(value3) || IsBigInt2(value3);
};
var IsOptionalNumber = function(value3) {
  return IsUndefined2(value3) || IsNumber2(value3);
};
var IsOptionalBoolean = function(value3) {
  return IsUndefined2(value3) || IsBoolean2(value3);
};
var IsOptionalString = function(value3) {
  return IsUndefined2(value3) || IsString2(value3);
};
var IsOptionalPattern = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3) && IsPattern(value3);
};
var IsOptionalFormat = function(value3) {
  return IsUndefined2(value3) || IsString2(value3) && IsControlCharacterFree(value3);
};
var IsOptionalSchema = function(value3) {
  return IsUndefined2(value3) || IsSchema2(value3);
};
function IsReadonly2(value3) {
  return IsObject2(value3) && value3[ReadonlyKind] === "Readonly";
}
function IsOptional2(value3) {
  return IsObject2(value3) && value3[OptionalKind] === "Optional";
}
function IsAny2(value3) {
  return IsKindOf2(value3, "Any") && IsOptionalString(value3.$id);
}
function IsArray4(value3) {
  return IsKindOf2(value3, "Array") && value3.type === "array" && IsOptionalString(value3.$id) && IsSchema2(value3.items) && IsOptionalNumber(value3.minItems) && IsOptionalNumber(value3.maxItems) && IsOptionalBoolean(value3.uniqueItems) && IsOptionalSchema(value3.contains) && IsOptionalNumber(value3.minContains) && IsOptionalNumber(value3.maxContains);
}
function IsAsyncIterator4(value3) {
  return IsKindOf2(value3, "AsyncIterator") && value3.type === "AsyncIterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsBigInt4(value3) {
  return IsKindOf2(value3, "BigInt") && value3.type === "bigint" && IsOptionalString(value3.$id) && IsOptionalBigInt(value3.exclusiveMaximum) && IsOptionalBigInt(value3.exclusiveMinimum) && IsOptionalBigInt(value3.maximum) && IsOptionalBigInt(value3.minimum) && IsOptionalBigInt(value3.multipleOf);
}
function IsBoolean4(value3) {
  return IsKindOf2(value3, "Boolean") && value3.type === "boolean" && IsOptionalString(value3.$id);
}
function IsConstructor2(value3) {
  return IsKindOf2(value3, "Constructor") && value3.type === "Constructor" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsDate4(value3) {
  return IsKindOf2(value3, "Date") && value3.type === "Date" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximumTimestamp) && IsOptionalNumber(value3.exclusiveMinimumTimestamp) && IsOptionalNumber(value3.maximumTimestamp) && IsOptionalNumber(value3.minimumTimestamp) && IsOptionalNumber(value3.multipleOfTimestamp);
}
function IsFunction4(value3) {
  return IsKindOf2(value3, "Function") && value3.type === "Function" && IsOptionalString(value3.$id) && IsArray2(value3.parameters) && value3.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value3.returns);
}
function IsInteger3(value3) {
  return IsKindOf2(value3, "Integer") && value3.type === "integer" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsProperties(value3) {
  return IsObject2(value3) && Object.entries(value3).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
function IsIntersect2(value3) {
  return IsKindOf2(value3, "Intersect") && (IsString2(value3.type) && value3.type !== "object" ? false : true) && IsArray2(value3.allOf) && value3.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value3.type) && (IsOptionalBoolean(value3.unevaluatedProperties) || IsOptionalSchema(value3.unevaluatedProperties)) && IsOptionalString(value3.$id);
}
function IsIterator4(value3) {
  return IsKindOf2(value3, "Iterator") && value3.type === "Iterator" && IsOptionalString(value3.$id) && IsSchema2(value3.items);
}
function IsKindOf2(value3, kind14) {
  return IsObject2(value3) && Kind in value3 && value3[Kind] === kind14;
}
function IsLiteralString(value3) {
  return IsLiteral2(value3) && IsString2(value3.const);
}
function IsLiteralNumber(value3) {
  return IsLiteral2(value3) && IsNumber2(value3.const);
}
function IsLiteralBoolean(value3) {
  return IsLiteral2(value3) && IsBoolean2(value3.const);
}
function IsLiteral2(value3) {
  return IsKindOf2(value3, "Literal") && IsOptionalString(value3.$id) && IsLiteralValue(value3.const);
}
function IsLiteralValue(value3) {
  return IsBoolean2(value3) || IsNumber2(value3) || IsString2(value3);
}
function IsMappedKey2(value3) {
  return IsKindOf2(value3, "MappedKey") && IsArray2(value3.keys) && value3.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult2(value3) {
  return IsKindOf2(value3, "MappedResult") && IsProperties(value3.properties);
}
function IsNever2(value3) {
  return IsKindOf2(value3, "Never") && IsObject2(value3.not) && Object.getOwnPropertyNames(value3.not).length === 0;
}
function IsNot2(value3) {
  return IsKindOf2(value3, "Not") && IsSchema2(value3.not);
}
function IsNull4(value3) {
  return IsKindOf2(value3, "Null") && value3.type === "null" && IsOptionalString(value3.$id);
}
function IsNumber4(value3) {
  return IsKindOf2(value3, "Number") && value3.type === "number" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.exclusiveMaximum) && IsOptionalNumber(value3.exclusiveMinimum) && IsOptionalNumber(value3.maximum) && IsOptionalNumber(value3.minimum) && IsOptionalNumber(value3.multipleOf);
}
function IsObject4(value3) {
  return IsKindOf2(value3, "Object") && value3.type === "object" && IsOptionalString(value3.$id) && IsProperties(value3.properties) && IsAdditionalProperties(value3.additionalProperties) && IsOptionalNumber(value3.minProperties) && IsOptionalNumber(value3.maxProperties);
}
function IsPromise3(value3) {
  return IsKindOf2(value3, "Promise") && value3.type === "Promise" && IsOptionalString(value3.$id) && IsSchema2(value3.item);
}
function IsRecord2(value3) {
  return IsKindOf2(value3, "Record") && value3.type === "object" && IsOptionalString(value3.$id) && IsAdditionalProperties(value3.additionalProperties) && IsObject2(value3.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value3);
}
function IsRecursive(value3) {
  return IsObject2(value3) && Hint in value3 && value3[Hint] === "Recursive";
}
function IsRef2(value3) {
  return IsKindOf2(value3, "Ref") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsRegExp3(value3) {
  return IsKindOf2(value3, "RegExp") && IsOptionalString(value3.$id) && IsString2(value3.source) && IsString2(value3.flags) && IsOptionalNumber(value3.maxLength) && IsOptionalNumber(value3.minLength);
}
function IsString4(value3) {
  return IsKindOf2(value3, "String") && value3.type === "string" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minLength) && IsOptionalNumber(value3.maxLength) && IsOptionalPattern(value3.pattern) && IsOptionalFormat(value3.format);
}
function IsSymbol4(value3) {
  return IsKindOf2(value3, "Symbol") && value3.type === "symbol" && IsOptionalString(value3.$id);
}
function IsTemplateLiteral2(value3) {
  return IsKindOf2(value3, "TemplateLiteral") && value3.type === "string" && IsString2(value3.pattern) && value3.pattern[0] === "^" && value3.pattern[value3.pattern.length - 1] === "$";
}
function IsThis2(value3) {
  return IsKindOf2(value3, "This") && IsOptionalString(value3.$id) && IsString2(value3.$ref);
}
function IsTransform2(value3) {
  return IsObject2(value3) && TransformKind in value3;
}
function IsTuple2(value3) {
  return IsKindOf2(value3, "Tuple") && value3.type === "array" && IsOptionalString(value3.$id) && IsNumber2(value3.minItems) && IsNumber2(value3.maxItems) && value3.minItems === value3.maxItems && (IsUndefined2(value3.items) && IsUndefined2(value3.additionalItems) && value3.minItems === 0 || IsArray2(value3.items) && value3.items.every((schema) => IsSchema2(schema)));
}
function IsUndefined4(value3) {
  return IsKindOf2(value3, "Undefined") && value3.type === "undefined" && IsOptionalString(value3.$id);
}
function IsUnionLiteral(value3) {
  return IsUnion2(value3) && value3.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion2(value3) {
  return IsKindOf2(value3, "Union") && IsOptionalString(value3.$id) && IsObject2(value3) && IsArray2(value3.anyOf) && value3.anyOf.every((schema) => IsSchema2(schema));
}
function IsUint8Array4(value3) {
  return IsKindOf2(value3, "Uint8Array") && value3.type === "Uint8Array" && IsOptionalString(value3.$id) && IsOptionalNumber(value3.minByteLength) && IsOptionalNumber(value3.maxByteLength);
}
function IsUnknown2(value3) {
  return IsKindOf2(value3, "Unknown") && IsOptionalString(value3.$id);
}
function IsUnsafe2(value3) {
  return IsKindOf2(value3, "Unsafe");
}
function IsVoid2(value3) {
  return IsKindOf2(value3, "Void") && value3.type === "void" && IsOptionalString(value3.$id);
}
function IsKind2(value3) {
  return IsObject2(value3) && Kind in value3 && IsString2(value3[Kind]) && !KnownTypes.includes(value3[Kind]);
}
function IsSchema2(value3) {
  return IsObject2(value3) && (IsAny2(value3) || IsArray4(value3) || IsBoolean4(value3) || IsBigInt4(value3) || IsAsyncIterator4(value3) || IsConstructor2(value3) || IsDate4(value3) || IsFunction4(value3) || IsInteger3(value3) || IsIntersect2(value3) || IsIterator4(value3) || IsLiteral2(value3) || IsMappedKey2(value3) || IsMappedResult2(value3) || IsNever2(value3) || IsNot2(value3) || IsNull4(value3) || IsNumber4(value3) || IsObject4(value3) || IsPromise3(value3) || IsRecord2(value3) || IsRef2(value3) || IsRegExp3(value3) || IsString4(value3) || IsSymbol4(value3) || IsTemplateLiteral2(value3) || IsThis2(value3) || IsTuple2(value3) || IsUndefined4(value3) || IsUnion2(value3) || IsUint8Array4(value3) || IsUnknown2(value3) || IsUnsafe2(value3) || IsVoid2(value3) || IsKind2(value3));
}

class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
var IntoBooleanResult = function(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
};
var Throw = function(message) {
  throw new ExtendsResolverError(message);
};
var IsStructuralRight = function(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
};
var StructuralRight = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
};
var FromAnyRight = function(left, right) {
  return ExtendsResult.True;
};
var FromAny2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
};
var FromArrayRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromArray4 = function(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromAsyncIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromBigInt2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBooleanRight = function(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromBoolean2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromConstructor2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromDate2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromFunction2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
};
var FromIntegerRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromInteger2 = function(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
};
var FromIntersectRight = function(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIntersect4 = function(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromIterator2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
};
var FromLiteral3 = function(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
};
var FromNeverRight = function(left, right) {
  return ExtendsResult.False;
};
var FromNever2 = function(left, right) {
  return ExtendsResult.True;
};
var UnwrapTNot = function(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
};
var FromNot2 = function(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
};
var FromNull2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumberRight = function(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromNumber2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
};
var IsObjectPropertyCount = function(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
};
var IsObjectStringLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectSymbolLike = function(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
};
var IsObjectNumberLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBooleanLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectBigIntLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectDateLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectUint8ArrayLike = function(schema) {
  return IsObjectArrayLike(schema);
};
var IsObjectFunctionLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectConstructorLike = function(schema) {
  return IsObjectPropertyCount(schema, 0);
};
var IsObjectArrayLike = function(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
};
var IsObjectPromiseLike = function(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
};
var Property = function(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
};
var FromObjectRight = function(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
};
var FromObject2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
};
var FromPromise2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
};
var RecordKey = function(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
};
var RecordValue = function(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
};
var FromRecordRight = function(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
};
var FromRecord2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
};
var FromRegExp2 = function(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
};
var FromStringRight = function(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromString2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromSymbol2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromTemplateLiteral3 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
};
var IsArrayOfTuple = function(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
};
var FromTupleRight = function(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
};
var FromTuple4 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUint8Array2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUndefined2 = function(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnionRight = function(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnion6 = function(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
};
var FromUnknownRight = function(left, right) {
  return ExtendsResult.True;
};
var FromUnknown2 = function(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoidRight = function(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
};
var FromVoid2 = function(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
};
var Visit5 = function(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
};
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}

class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
var FromProperties7 = function(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
};
var FromMappedResult6 = function(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
};
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
var ExtendsResolve = function(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
};
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
var FromPropertyKey = function(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
};
var FromPropertyKeys = function(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
};
var FromMappedKey2 = function(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
};
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
var IsAnyOrUnknown = function(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
};
var IsDefined2 = function(value3) {
  return value3 !== undefined;
};
var FromAny3 = function(schema, references, value3) {
  return true;
};
var FromArray5 = function(schema, references, value3) {
  if (!IsArray(value3))
    return false;
  if (IsDefined2(schema.minItems) && !(value3.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value3.length <= schema.maxItems)) {
    return false;
  }
  if (!value3.every((value4) => Visit6(schema.items, references, value4))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set2 = new Set;
    for (const element of value3) {
      const hashed = Hash(element);
      if (set2.has(hashed)) {
        return false;
      } else {
        set2.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value3.reduce((acc, value4) => Visit6(containsSchema, references, value4) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
};
var FromAsyncIterator3 = function(schema, references, value3) {
  return IsAsyncIterator(value3);
};
var FromBigInt3 = function(schema, references, value3) {
  if (!IsBigInt(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
};
var FromBoolean3 = function(schema, references, value3) {
  return IsBoolean(value3);
};
var FromConstructor3 = function(schema, references, value3) {
  return Visit6(schema.returns, references, value3.prototype);
};
var FromDate3 = function(schema, references, value3) {
  if (!IsDate(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value3.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value3.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value3.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value3.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value3.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
};
var FromFunction3 = function(schema, references, value3) {
  return IsFunction(value3);
};
var FromInteger3 = function(schema, references, value3) {
  if (!IsInteger(value3)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromIntersect5 = function(schema, references, value3) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value3));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value3).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value3[key]));
    return check1 && check2;
  } else {
    return check1;
  }
};
var FromIterator3 = function(schema, references, value3) {
  return IsIterator(value3);
};
var FromLiteral4 = function(schema, references, value3) {
  return value3 === schema.const;
};
var FromNever3 = function(schema, references, value3) {
  return false;
};
var FromNot3 = function(schema, references, value3) {
  return !Visit6(schema.not, references, value3);
};
var FromNull3 = function(schema, references, value3) {
  return IsNull(value3);
};
var FromNumber3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsNumberLike(value3))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value3 < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value3 > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value3 >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value3 <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value3 % schema.multipleOf === 0)) {
    return false;
  }
  return true;
};
var FromObject3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsObjectLike(value3))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value3[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value3)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value3, knownKey) && !Visit6(property, references, value3[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value3);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value3);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value3[key]));
  } else {
    return true;
  }
};
var FromPromise3 = function(schema, references, value3) {
  return IsPromise(value3);
};
var FromRecord3 = function(schema, references, value3) {
  if (!TypeSystemPolicy.IsRecordLike(value3)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value3).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value3).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value3).every(([key, value4]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value4) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value3).every(([key, value4]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value4) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value3).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
};
var FromRef2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromRegExp3 = function(schema, references, value3) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  return regex.test(value3);
};
var FromString3 = function(schema, references, value3) {
  if (!IsString(value3)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value3.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value3.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value3))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value3);
  }
  return true;
};
var FromSymbol3 = function(schema, references, value3) {
  return IsSymbol(value3);
};
var FromTemplateLiteral4 = function(schema, references, value3) {
  return IsString(value3) && new RegExp(schema.pattern).test(value3);
};
var FromThis2 = function(schema, references, value3) {
  return Visit6(Deref(schema, references), references, value3);
};
var FromTuple5 = function(schema, references, value3) {
  if (!IsArray(value3)) {
    return false;
  }
  if (schema.items === undefined && !(value3.length === 0)) {
    return false;
  }
  if (!(value3.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value3[i]))
      return false;
  }
  return true;
};
var FromUndefined3 = function(schema, references, value3) {
  return IsUndefined(value3);
};
var FromUnion7 = function(schema, references, value3) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value3));
};
var FromUint8Array3 = function(schema, references, value3) {
  if (!IsUint8Array(value3)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value3.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value3.length >= schema.minByteLength)) {
    return false;
  }
  return true;
};
var FromUnknown3 = function(schema, references, value3) {
  return true;
};
var FromVoid3 = function(schema, references, value3) {
  return TypeSystemPolicy.IsVoidLike(value3);
};
var FromKind2 = function(schema, references, value3) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value3);
};
var Visit6 = function(schema, references, value3) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value3);
    case "Array":
      return FromArray5(schema_, references_, value3);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value3);
    case "BigInt":
      return FromBigInt3(schema_, references_, value3);
    case "Boolean":
      return FromBoolean3(schema_, references_, value3);
    case "Constructor":
      return FromConstructor3(schema_, references_, value3);
    case "Date":
      return FromDate3(schema_, references_, value3);
    case "Function":
      return FromFunction3(schema_, references_, value3);
    case "Integer":
      return FromInteger3(schema_, references_, value3);
    case "Intersect":
      return FromIntersect5(schema_, references_, value3);
    case "Iterator":
      return FromIterator3(schema_, references_, value3);
    case "Literal":
      return FromLiteral4(schema_, references_, value3);
    case "Never":
      return FromNever3(schema_, references_, value3);
    case "Not":
      return FromNot3(schema_, references_, value3);
    case "Null":
      return FromNull3(schema_, references_, value3);
    case "Number":
      return FromNumber3(schema_, references_, value3);
    case "Object":
      return FromObject3(schema_, references_, value3);
    case "Promise":
      return FromPromise3(schema_, references_, value3);
    case "Record":
      return FromRecord3(schema_, references_, value3);
    case "Ref":
      return FromRef2(schema_, references_, value3);
    case "RegExp":
      return FromRegExp3(schema_, references_, value3);
    case "String":
      return FromString3(schema_, references_, value3);
    case "Symbol":
      return FromSymbol3(schema_, references_, value3);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value3);
    case "This":
      return FromThis2(schema_, references_, value3);
    case "Tuple":
      return FromTuple5(schema_, references_, value3);
    case "Undefined":
      return FromUndefined3(schema_, references_, value3);
    case "Union":
      return FromUnion7(schema_, references_, value3);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value3);
    case "Unknown":
      return FromUnknown3(schema_, references_, value3);
    case "Void":
      return FromVoid3(schema_, references_, value3);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value3);
  }
};
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}

class ValueCheckUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
var ObjectType3 = function(value3) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value3)) {
    Acc[key] = Clone2(value3[key]);
  }
  return Acc;
};
var ArrayType3 = function(value3) {
  return value3.map((element) => Clone2(element));
};
var TypedArrayType = function(value3) {
  return value3.slice();
};
var DateType3 = function(value3) {
  return new Date(value3.toISOString());
};
var ValueType = function(value3) {
  return value3;
};
function Clone2(value3) {
  if (IsArray(value3))
    return ArrayType3(value3);
  if (IsDate(value3))
    return DateType3(value3);
  if (IsStandardObject(value3))
    return ObjectType3(value3);
  if (IsTypedArray(value3))
    return TypedArrayType(value3);
  if (IsValueType(value3))
    return ValueType(value3);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
var FromDefault = function(value3) {
  return typeof value3 === "function" ? value3 : Clone2(value3);
};
var FromAny4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromArray6 = function(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
};
var FromAsyncIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
};
var FromBigInt4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
};
var FromBoolean4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
};
var FromConstructor4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = Visit7(schema.returns, references);
    if (typeof value3 === "object" && !Array.isArray(value3)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value3)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
};
var FromDate4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
};
var FromFunction4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
};
var FromInteger4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromIntersect6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value3 = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value3))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value3;
  }
};
var FromIterator4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
};
var FromLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
};
var FromNever4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
};
var FromNot4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
};
var FromNull4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
};
var FromNumber4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
};
var FromObject4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
};
var FromPromise4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
};
var FromRecord4 = function(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
};
var FromRef3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromRegExp4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
};
var FromString4 = function(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
};
var FromSymbol4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
};
var FromTemplateLiteral5 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
};
var FromThis3 = function(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
};
var FromTuple6 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
};
var FromUndefined4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromUnion8 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
};
var FromUint8Array4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
};
var FromUnknown4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
};
var FromVoid4 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
};
var FromKind3 = function(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
};
var Visit7 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
};
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}

class ValueCreateError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
var ScoreUnion = function(schema, references, value3) {
  if (schema[Kind] === "Object" && typeof value3 === "object" && !IsNull(value3)) {
    const object3 = schema;
    const keys = Object.getOwnPropertyNames(value3);
    const entries = Object.entries(object3.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal7 = schema2[Kind] === "Literal" && schema2.const === value3[key] ? max : 0;
      const checks = Check(schema2, references, value3[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal7 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value3) ? 1 : 0;
  }
};
var SelectUnion = function(union9, references, value3) {
  const schemas = union9.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value3);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
};
var CastUnion = function(union9, references, value3) {
  if ("default" in union9) {
    return typeof value3 === "function" ? union9.default : Clone2(union9.default);
  } else {
    const schema = SelectUnion(union9, references, value3);
    return Cast(schema, references, value3);
  }
};
var DefaultClone = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : Create2(schema, references);
};
var Default = function(schema, references, value3) {
  return Check(schema, references, value3) ? value3 : Create2(schema, references);
};
var FromArray7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  const created = IsArray(value3) ? Clone2(value3) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value4) => Visit8(schema.items, references, value4));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
};
var FromConstructor5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value3.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value3.prototype[key]);
  }
  return result;
};
var FromIntersect7 = function(schema, references, value3) {
  const created = Create2(schema, references);
  const mapped9 = IsStandardObject(created) && IsStandardObject(value3) ? { ...created, ...value3 } : value3;
  return Check(schema, references, mapped9) ? mapped9 : Create2(schema, references);
};
var FromNever5 = function(schema, references, value3) {
  throw new ValueCastError(schema, "Never types cannot be cast");
};
var FromObject5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return value3;
  if (value3 === null || typeof value3 !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value3[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value3[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value3)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value3[propertyName]);
    }
  }
  return result;
};
var FromRecord5 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (value3 === null || typeof value3 !== "object" || Array.isArray(value3) || value3 instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
};
var FromRef4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromThis4 = function(schema, references, value3) {
  return Visit8(Deref(schema, references), references, value3);
};
var FromTuple7 = function(schema, references, value3) {
  if (Check(schema, references, value3))
    return Clone2(value3);
  if (!IsArray(value3))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value3[index]));
};
var FromUnion9 = function(schema, references, value3) {
  return Check(schema, references, value3) ? Clone2(value3) : CastUnion(schema, references, value3);
};
var Visit8 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value3);
    case "Constructor":
      return FromConstructor5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect7(schema_, references_, value3);
    case "Never":
      return FromNever5(schema_, references_, value3);
    case "Object":
      return FromObject5(schema_, references_, value3);
    case "Record":
      return FromRecord5(schema_, references_, value3);
    case "Ref":
      return FromRef4(schema_, references_, value3);
    case "This":
      return FromThis4(schema_, references_, value3);
    case "Tuple":
      return FromTuple7(schema_, references_, value3);
    case "Union":
      return FromUnion9(schema_, references_, value3);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value3);
    default:
      return Default(schema_, references_, value3);
  }
};
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}

class ValueCastError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
var IsCheckable = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var FromArray8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  return value3.map((value4) => Visit9(schema.items, references, value4));
};
var FromIntersect8 = function(schema, references, value3) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value3)));
  const composite = intersections.reduce((acc, value4) => IsObject(value4) ? { ...acc, ...value4 } : value4, {});
  if (!IsObject(value3) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value3[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value3[key]);
    }
  }
  return composite;
};
var FromObject6 = function(schema, references, value3) {
  if (!IsObject(value3) || IsArray(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value3)) {
    if (key in schema.properties) {
      value3[key] = Visit9(schema.properties[key], references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRecord6 = function(schema, references, value3) {
  if (!IsObject(value3))
    return value3;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value3);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value3[key] = Visit9(propertySchema, references, value3[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value3[key])) {
      value3[key] = Visit9(additionalProperties, references, value3[key]);
      continue;
    }
    delete value3[key];
  }
  return value3;
};
var FromRef5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromThis5 = function(schema, references, value3) {
  return Visit9(Deref(schema, references), references, value3);
};
var FromTuple8 = function(schema, references, value3) {
  if (!IsArray(value3))
    return value3;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value3.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value3[i] = Visit9(schema.items[i], references, value3[i]);
  }
  return value3.length > length ? value3.slice(0, length) : value3;
};
var FromUnion10 = function(schema, references, value3) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value3)) {
      return Visit9(inner, references, value3);
    }
  }
  return value3;
};
var Visit9 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value3);
    case "Intersect":
      return FromIntersect8(schema_, references_, value3);
    case "Object":
      return FromObject6(schema_, references_, value3);
    case "Record":
      return FromRecord6(schema_, references_, value3);
    case "Ref":
      return FromRef5(schema_, references_, value3);
    case "This":
      return FromThis5(schema_, references_, value3);
    case "Tuple":
      return FromTuple8(schema_, references_, value3);
    case "Union":
      return FromUnion10(schema_, references_, value3);
    default:
      return value3;
  }
};
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
var IsStringNumeric = function(value3) {
  return IsString(value3) && !isNaN(value3) && !isNaN(parseFloat(value3));
};
var IsValueToString = function(value3) {
  return IsBigInt(value3) || IsBoolean(value3) || IsNumber(value3);
};
var IsValueTrue = function(value3) {
  return value3 === true || IsNumber(value3) && value3 === 1 || IsBigInt(value3) && value3 === BigInt("1") || IsString(value3) && (value3.toLowerCase() === "true" || value3 === "1");
};
var IsValueFalse = function(value3) {
  return value3 === false || IsNumber(value3) && (value3 === 0 || Object.is(value3, -0)) || IsBigInt(value3) && value3 === BigInt("0") || IsString(value3) && (value3.toLowerCase() === "false" || value3 === "0" || value3 === "-0");
};
var IsTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateTimeStringWithTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value3);
};
var IsDateTimeStringWithoutTimeZone = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value3);
};
var IsDateString = function(value3) {
  return IsString(value3) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value3);
};
var TryConvertLiteralString = function(value3, target) {
  const conversion = TryConvertString(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralNumber = function(value3, target) {
  const conversion = TryConvertNumber(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteralBoolean = function(value3, target) {
  const conversion = TryConvertBoolean(value3);
  return conversion === target ? conversion : value3;
};
var TryConvertLiteral = function(schema, value3) {
  return IsString(schema.const) ? TryConvertLiteralString(value3, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value3, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value3, schema.const) : Clone2(value3);
};
var TryConvertBoolean = function(value3) {
  return IsValueTrue(value3) ? true : IsValueFalse(value3) ? false : value3;
};
var TryConvertBigInt = function(value3) {
  return IsStringNumeric(value3) ? BigInt(parseInt(value3)) : IsNumber(value3) ? BigInt(value3 | 0) : IsValueFalse(value3) ? BigInt(0) : IsValueTrue(value3) ? BigInt(1) : value3;
};
var TryConvertString = function(value3) {
  return IsValueToString(value3) ? value3.toString() : IsSymbol(value3) && value3.description !== undefined ? value3.description.toString() : value3;
};
var TryConvertNumber = function(value3) {
  return IsStringNumeric(value3) ? parseFloat(value3) : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertInteger = function(value3) {
  return IsStringNumeric(value3) ? parseInt(value3) : IsNumber(value3) ? value3 | 0 : IsValueTrue(value3) ? 1 : IsValueFalse(value3) ? 0 : value3;
};
var TryConvertNull = function(value3) {
  return IsString(value3) && value3.toLowerCase() === "null" ? null : value3;
};
var TryConvertUndefined = function(value3) {
  return IsString(value3) && value3 === "undefined" ? undefined : value3;
};
var TryConvertDate = function(value3) {
  return IsDate(value3) ? value3 : IsNumber(value3) ? new Date(value3) : IsValueTrue(value3) ? new Date(1) : IsValueFalse(value3) ? new Date(0) : IsStringNumeric(value3) ? new Date(parseInt(value3)) : IsTimeStringWithoutTimeZone(value3) ? new Date(`1970-01-01T${value3}.000Z`) : IsTimeStringWithTimeZone(value3) ? new Date(`1970-01-01T${value3}`) : IsDateTimeStringWithoutTimeZone(value3) ? new Date(`${value3}.000Z`) : IsDateTimeStringWithTimeZone(value3) ? new Date(value3) : IsDateString(value3) ? new Date(`${value3}T00:00:00.000Z`) : value3;
};
var Default2 = function(value3) {
  return value3;
};
var FromArray9 = function(schema, references, value3) {
  const elements = IsArray(value3) ? value3 : [value3];
  return elements.map((element) => Visit10(schema.items, references, element));
};
var FromBigInt5 = function(schema, references, value3) {
  return TryConvertBigInt(value3);
};
var FromBoolean5 = function(schema, references, value3) {
  return TryConvertBoolean(value3);
};
var FromDate5 = function(schema, references, value3) {
  return TryConvertDate(value3);
};
var FromInteger5 = function(schema, references, value3) {
  return TryConvertInteger(value3);
};
var FromIntersect9 = function(schema, references, value3) {
  return schema.allOf.reduce((value4, schema2) => Visit10(schema2, references, value4), value3);
};
var FromLiteral6 = function(schema, references, value3) {
  return TryConvertLiteral(schema, value3);
};
var FromNull5 = function(schema, references, value3) {
  return TryConvertNull(value3);
};
var FromNumber5 = function(schema, references, value3) {
  return TryConvertNumber(value3);
};
var FromObject7 = function(schema, references, value3) {
  const isConvertable = IsObject(value3);
  if (!isConvertable)
    return value3;
  const result = {};
  for (const key of Object.keys(value3)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value3[key]) : value3[key];
  }
  return result;
};
var FromRecord7 = function(schema, references, value3) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value3)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
};
var FromRef6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromString5 = function(schema, references, value3) {
  return TryConvertString(value3);
};
var FromSymbol5 = function(schema, references, value3) {
  return IsString(value3) || IsNumber(value3) ? Symbol(value3) : value3;
};
var FromThis6 = function(schema, references, value3) {
  return Visit10(Deref(schema, references), references, value3);
};
var FromTuple9 = function(schema, references, value3) {
  const isConvertable = IsArray(value3) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value3;
  return value3.map((value4, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value4) : value4;
  });
};
var FromUndefined5 = function(schema, references, value3) {
  return TryConvertUndefined(value3);
};
var FromUnion11 = function(schema, references, value3) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value3);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value3;
};
var Visit10 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value3);
    case "BigInt":
      return FromBigInt5(schema_, references_, value3);
    case "Boolean":
      return FromBoolean5(schema_, references_, value3);
    case "Date":
      return FromDate5(schema_, references_, value3);
    case "Integer":
      return FromInteger5(schema_, references_, value3);
    case "Intersect":
      return FromIntersect9(schema_, references_, value3);
    case "Literal":
      return FromLiteral6(schema_, references_, value3);
    case "Null":
      return FromNull5(schema_, references_, value3);
    case "Number":
      return FromNumber5(schema_, references_, value3);
    case "Object":
      return FromObject7(schema_, references_, value3);
    case "Record":
      return FromRecord7(schema_, references_, value3);
    case "Ref":
      return FromRef6(schema_, references_, value3);
    case "String":
      return FromString5(schema_, references_, value3);
    case "Symbol":
      return FromSymbol5(schema_, references_, value3);
    case "This":
      return FromThis6(schema_, references_, value3);
    case "Tuple":
      return FromTuple9(schema_, references_, value3);
    case "Undefined":
      return FromUndefined5(schema_, references_, value3);
    case "Union":
      return FromUnion11(schema_, references_, value3);
    default:
      return Default2(value3);
  }
};
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
var ValueOrDefault = function(schema, value3) {
  return value3 === undefined && "default" in schema ? Clone2(schema.default) : value3;
};
var IsCheckable2 = function(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
};
var IsDefaultSchema = function(value3) {
  return IsSchema2(value3) && "default" in value3;
};
var FromArray10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
};
var FromIntersect10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
};
var FromObject8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRecord8 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
};
var FromRef7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value3));
};
var FromThis7 = function(schema, references, value3) {
  return Visit11(Deref(schema, references), references, value3);
};
var FromTuple10 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
};
var FromUnion12 = function(schema, references, value3) {
  const defaulted = ValueOrDefault(schema, value3);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
};
var Visit11 = function(schema, references, value3) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value3);
    case "Intersect":
      return FromIntersect10(schema_, references_, value3);
    case "Object":
      return FromObject8(schema_, references_, value3);
    case "Record":
      return FromRecord8(schema_, references_, value3);
    case "Ref":
      return FromRef7(schema_, references_, value3);
    case "This":
      return FromThis7(schema_, references_, value3);
    case "Tuple":
      return FromTuple10(schema_, references_, value3);
    case "Union":
      return FromUnion12(schema_, references_, value3);
    default:
      return ValueOrDefault(schema_, value3);
  }
};
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => {
    {
      return ValuePointerRootSetError;
    }
  },
  ValuePointerRootDeleteError: () => {
    {
      return ValuePointerRootDeleteError;
    }
  },
  Set: () => {
    {
      return Set4;
    }
  },
  Has: () => {
    {
      return Has3;
    }
  },
  Get: () => {
    {
      return Get3;
    }
  },
  Format: () => {
    {
      return Format;
    }
  },
  Delete: () => {
    {
      return Delete3;
    }
  }
});
var Escape2 = function(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
};
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value3, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value3, pointer, update);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value3, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value3, pointer);
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value3, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value3, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value3, pointer) {
  if (pointer === "")
    return value3;
  let current = value3;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}

class ValuePointerRootSetError extends TypeBoxError {
  constructor(value3, path, update) {
    super("Cannot set root value");
    this.value = value3;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  constructor(value3, path) {
    super("Cannot delete root value");
    this.value = value3;
    this.path = path;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var CreateUpdate = function(path, value3) {
  return { type: "update", path, value: value3 };
};
var CreateInsert = function(path, value3) {
  return { type: "insert", path, value: value3 };
};
var CreateDelete = function(path) {
  return { type: "delete", path };
};
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
var IsRootUpdate = function(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
};
var IsIdentity = function(edits) {
  return edits.length === 0;
};
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone8 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone8, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone8, edit.path);
        break;
      }
    }
  }
  return clone8;
}
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  constructor(value3, message) {
    super(message);
    this.value = value3;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  constructor(value3) {
    super(value3, "Cannot diff objects with symbol keys");
    this.value = value3;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
var ObjectType5 = function(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
};
var DateType4 = function(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
};
var ArrayType5 = function(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var TypedArrayType3 = function(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value3, index) => Equal(value3, right[index]));
};
var ValueType3 = function(left, right) {
  return left === right;
};
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
var ObjectType6 = function(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
};
var ArrayType6 = function(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
};
var TypedArrayType4 = function(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
};
var ValueType4 = function(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
};
var Visit13 = function(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
};
var IsNonMutableValue = function(value3) {
  return IsTypedArray(value3) || IsValueType(value3);
};
var IsMismatchedValue = function(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
};
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}

class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
var Default4 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value3) : value3;
  } catch (error19) {
    throw new TransformDecodeError(schema, path, value3, error19);
  }
};
var FromArray11 = function(schema, references, path, value3) {
  return IsArray(value3) ? Default4(schema, path, value3.map((value4, index) => Visit14(schema.items, references, `${path}/${index}`, value4))) : Default4(schema, path, value3);
};
var FromIntersect11 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3) || IsValueType(value3))
    return Default4(schema, path, value3);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value3 };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromNot5 = function(schema, references, path, value3) {
  return Default4(schema, path, Visit14(schema.not, references, path, value3));
};
var FromObject9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value3 };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRecord9 = function(schema, references, path, value3) {
  if (!IsStandardObject(value3))
    return Default4(schema, path, value3);
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...value3 };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
};
var FromRef8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromThis8 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value3));
};
var FromTuple11 = function(schema, references, path, value3) {
  return IsArray(value3) && IsArray(schema.items) ? Default4(schema, path, schema.items.map((schema2, index) => Visit14(schema2, references, `${path}/${index}`, value3[index]))) : Default4(schema, path, value3);
};
var FromUnion13 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const decoded = Visit14(subschema, references, path, value3);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value3);
};
var Visit14 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect11(schema_, references_, path, value3);
    case "Not":
      return FromNot5(schema_, references_, path, value3);
    case "Object":
      return FromObject9(schema_, references_, path, value3);
    case "Record":
      return FromRecord9(schema_, references_, path, value3);
    case "Ref":
      return FromRef8(schema_, references_, path, value3);
    case "Symbol":
      return Default4(schema_, path, value3);
    case "This":
      return FromThis8(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple11(schema_, references_, path, value3);
    case "Union":
      return FromUnion13(schema_, references_, path, value3);
    default:
      return Default4(schema_, path, value3);
  }
};
function TransformDecode(schema, references, value3) {
  return Visit14(schema, references, "", value3);
}

class TransformDecodeCheckError extends TypeBoxError {
  constructor(schema, value3, error19) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error19;
  }
}

class TransformDecodeError extends TypeBoxError {
  constructor(schema, path, value3, error19) {
    super(error19 instanceof Error ? error19.message : "Unknown error");
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error19;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
var Default5 = function(schema, path, value3) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value3) : value3;
  } catch (error20) {
    throw new TransformEncodeError(schema, path, value3, error20);
  }
};
var FromArray12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  return IsArray(defaulted) ? defaulted.map((value4, index) => Visit15(schema.items, references, `${path}/${index}`, value4)) : defaulted;
};
var FromIntersect12 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3) || IsValueType(value3))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromNot6 = function(schema, references, path, value3) {
  return Default5(schema.not, path, Default5(schema, path, value3));
};
var FromObject10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRecord10 = function(schema, references, path, value3) {
  const defaulted = Default5(schema, path, value3);
  if (!IsStandardObject(value3))
    return defaulted;
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern3);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value3))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern3], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
};
var FromRef9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromThis9 = function(schema, references, path, value3) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value3);
  return Default5(schema, path, resolved);
};
var FromTuple12 = function(schema, references, path, value3) {
  const value1 = Default5(schema, path, value3);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path}/${index}`, value1[index])) : [];
};
var FromUnion14 = function(schema, references, path, value3) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value3))
      continue;
    const value1 = Visit15(subschema, references, path, value3);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value3);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value3);
};
var Visit15 = function(schema, references, path, value3) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path, value3);
    case "Intersect":
      return FromIntersect12(schema_, references_, path, value3);
    case "Not":
      return FromNot6(schema_, references_, path, value3);
    case "Object":
      return FromObject10(schema_, references_, path, value3);
    case "Record":
      return FromRecord10(schema_, references_, path, value3);
    case "Ref":
      return FromRef9(schema_, references_, path, value3);
    case "This":
      return FromThis9(schema_, references_, path, value3);
    case "Tuple":
      return FromTuple12(schema_, references_, path, value3);
    case "Union":
      return FromUnion14(schema_, references_, path, value3);
    default:
      return Default5(schema_, path, value3);
  }
};
function TransformEncode(schema, references, value3) {
  return Visit15(schema, references, "", value3);
}

class TransformEncodeCheckError extends TypeBoxError {
  constructor(schema, value3, error20) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value3;
    this.error = error20;
  }
}

class TransformEncodeError extends TypeBoxError {
  constructor(schema, path, value3, error20) {
    super(`${error20 instanceof Error ? error20.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path;
    this.value = value3;
    this.error = error20;
  }
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
var FromArray13 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromAsyncIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromConstructor6 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromFunction5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
};
var FromIntersect13 = function(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
};
var FromIterator5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
};
var FromNot7 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
};
var FromObject11 = function(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
};
var FromPromise5 = function(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
};
var FromRecord11 = function(schema, references) {
  const pattern3 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern3];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
};
var FromRef10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromThis10 = function(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
};
var FromTuple13 = function(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
};
var FromUnion15 = function(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
};
var Visit16 = function(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
};
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
var visited = new Set;
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => {
    {
      return Patch2;
    }
  },
  Mutate: () => {
    {
      return Mutate2;
    }
  },
  Hash: () => {
    {
      return Hash2;
    }
  },
  Errors: () => {
    {
      return Errors2;
    }
  },
  Equal: () => {
    {
      return Equal2;
    }
  },
  Encode: () => {
    {
      return Encode;
    }
  },
  Diff: () => {
    {
      return Diff2;
    }
  },
  Default: () => {
    {
      return Default6;
    }
  },
  Decode: () => {
    {
      return Decode;
    }
  },
  Create: () => {
    {
      return Create3;
    }
  },
  Convert: () => {
    {
      return Convert2;
    }
  },
  Clone: () => {
    {
      return Clone3;
    }
  },
  Clean: () => {
    {
      return Clean2;
    }
  },
  Check: () => {
    {
      return Check2;
    }
  },
  Cast: () => {
    {
      return Cast2;
    }
  }
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value3) {
  return Clone2(value3);
}
function Decode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value3))
    throw new TransformDecodeCheckError(schema, value3, Errors2(schema, references, value3).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value3) : value3;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value3] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value3) : value3;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value3) {
  return Hash(value3);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
var FromRest4 = function(T) {
  return T.map((L) => AwaitedResolve(L));
};
var FromIntersect14 = function(T) {
  return Intersect(FromRest4(T));
};
var FromUnion16 = function(T) {
  return Union(FromRest4(T));
};
var FromPromise6 = function(T) {
  return AwaitedResolve(T);
};
var AwaitedResolve = function(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
};
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
var CompositeKeys = function(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
};
var FilterNever = function(T) {
  return T.filter((L) => !IsNever(L));
};
var CompositeProperty = function(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
};
var CompositeProperties = function(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
};
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
var FromArray14 = function(T) {
  return T.map((L) => FromValue(L, false));
};
var FromProperties8 = function(value5) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value5))
    Acc[K] = Readonly(FromValue(value5[K], false));
  return Acc;
};
var ConditionalReadonly = function(T, root) {
  return root === true ? T : Readonly(T);
};
var FromValue = function(value5, root) {
  return IsAsyncIterator2(value5) ? ConditionalReadonly(Any(), root) : IsIterator2(value5) ? ConditionalReadonly(Any(), root) : IsArray2(value5) ? Readonly(Tuple(FromArray14(value5))) : IsUint8Array2(value5) ? Uint8Array2() : IsDate2(value5) ? Date2() : IsObject2(value5) ? ConditionalReadonly(Object2(FromProperties8(value5)), root) : IsFunction2(value5) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value5) ? Undefined() : IsNull2(value5) ? Null() : IsSymbol2(value5) ? Symbol2() : IsBigInt2(value5) ? BigInt2() : IsNumber2(value5) ? Literal(value5) : IsBoolean2(value5) ? Literal(value5) : IsString2(value5) ? Literal(value5) : Object2({});
};
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
var FromRest5 = function(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
};
var FromProperties9 = function(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
};
var FromConstructor7 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromFunction6 = function(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
};
var FromIntersect15 = function(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
};
var FromUnion17 = function(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
};
var FromTuple14 = function(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
};
var FromArray15 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromObject12 = function(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
};
var FromPromise7 = function(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
};
var FromAsyncIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromIterator6 = function(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
};
var FromRef11 = function(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with \$id ${schema.$ref}`);
  const discard8 = Discard(target, ["$id"]);
  return Deref2(discard8, references);
};
var DerefResolve = function(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
};
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value7) => Literal(value7));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
var ExcludeRest = function(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
};
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
var FromProperties10 = function(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
};
var FromMappedResult7 = function(R, T) {
  return FromProperties10(R.properties, T);
};
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
var ExtractRest = function(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
};
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
var FromProperties11 = function(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
};
var FromMappedResult8 = function(R, T) {
  return FromProperties11(R.properties, T);
};
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
var MappedIntrinsicPropertyKey = function(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
};
var MappedIntrinsicPropertyKeys = function(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
};
var MappedIntrinsicProperties = function(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
};
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
var ApplyUncapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toLowerCase(), rest].join("");
};
var ApplyCapitalize = function(value7) {
  const [first, rest] = [value7.slice(0, 1), value7.slice(1)];
  return [first.toUpperCase(), rest].join("");
};
var ApplyUppercase = function(value7) {
  return value7.toUpperCase();
};
var ApplyLowercase = function(value7) {
  return value7.toLowerCase();
};
var FromTemplateLiteral6 = function(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite3 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite3)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value7) => Literal(value7));
  const mapped12 = FromRest6(literals, mode);
  const union15 = Union(mapped12);
  return TemplateLiteral([union15], options);
};
var FromLiteralValue = function(value7, mode) {
  return typeof value7 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value7) : mode === "Capitalize" ? ApplyCapitalize(value7) : mode === "Uppercase" ? ApplyUppercase(value7) : mode === "Lowercase" ? ApplyLowercase(value7) : value7 : value7.toString();
};
var FromRest6 = function(T, M) {
  return T.map((L) => Intrinsic(L, M));
};
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
var FromProperties12 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
};
var FromMappedResult9 = function(R, K, options) {
  return FromProperties12(R.properties, K, options);
};
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
var FromIntersect16 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromUnion18 = function(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
};
var FromProperty2 = function(T, K) {
  const { [K]: _, ...R } = T;
  return R;
};
var FromProperties13 = function(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
};
var OmitResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
};
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
var FromPropertyKey2 = function(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
};
var FromPropertyKeys2 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
};
var FromMappedKey3 = function(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
};
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
var FromRest7 = function(T) {
  return T.map((L) => PartialResolve(L));
};
var FromProperties14 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
};
var PartialResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
};
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
var FromProperties15 = function(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
};
var FromMappedResult10 = function(R, options) {
  return FromProperties15(R.properties, options);
};
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
var FromProperties16 = function(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
};
var FromMappedResult11 = function(R, K, options) {
  return FromProperties16(R.properties, K, options);
};
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
var FromIntersect17 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromUnion19 = function(T, K) {
  return T.map((T2) => PickResolve(T2, K));
};
var FromProperties17 = function(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
};
var PickResolve = function(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
};
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
var FromPropertyKey3 = function(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
};
var FromPropertyKeys3 = function(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
};
var FromMappedKey4 = function(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
};
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
var RecordCreateFromPattern = function(pattern3, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern3]: CloneType(T) }
  };
};
var RecordCreateFromKeys = function(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
};
var FromTemplateLiteralKey = function(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
};
var FromUnionKey = function(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
};
var FromLiteralKey = function(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
};
var FromRegExpKey = function(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
};
var FromStringKey = function(K, T, options) {
  const pattern3 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern3, T, options);
};
var FromIntegerKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
var FromNumberKey = function(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
};
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
var Ordinal = 0;
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
var FromRest8 = function(T) {
  return T.map((L) => RequiredResolve(L));
};
var FromProperties18 = function(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
};
var RequiredResolve = function(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
};
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
var FromProperties19 = function(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
};
var FromMappedResult12 = function(R, options) {
  return FromProperties19(R.properties, options);
};
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
var RestResolve = function(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
};
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}

class TransformDecodeBuilder {
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value11) => schema2[TransformKind].Encode(encode2(value11));
    const Decode2 = (value11) => this.decode(schema2[TransformKind].Decode(value11));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => {
    {
      return Void;
    }
  },
  Uppercase: () => {
    {
      return Uppercase;
    }
  },
  Unsafe: () => {
    {
      return Unsafe;
    }
  },
  Unknown: () => {
    {
      return Unknown;
    }
  },
  Union: () => {
    {
      return Union;
    }
  },
  Undefined: () => {
    {
      return Undefined;
    }
  },
  Uncapitalize: () => {
    {
      return Uncapitalize;
    }
  },
  Uint8Array: () => {
    {
      return Uint8Array2;
    }
  },
  Tuple: () => {
    {
      return Tuple;
    }
  },
  Transform: () => {
    {
      return Transform;
    }
  },
  TemplateLiteral: () => {
    {
      return TemplateLiteral;
    }
  },
  Symbol: () => {
    {
      return Symbol2;
    }
  },
  String: () => {
    {
      return String2;
    }
  },
  Strict: () => {
    {
      return Strict;
    }
  },
  ReturnType: () => {
    {
      return ReturnType;
    }
  },
  Rest: () => {
    {
      return Rest;
    }
  },
  Required: () => {
    {
      return Required;
    }
  },
  RegExp: () => {
    {
      return RegExp2;
    }
  },
  Ref: () => {
    {
      return Ref;
    }
  },
  Recursive: () => {
    {
      return Recursive;
    }
  },
  Record: () => {
    {
      return Record;
    }
  },
  ReadonlyOptional: () => {
    {
      return ReadonlyOptional;
    }
  },
  Readonly: () => {
    {
      return Readonly;
    }
  },
  Promise: () => {
    {
      return Promise2;
    }
  },
  Pick: () => {
    {
      return Pick;
    }
  },
  Partial: () => {
    {
      return Partial;
    }
  },
  Parameters: () => {
    {
      return Parameters;
    }
  },
  Optional: () => {
    {
      return Optional;
    }
  },
  Omit: () => {
    {
      return Omit;
    }
  },
  Object: () => {
    {
      return Object2;
    }
  },
  Number: () => {
    {
      return Number2;
    }
  },
  Null: () => {
    {
      return Null;
    }
  },
  Not: () => {
    {
      return Not2;
    }
  },
  Never: () => {
    {
      return Never;
    }
  },
  Mapped: () => {
    {
      return Mapped;
    }
  },
  Lowercase: () => {
    {
      return Lowercase;
    }
  },
  Literal: () => {
    {
      return Literal;
    }
  },
  KeyOf: () => {
    {
      return KeyOf;
    }
  },
  Iterator: () => {
    {
      return Iterator;
    }
  },
  Intersect: () => {
    {
      return Intersect;
    }
  },
  Integer: () => {
    {
      return Integer;
    }
  },
  InstanceType: () => {
    {
      return InstanceType;
    }
  },
  Index: () => {
    {
      return Index;
    }
  },
  Function: () => {
    {
      return Function2;
    }
  },
  Extract: () => {
    {
      return Extract;
    }
  },
  Extends: () => {
    {
      return Extends;
    }
  },
  Exclude: () => {
    {
      return Exclude;
    }
  },
  Enum: () => {
    {
      return Enum;
    }
  },
  Deref: () => {
    {
      return Deref2;
    }
  },
  Date: () => {
    {
      return Date2;
    }
  },
  ConstructorParameters: () => {
    {
      return ConstructorParameters;
    }
  },
  Constructor: () => {
    {
      return Constructor;
    }
  },
  Const: () => {
    {
      return Const;
    }
  },
  Composite: () => {
    {
      return Composite;
    }
  },
  Capitalize: () => {
    {
      return Capitalize;
    }
  },
  Boolean: () => {
    {
      return Boolean;
    }
  },
  BigInt: () => {
    {
      return BigInt2;
    }
  },
  Awaited: () => {
    {
      return Awaited;
    }
  },
  AsyncIterator: () => {
    {
      return AsyncIterator;
    }
  },
  Array: () => {
    {
      return Array2;
    }
  },
  Any: () => {
    {
      return Any;
    }
  }
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value11) {
    return Errors(this.schema, this.references, value11);
  }
  Check(value11) {
    return this.checkFunc(value11);
  }
  Decode(value11) {
    if (!this.checkFunc(value11))
      throw new TransformDecodeCheckError(this.schema, value11, this.Errors(value11).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value11) : value11;
  }
  Encode(value11) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value11) : value11;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value11, this.Errors(value11).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value11) {
    if (value11.length === 0)
      return false;
    return Character.IsNumeric(value11.charCodeAt(0));
  }
  function IsAccessor(value11) {
    if (IsFirstCharacterNumeric(value11))
      return false;
    for (let i = 0;i < value11.length; i++) {
      const code = value11.charCodeAt(i);
      const check11 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check11)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object13, key) {
    return IsAccessor(key) ? `${object13}.${key}` : `${object13}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value11, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value11} ? ${expression} : true)` : `(${MemberExpression.Encode(value11, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}))` : `(typeof ${value11} === 'object' && ${value11} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value11) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value11} === 'object' && ${value11} !== null && !Array.isArray(${value11}) && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))` : `(typeof ${value11} === 'object' && ${value11} !== null && !(${value11} instanceof Date) && !(${value11} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value11) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value11} === 'number'` : `Number.isFinite(${value11})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value11) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value11} === undefined || ${value11} === null)` : `${value11} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value11) {
    yield "true";
  }
  function* FromArray16(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value11}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value11}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value11}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema2(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check11 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check11}})(${value11})`;
    }
    if (schema3.uniqueItems === true) {
      const check11 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check11} }`;
      yield `((${parameter}) => { ${block} )(${value11})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value11})`;
  }
  function* FromBigInt6(schema3, references, value11) {
    yield `(typeof ${value11} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value11} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value11} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value11} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value11} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value11} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value11) {
    yield `(typeof ${value11} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value11) {
    yield* Visit17(schema3.returns, references, `${value11}.prototype`);
  }
  function* FromDate6(schema3, references, value11) {
    yield `(${value11} instanceof Date) && Number.isFinite(${value11}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value11}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value11}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value11}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value11}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value11}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value11) {
    yield `(typeof ${value11} === 'function')`;
  }
  function* FromInteger6(schema3, references, value11) {
    yield `Number.isInteger(${value11})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value11) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value11)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value11}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value11}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value11) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value11})`;
  }
  function* FromLiteral7(schema3, references, value11) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value11} === ${schema3.const})`;
    } else {
      yield `(${value11} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value11) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value11) {
    const expression = CreateExpression(schema3.not, references, value11);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value11) {
    yield `(${value11} === null)`;
  }
  function* FromNumber6(schema3, references, value11) {
    yield Policy.IsNumberLike(value11);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value11} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value11} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value11} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value11} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value11} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value11) {
    yield Policy.IsObjectLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value11, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value11})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value11, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value11}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value11}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value11}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value11) {
    yield `(typeof value === 'object' && typeof ${value11}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value11) {
    yield Policy.IsRecordLike(value11);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value11}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value11}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema2(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value11) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value11}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value11) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
    yield* Visit17(target, references, value11);
  }
  function* FromRegExp5(schema3, references, value11) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value11})`;
  }
  function* FromString6(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value11}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value11}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value11})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value11})`;
    }
  }
  function* FromSymbol6(schema3, references, value11) {
    yield `(typeof ${value11} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value11) {
    yield `(typeof ${value11} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value11})`;
  }
  function* FromThis11(schema3, references, value11) {
    yield `${CreateFunctionName(schema3.$ref)}(${value11})`;
  }
  function* FromTuple15(schema3, references, value11) {
    yield `Array.isArray(${value11})`;
    if (schema3.items === undefined)
      return yield `${value11}.length === 0`;
    yield `(${value11}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value11}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value11) {
    yield `${value11} === undefined`;
  }
  function* FromUnion20(schema3, references, value11) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value11));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value11) {
    yield `${value11} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value11}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value11}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value11) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value11) {
    yield Policy.IsVoidLike(value11);
  }
  function* FromKind4(schema3, references, value11) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value11})`;
  }
  function* Visit17(schema3, references, value11, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value11})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value11})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value11);
      case "Array":
        return yield* FromArray16(schema_, references_, value11);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value11);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value11);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value11);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value11);
      case "Date":
        return yield* FromDate6(schema_, references_, value11);
      case "Function":
        return yield* FromFunction7(schema_, references_, value11);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value11);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value11);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value11);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value11);
      case "Never":
        return yield* FromNever6(schema_, references_, value11);
      case "Not":
        return yield* FromNot8(schema_, references_, value11);
      case "Null":
        return yield* FromNull6(schema_, references_, value11);
      case "Number":
        return yield* FromNumber6(schema_, references_, value11);
      case "Object":
        return yield* FromObject13(schema_, references_, value11);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value11);
      case "Record":
        return yield* FromRecord12(schema_, references_, value11);
      case "Ref":
        return yield* FromRef12(schema_, references_, value11);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value11);
      case "String":
        return yield* FromString6(schema_, references_, value11);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value11);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value11);
      case "This":
        return yield* FromThis11(schema_, references_, value11);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value11);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value11);
      case "Union":
        return yield* FromUnion20(schema_, references_, value11);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value11);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value11);
      case "Void":
        return yield* FromVoid5(schema_, references_, value11);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value11);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value11, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value11, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value11, useHoisting = true) {
    const [newline, pad] = ["\n", (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value11, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})\n}`;
  }
  function CreateParameter(name, type47) {
    const annotation = state.language === "typescript" ? `: ${type47}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type47) {
    return state.language === "typescript" ? `: ${type47}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {\n  return ${CreateFunctionName(schema3.$id)}(value)\n}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join("\n");
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind28, instance, value11) {
      if (!exports_type.Has(kind28) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind28);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value11);
    }
    function formatRegistryFunction(format, value11) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value11);
    }
    function hashFunction(value11) {
      return Hash(value11);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/cookie/index.js
var parse4 = function(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode2;
  var index = 0;
  while (index < str.length) {
    var eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key = str.slice(index, eqIdx).trim();
    if (obj[key] === undefined) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
};
var serialize = function(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode2;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value11 = enc(val);
  if (value11 && !fieldContentRegExp.test(value11)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value11;
  if (opt.maxAge != null) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
};
var decode2 = function(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
};
var encode2 = function(val) {
  return encodeURIComponent(val);
};
var isDate = function(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
};
var tryDecode = function(str, decode3) {
  try {
    return decode3(str);
  } catch (e) {
    return str;
  }
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $parse = parse4;
var $serialize = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

// node_modules/elysia/dist/index.mjs
var import_fast_decode_uri_component = __toESM(require_fast_decode_uri_component(), 1);
var removeTrailingEquals = function(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
};
var import_fast_querystring = __toESM(require_lib(), 1);
var import_fast_decode_uri_component2 = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_querystring2 = __toESM(require_lib(), 1);
var isLeapYear = function(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
};
var date5 = function(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
};
var getTime = function(strictTimeZone) {
  return function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
};
var getDateTime = function(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date5(dateTime[0]) && time(dateTime[1]);
  };
};
var uri = function(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
};
var byte = function(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
};
var validateInt32 = function(value15) {
  return Number.isInteger(value15) && value15 <= MAX_INT32 && value15 >= MIN_INT32;
};
var validateInt64 = function(value15) {
  return Number.isInteger(value15);
};
var validateNumber = function() {
  return true;
};
var regex = function(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e2) {
    return false;
  }
};
var e = (e2, t3) => ({ part: e2, store: null, inert: t3 !== undefined ? new Map(t3.map((e3) => [e3.part.charCodeAt(0), e3])) : null, params: null, wildcardStore: null });
var t = (e2, t3) => ({ ...e2, part: t3 });
var r = (e2) => ({ paramName: e2, store: null, inert: null });
var Memoirist = class _Memoirist {
  root = {};
  history = [];
  static regex = { static: /:.+?(?=\/|$)/, params: /:.+?(?=\/|$)/g };
  add(a2, l, i) {
    let s;
    if (typeof l != "string")
      throw TypeError("Route path must be a string");
    l === "" ? l = "/" : l[0] !== "/" && (l = `/${l}`), this.history.push([a2, l, i]);
    let n = l[l.length - 1] === "*";
    n && (l = l.slice(0, -1));
    let o = l.split(_Memoirist.regex.static), u = l.match(_Memoirist.regex.params) || [];
    o[o.length - 1] === "" && o.pop(), s = this.root[a2] ? this.root[a2] : this.root[a2] = e("/");
    let p = 0;
    for (let a3 = 0;a3 < o.length; ++a3) {
      let i2 = o[a3];
      if (a3 > 0) {
        let t3 = u[p++].slice(1);
        if (s.params === null)
          s.params = r(t3);
        else if (s.params.paramName !== t3)
          throw Error(`Cannot create route "${l}" with parameter "${t3}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
        let a4 = s.params;
        if (a4.inert === null) {
          s = a4.inert = e(i2);
          continue;
        }
        s = a4.inert;
      }
      for (let r2 = 0;; ) {
        if (r2 === i2.length) {
          if (r2 < s.part.length) {
            let a4 = t(s, s.part.slice(r2));
            Object.assign(s, e(i2, [a4]));
          }
          break;
        }
        if (r2 === s.part.length) {
          if (s.inert === null)
            s.inert = new Map;
          else if (s.inert.has(i2.charCodeAt(r2))) {
            s = s.inert.get(i2.charCodeAt(r2)), i2 = i2.slice(r2), r2 = 0;
            continue;
          }
          let t3 = e(i2.slice(r2));
          s.inert.set(i2.charCodeAt(r2), t3), s = t3;
          break;
        }
        if (i2[r2] !== s.part[r2]) {
          let a4 = t(s, s.part.slice(r2)), l2 = e(i2.slice(r2));
          Object.assign(s, e(s.part.slice(0, r2), [a4, l2])), s = l2;
          break;
        }
        ++r2;
      }
    }
    if (p < u.length) {
      let e2 = u[p], t3 = e2.slice(1);
      if (s.params === null)
        s.params = r(t3);
      else if (s.params.paramName !== t3)
        throw Error(`Cannot create route "${l}" with parameter "${t3}" because a route already exists with a different parameter name ("${s.params.paramName}") in the same location`);
      return s.params.store === null && (s.params.store = i), s.params.store;
    }
    return n ? (s.wildcardStore === null && (s.wildcardStore = i), s.wildcardStore) : (s.store === null && (s.store = i), s.store);
  }
  find(e2, t3) {
    let r2 = this.root[e2];
    return r2 ? a(t3, t3.length, r2, 0) : null;
  }
};
var a = (e2, t3, r2, l) => {
  let i = r2?.part, s = l + i.length;
  if (i.length > 1) {
    if (s > t3)
      return null;
    if (i.length < 15) {
      for (let t4 = 1, r3 = l + 1;t4 < i.length; ++t4, ++r3)
        if (i.charCodeAt(t4) !== e2.charCodeAt(r3))
          return null;
    } else if (e2.substring(l, s) !== i)
      return null;
  }
  if (s === t3)
    return r2.store !== null ? { store: r2.store, params: {} } : r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": "" } } : null;
  if (r2.inert !== null) {
    let l2 = r2.inert.get(e2.charCodeAt(s));
    if (l2 !== undefined) {
      let r3 = a(e2, t3, l2, s);
      if (r3 !== null)
        return r3;
    }
  }
  if (r2.params !== null) {
    let l2 = r2.params, i2 = e2.indexOf("/", s);
    if (i2 !== s) {
      if (i2 === -1 || i2 >= t3) {
        if (l2.store !== null) {
          let r3 = {};
          return r3[l2.paramName] = e2.substring(s, t3), { store: l2.store, params: r3 };
        }
      } else if (l2.inert !== null) {
        let r3 = a(e2, t3, l2.inert, i2);
        if (r3 !== null)
          return r3.params[l2.paramName] = e2.substring(s, i2), r3;
      }
    }
  }
  return r2.wildcardStore !== null ? { store: r2.wildcardStore, params: { "*": e2.substring(s, t3) } } : null;
};
var resolver = () => {
  let resolve;
  const promise5 = new Promise((r2) => {
    resolve = r2;
  });
  return [promise5, resolve];
};
var createSignal = () => {
  const [start, resolveStart] = resolver();
  const [end, resolveEnd] = resolver();
  const children = [];
  const resolvers = [];
  return {
    signal: start,
    consume: (trace) => {
      switch (trace.type) {
        case "begin":
          if (trace.unit && children.length === 0)
            for (let i = 0;i < trace.unit; i++) {
              const [start2, resolveStart2] = resolver();
              const [end2, resolveEnd2] = resolver();
              children.push(start2);
              resolvers.push([
                (trace2) => {
                  resolveStart2({
                    children: [],
                    end: end2,
                    name: trace2.name ?? "",
                    skip: false,
                    time: trace2.time
                  });
                },
                (time) => {
                  resolveEnd2(time);
                }
              ]);
            }
          resolveStart({
            children,
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          resolveEnd(trace.time);
          break;
      }
    },
    consumeChild(trace) {
      switch (trace.type) {
        case "begin":
          if (!resolvers[0])
            return;
          const [resolveStart2] = resolvers[0];
          resolveStart2({
            children: [],
            end,
            name: trace.name ?? "",
            skip: false,
            time: trace.time
          });
          break;
        case "end":
          const child = resolvers.shift();
          if (!child)
            return;
          child[1](trace.time);
      }
    },
    resolve() {
      resolveStart({
        children: [],
        end: new Promise((resolve) => resolve(0)),
        name: "",
        skip: true,
        time: 0
      });
      for (const [resolveStart2, resolveEnd2] of resolvers) {
        resolveStart2({
          children: [],
          end: new Promise((resolve) => resolve(0)),
          name: "",
          skip: true,
          time: 0
        });
        resolveEnd2(0);
      }
      resolveEnd(0);
    }
  };
};
var createTraceListener = (getReporter, totalListener, handler) => {
  if (typeof handler === "object")
    handler = handler.fn;
  return async function trace(trace) {
    if (trace.event !== "request" || trace.type !== "begin")
      return;
    const id = trace.id;
    const reporter = getReporter();
    const request = createSignal();
    const parse22 = createSignal();
    const transform7 = createSignal();
    const beforeHandle = createSignal();
    const handle = createSignal();
    const afterHandle = createSignal();
    const error22 = createSignal();
    const response = createSignal();
    request.consume(trace);
    const reducer = (event) => {
      if (event.id === id)
        switch (event.event) {
          case "request":
            request.consume(event);
            break;
          case "request.unit":
            request.consumeChild(event);
            break;
          case "parse":
            parse22.consume(event);
            break;
          case "parse.unit":
            parse22.consumeChild(event);
            break;
          case "transform":
            transform7.consume(event);
            break;
          case "transform.unit":
            transform7.consumeChild(event);
            break;
          case "beforeHandle":
            beforeHandle.consume(event);
            break;
          case "beforeHandle.unit":
            beforeHandle.consumeChild(event);
            break;
          case "handle":
            handle.consume(event);
            break;
          case "afterHandle":
            afterHandle.consume(event);
            break;
          case "afterHandle.unit":
            afterHandle.consumeChild(event);
            break;
          case "error":
            error22.consume(event);
            break;
          case "error.unit":
            error22.consumeChild(event);
            break;
          case "response":
            if (event.type === "begin") {
              request.resolve();
              parse22.resolve();
              transform7.resolve();
              beforeHandle.resolve();
              handle.resolve();
              afterHandle.resolve();
              error22.resolve();
            } else
              reporter.off("event", reducer);
            response.consume(event);
            break;
          case "response.unit":
            response.consumeChild(event);
            break;
          case "exit":
            request.resolve();
            parse22.resolve();
            transform7.resolve();
            beforeHandle.resolve();
            handle.resolve();
            afterHandle.resolve();
            error22.resolve();
            break;
        }
    };
    reporter.on("event", reducer);
    await handler({
      id,
      context: trace.ctx,
      set: trace.ctx?.set,
      store: trace.ctx?.store,
      time: trace.time,
      request: request.signal,
      parse: parse22.signal,
      transform: transform7.signal,
      beforeHandle: beforeHandle.signal,
      handle: handle.signal,
      afterHandle: afterHandle.signal,
      error: error22.signal,
      response: response.signal
    });
    reporter.emit(`res${id}.${totalListener}`, undefined);
  };
};
var separateFunction = (code) => {
  if (code.startsWith("async"))
    code = code.slice(6);
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    index = code.indexOf(") => {\n");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: false }
      ];
    index = code.indexOf(") => ");
    if (index !== -1)
      return [
        code.slice(1, index),
        code.slice(index + 5),
        { isArrowReturn: true }
      ];
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    const end = code.indexOf(")");
    return [
      code.slice(index + 1, end),
      code.slice(end + 2),
      {
        isArrowReturn: false
      }
    ];
  }
  const start = code.indexOf("(");
  if (start !== -1) {
    const sep = code.indexOf("\n", 2);
    const parameter = code.slice(0, sep);
    const end = parameter.lastIndexOf(")") + 1;
    const body = code.slice(sep + 1);
    return [
      parameter.slice(start, end),
      "{" + body,
      {
        isArrowReturn: false
      }
    ];
  }
  const x = code.split("\n", 2);
  return [x[0], x[1], { isArrowReturn: false }];
};
var bracketPairRange = (parameter) => {
  const start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1;
  let deep = 1;
  for (;end < parameter.length; end++) {
    const char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
};
var bracketPairRangeReverse = (parameter) => {
  const end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1;
  let deep = 1;
  for (;start >= 0; start--) {
    const char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
};
var retrieveRootParamters = (parameter) => {
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123)
    parameter = parameter.slice(2, -2);
  while (true) {
    const [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    parameter = parameter.slice(0, start - 2) + parameter.slice(end + 1);
  }
  return parameter.replace(/:/g, "").trim();
};
var findParameterReference = (parameter, inference) => {
  const root = retrieveRootParamters(parameter);
  if (!inference.query && root.includes("query"))
    inference.query = true;
  if (!inference.headers && root.includes("headers"))
    inference.headers = true;
  if (!inference.body && root.includes("body"))
    inference.body = true;
  if (!inference.cookie && root.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && root.includes("set"))
    inference.set = true;
  return root;
};
var findTraceParameterReference = (parameter, inference) => {
  const root = retrieveRootParamters(parameter);
  if (!inference.request && root.includes("request"))
    inference.request = true;
  if (!inference.parse && root.includes("parse"))
    inference.parse = true;
  if (!inference.transform && root.includes("transform"))
    inference.transform = true;
  if (!inference.handle && root.includes("handle"))
    inference.handle = true;
  if (!inference.beforeHandle && root.includes("beforeHandle"))
    inference.beforeHandle = true;
  if (!inference.afterHandle && root.includes("afterHandle"))
    inference.afterHandle = true;
  if (!inference.error && root.includes("error"))
    inference.error = true;
  if (!inference.context && root.includes("context"))
    inference.context = true;
  if (!inference.store && root.includes("store"))
    inference.store = true;
  if (!inference.set && root.includes("set"))
    inference.set = true;
  return root;
};
var findEndIndex = (type47, content, index) => {
  const newLineIndex = content.indexOf(type47 + "\n", index);
  const newTabIndex = content.indexOf(type47 + "	", index);
  const commaIndex = content.indexOf(type47 + ",", index);
  const semicolonIndex = content.indexOf(type47 + ";", index);
  const emptyIndex = content.indexOf(type47 + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a2, b) => a2 - b)[0] || -1;
};
var findAlias = (type47, body, depth = 0) => {
  if (depth > 5)
    return [];
  const aliases = [];
  let content = body;
  while (true) {
    let index = findEndIndex(" = " + type47, content);
    if (index === -1) {
      const lastIndex = content.indexOf(" = " + type47);
      if (lastIndex + 3 + type47.length !== content.length)
        break;
      index = lastIndex;
    }
    const part = content.slice(0, index);
    let variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      const [start, end] = bracketPairRangeReverse(part);
      aliases.push(content.slice(start, end));
      content = content.slice(index + 3 + type47.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    aliases.push(variable);
    content = content.slice(index + 3 + type47.length);
  }
  for (const alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    const deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
};
var extractMainParameter = (parameter) => {
  if (!parameter)
    return;
  const hasComma = parameter.includes(",");
  if (!hasComma) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return parameter;
  }
  const spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
};
var inferBodyReference = (code, aliases, inference) => {
  const access = (type47, alias) => code.includes(alias + "." + type47) || code.includes(alias + '["' + type47 + '"]') || code.includes(alias + "['" + type47 + "']");
  for (let alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      alias = retrieveRootParamters(alias);
      if (!inference.query && alias.includes("query"))
        inference.query = true;
      if (!inference.headers && alias.includes("headers"))
        inference.headers = true;
      if (!inference.body && alias.includes("body"))
        inference.body = true;
      if (!inference.cookie && alias.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && alias.includes("set"))
        inference.set = true;
      continue;
    }
    if (code.includes("(" + alias + ")")) {
      inference.query = true;
      inference.headers = true;
      inference.body = true;
      inference.cookie = true;
      inference.set = true;
      inference.queries = [];
      inference.unknownQueries = true;
      break;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (!inference.unknownQueries && inference.query) {
      let keyword = alias + ".";
      if (code.includes(keyword + "query"))
        keyword = alias + ".query";
      while (true) {
        let start = code.indexOf(keyword);
        if (start === -1 && code.indexOf(alias + "[") !== -1) {
          inference.queries = [];
          inference.unknownQueries = true;
          break;
        }
        if (start !== -1) {
          let end = findEndIndex("", code, start + keyword.length + 1);
          if (end === -1)
            end = undefined;
          const index = start + alias.length + 1;
          code = code.slice(start + alias.length + 1);
          let query = code.slice(0, end ? end - index : end).trimEnd();
          while (start !== -1) {
            start = query.indexOf(".");
            if (start !== -1)
              query = query.slice(start + 1);
          }
          if (query.charCodeAt(query.length - 1) === 59)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 44)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 93)
            query = query.slice(0, -1);
          if (query.charCodeAt(query.length - 1) === 41)
            query = query.slice(0, -1);
          if (query && !inference.queries.includes(query)) {
            inference.queries.push(query);
            continue;
          }
        }
        break;
      }
    }
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  return aliases;
};
var removeDefaultParameter = (parameter) => {
  while (true) {
    const index = parameter.indexOf("=");
    if (index === -1)
      break;
    const commaIndex = parameter.indexOf(",", index);
    const bracketIndex = parameter.indexOf("}", index);
    const end = [commaIndex, bracketIndex].filter((i) => i > 0).sort((a2, b) => a2 - b)[0] || -1;
    if (end === -1) {
      parameter = parameter.slice(0, index);
      break;
    }
    parameter = parameter.slice(0, index) + parameter.slice(end);
  }
  return parameter.split(",").map((i) => i.trim()).join(", ");
};
var validateInferencedQueries = (queries) => {
  for (const query of queries) {
    if (query.charCodeAt(0) === 123)
      return false;
    if (query.indexOf("'") !== -1)
      return false;
    if (query.indexOf('"') !== -1)
      return false;
    if (query.indexOf("\n") !== -1)
      return false;
    if (query.indexOf("	") !== -1)
      return false;
    if (query.indexOf("(") !== -1)
      return false;
  }
  return true;
};
var inferTraceBodyReference = (code, aliases, inference) => {
  const access = (type47, alias) => code.includes(type47 + "." + alias) || code.includes(type47 + '["' + alias + '"]') || code.includes(type47 + "['" + alias + "']");
  for (let alias of aliases) {
    if (alias.charCodeAt(0) === 123) {
      alias = retrieveRootParamters(alias);
      if (!inference.request && alias.includes("request"))
        inference.request = true;
      if (!inference.parse && alias.includes("parse"))
        inference.parse = true;
      if (!inference.transform && alias.includes("transform"))
        inference.transform = true;
      if (!inference.handle && alias.includes("handle"))
        inference.handle = true;
      if (!inference.beforeHandle && alias.includes("beforeHandle"))
        inference.beforeHandle = true;
      if (!inference.afterHandle && alias.includes("afterHandle"))
        inference.afterHandle = true;
      if (!inference.error && alias.includes("error"))
        inference.error = true;
      if (!inference.context && alias.includes("context"))
        inference.context = true;
      if (!inference.store && alias.includes("store"))
        inference.store = true;
      if (!inference.set && alias.includes("set"))
        inference.set = true;
      continue;
    }
    if (code.includes("(" + alias + ")")) {
      inference.request = true;
      inference.parse = true;
      inference.transform = true;
      inference.handle = true;
      inference.beforeHandle = true;
      inference.afterHandle = true;
      inference.error = true;
      inference.context = true;
      inference.store = true;
      inference.set = true;
      break;
    }
    if (!inference.request && access("request", alias))
      inference.request = true;
    if (!inference.parse && access("parse", alias))
      inference.parse = true;
    if (!inference.transform && access("transform", alias))
      inference.transform = true;
    if (!inference.handle && access("handle", alias))
      inference.handle = true;
    if (!inference.beforeHandle && access("beforeHandle", alias))
      inference.beforeHandle = true;
    if (!inference.afterHandle && access("afterHandle", alias))
      inference.afterHandle = true;
    if (!inference.error && access("error", alias))
      inference.error = true;
    if (!inference.context && access("context", alias))
      inference.context = true;
    if (!inference.store && access("store", alias))
      inference.store = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (inference.request && inference.parse && inference.transform && inference.handle && inference.beforeHandle && inference.afterHandle && inference.error && inference.context && inference.store && inference.set)
      break;
  }
  return aliases;
};
var sucrose = (lifeCycle, inference = {
  queries: [],
  query: false,
  headers: false,
  body: false,
  cookie: false,
  set: false,
  unknownQueries: false
}) => {
  const events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.onResponse?.length)
    events.push(...lifeCycle.onResponse);
  for (const e2 of events) {
    if (!e2)
      continue;
    const event = "fn" in e2 ? e2.fn : e2;
    const [parameter, body, { isArrowReturn }] = separateFunction(event.toString());
    const rootParameters = findParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (isArrowReturn && (body === "query" || rootParameters && body.startsWith(rootParameters + ".query"))) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      inferBodyReference(body, aliases, inference);
    }
    const context = rootParameters || mainParameter;
    if (context && body.includes("return " + context + ".query")) {
      inference.query = true;
      inference.unknownQueries = true;
      inference.queries = [];
    }
    if (inference.query) {
      inferBodyReference(body, ["query"], inference);
      const queryIndex = parameter.indexOf("query: {");
      if (queryIndex !== -1) {
        const part = parameter.slice(queryIndex + 7);
        const [start, end] = bracketPairRange(part);
        const queryBracket = removeDefaultParameter(part.slice(start, end));
        for (let query of queryBracket.slice(1, -1).split(",")) {
          const index = query.indexOf(":");
          if (index !== -1)
            query = query.slice(0, index);
          query = query.trim();
          if (query && !inference.queries.includes(query))
            inference.queries.push(query.trim());
        }
      }
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set)
      break;
  }
  if (!validateInferencedQueries(inference.queries)) {
    inference.unknownQueries = true;
    inference.queries = [];
  }
  return inference;
};
var sucroseTrace = (traces, inference = {
  request: false,
  parse: false,
  transform: false,
  handle: false,
  beforeHandle: false,
  afterHandle: false,
  error: false,
  context: false,
  store: false,
  set: false
}) => {
  for (const handler of traces) {
    const [parameter, body] = separateFunction(handler.toString());
    const rootParameters = findTraceParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      inferTraceBodyReference(body, aliases, inference);
      continue;
    }
    if (inference.request && inference.parse && inference.transform && inference.handle && inference.beforeHandle && inference.afterHandle && inference.error && inference.context && inference.store && inference.set)
      break;
  }
  return inference;
};
var Cookie = class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    if (!(this.name in this.jar))
      return this.initial;
    return this.jar[this.name];
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value15) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name].value = value15;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.cookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.cookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.cookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.cookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.cookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.cookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.cookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.cookie.priority = priority;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned(partitioned) {
    this.cookie.partitioned = partitioned;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.cookie.secrets = secrets;
  }
  update(config) {
    this.cookie = Object.assign(this.cookie, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  set(config) {
    this.cookie = Object.assign({
      ...this.initial,
      value: this.value
    }, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  remove() {
    if (this.value === undefined)
      return;
    this.set({
      expires: new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
};
var createCookieJar = (set2, store, initial) => {
  if (!set2.cookie)
    set2.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(key, set2.cookie, Object.assign({}, initial ?? {}, store[key]));
      return new Cookie(key, set2.cookie, Object.assign({}, initial));
    }
  });
};
var parseCookie = async (set2, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set2, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = $parse(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value15 = import_fast_decode_uri_component.default(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value15, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value15 = temp;
      } else {
        let decoded = true;
        for (let i = 0;i < secrets.length; i++) {
          const temp = await unsignCookie(value15, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value15 = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    if (value15 == null) {
      jar[name] = {
        value: v
      };
      continue;
    }
    const start = value15.charCodeAt(0);
    if (start === 123 || start === 91)
      try {
        jar[name] = {
          value: JSON.parse(value15)
        };
        continue;
      } catch {
      }
    if (isNumericString(value15)) {
      jar[name] = {
        value: parseInt(value15)
      };
      continue;
    }
    if (value15 === "true") {
      jar[name] = {
        value: true
      };
      continue;
    }
    if (value15 === "false") {
      jar[name] = {
        value: false
      };
      continue;
    }
    jar[name] = {
      value: value15
    };
  }
  return createCookieJar(set2, jar, initial);
};
var hasHeaderShorthand = "toJSON" in new Headers;
var isNotEmpty = (obj) => {
  if (!obj)
    return false;
  for (const x in obj)
    return true;
  return false;
};
var handleFile = (response, set2) => {
  const size = response.size;
  if (!set2 && size || size && set2 && set2.status !== 206 && set2.status !== 304 && set2.status !== 412 && set2.status !== 416) {
    if (set2) {
      if (set2.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set2.headers = set2.headers.toJSON();
        else
          for (const [key, value15] of set2.headers.entries())
            if (key in set2.headers)
              set2.headers[key] = value15;
      }
      return new Response(response, {
        status: set2.status,
        headers: Object.assign({
          "accept-ranges": "bytes",
          "content-range": `bytes 0-${size - 1}/${size}`
        }, set2.headers)
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`
      }
    });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("Set-Cookie");
  for (let i = 0;i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append("Set-Cookie", `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`);
  }
  return headers;
};
var serializeCookie = (cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return;
  const set2 = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    const value15 = property.value;
    if (value15 === undefined || value15 === null)
      continue;
    set2.push($serialize(key, typeof value15 === "object" ? JSON.stringify(value15) : value15 + "", property));
  }
  if (set2.length === 0)
    return;
  if (set2.length === 1)
    return set2[0];
  return set2;
};
var mapResponse = (response, set2, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = serializeCookie(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"])) {
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    }
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response, set2);
      case "Object":
        for (const value15 in Object.values(response)) {
          switch (value15?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(form(response));
            default:
              break;
          }
        }
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set2);
      case undefined:
        if (!response)
          return new Response("", set2);
        return Response.json(response, set2);
      case "Response":
        let isCookieSet = false;
        if (set2.headers instanceof Headers)
          for (const key of set2.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set2.headers.getSetCookie()) {
                response.headers.append("set-cookie", cookie);
              }
            } else
              response.headers.append(key, set2.headers?.get(key) ?? "");
          }
        else
          for (const key in set2.headers)
            response.headers.append(key, set2.headers[key]);
        if (response.status !== set2.status)
          set2.status = response.status;
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => mapResponse(x, set2));
      case "Function":
        return mapResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response, set2);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set2.headers instanceof Headers)
            for (const key of set2.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set2.headers.getSetCookie()) {
                  response.headers.append("set-cookie", cookie);
                }
              } else
                response.headers.append(key, set2.headers?.get(key) ?? "");
            }
          else
            for (const key in set2.headers)
              response.headers.append(key, set2.headers[key]);
          if (hasHeaderShorthand)
            set2.headers = response.headers.toJSON();
          else
            for (const [key, value15] of response.headers.entries())
              if (key in set2.headers)
                set2.headers[key] = value15;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("toResponse" in response)
          return mapResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response);
      case "Object":
        for (const value15 in Object.values(response)) {
          switch (value15?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(form(response), set2);
            default:
              break;
          }
        }
        return Response.json(response, set2);
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Error":
        return errorToResponse(response, set2);
      case "Promise":
        return response.then((x) => {
          const r2 = mapCompactResponse(x);
          if (r2 !== undefined)
            return r2;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response, set2);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("toResponse" in response)
          return mapResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response);
    }
};
var mapEarlyResponse = (response, set2, request) => {
  if (response === undefined || response === null)
    return;
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE]) {
    set2.status = response[ELYSIA_RESPONSE];
    response = response.response;
  }
  if (isNotEmpty(set2.headers) || set2.status !== 200 || set2.redirect || set2.cookie) {
    if (typeof set2.status === "string")
      set2.status = StatusMap[set2.status];
    if (set2.redirect) {
      set2.headers.Location = set2.redirect;
      if (!set2.status || set2.status < 300 || set2.status >= 400)
        set2.status = 302;
    }
    if (set2.cookie && isNotEmpty(set2.cookie))
      set2.headers["Set-Cookie"] = serializeCookie(set2.cookie);
    if (set2.headers["Set-Cookie"] && Array.isArray(set2.headers["Set-Cookie"]))
      set2.headers = parseSetCookies(new Headers(set2.headers), set2.headers["Set-Cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set2);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response, set2);
      case "Object":
        for (const value15 in Object.values(response)) {
          switch (value15?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(form(response), set2);
            default:
              break;
          }
        }
        return Response.json(response, set2);
      case "ReadableStream":
        if (!set2.headers["content-type"]?.startsWith("text/event-stream"))
          set2.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set2);
      case undefined:
        if (!response)
          return;
        return Response.json(response, set2);
      case "Response":
        let isCookieSet = false;
        if (set2.headers instanceof Headers)
          for (const key of set2.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set2.headers.getSetCookie()) {
                response.headers.append("set-cookie", cookie);
              }
            } else
              response.headers.append(key, set2.headers?.get(key) ?? "");
          }
        else
          for (const key in set2.headers)
            response.headers.append(key, set2.headers[key]);
        if (response.status !== set2.status)
          set2.status = response.status;
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapEarlyResponse(response(), set2);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set2);
      case "FormData":
        return new Response(response);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set2.headers instanceof Headers)
            for (const key of set2.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set2.headers.getSetCookie()) {
                  response.headers.append("set-cookie", cookie);
                }
              } else
                response.headers.append(key, set2.headers?.get(key) ?? "");
            }
          else
            for (const key in set2.headers)
              response.headers.append(key, set2.headers[key]);
          if (response.status !== set2.status)
            set2.status = response.status;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("toResponse" in response)
          return mapEarlyResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response, set2);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set2);
      case "Array":
        return Response.json(response);
      case "Object":
        for (const value15 in Object.values(response)) {
          switch (value15?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(form(response), set2);
            default:
              break;
          }
        }
        return Response.json(response, set2);
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        return response;
      case "Promise":
        return response.then((x) => {
          const r2 = mapEarlyResponse(x, set2);
          if (r2 !== undefined)
            return r2;
        });
      case "Error":
        return errorToResponse(response, set2);
      case "Function":
        return mapCompactResponse(response());
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set2);
        return new Response(response?.toString(), set2);
      case "FormData":
        return new Response(response);
      default:
        if (response instanceof Response)
          return new Response(response.body, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set2));
        if (response instanceof Error)
          return errorToResponse(response, set2);
        if ("toResponse" in response)
          return mapEarlyResponse(response.toResponse(), set2);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set2.headers["Content-Type"])
              set2.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set2);
          }
        }
        return new Response(response);
    }
};
var mapCompactResponse = (response, request) => {
  if (response?.$passthrough)
    response = response?.[response.$passthrough];
  if (response?.[ELYSIA_RESPONSE])
    return mapResponse(response.response, {
      status: response[ELYSIA_RESPONSE],
      headers: {}
    });
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Array":
      return Response.json(response);
    case "Object":
      form:
        for (const value15 of Object.values(response))
          switch (value15?.constructor?.name) {
            case "Blob":
            case "File":
            case "ArrayBuffer":
            case "FileRef":
              return new Response(form(response));
            case "Object":
              break form;
            default:
              break;
          }
      return Response.json(response);
    case "ReadableStream":
      request?.signal.addEventListener("abort", {
        handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        }
      }, {
        once: true
      });
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case undefined:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then(mapCompactResponse);
    case "Function":
      return mapCompactResponse(response());
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    case "FormData":
      return new Response(response);
    default:
      if (response instanceof Response)
        return new Response(response.body, {
          headers: {
            "Content-Type": "application/json"
          }
        });
      if (response instanceof Promise)
        return response.then(mapCompactResponse);
      if (response instanceof Error)
        return errorToResponse(response);
      if ("toResponse" in response)
        return mapCompactResponse(response.toResponse());
      if ("charCodeAt" in response) {
        const code = response.charCodeAt(0);
        if (code === 123 || code === 91) {
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }
      return new Response(response);
  }
};
var errorToResponse = (error22, set2) => new Response(JSON.stringify({
  name: error22?.name,
  message: error22?.message,
  cause: error22?.cause
}), {
  status: set2?.status !== 200 ? set2?.status ?? 500 : 500,
  headers: set2?.headers
});
var replaceUrlPath = (url, pathname) => {
  const urlObject = new URL(url);
  urlObject.pathname = pathname;
  return urlObject.toString();
};
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || v.toString().startsWith("[object ") || isNotEmpty(Object.getPrototypeOf(v));
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, source, {
  skipKeys
} = {}) => {
  if (isObject(target) && isObject(source))
    for (const [key, value15] of Object.entries(source)) {
      if (skipKeys?.includes(key))
        continue;
      if (!isObject(value15) || !(key in target) || isClass(value15)) {
        target[key] = value15;
        continue;
      }
      target[key] = mergeDeep(target[key], value15);
    }
  return target;
};
var mergeCookie = (a2, b) => {
  const { properties: _, ...target } = a2 ?? {};
  const { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
};
var mergeObjectArray = (a2 = [], b = []) => {
  if (!a2)
    return [];
  if (!b)
    return a2;
  const array5 = [];
  const checksums = [];
  if (!Array.isArray(a2))
    a2 = [a2];
  if (!Array.isArray(b))
    b = [b];
  for (const item of a2) {
    array5.push(item);
    if (item.checksum)
      checksums.push(item.checksum);
  }
  for (const item of b)
    if (!checksums.includes(item.checksum))
      array5.push(item);
  return array5;
};
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "onResponse",
  "mapResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce((acc, x) => (acc[x] = true, acc), {});
var mergeResponse = (a2, b) => {
  const isRecordNumber = (x) => typeof x === "object" && Object.keys(x).every(isNumericString);
  if (isRecordNumber(a2) && isRecordNumber(b))
    return { ...a2, ...b };
  return b ?? a2;
};
var mergeHook = (a2, b, { allowMacro = true } = {}) => {
  const rest4 = allowMacro ? {
    ...a2,
    ...b
  } : undefined;
  return {
    ...rest4,
    body: b?.body ?? a2?.body,
    headers: b?.headers ?? a2?.headers,
    params: b?.params ?? a2?.params,
    query: b?.query ?? a2?.query,
    response: mergeResponse(a2?.response, b?.response),
    type: a2?.type || b?.type,
    detail: mergeDeep(b?.detail ?? {}, a2?.detail ?? {}),
    parse: mergeObjectArray(a2?.parse, b?.parse),
    transform: mergeObjectArray(a2?.transform, b?.transform),
    beforeHandle: mergeObjectArray(a2?.beforeHandle, b?.beforeHandle),
    afterHandle: mergeObjectArray(a2?.afterHandle, b?.afterHandle),
    onResponse: mergeObjectArray(a2?.onResponse, b?.onResponse),
    mapResponse: mergeObjectArray(a2?.mapResponse, b?.mapResponse),
    trace: mergeObjectArray(a2?.trace, b?.trace),
    error: mergeObjectArray(a2?.error, b?.error)
  };
};
var getSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = false
} = {}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const schema3 = typeof s === "string" ? models[s] : s;
  if (schema3.type === "object" && "additionalProperties" in schema3 === false)
    schema3.additionalProperties = additionalProperties;
  const cleaner = (value15) => exports_value2.Clean(schema3, value15);
  if (dynamic) {
    const validator = {
      schema: schema3,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value15) => exports_value2.Check(schema3, value15),
      Errors: (value15) => exports_value2.Errors(schema3, value15),
      Code: () => ""
    };
    if (normalize && schema3.additionalProperties === false)
      validator.Clean = cleaner;
    if (schema3.config) {
      validator.config = schema3.config;
      if (validator?.schema?.config)
        delete validator.schema.config;
    }
    return validator;
  }
  const compiled = TypeCompiler.Compile(schema3, Object.values(models));
  compiled.Clean = cleaner;
  if (schema3.config) {
    compiled.config = schema3.config;
    if (compiled?.schema?.config)
      delete compiled.schema.config;
  }
  return compiled;
};
var getResponseSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = false
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const maybeSchemaOrRecord = typeof s === "string" ? models[s] : s;
  const compile = (schema3, references) => {
    const cleaner = (value15) => exports_value2.Clean(schema3, value15);
    if (dynamic)
      return {
        schema: schema3,
        references: "",
        checkFunc: () => {
        },
        code: "",
        Check: (value15) => exports_value2.Check(schema3, value15),
        Errors: (value15) => exports_value2.Errors(schema3, value15),
        Code: () => ""
      };
    const compiledValidator = TypeCompiler.Compile(schema3, references);
    if (normalize && schema3.additionalProperties === false)
      compiledValidator.Clean = cleaner;
    return compiledValidator;
  };
  if (Kind in maybeSchemaOrRecord) {
    if ("additionalProperties" in maybeSchemaOrRecord === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return {
      200: compile(maybeSchemaOrRecord, Object.values(models))
    };
  }
  const record4 = {};
  Object.keys(maybeSchemaOrRecord).forEach((status) => {
    const maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        const schema3 = models[maybeNameOrSchema];
        schema3.type === "object" && "additionalProperties" in schema3;
        record4[+status] = Kind in schema3 ? compile(schema3, Object.values(models)) : schema3;
      }
      return;
    }
    if (maybeNameOrSchema.type === "object" && "additionalProperties" in maybeNameOrSchema === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record4[+status] = Kind in maybeNameOrSchema ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  });
  return record4;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = (s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0;i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h = h ^ h >>> 9;
};
var getCookieValidator = ({
  validator,
  defaultConfig = {},
  config,
  dynamic,
  models
}) => {
  let cookieValidator = getSchemaValidator(validator, {
    dynamic,
    models,
    additionalProperties: true
  });
  if (isNotEmpty(defaultConfig)) {
    if (cookieValidator) {
      cookieValidator.config = mergeCookie(cookieValidator.config, config);
    } else {
      cookieValidator = getSchemaValidator(t2.Cookie({}), {
        dynamic,
        models,
        additionalProperties: true
      });
      cookieValidator.config = defaultConfig;
    }
  }
  return cookieValidator;
};
var mergeLifeCycle = (a2, b, checksum2) => {
  const injectChecksum = (x) => {
    if (!x)
      return;
    if (!Array.isArray(x)) {
      const fn = x;
      if (checksum2 && !fn.checksum)
        fn.checksum = checksum2;
      if (fn.scope === "scoped")
        fn.scope = "local";
      return fn;
    }
    const fns = [...x];
    for (const fn of fns) {
      if (checksum2 && !fn.checksum)
        fn.checksum = checksum2;
      if (fn.scope === "scoped")
        fn.scope = "local";
    }
    return fns;
  };
  return {
    start: mergeObjectArray(a2.start, injectChecksum(b?.start)),
    request: mergeObjectArray(a2.request, injectChecksum(b?.request)),
    parse: mergeObjectArray(a2.parse, injectChecksum(b?.parse)),
    transform: mergeObjectArray(a2.transform, injectChecksum(b?.transform)),
    beforeHandle: mergeObjectArray(a2.beforeHandle, injectChecksum(b?.beforeHandle)),
    afterHandle: mergeObjectArray(a2.afterHandle, injectChecksum(b?.afterHandle)),
    mapResponse: mergeObjectArray(a2.mapResponse, injectChecksum(b?.mapResponse)),
    onResponse: mergeObjectArray(a2.onResponse, injectChecksum(b?.onResponse)),
    trace: a2.trace,
    error: mergeObjectArray(a2.error, injectChecksum(b?.error)),
    stop: mergeObjectArray(a2.stop, injectChecksum(b?.stop))
  };
};
var asHookType = (fn, inject, { skipIfHasType = false } = {}) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (skipIfHasType)
      fn.scope ??= inject;
    else
      fn.scope = inject;
    return fn;
  }
  for (const x of fn)
    if (skipIfHasType)
      x.scope ??= inject;
    else
      x.scope = inject;
  return fn;
};
var filterGlobal = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn))
    switch (fn.scope) {
      case "global":
      case "scoped":
        return { ...fn };
      default:
        return { fn };
    }
  const array5 = [];
  for (const x of fn)
    switch (x.scope) {
      case "global":
      case "scoped":
        array5.push({
          ...x
        });
        break;
    }
  return array5;
};
var filterGlobalHook = (hook) => {
  return {
    ...hook,
    type: hook?.type,
    detail: hook?.detail,
    parse: filterGlobal(hook?.parse),
    transform: filterGlobal(hook?.transform),
    beforeHandle: filterGlobal(hook?.beforeHandle),
    afterHandle: filterGlobal(hook?.afterHandle),
    onResponse: filterGlobal(hook?.onResponse),
    error: filterGlobal(hook?.error),
    mapResponse: filterGlobal(hook?.mapResponse)
  };
};
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(Object.entries(StatusMap).map(([k, v]) => [v, k]));
var encoder = new TextEncoder;
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const hmacBuffer = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(val));
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var traceBackMacro = (extension, property, hooks = property) => {
  if (!extension || typeof extension !== "object" || !property)
    return;
  for (const [key, value15] of Object.entries(property)) {
    if (key in primitiveHookMap || !(key in extension))
      continue;
    const v = extension[key];
    if (typeof v === "function") {
      v(value15);
    } else if (typeof v === "object")
      traceBackMacro(v, value15, hooks);
  }
};
var createMacroManager = ({
  globalHook,
  localHook
}) => (stackName) => (type47, fn) => {
  if (typeof type47 === "function")
    type47 = {
      fn: type47
    };
  if ("fn" in type47 || Array.isArray(type47)) {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (Array.isArray(type47))
      localHook[stackName] = localHook[stackName].concat(type47);
    else
      localHook[stackName].push(type47);
    return;
  }
  const { insert = "after", stack = "local" } = type47;
  if (typeof fn === "function")
    fn = { fn };
  if (stack === "global") {
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        globalHook[stackName].unshift(fn);
      } else {
        globalHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        globalHook[stackName] = fn.concat(globalHook[stackName]);
      } else {
        globalHook[stackName] = globalHook[stackName].concat(fn);
      }
    }
  } else {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        localHook[stackName].unshift(fn);
      } else {
        localHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        localHook[stackName] = fn.concat(localHook[stackName]);
      } else {
        localHook[stackName] = localHook[stackName].concat(fn);
      }
    }
  }
};
var isNumericString = (message) => {
  if (message.length < 16)
    return message.trim().length !== 0 && !Number.isNaN(Number(message));
  if (message.length === 16) {
    const numVal = Number(message);
    if (numVal.toString() === message)
      return message.trim().length !== 0 && !Number.isNaN(numVal);
  }
  return false;
};
var PromiseGroup = class {
  constructor(onError = console.error) {
    this.onError = onError;
    this.root = null;
    this.promises = [];
  }
  get size() {
    return this.promises.length;
  }
  add(promise5) {
    this.promises.push(promise5);
    this.root ||= this.drain();
    return promise5;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (error22) {
        this.onError(error22);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then(onfulfilled, onrejected) {
    return (this.root ?? Promise.resolve()).then(onfulfilled, onrejected);
  }
};
var fnToContainer = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (typeof fn === "function")
      return { fn };
    else if ("fn" in fn)
      return fn;
  }
  const fns = [];
  for (const x of fn) {
    if (typeof x === "function")
      fns.push({ fn: x });
    else if ("fn" in x)
      fns.push(x);
  }
  return fns;
};
var localHookToLifeCycleStore = (a2) => {
  return {
    ...a2,
    start: fnToContainer(a2?.start),
    request: fnToContainer(a2?.request),
    parse: fnToContainer(a2?.parse),
    transform: fnToContainer(a2?.transform),
    beforeHandle: fnToContainer(a2?.beforeHandle),
    afterHandle: fnToContainer(a2?.afterHandle),
    onResponse: fnToContainer(a2?.onResponse),
    mapResponse: fnToContainer(a2?.mapResponse),
    trace: fnToContainer(a2?.trace),
    error: fnToContainer(a2?.error),
    stop: fnToContainer(a2?.stop)
  };
};
var lifeCycleToFn = (a2) => {
  return {
    ...a2,
    start: a2.start?.map((x) => x.fn),
    request: a2.request?.map((x) => x.fn),
    parse: a2.parse?.map((x) => x.fn),
    transform: a2.transform?.map((x) => x.fn),
    beforeHandle: a2.beforeHandle?.map((x) => x.fn),
    afterHandle: a2.afterHandle?.map((x) => x.fn),
    onResponse: a2.onResponse?.map((x) => x.fn),
    mapResponse: a2.mapResponse?.map((x) => x.fn),
    trace: a2.trace?.map((x) => x.fn),
    error: a2.error?.map((x) => x.fn),
    stop: a2.stop?.map((x) => x.fn)
  };
};
var cloneInference = (inference) => ({
  event: {
    body: inference.event.body,
    cookie: inference.event.cookie,
    headers: inference.event.headers,
    queries: [...inference.event.queries],
    query: inference.event.query,
    set: inference.event.set,
    unknownQueries: inference.event.unknownQueries
  },
  trace: {
    request: inference.trace.request,
    parse: inference.trace.parse,
    transform: inference.trace.transform,
    handle: inference.trace.handle,
    beforeHandle: inference.trace.beforeHandle,
    afterHandle: inference.trace.afterHandle,
    error: inference.trace.error,
    context: inference.trace.context,
    store: inference.trace.store,
    set: inference.trace.set
  }
});
var redirect = (url, status = 301) => Response.redirect(url, status);
var ELYSIA_FORM_DATA = Symbol("ElysiaFormData");
var form = (items) => {
  const formData = new FormData;
  for (const [key, value15] of Object.entries(items)) {
    if (Array.isArray(value15)) {
      for (const v of value15) {
        if (value15 instanceof File)
          formData.append(key, value15, value15.name);
        formData.append(key, v);
      }
      continue;
    }
    if (value15 instanceof File)
      formData.append(key, value15, value15.name);
    formData.append(key, value15);
  }
  return formData;
};
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var ELYSIA_RESPONSE = Symbol("ElysiaResponse");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var error22 = (code, response) => ({
  [ELYSIA_RESPONSE]: StatusMap[code] ?? code,
  response: response ?? (code in InvertedStatusMap ? InvertedStatusMap[code] : code),
  _type: undefined
});
var InternalServerError = class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
};
var ParseError = class extends Error {
  constructor(message, body) {
    super(message ?? "PARSE");
    this.body = body;
    this.code = "PARSE";
    this.status = 400;
  }
};
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type47, validator, value15) {
    if (typeof value15 === "object" && ELYSIA_RESPONSE in value15)
      value15 = value15.response;
    const error23 = isProduction ? undefined : ("Errors" in validator) ? validator.Errors(value15).First() : exports_value2.Errors(validator, value15).First();
    const customError = error23?.schema.error !== undefined ? typeof error23.schema.error === "function" ? error23.schema.error({
      type: type47,
      validator,
      value: value15,
      get errors() {
        return [...validator.Errors(value15)];
      }
    }) : error23.schema.error : undefined;
    const accessor = error23?.path || "root";
    let message = "";
    if (customError !== undefined) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type47,
        message: error23?.message,
        found: value15
      });
    } else {
      const schema3 = validator?.schema ?? validator;
      const errors5 = "Errors" in validator ? [...validator.Errors(value15)] : [...exports_value2.Errors(validator, value15)];
      let expected;
      try {
        expected = exports_value2.Create(schema3);
      } catch (error32) {
        expected = {
          type: "Could not create expected value",
          message: error32?.message,
          error: error32
        };
      }
      message = JSON.stringify({
        type: "validation",
        on: type47,
        property: accessor,
        message: error23?.message,
        expected,
        found: value15,
        errors: errors5
      }, null, 2);
    }
    super(message);
    this.type = type47;
    this.validator = validator;
    this.value = value15;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return [...this.validator.Errors(this.value)];
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return exports_value2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
};
var websocket = {
  open(ws) {
    ws.data.open?.(ws);
  },
  message(ws, message) {
    ws.data.message?.(ws, message);
  },
  drain(ws) {
    ws.data.drain?.(ws);
  },
  close(ws, code, reason) {
    ws.data.close?.(ws, code, reason);
  }
};
var ElysiaWS = class {
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    this.validator = raw.data.validator;
    if (raw.data.id) {
      this.id = raw.data.id;
    } else {
      const array5 = new Uint32Array(1);
      crypto.getRandomValues(array5);
      this.id = array5[0].toString();
    }
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = undefined, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.publish(topic, data, compress);
      return this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer.isBuffer(data)) {
        this.raw.send(data);
        return this;
      }
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.send(data);
      return this;
    };
  }
  get subscribe() {
    return (room) => {
      this.raw.subscribe(room);
      return this;
    };
  }
  get unsubscribe() {
    return (room) => {
      this.raw.unsubscribe(room);
      return this;
    };
  }
  get cork() {
    return (callback) => {
      this.raw.cork(callback);
      return this;
    };
  }
  get close() {
    return () => {
      this.raw.close();
      return this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
};
var headersHasToJSON = new Headers().toJSON;
var requestId = { value: 0 };
var createReport = ({
  hasTrace,
  hasTraceSet = false,
  addFn,
  condition = {}
}) => {
  if (hasTrace) {
    addFn(`
const reporter = getReporter()
`);
    return (event, {
      name,
      attribute = "",
      unit = 0
    } = {}) => {
      const dotIndex = event.indexOf(".");
      const isGroup = dotIndex === -1;
      if (event !== "request" && event !== "response" && !condition[isGroup ? event : event.slice(0, dotIndex)])
        return () => {
          if (hasTraceSet && event === "afterHandle")
            addFn(`
await traceDone
`);
        };
      if (isGroup)
        name ||= event;
      else
        name ||= "anonymous";
      addFn("\n" + `reporter.emit('event', {
					id,
					event: '${event}',
					type: 'begin',
					name: '${name}',
					time: performance.now(),
					${isGroup ? `unit: ${unit},` : ""}
					${attribute}
				})`.replace(/(\t| |\n)/g, "") + "\n");
      return () => {
        addFn("\n" + `reporter.emit('event', {
							id,
							event: '${event}',
							type: 'end',
							time: performance.now()
						})`.replace(/(\t| |\n)/g, "") + "\n");
        if (hasTraceSet && event === "afterHandle")
          addFn(`
await traceDone
`);
      };
    };
  } else {
    return () => () => {
    };
  }
};
var hasReturn = (fnLiteral) => {
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
};
var composeValidationFactory = (hasErrorHandler, {
  injectResponse = "",
  normalize = false
} = {}) => ({
  composeValidation: (type47, value15 = `c.${type47}`) => hasErrorHandler ? `c.set.status = 422; throw new ValidationError('${type47}', ${type47}, ${value15})` : `c.set.status = 422; return new ValidationError('${type47}', ${type47}, ${value15}).toResponse(c.set.headers)`,
  composeResponseValidation: (name = "r") => {
    const returnError = hasErrorHandler ? `throw new ValidationError('response', response[c.set.status], ${name})` : `return new ValidationError('response', response[c.set.status], ${name}).toResponse(c.set.headers)`;
    let code = "\n" + injectResponse + "\n";
    code += `let er

		if(${name} && typeof ${name} === "object" && ELYSIA_RESPONSE in ${name})
			er = ${name}[ELYSIA_RESPONSE]
`;
    if (normalize)
      code += `
			if(!er && response[c.set.status]?.Clean)
				${name} = response[c.set.status]?.Clean(${name})
			else if(response[er]?.Clean)
				${name}.response = response[er]?.Clean(${name}.response)`;
    code += `
			if(er) {
				if(!(${name} instanceof Response) && response[er]?.Check(${name}.response) === false) {
					if(!(response instanceof Error)) {
						c.set.status = ${name}[ELYSIA_RESPONSE]

						${returnError}
					}
				}
			} else if(!(${name} instanceof Response) && response[c.set.status]?.Check(${name}) === false) {
				if(!(response instanceof Error))
					${returnError}
			}
`;
    return code;
  }
});
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasProperty = (expectedProperty, schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object") {
    const properties = schema3.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema3;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object" && schema3.properties) {
    const properties = schema3.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema3 || schema3.properties && TransformSymbol in schema3.properties;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsync = (v) => {
  const fn = "fn" in v ? v.fn : v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal14 = fn.toString();
  if (literal14.includes("=> response.clone("))
    return false;
  if (literal14.includes("await"))
    return true;
  if (literal14.includes("async"))
    return true;
  return !!literal14.match(matchFnReturn);
};
var composeHandler = ({
  app,
  path,
  method,
  localHook,
  hooks,
  validator,
  handler,
  allowMeta = false,
  appInference: { event: eventInference, trace: traceInference }
}) => {
  const isHandleFn = typeof handler === "function";
  if (!isHandleFn)
    handler = mapResponse(handler, {
      headers: app.setHeaders ?? {}
    });
  const hasErrorHandler = app.config.forceErrorEncapsulation && (isHandleFn || hooks.afterHandle.length > 0 || hooks.beforeHandle.length > 0 || hooks.transform.length > 0) || hooks.error.length > 0 || app.event.error.length > 0 || typeof Bun === "undefined" || hooks.onResponse.length > 0 || !!hooks.trace.length;
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const handleResponse = hooks.onResponse.length ? `
;(async () => {${hooks.onResponse.map((_, i) => `await res${i}(c)`).join(";")}})();
` : "";
  const traceConditions = traceInference;
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  const inference = sucrose(Object.assign(localHook, {
    handler
  }), eventInference);
  const hasQuery = inference.query || !!validator.query;
  const hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && hooks.type !== "none" && (inference.body || !!validator.body);
  const defaultHeaders = app.setHeaders;
  const hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length;
  const hasHeaders = inference.headers || validator.headers;
  const hasCookie = inference.cookie || !!validator.cookie;
  const cookieValidator = hasCookie ? getCookieValidator({
    validator: validator.cookie,
    defaultConfig: app.config.cookie,
    dynamic: !!app.config.aot,
    config: validator.cookie?.config ?? {},
    models: app.definitions.type
  }) : undefined;
  const cookieMeta = cookieValidator?.config;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${method}) ${path}.`);
    const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
		if(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
				c.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
			}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += "}\n";
  }
  const normalize = app.config.normalize;
  const { composeValidation, composeResponseValidation } = composeValidationFactory(hasErrorHandler, {
    normalize
  });
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
					c.headers[key] = value
				`;
  }
  if (hasCookie) {
    const get = (name, defaultValue) => {
      const value15 = cookieMeta?.[name] ?? defaultValue;
      if (!value15)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value15 === "string")
        return `${name}: '${value15}',`;
      if (value15 instanceof Date)
        return `${name}: new Date(${value15.getTime()}),`;
      return `${name}: ${value15},`;
    };
    const options = cookieMeta ? `{
			secrets: ${cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce((a2, b) => a2 + `'${b}',`, "") + "]" : "undefined"},
			sign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? "[" + cookieMeta.sign.reduce((a2, b) => a2 + `'${b}',`, "") + "]" : "undefined"},
			${get("domain")}
			${get("expires")}
			${get("httpOnly")}
			${get("maxAge")}
			${get("path", "/")}
			${get("priority")}
			${get("sameSite")}
			${get("secure")}
		}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    let destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      destructured = Object.keys(validator.query.schema.properties);
    } else
      for (const query of inference.queries)
        if (destructured.indexOf(query) === -1)
          destructured.push(query);
    if (app.config.forceDynamicQuery === true || inference.unknownQueries === true || !destructured.length) {
      fnLiteral += `if(c.qi !== -1) {
				c.query = parseQuery(c.url.slice(c.qi + 1).replace(/\\+/g, ' '))

			} else c.query = {}`;
    } else {
      fnLiteral += `if(c.qi !== -1) {
				let url = '&' + c.url.slice(c.qi + 1).replace(/\\+/g, ' ')

				${destructured.map((name, index) => `
						${index === 0 ? "let" : ""} memory = url.indexOf('&${name}=')
						let a${index}

						if (memory !== -1) {
							const start = memory + ${name.length + 2}
							memory = url.indexOf('&', start)

							if(memory === -1) a${index} = decodeURIComponent(url.slice(start))
							else a${index} = decodeURIComponent(url.slice(start, memory))
						}`).join("\n")}

				c.query = {
					${destructured.map((name, index) => `'${name}': a${index}`).join(", ")}
				}
			} else {
				c.query = {}
			}`;
    }
  }
  const hasTraceSet = traceInference.set;
  const hasSet = inference.cookie || inference.set || hasTraceSet || hasHeaders || isHandleFn && hasDefaultHeaders;
  if (hasTrace)
    fnLiteral += "\nconst id = c.$$requestId\n";
  const report = createReport({
    hasTrace,
    hasTraceSet,
    condition: traceConditions,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += hasErrorHandler ? "\n try {\n" : "";
  if (hasTraceSet) {
    fnLiteral += `
const traceDone = Promise.all([`;
    for (let i = 0;i < hooks.trace.length; i++) {
      fnLiteral += `new Promise(r => { reporter.once(\`res\${id}.${i}\`, r) }),`;
    }
    fnLiteral += `])
`;
  }
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const maybeAsync = hasCookie || hasBody || hasTraceSet || isAsyncHandler || !!hooks.mapResponse.length || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync);
  const endParse = report("parse", {
    unit: hooks.parse.length
  });
  if (hasBody) {
    const hasBodyInference = hooks.parse.length || inference.body || validator.body;
    if (hooks.type && !hooks.parse.length) {
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (hasErrorHandler)
            fnLiteral += `const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}`;
          else
            fnLiteral += `c.body = await c.request.json()`;
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          fnLiteral += `c.body = {}

						const form = await c.request.formData()
						for (const key of form.keys()) {
							if (c.body[key])
								continue

							const value = form.getAll(key)
							if (value.length === 1)
								c.body[key] = value[0]
							else c.body[key] = value
						}
`;
          break;
      }
    } else if (hasBodyInference) {
      fnLiteral += "\n";
      fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
      fnLiteral += `
				if (contentType) {
					const index = contentType.indexOf(';')
					if (index !== -1) contentType = contentType.substring(0, index)

					c.contentType = contentType
`;
      if (hooks.parse.length) {
        fnLiteral += `let used = false
`;
        const endReport = report("parse", {
          unit: hooks.parse.length
        });
        for (let i = 0;i < hooks.parse.length; i++) {
          const endUnit = report("parse.unit", {
            name: hooks.parse[i].fn.name
          });
          const name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
          fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
          fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
          endUnit();
          if (i !== 0)
            fnLiteral += `}`;
        }
        endReport();
      }
      fnLiteral += "\ndelete c.contentType\n";
      if (hooks.parse.length)
        fnLiteral += `if (!used) {`;
      if (hooks.type && !Array.isArray(hooks.type)) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (hasErrorHandler)
              fnLiteral += `const tempBody = await c.request.text()

								try {
									c.body = JSON.parse(tempBody)
								} catch {
									throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
								}`;
            else
              fnLiteral += `c.body = await c.request.json()`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}
`;
            break;
        }
      } else {
        fnLiteral += `
					switch (contentType) {
						case 'application/json':
							${hasErrorHandler ? `
							const tempBody = await c.request.text()

							try {
								c.body = JSON.parse(tempBody)
							} catch {
								throw new ParseError('Failed to parse body as found: ' + (typeof body === "string" ? "'" + body + "'" : body), body)
							}
							` : `c.body = await c.request.json()
`}
							break

						case 'text/plain':
							c.body = await c.request.text()
							break

						case 'application/x-www-form-urlencoded':
							c.body = parseQuery(await c.request.text())
							break

						case 'application/octet-stream':
							c.body = await c.request.arrayBuffer();
							break

						case 'multipart/form-data':
							c.body = {}

							const form = await c.request.formData()
							for (const key of form.keys()) {
								if (c.body[key])
									continue

								const value = form.getAll(key)
								if (value.length === 1)
									c.body[key] = value[0]
								else c.body[key] = value
							}

							break
					}`;
      }
      if (hooks.parse.length)
        fnLiteral += `}`;
      fnLiteral += "}\n";
    }
    fnLiteral += "\n";
  }
  endParse();
  if (hooks?.transform) {
    const endTransform = report("transform", {
      unit: hooks.transform.length
    });
    if (hooks.transform.length)
      fnLiteral += "\nlet transformed\n";
    for (let i = 0;i < hooks.transform.length; i++) {
      const transform7 = hooks.transform[i];
      const endUnit = report("transform.unit", {
        name: transform7.fn.name
      });
      fnLiteral += isAsync(transform7) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`;
      fnLiteral += `if(transformed?.[ELYSIA_RESPONSE])
				throw transformed
			else
				Object.assign(c, transformed)
`;
      endUnit();
    }
    endTransform();
  }
  if (validator) {
    fnLiteral += "\n";
    if (validator.headers) {
      if (hasProperty("default", validator.headers.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.headers.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : typeof value15 === "string" ? `'${value15}'` : value15;
          if (parsed)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(headers.Check(c.headers) === false) {
				${composeValidation("headers")}
			}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `
c.headers = headers.Decode(c.headers)
`;
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.params.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : typeof value15 === "string" ? `'${value15}'` : value15;
          if (parsed)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(params.Check(c.params) === false) {
				${composeValidation("params")}
			}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize)
        fnLiteral += "c.query = query.Clean(c.query);\n";
      if (hasProperty("default", validator.query.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(validator.query.schema, {}))) {
          const parsed = typeof value15 === "object" ? JSON.stringify(value15) : typeof value15 === "string" ? `'${value15}'` : value15;
          if (parsed)
            fnLiteral += `c.query['${key}'] ??= ${parsed}
`;
        }
      for (const [key, value15] of Object.entries(validator.query.schema?.properties)) {
        const { type: type47, anyOf } = value15;
        if (type47 === "object" || type47 === "array") {
          fnLiteral += `
if(typeof c.query['${key}'] === "string")
						try {
							c.query['${key}'] = JSON.parse(c.query['${key}'])
						} catch {}
`;
          continue;
        }
        if (anyOf) {
          fnLiteral += `
if(Array.isArray(c.query['${key}'])) {
						for(let i = 0; i < c.query['${key}'].length; i++) {
							if(
								typeof c.query['${key}'][i] === "string" && 
								(c.query['${key}'][i].charCodeAt(0) === 123  ||
								 c.query['${key}'][i].charCodeAt(0) === 91)
							)
								try {
									c.query['${key}'][i] = JSON.parse(c.query['${key}'][i])
								} catch {}
						}
					} else if(typeof c.query['${key}'] === "object") {
						c.query['${key}'] = JSON.parse(c.query['${key}'])
					}
`;
        }
      }
      fnLiteral += `if(query.Check(c.query) === false) {
				${composeValidation("query")}
			}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = query.Decode(Object.assign({}, c.query))
`;
    }
    if (validator.body) {
      if (normalize)
        fnLiteral += "c.body = body.Clean(c.body);\n";
      if (hasProperty("default", validator.body.schema)) {
        fnLiteral += `if(body.Check(c.body) === false) {
					if (typeof c.body === 'object') {
						c.body = Object.assign(${JSON.stringify(exports_value2.Default(validator.body.schema, {}) ?? {})}, c.body)
					} else {`;
        const defaultValue = exports_value2.Default(validator.body.schema, undefined);
        if (typeof defaultValue === "string")
          fnLiteral += `c.body = '${defaultValue}'`;
        else
          fnLiteral += `c.body = ${defaultValue}`;
        fnLiteral += `}
    				if(body.Check(c.body) === false) {
        				${composeValidation("body")}
     			}
            }`;
      } else
        fnLiteral += `if(body.Check(c.body) === false) {
			${composeValidation("body")}
		}`;
      if (hasTransform(validator.body.schema))
        fnLiteral += `
c.body = body.Decode(c.body)
`;
    }
    if (isNotEmpty(cookieValidator?.schema?.properties ?? cookieValidator?.schema?.schema ?? {})) {
      fnLiteral += `const cookieValue = {}
    			for(const [key, value] of Object.entries(c.cookie))
    				cookieValue[key] = value.value
`;
      if (hasProperty("default", cookieValidator.schema))
        for (const [key, value15] of Object.entries(exports_value2.Default(cookieValidator.schema, {}))) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value15 === "object" ? JSON.stringify(value15) : value15}
`;
        }
      fnLiteral += `if(cookie.Check(cookieValue) === false) {
				${composeValidation("cookie", "cookieValue")}
			}`;
    }
  }
  if (hooks?.beforeHandle) {
    const endBeforeHandle = report("beforeHandle", {
      unit: hooks.beforeHandle.length
    });
    let hasResolve = false;
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = report("beforeHandle.unit", {
        name: beforeHandle.fn.name
      });
      const returning = hasReturn(beforeHandle.fn.toString());
      const isResolver = beforeHandle.subType === "resolve";
      if (isResolver) {
        if (!hasResolve) {
          hasResolve = true;
          fnLiteral += "\nlet resolved\n";
        }
        fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`;
        fnLiteral += `if(resolved[ELYSIA_RESPONSE])
						throw resolved
					else
						Object.assign(c, resolved)
`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit();
        fnLiteral += `if(be !== undefined) {
`;
        endBeforeHandle();
        if (hooks.afterHandle?.length) {
          const endAfterHandle = report("afterHandle", {
            unit: hooks.transform.length
          });
          report("handle", {
            name: isHandleFn ? handler.name : undefined
          })();
          for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
            const hook = hooks.afterHandle[i2];
            const returning2 = hasReturn(hook.fn.toString());
            const endUnit2 = report("afterHandle.unit", {
              name: hook.fn.name
            });
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2();
          }
          endAfterHandle();
        }
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        if (hooks.mapResponse.length) {
          fnLiteral += `c.response = be`;
          for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
            fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i2}](c)
							if(mr instanceof Promise) mr = await mr
							if(mr !== undefined) be = c.response = mr
						}
`;
          }
        }
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(be, c.set)}
`;
      }
    }
    endBeforeHandle();
  }
  if (hooks?.afterHandle.length) {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    endHandle();
    const endAfterHandle = report("afterHandle", {
      unit: hooks.afterHandle.length
    });
    for (let i = 0;i < hooks.afterHandle.length; i++) {
      const hook = hooks.afterHandle[i];
      const returning = hasReturn(hook.fn.toString());
      const endUnit = report("afterHandle.unit", {
        name: hook.fn.name
      });
      if (!returning) {
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit();
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          endAfterHandle();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    endAfterHandle();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    if (hooks.mapResponse.length) {
      for (let i = 0;i < hooks.mapResponse.length; i++) {
        fnLiteral += `
mr = onMapResponse[${i}](c)
				if(mr instanceof Promise) mr = await mr
				if(mr !== undefined) r = c.response = mr
`;
      }
    }
    if (hasSet)
      fnLiteral += `return mapResponse(r, c.set)
`;
    else
      fnLiteral += `return mapCompactResponse(r)
`;
  } else {
    const endHandle = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
						mr = onMapResponse[${i}](c)
						if(mr instanceof Promise) mr = await mr
    					if(mr !== undefined) r = c.response = mr
					}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(r, c.set)
`;
      else
        fnLiteral += `return mapCompactResponse(r)
`;
    } else if (traceConditions.handle || hasCookie) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      endHandle();
      report("afterHandle")();
      if (hooks.mapResponse.length) {
        fnLiteral += "c.response = r";
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          fnLiteral += `
if(mr === undefined) {
							mr = onMapResponse[${i}](c)
							if(mr instanceof Promise) mr = await mr
    						if(mr !== undefined) r = c.response = mr
						}
`;
        }
      }
      fnLiteral += encodeCookie;
      if (hasSet)
        fnLiteral += `return mapResponse(r, c.set)
`;
      else
        fnLiteral += `return mapCompactResponse(r)
`;
    } else {
      endHandle();
      const handled = isAsyncHandler ? `await ${handle}` : handle;
      report("afterHandle")();
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
					isNotEmpty(c.set.headers) ||
					c.set.status !== 200 ||
					c.set.redirect ||
					c.set.cookie
				)
					return mapResponse(${handle}.clone(), c.set)
				else
					return ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += "\n";
      } else if (hasSet)
        fnLiteral += `return mapResponse(${handled}, c.set)
`;
      else
        fnLiteral += `return mapCompactResponse(${handled})
`;
    }
  }
  if (hasErrorHandler || handleResponse) {
    fnLiteral += `
} catch(error) {`;
    if (!maybeAsync)
      fnLiteral += `return (async () => {`;
    fnLiteral += `const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`;
    const endError = report("error", {
      unit: hooks.error.length
    });
    if (hooks.error.length) {
      fnLiteral += `
				c.error = error
				c.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
			`;
      for (let i = 0;i < hooks.error.length; i++) {
        const name = `er${i}`;
        const endUnit = report("error.unit", {
          name: hooks.error[i].fn.name
        });
        fnLiteral += `
let ${name} = handleErrors[${i}](c)
`;
        if (isAsync(hooks.error[i]))
          fnLiteral += `if (${name} instanceof Promise) ${name} = await ${name}
`;
        endUnit();
        fnLiteral += `${name} = mapEarlyResponse(${name}, set)
`;
        fnLiteral += `if (${name}) {`;
        fnLiteral += `return ${name} }
`;
      }
    }
    endError();
    fnLiteral += `return handleError(c, error, true)

`;
    if (!maybeAsync)
      fnLiteral += "})()";
    fnLiteral += "}";
    if (handleResponse || hasTrace) {
      fnLiteral += ` finally { `;
      const endResponse = report("response", {
        unit: hooks.onResponse.length
      });
      fnLiteral += handleResponse;
      endResponse();
      fnLiteral += `}`;
    }
  }
  fnLiteral = `const {
		handler,
		handleError,
		hooks: {
			transform,
			resolve,
			beforeHandle,
			afterHandle,
			mapResponse: onMapResponse,
			parse,
			error: handleErrors,
			onResponse
		},
		validator: {
			body,
			headers,
			params,
			query,
			response,
			cookie
		},
		utils: {
			mapResponse,
			mapCompactResponse,
			mapEarlyResponse,
			parseQuery,
			isNotEmpty
		},
		error: {
			NotFoundError,
			ValidationError,
			InternalServerError,
			ParseError
		},
		schema,
		definitions,
		ERROR_CODE,
		getReporter,
		requestId,
		parseCookie,
		signCookie,
		decodeURIComponent,
		ELYSIA_RESPONSE
	} = hooks

	${hooks.onResponse.length ? `const ${hooks.onResponse.map((x, i) => `res${i} = onResponse[${i}]`).join(",")}` : ""}

	return ${maybeAsync ? "async" : ""} function handle(c) {
		${hooks.beforeHandle.length ? "let be" : ""}
		${hooks.afterHandle.length ? "let af" : ""}
		${hooks.mapResponse.length ? "let mr" : ""}

		${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
		${fnLiteral}
	}`;
  const createHandler = Function("hooks", fnLiteral);
  return createHandler({
    handler,
    hooks: lifeCycleToFn(hooks),
    validator,
    handleError: app.handleError,
    utils: {
      mapResponse,
      mapCompactResponse,
      mapEarlyResponse,
      parseQuery: import_fast_querystring.parse,
      isNotEmpty
    },
    error: {
      NotFoundError,
      ValidationError,
      InternalServerError,
      ParseError
    },
    schema: app.router.history,
    definitions: app.definitions.type,
    ERROR_CODE,
    getReporter: () => app.reporter,
    requestId,
    parseCookie,
    signCookie,
    decodeURIComponent: import_fast_decode_uri_component2.default,
    ELYSIA_RESPONSE
  });
};
var composeGeneralHandler = (app) => {
  const inference = {
    event: {
      ...app.inference.event,
      queries: [...app.inference.event.queries]
    },
    trace: { ...app.inference.trace }
  };
  let decoratorsLiteral = "";
  let fnLiteral = "";
  const defaultHeaders = app.setHeaders;
  for (const key of Object.keys(app.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  const router = app.router;
  const hasTrace = app.event.trace.length > 0;
  let findDynamicRoute = `
	const route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

	if (route === null)
		return ${app.event.error.length ? `app.handleError(ctx, notFound)` : app.event.request.length ? `new Response(error404Message, {
					status: ctx.set.status === 200 ? 404 : ctx.set.status,
					headers: ctx.set.headers
				})` : `error404.clone()`}

	ctx.params = route.params
`;
  const shouldPrecompile = app.config.precompile === true || typeof app.config.precompile === "object" && app.config.precompile.compose === true;
  if (!shouldPrecompile)
    findDynamicRoute += `
			if(route.store.composed)
				return route.store.composed(ctx)

			if(route.store.compose)
				return (route.store.compose())(ctx)`;
  else
    findDynamicRoute += `return route.store(ctx)`;
  findDynamicRoute += "\n";
  let switchMap = ``;
  for (const [path, { code, all }] of Object.entries(router.static.http.map))
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  const maybeAsync = app.event.request.some(isAsync);
  const init = `

	const url = request.url
	const s = url.indexOf('/', 11)
	const qi = url.indexOf('?', s + 1)
	let path
	if(qi === -1)
		path = url.substring(s)
	else
		path = url.substring(s, qi)
`;
  fnLiteral += `const {
		app,
		mapEarlyResponse,
		NotFoundError,
		requestId,
		getReporter,
		handleError,
		error,
		redirect
	} = data

	const store = app.singleton.store
	const staticRouter = app.router.static.http
	const wsRouter = app.router.ws
	const router = app.router.http

	const notFound = new NotFoundError()

	${app.event.request.length ? `const onRequest = app.event.request.map(x => x.fn)` : ""}
	${router.static.http.variables}
	${app.event.error.length ? "" : `
	const error404Message = notFound.message.toString()
	const error404 = new Response(error404Message, { status: 404 });
	`}

	return ${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app.event.request.length)
    fnLiteral += `let re`;
  const report = createReport({
    hasTrace,
    hasTraceSet: inference.trace.set,
    condition: {
      request: inference.trace.request
    },
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  if (app.event.request.length) {
    fnLiteral += `
			${hasTrace ? "const id = +requestId.value++" : ""}

			const ctx = {
				request,
				store,
				redirect,
				set: {
					headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
					status: 200
				},
				error
				${hasTrace ? ",$$requestId: +id" : ""}
				${decoratorsLiteral}
			}
		`;
    const endReport = report("request", {
      attribute: "ctx",
      unit: app.event.request.length
    });
    fnLiteral += `
 try {
`;
    for (let i = 0;i < app.event.request.length; i++) {
      const hook = app.event.request[i];
      const withReturn = hasReturn(hook.fn.toString());
      const maybeAsync2 = isAsync(hook);
      const endUnit = report("request.unit", {
        name: app.event.request[i].fn.name
      });
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
					${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
					ctx.set,
					request
				)
`;
        endUnit();
        fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
			return app.handleError(ctx, error)
		}`;
    endReport();
    fnLiteral += init;
    fnLiteral += `
ctx.qi = qi
 ctx.path = path
ctx.url=url`;
  } else {
    fnLiteral += init;
    fnLiteral += `${hasTrace ? "const id = +requestId.value++" : ""}
		const ctx = {
			request,
			store,
			qi,
			path,
			url,
			redirect,
			set: {
				headers: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
				status: 200
			},
			error
			${hasTrace ? ",$$requestId: id" : ""}
			${decoratorsLiteral}
		}`;
    report("request", {
      unit: app.event.request.length,
      attribute: inference.trace.context || inference.trace.store || inference.trace.set ? "ctx" : ""
    })();
  }
  const wsPaths = app.router.static.ws;
  const wsRouter = app.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
			if(request.method === 'GET') {
				switch(path) {`;
    for (const [path, index] of Object.entries(wsPaths)) {
      fnLiteral += `
					case '${path}':
						if(request.headers.get('upgrade') === 'websocket')
							return st${index}(ctx)

						break`;
    }
    fnLiteral += `
				default:
					if(request.headers.get('upgrade') === 'websocket') {
						const route = wsRouter.find('ws', path)

						if(route) {
							ctx.params = route.params

							return route.store(ctx)
						}
					}

					break
			}
		}
`;
  }
  fnLiteral += `
		map: switch(path) {
			${switchMap}

			default:
				break
		}

		${findDynamicRoute}
	}`;
  const handleError = composeErrorHandler(app);
  app.handleError = handleError;
  return Function("data", fnLiteral)({
    app,
    mapEarlyResponse,
    NotFoundError,
    getReporter: () => app.reporter,
    requestId,
    handleError,
    error: error22,
    redirect
  });
};
var composeErrorHandler = (app) => {
  let fnLiteral = `const {
		app: { event: { error: onErrorContainer, onResponse: resContainer } },
		mapResponse,
		ERROR_CODE,
		ELYSIA_RESPONSE
	} = inject

	const onError = onErrorContainer.map(x => x.fn)
	const res = resContainer.map(x => x.fn)

	return ${app.event.error.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {
		let r

		const { set } = context

		context.code = error.code
		context.error = error

		if(typeof error === "object" && ELYSIA_RESPONSE in error) {
			error.status = error[ELYSIA_RESPONSE]
			error.message = error.response
		}
`;
  for (let i = 0;i < app.event.error.length; i++) {
    const handler = app.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    fnLiteral += "\nif(skipGlobal !== true) {\n";
    if (hasReturn(handler.fn.toString()))
      fnLiteral += `r = ${response}; if(r !== undefined) {
				if(r instanceof Response) return r

				if(r[ELYSIA_RESPONSE]) {
					error.status = error[ELYSIA_RESPONSE]
					error.message = error.response
				}

				if(set.status === 200) set.status = error.status
				return mapResponse(r, set, context.request)
			}
`;
    else
      fnLiteral += response + "\n";
    fnLiteral += "\n}\n";
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
		set.status = error.status ?? 422
		return new Response(
			error.message,
			{
				headers: Object.assign(
					{ 'content-type': 'application/json'},
					set.headers
				),
				status: set.status
			}
		)
	} else {
		if(error.code && typeof error.status === "number")
			return new Response(
				error.message,
				{ headers: set.headers, status: error.status }
			)

		return mapResponse(error, set, context.request)
	}
}`;
  return Function("inject", fnLiteral)({
    app,
    mapResponse,
    ERROR_CODE,
    ELYSIA_RESPONSE
  });
};
var jitRoute = (index) => `if(stc${index}) return stc${index}(ctx)
if(st${index}.compose) return (stc${index} = st${index}.compose())(ctx)

return st${index}(ctx)`;
var createDynamicHandler = (app) => async (request) => {
  const url = request.url, s = url.indexOf("/", 11), qi = url.indexOf("?", s + 1), path = qi === -1 ? url.substring(s) : url.substring(s, qi);
  const set2 = {
    cookie: {},
    status: 200,
    headers: {}
  };
  const context = Object.assign({}, app.singleton.decorator, {
    set: set2,
    store: app.singleton.store,
    request,
    path,
    qi,
    redirect
  });
  try {
    for (let i = 0;i < app.event.request.length; i++) {
      const onRequest = app.event.request[i].fn;
      let response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      response2 = mapEarlyResponse(response2, set2);
      if (response2)
        return response2;
    }
    const handler = app.router.dynamic.find(request.method, path) ?? app.router.dynamic.find("ALL", path);
    if (!handler)
      throw new NotFoundError;
    const { handle, hooks, validator, content } = handler.store;
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (content) {
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = import_fast_querystring2.parse(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            const form2 = await request.formData();
            for (const key of form2.keys()) {
              if (body[key])
                continue;
              const value15 = form2.getAll(key);
              if (value15.length === 1)
                body[key] = value15[0];
              else
                body[key] = value15;
            }
            break;
        }
      } else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          const index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          context.contentType = contentType;
          for (let i = 0;i < hooks.parse.length; i++) {
            const hook = hooks.parse[i].fn;
            let temp = hook(context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          delete context.contentType;
          if (body === undefined) {
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = import_fast_querystring2.parse(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                const form2 = await request.formData();
                for (const key of form2.keys()) {
                  if (body[key])
                    continue;
                  const value15 = form2.getAll(key);
                  if (value15.length === 1)
                    body[key] = value15[0];
                  else
                    body[key] = value15;
                }
                break;
            }
          }
        }
      }
    }
    context.body = body;
    context.params = handler?.params || undefined;
    context.query = qi === -1 ? {} : import_fast_querystring2.parse(url.substring(qi + 1));
    context.headers = {};
    for (const [key, value15] of request.headers.entries())
      context.headers[key] = value15;
    const cookieMeta = Object.assign({}, app.config?.cookie, validator?.cookie?.config);
    const cookieHeaderValue = request.headers.get("cookie");
    context.cookie = await parseCookie(context.set, cookieHeaderValue, cookieMeta ? {
      secrets: cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : undefined,
      sign: cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : undefined
    } : undefined);
    for (let i = 0;i < hooks.transform.length; i++) {
      const hook = hooks.transform[i];
      const operation = hook.fn(context);
      if (hook.subType === "derive") {
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      } else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.headers) {
        const _header = {};
        for (const key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError("header", validator.headers, _header);
      }
      if (validator.params?.Check(context.params) === false)
        throw new ValidationError("params", validator.params, context.params);
      if (validator.query?.Check(context.query) === false)
        throw new ValidationError("query", validator.query, context.query);
      if (validator.cookie) {
        const cookieValue = {};
        for (const [key, value15] of Object.entries(context.cookie))
          cookieValue[key] = value15.value;
        if (validator.cookie?.Check(cookieValue) === false)
          throw new ValidationError("cookie", validator.cookie, cookieValue);
      }
      if (validator.body?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
    }
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      let response2 = hooks.beforeHandle[i].fn(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== undefined) {
        context.response = response2;
        for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2].fn(context);
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        const result = mapEarlyResponse(response2, context.set);
        if (result)
          return result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      const responseValidator = validator?.response?.[response.status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError("response", responseValidator, response);
    } else {
      context.response = response;
      for (let i = 0;i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i].fn(context);
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        const result = mapEarlyResponse(newResponse, context.set);
        if (result !== undefined) {
          const responseValidator = validator?.response?.[response.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError("response", responseValidator, result);
          return result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (const [key, cookie] of Object.entries(context.set.cookie))
          context.set.cookie[key].value = await signCookie(cookie.value, "${secret}");
      else {
        const properties = validator?.cookie?.schema?.properties;
        for (const name of cookieMeta.sign) {
          if (!(name in properties))
            continue;
          if (context.set.cookie[name]?.value) {
            context.set.cookie[name].value = await signCookie(context.set.cookie[name].value, secret);
          }
        }
      }
    }
    return mapResponse(response, context.set);
  } catch (error23) {
    if (error23.status)
      set2.status = error23.status;
    return app.handleError(context, error23);
  } finally {
    for (const onResponse of app.event.onResponse)
      await onResponse.fn(context);
  }
};
var createDynamicErrorHandler = (app) => async (context, error23) => {
  const errorContext = Object.assign(context, { error: error23, code: error23.code });
  errorContext.set = context.set;
  for (let i = 0;i < app.event.error.length; i++) {
    const hook = app.event.error[i];
    let response = hook.fn(errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== undefined && response !== null)
      return mapResponse(response, context.set);
  }
  return new Response(typeof error23.cause === "string" ? error23.cause : error23.message, {
    headers: context.set.headers,
    status: error23.status ?? 500
  });
};
var fullFormats = {
  date: date5,
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  byte,
  int32: { type: "number", validate: validateInt32 },
  int64: { type: "number", validate: validateInt64 },
  float: { type: "number", validate: validateNumber },
  double: { type: "number", validate: validateNumber },
  password: true,
  binary: true
};
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
var DATE_TIME_SEPARATOR = /t|\s/i;
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
var Z_ANCHOR = /[^\\]\\Z/;
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!exports_format.Has("date"))
  TypeSystem.Format("date", (value15) => {
    const temp = value15.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
if (!exports_format.Has("date-time"))
  TypeSystem.Format("date-time", (value15) => {
    const temp = value15.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!exports_format.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value15) => formatValue.test(value15));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t2 = Object.assign({}, Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value15) => {
  if (!(value15 instanceof Blob))
    return false;
  if (options.minSize && value15.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value15.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value15.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0;i < options.extension.length; i++)
        if (value15.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File2 = exports_type.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = exports_type.Get("Files") ?? TypeSystem.Type("Files", (options, value15) => {
  if (!Array.isArray(value15))
    return validateFile(options, value15);
  if (options.minItems && value15.length < options.minItems)
    return false;
  if (options.maxItems && value15.length > options.maxItems)
    return false;
  for (let i = 0;i < value15.length; i++)
    if (!validateFile(options, value15[i]))
      return false;
  return true;
});
if (!exports_format.Has("numeric"))
  exports_format.Set("numeric", (value15) => !!value15 && !isNaN(+value15));
if (!exports_format.Has("boolean"))
  exports_format.Set("boolean", (value15) => value15 === "true" || value15 === "false");
if (!exports_format.Has("ObjectString"))
  exports_format.Set("ObjectString", (value15) => {
    let start = value15.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value15.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value15);
      return true;
    } catch {
      return false;
    }
  });
var ElysiaType = {
  Numeric: (property) => {
    const schema3 = Type.Number(property);
    return t2.Transform(t2.Union([
      t2.String({
        format: "numeric",
        default: 0
      }),
      t2.Number(property)
    ], property)).Decode((value15) => {
      const number7 = +value15;
      if (isNaN(number7))
        return value15;
      if (property && !exports_value2.Check(schema3, number7))
        throw new ValidationError("property", schema3, number7);
      return number7;
    }).Encode((value15) => value15);
  },
  Date: (property) => {
    const schema3 = Type.Date(property);
    return t2.Transform(t2.Union([
      Type.Date(property),
      t2.String({
        format: "date",
        default: (new Date()).toISOString()
      }),
      t2.String({
        format: "date-time",
        default: (new Date()).toISOString()
      })
    ], property)).Decode((value15) => {
      if (value15 instanceof Date)
        return value15;
      const date22 = new Date(value15);
      if (!exports_value2.Check(schema3, date22))
        throw new ValidationError("property", schema3, date22);
      return date22;
    }).Encode((value15) => {
      if (typeof value15 === "string")
        return new Date(value15);
      return value15;
    });
  },
  BooleanString: (property) => {
    const schema3 = Type.Boolean(property);
    return t2.Transform(t2.Union([
      t2.String({
        format: "boolean",
        default: false
      }),
      t2.Boolean(property)
    ], property)).Decode((value15) => {
      if (typeof value15 === "string")
        return value15 === "true";
      if (property && !exports_value2.Check(schema3, value15))
        throw new ValidationError("property", schema3, value15);
      return value15;
    }).Encode((value15) => value15);
  },
  ObjectString: (properties = {}, options) => {
    const schema3 = t2.Object(properties, options);
    const defaultValue = JSON.stringify(exports_value2.Create(schema3));
    return t2.Transform(t2.Union([
      t2.String({
        format: "ObjectString",
        default: defaultValue
      }),
      schema3
    ])).Decode((value15) => {
      if (typeof value15 === "string") {
        try {
          value15 = JSON.parse(value15);
        } catch {
          throw new ValidationError("property", schema3, value15);
        }
        if (!exports_value2.Check(schema3, value15))
          throw new ValidationError("property", schema3, value15);
        return value15;
      }
      return value15;
    }).Encode((value15) => {
      if (typeof value15 === "string")
        try {
          value15 = JSON.parse(value15);
        } catch {
          throw new ValidationError("property", schema3, value15);
        }
      if (!exports_value2.Check(schema3, value15))
        throw new ValidationError("property", schema3, value15);
      return JSON.stringify(value15);
    });
  },
  File: File2,
  Files: (options = {}) => t2.Transform(Files(options)).Decode((value15) => {
    if (Array.isArray(value15))
      return value15;
    return [value15];
  }).Encode((value15) => value15),
  Nullable: (schema3) => t2.Union([t2.Null(), schema3]),
  MaybeEmpty: (schema3) => t2.Union([t2.Null(), t2.Undefined(), schema3]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t2.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  }
};
t2.BooleanString = ElysiaType.BooleanString;
t2.ObjectString = ElysiaType.ObjectString;
t2.Numeric = ElysiaType.Numeric;
t2.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t2.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t2.Nullable = (schema3) => ElysiaType.Nullable(schema3);
t2.MaybeEmpty = ElysiaType.MaybeEmpty;
t2.Cookie = ElysiaType.Cookie;
t2.Date = ElysiaType.Date;
var Elysia = class _Elysia {
  constructor(config) {
    this.server = null;
    this.dependencies = {};
    this.reporter = new eventemitter3_default;
    this._routes = {};
    this._types = {
      Prefix: "",
      Scoped: false,
      Singleton: {},
      Definitions: {},
      Metadata: {}
    };
    this._ephemeral = {};
    this._volatile = {};
    this.singleton = {
      decorator: {},
      store: {},
      derive: {},
      resolve: {}
    };
    this.definitions = {
      type: {},
      error: {}
    };
    this.extender = {
      macros: []
    };
    this.validator = null;
    this.event = {
      start: [],
      request: [],
      parse: [],
      transform: [],
      beforeHandle: [],
      afterHandle: [],
      mapResponse: [],
      onResponse: [],
      trace: [],
      error: [],
      stop: []
    };
    this.telemetry = {
      stack: undefined
    };
    this.router = {
      http: new Memoirist,
      ws: new Memoirist,
      dynamic: new Memoirist,
      static: {
        http: {
          handlers: [],
          variables: "",
          map: {},
          all: ""
        },
        ws: {}
      },
      history: []
    };
    this.inference = {
      event: {
        body: false,
        cookie: false,
        headers: false,
        queries: [],
        query: false,
        set: false,
        unknownQueries: false
      },
      trace: {
        request: false,
        parse: false,
        transform: false,
        handle: false,
        beforeHandle: false,
        afterHandle: false,
        error: false,
        context: false,
        store: false,
        set: false
      }
    };
    this.promisedModules = new PromiseGroup;
    this.routeTree = new Map;
    this.handle = async (request) => this.fetch(request);
    this.fetch = (request) => {
      if (false)
        ;
      return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
    };
    this.handleError = async (context, error23) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error23);
    this.outerErrorHandler = (error23) => new Response(error23.message || error23.name || "Error", {
      status: error23?.status ?? 500
    });
    this.listen = (options, callback) => {
      if (typeof Bun === "undefined")
        throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
      this.compile();
      if (typeof options === "string") {
        if (!isNumericString(options))
          throw new Error("Port must be a numeric value");
        options = parseInt(options);
      }
      const fetch = this.fetch;
      const serve = typeof options === "object" ? {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        ...options || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        fetch,
        error: this.outerErrorHandler
      } : {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        port: options,
        fetch,
        error: this.outerErrorHandler
      };
      this.server = Bun?.serve(serve);
      for (let i = 0;i < this.event.start.length; i++)
        this.event.start[i].fn(this);
      if (callback)
        callback(this.server);
      process.on("beforeExit", () => {
        if (this.server) {
          this.server.stop();
          this.server = null;
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
        }
      });
      this.promisedModules.then(() => {
        Bun?.gc(false);
      });
      return this;
    };
    this.stop = async () => {
      if (!this.server)
        throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
      if (this.server) {
        this.server.stop();
        this.server = null;
        if (this.event.stop.length)
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
      }
    };
    if (config?.tags) {
      if (!config.detail)
        config.detail = {
          tags: config.tags
        };
      else
        config.detail.tags = config.tags;
    }
    this.config = {
      forceErrorEncapsulation: true,
      prefix: "",
      aot: true,
      strictPath: false,
      global: false,
      cookie: {
        path: "/"
      },
      analytic: false,
      forceDynamicQuery: true,
      ...config,
      experimental: config?.experimental ?? {},
      seed: config?.seed === undefined ? "" : config?.seed
    };
    if (config?.analytic && (config?.name || config?.seed !== undefined))
      this.telemetry.stack = new Error().stack;
  }
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  getServer() {
    return this.server;
  }
  get routes() {
    return this.router.history;
  }
  applyMacro(localHook) {
    if (this.extender.macros.length) {
      const manage = createMacroManager({
        globalHook: this.event,
        localHook
      });
      const manager = {
        events: {
          global: this.event,
          local: localHook
        },
        onParse: manage("parse"),
        onTransform: manage("transform"),
        onBeforeHandle: manage("beforeHandle"),
        onAfterHandle: manage("afterHandle"),
        onResponse: manage("onResponse"),
        mapResponse: manage("mapResponse"),
        onError: manage("error")
      };
      for (const macro of this.extender.macros)
        traceBackMacro(macro.fn(manager), localHook);
    }
  }
  add(method, path, handle, localHook, { allowMeta = false, skipPrefix = false } = {
    allowMeta: false,
    skipPrefix: false
  }) {
    localHook = localHookToLifeCycleStore(localHook);
    if (path !== "" && path.charCodeAt(0) !== 47)
      path = "/" + path;
    if (this.config.prefix && !skipPrefix && !this.config.scoped)
      path = this.config.prefix + path;
    if (localHook?.type)
      switch (localHook.type) {
        case "text":
          localHook.type = "text/plain";
          break;
        case "json":
          localHook.type = "application/json";
          break;
        case "formdata":
          localHook.type = "multipart/form-data";
          break;
        case "urlencoded":
          localHook.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          localHook.type = "application/octet-stream";
          break;
        default:
          break;
      }
    const models = this.definitions.type;
    let _body, _headers, _params, _query, _cookie, _response;
    const dynamic = !this.config.aot;
    const cloned = {
      body: localHook?.body ?? this.validator?.body,
      headers: localHook?.headers ?? this.validator?.headers,
      params: localHook?.params ?? this.validator?.params,
      query: localHook?.query ?? this.validator?.query,
      cookie: localHook?.cookie ?? this.validator?.cookie,
      response: localHook?.response ?? this.validator?.response
    };
    const cookieValidator = () => cloned.cookie ? getCookieValidator({
      validator: cloned.cookie,
      defaultConfig: this.config.cookie,
      config: cloned.cookie?.config ?? {},
      dynamic,
      models
    }) : undefined;
    const normalize = this.config.normalize;
    const validator = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? {
      body: getSchemaValidator(cloned.body, {
        dynamic,
        models,
        normalize
      }),
      headers: getSchemaValidator(cloned.headers, {
        dynamic,
        models,
        additionalProperties: true
      }),
      params: getSchemaValidator(cloned.params, {
        dynamic,
        models
      }),
      query: getSchemaValidator(cloned.query, {
        dynamic,
        models,
        normalize
      }),
      cookie: cookieValidator(),
      response: getResponseSchemaValidator(cloned.response, {
        dynamic,
        models,
        normalize
      })
    } : {
      get body() {
        if (_body)
          return _body;
        return _body = getSchemaValidator(cloned.body, {
          dynamic,
          models,
          normalize
        });
      },
      get headers() {
        if (_headers)
          return _headers;
        return getSchemaValidator(cloned.headers, {
          dynamic,
          models,
          additionalProperties: true
        });
      },
      get params() {
        if (_params)
          return _params;
        return _params = getSchemaValidator(cloned.params, {
          dynamic,
          models
        });
      },
      get query() {
        if (_query)
          return _query;
        return _query = getSchemaValidator(cloned.query, {
          dynamic,
          models
        });
      },
      get cookie() {
        if (_cookie)
          return _cookie;
        return _cookie = cookieValidator();
      },
      get response() {
        if (_response)
          return _response;
        return _response = getResponseSchemaValidator(cloned.response, {
          dynamic,
          models,
          normalize
        });
      }
    };
    const loosePath = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
    localHook = mergeHook(localHook, {}, { allowMacro: true });
    if (localHook.tags) {
      if (!localHook.detail)
        localHook.detail = {
          tags: localHook.tags
        };
      else
        localHook.detail.tags = localHook.tags;
    }
    if (isNotEmpty(this.config.detail))
      localHook.detail = mergeDeep(Object.assign({}, this.config.detail), localHook.detail);
    this.applyMacro(localHook);
    const hooks = mergeHook(this.event, localHook);
    if (this.config.aot === false) {
      this.router.dynamic.add(method, path, {
        validator,
        hooks,
        content: localHook?.type,
        handle
      });
      if (this.config.strictPath === false) {
        this.router.dynamic.add(method, loosePath, {
          validator,
          hooks,
          content: localHook?.type,
          handle
        });
      }
      this.router.history.push({
        method,
        path,
        composed: null,
        handler: handle,
        hooks
      });
      return;
    }
    let composed = undefined;
    const shouldPrecompile = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true;
    const appInference = cloneInference(this.inference);
    const mainHandler = shouldPrecompile ? composeHandler({
      app: this,
      path,
      method,
      localHook: mergeHook(localHook),
      hooks,
      validator,
      handler: handle,
      allowMeta,
      appInference
    }) : (context) => {
      if (composed)
        return composed(context);
      return (composed = composeHandler({
        app: this,
        path,
        method,
        localHook: mergeHook(localHook),
        hooks,
        validator,
        handler: handle,
        allowMeta,
        appInference
      }))(context);
    };
    if (!shouldPrecompile)
      mainHandler.compose = () => {
        return mainHandler.composed = composeHandler({
          app: this,
          path,
          method,
          localHook: mergeHook(localHook),
          hooks,
          validator,
          handler: handle,
          allowMeta,
          appInference
        });
      };
    let routeIndex = this.router.history.length;
    if (this.routeTree.has(method + path)) {
      routeIndex = this.router.history.findIndex((route) => route.path === path && route.method === method);
      if (routeIndex !== -1) {
        const removed = this.router.history.splice(routeIndex, 1)[0];
        if (removed && this.routeTree.has(removed?.method + removed?.path))
          this.routeTree.delete(removed.method + removed.path);
      }
    }
    this.routeTree.set(method + path, routeIndex);
    this.router.history.push({
      method,
      path,
      composed: mainHandler,
      handler: handle,
      hooks
    });
    const staticRouter = this.router.static.http;
    if (method === "$INTERNALWS") {
      const loose = this.config.strictPath ? undefined : path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
        const index = staticRouter.handlers.length;
        staticRouter.handlers.push(mainHandler);
        staticRouter.variables += `const st${index} = staticRouter.handlers[${index}]
`;
        this.router.static.ws[path] = index;
        if (loose)
          this.router.static.ws[loose] = index;
      } else {
        this.router.ws.add("ws", path, mainHandler);
        if (loose)
          this.router.ws.add("ws", loose, mainHandler);
      }
      return;
    }
    if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
      const index = staticRouter.handlers.length;
      staticRouter.handlers.push(mainHandler);
      staticRouter.variables += shouldPrecompile ? `const st${index} = staticRouter.handlers[${index}]
` : `let st${index} = staticRouter.handlers[${index}]
let stc${index}
`;
      if (!staticRouter.map[path])
        staticRouter.map[path] = {
          code: ""
        };
      if (method === "ALL")
        staticRouter.map[path].all = shouldPrecompile ? `default: return st${index}(ctx)
` : `default: ${jitRoute(index)}
`;
      else
        staticRouter.map[path].code = shouldPrecompile ? `case '${method}': return st${index}(ctx)
${staticRouter.map[path].code}` : `case '${method}': ${jitRoute(index)}
${staticRouter.map[path].code}`;
      if (!this.config.strictPath) {
        if (!staticRouter.map[loosePath])
          staticRouter.map[loosePath] = {
            code: ""
          };
        if (method === "ALL")
          staticRouter.map[loosePath].all = shouldPrecompile ? `default: return st${index}(ctx)
` : `default: ${jitRoute(index)}
`;
        else
          staticRouter.map[loosePath].code = shouldPrecompile ? `case '${method}': return st${index}(ctx)
${staticRouter.map[loosePath].code}` : `case '${method}': ${jitRoute(index)}
${staticRouter.map[loosePath].code}`;
      }
    } else {
      this.router.http.add(method, path, mainHandler);
      if (!this.config.strictPath)
        this.router.http.add(method, path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/", mainHandler);
    }
  }
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    this.setHeaders = mergeDeep(this.setHeaders, header);
    return this;
  }
  onStart(handler) {
    this.on("start", handler);
    return this;
  }
  onRequest(handler) {
    this.on("request", handler);
    return this;
  }
  onParse(options, handler) {
    if (!handler)
      return this.on("parse", options);
    return this.on(options, "parse", handler);
  }
  onTransform(options, handler) {
    if (!handler)
      return this.on("transform", options);
    return this.on(options, "transform", handler);
  }
  resolve(optionsOrResolve, resolve) {
    if (!resolve) {
      resolve = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: resolve
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  mapResolve(optionsOrResolve, mapper) {
    if (!mapper) {
      mapper = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: mapper
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  onBeforeHandle(options, handler) {
    if (!handler)
      return this.on("beforeHandle", options);
    return this.on(options, "beforeHandle", handler);
  }
  onAfterHandle(options, handler) {
    if (!handler)
      return this.on("afterHandle", options);
    return this.on(options, "afterHandle", handler);
  }
  mapResponse(options, handler) {
    if (!handler)
      return this.on("mapResponse", options);
    return this.on(options, "mapResponse", handler);
  }
  onResponse(options, handler) {
    if (!handler)
      return this.on("response", options);
    return this.on(options, "response", handler);
  }
  trace(options, handler) {
    if (!handler) {
      handler = options;
      options = { as: "local" };
    }
    if (!Array.isArray(handler))
      handler = [handler];
    for (const fn of handler)
      this.reporter.on("event", createTraceListener(() => this.reporter, this.event.trace.length, fn));
    this.on(options, "trace", handler);
    return this;
  }
  error(name, error23) {
    switch (typeof name) {
      case "string":
        error23.prototype[ERROR_CODE] = name;
        this.definitions.error[name] = error23;
        return this;
      case "function":
        this.definitions.error = name(this.definitions.error);
        return this;
    }
    for (const [code, error32] of Object.entries(name)) {
      error32.prototype[ERROR_CODE] = code;
      this.definitions.error[code] = error32;
    }
    return this;
  }
  onError(options, handler) {
    if (!handler)
      return this.on("error", options);
    return this.on(options, "error", handler);
  }
  onStop(handler) {
    this.on("stop", handler);
    return this;
  }
  on(optionsOrType, typeOrHandlers, handlers) {
    let type47;
    switch (typeof optionsOrType) {
      case "string":
        type47 = optionsOrType;
        handlers = typeOrHandlers;
        break;
      case "object":
        type47 = typeOrHandlers;
        break;
    }
    if (type47 === "response")
      type47 = "onResponse";
    if (Array.isArray(handlers))
      handlers = fnToContainer(handlers);
    else {
      if (typeof handlers === "function")
        handlers = [
          {
            fn: handlers
          }
        ];
      else
        handlers = [handlers];
    }
    const handles = handlers;
    for (const handle of handles)
      handle.scope = typeof optionsOrType === "string" ? "local" : optionsOrType?.as ?? "local";
    if (type47 === "trace")
      sucroseTrace(handles.map((x) => x.fn), this.inference.trace);
    else
      sucrose({
        [type47]: handles.map((x) => x.fn)
      }, this.inference.event);
    for (const handle of handles) {
      const fn = asHookType(handle, "global", { skipIfHasType: true });
      switch (type47) {
        case "start":
          this.event.start.push(fn);
          break;
        case "request":
          this.event.request.push(fn);
          break;
        case "parse":
          this.event.parse.push(fn);
          break;
        case "transform":
          this.event.transform.push(fn);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(fn);
          break;
        case "afterHandle":
          this.event.afterHandle.push(fn);
          break;
        case "mapResponse":
          this.event.mapResponse.push(fn);
          break;
        case "onResponse":
          this.event.onResponse.push(fn);
          break;
        case "trace":
          this.event.trace.push(fn);
          break;
        case "error":
          this.event.error.push(fn);
          break;
        case "stop":
          this.event.stop.push(fn);
          break;
      }
    }
    return this;
  }
  propagate() {
    const promoteEvent = (events) => {
      for (const event of events) {
        if ("scope" in event && event.scope === "local")
          event.scope = "scoped";
      }
    };
    promoteEvent(this.event.parse);
    promoteEvent(this.event.transform);
    promoteEvent(this.event.beforeHandle);
    promoteEvent(this.event.afterHandle);
    promoteEvent(this.event.mapResponse);
    promoteEvent(this.event.onResponse);
    promoteEvent(this.event.trace);
    promoteEvent(this.event.error);
    return this;
  }
  group(prefix, schemaOrRun, run) {
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.getServer = () => this.server;
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const isSchema = typeof schemaOrRun === "object";
    const sandbox = (isSchema ? run : schemaOrRun)(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks }) => {
      path = (isSchema ? "" : this.config.prefix) + prefix + path;
      if (isSchema) {
        const hook = schemaOrRun;
        const localHook = hooks;
        this.add(method, path, handler, mergeHook(hook, {
          ...localHook || {},
          error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
            ...localHook.error || {},
            ...sandbox.event.error || {}
          ] : [
            localHook.error,
            ...sandbox.event.error || {}
          ]
        }));
      } else {
        this.add(method, path, handler, mergeHook(hooks, {
          error: sandbox.event.error
        }), {
          skipPrefix: true
        });
      }
    });
    return this;
  }
  guard(hook, run) {
    if (!run) {
      if (typeof hook === "object") {
        this.applyMacro(hook);
        this.event = mergeLifeCycle(this.event, hook);
        this.validator = {
          body: hook.body ?? this.validator?.body,
          headers: hook.headers ?? this.validator?.headers,
          params: hook.params ?? this.validator?.params,
          query: hook.query ?? this.validator?.query,
          response: hook.response ?? this.validator?.response,
          cookie: hook.cookie ?? this.validator?.cookie
        };
        if (hook.detail) {
          if (this.config.detail)
            this.config.detail = mergeDeep(Object.assign({}, this.config.detail), hook.detail);
          else
            this.config.detail = hook.detail;
        }
        if (hook?.tags) {
          if (!this.config.detail)
            this.config.detail = {
              tags: hook.tags
            };
          else
            this.config.detail.tags = hook.tags;
        }
        return this;
      }
      return this.guard({}, hook);
    }
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const sandbox = run(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    sandbox.getServer = () => this.server;
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.onResponse.length)
      this.event.onResponse = [
        ...this.event.onResponse || [],
        ...sandbox.event.onResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks: localHook }) => {
      this.add(method, path, handler, mergeHook(hook, {
        ...localHook || {},
        error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
          ...localHook.error || {},
          ...sandbox.event.error || []
        ] : [
          localHook.error,
          ...sandbox.event.error || []
        ]
      }, {
        allowMacro: true
      }));
    });
    return this;
  }
  use(plugin, options) {
    if (options?.scoped)
      return this.guard({}, (app) => app.use(plugin));
    if (Array.isArray(plugin)) {
      let current = this;
      for (const p of plugin)
        current = this.use(p);
      return current;
    }
    if (plugin instanceof Promise) {
      this.promisedModules.add(plugin.then((plugin2) => {
        if (typeof plugin2 === "function")
          return plugin2(this);
        if (plugin2 instanceof _Elysia)
          return this._use(plugin2);
        if (typeof plugin2.default === "function")
          return plugin2.default(this);
        if (plugin2.default instanceof _Elysia)
          return this._use(plugin2.default);
        throw new Error('Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.');
      }).then((x) => x.compile()));
      return this;
    }
    return this._use(plugin);
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      const instance = plugin(this);
      if (instance instanceof Promise) {
        this.promisedModules.add(instance.then((plugin2) => {
          if (plugin2 instanceof _Elysia) {
            this.compile();
            for (const {
              method,
              path,
              handler,
              hooks
            } of Object.values(plugin2.router.history)) {
              this.add(method, path, handler, mergeHook(hooks, {
                error: plugin2.event.error
              }));
            }
            return plugin2;
          }
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          return this._use(plugin2);
        }).then((x) => x.compile()));
        return this;
      }
      return instance;
    }
    if (plugin.promisedModules.size) {
      this.promisedModules.add(plugin.modules.then(() => this._use(plugin)).then((x) => x.compile()));
      return this;
    }
    const { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer();
    plugin.model(this.definitions.type);
    plugin.error(this.definitions.error);
    const isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton.decorator,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          }))
        });
      }
      plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      const macroHashes = [];
      for (let i = 0;i < plugin.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macroHashes.includes(macro.checksum)) {
          plugin.extender.macros.splice(i, 1);
          i--;
        }
        macroHashes.push(macro.checksum);
      }
      plugin.onRequest((context) => {
        Object.assign(context, this.singleton.decorator);
        Object.assign(context.store, this.singleton.store);
      });
      if (plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (!plugin.config.prefix)
        console.warn("It's recommended to use scoped instance with a prefix to prevent collision routing with other instance.");
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      if (isScoped === true && plugin.config.prefix) {
        this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      } else {
        this.mount(plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      }
      return this;
    } else {
      this.headers(plugin.setHeaders);
      plugin.reporter = this.reporter;
      for (const trace of plugin.event.trace)
        if (trace.scope && trace.scope !== "local")
          this.trace(trace);
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      } else {
        this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      }
      const macroHashes = [];
      for (let i = 0;i < this.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macro.checksum) {
          if (macroHashes.includes(macro.checksum)) {
            this.extender.macros.splice(i, 1);
            i--;
          }
          macroHashes.push(macro.checksum);
        }
      }
      this.inference = {
        event: {
          body: this.inference.event.body || plugin.inference.event.body,
          cookie: this.inference.event.cookie || plugin.inference.event.cookie,
          headers: this.inference.event.headers || plugin.inference.event.headers,
          queries: [
            ...this.inference.event.queries,
            ...plugin.inference.event.queries
          ],
          query: this.inference.event.query || plugin.inference.event.query,
          set: this.inference.event.set || plugin.inference.event.set,
          unknownQueries: this.inference.event.unknownQueries || plugin.inference.event.unknownQueries
        },
        trace: {
          request: this.inference.trace.request || plugin.inference.trace.request,
          parse: this.inference.trace.parse || plugin.inference.trace.parse,
          transform: this.inference.trace.transform || plugin.inference.trace.transform,
          handle: this.inference.trace.handle || plugin.inference.trace.handle,
          beforeHandle: this.inference.trace.beforeHandle || plugin.inference.trace.beforeHandle,
          afterHandle: this.inference.trace.afterHandle || plugin.inference.trace.afterHandle,
          error: this.inference.trace.error || plugin.inference.trace.error,
          context: this.inference.trace.context || plugin.inference.trace.context,
          store: this.inference.trace.store || plugin.inference.trace.store,
          set: this.inference.trace.set || plugin.inference.trace.set
        }
      };
    }
    this.decorate(plugin.singleton.decorator);
    this.state(plugin.singleton.store);
    this.model(plugin.definitions.type);
    this.error(plugin.definitions.error);
    plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
    for (const { method, path, handler, hooks } of Object.values(plugin.router.history)) {
      this.add(method, path, handler, mergeHook(hooks, {
        error: plugin.event.error
      }));
    }
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x?.subType === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x?.subType === "resolve").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          }))
        });
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event), current);
      } else {
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event));
      }
    return this;
  }
  macro(macro) {
    const hook = {
      checksum: checksum(JSON.stringify({
        name: this.config.name,
        seed: this.config.seed,
        content: macro.toString()
      })),
      fn: macro
    };
    this.extender.macros.push(hook);
    return this;
  }
  mount(path, handle) {
    if (path instanceof _Elysia || typeof path === "function" || path.length === 0 || path === "/") {
      const run = typeof path === "function" ? path : path instanceof _Elysia ? path.compile().fetch : handle instanceof _Elysia ? handle.compile().fetch : handle;
      const handler2 = async ({ request, path: path2 }) => run(new Request(replaceUrlPath(request.url, path2 || "/"), request));
      this.all("/*", handler2, {
        type: "none"
      });
      return this;
    }
    const length = path.length;
    if (handle instanceof _Elysia)
      handle = handle.compile().fetch;
    const handler = async ({ request, path: path2 }) => handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), request));
    this.all(path, handler, {
      type: "none"
    });
    this.all(path + (path.endsWith("/") ? "*" : "/*"), handler, {
      type: "none"
    });
    return this;
  }
  get(path, handler, hook) {
    this.add("GET", path, handler, hook);
    return this;
  }
  post(path, handler, hook) {
    this.add("POST", path, handler, hook);
    return this;
  }
  put(path, handler, hook) {
    this.add("PUT", path, handler, hook);
    return this;
  }
  patch(path, handler, hook) {
    this.add("PATCH", path, handler, hook);
    return this;
  }
  delete(path, handler, hook) {
    this.add("DELETE", path, handler, hook);
    return this;
  }
  options(path, handler, hook) {
    this.add("OPTIONS", path, handler, hook);
    return this;
  }
  all(path, handler, hook) {
    this.add("ALL", path, handler, hook);
    return this;
  }
  head(path, handler, hook) {
    this.add("HEAD", path, handler, hook);
    return this;
  }
  connect(path, handler, hook) {
    this.add("CONNECT", path, handler, hook);
    return this;
  }
  route(method, path, handler, hook) {
    this.add(method.toUpperCase(), path, handler, hook, hook?.config);
    return this;
  }
  ws(path, options) {
    const transform7 = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : undefined;
    let server = null;
    const validateMessage = getSchemaValidator(options?.body, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const validateResponse = getSchemaValidator(options?.response, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const parseMessage = (message) => {
      if (typeof message === "string") {
        const start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform7?.length)
        for (let i = 0;i < transform7.length; i++) {
          const temp = transform7[i](message);
          if (temp !== undefined)
            message = temp;
        }
      return message;
    };
    this.route("$INTERNALWS", path, (context) => {
      const { set: set2, path: path2, qi, headers, query, params } = context;
      if (server === null)
        server = this.getServer();
      if (server?.upgrade(context.request, {
        headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade,
        data: {
          validator: validateResponse,
          open(ws) {
            options.open?.(new ElysiaWS(ws, context));
          },
          message: (ws, msg) => {
            const message = parseMessage(msg);
            if (validateMessage?.Check(message) === false)
              return void ws.send(new ValidationError("message", validateMessage, message).message);
            options.message?.(new ElysiaWS(ws, context), message);
          },
          drain(ws) {
            options.drain?.(new ElysiaWS(ws, context));
          },
          close(ws, code, reason) {
            options.close?.(new ElysiaWS(ws, context), code, reason);
          }
        }
      }))
        return;
      set2.status = 400;
      return "Expected a websocket connection";
    }, {
      beforeHandle: options.beforeHandle,
      transform: options.transform,
      headers: options.headers,
      params: options.params,
      query: options.query
    });
    return this;
  }
  state(name, value15) {
    switch (typeof name) {
      case "object":
        this.singleton.store = mergeDeep(this.singleton.store, name);
        return this;
      case "function":
        this.singleton.store = name(this.singleton.store);
        return this;
    }
    if (!(name in this.singleton.store)) {
      this.singleton.store[name] = value15;
    }
    return this;
  }
  decorate(name, value15) {
    switch (typeof name) {
      case "object":
        this.singleton.decorator = mergeDeep(this.singleton.decorator, name);
        return this;
      case "function":
        this.singleton.decorator = name(this.singleton.decorator);
        return this;
    }
    if (!(name in this.singleton.decorator))
      this.singleton.decorator[name] = value15;
    return this;
  }
  derive(optionsOrTransform, transform7) {
    if (!transform7) {
      transform7 = optionsOrTransform;
      optionsOrTransform = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: transform7
    };
    return this.onTransform(optionsOrTransform, hook);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        Object.entries(name).forEach(([key, value15]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value15;
        });
        return this;
      case "function":
        this.definitions.type = name(this.definitions.type);
        return this;
    }
    this.definitions.type[name] = model;
    return this;
  }
  mapDerive(optionsOrDerive, mapper) {
    if (!mapper) {
      mapper = optionsOrDerive;
      optionsOrDerive = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: mapper
    };
    return this.onTransform(optionsOrDerive, hook);
  }
  affix(base, type47, word) {
    if (word === "")
      return this;
    const delimieter = ["_", "-", " "];
    const capitalize2 = (word2) => word2[0].toUpperCase() + word2.slice(1);
    const joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix);
    const remap = (type210) => {
      const store = {};
      switch (type210) {
        case "decorator":
          for (const key in this.singleton.decorator) {
            store[joinKey(word, key)] = this.singleton.decorator[key];
          }
          this.singleton.decorator = store;
          break;
        case "state":
          for (const key in this.singleton.store)
            store[joinKey(word, key)] = this.singleton.store[key];
          this.singleton.store = store;
          break;
        case "model":
          for (const key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (const key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    };
    const types = Array.isArray(type47) ? type47 : [type47];
    for (const type210 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type210);
    return this;
  }
  prefix(type47, word) {
    return this.affix("prefix", type47, word);
  }
  suffix(type47, word) {
    return this.affix("suffix", type47, word);
  }
  compile() {
    this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this);
    if (typeof this.server?.reload === "function")
      this.server.reload({
        ...this.server || {},
        fetch: this.fetch
      });
    return this;
  }
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
};

// node_modules/drizzle-orm/entity.js
var is = function(value15, type47) {
  if (!value15 || typeof value15 !== "object") {
    return false;
  }
  if (value15 instanceof type47) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type47, entityKind)) {
    throw new Error(`Class "${type47.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`);
  }
  let cls = value15.constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type47[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
};
var entityKind = Symbol.for("drizzle:entityKind");
var hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");

// node_modules/drizzle-orm/column.js
class Column {
  constructor(table, config) {
    this.table = table;
    this.config = config;
    this.name = config.name;
    this.notNull = config.notNull;
    this.default = config.default;
    this.defaultFn = config.defaultFn;
    this.onUpdateFn = config.onUpdateFn;
    this.hasDefault = config.hasDefault;
    this.primary = config.primaryKey;
    this.isUnique = config.isUnique;
    this.uniqueName = config.uniqueName;
    this.uniqueType = config.uniqueType;
    this.dataType = config.dataType;
    this.columnType = config.columnType;
  }
  static [entityKind] = "Column";
  name;
  primary;
  notNull;
  default;
  defaultFn;
  onUpdateFn;
  hasDefault;
  isUnique;
  uniqueName;
  uniqueType;
  dataType;
  columnType;
  enumValues = undefined;
  config;
  mapFromDriverValue(value15) {
    return value15;
  }
  mapToDriverValue(value15) {
    return value15;
  }
}

// node_modules/drizzle-orm/column-builder.js
class ColumnBuilder {
  static [entityKind] = "ColumnBuilder";
  config;
  constructor(name, dataType, columnType) {
    this.config = {
      name,
      notNull: false,
      default: undefined,
      hasDefault: false,
      primaryKey: false,
      isUnique: false,
      uniqueName: undefined,
      uniqueType: undefined,
      dataType,
      columnType
    };
  }
  $type() {
    return this;
  }
  notNull() {
    this.config.notNull = true;
    return this;
  }
  default(value15) {
    this.config.default = value15;
    this.config.hasDefault = true;
    return this;
  }
  $defaultFn(fn) {
    this.config.defaultFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $default = this.$defaultFn;
  $onUpdateFn(fn) {
    this.config.onUpdateFn = fn;
    this.config.hasDefault = true;
    return this;
  }
  $onUpdate = this.$onUpdateFn;
  primaryKey() {
    this.config.primaryKey = true;
    this.config.notNull = true;
    return this;
  }
}

// node_modules/drizzle-orm/table.js
var isTable = function(table) {
  return typeof table === "object" && table !== null && IsDrizzleTable in table;
};
var getTableName = function(table) {
  return table[TableName];
};
var TableName = Symbol.for("drizzle:Name");
var Schema = Symbol.for("drizzle:Schema");
var Columns = Symbol.for("drizzle:Columns");
var ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
var OriginalName = Symbol.for("drizzle:OriginalName");
var BaseName = Symbol.for("drizzle:BaseName");
var IsAlias = Symbol.for("drizzle:IsAlias");
var ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
var IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");

class Table {
  static [entityKind] = "Table";
  static Symbol = {
    Name: TableName,
    Schema,
    OriginalName,
    Columns,
    ExtraConfigColumns,
    BaseName,
    IsAlias,
    ExtraConfigBuilder
  };
  [TableName];
  [OriginalName];
  [Schema];
  [Columns];
  [ExtraConfigColumns];
  [BaseName];
  [IsAlias] = false;
  [ExtraConfigBuilder] = undefined;
  [IsDrizzleTable] = true;
  constructor(name, schema3, baseName) {
    this[TableName] = this[OriginalName] = name;
    this[Schema] = schema3;
    this[BaseName] = baseName;
  }
}

// node_modules/drizzle-orm/pg-core/table.js
var InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");

class PgTable extends Table {
  static [entityKind] = "PgTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys
  });
  [InlineForeignKeys] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}

// node_modules/drizzle-orm/tracing-utils.js
var iife = function(fn, ...args) {
  return fn(...args);
};

// node_modules/drizzle-orm/pg-core/unique-constraint.js
var uniqueKeyName = function(table3, columns) {
  return `${table3[PgTable.Symbol.Name]}_${columns.join("_")}_unique`;
};

// node_modules/drizzle-orm/pg-core/columns/common.js
class PgColumn extends Column {
  constructor(table3, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName(table3, [config.name]);
    }
    super(table3, config);
    this.table = table3;
  }
  static [entityKind] = "PgColumn";
}

class ExtraConfigColumn extends PgColumn {
  static [entityKind] = "ExtraConfigColumn";
  getSQLType() {
    return this.getSQLType();
  }
  indexConfig = {
    order: this.config.order ?? "asc",
    nulls: this.config.nulls ?? "last",
    opClass: this.config.opClass
  };
  defaultConfig = {
    order: "asc",
    nulls: "last",
    opClass: undefined
  };
  asc() {
    this.indexConfig.order = "asc";
    return this;
  }
  desc() {
    this.indexConfig.order = "desc";
    return this;
  }
  nullsFirst() {
    this.indexConfig.nulls = "first";
    return this;
  }
  nullsLast() {
    this.indexConfig.nulls = "last";
    return this;
  }
  op(opClass) {
    this.indexConfig.opClass = opClass;
    return this;
  }
}

// node_modules/drizzle-orm/pg-core/columns/enum.js
var isPgEnum = function(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
};
var isPgEnumSym = Symbol.for("drizzle:isPgEnum");
class PgEnumColumn extends PgColumn {
  static [entityKind] = "PgEnumColumn";
  enum = this.config.enum;
  enumValues = this.config.enum.enumValues;
  constructor(table3, config) {
    super(table3, config);
    this.enum = config.enum;
  }
  getSQLType() {
    return this.enum.enumName;
  }
}

// node_modules/drizzle-orm/subquery.js
class Subquery {
  static [entityKind] = "Subquery";
  constructor(sql, selection, alias, isWith = false) {
    this._ = {
      brand: "Subquery",
      sql,
      selectedFields: selection,
      alias,
      isWith
    };
  }
}

class WithSubquery extends Subquery {
  static [entityKind] = "WithSubquery";
}

// node_modules/drizzle-orm/version.js
var version = "0.31.2";

// node_modules/drizzle-orm/tracing.js
var otel;
var rawTracer;
var tracer = {
  startActiveSpan(name, fn) {
    if (!otel) {
      return fn();
    }
    if (!rawTracer) {
      rawTracer = otel.trace.getTracer("drizzle-orm", version);
    }
    return iife((otel2, rawTracer2) => rawTracer2.startActiveSpan(name, (span) => {
      try {
        return fn(span);
      } catch (e2) {
        span.setStatus({
          code: otel2.SpanStatusCode.ERROR,
          message: e2 instanceof Error ? e2.message : "Unknown error"
        });
        throw e2;
      } finally {
        span.end();
      }
    }), otel, rawTracer);
  }
};

// node_modules/drizzle-orm/view-common.js
var ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");

// node_modules/drizzle-orm/sql/sql.js
var isSQLWrapper = function(value15) {
  return value15 !== null && value15 !== undefined && typeof value15.getSQL === "function";
};
var mergeQueries = function(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
};
var isDriverValueEncoder = function(value15) {
  return typeof value15 === "object" && value15 !== null && "mapToDriverValue" in value15 && typeof value15.mapToDriverValue === "function";
};
var sql = function(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
};
var fillPlaceholders = function(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    return p;
  });
};
class StringChunk {
  static [entityKind] = "StringChunk";
  value;
  constructor(value15) {
    this.value = Array.isArray(value15) ? value15 : [value15];
  }
  getSQL() {
    return new SQL([this]);
  }
}

class SQL {
  constructor(queryChunks) {
    this.queryChunks = queryChunks;
  }
  static [entityKind] = "SQL";
  decoder = noopDecoder;
  shouldInlineParams = false;
  append(query) {
    this.queryChunks.push(...query.queryChunks);
    return this;
  }
  toQuery(config) {
    return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
      const query = this.buildQueryFromSourceParams(this.queryChunks, config);
      span?.setAttributes({
        "drizzle.query.text": query.sql,
        "drizzle.query.params": JSON.stringify(query.params)
      });
      return query;
    });
  }
  buildQueryFromSourceParams(chunks, _config) {
    const config = Object.assign({}, _config, {
      inlineParams: _config.inlineParams || this.shouldInlineParams,
      paramStartIndex: _config.paramStartIndex || { value: 0 }
    });
    const {
      escapeName,
      escapeParam,
      prepareTyping,
      inlineParams,
      paramStartIndex
    } = config;
    return mergeQueries(chunks.map((chunk) => {
      if (is(chunk, StringChunk)) {
        return { sql: chunk.value.join(""), params: [] };
      }
      if (is(chunk, Name)) {
        return { sql: escapeName(chunk.value), params: [] };
      }
      if (chunk === undefined) {
        return { sql: "", params: [] };
      }
      if (Array.isArray(chunk)) {
        const result = [new StringChunk("(")];
        for (const [i, p] of chunk.entries()) {
          result.push(p);
          if (i < chunk.length - 1) {
            result.push(new StringChunk(", "));
          }
        }
        result.push(new StringChunk(")"));
        return this.buildQueryFromSourceParams(result, config);
      }
      if (is(chunk, SQL)) {
        return this.buildQueryFromSourceParams(chunk.queryChunks, {
          ...config,
          inlineParams: inlineParams || chunk.shouldInlineParams
        });
      }
      if (is(chunk, Table)) {
        const schemaName = chunk[Table.Symbol.Schema];
        const tableName = chunk[Table.Symbol.Name];
        return {
          sql: schemaName === undefined ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
          params: []
        };
      }
      if (is(chunk, Column)) {
        if (_config.invokeSource === "indexes") {
          return { sql: escapeName(chunk.name), params: [] };
        }
        return { sql: escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(chunk.name), params: [] };
      }
      if (is(chunk, View)) {
        const schemaName = chunk[ViewBaseConfig].schema;
        const viewName = chunk[ViewBaseConfig].name;
        return {
          sql: schemaName === undefined ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
          params: []
        };
      }
      if (is(chunk, Param)) {
        const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
        if (is(mappedValue, SQL)) {
          return this.buildQueryFromSourceParams([mappedValue], config);
        }
        if (inlineParams) {
          return { sql: this.mapInlineParam(mappedValue, config), params: [] };
        }
        let typings;
        if (prepareTyping !== undefined) {
          typings = [prepareTyping(chunk.encoder)];
        }
        return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
      }
      if (is(chunk, Placeholder)) {
        return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
      }
      if (is(chunk, SQL.Aliased) && chunk.fieldAlias !== undefined) {
        return { sql: escapeName(chunk.fieldAlias), params: [] };
      }
      if (is(chunk, Subquery)) {
        if (chunk._.isWith) {
          return { sql: escapeName(chunk._.alias), params: [] };
        }
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk._.sql,
          new StringChunk(") "),
          new Name(chunk._.alias)
        ], config);
      }
      if (isPgEnum(chunk)) {
        if (chunk.schema) {
          return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
        }
        return { sql: escapeName(chunk.enumName), params: [] };
      }
      if (isSQLWrapper(chunk)) {
        return this.buildQueryFromSourceParams([
          new StringChunk("("),
          chunk.getSQL(),
          new StringChunk(")")
        ], config);
      }
      if (inlineParams) {
        return { sql: this.mapInlineParam(chunk, config), params: [] };
      }
      return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk] };
    }));
  }
  mapInlineParam(chunk, { escapeString }) {
    if (chunk === null) {
      return "null";
    }
    if (typeof chunk === "number" || typeof chunk === "boolean") {
      return chunk.toString();
    }
    if (typeof chunk === "string") {
      return escapeString(chunk);
    }
    if (typeof chunk === "object") {
      const mappedValueAsString = chunk.toString();
      if (mappedValueAsString === "[object Object]") {
        return escapeString(JSON.stringify(chunk));
      }
      return escapeString(mappedValueAsString);
    }
    throw new Error("Unexpected param value: " + chunk);
  }
  getSQL() {
    return this;
  }
  as(alias) {
    if (alias === undefined) {
      return this;
    }
    return new SQL.Aliased(this, alias);
  }
  mapWith(decoder) {
    this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
    return this;
  }
  inlineParams() {
    this.shouldInlineParams = true;
    return this;
  }
  if(condition) {
    return condition ? this : undefined;
  }
}

class Name {
  constructor(value15) {
    this.value = value15;
  }
  static [entityKind] = "Name";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
var noopDecoder = {
  mapFromDriverValue: (value15) => value15
};
var noopEncoder = {
  mapToDriverValue: (value15) => value15
};
var noopMapper = {
  ...noopDecoder,
  ...noopEncoder
};

class Param {
  constructor(value15, encoder2 = noopEncoder) {
    this.value = value15;
    this.encoder = encoder2;
  }
  static [entityKind] = "Param";
  brand;
  getSQL() {
    return new SQL([this]);
  }
}
((sql2) => {
  function empty() {
    return new SQL([]);
  }
  sql2.empty = empty;
  function fromList(list) {
    return new SQL(list);
  }
  sql2.fromList = fromList;
  function raw(str) {
    return new SQL([new StringChunk(str)]);
  }
  sql2.raw = raw;
  function join(chunks, separator) {
    const result = [];
    for (const [i, chunk] of chunks.entries()) {
      if (i > 0 && separator !== undefined) {
        result.push(separator);
      }
      result.push(chunk);
    }
    return new SQL(result);
  }
  sql2.join = join;
  function identifier(value15) {
    return new Name(value15);
  }
  sql2.identifier = identifier;
  function placeholder2(name2) {
    return new Placeholder(name2);
  }
  sql2.placeholder = placeholder2;
  function param2(value15, encoder2) {
    return new Param(value15, encoder2);
  }
  sql2.param = param2;
})(sql || (sql = {}));
((SQL2) => {

  class Aliased {
    constructor(sql2, fieldAlias) {
      this.sql = sql2;
      this.fieldAlias = fieldAlias;
    }
    static [entityKind] = "SQL.Aliased";
    isSelectionField = false;
    getSQL() {
      return this.sql;
    }
    clone() {
      return new Aliased(this.sql, this.fieldAlias);
    }
  }
  SQL2.Aliased = Aliased;
})(SQL || (SQL = {}));

class Placeholder {
  constructor(name2) {
    this.name = name2;
  }
  static [entityKind] = "Placeholder";
  getSQL() {
    return new SQL([this]);
  }
}

class View {
  static [entityKind] = "View";
  [ViewBaseConfig];
  constructor({ name: name2, schema: schema3, selectedFields, query }) {
    this[ViewBaseConfig] = {
      name: name2,
      originalName: name2,
      schema: schema3,
      selectedFields,
      query,
      isExisting: !query,
      isAlias: false
    };
  }
  getSQL() {
    return new SQL([this]);
  }
}
Column.prototype.getSQL = function() {
  return new SQL([this]);
};
Table.prototype.getSQL = function() {
  return new SQL([this]);
};
Subquery.prototype.getSQL = function() {
  return new SQL([this]);
};

// node_modules/drizzle-orm/alias.js
var aliasedTable = function(table5, tableAlias) {
  return new Proxy(table5, new TableAliasProxyHandler(tableAlias, false));
};
var aliasedTableColumn = function(column4, tableAlias) {
  return new Proxy(column4, new ColumnAliasProxyHandler(new Proxy(column4.table, new TableAliasProxyHandler(tableAlias, false))));
};
var mapColumnsInAliasedSQLToAlias = function(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
};
var mapColumnsInSQLToAlias = function(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
};

class ColumnAliasProxyHandler {
  constructor(table5) {
    this.table = table5;
  }
  static [entityKind] = "ColumnAliasProxyHandler";
  get(columnObj, prop) {
    if (prop === "table") {
      return this.table;
    }
    return columnObj[prop];
  }
}

class TableAliasProxyHandler {
  constructor(alias, replaceOriginalName) {
    this.alias = alias;
    this.replaceOriginalName = replaceOriginalName;
  }
  static [entityKind] = "TableAliasProxyHandler";
  get(target, prop) {
    if (prop === Table.Symbol.IsAlias) {
      return true;
    }
    if (prop === Table.Symbol.Name) {
      return this.alias;
    }
    if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
      return this.alias;
    }
    if (prop === ViewBaseConfig) {
      return {
        ...target[ViewBaseConfig],
        name: this.alias,
        isAlias: true
      };
    }
    if (prop === Table.Symbol.Columns) {
      const columns = target[Table.Symbol.Columns];
      if (!columns) {
        return columns;
      }
      const proxiedColumns = {};
      Object.keys(columns).map((key) => {
        proxiedColumns[key] = new Proxy(columns[key], new ColumnAliasProxyHandler(new Proxy(target, this)));
      });
      return proxiedColumns;
    }
    const value15 = target[prop];
    if (is(value15, Column)) {
      return new Proxy(value15, new ColumnAliasProxyHandler(new Proxy(target, this)));
    }
    return value15;
  }
}

// node_modules/drizzle-orm/errors.js
class DrizzleError extends Error {
  static [entityKind] = "DrizzleError";
  constructor({ message, cause }) {
    super(message);
    this.name = "DrizzleError";
    this.cause = cause;
  }
}

class TransactionRollbackError extends DrizzleError {
  static [entityKind] = "TransactionRollbackError";
  constructor() {
    super({ message: "Rollback" });
  }
}

// node_modules/drizzle-orm/sql/expressions/conditions.js
var bindIfParam = function(value15, column5) {
  if (isDriverValueEncoder(column5) && !isSQLWrapper(value15) && !is(value15, Param) && !is(value15, Placeholder) && !is(value15, Column) && !is(value15, Table) && !is(value15, View)) {
    return new Param(value15, column5);
  }
  return value15;
};
var and = function(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
};
var or = function(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter((c) => c !== undefined);
  if (conditions.length === 0) {
    return;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
};
var not4 = function(condition) {
  return sql`not ${condition}`;
};
var inArray = function(column5, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("inArray requires at least one value");
    }
    return sql`${column5} in ${values.map((v) => bindIfParam(v, column5))}`;
  }
  return sql`${column5} in ${bindIfParam(values, column5)}`;
};
var notInArray = function(column5, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      throw new Error("notInArray requires at least one value");
    }
    return sql`${column5} not in ${values.map((v) => bindIfParam(v, column5))}`;
  }
  return sql`${column5} not in ${bindIfParam(values, column5)}`;
};
var isNull = function(value15) {
  return sql`${value15} is null`;
};
var isNotNull = function(value15) {
  return sql`${value15} is not null`;
};
var exists = function(subquery2) {
  return sql`exists ${subquery2}`;
};
var notExists = function(subquery2) {
  return sql`not exists ${subquery2}`;
};
var between = function(column5, min, max) {
  return sql`${column5} between ${bindIfParam(min, column5)} and ${bindIfParam(max, column5)}`;
};
var notBetween = function(column5, min, max) {
  return sql`${column5} not between ${bindIfParam(min, column5)} and ${bindIfParam(max, column5)}`;
};
var like = function(column5, value15) {
  return sql`${column5} like ${value15}`;
};
var notLike = function(column5, value15) {
  return sql`${column5} not like ${value15}`;
};
var ilike = function(column5, value15) {
  return sql`${column5} ilike ${value15}`;
};
var notIlike = function(column5, value15) {
  return sql`${column5} not ilike ${value15}`;
};
var eq = (left, right) => {
  return sql`${left} = ${bindIfParam(right, left)}`;
};
var ne = (left, right) => {
  return sql`${left} <> ${bindIfParam(right, left)}`;
};
var gt = (left, right) => {
  return sql`${left} > ${bindIfParam(right, left)}`;
};
var gte = (left, right) => {
  return sql`${left} >= ${bindIfParam(right, left)}`;
};
var lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`;
};
var lte = (left, right) => {
  return sql`${left} <= ${bindIfParam(right, left)}`;
};

// node_modules/drizzle-orm/sql/expressions/select.js
var asc = function(column5) {
  return sql`${column5} asc`;
};
var desc = function(column5) {
  return sql`${column5} desc`;
};

// node_modules/drizzle-orm/logger.js
class ConsoleLogWriter {
  static [entityKind] = "ConsoleLogWriter";
  write(message) {
    console.log(message);
  }
}

class DefaultLogger {
  static [entityKind] = "DefaultLogger";
  writer;
  constructor(config) {
    this.writer = config?.writer ?? new ConsoleLogWriter;
  }
  logQuery(query, params) {
    const stringifiedParams = params.map((p) => {
      try {
        return JSON.stringify(p);
      } catch {
        return String(p);
      }
    });
    const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
    this.writer.write(`Query: ${query}${paramsStr}`);
  }
}

class NoopLogger {
  static [entityKind] = "NoopLogger";
  logQuery() {
  }
}

// node_modules/drizzle-orm/query-promise.js
class QueryPromise {
  static [entityKind] = "QueryPromise";
  [Symbol.toStringTag] = "QueryPromise";
  catch(onRejected) {
    return this.then(undefined, onRejected);
  }
  finally(onFinally) {
    return this.then((value15) => {
      onFinally?.();
      return value15;
    }, (reason) => {
      onFinally?.();
      throw reason;
    });
  }
  then(onFulfilled, onRejected) {
    return this.execute().then(onFulfilled, onRejected);
  }
}

// node_modules/drizzle-orm/pg-core/primary-keys.js
class PrimaryKeyBuilder {
  static [entityKind] = "PgPrimaryKeyBuilder";
  columns;
  name;
  constructor(columns, name) {
    this.columns = columns;
    this.name = name;
  }
  build(table7) {
    return new PrimaryKey(table7, this.columns, this.name);
  }
}

class PrimaryKey {
  constructor(table7, columns, name) {
    this.table = table7;
    this.columns = columns;
    this.name = name;
  }
  static [entityKind] = "PgPrimaryKey";
  columns;
  name;
  getName() {
    return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column5) => column5.name).join("_")}_pk`;
  }
}

// node_modules/drizzle-orm/relations.js
var getOperators = function() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not: not4,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
};
var getOrderByOperators = function() {
  return {
    sql,
    asc,
    desc
  };
};
var extractTablesRelationalConfig = function(schema3, configHelpers) {
  if (Object.keys(schema3).length === 1 && "default" in schema3 && !is(schema3["default"], Table)) {
    schema3 = schema3["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value15] of Object.entries(schema3)) {
    if (isTable(value15)) {
      const dbName = value15[Table.Symbol.Name];
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value15[Table.Symbol.Name],
        schema: value15[Table.Symbol.Schema],
        columns: value15[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column6 of Object.values(value15[Table.Symbol.Columns])) {
        if (column6.primary) {
          tablesConfig[key].primaryKey.push(column6);
        }
      }
      const extraConfig = value15[Table.Symbol.ExtraConfigBuilder]?.(value15[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value15, Relations)) {
      const dbName = value15.table[Table.Symbol.Name];
      const tableName = tableNamesMap[dbName];
      const relations2 = value15.config(configHelpers(value15.table));
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
};
var createOne = function(sourceTable) {
  return function one(table8, config) {
    return new One(sourceTable, table8, config, config?.fields.reduce((res, f) => res && f.notNull, true) ?? false);
  };
};
var createMany = function(sourceTable) {
  return function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  };
};
var normalizeRelation = function(schema3, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[relation.referencedTable[Table.Symbol.Name]];
  if (!referencedTableTsName) {
    throw new Error(`Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`);
  }
  const referencedTableConfig = schema3[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[sourceTable[Table.Symbol.Name]];
  if (!sourceTableTsName) {
    throw new Error(`Table "${sourceTable[Table.Symbol.Name]}" not found in schema`);
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(referencedTableConfig.relations)) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(`There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`) : new Error(`There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`);
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(`There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`);
};
var createTableRelationsHelpers = function(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
};
var mapRelationalRow = function(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value15) => value15) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRows, selectionItem.selection, mapColumnValue) : subRows.map((subRow) => mapRelationalRow(tablesConfig, tablesConfig[selectionItem.relationTableTsKey], subRow, selectionItem.selection, mapColumnValue));
    } else {
      const value15 = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value15 === null ? null : decoder.mapFromDriverValue(value15);
    }
  }
  return result;
};

class Relation {
  constructor(sourceTable, referencedTable, relationName) {
    this.sourceTable = sourceTable;
    this.referencedTable = referencedTable;
    this.relationName = relationName;
    this.referencedTableName = referencedTable[Table.Symbol.Name];
  }
  static [entityKind] = "Relation";
  referencedTableName;
  fieldName;
}

class Relations {
  constructor(table8, config) {
    this.table = table8;
    this.config = config;
  }
  static [entityKind] = "Relations";
}

class One extends Relation {
  constructor(sourceTable, referencedTable, config, isNullable) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
    this.isNullable = isNullable;
  }
  static [entityKind] = "One";
  withFieldName(fieldName) {
    const relation = new One(this.sourceTable, this.referencedTable, this.config, this.isNullable);
    relation.fieldName = fieldName;
    return relation;
  }
}

class Many extends Relation {
  constructor(sourceTable, referencedTable, config) {
    super(sourceTable, referencedTable, config?.relationName);
    this.config = config;
  }
  static [entityKind] = "Many";
  withFieldName(fieldName) {
    const relation = new Many(this.sourceTable, this.referencedTable, this.config);
    relation.fieldName = fieldName;
    return relation;
  }
}

// node_modules/drizzle-orm/utils.js
var mapResultRow = function(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce((result2, { path, field }, columnIndex) => {
    let decoder;
    if (is(field, Column)) {
      decoder = field;
    } else if (is(field, SQL)) {
      decoder = field.decoder;
    } else {
      decoder = field.sql.decoder;
    }
    let node = result2;
    for (const [pathChunkIndex, pathChunk] of path.entries()) {
      if (pathChunkIndex < path.length - 1) {
        if (!(pathChunk in node)) {
          node[pathChunk] = {};
        }
        node = node[pathChunk];
      } else {
        const rawValue = row[columnIndex];
        const value15 = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
        if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
          const objectName = path[0];
          if (!(objectName in nullifyMap)) {
            nullifyMap[objectName] = value15 === null ? getTableName(field.table) : false;
          } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
            nullifyMap[objectName] = false;
          }
        }
      }
    }
    return result2;
  }, {});
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
};
var orderSelectedFields = function(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
};
var haveSameKeys = function(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
};
var mapUpdateSet = function(table9, values) {
  const entries = Object.entries(values).filter(([, value15]) => value15 !== undefined).map(([key, value15]) => {
    if (is(value15, SQL)) {
      return [key, value15];
    } else {
      return [key, new Param(value15, table9[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
};
var applyMixins = function(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor")
        continue;
      Object.defineProperty(baseClass.prototype, name, Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || Object.create(null));
    }
  }
};
var getTableColumns = function(table9) {
  return table9[Table.Symbol.Columns];
};
var getTableLikeName = function(table9) {
  return is(table9, Subquery) ? table9._.alias : is(table9, View) ? table9[ViewBaseConfig].name : is(table9, SQL) ? undefined : table9[Table.Symbol.IsAlias] ? table9[Table.Symbol.Name] : table9[Table.Symbol.BaseName];
};

// node_modules/drizzle-orm/mysql-core/table.js
var InlineForeignKeys2 = Symbol.for("drizzle:MySqlInlineForeignKeys");

class MySqlTable extends Table {
  static [entityKind] = "MySqlTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys: InlineForeignKeys2
  });
  [Table.Symbol.Columns];
  [InlineForeignKeys2] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}

// node_modules/drizzle-orm/mysql-core/unique-constraint.js
var uniqueKeyName2 = function(table11, columns) {
  return `${table11[MySqlTable.Symbol.Name]}_${columns.join("_")}_unique`;
};

// node_modules/drizzle-orm/mysql-core/columns/common.js
class MySqlColumn extends Column {
  constructor(table11, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName2(table11, [config.name]);
    }
    super(table11, config);
    this.table = table11;
  }
  static [entityKind] = "MySqlColumn";
}
class MySqlColumnWithAutoIncrement extends MySqlColumn {
  static [entityKind] = "MySqlColumnWithAutoIncrement";
  autoIncrement = this.config.autoIncrement;
}

// node_modules/drizzle-orm/mysql-core/columns/char.js
class MySqlChar extends MySqlColumn {
  static [entityKind] = "MySqlChar";
  length = this.config.length;
  enumValues = this.config.enum;
  getSQLType() {
    return this.length === undefined ? `char` : `char(${this.length})`;
  }
}

// node_modules/drizzle-orm/mysql-core/columns/varbinary.js
class MySqlVarBinary extends MySqlColumn {
  static [entityKind] = "MySqlVarBinary";
  length = this.config.length;
  getSQLType() {
    return this.length === undefined ? `varbinary` : `varbinary(${this.length})`;
  }
}

// node_modules/drizzle-orm/mysql-core/columns/varchar.js
class MySqlVarChar extends MySqlColumn {
  static [entityKind] = "MySqlVarChar";
  length = this.config.length;
  enumValues = this.config.enum;
  getSQLType() {
    return this.length === undefined ? `varchar` : `varchar(${this.length})`;
  }
}

// node_modules/drizzle-orm/selection-proxy.js
class SelectionProxyHandler {
  static [entityKind] = "SelectionProxyHandler";
  config;
  constructor(config) {
    this.config = { ...config };
  }
  get(subquery4, prop) {
    if (prop === "_") {
      return {
        ...subquery4["_"],
        selectedFields: new Proxy(subquery4._.selectedFields, this)
      };
    }
    if (prop === ViewBaseConfig) {
      return {
        ...subquery4[ViewBaseConfig],
        selectedFields: new Proxy(subquery4[ViewBaseConfig].selectedFields, this)
      };
    }
    if (typeof prop === "symbol") {
      return subquery4[prop];
    }
    const columns = is(subquery4, Subquery) ? subquery4._.selectedFields : is(subquery4, View) ? subquery4[ViewBaseConfig].selectedFields : subquery4;
    const value15 = columns[prop];
    if (is(value15, SQL.Aliased)) {
      if (this.config.sqlAliasedBehavior === "sql" && !value15.isSelectionField) {
        return value15.sql;
      }
      const newValue = value15.clone();
      newValue.isSelectionField = true;
      return newValue;
    }
    if (is(value15, SQL)) {
      if (this.config.sqlBehavior === "sql") {
        return value15;
      }
      throw new Error(`You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`);
    }
    if (is(value15, Column)) {
      if (this.config.alias) {
        return new Proxy(value15, new ColumnAliasProxyHandler(new Proxy(value15.table, new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false))));
      }
      return value15;
    }
    if (typeof value15 !== "object" || value15 === null) {
      return value15;
    }
    return new Proxy(value15, new SelectionProxyHandler(this.config));
  }
}

// node_modules/drizzle-orm/query-builders/query-builder.js
class TypedQueryBuilder {
  static [entityKind] = "TypedQueryBuilder";
  getSelectedFields() {
    return this._.selectedFields;
  }
}

// node_modules/drizzle-orm/pg-core/columns/char.js
class PgChar extends PgColumn {
  static [entityKind] = "PgChar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === undefined ? `char` : `char(${this.length})`;
  }
}

// node_modules/drizzle-orm/pg-core/columns/uuid.js
class PgUUID extends PgColumn {
  static [entityKind] = "PgUUID";
  getSQLType() {
    return "uuid";
  }
}

// node_modules/drizzle-orm/pg-core/columns/varchar.js
class PgVarchar extends PgColumn {
  static [entityKind] = "PgVarchar";
  length = this.config.length;
  enumValues = this.config.enumValues;
  getSQLType() {
    return this.length === undefined ? `varchar` : `varchar(${this.length})`;
  }
}

// node_modules/drizzle-orm/sqlite-core/table.js
var sqliteTableBase = function(name, columns, extraConfig, schema3, baseName = name) {
  const rawTable = new SQLiteTable(name, schema3, baseName);
  const builtColumns = Object.fromEntries(Object.entries(columns).map(([name2, colBuilderBase]) => {
    const colBuilder = colBuilderBase;
    const column9 = colBuilder.build(rawTable);
    rawTable[InlineForeignKeys3].push(...colBuilder.buildForeignKeys(column9, rawTable));
    return [name2, column9];
  }));
  const table12 = Object.assign(rawTable, builtColumns);
  table12[Table.Symbol.Columns] = builtColumns;
  table12[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table12[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table12;
};
var InlineForeignKeys3 = Symbol.for("drizzle:SQLiteInlineForeignKeys");

class SQLiteTable extends Table {
  static [entityKind] = "SQLiteTable";
  static Symbol = Object.assign({}, Table.Symbol, {
    InlineForeignKeys: InlineForeignKeys3
  });
  [Table.Symbol.Columns];
  [InlineForeignKeys3] = [];
  [Table.Symbol.ExtraConfigBuilder] = undefined;
}
var sqliteTable = (name, columns, extraConfig) => {
  return sqliteTableBase(name, columns, extraConfig);
};

// node_modules/drizzle-orm/sqlite-core/foreign-keys.js
class ForeignKeyBuilder {
  static [entityKind] = "SQLiteForeignKeyBuilder";
  reference;
  _onUpdate;
  _onDelete;
  constructor(config, actions) {
    this.reference = () => {
      const { name, columns, foreignColumns } = config();
      return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
    };
    if (actions) {
      this._onUpdate = actions.onUpdate;
      this._onDelete = actions.onDelete;
    }
  }
  onUpdate(action) {
    this._onUpdate = action;
    return this;
  }
  onDelete(action) {
    this._onDelete = action;
    return this;
  }
  build(table13) {
    return new ForeignKey(table13, this);
  }
}

class ForeignKey {
  constructor(table13, builder) {
    this.table = table13;
    this.reference = builder.reference;
    this.onUpdate = builder._onUpdate;
    this.onDelete = builder._onDelete;
  }
  static [entityKind] = "SQLiteForeignKey";
  reference;
  onUpdate;
  onDelete;
  getName() {
    const { name, columns, foreignColumns } = this.reference();
    const columnNames = columns.map((column9) => column9.name);
    const foreignColumnNames = foreignColumns.map((column9) => column9.name);
    const chunks = [
      this.table[SQLiteTable.Symbol.Name],
      ...columnNames,
      foreignColumns[0].table[SQLiteTable.Symbol.Name],
      ...foreignColumnNames
    ];
    return name ?? `${chunks.join("_")}_fk`;
  }
}

// node_modules/drizzle-orm/sqlite-core/unique-constraint.js
var uniqueKeyName3 = function(table14, columns) {
  return `${table14[SQLiteTable.Symbol.Name]}_${columns.join("_")}_unique`;
};

// node_modules/drizzle-orm/sqlite-core/columns/common.js
class SQLiteColumnBuilder extends ColumnBuilder {
  static [entityKind] = "SQLiteColumnBuilder";
  foreignKeyConfigs = [];
  references(ref4, actions = {}) {
    this.foreignKeyConfigs.push({ ref: ref4, actions });
    return this;
  }
  unique(name) {
    this.config.isUnique = true;
    this.config.uniqueName = name;
    return this;
  }
  buildForeignKeys(column10, table14) {
    return this.foreignKeyConfigs.map(({ ref: ref4, actions }) => {
      return ((ref22, actions2) => {
        const builder = new ForeignKeyBuilder(() => {
          const foreignColumn = ref22();
          return { columns: [column10], foreignColumns: [foreignColumn] };
        });
        if (actions2.onUpdate) {
          builder.onUpdate(actions2.onUpdate);
        }
        if (actions2.onDelete) {
          builder.onDelete(actions2.onDelete);
        }
        return builder.build(table14);
      })(ref4, actions);
    });
  }
}

class SQLiteColumn extends Column {
  constructor(table14, config) {
    if (!config.uniqueName) {
      config.uniqueName = uniqueKeyName3(table14, [config.name]);
    }
    super(table14, config);
    this.table = table14;
  }
  static [entityKind] = "SQLiteColumn";
}

// node_modules/drizzle-orm/sqlite-core/columns/integer.js
var integer4 = function(name, config) {
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
};

class SQLiteBaseIntegerBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteBaseIntegerBuilder";
  constructor(name, dataType, columnType) {
    super(name, dataType, columnType);
    this.config.autoIncrement = false;
  }
  primaryKey(config) {
    if (config?.autoIncrement) {
      this.config.autoIncrement = true;
    }
    this.config.hasDefault = true;
    return super.primaryKey();
  }
}

class SQLiteBaseInteger extends SQLiteColumn {
  static [entityKind] = "SQLiteBaseInteger";
  autoIncrement = this.config.autoIncrement;
  getSQLType() {
    return "integer";
  }
}

class SQLiteIntegerBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteIntegerBuilder";
  constructor(name) {
    super(name, "number", "SQLiteInteger");
  }
  build(table14) {
    return new SQLiteInteger(table14, this.config);
  }
}

class SQLiteInteger extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteInteger";
}

class SQLiteTimestampBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteTimestampBuilder";
  constructor(name, mode) {
    super(name, "date", "SQLiteTimestamp");
    this.config.mode = mode;
  }
  defaultNow() {
    return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
  }
  build(table14) {
    return new SQLiteTimestamp(table14, this.config);
  }
}

class SQLiteTimestamp extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteTimestamp";
  mode = this.config.mode;
  mapFromDriverValue(value15) {
    if (this.config.mode === "timestamp") {
      return new Date(value15 * 1000);
    }
    return new Date(value15);
  }
  mapToDriverValue(value15) {
    const unix = value15.getTime();
    if (this.config.mode === "timestamp") {
      return Math.floor(unix / 1000);
    }
    return unix;
  }
}

class SQLiteBooleanBuilder extends SQLiteBaseIntegerBuilder {
  static [entityKind] = "SQLiteBooleanBuilder";
  constructor(name, mode) {
    super(name, "boolean", "SQLiteBoolean");
    this.config.mode = mode;
  }
  build(table14) {
    return new SQLiteBoolean(table14, this.config);
  }
}

class SQLiteBoolean extends SQLiteBaseInteger {
  static [entityKind] = "SQLiteBoolean";
  mode = this.config.mode;
  mapFromDriverValue(value15) {
    return Number(value15) === 1;
  }
  mapToDriverValue(value15) {
    return value15 ? 1 : 0;
  }
}

// node_modules/drizzle-orm/sqlite-core/columns/text.js
var text = function(name, config = {}) {
  return config.mode === "json" ? new SQLiteTextJsonBuilder(name) : new SQLiteTextBuilder(name, config);
};

class SQLiteTextBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextBuilder";
  constructor(name, config) {
    super(name, "string", "SQLiteText");
    this.config.enumValues = config.enum;
    this.config.length = config.length;
  }
  build(table14) {
    return new SQLiteText(table14, this.config);
  }
}

class SQLiteText extends SQLiteColumn {
  static [entityKind] = "SQLiteText";
  enumValues = this.config.enumValues;
  length = this.config.length;
  constructor(table14, config) {
    super(table14, config);
  }
  getSQLType() {
    return `text${this.config.length ? `(${this.config.length})` : ""}`;
  }
}

class SQLiteTextJsonBuilder extends SQLiteColumnBuilder {
  static [entityKind] = "SQLiteTextJsonBuilder";
  constructor(name) {
    super(name, "json", "SQLiteTextJson");
  }
  build(table14) {
    return new SQLiteTextJson(table14, this.config);
  }
}

class SQLiteTextJson extends SQLiteColumn {
  static [entityKind] = "SQLiteTextJson";
  getSQLType() {
    return "text";
  }
  mapFromDriverValue(value15) {
    return JSON.parse(value15);
  }
  mapToDriverValue(value15) {
    return JSON.stringify(value15);
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/delete.js
class SQLiteDeleteBase extends QueryPromise {
  constructor(table15, session, dialect, withList) {
    super();
    this.table = table15;
    this.session = session;
    this.dialect = dialect;
    this.config = { table: table15, withList };
  }
  static [entityKind] = "SQLiteDelete";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildDeleteQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest4 } = this.dialect.sqlToQuery(this.getSQL());
    return rest4;
  }
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true);
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute(placeholderValues) {
    return this._prepare().execute(placeholderValues);
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/insert.js
class SQLiteInsertBuilder {
  constructor(table17, session, dialect, withList) {
    this.table = table17;
    this.session = session;
    this.dialect = dialect;
    this.withList = withList;
  }
  static [entityKind] = "SQLiteInsertBuilder";
  values(values) {
    values = Array.isArray(values) ? values : [values];
    if (values.length === 0) {
      throw new Error("values() must be called with at least one value");
    }
    const mappedValues = values.map((entry) => {
      const result = {};
      const cols = this.table[Table.Symbol.Columns];
      for (const colKey of Object.keys(entry)) {
        const colValue = entry[colKey];
        result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
      }
      return result;
    });
    return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
  }
}

class SQLiteInsertBase extends QueryPromise {
  constructor(table17, values, session, dialect, withList) {
    super();
    this.session = session;
    this.dialect = dialect;
    this.config = { table: table17, values, withList };
  }
  static [entityKind] = "SQLiteInsert";
  config;
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  onConflictDoNothing(config = {}) {
    if (config.target === undefined) {
      this.config.onConflict = sql`do nothing`;
    } else {
      const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
      const whereSql = config.where ? sql` where ${config.where}` : sql``;
      this.config.onConflict = sql`${targetSql} do nothing${whereSql}`;
    }
    return this;
  }
  onConflictDoUpdate(config) {
    if (config.where && (config.targetWhere || config.setWhere)) {
      throw new Error('You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.');
    }
    const whereSql = config.where ? sql` where ${config.where}` : undefined;
    const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : undefined;
    const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : undefined;
    const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
    const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
    this.config.onConflict = sql`${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`;
    return this;
  }
  getSQL() {
    return this.dialect.buildInsertQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest4 } = this.dialect.sqlToQuery(this.getSQL());
    return rest4;
  }
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true);
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/view-base.js
class SQLiteViewBase extends View {
  static [entityKind] = "SQLiteViewBase";
}

// node_modules/drizzle-orm/sqlite-core/dialect.js
class SQLiteDialect {
  static [entityKind] = "SQLiteDialect";
  escapeName(name) {
    return `"${name}"`;
  }
  escapeParam(_num) {
    return "?";
  }
  escapeString(str) {
    return `'${str.replace(/'/g, "''")}'`;
  }
  buildWithCTE(queries) {
    if (!queries?.length)
      return;
    const withSqlChunks = [sql`with `];
    for (const [i, w] of queries.entries()) {
      withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
      if (i < queries.length - 1) {
        withSqlChunks.push(sql`, `);
      }
    }
    withSqlChunks.push(sql` `);
    return sql.join(withSqlChunks);
  }
  buildDeleteQuery({ table: table19, where, returning, withList }) {
    const withSql = this.buildWithCTE(withList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql` where ${where}` : undefined;
    return sql`${withSql}delete from ${table19}${whereSql}${returningSql}`;
  }
  buildUpdateSet(table19, set2) {
    const tableColumns = table19[Table.Symbol.Columns];
    const columnNames = Object.keys(tableColumns).filter((colName) => set2[colName] !== undefined || tableColumns[colName]?.onUpdateFn !== undefined);
    const setSize = columnNames.length;
    return sql.join(columnNames.flatMap((colName, i) => {
      const col = tableColumns[colName];
      const value15 = set2[colName] ?? sql.param(col.onUpdateFn(), col);
      const res = sql`${sql.identifier(col.name)} = ${value15}`;
      if (i < setSize - 1) {
        return [res, sql.raw(", ")];
      }
      return [res];
    }));
  }
  buildUpdateQuery({ table: table19, set: set2, where, returning, withList }) {
    const withSql = this.buildWithCTE(withList);
    const setSql = this.buildUpdateSet(table19, set2);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const whereSql = where ? sql` where ${where}` : undefined;
    return sql`${withSql}update ${table19} set ${setSql}${whereSql}${returningSql}`;
  }
  buildSelection(fields, { isSingleTable = false } = {}) {
    const columnsLen = fields.length;
    const chunks = fields.flatMap(({ field }, i) => {
      const chunk = [];
      if (is(field, SQL.Aliased) && field.isSelectionField) {
        chunk.push(sql.identifier(field.fieldAlias));
      } else if (is(field, SQL.Aliased) || is(field, SQL)) {
        const query = is(field, SQL.Aliased) ? field.sql : field;
        if (isSingleTable) {
          chunk.push(new SQL(query.queryChunks.map((c) => {
            if (is(c, Column)) {
              return sql.identifier(c.name);
            }
            return c;
          })));
        } else {
          chunk.push(query);
        }
        if (is(field, SQL.Aliased)) {
          chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
        }
      } else if (is(field, Column)) {
        const tableName = field.table[Table.Symbol.Name];
        const columnName = field.name;
        if (isSingleTable) {
          chunk.push(sql.identifier(columnName));
        } else {
          chunk.push(sql`${sql.identifier(tableName)}.${sql.identifier(columnName)}`);
        }
      }
      if (i < columnsLen - 1) {
        chunk.push(sql`, `);
      }
      return chunk;
    });
    return sql.join(chunks);
  }
  buildSelectQuery({
    withList,
    fields,
    fieldsFlat,
    where,
    having,
    table: table19,
    joins,
    orderBy,
    groupBy,
    limit,
    offset,
    distinct,
    setOperators
  }) {
    const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
    for (const f of fieldsList) {
      if (is(f.field, Column) && getTableName(f.field.table) !== (is(table19, Subquery) ? table19._.alias : is(table19, SQLiteViewBase) ? table19[ViewBaseConfig].name : is(table19, SQL) ? undefined : getTableName(table19)) && !((table22) => joins?.some(({ alias: alias3 }) => alias3 === (table22[Table.Symbol.IsAlias] ? getTableName(table22) : table22[Table.Symbol.BaseName])))(f.field.table)) {
        const tableName = getTableName(f.field.table);
        throw new Error(`Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`);
      }
    }
    const isSingleTable = !joins || joins.length === 0;
    const withSql = this.buildWithCTE(withList);
    const distinctSql = distinct ? sql` distinct` : undefined;
    const selection = this.buildSelection(fieldsList, { isSingleTable });
    const tableSql = (() => {
      if (is(table19, Table) && table19[Table.Symbol.OriginalName] !== table19[Table.Symbol.Name]) {
        return sql`${sql.identifier(table19[Table.Symbol.OriginalName])} ${sql.identifier(table19[Table.Symbol.Name])}`;
      }
      return table19;
    })();
    const joinsArray = [];
    if (joins) {
      for (const [index, joinMeta] of joins.entries()) {
        if (index === 0) {
          joinsArray.push(sql` `);
        }
        const table22 = joinMeta.table;
        if (is(table22, SQLiteTable)) {
          const tableName = table22[SQLiteTable.Symbol.Name];
          const tableSchema = table22[SQLiteTable.Symbol.Schema];
          const origTableName = table22[SQLiteTable.Symbol.OriginalName];
          const alias3 = tableName === origTableName ? undefined : joinMeta.alias;
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : undefined}${sql.identifier(origTableName)}${alias3 && sql` ${sql.identifier(alias3)}`} on ${joinMeta.on}`);
        } else {
          joinsArray.push(sql`${sql.raw(joinMeta.joinType)} join ${table22} on ${joinMeta.on}`);
        }
        if (index < joins.length - 1) {
          joinsArray.push(sql` `);
        }
      }
    }
    const joinsSql = sql.join(joinsArray);
    const whereSql = where ? sql` where ${where}` : undefined;
    const havingSql = having ? sql` having ${having}` : undefined;
    const orderByList = [];
    if (orderBy) {
      for (const [index, orderByValue] of orderBy.entries()) {
        orderByList.push(orderByValue);
        if (index < orderBy.length - 1) {
          orderByList.push(sql`, `);
        }
      }
    }
    const groupByList = [];
    if (groupBy) {
      for (const [index, groupByValue] of groupBy.entries()) {
        groupByList.push(groupByValue);
        if (index < groupBy.length - 1) {
          groupByList.push(sql`, `);
        }
      }
    }
    const groupBySql = groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : undefined;
    const orderBySql = orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : undefined;
    const limitSql = limit ? sql` limit ${limit}` : undefined;
    const offsetSql = offset ? sql` offset ${offset}` : undefined;
    const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
    if (setOperators.length > 0) {
      return this.buildSetOperations(finalQuery, setOperators);
    }
    return finalQuery;
  }
  buildSetOperations(leftSelect, setOperators) {
    const [setOperator, ...rest4] = setOperators;
    if (!setOperator) {
      throw new Error("Cannot pass undefined values to any set operator");
    }
    if (rest4.length === 0) {
      return this.buildSetOperationQuery({ leftSelect, setOperator });
    }
    return this.buildSetOperations(this.buildSetOperationQuery({ leftSelect, setOperator }), rest4);
  }
  buildSetOperationQuery({
    leftSelect,
    setOperator: { type: type47, isAll, rightSelect, limit, orderBy, offset }
  }) {
    const leftChunk = sql`${leftSelect.getSQL()} `;
    const rightChunk = sql`${rightSelect.getSQL()}`;
    let orderBySql;
    if (orderBy && orderBy.length > 0) {
      const orderByValues = [];
      for (const singleOrderBy of orderBy) {
        if (is(singleOrderBy, SQLiteColumn)) {
          orderByValues.push(sql.identifier(singleOrderBy.name));
        } else if (is(singleOrderBy, SQL)) {
          for (let i = 0;i < singleOrderBy.queryChunks.length; i++) {
            const chunk = singleOrderBy.queryChunks[i];
            if (is(chunk, SQLiteColumn)) {
              singleOrderBy.queryChunks[i] = sql.identifier(chunk.name);
            }
          }
          orderByValues.push(sql`${singleOrderBy}`);
        } else {
          orderByValues.push(sql`${singleOrderBy}`);
        }
      }
      orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
    }
    const limitSql = limit ? sql` limit ${limit}` : undefined;
    const operatorChunk = sql.raw(`${type47} ${isAll ? "all " : ""}`);
    const offsetSql = offset ? sql` offset ${offset}` : undefined;
    return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
  }
  buildInsertQuery({ table: table19, values, onConflict, returning, withList }) {
    const valuesSqlList = [];
    const columns2 = table19[Table.Symbol.Columns];
    const colEntries = Object.entries(columns2);
    const insertOrder = colEntries.map(([, column11]) => sql.identifier(column11.name));
    for (const [valueIndex, value15] of values.entries()) {
      const valueList = [];
      for (const [fieldName, col] of colEntries) {
        const colValue = value15[fieldName];
        if (colValue === undefined || is(colValue, Param) && colValue.value === undefined) {
          let defaultValue;
          if (col.default !== null && col.default !== undefined) {
            defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
          } else if (col.defaultFn !== undefined) {
            const defaultFnResult = col.defaultFn();
            defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
          } else if (!col.default && col.onUpdateFn !== undefined) {
            const onUpdateFnResult = col.onUpdateFn();
            defaultValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
          } else {
            defaultValue = sql`null`;
          }
          valueList.push(defaultValue);
        } else {
          valueList.push(colValue);
        }
      }
      valuesSqlList.push(valueList);
      if (valueIndex < values.length - 1) {
        valuesSqlList.push(sql`, `);
      }
    }
    const withSql = this.buildWithCTE(withList);
    const valuesSql = sql.join(valuesSqlList);
    const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : undefined;
    const onConflictSql = onConflict ? sql` on conflict ${onConflict}` : undefined;
    return sql`${withSql}insert into ${table19} ${insertOrder} values ${valuesSql}${onConflictSql}${returningSql}`;
  }
  sqlToQuery(sql22, invokeSource) {
    return sql22.toQuery({
      escapeName: this.escapeName,
      escapeParam: this.escapeParam,
      escapeString: this.escapeString,
      invokeSource
    });
  }
  buildRelationalQuery({
    fullSchema,
    schema: schema3,
    tableNamesMap,
    table: table19,
    tableConfig,
    queryConfig: config,
    tableAlias,
    nestedQueryRelation,
    joinOn
  }) {
    let selection = [];
    let limit, offset, orderBy = [], where;
    const joins = [];
    if (config === true) {
      const selectionEntries = Object.entries(tableConfig.columns);
      selection = selectionEntries.map(([key, value15]) => ({
        dbKey: value15.name,
        tsKey: key,
        field: aliasedTableColumn(value15, tableAlias),
        relationTableTsKey: undefined,
        isJson: false,
        selection: []
      }));
    } else {
      const aliasedColumns = Object.fromEntries(Object.entries(tableConfig.columns).map(([key, value15]) => [key, aliasedTableColumn(value15, tableAlias)]));
      if (config.where) {
        const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
        where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
      }
      const fieldsSelection = [];
      let selectedColumns = [];
      if (config.columns) {
        let isIncludeMode = false;
        for (const [field, value15] of Object.entries(config.columns)) {
          if (value15 === undefined) {
            continue;
          }
          if (field in tableConfig.columns) {
            if (!isIncludeMode && value15 === true) {
              isIncludeMode = true;
            }
            selectedColumns.push(field);
          }
        }
        if (selectedColumns.length > 0) {
          selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
        }
      } else {
        selectedColumns = Object.keys(tableConfig.columns);
      }
      for (const field of selectedColumns) {
        const column11 = tableConfig.columns[field];
        fieldsSelection.push({ tsKey: field, value: column11 });
      }
      let selectedRelations = [];
      if (config.with) {
        selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
      }
      let extras;
      if (config.extras) {
        extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
        for (const [tsKey, value15] of Object.entries(extras)) {
          fieldsSelection.push({
            tsKey,
            value: mapColumnsInAliasedSQLToAlias(value15, tableAlias)
          });
        }
      }
      for (const { tsKey, value: value15 } of fieldsSelection) {
        selection.push({
          dbKey: is(value15, SQL.Aliased) ? value15.fieldAlias : tableConfig.columns[tsKey].name,
          tsKey,
          field: is(value15, Column) ? aliasedTableColumn(value15, tableAlias) : value15,
          relationTableTsKey: undefined,
          isJson: false,
          selection: []
        });
      }
      let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
      if (!Array.isArray(orderByOrig)) {
        orderByOrig = [orderByOrig];
      }
      orderBy = orderByOrig.map((orderByValue) => {
        if (is(orderByValue, Column)) {
          return aliasedTableColumn(orderByValue, tableAlias);
        }
        return mapColumnsInSQLToAlias(orderByValue, tableAlias);
      });
      limit = config.limit;
      offset = config.offset;
      for (const {
        tsKey: selectedRelationTsKey,
        queryConfig: selectedRelationConfigValue,
        relation
      } of selectedRelations) {
        const normalizedRelation = normalizeRelation(schema3, tableNamesMap, relation);
        const relationTableName = relation.referencedTable[Table.Symbol.Name];
        const relationTableTsName = tableNamesMap[relationTableName];
        const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
        const joinOn2 = and(...normalizedRelation.fields.map((field2, i) => eq(aliasedTableColumn(normalizedRelation.references[i], relationTableAlias), aliasedTableColumn(field2, tableAlias))));
        const builtRelation = this.buildRelationalQuery({
          fullSchema,
          schema: schema3,
          tableNamesMap,
          table: fullSchema[relationTableTsName],
          tableConfig: schema3[relationTableTsName],
          queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
          tableAlias: relationTableAlias,
          joinOn: joinOn2,
          nestedQueryRelation: relation
        });
        const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
        selection.push({
          dbKey: selectedRelationTsKey,
          tsKey: selectedRelationTsKey,
          field,
          relationTableTsKey: relationTableTsName,
          isJson: true,
          selection: builtRelation.selection
        });
      }
    }
    if (selection.length === 0) {
      throw new DrizzleError({
        message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
      });
    }
    let result;
    where = and(joinOn, where);
    if (nestedQueryRelation) {
      let field = sql`json_array(${sql.join(selection.map(({ field: field2 }) => is(field2, SQLiteColumn) ? sql.identifier(field2.name) : is(field2, SQL.Aliased) ? field2.sql : field2), sql`, `)})`;
      if (is(nestedQueryRelation, Many)) {
        field = sql`coalesce(json_group_array(${field}), json_array())`;
      }
      const nestedSelection = [{
        dbKey: "data",
        tsKey: "data",
        field: field.as("data"),
        isJson: true,
        relationTableTsKey: tableConfig.tsName,
        selection
      }];
      const needsSubquery = limit !== undefined || offset !== undefined || orderBy.length > 0;
      if (needsSubquery) {
        result = this.buildSelectQuery({
          table: aliasedTable(table19, tableAlias),
          fields: {},
          fieldsFlat: [
            {
              path: [],
              field: sql.raw("*")
            }
          ],
          where,
          limit,
          offset,
          orderBy,
          setOperators: []
        });
        where = undefined;
        limit = undefined;
        offset = undefined;
        orderBy = undefined;
      } else {
        result = aliasedTable(table19, tableAlias);
      }
      result = this.buildSelectQuery({
        table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
        fields: {},
        fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
          path: [],
          field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    } else {
      result = this.buildSelectQuery({
        table: aliasedTable(table19, tableAlias),
        fields: {},
        fieldsFlat: selection.map(({ field }) => ({
          path: [],
          field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
        })),
        joins,
        where,
        limit,
        offset,
        orderBy,
        setOperators: []
      });
    }
    return {
      tableTsKey: tableConfig.tsName,
      sql: result,
      selection
    };
  }
}

class SQLiteSyncDialect extends SQLiteDialect {
  static [entityKind] = "SQLiteSyncDialect";
  migrate(migrations, session, config) {
    const migrationsTable = config === undefined ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
    const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
    session.run(migrationTableCreate);
    const dbMigrations = session.values(sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`);
    const lastDbMigration = dbMigrations[0] ?? undefined;
    session.run(sql`BEGIN`);
    try {
      for (const migration of migrations) {
        if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
          for (const stmt of migration.sql) {
            session.run(sql.raw(stmt));
          }
          session.run(sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`);
        }
      }
      session.run(sql`COMMIT`);
    } catch (e2) {
      session.run(sql`ROLLBACK`);
      throw e2;
    }
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/select.js
var createSetOperator = function(type47, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type: type47,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
};

class SQLiteSelectBuilder {
  static [entityKind] = "SQLiteSelectBuilder";
  fields;
  session;
  dialect;
  withList;
  distinct;
  constructor(config) {
    this.fields = config.fields;
    this.session = config.session;
    this.dialect = config.dialect;
    this.withList = config.withList;
    this.distinct = config.distinct;
  }
  from(source) {
    const isPartialSelect = !!this.fields;
    let fields;
    if (this.fields) {
      fields = this.fields;
    } else if (is(source, Subquery)) {
      fields = Object.fromEntries(Object.keys(source._.selectedFields).map((key) => [key, source[key]]));
    } else if (is(source, SQLiteViewBase)) {
      fields = source[ViewBaseConfig].selectedFields;
    } else if (is(source, SQL)) {
      fields = {};
    } else {
      fields = getTableColumns(source);
    }
    return new SQLiteSelectBase({
      table: source,
      fields,
      isPartialSelect,
      session: this.session,
      dialect: this.dialect,
      withList: this.withList,
      distinct: this.distinct
    });
  }
}

class SQLiteSelectQueryBuilderBase extends TypedQueryBuilder {
  static [entityKind] = "SQLiteSelectQueryBuilder";
  _;
  config;
  joinsNotNullableMap;
  tableName;
  isPartialSelect;
  session;
  dialect;
  constructor({ table: table20, fields, isPartialSelect, session, dialect, withList, distinct }) {
    super();
    this.config = {
      withList,
      table: table20,
      fields: { ...fields },
      distinct,
      setOperators: []
    };
    this.isPartialSelect = isPartialSelect;
    this.session = session;
    this.dialect = dialect;
    this._ = {
      selectedFields: fields
    };
    this.tableName = getTableLikeName(table20);
    this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
  }
  createJoin(joinType) {
    return (table20, on) => {
      const baseTableName = this.tableName;
      const tableName = getTableLikeName(table20);
      if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
        throw new Error(`Alias "${tableName}" is already used in this query`);
      }
      if (!this.isPartialSelect) {
        if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
          this.config.fields = {
            [baseTableName]: this.config.fields
          };
        }
        if (typeof tableName === "string" && !is(table20, SQL)) {
          const selection = is(table20, Subquery) ? table20._.selectedFields : is(table20, View) ? table20[ViewBaseConfig].selectedFields : table20[Table.Symbol.Columns];
          this.config.fields[tableName] = selection;
        }
      }
      if (typeof on === "function") {
        on = on(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
      }
      if (!this.config.joins) {
        this.config.joins = [];
      }
      this.config.joins.push({ on, table: table20, joinType, alias: tableName });
      if (typeof tableName === "string") {
        switch (joinType) {
          case "left": {
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
          case "right": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "inner": {
            this.joinsNotNullableMap[tableName] = true;
            break;
          }
          case "full": {
            this.joinsNotNullableMap = Object.fromEntries(Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false]));
            this.joinsNotNullableMap[tableName] = false;
            break;
          }
        }
      }
      return this;
    };
  }
  leftJoin = this.createJoin("left");
  rightJoin = this.createJoin("right");
  innerJoin = this.createJoin("inner");
  fullJoin = this.createJoin("full");
  createSetOperator(type47, isAll) {
    return (rightSelection) => {
      const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
      if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
        throw new Error("Set operator error (union / intersect / except): selected fields are not the same or are in a different order");
      }
      this.config.setOperators.push({ type: type47, isAll, rightSelect });
      return this;
    };
  }
  union = this.createSetOperator("union", false);
  unionAll = this.createSetOperator("union", true);
  intersect = this.createSetOperator("intersect", false);
  except = this.createSetOperator("except", false);
  addSetOperators(setOperators) {
    this.config.setOperators.push(...setOperators);
    return this;
  }
  where(where) {
    if (typeof where === "function") {
      where = where(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.where = where;
    return this;
  }
  having(having) {
    if (typeof having === "function") {
      having = having(new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })));
    }
    this.config.having = having;
    return this;
  }
  groupBy(...columns2) {
    if (typeof columns2[0] === "function") {
      const groupBy = columns2[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
    } else {
      this.config.groupBy = columns2;
    }
    return this;
  }
  orderBy(...columns2) {
    if (typeof columns2[0] === "function") {
      const orderBy = columns2[0](new Proxy(this.config.fields, new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })));
      const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    } else {
      const orderByArray = columns2;
      if (this.config.setOperators.length > 0) {
        this.config.setOperators.at(-1).orderBy = orderByArray;
      } else {
        this.config.orderBy = orderByArray;
      }
    }
    return this;
  }
  limit(limit) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).limit = limit;
    } else {
      this.config.limit = limit;
    }
    return this;
  }
  offset(offset) {
    if (this.config.setOperators.length > 0) {
      this.config.setOperators.at(-1).offset = offset;
    } else {
      this.config.offset = offset;
    }
    return this;
  }
  getSQL() {
    return this.dialect.buildSelectQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest4 } = this.dialect.sqlToQuery(this.getSQL());
    return rest4;
  }
  as(alias3) {
    return new Proxy(new Subquery(this.getSQL(), this.config.fields, alias3), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  getSelectedFields() {
    return new Proxy(this.config.fields, new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
  }
  $dynamic() {
    return this;
  }
}

class SQLiteSelectBase extends SQLiteSelectQueryBuilderBase {
  static [entityKind] = "SQLiteSelect";
  _prepare(isOneTimeQuery = true) {
    if (!this.session) {
      throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
    }
    const fieldsList = orderSelectedFields(this.config.fields);
    const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), fieldsList, "all", true);
    query.joinsNotNullableMap = this.joinsNotNullableMap;
    return query;
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.all();
  }
}
applyMixins(SQLiteSelectBase, [QueryPromise]);
var getSQLiteSetOperators = () => ({
  union: union22,
  unionAll,
  intersect: intersect12,
  except
});
var union22 = createSetOperator("union", false);
var unionAll = createSetOperator("union", true);
var intersect12 = createSetOperator("intersect", false);
var except = createSetOperator("except", false);

// node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js
class QueryBuilder {
  static [entityKind] = "SQLiteQueryBuilder";
  dialect;
  $with(alias3) {
    const queryBuilder = this;
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(queryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias3, true), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select2(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self.getDialect(),
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: undefined,
        dialect: self.getDialect(),
        withList: queries,
        distinct: true
      });
    }
    return { select: select2, selectDistinct };
  }
  select(fields) {
    return new SQLiteSelectBuilder({ fields: fields ?? undefined, session: undefined, dialect: this.getDialect() });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? undefined,
      session: undefined,
      dialect: this.getDialect(),
      distinct: true
    });
  }
  getDialect() {
    if (!this.dialect) {
      this.dialect = new SQLiteSyncDialect;
    }
    return this.dialect;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/update.js
class SQLiteUpdateBuilder {
  constructor(table21, session, dialect2, withList) {
    this.table = table21;
    this.session = session;
    this.dialect = dialect2;
    this.withList = withList;
  }
  static [entityKind] = "SQLiteUpdateBuilder";
  set(values) {
    return new SQLiteUpdateBase(this.table, mapUpdateSet(this.table, values), this.session, this.dialect, this.withList);
  }
}

class SQLiteUpdateBase extends QueryPromise {
  constructor(table21, set2, session, dialect2, withList) {
    super();
    this.session = session;
    this.dialect = dialect2;
    this.config = { set: set2, table: table21, withList };
  }
  static [entityKind] = "SQLiteUpdate";
  config;
  where(where) {
    this.config.where = where;
    return this;
  }
  returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
    this.config.returning = orderSelectedFields(fields);
    return this;
  }
  getSQL() {
    return this.dialect.buildUpdateQuery(this.config);
  }
  toSQL() {
    const { typings: _typings, ...rest4 } = this.dialect.sqlToQuery(this.getSQL());
    return rest4;
  }
  _prepare(isOneTimeQuery = true) {
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](this.dialect.sqlToQuery(this.getSQL()), this.config.returning, this.config.returning ? "all" : "run", true);
  }
  prepare() {
    return this._prepare(false);
  }
  run = (placeholderValues) => {
    return this._prepare().run(placeholderValues);
  };
  all = (placeholderValues) => {
    return this._prepare().all(placeholderValues);
  };
  get = (placeholderValues) => {
    return this._prepare().get(placeholderValues);
  };
  values = (placeholderValues) => {
    return this._prepare().values(placeholderValues);
  };
  async execute() {
    return this.config.returning ? this.all() : this.run();
  }
  $dynamic() {
    return this;
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/query.js
class RelationalQueryBuilder {
  constructor(mode, fullSchema, schema3, tableNamesMap, table21, tableConfig, dialect2, session) {
    this.mode = mode;
    this.fullSchema = fullSchema;
    this.schema = schema3;
    this.tableNamesMap = tableNamesMap;
    this.table = table21;
    this.tableConfig = tableConfig;
    this.dialect = dialect2;
    this.session = session;
  }
  static [entityKind] = "SQLiteAsyncRelationalQueryBuilder";
  findMany(config) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? config : {}, "many");
  }
  findFirst(config) {
    return this.mode === "sync" ? new SQLiteSyncRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first") : new SQLiteRelationalQuery(this.fullSchema, this.schema, this.tableNamesMap, this.table, this.tableConfig, this.dialect, this.session, config ? { ...config, limit: 1 } : { limit: 1 }, "first");
  }
}

class SQLiteRelationalQuery extends QueryPromise {
  constructor(fullSchema, schema3, tableNamesMap, table21, tableConfig, dialect2, session, config, mode) {
    super();
    this.fullSchema = fullSchema;
    this.schema = schema3;
    this.tableNamesMap = tableNamesMap;
    this.table = table21;
    this.tableConfig = tableConfig;
    this.dialect = dialect2;
    this.session = session;
    this.config = config;
    this.mode = mode;
  }
  static [entityKind] = "SQLiteAsyncRelationalQuery";
  mode;
  getSQL() {
    return this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    }).sql;
  }
  _prepare(isOneTimeQuery = false) {
    const { query, builtQuery } = this._toSQL();
    return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](builtQuery, undefined, this.mode === "first" ? "get" : "all", true, (rawRows, mapColumnValue) => {
      const rows = rawRows.map((row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue));
      if (this.mode === "first") {
        return rows[0];
      }
      return rows;
    });
  }
  prepare() {
    return this._prepare(false);
  }
  _toSQL() {
    const query = this.dialect.buildRelationalQuery({
      fullSchema: this.fullSchema,
      schema: this.schema,
      tableNamesMap: this.tableNamesMap,
      table: this.table,
      tableConfig: this.tableConfig,
      queryConfig: this.config,
      tableAlias: this.tableConfig.tsName
    });
    const builtQuery = this.dialect.sqlToQuery(query.sql);
    return { query, builtQuery };
  }
  toSQL() {
    return this._toSQL().builtQuery;
  }
  executeRaw() {
    if (this.mode === "first") {
      return this._prepare(false).get();
    }
    return this._prepare(false).all();
  }
  async execute() {
    return this.executeRaw();
  }
}

class SQLiteSyncRelationalQuery extends SQLiteRelationalQuery {
  static [entityKind] = "SQLiteSyncRelationalQuery";
  sync() {
    return this.executeRaw();
  }
}

// node_modules/drizzle-orm/sqlite-core/query-builders/raw.js
class SQLiteRaw extends QueryPromise {
  constructor(execute, getSQL, action, dialect2, mapBatchResult) {
    super();
    this.execute = execute;
    this.getSQL = getSQL;
    this.dialect = dialect2;
    this.mapBatchResult = mapBatchResult;
    this.config = { action };
  }
  static [entityKind] = "SQLiteRaw";
  config;
  getQuery() {
    return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
  }
  mapResult(result, isFromBatch) {
    return isFromBatch ? this.mapBatchResult(result) : result;
  }
  _prepare() {
    return this;
  }
  isResponseInArrayMode() {
    return false;
  }
}

// node_modules/drizzle-orm/sqlite-core/db.js
class BaseSQLiteDatabase {
  constructor(resultKind, dialect2, session, schema3) {
    this.resultKind = resultKind;
    this.dialect = dialect2;
    this.session = session;
    this._ = schema3 ? {
      schema: schema3.schema,
      fullSchema: schema3.fullSchema,
      tableNamesMap: schema3.tableNamesMap
    } : {
      schema: undefined,
      fullSchema: {},
      tableNamesMap: {}
    };
    this.query = {};
    const query2 = this.query;
    if (this._.schema) {
      for (const [tableName, columns2] of Object.entries(this._.schema)) {
        query2[tableName] = new RelationalQueryBuilder(resultKind, schema3.fullSchema, this._.schema, this._.tableNamesMap, schema3.fullSchema[tableName], columns2, dialect2, session);
      }
    }
  }
  static [entityKind] = "BaseSQLiteDatabase";
  query;
  $with(alias3) {
    return {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder);
        }
        return new Proxy(new WithSubquery(qb.getSQL(), qb.getSelectedFields(), alias3, true), new SelectionProxyHandler({ alias: alias3, sqlAliasedBehavior: "alias", sqlBehavior: "error" }));
      }
    };
  }
  with(...queries) {
    const self = this;
    function select2(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: self.session,
        dialect: self.dialect,
        withList: queries
      });
    }
    function selectDistinct(fields) {
      return new SQLiteSelectBuilder({
        fields: fields ?? undefined,
        session: self.session,
        dialect: self.dialect,
        withList: queries,
        distinct: true
      });
    }
    function update(table21) {
      return new SQLiteUpdateBuilder(table21, self.session, self.dialect, queries);
    }
    function insert(into) {
      return new SQLiteInsertBuilder(into, self.session, self.dialect, queries);
    }
    function delete_(from) {
      return new SQLiteDeleteBase(from, self.session, self.dialect, queries);
    }
    return { select: select2, selectDistinct, update, insert, delete: delete_ };
  }
  select(fields) {
    return new SQLiteSelectBuilder({ fields: fields ?? undefined, session: this.session, dialect: this.dialect });
  }
  selectDistinct(fields) {
    return new SQLiteSelectBuilder({
      fields: fields ?? undefined,
      session: this.session,
      dialect: this.dialect,
      distinct: true
    });
  }
  update(table21) {
    return new SQLiteUpdateBuilder(table21, this.session, this.dialect);
  }
  insert(into) {
    return new SQLiteInsertBuilder(into, this.session, this.dialect);
  }
  delete(from) {
    return new SQLiteDeleteBase(from, this.session, this.dialect);
  }
  run(query2) {
    const sql14 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.run(sql14), () => sql14, "run", this.dialect, this.session.extractRawRunValueFromBatchResult.bind(this.session));
    }
    return this.session.run(sql14);
  }
  all(query2) {
    const sql14 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.all(sql14), () => sql14, "all", this.dialect, this.session.extractRawAllValueFromBatchResult.bind(this.session));
    }
    return this.session.all(sql14);
  }
  get(query2) {
    const sql14 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.get(sql14), () => sql14, "get", this.dialect, this.session.extractRawGetValueFromBatchResult.bind(this.session));
    }
    return this.session.get(sql14);
  }
  values(query2) {
    const sql14 = query2.getSQL();
    if (this.resultKind === "async") {
      return new SQLiteRaw(async () => this.session.values(sql14), () => sql14, "values", this.dialect, this.session.extractRawValuesValueFromBatchResult.bind(this.session));
    }
    return this.session.values(sql14);
  }
  transaction(transaction, config) {
    return this.session.transaction(transaction, config);
  }
}

// node_modules/drizzle-orm/sqlite-core/session.js
class ExecuteResultSync extends QueryPromise {
  constructor(resultCb) {
    super();
    this.resultCb = resultCb;
  }
  static [entityKind] = "ExecuteResultSync";
  async execute() {
    return this.resultCb();
  }
  sync() {
    return this.resultCb();
  }
}

class SQLitePreparedQuery {
  constructor(mode, executeMethod, query2) {
    this.mode = mode;
    this.executeMethod = executeMethod;
    this.query = query2;
  }
  static [entityKind] = "PreparedQuery";
  joinsNotNullableMap;
  getQuery() {
    return this.query;
  }
  mapRunResult(result, _isFromBatch) {
    return result;
  }
  mapAllResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  mapGetResult(_result, _isFromBatch) {
    throw new Error("Not implemented");
  }
  execute(placeholderValues) {
    if (this.mode === "async") {
      return this[this.executeMethod](placeholderValues);
    }
    return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
  }
  mapResult(response, isFromBatch) {
    switch (this.executeMethod) {
      case "run": {
        return this.mapRunResult(response, isFromBatch);
      }
      case "all": {
        return this.mapAllResult(response, isFromBatch);
      }
      case "get": {
        return this.mapGetResult(response, isFromBatch);
      }
    }
  }
}

class SQLiteSession {
  constructor(dialect2) {
    this.dialect = dialect2;
  }
  static [entityKind] = "SQLiteSession";
  prepareOneTimeQuery(query2, fields, executeMethod, isResponseInArrayMode) {
    return this.prepareQuery(query2, fields, executeMethod, isResponseInArrayMode);
  }
  run(query2) {
    const staticQuery = this.dialect.sqlToQuery(query2);
    try {
      return this.prepareOneTimeQuery(staticQuery, undefined, "run", false).run();
    } catch (err) {
      throw new DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
    }
  }
  extractRawRunValueFromBatchResult(result) {
    return result;
  }
  all(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run", false).all();
  }
  extractRawAllValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  get(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run", false).get();
  }
  extractRawGetValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
  values(query2) {
    return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query2), undefined, "run", false).values();
  }
  extractRawValuesValueFromBatchResult(_result) {
    throw new Error("Not implemented");
  }
}

class SQLiteTransaction extends BaseSQLiteDatabase {
  constructor(resultType, dialect2, session, schema3, nestedIndex = 0) {
    super(resultType, dialect2, session, schema3);
    this.schema = schema3;
    this.nestedIndex = nestedIndex;
  }
  static [entityKind] = "SQLiteTransaction";
  rollback() {
    throw new TransactionRollbackError;
  }
}

// node_modules/drizzle-typebox/index.mjs
var p = function(n, r2) {
  const o = getTableColumns(n), i = Object.entries(o);
  let a2 = Object.fromEntries(i.map(([e2, t3]) => [e2, d(t3)]));
  r2 && (a2 = Object.assign(a2, Object.fromEntries(Object.entries(r2).map(([e2, t3]) => [e2, typeof t3 == "function" ? t3(a2) : t3]))));
  for (const [t3, n2] of i)
    n2.notNull ? n2.hasDefault && (a2[t3] = Type.Optional(a2[t3])) : a2[t3] = Type.Optional(u(a2[t3]));
  return Type.Object(a2);
};
var d = function(t3) {
  let f;
  if (function(e2) {
    return "enumValues" in e2 && Array.isArray(e2.enumValues) && e2.enumValues.length > 0;
  }(t3) && (f = t3.enumValues?.length ? Type.Union(t3.enumValues.map((t4) => Type.Literal(t4))) : Type.String()), !f)
    if (t3.dataType === "custom")
      f = Type.Any();
    else if (t3.dataType === "json")
      f = c;
    else if (t3.dataType === "array")
      f = Type.Array(d(t3.baseColumn));
    else if (t3.dataType === "number")
      f = Type.Number();
    else if (t3.dataType === "bigint")
      f = Type.BigInt();
    else if (t3.dataType === "boolean")
      f = Type.Boolean();
    else if (t3.dataType === "date")
      f = Type.Date();
    else if (t3.dataType === "string") {
      const s = Type.String();
      (is(t3, PgChar) || is(t3, PgVarchar) || is(t3, MySqlVarChar) || is(t3, MySqlVarBinary) || is(t3, MySqlChar) || is(t3, SQLiteText)) && typeof t3.length == "number" && (s.maxLength = t3.length), f = s;
    } else
      is(t3, PgUUID) && (f = Type.RegEx(b));
  return f || (f = Type.Any()), f;
};
var f = Type.Union([Type.String(), Type.Number(), Type.Boolean(), Type.Null()]);
var c = Type.Union([f, Type.Array(Type.Any()), Type.Record(Type.String(), Type.Any())]);
var u = (t3) => Type.Union([t3, Type.Null()]);
var b = /^[\dA-Fa-f]{8}(?:-[\dA-Fa-f]{4}){3}-[\dA-Fa-f]{12}$/;

// src/db/schema.ts
var exports_schema = {};
__export(exports_schema, {
  user: () => {
    {
      return user;
    }
  }
});
var user = sqliteTable("user", {
  id: integer4("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull()
});

// node_modules/drizzle-orm/bun-sqlite/session.js
class SQLiteBunSession extends SQLiteSession {
  constructor(client, dialect2, schema3, options = {}) {
    super(dialect2);
    this.client = client;
    this.schema = schema3;
    this.logger = options.logger ?? new NoopLogger;
  }
  static [entityKind] = "SQLiteBunSession";
  logger;
  exec(query2) {
    this.client.exec(query2);
  }
  prepareQuery(query2, fields, executeMethod, isResponseInArrayMode, customResultMapper) {
    const stmt = this.client.prepare(query2.sql);
    return new PreparedQuery(stmt, query2, this.logger, fields, executeMethod, isResponseInArrayMode, customResultMapper);
  }
  transaction(transaction, config = {}) {
    const tx = new SQLiteBunTransaction("sync", this.dialect, this, this.schema);
    let result;
    const nativeTx = this.client.transaction(() => {
      result = transaction(tx);
    });
    nativeTx[config.behavior ?? "deferred"]();
    return result;
  }
}

class SQLiteBunTransaction extends SQLiteTransaction {
  static [entityKind] = "SQLiteBunTransaction";
  transaction(transaction) {
    const savepointName = `sp${this.nestedIndex}`;
    const tx = new SQLiteBunTransaction("sync", this.dialect, this.session, this.schema, this.nestedIndex + 1);
    this.session.run(sql.raw(`savepoint ${savepointName}`));
    try {
      const result = transaction(tx);
      this.session.run(sql.raw(`release savepoint ${savepointName}`));
      return result;
    } catch (err) {
      this.session.run(sql.raw(`rollback to savepoint ${savepointName}`));
      throw err;
    }
  }
}

class PreparedQuery extends SQLitePreparedQuery {
  constructor(stmt, query2, logger2, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
    super("sync", executeMethod, query2);
    this.stmt = stmt;
    this.logger = logger2;
    this.fields = fields;
    this._isResponseInArrayMode = _isResponseInArrayMode;
    this.customResultMapper = customResultMapper;
  }
  static [entityKind] = "SQLiteBunPreparedQuery";
  run(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return this.stmt.run(...params);
  }
  all(placeholderValues) {
    const { fields, query: query2, logger: logger2, joinsNotNullableMap, stmt, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      const params = fillPlaceholders(query2.params, placeholderValues ?? {});
      logger2.logQuery(query2.sql, params);
      return stmt.all(...params);
    }
    const rows = this.values(placeholderValues);
    if (customResultMapper) {
      return customResultMapper(rows);
    }
    return rows.map((row) => mapResultRow(fields, row, joinsNotNullableMap));
  }
  get(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    const row = this.stmt.values(...params)[0];
    if (!row) {
      return;
    }
    const { fields, joinsNotNullableMap, customResultMapper } = this;
    if (!fields && !customResultMapper) {
      return row;
    }
    if (customResultMapper) {
      return customResultMapper([row]);
    }
    return mapResultRow(fields, row, joinsNotNullableMap);
  }
  values(placeholderValues) {
    const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
    this.logger.logQuery(this.query.sql, params);
    return this.stmt.values(...params);
  }
  isResponseInArrayMode() {
    return this._isResponseInArrayMode;
  }
}

// node_modules/drizzle-orm/bun-sqlite/driver.js
var drizzle = function(client, config = {}) {
  const dialect3 = new SQLiteSyncDialect;
  let logger3;
  if (config.logger === true) {
    logger3 = new DefaultLogger;
  } else if (config.logger !== false) {
    logger3 = config.logger;
  }
  let schema3;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(config.schema, createTableRelationsHelpers);
    schema3 = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session3 = new SQLiteBunSession(client, dialect3, schema3, { logger: logger3 });
  return new BaseSQLiteDatabase("sync", dialect3, session3, schema3);
};

// src/db/db.ts
import {Database} from "bun:sqlite";
var sqlite = new Database("sqlite.db");
var db3 = drizzle(sqlite, { schema: exports_schema });

// src/libs/validation-cn.ts
function ChineseErrorFunction(error23) {
  switch (error23.errorType) {
    case ValueErrorType.ArrayContains:
      return "\u6570\u7EC4\u5E94\u81F3\u5C11\u5305\u542B\u4E00\u4E2A\u5339\u914D\u7684\u503C";
    case ValueErrorType.ArrayMaxContains:
      return `\u6570\u7EC4\u4E2D\u5339\u914D\u7684\u503C\u4E0D\u5E94\u8D85\u8FC7 ${error23.schema.maxContains} \u4E2A`;
    case ValueErrorType.ArrayMinContains:
      return `\u6570\u7EC4\u4E2D\u5339\u914D\u7684\u503C\u5E94\u81F3\u5C11\u6709 ${error23.schema.minContains} \u4E2A`;
    case ValueErrorType.ArrayMaxItems:
      return `\u6570\u7EC4\u957F\u5EA6\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `\u6570\u7EC4\u957F\u5EA6\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "\u6570\u7EC4\u5143\u7D20\u5E94\u8BE5\u662F\u552F\u4E00\u7684";
    case ValueErrorType.Array:
      return "\u5E94\u8BE5\u662F\u6570\u7EC4\u7C7B\u578B";
    case ValueErrorType.AsyncIterator:
      return "\u5E94\u8BE5\u662F\u5F02\u6B65\u8FED\u4EE3\u5668\u7C7B\u578B";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `\u5927\u6574\u6570\u5E94\u5C0F\u4E8E ${error23.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `\u5927\u6574\u6570\u5E94\u5927\u4E8E ${error23.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `\u5927\u6574\u6570\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `\u5927\u6574\u6570\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `\u5927\u6574\u6570\u5E94\u8BE5\u662F ${error23.schema.multipleOf} \u7684\u500D\u6570`;
    case ValueErrorType.BigInt:
      return "\u5E94\u8BE5\u662F\u5927\u6574\u6570\u7C7B\u578B";
    case ValueErrorType.Boolean:
      return "\u5E94\u8BE5\u662F\u5E03\u5C14\u7C7B\u578B";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `\u65E5\u671F\u65F6\u95F4\u6233\u5E94\u5927\u4E8E ${error23.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `\u65E5\u671F\u65F6\u95F4\u6233\u5E94\u5C0F\u4E8E ${error23.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `\u65E5\u671F\u65F6\u95F4\u6233\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `\u65E5\u671F\u65F6\u95F4\u6233\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `\u65E5\u671F\u65F6\u95F4\u6233\u5E94\u8BE5\u662F ${error23.schema.multipleOfTimestamp} \u7684\u500D\u6570`;
    case ValueErrorType.Date:
      return "\u5E94\u8BE5\u662F\u65E5\u671F\u7C7B\u578B";
    case ValueErrorType.Function:
      return "\u5E94\u8BE5\u662F\u51FD\u6570\u7C7B\u578B";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `\u6574\u6570\u5E94\u5C0F\u4E8E ${error23.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `\u6574\u6570\u5E94\u5927\u4E8E ${error23.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `\u6574\u6570\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `\u6574\u6570\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `\u6574\u6570\u5E94\u8BE5\u662F ${error23.schema.multipleOf} \u7684\u500D\u6570`;
    case ValueErrorType.Integer:
      return "\u5E94\u8BE5\u662F\u6574\u6570\u7C7B\u578B";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "\u5B58\u5728\u610F\u5916\u7684\u5C5E\u6027";
    case ValueErrorType.Intersect:
      return "\u5E94\u8BE5\u5339\u914D\u6240\u6709\u7684\u503C";
    case ValueErrorType.Iterator:
      return "\u5E94\u8BE5\u662F\u8FED\u4EE3\u5668\u7C7B\u578B";
    case ValueErrorType.Literal:
      return `\u5E94\u8BE5\u662F ${typeof error23.schema.const === "string" ? `'${error23.schema.const}'` : error23.schema.const}`;
    case ValueErrorType.Never:
      return "\u6C38\u8FDC\u4E0D\u5E94\u8BE5\u51FA\u73B0\u6B64\u7C7B\u578B";
    case ValueErrorType.Not:
      return "\u4E0D\u5E94\u5339\u914D\u6B64\u503C";
    case ValueErrorType.Null:
      return "\u5E94\u8BE5\u662F null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `\u6570\u5B57\u5E94\u5C0F\u4E8E ${error23.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `\u6570\u5B57\u5E94\u5927\u4E8E ${error23.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `\u6570\u5B57\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `\u6570\u5B57\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `\u6570\u5B57\u5E94\u8BE5\u662F ${error23.schema.multipleOf} \u7684\u500D\u6570`;
    case ValueErrorType.Number:
      return "\u5E94\u8BE5\u662F\u6570\u5B57\u7C7B\u578B";
    case ValueErrorType.Object:
      return "\u5E94\u8BE5\u662F\u5BF9\u8C61\u7C7B\u578B";
    case ValueErrorType.ObjectAdditionalProperties:
      return "\u5B58\u5728\u610F\u5916\u7684\u5C5E\u6027";
    case ValueErrorType.ObjectMaxProperties:
      return `\u5BF9\u8C61\u7684\u5C5E\u6027\u6570\u91CF\u4E0D\u5E94\u8D85\u8FC7 ${error23.schema.maxProperties} \u4E2A`;
    case ValueErrorType.ObjectMinProperties:
      return `\u5BF9\u8C61\u7684\u5C5E\u6027\u6570\u91CF\u5E94\u81F3\u5C11\u6709 ${error23.schema.minProperties} \u4E2A`;
    case ValueErrorType.ObjectRequiredProperty:
      return "\u7F3A\u5C11\u5FC5\u9700\u7684\u5C5E\u6027";
    case ValueErrorType.Promise:
      return "\u5E94\u8BE5\u662F Promise \u7C7B\u578B";
    case ValueErrorType.RegExp:
      return "\u5B57\u7B26\u4E32\u5E94\u5339\u914D\u6307\u5B9A\u7684\u6B63\u5219\u8868\u8FBE\u5F0F";
    case ValueErrorType.StringFormatUnknown:
      return `\u672A\u77E5\u7684\u683C\u5F0F '${error23.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `\u5B57\u7B26\u4E32\u5E94\u5339\u914D '${error23.schema.format}' \u683C\u5F0F`;
    case ValueErrorType.StringMaxLength:
      return `\u5B57\u7B26\u4E32\u957F\u5EA6\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `\u5B57\u7B26\u4E32\u957F\u5EA6\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `\u5B57\u7B26\u4E32\u5E94\u5339\u914D\u6A21\u5F0F '${error23.schema.pattern}'`;
    case ValueErrorType.String:
      return "\u5E94\u8BE5\u662F\u5B57\u7B26\u4E32\u7C7B\u578B";
    case ValueErrorType.Symbol:
      return "\u5E94\u8BE5\u662F Symbol \u7C7B\u578B";
    case ValueErrorType.TupleLength:
      return `\u5143\u7EC4\u5E94\u8BE5\u6709 ${error23.schema.maxItems || 0} \u4E2A\u5143\u7D20`;
    case ValueErrorType.Tuple:
      return "\u5E94\u8BE5\u662F\u5143\u7EC4\u7C7B\u578B";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `\u5B57\u8282\u957F\u5EA6\u5E94\u5C0F\u4E8E\u6216\u7B49\u4E8E ${error23.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `\u5B57\u8282\u957F\u5EA6\u5E94\u5927\u4E8E\u6216\u7B49\u4E8E ${error23.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "\u5E94\u8BE5\u662F Uint8Array \u7C7B\u578B";
    case ValueErrorType.Undefined:
      return "\u5E94\u8BE5\u662F undefined";
    case ValueErrorType.Union:
      return "\u5E94\u8BE5\u5339\u914D\u8054\u5408\u7C7B\u578B\u4E2D\u7684\u4E00\u4E2A";
    case ValueErrorType.Void:
      return "\u5E94\u8BE5\u662F void \u7C7B\u578B";
    case ValueErrorType.Kind:
      return `\u5E94\u8BE5\u662F '${error23.schema.Kind}' \u7C7B\u578B`;
    default:
      return "\u672A\u77E5\u7684\u9519\u8BEF\u7C7B\u578B";
  }
}

// src/setup.ts
SetErrorFunction((error23) => {
  return ChineseErrorFunction(error23);
});

// src/index.ts
var createUser = p(user);
var auth = new Elysia().post("/sign-up", ({ body }) => db3.insert(user).values(body).returning(), {
  body: t2.Omit(createUser, ["id"])
});
var app = new Elysia().onError(({ code, error: error23 }) => {
  if (code === "VALIDATION") {
    const errs = error23.validator.Errors(error23.value);
    const msg = [];
    for (let err of errs) {
      msg.push(err.path.replace("/", "") + " " + err.message);
    }
    return {
      name: "\u6821\u9A8C\u9519\u8BEF",
      messgae: msg.join("\uFF0C")
    };
  }
}).use(auth).get("/", () => "Hello Elysia").listen(3000);
console.log(`\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
