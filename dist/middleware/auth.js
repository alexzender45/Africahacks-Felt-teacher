"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = authenticate;
exports.decodeJwtToken = decodeJwtToken;
exports.getUserTeacherPayload = getUserTeacherPayload;
exports.getUserSchoolPayload = getUserSchoolPayload;
exports.getUserModratorPayload = getUserModratorPayload;
exports.getUserParentPayload = getUserParentPayload;
exports.userPayload = userPayload;
exports.permit = permit;

var _dotenv = require("dotenv");

require("dotenv/config");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _teacher = _interopRequireDefault(require("../model/teacher.model"));

var _school = _interopRequireDefault(require("../model/school.model"));

var _parent = _interopRequireDefault(require("../model/parent.model"));

var _admin = _interopRequireDefault(require("../model/admin.model"));

var _handleErrors = require("../utils/handleErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();

async function authenticate(req, res, next) {
  try {
    const jwtPayload = decodeJwtToken(req);

    if (jwtPayload.type === "teacher") {
      const user = await getUserTeacherPayload(jwtPayload);
      req.token = jwtPayload.token;
      req.user = user;
      next();
    } else if (jwtPayload.type === "school") {
      const user = await getUserSchoolPayload(jwtPayload);
      req.token = jwtPayload.token;
      req.user = user;
      next();
    } else if (jwtPayload.type === "modrator") {
      const user = await getUserModratorPayload(jwtPayload);
      req.token = jwtPayload.token;
      req.user = user;
      next();
    } else if (jwtPayload.type === "parent") {
      const user = await getUserParentPayload(jwtPayload);
      req.token = jwtPayload.token;
      req.user = user;
      next();
    }
  } catch (e) {
    res.status(401).send({
      error: {
        message: e.message
      }
    });
  }
}

function decodeJwtToken(req) {
  const requestHeaderAuthorization = req.headers.authorization;

  if (!requestHeaderAuthorization) {
    (0, _handleErrors.throwError)(401, 'Authentication Failed. Please login');
  }

  const [authBearer, token] = requestHeaderAuthorization.split(' ');

  if (authBearer !== 'Bearer') {
    throw new Error('Authentication Failed');
  }

  const jwtPayload = _jsonwebtoken.default.verify(token, process.env.JWT_SECRETE_KEY);

  jwtPayload.token = token;
  return jwtPayload;
}

function getUserTeacherPayload(payload) {
  const user = userPayload(_teacher.default, payload);
  return user;
}

function getUserSchoolPayload(payload) {
  const user = userPayload(_school.default, payload);
  return user;
}

function getUserModratorPayload(payload) {
  const user = userPayload(_admin.default, payload);
  return user;
}

function getUserParentPayload(payload) {
  const user = userPayload(_parent.default, payload);
  return user;
}

async function userPayload(userModel, payload) {
  const user = await userModel.findOne({
    _id: payload._id
  });

  if (!user) {
    (0, _handleErrors.throwError)(401, 'Access denied. Please login or create an account');
  }

  return user;
}

function permit(users) {
  return (req, res, next) => {
    const isAuthorized = users.includes(req.user.role);

    if (!isAuthorized) {
      return res.status(403).send({
        error: {
          message: 'Unauthorized Access. Contact the admin.'
        }
      });
    }

    next();
  };
}
//# sourceMappingURL=auth.js.map