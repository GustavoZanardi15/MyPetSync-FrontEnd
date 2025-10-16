import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, StatusBar } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const PetInfoField = ({ label, value }) => (
  <View style={styles.infoFieldContainer}>
    <Text style={styles.infoFieldLabel}>{label}</Text>
    <Text
      style={[
        styles.infoFieldValue,
        (value.trim() === "" || value.trim() === " ") && styles.infoFieldValueEmpty,
      ]}
    >
      {value.trim() === "" || value.trim() === " " ? label + (label.endsWith(":") ? "" : "") : value}
    </Text>
  </View>
);

const BottomNavBar = () => {
  const router = useRouter();
  return (
    <View style={styles.bottomNav}>
      <Pressable onPress={() => router.push("/agenda")}>
        <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/servicos")}>
        <Image source={require("../../../assets/images/home/NavBarServico.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/screens/home/HomeScreen")}>
        <Image source={require("../../../assets/images/home/NavBarHome.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/screens/home/PerfilPetScreen")}>
        <Image source={require("../../../assets/images/home/NavBarPetSelect.png")} />
      </Pressable>
      <Pressable onPress={() => router.push("/perfil")}>
        <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
      </Pressable>
    </View>
  );
};

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
      <View style={styles.topBackground} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pets</Text>
          <View style={styles.avatarRow}>
            {pets.map((pet) => (
              <Pressable
                key={pet.id}
                style={[
                  styles.petAvatarWrapper,
                  selectedPet.id === pet.id && styles.activeAvatar,
                ]}
                onPress={() => setSelectedPet(pet)}
              >
                <Image source={pet.avatar} style={styles.petImageThumb} />
              </Pressable>
            ))}
            <Pressable
              style={[styles.petAvatarWrapper, styles.addPetButton]}
              onPress={() => router.push("/screens/addPetScreens/NomePetScreen")}
            >
              <Ionicons name="add" size={24} color="#2F8B88" />
            </Pressable>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.mainImageWrapper}>
            <Image source={selectedPet.mainImage} style={styles.mainPetImage} resizeMode="cover" />
            <View style={styles.nameAgeBox}>
              <Text style={styles.petNameText}>{selectedPet.name}</Text>
              <Text style={styles.petAgeText}>{selectedPet.age}</Text>
            </View>

            <Pressable style={[styles.actionButton, styles.editButton]}>
              <MaterialCommunityIcons name="pencil" size={24} color="#2F8B88" />
            </Pressable>
            <Pressable style={[styles.actionButton, styles.vetButton]}>
              <MaterialCommunityIcons name="stethoscope" size={24} color="#2F8B88" />
            </Pressable>
          </View>

          <View style={styles.infoSection}>
            <PetInfoField label="Raça" value={selectedPet.race} />
            <PetInfoField label="Idade" value={selectedPet.age} />
            <PetInfoField label="Peso atual" value={selectedPet.weight} />
            <PetInfoField label="Castrado?" value={selectedPet.neutered} />
            <PetInfoField label="Condição especial:" value={selectedPet.specialCondition} />
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>
      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F9F9f9",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#F9F9f9",
  },
  scrollContent: { paddingBottom: 20 },
  header: {
    paddingTop: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2F8B88",
    marginBottom: 10,
  },
  avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 20,
  },
  petAvatarWrapper: {
    width: 62,
    height: 62,
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
  },
  activeAvatar: {
    transform: [{ scale: 1.15 }],
    borderColor: "#89CFF0",
    shadowColor: "#89CFF0",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  petImageThumb: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  addPetButton: {
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  mainImageWrapper: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
    width: "100%",
  },
  mainPetImage: {
    width: 210.35,
    height: 309,
    borderRadius: 20,
    backgroundColor: "#FFE9E9",
  },
  nameAgeBox: {
    position: "absolute",
    top: 25,
    left: "25%",
    zIndex: 2,
  },
  petNameText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2F8B88",
  },
  petAgeText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#2F8B88",
  },
  actionButton: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  editButton: {
    right: 40,
    top: 15,
  },
  vetButton: {
    right: 40,
    top: 75,
  },
  infoSection: {
    marginTop: 0,
    paddingHorizontal: 0,
  },
  infoFieldContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 9.5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoFieldLabel: {
    fontSize: 12,
    color: "#A9A9A9",
    fontWeight: "500",
    marginBottom: 2,
  },
  infoFieldValue: {
    fontSize: 16,
    color: "#2F8B88",
    fontWeight: "600",
  },
  infoFieldValueEmpty: {
    color: "#A9A9A9",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
