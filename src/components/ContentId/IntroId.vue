<template>
  <Transition name="content-id__intro" mode="out-in">
    <div class="content-id__intro" v-if="content && !videoShow">
      <button class="content-id__close" @click="goBack">
        <font-awesome-icon icon="times" />
      </button>
      <img
        :src="imgUrlFull + content.backdrop_path"
        alt=""
        class="content-id__intro-bg"
      />
      <div class="content-id__intro-block">
        <div class="content-id__intro-left">
          <h2 class="content-id__intro-left-title">
            {{ content.title || content.name }}
          </h2>
          <p class="content-id__intro-left-overview">{{ content.overview }}</p>
          <p class="content-id__intro-left-data">
            <span style="margin-right: 15px; font-weight: 700">
              {{ content.vote_average.toFixed(1) }}
            </span>
            <span>
              {{
                new Date(
                  content.first_air_date || content.release_date
                ).getFullYear()
              }},
            </span>
            <span
              v-for="(genre, idx) in content.genres.slice(0, 3)"
              :key="genre.id"
            >
              {{ genre.name }}
              <span v-if="idx < content.genres.slice(0, 3).length - 1">, </span>
            </span>
            <span class="runtime">
              {{ content.runtime ? runtime : "" }}
            </span>
          </p>
          <div class="content-id__intro-buttons">
            <trailer-btn
              v-if="video"
              @click="videoShow = true"
              :type="type"
              :id="content.id"
            />
          </div>
        </div>
        <div class="content-id__intro-right">
          <img
            :src="imgUrl + content.poster_path"
            alt=""
            class="content-id__intro-poster"
          />
        </div>
        <div class="content-id__intro-actors">
          <h2 class="content-id__intro-actors-title">Starring</h2>
          <div class="content-id__intro-actors-cast">
            <actors :type="type" :id="content.id" :count="6" />
          </div>
        </div>
      </div>
    </div>
    <div class="content-id__intro" v-else-if="videoShow">

      <iframe
        v-if="video"
        :src="`https://www.youtube.com/embed/${video.key}?rel=0&controls=1&autoplay=1`"
        title="Видео"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe>

    <button class="content-id__close content-id__video-close" @click="goBack">
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { imgUrlFull, imgUrl } from "../../static";
import { computed } from "vue";

const router = useRouter();
const props = defineProps(["type", "content", "video"]);

const runtime = computed(() => {
  let min = props.content.runtime % 60;
  let hour = Math.floor(props.content.runtime / 60);

  return hour ? `${hour}ч ${min}м` : ` ${min}м`;
});

const goBack = () => {
  router.go(-1);
  // Возвращает на предыдущую страницу
};

let videoShow = ref(false);
</script>

