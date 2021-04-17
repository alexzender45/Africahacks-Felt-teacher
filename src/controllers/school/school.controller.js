import { BaseController } from '.';
import School from '../../model/sch';
import { throwError } from '../../utils/handleErrors';
import { vonage } from '../../utils/verifyVonage';
import { sendEmail, deleteAccountEmail } from '../../utils/sendgrid'

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
      let code = req.body.code;
      let requestId = req.body.requestId;
      vonage.verify.check({ request_id: requestId, code: code }, async (err, result) => {
        if (err) {
          res.status(500).send({ message: 'Please Provide a Code' });
        } else if (result.status != 0) {
          res.status(500).send({ message: 'Invalid Code' });
        } else {
          if (result && result.status == '0') {
            const data = req.body;
            const newSchool = new School(data);
            const school = await newSchool.save();
            const token = await school.generateAuthToken();
            const body = { school, token };
            const Email = school.email;
            sendEmail(Email);
            super.success(res, body, 'School Registration Successful', 201);
          }
        }
      });
    } catch (e) {
      super.error(res, 400, e);
    }
  };

  async schoolLogin(req, res) {
    try {
      const { email, password } = req.body;
      const school = await School.findByCredentials(email, password);
      const token = await school.generateAuthToken();
      const body = { school, token };

      super.success(res, body, 'Login Successful');
    } catch (e) {
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

  async approvedSchools(req, res) {
    try {
      const schools = await School.find({ approved: true });

      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    }
    catch (e) {
      super.error(res, e);
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

  async update(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        'phone',
        'RCNumber',
        'password',
        'address',
        'nameOfSchool',
        'ownerOfSchool',
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
      const Name = school.nameOfSchool;
      const Email = school.email;
      deleteAccountEmail(Name, Email);
      super.success(res, school, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
