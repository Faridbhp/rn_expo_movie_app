import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db_firestore } from "./firebaseConfig";
import * as FileSystem from 'expo-file-system';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

// Fungsi untuk mengunggah foto profil ke Firebase Storage
// berbayar
const uploadProfilePicture = async (uri: string) => {
  try {
    const { currentUser } = auth;
    if (!currentUser) throw new Error("User not logged in");

    const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${currentUser.uid}.jpg`);
    const blob = await fetch(uri).then((r) => r.blob());

    await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(storageRef);

    // Update Firestore dengan URL foto
    const userDocRef = doc(db_firestore, "users", currentUser.uid);
    await updateDoc(userDocRef, {
      photoURL: downloadURL,
    });

    return { success: true, downloadURL };
  } catch (error) {
    console.error("Upload photo failed:", error);
    return { error: true };
  }
};

export { getUserData, updateUserProfile, uploadProfilePicture };
