import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Modal,
} from "react-native";
import { sendLoginEmailLink } from "@/src/helpers/firebase/auth";
import { router } from "expo-router";
import { images } from "@/src/constants/images";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const LoginGoogleScreen = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = async () => {
        try {
            if (!email) {
                setErrorMessage("Email harus diisi.");
                return;
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                setErrorMessage("Email tidak valid.");
                return;
            }

            setErrorMessage("");

            const result = await sendLoginEmailLink(email);

            if (!result.success) {
                setModalMessage("email anda salah!");
                setIsSuccess(false);
                setShowModal(true);
                setErrorMessage(result.message);
                return;
            }

            setModalMessage("Link terkirim ke email anda");
            setIsSuccess(true);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
            }, 500);
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        isSuccess && router.replace("/(tabs)");
    };

    return (
        <>
            <ImageBackground
                source={images.background_movie}
                className="flex-1 bg-cover justify-center"
                blurRadius={4}>
                <View className="flex-1 justify-center px-8 bg-black/50">
                    <Text className="text-3xl font-bold text-white mb-8 text-center">
                        🎬 Login
                    </Text>

                    <TextInput
                        className="h-14 border border-white/40 mb-4 px-4 rounded-md text-white bg-white/10"
                        placeholder="Email"
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {errorMessage ? (
                        <Text className="text-red-500 mb-4 text-center">
                            {errorMessage}
                        </Text>
                    ) : null}

                    <TouchableOpacity
                        className="bg-red-600 py-4 rounded-md items-center mb-5"
                        onPress={handleLogin}>
                        <Text className="text-white text-lg font-bold">
                            Login
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => router.push("/loginPage")}>
                        <Text className="text-white text-center text-md">
                            Login dengan{" "}
                            <Text className="text-red-600 font-bold">
                                Google
                            </Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/registerPage")}>
                        <Text className="text-white text-center text-md">
                            Belum punya akun?{" "}
                            <Text className="text-red-600 font-bold">
                                Daftar di sini
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <Modal
                visible={showModal}
                animationType="fade"
                transparent
                onRequestClose={() => setShowModal(false)}>
                <View className="flex-1 justify-center items-center bg-black/70 px-8">
                    <View className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md items-center">
                        <FontAwesome
                            name={isSuccess ? "check-circle" : "times-circle"}
                            size={50}
                            color={isSuccess ? "#22c55e" : "#ef4444"}
                            style={{ marginBottom: 10 }}
                        />
                        <Text className="text-white text-center mb-7 text-2xl font-medium">
                            {modalMessage}
                        </Text>
                        {!isSuccess && (
                            <TouchableOpacity
                                onPress={handleClose}
                                className=" bg-red-600 px-4 py-3 rounded-lg">
                                <Text className="text-white font-medium text-xl">
                                    Tutup
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default LoginGoogleScreen;
