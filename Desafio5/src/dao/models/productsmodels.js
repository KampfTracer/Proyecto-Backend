import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: String,
  price: Number,

});

const Product = mongoose.model('Product', productSchema);

export default Product;
