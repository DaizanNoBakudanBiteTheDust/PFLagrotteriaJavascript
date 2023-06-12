// Proyecto Final tiendita de Rocket league de Gabriel Lagrotteria para la clase de Javascript CoderHouse

// Donde se veran los productos
let contenedorProductos = document.getElementById('productos');

// Llamo al row en el div de productos

let productos = document.getElementById('productos').querySelector('.row');

productosGeneral = "";

//Llamo botones del menu

let botonTodos = document.getElementById('todos');
let botonAutos = document.getElementById('traerAutos');
let botonRuedas = document.getElementById('ruedas');

// Llamo al H1 en el index aka titulo de Pagina

let tituloPagina = document.getElementById('tituloSeccion');



    // Defino variables para Paginacion

    let paginaInicial = 1;
    let productosPagina = 20;

//Traigo el Json local

fetch("../json/productos.json")
        .then((response) => response.json())
        .then((data) => {

        // le digo que traiga 20 por pagina
           const paginaCategoria = (paginaInicial - 1) * productosPagina;
           const paginaFin = paginaCategoria + productosPagina;

           // Filtrar los productos por categoría y paginar
           const productosFiltrados = data.filter(item).slice(paginaCategoria, paginaFin);

            productosFiltrados.forEach((item) => {            

                    tituloPagina.innerHTML = "inicio";

                    productosCodigo += `
                    <div class="col-lg-4">
                    <p>${item.nombre}</p>
         <b>${item.nombreCategoria}</b>
                    </div>
                    `;

                productos.innerHTML = productosCodigo;
            })
        });


// Funcion que trae solo los autos del json

function categoriaAutos() {

    // cambia el titulo de la pagina

    let productosCodigo = "";

    //Cargo productos con Json

    fetch("../json/productos.json")
        .then((response) => response.json())
        .then((data) => {

           const paginaCategoria = (paginaInicial - 1) * productosPagina;
           const paginaFin = paginaCategoria + productosPagina;

           // Filtrar los productos por categoría y paginar
           const productosFiltrados = data.filter((item) => item.categoria === 0).slice(paginaCategoria, paginaFin);

            productosFiltrados.forEach((item) => {            

                    tituloPagina.innerHTML = "Autos Rocket League";

                    productosCodigo += `
                    <div class="col-lg-4">
                    <p>${item.nombre}</p>
                    <b>${item.nombreCategoria}</b>
                    </div>
                    `;

                productos.innerHTML = productosCodigo;
            })
        });

}

// le asigno la funcion al boton del menu al hacer click

botonAutos.addEventListener("click", categoriaAutos);