module.exports = function(app, authenticator, validator, controllers) {
    app.get("/admin", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminPage);
    app.put("/admin", authenticator.authenticateRolePostRequests("Admin"), controllers.admin.updateUserRole);
    app.get("/admin/messages/:id", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminDetailedMessage);
    app.post("/admin/messages", authenticator.authenticateRolePostRequests("Admin"), controllers.admin.updateMessageStatus);
};