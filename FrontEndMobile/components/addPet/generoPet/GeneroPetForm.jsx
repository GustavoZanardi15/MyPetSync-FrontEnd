import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function GeneroPetForm({ generoSelecionado, setGeneroSelecionado }) {
  return (
    <View style={styles.container}>

      <View style={styles.genderContainer}>
        <Pressable style={[styles.genderButton, generoSelecionado === "macho" && styles.selectedButton]}
          onPress={() => setGeneroSelecionado("macho")}
        >
          <Ionicons name="male" size={40} color={generoSelecionado === "macho" ? "#2F8B88" : "#2F8B88"}/>
        </Pressable>

        <Pressable style={[styles.genderButton, generoSelecionado === "femea" && styles.selectedButton]}
          onPress={() => setGeneroSelecionado("femea")}
        >
          <Ionicons name="female" size={40} color={generoSelecionado === "femea" ? "#2F8B88" : "#2F8B88"}/>
        </Pressable>
      </View>

      <Pressable onPress={() => {router.push("/screens/addPetScreens/CastradoPetScreen")}}>
        <Text style={styles.skipText} >Prefiro não informar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 40
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2F8B88",
    marginBottom: 30,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  genderButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#2F8B88",
  },
  selectedButton: {
    backgroundColor: "#C8E7E6",
    borderColor: "#2F8B88",
    width: 86,
    height: 86,
  },
  skipText: {
    marginTop: 20,
    color: "#89CFF0",
    fontSize: 15,
    fontWeight: "regular"
  },
});
