const data = require("../data")();

function loadContactPage(req, res) {
    res.render("../views/contact-views/send-message.pug");
}

function sendMessage(req, res) {
    const cashedMessage = req.body;
    data.sendMessage(req.body, req.user)
        .then(() => {
            res.render("../views/contact-views/send-message.pug");
        })
        .catch(err => {
            const messages = [];

            if (err.errors) {
                Object.keys(err.errors).forEach((key) => {
                    const error = err.errors[key];
                    messages.push(error.message);
                });
            } else if (err.message) {
                messages.push(err.message);
            }

            cashedMessage.messages = messages;

            res.status(409);
            res.render("../views/contact-views/send-message.pug", cashedMessage);
            res.end();
        });
}

module.exports = { loadContactPage, sendMessage };