import bcrypt from 'bcrypt';
import { config as dotConfig } from 'dotenv';
import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const teacherSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid Email!');
        }
        return validator.isEmail(value);
      }
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value, ['en-NG', 'en-GH'])) {
          throw new Error('Invalid Phone Number!');
        }
        return validator.isMobilePhone(value);
      }
    },
    tokens: {
      type: [
        {
          token: {
            type: String,
            required: true
          }
        }
      ]
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      default: 'user'
    },
    yearOfExperience: {
      type: String
    },
    school: {
      type: String,
      required: false,
      default: 'Please Update'
    },
    levelOfEducation: {
      type: String,
      default: 'Please Update'
    },
    courseOfStudy: {
      type: String,
      default: 'Please Update'
    },
    approved: {
      type: Boolean,
      default: false
    },
    address: {
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
    grade: {
      type: String,
      default: 'Please Update'
    },
    gpa: {
      type: String,
      default: 'Please Update'
    },
    image: {
      type: String,
      default: 'Please Update'
    },
    about: {
      type: String,
      default: 'Please Update'
    },
    school_document: {
      type: String,
      default: 'Please Update'
    },
    status: {
      type: String,
      default: 'Not Approved'
    },
    interested_subject: {
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
    }
  },
  {
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
  }
);

teacherSchema.pre('save', async function save(next) {
  try {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }
    user.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (e) {
    next(e);
  }
});

teacherSchema.statics.findByCredentials = async (loginKey, password) => {

  const user = await Teacher.findOne({ phone: loginKey}) ||
    await Teacher.findOne({ username: loginKey }) ||
    await Teacher.findOne({ email: loginKey });

  if (!user) {
    throw new Error('Invalid login details');
  }

  const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

  if (comparePassword(password, user.password)) {
    return user
    
  }
  throw new Error('Invalid login details');
};

teacherSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, type: 'user' }, process.env.JWT_SECRETE_KEY);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

teacherSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const Teacher = model('Teacher', teacherSchema);

export default Teacher;