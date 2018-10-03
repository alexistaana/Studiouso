const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: String,
    date: String,
    created: {type: Date, default:Date.now}
})

const scheduleSchema = new mongoose.Schema({
    description: String,
    date: String,
    created: {type: Date, default:Date.now}
})

// const counterSchema = new mongoose.Schema({
//     made: Number,
//     finished: Number
// })

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
    tasks:[taskSchema],
    schedule:[scheduleSchema]
});

UserSchema.methods.serialize = function () {
    return {
        username: this.username || '',
        email: this.email || '',
        id: this._id || '',
        bmrResults: this.bmrResults || '',
        bmiResults: this.bmiResults || '',
        tasks: this.tasks || '',
        schedule: this.schedule || ''
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
