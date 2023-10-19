import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "@/http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);
    const errors = ref({});
    const token = ref(null);

    const isLoggedIn = computed(() => !!user.value);

    const fetchUser = async (token) => {
        try {
            const { data } = await getUser(token);
            user.value = data;
        } catch (error) {
            user.value = null;
        }
    };

    const handleLogin = async (credentials) => {
        await csrfCookie();
        try {
            await login(credentials).then(response => {
                token.value = response.data.token;
            });
            await fetchUser(token.value);
            errors.value = {};
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleRegister = async (newUser) => {
        try {
            await register(newUser);
            await handleLogin({
                email: newUser.email,
                password: newUser.password,
            });
        } catch (error) {
            if (error.response && error.response.status === 422) {
                errors.value = error.response.data.errors;
            }
        }
    };

    const handleLogout = async () => {
        await logout(token.value);
        user.value = null;
    };

    return {
        user,
        errors,
        isLoggedIn,
        token,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout,
    };
});
