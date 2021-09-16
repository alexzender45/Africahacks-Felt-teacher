"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _teacher = require("../../controllers/teacher");

var _middleware = require("../../middleware");

//import { multerUploads } from '../middleware/multer';
//
const upload = require("../../middleware/multer");

const router = (0, _express.Router)();
const {
  changePicture,
  changeVideo,
  UploadResume
} = new _teacher.UploadVideoAndImage();
router.route('/teachers/:_id/upload').put(upload.imageUpload.any(), _middleware.authenticate, (0, _middleware.permit)(['admin', 'user']), changePicture);
router.route('/teachers/:_id/video').put(upload.videoUpload.any(), _middleware.authenticate, (0, _middleware.permit)(['admin', 'user']), changeVideo);
router.route('/teachers/:_id/resume').put(upload.imageUpload.any(), _middleware.authenticate, (0, _middleware.permit)(['admin', 'user']), UploadResume);
var _default = router;
exports.default = _default;
//# sourceMappingURL=upload.route.js.map