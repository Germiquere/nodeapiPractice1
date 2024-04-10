class Order {
    constructor(
        id,
        { startDate, origin, destination, state = "pendiente", price, shop }
    ) {
        this.id = id;
        this.startDate = startDate;
        this.origin = origin;
        this.destination = destination;
        this.state = state;
        this.price = price;
        this.shop = shop;
    }
}

module.exports = { Order };
