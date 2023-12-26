import mongoose from "mongoose";

const cartsCollection = "carts";


const cartsEsquema = new mongoose.Schema(
  {


    products: {
    
     type:[
      {
        productId:{
          type: mongoose.Schema.Types.ObjectId,
          ref:   'products'
        },
        qty:Number
      }
     ]
    },






    deleted: {
      type: Boolean,
      default: false,
    }, //para DELETE LOGICO
  },

  {
    timestamps: true, 
    strict: true, 
  }
);
cartsEsquema.pre('findOne', function(){
  this.populate(
    {path:'products.productId'}
  ).lean()
})
cartsEsquema.pre('find', function(){
  this.populate(
    {path:'products.productId'}
  ).lean()
})


export const cartsModelo = mongoose.model(cartsCollection, cartsEsquema);