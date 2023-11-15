class Product {
    constructor( titulo, descripcion, precio, imagen, code, stock) {
        this.id = generateId()
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = imagen;
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

    addProduct (titulo, descripcion, precio, imagen, code, stock) {
        if (this.products.some(products =>products.code === code)) {
            throw new Error("Código de producto esta duplicado");
        }
    

    const newProduct = new Product(titulo, descripcion, precio, imagen, code, stock);
    this.products.push(newProduct);
    return newProduct;
}


    getProductById(productId){
        const product = this.products.find (product => product.id === productId);
        if(!product){
            throw new Error("Producto no Encontrado");
        }
        return product;
    }
}

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  
const productManager = new ProductManager();

console.log(productManager.getProducts());

const laptop = productManager.addProduct("Laptop", "Potente laptop para trabajos intensivos", 1200, "laptop.jpg", "LT123", 15);
console.log(laptop);

console.log(productManager.getProducts());

const smartphone = productManager.addProduct("Smartphone", "Teléfono inteligente de última generación", 800, "smartphone.jpg", "SP456", 20);
console.log(smartphone);

console.log(productManager.getProducts());

const audifonos = productManager.addProduct("Audifonos","Ultima Generacion y el mejor sonido", 500, "audifonos,jpg", "AS666", 20);
console.log(smartphone);

console.log(productManager.getProducts());

try {
  productManager.addProduct("Laptop", "Otra laptop similar", 1100, "laptop2.jpg", "LT123", 10);
} catch (error) {
  console.error(error.message);
}

try {
  const foundProduct = productManager.getProductById(smartphone.id);
  console.log(foundProduct);
} catch (error) {
  console.error(error.message);
}
