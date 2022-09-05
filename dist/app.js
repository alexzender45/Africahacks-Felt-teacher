"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _helmet = _interopRequireDefault(require("helmet"));

var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));

var _expressMongoSanitize = _interopRequireDefault(require("express-mongo-sanitize"));

var _teacher = require("./routes/teacher");

var _school = require("./routes/school");

var _parent = require("./routes/parent");

var _jobSchool = require("./routes/jobSchool");

var _jobParent = require("./routes/jobParent");

var _db = require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Initialize DB
_db.Database.db().then(); // Configs


const app = (0, _express.default)();
const limiter = new _expressRateLimit.default({
  windowMs: 15 * 60 * 1000,
  // 15 minutes
  max: 100,
  // limit each IP to 100 requests per windowMs
  message: 'Too many requests.'
}); // Middleware

app.enable('trust proxy');
app.use((0, _cors.default)());
app.use((0, _helmet.default)());
app.use(_express.default.json({
  limit: '50mb'
}));
app.use(limiter);
app.use((0, _expressMongoSanitize.default)()); // Endpoints

app.use('/api/', _teacher.healthRoute);
app.use('/api/', _teacher.teacherRoute);
app.use('/api/', _school.schoolRoute);
app.use('/api/', _parent.parentRoute);
app.use('/api/', _teacher.uploadRoute);
app.use('/api/', _teacher.connectRoute);
app.use('/api/', _school.imageUploadRoute);
app.use('/api/', _parent.imageUploadRoute2);
app.use('/api/', _school.schoolConnectRoute);
app.use('/api/', _jobSchool.schoolJobRoute);
app.use('/api/', _jobParent.parentJobRoute);
app.use('/api/', _parent.parentConnectRoute);
var _default = app;
exports.default = _default;
//# sourceMappingURL=app.js.map