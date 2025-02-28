<template>
  <div class="info-item">
    <button class="info-item__close" @click="$emit('close')">
      <font-awesome-icon icon="times" />
    </button>
    <Transition name="info-item">
      <div class="info-item__block" v-if="current" ref="info">
        <img
          v-lazy="imgUrlFull + current.backdrop_path"
          alt=""
          class="info-item__block-img"
        />
        <div class="info-item__content">
          <h2 class="info-item__content-title">
            {{ current.title || current.name }}
          </h2>
          <p class="info-item__content-overview">{{ current.overview }}</p>
          <p class="info-item__content-data">
            <span style="margin-right:15px; font-weight:700">
              {{ current.vote_average.toFixed(1) }}
            </span>
            <span>
              {{
                new Date(
                  current.first_air_date || current.release_date
                ).getFullYear()
              }},
            </span>
            <span
              v-for="(genre, idx) in current.genres.slice(0, 3)"
              :key="genre.id"
            >
              {{ genre.name }}
              <span v-if="idx < current.genres.slice(0, 3).length - 1">, </span>
            </span>
            <span class="runtime">
              {{ current.runtime ? runtime : "" }}
            </span>
          </p>
          <actors :type="type" :id="current.id" :count="4" />
          <more-btn :type="type" :id="current.id" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { imgUrlFull } from "../../static";
import { computed } from "vue";

const props = defineProps(["current", "type"]);

const runtime = computed(() => {
  let min = props.current.runtime % 60;
  let hour = Math.floor(props.current.runtime / 60);

  return hour ? `${hour}ч ${min}м` : `${min}м`;
});
</script>
