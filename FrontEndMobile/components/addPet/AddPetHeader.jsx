import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddPetHeader() {
  const router = useRouter();

  return (
    <View style={headerStyles.header}>
      <Pressable onPress={() => router.back()} style={headerStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
      </Pressable>
      <Text style={headerStyles.stepText}>Cadastro de Pet</Text>
      <View style={{ width: 24 }} /> 
      
      <View style={headerStyles.progressBar}>
        <View style={headerStyles.progress} />
      </View>
    </View>
  );
}

const headerStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20, 
    paddingTop: 60, 
  },
  backButton: {
    padding: 5,
  },
  stepText: {
    fontSize: 18,
    color: "#2F8B88",
    fontWeight: "bold",
  },
  progressBar: {
    position: 'absolute',
    bottom: -10, 
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
    marginHorizontal: 20, 
  },
  progress: {
    height: 4,
    backgroundColor: "#89CFF0",
    width: "100%", 
  },
});