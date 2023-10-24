
// Se agregar el metodo para validar para que todos los productos sean obligatorios y una lista para saber que producto se agrego despues de otro producto 

// Definición de la clase Product que representa un producto
class Product {
    // Constructor de la clase Product
    constructor(titulo, descripcion, precio, imagen, code, stock) {
      // Generar un ID único para el producto
      this.id = generateId();
      // Asignar valores proporcionados al producto
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.precio = precio;
      this.imagen = imagen;
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
    addProduct(titulo, descripcion, precio, imagen, code, stock) {
      // Validar que todos los campos sean obligatorios
      if (!titulo || !descripcion || !precio || !imagen || !code || !stock) {
        throw new Error("Todos los campos son obligatorios");
      }
  
      // Verificar si el código del producto ya existe en la lista
      if (this.products.some(product => product.code === code)) {
        // Lanzar un error si el código ya está duplicado
        throw new Error('Código de producto duplicado');
      }
  
      // Crear un nuevo producto y agregarlo a la lista
      const newProduct = new Product(titulo, descripcion, precio, imagen, code, stock);
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
  console.log("Productos Iniciales:", productManager.getProducts()); // Salida: []
  
  // Agregar un nuevo producto a la tienda
  try {
    const errorMessage1 = productManager.addProduct("Laptop", null, 1200, "laptop.jpg", "LT123", 15);
    console.error(errorMessage1);
  } catch (error) {
    console.error("Error al agregar Laptop:", error.message);
  }
  
  // Agregar una laptop válida
  const laptop = productManager.addProduct("Laptop", "Potente laptop para trabajos intensivos", 1200, "laptop.jpg", "LT123", 15);
  console.log("Laptop Agregada:", laptop);
  
  // Mostrar la lista de productos después de agregar la laptop
  console.log("Productos Después de Agregar Laptop:", productManager.getProducts());
  
  // Agregar otro producto a la tienda (Smartphone)
  const smartphone = productManager.addProduct("Smartphone", "Teléfono inteligente de última generación", 800, "smartphone.jpg", "SP456", 20);
  console.log("Smartphone Agregado:", smartphone);
  
  // Mostrar la lista de productos después de agregar el smartphone
  console.log("Productos Después de Agregar Smartphone:", productManager.getProducts());
  
  // Agregar otro producto a la tienda (Audífonos)
  const audifonos = productManager.addProduct("Audifonos", "Ultima Generacion y el mejor sonido", 500, "audifonos.jpg", "AS666", 20);
  console.log("Audífonos Agregados:", audifonos);
  
  // Mostrar la lista de productos después de agregar los audífonos
  console.log("Productos Después de Agregar Audífonos:", productManager.getProducts());
  
  // Intentar agregar una laptop duplicada (debería lanzar un error)
  try {
    const errorMessage2 = productManager.addProduct("Laptop", "Otra laptop similar", 1100, "laptop2.jpg", "LT123", 10);
    console.error(errorMessage2);
  } catch (error) {
    console.error("Error al agregar Laptop duplicada:", error.message);
  }
  
  // Intentar buscar un producto por su ID (Smartphone)
  try {
    const foundProduct = productManager.getProductById(smartphone.id);
    console.log("Producto Encontrado:", foundProduct);
  } catch (error) {
    console.error("Error al buscar producto por ID:", error.message);
  }
  