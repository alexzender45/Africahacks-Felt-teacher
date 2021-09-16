"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _verifyVonage = require("../utils/verifyVonage");

async function connect(toUser, message) {
  const from = " From Felt Teacher";
  const to = toUser;
  const more = message;
  const text = `I will love to connect with you ${more}`;

  _verifyVonage.vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {
      return err;
    } else {
      if (responseData.messages[0]['status'] === "0") {
        return "Message sent successfully.";
      } else {
        return `Message failed with error: ${responseData.messages[0]['error-text']}`;
      }
    }
  });
}
//# sourceMappingURL=connect.js.map