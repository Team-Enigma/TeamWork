const Ride = require("../models/ride-model");

function createNewRide(body) {
    return new Promise((resolve, reject) => {
        Ride.create({
                fromCity: body.fromCity,
                toCity: body.toCity,
                distance: body.distance,
                dateOfTravel: Date.parse(body.dateOfTravel),
                freePlaces: body.freePlaces,
                price: body.price,
                remarks: body.remarks
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
    });
}

function addNewRide(body) {
    return new Promise((resolve, reject) => {
        Ride.findOne({
                fromCity: body.fromCity,
                toCity: body.toCity,
                distance: body.distance,
                dateOfTravel: Date.parse(body.dateOfTravel),
                freePlaces: body.freePlaces,
                price: body.price
            })
            .then(ride => {
                if (ride) {
                    throw new Error("Ride already exists!");
                }
            })
            .then(() => {
                return createNewRide(body);
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
    });
}

module.exports = {
    addNewRide
}