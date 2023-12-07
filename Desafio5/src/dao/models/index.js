import express from 'express';
import mongoose from 'mongoose';
import { router as usuariosRouter } from './routes/usuarios.js';
import Product from './src/dao/models/productsmodels.js';
import Cart from './src/dao/models/cartsmodels.js';
import Message from './src/dao/models/messagesmodels.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// ... Otras rutas y configuraciones según sea necesario ...

// Conecta a la base de datos MongoDB
mongoose.connect("mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/eccommerce?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB online..!!");
  // Inicia el servidor después de conectar la base de datos
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
}).catch((error) => {
  console.log(error.message);
});
