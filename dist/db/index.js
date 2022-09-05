"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("./mongoose");

Object.keys(_mongoose).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mongoose[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mongoose[key];
    }
  });
});
//# sourceMappingURL=index.js.map