import Teacher from '../model/teacher.model';
import School from '../model/school.model';
import Parent from '../model/parent.model';
import { config as dotConfig } from 'dotenv';
import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import bcrypt from 'bcrypt';
import { passwordEmail, SuccessfulPasswordReset } from './sendgrid';


dotConfig();

export async function passwordReset(req, res) {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "You must supply an email" });
            return;
        }
        const email = req.body.email;
        const user = await Teacher.findOne({ email });
        const Email = user.email;
        const Name = user.fullname
        if (!user) {
            res.status(400).send({ message: "User with this email not found" })
        } else {
            const token = jwt.sign({ _id: user._id, type: 'teacher' }, process.env.JWT_SECRETE_KEY, { expiresIn: '1hr' });
            const link = `  https://felt-teacher.herokuapp.com/api/change-password?token=${token}`;
            passwordEmail(Name, Email, link)
            res.status(200).send({ message: 'Please Check Your Email For Next Step', link: link });
        }
    } catch (e) {
        res.status(400).send({ message: "Unable to complete request" })
    }
}

export async function passwordResetSchool(req, res) {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "You must supply an email" });
            return;
        }
        const email = req.body.email;
        const user = await School.findOne({ email });
        const Email = user.email;
        const Name = user.nameOfSchool;
        if (!user) {
            res.status(400).send({ message: "User with this email not found" })
        } else {
            const token = jwt.sign({ _id: user._id, type: 'school' }, process.env.JWT_SECRETE_KEY, { expiresIn: '1hr' });
            const link = ` https://felt-teacher.herokuapp.com/api/change-password/school?token=${token}`;
            passwordEmail(Name, Email, link)
            res.status(200).send({ message: 'Please Check Your Email For Next Step' });
        }
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: "Unable to complete request" })
    }
}

export async function passwordResetParent(req, res) {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "You must supply an email" });
            return;
        }
        const email = req.body.email;
        const user = await Parent.findOne({ email });
        const Email = user.email;
        const Name = user.nameOfParent;
        if (!user) {
            res.status(400).send({ message: "User with this email not found" })
        } else {
            const token = jwt.sign({ _id: user._id, type: 'parent' }, process.env.JWT_SECRETE_KEY, { expiresIn: '1hr' });
            const link = ` https://felt-teacher.herokuapp.com/api/change-password/parent?token=${token}`;
            passwordEmail(Name, Email, link)
            res.status(200).send({ message: 'Please Check Your Email For Next Step', link });
        }
    } catch (e) {
        res.status(400).send({ message: "Unable to complete request" })
    }
}

export async function confirmPasswordReset(req, res) {
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    if (!newPassword) {
        res.status(400).send({ message: "Please Enter New Password" });
        return;
    } else if (!confirmPassword) {
        res.status(400).send({ message: "Please Enter Confirm Password" });
        return;
    } else if (newPassword != confirmPassword) {
        res.status(400).send({ message: "Password Do Not Match" });
        return;
    } else {
        const userNewHashed = await bcrypt.hash(newPassword, 10);
        const queryString = jwt_decode(req.query.token);
        const ID = queryString._id;
        if (queryString.type === 'teacher') {
            const teacher = await Teacher.findOneAndUpdate({ _id: ID },
                {
                    $set: { password: userNewHashed },
                }, {
                new: true,
            })
            const Name = teacher.fullname;
            const Email = teacher.email;
            SuccessfulPasswordReset(Name, Email);
        } else if (queryString.type === 'school') {
            const school = await School.findOneAndUpdate({ _id: ID },
                {
                    $set: { password: userNewHashed },
                }, {
                new: true,
            })
            const Name = school.nameOfSchool;
            const Email = school.email;
            SuccessfulPasswordReset(Name, Email);
        } else {
            const parent = await Parent.findOneAndUpdate({ _id: ID },
                {
                    $set: { password: userNewHashed },
                }, {
                new: true,
            });
            const Name = parent.nameOfParent;
            const Email = parent.email;
            SuccessfulPasswordReset(Name, Email);
        }
        res.status(200).send({ message: "Password Reset Successful" });
    }
}