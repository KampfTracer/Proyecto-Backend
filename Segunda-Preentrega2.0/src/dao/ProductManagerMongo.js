import { productsModelo } from "./models/products.model.js";


export class ProductManagerMongo {

  //Consigue los productos del MONGO ATLAS
  async getProductsMongo() {
    try {
      return await productsModelo.find({ deleted: false }).lean();
    } catch (error) {
      console.log(error.messsage);
      return null;
    }
  }

  //Consigue el pructo por ID de MOngo Atlas

  async getProductByIdMongo(id) {

    return await productsModelo.findOne({deleted:false, _id:id}).lean()
  
  }



  //Agregar un producto al Mongo Atlas
  async addProductMongo(
    title,
    description,
    price,
    thumbnail = [],
    code,
    stock,
    category,
    status = true
  ) {




    try {
        let producto = {
           
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            category: category,
            status: status,
          };

       let nuevoProducto = await productsModelo.create(producto)
                

                return nuevoProducto
    } catch (error) {
               

                console.log(`error inesperado en el servidor -Intente mas tarde`, error.message)
                return error.mensaje
    }

   
  }


  async updateProductMongo(id, objeto) {

    return await productsModelo.updateOne({deleted:false, _id:id}, objeto)

    
   
  }

  async delProductMongo(id) {
    return await productsModelo.updateOne({deleted:false, _id:id},{$set:{deleted:true}})
  }



}