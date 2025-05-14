import { ID, Query } from "react-native-appwrite";
import { COLLECTION_ID_METRICS, database, DATABASE_ID } from "./appwriteConfig";

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_METRICS,
            [Query.equal("searchTerm", query)]
        );

        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const exitingMovie = result.documents[0];

            // if a document is found increment the seachCount field
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID_METRICS,
                exitingMovie.$id,
                {
                    count: exitingMovie.count + 1,
                }
            );
        } else {
            // if no document is found
            // create a new document in Appwrite database ->
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID_METRICS,
                ID.unique(),
                {
                    searchTerm: query,
                    movie_id: movie.id,
                    title: movie.title,
                    count: 1,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            );
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

export const getTrendingMovies = async (): Promise<
    TrendingMovie[] | undefined
> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_METRICS,
            [Query.limit(5), Query.orderDesc("count")]
        );

        return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log("error", error);
        return undefined;
    }
};
