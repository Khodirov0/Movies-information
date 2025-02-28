<template>
  <section class="search">
    <div class="container">
      <p v-if="warning" style="color: red" class="search__lang">
        Please use only English language!!!
      </p>
      <div class="search__top">
        <input
          type="text"
          class="search__input"
          :placeholder="placeholder"
          v-model="searchValue"
          @keydown.enter="searchValue.trim()  ? getSearch() : getTopMovies()"
          @input="validateInput"
          
        />

        <button
          class="search__button"
          v-if="searchValue != ''"
          @click="clearSearch"
        >
          <font-awesome-icon icon="times" />
        </button>
      </div>

      <h2 class="search__recommend" v-if="showRecommended">Recommended</h2>

      <div class="content__list">
        <ContentItem
          v-for="content in searchArray"
          :key="content.id"
          :content="content"
          :type="content.media_type || ''"
          :vote_average="content.vote_average"
        />

        <div
          @click="getNextPage"
          class="load-more"
          v-if="searchValue && searchArray.length > 4 && page < totalPages"
        >
          Show More
          <button class="load-more__button">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </div>
      </div>
    </div>
  </section>
  <loader v-if="loading === true" />
</template>

<script setup>
import { onMounted, ref, computed , watch } from "vue";
import { useSearch } from "../../stores/search";
import { usePopular } from "../../stores/popular";
import ContentItem from "../UI/ContentItem.vue";
const props = defineProps({
  type: {
    type: String,
    required: false, // Сделать необязательным
    default: "", // Указать значение по умолчанию
  },
});

const searchStore = useSearch();
const popularStore = usePopular();

const placeholder = ref("Find a movie, series...");
const searchArray = ref([]);
const totalPages = computed(() => searchStore.totalPages);
const searchValue = ref("");
const page = ref(1);
const loading = ref(false);
const warning = ref(false);
const showRecommended = ref(false); // Track if getTopMovies() was called

// Ограничиваем отображение до 4 фильмов

const getSearch = async () => {
  if (!loading.value) {
    loading.value = true;
    page.value = 1; // Reset page number when searching
    await searchStore.getSearch(searchValue.value, page.value);
    searchArray.value = [...searchStore.searchArray];
    loading.value = false;
  }
};

const getNextPage = async () => {
  if (!loading.value && page.value < totalPages.value) {
    loading.value = true;
    page.value += 1;
    await searchStore.getSearch(searchValue.value, page.value);
    searchArray.value.push(...searchStore.searchArray);
    loading.value = false;
  }
};

const validateInput = (event) => {
  const regex = /^[A-Za-z\s]*$/; // Разрешаем только английские буквы и пробелы
  if (regex.test(event.target.value)) {
    warning.value = false;
  } else {
    warning.value = true;
    searchValue.value = searchValue.value.replace(/[^A-Za-z\s]/g, ""); // Убираем недопустимые символы
  }
};

// Загружаем топ фильмы при первом входе
const getTopMovies = async () => {
  if (!loading.value) {
    loading.value = true;
    await popularStore.getPopular("movie");
    // Ограничиваем массив до 4 фильмов
    searchArray.value = [...popularStore.movie.slice(0, 4)];
    loading.value = false;
  }
};


// Очищаем поиск и показываем топ фильмы
const clearSearch = () => {
  searchValue.value = "";
  getTopMovies(); // Показываем топ фильмы после очистки
};

onMounted(() => {
  getTopMovies(); // Вызываем метод при монтировании компонента
});

// Watch for changes in searchValue
watch(searchValue, (newValue) => {
  if (newValue.trim() === "") {
    clearSearch();
  }
});

</script>


