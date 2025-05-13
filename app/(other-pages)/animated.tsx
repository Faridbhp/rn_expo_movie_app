import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useRef } from "react";
import {
    Animated,
    View,
    Text,
    ViewStyle,
    TouchableWithoutFeedback,
    StyleSheet,
    Easing,
    PanResponder,
} from "react-native";

const AnimatedView = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text>Go to Animated Page</Text>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                }}>
                {/* <FadeInView
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "blue",
                    }}>
                    <Text style={{ color: "white" }}>Hello</Text>
                </FadeInView>
                <SlideInBottom
                    style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "red",
                    }}>
                    <Text style={{ color: "white" }}>World</Text>
                </SlideInBottom>
                <ScaleOnPress>
                    <View
                        style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "green",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        <Text style={{ color: "white" }}>Press Me</Text>
                    </View>
                </ScaleOnPress> */}
                <RotatingView />
                <MovingRotatingView />
                <TouchControlledView />
            </View>
        </View>
    );
};

export default AnimatedView;

function FadeInView({
    children,
    style,
}: {
    children: ReactNode;
    style?: ViewStyle;
}) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={[style, { opacity: fadeAnim }]}>
            {children}
        </Animated.View>
    );
}

function SlideInBottom({
    children,
    style,
}: {
    children: ReactNode;
    style?: ViewStyle;
}) {
    const slideAnim = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, [slideAnim]);

    return (
        <Animated.View
            style={[style, { transform: [{ translateY: slideAnim }] }]}>
            {children}
        </Animated.View>
    );
}

function ScaleOnPress({ children }: { children: ReactNode }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scale, {
            toValue: 4,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>
            <Animated.View style={{ transform: [{ scale }] }}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const RotatingView = () => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 2000, // Durasi satu putaran (dalam milidetik)
                easing: Easing.linear, // Membuat rotasi dengan kecepatan konstan
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <Animated.View
            style={{
                ...styles.boxRotate,
                transform: [{ rotate: spin }],
            }}>
            <Text style={{ color: "black" }}>Berputar!</Text>
        </Animated.View>
    );
};

const MovingRotatingView = () => {
    const spinValue = useRef(new Animated.Value(0)).current;
    const translateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.timing(spinValue, {
                    toValue: 1,
                    duration: 2000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.sequence([
                    Animated.timing(translateValue, {
                        toValue: 50, // Jarak maju
                        duration: 1000,
                        easing: Easing.easeInOut,
                        useNativeDriver: true,
                    }),
                    Animated.timing(translateValue, {
                        toValue: 0, // Kembali ke posisi awal
                        duration: 1000,
                        easing: Easing.easeInOut,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    }, [spinValue, translateValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const translate = translateValue.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 50], // Bergerak 50 unit ke kanan (sumbu X positif)
    });

    return (
        <Animated.View
            style={{
                ...styles.box,
                transform: [
                    { rotate: spin },
                    { translateX: translate }, // Menggunakan translateX untuk bergerak horizontal
                ],
            }}>
            <Text style={{ color: "black" }}>Maju Mundur!</Text>
        </Animated.View>
    );
};

const TouchControlledView = () => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Animasi rotasi saat disentuh
                Animated.timing(rotateValue, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: translateX, dy: translateY }, // Mengupdate nilai translateX dan translateY sesuai gerakan
                ],
                { useNativeDriver: false } // Native driver untuk properti transform dengan dx/dy bisa bermasalah di beberapa kasus
            ),
            onPanResponderRelease: () => {
                // Animasi kembali tanpa rotasi saat dilepas
                Animated.timing(rotateValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            },
            onPanResponderTerminate: () => {
                // Animasi kembali tanpa rotasi jika gestur dibatalkan
                Animated.timing(rotateValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            },
        })
    ).current;

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const animatedStyle = {
        transform: [{ translateX }, { translateY }, { rotate }],
    };

    return (
        <Animated.View
            style={[styles.boxTouch, animatedStyle]}
            {...panResponder.panHandlers} // Hubungkan pan handlers ke Animated.View
        >
            <Text style={{ color: "black" }}>Seret Saya!</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    box: {
        width: 100, // Ukuran diperkecil agar terlihat pergerakannya
        height: 100,
        borderRadius: "50%",
        backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute", // Agar bisa diatur posisinya dengan transform
        top: 200, // Atur posisi awal sesuai keinginan
        left: 150, // Atur posisi awal sesuai keinginan
    },
    boxRotate: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        backgroundColor: "purple",
        justifyContent: "center",
        alignItems: "center",
    },
    boxTouch: {
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 200,
        left: 150,
    },
});
