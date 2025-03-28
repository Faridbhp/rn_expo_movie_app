import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";
import { convertToLocalTime } from "@/utils/convertToLocalTime";

const HistoryCard = ({
    movie: { movie_id, poster_url, title, updated_at },
}: HistoryCardProps) => {
    console.log("updated_at", updated_at);
    return (
        <Link href={`/movies/${movie_id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{ uri: poster_url }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />

                <Text
                    className="text-sm font-bold text-white mt-2"
                    numberOfLines={1}>
                    {title}
                </Text>
                <Text className="text-sm text-white">
                    {convertToLocalTime(updated_at)}
                </Text>
            </TouchableOpacity>
        </Link>
    );
};

export default HistoryCard;
