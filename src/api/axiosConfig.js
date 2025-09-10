import axios from 'axios';

// Teraz voláme len relatívnu URL, proxy sa postará o presmerovanie
const api = axios.create({
  baseURL: '/api', // Netlify presmeruje na Render backend
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default api;
