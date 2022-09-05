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
  login,
  logOut,
  deleteAll,
  deleteOne,
  readAll,
  fetchOne,
  register,
  cancel,
  update,
  adminApprovedTeachers,
  verifyUser,
  approvedTeachersInEnglish,
  approvedTeachersInMathematics,
  approvedTeachersInBiology,
  approvedTeachersInCommerce,
  approvedTeachersInGovernment,
  approvedTeachersInEnglishLiterature,
  approvedTeachersInChristianReligiousStudies,
  approvedTeachersInHistory,
  approvedTeachersInCivicEducation,
  approvedTeachersInIslamicReligiousStudies,
  approvedTeachersInPhysics,
  approvedTeachersInGeography,
  approvedTeachersInChemistry,
  approvedTeachersInAccount,
  approvedTeachersInEconomics,
  approvedTeachersForPrimary,
  approvedTeachersForJuniorSecondary
} = new _teacher.TeacherController(); //

router.route('/login').post(login);
router.route('/logout').get(_middleware.authenticate, logOut);
router.route('/verify').post(verifyUser);
router.route('/cancel').post(cancel);
router.route('/teachers').get(_middleware.authenticate, (0, _middleware.permit)(['admin']), readAll).post(register).delete(_middleware.authenticate, (0, _middleware.permit)(['admin']), deleteAll);
router.route('/teachers/Mathematics').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInMathematics);
router.route('/teachers/English').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInEnglish);
router.route('/teachers/Biology').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), approvedTeachersInBiology);
router.route('/teachers/Commerce').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInCommerce);
router.route('/teachers/Government').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInGovernment);
router.route('/teachers/EnglishLiterature').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInEnglishLiterature);
router.route('/teachers/History').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInHistory);
router.route('/teachers/CivicEducation').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInCivicEducation);
router.route('/teachers/IslamicReligiousStudies').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInIslamicReligiousStudies);
router.route('/teachers/ChristianReligiousStudies').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInChristianReligiousStudies);
router.route('/teachers/Physics').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInPhysics);
router.route('/teachers/Geography').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInGeography);
router.route('/teachers/Chemistry').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInChemistry);
router.route('/teachers/Account').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInAccount);
router.route('/teachers/Economics').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersInEconomics);
router.route('/teachers/Primary').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersForPrimary);
router.route('/teacher/JuniorSecondary').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), approvedTeachersForJuniorSecondary);
router.route('/teachers/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['user', 'school', 'admin', 'parent']), fetchOne).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user']), deleteOne).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user']), update);
router.route('/teachers/:_id/approved').put(_middleware.authenticate, (0, _middleware.permit)(['admin']), adminApprovedTeachers);
var _default = router;
exports.default = _default;
//# sourceMappingURL=teacher.route.js.map