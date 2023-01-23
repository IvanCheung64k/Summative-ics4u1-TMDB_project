<template>
    <div id="movieInfoContainer" ref="movieInfoContainer">
        <div id="movieBackground" ref="movieBackground"></div>
        <img :src="moviePath" id="moviePoster" />
        <h1 id="movieTitle">{{ title }} </h1>
        <h3 id="movieDate">{{ releaseDate }}</h3>
        <p id="movieOverview">{{ overview }}</p>
        <input type="button" :value="props.buttonValue" id="purchaseButton" @click="addToArray()"
            ref="purchaseButton" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from "../router";
import { indexStore } from "../store/index.js"

import ShoppingAreaVue from '../views/ShoppingArea.vue';
import { storeToRefs } from 'pinia';

const index = indexStore();

const { movieItems } = storeToRefs(index);

const props = defineProps({
    id: String,
    buttonValue: String
});

const movieBackground = ref();

const moviePath = ref("");
const title = ref("");
const releaseDate = ref("");
const price = ref(0);
const overview = ref("");

const movieInfoContainer = ref();
const purchaseButton = ref();

let search = axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
        api_key: "2a61abe7fe3315e1fd9e70c6d769dc56",
        append_to_response: "videos",
        include_adult: false,
    }
})

let searchResult = search.then((movieData) => {
    movieBackground.value.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movieData.data.backdrop_path})`;

    moviePath.value = `https://image.tmdb.org/t/p/w500/${movieData.data.poster_path}`;
    title.value = movieData.data.title;
    releaseDate.value = movieData.data.release_date;
    overview.value = movieData.data.overview;

    price.value = movieData.data.vote_average;
    price.value = price.value.toFixed(2);
})

function addToArray() {
    for (let i = 0; i <= movieItems.value.length; i++) {
        if (movieItems.value[i] === props.id) {
            index.removeMovieItem(i);
            purchaseButton.value.value = "PURCHASE";
            return;
        }

        else {

        }
    }

    index.addMovieItem(props.id);
    purchaseButton.value.value = "REMOVE"
}
</script>

<style>
#movieInfoContainer {
    position: fixed;

    background-color: transparent;

    padding-left: 15px;
    padding-top: 30px;
    padding-right: 50px;
    padding-bottom: 30px;

    height: 400px;
    width: 800px;

    display: block;

    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;
    border-width: 5%;

}

#movieBackground {
    position: fixed;

    width: 100%;
    height: 100%;

    margin-top: -30px;
    margin-left: -15px;

    z-index: -1000;

    filter: brightness(10%);

    background-image: url() no-repeat center;
    background-size: cover;

    background-color: black;

}

#moviePoster {
    height: 300px;
    width: 215px;

    position: absolute;

    margin-right: 25px;
}

#movieTitle {
    left: 30px;

    margin-left: 275px;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    color: white;
}


#movieTitle {
    left: 30px;

    margin-left: 275px;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;

    color: white;
}


#movieDate {
    left: 30px;

    margin-left: 275px;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    color: white;
}

#movieOverview {
    left: 30px;

    margin-left: 275px;

    height: 165px;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    line-height: 20px;
    word-spacing: 3px;

    color: white;

    background-size: cover;

    overflow-y: scroll;
}

#movieOverview::-webkit-scrollbar {
    display: none;
}

#purchaseButton {
    position: absolute;

    bottom: 17%;
    left: 4.2%;

    outline: transparent;
    border-color: transparent;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    background-color: black;
    color: white;

    height: 25px;
    width: 215px;

    letter-spacing: 2px;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;
}
</style>