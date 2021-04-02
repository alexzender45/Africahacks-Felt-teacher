import Teacher from "../model/teacher.model";
import { config as dotConfig } from 'dotenv';
import jwt from 'jsonwebtoken';

dotConfig();

export async function passwordReset(req, res) {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "You must supply an email" })
            return;
        }
        const email = req.body.email;
        const check = await Teacher.find({ email }).select({ email: 1 });
        console.log(check._id)
        if (check.email != email) {
            res.status(400).send({ message: "User with this email not found" })
            return;
        }
        const token = jwt.sign({ _id: check._id, type: 'parent' }, process.env.JWT_SECRETE_KEY, { expiresIn: 5 * 60 });
        res.status(200).send({
            link: `http:localhost:6060/api/change-password?token=${token}`,
            message: 'Expires in the next 5 minute'
        });
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: "Unable to complete request" })
    }
}