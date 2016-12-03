var app = app || {};

$("#tb-add-admin").on("click", (ev) => {
    const username = $("#tb-username").val();

    let data = { username };

        app.requester.put("/admin", data)
            .then(response => {
                let parsedResponse = JSON.parse(response);
                if (parsedResponse.success) {
                    app.notificator.showNotification(parsedResponse.success, "success");
                    setTimeout(() => {
                        window.location.href = "/admin";
                    }, 1000);
                } else if (parsedResponse.error) {
                    app.notificator.showNotification(parsedResponse.error, "error");
                }
            })
            .catch(err => {
                let parsedError = JSON.parse(err.responseJSON);
                app.notificator.showNotification(parsedError.error, "error");
            });
});