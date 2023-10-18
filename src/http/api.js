import axios from "axios";

// console.log('import.meta.');
// console.log(import.meta);

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
    // baseURL: 'http://laravel-todo-api.test/api/v1'
});

export default api;