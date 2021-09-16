"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _health = require("./health.controller");

Object.keys(_health).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _health[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _health[key];
    }
  });
});

var _base = require("./base.controller");

Object.keys(_base).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _base[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _base[key];
    }
  });
});

var _parent = require("./parent.controller");

Object.keys(_parent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parent[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parent[key];
    }
  });
});

var _uploadImage = require("./uploadImage");

Object.keys(_uploadImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _uploadImage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _uploadImage[key];
    }
  });
});

var _connect = require("./connect.controller");

Object.keys(_connect).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _connect[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _connect[key];
    }
  });
});
//# sourceMappingURL=index.js.map