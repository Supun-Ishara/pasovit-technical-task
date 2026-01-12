import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/product';

// Get all products
const getProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await axios.get(`${API_URL}?${queryString}`);
  return response.data;
};

// Get single product
const getProduct = async (productId) => {
  const response = await axios.get(`${API_URL}/${productId}`);
  return response.data;
};

const productService = {
  getProducts,
  getProduct,
};

export default productService;