// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";
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
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db_realtime = getDatabase(app);

// Definisikan referensi database
const Database_REF = process.env.EXPO_PUBLIC_FIREBASE_DATABASE_REF;
const rdb = ref(db_realtime, Database_REF);

const CheckIsMaintenance = async () => {
    return new Promise((resolve) => {
        get(rdb) // Gunakan 'get' untuk membaca data sekali
            .then((snapshot) => {
                const value = snapshot.val();
                if (value && value.is_under_maintenance) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((e) => {
                resolve(false)});
    });
};

const ListenIsMaintenance = (
    onMaintenance: (isMaintenance: boolean) => void,
    onMaintenaceOff: (isMaintenance: boolean) => void
) => {
    onValue(rdb, (snapshot) => {
        const value = snapshot.val();
        if (value && value.is_under_maintenance) {
            onMaintenance(true);
        } else {
            onMaintenaceOff(false);
        }
    });
};

export { CheckIsMaintenance, ListenIsMaintenance };
