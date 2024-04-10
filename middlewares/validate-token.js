const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const validateToken = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: "No hay token en la peticion",
        });
    }
    try {
        const { id, email, type } = jwt.verify(token, config.secretSeed);
        req.id = id;
        req.email = email;
        req.type = type;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: "Token no valido",
        });
    }
    next();
};
module.exports = {
    validateToken,
};
