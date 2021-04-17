import { BaseController } from '.';
import Parent from '../../model/parent.index';
import { throwError } from '../../utils/handleErrors';
import { vonage } from '../../utils/verifyVonage';
import { sendEmail, deleteAccountEmail } from '../../utils/sendgrid'

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
            const newParent = new Parent(data);
            const parent = await newParent.save();
            const token = await parent.generateAuthToken();
            const body = { parent, token };
            const Email = parent.email;
            sendEmail(Email);
            super.success(res, body, 'Parent Registration Successful', 201);
          }
        }
      });
    } catch (e) {
      super.error(e);
    }
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
  async approvedParents(req, res) {
    try {
      const parents = await Parent.find({ approved: true });

      super.success(res, parents || [], 'Successfully Retrieved all Parents.');
    }
    catch (e) {
      super.error(res, e);
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
      const Name = parent.nameOfParent;
      const Email = parent.email;
      deleteAccountEmail(Name, Email);
      super.success(res, parent, 'Delete Successful');
    } catch (e) {
      super.error(res, e);
    }
  }
}

