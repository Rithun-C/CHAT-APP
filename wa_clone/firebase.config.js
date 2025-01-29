// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPrU-yfld6zprTBYbcJwDCNv37yRmxHxU",
  authDomain: "wa-clone-53c3c.firebaseapp.com",
  projectId: "wa-clone-53c3c",
  storageBucket: "wa-clone-53c3c.appspot.com",
  messagingSenderId: "15816067017",
  appId: "1:15816067017:web:f7be810961669528a64a18",
  measurementId: "G-K1K878PCL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage();

export {auth,db,storage}