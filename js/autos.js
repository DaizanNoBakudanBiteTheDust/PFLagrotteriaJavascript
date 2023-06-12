const autosRocket = [{
        id: 1,
        auto: 'Fennec',
        precio: 400,
        imagen: "./img/fennec.webp"
    },
    {
        id: 2,
        auto: "Octane",
        precio: 800,
        imagen: "./img/octane.webp"
    },
    {
        id: 3,
        auto: "Nissan Silvia",
        precio: 600,
        imagen: "./img/silvia.webp"
    },
];

localStorage.setItem('autos', JSON.stringify(autosRocket));