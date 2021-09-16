"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connect = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _ = require(".");

var _teacher = _interopRequireDefault(require("../../model/teacher.model"));

var _school = _interopRequireDefault(require("../../model/school.model"));

var _parent = _interopRequireDefault(require("../../model/parent.model"));

var _connect = require("../../utils/connect");

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Connect extends _.BaseController {
  constructor() {
    super();
  }

  async connectWithApprovedTeacher(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      const usertoken = req.headers.authorization;
      const token = usertoken.split(' ');

      const decoded = _jsonwebtoken.default.verify(token[1], process.env.JWT_SECRETE_KEY); // User that is a teacher 


      if (decoded.type === "teacher") {
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

          const user = await _teacher.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages 


          user.messages.push(`${visitor.fullname} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`;
          const sendMessage = `<h1> Hello ${user.fullname},</h1>
          <p>Someone on the Felt-Teachers platform has requested to connect with you</p>
          <p>Hi ${visitor.fullname}, i will love to connect with you, am a <b>Teacher</b> on the Platform</p>
          <p> You can send a email to me via ${visitor.email}, and also check my profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><strong> Thanks For Reading My Message </strong></p>`;
          const Email = user.email;
          (0, _connect.connect)(user.phone, message);
          (0, _sendgrid.connectWithUser)(sendMessage, Email);
        } // User that is a school

      } else if (decoded.type === "school") {
        const visitor = await _school.default.findById(decoded._id);

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

          const user = await _teacher.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages


          user.messages.push(`${visitor.nameOfSchool} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`;
          const sendMessage = `<h1> Congrats ${user.fullname} Someone Wants To Connect With You </h1>
          <p> I will love to connect with you</p>
          <p> You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><b> Thanks For Reading My Message </b></p>`;
          const Email = user.email;
          (0, _connect.connect)(user.phone, message);
          (0, _sendgrid.connectWithUser)(sendMessage, Email);
        } // User that is a parent

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

          const user = await _teacher.default.findById(req.params._id);

          if (!user) {
            return res.status(400).send({
              error: 'User does not exist'
            });
          } // messages


          user.messages.push(`${visitor.nameOfParent} requested to connect with you, ${visitor.email}, ${visitor.link}`);
          user.save();
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`;
          const sendMessage = `<h1> Congrats ${user.fullname} Someone Wants To Connect With You </h1>
          <p> I will love to connect with you</p>
          <p> You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><b> Thanks For Reading My Message </b></p>`;
          const Email = user.email;
          (0, _connect.connect)(user.phone, message);
          (0, _sendgrid.connectWithUser)(sendMessage, Email);
        }
      }

      super.success(res, 'Connected Successful');
    }
  }

}

exports.Connect = Connect;
//# sourceMappingURL=connect.controller.js.map