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

            const errors = [];

            if(err.errors){
                Object.keys(err.errors).forEach((key) => {
                    const error = err.errors[key];
                    errors.push(error["message"]);
                });
            }else if(err.message){
                errors.push(err.message);
            }

            console.log(errors);

            res.status(409);
            res.render("user-views/register", { messages: errors });
            res.end();
        });
}

module.exports = {
    loadRegisterPage,
    registerNewUser
};