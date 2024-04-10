const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
//======================================================
//genera token
const generateAuthToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        type: user.type,
    };
    const token = jwt.sign(payload, config.secretSeed, { expiresIn: "2h" });
    return token;
};

module.exports = {
    generateAuthToken,
};
