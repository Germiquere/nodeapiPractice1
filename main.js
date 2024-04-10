//======================================================
//imports libs

const express = require("express");
const { config } = require("./config/config");
const { dbConnection } = require("./database/mongoClient");

//======================================================
//app Initializations

// Crear el servidor de express
const app = express();
require("dotenv").config();

//======================================================
// Base de datos
dbConnection();
//======================================================
//middlewares
// Lectura y parseo del body
app.use(express.json());
//======================================================
//rutas

app.use("/api/users", require("./routes/UserRoutes"));
app.use("/api/orders", require("./routes/OrderRoutes"));
//======================================================
// Escuchar peticiones
app.listen(config.port, () => {
    console.log(`Servidor corriendo en puerto ${config.port}`);
});
