/* selecciono y asigno a constantes los elementos a utilizar */
const botonCotizar = document.querySelector("#btn-cotizar");
const marcaVehiculo = document.querySelector("#marca-vehiculo");
const anioVehiculo = document.querySelector("#anio-vehiculo");
const condicionVehiculo = document.querySelector("#estado-vehiculo");
const containerCorizacion = document.querySelector("#container-cotization");
const formularioCotizacion = document.querySelector("#formulario-cotizacion");

/* event listeners de los elementos que actuan */
let marca;
marcaVehiculo.addEventListener("change", (e) => {
  marca = e.path[0].value;
});

let anio;
anioVehiculo.addEventListener("change", (e) => {
  anio = parseInt(e.path[0].value);
});
let estado;
condicionVehiculo.addEventListener("change", (e) => {
  estado = e.path[0].value;
});

formularioCotizacion.addEventListener("click", (e) => {
  e.preventDefault();
});

/* variables con scope global para generar cotizacion */
let guaritmo;
let precioBase;
let precioMercado;

/* Genero dinamicamente las options del select para poder modificarlo mas facilmente a futuro */
const listaMarcasAutos = [
  "volvo",
  "saab",
  "fiat",
  "audio",
  "chevrolet",
  "volkswagen",
  "toyota",
  "nissan",
  "peugeot",
];

for (var i = 0; i < listaMarcasAutos.length; i++) {
  var vehicleOption = document.createElement("option");
  vehicleOption.value = listaMarcasAutos[i];
  vehicleOption.text = listaMarcasAutos[i];
  marcaVehiculo.appendChild(vehicleOption);
}

/* 
    funcion base para establecer el valor de la cotizacion
    segun los parametros que el usuario haya introducido
*/
function cotizarVehiculo() {
  guaritmo = Math.pow(anio, (0.01 + anio - 1950) * 0.001);
  switch (marca) {
    case "volvo":
      precioBase = 5000;
      break;
    case "saab":
      precioBase = 7000;
      break;
    case "fiat":
      precioBase = 2000;
      break;
    case "audi":
      precioBase = 3500;
      break;
    case "chevrolet":
      precioBase = 3000;
      break;
    case "volkswagen":
      precioBase = 2200;
      break;
    case "toyota":
      precioBase = 3200;
      break;
    case "nissan":
      precioBase = 3000;
      break;
    case "peugeot":
      precioBase = 2800;
      break;
    default:
      precioBase = 0;
      break;
  }
  console.log(precioBase);
  console.log(estado);
  switch (estado) {
    case "excelente":
      guaritmo += 1.5;
      break;
    case "buena":
      guaritmo += 1;
      break;
    case "regular":
      guaritmo += 0.6;
      break;
    case "malo":
      guaritmo += 0.3;
      break;
    default:
      guaritmo = 0;
      break;
  }
  console.log(guaritmo);
  precioMercado = precioBase * guaritmo;
  containerCorizacion.innerHTML = "U$S " + precioMercado.toFixed(0);
}
