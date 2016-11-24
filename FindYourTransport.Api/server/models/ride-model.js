const mongoose = require("mongoose")
const mongooseSchema = require("mongoose").Schema
const userSchema = require("./ride-model");

const cityErrorMessage = "City name should contain only latin letters and be between 2 and 30 characters (e.g. Sofia)";
const cityNameMatcher = [/^([\w+\s*]{2,30})$/, cityErrorMessage];

const rideSchema = mongooseSchema({
    driver: { type: userSchema },
    fromCity: {
        type: String,
        required: [true, "Start city is required"],
        match: cityNameMatcher
    },
    toCity: {
        type: String,
        required: [true, "End city is required"],
        match: cityNameMatcher
    },
    dateOfTravel: {
        type: Date,
        required: [true, "Date is required"],
        validate: {
            validator: function (inputDate) {
                const date = new Date(inputDate);
                return date.getTime() >= Date.now();
            },
            message: "Date cannot be set before current date and time"
        },
    },
    freePlaces: { type: Number, required: true, min: 1, max: 5 },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price should be between 0 and 1000"],
        max: [1000, "Price should be between 0 and 1000"]
    },
    contact: { type: String, required: [true, "Contact information is required"] },
    remarks: { type: String },
    passengers: { type: [] }
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;