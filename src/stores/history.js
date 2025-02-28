import { defineStore } from "pinia";
import { ref } from "vue";

export const useHistoryStore = defineStore("historyStore", () => {
  const history = ref([]);

  const addToHistory = (movie) => {
    if (!history.value.some((item) => item.id === movie.id)) {
      history.value.push(movie);
    }
  };

  const removeFromHistory = (id) => {
    history.value = history.value.filter((item) => item.id !== id);
  };

  const isInHistory = (id) => {
    return history.value.some((item) => item.id === id);
  };

  return { history, addToHistory, removeFromHistory, isInHistory };
});
