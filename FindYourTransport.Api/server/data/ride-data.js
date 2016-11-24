const Ride = require("../models/ride-model");

function createNewRide(body, user) { //function createNewRide(body, user)
    return new Promise((resolve, reject) => {
        Ride.create({
                driver: user,
                fromCity: body.fromCity,
                toCity: body.toCity,
                dateOfTravel: Date.parse(body.dateOfTravel),
                freePlaces: body.freePlaces,
                price: body.price,
                contact: body.contact,
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

function addNewRide(body, user) {
    return new Promise((resolve, reject) => {
        Ride.findOne({
                fromCity: body.fromCity,
                toCity: body.toCity,
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
                return createNewRide(body, user); // return createNewRide(body, user)
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
    });
}

function getAllRides() {
    return Ride.find((err, rides) => {
            if (err) {
                return err;
            }

            return rides;
        })
        .then((rides) => {
            return rides;
        });
}

function getSpecificRide(id) {
    return Ride.find({ _id: id }, (err, ride) => {
            if (err) {
                return err;
            }

            return ride;
        })
        .then((ride) => {
            return ride[0];
        });
}

module.exports = {
    addNewRide,
    getAllRides,
    getSpecificRide
}