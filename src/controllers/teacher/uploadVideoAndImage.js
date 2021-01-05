import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { BaseController } from '.';
import Teacher from '../../model/teacher.model';
import { throwError } from '../../utils/handleErrors';
const cloud = require("../../server/cloudinaryConfig");
const ObjectId = require('mongodb').ObjectID;
dotenv.config();

export class UploadVideoAndImage extends BaseController {
    constructor() {
      super();
    }

    async changePicture(req, res){
        const user = await Teacher.findById(req.params._id);
      if (!user) {
        return res.status(400).send({ error: 'User does not exist' });
      } 
      let attempt = {
        imageName: req.files[0].originalname,
        imageUrl: req.files[0].path,
      };
        cloud.uploads(attempt.imageUrl).then((result) => {
          const view = result.url;
          Teacher.updateOne({ "_id":ObjectId(user._id)},
      { $set: { "image": view, "link":`http://localhost:6060/api/teachers/${user._id}` } }, function (err) {
        console.log(err)
      })
            console.log(result.url)
            return res.status(200).json({
              user
             });
        })
    } catch (e) {
      console.log(e)
      super.error(res, e);
    }
  
    async changeVideo(req, res){
      const user = await Teacher.findById(req.params._id);
    if (!user) {
      return res.status(400).send({ error: 'User does not exist' });
    } 
    let attempt = {
      videoName: req.files[0].originalname,
      videoUrl: req.files[0].path,
    };
      cloud.uploads(attempt.videoUrl).then((result) => {
        const view = result.url;
        Teacher.updateOne({ "_id":ObjectId(user._id)},
    { $set: { "video": view} }, function (err) {
      console.log(err)
    })
          console.log(result.url)
          return res.status(200).json({
            user
           });
      })
  } catch (e) {
    console.log(e)
    super.error(res, e);
  }
}

