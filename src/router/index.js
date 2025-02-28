import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore';
import HomeView from '../views/Home.vue';
import notFound from '../views/404.vue';
import Favourites from '../views/Favourites.vue';
import History from '../views/History.vue';
import Pay from '../views/Pay.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registr',
      component: () => import('@/views/Registr.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },


    {
      path: '/profile',
      name: 'profile',
      component: ()=>import('../views/Profile.vue'),
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites,
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay,
    },
    {
      path: '/history',
      name: 'history',
      component: History,
    },

    {
      path: '/movie',
      name: 'movie',
      component: () => import('../views/Movie.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movie-id',
      component: () => import('../views/MovieId.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
    },
    {
      path: '/tv',
      name: 'tv',
      component: () => import('../views/Tvs.vue'),
    },
    {
      path: '/tv/:id',
      name: 'tv-id',
      component: () => import('../views/TvsId.vue'),
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
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // If the user is logged in and tries to access the login page, redirect them to /admin
  if (to.path === '/' && authStore.user) {
    next('/home');
  } else {
    next();
  }
});

export default router;
