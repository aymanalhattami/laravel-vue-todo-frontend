import TasksPage from "@/Pages/TasksPage.vue";
import LoginPage from "@/Pages/LoginPage.vue";
import RegisterPage from "@/Pages/RegisterPage.vue";
import SummaryPage from "@/Pages/SummaryPage.vue";
import NotFoundErrorPage from "@/Pages/errors/NotFoundErrorPage.vue";
import HomePage from "@/Pages/HomePage.vue";

const routes = [
    {
        path: '/',
        component: HomePage,
        name: 'home'
    },
    {
        path: '/tasks',
        component: TasksPage,
        name: 'tasks',
        meta: {
            auth: true
        }
    },
    {
        path: '/summary',
        component: SummaryPage,
        name: 'summary',
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login',
        meta: {
            guest: true,
        },
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register',
        meta: {
            guest: true,
        },
    },
    {
        path: '/:notFound(.*)',
        component: NotFoundErrorPage,
        name: 'error.404'
    },
];

export default routes;