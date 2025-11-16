import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  StatusBar,
  Platform,
  ActivityIndicator,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";
import api from "../../../src/service/api";

const COLORS = {
  primary: "#2F8B88",
  secondary: "#D1E6E5",
  background: "#F9F9F9",
  text: "#333333",
  white: "#FFFFFF",
};

const HOURS = Array.from(
  { length: 11 },
  (_, i) => `${(i + 8).toString().padStart(2, "0")}:00`
);

const DAYS = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return d;
});
const DAY_LABELS = DAYS.map((d) =>
  moment(d).locale("pt-br").format("ddd, DD/MM")
);

export const SERVICOS_POR_TIPO_PRESTADOR = {
  "Pet Sitter": ["Cuidados Domiciliares", "Passeio"],
  "Pet Sistter": ["Cuidados Domiciliares", "Passeio"],
  "Veterinário Autônomo": ["Consulta", "Vacinação", "Exames"],
  Adestrador: ["Adestramento Básico", "Adestramento Avançado"],
  "Clínica Veterinária": ["Consulta", "Vacinação", "Cirurgia", "Exames"],
  "Pet Shop": ["Banho", "Tosa", "Banho e Tosa"],
  "Hotel para Pets": ["Hospedagem", "Diária"],
  "Banho e Tosa": ["Banho", "Tosa", "Banho e Tosa"],
};

export default function ServicoConsultaScreen() {
  const router = useRouter();
  const { vet: vetJson } = useLocalSearchParams();
  const vet = vetJson ? JSON.parse(vetJson) : null;

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) throw new Error("Usuário não autenticado");

        const petsResp = await api.get("/pets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedPets = Array.isArray(petsResp.data)
          ? petsResp.data
          : petsResp.data.items || [];
        setPets(fetchedPets);
        const userResp = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserInfo({
          email: userResp.data.email || "",
          phone: userResp.data.telefone || userResp.data.phone || "",
        });

        setLoading(false);
      } catch (err) {
        console.error(
          "Erro ao carregar dados:",
          err.response?.data || err.message
        );
        Alert.alert(
          "Erro",
          "Não foi possível carregar pets ou dados do usuário."
        );
        setLoading(false);
      }
    })();
  }, []);
  const servicosDisponiveis = (() => {
    if (!vet || !vet.service) return [];
    const serviceKeyReceivedNormalized = vet.service
      .trim()
      .toLowerCase()
      .replace(/\s/g, "");

    const foundKey = Object.keys(SERVICOS_POR_TIPO_PRESTADOR).find((key) => {
      const mappedKeyNormalized = key.trim().toLowerCase().replace(/\s/g, "");
      return mappedKeyNormalized === serviceKeyReceivedNormalized;
    });

    if (foundKey) {
      return SERVICOS_POR_TIPO_PRESTADOR[foundKey];
    }
    return [];
  })();

  const handleSubmit = async () => {
    if (!selectedPet || !selectedDay || !selectedHour || !selectedService) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!vet || !vet.id) {
      Alert.alert(
        "Erro",
        "ID do prestador não encontrado. Tente voltar e selecionar novamente."
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) throw new Error("Usuário não autenticado");

      const [hour, minute] = selectedHour.split(":");
      const appointmentDate = new Date(selectedDay);
      appointmentDate.setHours(Number(hour), Number(minute), 0, 0);

      const payload = {
        provider: vet.id,
        service: vet.id,
        pet: selectedPet,
        dateTime: appointmentDate.toISOString(),
        duration: 60,
        reason: selectedService,
        email: userInfo.email,
        phone: userInfo.phone,
        status: "scheduled",
      };

      const response = await api.post("/appointments", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert("Sucesso", "Consulta agendada com sucesso!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (err) {
      console.error("Erro ao agendar:", err.response?.data || err.message);
      const apiMessage = err.response?.data?.message;
      const errorMessage = apiMessage
        ? Array.isArray(apiMessage)
          ? `Erros de Validação: ${apiMessage.join(", ")}`
          : apiMessage
        : err.message || "Erro de rede desconhecido.";
      Alert.alert("Erro ao agendar", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
      </Pressable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agendar Consulta</Text>
        {vet && (
          <View style={styles.vetInfo}>
            <Ionicons
              name="medkit-outline"
              size={24}
              color={COLORS.primary}
              style={{ marginRight: 10 }}
            />
            <View>
              <Text style={styles.vetName}>
                {vet.nome} {vet.service ? `- ${vet.service}` : ""}
              </Text>
              <Text style={styles.vetEspecialidade}>
                {vet.type === "empresa" ? "Empresa" : "Profissional Autônomo"}
              </Text>
            </View>
          </View>
        )}
        <Text style={styles.label}>Selecione o pet:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedPet} onValueChange={setSelectedPet}>
            <Picker.Item label="Selecione seu pet" value={null} />
            {pets.map((p) => (
              <Picker.Item key={p._id} label={p.nome} value={p._id} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Selecione o dia:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedDay} onValueChange={setSelectedDay}>
            <Picker.Item label="Selecione o dia" value={null} />
            {DAYS.map((d, i) => (
              <Picker.Item
                key={d.toISOString()}
                label={DAY_LABELS[i]}
                value={d.toISOString()}
              />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Selecione o horário:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={selectedHour} onValueChange={setSelectedHour}>
            <Picker.Item label="Selecione o horário" value={null} />
            {HOURS.map((h) => (
              <Picker.Item key={h} label={h} value={h} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Motivo da consulta:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedService}
            onValueChange={setSelectedService}
          >
            <Picker.Item label="Selecione o serviço" value={null} />
            {servicosDisponiveis.map((service) => (
              <Picker.Item key={service} label={service} value={service} />
            ))}
          </Picker>
        </View>
        <Pressable
          style={[styles.button, isSubmitting && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={
            isSubmitting ||
            !selectedPet ||
            !selectedDay ||
            !selectedHour ||
            !selectedService
          }
        >
          {isSubmitting ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Confirmar Consulta</Text>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    left: 20,
    zIndex: 10,
    backgroundColor: COLORS.white,
    borderRadius: 50,
    padding: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 30,
  },
  vetInfo: {
    flexDirection: "row",
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  vetName: { fontSize: 18, fontWeight: "600", color: COLORS.primary },
  vetEspecialidade: { fontSize: 14, color: COLORS.text },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 15,
  },
  pickerContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    marginBottom: 15,
    height: 55,
    justifyContent: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#C0C0C0",
    color: COLORS.text,
    height: 55,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: COLORS.white, fontWeight: "bold", fontSize: 18 },
});
