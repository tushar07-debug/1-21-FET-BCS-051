import axios from 'axios';
const API_URL = 'http://localhost:5000/api';
export const fetchProducts = (filters, sort, page) => {
  return axios.get(`${API_URL}/products`, {
    params: { ...filters, sort, page }
  });
};
export const fetchProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};
