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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useLocalSearchParams } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/pt-br";
import api from "../../../src/service/api";

const COLORS = {
  primary: "#2F8B88",
  secondary: "#D1E6E5",
  background: "#F9F9F9",
  text: "#333333",
  white: "#FFFFFF",
  border: "#B6D8D7",
  placeholder: "#999999",
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

  const [userInfo, setUserInfo] = useState({ email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [openPet, setOpenPet] = useState(false);
  const [openDay, setOpenDay] = useState(false);
  const [openHour, setOpenHour] = useState(false);
  const [openService, setOpenService] = useState(false);

  const [petItems, setPetItems] = useState([]);
  const [dayItems, setDayItems] = useState([]);
  const [hourItems, setHourItems] = useState([]);
  const [serviceItems, setServiceItems] = useState([]);

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
        setPetItems(
          fetchedPets.map((p) => ({
            label: p.nome,
            value: p._id,
          }))
        );

        const userResp = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserInfo({
          email: userResp.data.email || "",
          phone: userResp.data.telefone || userResp.data.phone || "",
        });

        setDayItems(
          DAYS.map((d, i) => ({
            label: DAY_LABELS[i],
            value: d.toISOString(),
          }))
        );

        setHourItems(HOURS.map((h) => ({ label: h, value: h })));

        const servicosDisponiveis =
          SERVICOS_POR_TIPO_PRESTADOR[
          Object.keys(SERVICOS_POR_TIPO_PRESTADOR).find(
            (key) =>
              key.trim().toLowerCase().replace(/\s/g, "") ===
              vet?.service?.trim().toLowerCase().replace(/\s/g, "")
          )
          ] || [];

        setServiceItems(
          servicosDisponiveis.map((s) => ({ label: s, value: s }))
        );

        setLoading(false);
      } catch (err) {
        console.log("Erro:", err);
        Alert.alert("Erro", "Não foi possível carregar os dados.");
        setLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!selectedPet || !selectedDay || !selectedHour || !selectedService) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!vet || !vet.id) {
      Alert.alert("Erro", "ID do prestador não encontrado.");
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

      await api.post("/appointments", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.replace("/screens/lembreteScreens/LembreteScreen");
    } catch (err) {
      console.error("Erro ao agendar:", err);
      Alert.alert("Erro ao agendar", err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color={COLORS.primary} />
      </Pressable>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Agendar Consulta</Text>

        {vet && (
          <View style={styles.vetInfo}>
            <FontAwesome5
              name="stethoscope"
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
        <View style={{ zIndex: 4000 }}>
          <DropDownPicker
            open={openPet}
            value={selectedPet}
            items={petItems}
            setOpen={setOpenPet}
            setValue={setSelectedPet}
            setItems={setPetItems}
            placeholder="Selecione seu pet"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ color: "#2F8B88" }}
            placeholderStyle={{ color: "#2F8B88" }}
            arrowIconStyle={{ tintColor: "#2F8B88" }}
            fontSize={16}
          />
        </View>

        <Text style={styles.label}>Selecione o dia:</Text>
        <View style={{ zIndex: 3000 }}>
          <DropDownPicker
            open={openDay}
            value={selectedDay}
            items={dayItems}
            setOpen={setOpenDay}
            setValue={setSelectedDay}
            setItems={setDayItems}
            placeholder="Selecione o dia"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ color: "#2F8B88" }}
            placeholderStyle={{ color: "#2F8B88" }}
            arrowIconStyle={{ tintColor: "#2F8B88" }}
            fontSize={16}
          />
        </View>

        <Text style={styles.label}>Selecione o horário:</Text>
        <View style={{ zIndex: 2000 }}>
          <DropDownPicker
            open={openHour}
            value={selectedHour}
            items={hourItems}
            setOpen={setOpenHour}
            setValue={setSelectedHour}
            setItems={setHourItems}
            placeholder="Selecione o horário"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ color: "#2F8B88" }}
            placeholderStyle={{ color: "#2F8B88" }}
            arrowIconStyle={{ tintColor: "#2F8B88" }}
            fontSize={16}
          />
        </View>

        <Text style={styles.label}>Motivo da consulta:</Text>
        <View style={{ zIndex: 1000 }}>
          <DropDownPicker
            open={openService}
            value={selectedService}
            items={serviceItems}
            setOpen={setOpenService}
            setValue={setSelectedService}
            setItems={setServiceItems}
            placeholder="Selecione o serviço"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            textStyle={{ color: "#2F8B88" }}
            placeholderStyle={{ color: "#2F8B88" }}
            arrowIconStyle={{ tintColor: "#2F8B88" }}
            fontSize={16}
          />
        </View>

        <Pressable
          style={[
            styles.button,
            (!selectedPet ||
              !selectedDay ||
              !selectedHour ||
              !selectedService) &&
            styles.buttonDisabled,
            isSubmitting && { opacity: 0.7 },
          ]}
          onPress={handleSubmit}
          disabled={
            !selectedPet ||
            !selectedDay ||
            !selectedHour ||
            !selectedService ||
            isSubmitting
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
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flexGrow: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? StatusBar.currentHeight + 20 : 60,
    left: 20,
    zIndex: 5000,
    borderRadius: 50,
    padding: 6,
    elevation: 5,
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
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  vetName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  vetEspecialidade: {
    fontSize: 14,
    color: COLORS.text,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 15,
  },
  dropdown: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    borderRadius: 14,
  },
  dropdownContainer: {
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 30,
  },
  buttonDisabled: {
    backgroundColor: "#AAAAAA",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
