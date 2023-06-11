// Donde se veran los productos
let contenedorProductos = document.getElementById('productos');

// Llamo el local storage del autos.js

let productoAutos = JSON.stringify(localStorage.getItem('autos'));


//Llamo botones del menu

let botonTodos = document.getElementById('todos'); 
let botonAutos = document.getElementById('autos');
let botonRuedas = document.getElementById('ruedas');


function categoriaAutos(){




//Cargo productos

autosRocket.forEach((autito) => {
    let div = document.createElement("div");
    div.innerHTML = `
        <h2>Nombre: ${autito.auto}</h2>
        <h2>Precio: <img src="./img/credits.webp"> ${autito.precio}</h2>
        <img src="${autito.imagen}">
    `;

    contenedorProductos.append(div);
});

let titulo = document.getElementById('tituloSeccion');
}