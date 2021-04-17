const Vonage = require('@vonage/server-sdk');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';

dotConfig();

export const vonage = new Vonage({
    apiKey: process.env.API_KEY_VONAGEAPP,
    apiSecret: process.env.API_SECRET_VONAGEAPP
});

export async function sendCode(req, res) {
    vonage.verify.request({
        number: req.body.phone,
        // You can customize this to show the name of your company
        brand: 'Felt Teacher',
        // We could put `'6'` instead of `'4'` if we wanted a longer verification code
        code_length: '4'
    }, (err, result) => {
        if (err) {
            // If there was an error, return it to the client
            res.status(500).send(err.error_text);
        }
        res.send(result)
    });
}

export async function cancel(req, res) {
    nexmo.verify.control({
        request_id: 'REQUEST_ID',
        cmd: 'cancel'
    }, (err, result) => {
        console.log(err ? err : result)
    });
}
