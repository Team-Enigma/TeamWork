module.exports = function(app, authenticator, validator, controllers){
    app.get("/admin", controllers.admin.loadAdminPage);
    app.get("/admin/messages/:id", controllers.admin.loadAdminDetailedMessage);
    app.post("/admin/messages", controllers.admin.updateMessageStatus);
}