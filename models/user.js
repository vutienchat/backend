import mongoose from 'mongoose';
import crypto from 'crypto';
const {v1 : uuuidv1} = require('uuid');
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        maxLength: 32,
        unique: true
    },
    hashed_password: {
        type: String,
        // required: true
    },
    about: {
        type: String,
        trim: true
    },
    salt: {
        type: String
    },
    role: {
        type: String,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
},{timestamps: true});
userSchema.virtual('password')
.set(function (password)  {
    this.salt = uuuidv1()
    // console.log(this.salt);
    this.hashed_password = this.encrytPassword(password)
}) 
.get(function () {
    return this._password
})

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encrytPassword(plainText) === this.hashed_password;
    },
    encrytPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return "";
        }
    }
}

module.exports = mongoose.model('User', userSchema);
