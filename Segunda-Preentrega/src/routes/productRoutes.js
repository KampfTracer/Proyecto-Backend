// En productRoutes.js
import express from 'express';
import Product from '../models/product.model.js';

const router = express.Router();

// ... (Código existente)

// Ruta para obtener la lista de productos con filtros, paginación y ordenamiento
router.get('/api/products', async (req, res) => {
  try {
    // Obtener parámetros de consulta
    const { limit, page, sort, query, category, availability } = req.query;

    // Construir el objeto de opciones para la consulta
    const options = {};

    // Aplicar opciones según sea necesario (limit, page, sort, query)
    if (limit) {
      options.limit = parseInt(limit);
    }

    if (page) {
      options.skip = (parseInt(page) - 1) * (options.limit || 10);
    }

    if (sort) {
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      options.sort = { [sortField]: sort.startsWith('-') ? -1 : 1 };
    }

    if (query) {
      options.filter = { name: { $regex: query, $options: 'i' } };
    }

    // Aplicar opciones específicas para búsqueda por categoría o disponibilidad
    if (category) {
      options.filter = { ...options.filter, category: { $regex: category, $options: 'i' } };
    }

    if (availability !== undefined) {
      options.filter = { ...options.filter, availability: availability === 'true' };
    }

    // Realizar la consulta a la base de datos
    const products = await Product.find(options.filter || {}, null, options);

    // Enviar la lista de productos en la respuesta
    res.json(products);
  } catch (error) {
    // Manejar errores si ocurren durante la consulta
    console.error('Error al obtener la lista de productos:', error);
    res.status(500).json({ error: 'Error al obtener la lista de productos.' });
  }
});

// Otros endpoints según sea necesario

export default router;
