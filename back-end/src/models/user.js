const mongoose = require('mongooose');
const { hash, verify } = require('../bin/password')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationToken: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
});

userSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // @ts-ignore
    hash(user.password, (err, hash) => {
        // @ts-ignore
        user.password = hash;
        next(err);
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return verify(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);