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
const parentSchema = new _mongoose.Schema({
  nameOfParent: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'Please Update'
  },
  country: {
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
    default: 'parent'
  },
  status: {
    type: String,
    default: 'Not Approved'
  },
  approved: {
    type: Boolean,
    default: false
  },
  jobs: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'JobParent'
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
parentSchema.pre('save', async function save(next) {
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

parentSchema.statics.findByCredentials = async (loginKey, password) => {
  const user = await Parent.findOne({
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

parentSchema.methods.generateAuthToken = async function () {
  const user = this;

  const token = _jsonwebtoken.default.sign({
    _id: user._id,
    name: user.nameOfParent,
    type: 'parent'
  }, process.env.JWT_SECRETE_KEY, {
    expiresIn: '1440m'
  });

  await user.save();
  return token;
};

parentSchema.plugin(_mongooseUniqueValidator.default, {
  message: '{TYPE} must be unique.'
});
const Parent = (0, _mongoose.model)('Parent', parentSchema);
var _default = Parent;
exports.default = _default;
//# sourceMappingURL=parent.model.js.map