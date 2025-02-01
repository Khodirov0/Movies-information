<template>
  <div class="wrapper">
    <Navbar />

    <router-view />
    
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "./components/Navbar/Navbar.vue";
import Footer from "./components/Footer/Footer.vue";
</script>

