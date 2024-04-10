require("dotenv").config();
const config = {
    port: process.env.PORT,
    dbConnection: process.env.DB_CNN,
    secretSeed: process.env.SECRET_JWT_SEED,
};
module.exports = { config };
