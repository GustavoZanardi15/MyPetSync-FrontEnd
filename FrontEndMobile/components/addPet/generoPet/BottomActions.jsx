import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function BottomActions() {

  return (
          <Pressable style={styles.button} onPress={() => {router.push("/screens/addPetScreens/CastradoPetScreen")}}>
            <Text style={styles.buttonText}>Próximo</Text>
          </Pressable>
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
    alignSelf: "center",
    marginBottom: 30
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600"
  }
})