var app = app || {};

$("#tb-update-message").on("click", (ev) => {
    const messageId = $("#tb-hidden-message-id").val();
    const option = $("#tb-message-status option:selected").text();

    let data = {
        messageId,
        option
    };

    app.requester.put("/admin/messages", data)
        .then(response => {
            let parsedResponse = JSON.parse(response);
            if (parsedResponse.success) {
                app.notificator.showNotification(parsedResponse.success, "success");
                setTimeout(() => {
                    window.location.href = `/admin/messages/${messageId}`;
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