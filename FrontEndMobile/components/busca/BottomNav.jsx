import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomNav() {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <Pressable onPress={() => router.push()}>
        <Image source={require("../../assets/images/home/NavBarCalendar.png")} />
      </Pressable>
      <Pressable onPress={() => router.push()}>
        <Image source={require("../../assets/images/home/NavBarServico.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/screens/home/HomeScreen")}>
        <Image source={require("../../assets/images/home/NavBarHome.png")} />
      </Pressable>
      <Pressable onPress={() => router.push()}>
        <Image source={require("../../assets/images/home/NavBarPet.png")} />
      </Pressable>
      <Pressable onPress={() => router.push()}>
        <Image source={require("../../assets/images/home/NavBarPerfil.png")} />
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
  },
});
