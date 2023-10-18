import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.js";
import { useAuthStore } from "@/stores/auth";

// https://bitbucket.org/edomaru/toedoe-list-client/commits/15aac6d57350a83b9a2d55d6fdc0e564dd6bdacc

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach( async (to, from) => {
    const store = useAuthStore();
    await store.fetchUser();

    if(to.meta.auth && !store.isLoggedIn){
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        };
    } else if (to.meta.guest && store.isLoggedIn) {
        return { name: "tasks" };
    }
});

export default router;