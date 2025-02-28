<template>
  <section class="popular" v-if="content">
    <router-link class="popular__title" :to="`${type}`">
      <span>
        {{ type === "movie" ? "Movies" : "Series" }}
      </span>
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </router-link>
    <swiper
      :modules="modules"
      :navigation="true"
      :spaceBetween="25"
      :breakpoints="swiperOptions.breakpoints"
    >
      <swiper-slide
        class="popular__item"
        v-for="item in content"
        :key="item.id"
        @click="getInfo(item.id)"
      >
        <p
          class="popular__item-rating"
          :style="getRatingClass(item.vote_average)"
        >
          {{ formatRating(item.vote_average) }}
        </p>
        <img v-lazy="imgUrl + item.poster_path" alt="" />
        <router-link class="popular__item-link" :to="`/${type}/${item.id}`"></router-link>
      <!-- <span>{{ item.name || item.title }}</span> -->
      </swiper-slide>
      <swiper-slide  class="popular__item">
        <router-link :to="`/${type}`" class="popular__item-txt">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
          <span>
        {{ type === "movie" ? "Movies" : "Series" }}
          </span>
        </router-link>
      </swiper-slide>
    </swiper>
    <div class="info" :class="{ active: InfoOpen }" ref="info">
      <InfoBlock :current="current" :type="type" @close="closeItem" />
    </div>
  </section>
  <loader v-else />
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePopular } from "@/stores/popular";
import { imgUrl } from "@/static";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/scss";
import "swiper/scss/navigation";
import { Navigation } from "swiper/modules";
import InfoBlock from "../InfoBlock/InfoBlock.vue";
import { useDetails } from "@/stores/details";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

const modules = [Navigation];
const swiperOptions = ref({
  breakpoints: {
    320: { slidesPerView: 2 },
    576: { slidesPerView: 3 },
    720: { slidesPerView: 4 },
    1200: { slidesPerView: 5 },
  },
});
const popular = usePopular();
const details = useDetails();
const content = computed(() =>
  props.type === "movie" ? popular.movie : popular.tv
);

let InfoOpen = ref(false);
let current = ref(null);
let info = ref(null);

const getInfo = async (id) => {
  current.value = null;
  await details.getDetails(props.type, id);
  current.value = props.type === "movie" ? details.movieId : details.tvId;
  InfoOpen.value = true;
  let infoTop = info.value.offsetTop;
  window.scrollTo({
    top: infoTop - headerNav.offsetHeight,
    behavior: "smooth",
  });
};

const closeItem = () => {
  InfoOpen.value = false;
  current.value = null;
  props.type == "movie" ? (details.movieId = null) : (details.tvId = null);
};

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
  return vote_average.toFixed(1).slice(0, 3); // Ensure the format is "x.x"
};

onMounted(() => {
  popular.getPopular(props.type);
});
</script>
