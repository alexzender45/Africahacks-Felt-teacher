const Vonage = require('@vonage/server-sdk');
import { BaseController } from '.';
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
import Teacher from '../../model/teacher.model';
import { throwError } from '../../utils/handleErrors';

dotConfig();

const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});

let REQUEST_ID;

export class TeacherController extends BaseController {
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
      const newTeacher = new Teacher(data);
      const teacher = await newTeacher.save();
      const token = await teacher.generateAuthToken();
      const body = { teacher, token };
      super.success(res, body, 'Teacher Registration Successful', 201);
    } catch (e) {
      console.log(e)
      super.error(res, 400, e);
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

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const teacher = await Teacher.findByCredentials(email, password);
      const token = await teacher.generateAuthToken();
      const body = { teacher, token };

      super.success(res, body, 'Login Successful');
    } catch (e) {
      console.log(e)
      super.error(res, e);
    }
  }

  async logOut(req, res) {
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

  async readAll(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({});

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInEnglish(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'English' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInPhysics(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Physics' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }
  async approvedTeachersInCommerce(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Commerce' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }
  async approvedTeachersInEnglishLiterature(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'English Literature' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInIslamicReligiousStudies(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Islamic Religious Studies' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInMathematics(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Mathematics' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInBiology(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Biology' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }
  async approvedTeachersInChemistry(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Chemistry' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInGeography(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Geography' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInGovernment(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Government' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInAccount(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Account' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInChristianReligiousStudies(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'ChristianReligiousStudies' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInEconomics(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Economics' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInHistory(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'History' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersInCivicEducation(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Civic Education' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersForPrimary(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Primary Class ' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async approvedTeachersForJuniorSecondary(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const teachers = await Teacher.find({ approved: true, $or: [{ subjectOrClass: 'Junior Secondary Class ' }] });

        super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async deleteAll(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        await Teacher.deleteMany({});

        super.success(res, [], 'Delete Successful.');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async fetchOne(req, res, next) {
    try {
      const user = await Teacher.findById(req.params._id);
      if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
      }
      if (user)
        return res.status(200).json({
          user
        });
    } catch (e) {
      super.error(res, e);
    }
  }

  async adminApprovedTeachers(req, res) {
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
        const isValidUpdate = updates.every((update, link) => {
          return allowedUpdates.includes(update);
        });

        if (!isValidUpdate) {
          throwError(400, 'Invalid Field.');
        }

        const teacherUpdate = req.body;

        updates.map((update) => {
          req.user[update] = teacherUpdate[update];
        });

        const updatedTeacher = await req.user.save();
        super.success(res, updatedTeacher, 'Update Successful');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async update(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        'phone',
        'fullname',
        'password',
        'yearsOfExperience',
        'nameOfSchool',
        'courseOfStudy',
        'dateOfBirth',
        'state',
        'country',
        'subjectOrClass',
        'address',
        'approved',
        'about'
      ];
      const isValidUpdate = updates.every((update) => {
        return allowedUpdates.includes(update);
      });

      if (!isValidUpdate) {
        throwError(400, 'Invalid Field.');
      }

      const teacherUpdate = req.body;

      updates.map((update) => {
        req.user[update] = teacherUpdate[update];
      });
      const updatedSchool = await req.user.save();
      super.success(res, updatedSchool, 'Update Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteOne(req, res) {
    try {
      const teacher = await req.user.remove();

      super.success(res, teacher, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
