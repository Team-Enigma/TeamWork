// let chai = require("chai").assert;
let expect = require("chai").expect;
let rideController = require("../../server/controllers/ride-controller");
// let mockery = require("mockery");
// let sinon = require("sinon");

describe("Ride-controller.js testing", () => {

    it("addNewRide should be a function", () => {
        expect(rideController.addNewRide).to.be.a("function");
    });

    it("addPassenger should be a function", () => {
        expect(rideController.addPassenger).to.be.a("function");
    });

    it("calculatePrice should be a function", () => {
        expect(rideController.calculatePrice).to.be.a("function");
    });

    it("loadAllRides should be a function", () => {
        expect(rideController.loadAllRides).to.be.a("function");
    });

    it("loadFilteredRides should be a function", () => {
        expect(rideController.loadFilteredRides).to.be.a("function");
    });

    it("loadNewRidePage should be a function", () => {
        expect(rideController.loadNewRidePage).to.be.a("function");
    });

    it("loadSpecificRide should be a function", () => {
        expect(rideController.loadSpecificRide).to.be.a("function");
    });
});