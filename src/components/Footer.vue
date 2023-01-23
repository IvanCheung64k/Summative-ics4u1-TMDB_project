<template>
    <div id="footerContainer">
        <h3 id="message1">{{ message1 }}</h3>
        <p id="message2">{{ message2 }}</p>
    </div>
</template>

<script setup>

defineProps({
    message1: String,
    message2: String,
});

</script>

<style>
html,
body {
    margin: 0px;
    padding: 0px;


}

#footerContainer {
    height: 50px;
    width: 100%;

    background-color: transparent;

    /*margin-left: 5px;*/
    padding-top: 15px;
    padding-bottom: 5px;

}

#message1 {
    vertical-align: middle;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: italic;
    font-weight: bolder;

    color: white;

    margin-left: 32px;

    display: inline;

    text-shadow: 1px 1px 5px black;

}

#message2 {
    display: inline;

    vertical-align: middle;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: italic;
    font-weight: bold;

    font-size: medium;

    color: white;

    margin-left: 20px;

    text-shadow: 1px 1px 5px black;
}
</style>