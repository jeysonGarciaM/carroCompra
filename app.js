const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");
const btncreate = document.getElementById("btn-create");
const closemodal = document.getElementById("btn-cancel");
const modal = document.querySelector('.container');
const newproduct = document.getElementById("newproduct");
const newprice = document.getElementById("newprice");
const add = document.getElementById("btn-addprd");
const imgnew = document.getElementById("imgnew");
const filterXPrice = document.getElementById('filterXPrice');


let imgselect = "";
let idproduct = 0;

window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);
add.addEventListener('click', addproduct);
imgnew.addEventListener('change', importimg);
btncreate.addEventListener('click', ()=>modal.style.display='flex');
closemodal.addEventListener('click', ()=>modal.style.display='none');
filterXPrice.addEventListener('change', filterproducts);

function filterproducts(event){
  const responseFilter = event.target.value == '0 a 15000'
  ? digitals.filter(digital => digital.price <15000)
  : event.target.value == '15000 a 25000'
  ? digitals.filter(digital => digital.price >=15000 && digital.price <=25000)
  : event.target. value == '25000 a 50000'
  ? digitals.filter(digital => digital.price >25000)
  : null;
  responseFilter.map( digital => createCards(digital));
}

function importimg(event){
  const img = event.target.files[0];
  const url = URL.createObjectURL(img);
  imgselect= url;
}

function addproduct(){
  idproduct++;
  const titleproduct = newproduct.value;
  const priceproduct = newprice.value;
  const id = idproduct;
  const newdigital = {id:id, product:titleproduct, price:priceproduct, image:imgselect};

  digitals.push(newdigital);
  listSelect();
  modal.style.display="none";

  newproduct.value='';
  newprice.value='';
  imgnew.value=null;

}


function renderCards() {  
  digitals.map(digital=>{digital.product == selectProducts.value ? createCards(digital): null});
}

function listSelect() {
  selectProducts.innerHTML = '';
  const anyOpcion = document.createElement('option');
  selectProducts.appendChild(anyOpcion);
  anyOpcion.textContent='select product';
  digitals.map(digital=>{
    const option =document.createElement('option');
    option.value = digital.product;
    option.textContent = digital.product;
    selectProducts.appendChild(option);

    
  })
}

function createCards(digitals) {
  const {product, image,id,price} = digitals;  

  const card = document.createElement('div');
  card.classList.add('card-product');

  const imgcard = document.createElement('img');
  imgcard.setAttribute('src', image);
  imgcard.setAttribute('alt', `${id}-${product}`);
  imgcard.classList.add('img-product');

  const namecard = document.createElement('p');
  namecard.textContent = product;
  namecard.classList.add('name-product');

  const pricecard = document.createElement('p');
  pricecard.classList.add('price-product');
  pricecard.textContent = price;

  const btnadd = document.createElement('button');
  btnadd.setAttribute('id', id);
  btnadd.classList.add('btn-Add');
  btnadd.textContent = 'add to card';

  const btndelate = document.createElement('button');
  btndelate.setAttribute('id', id);
  btndelate.textContent = 'Remove';
  btndelate.classList.add('btn-delete');
  btndelate.addEventListener('click', deleteFile)



  card.appendChild(imgcard);
  card.appendChild(namecard);
  card.appendChild(pricecard);
  card.appendChild(btnadd);
  card.appendChild(btndelate);

  mainCards.appendChild(card);

  function deleteFile(){
    card.remove();
  }
}
