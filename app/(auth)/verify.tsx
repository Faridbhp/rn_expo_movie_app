// app/verify.tsx
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { isSignInWithEmailLink, signInWithEmailLink } from "@firebase/auth";
import { auth } from "@/src/helpers/firebase/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

export default function VerifyEmailLink() {
    const router = useRouter();

    useEffect(() => {
        const checkLink = async () => {
            const email = await AsyncStorage.getItem("emailForSignIn");
            const url = await Linking.getInitialURL(); // ✅ untuk React Native

            console.log("email:", email);
            console.log("URL:", url);

            if (url && isSignInWithEmailLink(auth, url) && email) {
                try {
                    await signInWithEmailLink(auth, email, url);
                    router.replace("/(tabs)");
                } catch (error) {
                    console.error("Verification failed:", error);
                }
            }
        };

        checkLink();
    }, []);

    return null;
}
