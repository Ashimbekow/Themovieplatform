import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "../pages/Dashboard.vue";
import FilmEdit from "../pages/FilmEdit.vue";
import FilmDetail from "../pages/FilmDetail.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Dashboard },
  { path: "/add", component: FilmEdit },
  { path: "/edit/:id", component: FilmEdit },
  { path: "/film/:id", component: FilmDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
