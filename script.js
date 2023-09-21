//Here we are checking to see if our document(HTML) is still loading
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active');
  menuLinks.classList.toggle('active');
};

menu.addEventListener('click', mobileMenu);

// Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  let scrollPos = window.scrollY;
  //console.log(scrollPos);

  // adds 'highlight' class to my menu items
  if (window.innerWidth > 960 && scrollPos < 600) {
    homeMenu.classList.add('highlight');
    aboutMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 1400) {
    aboutMenu.classList.add('highlight');
    homeMenu.classList.remove('highlight');
    servicesMenu.classList.remove('highlight');
    return;
  } else if (window.innerWidth > 960 && scrollPos < 2345) {
    aboutMenu.classList.remove('highlight');
    return;
  }

  if ((elem && window.innerWIdth < 960 && scrollPos < 600) || elem) {
    elem.classList.remove('highlight');
  }
};

window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

//  Close mobile Menu when clicking on a menu item
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active');
  if (window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active');
    menuLinks.classList.remove('active');
  }
};

menuLinks.addEventListener('click', hideMobileMenu);
navLogo.addEventListener('click', hideMobileMenu);

//Making the shopping cart interactive
function ready() {
  var removeCartItemButton = document.getElementsByClassName('btn__danger');
  console.log(removeCartItemButton);
  for (var i = 0; i < removeCartItemButton.length; i++) {
    var button = removeCartItemButton[i]
    button.addEventListener('click', removeCartItem)
  }

  var quantityInputs = document.getElementsByClassName('cart__quantity__input')
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener('change', quantityChanged)
  }

  var addToCartButtons = document.getElementsByClassName('order__item__btn')
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

  document.getElementsByClassName('btn__purchase')[0].addEventListener('click', orderClicked)
}

function orderClicked() {
  alert('Thank you for your order!')
  var cartItems = document.getElementsByClassName('cart__items')[0]
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}

function removeCartItem(event) {
  var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target
  var orderItem = button.parentElement.parentElement
  var title = orderItem.getElementsByClassName('order__item__title')[0].innerText
  var price = orderItem.getElementsByClassName('order__item__price')[0].innerText
  var imageSource = orderItem.getElementsByClassName('order__item__img')[0].src
  console.log(title, price, imageSource);
  addItemToCart(title, price, imageSource)
  updateCartTotal();
}

function addItemToCart(title, price, imageSource) {
  var cartRow = document.createElement('div')
  cartRow.classList.add('cart__row')
  var cartItems = document.getElementsByClassName('cart__items')[0]
  var cartItemName = cartItems.getElementsByClassName('cart__item__title')
  for (var i = 0; i < cartItemName.length; i++) {
    if (cartItemName[i].innerText == title) {
      alert('This item is already added to the cart')
      return
    }
  }
  var cartRowContents = `
  <div class="cart__item cart__column">
    <img class="cart__item__img" src="${imageSource}" width="100" height="100">
    <span class="cart__item__title">${title}</span>
  </div>
  <span class="cart__price cart__column">${price}</span>
  <div class="cart__quantity cart__column">
    <input class="cart__quantity__input" type="number" value="1">
    <button class="btn__danger" role="button">REMOVE</button>
  </div>`
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName('btn__danger')[0].addEventListener('click', removeCartItem);
  cartRow.getElementsByClassName('cart__quantity__input')[0].addEventListener('change', quantityChanged);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart__items')[0];
  var cartRows = cartItemContainer.getElementsByClassName('cart__row');
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName('cart__price')[0];
    var quantityElement = cartRow.getElementsByClassName('cart__quantity__input')[0];
    var price = parseFloat(priceElement.innerText.replace('€', ''));
    var quantity = quantityElement.value
    total = total + (price * quantity);
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart__total__price')[0].innerText = total + '€';
}
