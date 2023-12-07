import express from 'express';
import Product from '../src/dao/models/productsmodels.js';

const productsRouter = express.Router();

// Obtener todos los productos
productsRouter.get('/', async (req, res) => {
  try {
    const productos = await Product.find();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
  }
});

// Agregar un nuevo producto
productsRouter.post('/', async (req, res) => {
  try {
    const newProduct = req.body;
    const createdProduct = await Product.create(newProduct);

    res.status(201).json({ message: 'Producto agregado exitosamente', product: createdProduct });
  } catch (error) {
    console.error('Error al agregar un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar un producto' });
  }
});

export default productsRouter;
