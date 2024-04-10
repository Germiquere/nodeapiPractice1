const {
    createOrder,
    updateOrder,
    getOrdersByShop,
    getOrdersTakenByDriver,
    getOrdersByDriver,
    getAllOrders,
} = require("../services/OrderSerive");

const handleCreateOrder = async (req, res) => {
    try {
        const order = await createOrder(req.body);
        res.status(201).json({
            ok: true,
            order,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleUpdateOrder = async (req, res) => {
    try {
        const order = await updateOrder(req.body, req.params.id);
        res.status(201).json({
            ok: true,
            order,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleGetAllOrders = async (req, res) => {
    try {
        const orders = await getAllOrders(req.params);
        res.status(201).json({
            ok: true,
            orders,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleGetOrdersByShop = async (req, res) => {
    try {
        const orders = await getOrdersByShop(req.params.id, req.query);
        res.status(201).json({
            ok: true,
            orders,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleGetOrdersByDriver = async (req, res) => {
    try {
        const orders = await getOrdersByDriver(req.params.id, req.query);
        res.status(201).json({
            ok: true,
            orders,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
module.exports = {
    handleCreateOrder,
    handleUpdateOrder,
    handleGetAllOrders,
    handleGetOrdersByShop,
    handleGetOrdersByDriver,
};
