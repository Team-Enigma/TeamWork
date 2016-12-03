module.exports = (data, passport, constants) => {

    function loadCalculatePricePage(req, res) {
        res.render("../views/ride-views/calculate-price.pug");
    }

    function calculatePrice(req, res) {
        const distance = req.body.distance;
        const consumption = req.body.consumption;
        const fuelType = req.body.fuelType;

        console.log(req.body);

        data.getSpecificFuelByName(fuelType)
            .then((fuel) => {

                console.log(fuel);

                const fuelPrice = fuel.fuelPrice.replace(",", ".");
                const parsedFuelPrice = parseFloat(fuelPrice);
                const parsedDistance = parseFloat(distance);
                const parsedConsumption = parseFloat(consumption);

                let cashedPrice = {
                    fuelPrice,
                    distance: parsedDistance,
                    consumption: parsedConsumption,
                    fuelType
                };

                const sum = parsedDistance * (parsedConsumption / 100.0) * parsedFuelPrice;

                cashedPrice.sum = sum.toFixed(2);

                res.status(200);
                return res.render("../views/ride-views/calculate-price.pug", cashedPrice);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "Problem occured while calculating the price. ${err}"}`);
            })
    }

    return {
        name: "fuel",
        loadCalculatePricePage,
        calculatePrice
    };
};