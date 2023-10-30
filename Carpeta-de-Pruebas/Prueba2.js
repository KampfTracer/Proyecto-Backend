//Repaso corregido 

// Importar el módulo fs (sistema de archivos) de Node.js
const fs = require('fs');

// Definir la clase ProductManager
class ProductManager {
  // Constructor de la clase, recibe la ruta del archivo donde se almacenarán los productos
  constructor(path) {
    this.path = path;
    // Leer productos desde el archivo o inicializar como un array vacío si no existe el archivo
    this.products = this.readProductsFromFile();
  }

  // Método para leer productos desde el archivo
  readProductsFromFile() {
    try {
      // Intentar leer el archivo y convertir el contenido JSON a un array de productos
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si hay un error al leer el archivo (por ejemplo, si no existe), devolver un array vacío
      return [];
    }
  }

  // Método para escribir productos en el archivo
  writeProductsToFile() {
    // Convertir el array de productos a formato JSON con formato legible y escribir en el archivo
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data);
  }

  // Método para agregar un producto
  addProduct(product) {
    // Crear un nuevo producto con un ID generado automáticamente y los datos proporcionados
    const newProduct = {
      id: this.generateId(),
      ...product,
    };

    // Agregar el nuevo producto al array de productos y escribir en el archivo
    this.products.push(newProduct);
    this.writeProductsToFile();

    // Devolver el nuevo producto
    return newProduct;
  }

  // Método para obtener todos los productos
  getProducts() {
    return this.products;
  }

  // Método para obtener un producto por su ID
  getProductById(id) {
    // Buscar el producto en el array por su ID
    const product = this.products.find((p) => p.id === id);
    // Lanzar un error si el producto no fue encontrado
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }

  // Método para actualizar un producto
  updateProduct(id, updatedFields) {
    // Encontrar el índice del producto en el array por su ID
    const productIndex = this.products.findIndex((p) => p.id === id);
    // Lanzar un error si el producto no fue encontrado
    if (productIndex === -1) {
      throw new Error('Hubo un problema, Producto no encontrado');
    }

    // Actualizar los campos del producto con los nuevos valores proporcionados
    this.products[productIndex] = {
      ...this.products[productIndex],
      ...updatedFields,
      id, // Funcion para Asegurar tener de mantener el mismo ID
    };

    // Escribir los productos actualizados en el archivo
    this.writeProductsToFile();
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id) {
    // Encontrar el índice del producto en el array por su ID
    const productIndex = this.products.findIndex((p) => p.id === id);
    // Lanzar un error si el producto no fue encontrado
    if (productIndex === -1) {
      throw new Error('Producto no encontrado');
    }

    // Eliminar el producto del array y obtener el producto eliminado
    const deletedProduct = this.products.splice(productIndex, 1)[0];

    // Escribir los productos actualizados en el archivo
    this.writeProductsToFile();

    // Devolver el producto eliminado
    return deletedProduct;
  }

  // Método para generar un ID único
  generateId() {
    // Encontrar el ID máximo actual en los productos
    const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
    // Asignar un nuevo ID como el máximo actual + 1
    return maxId + 1;
  }
}

// Crear una instancia de ProductManager con la ruta del archivo 'productos.json'
const productManager = new ProductManager('productos.json');

// Agregar productos
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

// Imprimir la lista actual de productos
console.log('Productos actuales:', productManager.getProducts());

// Eliminar un producto (puedes cambiar el ID según el producto que quieras eliminar)
const productIdToDelete = audifonos.id;
const deletedProduct = productManager.deleteProduct(productIdToDelete);
console.log('Producto eliminado:', deletedProduct);

// Agregar otro producto
const LaptopGamer = productManager.addProduct({
  title: 'Laptop Gamer',
  description: 'Laptop avanzada con características innovadoras',
  price: 1500,
  thumbnail: 'nueva_laptop.jpg',
  code: 'NL234',
  stock: 18,
});

// Imprimir el nuevo producto agregado
console.log('Nuevo producto agregado:', LaptopGamer);

// Actualizar un producto (puedes cambiar el ID y los campos según el producto que quieras actualizar)
const productoAActualizar = smartphone.id;
try {
  productManager.updateProduct(productoAActualizar, { price: 850, stock: 22 });
  console.log('Producto actualizado');
} catch (error) {
  console.error(error.message);
}

// Imprimir la lista de productos después de todas las operaciones
console.log('Productos actuales después de todas las operaciones:', productManager.getProducts());
