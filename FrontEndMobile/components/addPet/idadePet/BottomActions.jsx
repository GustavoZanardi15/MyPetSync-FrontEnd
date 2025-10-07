import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function BottomActions() {
  const router = useRouter();

  return (
    <View style={styles.bottomContainer}>
      <Pressable style={styles.button} onPress={() => router.push("/addPetScreens/FotoPetScreen")}>
        <Text style={styles.buttonText}>Próximo</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/addPetScreens/FotoPetScreen")}>
        <Text style={styles.skipText}>Não tenho certeza</Text>
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
