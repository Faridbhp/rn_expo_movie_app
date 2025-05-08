// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, get } from "firebase/database";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    doc,
    getDoc,
    getFirestore,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
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
const auth = getAuth(app);
const db_firestore = getFirestore(app);

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
                resolve(false);
            });
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

const registerUser = async (email: any, password: any, userData: any) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { user } = userCredential;

        // Simpan data pengguna tambahan ke Firestore
        const userDocRef = doc(db_firestore, "users", user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            ...userData, // Data tambahan seperti nama, dll.
        })
            .then(() => {
                console.log("Dokumen berhasil ditulis ke Firestore!");
                // Lakukan tindakan setelah penulisan berhasil (misalnya, navigasi)
            })
            .catch((error) => {
                console.error("Gagal menulis dokumen ke Firestore:", error);
                // Tangani error (misalnya, tampilkan pesan kesalahan kepada pengguna)
            });

        return { user };
    } catch (error) {
        console.error("Error during registration:", error);
        return { error: "Error during registration" };
    }
};

const loginUser = async (email: any, password: any) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const { user } = userCredential;
        if (user) {
            const token = await user.getIdToken(); 
            await AsyncStorage.setItem("userUid", user.uid);
            await AsyncStorage.setItem("token", token);
            return { user };
        } else {
            return { error: "Error during login" };
        }
    } catch (error) {
        console.error("Error during login:", error);
        return { error: "Error during login" };
    }
};

const getUserData = async (uid: any) => {
    try {
        const userDocRef = doc(db_firestore, "users", uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            return { data: docSnap.data() };
        } else {
            console.log("No such document!");
            return { data: null };
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        return { error };
    }
};

const logoutUser = async () => {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        console.error("Error during logout:", error);
        return { error };
    }
};

const updateUserProfile = async (userData: any) => {
    const { currentUser } = auth;
    console.log("currentUser", currentUser);
    if (!currentUser) {
        console.error("No user logged in.");
        return { error: "No user logged in." };
    }

    const userDocRef = doc(db_firestore, "users", currentUser.uid);
    try {
        await updateDoc(userDocRef, userData);
        return { success: true };
    } catch (error) {
        console.error("Error updating user profile:", error);
        return { error: "Error updating user profile" };
    }
};

export {
    CheckIsMaintenance,
    ListenIsMaintenance,
    registerUser,
    loginUser,
    getUserData,
    logoutUser,
    updateUserProfile,
};
