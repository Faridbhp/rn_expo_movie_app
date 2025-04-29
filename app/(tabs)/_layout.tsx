import { View, Text, ImageBackground, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";

const TabIcon = ({ focused, icon, title }: any) => {
                <Image source={icon} tintColor="#151312" className='size-5' />
    return (
        <View className="flex flex-col items-center justify-cente">
            <View
                className={`rounded-full ${
                    focused ? "bg-purple-600" : "bg-transparent"
                } p-2 items-center justify-center`}>
                <Image
                    source={icon}
                    tintColor={focused ? "#fff" : "#A8B5DB"}
                    className={`${focused ? "size-8" : "size-5"}`}
                />
            </View>
            {focused && (
                <Text 
                    numberOfLines={1} 
                    className="text-white text-base font-semibold mt-2 w-16 text-center">
                    {title}
                </Text>
            )}
        </View>
    );
};

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    justifyContent: "center",
                    alignItems: "center",
                },
                tabBarStyle: {
                    backgroundColor: "#0f0D23",
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 60,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "News",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.home}
                            title="News"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.save}
                            title="Saved"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon={icons.person}
                            title="Profile"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;
