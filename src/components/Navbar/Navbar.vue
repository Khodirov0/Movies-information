<template>
  <header class="header">
    <div
      class="navbar"
      id="headerNav"
      :class="{
        scrollBackground: scrollBg > 50,
        hideNavbar: hideNavbar,
      }"
    >
      <div class="container">
        <router-link class="navbar__logo" to="/">
          <img src="../../assets/images/Nav BAR.svg" alt="" />
        </router-link>

        <button class="navbar__menu" @click="burgerOn">
          <font-awesome-icon icon="bars" />
        </button>

        <ul class="navbar__list" :class="{ active: burger }">
          <button class="navbar__close" @click="burgerOff">
            <font-awesome-icon icon="times" />
          </button>

          <li v-for="link in list" :key="link.id">
            <router-link
              class="navbar__link"
              :to="link.path"
              @click="burgerOff"
            >
              {{ link.title }}
            </router-link>
          </li>

          <li>
            <router-link class="navbar__link" to="/search" @click="burgerOff">
              <font-awesome-icon icon="search" />
            </router-link>
          </li>
          <li>
            <button class="navbar__link navbar__acc" @click="toggleMenu">
              <img :src="userImageUpdate ?? userLogo" alt="User Avatar" />
            </button>
          </li>
        </ul>
      </div>
      <User :isActive="isActive" @close-menu="isActive = false" />
    </div>
  </header>
</template>
  
  <script setup>
import { reactive, ref, onMounted, onUpdated } from "vue";
import User from "../User/User.vue";
import userLogo from "../../assets/images/bg_acc.webp";

let burger = ref(false);
const userImageUpdate = ref(sessionStorage.getItem("profileImage"))
let scrollBg = ref(0);
let prevScroll = ref(0); // Для отслеживания предыдущей прокрутки
let hideNavbar = ref(false); // Статус скрытия navbar

const burgerOn = () => {
  burger.value = true;
  document.body.style.overflow = "hidden";
};

const burgerOff = () => {
  burger.value = false;
  document.body.style.overflow = "visible";
};

const windowScroll = () => {
  scrollBg.value = window.scrollY;

  // Логика скрытия/показа navbar в зависимости от направления прокрутки
  if (scrollBg.value > prevScroll.value) {
    // Прокрутка вниз — скрыть navbar
    hideNavbar.value = true;
  } else {
    // Прокрутка вверх — показать navbar
    hideNavbar.value = false;
  }

  prevScroll.value = scrollBg.value; // Обновляем предыдущую позицию прокрутки
};

const list = reactive([
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Movies", path: "/movie" },
  { id: 3, title: "Series", path: "/tv" },
]);

onMounted(() => {
  window.addEventListener("scroll", windowScroll);
});

const isActive = ref(false);
const toggleMenu = () => {
  isActive.value = !isActive.value;
  if (isActive.value) {
    document.querySelector(".user").classList.add("active");
  }
};

onUpdated(() => {
  if (document.getElementById("fileInput").files.length) {
    userImageUpdate.value = sessionStorage.getItem("profileImage");
  }
});
</script>
  
  <style scoped>
.navbar {
  transition: transform 0.3s ease-in-out;
}

.navbar.hideNavbar {
  transform: translateY(-100%); /* Скрытие navbar при прокрутке вниз */
}
</style>
  