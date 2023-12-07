import express from 'express';
import Cart from '../src/dao/models/cartsmodels.js';
;

const cartsRouter = express.Router();

// Obtener productos de un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId);

    if (cart) {
      res.status(200).json(cart.products);
    } else {
      res.status  (404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener productos de un carrito por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar un producto a un carrito
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await Cart.findById(cartId);
    const productToAdd = req.body;

    const existingProduct = cart.products.find((p) => p.id === productId);

    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + (productToAdd.quantity || 1);
      res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito', product: existingProduct });
    } else {
      const newProduct = { id: productId, ...productToAdd, quantity: productToAdd.quantity || 1 };
      cart.products.push(newProduct);

      await cart.save();

      res.status(200).json({ message: 'Producto agregado al carrito exitosamente', product: newProduct });
    }
  } catch (error) {
    console.error('Error al agregar un producto a un carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});



export default cartsRouter;
