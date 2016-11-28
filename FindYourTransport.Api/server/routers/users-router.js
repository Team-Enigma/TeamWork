const controllers = require("../controllers");
const upload = require("../configurations/multer");

module.exports = function(app, authenticator, validator) {
    app.get("/register", authenticator.authenticateNotLoggedUser, controllers.user.loadRegisterPage);
    app.post("/register", validator.validateUserRegistration, controllers.user.registerNewUser);

    app.get("/login", authenticator.authenticateNotLoggedUser, controllers.user.loadLoginPage);
    app.post("/login", validator.validateUserLogin, controllers.user.loginUser);

    app.get("/logout", controllers.user.logoutUser);

    app.get("/profile", authenticator.authenticateLoggedUser, controllers.user.loadProfilePage);
    app.post("/profile/upload-avatar", upload.single("avatar"), controllers.user.uploadAvatar);
    app.post("/profile/update-info", authenticator.authenticateLoggedUser, controllers.user.updateInfo);
    app.post("/profile/update-password", validator.validatePasswordChange, controllers.user.updatePassword);

    app.get("/users", controllers.user.loadUsersPage);
    app.get("/users/filtered", controllers.user.loadFilteredUsersPage);
    app.get("/users/:username", controllers.user.loadDetailedUserPage);
};