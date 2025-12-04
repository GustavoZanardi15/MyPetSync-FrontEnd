import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SaudeHeader() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#2F8B88" />
      </Pressable>

      <Text style={styles.headerTitle}>Saúde do Pet</Text>

      <View style={styles.editCircleButton} >
        <MaterialCommunityIcons name="stethoscope" size={22} color="#2F8B88" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ? StatusBar.currentHeight * 0.1 : 0 : 0,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
  },
 editCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 21,
    borderWidth: 1.6,
    borderColor: "#2F8B88",
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
}

});