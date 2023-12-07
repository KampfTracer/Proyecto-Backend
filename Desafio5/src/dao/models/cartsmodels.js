import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },

    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;