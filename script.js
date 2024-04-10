let subtotalTotal = 0;
let another = 0;
document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear();

    const catalogo = [
        { id: 1, imagen: "imagenes/producto1.jpg", precio: 200, value: 200, nombre: "Vans para hombre" },
        { id: 2, imagen: "imagenes/producto2.jpg", precio: 455, value: 455, nombre: "Pumas para mujer " },
        { id: 3, imagen: "imagenes/producto3.jpg", precio: 890, value: 890, nombre: "Zapato de vestir" },
        { id: 4, imagen: "imagenes/producto4.jpg", precio: 2000, value: 2000, nombre: "Nike hombre" },
        { id: 5, imagen: "imagenes/producto5.jpg", precio: 3000, value: 3000, nombre: "Nike Mujer" },

        // Agrega más productos aquí
    ];
    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumen Compra");
    const total = document.getElementById("total");
    const totalArticulos=0;
    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
    <div class="card">
    <img src="${producto.imagen}" class="card-img-top " alt="${producto.nombre}" title="${producto.nombre}">
    <div class="card-body ">
    <h5 class="card-title">${producto.nombre}</h5>
    <p class="card-text">$${producto.precio}</p>
    <label for="cantidadProducto${producto.id}">Cantidad:</label>
    <input type="number" id="cantidadProducto${producto.id}" class="form-control">
    <button class="btn btn-primary mt-2" data-id="${producto.id}">Agregar al Carrito</button>
    </div>
    </div>
    `;
        try {
            catalogoContainer.appendChild(card);

        } catch (error) {

        }

        const botonAgregar = card.querySelector("button");

        botonAgregar.addEventListener("click", function () {

            const cantidad = parseInt(document.getElementById(`cantidadProducto${producto.id}`).value);
            if (cantidad > 0) {
                
                agregarProductoAlCarrito(producto, cantidad);
            }
        });




    });

    const carrito = [];
    function agregarProductoAlCarrito(producto, cantidad) {
        // Busca si el producto ya está en el carrito
        const productoEnCarrito = carrito.find((item) => item.producto.id === producto.id);
        if (productoEnCarrito) {
            // Si ya está en el carrito, actualiza la cantidad
            productoEnCarrito.cantidad += cantidad;

        } else {
            
            // Si no está en el carrito, agrega un nuevo elemento al carrito
            carrito.push({ producto, cantidad,totalArticulos });
            


        }
      
        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {

        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";

        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
    <td> ${item.producto.nombre}</td>
    <td>${item.cantidad}</td>
    <td>$${item.producto.precio * item.cantidad}</td>
    `;

            resumenCompra.appendChild(fila);



            subtotalTotal += item.producto.precio * item.cantidad;


        });

        // Actualiza el total
        total.textContent = `$${subtotalTotal}`;

        const botonComprar = document.getElementById("finalizarCompra");

        botonComprar.addEventListener("click", function () {


            if (subtotalTotal > 0) {
                
                window.open("recibo.html", "_blank");


            }

        });
        localStorage.setItem("compras", JSON.stringify(carrito));
    }


});