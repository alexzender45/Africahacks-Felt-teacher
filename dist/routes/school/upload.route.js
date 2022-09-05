"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _school = require("../../controllers/school");

var _middleware = require("../../middleware");

//import { multerUploads } from '../middleware/multer';
//
const upload = require("../../middleware/multer");

const router = (0, _express.Router)();
const {
  uploadPicture
} = new _school.UploadImage();
router.route('/schools/:_id/upload').put(upload.imageUpload.any(), _middleware.authenticate, (0, _middleware.permit)(['admin', 'school']), uploadPicture);
var _default = router;
exports.default = _default;
//# sourceMappingURL=upload.route.js.map