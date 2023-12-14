// En cartRoutes.js
import express from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = express.Router();

// Ruta para agregar productos al carrito
router.post('/api/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    // Obtén el producto por su ID desde la base de datos
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    // Obtén el carrito por su ID desde la base de datos
    let cart = await Cart.findById(cid);

    // Si el carrito no existe, créalo
    if (!cart) {
      cart = new Cart({ _id: cid, items: [] });
    }

    // Verifica si el producto ya está en el carrito
    const existingItem = cart.items.find((item) => item.product.equals(product._id));

    if (existingItem) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      existingItem.quantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo como nuevo item
      cart.items.push({ product: product._id, quantity: 1 });
    }

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    res.status(201).json({ message: 'Producto agregado al carrito correctamente.' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al cargar el carrito.' });
  }
});

// Ruta para ver el carrito
router.get('/:cid', async (req, res) => { // Elimina '/api/carts'
  try {
    const { cid } = req.params;

    // Obtener el carrito desde la base de datos
    const cart = await Cart.findById(cid).populate('items.product');

    // Renderizar la vista con el contenido del carrito
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al cargar el carrito.' });
  }
});
// Ruta para eliminar un producto específico del carrito
router.delete('/api/carts/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    // Obtén el carrito por su ID desde la base de datos
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Filtra los items del carrito excluyendo el producto que se va a eliminar
    cart.items = cart.items.filter((item) => !item.product.equals(pid));

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    res.json({ message: 'Producto eliminado del carrito correctamente.' });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito.' });
  }
});

// Ruta para actualizar el carrito con un arreglo de productos
router.put('/api/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const { items } = req.body;

    // Verifica que el arreglo de items esté presente en el cuerpo de la solicitud
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Formato de solicitud inválido.' });
    }

    // Obtén el carrito por su ID desde la base de datos
    const cart = await Cart.findById(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado.' });
    }

    // Actualiza los items del carrito con los proporcionados en el cuerpo de la solicitud
    cart.items = items;

    // Guarda el carrito actualizado en la base de datos
    await cart.save();

    res.json({ message: 'Carrito actualizado correctamente.' });
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    res.status(500).json({ error: 'Error al actualizar el carrito.' });
  }
});

// Ruta para eliminar todos los productos del carrito
router.delete('/api/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;

    // Elimina el carrito de la base de datos por su ID
    await Cart.findByIdAndDelete(cid);

    res.json({ message: 'Carrito eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el carrito:', error);
    res.status(500).json({ error: 'Error al eliminar el carrito.' });
  }
});

// Otras rutas según sea necesario

export default router;
