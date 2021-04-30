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
      type: String,
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

  const user = await Teacher.findOne({ email: loginKey })

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
  const token = jwt.sign({ _id: user._id, name: user.fullname, type: 'teacher' }, process.env.JWT_SECRETE_KEY, { expiresIn: '4hrs' });
  await user.save();

  return token;
};

teacherSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const Teacher = model('Teacher', teacherSchema);

export default Teacher;