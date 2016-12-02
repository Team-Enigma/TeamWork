/* globals $ requester window */

$("#login-form").on("submit", function (e) {
    e.preventDefault();

    let username = $("#tb-username").val();
    let password = $("#tb-password").val();

    let body = {
        username,
        password
    };

    requester.postJSON("login", body, "")
        .then((response) => {
            window.location = response.redirect;
            console.log("here");
        })
        .catch(() => {
            $("#error")
                .removeClass("hidden")
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200)
                .fadeOut(200)
                .fadeIn(200);
        });
});