"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _jobSchool = require("../../controllers/jobSchool");

//
const router = (0, _express.Router)();
const {
  createJob,
  readAllJob,
  deleteAllJob,
  fetchOneJob,
  updateJob,
  deleteOneJob
} = new _jobSchool.JobController();
router.route('/job').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), readAllJob).post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), createJob).delete(_middleware.authenticate, (0, _middleware.permit)(['admin']), deleteAllJob);
router.route('/job/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school']), fetchOneJob).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), deleteOneJob).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), updateJob);
var _default = router;
exports.default = _default;
//# sourceMappingURL=jobSchool.route.js.map