import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Alert,
    Image,
} from "react-native";
import { registerUser } from "@/src/helpers/firebase/auth";
import { router } from "expo-router";
import { images } from "@/src/constants/images";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Modal } from "react-native";

const RegistrationScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    const handleRegistration = async () => {
        if (!name || !email || !password || !confirmPassword) {
            setErrorMessage("Semua kolom harus diisi.");
            return;
        }

        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Email tidak valid.");
            return;
        }

        if (password.length < 6) {
            setErrorMessage("Password harus minimal 6 karakter.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Password tidak cocok.");
            return;
        }

        setErrorMessage("");

        const result = await registerUser(email, password, { name });

        if (result.error) {
            setModalMessage("Akun anda gagal dibuat!");
            setIsSuccess(false);
            setShowModal(true);
            setErrorMessage(result.error);
        } else {
            setModalMessage("Akun Anda berhasil dibuat!");
            setIsSuccess(true);
            setShowModal(true);
            setTimeout(() => {
                setShowModal(false);
                router.replace("/loginPage");
            }, 2500);
        }
    };

    return (
        <>
            <ImageBackground
                source={images.background_movie}
                className="flex-1 bg-cover justify-center"
                blurRadius={4}>
                <Image source={images.bg} className="absolute w-full z-0" />
                <View className="flex-1 justify-center px-8 bg-black/50">
                    <Text className="text-3xl font-bold text-white mb-8 text-center">
                        🎬 Daftar
                    </Text>

                    <TextInput
                        className="h-14 border border-white/40 mb-4 px-4 rounded-lg text-white bg-white/10"
                        placeholder="Nama Lengkap"
                        placeholderTextColor="#ccc"
                        value={name}
                        onChangeText={setName}
                    />

                    <TextInput
                        className="h-14 border border-white/40 mb-4 px-4 rounded-lg text-white bg-white/10"
                        placeholder="Email"
                        placeholderTextColor="#ccc"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <View className="relative">
                        <TextInput
                            className="h-12 border border-white/40 mb-4 px-4 rounded-md text-white bg-white/10 w-full"
                            placeholder="Password"
                            placeholderTextColor="#ccc"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword} // Gunakan state untuk visibility
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)} // Toggle visibility
                            className="absolute right-3 top-3" // Sesuaikan posisi ikon
                        >
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

                    <View className="relative">
                        <TextInput
                            className="h-12 border border-white/40 mb-4 px-4 rounded-md text-white bg-white/10 w-full"
                            placeholder="Konfirmasi Password"
                            placeholderTextColor="#ccc"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity
                            onPress={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-3">
                            {showConfirmPassword ? (
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
                        <Text className="text-red-500 mb-2 text-center">
                            {errorMessage}
                        </Text>
                    ) : null}

                    <TouchableOpacity
                        className="bg-red-600 py-4 rounded-lg items-center mb-5"
                        onPress={handleRegistration}>
                        <Text className="text-white text-lg font-bold">
                            Daftar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push("/loginPage")}>
                        <Text className="text-white text-center text-md">
                            Sudah punya akun?{" "}
                            <Text className="text-red-600 font-bold">
                                Login di sini
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
                        <TouchableOpacity
                            onPress={() => setShowModal(false)}
                            className=" bg-red-600 px-4 py-3 rounded-lg">
                            <Text className="text-white font-medium text-xl">
                                Tutup
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default RegistrationScreen;
