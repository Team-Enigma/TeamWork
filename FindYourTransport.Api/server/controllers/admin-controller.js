module.exports = (data, passport, constants) => {

    function loadAdminPage(req, res) {
        data.getAllMessages()
            .then((contactMessages) => {
                res.render("../views/admin-views/admin-panel.pug", { contactMessages } );
            });
    }

    function loadAdminDetailedMessage(req, res) {
        const messageId = req.params.id;

        data.getSpecificMessage(messageId)
            .then((resultMessage) => {
                res.render("../views/admin-views/detailed-message.pug", { message: resultMessage });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateMessageStatus(req, res) {
        const id = req.body.messageId;
        const status = req.body.option;
        const username = status === "Not Processed" ? "Not Proccessed" : req.user.username;

        data.getSpecificMessage(id)
            .then((message) => {
                message.status = status;
                message.processedBy = username;
                data.updateMessageStatus(message);
            })
            .then(() => {
                res.redirect("/admin");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        name: "admin",
        loadAdminPage,
        loadAdminDetailedMessage,
        updateMessageStatus
    };
};