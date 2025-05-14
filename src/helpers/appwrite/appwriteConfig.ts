import { Client, Databases, ID, Query } from "react-native-appwrite";

export const DATABASE_ID = process.env.EXPO_PUBLIC_APPWIRTE_DATABASE_ID!;
export const COLLECTION_ID_METRICS =
    process.env.EXPO_PUBLIC_APPWIRTE_COLLECTION_ID_METRICS!;
export const COLLECTION_ID_HISTORY =
    process.env.EXPO_PUBLIC_APPWIRTE_COLLECTION_ID_HISTORY!;

export const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJEK_ID!);

export const database = new Databases(client);
