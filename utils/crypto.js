const cryptoNode = require("crypto");

const crypto = () => {
    return cryptoNode.randomBytes(10).toString("hex");
};
module.exports = { crypto };
