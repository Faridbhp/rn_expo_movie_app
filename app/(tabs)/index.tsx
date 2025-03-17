import { Text, View } from "react-native";
import "../global.css"
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center" >
      <Text className="text-5xl text-dark-100 font-bold">MyApp.</Text>
    </View>
  );
}
