import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { images } from "@/src/constants/images";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import useFetch from "@/src/services/useFetch";
import { deleteHistoryMovie, getAllHistoryMovies } from "@/src/services/appwrite";
import HistoryCard from "../components/HistoryCard";
import { getDeviceId } from "@/src/utils/device";
import { usePathname } from "expo-router";

const Profile = () => {
    const pathname = usePathname();
    const deviceId = getDeviceId();

    const {
        data: historyData,
        loading: historyLoading,
        error: historyError,
        refetch: loadHistory,
    } = useFetch(() =>
        getAllHistoryMovies({
            query: String(deviceId),
        })
    );

    useEffect(() => {
        loadHistory();
    }, [pathname]);

    const handleClear = async () => {
        await deleteHistoryMovie(String(deviceId), 20);
        loadHistory();
    };

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className="mt-10 mb-5 mx-8 flex-row">
                <View className="border-white border-2 rounded-full w-20 h-20 flex items-center justify-center">
                    <MaterialIcons name="people-alt" size={50} color="white" />
                </View>
                <View className="justify-center ml-2 ">
                    <Text className="text-white font-bold text-[20px]">
                        Username
                    </Text>
                    <Text className="text-white text-[14px]">
                        user@gmail.com
                    </Text>
                </View>
                <View className="flex flex-1 items-end ">
                    <FontAwesome6 name="gear" size={24} color="white" />
                </View>
            </View>
            <View className="flex-1 px-5">
                <View className="flex-row justify-between mt-2">
                    <Text className="text-2xl text-white font-bold">
                        History
                    </Text>
                    <TouchableOpacity onPress={handleClear}>
                        <Text className="text-lg text-white font-bold">
                            Clear
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={historyData}
                    renderItem={({ item }) => <HistoryCard movie={item} />}
                    keyExtractor={(item) => `${item.movie_id.toString()}`}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 16,
                        marginVertical: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>
        </View>
    );
};

export default Profile;
