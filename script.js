/** * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const itemSec = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const cartSec = document.querySelector('.cart');
const totalElement = document.createElement('p');
totalElement.className = 'total-price';
cartSec.appendChild(totalElement);
let result = 0;

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const loading = () => {
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'loading-div';
  const loadingText = createCustomElement('p', 'loading', 'carregando...');
  loadingDiv.appendChild(loadingText);
  itemSec.appendChild(loadingDiv);
};

const removeLoading = () => {
  const loadingText = document.querySelector('.loading-div');
  loadingText.remove();
};

const getIdFromProductItem = (product) => product.querySelector('span.item_id').innerText;

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', () => {
    cart.removeChild(li);
    result -= price;
    result = Number(result.toFixed(2));
    totalElement.innerText = `Subtotal: $${result}`;
    localStorage.setItem('price', result);
    const liDatas = [];
    const cartArr = document.querySelectorAll('cart__item');
    cartArr.forEach((element) => {
      liDatas.push(element.innerHTML);
      return localStorage.setItem('cartItems', JSON.stringify(liDatas));
    });
  });
  return li;
};

const btnEvent = async (sec) => {
  cart.appendChild(createCartItemElement(await fetchItem(getIdFromProductItem(sec))));
  const cartItem = document.querySelectorAll('.cart__item');
  if (cartItem.length > 0) {
    const item = await fetchItem(getIdFromProductItem(sec));
    result += item.price;
    result = Number(result.toFixed(2));
    totalElement.innerText = `Subtotal: $${result}`;
    localStorage.setItem('price', result);
    const liData = [];
    cartItem.forEach((element) => {
      liData.push(element.innerHTML);
      saveCartItems(liData);
    });
  }
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  const itemId = createCustomElement('span', 'item_id', id);
  section.appendChild(itemId);
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  const cartBtn = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  cartBtn.addEventListener('click', () => {
    btnEvent(section);
  });
  section.appendChild(cartBtn);
  return section;
};

const generateItems = async () => {
  const { results } = await fetchProducts('computador');
  results.forEach((item) => itemSec.appendChild(createProductItemElement(item)));
};

const discartItemsBtn = document.querySelector('.empty-cart');
discartItemsBtn.addEventListener('click', () => {
  cart.innerHTML = '';
  result = 0;
  localStorage.clear();
  totalElement.innerText = 'Subtotal: $0';
});

const recItems = () => {
  const cartArray = JSON.parse(getSavedCartItems());
  cartArray.forEach((text) => {
    const recLi = createCustomElement('li', 'cart__item', text);
    recLi.addEventListener('click', () => {
      cart.removeChild(recLi);
      const cartItemArr = document.querySelectorAll('.cart__item');
      if (cartItemArr.length === 0) localStorage.clear();
      const liDatas = [];
      cartItemArr.forEach((element) => {
        liDatas.push(element.innerHTML);
        return localStorage.setItem('cartItems', JSON.stringify(liDatas));
      });
    });
    cart.appendChild(recLi);
  });
};

window.onload = async () => {
  loading();
  await generateItems();
  removeLoading();
  if (!localStorage.getItem('cartItems')) {
    totalElement.innerText = 'Subtotal: $0';
    return;
  }
  recItems();
  const value = localStorage.getItem('price');
  totalElement.innerText = `Subtotal: $${value}`;  
};
