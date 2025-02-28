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
            v-for="content in historyStore.history"
            :key="content.id"
            :content="content"
            :vote_average="content.vote_average"
            @return-movie="historyStore.removeFromHistory(content.id)"
           
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ContentItems from "../UI/ContentItems.vue";
import { useHistoryStore } from "../../stores/history";

const historyStore = useHistoryStore();

onMounted(() => {
  historyStore.fetchHistory?.();
});
</script>
