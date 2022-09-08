"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _school = require("../../controllers/school");

//
const router = (0, _express.Router)();
const {
  schoolLogin,
  schoolLogOut,
  deleteAllSchool,
  deleteOne,
  readAllSchool,
  fetchOne,
  register,
  update,
  cancel,
  verifyUser,
  adminApprovedSchools,
  approvedSchools
} = new _school.SchoolController();
router.route('/login/school').post(schoolLogin);
router.route('/logout/school').get(_middleware.authenticate, schoolLogOut);
router.route('/verify/school').post(verifyUser);
router.route('/cancelschool').get(cancel);
router.route('/schools').get(_middleware.authenticate, (0, _middleware.permit)(['admin']), readAllSchool).post(register).delete(_middleware.authenticate, (0, _middleware.permit)(['admin']), deleteAllSchool);
router.route('/schools/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), approvedSchools);
router.route('/schools/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), fetchOne).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), deleteOne).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), update);
router.route('/school/me/approve').put(_middleware.authenticate, (0, _middleware.permit)(['admin']), adminApprovedSchools);
var _default = router;
exports.default = _default;
//# sourceMappingURL=school.route.js.map