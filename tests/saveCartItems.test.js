const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('saveCartItems chama o método localStorage', async () => {
    await saveCartItems('cartItem');
    expect(localStorage).toHaveBeenCalled();
  });
  it('localStorage é chamado com os parâmetros certos', async () => {
    await saveCartItems('cartItem');
    expect(localStorage).toBeCalledWith('cartItems', 'cartItem');
  });
});
