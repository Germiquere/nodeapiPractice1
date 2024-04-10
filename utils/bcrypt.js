const bcrypt = require("bcryptjs");

//======================================================
//encripa una contraseña
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//======================================================
//compara contraseñas
const matchPassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};
module.exports = {
  encryptPassword,
  matchPassword,
};
