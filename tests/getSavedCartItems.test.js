const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('getSavedCartItems chama o método localStorage.getItem', async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('getSavedCartItems chama localStorage.getItem corretamente', async () => {
    await getSavedCartItems();
    expect(localStorage.getItem).toBeCalledWith('cartItems');
  });
});
