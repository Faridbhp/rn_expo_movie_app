import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
    return (
        <SafeAreaView className="bg-primary flex-1">
            <StatusBar hidden={true} />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="movies/[id]"
                    options={{ headerShown: false }}
                />
            </Stack>
        </SafeAreaView>
    );
}
