/* 
 Auth Routes
 /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");
const { validateFilds } = require("../middlewares/validate-fild");
const {
    handleLoginUser,
    handleRegisterUser,
    handleRefreshToken,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
} = require("../controllers/UserController");
const { validateToken } = require("../middlewares/validate-token");
const { validateRoute } = require("../middlewares/validate-route");
const { validateShop } = require("../middlewares/validate-shop");
const router = Router();
// register
router.post(
    "/auth/register",
    [validateRoute("register"), validateFilds],
    handleRegisterUser
);
// login
router.post(
    "/auth/login",
    [validateRoute("login"), validateFilds],
    handleLoginUser
);
// get all users

router.get("/", validateToken, handleGetAllUsers);
// get user by back id
router.get("/:id", validateToken, handleGetUserById);
// update user by id
router.put("/:id", validateToken, validateShop, handleUpdateUser);
// refreshToken
router.get("/renewToken", validateToken, handleRefreshToken);
module.exports = router;
