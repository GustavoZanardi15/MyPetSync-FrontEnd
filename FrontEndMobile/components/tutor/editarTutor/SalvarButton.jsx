import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function SalvarButton({ onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Salvar</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2F8B88",
    borderRadius: 30,       
    paddingVertical: 12, 
    width: 250,             
    alignItems: "center",
    alignSelf: "center",     
    shadowColor: "#2F8B88",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  text: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 18,
  },
});
