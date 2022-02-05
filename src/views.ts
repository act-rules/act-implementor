import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from './views/Home.vue';
import Setup from './views/Setup.vue';
import Rules from './views/Rules.vue';
import About from './views/About.vue';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/setup', component: Setup },
    { path: '/rules', component: Rules },
  ],
})
