import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function PetImageInfo({ pet, router }) {
  return (
    <View style={styles.mainImageWrapper}>
      <Image source={pet.mainImage} style={styles.mainPetImage} resizeMode="cover" />
      <View style={styles.nameAgeBox}>
        <Text style={styles.petNameText}>{pet.name}</Text>
        <Text style={styles.petAgeText}>{pet.age}</Text>
      </View>

      <Pressable
        style={[styles.actionButton, styles.editButton]}
        onPress={() =>
          router.push({
            pathname: "/screens/perfilPetScreens/EditarPetScreen",
            params: { pet: JSON.stringify(pet) }, 
          })
        }
      >
        <MaterialCommunityIcons name="pencil" size={24} color="#2F8B88" />
      </Pressable>

      <Pressable style={[styles.actionButton, styles.vetButton]} 
        onPress={() => router.push("/screens/perfilPetScreens/SaudePetScreen")}
      >
        <MaterialCommunityIcons name="stethoscope" size={24} color="#2F8B88" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  mainImageWrapper: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
    width: "100%",
  },
  mainPetImage: {
    width: 240,
    height: 350,
    borderRadius: 20,
    backgroundColor: "#FFE9E9",
  },
  nameAgeBox: {
    position: "absolute",
    top: 3,
    left: "24%",
    zIndex: 2,
  },
  petNameText: {
    marginTop: -12,
    fontSize: 40,
    fontWeight: "bold",
    color: "#2F8B88",
  },
  petAgeText: {
    marginTop: -15,
    fontSize: 24,
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
    right: 20,
    top: 15,
  },
  vetButton: {
    right: 20,
    top: 75,
  },
});
