import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        // Puedes agregar más validaciones según tus necesidades
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Carts'
        // Asegúrate de tener un modelo 'Carts' definido en tu aplicación
    },
    role: {
        type: String,
        default: 'usuario'
    }
},
{timestamps: true},
{ strict: false });

export const usuariosModelo = mongoose.model('usuarios', usuarioSchema);
