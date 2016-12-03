/* globals window $*/

var app = app || {};

$("#tb-register").on("click", (ev) => {
    const firstName = $("#tb-first-name").val();
    const lastName = $("#tb-last-name").val();
    const username = $("#tb-username").val();
    const email = $("#tb-email").val();
    const password = $("#tb-password").val();
    const confirmPassword = $("#tb-confirm-password").val();

    let data = {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword
    };

    if (app.validator.validateRegister(data)) {
        app.requester.post("/register", data)
            .then(response => {
                let parsedResponce = JSON.parse(response);

                if (parsedResponce.success) {
                    app.notificator.showNotification(parsedResponce.success, "success");
                    setTimeout(() => {
                        window.location.href = "/login";
                    }, 1500);
                } else if (parsedResponce.error) {
                    app.notificator.showNotification(parsedResponce.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }

});