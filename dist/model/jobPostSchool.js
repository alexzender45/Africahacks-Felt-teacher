"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

var _mongoose = require("mongoose");

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const JobSchema = new _mongoose.Schema({
  neededTeacher: {
    type: String,
    required: true
  },
  shortNoteAboutTeacherYouWant: {
    type: String,
    required: true
  },
  owner: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'School'
  }]
});
JobSchema.plugin(_mongooseUniqueValidator.default, {
  message: '{TYPE} must be unique.'
});
const Job = (0, _mongoose.model)('Job', JobSchema);
var _default = Job;
exports.default = _default;
//# sourceMappingURL=jobPostSchool.js.map