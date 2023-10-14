class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.id = generateId();
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (this.products.some(product => product.code === code)) {
      throw new Error('Código de producto duplicado');
    }

    const newProduct = new Product(title, description, price, thumbnail, code, stock);
    this.products.push(newProduct);
    return newProduct;
  }

  getProductById(productId) {
    const product = this.products.find(product => product.id === productId);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    return product;
  }
}

function generateId() {
  const timestamp = new Date().getTime();
  const randomPart = Math.random().toString(36).substr(2, 9);
  return `_${timestamp}_${randomPart}`;
}

// Crear una tienda (ProductManager)
const productManager = new ProductManager();

// Preguntar a la tienda sobre sus productos (debería estar vacía)
console.log(productManager.getProducts()); // Salida: []

// Agregar un nuevo producto a la tienda
const laptop = productManager.addProduct("Laptop", "Potente laptop para trabajos intensivos", 1200, "laptop.jpg", "LT123", 15);
console.log(laptop);

// Preguntar a la tienda nuevamente sobre sus productos (debería contener el producto recién agregado)
console.log(productManager.getProducts());

// Agregar otro producto a la tienda
const smartphone = productManager.addProduct("Smartphone", "Teléfono inteligente de última generación", 800, "smartphone.jpg", "SP456", 20);
console.log(smartphone);

// Preguntar a la tienda nuevamente sobre sus productos (debería contener ambos productos)
console.log(productManager.getProducts());

// Intentar agregar un producto duplicado (debería lanzar un error)
try {
  productManager.addProduct("Laptop", "Otra laptop similar", 1100, "laptop2.jpg", "LT123", 10);
} catch (error) {
  console.error(error.message); // Salida: Código de producto duplicado
}

// Preguntar a la tienda sobre un producto específico por su ID
try {
  const foundProduct = productManager.getProductById(smartphone.id);
  console.log(foundProduct);
} catch (error) {
  console.error(error.message);
}
