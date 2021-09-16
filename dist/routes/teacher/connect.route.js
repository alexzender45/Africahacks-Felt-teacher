"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _teacher = require("../../controllers/teacher");

var _middleware = require("../../middleware");

const router = (0, _express.Router)();
const {
  connectWithApprovedTeacher
} = new _teacher.Connect();
router.route('/teachers/:_id/connect').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), connectWithApprovedTeacher);
var _default = router;
exports.default = _default;
//# sourceMappingURL=connect.route.js.map