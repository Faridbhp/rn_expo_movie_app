import {
    ActivityIndicator,
    FlatList,
    Image,
    ScrollView,
    Text,
    View,
} from "react-native";
import "../global.css";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "../components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies } from "@/services/api";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "../components/TrendingCard";

export default function Index() {
    const router = useRouter();

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
    } = useFetch(() =>
        fetchPopularMovies({
            query: "",
        })
    );

    const {
        data: trendingMovies,
        loading: trendingLoading,
        error: trendingError,
    } = useFetch(getTrendingMovies);

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: "center",
                    gap: 16,
                    marginVertical: 16,
                }}
                contentContainerStyle={{ paddingBottom: 100 }}
                ListHeaderComponent={
                    <>
                        <Image
                            source={icons.logo}
                            className="w-12 h-10 mt-20 mb-5 mx-auto"
                        />

                        {moviesLoading || trendingLoading ? (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="mt-10 self-center"
                            />
                        ) : moviesError || trendingError ? (
                            <Text className="text-lg text-red-500 text-center">
                                Error:{" "}
                                {moviesError?.message || trendingError?.message}
                            </Text>
                        ) : (
                            <View className="flex-1 mt-5">
                                <SearchBar
                                    onPress={() => router.push("/search")}
                                    placeholder="Search"
                                />

                                {trendingMovies && (
                                    <View className="mt-10">
                                        <Text className="text-lg text-white font-bold mb-3">
                                            Trending Movies
                                        </Text>

                                        <FlatList
                                            horizontal
                                            showsHorizontalScrollIndicator={
                                                false
                                            }
                                            ItemSeparatorComponent={() => (
                                                <View className="w-5" />
                                            )}
                                            className="mb4 mt-3"
                                            data={trendingMovies}
                                            renderItem={({ item, index }) => (
                                                <TrendingCard
                                                    movie={item}
                                                    index={index}
                                                />
                                            )}
                                            keyExtractor={(item) =>
                                                `${item.movie_id.toString()}-${
                                                    item.searchTerm
                                                }`
                                            }
                                        />
                                    </View>
                                )}

                                <>
                                    <Text className="text-lg text-white font-bold mt-5 mb-3">
                                        Latest Movies
                                    </Text>
                                </>
                            </View>
                        )}
                    </>
                }
            />
        </View>
    );
}
