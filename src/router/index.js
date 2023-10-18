import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.js";
import { useAuthStore } from "@/stores/auth";


const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    const store = useAuthStore();

    if(to.meta.auth && !store.isLoggedIn){
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        };
    }
});

export default router;