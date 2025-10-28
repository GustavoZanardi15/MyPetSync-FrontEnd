import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function SelectMonth({ dataAtual, mudarMes }) {
  const mesAtualTexto = dataAtual.toLocaleString("pt-BR", { month: "long" });

  return (
    <View style={styles.monthNav}>
      <Pressable onPress={() => mudarMes(-1)} style={styles.arrowBtn}>
        <MaterialCommunityIcons name="chevron-left" size={24} color="#2F8B88" />
      </Pressable>

      <Text style={styles.monthText}>
        {mesAtualTexto.charAt(0).toUpperCase() + mesAtualTexto.slice(1)} {dataAtual.getFullYear()}
      </Text>

      <Pressable onPress={() => mudarMes(1)} style={styles.arrowBtn}>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#2F8B88" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  monthNav: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  arrowBtn: {
    padding: 5,
  },
  monthText: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "600",
    marginHorizontal: 8,
    textTransform: "capitalize",
  },
});
