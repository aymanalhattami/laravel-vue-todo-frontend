import axios from "axios";

axios.defaults.withCredentials = true;

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
    // baseURL: 'http://laravel-todo-api.test/api/v1'
});

export default api;