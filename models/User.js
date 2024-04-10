const { Schema, model } = require("mongoose");
const UserSchema = Schema({
    id: { type: String, require: true, unique: true, trim: true },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        trim: true,
    },
    type: {
        type: String,
        enum: ["admin", "negocio", "cadete"],
        required: true,
    },
    creationStatus: {
        type: String,
        enum: ["creado", "borrado"],
        default: "creado",
        trim: true,
        require: true,
    },
    accessStatus: {
        type: String,
        enum: ["habilitado", "desabilitado"],
        default: "habilitado",
        trim: true,
        require: true,
    },
});
const userModel = model("User", UserSchema);
module.exports = { userModel };
