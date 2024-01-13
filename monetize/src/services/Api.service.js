// apiService.js
import axios from 'axios';

const BASE_URL = 'https://junior-test.mntzdevs.com/api/'; // Replace with your API base URL

const apiService = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the JWT token in the headers
const setAuthToken = (token) => {
  if (token) {
    apiService.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiService.defaults.headers.common['Authorization'];
  }
};

// Function to get the JWT token from local storage
const getAuthToken = () => {
  return localStorage.getItem('token');
};


const api = {
  login: (credentials) => apiService.post('login/', credentials),
  register: (userData) => apiService.post('register/', userData),
  getProductsData: () => {
    // Set the token for this specific request
    const token = getAuthToken();
    setAuthToken(token);

    return apiService.get('products/');
  },
};

export default api;
