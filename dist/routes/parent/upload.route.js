"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _parent = require("../../controllers/parent");

var _middleware = require("../../middleware");

//import { multerUploads } from '../middleware/multer';
//
const upload = require("../../middleware/multer");

const router = (0, _express.Router)();
const {
  uploadPicture
} = new _parent.UploadImage();
router.route('/parents/:_id/upload').put(upload.imageUpload.any(), _middleware.authenticate, (0, _middleware.permit)(['admin', 'parent']), uploadPicture);
var _default = router;
exports.default = _default;
//# sourceMappingURL=upload.route.js.map