"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "schoolRoute", {
  enumerable: true,
  get: function () {
    return _school.default;
  }
});
Object.defineProperty(exports, "healthRoute", {
  enumerable: true,
  get: function () {
    return _health.default;
  }
});
Object.defineProperty(exports, "imageUploadRoute", {
  enumerable: true,
  get: function () {
    return _upload.default;
  }
});
Object.defineProperty(exports, "schoolConnectRoute", {
  enumerable: true,
  get: function () {
    return _connect.default;
  }
});

var _school = _interopRequireDefault(require("./school.route"));

var _health = _interopRequireDefault(require("./health.route"));

var _upload = _interopRequireDefault(require("./upload.route"));

var _connect = _interopRequireDefault(require("./connect.route"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map