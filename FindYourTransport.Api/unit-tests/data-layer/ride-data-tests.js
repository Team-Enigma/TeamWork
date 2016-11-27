// let chai = require("chai").assert;
let expect = require("chai").expect;
let rideData = require("../../server/data/ride-data");
// let mockery = require("mockery");
// let sinon = require("sinon");
// let User = require("../../server/models/ride-model");

describe("Ride-data.js testing", () => {

    it("addNewRide should be a function", () => {
        expect(rideData.addNewRide).to.be.a("function");
    });

    it("getAllRides should be a function", () => {
        expect(rideData.getAllRides).to.be.a("function");
    });

    it("getFilteredRides should be a function", () => {
        expect(rideData.getFilteredRides).to.be.a("function");
    });

    it("getRidesForUser should be a function", () => {
        expect(rideData.getRidesForUser).to.be.a("function");
    });

    it("getSpecificRide should be a function", () => {
        expect(rideData.getSpecificRide).to.be.a("function");
    });
});