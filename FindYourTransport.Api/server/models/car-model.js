const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const fuelTypes = ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"];
const transmissionTypes = ["Automatic", "Manual"];

function validator(minLength, maxLength, fieldName) {
    const Validator = [
        validate({
            validator: 'isLength',
            arguments: [minLength, maxLength],
            message: `${fieldName} should be between ${minLength} and ${maxLength} characters`
        }),
        validate({
            validator: 'isAlphanumeric',
            passIfEmpty: true,
            message: `${fieldName} should contain alpha-numeric characters only`
        })
    ]

    return Validator;
}

const carSchema = mongooseSchema({
    manufacturer: { type: String, validate: validator(2, 20, "Manufacturer") },
    model: { type: String, validate: validator(2, 10, "Model") },
    seats: { type: Number, min: 2, max: 8 },
    fuel: { type: String, enum: fuelTypes },
    transmission: { type: String, enum: transmissionTypes },
    registrationNumber: { type: String, required: true, unique: true }
});

module.exports = carSchema;