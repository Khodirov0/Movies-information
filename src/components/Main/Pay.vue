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
            v-for="content in payStore.paidMovies"
            :key="content.id"
            :content="content"
            :type="type"
            :vote_average="content.vote_average"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ContentItems from "../UI/ContentItems.vue";
import { usePayStore } from "@/stores/pay";

const payStore = usePayStore();

defineProps({
  type: String,
});
</script>

<style>
.pay-btn {
  background: #ff9800;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
}
</style>
