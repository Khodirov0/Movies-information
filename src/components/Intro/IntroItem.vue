<template>
  <Transition name="intro__item">
    <div class="intro__item" v-if="idx == slideView">
      <img
        v-lazy="imgUrlFull + content.backdrop_path"
        alt=""
        class="intro__item-bg"
      />

      <div class="intro__item-content">
        <h1 class="intro__item-content-title">
          {{ content.title }}
        </h1>
        <p class="intro__item-content-overview">
          {{ content.overview }}
        </p>
        <more-btn
          type="movie"
          :id="content.id"
            :style="{ backgroundColor: '#149A03', borderRadius: '10px' }"
        />
      </div>
      <div class="intro__item-next" @click="$emit('nextSlide')">
        <img
          v-lazy="imgUrl + nextContent.backdrop_path"
          alt=""
          class="intro__item-next-bg"
        />
        <div class="intro__item-next-info">
          <span class="top">Next</span>
          <span class="bottom">{{ nextContent.title }}</span>
        </div>
        <div class="intro__item-next-line"></div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { imgUrlFull, imgUrl } from "@/static";

const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  nextContent: {
    type: Object,
    required: true,
  },

  idx: Number,
  slideView: Number,
});
</script>

