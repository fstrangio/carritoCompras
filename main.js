//Creo la clase producto para todo lo que estará en la tienda. Cada producto tendrá su id, nombre, precio e imagen

class Producto {
  constructor(id, nombre, precio, img) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.img = img;
      this.cantidad = 1;
  }
}

//Asocio cada producto a su imagen correspondiente

const goku = new Producto (1, "Goku", 15000, "multimedia/goku.jpg");
const gokussj2 = new Producto (2, "Goku SSJ2", 18000, "multimedia/goku-ssj2.jpg");
const gokussj3 = new Producto (3, "Goku SSJ3", 25000, "multimedia/goku-ssj3.jpg");
const vegeta = new Producto (4, "Vegeta", 14000, "multimedia/vegeta.jpg");
const vegetagod2 = new Producto (5, "Vegeta God", 27000, "multimedia/vegeta-god2.jpg");
const gohan = new Producto (6, "Gohan", 13000, "multimedia/gohan.jpg");
const gotenks = new Producto (7, "Gotenks", 20000, "multimedia/gotenks.jpg");
const esferas = new Producto (8, "Esferas", 12000, "multimedia/esferas.jpg");
const ps4dbfighterz = new Producto (9, "DB Fighter Z", 8000, "multimedia/db-fighterz.jpg");
const ps4dbkakarot = new Producto (10, "DB Kakarot", 10000, "multimedia/db-kakarot.jpg");
const manga1 = new Producto (11, "Manga 1", 2500, "multimedia/dbz-manga1.jpg");
const manga7 = new Producto (12, "Manga 7", 3000, "multimedia/dbz-manga7.jpg");
const pelicula2 = new Producto (13, "Pelicula 2", 1800, "multimedia/pelicula-2.jpg");
const pelicula12 = new Producto (14, "Pelicula 12", 1600, "multimedia/pelicula-12.jpg");

//Genero el array con todos los productos que tenemos para vender

const productos = [goku, gokussj2, gokussj3, vegeta, vegetagod2, gohan, gotenks, esferas, ps4dbfighterz, ps4dbkakarot, manga1, manga7, pelicula2, pelicula12];

//Creo el array que contiene el carrito

let carrito = [];

//Cargo el carrito desde el LocalStorage

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modifico el DOM para mostrar los productos

const contenedorProductos = document.getElementById("contenedorProductos");

//Con la siguiente función muestro los productos

const mostrarProductos = () => {
  productos.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
      card.innerHTML = `
                          <div class="card">
                              <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                              <div class="card-body">
                                  <h3>${producto.nombre}</h3>
                                  <p>${producto.precio}</p>
                                  <button class="btn colorBoton" id="boton${producto.id}"> Agregar al Carrito </button>
                              </div>
                          </div>`
      contenedorProductos.appendChild(card);

      //A continuación, agrego productos al carrito
      const boton = document.getElementById(`boton${producto.id}`);
      boton.addEventListener("click", () => {
          agregarAlCarrito(producto.id);
      })
  })
}

mostrarProductos();

//Creo la función para agregar items al carrito

const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
  } else {
      const producto = productos.find(producto => producto.id === id);
      carrito.push(producto);
  }
  //Trabajo con el localStorage:
  localStorage.setItem("carrito", JSON.stringify(carrito));
  calcularTotal();
}

//Muestro el carrito de compras 

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

//La siguiente función sirve para mostrar el carrito 

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
      card.innerHTML = `
                          <div class="card">
                              <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
                              <div class="card-body">
                                  <h3>${producto.nombre}</h3>
                                  <p>${producto.precio}</p>
                                  <p>${producto.cantidad}</p>
                                  <button class="btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto </button>
                              </div>
                          </div>`
      contenedorCarrito.appendChild(card);
      //Elimino productos del carrito 
      const boton = document.getElementById(`eliminar${producto.id}`);
      boton.addEventListener("click", () => {
          eliminarDelCarrito(producto.id);
      })

  })
  calcularTotal();
}

//Función que elimina productos 

const eliminarDelCarrito = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  let indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);
  mostrarCarrito();

  //Trabajo con el localStorage 
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

//A continuación puedo Vaciar todo el carrito

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
})

//Función que elimina todo el carrito 

const eliminarTodoElCarrito = () => {
  carrito = [];
  //localStorage: 
  localStorage.clear();
  mostrarCarrito();
}

//Muestro el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
      totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `Total: $${totalCompra}`;
}