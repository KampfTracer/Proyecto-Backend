const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.readProductsFromFile();
  }

  readProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  writeProductsToFile() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  addProduct(product) {
    const newProduct = {
      id: this.generateId(),
      ...product,
    };

    this.products.push(newProduct);
    this.writeProductsToFile();
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Hubo un problema, Producto no encontrado');
    }

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
    };

    this.writeProductsToFile();
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    const deletedProduct = this.products.splice(productIndex, 1)[0];
    this.writeProductsToFile();

    return deletedProduct;
  }

  generateId() {
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    return maxId + 1;
  }
}

const productManager = new ProductManager('productos.json');

const laptop = productManager.addProduct({
  title: 'Laptop',
  description: 'Potente laptop para trabajos intensivos',
  price: 1200,
  thumbnail: 'laptop.jpg',
  code: 'LT123',
  stock: 15,
});

const audifonos = productManager.addProduct({
  title: 'Audífonos',
  description: 'Última Generación y el mejor sonido',
  price: 500,
  thumbnail: 'audifonos.jpg',
  code: 'AF456',
  stock: 20,
});

const smartphone = productManager.addProduct({
  title: 'Smartphone',
  description: 'Teléfono inteligente de última generación',
  price: 800,
  thumbnail: 'smartphone.jpg',
  code: 'SP789',
  stock: 25,
});

console.log('Productos actuales:', productManager.getProducts());

const productById = productManager.getProductById(2);
console.log('Producto por ID:', productById);

productManager.updateProduct(2, { price: 850, stock: 22 });
console.log('Producto actualizado');

const deletedProduct = productManager.deleteProduct(1);
console.log('Producto eliminado:', deletedProduct);

console.log('Productos actuales después de todas las operaciones:', productManager.getProducts());
