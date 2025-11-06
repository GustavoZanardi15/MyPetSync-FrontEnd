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
        <Image source={require("../../../assets/images/home/NavBarPetSelect.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/screens/perfilTutorScreens/PerfilTutorScreen")}>
        <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
