import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BottomActions from "../../../components/addPet/especiePet/outraEspeciePet/ButtomActions";
import EspeciePetHeader from "../../../components/addPet/especiePet/EspeciePetHeader";
import OutraEspecieForm from "../../../components/addPet/especiePet/outraEspeciePet/OutraEspecieForm";

export default function OutroPetScreen() {
  return (
    <View style={styles.container}>
      <View>
        <EspeciePetHeader />
        <Text style={styles.title}> Digite o nome da espécie do seu animal de estimação</Text>
        <OutraEspecieForm />
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
    marginBottom: 30,
  }
});
