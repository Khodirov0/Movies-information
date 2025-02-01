import { createApp } from "vue";
import { createPinia } from "pinia";
import VueLazyload from "vue-lazyload";
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import App from "./App.vue";
import router from "./router";

import errorPhoto from "./assets/images/noPhoto.jpg";
import "./assets/scss/main.scss";

import FontAwesomeIcon from "./plugins/fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronRight,
  faPlay,
  faBookmark as solidBookmark,
  faStar,
  faCircleMinus,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import {
  faTelegram,
  faYoutube,
  faInstagram,
  faXTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import MoreBtn from "./components/UI/MoreBtn.vue";
import Actors from "./components/UI/Actors.vue";
import Loader from "./components/UI/Loader.vue";
import Trailer from "./components/UI/Trailer.vue";

// Добавляем иконки в библиотеку Font Awesome
library.add(
  faChevronRight,
  faPlay,
  solidBookmark,
  regularBookmark,
  faStar,
  faCircleMinus,
  faEye,
  faTelegram,
  faYoutube,
  faInstagram,
  faXTwitter,
  faFacebook
);

// Создание приложения
const app = createApp(App);

// Регистрация глобальных компонентов
app.component("actors", Actors);
app.component("more-btn", MoreBtn);
app.component("loader", Loader);
app.component("trailer-btn", Trailer);
app.component("font-awesome-icon", FontAwesomeIcon);

// Подключение плагинов
app.use(createPinia());
app.use(router);
app.use(VueAwesomePaginate);
app.use(VueLazyload, {
  error: errorPhoto,
});

// Монтируем приложение
app.mount("#app");
