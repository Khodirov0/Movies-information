import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('user')) || null, 
  }),
  actions: {
    logOut() {
      this.user = null;
      sessionStorage.removeItem('user');
    },
    setUser(user) {
      this.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
  },
});
