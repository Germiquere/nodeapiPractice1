const mongoose = require("mongoose");
const { config } = require("../config/config");
const dbConnection = async () => {
    try {
        await mongoose.connect(config.dbConnection, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB online");
    } catch (error) {
        console.log(error);
        // TODO:agregar logger
        throw new Error("Error a la hora de inicializar la DB");
    }
};
module.exports = { dbConnection };
