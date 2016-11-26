const controllers = require("../controllers");

module.exports = function(app, authenticator, validator) {
    app.get("/register", authenticator.authenticateNotLoggedUser, controllers.user.loadRegisterPage);
    app.post("/register", validator.validateUserRegistration, controllers.user.registerNewUser);

    app.get("/login", authenticator.authenticateNotLoggedUser, controllers.user.loadLoginPage);
    app.post("/login", validator.validateUserLogin, controllers.user.loginUser);

    app.get("/logout", controllers.user.logoutUser);

    app.get("/users", controllers.user.loadUsers);
    app.get("/users/filtered", controllers.user.loadFilteredUsers);
    app.get("/users/:username", authenticator.authenticateLoggedUser, controllers.user.loadUserByUserName);
};