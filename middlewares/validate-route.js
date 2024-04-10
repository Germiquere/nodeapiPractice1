const { check } = require("express-validator");

const validateRoute = (route) => {
    // REGISTER
    if (route === "register") {
        return [
            check("name", "El nombre es obligatorio").not().isEmpty(),
            check("email", "El email es obligatorio").isEmail(),
            check(
                "password",
                "La contraseña debe de tener minimo 8 caracteres y al menos 1 mayuscula"
            ).isLength({ min: 8 }),
            // .matches(/[A-Z]/, "g"),
            check("type", "El tipo de usuario es obligatorio").not().isEmpty(),
        ];
    }
    // LOGIN
    else if (route === "login") {
        return [
            check("email", "El email es obligatorio").isEmail(),
            check(
                "password",
                "La contraseña debe de tener minimo 8 caracteres y al menos 1 mayuscula"
            ).isLength({ min: 8 }),
            // .matches(/[A-Z]/, "g"),
        ];
    }
    //CREATE OR UPDATE ORDER
    else if (route === "createOrder") {
        return [
            check(
                "startDate",
                "La fecha es obligatrio con formato YYYY-MM-DDTHH:mm:ss.sssZ"
            )
                .notEmpty()
                .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/i),
            check("origin", "El lugar de origen es requerido").not().isEmpty(),
            check("destination", "El luegar de destino es requerido")
                .not()
                .isEmpty(),
            check("price", "El precio es requerido").not().isEmpty(),
            check("shop", "El id del negocio es requerido").not().isEmpty(),
        ];
    }
};

module.exports = {
    validateRoute,
};
