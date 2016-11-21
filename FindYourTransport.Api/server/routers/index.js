const fs = require("fs");
const path = require("path");

module.exports = function(app) {
    fs.readdirSync(__dirname)
        .filter(file => file.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app);
        });
};