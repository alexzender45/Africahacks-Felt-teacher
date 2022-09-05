import { BaseController } from '.';
const Vonage = require('@vonage/server-sdk');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import School from '../../model/sch';
import { throwError } from '../../utils/handleErrors';
import {send} from '../../utils/sendgrid';
dotConfig();

const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});

export class SchoolController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {

    const data = req.body;

    try {
      const generatedCode = Math.floor(
        100000 + Math.random() * 100000,
      ).toString();
      data.code = generatedCode;
      const newSchool = new School(data);
      const school = await newSchool.save();
      const token = await school.generateAuthToken();
      const body = { school, token };
      const mail = {
        to: school.email,
        subject: 'Felt Teacher Verification Code',
        from: {
          name: 'Felt Teacher Team',
          email: 'juniorefe45@gmail.com',
        },
        text: `Your Email Verification Code has been Sent to ${school.email}`,
        html: `<p>Hi ${school.nameOfSchool}</p>
              <br>
              <p>Please use this code below to verify your account</p>
              <br>
              <p><strong>Code:</strong> ${generatedCode}</p>
              <p>Thanks,</p>
              <p>Felt Teacher Team</p>
              `,
      };
      await send(mail);
      super.success(res, body, 'School Registration Successful', 201);
    } catch (e) {
    super.error(res, e);
    }
  }

  async verifyUser(req, res) {
    // We require clients to submit a request id (for identification) and a code (to check)
    if (!req.body.code) {
        res.status(400).send({message: "You must supply a `code` parameter"});
        return;
    }
    // Run the check against Vonage's servers
   const school = await School.findOne({code: req.body.code});
    if(school === null){
      return res.status(400).send({message: "Invalid Code"});
    }
    school.emailVerified = true;
    school.code = null;
    await school.save();
    super.success(res, school, 'Email Verified Successfully');
}

  async cancel(req, res){
    nexmo.verify.control({
      request_id: 'REQUEST_ID',
      cmd: 'cancel'
    }, (err, result) => {
      console.log(err ? err : result)
    });
  }

  async schoolLogin(req, res) {
    try {
      const { email, password} = req.body;
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
    if(req.user.approved !== true && req.user.status !== 'Approved'){
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    }else{
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
    if(req.user.approved !== true && req.user.status !== 'Approved'){
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    }else{
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
      if(user)
      return res.status(200).send(user);
    } catch (e) {
      super.error(res, e);
    }
  }


async adminApprovedSchools(req, res) {
  if(req.user.approved !== true && req.user.status !== 'Approved'){
    return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
  }else{
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
