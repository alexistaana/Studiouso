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
    },
    bmrResults:{
        type: String,
        required: false
    },
    bmiResults:{
        type: String,
        required: false
    },
    tasks:{
        type: Object,
        required: false,
        description:{
            type: Array,
            required: false
        },
        date:{
            type: Array,
            required: false
        }
    },
    schedule:{
        type: Object,
        required: false,
        title:{
            type: Array,
            required: false
        },
        date:{
            type: Array,
            required: false
        }
    }
});

UserSchema.methods.serialize = function () {
    return {
        username: this.username || '',
        email: this.email || '',
        id: this._id || '',
        bmrResults: this.bmrResults || '',
        bmiResults: this.bmiResults || ''
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
