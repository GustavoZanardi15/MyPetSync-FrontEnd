import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AvatarLetra({ nome }) {
  const letra = nome?.charAt(0)?.toUpperCase() || "?";

  return (
    <View style={styles.avatar}>
      <Text style={styles.letra}>{letra}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#2F8B88",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },

  letra: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "700",
  },
});
