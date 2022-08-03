/* selecciono y asigno a constantes los elementos a utilizar */
const botonCotizar = document.querySelector("#btn-cotizar");
const marcaVehiculo = document.querySelector("#marca-vehiculo");
const anioVehiculo = document.querySelector("#anio-vehiculo");
const condicionVehiculo = document.querySelector("#estado-vehiculo");
const formularioCotizacion = document.querySelector("#formulario-cotizacion");
const containerCotizacion = document.querySelector("#container-cotizacion");
const resultadoCotizacion = document.querySelector("#resultado-cotizacion");
const valorCotizacion = document.querySelector("#valor-cotizacion");

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

for (var i = 0; i < listaMarcasAutos.length; i++) {
  var vehicleOption = document.createElement("option");
  vehicleOption.value = listaMarcasAutos[i].marca;
  vehicleOption.text = listaMarcasAutos[i].marca;
  marcaVehiculo.appendChild(vehicleOption);
}

/* 
    funcion base para establecer el valor de la cotizacion
    segun los parametros que el usuario haya introducido
*/
function cotizarVehiculo() {
  if (anio > 1950 && anio < 2022) {
    guaritmo = Math.pow(anio, (0.01 + anio - 1950) * 0.001).toFixed(5);
    guaritmo = parseFloat(guaritmo);
    console.log(guaritmo);
    for (var i = 0; i < listaMarcasAutos.length; i++) {
      if (marca === listaMarcasAutos[i].marca) {
        precioBase = parseInt(listaMarcasAutos[i].precioBase);
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
    resultadoCotizacion.innerHTML = "El valor de su vehiculo es de:";
    valorCotizacion.innerHTML = "U$S " + precioMercado.toFixed(0);
  } else {
    alert("Debe ingresar un año comprendido entre 1950 y 2022!");
  }
}
