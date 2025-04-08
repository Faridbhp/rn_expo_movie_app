import { View, Text, Image, FlatList } from "react-native";
import React, { useCallback, useEffect } from "react";
import { icons } from "@/constants/icons";
import { useFocusEffect, usePathname } from "expo-router";
import { getDeviceId } from "@/utils/device";
import useFetch from "@/services/useFetch";
import { getAllHistoryMovies, getAllSavedData } from "@/services/appwrite";
import { images } from "@/constants/images";
import HistoryCard from "../components/HistoryCard";

const Saved = () => {
    const pathname = usePathname();
    const deviceId = getDeviceId();

    const {
        data: historyData,
        loading: historyLoading,
        error: historyError,
        refetch: loadHistory,
    } = useFetch(() =>
        getAllSavedData({
            query: String(deviceId),
        })
    );
    useEffect(() => {
        console.log("historyData", historyLoading);
    }, [historyLoading]);

    useFocusEffect(
        useCallback(() => {
            console.log("path", pathname);
            loadHistory();
        }, [])
    );

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className="flex-1 px-5 mt-20">
                <Text className="text-2xl text-white font-bold ">Saved</Text>
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
