import bcrypt from 'bcrypt';
import { config as dotConfig } from 'dotenv';
import jwt from 'jsonwebtoken';
import { model, Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

dotConfig();

const adminSchema = new Schema(
    {
        adminName: {
            type: String,
            required: true,
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
            enum: ['admin', 'superAdmin', 'adminstrator', 'godAdmin'],
            required: true,
        },
        status: {
            type: String,
            default: 'Not Approved'
        },
        approved: {
            type: Boolean,
            default: false
        },
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

adminSchema.pre('save', async function save(next) {
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

adminSchema.statics.findByCredentials = async (loginKey, password) => {
    const user = await Admin.findOne({ email: loginKey });
    if (!user) {
        throw new Error('Invalid login details');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid login details');
    }

    return user;
};

adminSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id, name: user.adminName, type: 'modrator' }, process.env.JWT_SECRETE_KEY, { expiresIn: '24h' });
    await user.save();
    return token;
};

adminSchema.plugin(uniqueValidator, { message: '{TYPE} must be unique.' });

const Admin = model('Admin', adminSchema);

export default Admin;
