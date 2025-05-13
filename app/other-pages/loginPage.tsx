import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal,
} from "react-native";
import { getUserData } from "@/helpers/firebase/userProfile";
import { loginUser } from "@/helpers/firebase/auth";
import { router } from "expo-router";
import { images } from "@/constants/images";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAppDispatch } from "../store/hooks";
import { setUserData, UserData } from "../reducers/userData";

const LoginScreen = () => {
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("Akun anda gagal dibuat!");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                setErrorMessage("Email dan password harus diisi.");
                return;
            }

            const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailRegex.test(email)) {
                setErrorMessage("Email tidak valid.");
                return;
            }

            setErrorMessage("");

            const result = await loginUser(email, password);

            if (result.error) {
                setModalMessage("Password atau email anda salah!");
                setIsSuccess(false);
                setShowModal(true);
                setErrorMessage(result.error);
                return;
            }

            const uid = result.user?.uid;
            const userData = await getUserData(uid);
            console.log("userData", userData);

            if (!userData?.data) {
                setModalMessage("Gagal mendapatkan data pengguna.");
                setIsSuccess(false);
                setShowModal(true);
                return;
            }
            dispatch(setUserData(userData.data as UserData));

            setModalMessage("Anda berhasil login!");
            setIsSuccess(true);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                router.replace("/(tabs)");
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

                    <View className="relative">
                        <TextInput
                            className="h-14 border border-white/40 mb-4 px-4 rounded-md text-white bg-white/10 w-full"
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3">
                            {showPassword ? (
                                <FontAwesome
                                    name="eye-slash"
                                    size={24}
                                    color="#fff"
                                />
                            ) : (
                                <FontAwesome
                                    name="eye"
                                    size={24}
                                    color="#fff"
                                />
                            )}
                        </TouchableOpacity>
                    </View>

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

                    <TouchableOpacity
                        onPress={() =>
                            router.push("/other-pages/registerPage")
                        }>
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

export default LoginScreen;
