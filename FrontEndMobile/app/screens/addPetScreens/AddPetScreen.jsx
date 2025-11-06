import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert, Animated } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../src/service/api";
import AddPetHeader from "../../../components/addPet/AddPetHeader";
import PetForm from "../../../components/addPet/PetForm";
import SelectionModal from "../../../components/addPet/SelectionModal";
import PlaceholderFotoCard from "../../../components/addPet/PlaceholderFotoCard";

const VALID_GENEROS = ["Macho", "Fêmea"];
const PET_ASSETS = {
  Cachorro: require("../../../assets/images/addPet/Dog.png"),
  Gato: require("../../../assets/images/addPet/Cat.png"),
};
const PHOTO_FALLBACK_COLOR = "#A9E4D4"; 


export default function AddPetScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [especie, setEspecie] = useState("");
  const [raca, setRaca] = useState("");
  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState(""); 
  const [fotoUri, setFotoUri] = useState(null); 
  const [castrado, setCastrado] = useState(false);
  const [condicoesEspeciais, setCondicoesEspeciais] = useState("");
  const [modalGeneroVisible, setModalGeneroVisible] = useState(false);
  const [petPhoto, setPetPhoto] = useState(null); 

  const handleSelectEspecie = (selectedEspecie) => {
    setEspecie(selectedEspecie);
    setPetPhoto(PET_ASSETS[selectedEspecie]);
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
      
      const specialConditionsArray = condicoesEspeciais
        ? condicoesEspeciais
          .split(",")
          .map((c) => c.trim())
          .filter((c) => c.length > 0)
        : [];

      const photoToSend = fotoUri || petPhoto ? fotoUri : undefined;

      const petData = {
        nome: nome.trim(),
        especie,
        raca: raca.trim(),
        genero,
        idade: Number(idade),
        peso: peso ? Number(peso) : undefined, 
        castrado: Boolean(castrado),
        condicoes_especiais: specialConditionsArray,
        foto: photoToSend,
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
      router.push("screens/addPetScreens/FinalPetScreen");
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
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardContainer}>
            {fotoUri || petPhoto ? (
                <Animated.View
                    style={[
                        styles.photoCard,
                        { backgroundColor: PHOTO_FALLBACK_COLOR, transform: [{ scale: scaleAnim }] }, 
                    ]}
                >
                    <Image 
                        source={fotoUri ? { uri: fotoUri } : petPhoto} 
                        style={styles.petPhoto} 
                    />
                </Animated.View>
            ) : (
                <PlaceholderFotoCard scaleAnim={scaleAnim} />
            )}
            
            {(!fotoUri && !petPhoto) && (
                <View style={styles.placeholderOverlay}>
                    <Text style={styles.placeholderText}>Selecione a espécie</Text>
                </View>
            )}
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
          setModalGeneroVisible={setModalGeneroVisible}
          idade={idade}
          setIdade={setIdade}
          peso={peso} 
          setPeso={setPeso} 
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
        onSelect={(selectedGenero) => {
          setGenero(selectedGenero);
          setModalGeneroVisible(false);
        }}
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
    position: "relative",
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
  placeholderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100, 
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 14,
    color: "#343434",
    fontWeight: "600",
    opacity: 0.7,
  },
});