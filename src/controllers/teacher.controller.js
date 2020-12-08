import { BaseController } from '.';
import Teacher from '../model/teacher.model';
import { throwError } from '../utils/handleErrors';

export class TeacherController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.image = req.file.path;
      }
      if(data.password.length < 6){
        res.send({
          staus: 'error',
          error: 'Password cannot be less than six',
        });
      }
      
      const newTeacher = new Teacher(data);
      const teacher = await newTeacher.save();
      const token = await teacher.generateAuthToken();
      const body = { teacher, token };

      super.success(res, body, 'Teacher Registration Successful', 201);
    } catch (e) {
      super.error(res, e);
    }
  }

  async login(req, res) {
    try {
      const { username, password} = req.body;
      const teacher = await Teacher.findByCredentials(username, password);
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
    try {
      const teachers = await Teacher.find({});

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInEnglish(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'English'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInPhysics(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Physics'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInCommerce(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Commerce'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }
  async approvedTeachersInEnglishLiterature(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'EnglishLiterature'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInIslamicReligiousStudies(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'IslamicReligiousStudies'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInMathematics(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Mathematics'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInBiology(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Biology'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInChemistry(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Chemistry'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInGeography(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Geography'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInGovernment(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Government'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInAccount(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Account'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInChristianReligiousStudies(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'ChristianReligiousStudies'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }


  async approvedTeachersInEconomics(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'Economis'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInHistory(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'History'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachersInCivicEducation(req, res) {
    try {
      const teachers = await Teacher.find({ approved: true, $or:[{interested_subject : 'CivicEducation'}] });

      super.success(res, teachers || [], 'Successfully Retrieved all Teachers.');
    } catch (e) {
      super.error(res, e);
    }
  }
  async deleteAll(req, res) {
    try {
      await Teacher.deleteMany({});

      super.success(res, [], 'Delete Successful.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async readOne(req, res) {
    try {
      super.success(res, req.user, 'Successfully Retrieved Users Profile.');
    } catch (e) {
      super.error(res, e);
    }
  }
//
async adminApprovedTeachers(req, res) {
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

    const teacherUpdate = req.body;

    updates.map((update) => {
      req.user[update] = teacherUpdate[update];
    });

    if (req.file) {
      req.user.image = req.file.path;
    }
    const updatedTeacher = await req.user.save();
    super.success(res, updatedTeacher, 'Update Successful');
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
        'username',
        'email',
        'password',
        'yearsOfExperience',
        'school',
        'levelOfEducation',
        'courseOfStudy',
        'gpa',
        'dateOfBirth',
        'image',
        'state',
        'country',
        'interested_subject',
        'address',
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

      if (req.file) {
        req.user.image = req.file.path;
      }
      const updatedTeacher = await req.user.save();
      super.success(res, updatedTeacher, 'Update Successful');
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
