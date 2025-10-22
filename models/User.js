import validator from 'validator';
import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { hashTag } from '../db/dataConfig';
export const levelFromPriv = (priv) => {
    const l = ['user', 'mod', 'admin', 'master'].indexOf(priv);
    return ~l ? l : null;
};
const UserSchema = new Schema({
    displayName: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    persist: Boolean,
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: v => validator.isEmail(v),
            message: '{VALUE} is not a valid email.'
        },
    },
    tokens: [String],
    privs: {
        type: String,
        enum: { values: ["admin", "mod", "user", "master"], message: "only admin, mod, and user are acceptable privilege levels." }
    }
}, {
    virtuals: {
        hasAtLeast: {
            get: function () {
                const user = this;
                return new Proxy({ master: false, admin: false, mod: false, user: false }, {
                    get: (t, p, r) => {
                        const level = (v) => typeof level === 'number' ? v
                            : { master: 3, admin: 2, mod: 1, user: 0 }[v];
                        return level(p) <= level(user.privs);
                    }
                });
            }
        }
    },
    methods: {
        toJSON: function () {
            let { displayName, email, privs } = this;
            return { displayName, email, privs };
        },
        generateAuthToken: function () {
            let user = this;
            var access = 'auth';
            var token = jwt.sign({ _id: user._id.toString(), access }, hashTag).toString();
            user.tokens = user.tokens?.concat(token);
            return user.save().then(() => token);
        },
        removeToken: function (token) {
            var user = this;
            return user.updateOne({
                $pull: {
                    tokens: token
                }
            });
        },
        priv: (level) => 0 | 1 | 2 | 3
    },
    statics: {
        findByCredentials: function ({ email, displayName }, password) {
            const User = this;
            return User.findOne({ $or: [{ email }, { displayName }] }).then((user) => {
                if (!user) {
                    return Promise.reject({ status: 400, message: "No matching user found" });
                }
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, user.password, (err, res) => {
                        if (res) {
                            resolve(user);
                        }
                        else {
                            reject({ status: 403, message: "Invalid credentials" });
                        }
                    });
                });
            });
        },
        findByToken: function (token, privLevel) {
            const User = this;
            return new Promise((res, rej) => {
                let decoded;
                if (!token) {
                    rej({ status: 403, message: "No token provided." });
                }
                try {
                    decoded = jwt.verify(token, hashTag);
                }
                catch (e) {
                    return Promise.reject({ status: 403, message: 'Invalid token provided' });
                }
                return User.findOne({
                    '_id': decoded._id,
                    'tokens.token': token,
                    'tokens.access': 'auth'
                }).then(user => !privLevel || user?.hasAtLeast[privLevel] ? res(user) : rej({ status: 403, message: "Inadequate privileges to perform this action." }));
            });
        },
        findByDisplayName: function (displayName, token) {
            const User = this;
            let decoded;
            try {
                decoded = jwt.verify(token, hashTag);
            }
            catch (e) {
                return Promise.reject({ status: 403, message: "Invalid token" });
            }
            return User.findOne({
                '_id': decoded._id,
                'tokens.token': token,
                'tokens.access': 'auth'
            }).then((currentUser) => {
                if (!currentUser) {
                    return Promise.reject({ status: 403, message: "no user matching your access token" });
                }
                return User.findOne({
                    displayName
                })
                    .then((targetUser) => {
                    if (!targetUser) {
                        return Promise.reject({ status: 404, message: "no user matching this displayNmae." });
                    }
                    return targetUser;
                });
            });
        }
    },
    timestamps: true
});
UserSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
const User = mongoose.model('User', UserSchema);
export default User;
