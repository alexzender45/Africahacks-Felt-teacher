const Vonage = require('@vonage/server-sdk');
import { config as dotConfig } from 'dotenv';
import 'dotenv/config';

dotConfig();

export const vonage = new Vonage({
    apiKey: process.env.API_KEY_VONAGEAPP,
    apiSecret: process.env.API_SECRET_VONAGEAPP
});
export async function verify(code, request_id) {
    vonage.verify.check({
        request_id: request_id,
        code: code
    }, (err, result) => {
        if (result.status != 0) {
            console.log("Something went wrong");
        }
        console.log(result)
        return result;
    });
};