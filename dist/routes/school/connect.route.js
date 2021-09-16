"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _school = require("../../controllers/school");

var _middleware = require("../../middleware");

const router = (0, _express.Router)();
const {
  connectWithApprovedSchool
} = new _school.Connect();
router.route('/schools/:_id/connect').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), connectWithApprovedSchool);
var _default = router;
exports.default = _default;
//# sourceMappingURL=connect.route.js.map