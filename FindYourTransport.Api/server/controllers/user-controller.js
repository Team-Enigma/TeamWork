const data = require("../data")();

function loadRegisterPage(req, res) {
    res.render("user-views/register");
}

function registerNewUser(req, res) {
    const body = req.body;

    data.registerNewUser(body)
        .then(() => {
            res.redirect("/register");
        })
        .catch(err => {
            // todo: handle errors better
            res.status(409);
            res.send(err.message);
            res.end();
        });
}

module.exports = {
    loadRegisterPage,
    registerNewUser
};