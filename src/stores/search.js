import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const useSearch = defineStore("search", {
  state: () => ({
    searchArray: [],
    adult: false,
    totalResults: 0,
    totalPages: 0,
  }),
  actions: {
    async getSearch(search = "", page = 1) {
      if (search !== "") {
        try {
          const res = await axios({
            method: "GET",
            url: `${baseUrl}/search/multi?query=${search}&include_adult=${this.adult}&language=${lang}&page=${page}`,
            headers: header_def,
          });

          // Filter out results without a poster path or without a Russian name
          const filteredResults = res.data.results.filter(
            item => item.poster_path && (item.original_language === "en" || item.name || item.title) && item.vote_average >= 5
          );

          // Sort by rating (descending order)
          this.searchArray = filteredResults.sort((a, b) => (b.vote_average   || 0) - (a.vote_average  || 0));

          this.totalPages = res.data.total_pages;
          this.totalResults = res.data.total_results;
        } catch (error) {
          console.error("Error in search.js: ", error);
        }
      } else {
        this.searchArray = [];
        this.totalPages = 0;
        this.totalResults = 0;
      }
    },
  },
});