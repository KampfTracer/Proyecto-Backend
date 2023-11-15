const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

app.use(express.json());

// Función para crear archivos si no existen
function createFiles() {
  const productosPath = path.join(__dirname, 'data', 'productos.json');
  const carritoPath = path.join(__dirname, 'data', 'carrito.json');

  if (!fs.existsSync(productosPath)) {
    fs.writeFileSync(productosPath, '[]', 'utf-8');
  }

  if (!fs.existsSync(carritoPath)) {
    fs.writeFileSync(carritoPath, '[]', 'utf-8');
  }

  console.log('Archivos creados exitosamente.');
}

// Función para generar un ID único
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Llamamos a la función para crear los archivos
createFiles();

// Rutas para productos
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

// Obtener todos los productos
productsRouter.get('/', (req, res) => {
  try {
    const productosData = fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8');
    const productos = JSON.parse(productosData);

    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
  }
});

// Obtener un producto por ID
productsRouter.get('/:pid', (req, res) => {
  try {
    const productosData = fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8');
    const productos = JSON.parse(productosData);

    const productId = req.params.pid;
    const producto = productos.find((p) => p.id === productId);

    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener un producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar un nuevo producto
productsRouter.post('/', (req, res) => {
  try {
    const productosData = fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8');
    const productos = JSON.parse(productosData);

    const newProduct = req.body;

    // Validación de campos obligatorios
    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price) {
      return res.status(400).json({ error: 'Campos obligatorios faltantes' });
    }

    // Asigna un ID único al nuevo producto
    newProduct.id = generateUniqueId();

    productos.push(newProduct);

    fs.writeFileSync(path.join(__dirname, 'data', 'productos.json'), JSON.stringify(productos), 'utf-8');

    res.status(201).json({ message: 'Producto agregado exitosamente', product: newProduct });
  } catch (error) {
    console.error('Error al agregar un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar un producto' });
  }
});

// Actualizar un producto por ID
productsRouter.put('/:pid', (req, res) => {
  try {
    const productosData = fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8');
    const productos = JSON.parse(productosData);

    const productId = req.params.pid;
    const updatedProductData = req.body;

    // Encuentra el índice del producto a actualizar
    const productIndex = productos.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      // Actualiza el producto con los nuevos datos
      productos[productIndex] = { ...productos[productIndex], ...updatedProductData };

      fs.writeFileSync(path.join(__dirname, 'data', 'productos.json'), JSON.stringify(productos), 'utf-8');

      res.status(200).json({ message: 'Producto actualizado exitosamente', product: productos[productIndex] });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar un producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar un producto por ID
productsRouter.delete('/:pid', (req, res) => {
  try {
    const productosData = fs.readFileSync(path.join(__dirname, 'data', 'productos.json'), 'utf-8');
    const productos = JSON.parse(productosData);

    const productId = req.params.pid;

    // Filtra los productos para excluir el producto a eliminar
    const updatedProducts = productos.filter((p) => p.id !== productId);

    if (productos.length !== updatedProducts.length) {
      fs.writeFileSync(path.join(__dirname, 'data', 'productos.json'), JSON.stringify(updatedProducts), 'utf-8');
      res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar un producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Rutas para carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
  try {
    const carritosData = fs.readFileSync(path.join(__dirname, 'data', 'carrito.json'), 'utf-8');
    const carritos = JSON.parse(carritosData);

    const newCart = {
      id: generateUniqueId(),
      products: [],
    };

    carritos.push(newCart);

    fs.writeFileSync(path.join(__dirname, 'data', 'carrito.json'), JSON.stringify(carritos), 'utf-8');

    res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
  } catch (error) {
    console.error('Error al crear un nuevo carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor al crear un carrito' });
  }
});

// Obtener productos de un carrito por ID
cartsRouter.get('/:cid', (req, res) => {
  try {
    const carritosData = fs.readFileSync(path.join(__dirname, 'data', 'carrito.json'), 'utf-8');
    const carritos = JSON.parse(carritosData);

    const cartId = req.params.cid;
    const cart = carritos.find((c) => c.id === cartId);

    if (cart) {
      res.status(200).json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener productos de un carrito por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Agregar un producto a un carrito
cartsRouter.post('/:cid/product/:pid', (req, res) => {
  try {
    const carritosData = fs.readFileSync(path.join(__dirname, 'data', 'carrito.json'), 'utf-8');
    const carritos = JSON.parse(carritosData);

    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = carritos.find((c) => c.id === cartId);
    const productToAdd = req.body;

    // Verifica si el producto ya está en el carrito
    const existingProduct = cart.products.find((p) => p.id === productId);

    if (existingProduct) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      existingProduct.quantity = (existingProduct.quantity || 1) + (productToAdd.quantity || 1);
      res.status(200).json({ message: 'Cantidad de producto actualizada en el carrito', product: existingProduct });
    } else {
      // Si el producto no está en el carrito, agrégalo con la cantidad proporcionada o 1 por defecto
      const newProduct = { id: productId, ...productToAdd, quantity: productToAdd.quantity || 1 };
      cart.products.push(newProduct);

      fs.writeFileSync(path.join(__dirname, 'data', 'carrito.json'), JSON.stringify(carritos), 'utf-8');

      res.status(200).json({ message: 'Producto agregado al carrito exitosamente', product: newProduct });
    }
  } catch (error) {
    console.error('Error al agregar un producto a un carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
