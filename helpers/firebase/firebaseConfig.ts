// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import {
    getFirestore,
} from "firebase/firestore";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db_realtime = getDatabase(app);
export const db_firestore = getFirestore(app);

// Menginisialisasi Firebase Authentication dengan aplikasi Firebase yang sudah ada
export const auth = initializeAuth(app, {
    // Menentukan persistence untuk status otentikasi menggunakan AsyncStorage
    persistence: getReactNativePersistence(ReactNativeAsyncStorage), // AsyncStorage akan menyimpan status pengguna secara persisten
});

// Definisikan referensi database
const Database_REF = process.env.EXPO_PUBLIC_FIREBASE_DATABASE_REF;
export const rdb = ref(db_realtime, Database_REF);
