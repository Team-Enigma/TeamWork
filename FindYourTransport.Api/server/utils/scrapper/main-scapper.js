const urlLinks = require("./url-links").urls;
const httpRequester = require("./http-requester");
const htmlParser = require("./html-parser");

urlLinks.forEach((url) => {
    httpRequester.get(url)
        .then((result) => {
            const selectorFuelName = ".row .col-sm-8 h1";
            const selectorFuelPrice = ".row .col-sm-3 h2";
            const html = result.body;
            return htmlParser.parseFuelPrice(selectorFuelName, selectorFuelPrice, html);
        })
        .then((result) => {
            console.log(result);
        });

}, this);