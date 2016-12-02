module.exports = (models) => {

    let { Fuel } = models;

    function updateFuels(fuel) {
        const options = {
            new: true,
            upsert: true,
            setDefaultsOnInsert: true
        };

        console.log(fuel);

        Fuel.findOneAndUpdate({ fuelName: fuel.fuelName }, { fuelPrice: fuel.fuelPrice }, options, (err) => {
            if (err) {
                return err;
            }

            return;
        });
    }

    return { updateFuels };
};