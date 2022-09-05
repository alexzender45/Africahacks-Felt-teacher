"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _middleware = require("../../middleware");

var _jobParent = require("../../controllers/jobParent");

//
const router = (0, _express.Router)();
const {
  createJob,
  readAllJob,
  deleteAllJob,
  fetchOneJob,
  updateJob,
  deleteOneJob
} = new _jobParent.JobParentController();
router.route('/jobparent').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), readAllJob).post(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), createJob).delete(_middleware.authenticate, (0, _middleware.permit)(['admin']), deleteAllJob);
router.route('/jobparent/:_id').get(_middleware.authenticate, (0, _middleware.permit)(['admin', 'user', 'school', 'parent']), fetchOneJob).delete(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), deleteOneJob).put(_middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), updateJob);
var _default = router;
exports.default = _default;
//# sourceMappingURL=jobParent.route.js.map