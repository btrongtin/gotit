import { initializeApp } from "firebase-admin/app";
import admin from 'firebase-admin'
import serviceAccount from './config/gotit-app-13c2b-firebase-adminsdk-2eyjo-70094abd73.json' assert { type: "json" }


const firebaseConfig = {
    apiKey: "AIzaSyC7WVML0-AmDiA6KEDNnWTJNRUxRDj_UkA",
    authDomain: "gotit-app-13c2b.firebaseapp.com",
    projectId: "gotit-app-13c2b",
    storageBucket: "gotit-app-13c2b.appspot.com",
    messagingSenderId: "527051557756",
    appId: "1:527051557756:web:321b2ea1555c188c27f2f9",
    measurementId: "G-CVDCEQ3YFM",
    credential: admin.credential.cert(serviceAccount)
};

initializeApp(firebaseConfig);
