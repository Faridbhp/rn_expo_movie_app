import React, { useRef, useEffect } from "react";
import { FlatList, Text, View, Animated } from "react-native";
import TrendingCard from "../components/TrendingCard";
import TrendingCardSkeleton from "../components/TrendingCard_Skeleton";

const CARD_WIDTH = 220;
const SCROLL_INTERVAL = 2000; // Interval waktu antar scroll

const TrendingSection = ({
    data,
    loading,
    error,
}: {
    data: any[] | null | undefined;
    loading: boolean;
    error: Error | null;
}) => {
    const flatListRef = useRef<Animated.FlatList>(null);
    const currentIndex = useRef(0);

    useEffect(() => {
        if (!loading && data && data.length > 0) {
            const intervalId = setInterval(() => {
                currentIndex.current = (currentIndex.current + 1) % data.length;
                flatListRef.current?.scrollToOffset({
                    offset: currentIndex.current * CARD_WIDTH,
                    animated: true, // Pastikan ini true untuk animasi
                });
            }, SCROLL_INTERVAL);

            return () => clearInterval(intervalId);
        }
    }, [data, loading]);

    return (
        <View>
            <Text className="text-lg text-white font-bold mb-3">
                Trending Movies
            </Text>

            <Animated.FlatList
                horizontal
                ref={flatListRef}
                // scrollEnabled={false}// Menonaktifkan interaksi scroll manual
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="w-5" />}
                className="mb-4 mt-3"
                data={loading ? Array(4).fill(null) : data}
                renderItem={({ item, index }) =>
                    loading ? (
                        <TrendingCardSkeleton index={index} />
                    ) : (
                        <TrendingCard movie={item} index={index} />
                    )
                }
                keyExtractor={(item, index) =>
                    loading
                        ? `skeletonHorizontal-${index}`
                        : `${item?.movie_id?.toString()}-${item?.searchTerm}`
                }
                ListEmptyComponent={
                    !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500 text-xl">
                                No movies found
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-lg text-red-500 text-center">
                            Error: {error?.message}
                        </Text>
                    )
                }                
            />
        </View>
    );
};

export default TrendingSection;