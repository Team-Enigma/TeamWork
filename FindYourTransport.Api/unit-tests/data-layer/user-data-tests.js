// let chai = require("chai").assert;
let expect = require("chai").expect;
let userData = require("../../server/data/user-data");
// let mockery = require("mockery");
// let sinon = require("sinon");
// let User = require("../../server/models/user-model");

describe("User-data.js testing", () => {

    it("registerNewUser should be a function", () => {
        expect(userData.registerNewUser).to.be.a("function");
    });

    it("getFilteredUsers should be a function", () => {
        expect(userData.getFilteredUsers).to.be.a("function");
    });

    it("getAllUsers should be a function", () => {
        expect(userData.getAllUsers).to.be.a("function");
    });

    it("getSpecificUser should be a function", () => {
        expect(userData.getUserByUsername).to.be.a("function");
    });
});