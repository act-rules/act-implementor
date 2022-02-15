import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./views/Home.vue";
import Generate from "./views/Generate.vue";
import GenerateAssertion from "./views/GenerateAssertion.vue";
import About from "./views/About.vue";
import Start from "./views/Start.vue";
import Export from "./views/Export.vue";
import Error from "./views/Error.vue";

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
      path: "/export",
      component: Export,
      meta: { title: "Export the report" },
    },
    {
      path: "/error",
      component: Error,
      meta: { title: "An error occurred" },
    },
    {
      path: "/generate",
      component: Generate,
      meta: { title: "Implementation overview" },
    },
    {
      path: "/generate/:ruleId",
      component: GenerateAssertion,
      meta: { title: "Update an implementation" },
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
