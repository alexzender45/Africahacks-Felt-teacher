"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReset = passwordReset;
exports.passwordResetSchool = passwordResetSchool;
exports.passwordResetParent = passwordResetParent;
exports.confirmPasswordReset = confirmPasswordReset;

var _teacher = _interopRequireDefault(require("../model/teacher.model"));

var _school = _interopRequireDefault(require("../model/school.model"));

var _parent = _interopRequireDefault(require("../model/parent.model"));

var _dotenv = require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _sendgrid = require("./sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

async function passwordReset(req, res) {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "You must supply an email"
      });
      return;
    }

    const email = req.body.email;
    const user = await _teacher.default.findOne({
      email
    });
    const Email = user.email;
    const Name = user.fullname;

    if (!user) {
      res.status(400).send({
        message: "User with this email not found"
      });
    } else {
      const token = _jsonwebtoken.default.sign({
        _id: user._id,
        type: 'teacher'
      }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '1hr'
      });

      const link = `  https://felt-teacher.herokuapp.com/api/change-password?token=${token}`;
      (0, _sendgrid.passwordEmail)(Name, Email, link);
      res.status(200).send({
        message: 'Please Check Your Email For Next Step',
        link: link
      });
    }
  } catch (e) {
    res.status(400).send({
      message: "Unable to complete request"
    });
  }
}

async function passwordResetSchool(req, res) {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "You must supply an email"
      });
      return;
    }

    const email = req.body.email;
    const user = await _school.default.findOne({
      email
    });
    const Email = user.email;
    const Name = user.nameOfSchool;

    if (!user) {
      res.status(400).send({
        message: "User with this email not found"
      });
    } else {
      const token = _jsonwebtoken.default.sign({
        _id: user._id,
        type: 'school'
      }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '1hr'
      });

      const link = ` https://felt-teacher.herokuapp.com/api/change-password/school?token=${token}`;
      (0, _sendgrid.passwordEmail)(Name, Email, link);
      res.status(200).send({
        message: 'Please Check Your Email For Next Step'
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({
      message: "Unable to complete request"
    });
  }
}

async function passwordResetParent(req, res) {
  try {
    if (!req.body.email) {
      res.status(400).send({
        message: "You must supply an email"
      });
      return;
    }

    const email = req.body.email;
    const user = await _parent.default.findOne({
      email
    });
    const Email = user.email;
    const Name = user.nameOfParent;

    if (!user) {
      res.status(400).send({
        message: "User with this email not found"
      });
    } else {
      const token = _jsonwebtoken.default.sign({
        _id: user._id,
        type: 'parent'
      }, process.env.JWT_SECRETE_KEY, {
        expiresIn: '1hr'
      });

      const link = ` https://felt-teacher.herokuapp.com/api/change-password/parent?token=${token}`;
      (0, _sendgrid.passwordEmail)(Name, Email, link);
      res.status(200).send({
        message: 'Please Check Your Email For Next Step',
        link
      });
    }
  } catch (e) {
    res.status(400).send({
      message: "Unable to complete request"
    });
  }
}

async function confirmPasswordReset(req, res) {
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (!newPassword) {
    res.status(400).send({
      message: "Please Enter New Password"
    });
    return;
  } else if (!confirmPassword) {
    res.status(400).send({
      message: "Please Enter Confirm Password"
    });
    return;
  } else if (newPassword != confirmPassword) {
    res.status(400).send({
      message: "Password Do Not Match"
    });
    return;
  } else {
    const userNewHashed = await _bcrypt.default.hash(newPassword, 10);
    const queryString = (0, _jwtDecode.default)(req.query.token);
    const ID = queryString._id;

    if (queryString.type === 'teacher') {
      const teacher = await _teacher.default.findOneAndUpdate({
        _id: ID
      }, {
        $set: {
          password: userNewHashed
        }
      }, {
        new: true
      });
      const Name = teacher.fullname;
      const Email = teacher.email;
      (0, _sendgrid.SuccessfulPasswordReset)(Name, Email);
    } else if (queryString.type === 'school') {
      const school = await _school.default.findOneAndUpdate({
        _id: ID
      }, {
        $set: {
          password: userNewHashed
        }
      }, {
        new: true
      });
      const Name = school.nameOfSchool;
      const Email = school.email;
      (0, _sendgrid.SuccessfulPasswordReset)(Name, Email);
    } else {
      const parent = await _parent.default.findOneAndUpdate({
        _id: ID
      }, {
        $set: {
          password: userNewHashed
        }
      }, {
        new: true
      });
      const Name = parent.nameOfParent;
      const Email = parent.email;
      (0, _sendgrid.SuccessfulPasswordReset)(Name, Email);
    }

    res.status(200).send({
      message: "Password Reset Successful"
    });
  }
}
//# sourceMappingURL=passwordReset.js.map