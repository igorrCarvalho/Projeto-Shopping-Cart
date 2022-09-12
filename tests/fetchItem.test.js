require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  const param = 'MLB1615760527';
  it('fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('A função fetch foi chamada', async () => {
    await fetchItem(param);
    expect(fetch).toHaveBeenCalled();
  });
  it('fetchItem é chamado com o endpoint correto', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    await fetchItem(param);
    expect(fetch).toBeCalledWith(url);
  });
  it('fetchItem retorna o objeto esperado', async () => {
    const data = await fetchItem(param);
    expect(data).toEqual(item);
  });
  it('fetchItem, sem argumentos, retorna um erro', async () => {
    const dataError = await fetchItem();
    expect(dataError).toEqual(new Error('You must provide an url'));
  });
});
