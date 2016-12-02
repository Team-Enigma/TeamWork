/* globals require describe it*/

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Test rides routers", () => {

    it("GET /rides to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/rides")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("POST /rides to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .post("/rides")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("GET /rides/:id to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/rides/1")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("GET /add-ride to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/add-ride")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("Post /add-ride to return expected message and status code 401", (done) => {
        chai.request("http://localhost:8080")
            .post("/add-ride")
            .end((err, res) => {
                expect(err.response.text).to.contains("You are not authorized for this request.");
                expect(res).to.have.status(401);
                done();
            });
    });
});