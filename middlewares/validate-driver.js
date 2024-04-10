const validateDriver = (req, res, next) => {
    if (req.type !== "admin" || req.type !== "cadete") {
        return res.status(403).json({
            ok: false,
            message:
                "Acceso prohibido. No tienes permiso para acceder a esta ruta.",
        });
    }
    next();
};
module.exports = {
    validateDriver,
};
