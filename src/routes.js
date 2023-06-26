import HomeView from "./Views/HomeView.vue";
import YogaPoseView from "@/Views/YogaPoseView.vue";

const routes = [
    {
        path:"/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: 'Home',
        component: HomeView
    },
    {
        path: "/home/yoga-pose",
        name: 'Pose',
        component: YogaPoseView
    }
];
export default routes;