import { defineStore } from "pinia";
import { baseUrl, lang, header_def } from "../static";
import axios from "axios";

export const usePopular = defineStore("populars", {
  state: () => ({
    movies: [],
    currentPage: 1,
    totalPages: 1,
  }),
  actions: {
    async getPopular() {
      try {
       
        const movieExists = (id) => this.movies.some((movie) => movie.id === id);

        
        const totalMovies = 20;
        const moviesPerPage = 20;
        const pagesToFetch = Math.ceil(totalMovies / moviesPerPage);

        let lastResponse = null;

        for (let i = 1; i <= pagesToFetch; i++) {
          const res = await axios.get(
            `${baseUrl}/movie/popular?language=${lang}&page=${i}`,
            { headers: header_def }
          );

          
          res.data.results.forEach((movie) => {
            if (!movieExists(movie.id)) {
              this.movies.push(movie);
            }
          });

          lastResponse = res;
        }

        if (lastResponse) {
          this.totalPages = lastResponse.data.total_pages;
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    },
  },
}); 