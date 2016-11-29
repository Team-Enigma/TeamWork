const Fuel = require("../models/fuel-model").Fuel;

function createFuel(name, price) {
    return new Fuel({
        fuelName: name,
        fuelPrice: price
    });
}

function insertFuelsIntoDatabase(fuels) {
    Fuel.insertMany(fuels);
}

module.exports = { createFuel, insertFuelsIntoDatabase };