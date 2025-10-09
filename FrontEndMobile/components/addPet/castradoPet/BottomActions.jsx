import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";
import { router } from "expo-router";

export default function BottomActions() {
    return (
        <View>
            <Pressable style={styles.button} onPress={() => router.push("/screens/addPetScreens/IdadePetScreen")}>
                <Text style={styles.buttonText}>Próximo</Text>
            </Pressable>


            <Pressable onPress={() => { router.push("/screens/addPetScreens/IdadePetScreen") }}>
                <Text style={styles.linkText}>Não sei!</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    bbutton: {
    backgroundColor: "#2F8B88",
    width: "80%",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    fontSize: 15,
    fontWeight: "regular",
    color: "#89CFF0",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15
  }
});
