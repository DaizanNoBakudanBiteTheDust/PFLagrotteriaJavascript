// Donde se veran los productos
let contenedorProductos = document.getElementById('productos');

// Llamo el local storage del autos.js

let productoAutos = JSON.stringify(localStorage.getItem('autos'));


//Llamo botones del menu

let botonTodos = document.getElementById('todos'); 
let botonAutos = document.getElementById('traerAutos');
let botonRuedas = document.getElementById('ruedas');

let tituloPagina = document.getElementById('tituloSeccion');

function categoriaAutos(){

// cambia el titulo de la pagina

    tituloPagina.innerHTML = "Autos Rocket League";

    let productos = document.getElementById('productos')   

    let productosCodigo = "";

//Cargo productos

autosRocket.forEach((autito) => {
    
    productosCodigo  += `
        <div class="col-lg-4">
        <h2>Nombre: ${autito.auto}</h2>
        <h2>Precio: <img src="./img/credits.webp"> ${autito.precio}</h2>
        <img src="${autito.imagen}">
        </div>
        `;
});

    productos.innerHTML = productosCodigo;

}

botonAutos.addEventListener("click", categoriaAutos);

const { products } = require('../node_modules/@rocketleagueapi/items');

// Where 32 is the product ID
const alphaBoost = products[32];
console.log(alphaBoost.paintable) // false