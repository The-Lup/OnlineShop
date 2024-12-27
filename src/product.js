const product = document.getElementById('producto');
const productImg = producto.querySelector('.producto__imagen');
const thumbs = producto.querySelector('.producto__thumbs');

//Color refs
const colorProp = producto.querySelector('#propiedad-color');

//Quantity refs
const qtyBtnDecrease = producto.querySelector('#disminuir-cantidad');
const qtyBtnincrease = producto.querySelector('#incrementar-cantidad');
const inputQty = producto.querySelector('#cantidad');

//Functionality- Thumbnails
thumbs.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    const imgSrc = e.target.src;

    //Obtener la posicion del ultimo index./
    const lastIndex = imgSrc.lastIndexOf('/');

    //Cortar la cadena de texto para obtener el nombre de la imagen (último index)./
    const imgName = imgSrc.substring(lastIndex + 1);

    //Cambiar nombre de la imagen por el último index./
    productImg.src = `./img/tennis/${imgName}`;
  }
});

//Functionality - Color Options
colorProp.addEventListener('click', (e) => {
  if (e.target.tagName === 'INPUT') {
    productImg.src = `./img/tennis/${e.target.value}.jpg`;
  }
});

//Functionalities - Quantity increase/decrease
qtyBtnincrease.addEventListener('click', (e) => {
  inputQty.value = parseInt(inputQty.value) + 1;
});
qtyBtnDecrease.addEventListener('click', (e) => {
  if (parseInt(inputQty.value) > 1) {
    inputQty.value = parseInt(inputQty.value) - 1;
  }
});
