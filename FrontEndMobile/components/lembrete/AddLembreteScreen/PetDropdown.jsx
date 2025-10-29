import React, { useState } from "react";
import { View, Text, Pressable, Image, StyleSheet, LayoutAnimation, Platform, UIManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const pets = [
  { name: "Theo", image: require("../../../assets/images/home/DogHomePet1.png") },
  { name: "Fred", image: require("../../../assets/images/home/DogHomePet2.png") },
  { name: "Luna", image: require("../../../assets/images/home/CatHomePet.png") }
];

export default function PetDropdown({ selectedPet, setSelectedPet }) {
  const [expanded, setExpanded] = useState(false);
  const selectedPetObj = pets.find(p => p.name === selectedPet);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Pressable style={styles.header} onPress={toggleDropdown}>
          {selectedPetObj ? (
            <View style={styles.selectedPetInfo}>
              <Text style={styles.headerText}>{selectedPetObj.name}</Text>
              <Image source={selectedPetObj.image} style={styles.selectedPetImage} />
            </View>
          ) : (
            <Text style={styles.placeholder}>Selecione o Pet</Text>
          )}
          <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#2F8B88" />
        </Pressable>

        {expanded && (
          <View style={styles.list}>
            {pets.map(pet => {
              const isSelected = selectedPet === pet.name;
              return (
                <Pressable key={pet.name} style={styles.petItem} onPress={() => setSelectedPet(pet.name)}>
                  <Image source={pet.image} style={[styles.petImage, isSelected && styles.petImageSelected]} />
                  <Text style={[styles.petName, isSelected && { fontWeight: "bold" }]}>{pet.name}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: 350,
    alignSelf: "center"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ccc"
  },
  selectedPetInfo: {
    flexDirection: "row",
    alignItems: "center"
  },
  selectedPetImage: {
    width: 42.45,
    height: 42.45,
    borderRadius: 21,
    marginLeft: 8
  },
  headerText: {
    fontSize: 15,
    color: "#2F8B88"
  },
  placeholder: {
    fontSize: 15,
    color: "#8E8E8E"
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12
  },
  petItem: {
    alignItems: "center",
    padding: 8
  },
  petImage: {
    width: 62,
    height: 62,
    borderRadius: 30
  },
  petImageSelected: {
    borderWidth: 3,
    borderColor: "#89CFF0",
    borderRadius: 30
  },
  petName: {
    marginTop: 4,
    fontSize: 15,
    color: "#2F8B88"
  }
});

