const mongoose = require("mongoose");
const mongooseSchema = require("mongoose").Schema;

const rideSchema = mongooseSchema({
    origin: { type: "String" },
    destination: { type: "String" },
    distance: { type: "Number" },
    dateOfTravel: { type: "Date" },
    freePlaces: { type: "Number" },
    price: { type: "Number" },
    remarks: { type: "String" }
});

const Ride = mongoose.model("ride", rideSchema);

module.exports = Ride;