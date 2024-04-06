document.addEventListener("DOMContentLoaded", function () {
    const catalogo = [
        { id: 1, imagen: "imagenes/producto1.jpg", precio:10, value: 10 },
        { id: 2, imagen: "imagenes/producto2.jpg", precio:15, value: 15 },
        { id: 3, imagen: "imagenes/producto3.jpg", precio:20, value: 20 },
        // Agrega más productos aquí
    ];
    const catalogoContainer = document.getElementById("catalogo");
    const resumenCompra = document.getElementById("resumen Compra");
    const total = document.getElementById("total");
    // Genera las tarjetas de productos en el catálogo
    catalogo.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
    <div class="card">
    <img src="${producto.imagen}" class="card-img-top " alt="Producto ${producto.id}">
    <div class="card-body ">
    <h5 class="card-title">Producto ${producto.id}</h5>
    <p class="card-text">Precio: $${producto.precio}</p>
    <label for="cantidadProducto${producto.id}">Cantidad:</label>
    <input type="number" id="cantidadProducto${producto.id}" class="form-control">
    <button class="btn btn-primary mt-2" data-id="${producto.id}">Agregar al Carrito</button>
    </div>
    </div>
    `;
    
        catalogoContainer.appendChild(card);

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
            carrito.push({ producto, cantidad });
        }
        // Actualiza el resumen de la compra
        actualizarResumenCompra();
    }

    function actualizarResumenCompra() {
        // Limpia el resumen de compra
        resumenCompra.innerHTML = "";
        let subtotalTotal = 0;
        carrito.forEach((item) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
    <td>Producto ${item.producto.id}</td>
    <td>${item.cantidad}</td>
    <td>$${item.producto.precio * item.cantidad}</td>
    `;
            resumenCompra.appendChild(fila);
            subtotalTotal += item.producto.precio * item.cantidad;
        });
            // Actualiza el total
            total.textContent = `$${subtotalTotal}`;
        }
    });