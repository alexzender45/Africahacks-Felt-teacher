const Vonage = require('@vonage/server-sdk');
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { BaseController } from '.';
import Teacher from '../../model/teacher.model';
import School from '../../model/school.model';
import { throwError } from '../../utils/handleErrors';
dotenv.config();

const vonage = new Vonage({
    apiKey: process.env.API_KEY_VONAGEAPP,
    apiSecret: process.env.API_SECRET_VONAGEAPP
  });

export class Connect extends BaseController {
    constructor() {
      super();
    }
    async connectWithApprovedTeacher (req, res){
        if(req.user.approved !== true && req.user.status !== 'Approved'){
            return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
          }else{
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        const decoded = jwt.verify(token[1], 'jsonwebtokenhack');
        if(decoded.type === "teacher"){
          const visitor = await Teacher.findById(decoded._id)
           if(visitor.connectPoint <= 0){
            return res.status(400).json({
              error: "Please buy more connectPoint"
             });
          }else{
            Teacher.updateOne({ "_id": visitor._id},
            { "$inc": { "connectPoint": -1 } }, function (err) {
                if (err) return new Error(err);
        });
            console.log(visitor)
          const user = await Teacher.findById(req.params._id);
          if (!user) {
            return res.status(400).send({ error: 'User does not exist' });
          }
          const from = visitor.fullname + " From Felt Teacher"
          const to = user.phone
          const more = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`
          const text = `I will love connect ${more}`
          
          vonage.message.sendSms(from, to, text, (err, responseData) => {
              if (err) {
                  console.log(err);
              } else {
                  if(responseData.messages[0]['status'] === "0") {
                      return "Message sent successfully.";
                  } else {
                      return `Message failed with error: ${responseData.messages[0]['error-text']}`;
                  }
              }
          })
        }
        }else if (decoded.type === "school"){
            const visitor = await School.findById(decoded._id)
             if(visitor.connectPoint <= 0){
              return res.status(400).json({
                error: "Please buy more connectPoint"
               });
            }else{
              Teacher.updateOne({ "_id": visitor._id},
              { "$inc": { "connectPoint": -1 } }, function (err) {
                  if (err) return new Error(err);
          });
              console.log(visitor)
            const user = await Teacher.findById(req.params._id);
            if (!user) {
              return res.status(400).send({ error: 'User does not exist' });
            }
            const from = visitor.nameOfSchool + " From Felt Teacher"
            const to = user.phone
            const more = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`
            const text = `I will love to connect with you. ${more}`
            
            vonage.message.sendSms(from, to, text, (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    if(responseData.messages[0]['status'] === "0") {
                        return "Message sent successfully.";
                    } else {
                        return `Message failed with error: ${responseData.messages[0]['error-text']}`;
                    }
                }
            })
          }
        super.success(res, 'Connected Successful');
        }
}
}
}