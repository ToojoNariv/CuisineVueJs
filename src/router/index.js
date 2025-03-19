import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Login', component: () => import('../components/modals/Login.vue') },
  { path: '/menu_admin', name: 'Home', component: () => import('../components/pages/Home.vue') }
  // { path: '/details', name: 'Details', component: () => import('../components/pages/Details.vue') },
  // { path: '/simpleform', name: 'simpleform', component: () => import('../components/pages/simpleform.vue') },
  // { path: '/multipleform', name: 'multipleform', component: () => import('../components/pages/multipleform.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
