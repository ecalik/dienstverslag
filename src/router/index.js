import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView";
import UsersView from "../views/UsersView";
import WriteReport from "../views/WriteReport";
import OcPunten from "../views/OcPunten";
import SignIn from "../views/SignIn";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      AuthNeeded: true,
    },
  },
  {
    path: "/users",
    name: "users",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: UsersView,
    meta: {
      AuthNeeded: true,
      adminNeeded: true,
    },
  },
  {
    path: "/schrijfverslag",
    name: "writereport",
    component: WriteReport,
    meta: {
      AuthNeeded: true,
      noReadOnly: true,
    },
  },
  {
    path: "/ocpunten",
    name: "ocpunten",
    component: OcPunten,
    meta: {
      AuthNeeded: true,
    },
  },
  {
    path: "/inloggen",
    name: "signin",
    component: SignIn,
    meta: {
      noAuthNeeded: true,
    },
  },
  {
    path: "/:notFound(.*)",
    name: "pageNotFound",
    redirect: "/inloggen",
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  //store.dispatch("userModule/autoLogin");
  if (
    to.meta.AuthNeeded &&
    !store.getters["userModule/getActiveUser"].isLoggedIn
  ) {
    //console.log("auth en notloggedin");
    next("/inloggen");
  } else if (
    to.meta.noAuthNeeded &&
    store.getters["userModule/getActiveUser"].isLoggedIn
  ) {
    //console.log("noAuth en loggedin");
    next("/");
  } else if (
    to.meta.adminNeeded &&
    store.getters["userModule/getActiveUser"].role !== "admin"
  ) {
    //console.log("noAdmin en loggedin");
    //store.dispatch("userModule/getUsers");
    next("/");
  } else if (
    to.meta.noReadOnly &&
    store.getters["userModule/getActiveUser"].role === "readOnly"
  ) {
    //console.log("noAdmin en loggedin");
    //store.dispatch("userModule/getUsers");
    next("/");
  } else {
    //console.log("else");
    next();
  }
});

export default router;
