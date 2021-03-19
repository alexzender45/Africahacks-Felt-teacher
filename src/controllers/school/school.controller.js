import { BaseController } from '.';
const Vonage = require('@vonage/server-sdk');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import School from '../../model/sch';
import { throwError } from '../../utils/handleErrors';
dotConfig();

const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});

let REQUEST_ID;

export class SchoolController extends BaseController {
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
      const newSchool = new School(data);
      const school = await newSchool.save();
      const token = await school.generateAuthToken();
      const body = { school, token };
      super.success(res, body, 'School Registration Successful', 201);
    } catch (e) {
      super.error(e);
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

  async schoolLogin(req, res) {
    try {
      const { email, password } = req.body;
      const school = await School.findByCredentials(email, password);
      const token = await school.generateAuthToken();
      const body = { school, token };

      super.success(res, body, 'Login Successful');
    } catch (e) {
      console.log(e)
      super.error(res, e);
    }
  }

  async schoolLogOut(req, res) {
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

  async readAllSchool(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const schools = await School.find({});

        super.success(res, schools || [], 'Successfully Retrieved all Schools.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }
  async approvedSchools(req, res) {
    try {
      const schools = await School.find({ approved: true });

      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    }
    catch (e) {
      super.error(res, e);
    }
  }

  async deleteAllSchool(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        await School.deleteMany({});

        super.success(res, [], 'Delete Successful.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async fetchOne(req, res, next) {
    try {
      const user = await School.findById(req.params._id);
      if (!user) {
        return res.status(400).send({ error: 'School does not exist' });
      }
      if (user)
        return res.status(200).send(user);
    } catch (e) {
      super.error(res, e);
    }
  }


  async adminApprovedSchools(req, res) {
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

        const schoolUpdate = req.body;

        updates.map((update) => {
          req.user[update] = schoolUpdate[update];
        });

        const updatedSchool = await req.user.save();
        super.success(res, updatedSchool, 'Update Successful');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async update(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        'Phone',
        'RCNumber',
        'password',
        'address',
        'schoolName',
        'ownerOfSchool',
        'neededTeacher',
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

      const schoolUpdate = req.body;

      updates.map((update) => {
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

      super.success(res, school, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
