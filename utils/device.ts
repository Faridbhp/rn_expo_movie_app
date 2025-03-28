import * as Application from "expo-application";

export const getDeviceId = () => {
    return Application.getAndroidId() || Application.getIosIdForVendorAsync();
};
