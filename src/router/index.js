import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/Home.vue'
import notFound from '../views/404.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/movie',
      name: 'movie',
      component: () => import("../views/Movie.vue")
    },
    {
      path: '/movie/:id',
      name: 'movie-id',
      component: () => import("../views/MovieId.vue")
    },
    {
      path: '/search',
      name: 'search',
      component: () => import("../views/Search.vue")
    },
    {
      path: '/tv',
      name: 'tv',
      component: () => import("../views/Tvs.vue")
    },
    {
      path: '/tv/:id',
      name: 'tv-id',
      component: () => import("../views/TvsId.vue")
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: notFound,
    },

  ],

  scrollBehavior() {
    return {
      top: 0,
    };
  }
})

export default router
