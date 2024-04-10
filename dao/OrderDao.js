const { orderModel } = require("../models/Order");
const { MongoDao } = require("./MongoDao");
let instance = null;
class OrderDao extends MongoDao {
    constructor() {
        super(orderModel);
    }
    static getInstance() {
        if (!instance) {
            instance = new OrderDao();
        }
        return instance;
    }
    async findAllOrders(params) {
        try {
            if (params && params.pending === "pending") {
                return await this.model.find({ state: "pendiente" }).lean();
            } else {
                return await this.model.find({}).lean();
            }
        } catch (error) {
            throw error;
        }
    }
    async findOrdersByShopDbId(id, queries) {
        try {
            let filter = { shop: id };
            for (let key in queries) {
                if (queries[key] !== undefined) {
                    if (key === "startDate") {
                        const startDate = new Date(queries[key]);
                        const nextDay = new Date(startDate);
                        nextDay.setDate(startDate.getDate() + 1);

                        filter[key] = { $gte: startDate, $lt: nextDay };
                    } else {
                        filter[key] = queries[key];
                    }
                }
            }
            return await this.model.find(filter).lean();
        } catch (error) {
            throw error;
        }
    }
    async findAllOrdersByDriverDbId(id, queries) {
        try {
            let filter = { deliveryDriver: id };
            for (let key in queries) {
                if (queries[key] !== undefined) {
                    if (key === "startDate") {
                        const startDate = new Date(queries[key]);
                        const nextDay = new Date(startDate);
                        nextDay.setDate(startDate.getDate() + 1);

                        filter[key] = { $gte: startDate, $lt: nextDay };
                    } else {
                        filter[key] = queries[key];
                    }
                }
            }
            return await this.model.find(filter).lean();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    OrderDao,
};
