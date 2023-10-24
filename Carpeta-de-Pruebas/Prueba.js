// Definición de la clase Product que representa un producto
class Product {
  // Constructor de la clase Product
  constructor(title, description, price, thumbnail, code, stock) {
    // Generar un ID único para el producto
    this.id = generateId();
    // Asignar valores proporcionados al producto
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

// Definición de la clase ProductManager que gestiona los productos
class ProductManager {
  // Constructor de la clase ProductManager
  constructor() {
    // Inicializar la lista de productos
    this.products = [];
  }

  // Método para obtener la lista de productos
  getProducts() {
    return this.products;
  }

  // Método para agregar un nuevo producto a la lista
  addProduct(title, description, price, thumbnail, code, stock) {
    // Verificar si el código del producto ya existe en la lista
    if (this.products.some(product => product.code === code)) {
      // Lanzar un error si el código ya está duplicado
      throw new Error('Código de producto duplicado');
    }

    // Crear un nuevo producto y agregarlo a la lista
    const newProduct = new Product(title, description, price, thumbnail, code, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  // Método para obtener un producto por su ID
  getProductById(productId) {
    // Buscar el producto en la lista por su ID
    const product = this.products.find(product => product.id === productId);
    // Lanzar un error si el producto no fue encontrado
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }
}

// Función para generar un ID único
function generateId() {
  // Obtener el timestamp actual como parte del ID
  const timestamp = new Date().getTime();
  // Obtener una parte aleatoria para el ID
  const randomPart = Math.random().toString(36).substr(2, 9);
  // Combinar las partes en un ID único
  return `_${timestamp}_${randomPart}`;
}

// Crear una instancia de la tienda (ProductManager)
const productManager = new ProductManager();

// Mostrar la lista de productos (debería estar vacía)
console.log(productManager.getProducts()); // Salida: []

// Agregar un nuevo producto a la tienda
const laptop = productManager.addProduct("Laptop", "Potente laptop para trabajos intensivos", 1200, "laptop.jpg", "LT123", 15);
console.log(laptop);

// Mostrar la lista de productos nuevamente (debería contener el producto recién agregado)
console.log(productManager.getProducts());

// Agregar otro producto a la tienda
const smartphone = productManager.addProduct("Smartphone", "Teléfono inteligente de última generación", 800, "smartphone.jpg", "SP456", 20);
console.log(smartphone);

// Mostrar la lista de productos nuevamente (debería contener ambos productos)
console.log(productManager.getProducts());

// Intentar agregar un producto duplicado (debería lanzar un error)
try {
  productManager.addProduct("Laptop", "Otra laptop similar", 1100, "laptop2.jpg", "LT123", 10);
} catch (error) {
  console.error(error.message); // Salida: Código de producto duplicado
}

// Mostrar información sobre un producto específico por su ID
try {
  const foundProduct = productManager.getProductById(smartphone.id);
  console.log(foundProduct);
} catch (error) {
  console.error(error.message);
}
