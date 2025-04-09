import { View, Text, Image } from "react-native";
import React from "react";
import MaskedView from "@react-native-masked-view/masked-view";
import { images } from "@/constants/images";

const TrendingCardSkeleton = ({ index }: any) => {
  return (
    <View className="w-32 relative pl-5">
      <View className="bg-gray-300 rounded-lg w-full h-48 animate-pulse" />
      <View className="bg-gray-300 w-full h-3 rounded-md animate-pulse mt-1" />
      <View className="absolute bottom-0 -left-0.5 px-2 py-1 rounded-full overflow-hidden">
        <MaskedView
          maskElement={
            <Text className="font-bold text-white text-6xl">
              {index + 1}
            </Text>
          }>
          <Image
            source={images.rankingGradient}
            className="size-14"
            resizeMode="cover"
          />
        </MaskedView>
      </View>
    </View>
  );
};

export default TrendingCardSkeleton;