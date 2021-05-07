import dotenv from 'dotenv';
import { BaseController } from '.';
import Teacher from '../../model/teacher.model';
const cloud = require("../../server/cloudinaryConfig");
import { completeProfile } from '../../utils/sendgrid';
dotenv.config();

export class UploadVideoAndImage extends BaseController {
  constructor() {
    super();
  }


  // Upload Pictures
  async changePicture(req, res) {
    const user = await Teacher.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    }
    let attempt = {
      imageName: req.files[0].originalname,
      imageUrl: req.files[0].path,
    };
    cloud.uploads(attempt.imageUrl).then(async (result) => {
      const view = result.url;
      await Teacher.findOneAndUpdate({ _id: user._id },
        { $set: { image: view, link: `https://felt-teacher.herokuapp.com/api/teachers/${btoa(user._id)}` }, }, {
        new: true,
      })
      return res.status(200).json({
        message: "Uploaded Successfully"
      });
    })
  } catch(e) {
    console.log(e)
    super.error(res, e);
  }

  // Upload Video
  async changeVideo(req, res) {
    const user = await Teacher.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    }
    let attempt = {
      videoName: req.files[0].originalname,
      videoUrl: req.files[0].path,
    };
    cloud.uploads(attempt.videoUrl).then(async (result) => {
      const view = result.url;
      await Teacher.findOneAndUpdate({ _id: user._id },
        { $set: { video: view }, }, {
        new: true,
      })
      const Name = user.fullname;
      const Email = user.email;
      const Account = 'Teacher'
      completeProfile(Name, Email, Account);
      return res.status(200).json({
        message: "Uploaded Video Successfully"
      });
    })
  } catch(e) {
    super.error(res, e);
  }


  // Upload resume
  async UploadResume(req, res) {
    const user = await Teacher.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    }
    let attempt = {
      resumeName: req.files[0].originalname,
      imageUrl: req.files[0].path,
    };
    cloud.uploads(attempt.imageUrl).then(async (result) => {
      const view = result.url;
      await Teacher.findOneAndUpdate({ _id: user._id },
        { $set: { resume: view }, }, {
        new: true,
      });
      return res.status(200).json({
        message: "Uploaded Cv Successfully"
      });
    })
  } catch(e) {
    super.error(res, e);
  }
}

