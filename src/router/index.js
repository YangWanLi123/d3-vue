import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/index' }, //默认跳转路由
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index.vue'),
  },
  {
    path: '/svg',
    name: 'SVGIndex',
    component: () => import('@/views/svg/SVGIndex.vue'),
  }
];

const router = new VueRouter({
  routes,
});
export default router;