<template>
    <div id="movieOptionContainer">
        <img :src="moviePath" id="movieOptionSelect" ref="movieOptionSelect">
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const moviePath = ref("");
const movieOptionSelect = ref(null);

const props = defineProps({
    id: Number,
    show: Boolean,
});

let showIcon = ref(false);
showIcon = props.show;

let search = axios.get(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
        api_key: "2a61abe7fe3315e1fd9e70c6d769dc56",
        append_to_response: "videos",
    }
})

let searchResult = search.then((movieData) => {

    moviePath.value = `https://image.tmdb.org/t/p/w500/${movieData.data.poster_path}`;
})

</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}

#movieOptionContainer {
    position: relative;
}

#movieOptionSelect:hover {
    transform: scale(1.03);
}

#movieOptionSelect {
    width: 200px;
    height: 300px;

    border-radius: 10px;

    display: block;

    margin: 25px 30px 20px 30px;
}
</style>