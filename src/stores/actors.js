import { defineStore } from 'pinia';
import { baseUrl, lang, header_def } from '../static';
import axios from 'axios';

export const useActors = defineStore("actors", {
    state: () => ({
        actorsMovie: null,
        actorsTv: null,
    }),
    actions: {
        async getActors(type, id, count) {
            try {
                const res = await axios({
                    method: "GET",
                    url: `${baseUrl}/${type}/${id}/credits?language=${lang}`,
                    headers: header_def,
                })


                const cast = res.data.cast;

                const filteredCast = cast.filter(item => item.profile_path);

                const array = filteredCast.slice(0, count);

                if (type === 'movie') {
                    this.actorsMovie = array;
                } else {
                    this.actorsTv = array;
                }
            }
            catch (error) {
                console.error("Erorr in actors.js ");

            }
        }
    }
})