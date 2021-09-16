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

var _teacher = require("./teacher.controller");

Object.keys(_teacher).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _teacher[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _teacher[key];
    }
  });
});

var _school = require("../school/school.controller");

Object.keys(_school).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _school[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _school[key];
    }
  });
});

var _uploadVideoAndImage = require("./uploadVideoAndImage");

Object.keys(_uploadVideoAndImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _uploadVideoAndImage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _uploadVideoAndImage[key];
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