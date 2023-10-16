import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes.js";

export default createRouter({
    routes,
    history: createWebHistory()
})