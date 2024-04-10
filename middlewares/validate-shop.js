const validateShop = (req, res, next) => {
    if (req.type !== "admin" && req.type !== "negocio") {
        return res.status(403).json({
            ok: false,
            message:
                "Acceso prohibido. No tienes permiso para acceder a esta ruta NEGOCIO.",
        });
    }
    next();
};
module.exports = {
    validateShop,
};
