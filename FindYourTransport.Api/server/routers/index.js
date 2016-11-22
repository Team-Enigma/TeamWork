const fs = require("fs");
const path = require("path");
const controllers = require("../controllers");

module.exports = function(app) {

    app.get("/", controllers.home.loadHomePage);

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app);
        });
};