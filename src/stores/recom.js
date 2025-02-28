import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const useRecommendation = defineStore("recommendation", {
  state: () => ({ movie: null, tv: null }),
  actions: {
    async getRecommendation(type, id, page = 1) {
      try {
        const res = await axios({
          method: "GET",
          url: `${baseUrl}/${type}/${id}/recommendations?language=${lang}&page=${page}`,
          headers: header_def,
        });

        const results = res.data.results || [];
        const array = [];

        results.forEach((item) => {
          const rating = item.vote_average || 0;
          if (rating >= 6 && array.length < 4) {
            array.push(item);
          }
        });

        if (type === "movie") {
          this.movie = array;
        } else {
          this.tv = array;
        }

      } catch (error) {
        console.error("Error in useRecommendation:", error);
      }
    },
  },
});
