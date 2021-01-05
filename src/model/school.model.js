import bcrypt from 'bcrypt';
import { config as dotConfig } from 'dotenv';
import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const schoolSchema = new Schema(
  {
    ownerOfSchool: {
      type: String,
      default: 'Please Update'
    },
    nameOfSchool: {
      type: String,
       required: true,
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
      type: String,
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
    jobs: [{
      type: Schema.Types.ObjectId,
      ref: 'Job'
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

schoolSchema.pre('save', async function save(next) {
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

schoolSchema.statics.findByCredentials = async (loginKey, password) => {
  const user = await School.findOne({ phone: loginKey }) ||
    await School.findOne({ email: loginKey });

  if (!user) {
    throw new Error('Invalid login details');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid login details');
  }

  return user;
};

schoolSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id, type: 'school' }, process.env.JWT_SECRETE_KEY, {expiresIn:'4hrs'});
  await user.save();
  user.tokens = user.tokens.concat({ token });
  return token;
};

schoolSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const School = model('School', schoolSchema);

export default School;
