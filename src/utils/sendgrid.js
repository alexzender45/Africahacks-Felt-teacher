import sgMail from "@sendgrid/mail";
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

dotConfig();

export function sendEmail(Email) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        TemplateId: process.env.SENDGRID_TEMPLATEID,
    }

    sgMail
        .send(msg)
        .then((result) => {
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}

export function passwordEmail(Name, Email, link) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Password Reset',
        html: `<h1>Hello ${Name} You Request A Password Reset </h1>
        <p><b>To Complete Your Password Reset Please Click On This Link <a href = "${link}">Click Link </a></b></p>
        <p>Note That This Link Will Expires In The Next 1 Hour</p>`,
    }

    sgMail
        .send(msg)
        .then((result) => {
            console.log(result);
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}

export function SuccessfulPasswordReset(Name, Email) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Password Reset',
        html: `<h1>Hello ${Name} Your Password Reset Was Successful</h1>
        <p><b>You can login in with your new password</b></p>
        <p>If you are a <b>Teacher</b> go to the teacher login, if you are a <b>School</b> go to the school login,
        If you are a <b>Parent</b> go to the parent login</p>`,
    }

    sgMail
        .send(msg)
        .then((result) => {
            return result;
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}


export function deleteAccountEmail(Name, Email) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Account Deleted So Sad',
        html: `<h1>Hello ${Name} Your Account with Felt-Teacher Was Deleted</h1>
        <p><b>So Sad To See You Go</b></p>
        <p>Please we will like to know why you deleted your account</p>
        <p><b>Come Back To Us, We are Eager to welcome you back</b></p>
        <p> Bye for now</p>
        <p> You Can Email us <b>alexzendersamuel33@gmail.com</b>`
    }

    sgMail
        .send(msg)
        .then((result) => {
            return result;
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}

export function connectWithUser(sendMessage, Email) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Someone Requested To Connect With You',
        html: sendMessage,
    }

    sgMail
        .send(msg)
        .then((result) => {
            return result;
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}

export function approveUsers(Name, Email, link) {
    const msg = {
        to: Email, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Account Approved',
        html: `<h2>Hello ${Name}, </h2>
        <h4>Congratulations Your Profile Has Been Approved </h4>
        <p><b>Please login your profile and start connecting with other users <a href = "${link}">Click Link </a></b></p>
        <p>Congratulations Once Again</p>`,
    }

    sgMail
        .send(msg)
        .then((result) => {
        })
        .catch(error => {
            // Log friendly error
            console.error(error);

            if (error.response) {
                // Extract error msg
                const { message, code, response } = error;

                // Extract response msg
                const { headers, body } = response;

                console.error(body);
            }
        });
}
