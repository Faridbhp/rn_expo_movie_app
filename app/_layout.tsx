import { CheckIsMaintenance, ListenIsMaintenance } from "@/helpers/firebaseConfig";
import { router, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    useEffect(() => {
        CheckIsMaintenance().then((isMaintenance) => {
            if (isMaintenance) {
                // Show maintenance screen
                router.replace('/other-pages/maintenance');
            }
        });
        ListenIsMaintenance(
            () => {
                router.replace('/other-pages/maintenance');
            },
            () => {
                 // Show home screen
                router.replace('/(tabs)');
            }
        );
    }, []);

    return (
        <SafeAreaProvider>
            <SafeAreaView className="bg-primary flex-1">
                <StatusBar hidden={true} />
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="movies/[id]"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="other-pages"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
