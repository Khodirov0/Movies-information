
import { defineStore } from 'pinia'
import { baseUrl, lang, header_def } from '../static'
import axios from 'axios'

export const useUpcoming = defineStore("upcoming", {
  state: () => ({
    page: 1,
    upcoming: [],
  }),
  actions: {
    async getUpcoming() {
      try {
        const res = await axios({
          method: "GET",
          url: `${baseUrl}/movie/upcoming?language=${lang}&page=${this.page}`,
          headers: header_def,
        });
        res.data.results.forEach(element => {
          if(element.overview){
            this.upcoming.push(element)
          }
        });
      } catch (error) {
        console.log("Error in upcoming.js");

      }

    }
  },
  getters: {
    upcomingArray:(state) =>
      state.upcoming.filter((item) => item.overView != "")
  }
})


