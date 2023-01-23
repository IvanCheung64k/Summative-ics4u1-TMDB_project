import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmWGm6XLzsVwwPGx6YazUqKsLGk1Ei2Ik",
  authDomain: "ics4u-774dc.firebaseapp.com",
  projectId: "ics4u-774dc",
  storageBucket: "ics4u-774dc.appspot.com",
  messagingSenderId: "997665966098",
  appId: "1:997665966098:web:ef0ed9bedcaaaf358f70cb",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, firestore, storage };
