"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = require("dotenv");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _mongoose = require("mongoose");

var _validator = _interopRequireDefault(require("validator"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
const teacherSchema = new _mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    trim: true,

    validate(value) {
      if (!_validator.default.isEmail(value)) {
        throw new Error('Invalid Email!');
      }

      return _validator.default.isEmail(value);
    }

  },
  phone: {
    type: String,
    required: true,
    unique: true,

    validate(value) {
      if (!_validator.default.isMobilePhone(value, ['en-NG', 'en-GH'])) {
        throw new Error('Invalid Phone Number!');
      }

      return _validator.default.isMobilePhone(value);
    }

  },
  tokens: {
    type: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  imageName: {
    type: String
  },
  role: {
    type: String,
    default: 'user'
  },
  nameOfSchool: {
    type: String,
    required: false,
    default: 'Please Update'
  },
  yearOfExperience: {
    type: String,
    default: 'Please Update'
  },
  connectPoint: {
    type: Number,
    default: 1
  },
  approved: {
    type: Boolean,
    default: false
  },
  link: {
    type: String
  },
  video: {
    type: String,
    default: 'Please Update'
  },
  state: {
    type: String,
    required: false,
    default: 'Please Update'
  },
  country: {
    type: String,
    default: 'Nigeria'
  },
  image: {
    type: String,
    default: 'Please Update'
  },
  about: {
    type: String,
    default: 'Please Update'
  },
  resume: {
    type: String,
    default: 'Please Update'
  },
  status: {
    type: String,
    default: 'Not Approved'
  },
  subjectOrClass: {
    type: Array,
    default: 'Please Update'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: false
  },
  dateOfBirth: {
    type: String,
    required: false,
    default: 'Please Update'
  },
  address: {
    type: String,
    required: false,
    default: 'Please Update'
  },
  messages: [{
    type: String
  }]
}, {
  timestamps: true,
  toJSON: {
    transform(doc, ref) {
      delete ref.password;
      delete ref.tokens;
    }

  },
  toObject: {
    transform(doc, ref) {
      delete ref.password;
      delete ref.tokens;
    }

  }
});
teacherSchema.pre('save', async function save(next) {
  try {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }

    user.password = await _bcrypt.default.hash(user.password, 10);
    next();
  } catch (e) {
    next(e);
  }
});

teacherSchema.statics.findByCredentials = async (loginKey, password) => {
  const user = await Teacher.findOne({
    email: loginKey
  });

  if (!user) {
    throw new Error('Invalid login details');
  }

  const comparePassword = (password, hash) => _bcrypt.default.compareSync(password, hash);

  if (comparePassword(password, user.password)) {
    return user;
  }

  throw new Error('Invalid login details');
};

teacherSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.fullname,
    type: 'teacher'
  }, process.env.JWT_SECRETE_KEY, {
    expiresIn: '1440m'
  });

  await user.save();
  return token;
};

teacherSchema.plugin(_mongooseUniqueValidator.default, {
  message: '{TYPE} must be unique.'
});
const Teacher = (0, _mongoose.model)('Teacher', teacherSchema);
var _default = Teacher;
exports.default = _default;
//# sourceMappingURL=teacher.model.js.map