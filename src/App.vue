<template>
  <div class="wrapper">
    <Navbar v-if="!isHiddenRoute && route.path !== '/'" />

    <router-view />

    <Footer v-if="!isHiddenRoute && !hiddenFooter.includes(route.name) && route.path !== '/'" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "./components/Navbar/Navbar.vue";
import Footer from "./components/Footer/Footer.vue";

const route = useRoute();

// Список маршрутов, где Navbar скрыт
const hiddenRoutes = [/^\/movie\/\d+$/, /^\/tv\/\d+$/];

// Проверка, нужно ли скрыть Navbar
const isHiddenRoute = computed(() =>
  hiddenRoutes.some((pattern) => pattern.test(route.path))
);

// Список маршрутов, где Footer скрыт
const hiddenFooter = ["favourites", "history", "pay"];
</script>
