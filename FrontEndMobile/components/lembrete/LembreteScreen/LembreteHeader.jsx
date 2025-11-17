import React from "react";
import { View, Text, StyleSheet } from "react-native";
export default function LembretesHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Lembretes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    flex: 1,
  }
});
