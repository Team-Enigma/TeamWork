/* globals $ requester window */

$("#register-form").on("submit", (e) => {
    e.preventDefault();

    let username = $("#tb-username").val();
    let email = $("#tb-email").val();
    let password = $("#tb-password").val();
    let confirmedPassword = $("#tb-confirm-password").val();
    let body = {
        username,
        email,
        password,
        confirmedPassword
    };

    let $error = $("#error");
    let pattern = new RegExp(/^[a-zA-Z0-9._]{3,20}$/, "g");
    let test = pattern.test(username);

    if (!test) {
        $(".alert").slideDown();
        return;
    }

    if (password !== confirmedPassword) {
        $error
            .removeClass("hidden")
            .text("Passwords do not match!");
        return;
    }

    requester.postJSON("/register", body, "")
        .then((response) => {
            window.location = response.redirect;
        })
        .catch((err) => {
            let responseText = JSON.parse(err.responseText);

            $error
                .removeClass("hidden")
                .text(responseText.message);
        });

});