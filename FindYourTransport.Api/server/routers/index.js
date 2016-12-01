const fs = require("fs");
const path = require("path");

module.exports = function(app, authenticator, validator, controllers) {
    fs.readdirSync(__dirname)
        .filter(file => file.includes("-router"))
        .forEach(file => {
            require(path.join(__dirname, file))(app, authenticator, validator, controllers);
        });
};