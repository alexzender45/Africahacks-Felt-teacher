"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SchoolController = void 0;

var _ = require(".");

var _sch = _interopRequireDefault(require("../../model/sch"));

var _handleErrors = require("../../utils/handleErrors");

var _verifyVonage = require("../../utils/verifyVonage");

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SchoolController extends _.BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    try {
      if (!req.body.code) {
        res.status(400).send({
          message: "You must supply a `code` to verify your number"
        });
        return;
      }

      let code = req.body.code;
      let requestId = req.body.requestId;

      _verifyVonage.vonage.verify.check({
        request_id: requestId,
        code: code
      }, async (err, result) => {
        if (err) {
          res.status(500).send({
            message: 'Please Provide a Code'
          });
        } else if (result.status != 0) {
          res.status(500).send({
            message: 'Invalid Code'
          });
        } else {
          if (result && result.status == '0') {
            const data = req.body;
            const newSchool = new _sch.default(data);
            const school = await newSchool.save();
            const token = await school.generateAuthToken();
            const body = {
              school,
              token
            };
            const Email = school.email;
            (0, _sendgrid.sendEmail)(Email);
            super.success(res, body, 'School Registration Successful', 201);
          }
        }
      });
    } catch (e) {
      super.error(res, 400, e);
    }
  }

  async schoolLogin(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const school = await _sch.default.findByCredentials(email, password);
      const token = await school.generateAuthToken();
      const body = {
        school,
        token
      };
      super.success(res, body, 'Login Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async schoolLogOut(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter(token => {
        return token.token !== req.token;
      });
      await req.user.save();
      super.success(res, [], 'Logout Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedSchools(req, res) {
    try {
      const schools = await _sch.default.find({
        approved: true
      });
      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async fetchOne(req, res, next) {
    try {
      const user = await _sch.default.findById(req.params._id);

      if (!user) {
        return res.status(400).send({
          error: 'School does not exist'
        });
      }

      if (user) return res.status(200).send(user);
    } catch (e) {
      super.error(res, e);
    }
  }

  async update(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['phone', 'RCNumber', 'password', 'address', 'nameOfSchool', 'ownerOfSchool', 'state', 'country', 'about', 'requirements'];
      const isValidUpdate = updates.every(update => {
        return allowedUpdates.includes(update);
      });

      if (!isValidUpdate) {
        (0, _handleErrors.throwError)(400, 'Invalid Field.');
      }

      const schoolUpdate = req.body;
      updates.map(update => {
        req.user[update] = schoolUpdate[update];
      });
      const updatedSchool = await req.user.save();
      super.success(res, updatedSchool, 'Update Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteOne(req, res) {
    try {
      const school = await req.user.remove();
      const Name = school.nameOfSchool;
      const Email = school.email;
      (0, _sendgrid.deleteAccountEmail)(Name, Email);
      super.success(res, school, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

}

exports.SchoolController = SchoolController;
//# sourceMappingURL=school.controller.js.map