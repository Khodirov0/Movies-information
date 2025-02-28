<template>
  <router-link class="content-item" :to="`/${type || 'movie'}/${content.id}`">
    <p class="content-item_rating" :style="getRatingClass(vote_average)">
      {{ formatRating(vote_average) }}
    </p>
    <img v-lazy="imgUrlFull + content.poster_path" alt="" />
    <span>{{ content.title || content.name }}</span>
  </router-link>
</template>

<script setup>
import { defineProps } from "vue";
import { imgUrlFull } from "@/static";
const props = defineProps({
  content: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vote_average: {
    type: Number,
    required: true,
  },
});

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
  return vote_average.toFixed(1); // Ensures the format is "x.x"
};
</script>

<style lang="scss" scoped>
.content-item {
  position: relative;
  width: 305px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  justify-content: space-between;

  @media (max-width: 1400px) {
    width: 262px;
    height: 386px;
  }

  @media (max-width: 1200px) {
    width: 200px;
    height: 295px;
  }

  @media (max-width: 960px) {
    width: 145px;
    height: 250px;
  }

  @media (max-width: 720px) {
    width: 200px;
    height: 300px;
  }

  @media (max-width: 576px) {
    width: 155px;
    height: 230px;
  }

  @media (max-width: 450px) {
    width: 150px;
    height: 225px;
  }

  @media (max-width: 380px) {
    width: 140px;
    height: 218px;
  }

  @media (max-width: 320px) {
    width: 115px;
    height: 200px;
  }

  &_rating {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    color: white;
    font-weight: bold;
    text-align: center;
    min-width: 50px;
    z-index: 10;

    @media (max-width: 960px) {
      font-size: 16px;
    }
    @media (max-width: 450px) {
      font-size: 12px;
      min-width: 40px;
    }

    @media (max-width: 320px) {
      font-size: 16px;
      min-width: 50px;
    }
  }

  & img {
    width: 100%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
    border: 1px solid #000000;
    box-shadow: 0px 4px 4px 0px #000000;
    transition: 0.3s linear;
    position: relative;
    z-index: 5;

    &::after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 10;
      background: #333;
    }
  }

  & span {
    max-width: 80%;
    font-family: "Montserrat";
    font-size: 16px;
    font-weight: 500;
    line-height: 1.2;
    color: var(--text-color);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 10px;

    @media (max-width: 720px) {
      font-size: 14px;
    }

    @media (max-width: 450px) {
      font-size: 12px;
    }
  }

  &:hover {
    & img {
      border-color: white;
    }
  }
}
</style>