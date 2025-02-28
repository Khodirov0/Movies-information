import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const useDetails = defineStore("details", {
  state: () => ({
    movieId: null,
    tvId: null,
  }),
  actions: {
    async getDetails(type, id) {
      try {
        const res = await axios({
          method: "GET",
          url: `${baseUrl}/${type}/${id}?language=${lang}`,
          headers: header_def,
        });
        if (type == "movie") this.movieId = res.data;
        else this.tvId = res.data;
      } catch {
        console.error("Erorr in detail.js ");
      }
    },
  },
});
