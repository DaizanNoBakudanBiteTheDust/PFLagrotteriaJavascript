    // Proyecto Final tiendita de Rocket league de Gabriel Lagrotteria para la clase de Javascript CoderHouse

    // Donde se veran los productos
    let contenedorProductos = document.getElementById('productos');

    // Llamo al row en el div de productos

    let productos = document.getElementById('productos').querySelector('.row');

    productosGeneral = "";

    //Llamo botones del menu


    let botonAutos = document.getElementById('traerAutos');
    let botonRuedas = document.getElementById('ruedas');
    let botonAntena = document.getElementById('antena');
    let botonAcelerador = document.getElementById('acelerador');
    let botonAdorno = document.getElementById('adorno');
    let botonCalcomanias = document.getElementById('calcomanias');
    let botonPlanos = document.getElementById('planos');
    let botonSonido = document.getElementById('sonido');
    let botonPintura = document.getElementById('pintura');
    let botonLetrero = document.getElementById('letrero');
    let botonMarco = document.getElementById('marco');
    let botonExplosion = document.getElementById('explosion');
    let botonRastro = document.getElementById('rastro');
    let botonTodos = document.getElementById('todos');


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

    let itemId = "";

    //guardo productos en el session storage


    function categoriaAutos(categoria = null) {


        //Cargo productos con Promesa que trae el json y en base a eso trae el codigo

        const traerData = (pagina) => {
            let paginaActual = pagina;
            productosCodigo = "";

            return new Promise((resolve, reject) => {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {

                        // la magia de pasar de pagina

                        const paginaCategoria = (pagina - 1) * productosPagina;
                        const paginaFin = paginaCategoria + productosPagina;

                        // Filtrar los productos por categoría y paginar y si no hay  categoria llama a la principal
                        let productosFiltrados;
                        categoria ? productosFiltrados = data.filter((item) => item.nombreCategoria === categoria).slice(paginaCategoria, paginaFin) : productosFiltrados = data.slice(paginaCategoria, paginaFin);


                        productosFiltrados.forEach((item) => {
                            item.rareza;
                            let imagen = "";

                            // le digo que imagen usar dependiendo el producto ya que la base de datos no tenia imagenes

                            switch (true) {
                                case item.nombre.includes("Octane"):
                                    imagen = "octane";
                                    break;
                                case item.nombre.includes("Silvia"):
                                    imagen = "silvia";
                                    break;
                                case item.nombre.includes("Fennec"):
                                    imagen = "fennec";
                                    break;
                                default:
                                    imagen = "default";
                                    break;
                            }

                            // le asigno color en base a rareza del objeto
                            let caja = "";

                            switch (item.rareza) {
                                case 1:
                                    caja = "pocoComun";
                                    break;
                                case 2:
                                    caja = "raro";
                                    break;
                                case 3:
                                    caja = "muyRaro";
                                    break;
                                case 4:
                                    caja = "importado";
                                    break;
                                case 5:
                                    caja = "exotico";
                                    break;
                                case 6:
                                    caja = "mercadoNegro";
                                    break;
                                case 7:
                                    caja = "premium";
                                    break;
                                case 8:
                                    caja = "limitado";
                                    break;
                                case 9:
                                    caja = "legado";
                                    break;
                                default:
                                    caja = "comun";
                                    break;

                            };


                            //contar productos en el session storage

                            // le digo que cambie el titulo de la pagina basado en la categoria

                            tituloPagina.innerHTML = categoria;
                            // pequeña mala praxis
                            productosCodigo += `
                           
                        <div class="col-lg-3">  
                        <div class="card">
                        <div class="img ${imagen}"> 
                        <div class="${caja}">
                        </div>
                        </div>
                            <div class="card-body">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p>${item.nombreCategoria}</p>
                            <button type="button" id="boton${item.id}">Agregar al carrito</button>
                             </div>
                        </div>
                        </div>
                        `;

                        });


                        // le digo que agregue el html anterior a la variable definida como productos

                        productos.innerHTML = productosCodigo;



                        // Función para actualizar el contador del carrito en el botón
                        function actualizarContadorCarrito() {
                            let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
                            let contadorCarrito = document.getElementById('carrito');
                            contadorCarrito.textContent = `Carrito ${carrito.length}`;
                        }

                        // Llamar a la función al cargar la página para inicializar el contador
                        actualizarContadorCarrito();

                        // Actualizar el contador cada vez que se agrega un producto al carrito
                        function agregarAlCarrito(id) {
                            let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
                            let productoSeleccionado = productosFiltrados.find((item) => item.id === id);
                            carrito.push(productoSeleccionado);
                            sessionStorage.setItem('carrito', JSON.stringify(carrito));
                            Toastify({
                                text: `${productoSeleccionado.nombre} ha sido agregado al carrito`,
                                gravity: "bottom",
                                duration: 3000
                            }).showToast();
                            actualizarContadorCarrito();
                        }

                        // Tomo el id y lo guardo en el session storage aka carrito

                        productosFiltrados.forEach((item) => {
                            const botonAgregar = (id) => {
                                agregarAlCarrito(id)
                            }
                            let boton = document.getElementById(`boton${item.id}`);
                            boton.addEventListener('click', () => botonAgregar(item.id))

                        });



                        // defino botones de paginacion

                        btnSiguiente = document.createElement('button');
                        btnSiguiente.classList.add('btn');

                        btnAtras = document.createElement('button');
                        btnAtras.classList.add('btn');


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

                        // aqui le digo que cree los botones solo si la pagina es mayor que 1

                        botones.innerHTML = '';
                        if (paginaActual > 1) {
                            btnAtras = document.createElement('button');
                            btnAtras.classList.add('btn');
                            btnAtras.innerText = 'Volver';
                            btnAtras.addEventListener('click', () => {
                                traerData(paginaActual - 1);
                            });
                            botones.appendChild(btnAtras);
                        }
                        if (paginaFin < data.length) {
                            btnSiguiente = document.createElement('button');
                            btnSiguiente.classList.add('btn');
                            btnSiguiente.innerText = 'Siguiente';
                            btnSiguiente.addEventListener('click', () => {
                                traerData(paginaActual + 1);
                            });
                            botones.appendChild(btnSiguiente);
                        }

                        resolve(data);
                    }).catch(error => {
                        console.log(error);
                        reject(error);
                    })
            })

        };

        // llamo a la funcion que trae la data

        traerData(paginaInicial);

    }

    categoriaAutos()

    // le asigno la funcion al boton del menu al hacer click

    botonAutos.addEventListener("click", async function () {
        categoriaAutos("Carrocería")
    });
    botonRuedas.addEventListener("click", async function () {
        categoriaAutos("Ruedas")
    });
    botonAntena.addEventListener("click", async function () {
        categoriaAutos("Antena")
    });
    botonAcelerador.addEventListener("click", async function () {
        categoriaAutos("Acelerador")
    });
    botonAdorno.addEventListener("click", async function () {
        categoriaAutos("Adorno")
    });
    botonCalcomanias.addEventListener("click", async function () {
        categoriaAutos("Calcomanías")
    });
    botonPlanos.addEventListener("click", async function () {
        categoriaAutos("Planos")
    });
    botonSonido.addEventListener("click", async function () {
        categoriaAutos("Sonido de motor")
    });
    botonPintura.addEventListener("click", async function () {
        categoriaAutos("Pintura")
    });
    botonLetrero.addEventListener("click", async function () {
        categoriaAutos("Letrero del jugador")
    });
    botonMarco.addEventListener("click", async function () {
        categoriaAutos("Marco de avatar")
    });
    botonExplosion.addEventListener("click", async function () {
        categoriaAutos("Explosión de gol")
    });
    botonRastro.addEventListener("click", async function () {
        categoriaAutos("Rastro")
    });
    botonTodos.addEventListener("click", async function () {
        categoriaAutos()
    });


    // muestro el carrito con lo obtenido
    function mostrarCarrito() {
        let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
        let modalBody = document.querySelector('.modal-body');
        // le digo al modal que quede vacio
        modalBody.innerHTML = '';

        // llamo otra vez al for each y le digo que agregue los productos definidos arriba
        carrito.forEach((item) => {
            let productoHTML = `
            <div class="row">
            <div class="col-lg-2">
                <img src="./img/credits.webp">
                </div>
                <div class="col-lg-10">
                    <h3>${item.nombre}</h3>
                    <p>${item.nombreCategoria}</p>
                    </div>
                </div>
                </div>
            `;
            modalBody.innerHTML += productoHTML;
        });
    }

    // Abro el modal como dice Bootstrap
    document.getElementById('carrito').addEventListener('click', () => {
        mostrarCarrito();
        $('#modalCarrito').modal('show');
    });