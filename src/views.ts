import {
  createRouter,
  createWebHashHistory,
  NavigationGuardWithThis,
} from "vue-router";
import Home from "./views/Home.vue";
import RuleList from "./views/RuleList.vue";
import GenerateAssertion from "./views/GenerateAssertion.vue";
import Implementation from "./views/Implementation.vue";
import Start from "./views/Start.vue";
import HowToUse from "./views/HowToUse.vue";
import Export from "./views/Export.vue";
import Error from "./views/Error.vue";
import { useMainStore } from "./stores/useMain";

const hasStarted: NavigationGuardWithThis<undefined> = () => {
  return useMainStore().loaded ? true : "/start";
};

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    const main = document.querySelector("#main");
    if (main instanceof HTMLElement) {
      main.focus();
    }
    return { top: 0 };
  },
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/start",
      component: Start,
      meta: { title: "Start a report" },
    },
    {
      path: "/how-to-use",
      component: HowToUse,
      meta: { title: "How to use" },
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
