import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect } from "react";
import { icons } from "@/src/constants/icons";
import { useFocusEffect, usePathname } from "expo-router";
import { getDeviceId } from "@/src/utils/device";
import useFetch from "@/src/services/useFetch";
import {
    deleteSaveMovie,
    getAllSavedData,
} from "@/src/helpers/appwrite/savedMovies";
import { images } from "@/src/constants/images";
import HistoryCard from "../../src/components/HistoryCard";
import { useAppSelector } from "@/src/store/hooks";

const Saved = () => {
    const pathname = usePathname();
    const deviceId = getDeviceId();
    const user = useAppSelector((state) => state.user.userData);

    const {
        data: historyData,
        loading: historyLoading,
        error: historyError,
        refetch: loadHistory,
    } = useFetch(() =>
        getAllSavedData({
            device_id: String(deviceId),
            uid: user?.uid ?? "",
        })
    );

    useFocusEffect(
        useCallback(() => {
            if (user?.uid) {
                loadHistory();
            }
        }, [])
    );

    const handleClear = async () => {
        if (user?.uid) {
            await deleteSaveMovie(user?.uid, String(deviceId), 20);
            loadHistory();
        }
    };

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />

            <View className="flex-1 px-5 mt-5">
                <View className="flex-row justify-between mt-2">
                    <Text className="text-2xl text-white font-bold">Saved</Text>
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
                    contentContainerStyle={{ paddingBottom: 100, flex: 1 }}
                    ListEmptyComponent={
                        <View className="flex-1 h-full justify-center items-center">
                            <Image
                                source={icons.save}
                                className="size-10"
                                tintColor="#fff"
                            />
                            <Text className="text-gray-500 text-base">
                                Save
                            </Text>
                        </View>
                    }
                />
            </View>
        </View>
    );
};

export default Saved;
