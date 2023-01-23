<template>
    <div id="backgroundImage"></div>
    <MainMenuHeader title="These are the backlogs" tagline="No, there are no toilets here, Frank" button-value="HOME">
    </MainMenuHeader>
    <div id="account">
        <form @submit.prevent="checkLogin()" id="loginContainer">
            <h2 id="header">Login</h2>
            <label class="loginLabel">Username:</label>
            <br>
            <input type="text" ref="username" placeholder="Username" class="userInput">
            <br>
            <label class="loginLabel">Password:</label>
            <br>
            <input type="password" ref="password" placeholder="Password" class="userInput">
            <br>
            <div class="buttons">
                <input type="submit" value="LOGIN" @click="checkLogin()" id="loginButton">
                <img src="../assets/googleLogin.png" alt="" id="googleLogin" @click="checkGoogleLogin()">
            </div>

        </form>
        <form @submit.prevent="checkRegister()" id="registerContainer">
            <h2 id="header">Register</h2>
            <label class="loginLabel">Username:</label>
            <br>
            <input type="text" ref="regUsername" placeholder="Username" class="userInput">
            <br>
            <label class="loginLabel">Password:</label>
            <br>
            <input type="password" ref="regPassword" placeholder="Password" class="userInput">
            <br>
            <div class="buttons">
                <input type="submit" value="REGISTER" id="registerButton">
            </div>
        </form>
    </div>
    <Footer message1="Backlogs" message2="Copyright © 2022 Ivan Cheung" id="footer"></Footer>
    <AlertBox message="Your username or password is invalid. Please try again" id="alertBox" v-if="showError">
    </AlertBox>
    <AlertBox message="Account created! Login to get started!" id="accountBox" v-if="showAccount"></AlertBox>
    <AlertBox message="Password must be 6 characters or longer. Try again" id="alertBox" v-if="showPassword"></AlertBox>
    <AlertBox message="There was an error with your registration. Try again" id="alertBox" v-if="showRegError">
    </AlertBox>
</template>


<script setup>
import router from "../router";
import { ref } from "vue";
import MainMenuHeader from "../components/MainMenuHeader.vue"
import Footer from "../components/Footer.vue"
import AlertBox from "../components/AlertBox.vue"
import { auth } from "../firebase/index.js"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "@firebase/auth";

const provider = new GoogleAuthProvider;
const username = ref("");
const password = ref("");
const regPassword = ref("");
const regUsername = ref("");

let showError = ref(false);
let showAccount = ref(false);
let showPassword = ref(false);
let showRegError = ref(false);


function checkRegister() {
    if (regPassword.value.value.length < 6) {
        showPassword.value = true;
        showError.value = false;
        showAccount.value = false;
        return;
    }
    else {
        try {
            createUserWithEmailAndPassword(auth, regUsername.value.value, regPassword.value.value);
        }
        catch (error) {
            showAccount.value = false;
            showRegError.value = true;
            showPassword.value = false;
            return;
        }
        showAccount.value = true;
        showRegError.value = false;
        showPassword.value = false;
        regPassword.value = "";
        regUsername.value = "";
    }
}

function checkLogin() {
    signInWithEmailAndPassword(auth, username.value.value, password.value.value)
        .then((userCredential) => {
            const user = userCredential.user;
            router.push('/shopping-area');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            showError.value = true;
        });
}

function checkGoogleLogin() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            router.push('/shopping-area');

        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
}

</script>


<style>
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

#loginContainer {
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
}

#registerContainer {
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(-50%, -50%);
}

#loginButton {
    outline: transparent;
    border-width: 10%;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: larger;
    justify-content: center;

    vertical-align: middle;

    color: white;
    height: 35px;
    width: 140px;

    letter-spacing: 2px;
}

#registerButton {
    outline: transparent;
    border-width: 10%;
    border-color: #E4E6A8;
    background-color: #C6C58B;
    border-style: outset;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: larger;
    justify-content: center;

    vertical-align: middle;

    color: white;
    height: 35px;
    width: 140px;

    letter-spacing: 2px;
}

.buttons {
    justify-content: center;
    margin-top: 10px;
}

#googleLogin {
    border-radius: 4px;
    height: 35px;
    width: 215px;
    box-shadow: 2px;
    margin-left: 30px;
}

#header {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    color: white;
}

#alertBox {

    position: absolute;

    bottom: 15px;
    right: 20px;

    height: 60px;
    width: 435px;

    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: medium;

    text-align: center;
    vertical-align: middle;

    color: white;

    background-color: darkred;

    border-right: 0.4rem solid;
    border-radius: 5px;

    box-shadow: 5px 8px 8px black;
}

#accountBox {
    position: absolute;
    bottom: 15px;
    right: 20px;
    height: 60px;
    width: 435px;
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: medium;
    text-align: center;
    vertical-align: middle;
    color: white;
    background-color: green;
    border-right: 0.4rem solid;
    border-radius: 5px;
    box-shadow: 5px 8px 8px black;
}

.userInput {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;

    height: 40px;
    width: 375px;

    margin-top: 10px;
    margin-bottom: 10px;

    padding-left: 7px;

    margin-bottom: 15px;

    border-style: none;
}

.loginLabel {
    font-family: "Motiva Sans", Arial, Helvetica, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: larger;

    letter-spacing: 1px;

    color: white;
}

#footer {
    position: absolute;

    bottom: 0px;

    margin-bottom: 20px;
}

#account {
    justify-content: center;
}
</style>