const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserSchema.methods.serialize = function () {
    return {
        username: this.username || '',
        email: this.email || ''
    };
};

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
    return bcrypt.hash(password, 8);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };
