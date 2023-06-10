import axios from 'axios';
const API_URL = process.env.GATEWAY_URL || 'http://localhost:8080/api/v1';
export const API = axios.create({
    baseURL: API_URL,
    timeout: 5000
});
