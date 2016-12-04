/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

$("#tb-send").on("click", () => {
    const name = $("#tb-name").val();
    const address = $("#tb-address").val();
    const title = $("#tb-title").val();
    const content = $("#tb-content").val();

    const data = {
        name,
        address,
        title,
        content
    };

    if (app.validator.validateMessage(data)) {
        app.requester.post("/send-message", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);

                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = "/home";
                    }, 1500);
                } else if (parsedResponse.error) {
                    app.notificator.showNotification(parsedResponse.error, "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
});