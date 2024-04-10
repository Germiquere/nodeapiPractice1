/* 
 Order Routes
 /api/orders
*/
const { Router } = require("express");
const {
    handleCreateOrder,
    handleUpdateOrder,
    handleGetOrdersByShop,
    handleGetOrdersByDriver,
    handleGetAllOrders,
} = require("../controllers/OrderController");
const { validateToken } = require("../middlewares/validate-token");
const { validateShop } = require("../middlewares/validate-shop");
const { validateDriver } = require("../middlewares/validate-driver");
const { validateRoute } = require("../middlewares/validate-route");
const { validateFilds } = require("../middlewares/validate-fild");
const router = Router();
router.use(validateToken);
// create
router.post(
    "/",
    [validateRoute("createOrder"), validateFilds],
    handleCreateOrder
);
// actualiza por el id del back
router.put(
    "/:id",
    [validateRoute("createOrder"), validateFilds],
    handleUpdateOrder
);
// busca todos los pedidos o los pedidos pendientes
router.get("/:pending?", [validateDriver], handleGetAllOrders);
// busca los pedidos hechos por un negocio por el id de la base de datos
router.get("/shop/:id", [validateShop], handleGetOrdersByShop);
// busca los pedidos  por un negocio por el id de la base de datos
router.get("/deliveryDriver/:id", [validateDriver], handleGetOrdersByDriver);
module.exports = router;
