import { router } from "expo-router";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function CastradoPetForm({ castrado, setCastrado }) {
  return (
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <Pressable style={[styles.genderButton, castrado === "sim" && styles.selectedButton]}
          onPress={() => setCastrado("sim")}
        >
          <Text style={[styles.optionText, castrado === "sim"]}> Sim </Text>
        </Pressable>

        <Pressable style={[styles.genderButton, castrado === "nao" && styles.selectedButton]}
          onPress={() => setCastrado("nao")}
        >
          <Text style={[styles.optionText, castrado === "nao" ]}> Não </Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  genderButton: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#CCCCCC",

  },
  selectedButton: {
    backgroundColor: "#C8E7E6",
    borderColor: "#89CFF0",
    width: 86,
    height: 86,
    borderWidth: 2,
    padding: 2
  },
  optionText: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "500",
  },
  skipText: {
    color: "#89CFF0",
    marginTop: 10,
  },
});
