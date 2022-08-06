/* solicito nombre al usuario para una devolucion mas personalizada */
let nombreUsuario = prompt("Por favor ingrese su nombre: ");

/* selecciono y asigno a constantes los elementos a utilizar */

const botonCotizar = document.querySelector("#btn-cotizar");
const marcaVehiculo = document.querySelector("#marca-vehiculo");
const anioVehiculo = document.querySelector("#anio-vehiculo");
const condicionVehiculo = document.querySelector("#estado-vehiculo");
const formularioCotizacion = document.querySelector("#formulario-cotizacion");
const containerCotizacion = document.querySelector("#container-cotizacion");
const resultadoCotizacion = document.querySelector("#resultado-cotizacion");
const valorCotizacion = document.querySelector("#valor-cotizacion");

/* Genero dinamicamente las options del select para poder modificarlo mas facilmente a futuro */
const listaMarcasAutos = [
  { marca: "volvo", precioBase: 5000 },
  { marca: "saab", precioBase: 7000 },
  { marca: "fiat", precioBase: 2000 },
  { marca: "audi", precioBase: 5000 },
  { marca: "chevrolet", precioBase: 5000 },
  { marca: "volkswagen", precioBase: 5000 },
  { marca: "toyota", precioBase: 5000 },
  { marca: "nissan", precioBase: 5000 },
  { marca: "peugeot", precioBase: 5000 },
];

for (let marca of listaMarcasAutos) {
  var vehicleOption = document.createElement("option");
  vehicleOption.value = marca.marca;
  vehicleOption.text = marca.marca;
  marcaVehiculo.appendChild(vehicleOption);
}

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

/* 
    funcion base para establecer el valor de la cotizacion
    segun los parametros que el usuario haya introducido
*/
function cotizarVehiculo() {
  if (anio > 1950 && anio < 2022) {
    guaritmo = Math.pow(anio, (0.01 + anio - 1950) * 0.001).toFixed(5);
    guaritmo = parseFloat(guaritmo);
    for (let marcaSeleccionada of listaMarcasAutos) {
      if (marca === marcaSeleccionada.marca) {
        precioBase = parseInt(marcaSeleccionada.precioBase);
        break;
      } else {
        precioBase = 0;
      }
    }
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
      case "mala":
        guaritmo += 0.3;
        break;
      default:
        guaritmo = 0;
        break;
    }

    /* genero el precio de mercado y lo asigno a la etiqueta correspondiente */
    precioMercado = precioBase * guaritmo;
    resultadoCotizacion.innerHTML =
      nombreUsuario + " " + "el valor de su vehiculo es de:";
    valorCotizacion.innerHTML = "U$S " + precioMercado.toFixed(0);
  } else {
    alert(
      nombreUsuario +
        " " +
        "debes ingresar un año comprendido entre 1950 y 2022!"
    );
  }
}
