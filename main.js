// JSON con los productos
let productos = JSON.parse(localStorage.getItem("productos")) || [];

// La siguiente función muestra los productos en el DOM
function mostrarProductos() {
  const productosTabla = document.getElementById("productos");
  productosTabla.innerHTML = "";
  productos.forEach(producto => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>${producto.precio}</td>`;
    productosTabla.appendChild(tr);
  })
}

// Usando esta función se puede agregar un producto
function agregarProducto(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const categoria = document.getElementById("categoria").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const id = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
  const producto = {id, nombre, categoria, precio};
  productos.push(producto);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
  document.getElementById("formulario").reset();
}

// Filtrado de productos por categoría:
function filtrarProductos(e) {
  e.preventDefault();
  const categoria = document.getElementById("categoria-filtro").value;
  const productosFiltrados = productos.filter(producto => producto.categoria.toLowerCase().includes(categoria.toLowerCase()));
  productos = productosFiltrados;
  mostrarProductos();
}

// Eventos del usuario
document.getElementById("formulario").addEventListener("submit", agregarProducto);
document.getElementById("filtro").addEventListener("submit", filtrarProductos);

// Mostramos los productos al cargar la pagina
mostrarProductos();