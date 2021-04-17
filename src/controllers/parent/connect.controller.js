import jwt from 'jsonwebtoken';
import { BaseController } from '.';
import Teacher from '../../model/teacher.model';
import School from '../../model/school.model';
import Parent from '../../model/parent.model'
import { connect } from '../../utils/connect'

export class Connect extends BaseController {
  constructor() {
    super();
  }
  async connectWithApprovedParent(req, res) {
    if (req.user.approved !== true && req.user.status !== 'Approved') {
      return res.status(400).send({ message: 'You Are Not Approved To Perform This Action' });
    } else {
      const usertoken = req.headers.authorization;
      const token = usertoken.split(' ');
      const decoded = jwt.verify(token[1], process.env.JWT_SECRETE_KEY);
      // User that is a  school
      if (decoded.type === "school") {
        const visitor = await School.findById(decoded._id)
        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          School.updateOne({ "_id": visitor._id },
            { "$inc": { "connectPoint": -1 } }, function (err) {
              if (err) return new Error(err);
            });
          const user = await Parent.findById(req.params._id);
          if (!user) {
            return res.status(400).send({ error: 'User does not exist' });
          }

          // Messages
          user.messages.push(`${visitor.nameOfSchool} requested to connect with you, ${visitor.email}, ${visitor.link}`)
          user.save();
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`
          const sendMessage = `<h1> Congrats ${user.nameOfParent} Someone Wants To Connect With You </h1>
          <p> I will love to connect with you</p>
          <p> You can email me ${visitor.email},  and also check my Profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><b> Thanks For Reading My Message </b></p>`
          const Email = user.email;
          connect(user.phone, message);
          connectWithUser(sendMessage, Email);
        }

        // User that is a Teacher
      } else if (decoded.type === "teacher") {
        const visitor = await Teacher.findById(decoded._id)
        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          Teacher.updateOne({ "_id": visitor._id },
            { "$inc": { "connectPoint": -1 } }, function (err) {
              if (err) return new Error(err);
            });
          console.log(visitor)
          const user = await Parent.findById(req.params._id);
          if (!user) {
            return res.status(400).send({ error: 'User does not exist' });
          }

          // Messages
          user.messages.push(`${visitor.fullname} requested to connect with you, ${visitor.email}, ${visitor.link}`)
          user.save()
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`
          const sendMessage = `<h1> Congrats ${user.nameOfParent} Someone Wants To Connect With You </h1>
          <p> I will love to connect with you</p>
          <p> You can email me ${visitor.email},  and also check my Profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><b> Thanks For Reading My Message </b></p>`
          const Email = user.email;
          connect(user.phone, message);
          connectWithUser(sendMessage, Email);
        }
        // User that is a Parent
      } else if (decoded.type === "parent") {
        const visitor = await Parent.findById(decoded._id)
        if (visitor.connectPoint <= 0) {
          return res.status(400).json({
            error: "Please buy more connectPoint"
          });
        } else {
          Parent.updateOne({ "_id": visitor._id },
            { "$inc": { "connectPoint": -1 } }, function (err) {
              if (err) return new Error(err);
            });
          const user = await Parent.findById(req.params._id);
          if (!user) {
            return res.status(400).send({ error: 'User does not exist' });
          }

          // Messages
          user.messages.push(`${visitor.nameOfParent} requested to connect with you, ${visitor.email}, ${visitor.link}`)
          user.save()
          const message = `You can email me ${visitor.email}, and also check my profile on Felt Teacher Platform ${visitor.link}`
          const sendMessage = `<h1> Congrats ${user.nameOfParent} Someone Wants To Connect With You </h1>
          <p> I will love to connect with you</p>
          <p> You can email me ${visitor.email},  and also check my Profile on Felt Teacher Platform <a href = "${visitor.link}"> <b>My Profile</b> </a></p>
          <p><b> Thanks For Reading My Message </b></p>`
          const Email = user.email;
          connect(user.phone, message);
          connectWithUser(sendMessage, Email);
        }
      }
      super.success(res, 'Connected Successful');
    }
  }
}