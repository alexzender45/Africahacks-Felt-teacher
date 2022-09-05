"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _parent = require("../../controllers/parent");

var _middleware = require("../../middleware");

const router = (0, _express.Router)();
const {
  connectWithApprovedParent
} = new _parent.Connect();
router.route('/parents/:_id/connect').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), connectWithApprovedParent);
var _default = router;
exports.default = _default;
//# sourceMappingURL=connect.route.js.map