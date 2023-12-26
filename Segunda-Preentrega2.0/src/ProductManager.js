import { existsSync, promises } from "fs";

console.clear();

export class ProductManager {
  constructor(rutaArchivo) {
    this.path = rutaArchivo;
  }

  async getProductsAsyncFS() {
    if (existsSync(this.path)) {
      return JSON.parse(await promises.readFile(this.path, "utf-8"));
    } else {
      return [];
    }
  }

  async addProductAsyncFS(title, description, price, thumbnail = [], code, stock, category, status = true) {
    try {
      let productos = await this.getProductsAsyncFS();
      let existeCode = productos.find((producto) => producto.code === code);
      
      let id = 1;

      if (productos.length > 0) {
        id = productos[productos.length - 1].id + 1;
      } else {
        id = 1;
      }
      
      let producto = {
        id: id,
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        category: category,
        status: status,
      };

      if (existeCode) {
        console.log(`El usuario con code = ${code} ya existe`);
        return;
      } else {
        productos.push(producto);
        await promises.writeFile(this.path, JSON.stringify(productos, null, 5));
        return producto;
      }
    } catch (error) {
      console.log(`Se ha producido un error al agregar el producto  `)
      throw new Error(`Se ha producido un error al agregar el producto `)
    }
  }

  async getProductByIdAsyncFS(id) {
    let productos = await this.getProductsAsyncFS();
    let indice = productos.findIndex((producto) => producto.id === id);
    if (indice === -1) {
      console.log(`No existe el producto con id ${id}  Not Found`);
      return;
    }

    return productos[indice];
  }

  async delProductAsyncFS(id) {
    try {
      let productos = await this.getProductsAsyncFS();
      let indice = productos.findIndex((producto) => producto.id === id);
      if (indice === -1) {
        console.log(`No existe el producto con id ${id}  Not Found`);
        return;
      } else {
        console.log(`El producto con ${id} se ha eliminado`);
        let productoeliminado = productos.splice(indice, 1);
        await promises.writeFile(this.path, JSON.stringify(productos, null, 5));
        return productoeliminado;
      }
    } catch (error) {
      console.log(`Se ha producido un error al borrar el producto con id ${id}`)
      throw new Error(`Se ha producido un error al borrar el producto con id ${id}`)
    }
  }

  async updateProductAsyncFS(id, objeto) {
    let productos = await this.getProductsAsyncFS();
    let indice = productos.findIndex((producto) => producto.id === id);
    if (indice === -1) {
      console.log(`No existe el producto con id ${id}  Not Found`);
      return `No existe el producto con id ${id}  Not Found`;
    }

    const comprobarObjeto = (obj) => obj === Object(obj);
    const objetoComprobado = comprobarObjeto(objeto);

    if (!objetoComprobado) {
      console.log("no es un objeto");
      return;
    }

    const camposObjetosLlenos = (obj) => {
      if (Object.values(obj).length === 0) {
        console.log("Debe ingresar al menos un campo, con su valor ");
        return;
      }
    };

    camposObjetosLlenos(objeto);

    const claves = Object.keys(objeto);
    const clavesMaestras = Object.keys(productos[0]);

    try {
      claves.forEach((datoObjeto) => {
        let dato = clavesMaestras.includes(datoObjeto);

        if (!dato) {
          console.log(`NO EXISTE EL CAMPO ${datoObjeto}`);
          throw `Error de campo`;
        }
      });
    } catch (error) {
      console.log(error.message);
    }

    productos[indice] = {
      ...productos[indice],
      ...objeto,
      id,
    };

    await promises.writeFile(this.path, JSON.stringify(productos, null, 5));
    return productos[indice];
  }
}
