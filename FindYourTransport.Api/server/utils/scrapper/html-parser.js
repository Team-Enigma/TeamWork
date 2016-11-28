const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

function parseFuelPrice(firstSelector, secondSelector, html) {
    $("body").html(html);
    let fuels = [];
    let textForFuelName = $(firstSelector).html();
    let textForPriceOfFuel = $(secondSelector).html();

    fuels.push({
        fuelName: textForFuelName,
        fuelPrice: textForPriceOfFuel
    });

    return Promise.resolve()
        .then(() => {
            return fuels;
        });
}

module.exports = { parseFuelPrice };