"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadImage = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _ = require(".");

var _school = _interopRequireDefault(require("../../model/school.model"));

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cloud = require("../../server/cloudinaryConfig");

_dotenv.default.config();

class UploadImage extends _.BaseController {
  constructor() {
    super();
  }

  async uploadPicture(req, res) {
    const user = await _school.default.findById(req.params._id);

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
      await _school.default.findOneAndUpdate({
        _id: user._id
      }, {
        $set: {
          image: view,
          link: ` https://felt-teacher.herokuapp.com/api/schools/${btoa(user._id)}`
        }
      }, {
        new: true
      });
      const Name = user.nameOfSchool;
      const Email = user.email;
      const Account = 'School';
      (0, _sendgrid.completeProfile)(Name, Email, Account);
      return res.status(200).json({
        message: "Uploaded Successfully"
      });
    });
  }

  catch(e) {
    super.error(res, e);
  }

}

exports.UploadImage = UploadImage;
//# sourceMappingURL=uploadImage.js.map