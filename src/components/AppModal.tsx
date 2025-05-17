import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
interface AppModalProps {
    visible: boolean;
    message: string;
    isSuccess: boolean;
    onClose: () => void;
}

const AppModal: React.FC<AppModalProps> = ({
    visible,
    message,
    isSuccess,
    onClose,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center bg-black/70 px-8">
                <View className="bg-zinc-900 rounded-2xl p-6 w-full max-w-md items-center">
                    <FontAwesome
                        name={isSuccess ? "check-circle" : "times-circle"}
                        size={50}
                        color={isSuccess ? "#22c55e" : "#ef4444"}
                        style={{ marginBottom: 10 }}
                    />
                    <Text className="text-white text-center mb-7 text-2xl font-medium">
                        {message}
                    </Text>
                    {!isSuccess && (
                        <TouchableOpacity
                            onPress={onClose}
                            className="bg-red-600 px-4 py-3 rounded-lg">
                            <Text className="text-white font-medium text-xl">
                                Tutup
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default AppModal;
