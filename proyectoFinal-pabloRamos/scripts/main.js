/* variables globales */
const baseURL = "https://fakestoreapi.com/";
let products = [JSON.parse(localStorage.getItem("products"))] || [];
let shoppingCart = [];

/* selecciono los elementos a utilizar del html */
const botonRegistro = document.querySelector("#register-button");
const botonLogin = document.querySelector("#login-button");
const botonAgregarCarrito = document.querySelector("#button-add-to-cart");
const firstSlideImg = document.querySelector("#first-slide-image");
const secondSlideImg = document.querySelector("#second-slide-image");
const thirdSlideImg = document.querySelector("#third-slide-image");

/* configuro los listeners para los cambios */
window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOMContentLoaded successfully");
  getProducts();
});

/* 
codifico las 
funciones a utilizar 
*/

/* manejo los datos necesarios para generar el contenido de la app */
function getProducts() {
  if (localStorage.getItem("products")) {
    mostrarHtml(JSON.parse(localStorage.getItem("products")));
  } else {
    fetch(baseURL + "products")
      .then((res) => res.json())
      .then((json) => mostrarHtml(json));
  }
}

/* itera sobre el array de productos y los inyecta en el contenedor */
function mostrarHtml(productos) {
  const containter = document.querySelector("#products-container");

  let html = "";

  productos.forEach((product) => {
    const { title, price, description, image } = product;
    html += `<div class="flex w-full md:mx-4 space-x-2 h-48 text-xs items-center justify-between bg-slate-100 rounded-xl mt-2 p-1 md:p-4">
                <div class="flex w-5/12 flex-col h-48 items-center justify-center">
                    <div class="w-full text-center overflow-hidden text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold font-awesomemb-1 overflow-clip text-sm " id="product-title">
                        ${product.title}
                    </div>
                        <img id="product-image" class="object-cover rounded-xl w-full h-36"
                        src="${product.image}"
                        alt="producto1">
                </div>            
                <div class="w-5/12 h-40 overflow-y-scroll " id="product-name">
                    ${product.description}
                </div>
                <div class="w-1/12" id="product-price">
                    ${product.price}
                </div>
                <button onclick="addItemToCart(this);" id="${product.id}" class="w-2/12 h-12 p-1 bg-green-400 rounded-lg flex items-center justify-center flex-col" id="buy-button">
                    <span class="text-white font-semibold"> 
                        Agregar
                        <i class="fa-solid mb-1 fa-cart-shopping text-lg text-white">🛒</i>    
                    </span>
                </button>
            </div>`;
  });

  containter.innerHTML = html;

  almacenarLocalStorage(productos);
}

function updateCart() {
  const carrito = document.querySelector("#carrito");
  let html = "";
  if (shoppingCart.length > 0) {
    shoppingCart.forEach((element) => {
      html += `
    <div class="flex w-full mx-4 space-x-2 h-48 text-xs items-center justify-between bg-slate-100 rounded-xl mt-2 p-4">
        <div class="flex w-7/12 flex-col h-48 items-center justify-center">
            <div class="w-full mb-1 overflow-clip text-sm " id="product-title">
                ${element.title}
            </div>
            <img id="product-image" class="object-cover w-full h-36"
            src="${element.image}"
            alt="producto1">
        </div>
        <div class="w-4/12" id="product-price">
            ${element.price}
        </div>
        <button onclick="removeItemFromCart();" id="button-add-to-cart" class="w-1/12 h-24 bg-red-400 rounded-lg flex items-center justify-center flex-col" id="buy-button">
            <i class="fa-solid mb-1 fa-cart-shopping text-black">❌</i>    
            <span class="text-white font-semibold"> 
                Eliminar
            </span>
        </button>
    </div>
    `;
    });
  } else {
    html += `<div class="flex text-center text-xl font-semibold text-white items-center justify-center "> El carrito está vacío.. por ahora 😏 </div>`;
  }
  localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
}

function addItemToCart(elemento) {
  const id = parseInt(elemento.id);
  const articulo = products[id];
  shoppingCart.find((element) => element.id === id)
    ? (shoppingCart[id].quantity += 1)
    : shoppingCart.push(products[id]);

  updateCart();
}

function removeItemFromCart(product) {
  shoppingCart.remove(product);
  updateCart();
}

function almacenarLocalStorage(array) {
  localStorage.setItem("products", JSON.stringify(array));
}

function toggleCartContainer() {
  const cartContainer = document.querySelector("#contenedor-carrito");
  cartContainer.classList.toggle("hidden");
}

updateCart();
