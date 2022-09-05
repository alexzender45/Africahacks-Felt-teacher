"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _auth = require("./auth");

Object.keys(_auth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _auth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _auth[key];
    }
  });
});
//# sourceMappingURL=index.js.map