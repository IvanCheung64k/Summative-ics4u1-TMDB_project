<template>
    <ShopHeader title="Checkout" tagline="Thank you for shopping with us!" button-value="STORE"></ShopHeader>
    <div id="backgroundImage">

    </div>
    <div id="paymentContainer">
        <h2 id="checkoutTitle">PAYMENT INFO</h2>
        <hr id="line" />
        <h3 id="checkoutHeader">Order Details</h3>
        <p class="checkoutContent">Choose a payment method</p>
        <br />
        <br />
        <div id="creditContainer">
            <img src="../assets/card-6518547_640.png" id="creditLogo">
            <input id="paymentButton1" type="button" value="CREDIT/DEBIT" />
        </div>
        <br />
        <br />
        <input type="button" value="COMPLETE PURCHASE" id="checkoutButton" />
    </div>
    <div id="productContainer">
        <h2 id="checkoutTitle">SUMMARY</h2>
        <hr id="line" />
        <h3 id="checkoutHeader">Your Movie Box</h3>
        <p class="checkoutContent">{{ finalMovieLength }} total item(s)</p>
        <ul id="overflowBox">
            <li class="checkoutContentList" v-for="option in finalMovieOptions" @click="removeMovie(option)"
                :id="option">{{ option }} </li>
        </ul>
        <hr id="line2" />
        <br />
        <h3 class="checkoutContent" id="line3">Total: </h3>
        <h3 class="checkoutContentLine">${{ parseFloat(finalMovieLength * 1.13).toFixed(2) }}</h3>
    </div>
</template>

<script setup>
import axios from 'axios';

import ShopHeader from "../components/ShopHeader.vue"

import { ref } from "vue";

import { indexStore } from "../store/index.js"
import { storeToRefs } from 'pinia';


const index = indexStore();
const { movieItems } = storeToRefs(index);

let finalMovieOptions = ref([]);
let finalMovieLength = ref(movieItems.value.length);

for (let i = 0; i < movieItems.value.length; i++) {
    let search = axios.get(`https://api.themoviedb.org/3/movie/${movieItems.value[i]}`, {
        params: {
            api_key: "2a61abe7fe3315e1fd9e70c6d769dc56",
            append_to_response: "videos",
            include_adult: false,
        }
    })

    let searchResult = search.then((movieData) => {
        finalMovieOptions.value.push(movieData.data.title);
    })
}

function removeMovie(thisid) {
    for (let i = 0; i <= movieItems.value.length; i++) {
        if (movieItems.value[i] === thisid) {
            index.removeMovieItem(i);
            return;
        }
        else{
        }}
    let x = thisid;
    document.getElementById(x).remove();
    finalMovieLength--;
    document.getElementsByClassName("checkoutContentLine").innerHTML = (finalMovieLength * 1.13);
}
</script>

<style scoped>
.productList {
    margin-left: 550px;
}

#overflowBox {
    height: 520px;

    overflow-y: scroll;
}

#backgroundImage {
    position: fixed;

    top: 0px;
    left: 0px;

    z-index: -1000000;

    height: 100vh;
    width: 100%;
    background-image: url('../assets/CheckoutBG.jfif');
    background-size: cover;

}

#itemContainer {

    position: relative;

    margin-top: 20px;
    margin-bottom: 30px;

    z-index: 100000;

    overflow-y: scroll;
    overflow-x: hidden;

    top: 15px;

    height: 485px;
}

#overflowBox::-webkit-scrollbar {
    display: none;
}

#checkoutTitle {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 30px;
    margin-left: 35px;
}

#checkoutHeader {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;

    margin-top: 30px;
    margin-left: 35px;
}

.checkoutContent {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 5px;

    width: 250px;

    display: inline;
}

.checkoutContentList {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 5px;

    width: 250px;

    color: white;
}

.checkoutContentLine {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 485px;
    margin-bottom: 5px;

    width: 250px;

    bottom: -325px;
    right: 30px;
    position: absolute;
}

#checkoutArgeement {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    margin-top: 0px;
    margin-left: 35px;

    width: 300px;
}

#paymentContainer {

    position: fixed;

    top: 125px;
    left: 150px;

    background: transparent;

    height: 450px;
    width: 375px;





    border-radius: 10px;
}

#productContainer {

    position: fixed;

    top: 125px;
    left: 550px;


    height: 450px;
    width: 650px;

    background: transparent;


    border-radius: 10px;
}


#line {
    width: 90%;
}

#line2 {
    width: 90%;
    bottom: -300px;
    right: 30px;
    position: absolute;
}

.checkoutContentList:hover {
    color: red;
}

#line3 {
    bottom: -325px;
    right: 360px;
    position: absolute;
}

#checkoutButton {
    outline: transparent;
    border-color: transparent;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;
    text-align: center;

    color: black;

    height: 30px;
    width: 200px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 10px;

    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;
}

#paymentButton {
    outline: transparent;
    border-color: transparent;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    color: black;

    height: 32px;
    width: 285px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 35px;
    margin-bottom: 10px;

    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;

    display: inline;

    text-align: left;
    padding-left: 22px;
}

#paymentButton1 {
    outline: transparent;
    border-color: transparent;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;

    vertical-align: middle;

    color: black;

    height: 32px;
    width: 280px;

    letter-spacing: 1px;

    margin-top: 0px;
    margin-left: 10px;
    margin-bottom: 10px;

    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;

    display: inline;

    text-align: left;
    padding-left: 17px;

}

#blurItemBackground {
    position: fixed;

    height: 512px;
    width: 100vw;

    background-color: black;
    opacity: 0.7;

    margin-top: 100px;

    top: 0px;
}


#creditContainer {
    margin-left: 45px;
    margin-bottom: 5px;
}


#creditLogo {
    height: 26px;
    width: 26px;

    margin-left: -10px;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;
}

* {
    color: white;
}
</style>