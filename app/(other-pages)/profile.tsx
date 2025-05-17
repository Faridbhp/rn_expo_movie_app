import { images } from "@/src/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import {
    getUserData,
    updateUserProfile,
    uploadProfilePicture,
} from "@/src/helpers/firebase/userProfile";
import { useAppDispatch, useAppSelector } from "../../src/store/hooks";
import { useEffect, useState } from "react";
import { setUserData, UserData } from "../../src/reducers/userData";
import { logoutUser } from "@/src/helpers/firebase/auth";
import { pickImage } from "@/src/utils/pickImage";
import AppModal from "@/src/components/AppModal";

const Profile = () => {
    const user = useAppSelector((state) => state.user.userData);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showMessageModal, setShowMessageModal] = useState<string>("");
    const dispatch = useAppDispatch();

    useEffect(() => {
        setUserName(user?.name ?? "");
        setEmail(user?.email ?? "");
        setPhoneNumber(user?.phoneNumber ?? "");
    }, [user]);

    const handleLogout = async () => {
        const isLogout = await logoutUser();
        if (isLogout.success) {
            router.replace("/loginPage");
        }
    };

    const handleUpdate = () => {
        const userData = {
            name: userName,
            email,
            phoneNumber,
        };

        const id = user?.uid ?? "";
        if (!userName || !email || !phoneNumber) {
            console.error("All fields are required");
            return;
        }

        updateUserProfile(userData)
            .then(async (resp) => {
                if (resp.success) {
                    const userResponse = await getUserData(id);
                    if (userResponse?.data) {
                        dispatch(setUserData(userResponse.data as UserData));
                    }
                } else {
                    setShowModal(true);
                    setShowMessageModal("Failed to update user profile");
                    console.error("Failed to update user profile");
                }
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                setShowModal(true);
                setShowMessageModal("Gagal memperbarui profil");
            })
            .finally(() => router.back());
    };

    const handleUpdatePhoto = async () => {
        try {
            const uri = await pickImage();
            console.log("uri", uri);
            if (uri) {
                const result = await uploadProfilePicture(uri);
                if (result.success) {
                    setShowModal(true);
                    setShowMessageModal("Photo updated");
                    console.log("Photo updated:", result.downloadURL);
                } 
                if (result.error) {
                    setShowModal(true);
                    setShowMessageModal("Failed to update photo");
                }
            }
        } catch (error) {
            setShowModal(true);
            setShowMessageModal("Failed to update photo");
            console.error("Failed to update photo:", error);
        }
    };

    return (
        <>
            <AppModal
                visible={showModal}
                message={showMessageModal}
                isSuccess={false}
                onClose={() => setShowModal(false)}
            />
            <View className="flex-1 bg-primary">
                <Image source={images.bg} className="absolute w-full z-0" />
                <View className="flex items-end px-3 py-3">
                    <TouchableOpacity
                        className="bg-red-600 rounded-lg p-3 w-20"
                        onPress={handleLogout}>
                        <Text className="text-white text-center">Logout</Text>
                    </TouchableOpacity>
                </View>
                <View className="items-center mt-[30px] mb-[30px]">
                    <View className="border-white border-2 rounded-full size-32 flex items-center justify-center">
                        <MaterialIcons
                            name="people-alt"
                            size={85}
                            color="white"
                        />
                        <View className="absolute right-[-20px] bottom-5">
                            <TouchableOpacity
                                className="bg-blue-400 rounded-full p-2"
                                onPress={handleUpdatePhoto}>
                                <MaterialCommunityIcons
                                    name="lead-pencil"
                                    size={24}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text className="text-white font-bold text-[20px] mt-2">
                        {user?.name ?? "Username"}
                    </Text>
                    <Text className="text-white text-[14px]">
                        {user?.phoneNumber ?? "phone number"}
                    </Text>
                </View>
                <ScrollView className="bg-slate-200 flex-1">
                    <View className="px-8 pb-[80px]">
                        <View className="mt-10">
                            <Text className="text-2xl font-bold mb-2">
                                Your Name
                            </Text>
                            <TextInput
                                placeholder="Name"
                                className="text-lg"
                                onChangeText={setUserName}
                                value={userName}
                            />
                            <View className="h-[1px] bg-gray-700 w-full" />
                        </View>
                        <View className="mt-10">
                            <Text className="text-2xl font-bold mb-2">
                                Your Email
                            </Text>
                            <TextInput
                                placeholder="email@gmail.com"
                                className="text-lg"
                                onChangeText={setEmail}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <View className="h-[1px] bg-gray-700 w-full" />
                        </View>
                        <View className="mt-10">
                            <Text className="text-2xl font-bold mb-2">
                                Your Phone
                            </Text>
                            <TextInput
                                placeholder="+62.."
                                className="text-lg"
                                onChangeText={setPhoneNumber}
                                value={phoneNumber}
                                keyboardType="phone-pad"
                            />
                            <View className="h-[1px] bg-gray-700 w-full" />
                        </View>
                        <View className="mt-[40px]">
                            <TouchableOpacity
                                className="bg-purple-950 rounded-lg p-3"
                                onPress={handleUpdate}>
                                <Text className="text-white text-center text-lg font-bold">
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="mt-2">
                            <TouchableOpacity
                                className="bg-purple-950 rounded-lg p-3"
                                onPress={() => router.back()}>
                                <Text className="text-white text-center text-lg font-bold">
                                    Back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
                <View className="justify-center items-center flex-row absolute bottom-0 w-full p-5 bg-slate-200">
                    <TouchableOpacity className="mr-3">
                        <AntDesign name="appstore-o" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="instagram" size={30} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
};

export default Profile;
