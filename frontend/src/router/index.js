import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/school/:schoolid/',
    name: 'School',
    component: () => import(/* webpackChunkName: "about" */ '../views/School.vue'),
  },
  {
    path: '/school/:schoolid/viewpost/:postid',
    name: 'School Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewPost.vue'),
  },
  {
    path: '/viewpost/:postid',
    name: 'View Post',
    component: () => import(/* webpackChunkName: "about" */ '../views/ViewPost.vue'),
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
