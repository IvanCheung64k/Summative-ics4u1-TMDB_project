import { firestore } from "../firebase/index.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { defineStore } from "pinia";
import axios from "axios";
import { isProxy, toRaw } from "vue";

export const indexStore = defineStore("main", {
  state: () => ({
    movieItems: [],
    previousResultOptions: [],
    resultOptions: [],
    createdDiscoveryList: false,
    currentDisplayPage: 0,
  }),
  getters: {},
  actions: {
    async populateFirestore() {
      const genres = new Map([
        [28, "Action"],
        [35, "Comedy"],
        [14, "Fantasy"],
        [99, "Documentary"],
        [36, "History"],
      ]);

      genres.forEach(async (value, key) => {
        let data = (
          await axios.get("https://api.themoviedb.org/3/discover/movie", {
            params: {
              api_key: "2a61abe7fe3315e1fd9e70c6d769dc56",
              with_genres: key,
              include_adult: false,
            },
          })
        ).data.results;
        data = data.map((movie) => {
          return {
            id: movie.id,
          };
        });
        await setDoc(doc(firestore, "Genre", value), { data });
      });
    },

    async getMovies(genre) {
      this.previousResultOptions = (
        await getDoc(doc(firestore, "Genre", genre))
      ).data().data;

      for (let i = 0; i < this.previousResultOptions.length; i++) {
        this.resultOptions.push(this.previousResultOptions[i]);
      }
    },
    addMovieItem(movieObject) {
      this.movieItems.push(movieObject);
    },

    removeMovieItem(arraySlot) {
      this.movieItems.splice(arraySlot, 1);
    },

    addResultOption(id) {
      this.resultOptions.push({ id });
    },

    finishList() {
      this.createdDiscoveryList = true;
    },

    resetList() {
      this.createdDiscoveryList = false;
    },

    clearResultOption() {
      this.resultOptions.length = 0;
    },
  },
});
