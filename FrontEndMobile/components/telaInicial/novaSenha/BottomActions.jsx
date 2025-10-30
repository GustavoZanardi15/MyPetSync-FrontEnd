import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, ActivityIndicator } from "react-native";

export default function BottomActions({ onPress, isLoading, isDisabled }) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, isDisabled && styles.buttonDisabled]}
        onPress={onPress} 
        disabled={isDisabled} 
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Alterar senha</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === "ios" ? 30 : 20,
  },
  button: {
    backgroundColor: "#2F8B88",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 279,
    maxWidth: 327,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#A0D8D6", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});