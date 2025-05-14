import { ID, Query } from "react-native-appwrite";
import { COLLECTION_ID_HISTORY, database, DATABASE_ID } from "./appwriteConfig";

export const getOneHistoryMovie = async ({
    movieId = "",
    deviceId = "",
    uid = "",
}: {
    movieId: string;
    deviceId: string;
    uid: string;
}): Promise<HistoryMovie | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("uid", uid),
                Query.equal("device_id", deviceId),
                Query.equal("movie_id", movieId),
            ]
        );

        if (result.documents.length > 0) {
            return result.documents[0] as unknown as HistoryMovie;
        }

        return undefined;
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const getAllHistoryMovies = async ({
    device_id = "",
    uid = "",
}: {
    device_id: string;
    uid: string;
}): Promise<HistoryMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("uid", uid),
                Query.equal("device_id", device_id),
                Query.orderDesc("updated_at"),
            ]
        );
        console.log("result getAllHistoryMovies", result);
        return result.documents as unknown as HistoryMovie[];
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const updateHistoryMovie = async (
    movie_id: string,
    deviceId: string,
    uid: string,
    is_saved: Boolean,
    movie: MovieDetails
) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("uid", uid),
                Query.equal("device_id", deviceId),
                Query.equal("movie_id", movie_id),
            ]
        );
        console.log(
            `movieId : ${movie_id} deviceId : ${deviceId} userId : ${uid} status : ${is_saved}`
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
                    is_saved: is_saved,
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
                    uid: uid,
                    device_id: deviceId,
                    movie_id: movie_id,
                    title: movie?.title,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
                    is_saved: is_saved,
                    updated_at: new Date().toISOString(),
                }
            );
        }
    } catch (error) {
        console.log("error", error);
        throw error;
    }
};

export const deleteHistoryMovie = async (
    uid: string,
    device_id: string,
    limit: number = 1
) => {
    try {
        const response = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID_HISTORY,
            [
                Query.equal("uid", uid),
                Query.equal("device_id", device_id),
                Query.limit(limit),
                Query.orderDesc("updated_at"),
            ]
        );
        const documents = response.documents;

        if (documents.length > 0) {
            for (const doc of documents) {
                await database.deleteDocument(
                    DATABASE_ID,
                    COLLECTION_ID_HISTORY,
                    doc.$id
                );
                console.log("deleted ", doc.$id);
            }
        }
    } catch (error) {
        console.log("Error deleting history movies:", error);
    }
};
