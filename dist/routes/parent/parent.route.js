"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _parent = require("../../controllers/parent");

//
const router = (0, _express.Router)();
const {
  parentLogin,
  parentLogOut,
  deleteAllParent,
  deleteOneParent,
  readAllParent,
  fetchOneParent,
  register,
  updateParent,
  cancel,
  verifyUser,
  adminApprovedParents,
  approvedParents
} = new _parent.ParentController();
router.route('/login/parent').post(parentLogin);
router.route('/logout/parent').get(_middleware.authenticate, parentLogOut);
router.route('/verify/parent').post(verifyUser);
router.route('/cancelparent').get(cancel);
router.route('/parents').get(_middleware.authenticate, (0, _middleware.permit)(['admin']), readAllParent).post(register).delete(_middleware.authenticate, (0, _middleware.permit)(['admin']), deleteAllParent);
router.route('/parents/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), approvedParents);
router.route('/parents/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), fetchOneParent).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), deleteOneParent).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), updateParent);
router.route('/parent/:_id/approve').put(_middleware.authenticate, (0, _middleware.permit)(['admin']), adminApprovedParents);
var _default = router;
exports.default = _default;
//# sourceMappingURL=parent.route.js.map