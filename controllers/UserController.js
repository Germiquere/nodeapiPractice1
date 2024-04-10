const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
} = require("../services/UserService");
const { generateAuthToken } = require("../utils/jwt");

const handleRegisterUser = async (req, res) => {
    try {
        const { id, name, email, token } = await registerUser(req.body);
        // logger.info("Usuario registrado" + user.email);
        res.status(201).json({
            ok: true,
            id,
            name,
            email,
            token,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleLoginUser = async (req, res) => {
    try {
        const {
            _id,
            id,
            name,
            email,
            address,
            phone,
            type,
            creationStatus,
            accessStatus,
            token,
        } = await loginUser(req.body);
        // logger.info("Usuario logueado" + user.email);
        res.status(201).json({
            ok: true,
            user: {
                _id,
                id,
                name,
                email,
                address,
                phone,
                type,
                creationStatus,
                accessStatus,
                token,
            },
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleGetAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(201).json({
            ok: true,
            users,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleGetUserById = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(201).json({
            ok: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleUpdateUser = async (req, res) => {
    try {
        const {
            _id,
            id,
            name,
            email,
            address,
            phone,
            type,
            creationStatus,
            accessStatus,
            token,
        } = await updateUser(req.body, req.params.id);
        res.status(201).json({
            ok: true,
            user: {
                _id,
                id,
                name,
                email,
                address,
                phone,
                type,
                creationStatus,
                accessStatus,
                token,
            },
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};
const handleRefreshToken = (req, res) => {
    payload = {
        id: req.id,
        email: req.email,
    };
    const token = generateAuthToken(payload);
    res.json({
        ok: true,
        token,
    });
};

// TODO: borrado de cuenta sin borrarla y cambio de habilitacion de cuenta
module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUser,
    handleRefreshToken,
};
