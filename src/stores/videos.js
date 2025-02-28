import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const useVideos = defineStore("videos", {
  state: () => ({
    movie: null,
    tv: null,
  }),
  actions: {
    async getVideos(type, id) {
      try {
        if (type !== "movie" && type !== "tv") {
          console.error("Invalid type:", type);
          return;
        }

        const res = await axios({
          method: "GET",
          url: `${baseUrl}/${type}/${id}/videos?language=${lang}`,
          headers: header_def,
        });

        const results = res.data.results || [];
        if (results.length === 0) {
          console.warn("No videos found");
          return;
        }

        if (type === "movie") {
          this.movie = results[results.length - 1];
        } else {
          this.tv = results[results.length - 1];
        }
      } catch (error) {
        console.error("Error in videos.js:", error);
      }
    },
  },
});
