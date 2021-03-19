import { BaseController } from '.';
//const Mailgun = require('mailgun-js');
const Vonage = require('@vonage/server-sdk');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import Parent from '../../model/parent.index';
import { throwError } from '../../utils/handleErrors';
dotConfig();

const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});

let REQUEST_ID;

// const api_key = process.env.API_KEY_MAILGUN;
// const domain = process.env.DOMAIN_MAILGUN;
// const from_who = process.env.FROM_WHO_MAILGUN;

export class ParentController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {

    try {
      if (!req.body.code) {
        res.status(400).send({ message: "You must supply a `code` to verify your number" })
        return;
      }
      // Run the check against Vonage's servers
      vonage.verify.check({
        request_id: REQUEST_ID,
        code: req.body.code
      }, (err, result) => {
        if (err) {
          res.status(500).send({ message: "Something went wrong" });
          return;
        }
      });
      const data = req.body;
      const newParent = new Parent(data);
      const parent = await newParent.save();
      const token = await parent.generateAuthToken();
      const body = { parent, token };

      super.success(res, body, 'Parent Registration Successful', 201);
    } catch (e) {
      supper.error(e);
    }
  }

  async sendCode(req, res) {
    vonage.verify.request({
      number: req.body.phone,
      // You can customize this to show the name of your company
      brand: 'Felt Teacher',
      // We could put `'6'` instead of `'4'` if we wanted a longer verification code
      code_length: '4'
    }, (err, result) => {
      if (err) {
        // If there was an error, return it to the client
        res.status(500).send(err.error_text);
      }
      REQUEST_ID = result.request_id;
      res.send(result)
    });
  }

  async cancel(req, res) {
    nexmo.verify.control({
      request_id: 'REQUEST_ID',
      cmd: 'cancel'
    }, (err, result) => {
      console.log(err ? err : result)
    });
  }

  async parentLogin(req, res) {
    try {
      const { phone, password } = req.body;
      const parent = await Parent.findByCredentials(phone, password);
      const token = await parent.generateAuthToken();
      const body = { parent, token };

      super.success(res, body, 'Login Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async parentLogOut(req, res) {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
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
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const parents = await Parent.find({});

        super.success(res, parents || [], 'Successfully Retrieved all Parents.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }
  async approvedParents(req, res) {
    try {
      const parents = await Parent.find({ approved: true });

      super.success(res, parents || [], 'Successfully Retrieved all Parents.');
    }
    catch (e) {
      super.error(res, e);
    }
  }

  async deleteAllParent(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        await Parent.deleteMany({});

        super.success(res, [], 'Delete Successful.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async fetchOneParent(req, res, next) {
    try {
      const user = await Parent.findById(req.params._id);
      if (!user) {
        return res.status(400).send({ error: 'Parent does not exist' });
      }
      if (user)
        return res.status(200).send(user);
    } catch (e) {
      super.error(res, e);
    }
  }


  async adminApprovedParents(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const updates = Object.keys(req.body);
        const allowedUpdates = [
          'approved',
          'status',
          'role'
        ];
        const isValidUpdate = updates.every((update) => {
          return allowedUpdates.includes(update);
        });

        if (!isValidUpdate) {
          throwError(400, 'Invalid Field.');
        }

        const parentUpdate = req.body;

        updates.map((update) => {
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
      const allowedUpdates = [
        'Phone',
        'password',
        'address',
        'nameOfParent',
        'state',
        'country',
        'about',
        'requirements'
      ];
      const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
      });

      if (!isValidUpdate) {
        throwError(400, 'Invalid Field.');
      }

      const parentUpdate = req.body;

      updates.map((update) => {
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

