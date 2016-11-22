<<<<<<< HEAD
var pug = require("pug");

function getHomePageView(req, res) {
    var nav, home;

    // if user logged in show logged in navigation 
    // home = pug.compileFile("home-logged-in.pug");
    // nav = pug.compileFile("nav-logged-in.pug");

    // else
    home = pug.compileFile("server/views/home-not-logged-in.pug");
    nav = pug.compileFile("server/views/nav-not-logged-in.pug");

    res.send(home() + nav());
}

function redirectToHome(req, res) {
    res.redirect("/home");
}


module.exports = {
    getHomePageView,
    redirectToHome
}
=======
function loadHomePage(req, res) {
    res.render("home-views/home", { user: req.user });
};

module.exports = { loadHomePage };
>>>>>>> 0a4828da1dd5d4140061067be7d69174a523a480
