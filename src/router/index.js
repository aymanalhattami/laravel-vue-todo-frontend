import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.js";

const router = createRouter({
    routes,
    history: createWebHistory()
});

router.beforeEach((to, from) => {
    if(to.meta.auth){
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        };
    }
});

export default router;