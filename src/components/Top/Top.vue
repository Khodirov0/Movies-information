<template>
  <section class="top">
    <div class="top__content">
      <h2 class="top__content-title">Top <span>10</span></h2>

      <swiper
        :modules="modules"
        :navigation="true"
        :spaceBetween="25"
        :breakpoints="swiperOptions.breakpoints"
      >
        <swiper-slide v-for="(item, idx) in topList" :key="item.id">
          <router-link class="top__item" :to="`/movie/${item.id}`">
            <div class="top__item-text">
              <p class="top__item-number">{{ idx + 1 }}</p>
            </div>
            <img v-lazy="imgUrl + item.poster_path" alt="" />
          </router-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useTop } from "../../stores/top";
import { imgUrl } from "@/static";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/scss";
import "swiper/scss/navigation";
import { Navigation } from "swiper/modules";
const modules = [Navigation];

const topStore = useTop();
const topList = computed(() => topStore.topList);

const swiperOptions = ref({
  breakpoints: {
    576: { slidesPerView: 1 },
    720: { slidesPerView: 2 },
    1200: { slidesPerView: 3 },
    1400: { slidesPerView: 3 },
  },
});
onMounted(() => {
  topStore.getTop();
});
</script>

