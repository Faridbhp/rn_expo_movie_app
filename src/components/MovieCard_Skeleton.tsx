import { View } from "react-native";
import React from "react";

const MovieCardSkeleton = () => {
    return (
        <View className="w-[30%] p-1">
            <View className="bg-gray-300 h-52 rounded-md w-full animate-pulse mb-1" />
            <View className="bg-gray-300 h-3 rounded-md w-full animate-pulse" />
            <View className="flex-row items-center justify-start gap-x-1 mt-1">
                <View className="bg-gray-300 w-4 h-4 rounded-full animate-pulse" />
                <View className="bg-gray-300 h-3 rounded-md w-1/3 animate-pulse" />
            </View>
            <View className="flex-row items-center justify-between mt-1">
                <View className="bg-gray-300 h-3 rounded-md w-1/3 animate-pulse" />
                <View className="bg-gray-300 h-3 rounded-md w-1/3 animate-pulse" />
            </View>
        </View>
    );
};

export default MovieCardSkeleton;
