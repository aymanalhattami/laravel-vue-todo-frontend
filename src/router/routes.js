import TasksPage from "@/Pages/TasksPage.vue";
import LoginPage from "@/Pages/LoginPage.vue";
import RegisterPage from "@/Pages/RegisterPage.vue";
import SummaryPage from "@/Pages/SummaryPage.vue";
import NotFoundErrorPage from "@/Pages/errors/NotFoundErrorPage.vue";

const routes = [
    {
        path: '/tasks',
        component: TasksPage,
        name: 'tasks'
    },
    {
        path: '/summary',
        component: SummaryPage,
        name: 'summary'
    },
    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register'
    },
    {
        path: '/:notFound(.*)',
        component: NotFoundErrorPage,
        name: 'error.404'
    },
];

export default routes;