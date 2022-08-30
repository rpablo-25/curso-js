/* cuando carga documento traigo cotizaciones previas */
document.addEventListener("DOMContentLoaded", () => {
  /* compruebo el local storage */
  let listaCotizaciones = [localStorage.getItem("cotizaciones")] || [];

  obtenerCotizaciones();
});

/* solicito nombre al usuario para una devolucion mas personalizada */
let nombreUsuario = "pablo";

/* let nombreUsuario =  prompt("Por favor ingrese su nombre: "); */

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

for (let marcaAuto of listaMarcasAutos) {
  let vehicleOption = document.createElement("option");
  vehicleOption.value = marcaAuto.marca;
  vehicleOption.text = marcaAuto.marca;
  marcaVehiculo.appendChild(vehicleOption);
}

/* event listeners de los elementos que actuan */
let marca = listaMarcasAutos[0].marca;
marcaVehiculo.addEventListener("change", (e) => {
  marca = e.path[0].value;
});

let anio;
anioVehiculo.addEventListener("change", (e) => {
  anio = parseInt(e.path[0].value);
});
let estado = condicionVehiculo.value;
condicionVehiculo.addEventListener("change", (e) => {
  estado = e.path[0].value;
});

formularioCotizacion.addEventListener("click", (e) => {
  e.preventDefault();
});

/* capture el evento de enter para todo el formulario, de
 manera que el usuario pueda utilizar el enter si asi lo desea */
formularioCotizacion.addEventListener("enter", (e) => {
  e.preventDefault();
  cotizarVehiculo();
});

/* variables con scope global para generar cotizacion */
let guaritmo;
let precioBase;
let precioMercado;

/* variables para local storage */
let cotizacionActual = {};

function obtenerCotizaciones() {
  localStorage.getItem("cotizaciones")
    ? (listaCotizaciones = [JSON.parse(localStorage.getItem("cotizaciones"))])
    : (listaCotizaciones = []);
}

/* 
    funcion base para establecer el valor de la cotizacion
    segun los parametros que el usuario haya introducido
*/
function cotizarVehiculo() {
  if (anio > 1950 && anio <= 2022) {
    guaritmo = Math.pow(anio, (0.01 + anio - 1950) * 0.001).toFixed(5);
    guaritmo = parseFloat(guaritmo);
    for (let seleccion of listaMarcasAutos) {
      if (marca === seleccion.marca) {
        precioBase = parseInt(seleccion.precioBase);
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

    cotizacionActual.anio = anio;
    cotizacionActual.precio = precioMercado;
    cotizacionActual.marca = marca;

    resultadoCotizacion.innerHTML =
      nombreUsuario + " " + "el valor de su vehiculo es de:";
    valorCotizacion.innerHTML = "U$S " + precioMercado.toFixed(0);

    listaCotizaciones = JSON.parse(localStorage.getItem("cotizaciones")) || [];
    if (listaCotizaciones.length === 0) {
      listaCotizaciones = [cotizacionActual];
    } else {
      listaCotizaciones = [...listaCotizaciones, cotizacionActual];
    }
    renderizarHtml(listaCotizaciones);
    actualizarLocalStorage();
  } else {
    alert(
      nombreUsuario +
        " " +
        "debes ingresar un año comprendido entre 1950 y 2022!"
    );
  }
}

function renderizarHtml(array) {
  const elementoHtml = document.querySelector(
    "#contenedor-cotizaciones-viejas"
  );

  elementoHtml.innerHTML = "";

  if (array.length === 0) {
    elementoHtml.innerHTML =
      "<h1 class='mt-5'>No existen resultados previos</h1>";
  }

  array.forEach(({ marca, anio, precio }) => {
    const div = document.createElement("div");
    div.innerHTML = `<div class='w-full text-blue-500 font-semibold px-2 py-1 text-xs mx-auto text-left'> ${marca} - año ${anio} - U$S ${precio}</div>`;

    elementoHtml.appendChild(div);
  });
}

function actualizarLocalStorage() {
  let listaString = JSON.stringify(listaCotizaciones);
  localStorage.setItem("cotizaciones", listaString);
  listaCotizaciones = localStorage.getItem("cotizaciones");
}
