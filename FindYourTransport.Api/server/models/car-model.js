const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;
const constants = require("../utils/constants");

const carSchema = mongooseSchema({
    manufacturer: { type: String },
    model: { type: String },
    seats: { type: Number, min: 2, max: 5 },
    fuel: { type: String, enum: constants.car.enums.fuelTypes },
    transmission: { type: String, enum: constants.car.enums.transmissionTypes },
    registrationNumber: { type: String, unique: true }
});

module.exports = carSchema;