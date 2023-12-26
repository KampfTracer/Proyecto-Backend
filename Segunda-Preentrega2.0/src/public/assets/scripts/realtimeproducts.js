console.log("Este es el script de REALTIMEPRODUCTS");

const socket = io(); //FRONTEND

socket.on("nuevoProducto", (producto) => {
  let ulProductos = document.querySelector("ul");
  let nuevoProducto = document.createElement("li");
  nuevoProducto.innerHTML = `ID : ${producto.id} Producto: ${producto.title}`;
  nuevoProducto.setAttribute("id", `${producto.id}`);
  ulProductos.append(nuevoProducto);
});

socket.on("deleteProducto", (pid) => {
  console.log(pid);
  let numero = pid;
  let n = numero.toString();
  console.log(n);

  let lista = document.getElementById("lista1");
//   let numeroABorrar = document.getElementById(n)
  let numeroABorrar = document.getElementById(pid);

  console.log(lista);
  console.log(numeroABorrar);
  lista.removeChild(numeroABorrar)
});

