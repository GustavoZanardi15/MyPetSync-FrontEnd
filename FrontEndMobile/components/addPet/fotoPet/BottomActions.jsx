import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BottomActions() {

  return (
    <View style={styles.bottomContainer}>
      <Pressable style={styles.button} onPress={() => router.push("/screens/addPetScreens/FotoAddPetScreen")}>
        <Text style={styles.buttonText}>Próximo</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/screens/addPetScreens/FinalPetScreen")}>
        <Text style={styles.skipText}>Não quero adicionar foto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#2F8B88",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  skipText: {
    marginTop: 12,
    color: "#87CEEB",
    fontSize: 14,
  },
});
