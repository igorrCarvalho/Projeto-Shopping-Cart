require('../mocks/fetchSimulator');
const { expect, it } = require('@jest/globals');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador'
  it('fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function')
  });
  it('A função fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('A função é chamada com o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toBeCalledWith(url);
  });
  it('fetchProducts retorna a estrutura de dados esperada', async () => {
    const func = await fetchProducts('computador');
    expect(func).toEqual(computadorSearch); 
  });
  it('fetchProducts lança um erro', async () => {
    const errorFunc = await fetchProducts();
    expect(errorFunc).toEqual(new Error('You must provide an url'));
  })
});
