import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function RacaPetForm() {
  const [raca, setRaca] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Raça do Pet"
        placeholderTextColor="#9E9E9E"
        value={raca}
        onChangeText={setRaca}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 20
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 20,
    color: "#2F8B88"
  },
});
