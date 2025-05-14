import { Animated, Dimensions, FlatList, Image, Text, View } from "react-native";
import "../global.css";
import { useRouter } from "expo-router";
import { images } from "@/src/constants/images";
import { icons } from "@/src/constants/icons";
import SearchBar from "../../src/components/SearchBar";
import useFetch from "@/src/services/useFetch";
import { fetchPopularMovies } from "@/src/services/api";
import MovieCard from "../../src/components/MovieCard";
import { getTrendingMovies } from "@/src/helpers/appwrite/movies";
import MovieCardSkeleton from "../../src/components/MovieCard_Skeleton";
import { useState } from "react";
import TrendingSection from "../../src/components/TrendingSection";

export default function Index() {
    const router = useRouter();
    const [refreshingMovies, setRefreshingMovies] = useState(false);

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadPopulerMovies,
    } = useFetch(() =>
        fetchPopularMovies({
            query: "",
        })
    );

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
        refetch: loadTrendingMovies,
    } = useFetch(getTrendingMovies);

    const loadingPopularMovie = moviesLoading || refreshingMovies;
    const loadingTrendingMovie = trendingLoading || refreshingMovies;

    const handleRefreshPopularMovie = async () => {
        try {
            setRefreshingMovies(true);
            await loadPopulerMovies();
            await loadTrendingMovies();
        } catch (error) {
            console.error("Refresh error:", error);
        } finally {
            setRefreshingMovies(false);
        }
    };

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />

            <Image source={icons.logo} className="w-12 h-10 mt-20 mx-auto" />
            <View className="absolute mt-5 ml-5 border-white border rounded-md p-1 items-center justify-center">
                <View className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <Text className="text-sm text-white text-center font-bold">
                    V.{process.env.EXPO_PUBLIC_VERSION ?? "0"}
                </Text>
            </View>
            <View className="my-5 mx-5">
                <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder="Search movies..."
                />
            </View>
            <FlatList
                onRefresh={handleRefreshPopularMovie}
                refreshing={refreshingMovies}
                data={loadingPopularMovie ? Array(9).fill(null) : movies}
                renderItem={({ item }) =>
                    loadingPopularMovie ? (
                        <MovieCardSkeleton />
                    ) : (
                        <MovieCard {...item} />
                    )
                }
                keyExtractor={(item, index) =>
                    loadingPopularMovie
                        ? `skeleton-${index}`
                        : item.id.toString()
                }
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <View className="flex-1">
                        <TrendingSection
                            data={trendingMovies}
                            loading={loadingTrendingMovie}
                            error={trendingError}
                        />

                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    !moviesError ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500 text-xl">
                                No movies found
                            </Text>
                        </View>
                    ) : (
                        <Text className="text-lg text-red-500 text-center">
                            Error: {moviesError?.message}
                        </Text>
                    )
                }
            />
        </View>
    );
}


