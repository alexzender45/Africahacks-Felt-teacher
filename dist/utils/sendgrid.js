"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.send = send;

var SendGrid = _interopRequireWildcard(require("@sendgrid/mail"));

var _dotenv = require("dotenv");

require("dotenv/config");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _dotenv.config)();
SendGrid.default.setApiKey(process.env.SENDGRID_API_KEY);

async function send(mail) {
  const transport = await SendGrid.default.send(mail);
  console.log(`Email successfully dispatched to ${mail.to}`);
  return transport;
}
//# sourceMappingURL=sendgrid.js.map