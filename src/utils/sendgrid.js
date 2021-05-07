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
        subject: 'Reset Your Password',
        html: `<h1>Dear ${Name},</h1>
        <p>You Have recently asked to reset your Felt-Teachers profile password.</p>
         <p><b>Please follow this link <a href = "${link}">Click Here To Reset Your Password</a></b></p>
        <p>Best Regards,</p>
        <p>Felt-Teachers</p>`,
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
        subject: 'Your Password Reset Was Successfully Updated',
        html: `<h1>Dear ${Name},</h1>
        <p>Your recent request to reset your Felt-Teachers password is successful. Upon your next login
        please use your new password.</p>
        <p>Best Regards,</p>
        <p>Felt-Teachers</p>`,
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
        subject: 'Account Deletion',
        html: `<h1>Hello ${Name},</h1>
        <p>Your account with Felt-Teacher has been Deleted. <b>We Hate To See You Go</b></p>
        <p>Please do send us a review via our official mail feltteacher@gmail.com, bcause we would love to
        know why you've decided to delete your account with us</p>
        <p>Anytime you change your mind, please reach out us, we'll be glad to welcome you back</p>
        <p> Best Regards,</p>
        <p>Felt-Teachers</b>`
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
        subject: 'Your Connection Status Has Been Updated',
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

export function completeProfile(Name, Email, Account) {
    const msg = {
        to: process.env.AUTOMATED_EMAIL, // Change to your recipient
        from: process.env.VERIFIED_EMAIL, // Change to your verified sender
        subject: 'Updated Profile',
        html: `<h2>Am ${Name}, </h2>
        <h4>Just Want to let you know that i have updated my profile</h4>
        <p><b>Please ensure to verify this on the Felt Teacher Platform</b></p>
        <p>My Email is <b>${Email}</b> and am a <b>${Account}</b> on the Platform</p>`,
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
