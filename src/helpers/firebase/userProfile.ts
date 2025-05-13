import {
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import { auth, db_firestore } from "./firebaseConfig";

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

export { getUserData, updateUserProfile };
