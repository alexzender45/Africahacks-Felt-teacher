import { BaseController } from '.';
import Admin from '../../model/admin.model';
import Parent from '../../model/parent.model';
import Teacher from '../../model/teacher.model';
import School from '../../model/school.model';
import { approveUsers, deleteAccountEmail } from '../../utils/sendgrid';

export class AdminController extends BaseController {
  constructor() {
    super();
  }

  async registerAdmin(req, res) {
    try {
      const data = req.body;
      const newAdmin = new Admin(data);
      const admin = await newAdmin.save();
      const token = await admin.generateAuthToken();
      const body = { admin, token };
      super.success(res, body, 'Admin Created  Successful', 201);
    } catch (e) {
      super.error(res, e);
    }
  }

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findByCredentials(email, password);
      const token = await admin.generateAuthToken();
      const body = { admin, token };
      super.success(res, body, 'Login Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async adminLogout(req, res) {
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

  async unApprovedParents(req, res) {
    try {
      const parents = await Parent.find({ approved: false });

      super.success(res, parents || [], 'Successfully Retrieved all Unapproved Parents.');
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

  async fetchOneParentByEmail(req, res, next) {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).send({ error: 'Please Type in the email of the Parent' });
      } else {
        const user = await Parent.find({ email: email });
        if (!user) {
          return res.status(404).send({ error: 'Parent does not exist' });
        }
        if (user)
          return res.status(200).send(user);
      }
    } catch (e) {
      super.error(res, e);
    }
  }

  async adminApprovedParents(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const userToApprove = await Parent.findByIdAndUpdate({ _id: req.params._id },
          {
            $set: { approved: true, status: 'Approved' },
          }, {
          new: true,
        })
        const Name = userToApprove.nameOfParent;
        const Email = userToApprove.email;
        const Link = userToApprove.link;
        approveUsers(Name, Email, Link);
        super.success(res, 'Parent Approved Successfully');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async deleteOneParent(req, res) {
    try {
      const parent = await Parent.findByIdAndDelete(req.params._id);
      const Name = parent.nameOfParent;
      const Email = parent.email;
      deleteAccountEmail(Name, Email);
      super.success(res, parent, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  // Teacher Admin Controller
  async readAllTeachers(req, res) {
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

  async deleteAllTeachers(req, res) {
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

  async adminApprovedTeachers(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const userToApprove = await Teacher.findByIdAndUpdate({ _id: req.params._id },
          {
            $set: { approved: true, status: 'Approved' },
          }, {
          new: true,
        })
        const Name = userToApprove.fullname;
        const Email = userToApprove.email;
        const Link = userToApprove.Link;
        approveUsers(Name, Email, Link);
        super.success(res, 'Teacher Approved Successfully');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async fetchOneTeacher(req, res, next) {
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

  async fetchOneTeacherByEmail(req, res, next) {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).send({ error: 'Please Type in the email of the Teacher' });
      } else {
        const user = await Teacher.find({ email: email });
        if (!user) {
          return res.status(404).send({ error: 'Teacher does not exist' });
        }
        if (user)
          return res.status(200).send(user);
      }
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteOneTeacher(req, res) {
    try {
      const teacher = await Teacher.findByIdAndDelete(req.params._id);
      const Name = teacher.fullname;
      const Email = teacher.email;
      deleteAccountEmail(Name, Email);
      super.success(res, teacher, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedTeachers(req, res) {
    try {
      const parents = await Teacher.find({ approved: true });

      super.success(res, parents || [], 'Successfully Retrieved all Parents.');
    }
    catch (e) {
      super.error(res, e);
    }
  }

  async unApprovedTeachers(req, res) {
    try {
      const teachers = await Teacher.find({ approved: false });

      super.success(res, teachers || [], 'Successfully Retrieved all Unapproved Teachers.');
    }
    catch (e) {
      super.error(res, e);
    }
  }

  // School Admin Controller 

  async deleteOneSchool(req, res) {
    try {
      const school = await School.findByIdAndDelete(req.params._id);
      const Name = school.nameOfSchool;
      const Email = school.email;
      deleteAccountEmail(Name, Email);
      super.success(res, school, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async adminApprovedSchools(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      try {
        const userToApprove = await School.findByIdAndUpdate({ _id: req.params._id },
          {
            $set: { approved: true, status: 'Approved' },
          }, {
          new: true,
        })
        const Name = userToApprove.nameOfSchool;
        const Email = userToApprove.email;
        const Link = userToApprove.link;
        approveUsers(Name, Email, Link);
        super.success(res, 'School Approved Successfully');
      } catch (e) {
        super.error(res, e);
      }
    }
  }

  async fetchOneSchool(req, res, next) {
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

  async fetchOneSchoolByEmail(req, res, next) {
    try {
      const email = req.body.email;
      if (!email) {
        return res.status(400).send({ error: 'Please Type in the email of the School' });
      } else {
        const user = await School.find({ email: email });
        if (!user) {
          return res.status(404).send({ error: 'School does not exist' });
        }
        if (user)
          return res.status(200).send(user);
      }
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteAllSchools(req, res) {
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
  async approvedSchools(req, res) {
    try {
      const schools = await School.find({ approved: true });

      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    }
    catch (e) {
      super.error(res, e);
    }
  }

  async unApprovedSchools(req, res) {
    try {
      const schools = await School.find({ approved: false });

      super.success(res, schools || [], 'Successfully Retrieved all Unapproved Schools.');
    }
    catch (e) {
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
}
