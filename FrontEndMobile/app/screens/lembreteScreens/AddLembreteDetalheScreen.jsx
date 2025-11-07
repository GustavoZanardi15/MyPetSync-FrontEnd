import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomNav from "../../../components/lembrete/AddLembreteScreen/BottomNav";

export default function AddLembreteDetalheScreen({ route }) {
  const { tipo = "Remédios", pet = { name: "Theo" } } = route?.params || {};

  const [nomeLembrete, setNomeLembrete] = useState("");
  const [duracao, setDuracao] = useState("1 dia");
  const [horario, setHorario] = useState("07:00");
  const [quantidade, setQuantidade] = useState(1);

  const handleSalvar = () => {
    console.log({
      tipo,
      pet,
      nomeLembrete,
      duracao,
      horario,
      quantidade
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" size={26} color="#2F8B88" />
        <Text style={styles.headerTitle}>Adicionar Lembrete</Text>
      </View>

      {/* Tipo ativo */}
      <View style={styles.tipoContainer}>
        <MaterialCommunityIcons
          name={
            tipo === "Remédios"
              ? "pill"
              : tipo === "Vacinas"
              ? "needle"
              : tipo === "Exercícios"
              ? "basketball"
              : "cup-water"
          }
          size={24}
          color="#2F8B88"
        />
        <Text style={styles.tipoText}>{tipo}</Text>
      </View>

      {/* Pet */}
      <View style={styles.inputBox}>
        <Text style={styles.label}>{pet.name}</Text>
      </View>

      {/* Nome do lembrete */}
      <TextInput
        style={styles.input}
        placeholder="Nome do lembrete"
        placeholderTextColor="#999"
        value={nomeLembrete}
        onChangeText={setNomeLembrete}
      />

      {/* Duração */}
      <TouchableOpacity style={styles.inputBox}>
        <Text style={styles.label}>Duração</Text>
        <Text style={styles.value}>{duracao}</Text>
      </TouchableOpacity>

      {/* Horário */}
      <TouchableOpacity style={styles.inputBox}>
        <Text style={styles.label}>Horário</Text>
        <Text style={styles.value}>{horario}</Text>
      </TouchableOpacity>

      {/* Quantidade */}
      <View style={styles.quantContainer}>
        <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
          <MaterialCommunityIcons name="minus-circle-outline" size={28} color="#2F8B88" />
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade} Comprimido{quantidade > 1 ? "s" : ""}</Text>
        <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color="#2F8B88" />
        </TouchableOpacity>
      </View>

      {/* Botão Salvar */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
        <Text style={styles.textSalvar}>Salvar</Text>
      </TouchableOpacity>

      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9", paddingTop: 55, paddingHorizontal: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  headerTitle: { fontSize: 20, fontWeight: "600", color: "#2F8B88", marginLeft: 10 },
  tipoContainer: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  tipoText: { fontSize: 16, fontWeight: "600", color: "#2F8B88" },
  inputBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: { fontSize: 14, color: "#555" },
  value: { fontSize: 14, color: "#2F8B88", fontWeight: "500" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    fontSize: 14,
    color: "#333",
  },
  quantContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginVertical: 20,
  },
  quantidade: { fontSize: 16, fontWeight: "600", color: "#2F8B88" },
  botaoSalvar: {
    backgroundColor: "#2F8B88",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 100,
  },
  textSalvar: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
