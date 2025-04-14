import { Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { convertToLocalTime } from "@/src/utils/convertToLocalTime";

const HistoryCard = ({
    movie: { movie_id, poster_url, title, updated_at },
}: HistoryCardProps) => {
    
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
