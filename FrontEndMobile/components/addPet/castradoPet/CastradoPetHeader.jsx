import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Pressable, Text, StyleSheet } from "react-native";

export default function CastradoPetHeader() {
  const router = useRouter();

  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2F8B88" />
        </Pressable>
        <Text style={styles.stepText}>5/7</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  stepText: {
    fontSize: 18,
    color: "#2F8B88",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    marginBottom: 30,
    overflow: "hidden",
  },
  progress: {
    height: 4,
    backgroundColor: "#89CFF0",
    width: "71.4%", 
  },
});
