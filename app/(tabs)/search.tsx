import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/src/constants/images";
import MovieCard from "../../src/components/MovieCard";
import useFetch from "@/src/services/useFetch";
import { fetchPopularMovies } from "@/src/services/api";
import { icons } from "@/src/constants/icons";
import SearchBar from "../../src/components/SearchBar";
import { updateSearchCount } from "@/src/helpers/appwrite/movies";
import MovieCardSkeleton from "../../src/components/MovieCard_Skeleton";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError,
        refetch: loadMovies,
        reset,
    } = useFetch(
        () =>
            fetchPopularMovies({
                query: searchQuery,
            }),
        false
    );

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchQuery.trim()) {
                await loadMovies();
            } else {
                reset();
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    useEffect(() => {
        if (movies?.length > 0 && movies?.[0]) {
            // simpan daa ke appwrite
            updateSearchCount(searchQuery, movies[0]);
        }
    }, [movies]);

    return (
        <View className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="flex-1 absolute w-full z-0"
                resizeMode="cover"
            />

            <View className="w-full flex-row justify-center mt-20 items-center">
                <Image source={icons.logo} className="w-12 h-10" />
            </View>

            <View className="my-5 mx-5">
                <SearchBar
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChangeText={(text: string) => setSearchQuery(text)}
                />
            </View>

            {moviesLoading ? (
                <FlatList
                    data={Array(9).fill(null)}
                    renderItem={() => <MovieCardSkeleton />}
                    keyExtractor={(item, index) => `skeleton-${index}`}
                    className="px-5"
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 16,
                        marginVertical: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            ) : (
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard {...item} />}
                    keyExtractor={(item) => item.id.toString()}
                    className="px-5"
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: "flex-start",
                        gap: 16,
                        marginVertical: 16,
                    }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        !moviesError ? (
                            <View className="mt-10 px-5">
                                <Text className="text-center text-gray-500 text-xl">
                                    {searchQuery.trim()
                                        ? "No movies found"
                                        : "Search for a movie"}
                                </Text>
                            </View>
                        ) : null
                    }
                />
            )}
        </View>
    );
};

export default Search;
