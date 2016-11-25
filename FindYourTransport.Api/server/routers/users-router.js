const controllers = require("../controllers");

module.exports = function(app, authenticator) {
    app.get("/register", authenticator.authenticateNotLoggedUser, controllers.user.loadRegisterPage);
    app.post("/register", controllers.user.registerNewUser);

    app.get("/login", authenticator.authenticateNotLoggedUser, controllers.user.loadLoginPage);
    app.post("/login", controllers.user.loginUser);

    app.get("/logout", controllers.user.logoutUser);

    app.get("/users", controllers.user.loadUsers);
    app.get("/user/:id", controllers.user.loadUser);
};