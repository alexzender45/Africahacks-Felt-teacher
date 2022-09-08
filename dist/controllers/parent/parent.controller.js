"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ParentController = void 0;

var _ = require(".");

var _dotenv = require("dotenv");

require("dotenv/config");

var _parent = _interopRequireDefault(require("../../model/parent.index"));

var _handleErrors = require("../../utils/handleErrors");

var _sendgrid = require("../../utils/sendgrid");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Mailgun = require('mailgun-js');

const Vonage = require('@vonage/server-sdk');

(0, _dotenv.config)();
const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});
const api_key = process.env.API_KEY_MAILGUN;
const domain = process.env.DOMAIN_MAILGUN;
const from_who = process.env.FROM_WHO_MAILGUN;

class ParentController extends _.BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    const data = req.body;

    try {
      const generatedCode = Math.floor(100000 + Math.random() * 100000).toString();
      data.code = generatedCode;
      const newParent = new _parent.default(data);
      const parent = await newParent.save();
      const token = await parent.generateAuthToken();
      const body = {
        parent,
        token
      };
      const mail = {
        to: parent.email,
        subject: 'Felt Teacher Verification Code',
        from: {
          name: 'Felt Teacher Team',
          email: 'juniorefe45@gmail.com'
        },
        text: `Your Email Verification Code has been Sent to ${parent.email}`,
        html: `<p>Hi ${parent.nameOfParent}</p>
              <br>
              <p>Please use this code below to verify your account</p>
              <br>
              <p><strong>Code:</strong> ${generatedCode}</p>
              <p>Thanks,</p>
              <p>Felt Teacher Team</p>
              `
      };
      await (0, _sendgrid.send)(mail);
      super.success(res, body, 'Parent Registration Successful', 201);
    } catch (e) {
      super.error(res, e);
    }
  }

  async verifyUser(req, res) {
    // We require clients to submit a request id (for identification) and a code (to check)
    if (!req.body.code) {
      res.status(400).send({
        message: "You must supply a `code` parameter"
      });
      return;
    } // Run the check against Vonage's servers


    const parent = await _parent.default.findOne({
      code: req.body.code
    });

    if (parent === null) {
      return res.status(400).send({
        message: "Invalid Code"
      });
    }

    parent.emailVerified = true;
    parent.code = null;
    await parent.save();
    super.success(res, parent, 'Email Verified Successfully');
  }

  async cancel(req, res) {
    nexmo.verify.control({
      request_id: 'REQUEST_ID',
      cmd: 'cancel'
    }, (err, result) => {
      console.log(err ? err : result);
    });
  }

  async parentLogin(req, res) {
    try {
      const {
        phone,
        password
      } = req.body;
      const parent = await _parent.default.findByCredentials(phone, password);
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

  async readAllParent(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        const parents = await _parent.default.find({});
        super.success(res, parents || [], 'Successfully Retrieved all Parents.');
      } catch (e) {
        super.error(res, e);
      }
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

  async deleteAllParent(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        await _parent.default.deleteMany({});
        super.success(res, [], 'Delete Successful.');
      } catch (e) {
        super.error(res, e);
      }
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

  async adminApprovedParents(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({
        message: 'You Are Not Approved To Perform This Action'
      });
    } else {
      try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['approved', 'status', 'role'];
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
  }

  async updateParent(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ['Phone', 'password', 'address', 'nameOfParent', 'state', 'country', 'about', 'requirements'];
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
      super.success(res, parent, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

}

exports.ParentController = ParentController;
//# sourceMappingURL=parent.controller.js.map