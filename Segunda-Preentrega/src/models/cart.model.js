// models/cart.model.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: String, // Puedes ajustar esto según tus necesidades
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  total: Number,
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
