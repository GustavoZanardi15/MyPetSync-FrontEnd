import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BottomNav() {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
                <Image source={require("../../../assets/images/home/NavBarCalendarSelect.png")} />
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
            <Pressable>
                <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    }
});
