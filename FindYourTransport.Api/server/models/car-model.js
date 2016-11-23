const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const fuelTypes = ["ULP", "PULP", "CNG", "LPG", "Diesel", "Hybrid", "Electric"];
const transmissionTypes = ["Automatic", "Manual"];

//A commented the validation because was invalid...todo....
// function validator(minLength, maxLength, fieldName) {
//     const Validator = [
//         validate({
//             validator: 'isLength',
//             arguments: [minLength, maxLength],
//             message: `${fieldName} should be between ${minLength} and ${maxLength} characters`
//         }),
//         validate({
//             validator: 'isAlphanumeric',
//             passIfEmpty: true,
//             message: `${fieldName} should contain alpha-numeric characters only`
//         })
//     ]

//     return Validator;
// }

const carSchema = mongooseSchema({
    manufacturer: { type: String },
    model: { type: String },
    seats: { type: Number, min: 2, max: 8 },
    fuel: { type: String, enum: fuelTypes },
    transmission: { type: String, enum: transmissionTypes },
    registrationNumber: { type: String, unique: true }
});

module.exports = carSchema;