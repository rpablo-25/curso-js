/* variables globales */
const baseURL = "https://fakestoreapi.com/";
let products = JSON.parse(localStorage.getItem("products")) || [];
let shoppingCart = [];

/* selecciono los elementos a utilizar del html */
const botonRegistro = document.querySelector("#register-button");
const carrito = document.querySelector("#carrito");
const botonLogin = document.querySelector("#login-button");
const botonAgregarCarrito = document.querySelector(".addToCartButton");
const contenedorProductos = document.querySelector("#products-container");
const botonAbrirCarrito = document.querySelector("#open-cart-button");
const botonCerrarCarrito = document.querySelector("#close-cart-button");
const headerContainer = document.querySelector("#header-container");

/* configuro los listeners para los cambios */
window.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOMContentLoaded successfully");
  getProducts();
});

contenedorProductos.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("CartButton")) {
    addItemToCart(parseInt(e.target.id));
  }
});
carrito.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("removeFromCart")) {
    removeItemFromCart(parseInt(e.target.id));
  }
});

botonAbrirCarrito.addEventListener("click", (e) => {
  toggleCartContainer();
});

botonCerrarCarrito.addEventListener("click", (e) => {
  toggleCartContainer();
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
    const { id, title, price, description, image } = product;
    html += `<div class="flex w-full md:mx-4 space-x-2 h-48 text-xs items-center justify-between bg-slate-100 rounded-xl mt-2 p-1 md:p-4">
                <div class="flex w-5/12 flex-col h-48 items-center justify-center">
                    <div class="w-full text-center overflow-hidden text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-semibold font-awesomemb-1 overflow-clip text-sm " id="product-title">
                        ${title}
                    </div>
                        <img id="product-image" class="object-cover rounded-xl w-full h-36"
                        src="${image}"
                        alt="producto1">
                </div>            
                <div class="w-5/12 h-40 overflow-y-scroll " id="product-name">
                    ${description}
                </div>
                <div class="w-1/12" id="product-price">
                    ${price}
                </div>
                <button id="${id}" class="w-2/12 text-white font-semibold CartButton addToCartButton h-12 p-1 bg-green-400 rounded-lg flex items-center justify-center flex-col" id="buy-button">
                    Agregar
                    <i class="fa-solid mb-1 fa-cart-shopping text-lg text-white">🛒</i>    
                </button>
            </div>`;
  });

  containter.innerHTML = html;

  almacenarLocalStorage(productos);
}

function addItemToCart(id) {
  const articulo = products[id];
  shoppingCart.find((id) => articulo.id == id)
    ? (shoppingCart = [...shoppingCart, [(shoppingCart[id].quantity += 1)]])
    : shoppingCart.push(products[id]);

  /* 
    TODO: arreglar la forma en la que se 
    agregan objetos segun exista o no 
    */

  updateCart();

  almacenarCarritoLocalStorage(shoppingCart);
}

function removeItemFromCart(productId) {
  const articulo = shoppingCart[productId];
  shoppingCart.splice(articulo, 1);

  updateCart();

  almacenarCarritoLocalStorage(shoppingCart);
}

function updateCart() {
  let html = "";
  if (shoppingCart.length > 0) {
    shoppingCart.forEach((element) => {
      if (element.quantity) {
        element.quantity += 1;
      } else {
        element.quantity = 1;
      }

      const { id, title, price, image, quantity } = element;
      html += `
            <div class="flex mx-auto w-5/6 space-x-2 h-48 text-xs items-center justify-between bg-slate-100 rounded-xl mt-2 py-2 px-4">
                <div class="flex w-7/12 flex-col h-48 items-center justify-center">
                    <div class="w-full mb-1 overflow-clip text-sm " id="product-title">
                        ${title}
                    </div>
                    <img id="product-image" class="object-cover w-full h-36"
                    src="${image}"
                    alt="producto1">
                </div>
                <div class="w-4/12" id="product-price">
                    ${price}
                </div>
                <div class="w-2/12" id="product-price">
                    ${quantity}
                </div>
                <button id="${id}" class="w-1/12 removeFromCart h-24 bg-red-400 rounded-lg flex items-center justify-center flex-col" id="buy-button">
                    <i class="fa-solid mb-1 fa-cart-shopping text-black">❌</i>    
                    <span class="text-white font-semibold"> 
                        Eliminar
                    </span>
                </button>
            </div>
            `;
    });
  } else {
    html = `<div class="flex text-center text-xl font-semibold text-white items-center justify-center "> El carrito está vacío.. por ahora 😏 </div>`;
  }
  carrito.innerHTML = html;
  almacenarCarritoLocalStorage(shoppingCart);
}

function almacenarLocalStorage(array) {
  localStorage.setItem("products", JSON.stringify(array));
}

function almacenarCarritoLocalStorage(array) {
  localStorage.removeItem("shoppingCart");
  localStorage.setItem("shoppingCart", JSON.stringify(array));
}

function toggleCartContainer() {
  const cartContainer = document.querySelector("#contenedor-carrito");
  cartContainer.classList.toggle("hidden");
  headerContainer.classList.toggle("hidden");
  updateCart();
}
