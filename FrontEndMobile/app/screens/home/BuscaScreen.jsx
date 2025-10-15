import React, { useState, useMemo } from "react"; 
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const RECENT_ITEMS = [
  "Banho & Tosa",
  "Passeio",
  "Hospedagem para o fim de semana",
  "Treinamento / Adestramento",
  "Médicos Veterinários",
  "Consultas Veterinárias",
  "Vacinação",
  "Castração",
  "Venda de Ração",
  "Acessórios Pet",
];

export default function BuscaScreen() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const filteredItems = useMemo(() => {
    if (!searchText) {
      return RECENT_ITEMS;
    }

    const lowerCaseSearch = searchText.toLowerCase();

    return RECENT_ITEMS.filter((item) =>
      item.toLowerCase().includes(lowerCaseSearch)
    );
  }, [searchText]);
  
  const handleItemPress = (item) => {
    console.log(`Buscando e navegando para: ${item}`);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Pressable 
              onPress={() => { router.back()}} 
              style={styles.backButton}
              hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
            >
              <Ionicons name="arrow-back" size={24} color="#2F8B88" />
            </Pressable>
          </View>
          <View style={styles.headerBottom}>
            <Text style={styles.headerTitle}>Buscar</Text>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite..."
            placeholderTextColor="#C9C9C9"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true} 
          />
          <Ionicons name="search-outline" size={24} color="#2F8B88" style={styles.searchIcon}/>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>
            {searchText ? "Resultados da Busca" : "Recentes"}
          </Text>

          <View style={styles.recentList}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleItemPress(item)}
                  style={styles.recentItem}
                >
                  <Text style={styles.recentItemText}>{item}</Text>
                  {index < filteredItems.length - 1 && (
                    <View style={styles.separator} />
                  )}
                </Pressable>
              ))
            ) : ( 
              <View style={styles.noResults}>
                <Image source={require("../../../assets/images/busca/ServicoNaoEncontrado.png")} style={styles.noResultsImage}/>
                <Text style={styles.noResultsText}>Nenhum resultado encontrado</Text>
                <Text style={styles.noResultSubText}>{"\n"} para "{searchText}"</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Pressable onPress={() => { router.push() }}>
          <Image source={require("../../../assets/images/home/NavBarCalendar.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push()}}>
          <Image source={require("../../../assets/images/home/NavBarServico.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push("/screens/home/homeScreen")}}>
          <Image source={require("../../../assets/images/home/NavBarHome.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push()}}>
          <Image source={require("../../../assets/images/home/NavBarPet.png")} />
        </Pressable>
        <Pressable onPress={() => { router.push()}}>
          <Image source={require("../../../assets/images/home/NavBarPerfil.png")} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 70 + 10,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 12,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    height: 44,
  },
  backButton: {
    paddingLeft: 0, 
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerBottom: {
    alignItems: "center",
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2F8B88",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
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
    borderColor: "#E5E5E5",
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#323232",
    height: "100%",
  },
  searchIcon: {
    marginLeft: 10,
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2F8B88",
    marginBottom: 10,
  },
  recentList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  recentItem: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  recentItemText: {
    fontSize: 16,
    color: "#4B887C",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F0F0",
    position: "absolute",
    bottom: 0,
    left: 15,
    right: 15,
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsImage:{
    width: 193,
    height: 204
  },
  noResultsText: {
    fontSize: 24,
    fontWeight: "bold",
    color: '#2F8B88',
    marginBottom: 5,
    textAlign: 'center',
  },
  noResultSubText:{
    fontSize: 18,
    fontWeight: "medium",
    color: "#2F8B88",
    textAlign: 'center',
  },
  noResultsTip: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
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
  },
});