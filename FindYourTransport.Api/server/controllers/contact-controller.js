module.exports = (data, passport, constants) => {

    function loadContactPage(req, res) {
        res.render("../views/contact-views/send-message.pug");
    }

    function sendMessage(req, res) {
        const cashedMessage = req.body;
        data.sendMessage(req.body, req.user)
            .then(() => {
                res.status(201);
                return res.json("{\"success\": \"Successful message sent. We will respond to your request as soon as possible.\"}");
            })
            .catch(err => {
                res.status(400);
                return res.json(`{"error": "Problem occured while sending this message. ${err.message}"}`);
            });
    }

    return {
        name: "contact",
        loadContactPage,
        sendMessage
    };
};