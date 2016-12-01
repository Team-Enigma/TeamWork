// /* globals require describe it beforeEach afterEach*/

// const chai = require("chai");
// const sinonModule = require("sinon");
// const chaiHttp = require("chai-http");
// const moment = require("moment");
// const config = require("../../server/configurations");
// const authenticator = require("../../server/utils/authenticator");
// const validator = require("../../server/utils/validator");
// chai.use(chaiHttp);
// let expect = chai.expect;

// describe("Test rides router", () => {
//     let sinon;

//     let controller = {
//         loadAllRides: (req, res) => {},
//         loadSpecificRide: (req, res) => {},
//         loadNewRidePage: (req, res) => {}
//     };

//     let controllers = {
//         rides: controller
//     };

//     let rides = [{
//         _id: 1,
//         driver: "Joro",
//         fromCity: "Vidin",
//         toCity: "Varna",
//         freePlaces: 4
//     }, {
//         _id: 2,
//         fromCity: "Vraca",
//         toCity: "Ruse",
//         cities: ["New York"],
//         freePlaces: 4
//     }];

//     beforeEach(() => {
//         sinon = sinonModule.sandbox.create();

//         sinon.stub(controller, "loadAllRides", (req, res) => {
//             res.render("rides", {
//                 model: rides
//             });
//         });
//         // sinon.stub(controller, "getFractionDetails", (req, res) => {
//         //     let fraction = fractions.find(fr => fr._id === +req.params.id);

//         //     res.render("fractions/details", {
//         //         model: fraction || null
//         //     });
//         // });
//         // sinon.stub(controller, "createFraction", (req, res) => {
//         //     res.render("fractions/list", {
//         //         model: fractions
//         //     });
//         // });
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     describe("GET /rides", () => {
//         it("expect to return 2 rides", done => {
//             let data = {};
//             let app = require("../../server/configurations/express")(data, config);
//             require("../../server/routers/ride-router")(app, authenticator, validator, controllers);

//             chai.request(app)
//                 .get("/rides")
//                 .end((req, res) => {
//                     expect(res.status).equals(200);
//                     done();
//                 });
//         });
//     });

//     // describe("GET /fractions/:id", () => {
//     //     it("Valid ID", done => {
//     //         let app = require("../../config/application")({ data: {} });
//     //         require("../../routers/fractions-router")({ app, controllers });

//     //         chai.request(app)
//     //             .get("/fractions/1")
//     //             .end((req, res) => {
//     //                 expect(res.status).equals(200);
//     //                 done();
//     //             });
//     //     });
//     // });
// });