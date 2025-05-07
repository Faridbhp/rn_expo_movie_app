import { images } from "@/constants/images";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

const Maintenance = () => {
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            <View className="mx-5 justify-center items-center flex-1">
                <View className="rounded-lg shadow-lg bg-slate-200 p-5 w-full max-w-[500px]">
                    <Text className="text-2xl color-red-600 font-bold text-center mb-5">
                        Kami Sedang Meningkatkan aplikasi Movie
                    </Text>

                    <Text className="text-lg text-[#555555] text-center mb-5 font-medium">
                        Tim kami saat ini sedang melakukan pemeliharaan
                        terjadwal,untuk meningkatkan pengalaman Anda. Kami mohon
                        maaf atas ketidaknyamanan yang mungkin terjadi.
                    </Text>

                    <Text className="text-lg text-[#555555] text-center mb-5 font-medium">
                        Kami sedang bekerja keras untuk memastikan aplikasi kami
                        kembali lebih baik. Aplikasi akan segera kembali dengan
                        fitur dan performa yang lebih baik.
                    </Text>
                </View>

                <View className="bg-slate-200 p-4 rounded-lg mt-5 w-full max-w-[500px]">
                    <Text className="text-center text-[#666666] text-base font-medium">
                        Butuh bantuan segera? Hubungi kami di{" "}
                        <Text
                            className="text-red-600 font-bold"
                            onPress={() =>
                                Linking.openURL("mailto:support@gmail.com")
                            }>
                            support@gmail.com
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};
export default Maintenance;
