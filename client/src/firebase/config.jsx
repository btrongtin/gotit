// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7WVML0-AmDiA6KEDNnWTJNRUxRDj_UkA",
    authDomain: "gotit-app-13c2b.firebaseapp.com",
    projectId: "gotit-app-13c2b",
    storageBucket: "gotit-app-13c2b.appspot.com",
    messagingSenderId: "527051557756",
    appId: "1:527051557756:web:321b2ea1555c188c27f2f9",
    measurementId: "G-CVDCEQ3YFM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
