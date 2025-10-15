import React from "react";
import { View, Text, Pressable, StyleSheet, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NotificacaoHeader( ) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={"#2F8B88"} />
      </Pressable>
      <Text style={styles.headerTitle}>Notificações</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    paddingBottom: 25,
    paddingHorizontal: 20,
    position: "relative",
    zIndex: 10,
    backgroundColor: "#F9F9F9",
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
  },
  backButton: {
    position: "absolute",
    left: 20,
    paddingVertical: 10,
    paddingRight: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
  },
});
