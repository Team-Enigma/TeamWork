const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;
const userSchema = require("./ride-model");
const constants = require("../utils/constants");

const rideSchema = mongooseSchema({
    driver: { type: userSchema },
    fromCity: {
        type: String,
        required: [true, constants.ride.messages.requiredStartCity],
        match: [constants.ride.matchers.city, constants.ride.messages.city]
    },
    toCity: {
        type: String,
        required: [true, constants.ride.messages.requiredEndCity],
        match: [constants.ride.matchers.city, constants.ride.messages.city]
    },
    dateOfTravel: {
        type: Date,
        required: [true, constants.ride.messages.requiredDate],
        validate: {
            validator: function (inputDate) {
                const date = new Date(inputDate);
                return date.getTime() >= Date.now();
            },
            message: constants.ride.messages.date
        }
    },
    freePlaces: { type: Number, required: true, min: 1, max: 5 },
    price: {
        type: Number,
        required: [true, constants.ride.messages.requiredPrice],
        min: [0, constants.ride.messages.price],
        max: [1000, constants.ride.messages.price]
    },
    contact: { type: String, required: [true, constants.ride.messages.requiredContact] },
    remarks: { type: String },
    passengers: { type: [] }
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;