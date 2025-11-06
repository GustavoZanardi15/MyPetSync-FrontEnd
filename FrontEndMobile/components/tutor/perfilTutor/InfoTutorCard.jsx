import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function InfoTutorCard({ nome, email, telefone }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Image
            source={require("../../../assets/images/home/NavBarPerfil.png")}
            style={styles.iconImage}
          />
        </View>
        <Text style={styles.text}>{nome}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Ionicons name="mail-outline" size={24} color="#2F7A67" />
        </View>
        <Text style={styles.text}>{email}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Ionicons name="call-outline" size={24} color="#2F7A67" />
        </View>
        <Text style={styles.text}>{telefone}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: 'rgba(50,50,50,0.1)', 
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  text: {
    marginLeft: 12,
    fontSize: 15,
    color: "#2F8B88",
  },
});
