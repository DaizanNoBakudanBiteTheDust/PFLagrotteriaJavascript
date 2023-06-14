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

    //Defino imagen del producto

    let imagenProducto = "";

    // Defino variables para Paginacion

    let paginaInicial = 1;
    let productosPagina = 20;


    // Funcion que trae solo los autos del json

    function categoriaAutos(categoria) {
    ;
        // cambia el titulo de la pagina

        let productosCodigo = "";

        //Cargo productos con Json

        fetch("../json/productos.json")
            .then((response) => response.json())
            .then((data) => {

                const paginaCategoria = (paginaInicial - 1) * productosPagina;
                const paginaFin = paginaCategoria + productosPagina;
                const productosPorPagina = data.slice(paginaInicial, paginaFin);

                // Filtrar los productos por categoría y paginar
                let productosFiltrados = data.filter((item) => item.nombreCategoria === categoria).slice(paginaCategoria, paginaFin);

                // le digo que imagen usar dependiendo el producto ya que la base de datos no tenia imagenes

                productosFiltrados.forEach((item) => {
                    switch (true) {
                        case item.nombre.includes("Octane"):
                            imagenProducto = "./img/octane.webp";
                            break;
                        case item.nombre.includes("Silvia"):
                            imagenProducto = "./img/silvia.webp";
                            break;
                        case item.nombre.includes("Fennec"):
                            imagenProducto = "./img/fennec.webp";
                            break;
                        default:
                            imagenProducto = " ";
                            break;
                    }


                    tituloPagina.innerHTML = categoria;

                    productosCodigo += `
                        <div class="col-lg-4">
                        <img src="${imagenProducto}" alt=">${item.nombre}">
                        <h2>${item.nombre}</h2>
                        <p>${item.nombreCategoria}</p>
                        </div>
                        `;

                    productos.innerHTML = productosCodigo;
                });

            });



    }


    // le asigno la funcion al boton del menu al hacer click

    botonAutos.addEventListener("click", function () {
        categoriaAutos("Carrocería")
    });