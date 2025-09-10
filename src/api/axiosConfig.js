import axios from 'axios';
//Base url from environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL || "https://insuranceapp-backend-latest.onrender.com";

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default api;
