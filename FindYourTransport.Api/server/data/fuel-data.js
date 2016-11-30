module.exports = (models) => {

    let { Fuel } = models;

    function createFuel(name, price) {
        return new Fuel({
            fuelName: name,
            fuelPrice: price
        });
    }
    function insertFuelsIntoDatabase(fuels) {
        Fuel.insertMany(fuels);
    }

    return {
        createFuel,
        insertFuelsIntoDatabase
    };
};