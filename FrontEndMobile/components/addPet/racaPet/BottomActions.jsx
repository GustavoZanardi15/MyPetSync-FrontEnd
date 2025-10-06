import React from "react";
import { router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function BottomActions({ }) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={() => {router.push("/screens/addPetScreens/GeneroPetScreen")}}>
        <Text style={styles.buttonText}>Próximo</Text>
      </Pressable>
      <Text style={styles.secondaryText} onPress={() => {router.push("/screens/addPetScreens/GeneroPetScreen")}}>Não sei!</Text>
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
    height: 56,
    width: 276,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center"
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
