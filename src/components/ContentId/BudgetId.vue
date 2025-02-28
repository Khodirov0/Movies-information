<template>
  <div class="content-id__budget">
    <div class="content-id__budget-items">
      <div class="content-id__budget-item" v-for="item in list" :key="item.id">
        <h2 class="content-id__budget-item-title">{{ item.title }}</h2>
        <p class="content-id__budget-item-text">
          {{ item.text }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const props = defineProps(["content", "type"]);

const budgetFormatted = props.content.budget?.toLocaleString() || "0";
const revenueFormatted = props.content.revenue?.toLocaleString() || "0";
const statusFormatted = props.content?.status || "N/A";
const titleFormatted = props.content.original_title || props.content.original_name;

const list = reactive([
  {
    id: 1,
    title: "Budget",
    text: `$ ${budgetFormatted}`,
  },
  { id: 2, title: "Fees", text: `$ ${revenueFormatted}` },
  { id: 3, title: "Status", text: statusFormatted },
  { id: 4, title: "Original title", text: titleFormatted },
]);
</script>
