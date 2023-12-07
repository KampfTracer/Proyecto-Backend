import express from 'express';
import mongoose from 'mongoose';
import usuariosRouter from './routes/usuarios.js';
import Product from './src/dao/models/productsmodels.js';
import Cart from './src/dao/models/cartsmodels.js';
import Message from './src/dao/models/messagesmodels.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send("OK");
});

// Utiliza tu enrutador de usuarios
app.use("/api/usuarios", usuariosRouter);

// Rutas para productos
const productsRouter = express.Router();
app.use('/api/products', productsRouter);

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

// Rutas para carritos
const cartsRouter = express.Router();
app.use('/api/carts', cartsRouter);

// Obtener productos de un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await Cart.findById(cartId);

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

// Rutas para mensajes
const messagesRouter = express.Router();
app.use('/api/messages', messagesRouter);

// ... Configuración adicional de rutas y funciones según sea necesario ...

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    await mongoose.connect("mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/eccommerce?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB online..!!");
} catch (error) {
    console.log(error.message);
}
