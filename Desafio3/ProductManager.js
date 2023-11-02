// ProductManager.js
const fs = require('fs/promises');

class ProductManager {
  constructor() {
    // Puedes inicializar aquí o cargar productos desde el archivo en el constructor
  }

  async getProducts(limit) {
    let products = await this.loadProductsFromFile();

    if (limit) {
      products = products.slice(0, limit);
    }

    return products;
  }

  async getProductById(productId) {
    const products = await this.loadProductsFromFile();
    console.log('Todos los IDs de los productos cargados:', products.map(p => p.id));

    const product = products.find((p) => p.id == productId);
    console.log(`Buscando producto con ID ${productId}. Producto encontrado:`, product);

    return product;
  }

  async loadProductsFromFile() {
    try {
      const filePath = './productos.json';
      console.log('Intentando cargar productos desde:', filePath);

      const data = await fs.readFile(filePath, 'utf8');
      console.log('Datos del archivo:', data);

      const products = JSON.parse(data);
      console.log('Productos cargados:', products);

      return products;
    } catch (error) {
      console.error('Error al cargar el archivo:', error);
      return [];
    }
  }
}

module.exports = ProductManager;
