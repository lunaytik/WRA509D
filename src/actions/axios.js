import axios from "axios";

const api = axios.create({
    baseURL: 'https://shelly-77-eu.shelly.cloud',
    timeout: 10000,
});

export default api;