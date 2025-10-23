import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function ServicoHeader({ }) {
  return (
    <View style={styles.header}>
      <View style={{ width: 40 }} />
      <Text style={styles.headerTitle}>Pet Serviços</Text>

      <View style={styles.editCircleButton}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")}/>
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
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
  },
  editCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    right: 20,
    borderColor: "#CCCCCC",
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2F8B88",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
});
