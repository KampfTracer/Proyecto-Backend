import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'

// const productsColleccion = "products";

const productsEsquema = new mongoose.Schema(
  {
    title: String,
    description: String,
    price: Number,
    thumbnail: Array,

    code: {
      type: String,
      unique: true,
      required: true,
    },
    stock: Number,
    category: String,
    status: { type: Boolean, default: true },

    deleted: {
      type: Boolean,
      default: false,
    }, 
  },
  {
    timestamps: true,
    strict: true,
    collection: 'products'
  }
);


productsEsquema.plugin(paginate)

export const productsModelo = mongoose.model(
  'products',
  productsEsquema
);