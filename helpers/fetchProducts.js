const getUrl = (name) => `https://api.mercadolibre.com/sites/MLB/search?q=${name}`;

const fetchProducts = async (name) => {
  try {
    const url = getUrl(name);
    const resp = await fetch(url);
    const jsonData = await resp.json();
    return jsonData;
  } catch (error) {
    if (!name) return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
