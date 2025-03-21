// track the searches made by a user
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWIRTE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWIRTE_COLLECTION_ID!;

const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJEK_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("searchTerm", query)]
        );

        // check if a record of that search has already been stored
        if (result.documents.length > 0) {
            const exitingMovie = result.documents[0];

            // if a document is found increment the seachCount field
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
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
                COLLECTION_ID,
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
    1;
};
