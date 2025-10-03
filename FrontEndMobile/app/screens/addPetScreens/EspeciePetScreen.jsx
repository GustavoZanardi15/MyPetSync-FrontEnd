import React from "react";
import { View, StyleSheet, Text } from "react-native";
import EspecieHeader from "../../../components/addPet/especiePet/EspeciePetHeader";
import EspecieForm from "../../../components/addPet/especiePet/EspeciePetForm";
import BottomActions from "../../../components/addPet/especiePet/BottomActions";

export default function EspeciePetScreen() {
  return (
    <View style={styles.container}>
      <View>
        <EspecieHeader />
        <Text style={styles.title}>Informe a espécie do seu{"\n"} animal de estimação?</Text>
        <EspecieForm />
      </View>
        <BottomActions />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 20,
    paddingTop: 60,
    justifyContent: "space-between"
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: "center",
    marginBottom: 40
  }
});
