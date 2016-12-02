var app = app || {};

$("#tb-login").on("click", (ev) => {
    var username = $("#tb-username").val();
    var password = $("#tb-password").val();

    let data = {
        username,
        password
    };

    if(app.validator.validateLogin(data)) {
        app.requester.post("/login", data)
            .then(response => {
                let parsedResponce = JSON.parse(response);

                if (parsedResponce.success) {
                    app.notificator.showNotification(parsedResponce.success, "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1000);
                } else if (parsedResponce.error) {
                    app.notificator.showNotification(parsedResponce.error, "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

});