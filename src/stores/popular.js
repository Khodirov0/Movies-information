import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const usePopular = defineStore("popular", {
  state: () => ({
    movie: null,
    tv: null,
  }),
  actions: {
    async getPopular(type='movie', page = 1) {
      try {
        const allResults = [];
        const titlesSet = new Set();
        let currentPage = page;
        let resultsCount = 0;

        while (resultsCount < 20) {
          const res = await axios({
            method: "GET",
            url: `${baseUrl}/${type}/popular?language=${lang}&page=${currentPage}`,
            headers: header_def,
          });

          const filteredResults = res.data.results.filter((item) => {
            const title = type === "movie" ? item.title : item.name;
            const rating = item.vote_average || 0;

            if (!titlesSet.has(title) && rating >= 6.5) {
              titlesSet.add(title);
              return true;
            }
            return false;
          });

          allResults.push(...filteredResults);

          resultsCount = allResults.length;

          currentPage++;
        }

        const limitedResults = allResults.slice(0, 20);

        if (type === "movie") this.movie = limitedResults;
        else this.tv = limitedResults;
      } catch (error) {
        console.error("Error in popular.js", error);
      }
    },
  },
});
