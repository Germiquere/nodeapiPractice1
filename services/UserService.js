const { User } = require("../classes/User");
const { UserDao } = require("../dao/UserDao");
const { encryptPassword, matchPassword } = require("../utils/bcrypt");
const { crypto } = require("../utils/crypto");
const { generateAuthToken } = require("../utils/jwt");
const userInstance = UserDao.getInstance();
//======================================================
//registro de usuario
const registerUser = async (data) => {
    try {
        const userExists = await userInstance.findByEmail(data.email);
        // BUSCAR EL ESTADO DE BORRADO O ACTIVO.
        // SI EXISTE EL EMAIL PERO TIENE ESTADO BORRADO QUE ME CREE LA CUENTA
        // SI NO EXISTE EL EMAIL QUE ME CREE LA CUENTA
        // VER LA FORMA DE BUSCAR LA QUERY

        if (!userExists) {
            const id = crypto();
            const newUser = new User(id, data);
            newUser.password = await encryptPassword(newUser.password);
            await userInstance.save(newUser);
            newUser.token = generateAuthToken(newUser);
            return newUser;
        } else {
            throw "El email ya esta en uso";
        }
    } catch (error) {
        throw new Error(error);
    }
};
const loginUser = async (data) => {
    try {
        const user = await userInstance.findByEmail(data.email);
        if (!user) {
            throw "El email es incorrecto";
        }
        // check password
        // !!!!! PREGUNTA: PUEDE SER EL VALIDAR PASSWORD UN METODO DE USUARIO Y YO AL RECIBIR EL USUARIO CREO UN NEW USUARIO Y USO EL METODO ??? !!!!!
        const validPassword = await matchPassword(data.password, user.password);
        if (!validPassword) {
            throw "La contraseña es incorrecta";
        }
        user.token = generateAuthToken(user);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};
const getAllUsers = async () => {
    try {
        const users = await userInstance.getAll();
        return users;
    } catch (error) {
        throw new Error(error);
    }
};
const getUserById = async (id) => {
    try {
        const user = await userInstance.findById(id);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};
const updateUser = async (data, id) => {
    try {
        const userExists = await userInstance.findById(id);
        if (!userExists) {
            throw "El usuario no existe";
        }
        const newUser = {
            id,
            password: userExists.password,
            ...data,
        };
        await userInstance.update(data);

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};
module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
};
