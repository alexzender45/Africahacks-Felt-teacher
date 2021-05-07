import dotenv from 'dotenv';
import { BaseController } from '.';
import Parent from '../../model/parent.model';
const cloud = require("../../server/cloudinaryConfig");
import { completeProfile } from '../../utils/sendgrid';
dotenv.config();

export class UploadImage extends BaseController {
  constructor() {
    super();
  }

  async uploadPicture(req, res) {
    const user = await Parent.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    }
    let attempt = {
      imageName: req.files[0].originalname,
      imageUrl: req.files[0].path,
    };
    cloud.uploads(attempt.imageUrl).then(async (result) => {
      const view = result.url;
      await Parent.findOneAndUpdate({ _id: user._id },
        { $set: { image: view, link: ` https://felt-teacher.herokuapp.com/api/parents/${user._id}` }, }, {
        new: true,
      })
      const Name = user.nameOfParent;
      const Email = user.email;
      const Account = 'Parent'
      completeProfile(Name, Email, Account);
      return res.status(200).json({
        message: "Uploaded Successfully"
      });
    })
  } catch(e) {

    super.error(res, e);
  }
}

