"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParentController = void 0;

var _ = require(".");

var _parent = _interopRequireDefault(require("../../model/parent.index"));

var _handleErrors = require("../../utils/handleErrors");

var _verifyVonage = require("../../utils/verifyVonage");

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ParentController extends _.BaseController {
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
            const newParent = new _parent.default(data);
            const parent = await newParent.save();
            const token = await parent.generateAuthToken();
            const body = {
              parent,
              token
            };
            const Email = parent.email;
            (0, _sendgrid.sendEmail)(Email);
            super.success(res, body, 'Parent Registration Successful', 201);
          }
        }
      });
    } catch (e) {
      super.error(e);
    }
  }

  async parentLogin(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const parent = await _parent.default.findByCredentials(email, password);
      const token = await parent.generateAuthToken();
      const body = {
        parent,
        token
      };
      super.success(res, body, 'Login Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async parentLogOut(req, res) {
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

  async approvedParents(req, res) {
    try {
      const parents = await _parent.default.find({
        approved: true
      });
      super.success(res, parents || [], 'Successfully Retrieved all Parents.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async fetchOneParent(req, res, next) {
    try {
      const user = await _parent.default.findById(req.params._id);

      if (!user) {
        return res.status(400).send({
          error: 'Parent does not exist'
        });
      }

      if (user) return res.status(200).send(user);
    } catch (e) {
      super.error(res, e);
    }
  }

  async updateParent(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['phone', 'password', 'address', 'nameOfParent', 'state', 'country', 'about', 'requirements'];
      const isValidUpdate = updates.every(update => {
        return allowedUpdates.includes(update);
      });

      if (!isValidUpdate) {
        (0, _handleErrors.throwError)(400, 'Invalid Field.');
      }

      const parentUpdate = req.body;
      updates.map(update => {
        req.user[update] = parentUpdate[update];
      });
      const updatedParent = await req.user.save();
      super.success(res, updatedParent, 'Update Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteOneParent(req, res) {
    try {
      const parent = await req.user.remove();
      const Name = parent.nameOfParent;
      const Email = parent.email;
      (0, _sendgrid.deleteAccountEmail)(Name, Email);
      super.success(res, parent, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

}

exports.ParentController = ParentController;
//# sourceMappingURL=parent.controller.js.map