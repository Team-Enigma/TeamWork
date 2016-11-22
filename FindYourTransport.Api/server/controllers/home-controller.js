function loadHomePage(req, res) {
    res.render("home-views/home", { user: req.user });
};

function redirectToHome(req, res) {
    res.redirect("/home");
}

module.exports = { loadHomePage, redirectToHome };