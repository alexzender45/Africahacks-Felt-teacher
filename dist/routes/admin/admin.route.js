"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _admin = require("../../controllers/admin");

var _middleware = require("../../middleware");

//
const router = (0, _express.Router)();
const {
  registerAdmin,
  loginAdmin,
  adminLogout,
  deleteAllParent,
  deleteOneParent,
  readAllParent,
  fetchOneParent,
  adminApprovedParents,
  approvedParents,
  deleteAllTeachers,
  deleteOneTeacher,
  readAllTeachers,
  fetchOneTeacher,
  adminApprovedTeachers,
  approvedTeachers,
  adminApprovedSchools,
  approvedSchools,
  deleteAllSchools,
  deleteOneSchool,
  readAllSchool,
  fetchOneSchool,
  unApprovedParents,
  unApprovedSchools,
  unApprovedTeachers,
  fetchOneParentByEmail,
  fetchOneTeacherByEmail,
  fetchOneSchoolByEmail
} = new _admin.AdminController(); //Parent Admin Route

router.route('/register/admin').post(registerAdmin);
router.route('/login/admin').post(loginAdmin);
router.route('/logout/admin').get(_middleware.authenticate, adminLogout);
router.route('/admin/parent').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllParent).delete(_middleware.authenticate, (0, _middleware.permit)(['godAdmin']), deleteAllParent);
router.route('/admin/parent/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedParents);
router.route('/admin/parent/unapproved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), unApprovedParents);
router.route('/admin/parent/byEmail').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneParentByEmail);
router.route('/admin/parent/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneParent).delete(_middleware.authenticate, (0, _middleware.permit)(['superAdmin', 'godAdmin']), deleteOneParent);
router.route('/admin/parent/:_id/approve').get(_middleware.authenticate, (0, _middleware.permit)(['superAdmin', 'godAdmin']), adminApprovedParents); // Teacher Admin Route

router.route('/admin/teacher').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllTeachers).delete(_middleware.authenticate, (0, _middleware.permit)(['godAdmin']), deleteAllTeachers);
router.route('/admin/teacher/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedTeachers);
router.route('/admin/teacher/unapproved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), unApprovedTeachers);
router.route('/admin/teacher/byEmail').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneTeacherByEmail);
router.route('/admin/teacher/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneTeacher).delete(_middleware.authenticate, (0, _middleware.permit)(['godAdmin']), deleteOneTeacher);
router.route('/admin/teacher/:_id/approved').get(_middleware.authenticate, (0, _middleware.permit)(['superAdmin', 'godAdmin']), adminApprovedTeachers); // School Admin Route

router.route('/admin/school').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), readAllSchool).delete(_middleware.authenticate, (0, _middleware.permit)(['godAdmin']), deleteAllSchools);
router.route('/admin/school/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), approvedSchools);
router.route('/admin/school/unapproved').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), unApprovedSchools);
router.route('/admin/school/byEmail').post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneSchoolByEmail);
router.route('/admin/school/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'superAdmin', 'administrator', 'godAdmin']), fetchOneSchool).delete(_middleware.authenticate, (0, _middleware.permit)(['godAdmin']), deleteOneSchool);
router.route('/admin/school/:_id/approved').get(_middleware.authenticate, (0, _middleware.permit)(['admin']), adminApprovedSchools);
var _default = router;
exports.default = _default;
//# sourceMappingURL=admin.route.js.map