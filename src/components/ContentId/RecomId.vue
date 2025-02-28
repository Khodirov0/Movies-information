<template>
  <div class="content-id__recom" v-if="recomId">
    <div class="container">
      <h2 class="content-id__recom-title">
        {{ recomId.length > 0 ? "Recommended" : "No recommended" }}
      </h2>

      <div class="content-id__recom-list">
        <router-link
          class="content-id__recom-item"
          v-for="item in recomId"
          :key="item.id"
          :to="`/${type}/${item.id}`"
          :vote_average="item.vote_average"
          @click="reloadPage(item.id)"
        >
          <p :style="getRatingClass(item.vote_average)">
            {{ formatRating(item.vote_average) }}
          </p>
          <img v-lazy="imgUrl + item.poster_path" alt="" loading="lazy" />
          <h2>{{ item.title || item.name }}</h2>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { imgUrl } from "@/static";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";

const props = defineProps(["recomId", "type"]);
const route = useRoute();
const router = useRouter();

const getRatingClass = (vote_average) => {
  if (vote_average >= 8)
    return {
      backgroundColor: "#e1c171",
      border: "2px solid white",
      color: "black",
    };
  if (vote_average > 6.9) return { backgroundColor: "green" };
  return { backgroundColor: "grey" };
};

const formatRating = (vote_average) => {
  return vote_average.toFixed(1);
};

// Перезагрузка при смене ID в URL
const reloadPage = (id) => {
  if (route.params.id !== id.toString()) {
    router.push(`/${props.type}/${id}`).then(() => {
      location.reload();
    });
  }
};

// Следит за изменением параметра ID
watch(
  () => route.params.id,
  () => {
    location.reload();
  }
);
</script>
