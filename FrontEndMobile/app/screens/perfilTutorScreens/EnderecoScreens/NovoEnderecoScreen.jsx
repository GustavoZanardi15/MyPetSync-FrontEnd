import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, Pressable, TextInput, Image, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../src/service/api";

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoCapitalize = "sentences",
  required = false,
  onBlur,
  editable = true,
}) => (
  <View style={styles.inputGroup}>
    <Text style={styles.inputLabel}>
      {label}
      {required && <Text style={{ color: "red" }}> *</Text>}
    </Text>
    <TextInput
      style={[styles.input, !editable && { backgroundColor: "#EEEEEE" }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="#A9A9A9"
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      onBlur={onBlur}
      editable={editable}
    />
  </View>
);

export default function NovoEnderecoScreen() {
  const router = useRouter();
  const [cep, setCep] = useState("");
  const [label, setLabel] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buscarCEP = async () => {
    const cepLimpo = cep.replace(/[^0-9]/g, "");
    if (cepLimpo.length !== 8) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado. Digite manualmente.");
      } else {
        setStreet(data.logradouro || "");
        setCity(data.localidade || "");
        setState(data.uf || "");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      Alert.alert("Erro", "Falha ao consultar o CEP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSalvarEndereco = async () => {
    if (!street || !city || !state || !cep) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    setIsLoading(true);
    try {
      const token =
        (await AsyncStorage.getItem("access-token")) ||
        (await AsyncStorage.getItem("userToken"));

      if (!token) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        router.replace("/screens/loginScreens/LoginScreen");
        return;
      }

      const res = await api.get("/tutors/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tutor = res.data;

      const enderecoData = {
        label: label || "Endereço",
        street,
        city,
        state,
        zip: cep.replace(/[^0-9]/g, ""),
      };

      const updatedAddresses = [...(tutor?.addresses || []), enderecoData];

      await api.put(
  "/tutors/mine",
  { addresses: updatedAddresses },
  { headers: { Authorization: `Bearer ${token}` } }
);

      Alert.alert("Sucesso", "Endereço adicionado com sucesso!");
      router.replace("/screens/perfilTutorScreens/EnderecoScreens/EnderecoScreen");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error.response?.data || error.message);
      Alert.alert(
        "Erro",
        error.response?.data?.message || "Não foi possível salvar o endereço."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.screen,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Pressable onPress={() => router.replace("/screens/perfilTutorScreens/PerfilTutorScreen")} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={"#2F8B88"} />
          </Pressable>
          <Text style={styles.headerTitle}>Adicionar Endereço</Text>
          <View style={{ width: 24, height: 24 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <FormInput
              label="Rótulo "
              value={label}
              onChangeText={setLabel}
              placeholder="Ex: Casa, Trabalho..."
              editable={!isLoading}
            />

            <FormInput
              label="CEP"
              value={cep}
              onChangeText={(text) => {
                let formatted = text.replace(/[^0-9]/g, "");
                if (formatted.length > 5)
                  formatted = formatted.slice(0, 5) + "-" + formatted.slice(5, 8);
                setCep(formatted);
              }}
              placeholder="Ex: 00000-000"
              keyboardType="numeric"
              required
              onBlur={buscarCEP}
              editable={!isLoading}
            />

            <FormInput
              label="Rua/Avenida, Número"
              value={street}
              onChangeText={setStreet}
              placeholder="Ex: Avenida Guedner, 190"
              required
              editable={!isLoading}
            />
            <FormInput
              label="Cidade"
              value={city}
              onChangeText={setCity}
              placeholder="Ex: São Paulo"
              required
              editable={!isLoading}
            />
            <FormInput
              label="Estado"
              value={state}
              onChangeText={(t) => setState(t.toUpperCase())}
              placeholder="Ex: SP"
              required
              editable={!isLoading}
            />

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && { opacity: 0.8 },
              ]}
              onPress={handleSalvarEndereco}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.saveButtonText}>SALVAR</Text>
              )}
            </Pressable>
          </View>

          <View style={{ height: 120 }} />
        </ScrollView>
      </View>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => router.push("/screens/lembreteScreens/LembreteScreen")}>
          <Image source={require("../../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/servicoScreens/ServicoPetScreen")}>
          <Image source={require("../../../../assets/images/home/NavBarServico.png")} />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/homeScreens/HomeScreen")}>
          <Image source={require("../../../../assets/images/home/NavBarHome.png")} />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/perfilPetScreens/PerfilPetScreen")}>
          <Image source={require("../../../../assets/images/home/NavBarPet.png")} />
        </Pressable>

        <Pressable onPress={() => router.push("/screens/perfilTutorScreens/PerfilTutorScreen")}>
          <Image source={require("../../../../assets/images/home/NavBarPerfilSelect.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
    elevation: 3,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 40,
    backgroundColor: "#F7F7F7",
  },
  backBtn: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88"
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  form: {
    gap: 16
  },
  inputGroup: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2F8B88",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#2A2A2A",
  },
  saveButton: {
    backgroundColor: "#2F8B88",
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 30,
    width: "80%",
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    height: 70,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  }
});