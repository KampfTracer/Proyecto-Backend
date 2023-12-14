// models/product.model.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
