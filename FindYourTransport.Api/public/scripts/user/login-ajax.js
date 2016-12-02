var app = app || {};

$("#tb-login").on("click", (ev) => {
    const username = $("#tb-username").val();
    const password = $("#tb-password").val();

    let data = {
        username,
        password
    };

    if (app.validator.validateLogin(data)) {
        app.requester.post("/login", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);

                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else if (parsedResponse.error) {
                    app.notificator.showNotification(parsedResponse.error, "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

});