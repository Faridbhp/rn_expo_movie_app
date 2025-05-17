import * as ImagePicker from "expo-image-picker";

export const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 1,
    });
    console.log("result Image", result);

    if (!result.canceled) {
        return result.assets[0].uri; // URI dari gambar
    }

    return null;
};
