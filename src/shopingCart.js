import data from './data/productsData';
const btnOpenCart = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCloseCart = document.querySelectorAll(
  '[data-accion="cerrar-carrito"]'
);
const windowCart = document.getElementById('carrito');
const btnAddToCart = document.getElementById('agregar-al-carrito');
const productContainer = document.getElementById('producto');
let cart = [];
const coinFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
const notification = document.getElementById('notificacion');

const renderCart = () => {
  windowCart.classList.add('carrito--active');

  //removeing all previous products to build the cart from scratch.
  const prevProducts = windowCart.querySelectorAll('.carrito__producto');
  prevProducts.forEach((productContainer) => productContainer.remove());

  let total = 0;

  //Checking if there are products in cart
  if (cart.length < 1) {
    //adding empty class to cart
    windowCart.classList.add('carrito--vacio');
  } else {
    //removing empty class to cart
    windowCart.classList.remove('carrito--vacio');

    cart.forEach((productCart) => {
      //We get the price from the productsData.js file when the cart item's ID matches one from the list.
      data.products.forEach((prodDataBase) => {
        if (prodDataBase.id === productCart.id) {
          productCart.price = prodDataBase.price;

          total += prodDataBase.price * productCart.quantity;
        }
      });

      //setting the path of the image we want to display in the cart.
      let thumbSrc = productContainer.querySelectorAll(
        '.producto__thumb-img'
      )[0].src;
      if (productCart.color === 'rojo') {
        thumbSrc = './img/thumbs/rojo.jpg';
      } else if (productCart.color === 'amarillo') {
        thumbSrc = './img/thumbs/amarillo.jpg';
      }

      //Creating a template from the HTML code
      const productTemplate = `
        <div class="carrito__producto-info">
                  <img src="${thumbSrc}" alt="" class="carrito__thumb" />
                  <div>
                    <p class="carrito__producto-nombre">
                      <span class="carrito__producto-cantidad">${
                        productCart.quantity
                      } x </span>${productCart.name}
                    </p>
                    <p class="carrito__producto-propiedades">
                      Tamaño:<span>${productCart.size}</span> Color:<span>${
        productCart.color
      }</span>
                    </p>
                  </div>
                </div>
                <div class="carrito__producto-contenedor-precio">
                  <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                      />
                    </svg>
                  </button>
                  <p class="carrito__producto-precio">${coinFormat.format(
                    productCart.price * productCart.quantity
                  )}</p>
                </div>
      `;

      //Creating a div from the HTML code
      const itemCart = document.createElement('div');

      //adding class to div
      itemCart.classList.add('carrito__producto');

      //adding template
      itemCart.innerHTML = productTemplate;

      //adding the class to the cart window
      windowCart.querySelector('.carrito__body').appendChild(itemCart);
    });
  }

  windowCart.querySelector('.carrito__total').innerText =
    coinFormat.format(total);
};

//Functionalities- Opening/Closing Cart
btnOpenCart.forEach((btn) => {
  btn.addEventListener('click', () => {
    renderCart();
  });
});

btnCloseCart.forEach((btn) => {
  btn.addEventListener('click', () => {
    windowCart.classList.remove('carrito--active');
  });
});

//Functionality - addToCart
btnAddToCart.addEventListener('click', () => {
  const id = productContainer.dataset.productoId;
  const name = productContainer.querySelector('.producto__nombre').innerText;
  const quantity = parseInt(productContainer.querySelector('#cantidad').value);
  const color = productContainer.querySelector(
    '#propiedad-color input:checked'
  ).value;
  const size = productContainer.querySelector(
    '#propiedad-tamaño input:checked'
  ).value;

  if (cart.length > 0) {
    let prodInCart = false;

    cart.forEach((item) => {
      if (
        item.id === id &&
        item.name === name &&
        item.color === color &&
        item.size === size
      ) {
        item.quantity += quantity;
        prodInCart = true;
      }
    });

    if (!prodInCart) {
      cart.push({
        id: id,
        name: name,
        quantity: quantity,
        color: color,
        size: size,
      });
    }
  } else {
    cart.push({
      id: id,
      name: name,
      quantity: quantity,
      color: color,
      size: size,
    });
  }

  //stablishing the src of the img we want to show
  let tumbSrc = productContainer.querySelectorAll('.producto__thumb-img')[0]
    .src;
  if (color === 'rojo') {
    tumbSrc = './img/thumbs/rojo.jpg';
  } else if (color === 'amarillo') {
    tumbSrc = './img/thumbs/amarillo.jpg';
  }
  notification.querySelector('img').src = tumbSrc;

  //Show notification
  notification.classList.add('notificacion--active');

  //timing notification
  setTimeout(() => notification.classList.remove('notificacion--active'), 5000);
});

//Functionality - remove from cart
windowCart.addEventListener('click', (e) => {
  if (e.target.closest('button')?.dataset.accion === 'eliminar-item-carrito') {
    const prod = e.target.closest('.carrito__producto');
    const indexProd = [
      ...windowCart.querySelectorAll('.carrito__producto'),
    ].indexOf(prod);

    cart = cart.filter((item, index) => {
      if (index !== indexProd) {
        return item;
      }
    });
    renderCart();
  }
});

//Functionality - Send to cart
windowCart
  .querySelector('#carrito__btn-comprar')
  .addEventListener('click', () => {
    console.log('Enviado peticion de compra!');
  });
