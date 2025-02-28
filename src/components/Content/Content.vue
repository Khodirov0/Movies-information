<template>
  <section class="content" >
    <h2 class="content__title">
      {{ type === "movie" ? "All Movies" : "All Series" }}
    </h2>

    <div class="content__list" >
      <ContentItem
        v-for="content in contentArray"
        :key="content.id"
        :content="content"
        :type="type"
        :vote_average="content.vote_average"
      />
      <div @click="getContent" class="load-more" v-if="contentArray.length > 0">
        Show More
        <button class="load-more__button">
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>
      </div>
    </div>
  </section>
  <loader v-if="loading === true" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { usePopular } from "@/stores/popular";
import ContentItem from "@/components/UI/ContentItem.vue";

// Initialize store and props
const popularStore = usePopular();
const props = defineProps(["type"]);

let page = ref(1);
let contentArray = ref([]);
let loading = ref(false);

const totalPages = computed(() => popularStore.totalPages);

// Fetch popular content based on type
const getContent = async () => {
  if (!loading.value) {
    loading.value = true;
    if (page.value === 0) {
      contentArray.value = [];
    }
    page.value += 1;
    await popularStore.getPopular(props.type, page.value);
    const state = props.type === "movie" ? popularStore.movie : popularStore.tv;
    const newContent = state.filter(
      (item) => !contentArray.value.some((existing) => existing.id === item.id)
    );
    contentArray.value.push(...newContent);
    loading.value = false;
  }
};

onMounted(() => {
  getContent();
});
</script>
