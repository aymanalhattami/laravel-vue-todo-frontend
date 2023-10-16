import TasksPage from "@/Pages/TasksPage.vue";
import LoginPage from "@/Pages/LoginPage.vue";
import RegisterPage from "@/Pages/RegisterPage.vue";

const routes = [
    {
        path: '/tasks',
        components: TasksPage,
        name: 'tasks'
    },
    {
        path: '/login',
        components: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        components: RegisterPage,
        name: 'register'
    },
];

export default routes;