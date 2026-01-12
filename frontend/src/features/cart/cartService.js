import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/cart';

// Get cart items
const getCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Add to cart
const addToCart = async (cartData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, cartData, config);
  return response.data;
};

// Update cart quantity
const updateCartQuantity = async (cartItemId, quantity, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    `${API_URL}/${cartItemId}`,
    { quantity },
    config
  );
  return response.data;
};

// Remove from cart
const removeFromCart = async (cartItemId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.delete(`${API_URL}/${cartItemId}`, config);
  return cartItemId;
};

// Clear cart
const clearCart = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/clear/all`, config);
  return response.data;
};

const cartService = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};

export default cartService;