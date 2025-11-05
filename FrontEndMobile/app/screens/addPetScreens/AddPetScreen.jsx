import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert, Animated } from "react-native";
import { useRouter } from "expo-router";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";
import AddPetHeader from "../../../components/addPet/AddPetHeader";
import PetForm from "../../../components/addPet/PetForm";
import SelectionModal from "../../../components/addPet/SelectionModal";

const VALID_GENEROS = ["Macho", "Fêmea"];
const PET_ASSETS = {
  Cachorro: require("../../../assets/images/addPet/Dog.png"),
  Gato: require("../../../assets/images/addPet/Cat.png"),
};

const BACKGROUND_COLORS = [
  "#A9E4D4",
  "#B0C4DE",
  "#FFC0CB",
  "#F0E68C",
  "#ADD8E6",
  "#FAFAD2",
  "#DDA0DD",
];

const getRandomColor = () =>
  BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)];

export default function AddPetScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [fotoUri, setFotoUri] = useState(null);
  const [castrado, setCastrado] = useState(false);
  const [condicoesEspeciais, setCondicoesEspeciais] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [modalGeneroVisible, setModalGeneroVisible] = useState(false);
  const [petPhoto, setPetPhoto] = useState(null);

  const handleSelectEspecie = (selectedEspecie) => {
    setEspecie(selectedEspecie);
    setPetPhoto(PET_ASSETS[selectedEspecie]);
    setBackgroundColor(getRandomColor());
  };

  const handleSalvar = async () => {
    if (!nome || !especie || !genero || !idade) {
      Alert.alert("Erro", "Por favor, preencha nome, espécie, gênero e idade.");
      return;
    }

    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Erro", "Usuário não autenticado.");
        setIsLoading(false);
        return;
      }

      const petData = {
        nome: nome.trim(),
        especie, 
        raca: raca.trim(),
        genero, 
        idade: Number(idade),
        castrado: Boolean(castrado),
        condicoes_especiais: condicoesEspeciais
          ? condicoesEspeciais
              .split(",")
              .map((c) => c.trim())
              .filter((c) => c.length > 0)
          : [],
      };

      console.log("📤 Enviando petData:", JSON.stringify(petData, null, 2));

      const response = await api.post("/pets", petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("✅ Pet cadastrado:", response.data);
      Alert.alert("Sucesso", `${nome} foi salvo com sucesso!`);
      router.back();
    } catch (error) {
      console.error("❌ Erro ao salvar pet:", error.response?.data || error);

      const messages = Array.isArray(error.response?.data?.message)
        ? error.response.data.message.join("\n")
        : error.response?.data?.message ||
          "Não foi possível salvar o pet. Tente novamente.";

      Alert.alert("Erro", messages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AddPetHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.cardContainer}>
          <Animated.View
            style={[
              styles.photoCard,
              { backgroundColor: backgroundColor, transform: [{ scale: scaleAnim }] },
            ]}
          >
            {fotoUri ? (
              <Image source={{ uri: fotoUri }} style={styles.petPhoto} />
            ) : petPhoto ? (
              <Image source={petPhoto} style={styles.petPhoto} />
            ) : (
              <>
                <Feather
                  name="plus-square"
                  size={80}
                  color="#343434"
                  style={{ opacity: 0.6 }}
                />
                <Text style={styles.placeholderText}>Selecione a espécie</Text>
              </>
            )}
          </Animated.View>
        </View>

        <PetForm
          nome={nome}
          setNome={setNome}
          especie={especie}
          setEspecie={handleSelectEspecie}
          raca={raca}
          setRaca={setRaca}
          genero={genero}
          setGenero={setGenero}
          idade={idade}
          setIdade={setIdade}
          castrado={castrado}
          setCastrado={setCastrado}
          condicoesEspeciais={condicoesEspeciais}
          setCondicoesEspeciais={setCondicoesEspeciais}
          handleSalvar={handleSalvar}
          isLoading={isLoading}
          setFotoUri={setFotoUri}
        />
      </ScrollView>

      <SelectionModal
        isVisible={modalGeneroVisible}
        onClose={() => setModalGeneroVisible(false)}
        title="Selecione o gênero"
        data={VALID_GENEROS}
        onSelect={setGenero}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  photoCard: {
    width: 250,
    height: 250,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  petPhoto: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    color: "#343434",
  },
});
