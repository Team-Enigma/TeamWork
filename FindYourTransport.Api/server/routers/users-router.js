const controllers = require("../controllers");

module.exports = function (app) {
    app.get("/register", controllers.user.loadRegisterPage);
    app.post("/register", controllers.user.registerNewUser);

    app.get("/login", controllers.user.loadLoginPage);
    app.post("/login", controllers.user.loginUser);

    app.get("/logout", controllers.user.logoutUser);
};