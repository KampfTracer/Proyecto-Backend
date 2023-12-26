import mongoose from "mongoose";

const messagesCollection = "mensaje";

const messagesEsquema = new mongoose.Schema(
  {
    usuario: String,



    mensajes: [
      { mensaje: String, 
        fecha: { type: Date, default: Date.now } 
      }
    ],

 
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, 
    strict: true, 
  }
);

export const messagesModelo = mongoose.model(
  messagesCollection,
  messagesEsquema
);