function loadHomePage(req, res) {
    res.render("home-views/home", { user: req.user });
};

module.exports = { loadHomePage };