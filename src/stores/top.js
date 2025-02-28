import { defineStore } from 'pinia';
import { baseUrl, lang, header_def } from '../static';
import axios from 'axios';

export const useTop = defineStore("top", {
    state: () => ({
        topList: null,
    }),
    actions: {
        async getTop(page = 1, count=10) {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${baseUrl}/movie/top_rated?language=${lang}&page=${page}`,
                    headers: header_def,
                });
                const results = res.data.results;
                const array = [];

                results.forEach((item) => {
                    if (array.length < count) array.push(item)
                });

                this.topList = array;   
            } catch (error) {
                console.error("Error in top.js");
            }
        },
    },
});
