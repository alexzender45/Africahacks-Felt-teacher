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

var _jobSchool = require("./jobSchool.controller");

Object.keys(_jobSchool).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _jobSchool[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _jobSchool[key];
    }
  });
});
//# sourceMappingURL=index.js.map