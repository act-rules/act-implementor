import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import Generate from './views/Generate.vue';
import GenerateAssertion from './views/GenerateAssertion.vue';
import About from './views/About.vue';
import Export from './views/Export.vue';
import Error from './views/Error.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/export', component: Export },
    { path: '/error', component: Error },
    { path: '/generate', component: Generate },
    { path: '/generate/:ruleId', component: GenerateAssertion },
  ],
})
