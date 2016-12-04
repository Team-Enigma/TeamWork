/* globals window $*/
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */

var app = app || {};

/* eslint-enable no-var */
/* eslint-enable no-use-before-define */

function getData() {
    const username = $("#tb-username").val();
    const password = $("#tb-password").val();

    const data = {
        username,
        password
    };

    return data;
}

function handleSubmit() {
    const data = getData();

    if (app.validator.validateLogin(data)) {
        app.requester.post("/login", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);

                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                } else if (parsedResponse.error) {
                    app.notificator.showNotification(parsedResponse.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
    }
}

$("#tb-login").on("click", () => {
    handleSubmit();
});

$(window).keypress((ev) => {
    if (ev.which === 13) {
        handleSubmit();
    }
});