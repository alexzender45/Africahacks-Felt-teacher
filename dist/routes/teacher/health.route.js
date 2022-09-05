"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _teacher = require("../../controllers/teacher");

const router = (0, _express.Router)();
const health = new _teacher.HealthController();
router.route('/health').get(health.check);
var _default = router;
exports.default = _default;
//# sourceMappingURL=health.route.js.map