<template>
  <div>
    <Search />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import Search from "../components/Search/Search.vue";
import { useSearch } from "../stores/search";

const searchStore = useSearch();

onMounted(() => {
  searchStore.searchArray = [];
  searchStore.totalPages = [];
  searchStore.totalResults = [];
});
</script>


