import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const tiposLembrete = [
  { name: "Remédios", icon: "pill", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Vacinas", icon: "needle", iconColor: "#2F8B88", iconBg: "#DFD4FB" },
  { name: "Exercícios", icon: "basketball", iconColor: "#2F8B88", iconBg: "#A8E6CF" },
  { name: "Água", icon: "cup-water", iconColor: "#2F8B88", iconBg: "#FFD97D" }
];

export default function TiposLembrete({ selectedTipo, setSelectedTipo }) {
  return (
    <View style={styles.container}>
      {tiposLembrete.map(tipo => {
        const isSelected = selectedTipo === tipo.name;
        return (
          <Pressable key={tipo.name} style={styles.wrapper} onPress={() => setSelectedTipo(tipo.name)}>
            <View style={[styles.button, { backgroundColor: tipo.iconBg }, isSelected && styles.buttonSelected]}>
              <MaterialCommunityIcons name={tipo.icon} size={40} color={tipo.iconColor} />
            </View>
            <Text style={[styles.text, { color: tipo.iconColor }, isSelected && styles.textSelected]}>
              {tipo.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24
  },
  wrapper: {
    alignItems: "center"
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#E6F5F0"
  },
  buttonSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0"
  },
  text: {
    fontSize: 15,
    marginTop: 6,
    textAlign: "center",
    color: "#2F8B88"
  },
  textSelected: {
    fontWeight: "bold"
  }
});
