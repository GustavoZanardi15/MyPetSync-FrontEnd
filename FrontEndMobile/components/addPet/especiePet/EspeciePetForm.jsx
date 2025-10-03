import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";

export default function EspecieForm() {
  const [especie, setEspecie] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.optionsContainer}>
        <View style={styles.wrapper}>
          <Pressable style={[styles.circle, { backgroundColor: "#C7EBDD" }, especie === "cachorro" && styles.selected]}
            onPress={() => setEspecie("cachorro")}
          >
            <Image source={require("../../../assets/images/Dog.png")} style={styles.image} />
          </Pressable>
          <Text style={[styles.text, especie === "cachorro" && styles.textSelected]}>Cachorro</Text>
        </View>

        <View style={styles.wrapper}>
          <Pressable style={[styles.circle, { backgroundColor: "#E6D6F7" }, especie === "gato" && styles.selected]}
            onPress={() => setEspecie("gato")}
          >
            <Image source={require("../../../assets/images/Cat.png")} style={styles.image}/>
          </Pressable>
          <Text style={[styles.text, especie === "gato" && styles.textSelected]}>Gato</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    alignSelf: "center"
  },
  wrapper: {
    alignItems: "center"
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent"
  },
  selected: {
    borderColor: "#89CFF0",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  text: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 15,
    color: "#2F8B88"
  },
  textSelected:{
    fontWeight: "bold"
  }
});
