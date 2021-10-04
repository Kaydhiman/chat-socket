const bcrypt = require('bcrypt');

function hash(password, cb) {
    const next = cb || function () { };

    return new Promise((resolve, reject) => {
        // generate a salt
        bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR || '10') || 10, (err, salt) => {
            if (err) {
                next(err);
                reject(err);
                return;
            }

            // hash the password using our new salt
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    next(err);
                    reject(err);
                    return;
                }

                // return with password hash
                next(err, hash);
                resolve(hash);
            });
        });
    });
}

function verify(candidatePassword, passwordHash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, passwordHash, (err, matched) => {
            if (err) {
                return reject(err);
            }
            resolve(matched);
        });
    });
}

module.exports = { hash, verify };
