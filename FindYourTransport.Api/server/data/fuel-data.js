const Fuel = require("../models/fuel-model");

function createFuel(fuelName, fuelPrice) {
    return new Fuel({
        name: fuelName,
        price: fuelPrice
    });
}

function insertFuelsIntoDatabase(fuels) {
    Fuel.insertMany(fuels);
}

module.exports = { createFuel, insertFuelsIntoDatabase };