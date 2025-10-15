import React from "react";
import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function BuscaForm({ searchText, setSearchText }) {
  const clearSearch = () => setSearchText("");

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Digite..."
        placeholderTextColor="#C9C9C9"
        value={searchText}
        onChangeText={setSearchText}
        autoFocus={true}
      />
      {searchText.length > 0 ? (
        <Pressable onPress={clearSearch} style={styles.searchClearIcon}>
          <Ionicons name="close-circle" size={20} color="#C9C9C9" />
        </Pressable>
      ) : (
        <Ionicons name="search-outline" size={20} color="#2F8B88" style={styles.searchIcon} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  searchClearIcon: { 
    marginLeft: 10, 
    padding: 5 
},
  searchIcon: { 
    marginLeft: 10 
}
});
