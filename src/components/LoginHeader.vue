<template>
  <div id="headerContainer">
    <img src="../assets/TheBoxLogo.png">
    <h1 id="title">{{ title }}</h1>
    <p id="tagline">{{ tagline }}</p>
    <input type="search" id="searchBar" placeholder="Search Any Movie ..." autocomplete="off" ref="searchBar"
      @change="displaySearchResults()" />
    <p id="pageNumber">{{ pageNumber }}</p>
    <input type="button" value="<" id="previousButton" @click="previousFunction()">
    <input type="button" value=">" id="nextButton" @click="nextFunction()">
    <input id="submitButton" type="button" :value="buttonValue" @click="pushToLogin()">
  </div>
  <div>

  </div>
</template>

<script setup>
import router from "../router";
import axios from "axios";
import { ref, isProxy, toRaw } from "vue";
import { indexStore } from "../store/index.js";
import { storeToRefs } from "pinia";

const index = indexStore();

const searchBar = ref();

let displayTotalPages;
let pageNumber = ref(1);

defineProps({
  title: String,
  tagline: String,
  buttonValue: String
});

function pushToLogin() {
  router.push('/login');
}


function previousFunction() {
  if (pageNumber.value <= 1)
    return;
  if (pageNumber.value > 1)
    pageNumber.value--;
  displaySearchResults(false);
}
function nextFunction() {
  if (pageNumber.value >= displayTotalPages)
    return;
  if (pageNumber.value < displayTotalPages)
    pageNumber.value++;
  displaySearchResults(false);
}

function displaySearchResults(x) {

  for (var i = 0; i < 20; i++) {
    document.querySelector(".movieOption").remove();
  }
  if (x === true)
    pageNumber.value = 1;
  let searchParam = axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=2a61abe7fe3315e1fd9e70c6d769dc56&language=en-US&page=1&include_adult=false&query=${searchBar.value.value}`,
    {}
  );
  let searchParamResult = searchParam.then((finalResult) => {
    index.finishList();
    displayTotalPages = finalResult.data.total_pages;
    let finalParam = axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=2a61abe7fe3315e1fd9e70c6d769dc56&language=en-US&page=${pageNumber.value}&include_adult=false&query=${searchBar.value.value}`,
      {}
    );
    let finalParamResult = finalParam.then((finalResult) => {
      for (let o = 0; o < finalResult.data.results.length; o++) {
        index.addResultOption(finalResult.data.results[o].id);
      }
    });
  });
}
</script>

<style scoped>
html,
body {
  margin: 0px;
  padding: 0px;


}

#searchbar {
  margin-left: 50px;
  height: 30 px;

}

#pageNumber {
  position: absolute;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-size: medium;
  font-weight: bold;
  color: black;
  top: 18px;
  right: 255px;
}

#nextButton {
  position: absolute;
  top: 31px;
  outline: transparent;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: bold;
  background-color: black;
  color: black;
  height: 20px;
  width: 20px;
  right: 223px;
  vertical-align: middle;
  text-align: center;
  padding-bottom: 5px;
  border-color: #E4E6A8;
  background-color: #C6C58B;
  border-style: outset;
}

#previousButton {
  position: absolute;
  top: 31px;
  outline: transparent;
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: bold;
  background-color: black;
  color: black;
  height: 20px;
  width: 20px;
  letter-spacing: 2px;
  right: 280px;
  vertical-align: middle;
  text-align: center;
  padding-bottom: 5px;
  border-color: #E4E6A8;
  background-color: #C6C58B;
  border-style: outset;
}


#headerContainer {
  height: 50px;
  width: 100%;

  background-color: transparent;

  /*margin-left: 5px;*/
  padding-top: 20px;
  padding-bottom: 5px;
  background-color: #D6DEA7;

}

#title {
  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-style: italic;
  font-weight: bolder;

  color: white;

  margin-left: 115px;

  display: inline;

  text-shadow: 1px 1px 5px black;

}

#tagline {
  display: inline;

  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-style: italic;
  font-weight: bold;

  font-size: medium;

  color: white;

  margin-left: 20px;

  text-shadow: 1px 1px 5px black;
}

#submitButton {
  position: absolute;

  top: 30px;
  right: 2%;

  outline: transparent;
  border-color: transparent;

  font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;

  background-color: black;
  color: white;

  height: 25px;
  width: 100px;

  letter-spacing: 2px;
  border-color: #E4E6A8;
  background-color: #C6C58B;
  border-style: outset;
}

#submitButton:hover {
  border-style: solid;
  border-color: white;
  border-width: 2px;
}

img {
  position: absolute;

  margin-left: 20px;

  height: 50px;
  width: 78.3850931677px;
}
</style>