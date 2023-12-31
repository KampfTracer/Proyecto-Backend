import { Router } from 'express';
import { join } from "path";
import __dirname from '../utils2.js';
import { ProductManager } from '../ProductManager.js';
import { io } from '../app.js';

let archivo = join(__dirname, "/archivos/products.json");
const productManager = new ProductManager(archivo);

export const router = Router();

router.get('/', async (req, res) => {
  let resultado = await productManager.getProductsAsyncFS();

  if (req.query.limit) {
    resultado = resultado.slice(0, req.query.limit);
  }
  res.setHeader("Content-type", "application/json");
  return res.status(200).json({ filtros: req.query, resultado });
});

router.get('/:pid', async (req, res) => {
  let { pid } = req.params
  pid = parseInt(pid)

  if (isNaN(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).send({ error: "Error, ingrese un argumento id numerico" });
  }
  let resultado = await productManager.getProductByIdAsyncFS(pid)

  if (!resultado) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).send({ error: `Error, No existe el id ${pid}` });
  }
  res.setHeader("Content-type", "application/json");
  return res.status(200).json({ filtros: req.params, resultado });
});

router.post('/', async (req, res) => {
  let { title, description, price, thumbnail = [], code, stock, category, status } = req.body;

  if (!title || !description || !price || !code || !stock || !category) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({
      error: `Los datos title, description, price, code, stock , category y status son obligatorios`,
    });
  }

  let resultado = await productManager.addProductAsyncFS(title, description, price, thumbnail, code, stock, category, status)

  if (!resultado) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `Se ha producido un error al agregar el producto` });
  } else {
    io.emit("nuevoProducto", resultado)
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ message: 'Producto Agregado', resultado });
  }
});

router.put('/:pid', async (req, res) => {
  let { pid } = req.params;
  pid = parseInt(pid)
  if (isNaN(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `Debe de ingresar un id numerico` });
  }

  let propiedadesPermitidas = ["title", "description", "price", "thumbnail", "code", "stock", "category", "status"];
  let propiedadesQueLlegan = Object.keys(req.body);

  let valido = propiedadesQueLlegan.every((propiedad) => propiedadesPermitidas.includes(propiedad));

  if (!valido) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `No se aceptan algunas propiedades`, propiedadesPermitidas });
  }

  let resultado = await productManager.updateProductAsyncFS(pid, req.body)

  res.setHeader("Content-Type", "application/json");
  return res.status(200).json({ resultado });
});

router.delete('/:pid', async (req, res) => {
  let { pid } = req.params;
  pid = parseInt(pid);

  if (isNaN(pid)) {
    res.setHeader("Content-Type", "application/json");
    return res.status(400).json({ error: `Debe de ingresar un id numerico` });
  }

  let resultado = await productManager.delProductAsyncFS(pid)

  if (!resultado) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(400).json({ error: `No existe el producto con id ${pid}  Not Found` });
  } else {
    io.emit("deleteProducto", pid)
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json({ message: 'Producto Eliminado', resultado });
  }
});
