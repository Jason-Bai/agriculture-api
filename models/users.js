// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var configs = require('../configs');

var UsersSchema = new Schema({
    name: {
        type: String,
        index: true,
        unique: true
    },
    password: String,
    isDelete: Number,
    admin: Boolean,
    salt: String,
    token: String,
    level: Number,
    create_at: { 
        type: Date, 
        default: Date.now 
    }
}, {
    versionKey: false
});

UsersSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next()
    bcrypt.genSalt(configs.SALT_WORK_PACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('Users', UsersSchema);