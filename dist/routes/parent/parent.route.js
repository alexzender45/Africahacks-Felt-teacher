"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _parent = require("../../controllers/parent");

var _verifyVonage = require("../../utils/verifyVonage");

var _passwordReset = require("../../utils/passwordReset");

//
const router = (0, _express.Router)();
const {
  parentLogin,
  parentLogOut,
  deleteOneParent,
  fetchOneParent,
  register,
  updateParent,
  approvedParents
} = new _parent.ParentController();
router.route('/login/parent').post(parentLogin);
router.route('/logout/parent').get(_middleware.authenticate, parentLogOut);
router.route('/sendcode').post(_verifyVonage.sendCode);
router.route('/cancelparent').get(_verifyVonage.cancel);
router.route('/reset-password/parent').post(_passwordReset.passwordResetParent);
router.route('/change-password/parent').post(_passwordReset.confirmPasswordReset);
router.route('/parents').post(register);
router.route('/parents/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), approvedParents);
router.route('/parents/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), fetchOneParent).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), deleteOneParent).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), updateParent);
var _default = router;
exports.default = _default;
//# sourceMappingURL=parent.route.js.map