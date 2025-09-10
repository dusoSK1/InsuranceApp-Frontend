import axios from 'axios';
//Base url from environment variable or default to localhost
const API_URL = process.env.REACT_APP_API_URL 

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default api;
