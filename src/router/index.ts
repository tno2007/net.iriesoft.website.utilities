import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Tools from "../views/Tools.vue";
import TimeConverter from "../components/TimeConverter.vue";
import Formulate from "../components/Formulate.vue";
import Formulate2 from "../components/Formulate2.vue";
import BsVue from "../components/BsVue.vue";
import Dependants from "../components/Dependants.vue";
import Upload from "../components/Upload.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/tools",
    name: "tools",
    component: Tools,
    children: [
      {
        path: "time-converter",
        name: "time-converter",
        component: TimeConverter,
      },
      {
        path: "formulate",
        name: "formulate",
        component: Formulate,
      },
      {
        path: "formulate2",
        name: "formulate2",
        component: Formulate2,
      },
      {
        path: "bsvue",
        name: "bsvue",
        component: BsVue,
      },
      {
        path: "dependants",
        name: "dependants",
        component: Dependants,
      },
      {
        path: "upload",
        name: "upload",
        component: Upload,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
