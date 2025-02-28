import { defineStore } from "pinia";
import { ref } from "vue";

export const useFavoriteStore = defineStore("favoriteStore", () => {
  const favorites = ref([]);

  const addFavorite = (movie) => {
    if (!favorites.value.some((fav) => fav.id === movie.id)) {
      favorites.value.push(movie);
    }
  };

  const removeFavorite = (id) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== id);
  };

  const isFavorite = (id) => {
    return favorites.value.some((fav) => fav.id === id);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
});
