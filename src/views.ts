import {
  createRouter,
  createWebHashHistory,
  NavigationGuardWithThis,
} from "vue-router";
import Home from "./views/Home.vue";
import RuleList from "./views/RuleList.vue";
import GenerateAssertion from "./views/GenerateAssertion.vue";
import About from "./views/About.vue";
import Implementation from "./views/Implementation.vue";
import Start from "./views/Start.vue";
import Export from "./views/Export.vue";
import Error from "./views/Error.vue";
import { useMainStore } from "./stores/useMain";

const hasStarted: NavigationGuardWithThis<undefined> = () => {
  return useMainStore().loaded ? true : "/start";
};

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/about",
      component: About,
      meta: { title: "About" },
    },
    {
      path: "/start",
      component: Start,
      meta: { title: "Start a report" },
    },
    {
      path: "/implementation",
      component: Implementation,
      meta: { title: "Implementation info" },
      beforeEnter: hasStarted,
    },
    {
      path: "/rules",
      component: RuleList,
      meta: { title: "Implementation overview" },
      beforeEnter: hasStarted,
    },
    {
      path: "/rules/:ruleId",
      component: GenerateAssertion,
      meta: { title: "Update an implementation" },
      beforeEnter: hasStarted,
    },
    {
      path: "/export",
      component: Export,
      meta: { title: "Export the report" },
      beforeEnter: hasStarted,
    },
    {
      path: "/error",
      component: Error,
      meta: { title: "An error occurred" },
    },
  ],
});

const baseTitle = window.document.title;
router.afterEach((to) => {
  window.document.title = baseTitle;
  if (typeof to.meta?.title === "string") {
    window.document.title += ` - ${to.meta?.title}`;
  }
});
