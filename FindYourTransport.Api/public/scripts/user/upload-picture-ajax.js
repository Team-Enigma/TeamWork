var app = app || {};

$("#tb-upload-image").on("click", (ev) => {
    const picture = $("#tb-avatar")[0].files[0];

    let data = new FormData();
    data.append("picture", picture);

    app.requester.postFile("/profile/upload-avatar", data)
        .then(response => {
            let parsedResponce = JSON.parse(response);

            if (parsedResponce.success) {
                app.notificator.showNotification(parsedResponce.success, "success");
                setTimeout(() => {
                    window.location.href = "/profile";
                }, 1500);
            } else if (parsedResponce.error) {
                app.notificator.showNotification(parsedResponce.error, "error");
            }
        })
        .catch(err => {
            console.log(err);
        });
});