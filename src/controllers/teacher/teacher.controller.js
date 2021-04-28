import { BaseController } from '.';
import Teacher from '../../model/teacher.model';
import { throwError } from '../../utils/handleErrors';
import { vonage } from '../../utils/verifyVonage';
import { sendEmail, deleteAccountEmail } from '../../utils/sendgrid';

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
            const newTeacher = new Teacher(data);
            const teacher = await newTeacher.save();
            const token = await teacher.generateAuthToken();
            const body = { teacher, token };
            const Email = teacher.email;
            sendEmail(Email);
            super.success(res, body, 'Teacher Registration Successful', 201);
          }
        }
      })
    } catch (e) {
      super.error(res, 400, e);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const teacher = await Teacher.findByCredentials(email, password);
      const token = await teacher.generateAuthToken();
      const body = { teacher, token };
      super.success(res, body, 'Login Successful');
    } catch (e) {
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
      const Name = teacher.fullname;
      const Email = teacher.email;
      deleteAccountEmail(Name, Email);
      super.success(res, teacher, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
