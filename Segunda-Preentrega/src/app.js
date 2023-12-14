// app.js
import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js'; // Importa el router de cartRoutes.js

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const app = express();

// Configuración de Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware para el manejo de datos JSON y URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/products', productRouter); // Cambia '/' a '/products'
app.use('/api/carts', cartRouter); // Cambia '/api' a '/api/carts'

// Inicialización del servidor y conexión a la base de datos
const startServer = async () => {
  try {
    await mongoose.connect('mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/eccommerce?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conexión a DB establecida');

    const server = app.listen(PORT, () => {
      console.log(`Server escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// Inicia el servidor
startServer();
