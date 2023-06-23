//Asocio cada producto a su imagen correspondiente

const listado = document.getElementById("listado");
const listadoProductos = "./productos.json";

fetch(listadoProductos)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(producto => {
            listado.innerHTML += `
                                    <p>ID: ${producto.id}</p>
                                    <h2>Nombre: ${producto.nombre}</
                                    h2>
                                    <p>Precio: ${producto.precio}</p>
                                    <img src="${producto.img}" alt="">
                                  `
        })
    })
    .catch(error => console.log(error))

//Cargo el carrito desde el LocalStorage

if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Modifico el DOM para mostrar los productos

const contenedorProductos = document.getElementById("contenedorProductos");

//Con la siguiente función muestro los productos

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
      </div>`;
    contenedorProductos.appendChild(card);

    //A continuación, agrego productos al carrito
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
    });
  });
};

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
};

//Muestro el carrito de compras 

const verCarrito = document.getElementById("verCarrito");
const contenedorCarrito = document.getElementById("contenedorCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

//La siguiente función sirve para mostrar el carrito 

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
      </div>`;
    contenedorCarrito.appendChild(card);
    //Elimino productos del carrito
    const boton = document.getElementById(`eliminar${producto.id}`);
    boton.addEventListener("click", () => {
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

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
};

//Muestro el total de la compra 

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach(producto => {
      totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `Total: $${totalCompra}`;
}

//Cargo el carrito y productos desde una API
const urlProductos = "https://jsonplaceholder.typicode.com/dbstore";

const cargarProductosDesdeAPI = async () => {
  try {
    const response = await fetch(urlProductos);
    const data = await response.json();
    productos = data.map(item => new Producto(item.id, item.nombre, item.precio, item.img));
    mostrarProductos();
  } catch (error) {
    console.error("Error al cargar los productos desde la API:", error);
  }
};

const cargarCarritoDesdeLocalStorage = () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
  }
};

// Inicialización de la página
const inicializarPagina = () => {
  cargarProductosDesdeAPI();
  cargarCarritoDesdeLocalStorage();
};

inicializarPagina();