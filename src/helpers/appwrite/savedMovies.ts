import { Query } from "react-native-appwrite";
import { COLLECTION_ID_HISTORY, database, DATABASE_ID } from "./appwriteConfig";

export const getAllSavedData = async ({
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
                Query.equal("is_saved", true),
                Query.orderDesc("updated_at"),
            ]
        );
        console.log("getAllSavedData", result);
        return result.documents as unknown as HistoryMovie[];
    } catch (error) {
        console.log("Error fetching history movies:", error);
        throw error;
    }
};

export const deleteSaveMovie = async (
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
                await database.updateDocument(
                    DATABASE_ID,
                    COLLECTION_ID_HISTORY,
                    doc.$id,
                    {
                        updated_at: new Date().toISOString(),
                        is_saved: false,
                    }
                );
                console.log("updated ", doc.$id);
            }
        }
    } catch (error) {}
};
