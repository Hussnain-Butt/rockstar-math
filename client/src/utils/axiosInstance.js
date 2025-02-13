import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://rockstar-math-production.up.railway.app/api', // Update with your backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
