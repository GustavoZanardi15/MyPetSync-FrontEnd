import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FiltroVet({ onSelecionar }) {
  const [filtroAberto, setFiltroAberto] = useState(false);
  const [filtroSelecionado, setFiltroSelecionado] = useState(null);

  const especialidades = ["Empresa", "Autônomo"];

  const especialidadeMap = {
    Empresa: ["Clínica Veterinária", "Pet Shop", "Hotel para Pets", "Banho & Tosa"],
    Autônomo: ["Pet Sistter", "Veterinário Autônomo", "Adestrador"],
  };

  const handleSelecionar = (esp) => {
    const selecionado = filtroSelecionado === esp ? null : esp;
    setFiltroSelecionado(selecionado);
    setFiltroAberto(false);

    if (onSelecionar) {
      onSelecionar(selecionado, especialidadeMap[selecionado]);
    }
  };

  return (
    <View>
      <Pressable
        style={styles.filterButton}
        onPress={() => setFiltroAberto(!filtroAberto)}
      >
        <MaterialCommunityIcons name="filter-outline" size={26} color="#2F8B88" />
      </Pressable>

      {filtroAberto && (
        <View style={styles.filterDropdown}>
          {especialidades.map((esp) => (
            <Pressable
              key={esp}
              style={[
                styles.filterTag,
                filtroSelecionado === esp && styles.filterTagSelected,
              ]}
              onPress={() => handleSelecionar(esp)}
            >
              <Text
                style={[
                  styles.filterText,
                  filtroSelecionado === esp && styles.filterTextSelected,
                ]}
              >
                {esp}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterButton: {
    padding: 3,
    alignSelf: "flex-end",
    marginRight: 16,
    width: 36,
    height: 36,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#CCCCCC",
    backgroundColor: "#F9F9F9",
    shadowColor: "#2F8B88",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  filterDropdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  filterTag: {
    borderColor: "#2F8B88",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
  },
  filterTagSelected: {
    backgroundColor: "#2F8B88",
  },
  filterText: {
    color: "#2F8B88",
    fontSize: 13,
  },
  filterTextSelected: {
    color: "#fff",
  },
});
