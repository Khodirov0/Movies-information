<template>
  <div class="main">
    <Transition>
      <div class="container">
        <div class="main__list">
          <div class="main__list-box">
            <p class="main__list-box-title">Poster</p>
            <p class="main__list-box-title">Name</p>
            <p class="main__list-box-title">Release Date</p>
            <p class="main__list-box-title">Language</p>
            <p class="main__list-box-title">Rating</p>
            <p class="main__list-box-title">Action</p>
          </div>
          <ContentItems
            v-for="content in favouriteStore.favorites"
            :key="content.id"
            :content="content"
            :vote_average="content.vote_average"
            @return-movie="favouriteStore.removeFromFavourites(content.id)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ContentItems from "../UI/ContentItems.vue";
import { useFavoriteStore } from "../../stores/favorite";

const favouriteStore = useFavoriteStore();

onMounted(() => {
  favouriteStore.fetchFavourites?.();
});
</script>