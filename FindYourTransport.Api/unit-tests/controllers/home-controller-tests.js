// let chai = require("chai").assert;
let expect = require("chai").expect;
let homeController = require("../../server/controllers/home-controller");
// var mockery = require("mockery");
// var sinon = require("sinon");

describe("Home-controller.js testing", () => {

    it("loadHomePage should be a function", () => {
        expect(homeController.loadHomePage).to.be.a("function");
    });

    it("redirectToHomePage should be a function", () => {
        expect(homeController.redirectToHomePage).to.be.a("function");
    });
});