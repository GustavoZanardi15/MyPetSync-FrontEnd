import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNav() {
    const router = useRouter();

    return (
        <View style={styles.bottomNav}>
            <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
                <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
            </Pressable>
            
            <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoPetScreen")}>
                <Image source={require("../../../assets/images/home/NavBarServico.png")} />
            </Pressable>

            <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
                <Image source={require("../../../assets/images/home/NavBarHome.png")} />
            </Pressable>

            <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
                <Image source={require("../../../assets/images/home/NavBarPet.png")} />
            </Pressable>

            <Pressable onPress={() => router.push("/screens/perfilTutorScreens/PerfilTutorScreen")}>
                <Image source={require("../../../assets/images/home/NavBarPerfilSelect.png")} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
        paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 0.3,
        borderColor: "#ccc",
        height: 70,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
    },
});