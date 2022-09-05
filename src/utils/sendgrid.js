import * as SendGrid from '@sendgrid/mail';
import { config as dotConfig } from 'dotenv';
import sgMail  from '@sendgrid/mail';
import 'dotenv/config';

dotConfig();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    export async function send(mail) {
      const transport = await sgMail.send(mail);
      console.log(`Email successfully dispatched to ${mail.to}`);
      return transport;
    }