/* globals describe it beforeEach afterEach*/

let chai = require("chai");
let expect = chai.expect;
let sinonModule = require("sinon");
let User = require("./utils/fakeUser");
let data = require("../../server/data/user-data")({ User });


describe("Test user data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAllUsers", () => {
        it("should return 1 user", (done) => {
            let users = ["Pesho"];
            sinon.stub(User, "find", callback => {
                callback(null, users);
            });

            data.getAllUsers()
                .then(actualUsers => {
                    expect(actualUsers).to.be.equal(users);
                    done();
                });
        });

        it("getAllUsers should return 5 users", (done) => {
            let users = ["Pesho", "Gosho", "Petyr", "Stamat", "Maria"];
            sinon.stub(User, "find", callback => {
                callback(null, users);
            });

            data.getAllUsers()
                .then(actualUsers => {
                    expect(actualUsers).to.be.equal(users);
                    done();
                });
        });
    });

    describe("getUserByUsername", () => {
        let existingUsername = "Vankata";
        let userForTest = {
            username: existingUsername,
            firstName: "Ivan",
            lastname: "Petrov",
            email: "petrov@mail.bg",
            city: "Sofia"
        };

        let users = [userForTest];
        beforeEach(() => {
            sinon.stub(User, "findOne", (query, callback) => {
                let username = query.username;
                let foundUser = users.find(user => user.username === username);
                callback(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific user", (done) => {
            data.getUserByUsername(existingUsername)
                .then(actualUser => {
                    expect(actualUser).to.equal(userForTest);
                    done();
                });
        });

        it("should not return specific user if passed parameter is incorrect", (done) => {
            let notValidUsername = "Dragana";
            data.getUserByUsername(notValidUsername)
                .then(actualUser => {
                    expect(actualUser).to.equal(null);
                    done();
                });
        });
    });
});