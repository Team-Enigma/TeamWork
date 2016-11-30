class Ride {
    constructor(properties) {
        this.id = properties.id;
        this.driver = properties.driver;
        this.fromCity = properties.fromCity;
        this.toCity = properties.toCity;
        this.freePlaces = properties.freePlaces;
        this.price = properties.price;
        this.contact = properties.contact;
    }

    save() {}
    static find() {}
    static findOne() {}
}

module.exports = Ride;