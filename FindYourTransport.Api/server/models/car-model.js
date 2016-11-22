const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema
const validate = require("mongoose-validator");

const manufacturerValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 20],
        message: 'Manufacturer should be between 2 and 20 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Manufacturer should contain alpha-numeric characters only'
    })
]

const modelValidator = [
    validate({
        validator: 'isLength',
        arguments: [2, 10],
        message: 'Model should be between 2 and 10 characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: true,
        message: 'Model should contain alpha-numeric characters only'
    })
]

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
    manufacturer: { type: String, required: true, validate: manufacturerValidator },
    model: { type: String, validate: modelValidator },
    color: { type: String, required: true },
    carType: { type: String },
    registrationNumber: { type: String, required: true, unique: true }
});

const Car = mongoose.model("car", carSchema);

module.exports = Car;