"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendCode = sendCode;
exports.cancel = cancel;
exports.vonage = void 0;

var _dotenv = require("dotenv");

require("dotenv/config");

const Vonage = require('@vonage/server-sdk');

(0, _dotenv.config)();
const vonage = new Vonage({
  apiKey: process.env.API_KEY_VONAGEAPP,
  apiSecret: process.env.API_SECRET_VONAGEAPP
});
exports.vonage = vonage;

async function sendCode(req, res) {
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

    res.send(result);
  });
}

async function cancel(req, res) {
  nexmo.verify.control({
    request_id: 'REQUEST_ID',
    cmd: 'cancel'
  }, (err, result) => {
    console.log(err ? err : result);
  });
}
//# sourceMappingURL=verifyVonage.js.map