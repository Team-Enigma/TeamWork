/* globals describe it beforeEach afterEach*/

let chai = require("chai");
let expect = chai.expect;
let sinonModule = require("sinon");
let Ride = require("./utils/fakeRide");
let data = require("../../server/data/ride-data")({ Ride });

describe("Test ride data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAllRides", () => {
        it("should return 1 ride", (done) => {
            let rides = [{
                id: 1,
                driver: "Joro",
                fromCity: "Sofia",
                toCity: "Burgas",
                freePlaces: 3,
                price: 20,
                dateOfTravel: "12/08/2016 11:35 AM",
                contact: "0888888888",
                isRemoved: false
            }];

            sinon.stub(Ride, "find", callback => {
                return {
                    where() {
                        return {
                            equals() {
                                return {
                                    where() {
                                        return {
                                            gt() {
                                                return {
                                                    sort() {
                                                        return {
                                                            exec() {
                                                                return callback(null, rides);
                                                            }
                                                        };
                                                    }
                                                };
                                            }
                                        };
                                    }
                                };
                            }
                        };
                    }
                };
            });

            data.getAllRides()
                .then(actualRides => {
                    expect(actualRides).to.equals(rides);
                });
            done();

        });
    });

    describe("getSpecificRide", () => {
        let existingId = 1;
        let rideForTest = {
            _id: existingId,
            driver: "Gopeto",
            fromCity: "Sofia",
            toCity: "Burgas"
        };

        let rides = [rideForTest];
        beforeEach(() => {
            sinon.stub(Ride, "findOne", (query, callback) => {
                let rideId = query._id;
                let foundRide = rides.find(ride => ride._id === rideId);
                callback(null, foundRide);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific ride by id", (done) => {
            data.getSpecificRide(existingId)
                .then(actualRide => {
                    expect(actualRide).to.equal(rideForTest);
                    done();
                });
        });

        it("should not return specific ride if passed parameter is incorrect", (done) => {
            let notValidId = 3;
            data.getSpecificRide(notValidId)
                .then(actualUser => {
                    expect(actualUser).to.equal(null);
                    done();
                });
        });
    });

    // describe("addNewRide", () => {
    //     it("expect to add new ride properly", (done) => {
    //         sinon.stub(Ride.prototype, "create", callback => {
    //             callback(null);
    //         });

    //         let rideToAdd = {
    //             fromCity: "Grada",
    //             toCity: "Provinciqta",
    //             freePlaces: 4,
    //             price: 15,
    //             contact: "0898989898"
    //         };
    //         let user = { username: "Peshkata" };
    //         data.addNewRide(rideToAdd, user)
    //             .then(actualUser => {
    //                 expect(actualUser.username).to.equal(user.username);
    //                 done();
    //             });
    //     });

    // });
});