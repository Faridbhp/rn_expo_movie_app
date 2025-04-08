// track the searches made by a user
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWIRTE_DATABASE_ID!;
const COLLECTION_ID_METRICS =
    process.env.EXPO_PUBLIC_APPWIRTE_COLLECTION_ID_METRICS!;
const COLLECTION_ID_HISTORY =
    process.env.EXPO_PUBLIC_APPWIRTE_COLLECTION_ID_HISTORY!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJEK_ID!);

const database = new Databases(client);

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

export const updateHistoryMovie = async (
    query: string,
    deviceId: string,
    movie: MovieDetails
) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [Query.equal("device_id", deviceId), Query.equal("movie_id", query)]
        );

        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const exitingMovie = result.documents[0];

            // if a document is found update Updated time field
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID_HISTORY,
                exitingMovie.$id,
                {
                    updated_at: new Date().toISOString(),
                }
            );
        } else {
            // if no document is found
            // create a new document in Appwrite database ->
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID_HISTORY,
                ID.unique(),
                {
                    movie_id: query, // query // movie.id
                    title: movie?.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                    updated_at: new Date().toISOString(),
                    device_id: deviceId,
                }
            );
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

export const getAllHistoryMovies = async ({
    query = "",
}: {
    query: string;
}): Promise<HistoryMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [Query.equal("device_id", query), Query.orderDesc("updated_at")]
        );
        return result.documents as unknown as HistoryMovie[];
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const getAllSavedData = async ({
    query = "",
}: {
    query: string;
}): Promise<HistoryMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("is_saved", true),
                Query.equal("device_id", query),
                Query.orderDesc("updated_at"),
            ]
        );
        return result.documents as unknown as HistoryMovie[];
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const getOneHistoryMovie = async ({
    movieId = "",
    deviceId = "",
}: {
    movieId: string;
    deviceId: string;
}): Promise<HistoryMovie | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("device_id", deviceId),
                Query.equal("movie_id", movieId),
            ]
        );
        console.log(result.documents);
        if (result.documents.length > 0) {
            return result.documents[0] as unknown as HistoryMovie;
        }

        return undefined;
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const savedMovie = async (
    query: string,
    device_id: string,
    is_saved: Boolean
) => {
    try {
      
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("device_id", device_id),
                Query.equal("movie_id", query),
            ]
        );

        if (result.documents.length > 0) {
            const exitingMovie = result.documents[0];
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID_HISTORY,
                exitingMovie.$id,
                {
                    updated_at: new Date().toISOString(),
                    is_saved: is_saved,
                }
            );
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};
