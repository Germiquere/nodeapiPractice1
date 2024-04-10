const { Schema, model } = require("mongoose");
const OrderSchema = Schema({
    id: { type: String, require: true, unique: true, trim: true },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
    },
    origin: {
        type: String,
        required: true,
        trim: true,
    },
    destination: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        enum: ["pendiente", "tomado", "entregado", "cancelado"],
        default: "pendiente",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    shop: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    deliveryDriver: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

const orderModel = model("Order", OrderSchema);
module.exports = {
    orderModel,
};
