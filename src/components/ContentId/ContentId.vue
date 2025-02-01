<template>
  <section class="content-id" v-if="contentId">
   
    <div class="content-id__box">
      <Intro :type="type" :content="contentId" :video="videoId" />
      <Budget v-if="contentId" :content="contentId" />

      <Recom v-if="recommendation && recomId"  :type="type" :recomId="recomId" />

    </div>
  </section>
  <loader v-else />
</template>

<script setup>
import { useDetails } from "../../stores/details";
import { useVideos } from "../../stores/videos";
import { useRecommendation } from "../../stores/recom";
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed, onBeforeUnmount } from "vue";
import Intro from "./IntroId.vue";
import Budget from "./BudgetId.vue";
import Recom from "./RecomId.vue";

// const contentFull = ContentItem();
const props = defineProps(["type"]);
const details = useDetails();
const videos = useVideos();
const recommendation = useRecommendation();
const route = useRoute();
const router = useRouter();
const contentId = computed(() =>
  props.type == "movie" ? details.movieId : details.tvId
);
const videoId = computed(() =>
  props.type == "movie" ? videos.movie : videos.tv
);

const recomId = computed(() => {
  return props.type == "movie" ? recommendation.movie : recommendation.tv;
});




onMounted(() => {
  setTimeout(async () => {
    await details.getDetails(props.type, route.params.id);
    await videos.getVideos(props.type, route.params.id);
    await recommendation.getRecommendation(props.type, route.params.id );
   
  }, 500);
});


onBeforeUnmount(() => {
  props.type == "movie" ? (details.movieId = null) : (details.tvId = null);
  props.type == "movie" ? (videos.movie = null) : (videos.tv = null);
  props.type == "movie"
    ? (recommendation.movie = null)
    : (recommendation.tv = null);
});
</script>
