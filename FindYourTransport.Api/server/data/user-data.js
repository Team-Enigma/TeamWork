const User = require("../models/user-model");
const encryption = require("../utils/encryption");

function createNewUser(body) {
    return new Promise((resolve, reject) => {

        const salt = encryption.generateSalt();
        const hashedPassword = encryption.generateHashedPassword(salt, body.password);

        User.create({
            username: body.username,
            hashedPassword,
            salt,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email
        })
       .then(() => {
           return resolve();
       })
       .catch(err => {
           return reject(err);
       });
    });
}

function registerNewUser(body) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: body.username })
            .then(user => {
                if (user) {
                    throw new Error("User already in database");
                }
            })
            .then(() => {
                return createNewUser(body);
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
    });
}

module.exports = function() {
    return {
        registerNewUser
    }
};