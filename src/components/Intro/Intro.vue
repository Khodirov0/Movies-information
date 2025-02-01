<template>
  <Transition name="intro" mode="out-in">
    <section class="intro" v-if="upcomingArray.length > 0">
      <IntroItem
        v-for="(content, idx) in upcomingArray"
        :key="content.id"
        :content="content"
        :idx="idx"
        :slideView="slideView"
        :nextContent="
          upcomingArray[idx + 1 == upcomingArray.length ? 0 : idx + 1]
        "
        @nextSlide="nextSlide"
      />
    </section>
    <loader v-else />
  </Transition>
</template>

<script setup>
import IntroItem from "./IntroItem.vue";
import { useUpcoming } from "@/stores/upcoming";
import { onMounted, onUnmounted, computed, ref } from "vue";

const upcoming = useUpcoming();
const upcomingArray = computed(() => upcoming.upcomingArray);

let slideView = ref(0);
let timeOut = ref(null);

const slide = () => {
  // Переключение слайдов
  if (slideView.value >= upcomingArray.value.length - 1) {
    slideView.value = 0;
  } else {
    slideView.value++;
  }

  // Перезапуск таймера
  resetTimeout();
};

const resetTimeout = () => {
  if (timeOut.value) clearTimeout(timeOut.value);
  timeOut.value = setTimeout(slide, 10000);
};

const nextSlide = () => {
  resetTimeout(); // Очищаем старый таймер и запускаем `slide`
  slide();
};

onMounted(() => {
  resetTimeout(); // Запуск начального таймера
  upcoming.getUpcoming();
});

onUnmounted(() => {
  // Очищение таймера при размонтировании компонента
  if (timeOut.value) clearTimeout(timeOut.value);
});
</script>

