import { images } from "@/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const Profile = () => {
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className="items-center mt-[50px] mb-[30px]">
                <View className="border-white border-2 rounded-full size-32 flex items-center justify-center">
                    <MaterialIcons name="people-alt" size={85} color="white" />
                    <View className="absolute right-[-20px] bottom-5">
                        <TouchableOpacity className="bg-blue-400 rounded-full p-2">
                            <MaterialCommunityIcons
                                name="lead-pencil"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text className="text-white font-bold text-[20px] mt-2">
                    Username
                </Text>
                <Text className="text-white text-[14px]">phone number</Text>
            </View>
            <ScrollView className="bg-slate-200 flex-1">
                <View className="px-8 pb-[80px]">
                    <View className="mt-10">
                        <Text className="text-2xl font-bold mb-2">
                            Your Name
                        </Text>
                        <TextInput placeholder="Name" className="text-lg" />
                        <View className="h-[1px] bg-gray-700 w-full" />
                    </View>
                    <View className="mt-10">
                        <Text className="text-2xl font-bold mb-2">
                            Your Email
                        </Text>
                        <TextInput
                            placeholder="email@gmail.com"
                            className="text-lg"
                        />
                        <View className="h-[1px] bg-gray-700 w-full" />
                    </View>
                    <View className="mt-10">
                        <Text className="text-2xl font-bold mb-2">
                            Your Phone
                        </Text>
                        <TextInput placeholder="+62.." className="text-lg" />
                        <View className="h-[1px] bg-gray-700 w-full" />
                    </View>
                    <View className="mt-[40px]">
                        <TouchableOpacity
                            className="bg-purple-950 rounded-lg p-3"
                            onPress={() => router.back()}>
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
    );
};

export default Profile;
