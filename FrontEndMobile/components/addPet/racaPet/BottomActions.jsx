import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function BottomActions({ onNext }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>Próximo</Text>
      </Pressable>
      <Text style={styles.secondaryText}>Não sei!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#2F8B88",
    paddingVertical: 14,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    marginTop: 10,
    color: "#89CFF0",
    fontSize: 15,
    fontWeight: "regular"
  },
});
