// app.js
const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const configureWebSocket = require('./websocket');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configurar Handlebars con la nueva configuración
app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'handlebars');

// Inicializar la base de datos
const adapter = new FileSync('db.json');
const db = low(adapter);
db.defaults({ products: [] }).write();

// Configuración básica de Socket.IO
configureWebSocket(io, db);

// Datos de ejemplo para probar
const sampleProducts = ['Producto 1', 'Producto 2', 'Producto 3'];

// Rutas
app.get('/', (req, res) => {
  // Lógica para obtener la lista de productos y renderizar la vista home
  const products = db.get('products').value();
  res.render('home', { products });
});

app.get('/realtimeproducts', (req, res) => {
  // Lógica para obtener la lista de productos y renderizar la vista realTimeProducts
  const products = db.get('products').value();
  res.render('realTimeProducts', { products });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
