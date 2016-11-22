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