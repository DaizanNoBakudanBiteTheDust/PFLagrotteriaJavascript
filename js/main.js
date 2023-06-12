// Donde se veran los productos
let contenedorProductos = document.getElementById('productos');

// Llamo el local storage del autos.js

let productoAutos = JSON.stringify(localStorage.getItem('autos'));

let productos = document.getElementById('productos');

//Traigo el Json local

fetch("../json/productos.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = `
        <h2>${item.id}</h2>
         <p>${item.nombre}</p>
         <b>${item.nombreCategoria}</b>
       `;

            productos.append(li);
        });
    });


//Llamo botones del menu

let botonTodos = document.getElementById('todos');
let botonAutos = document.getElementById('traerAutos');
let botonRuedas = document.getElementById('ruedas');

let tituloPagina = document.getElementById('tituloSeccion');

function categoriaAutos() {

    // cambia el titulo de la pagina

    tituloPagina.innerHTML = "Autos Rocket League";

    let productos = document.getElementById('productos');

    let productosCodigo = "";

    //Cargo productos



    fetch("../json/productos.json")
        .then((response) => response.json())
        .then((data) => {


            data.forEach((item) => {
                if (item.categoria === 0) {

                    productosCodigo += `
                    <div class="col-lg-4">
                    <p>${item.nombre}</p>
         <b>${item.nombreCategoria}</b>
                    </div>
                    `;

                }
                productos.innerHTML = productosCodigo;
            })
        });







}

botonAutos.addEventListener("click", categoriaAutos);