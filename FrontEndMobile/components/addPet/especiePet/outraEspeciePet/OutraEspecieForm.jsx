import React, { useState } from "react";
import { View, StyleSheet, Image, TextInput } from "react-native";

export default function OutraEspecieForm() {
  const [nomeEspecie, setNomeEspecie] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.iconsRow}>
        <Image source={require("../../../../assets/images/addPet/Cat.png")} style={styles.icon} />
        <Image source={require("../../../../assets/images/addPet/Dog.png")} style={styles.icon} />
        <Image source={require("../../../../assets/images/addPet/Bird.png")} style={styles.icon} />
        <Image source={require("../../../../assets/images/addPet/Fish.png")} style={styles.icon} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome espécie"
        placeholderTextColor="#9E9E9E"
        value={nomeEspecie}
        onChangeText={setNomeEspecie}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  icon: {
    width: 50,
    height: 50,
    marginHorizontal: 12,
    resizeMode: "contain",
  },
  input: {
    width: "90%",
    color: "#2F8B88",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
});
