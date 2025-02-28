<template>
  <!-- Only show this component if the user is not logged in -->
  <div class="enter" >
    <div class="container">
      <div class="enter_box">
        <h2 class="enter_box-title">{{ title }}</h2>
        <form class="enter_box-form" @submit="login">

          <input type="email" v-model="email" required placeholder="Адрес эл.почты" />
          <input type="password" required minlength="4" maxlength="10" placeholder="Пароль" />

          <p class="enter_error" v-if="confirmPinError">Пароли не совпадают.</p>
          <input
            type="password"
            v-model="confirmPassword"
            v-if="registrPin"
            placeholder="Подтвердите пароль"
          />

          <div class="enter_box-checkbox">
            <div class="enter_box-checkbox-left">
              <input
                class="enter_box-checkbox-left-check"
                type="checkbox"
                id="remember"
                v-model="remember"
              />
              <p class="enter_box-checkbox-left-txt">Запомнить меня</p>
            </div>
            <a href="#" class="enter_box-checkbox-forgot">Забыли пароль?</a>
          </div>

          <router-link
            to="/home"
            class="enter_box-form-btn"
            v-if="!formValid && email && password"
            @click="login"
          >
            {{ title }}
          </router-link>

          <button class="enter_box-form-btn" v-else>
            {{ title }}
          </button>
        </form>

        <div class="enter_box-register">
          <p>{{ needAccount }}</p>
          <button class="enter_box-form-register" @click="toggleAuth">
            {{ title === "Войти" ? "Регистрация" : "Войти" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from "vue-router";
const router = useRouter();
const authStore = useAuthStore(); 

const title = ref("Войти");
const needAccount = ref("нужен аккаунт");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const remember = ref(false);

const registrPin = computed(() => title.value === "Регистрация");

// const emailError = computed(() => email.value && !email.value.includes("@"));
const pinError = computed(() => password.value && password.value.length < 4);
const confirmPinError = computed(
  () => registrPin.value && confirmPassword.value !== password.value
);

const formValid = computed(() => {
  if (pinError)
  return !email.value || !password.value;
});

// Computed property to check if user is logged in
const isLoggedIn = computed(() => !!authStore.user); // User is logged in if there is a user object

const login = () => {
  const user = {
    email: email.value,
    password: password.value,
    remember: remember.value,
  };

  authStore.setUser(user); // Set user in the store

  // Redirect to /admin after successful login
  if (authStore.user) {
    router.push('/home');
  }
};

const toggleAuth = () => {
  title.value = title.value === "Войти" ? "Регистрация" : "Войти";
  needAccount.value =
    title.value === "Войти" ? "нужен аккаунт" : "Уже есть аккаунт?";
};
</script>
