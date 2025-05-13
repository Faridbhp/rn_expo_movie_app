import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db_firestore } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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

        if (!user) {
            return {
                error: "Gagal mendapatkan informasi pengguna setelah login.",
            };
        }

        return { user };
    } catch (error) {
        console.error("Error during login:", error);
        return { error: "Error during login" };
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

export { registerUser, loginUser, logoutUser };
