"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadVideoAndImage = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ = require(".");

var _teacher = _interopRequireDefault(require("../../model/teacher.model"));

var _handleErrors = require("../../utils/handleErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cloud = require("../../server/cloudinaryConfig");

const ObjectId = require('mongodb').ObjectID;

_dotenv.default.config();

class UploadVideoAndImage extends _.BaseController {
  constructor() {
    super();
  } // Upload Pictures


  async changePicture(req, res) {
    const user = await _teacher.default.findById(req.params._id);

    if (!user) {
      return res.status(400).send({
        error: 'User does not exist'
      });
    }

    let attempt = {
      imageName: req.files[0].originalname,
      imageUrl: req.files[0].path
    };
    cloud.uploads(attempt.imageUrl).then(result => {
      const view = result.url;

      _teacher.default.updateOne({
        "_id": ObjectId(user._id)
      }, {
        $set: {
          "image": view,
          "link": `http://localhost:6060/api/teachers/${user._id}`
        }
      }, function (err) {
        console.log(err);
      });

      return res.status(200).json({
        user
      });
    });
  }

  catch(e) {
    super.error(res, e);
  } // Upload Video


  async changeVideo(req, res) {
    const user = await _teacher.default.findById(req.params._id);

    if (!user) {
      return res.status(400).send({
        error: 'User does not exist'
      });
    }

    let attempt = {
      videoName: req.files[0].originalname,
      videoUrl: req.files[0].path
    };
    cloud.uploads(attempt.videoUrl).then(result => {
      const view = result.url;

      _teacher.default.updateOne({
        "_id": ObjectId(user._id)
      }, {
        $set: {
          "video": view
        }
      }, function (err) {
        console.log(err);
      });

      return res.status(200).json({
        user
      });
    });
  }

  catch(e) {
    super.error(res, e);
  } // Upload resume


  async UploadResume(req, res) {
    const user = await _teacher.default.findById(req.params._id);

    if (!user) {
      return res.status(400).send({
        error: 'User does not exist'
      });
    }

    let attempt = {
      resumeName: req.files[0].originalname,
      imageUrl: req.files[0].path
    };
    cloud.uploads(attempt.imageUrl).then(result => {
      const view = result.url;

      _teacher.default.updateOne({
        "_id": ObjectId(user._id)
      }, {
        $set: {
          "resume": view
        }
      }, function (err) {
        console.log(err);
      });

      return res.status(200).json({
        user
      });
    });
  }

  catch(e) {
    super.error(res, e);
  }

}

exports.UploadVideoAndImage = UploadVideoAndImage;
//# sourceMappingURL=uploadVideoAndImage.js.map