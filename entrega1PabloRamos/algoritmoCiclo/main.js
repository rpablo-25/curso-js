let ingresaNumero = prompt("por favor ingresa un numero: ");
let ingresaEdad = prompt("por favor ingresa tu edad: ");
let esLaEdadActual = true;

for (let i = 0; i < ingresaNumero; i++) {
  if (esLaEdadActual) {
    console.log(`su edad es de ${ingresaEdad} años`);
    esLaEdadActual = false;
  } else {
    console.log(`su edad en ${i} año/s será de: ${parseInt(ingresaEdad) + i}`);
  }
}
