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
const JobParentSchema = new _mongoose.Schema({
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
    ref: 'Parent'
  }]
});
JobParentSchema.plugin(_mongooseUniqueValidator.default, {
  message: '{TYPE} must be unique.'
});
const JobParent = (0, _mongoose.model)('JobParent', JobParentSchema);
var _default = JobParent;
exports.default = _default;
//# sourceMappingURL=jobPostParent.js.map