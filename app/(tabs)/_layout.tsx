import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useAppDispatch } from "../store/hooks";
import { setUserData, UserData } from "../reducers/userData";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserData } from "@/helpers/firebase/firebaseConfig";

const TabIcon = ({ focused, icon, title }: any) => {
    return (
        <View className="flex flex-col items-center justify-cente">
            <View
                className={`rounded-full ${
                    focused ? "bg-purple-600" : "bg-transparent"
                } p-2 items-center justify-center`}>
                <View
                    className={`${
                        focused ? "size-8" : "size-6"
                    } items-center justify-center`}>
                    <FontAwesome5
                        name={icon}
                        size={focused ? 20 : 18}
                        color={focused ? "#fff" : "#A8B5DB"}
                    />
                </View>
                {/* <Image
                    source={icon}
                    tintColor={focused ? "#fff" : "#A8B5DB"}
                    className={focused ? "size-8" : "size-5"}
                /> */}
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
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            // console.log("Auth state changed:", firebaseUser);
            if (firebaseUser) {
                console.log("User is signed in:", firebaseUser.uid);
                getUser(firebaseUser.uid);
            } else {
                console.log("No user is signed in.");
                dispatch(setUserData(null));
            }
        });

        return unsubscribe;
    }, []);

    const getUser = async (uid: string) => {
        const userResponse = await getUserData(uid);
        console.log("userResponse", userResponse);
        if (userResponse?.data) {
            dispatch(setUserData(userResponse.data as UserData));
        }
    };

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
                        <TabIcon focused={focused} icon="home" title="Home" />
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
                            icon="search"
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
                        <TabIcon focused={focused} icon="book" title="Saved" />
                    ),
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon
                            focused={focused}
                            icon="history"
                            title="History"
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default _Layout;
