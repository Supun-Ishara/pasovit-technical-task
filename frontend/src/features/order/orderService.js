import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + '/order';

// Create order
const createOrder = async (orderData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, orderData, config);
  return response.data;
};

// Get user orders
const getUserOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/user`, config);
  return response.data;
};

// Get order by ID
const getOrderById = async (orderId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${orderId}`, config);
  return response.data;
};

const orderService = {
  createOrder,
  getUserOrders,
  getOrderById,
};

export default orderService;