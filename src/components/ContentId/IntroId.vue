<template>
  <Transition name="content-id__intro" mode="out-in">
    <div class="content-id__intro" v-if="content && !videoShow">
      <button class="content-id__close" @click="goBack">
        <font-awesome-icon icon="times" />
      </button>
      <div class="content-id__pay" v-if="isPay">
        <div class="content-id__alert" v-show="alertMassege">
          {{ alertMassege }}
        </div>

        <div class="content-id__alert" v-show="showCinema">
          {{ showCinema }}
        </div>
        <div class="content-id__pay-box">
          <h2 class="content-id__pay-box-title">
            You need to pay 20,000 sum to watch this movie
          </h2>
          <div class="content-id__pay-box-btns">
            <button class="content-id__pay-box-btns_btn" @click="togglePays">
              Cancel
            </button>

            <button
              class="content-id__pay-box-btns_btn"
              @click="payNow"
              v-show="!showCinema"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>

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
              }}
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
            <watch-btn :type="type" :id="content.id" @click="togglePay" />

            <trailer-btn
              v-if="video"
              @click="toggleTrailer"
              :type="type"
              :id="content.id"
            />
            <div style="display: flex; column-gap: 10px">
              <button
                @click="toggleFavorite"
                v-if="!isHistoryOrFavorite"
                class="bookmark"
              >
                <font-awesome-icon
                  :icon="[isFavorite ? 'fas' : 'far', 'bookmark']"
                  :class="{ rotated: isFavorite }"
                  class="bookmark__item"
                />
              </button>

              <button
                @click="toggleHistory"
                v-if="!isHistoryOrFavorite"
                class="bookmark"
              >
                <font-awesome-icon
                  :icon="['fas', isInHistory ? 'eye-slash' : 'eye']"
                  :class="{ rotated: isInHistory }"
                  class="bookmark__item"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="content-id__intro-right">
          <img
            :src="imgUrl + content.poster_path"
            alt=""
            class="content-id__intro-poster"
          />
        </div>
      </div>
    </div>

    <div class="content-id__intro" v-else-if="videoShow">
      <iframe
        v-if="showTrailer && video"
        :src="`https://www.youtube.com/embed/${video.key}?rel=0&controls=1&autoplay=1&modestbranding=0&fs=0&showinfo=0&cc_load_policy=1`"
        title="Трейлер"
        frameborder="0"
        allow="autoplay"
        allowfullscreen
      ></iframe>
      <video
        v-else-if="videosWatch"
        class="content-id__intro-video"
        controls
        :key="
          videosWatch.find((vid) => vid.id === parseInt(route.params.id)).id
        "
      >
        <source
          :src="
            videosWatch.find((vid) => vid.id === parseInt(route.params.id))
              .video
          "
          type="video/mp4"
        />
      </video>

      <button
        class="content-id__close content-id__video-close"
        @click="closeVideo"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUpdated, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useFavoriteStore } from "@/stores/favorite";
import { useHistoryStore } from "@/stores/history";
import { usePayStore } from "@/stores/pay";
import { imgUrlFull, imgUrl } from "../../static";

const showTrailer = ref(false);

const toggleTrailer = () => {
  showTrailer.value = true;
  videoShow.value = true;
};

const payStore = usePayStore();
const favoriteStore = useFavoriteStore();
const historyStore = useHistoryStore();
const route = useRoute();
const router = useRouter();

const props = defineProps({
  type: String,
  content: Object,
  video: Object,
  movieId: String,
});

const isPay = ref(false);
const videoShow = ref(false);
const cashPay = ref(0);

const videosWatch = computed(() => [
  {
    id: 1126166,
    video: new URL(`../../assets/videos/1.mp4`, import.meta.url).href,
    title: props.content.title,
  },
  {
    id: 1084199,
    video: new URL(`../../assets/videos/2.mp4`, import.meta.url).href,
    title: props.content.title,
  },
  {
    id: 516729,
    video: new URL(`../../assets/videos/3.mp4`, import.meta.url).href,
    title: props.content.title,
  },
  {
    id: 774370,
    video: new URL(`../../assets/videos/4.mp4`, import.meta.url).href,
    title: props.content.title,
  },
  {
    id: 710295,
    video: new URL(`../../assets/videos/5.mp4`, import.meta.url).href,
    title: props.content.title,
  },
]);

onMounted(() => {
  const storedCash = sessionStorage.getItem("cashPay");
  cashPay.value = storedCash ? parseInt(storedCash, 10) : 0;
});

const isPaid = computed(() =>
  props.content ? payStore.isPaid(props.content.id) : false
);

const togglePay = () => {
  if (!isPaid.value) {
    isPay.value = true;
  } else {
    videoShow.value = true;
  }
};

const alertMassege = ref("");
const showCinema = ref("");

if (!videosWatch.value.some((video) => video.id === props.content.id)) {
  showCinema.value = "Movies currently being shown in the cinema";
}

const payNow = () => {
  if (props.content && !isPaid.value) {
    if (cashPay.value >= 20000) {
      cashPay.value -= 20000;
      sessionStorage.setItem("cashPay", cashPay.value.toString());
      payStore.payForMovie(props.content);
      isPay.value = false;
      videoShow.value = true;
      alertMassege.value = "";
    } else {
      alertMassege.value = "Insufficient balance. Please add funds.";
    }
  }
};

const togglePays = () => {
  isPay.value = !isPay.value;
  if (!isPay.value) {
    alertMassege.value = "";
  }
};

const isHistoryOrFavorite = computed(() => {
  return route.path.includes("/history") || route.path.includes("/favourites");
});

const isInHistory = computed(() =>
  historyStore.history.some((movie) => movie.id === props.content.id)
);

const isFavorite = computed(() =>
  favoriteStore.favorites.some((movie) => movie.id === props.content.id)
);

const toggleFavorite = () => {
  if (isFavorite.value) {
    favoriteStore.removeFavorite(props.content.id);
  } else {
    favoriteStore.addFavorite(props.content);
  }
};

const goBack = () => {
  router.go(-1);
};

// ✅ Переключаем историю просмотров
const toggleHistory = () => {
  if (isInHistory.value) {
    historyStore.removeFromHistory(props.content.id);
  } else {
    historyStore.addToHistory(props.content);
  }
};

const closeVideo = () => {
  videoShow.value = false;
  showTrailer.value = false;
};
</script>

  <style lang="scss">
.bookmark {
  width: 50px;
  height: 50px;
  background: #1d1d1d;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.4s linear;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }

  &__item {
    font-size: 16px;

    @media (max-width: 960px) {
      font-size: 14px;
    }
  }

  @media (max-width: 1200px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 960px) {
    width: 35px;
    height: 35px;
  }
}

.rotated {
  transition: transform 0.2s ease;
}
</style>
