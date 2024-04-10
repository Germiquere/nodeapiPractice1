const { Order } = require("../classes/Order");
const { crypto } = require("../utils/crypto");
const { OrderDao } = require("../dao/OrderDao");
const orderInstance = OrderDao.getInstance();
const createOrder = async (data) => {
    try {
        const id = crypto();
        const newOrder = new Order(id, data);
        await orderInstance.save(newOrder);
        return newOrder;
    } catch (error) {
        throw new Error("Error al crear el pedido");
    }
};
const updateOrder = async (data, id) => {
    try {
        const orderExists = await orderInstance.findById(id);
        if (!orderExists) {
            throw "La orden no existe";
        }

        const newOrder = {
            id,
            ...data,
        };
        if (orderExists.state != "pendiente" && newOrder.state == "cancelado") {
            throw "No puedes cancelar un pedido ya tomado";
        } else if (
            newOrder.state === "entregado" &&
            newOrder.endDate == undefined
        ) {
            throw "Se necesita hora de finalizacion al entregar un pedido";
        }
        await orderInstance.update(newOrder);
        return newOrder;
    } catch (error) {
        throw new Error(error);
    }
};
const getAllOrders = async (params) => {
    try {
        const orders = await orderInstance.findAllOrders(params);
        return orders;
    } catch (error) {
        throw new Error(error);
    }
};
const getOrdersByShop = async (id, queries) => {
    // TODO: averiguar si traer una instasnia del usuario para comprobar que exista esta bien o no
    try {
        const orders = await orderInstance.findOrdersByShopDbId(id, queries);
        // console.log(orders);
        return orders;
    } catch (error) {
        throw new Error(error);
    }
};
const getOrdersByDriver = async (id, queries) => {
    try {
        const orders = await orderInstance.findAllOrdersByDriverDbId(
            id,
            queries
        );
        return orders;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
    createOrder,
    updateOrder,
    getAllOrders,
    getOrdersByShop,
    getOrdersByDriver,
};
