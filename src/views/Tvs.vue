<template>
  <main class="main">
    <Content type="tv" />
  </main>
</template>


<script setup>
import Content from "@/components/Content/Content.vue";
import { onMounted } from "vue";
import { usePopular } from "../stores/popular";

const popularStore = usePopular();

onMounted(() => {
  popularStore.tv = null;
  popularStore.totalResults =0;
});
</script>
