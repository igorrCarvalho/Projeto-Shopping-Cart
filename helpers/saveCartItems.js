const saveCartItems = (arr) => {
  localStorage.setItem('cartItems', JSON.stringify(arr));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
