const mongoose = require("mongoose")
const mongooseSchema = require("mongoose").Schema

const rideSchema = mongooseSchema({
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    distance: { type: Number, required: true },
    dateOfTravel: { type: Date, required: true },
    freePlaces: { type: Number, required: true, min: 1, max: 5 },
    price: { type: Number, required: true, min: 1, max: 50 },
    remarks: { type: String, required: true }
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;