import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import PetDropdown from "../../../components/lembrete/AddLembreteScreen/PetDropdown";
import TiposLembrete from "../../../components/lembrete/AddLembreteScreen/TiposLembretes";

const BRAND = "#2F8B88";
const BG = "#F6F8F8";
const CARD = "#FFFFFF";

const tiposLembrete = [
  { name: "Remédios", icon: "pill", iconColor: BRAND, iconBg: "#D9F5EE" },
  { name: "Vacinas", icon: "needle", iconColor: BRAND, iconBg: "#EDE6FB" },
  { name: "Exercícios", icon: "dumbbell", iconColor: BRAND, iconBg: "#D9F5EE" },
  { name: "Água", icon: "cup-water", iconColor: BRAND, iconBg: "#FFE6A9" },
];

export default function EditLembreteScreen() {
  const { id } = useLocalSearchParams();
  const isEdit = true;

  const [selectedTipo, setSelectedTipo] = useState("Remédios");
  const [selectedPet, setSelectedPet] = useState(null);
  const [nome, setNome] = useState("");
  const [duracao, setDuracao] = useState("2 dias");
  const [hora, setHora] = useState("09:30");
  const [quantidade, setQuantidade] = useState(3);
  const unidade = "Comprimidos";

  function onSalvar() {
    if (!selectedPet) return Alert.alert("Selecione o Pet");
    if (!nome.trim()) return Alert.alert("Informe o nome do lembrete");
    const payload = { id: id ?? `rem-${Date.now()}`, tipo: selectedTipo, pet: selectedPet, nome, duracao, hora, quantidade, unidade };
    Alert.alert("Lembrete salvo", JSON.stringify(payload, null, 2));
    router.replace("/screens/lembreteScreens/LembreteScreen");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={26} color={BRAND} />
        </Pressable>
        <Text style={styles.title}>Editar Lembrete</Text>
        <View style={{ width: 26 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <TiposLembrete tipos={tiposLembrete} selectedTipo={selectedTipo} setSelectedTipo={setSelectedTipo} />

        <View style={styles.cardShadow}>
          <PetDropdown selectedPet={selectedPet} setSelectedPet={setSelectedPet} />
        </View>

        <View style={styles.cardShadow}>
          <TextInput
            style={styles.input}
            placeholder="Nome do lembrete"
            placeholderTextColor="#9AA5AE"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <Pressable style={styles.listItem} onPress={() => Alert.alert("Duração", "Abrir seletor de duração (mock).")}>
          <View>
            <Text style={styles.label}>Duração</Text>
            <Text style={styles.value}>{duracao}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BRAND} />
        </Pressable>

        <Pressable style={styles.listItem} onPress={() => Alert.alert("Horário", "Abrir seletor de horário (mock).")}>
          <View>
            <Text style={styles.label}>Horário</Text>
            <Text style={styles.value}>{hora}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={BRAND} />
        </Pressable>

        <View style={{ gap: 8 }}>
          <Text style={styles.label}>Quantidade</Text>
          <View style={styles.qtyRow}>
            <Pressable style={styles.circleBtn} onPress={() => setQuantidade((q) => Math.max(0, q - 1))}>
              <Ionicons name="remove" size={22} color={BRAND} />
            </Pressable>
            <Text style={styles.qtyText}>
              {quantidade} <Text style={{ fontWeight: "600" }}>{unidade}</Text>
            </Text>
            <Pressable style={styles.circleBtn} onPress={() => setQuantidade((q) => q + 1)}>
              <Ionicons name="add" size={22} color={BRAND} />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.saveBtn} onPress={onSalvar}>
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  title: { color: BRAND, fontSize: 22, fontWeight: "800" },
  scroll: { paddingHorizontal: 16, paddingBottom: 24, gap: 14 },
  cardShadow: {
    backgroundColor: CARD,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  input: { height: 48, color: "#2B3338" },
  listItem: {
    backgroundColor: CARD,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: { color: "#8796A1", fontSize: 13 },
  value: { color: BRAND, fontSize: 18, fontWeight: "700" },
  qtyRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  circleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: "#CBD5D8",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  qtyText: { color: BRAND, fontSize: 22, fontWeight: "800" },
  saveBtn: {
    backgroundColor: BRAND,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  saveText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
});
