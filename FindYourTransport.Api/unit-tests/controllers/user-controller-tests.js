// let chai = require("chai").assert;
let expect = require("chai").expect;
let userController = require("../../server/controllers/user-controller");
// let mockery = require("mockery");
// let sinon = require("sinon");

describe("User-controller.js testing", () => {

    it("loadFilteredUsersPage should be a function", () => {
        expect(userController.loadFilteredUsersPage).to.be.a("function");
    });

    it("loadLoginPage should be a function", () => {
        expect(userController.loadLoginPage).to.be.a("function");
    });

    it("loadRegisterPage should be a function", () => {
        expect(userController.loadRegisterPage).to.be.a("function");
    });

    it("loadUsersPage should be a function", () => {
        expect(userController.loadUsersPage).to.be.a("function");
    });

    it("loadDetailedUserPage should be a function", () => {
        expect(userController.loadDetailedUserPage).to.be.a("function");
    });

    it("loginUser should be a function", () => {
        expect(userController.loginUser).to.be.a("function");
    });

    it("logoutUser should be a function", () => {
        expect(userController.logoutUser).to.be.a("function");
    });

    it("registerNewUser should be a function", () => {
        expect(userController.registerNewUser).to.be.a("function");
    });
});