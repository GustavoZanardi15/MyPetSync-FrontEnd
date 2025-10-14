import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
const RECENT_ITEMS = [
  "Banho & Tosa",
  "Passeio",
  "Hospedagem para o fim de semana",
  "Treinamento / Adestramento",
  "Médicos Veterinários",
  "Consultas Veterinárias",
];

export default function BuscaScreen() {
 const [searchText, setSearchText] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable onPress={() => navigate("Back")} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2F8B88" />
          </Pressable>
          <Text style={styles.headerTitle}>Buscar</Text>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite..."
            placeholderTextColor="#C9C9C9"
            value={searchText}
            onChangeText={setSearchText}
          />
          <Ionicons name="search-outline" size={24} color="#2F8B88" style={styles.searchIcon} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recentes</Text>
          
          <View style={styles.recentList}>
            {RECENT_ITEMS.map((item, index) => (
              <Pressable 
                key={index} 
                onPress={() => handleItemPress(item)} 
                style={styles.recentItem}
              >
                <Text style={styles.recentItemText}>{item}</Text>
                {index < RECENT_ITEMS.length - 1 && (
                    <View style={styles.separator} />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => { router.push() }}>
          <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push() }}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push("/screens/home/homeScreen") }}>
          <Image source={require("../../../assets/images/home/NavBarHome.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push() }}>
          <Image source={require("../../../assets/images/home/NavBarPet.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push() }}>
          <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9"
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 70 + 10, 
    paddingHorizontal: 20
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: "#2F8B88",
    textAlign: 'center', 
    marginLeft: -34,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    borderWidth: 1, 
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#323232',
    height: '100%',
  },
  searchIcon: {
    marginLeft: 10,
    color: '#2F8B88', 
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "semibold",
    color: "#2F8B88",
    marginBottom: 10,
  },
  recentList: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    overflow: 'hidden', 
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  recentItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  recentItemText: {
    fontSize: 16,
    color: '#4B887C', 
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0', 
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 0.3,
    borderColor: "#ccc",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  }
});