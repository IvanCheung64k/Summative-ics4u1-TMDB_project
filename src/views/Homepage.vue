<template>
    <LoginHeader title="These are the backlogs" tagline="No, there are no toilets here, Frank" button-value="LOGIN">
    </LoginHeader>
    <div id="backgroundImage"></div>
    <h1 id="messageLine1">Want a movie?</h1>
    <h3 id="messageLine2">We got like 20 options here, good luck</h3>
    <Footer message1="Backlogs" message2="Copyright © 2022 Ivan Cheung" id="footer"></Footer>
</template>

<script setup>
import LoginHeader from '../components/HomeHeader.vue'
import Footer from '../components/Footer.vue'

import { storeToRefs } from 'pinia';
import { indexStore } from "../store/index.js";
import { ref } from 'vue';
import router from '../router';

const nameInput = ref("");
const classInput = ref("");

const index = indexStore();

const { username } = storeToRefs(index)

</script>

<style>
#backgroundImage {
    position: absolute;

    top: 0px;
    left: 0px;

    z-index: -1;

    height: 100%;
    width: 100%;
    background-image: url('../assets/movieBackground.jpg');
    background-size: cover;

    filter: brightness(25%);
}

#messageLine1 {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    text-align: left;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-weight: bolder;

    font-size: 70px;

    color: white;

}

#messageLine2 {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    text-align: center;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-weight: bolder;

    font-size: 26px;

    color: white;

}

#messageContainer {
    position: absolute;
    left: -50px;
    width: 1000px;
}

#footer {
    position: absolute;

    bottom: 0px;

    margin-bottom: 20px;
}
</style>