document.addEventListener("DOMContentLoaded", function () {
    const la = document.getElementById("totalProductos");
    const divP = document.getElementById("productos");
    const labelTotal = document.getElementById("total");
    const compras = JSON.parse(localStorage.getItem("compras"));
    let totalFinal = 0;
    // Recorrer los envíos y agregar filas a la tabla
    console.log(Object.values(compras));

    let totalArticulos = 0;
    compras.forEach((compras) => {
        totalArticulos += compras.cantidad;
        totalFinal += compras.producto.precio * compras.cantidad;
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
           
           
            <div class="card text-center" >
            <div class="card-header"> ${compras.cantidad} piezas</div>
                <img src= ${compras.producto.imagen} class="pComprados" ></img>
                <div class="card-body ">
                <h5>${compras.producto.nombre}</h5>
                <h5 id="precioCard">Precio unitario: $ ${compras.producto.precio}</h5>

            </div>

            `;
        divP.appendChild(card);
    });
    la.innerText = totalArticulos + " productos     ";
    labelTotal.innerText = "        $" + totalFinal;
    


});

