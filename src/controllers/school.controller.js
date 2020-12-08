import { BaseController } from '.';
import School from '../model/school.model';
import { throwError } from '../utils/handleErrors';

export class SchoolController extends BaseController {
  constructor() {
    super();
  }

  async register(req, res) {

    const data = req.body;

      if (req.file) {
        data.image = req.file.path;
      }

    try {
      const newSchool = new School(data);
      const school = await newSchool.save();
      const token = await school.generateAuthToken();
      const body = { school, token };

      super.success(res, body, 'School Registration Successful', 201);
    } catch (e) {
      super.error(res, e);
    }
  }

  async login(req, res) {
    try {
      const { loginkey, password} = req.body;
      const school = await School.findByCredentials(loginkey, password);
      const token = await school.generateAuthToken();
      const body = { school, token };

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
      const schools = await School.find({});

      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async approvedSchools(req, res) {
    try {
      const schools = await School.find({ approved: true });

      super.success(res, schools || [], 'Successfully Retrieved all Schools.');
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteAll(req, res) {
    try {
      await School.deleteMany({});

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
async adminApprovedSchools(req, res) {
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

    if (req.file) {
      req.user.image = req.file.path;
    }
    const updatedSchool = await req.user.save();
    super.success(res, updatedSchool, 'Update Successful');
  } catch (e) {
    super.error(res, e);
  }
}

  async update(req, res) {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = [
        'schoolPhone',
        'schoolEmail',
        'schoolRegistrationNo',
        'password',
        'schoolAddress',
        'schoolName',
        'ownerOfSchool',
        'neededTeacher',
        'image',
        'state',
        'country',
        'aboutSchool',
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

      if (req.file) {
        req.user.image = req.file.path;
      }
      const updatedSchool = await req.user.save();
      super.success(res, updatedSchool, 'Update Successful');
    } catch (e) {
      super.error(res, e);
    }
  }

  async deleteOne(req, res) {
    try {
      const school = await req.user.remove();

      super.success(res, teacher, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}
