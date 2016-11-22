const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const fuelTypes = ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"];
const transmissionTypes = ["Automatic", "Manual"];

const carSchema = mongooseSchema({
    manufacturer: { type: String },
    model: { type: String },
    seats: { type: Number, min: 2, max: 8 },
    fuel: { type: String, enum: fuelTypes },
    transmission: { type: String, enum: transmissionTypes }
});

module.exports = carSchema;