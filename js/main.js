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

    // Llamo a botones de Paginacion 

    const botones = document.querySelector('.buttons');


    //Defino imagen del producto

    let imagenProducto = "";

    // Defino variables para Paginacion

    let paginaInicial = 1;
    let productosPagina = 20;

    // defino la url del fetch fuera para que no cambie

    let url = "https://daizannobakudanbitethedust.github.io/PFLagrotteria/json/productos.json";

    // Funcion que trae solo los autos del json

    function categoriaAutos(categoria) {
        let btnSiguiente;
        let btnAtras;

        //Cargo productos con Json y asign await

        const traerData = async (pagina) => {
            let paginaActual = pagina;
            productosCodigo = "";
            const response = await fetch(url);
            const data = await response.json();

            // defino botones de paginacion

            btnSiguiente = document.createElement('button');
            btnSiguiente.classList.add('btn');
            btnSiguiente.innerText = '⏩';

            btnAtras = document.createElement('button');
            btnAtras.classList.add('btn');
            btnAtras.innerText = '⏮';

            // les doy event listener a los botones

            btnSiguiente.addEventListener('click', () => {
                traerData(paginaActual + 1);
            });

            btnAtras.addEventListener('click', () => {
                if (paginaActual > 1) {
                    traerData(paginaActual - 1);
                }
            });

            // le digo que el boton siguiente pase hacia adelante o atras dependiendo el boton, sino me de error

            try {
                btnSiguiente.dataset.url = pagina + 1;
                btnAtras.dataset.url = pagina - 1;
            } catch (error) {
                console.log(error);
            }

            // le digo que agregue los botones de adelante y atras en caso de que la pagina sea o no mayor a 1

            botones.innerHTML = '';
            if (paginaActual > 1) {
                botones.appendChild(btnAtras);
            }
            if (Array.isArray(data) && data.length > 0) {
                botones.appendChild(btnSiguiente);
            }

            // Verifica si btnAtras existe antes de agregar el evento
            if (btnAtras) {
                btnAtras.addEventListener('click', () => {
                    if (paginaActual > 1) {
                        paginaActual--;
                        traerData(paginaActual);
                    }
                });
            }

            // la magia de pasar de pagina

            const paginaCategoria = (pagina - 1) * productosPagina;
            const paginaFin = paginaCategoria + productosPagina;

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

                // le digo que cambie el titulo de la pagina basado en la categoria

                tituloPagina.innerHTML = categoria;

                productosCodigo += `
                        <div class="col-lg-4">
                        <img src="${imagenProducto}" alt="${item.nombre}">
                        <h2>${item.nombre}</h2>
                        <p>${item.nombreCategoria}</p>
                        </div>
                        `;


            });

            // le digo que agregue el html anterior a la variable definida como productos

            productos.innerHTML = productosCodigo;

            // aqui le digo que cree los botones solo si la pagina es mayor que 1

            botones.innerHTML = '';
            if (paginaActual > 1) {
                btnAtras = document.createElement('button');
                btnAtras.classList.add('btn');
                btnAtras.innerText = '⏮';
                btnAtras.addEventListener('click', () => {
                    traerData(paginaActual - 1);
                });
                botones.appendChild(btnAtras);
            }
            if (paginaFin < data.length) {
                btnSiguiente = document.createElement('button');
                btnSiguiente.classList.add('btn');
                btnSiguiente.innerText = '⏩';
                btnSiguiente.addEventListener('click', () => {
                    traerData(paginaActual + 1);
                });
                botones.appendChild(btnSiguiente);
            }

        };

        // llamo a la funcion que trae la data

        traerData(paginaInicial);

    }


    // le asigno la funcion al boton del menu al hacer click

    botonAutos.addEventListener("click", function () {
        categoriaAutos("Carrocería")
    });
    botonRuedas.addEventListener("click", function () {
        categoriaAutos("Ruedas")
    });