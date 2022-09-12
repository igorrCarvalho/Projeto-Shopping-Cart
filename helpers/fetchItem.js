const getIdUrl = (id) => `https://api.mercadolibre.com/items/${id}`;

const fetchItem = async (id) => {
  try {
    const idUrl = getIdUrl(id);
    const resp = await fetch(idUrl);
    const objData = await resp.json();
    return objData;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
