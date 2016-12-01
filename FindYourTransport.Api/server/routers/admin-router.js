module.exports = function(app, authenticator, validator, controllers) {
    app.get("/admin", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminPage);
    app.get("/admin/messages/:id", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminDetailedMessage);
    app.post("/admin/messages", authenticator.authenticateRole("Admin"), controllers.admin.updateMessageStatus);
};