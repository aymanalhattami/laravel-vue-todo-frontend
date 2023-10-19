import api from "./api";

export const csrfCookie = () => api.get("/sanctum/csrf-cookie");

export const login = (credentials) => api.post("/api/auth/login", credentials);

export const register = (user) => api.post("/api/auth/register", user);

export const logout = (token) => {
    return api.post("api/auth/logout", {}, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
};

export const getUser = (token) => {
    return api.get("/api/user", {
        headers: {
            "Authorization": "Bearer " + token
        }
    });
};