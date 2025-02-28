<template>
  <div class="user" :class="{ active: isActive }">
    <button @click="closeMenu">
      <font-awesome-icon icon="times" class="user__times" />
    </button>

    <div class="user__boxes">
      <div class="user__box">
        <div class="user__names">
          <h3 v-if="!isEditingName" class="user__name">
            {{ UserName }}
          </h3>
          <input
            v-else
            type="text"
            v-model="Name"
            class="user__names-input"
            @blur="saveName"
          />
          <button @click="isEditingName ? saveName() : editName()">
            <font-awesome-icon
              :icon="
                isEditingName ? ['fas', 'check'] : ['fas', 'pen-to-square']
              "
              class="user__name-add"
            />
          </button>
        </div>
        <p class="user__email">{{ Email }}</p>
      </div>
      <div class="user__box-img">
        <label for="fileInput">
          <img
            :src="imagePreview || defaultImage"
            class="user__box-logo"
            alt="Logo"
          />
        </label>
        <input
          type="file"
          id="fileInput"
          @change="handleFileUpload"
          accept="image/*"
          hidden
        />
      </div>
    </div>
    <div class="user__cash">
      <div class="user__cash-box" v-if="!cashWallet">
        <font-awesome-icon :icon="['fas', 'wallet']" class="user__cash-txt" />
        <p class="user__cash-txt">{{ cashPay }}.00 sum</p>
      </div>

      <div class="user__cash-box" v-else>
        <input
          type="text"
          v-model="Pay"
          class="user__cash-input"
          placeholder="Enter balance"
          @input="Pay = Pay.replace(/[^0-9]/g, '')"
        />
        <button @click="saveBalance">
          <font-awesome-icon :icon="['fas', 'check']" class="user__cash-add" />
        </button>
      </div>

      <div class="user__cash-box">
        <p class="user__cash-title">Balance</p>
        <button @click="toggleCashWallet">
          <font-awesome-icon :icon="['fas', 'plus']" class="user__cash-add" />
        </button>
      </div>
    </div>
    <div class="user__line"></div>
    <router-link class="user__admin" to="/home" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'home']" /> Home
    </router-link>
    <router-link to="/movie" class="user__admin" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'film']" />
      <p>Movies</p>
    </router-link>
    <router-link to="/tv" class="user__admin" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'film']" />
      <p>Series</p>
    </router-link>
    <router-link to="/favourites" class="user__admin" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'bookmark']" />
      <p>Favourites</p>
    </router-link>
    <router-link to="/history" class="user__admin" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'eye']" />
      <p>Viewed</p>
    </router-link>
    <router-link to="/pay" class="user__admin" @click="closeMenu">
      <font-awesome-icon :icon="['fas', 'clock-rotate-left']" />
      <p>History</p>
    </router-link>

    <router-link to="/" class="user__admin" @click.prevent="handleLogout">
      <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
      <p>Signout</p>
    </router-link>
  </div>
</template>
  
  <script setup>
import {
  ref,
  defineProps,
  defineEmits,
  computed,
  onMounted,
  watch,
  onUnmounted,
} from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import defaultImg from "../../assets/images/bg_acc.webp";

// Props & Emits
const props = defineProps({ isActive: Boolean });
const emit = defineEmits(["close-menu"]);

// Reactive State
const imagePreview = ref(null);
const defaultImage = ref(defaultImg);
const isEditingName = ref(false);
const Name = ref(sessionStorage.getItem("userName") || "");
const Pay = ref("");
const cashWallet = ref(false);
const authStore = useAuthStore();

// Load stored balance from sessionStorage
const cashPay = ref(Number(sessionStorage.getItem("cashPay")) || 0);

// Load stored imagePreview from sessionStorage
onMounted(() => {
  const storedImage = sessionStorage.getItem("profileImage");
  if (storedImage) {
    imagePreview.value = storedImage;
  }
});

// Computed Username
const UserName = computed(() => (Name.value === "" ? "User1" : Name.value));

// Handle Image Upload
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
      sessionStorage.setItem("profileImage", reader.result);
    };
    reader.readAsDataURL(file);
  }
};

// Edit Username
const editName = () => {
  isEditingName.value = true;
};
const saveName = () => {
  isEditingName.value = false;
  sessionStorage.setItem("userName", Name.value);
};

// Get Email from Session Storage
const user = JSON.parse(sessionStorage.getItem("user") || "{}");
const Email = user.email || "No Email";

// Toggle Cash Wallet
const toggleCashWallet = () => {
  cashWallet.value = !cashWallet.value;
};

// Save Balance and Update Session Storage
const saveBalance = () => {
  if (Pay.value) {
    cashPay.value += Number(Pay.value);
    sessionStorage.setItem("cashPay", cashPay.value);
    Pay.value = "";
  }
  cashWallet.value = false;
};

// Close Menu
const closeMenu = () => {
  emit("close-menu");
};

// Watch isActive and handle scroll close event
const closeMenuOnScroll = () => {
  if (props.isActive) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener("scroll", closeMenuOnScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", closeMenuOnScroll);
});

// Logout
const logOut = () => {
  authStore.logOut();
};

const handleLogout = () => {
  logOut();
  closeMenu();
};
</script>
  