import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BottomActions() {

  return (
    <View >
      <Pressable style={styles.button} onPress={() => router.push("/screens/addPetScreens/FotoPetScreen")}>
        <Text style={styles.buttonText}>Próximo</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/screens/addPetScreens/FotoPetScreen")}>
        <Text style={styles.skipText}>Não tenho certeza</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2F8B88",
    height: 56,
    width: 276,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  skipText: {
    fontSize: 15,
    fontWeight: "regular",
    color: "#89CFF0",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15
  }
});
