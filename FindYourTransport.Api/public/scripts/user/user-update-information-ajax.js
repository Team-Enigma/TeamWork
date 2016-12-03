var app = app || {};

$("#tb-update-profile").on("click", (ev) => {
    console.log("here");
    const firstName = $("#tb-first-name").val();
    const lastName = $("#tb-last-name").val();
    const city = $("#tb-city").val();
    const email = $("#tb-email").val();
    const contact = $("#tb-contact").val();

    let data = {
        firstName,
        lastName,
        city,
        email,
        contact
    };

    console.log(data);
    if (app.validator.validateUpdateProfile(data)) {
        app.requester.post("/profile/update-info", data)
            .then(response => {
                let parsedResponce = JSON.parse(response);

                if (parsedResponce.success) {
                    app.notificator.showNotification(parsedResponce.success, "success");
                    setTimeout(() => {
                        window.location.href = "/";
                    }, 1500);
                } else if (parsedResponce.error) {
                    app.notificator.showNotification(parsedResponce.error, "error");
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

});