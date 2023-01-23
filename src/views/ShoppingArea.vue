<template>
    <LoginHeader title="Backlogs" tagline="it's probably not here" button-value="LOGOUT" id="headerToLogin">
    </LoginHeader>
    <div id="movieOptionContainer">
        <MovieOption v-for="options in displayOptions" :id="options.id" class="movieOption"
            @click="showMovieModal(options.id)" :show=true>
        </MovieOption>

    </div>
    <div id="blurBackground" ref="blurBackground" @click="closeModal()"></div>
    <MovieInfoModal :button-value="buttonValue" :id="movieID" class="movieInfoModal" ref="movieInfoModal"
        v-if="showModal"></MovieInfoModal>
    <input type="button" value="X" id="closeButton" @click="closeModal()" ref="closeButton">
    <div id="backgroundImage"></div>
    <img src="../assets/ShoppingBagIcon.png" id="shoppingBagIcon" @click="moveToCheckout()" />
    <h2 id="shoppingBagText" @click="moveToCheckout()">{{ itemLength }}</h2>
    <select id="genreSelect" @change="getGenres()" ref="selector">
        <option value="Action">Action</option>
        <option value="Comedy">Comedy</option>
        <option value="Fantasy">Fantasy</option>
        <option value="Documentary">Documentary</option>
        <option value="History">History</option>
    </select>
</template>

<script setup>
import axios from 'axios';
import MovieOption from '../components/MovieOption.vue';
import MovieInfoModal from '../components/MovieInfoModal.vue';

import { ref, watch } from 'vue';
import LoginHeader from '../components/LoginHeader.vue';

import { indexStore } from "../store/index.js"
import { storeToRefs } from 'pinia';

import router from "../router";

const index = indexStore();

const { movieItems } = storeToRefs(index);
const { resultOptions } = storeToRefs(index);
const { searchOptions } = storeToRefs(index);
const { createdDiscoveryList } = storeToRefs(index);

const itemLength = ref();
let isMovieMade = createdDiscoveryList.value;

let displayOptions = ref();

watch(() => {
    itemLength.value = movieItems.value.length
    displayOptions = ref(resultOptions.value);
})

let showModal = ref(false);
let showError = ref(false);

let movieID = ref("");
let buttonValue = ref("PURCHASE");

const blurBackground = ref();
const closeButton = ref();

let movieInfoModal = ref();

let selector = ref();

index.clearResultOption();
index.getMovies("Action");

let discoverySearch = axios.get('https://api.themoviedb.org/3/discover/movie?api_key=2a61abe7fe3315e1fd9e70c6d769dc56&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1', {
    include_adult: false,
})

let discoverySearchResult = discoverySearch.then((result) => {
    if (isMovieMade === true)
        return;

    for (let i = 0; i < result.data.results.length; i++) {
        index.addResultOption(result.data.results[i].id);
    }
})
index.finishList();

function showMovieModal(searchMovieID) {
    showModal.value = true;

    blurBackground.value.style.display = "block";
    closeButton.value.style.display = "block";

    movieID = searchMovieID;

    for (let i = 0; i <= movieItems.value.length; i++) {
        if (movieItems.value[i] === searchMovieID) {
            buttonValue.value = "REMOVE";
            break;
        }

        else {
            buttonValue.value = "PURCHASE";
        }
    }
}

function closeModal() {
    showModal.value = false;

    blurBackground.value.style.display = "none";
    closeButton.value.style.display = "none";
}

function moveToCheckout() {
    if (itemLength.value <= 0) {
        return;
    }

    else {
        router.push('/checkout-area');
    }

}

function getGenres() {
    // index.populateFirestore();
    index.clearResultOption();
    index.getMovies(selector.value.value);
}

</script>

<style>
#genreSelect {
    position: absolute;
    top: 76px;
    left: 0px;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;
    height: 30px;
    width: 120px;
}

#movieOptionContainer {
    margin-top: 15px;

    display: grid;
    grid-template-columns: auto auto auto auto auto;
    grid-template-rows: 400px 400px 400px 400px;
    padding: 10px;
}

.movieOption {
    display: block;
}

.movieInfoModal {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 10000;
}

#backgroundImage {
    position: fixed;

    top: 0px;
    left: 0px;

    z-index: -1;

    height: 100%;
    width: 100%;
    background-image: url('../assets/movieBackground.jpg');
    background-size: cover;

    filter: brightness(25%);
}

#closeButton {
    position: fixed;

    top: 28%;
    right: 16.5%;

    outline: transparent;
    border-color: transparent;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    background-color: black;
    color: white;

    text-align: center;
    vertical-align: middle;

    height: 30px;
    width: 30px;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;

    z-index: 100000;

    display: none;

}

#closeButton:hover {
    border-style: solid;
    border-color: white;
    border-width: 2px;
}

#blurBackground {
    position: fixed;

    display: none;

    height: 100%;
    width: 100%;

    background-color: black;
    opacity: 0.7;

    z-index: 9999;

    top: 0px;
}

#shoppingBagIcon {
    border-radius: 10px;

    height: 50px;
    width: 50px;

    background: transparent;

    position: absolute;

    top: 12px;
    right: 150px;


    z-index: 1;
}

#shoppingBagText {
    height: 75px;
    width: 75px;

    position: absolute;

    top: 6px;
    right: 132px;

    text-align: center;
    vertical-align: middle;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;

    color: black;

    z-index: 100000000000000000000000000000000;
}
</style>