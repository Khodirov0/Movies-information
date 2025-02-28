import { defineStore } from "pinia";
import { ref } from "vue";

export const usePayStore = defineStore("pay", () => {
  const paidMovies = ref([]);

  const payForMovie = (movie) => {
    if (!paidMovies.value.some((m) => m.id === movie.id)) {
      paidMovies.value.push(movie);
    }
  };

  const isPaid = (movieId) => {
    return paidMovies.value.some((m) => m.id === movieId);
  };

  return { paidMovies, payForMovie, isPaid };
});
