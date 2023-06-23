let productos = [];
let carrito = [];

const listado = document.getElementById("listado");
const listadoProductos = "./productos.json";

// Cargar los productos desde el archivo JSON
fetch(listadoProductos)
  .then(respuesta => respuesta.json())
  .then(datos => {
    productos = datos;
    mostrarProductos();
  })
  .catch(error => console.log(error));

// Cargar el carrito desde el LocalStorage
const cargarCarritoDesdeLocalStorage = () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
};

// Mostrar los productos en el DOM
const mostrarProductos = () => {
  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
      <div class="card">
        <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
        <div class="card-body">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <button class="btn colorBoton" id="boton${producto.id}">Agregar al Carrito</button>
        </div>
      </div>`;
    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

// Agregar un producto al carrito
const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find(producto => producto.id === id);
    const nuevoProducto = {
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat(producto.precio),
      img: producto.img,
      cantidad: 1
    };
    carrito.push(nuevoProducto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
};

// Mostrar el carrito de compras
const mostrarCarrito = () => {
  const contenedorCarrito = document.getElementById("contenedorCarrito");
  contenedorCarrito.innerHTML = "";

  carrito.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
    card.innerHTML = `
      <div class="card">
        <img class="card-img-tom imgProductos" src="${producto.img}" alt="${producto.nombre}">
        <div class="card-body">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <p>Cantidad: ${producto.cantidad}</p>
          <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar 1 unidad</button>
        </div>
      </div>`;
    contenedorCarrito.appendChild(card);

    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarUnidadDelCarrito(producto.id);
    });
  });

  calcularTotal();
};

//Muestro el carrito de compras 

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

// Eliminar una unidad de un producto del carrito
const eliminarUnidadDelCarrito = (id) => {
  const productoEnCarrito = carrito.find(producto => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad--;
    if (productoEnCarrito.cantidad === 0) {
      const indice = carrito.indexOf(productoEnCarrito);
      carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
  }
};

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
};

// Calcular el total de la compra
const calcularTotal = () => {
  const total = document.getElementById("total");
  let totalCompra = 0;

  carrito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  });

  total.innerHTML = `Total: $${totalCompra.toFixed(2)}`;
};

// Evento de clic para mostrar el carrito
verCarritoBtn.addEventListener("click", () => {
  contenedorCarrito.style.display = "block";
  mostrarCarrito();
});

// Inicialización de la página
const inicializarPagina = () => {
  cargarCarritoDesdeLocalStorage();
  mostrarCarrito();
};

inicializarPagina();
