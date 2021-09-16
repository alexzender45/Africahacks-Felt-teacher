"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _school = require("../../controllers/school");

var _verifyVonage = require("../../utils/verifyVonage");

var _passwordReset = require("../../utils/passwordReset");

//
const router = (0, _express.Router)();
const {
  schoolLogin,
  schoolLogOut,
  deleteOne,
  fetchOne,
  register,
  update,
  approvedSchools
} = new _school.SchoolController();
router.route('/login/school').post(schoolLogin);
router.route('/logout/school').get(_middleware.authenticate, schoolLogOut);
router.route('/sendcode').post(_verifyVonage.sendCode);
router.route('/cancelschool').get(_verifyVonage.cancel);
router.route('/reset-password/school').post(_passwordReset.passwordResetSchool);
router.route('/change-password/school').post(_passwordReset.confirmPasswordReset);
router.route('/schools').post(register);
router.route('/schools/approved').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'parent']), approvedSchools);
router.route('/schools/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'parent']), fetchOne).delete(_middleware.authenticate, (0, _middleware.permit)(['school']), deleteOne).put(_middleware.authenticate, (0, _middleware.permit)(['school']), update);
var _default = router;
exports.default = _default;
//# sourceMappingURL=school.route.js.map