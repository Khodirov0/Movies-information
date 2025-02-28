<template>
  <section class="content-id" v-if="contentId">
    <div class="content-id__box">
      <Intro :type="type" :content="contentId" :video="videoId" :movieId="route.params.id" />
      <Budget v-if="contentId" :content="contentId" />
      <Recom v-if="recommendation && recomId" :type="type" :recomId="recomId" />
    </div>
  </section>
  <loader v-else />
</template>

<script setup>
import { useDetails } from "../../stores/details";
import { useVideos } from "../../stores/videos";
import { useRecommendation } from "../../stores/recom";
import { useRoute, useRouter } from "vue-router";
import { onMounted, computed, onBeforeUnmount, ref } from "vue";
import Intro from "./IntroId.vue";
import Budget from "./BudgetId.vue";
import Recom from "./RecomId.vue";

const props = defineProps({ type: String });
const type = ref(props.type);
const details = useDetails();
const videos = useVideos();
const recommendation = useRecommendation();
const route = useRoute();
const router = useRouter();

const contentId = computed(() => (type.value === "movie" ? details.movieId : details.tvId));
const videoId = computed(() => (type.value === "movie" ? videos.movie : videos.tv));
const recomId = computed(() => (type.value === "movie" ? recommendation.movie : recommendation.tv));

onMounted(async () => {
  await details.getDetails(type.value, route.params.id);
  await videos.getVideos(type.value, route.params.id);
  await recommendation.getRecommendation(type.value, route.params.id);
});

onBeforeUnmount(() => {
  if (type.value === "movie") {
    details.movieId = null;
    videos.movie = null;
    recommendation.movie = null;
  } else {
    details.tvId = null;
    videos.tv = null;
    recommendation.tv = null;
  }
});
</script>
