import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, Pressable, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../../src/service/api";
import NovoEnderecoHeader from "../../../../components/tutor/novoEnderecoTutor/NovoEnderecoHeader";
import FormInput from "../../../../components/tutor/novoEnderecoTutor/FormInput";
import BottomNav from "../../../../components/tutor/enderecoTutor/BottomNav";

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

      const enderecoData = {
        label: label || "Endereço",
        street,
        city,
        state,
        zip: cep.replace(/[^0-9]/g, ""),
      };

      await api.post("/tutors/mine/addresses", enderecoData, {
        headers: { Authorization: `Bearer ${token}` },
      });

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
    <View style={[styles.screen, { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }]}>
      <View style={styles.contentContainer}>
        <NovoEnderecoHeader />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <FormInput
              label="Local"
              value={label}
              onChangeText={setLabel}
              placeholder="Casa, Trabalho..."
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
              placeholder="00000-000"
              keyboardType="numeric"
              required
              onBlur={buscarCEP}
              editable={!isLoading}
            />

            <FormInput
              label="Rua/Avenida"
              value={street}
              onChangeText={setStreet}
              placeholder="Rua exemplo"
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
              placeholder="SP"
              required
              editable={!isLoading}
            />

            <Pressable style={({ pressed }) => [styles.saveButton, pressed && { opacity: 0.8 }]}
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

      <BottomNav />
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  form: {
    gap: 16
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
  }
});