// websocket.js
module.exports = (io, db) => {
    io.on('connection', (socket) => {
      console.log('Usuario conectado');
  
      // Obtener la lista de productos al conectarse
      const products = db.get('products').value();
      io.emit('updateProductList', products);
  
      // Manejar el evento para agregar un producto
      socket.on('addProduct', (productName) => {
        // Lógica para agregar el producto
        db.get('products').push(productName).write();
        console.log(`Producto agregado: ${productName}`);
  
        // Emitir actualización a la vista en tiempo real con la nueva lista de productos
        io.emit('updateProductList', db.get('products').value());
      });
  
      // Puedes agregar más eventos y lógica aquí según tus necesidades
    });
  };
  