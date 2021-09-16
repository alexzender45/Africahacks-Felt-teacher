"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadVideoAndImage = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _ = require(".");

var _teacher = _interopRequireDefault(require("../../model/teacher.model"));

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cloud = require("../../server/cloudinaryConfig");

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
    cloud.uploads(attempt.imageUrl).then(async result => {
      const view = result.url;
      await _teacher.default.findOneAndUpdate({
        _id: user._id
      }, {
        $set: {
          image: view,
          link: `https://felt-teacher.herokuapp.com/api/teachers/${btoa(user._id)}`
        }
      }, {
        new: true
      });
      return res.status(200).json({
        message: "Uploaded Successfully"
      });
    });
  }

  catch(e) {
    console.log(e);
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
    cloud.uploads(attempt.videoUrl).then(async result => {
      const view = result.url;
      await _teacher.default.findOneAndUpdate({
        _id: user._id
      }, {
        $set: {
          video: view
        }
      }, {
        new: true
      });
      const Name = user.fullname;
      const Email = user.email;
      const Account = 'Teacher';
      (0, _sendgrid.completeProfile)(Name, Email, Account);
      return res.status(200).json({
        message: "Uploaded Video Successfully"
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
    cloud.uploads(attempt.imageUrl).then(async result => {
      const view = result.url;
      await _teacher.default.findOneAndUpdate({
        _id: user._id
      }, {
        $set: {
          resume: view
        }
      }, {
        new: true
      });
      return res.status(200).json({
        message: "Uploaded Cv Successfully"
      });
    });
  }

  catch(e) {
    super.error(res, e);
  }

}

exports.UploadVideoAndImage = UploadVideoAndImage;
//# sourceMappingURL=uploadVideoAndImage.js.map