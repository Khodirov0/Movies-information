import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Movies-information/", // Убедитесь, что это имя вашего репозитория
  plugins: [vue(), vueDevTools()], // Удален vueDevTools()
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use './src/assets/scss/common/common.scss' as *;`,
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Убраны кавычки
  },
});
