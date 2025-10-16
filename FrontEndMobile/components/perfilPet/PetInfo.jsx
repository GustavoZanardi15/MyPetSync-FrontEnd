import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PetInfo({ label, value }) {
  return (
    <View style={styles.infoFieldContainer}>
      <Text style={styles.infoFieldLabel}>{label}</Text>
      <Text
        style={[
          styles.infoFieldValue,
          (value.trim() === "" || value.trim() === " ") && styles.infoFieldValueEmpty,
        ]}
      >
        {value.trim() === "" || value.trim() === " " ? label : value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoFieldContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 9.5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoFieldLabel: {
    fontSize: 12,
    color: "#A9A9A9",
    fontWeight: "500",
    marginBottom: 2,
  },
  infoFieldValue: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "600",
  },
  infoFieldValueEmpty: {
    color: "#A9A9A9",
    fontWeight: "500",
  },
});
