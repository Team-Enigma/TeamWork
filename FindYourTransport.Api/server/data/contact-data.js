const Message = require("../models/message-model");

function sendMessage(body, user) {
    return new Promise((resolve, reject) => {
        Message.create({
            name: body.name,
            address: body.address,
            content: body.content
        })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
    });
}

module.exports = { sendMessage };