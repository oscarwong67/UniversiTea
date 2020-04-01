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
    path: '/school/:schoolid/search/:searchkeys',
    name: 'School Search',
    component: () => import(/* webpackChunkName: "school" */ '../views/SearchResults.vue'),
  },
  {
    path: '/search/:searchkeys',
    name: 'General Search',
    component: () => import(/* webpackChunkName: "school" */ '../views/SearchResults.vue'),
  },
  {
    path: '/school/:schoolid/', // feed for a specific school
    name: 'School',
    component: () => import(/* webpackChunkName: "school" */ '../views/School.vue'),
  },
  {
    path: '/viewpost/:postid',
    name: 'View Post',
    component: () => import(/* webpackChunkName: "viewPost" */ '../views/ViewPost.vue'),
  },
  {
    path: '/administration',
    name: 'Administration',
    component: () => import(/* webpackChunkname: "administration" */ '../views/Administration.vue'),
  },
  {
    path: '*',
    name: 'Not Found',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/NotFound.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
