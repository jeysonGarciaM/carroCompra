const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);



function renderCards() {  
  phones.map(phone => {phone.product === selectProducts.value ? createCards(phone) : null });
}

function listSelect() {
    selectProducts.innerHTML = '';
    const any = document.createElement('option');
    selectProducts.appendChild(any);
    any.textContent = 'Select product';

    phones.map( phone => {
    const option = document.createElement('option');
    option.value = phone.product;
    option.textContent = phone.product;    
    selectProducts.appendChild(option);
  })
}



//--------------------capture img

let imgSelect = " ";
const newImage = document.getElementById('images');
newImage.addEventListener('change', importImage);

function importImage(event) {
  const img = event.target.files[0];
  const objectURL = URL.createObjectURL(img);
  imgSelect = objectURL;
}



//-------------------create

const newProduct = document.getElementById('product');
const newPrice = document.getElementById('price');
const btnCreate = document.querySelector('#Send');
btnCreate.addEventListener('click', CreateProduct);

let idProduct = 0

function CreateProduct() {
  idProduct++;
  const id = idProduct;
  const titleProduct = newProduct.value;
  const priceProduct = newPrice.value;

  const newPhone = {id:id,  product: titleProduct,   price: priceProduct,  image: imgSelect};
  console.log(newPhone);

  phones.push(newPhone);
  console.log(phones);
  listSelect();
  Content.style.display = 'none';
}



//------------create cards 

function createCards(phones) {
  const {product, image, id, price} = phones;

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgCard = document.createElement('img');
  imgCard.setAttribute('src',image);
  imgCard.setAttribute('alt',product);
  imgCard.classList.add('img-product');

  const nameCard = document.createElement('h4');
  nameCard.textContent = product;
  nameCard.classList.add('name-product');

  const priceCard = document.createElement('h4');
  priceCard.classList.add('price-product');
  priceCard.textContent = price;
  
  const btnAdd = document.createElement('button');
  btnAdd.setAttribute('id',id);
  btnAdd.classList.add('btn-add');
  btnAdd.textContent = 'Add to cart';
  btnAdd.addEventListener('click', store);

  const btnclose = document.createElement('button');
  btnclose.setAttribute('id',id);
  btnclose.classList.add('btn-close');
  btnclose.textContent = 'Delect';
  btnclose.addEventListener('click', close)

  card.appendChild(imgCard);
  card.appendChild(nameCard);
  card.appendChild(priceCard);
  card.appendChild(btnAdd);
  card.appendChild(btnclose);

  mainCards.appendChild(card);

  function close() {
    card.remove();
  }
}


//-----------------------whaching

const Content = document.getElementById('content');
const btn = document.querySelector('#btn_create');
const btnCancel = document.querySelector('#cancel');

btnCancel.addEventListener('click', off);
btn.addEventListener("click", see);

function off(params) {
Content.style.display = 'none';
}
function see() {
Content.style.display = 'flex';
}


//---------------- filter price

const filterXPrice = document.getElementById('filterXPrice');
const containerCards = document.getElementById('container-cards');
filterXPrice.addEventListener('click', filterPrice);

function filterPrice(event) {
  const filterr = event.target.value === 'Men 1500000'
  ? phones.filter( phone => phone.price < 1500000)
  : event.target.value === 'Our 700000 y 2000000'
  ? phones.filter( phone => phone.price >= 700000 && phone.price <= 3000000)

  : event.target.value === 'Max 3000000'
  ? phones.filter( phone => phone.price > 3000000 )
  : null;

  containerCards.innerHTML = '';
  filterr.map( phone => createCards(phone));
}



/* ------------------ car ------------------- */


const check = document.getElementById('content2');
const check_ = document.getElementById('content3');
const btn2 = document.querySelector('#car2');
const btnCancel2 = document.querySelector('#cancel2');

btnCancel2.addEventListener('click', off2);
btn2.addEventListener('click', see2);


function off2(params) {
  check.style.display = 'none';
}
function see2() {
  check.style.display = 'flex';
}




function store(event) {
  phones.map( element => {
    if (element.id === event.target.id) {
      createStore(element);
    }
  })
}



function createStore(phones) {
  const  {product, image, id, price} = phones;


  //first content
  const div1 = document.createElement('div');
  const cerrarC = document.createElement('div');
  const closeBuy = document.createElement('button');
  const buy = document.createElement('button');
  div1.classList.add('Venta');
  cerrarC.classList.add('cerrarC');
  closeBuy.classList.add('closeBuy');
  buy.classList.add('Buy');
  closeBuy.textContent = "Delect";
  buy.textContent = "Buy";
  closeBuy.addEventListener('click', close2);
  buy.addEventListener('click', finish);

  function close2() {
    div1.remove();
  }
  function finish() {
    div1.remove();
    alert("compra relizada")
  }
 

  //secound content
  const div2 = document.createElement('div');
  let LabelNombre = document.createElement('p');
  let pNombre = document.createElement('p');
  LabelNombre.textContent = "Nombre";
  LabelNombre.classList.add('labelPiezas');
  pNombre.textContent = product;
  pNombre.setAttribute('id', id);
  

  const div3 = document.createElement('div');
  let labelPrecio = document.createElement('p');
  let pPrecio = document.createElement('p');
  labelPrecio.classList.add('labelPiezas');
  labelPrecio.textContent = "Precio";
  pPrecio.textContent = price;
  pPrecio.setAttribute('id', id);

  const div4 = document.createElement('div');
  let labelCantidad = document.createElement('p');
  labelCantidad.classList.add('labelPiezas');
  labelCantidad.textContent = "Cantidad";
  let nCantidad = document.createElement('p');


  let labelMas = document.createElement('p');
  labelMas.classList.add('labelPiezas');
  const btnM = document.createElement('input');
  btnM.type = "number";
  btnM.value = 1;
  btnM.classList.add('mas');
  btnM.setAttribute('number', id);

  //-------------------- mats ----------------- 

  const div4_ = document.createElement('div');
  const labelCantidad_ = document.createElement('p');
  const tol = document.createElement('p');
  tol.classList.add('labelPiezas');
  labelCantidad_.classList.add('total_');
  tol.textContent = "Total";
  btnM.addEventListener('change', tol_)

  function tol_() {
    let total = [];

    let cant = Number(btnM.value);
    let price_ = Number(price);
    let subtotal = cant * price_;
    total.push(subtotal);

    labelCantidad_.innerHTML = total.reduce(sumar);
    function sumar(a, b) {
      return a + b;
    }
  }
  //-------------------------------------

  div2.appendChild(LabelNombre);
  div2.appendChild(pNombre);
  div3.appendChild(labelPrecio);
  div3.appendChild(pPrecio);
  div4.appendChild(labelCantidad);
  div4_.appendChild(tol);
  div4_.appendChild(labelCantidad_);
  div4.appendChild(labelMas);
  div4.appendChild(btnM);
  div4.appendChild(nCantidad);
  cerrarC.appendChild(closeBuy);
  cerrarC.appendChild(buy);

  div1.appendChild(div2);
  div1.appendChild(div3);
  div1.appendChild(div4);
  div1.appendChild(div4_);
  div1.appendChild(cerrarC);

  check.appendChild(div1);

}

/* contador funcional pero no acumula el precio
let data = 0;
  
//printing default value of data that is 0 in h2 tag
document.getElementById("counting").innerText = data;
  
//creation of increment function
function increment() {
    data = data + 1;
    document.getElementById("counting").innerText = data;
}
//creation of decrement function
function decrement() {
    data = data - 1;
    document.getElementById("counting").innerText = data;
}*/