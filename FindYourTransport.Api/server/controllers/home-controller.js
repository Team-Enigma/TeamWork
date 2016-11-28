function loadHomePage(req, res) {
    res.render("home-views/home");
}

function redirectToHomePage(req, res) {
    res.redirect("/home");
}

module.exports = { loadHomePage, redirectToHomePage };