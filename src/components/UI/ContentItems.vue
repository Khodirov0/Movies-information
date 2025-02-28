<template>
  <div class="content">
    <div class="content-item">
      <img
        class="content-item__image"
        :src="imgUrl + content.poster_path"
        alt="Movie poster"
      />
      <div class="content-item__details">
        <p class="content-item__title">{{ content.title }}</p>
        <p class="content-item__date">{{ content.release_date }}</p>
        <p class="content-item__language">
          {{ content.original_language?.toUpperCase() || "N/A" }}
        </p>
        <p class="content-item__rating">
          {{ formatRating(content.vote_average) }}
        </p>
        <div class="content-item__btns">
          <p class="content-item__btn" v-if="!isHistoryOrFavorite">Paid</p>

          <button
            @click="
              returnMovie(
                content,
                route.path === '/favourites' ? 'favorite' : ''
              )
            "
            v-if="isHistoryOrFavorite"
          >
            <font-awesome-icon
              :icon="['fas', 'rotate-right']"
              class="content-item__add"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

---

### **JavaScript (Composition API)**
```vue
<script setup>
import { computed } from "vue";
import { usePopular } from "@/stores/populars";
import { useFavoriteStore } from "@/stores/favorite";
import { useHistoryStore } from "@/stores/history";
import { imgUrl } from "@/static";
import { useRoute } from "vue-router";

const route = useRoute();
const popularStore = usePopular();
const favoriteStore = useFavoriteStore();
const historyStore = useHistoryStore();

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    default: "default",
  },
});

const isHistoryOrFavorite = computed(() => {
  return route.path.includes("/history") || route.path.includes("/favourites");
});

function formatRating(vote_average) {
  return vote_average ? vote_average.toFixed(1) : "N/A";
}

const isFavorite = (content) => {
  return favoriteStore.favorites.some((movie) => movie.id === content.id);
};

const toggleFavorite = (content) => {
  if (isFavorite(content)) {
    favoriteStore.favorites = favoriteStore.favorites.filter(
      (movie) => movie.id !== content.id
    );
  } else {
    favoriteStore.addFavorite(content);
  }
};

const addHistory = (content) => {
  historyStore.addHistory(content);
  popularStore.movies = popularStore.movies.filter(
    (movie) => movie.id !== content.id
  );
};

const returnMovie = (content, type) => {
  if (!content || !content.id) {
    console.error("Content or content.id is undefined.");
    return;
  }

  if (type === "favorite") {
    favoriteStore.favorites = favoriteStore.favorites.filter(
      (movie) => movie.id !== content.id
    );
  } else {
    historyStore.history = historyStore.history.filter(
      (movie) => movie.id !== content.id
    );
  }

  if (!popularStore.movies.some((movie) => movie.id === content.id)) {
    popularStore.movies.unshift(content);
  }
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 0px;

  &-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 10px;
    margin: 5px 0;
    color: #e8e8e8;
    border-bottom: 1px solid #2c2d33;

    &__image {
      width: 60px;
      height: 90px;
      object-fit: cover;
      margin-right: 50px;
    }

    &__details {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 0.1fr;
      align-items: center;
      width: 100%;
    }

    &__title {
      font-size: 18px;
      font-weight: bold;
      text-align: left;
    }

    &__date,
    &__language,
    &__rating {
      font-size: 18px;
      text-align: center;
    }

    &__add,
    &__delete {
      color: white;
      font-size: 18px;
      font-weight: bold;
      transition: all 0.3s linear;
      cursor: pointer;

      &:hover {
        color: #10b981;
      }
    }

    &__delete {
      &:hover {
        color: #ef4444;
      }
    }
    &__btn {
      color: #10b981;
      font-weight: 700;
    }
    &__btns {
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 15px;
      padding: 10px;
      background: #2b2b36;
      border-radius: 5px;
    }
  }
}

.rotated {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}
</style>
