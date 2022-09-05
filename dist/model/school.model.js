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
const schoolSchema = new _mongoose.Schema({
  ownerOfSchool: {
    type: String,
    default: 'Please Update'
  },
  nameOfSchool: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'Please Update'
  },
  contry: {
    type: String,
    default: 'Please Update'
  },
  about: {
    type: String,
    default: 'Please Update'
  },
  address: {
    type: String,
    default: 'Please Update'
  },
  RCNumber: {
    type: String,
    default: 'Please Update'
  },
  image: {
    type: String,
    default: 'Please Upload'
  },
  link: {
    type: String
  },
  requirements: {
    type: String,
    default: 'Please Update'
  },
  connectPoint: {
    type: Number,
    default: 1
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
  role: {
    type: String,
    default: 'school'
  },
  status: {
    type: String,
    default: 'Not Approved'
  },
  approved: {
    type: Boolean,
    default: false
  },
  code: {
    type: String
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  jobs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }],
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
schoolSchema.pre('save', async function save(next) {
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

schoolSchema.statics.findByCredentials = async (loginKey, password) => {
  const user = await School.findOne({
    email: loginKey
  });

  if (!user) {
    throw new Error('Invalid login details');
  }

  const isMatch = await _bcrypt.default.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid login details');
  }

  return user;
};

schoolSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = _jsonwebtoken.default.sign({
    _id: user._id,
    type: 'school'
  }, process.env.JWT_SECRETE_KEY, {
    expiresIn: '4hrs'
  });

  await user.save();
  return token;
};

schoolSchema.plugin(_mongooseUniqueValidator.default, {
  message: '{TYPE} must be unique.'
});
const School = (0, _mongoose.model)('School', schoolSchema);
var _default = School;
exports.default = _default;
//# sourceMappingURL=school.model.js.map