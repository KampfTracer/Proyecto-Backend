import mongoose from 'mongoose';
import Product from '../src/models/product.model.js';

const productsData = [
  { name: 'One Piece Vol. 1', price: 15, category: 'Manga', availability: true },
  { name: 'Naruto Vol. 1', price: 12, category: 'Manga', availability: true },
  { name: 'Attack on Titan Vol. 1', price: 18, category: 'Manga', availability: true },
  { name: 'My Hero Academia Vol. 1', price: 20, category: 'Manga', availability: true },
  { name: 'Demon Slayer Vol. 1', price: 25, category: 'Manga', availability: true },
  { name: 'Death Note Vol. 1', price: 15, category: 'Manga', availability: true },
  { name: 'One Punch Man Vol. 1', price: 18, category: 'Manga', availability: true },
  { name: 'Tokyo Ghoul Vol. 1', price: 22, category: 'Manga', availability: true },
  { name: 'Dragon Ball Vol. 1', price: 20, category: 'Manga', availability: true },
  { name: 'Bleach Vol. 1', price: 18, category: 'Manga', availability: true },
  { name: 'Fullmetal Alchemist Vol. 1', price: 20, category: 'Manga', availability: true },
  { name: 'Hunter x Hunter Vol. 1', price: 25, category: 'Manga', availability: true },
  { name: 'One Piece Vol. 2', price: 15, category: 'Manga', availability: true },
  { name: 'Naruto Vol. 2', price: 12, category: 'Manga', availability: true },
  { name: 'Attack on Titan Vol. 2', price: 18, category: 'Manga', availability: true },
  { name: 'My Hero Academia Vol. 2', price: 20, category: 'Manga', availability: true },
  { name: 'Demon Slayer Vol. 2', price: 25, category: 'Manga', availability: true },
  { name: 'Death Note Vol. 2', price: 15, category: 'Manga', availability: true },
  { name: 'One Punch Man Vol. 2', price: 18, category: 'Manga', availability: true },
  { name: 'Tokyo Ghoul Vol. 2', price: 22, category: 'Manga', availability: true },
  { name: 'Dragon Ball Vol. 2', price: 20, category: 'Manga', availability: true },
  { name: 'Bleach Vol. 2', price: 18, category: 'Manga', availability: true },
  { name: 'Fullmetal Alchemist Vol. 2', price: 20, category: 'Manga', availability: true },
  { name: 'Hunter x Hunter Vol. 2', price: 25, category: 'Manga', availability: true },
  // Agrega más productos según sea necesario
];

async function init() {
  try {
    const dbURI = 'mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/eccommerce?retryWrites=true&w=majority';
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

    // Elimina todos los productos existentes
    await Product.deleteMany();

    // Agrega nuevos productos
    await Product.insertMany(productsData);

    console.log('Productos agregados exitosamente.');
  } catch (error) {
    console.error('Error al inicializar productos:', error.message);
  } finally {
    // Cierra la conexión a la base de datos
    await mongoose.connection.close();
  }
}

// Ejecuta el script de inicialización
init();
