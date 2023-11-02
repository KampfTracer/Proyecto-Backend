// app.js
const express = require('express');
const ProductManager = require('./ProductManager');  // Ajusta esta ruta
const app = express();
const port = 8080;
const productManager = new ProductManager();

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint para obtener un producto por ID
app.get('/products/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
