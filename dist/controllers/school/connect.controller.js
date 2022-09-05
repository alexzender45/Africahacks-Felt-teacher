"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connect = void 0;

var _dotenv = require("dotenv");

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ = require(".");

var _teacher = _interopRequireDefault(require("../../model/teacher.model"));

var _school = _interopRequireDefault(require("../../model/school.model"));

var _parent = _interopRequireDefault(require("../../model/parent.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Vonage = require('@vonage/server-sdk');

(0, _dotenv.config)();
const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});

class Connect extends _.BaseController {
  constructor() {
    super();
  }

  async connectWithApprovedSchool(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      const usertoken = req.headers.authorization;
      const token = usertoken.split(' ');

      const decoded = _jsonwebtoken.default.verify(token[1], process.env.JWT_SECRETE_KEY); // User that is a school


      if (decoded.type === "school") {
        const visitor = await _school.default.findById(decoded._id);

        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          _school.default.updateOne({
            "_id": visitor._id
          }, {
            "$inc": {
              "connectPoint": -1
            }
          }, function (err) {
            if (err) return new Error(err);
          });

          const user = await _school.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages


          user.messages.push(`${visitor.nameOfSchool} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const from = " From Felt Teacher";
          const to = user.phone;
          const more = `You can email me ${visitor.email}, and also check School on Felt Teacher Platform ${visitor.link}`;
          const text = `I will love to connect with you ${more}`;
          vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
              return err;
            } else {
              if (responseData.messages[0]['status'] === "0") {
                return "Message sent successfully.";
              } else {
                return `Message failed with error: ${responseData.messages[0]['error-text']}`;
              }
            }
          });
        } //User that is a teacher

      } else if (decoded.type === "teacher") {
        const visitor = await _teacher.default.findById(decoded._id);

        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          _teacher.default.updateOne({
            "_id": visitor._id
          }, {
            "$inc": {
              "connectPoint": -1
            }
          }, function (err) {
            if (err) return new Error(err);
          });

          const user = await _school.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages


          user.messages.push(`${visitor.fullname} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const from = " From Felt Teacher";
          const to = user.phone;
          const more = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`;
          const text = `I will love to connect with you. ${more}`;
          vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
              return err;
            } else {
              if (responseData.messages[0]['status'] === "0") {
                return "Message sent successfully.";
              } else {
                return `Message failed with error: ${responseData.messages[0]['error-text']}`;
              }
            }
          });
        } //User that is a parent

      } else if (decoded.type === "parent") {
        const visitor = await _parent.default.findById(decoded._id);

        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          _parent.default.updateOne({
            "_id": visitor._id
          }, {
            "$inc": {
              "connectPoint": -1
            }
          }, function (err) {
            if (err) return new Error(err);
          });

          const user = await _school.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages


          user.messages.push(`${visitor.nameOfParent} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const from = " From Felt Teacher";
          const to = user.phone;
          const more = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`;
          const text = `I will love to connect with you. ${more}`;
          vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
              super.error(err);
            } else {
              if (responseData.messages[0]['status'] === "0") {
                return "Message sent successfully.";
              } else {
                return `Message failed with error: ${responseData.messages[0]['error-text']}`;
              }
            }
          });
        }
      }

      super.success(res, 'Connected Successful');
    }
  }

}

exports.Connect = Connect;
//# sourceMappingURL=connect.controller.js.map