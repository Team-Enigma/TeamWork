const User = require("../models/user-model")

function createNewUser(body) {
    return new Promise((resolve, reject) => {
        User.create({
            username: body.username,
            password: body.password,
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
                createNewUser(body);
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