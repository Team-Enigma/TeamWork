const urlLinks = require("./url-links").urls;
const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");
const dataFuel = require("../../data/fuel-data");
const config = require("../../configurations");
require("../../configurations/database")(config);

urlLinks.forEach((url) => {
    httpRequester.get(url)
        .then((result) => {
            const selectorFuelName = ".row .col-sm-8 h1";
            const selectorFuelPrice = ".row .col-sm-3 h2";
            const html = result.body;
            return htmlParser.parseFuelPrice(selectorFuelName, selectorFuelPrice, html);
        })
        .then(fuels => {
            let dBFuels = fuels.map(fuel => {
                return dataFuel.createFuel(fuel.fuelName, fuel.fuelPrice);
            });
            dataFuel.insertFuelsIntoDatabase(dBFuels);
        })
        .catch((error) => {
            console.log(error);
        });

}, this);