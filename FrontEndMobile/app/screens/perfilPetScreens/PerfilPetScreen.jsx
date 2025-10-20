import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Platform, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import PetInfo from "../../../components/pet/perfilPet/PetInfo";
import BottomNav from "../../../components/pet/perfilPet/BottomNav";
import PetAvatarSelector from "../../../components/pet/perfilPet/PetAvatarSelector";
import PetImageInfo from "../../../components/pet/perfilPet/PetImageInfo";

export default function PerfilPetScreen() {
  const router = useRouter();

  const pets = [
    {
      id: 1,
      name: "Theo",
      age: "4 anos",
      race: "Jack Russell Terrier",
      weight: "3kg800",
      neutered: "Sim",
      specialCondition: "",
      mainImage: require("../../../assets/images/home/PetPerfilDog.png"),
      avatar: require("../../../assets/images/home/DogHomePet1.png"),
    },
    {
      id: 2,
      name: "Luna",
      age: "2 anos",
      race: "Poodle",
      weight: "4kg500",
      neutered: "Não",
      specialCondition: "Alergia a ração",
      mainImage: require("../../../assets/images/home/DogHomePet2.png"),
      avatar: require("../../../assets/images/home/DogHomePet2.png"),
    },
    {
      id: 3,
      name: "Mingau",
      age: "1 ano",
      race: "Gato Siamês",
      weight: "2kg200",
      neutered: "Sim",
      specialCondition: "",
      mainImage: require("../../../assets/images/home/CatHomePet.png"),
      avatar: require("../../../assets/images/home/CatHomePet.png"),
    },
  ];

  const [selectedPet, setSelectedPet] = useState(pets[0]);

  return (
    <View style={styles.fullScreen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PetAvatarSelector pets={pets} selectedPet={selectedPet} setSelectedPet={setSelectedPet} router={router} />
        <View style={styles.contentContainer}>
          <PetImageInfo pet={selectedPet} router={router} />
          <View>
            <PetInfo label="Raça" value={selectedPet.race} />
            <PetInfo label="Idade" value={selectedPet.age} />
            <PetInfo label="Peso atual" value={selectedPet.weight} />
            <PetInfo label="Castrado?" value={selectedPet.neutered} />
            <PetInfo label="Condição especial:" value={selectedPet.specialCondition} />
          </View>
        </View>
        <View style={{ height: 90 }} />
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F9F9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
