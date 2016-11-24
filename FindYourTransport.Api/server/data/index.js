const path = require("path");
const fs = require("fs");

module.exports = function() {
    let data = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-data"))
        .forEach(file => {
            let dataModule = require(path.join(__dirname, file));
            console.log(dataModule);
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key];
                });
        });

        console.log(Object.keys(data));

    return data;
};