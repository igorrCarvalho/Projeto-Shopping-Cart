const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('saveCartItems chama o método localStorage', () => {
    saveCartItems('cartItem');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('localStorage é chamado com os parâmetros certos', () => {
    saveCartItems([1, 2, 3]);
    expect(localStorage.setItem).toBeCalledWith('cartItems', JSON.stringify([1, 2, 3]));
  });
});
